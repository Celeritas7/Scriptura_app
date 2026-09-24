// Scriptura — progress store + optional Supabase cloud sync.
// Loaded as a plain script; exposes window.ProgressStore and window.ScripturaCloud.
// The app is fully functional OFFLINE: stats live in localStorage. If the user
// supplies Supabase keys (Progress screen → Cloud sync), stats also sync to a
// `sheet_stats` table so they follow them across devices.
//
// Accounts: progress only syncs for a signed-in user (Supabase Auth — email
// magic link or Google). Row-level security (sql/scriptura_app_auth.sql)
// limits every row to auth.uid(). Signed out, the app is device-only.
// ──────────────────────────────────────────────────────────────────────────
// Supabase table (see sql/scriptura_app_schema.sql + scriptura_app_auth.sql):
//
//   create table if not exists scriptura_app_sheet_stats (
//     user_id    text not null,
//     language   text not null,
//     char_index int  not null,
//     char       text,
//     correct    int  not null default 0,
//     wrong      int  not null default 0,
//     updated_at timestamptz default now(),
//     primary key (user_id, language, char_index)
//   );
//   alter table scriptura_app_sheet_stats enable row level security;
//   -- per-user policies: auth.uid()::text = user_id (see scriptura_app_auth.sql)
// ──────────────────────────────────────────────────────────────────────────

(function () {
  // ---------- local stats: { [charIndex]: { c: correctCount, w: wrongCount } } ----------
  const ProgressStore = {
    key: (lang) => `scriptura.stats.${lang}`,
    load(lang) { try { return JSON.parse(localStorage.getItem(this.key(lang)) || '{}'); } catch (e) { return {}; } },
    save(lang, stats) { try { localStorage.setItem(this.key(lang), JSON.stringify(stats)); } catch (e) {} },

    // Record one full pass of a practice sheet. marks = { [idx]: 'wrong' }.
    // Unmarked cells count as correct (the app's original "mark only mistakes" model).
    recordPass(lang, total, marks) {
      const s = this.load(lang);
      for (let i = 0; i < total; i++) {
        const cur = s[i] || { c: 0, w: 0 };
        if (marks[i] === 'wrong') cur.w++; else cur.c++;
        s[i] = cur;
      }
      this.save(lang, s);
      return s;
    },

    // Record only explicitly rated cells. marks = { [idx]: 'mastered'|'learning'|'new' }.
    // 'mastered' → correct, 'learning' → wrong, 'new' and absent → no attempt.
    // Used by the 3-state sheet, where an untouched cell must stay untouched.
    recordRated(lang, marks) {
      const s = this.load(lang);
      Object.keys(marks || {}).forEach((k) => {
        const state = marks[k];
        if (state !== 'mastered' && state !== 'learning') return;
        const cur = s[k] || { c: 0, w: 0 };
        if (state === 'mastered') cur.c++; else cur.w++;
        s[k] = cur;
      });
      this.save(lang, s);
      return s;
    },

    // Merge a cloud snapshot in; whichever side has more total attempts wins per char.
    merge(lang, cloudStats) {
      if (!cloudStats) return this.load(lang);
      const local = this.load(lang);
      const out = { ...local };
      Object.keys(cloudStats).forEach((i) => {
        const c = cloudStats[i], l = local[i];
        const ct = (c.c || 0) + (c.w || 0), lt = l ? (l.c || 0) + (l.w || 0) : -1;
        if (ct >= lt) out[i] = { c: c.c || 0, w: c.w || 0 };
      });
      this.save(lang, out);
      return out;
    },

    // Mastery tier for one character record → drives the heatmap color.
    tier(rec) {
      if (!rec || (rec.c + rec.w) === 0) return 'none';
      const wrongRate = rec.w / (rec.c + rec.w);
      if (wrongRate === 0) return 'strong';   // green  — never missed
      if (wrongRate <= 0.5) return 'shaky';    // orange — sometimes missed
      return 'weak';                           // red    — missed more than half
    },
  };

  // ---------- optional Supabase cloud ----------
  const LS_CFG = 'scriptura.supabase';
  const LS_CLAIMED = 'scriptura.deviceClaimedBy';
  let client = null;
  let session = null;

  function readConfig() {
    if (window.SCRIPTURA_SUPABASE && window.SCRIPTURA_SUPABASE.url) return window.SCRIPTURA_SUPABASE;
    try { return JSON.parse(localStorage.getItem(LS_CFG) || 'null'); } catch (e) { return null; }
  }
  // Signed-in Supabase user id, or null (signed out = device-only).
  function userId() { return (session && session.user && session.user.id) || null; }
  // Where magic links / Google send the browser back to: this exact page.
  function redirectUrl() { return location.origin + location.pathname; }

  const ScripturaCloud = {
    isConfigured() { const c = readConfig(); return !!(c && c.url && c.anonKey); },
    setConfig(url, anonKey) { localStorage.setItem(LS_CFG, JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() })); client = null; },
    clearConfig() { localStorage.removeItem(LS_CFG); client = null; },
    userId,

    async init() {
      if (client) return client;
      const c = readConfig();
      if (!c || !c.url || !c.anonKey) return null;
      if (!window.supabase) {
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
          s.onload = res; s.onerror = rej; document.head.appendChild(s);
        });
      }
      // implicit flow: the emailed link works even if it opens in a different
      // browser (e.g. Gmail's in-app browser) than the one that asked for it
      client = window.supabase.createClient(c.url, c.anonKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'implicit' },
      });
      const { data } = await client.auth.getSession();
      session = data && data.session;
      return client;
    },

    // ---------- auth ----------
    async currentUser() { await this.init().catch(() => null); return (session && session.user) || null; },
    async onAuth(cb) {
      const cl = await this.init().catch(() => null);
      if (!cl) { cb(null, 'NO_CLOUD'); return () => {}; }
      const { data } = cl.auth.onAuthStateChange((evt, s) => { session = s; cb((s && s.user) || null, evt); });
      return () => data && data.subscription && data.subscription.unsubscribe();
    },
    async signInWithEmail(email) {
      const cl = await this.init().catch(() => null);
      if (!cl) return { ok: false, error: 'Cloud sync is not configured.' };
      const { error } = await cl.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: redirectUrl(), shouldCreateUser: true } });
      return { ok: !error, error: error && error.message };
    },
    async signInWithGoogle() {
      const cl = await this.init().catch(() => null);
      if (!cl) return { ok: false, error: 'Cloud sync is not configured.' };
      const { error } = await cl.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirectUrl() } });
      return { ok: !error, error: error && error.message };
    },
    async signOut() {
      const cl = await this.init().catch(() => null);
      if (cl) await cl.auth.signOut();
      session = null;
    },

    // First sign-in on this device: lift the device's progress into the
    // account (merged — higher attempt count wins per letter). Later sign-ins,
    // or a different account on the same device, only pull; the device's
    // history is never copied into a second person's account.
    async syncDevice(languageIds, charAtFor) {
      const uid = userId();
      if (!uid) return { ok: false };
      const claimedBy = localStorage.getItem(LS_CLAIMED);
      const upload = !claimedBy || claimedBy === uid;
      const SRS = window.ScripturaSRS;
      for (const id of languageIds) {
        const cloud = await this.loadStats(id);
        const merged = window.ProgressStore.merge(id, cloud || {});
        if (upload && Object.keys(merged).length) await this.saveStats(id, merged, charAtFor(id));
        if (SRS) {
          const cs = await this.loadSrs(id);
          const ms = SRS.merge(id, cs || {});
          if (upload && Object.keys(ms).length) await this.pushSrs(id);
        }
      }
      if (!claimedBy) localStorage.setItem(LS_CLAIMED, uid);
      return { ok: true, uploaded: upload };
    },

    // Push cumulative stats for a language. stats = { [idx]: { c, w } }.
    async saveStats(language, stats, charAt) {
      const cl = await this.init().catch(() => null);
      if (!cl) return { ok: false, offline: true };
      const uid = userId();
      if (!uid) return { ok: false, offline: true, signedOut: true };
      const rows = Object.keys(stats).map((i) => ({
        user_id: uid, language_id: language, char_index: Number(i),
        char: charAt ? charAt(Number(i)) : null,
        correct: stats[i].c || 0, wrong: stats[i].w || 0, updated_at: new Date().toISOString(),
      }));
      if (!rows.length) return { ok: true };
      const { error } = await cl.from('scriptura_app_sheet_stats').upsert(rows, { onConflict: 'user_id,language_id,char_index' });
      return { ok: !error, error };
    },

    // ---------- review schedule (Leitner boxes) ----------
    // Table scriptura_app_srs — see sql/scriptura_app_srs.sql.
    _srsTimers: {},
    queueSrs(language) {
      if (!userId()) return;
      clearTimeout(this._srsTimers[language]);
      this._srsTimers[language] = setTimeout(() => { delete this._srsTimers[language]; this.pushSrs(language); }, 1500);
    },
    async pushSrs(language) {
      const cl = await this.init().catch(() => null);
      const uid = userId();
      if (!cl || !uid || !window.ScripturaSRS) return { ok: false };
      const m = window.ScripturaSRS.load(language);
      const rows = Object.keys(m).map((i) => {
        const r = m[i];
        return { user_id: uid, language_id: language, char_index: Number(i), box: r.b || 0, due: Math.round(r.due || 0),
                 correct: r.c || 0, wrong: r.w || 0, last: r.last || null, best: r.best || 0, t: Math.round(r.t || 0),
                 updated_at: new Date().toISOString() };
      });
      if (!rows.length) return { ok: true };
      const { error } = await cl.from('scriptura_app_srs').upsert(rows, { onConflict: 'user_id,language_id,char_index' });
      return { ok: !error, error };
    },
    async loadSrs(language) {
      const cl = await this.init().catch(() => null);
      if (!cl || !userId()) return null;
      const { data, error } = await cl.from('scriptura_app_srs')
        .select('char_index,box,due,correct,wrong,last,best,t').eq('user_id', userId()).eq('language_id', language);
      if (error) return null;
      const map = {};
      (data || []).forEach((r) => { map[r.char_index] = { b: r.box, due: Number(r.due) || 0, c: r.correct, w: r.wrong, last: r.last, best: r.best || 0, t: Number(r.t) || 0 }; });
      return map;
    },
    // Push every language's schedule now. Resolves true only if all backed up.
    async flushSrs(languageIds) {
      Object.keys(this._srsTimers).forEach((k) => clearTimeout(this._srsTimers[k]));
      this._srsTimers = {};
      const SRS = window.ScripturaSRS;
      if (!SRS) return true;
      let ok = true;
      for (const id of languageIds) {
        if (!Object.keys(SRS.load(id)).length) continue;
        const r = await this.pushSrs(id).catch(() => ({ ok: false }));
        if (!r || !r.ok) ok = false;
      }
      return ok;
    },
    // Wipe this device's learner data (shared-device sign-out). Keeps app
    // settings: cloud config and the auto-grade preference. Also drops the
    // Supabase session (`sb-*`) in case signOut() failed offline.
    clearDevice() {
      const drop = ['scriptura.stats.', 'scriptura.srs.', 'scriptura.sheet.', 'scriptura.ink.'];
      const exact = ['scriptura.deviceClaimedBy', 'scriptura.lastEmail', 'scriptura.authSkip'];
      try {
        Object.keys(localStorage).forEach((k) => {
          if (exact.includes(k) || k.startsWith('sb-') || drop.some((p) => k.startsWith(p))) localStorage.removeItem(k);
        });
      } catch (e) {}
    },

    async loadStats(language) {
      const cl = await this.init().catch(() => null);
      if (!cl || !userId()) return null;
      const { data, error } = await cl.from('scriptura_app_sheet_stats')
        .select('char_index,correct,wrong').eq('user_id', userId()).eq('language_id', language);
      if (error) return null;
      const map = {};
      (data || []).forEach((r) => { map[r.char_index] = { c: r.correct, w: r.wrong }; });
      return map;
    },

    // Load ALL content (languages/units/characters/vowels) and rebuild the same
    // shape the app expects in window.ScripturaData.{languages,languageList}.
    async loadContent() {
      const cl = await this.init().catch(() => null);
      if (!cl) return null;
      const [L, U, C, V] = await Promise.all([
        cl.from('scriptura_app_languages').select('*').order('sort'),
        cl.from('scriptura_app_units').select('*').order('sort'),
        cl.from('scriptura_app_characters').select('*').order('char_index'),
        cl.from('scriptura_app_vowels').select('*').order('sort'),
      ]);
      if (L.error || !L.data || !L.data.length) return null;
      // Local catalogue, used to fill anything the cloud rows don't carry yet
      // (a project seeded before the slots / concept / no_vowel_sign columns).
      const local = (window.ScripturaData && window.ScripturaData.languages) || {};
      const languages = {}, languageList = [];
      L.data.forEach((l) => {
        languageList.push({ id: l.id, name: l.name, native: l.native, font: l.font, group: l.grp });
        const loc = local[l.id] || { units: [], allChars: [] };
        const units = (U.data || []).filter((u) => u.language_id === l.id).map((u) => {
          const id = String(u.id).replace(l.id + '_', '');
          const lu = loc.units.find((x) => x.id === id) || {};
          return { id, _full: u.id, title: u.title, subtitle: u.subtitle, accent: u.accent, font: l.font, chars: [],
            slots: u.slots || lu.slots, concept: u.concept || lu.concept };
        });
        const byFull = {}; units.forEach((u) => { byFull[u._full] = u; });
        const allChars = [];
        (C.data || []).filter((c) => c.language_id === l.id).forEach((c) => {
          const u = byFull[c.unit_id];
          const lc = loc.allChars.find((x) => x.char === c.char) || {};
          const obj = { char: c.char, roman: c.roman, name: c.name || c.roman, gloss: c.gloss || '',
                        cognate: c.cognate || '', font: l.font,
                        noVowelSign: c.no_vowel_sign != null ? !!c.no_vowel_sign : !!lc.noVowelSign };
          if (u) u.chars.push(obj);
          allChars.push({ ...obj, unitId: u ? u.id : null, unitTitle: u ? u.title : '', accent: u ? u.accent : 'indic' });
        });
        // language-wide index of each unit's first character — the SRS and
        // stats stores key on it (see data.js)
        let at = 0; units.forEach((u) => { u.startIndex = at; at += u.chars.length; });
        const vowels = (V.data || []).filter((v) => v.language_id === l.id).map((v) => ({ sign: v.sign, label: v.label, name: v.name }));
        languages[l.id] = { id: l.id, name: l.name, native: l.native, group: l.grp, font: l.font,
          units: units.map(({ _full, ...u }) => u), vowels: vowels.length ? vowels : null, allChars, dueChars: [] };
      });
      return { languages, languageList };
    },
  };

  window.ProgressStore = ProgressStore;
  window.ScripturaCloud = ScripturaCloud;
})();
