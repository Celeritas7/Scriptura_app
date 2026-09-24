// Scriptura — Leitner scheduling + 3-state mastery.
// Plain script; exposes window.ScripturaSRS. Storage is localStorage per
// language, Supabase-ready (same {c,w} counters ProgressStore already syncs,
// plus box/due/streak fields the cloud table can ignore until migrated).
//
// Leitner: five boxes. A correct answer promotes one box, a miss drops you to
// box 1 (classic Leitner, not SM-2 — it is forgiving to re-learn and needs no
// ease factors, which suits a 30-40 character alphabet).
//
//   box 1 → same session    box 2 → 1 day    box 3 → 3 days
//   box 4 → 7 days          box 5 → 21 days
//
// Mastery is DERIVED from the box, never stored twice:
//   new       — never attempted
//   learning  — box 1-3 (still inside the week)
//   mastered  — box 4-5 and the last answer was correct
(function () {
  const DAY = 86400000;
  const INTERVALS = [0, 0, 1 * DAY, 3 * DAY, 7 * DAY, 21 * DAY]; // index = box
  const MAX_BOX = 5;

  const SRS = {
    key: (lang) => `scriptura.srs.${lang}`,

    load(lang) { try { return JSON.parse(localStorage.getItem(this.key(lang)) || '{}'); } catch (e) { return {}; } },
    save(lang, m) {
      try { localStorage.setItem(this.key(lang), JSON.stringify(m)); } catch (e) {}
      // back the schedule up to the account (debounced; no-op when signed out)
      if (window.ScripturaCloud && window.ScripturaCloud.queueSrs) window.ScripturaCloud.queueSrs(lang);
    },

    // Fold a cloud copy into the local schedule. Per character the most
    // recently graded record wins (t = ms epoch); records from before t existed
    // fall back to whichever has more attempts. Writes locally only — no push.
    merge(lang, cloud) {
      const m = this.load(lang);
      Object.keys(cloud || {}).forEach((k) => {
        const a = m[k], b = cloud[k];
        if (!a) { m[k] = b; return; }
        const ta = a.t || 0, tb = b.t || 0;
        if (ta || tb) { if (tb > ta) m[k] = b; }
        else if ((b.c || 0) + (b.w || 0) > (a.c || 0) + (a.w || 0)) m[k] = b;
      });
      try { localStorage.setItem(this.key(lang), JSON.stringify(m)); } catch (e) {}
      return m;
    },

    // One character's record, defaulted. b=box, due=ms epoch, c/w=counters,
    // last='ok'|'miss', best=best trace score seen (0-100).
    rec(lang, idx, map) {
      const m = map || this.load(lang);
      return m[idx] || { b: 0, due: 0, c: 0, w: 0, last: null, best: 0 };
    },

    // new | learning | mastered — the three states the UI paints.
    mastery(r) {
      if (!r || !r.b) return 'new';
      if (r.b >= 4 && r.last !== 'miss') return 'mastered';
      return 'learning';
    },

    isDue(r, now) { return r && r.b > 0 && (r.due || 0) <= (now || Date.now()); },

    // Grade one attempt. ok=true promotes, false resets to box 1.
    // score (0-100) is optional trace feedback, recorded as a personal best.
    grade(lang, idx, ok, score) {
      const m = this.load(lang);
      const r = this.rec(lang, idx, m);
      if (ok) { r.b = Math.min(MAX_BOX, (r.b || 0) + 1); r.c++; r.last = 'ok'; }
      else { r.b = 1; r.w++; r.last = 'miss'; }
      r.due = Date.now() + INTERVALS[r.b]; r.t = Date.now();
      if (typeof score === 'number') r.best = Math.max(r.best || 0, Math.round(score));
      m[idx] = r;
      this.save(lang, m);
      return r;
    },

    // Bulk-grade a sheet pass. marks = { [idx]: 'mastered'|'learning'|'new' }
    // — anything not 'new' is an attempt; 'learning' counts as a miss so the
    // character comes back tomorrow rather than in three weeks.
    recordPass(lang, marks, scores) {
      const m = this.load(lang);
      Object.keys(marks || {}).forEach((k) => {
        const state = marks[k];
        if (!state || state === 'new') return;
        const r = this.rec(lang, k, m);
        const ok = state === 'mastered';
        if (ok) { r.b = Math.min(MAX_BOX, (r.b || 0) + 1); r.c++; r.last = 'ok'; }
        else { r.b = 1; r.w++; r.last = 'miss'; }
        r.due = Date.now() + INTERVALS[r.b]; r.t = Date.now();
        const sc = scores && scores[k];
        if (typeof sc === 'number') r.best = Math.max(r.best || 0, Math.round(sc));
        m[k] = r;
      });
      this.save(lang, m);
      return m;
    },

    // Indices due for review, weakest box first, then longest overdue.
    dueList(lang, total) {
      const m = this.load(lang), now = Date.now(), out = [];
      for (let i = 0; i < total; i++) {
        const r = m[i];
        if (this.isDue(r, now)) out.push({ i, b: r.b, due: r.due });
      }
      out.sort((a, b) => a.b - b.b || a.due - b.due);
      return out.map((o) => o.i);
    },

    // Counts for the dashboard / progress screen.
    summary(lang, total) {
      const m = this.load(lang), now = Date.now();
      const s = { new: 0, learning: 0, mastered: 0, due: 0, boxes: [0, 0, 0, 0, 0, 0] };
      for (let i = 0; i < total; i++) {
        const r = m[i];
        s[this.mastery(r)]++;
        s.boxes[(r && r.b) || 0]++;
        if (this.isDue(r, now)) s.due++;
      }
      return s;
    },

    // When the next card comes back, as a short human string.
    nextDue(lang, total) {
      const m = this.load(lang), now = Date.now();
      let soonest = Infinity;
      for (let i = 0; i < total; i++) { const r = m[i]; if (r && r.b > 0 && r.due > now) soonest = Math.min(soonest, r.due); }
      if (soonest === Infinity) return null;
      const d = Math.ceil((soonest - now) / DAY);
      return d <= 1 ? 'tomorrow' : `in ${d} days`;
    },

    // One-time lift from the old {c,w}-only stats store, so existing users keep
    // their history instead of resetting to all-new. Deliberately conservative:
    // in the old "mark only your mistakes" model an unmarked cell counted as
    // correct even if the learner never wrote it, so a clean record is weak
    // evidence — it earns a low box and has to be re-earned from there.
    migrateFrom(lang, stats) {
      const m = this.load(lang);
      if (Object.keys(m).length || !stats) return m;
      Object.keys(stats).forEach((k) => {
        const st = stats[k], tries = (st.c || 0) + (st.w || 0);
        if (!tries) return;
        const rate = (st.c || 0) / tries;
        const b = rate === 1 ? (tries >= 5 ? 4 : tries >= 3 ? 3 : 2)
                : rate >= 0.7 ? 2 : 1;
        m[k] = { b, due: Date.now() + INTERVALS[b], c: st.c || 0, w: st.w || 0, last: rate >= 0.5 ? 'ok' : 'miss', best: 0 };
      });
      this.save(lang, m);
      return m;
    },

    reset(lang) { try { localStorage.removeItem(this.key(lang)); } catch (e) {} },
    INTERVALS, MAX_BOX,
  };

  // Presentation constants the UI shares, so mastery colours never drift apart.
  SRS.STATES = {
    new: { label: 'New', color: 'var(--text-muted)', icon: '○' },
    learning: { label: 'Learning', color: 'var(--warning, #f59e0b)', icon: '◐' },
    mastered: { label: 'Mastered', color: 'var(--success, #22c55e)', icon: '●' },
  };
  SRS.ORDER = ['new', 'learning', 'mastered'];
  SRS.next = (s) => SRS.ORDER[(SRS.ORDER.indexOf(s || 'new') + 1) % 3];

  window.ScripturaSRS = SRS;
})();
