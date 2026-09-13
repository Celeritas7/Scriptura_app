// Scriptura — progress store + optional Supabase cloud sync.
// Loaded as a plain script; exposes window.ProgressStore and window.ScripturaCloud.
// The app is fully functional OFFLINE: stats live in localStorage. If the user
// supplies Supabase keys (Progress screen → Cloud sync), stats also sync to a
// `sheet_stats` table so they follow them across devices.
//
// ──────────────────────────────────────────────────────────────────────────
// Supabase table (run once in the SQL editor):
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
//   -- simplest policy for a single-user / anon-key demo:
//   create policy "anon all" on scriptura_app_sheet_stats for all using (true) with check (true);
//
// For real multi-user auth, replace user_id with auth.uid() and scope the policy
// to `auth.uid() = user_id`.
// ──────────────────────────────────────────────────────────────────────────

(function () {
  // ---------- local stats: { [charIndex]: { c: correctCount, w: wrongCount } } ----------
  const ProgressStore = {
    key: (lang) => `scriptura.stats.${lang}`,
    load(lang) { try { return JSON.parse(localStorage.getItem(this.key(lang)) || '{}'); } catch (e) { return {}; } },
    save(lang, stats) { try { localStorage.setItem(this.key(lang), JSON.stringify(stats)); } catch (e) {} },

    // Record one full pass of a practice sheet. marks = { [idx]: 'wrong' }.
    // Unmarked cells count as correct (the app's "mark only mistakes" model).
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
  const LS_UID = 'scriptura.uid';
  let client = null;

  function readConfig() {
    if (window.SCRIPTURA_SUPABASE && window.SCRIPTURA_SUPABASE.url) return window.SCRIPTURA_SUPABASE;
    try { return JSON.parse(localStorage.getItem(LS_CFG) || 'null'); } catch (e) { return null; }
  }
  function userId() {
    let id = localStorage.getItem(LS_UID);
    if (!id) { id = 'dev-' + Math.random().toString(36).slice(2, 10); localStorage.setItem(LS_UID, id); }
    return id;
  }

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
      client = window.supabase.createClient(c.url, c.anonKey);
      return client;
    },

    // Push cumulative stats for a language. stats = { [idx]: { c, w } }.
    async saveStats(language, stats, charAt) {
      const cl = await this.init().catch(() => null);
      if (!cl) return { ok: false, offline: true };
      const uid = userId();
      const rows = Object.keys(stats).map((i) => ({
        user_id: uid, language_id: language, char_index: Number(i),
        char: charAt ? charAt(Number(i)) : null,
        correct: stats[i].c || 0, wrong: stats[i].w || 0, updated_at: new Date().toISOString(),
      }));
      if (!rows.length) return { ok: true };
      const { error } = await cl.from('scriptura_app_sheet_stats').upsert(rows, { onConflict: 'user_id,language_id,char_index' });
      return { ok: !error, error };
    },

    async loadStats(language) {
      const cl = await this.init().catch(() => null);
      if (!cl) return null;
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
      const languages = {}, languageList = [];
      L.data.forEach((l) => {
        languageList.push({ id: l.id, name: l.name, native: l.native, font: l.font, group: l.grp });
        const units = (U.data || []).filter((u) => u.language_id === l.id).map((u) => ({
          id: String(u.id).replace(l.id + '_', ''), _full: u.id, title: u.title,
          subtitle: u.subtitle, accent: u.accent, font: l.font, chars: [],
        }));
        const byFull = {}; units.forEach((u) => { byFull[u._full] = u; });
        const allChars = [];
        (C.data || []).filter((c) => c.language_id === l.id).forEach((c) => {
          const u = byFull[c.unit_id];
          const obj = { char: c.char, roman: c.roman, name: c.name || c.roman, gloss: c.gloss || '',
                        cognate: c.cognate || '', font: l.font, mastery: 'new', srs: 'new' };
          if (u) u.chars.push(obj);
          allChars.push({ ...obj, unitId: u ? u.id : null, unitTitle: u ? u.title : '', accent: u ? u.accent : 'indic' });
        });
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
