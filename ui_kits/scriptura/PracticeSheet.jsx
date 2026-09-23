// PracticeSheet — a printable worksheet grouped by unit. One writable cell per
// character: a faint "ghost" glyph to trace (toggle), a romanized prompt (no
// answer shown), a canvas to write on, a Check button that scores the trace
// against the real glyph, and a 3-state mastery chip (new → learning →
// mastered). Cells open on what the Leitner scheduler already knows; ratings
// made this pass override that and are graded into the boxes on Save.

// Input hygiene (shared with DrawCanvas via window.__scripturaPenSeen): once a
// pen has been seen anywhere in the app, touch is rejected outright — a resting
// palm fires pointerdown and used to commit a one-point stroke, which redraw()
// rendered as a 4px filled dot. Before any pen is seen, touch is still allowed
// (finger writing) but a large contact patch is treated as palm, not ink.
const INK = '#1a1a25';
function acceptPointer(e) {
  if (e.pointerType === 'pen') { window.__scripturaPenSeen = true; return true; }
  if (!e.pointerType || e.pointerType === 'mouse') return true;
  if (window.__scripturaPenSeen) return false;
  return !((e.width || 0) > 35 || (e.height || 0) > 35);
}
// only pen/mouse may leave a deliberate dot; a stray one-point touch renders nothing
const mayDot = (e) => e.pointerType === 'pen' || !e.pointerType || e.pointerType === 'mouse';

function SheetCell({ idx, item, font, showGhost, status, accent, onCycle, big, inkStore, rev, locked, onScore, onInk, checkers }) {
  const canvasRef = React.useRef(null);
  const cellRef = React.useRef(null);
  const fitRef = React.useRef(null);
  const ctxRef = React.useRef(null);
  const dprRef = React.useRef(1);
  const drawing = React.useRef(false);
  const activeId = React.useRef(null); // pointer that owns the in-flight stroke
  // strokes live in the parent's inkStore (keyed by global char index) so the
  // grid cell and its focus-mode twin show the same ink
  const strokes = React.useRef(null);
  if (inkStore) strokes.current = inkStore[idx] || (inkStore[idx] = []); else if (!strokes.current) strokes.current = [];
  const raf = React.useRef(0);

  const getCtx = () => {
    if (!ctxRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = INK; ctx.fillStyle = INK;
      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0); // draw in CSS px, store at device px
      ctxRef.current = ctx;
    }
    return ctxRef.current;
  };

  // Ink is stored in a cell-independent frame: origin at the cell centre, unit =
  // the cell's shorter side. The grid cell and its focus-mode twin are very
  // different sizes and aspect ratios, so raw CSS px drawn in focus mode landed
  // outside the small grid canvas and looked like it had vanished on exit.
  // Normalising keeps the glyph centred and scaled to whichever cell shows it.
  const frame = () => {
    const cv = canvasRef.current, dpr = dprRef.current || 1;
    const w = cv ? cv.width / dpr : 1, h = cv ? cv.height / dpr : 1;
    return { cx: w / 2, cy: h / 2, s: Math.max(1, Math.min(w, h)), w, h };
  };
  const toPx = (p, f) => ({ x: f.cx + p.x * f.s, y: f.cy + p.y * f.s, w: Math.max(1.6, (p.w || 0.02) * f.s) });

  // draw only the segments added since the last flush
  const paint = (ctx, s) => {
    const f = frame();
    const pts = s.pts;
    if (pts.length === 1) {
      if (s.dot && !s.dotDrawn) { const p = toPx(pts[0], f); ctx.beginPath(); ctx.arc(p.x, p.y, p.w / 2, 0, Math.PI * 2); ctx.fill(); s.dotDrawn = true; }
      return;
    }
    for (let i = Math.max(1, (s.drawnUpTo || 0) + 1); i < pts.length; i++) {
      const a = toPx(pts[i - 1], f), b = toPx(pts[i], f);
      ctx.lineWidth = b.w;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    s.drawnUpTo = pts.length - 1;
  };

  // full repaint — reserved for clear / undo / resize, never for pointermove
  const redraw = React.useCallback(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = getCtx(); if (!ctx) return;
    ctx.clearRect(0, 0, cv.width / dprRef.current, cv.height / dprRef.current);
    for (const s of strokes.current) { s.drawnUpTo = 0; s.dotDrawn = false; paint(ctx, s); }
  }, []);

  // Back the canvas with devicePixelRatio pixels so strokes are crisp on retina /
  // Android panels, and re-fit whenever the cell resizes (focus mode, rotation,
  // breakpoint change) or the window moves to a screen with a different DPR.
  React.useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const fit = () => {
      const r = cv.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
      if (cv.width === w && cv.height === h && dprRef.current === dpr) return;
      cv.width = w; cv.height = h; dprRef.current = dpr;
      ctxRef.current = null; // resizing a canvas resets its context state
      redraw();
    };
    fit();
    fitRef.current = fit;
    let ro = null;
    // observe the cell wrapper, not the canvas: ResizeObserver does not report
    // box changes for replaced elements like <canvas> in every engine. RO is a
    // best-effort trigger only — start() re-fits on pointerdown, which is the
    // guarantee that the backing store is right at the moment ink is laid down.
    if (window.ResizeObserver && cellRef.current) { ro = new ResizeObserver(fit); ro.observe(cellRef.current); }
    window.addEventListener('resize', fit);
    return () => { fitRef.current = null; if (ro) ro.disconnect(); window.removeEventListener('resize', fit); };
  }, [redraw, big]);
  // parent bumps rev when ink may have changed elsewhere (focus-mode exit, save)
  React.useEffect(() => { redraw(); }, [redraw, rev]);

  const flush = () => {
    raf.current = 0;
    const ctx = getCtx(); if (!ctx) return;
    const s = strokes.current[strokes.current.length - 1];
    if (s) paint(ctx, s);
  };
  const schedule = () => { if (!raf.current) raf.current = requestAnimationFrame(flush); };
  React.useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  const pos = (e) => {
    const cv = canvasRef.current;
    const r = cv.getBoundingClientRect();
    const px = (e.pressure && e.pressure > 0 && e.pointerType === 'pen') ? 2 + e.pressure * 6 : 4;
    const f = frame();
    // normalised frame (see frame()); round to keep the persisted log small
    const q = (n) => Math.round(n * 1000) / 1000;
    return { x: q((e.clientX - r.left - f.cx) / f.s), y: q((e.clientY - r.top - f.cy) / f.s), w: q(px / f.s) };
  };
  const start = (e) => {
    if (e.button && e.button !== 0) return;
    if (!acceptPointer(e)) return; // palm / stray touch — no preventDefault, no stroke
    e.preventDefault();
    if (fitRef.current) fitRef.current(); // layout may have changed since the last refit
    try { canvasRef.current.setPointerCapture(e.pointerId); } catch (err) {}
    drawing.current = true; activeId.current = e.pointerId;
    strokes.current.push({ pts: [pos(e)], dot: mayDot(e), drawnUpTo: 0, dotDrawn: false });
  };
  const move = (e) => {
    if (!drawing.current || e.pointerId !== activeId.current) return;
    if (!acceptPointer(e)) return;
    e.preventDefault();
    const evs = (e.nativeEvent && e.nativeEvent.getCoalescedEvents) ? e.nativeEvent.getCoalescedEvents() : null;
    const s = strokes.current[strokes.current.length - 1]; if (!s) return;
    if (evs && evs.length) evs.forEach((ce) => s.pts.push(pos(ce))); else s.pts.push(pos(e));
    schedule();
  };
  const end = (e) => {
    if (!drawing.current || e.pointerId !== activeId.current) return; // palm lifting mid-glyph
    if (onInk) onInk();
    drawing.current = false; activeId.current = null;
    try { canvasRef.current.releasePointerCapture(e.pointerId); } catch (err) {}
    const ctx = getCtx(); const s = strokes.current[strokes.current.length - 1];
    if (ctx && s) paint(ctx, s);
  };

  // one finger draws, two fingers scroll (see DrawCanvas.jsx for rationale)
  React.useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const onTS = (e) => {
      if (e.touches.length > 1 && drawing.current) { drawing.current = false; activeId.current = null; strokes.current.pop(); redraw(); }
    };
    const onTM = (e) => { if (e.touches.length === 1 && drawing.current) e.preventDefault(); };
    cv.addEventListener('touchstart', onTS, { passive: true });
    cv.addEventListener('touchmove', onTM, { passive: false });
    return () => { cv.removeEventListener('touchstart', onTS); cv.removeEventListener('touchmove', onTM); };
  }, [redraw]);
  const clear = (e) => { e.stopPropagation(); strokes.current.length = 0; redraw(); setFb(null); if (onInk) onInk(); };

  // --- trace feedback: score the ink against the real glyph, then self-grade ---
  const [fb, setFb] = React.useState(null);
  const Trace = window.ScripturaTrace;
  // silent=true is the Check-all path: an empty cell is skipped quietly instead
  // of showing "Write the character first" on every blank cell of the sheet.
  // Returns 'mastered' | 'learning' | null so the caller can tally the pass.
  const runCheck = (silent) => {
    const cvEl = canvasRef.current;
    if (!Trace || !cvEl) return null;
    // scorer wants CSS px in a w×h box — convert out of the normalised frame
    const f = frame();
    const px = strokes.current.map((s) => ({ pts: s.pts.map((p) => toPx(p, f)) }));
    const res = Trace.score(px, item.char, font, f.w, f.h);
    if (!res) { if (!silent) setFb({ score: null, hint: 'Write the character first.', verdict: 'none' }); return null; }
    setFb(res);
    // a confident match promotes the cell; anything else drops it to learning
    if (onScore) onScore(idx, res);
    return res.verdict === 'good' ? 'mastered' : 'learning';
  };
  const check = (e) => { e.stopPropagation(); runCheck(false); };
  // register with the sheet so Check all can reach this cell; focus-mode twins
  // register under their own key so a focus Check all scores only that row
  const runRef = React.useRef(runCheck); runRef.current = runCheck;
  React.useEffect(() => {
    if (!checkers) return;
    const key = (big ? 'f' : 'g') + idx, fn = (silent) => runRef.current(silent);
    checkers[key] = fn;
    return () => { if (checkers[key] === fn) delete checkers[key]; };
  }, [checkers, idx, big]);
  React.useEffect(() => { setFb(null); }, [rev]);

  const SRS = window.ScripturaSRS;
  const state = status || 'new';
  const st = (SRS && SRS.STATES[state]) || { color: 'var(--text-muted)', icon: '○', label: 'New' };
  const bg = state === 'mastered' ? 'color-mix(in oklab, var(--cell-complete) 45%, #fff)'
           : state === 'learning' ? 'color-mix(in oklab, var(--cell-incorrect) 40%, #fff)'
           : 'var(--cell-empty)';

  return (
    <div ref={cellRef} className={'sheet-cell' + (big ? ' sheet-cell-focus' : '')} style={{ position: 'relative', background: bg, borderRight: '1px solid #d2d2de',
                  borderBottom: '1px solid #d2d2de', overflow: 'hidden' }}>
      {/* romanized prompt only — the character itself is hidden (no answer).
          Dark ink, not the unit accent: these cells are light/tinted paper, so
          an 11px accent-coloured label failed contrast on every tint. The
          accent lives in the left rule instead. */}
      <div style={{ position: 'absolute', top: 6, left: 8, zIndex: 3, display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'lowercase',
                    color: '#23232f', fontFamily: 'var(--font-ui)' }}>
        <span aria-hidden="true" style={{ width: 3, height: '0.85em', borderRadius: 2, background: accent, flexShrink: 0 }} />
        {item.roman}
      </div>
      {showGhost && (
        <div className="sheet-ghost" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: font, fontSize: big ? 'min(22vh, 9rem)' : undefined, color: 'rgba(150,150,165,0.28)', pointerEvents: 'none', userSelect: 'none' }}>{item.char}</div>
      )}
      <canvas ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'pan-x pan-y pinch-zoom', userSelect: 'none', WebkitUserSelect: 'none', zIndex: 2, pointerEvents: locked ? 'none' : 'auto' }}
        onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} />
      {/* Score badge + tools share ONE bottom-anchored flex column, so the badge
          always sits a gap above the buttons whatever height they take (26px on
          a precise pointer, 44px on touch and in focus mode). */}
      <div className="sheet-foot sheet-noprint" style={{ position: 'absolute', left: 6, right: 6, bottom: 6, zIndex: 4,
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, pointerEvents: 'none' }}>
        {fb && (
          <div onClick={(e) => e.stopPropagation()}
            style={{ alignSelf: 'stretch', padding: '5px 7px', borderRadius: 6, pointerEvents: 'auto',
                     background: 'rgba(255,255,255,0.96)', border: `1px solid ${Trace ? Trace.color(fb.score) : '#ccc'}`,
                     fontFamily: 'var(--font-ui)', textAlign: 'left' }}>
            {fb.score != null && (
              <div style={{ fontSize: 13, fontWeight: 700, color: Trace.color(fb.score), fontVariantNumeric: 'tabular-nums' }}>{fb.score}% match</div>
            )}
            <div style={{ fontSize: 10, color: '#3a3a48', lineHeight: 1.3, textWrap: 'pretty' }}>{fb.hint}</div>
          </div>
        )}
        <div className="sheet-tools" style={{ display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'auto' }}>
          <button type="button" onClick={clear} title="Clear cell" aria-label="Clear cell" className="sheet-clear"
            style={{ borderRadius: 6, cursor: 'pointer', background: 'rgba(255,255,255,0.92)', border: '1px solid #c9c9d6',
                     color: '#3a3a48', fontSize: 13, lineHeight: 1, display: 'grid', placeItems: 'center' }}>↺</button>
          <button type="button" onClick={check} title="Check my trace" className="sheet-check"
            style={{ borderRadius: 6, cursor: 'pointer', background: 'rgba(255,255,255,0.94)', border: '1px solid #c9c9d6',
                     color: '#23232f', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-ui)',
                     display: 'grid', placeItems: 'center' }}>Check</button>
        </div>
      </div>
      {/* 3-state mastery chip: new → learning → mastered */}
      <button type="button" onClick={(e) => { e.stopPropagation(); onCycle(idx); }} title={`${st.label} — tap to change`} aria-label={`Mastery: ${st.label}`}
        className="sheet-mastery"
        style={{ position: 'absolute', top: 6, right: 6, zIndex: 4, borderRadius: 6, cursor: 'pointer',
                 display: 'grid', placeItems: 'center', fontWeight: 700, fontFamily: 'var(--font-ui)',
                 border: state === 'new' ? '2px solid #b9b9c6' : 'none', color: state === 'new' ? '#8a8a99' : '#fff',
                 background: state === 'mastered' ? 'var(--success, #22c55e)' : state === 'learning' ? 'var(--warning, #f59e0b)' : 'rgba(255,255,255,0.9)' }}>
        {st.icon}
      </button>
    </div>
  );
}

function PracticeSheet({ lang, theme, onSaved }) {
  const { Card, Toggle, Button } = window.ScripturaDesignSystem_72b484;
  const SRS = window.ScripturaSRS;
  const T = theme || { color: '#f59e0b', color2: '#d97706' };
  const storeKey = `scriptura.sheet.${lang.id}`;
  const [showGhost, setShowGhost] = React.useState(false);
  const [focusRow, setFocusRow] = React.useState(null); // index into rows[] while in focus mode
  const [penOn, setPenOn] = React.useState(true); // touch devices: off lets one finger scroll the page
  const [saved, setSaved] = React.useState('');
  // Grade automatically: on = Check sets the chip from the score; off = Check
  // only shows the score and the learner sets every chip by hand.
  const [autoGrade, setAutoGradeRaw] = React.useState(() => { try { return localStorage.getItem('scriptura.autoGrade') !== '0'; } catch (e) { return true; } });
  const setAutoGrade = (v) => { setAutoGradeRaw(v); try { localStorage.setItem('scriptura.autoGrade', v ? '1' : '0'); } catch (e) {} };
  // Check all: every mounted cell registers a scorer here (see SheetCell)
  const checkers = React.useRef({}).current;
  const [checkSum, setCheckSum] = React.useState(null); // { scope, mastered, learning, skipped }
  const checkAll = (scope) => {
    const prefix = scope === 'focus' ? 'f' : 'g';
    const tally = { scope, mastered: 0, learning: 0, skipped: 0 };
    Object.keys(checkers).filter((k) => k[0] === prefix).forEach((k) => {
      const r = checkers[k](true);
      if (r) tally[r]++; else tally.skipped++;
    });
    setCheckSum(tally);
  };
  // Clear all / Clear row: wipes INK and score badges only — mastery ratings
  // stay, so clearing to have another go never throws away what you rated.
  // Two-tap confirm, because a whole sheet of handwriting is easy to lose.
  const [armed, setArmed] = React.useState(null); // 'grid' | 'focus' | null
  const armTimer = React.useRef(0);
  React.useEffect(() => () => clearTimeout(armTimer.current), []);
  const clearInk = (scope, idxs) => {
    if (armed !== scope) {
      setArmed(scope);
      clearTimeout(armTimer.current);
      armTimer.current = setTimeout(() => setArmed(null), 3000);
      return;
    }
    clearTimeout(armTimer.current); setArmed(null);
    (idxs || Object.keys(inkStore.current)).forEach((i) => { const a = inkStore.current[i]; if (a) a.length = 0; });
    Object.keys(scores.current).forEach((i) => { if (!idxs || idxs.includes(+i)) delete scores.current[i]; });
    setCheckSum(null);
    setInkRev((r) => r + 1); // mounted cells repaint and drop their badges
    persistInk();
  };
  // idx -> strokes[], shared by grid and focus cells, and persisted per language
  // so ink survives leaving the sheet, switching screens, or a reload. It is
  // wiped only by Save results (the pass is over) or per-cell Clear.
  const inkKey = `scriptura.ink.${lang.id}`;
  const loadInk = (k) => {
    try {
      const raw = JSON.parse(localStorage.getItem(k) || '{}');
      const out = {};
      Object.keys(raw).forEach((i) => { out[i] = (raw[i] || []).map((pts) => ({ pts, dot: pts.length === 1, drawnUpTo: 0, dotDrawn: false })); });
      return out;
    } catch (e) { return {}; }
  };
  const inkStore = React.useRef(null);
  if (!inkStore.current) inkStore.current = loadInk(inkKey);
  const [inkRev, setInkRev] = React.useState(0); // bump to make mounted cells repaint from the store
  const inkTimer = React.useRef(0);
  const persistInk = React.useCallback(() => {
    clearTimeout(inkTimer.current);
    inkTimer.current = setTimeout(() => {
      const out = {};
      Object.keys(inkStore.current).forEach((i) => { const a = inkStore.current[i]; if (a && a.length) out[i] = a.map((s) => s.pts); });
      try { if (Object.keys(out).length) localStorage.setItem(inkKey, JSON.stringify(out)); else localStorage.removeItem(inkKey); } catch (e) {}
    }, 250);
  }, [inkKey]);
  React.useEffect(() => () => clearTimeout(inkTimer.current), []);
  const wipeInk = () => { Object.values(inkStore.current).forEach((a) => { a.length = 0; }); setInkRev((r) => r + 1); persistInk(); };
  const [marks, setMarks] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(storeKey) || '{}'); } catch (e) { return {}; }
  });
  const scores = React.useRef({}); // idx -> trace score for this pass
  // Leitner state for the language, so the header can report what is due.
  const [srsRev, setSrsRev] = React.useState(0);
  React.useEffect(() => {
    if (SRS) SRS.migrateFrom(lang.id, window.ProgressStore.load(lang.id)); // one-time lift from {c,w} stats
    setSrsRev((r) => r + 1);
  }, [lang.id]);
  const srsMap = React.useMemo(() => (SRS ? SRS.load(lang.id) : {}), [lang.id, srsRev, saved]);
  const srs = React.useMemo(() => (SRS ? SRS.summary(lang.id, lang.allChars.length) : null), [lang.id, srsRev, saved]);
  const nextDue = React.useMemo(() => (SRS ? SRS.nextDue(lang.id, lang.allChars.length) : null), [lang.id, srsRev, saved]);
  // A cell shows what the scheduler knows about it, with this pass's rating
  // taking precedence — so a returning learner opens the sheet on their real
  // mastery instead of a screen full of "new".
  const stateOf = (idx) => (Object.prototype.hasOwnProperty.call(marks, idx)
    ? marks[idx]
    : (SRS ? SRS.mastery(srsMap[idx]) : 'new'));

  React.useEffect(() => {
    // language changed: refill the store IN PLACE from that language's saved ink
    // (never reassign it — mounted cells hold references into it)
    const fresh = loadInk(inkKey);
    Object.keys(inkStore.current).forEach((i) => { inkStore.current[i].length = 0; });
    Object.keys(fresh).forEach((i) => {
      if (!inkStore.current[i]) inkStore.current[i] = [];
      inkStore.current[i].push(...fresh[i]);
    });
    setInkRev((r) => r + 1);
    scores.current = {};
    setMarks(() => { try { return JSON.parse(localStorage.getItem(storeKey) || '{}'); } catch (e) { return {}; } });
  }, [storeKey]);

  // A pass rating is stored for ALL THREE states, including 'new'. Absence of a
  // key means "no rating this pass" — which is what lets stateOf fall back to
  // the scheduler — so 'new' must be an explicit override, not a deletion.
  const setMark = (idx, state) => {
    setMarks((prev) => {
      const next = { ...prev };
      if (!state) delete next[idx]; else next[idx] = state;
      try { localStorage.setItem(storeKey, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };
  // tap the chip to walk new → learning → mastered → new, starting from what the cell shows
  const cycle = (idx) => setMark(idx, SRS ? SRS.next(stateOf(idx)) : (stateOf(idx) === 'learning' ? 'mastered' : 'learning'));
  // Check button scored the cell — record the score, and (unless the learner
  // grades by hand) set the state it earned. Same threshold the badge uses for
  // "Clean match", so text and chip agree.
  const onScore = (idx, res) => {
    scores.current[idx] = res.score;
    if (autoGrade) setMark(idx, res.verdict === 'good' ? 'mastered' : 'learning');
  };
  // Record this sheet pass: Leitner boxes advance, and the legacy {c,w} store
  // (heatmap + cloud sync) gets ONLY the cells actually rated — untouched cells
  // are untouched, not silently counted as correct.
  const saveResults = async () => {
    if (SRS) SRS.recordPass(lang.id, marks, scores.current);
    window.ProgressStore.recordRated(lang.id, marks);
    setSaved('saving');
    let cloud = false;
    if (window.ScripturaCloud && window.ScripturaCloud.isConfigured()) {
      const stats = window.ProgressStore.load(lang.id);
      const res = await window.ScripturaCloud.saveStats(lang.id, stats, (i) => lang.allChars[i] && lang.allChars[i].char);
      cloud = res && res.ok;
    }
    // clear this pass's marks so the next round starts fresh
    try { localStorage.removeItem(storeKey); } catch (e) {}
    setMarks({});
    scores.current = {};
    wipeInk();
    setSrsRev((r) => r + 1);
    setSaved(cloud ? 'synced' : 'local');
    if (onSaved) onSaved(cloud ? 'on' : 'off');
    setTimeout(() => setSaved(''), 2600);
  };

  const total = lang.allChars.length;
  const counts = { new: 0, learning: 0, mastered: 0 };
  for (let i = 0; i < total; i++) counts[stateOf(i)]++;
  const rated = Object.keys(marks).length;
  const pct = total ? Math.round((counts.mastered / total) * 100) : 0;

  // global index offset per unit (allChars order matches units order)
  let offset = 0;
  const blocks = lang.units.map((unit) => { const start = offset; offset += unit.chars.length; return { unit, start }; });

  // Focus mode walks the sheet one grid row at a time. A row is 5 slots wide —
  // the canonical varga row for the Indic grids — so each step is one
  // articulation series rather than an arbitrary chunk.
  const ROW = 5;
  const rows = [];
  blocks.forEach(({ unit, start }) => {
    const slots = unit.slots || unit.chars.map((_, i) => i);
    for (let i = 0; i < slots.length; i += ROW) rows.push({ unit, start, slots: slots.slice(i, i + ROW), n: Math.floor(i / ROW) });
  });
  const inFocus = focusRow != null && rows[focusRow];
  const exitFocus = () => { setFocusRow(null); setInkRev((r) => r + 1); };
  const step = React.useCallback((d) => setFocusRow((i) => (i == null ? i : Math.min(rows.length - 1, Math.max(0, i + d)))), [rows.length]);

  React.useEffect(() => {
    if (focusRow == null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') exitFocus();
      else if ((e.key === 'g' || e.key === 'G') && !e.metaKey && !e.ctrlKey) setShowGhost((v) => !v);
      else if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); step(1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); step(-1); }
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [focusRow, step]);

  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      {/* themed header */}
      <div className="sheet-noprint" style={{ padding: 'var(--space-6)',
                    backgroundImage: `radial-gradient(ellipse at 100% 0%, ${T.color}26 0%, transparent 60%)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-lg)', fontWeight: 700, whiteSpace: 'nowrap' }}>
              <window.Icon name="sheet" size={20} style={{ color: T.color }} /> {lang.name} practice sheet
            </div>
            <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', marginTop: 2 }}>
              Write each character from its sound, tap <b>Check</b> to score your trace, then set how well you know it.
            </div>
            <div className="scroll-hint" style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-tertiary, var(--text-secondary))', marginTop: 4 }}>
              One finger writes · two fingers scroll · or tap Scroll below
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center', flexWrap: 'wrap' }}>
            <Toggle checked={showGhost} onChange={setShowGhost} label="Ghost" />
            <Toggle checked={autoGrade} onChange={setAutoGrade} label="Grade automatically" />
            <Button variant="secondary" icon={<window.Icon name="check" size={16} />} onClick={() => checkAll('grid')}>Check all</Button>
            <Button variant="secondary" icon={<window.Icon name="eraser" size={16} />} onClick={() => clearInk('grid')}
              style={armed === 'grid' ? { borderColor: 'var(--error)', color: 'var(--error)' } : undefined}>
              {armed === 'grid' ? 'Tap again to clear' : 'Clear all'}
            </Button>
            <Button variant="secondary" icon={<window.Icon name="focus" size={16} />} onClick={() => setFocusRow(0)}>Focus</Button>
            <Button variant="secondary" icon={<window.Icon name="printer" size={16} />} onClick={() => window.print()}>Print</Button>
            <Button accent="practice" icon={<window.Icon name={saved === 'synced' ? 'cloud' : 'check'} size={16} />} onClick={saveResults}>
              {saved === 'saving' ? 'Saving…' : saved === 'synced' ? 'Saved · synced' : saved === 'local' ? 'Saved' : 'Save results'}
            </Button>
          </div>
        </div>
        {/* progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-5)' }}>
          <div style={{ flex: 1, height: 10, borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, borderRadius: 'var(--radius-full)',
                          background: `linear-gradient(135deg, ${T.color}, ${T.color2})`, transition: 'width var(--dur-base) var(--ease)' }} />
          </div>
          <span style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            <b style={{ color: 'var(--success)' }}>{counts.mastered}</b> mastered · <b style={{ color: 'var(--warning, #f59e0b)' }}>{counts.learning}</b> learning · {counts.new} untouched
          </span>
        </div>
        {/* Leitner status for the language — what is due and when, not the raw boxes */}
        {srs && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-4)', flexWrap: 'wrap',
                        fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)' }}>
            <span>
              <b style={{ color: srs.due ? 'var(--warning, #f59e0b)' : 'var(--text-secondary)' }}>{srs.due}</b> due for review now
            </span>
            {nextDue && <><span aria-hidden="true">·</span><span>next back {nextDue}</span></>}
            {rated > 0 && <><span aria-hidden="true">·</span><span><b>{rated}</b> rated this pass</span></>}
          </div>
        )}
        {checkSum && checkSum.scope === 'grid' && (
          <div role="status" style={{ marginTop: 'var(--space-3)', fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)' }}>
            {checkSum.mastered + checkSum.learning === 0
              ? 'Nothing to check yet — write in a few cells first.'
              : <>Checked <b style={{ color: 'var(--text-primary)' }}>{checkSum.mastered + checkSum.learning}</b> · <b style={{ color: 'var(--success)' }}>{checkSum.mastered}</b> clean · <b style={{ color: 'var(--warning, #f59e0b)' }}>{checkSum.learning}</b> to redo · {checkSum.skipped} blank skipped{autoGrade ? '' : ' · chips unchanged, set them by hand'}</>}
          </div>
        )}
      </div>

      {/* unit-grouped grid */}
      <div id="sheetPrintArea">
        {blocks.map(({ unit, start }) => {
          const acc = `var(--accent-${unit.accent})`;
          const uc = unit.chars.filter((_, i) => stateOf(start + i) === 'mastered').length;
          return (
            <div key={unit.id} className="sheet-unit">
              <div className="sheet-unit-head" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: '0.5rem var(--space-6)',
                            background: `linear-gradient(90deg, ${acc}, transparent)`, color: '#fff', flexWrap: 'nowrap' }}>
                <span style={{ fontWeight: 700, fontSize: 'var(--fs-small)', whiteSpace: 'nowrap' }}>{unit.title}</span>
                <span style={{ fontSize: 'var(--fs-hint)', opacity: 0.9, fontFamily: unit.font, whiteSpace: 'nowrap' }}>{unit.subtitle}</span>
                <span style={{ marginLeft: 'auto', fontSize: 'var(--fs-hint)', opacity: 0.95 }}>{uc}/{unit.chars.length}</span>
              </div>
              <div className="sheet-grid" style={{ display: 'grid', background: '#fff', borderLeft: '1px solid #d2d2de' }}>
                {(unit.slots || unit.chars.map((_, i) => i)).map((ci, i) => (
                  ci == null ? (
                    <div key={'blank' + i} aria-hidden="true" className="sheet-blank"
                      style={{ borderRight: '1px solid #d2d2de', borderBottom: '1px solid #d2d2de', background: '#f7f7fb' }} />
                  ) : (
                    <SheetCell key={ci} idx={start + ci} item={unit.chars[ci]} font={lang.font} showGhost={showGhost}
                      status={stateOf(start + ci)} accent={acc} onCycle={cycle} inkStore={inkStore.current} rev={inkRev} locked={!penOn}
                      onScore={onScore} onInk={persistInk} checkers={checkers} />
                  )
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!inFocus && (
        <button type="button" onClick={() => setPenOn((v) => !v)} className="touch-only sheet-noprint"
          style={{ position: 'fixed', right: 14, bottom: 'calc(70px + env(safe-area-inset-bottom) + 14px)', zIndex: 120,
                   alignItems: 'center', gap: 8, padding: '10px 16px', minHeight: 44, cursor: 'pointer',
                   borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-color)',
                   fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-small)', fontWeight: 700,
                   background: penOn ? `linear-gradient(135deg, ${T.color}, ${T.color2})` : 'var(--bg-elevated, var(--bg-card))',
                   color: penOn ? '#fff' : 'var(--text-primary)', boxShadow: 'var(--shadow-lg, 0 8px 24px rgba(0,0,0,.35))' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <window.Icon name={penOn ? 'pen' : 'hand'} size={16} />{penOn ? 'Writing' : 'Scrolling'}
          </span>
        </button>
      )}
      {inFocus && (
        <div className="sheet-noprint" style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'var(--bg-primary)',
                      display: 'flex', flexDirection: 'column', paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-4) var(--space-5)',
                        borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 'var(--fs-base)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inFocus.unit.title}</div>
              <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Row {focusRow + 1} of {rows.length} · ← → to move · G ghost · Esc to exit</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <Toggle checked={showGhost} onChange={setShowGhost} label="Ghost" />
              <Button variant="secondary" icon={<window.Icon name="x" size={16} />} onClick={exitFocus}>Exit</Button>
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'stretch', justifyContent: 'center', padding: 'var(--space-5)' }}>
            <div className="sheet-focus-row" style={{ display: 'grid', background: '#fff', width: '100%', height: '100%',
                          borderLeft: '1px solid #d2d2de', borderTop: '1px solid #d2d2de', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              {inFocus.slots.map((ci, i) => (
                ci == null ? (
                  <div key={'fblank' + i} aria-hidden="true" className="sheet-blank"
                    style={{ borderRight: '1px solid #d2d2de', borderBottom: '1px solid #d2d2de', background: '#f7f7fb' }} />
                ) : (
                  <SheetCell key={'f' + focusRow + '-' + ci} idx={inFocus.start + ci} item={inFocus.unit.chars[ci]} font={lang.font}
                    showGhost={showGhost} status={stateOf(inFocus.start + ci)} accent={`var(--accent-${inFocus.unit.accent})`} onCycle={cycle} big
                    inkStore={inkStore.current} rev={inkRev} onScore={onScore} onInk={persistInk} checkers={checkers} />
                )
              ))}
            </div>
          </div>
          {/* Named grid areas: one line on wide screens (prev · tools · dots · next);
              ≤640px the tools take their own row above prev · dots · next, so no
              button is ever pushed off-screen. See .focus-foot in index.html. */}
          <div className="focus-foot" style={{ padding: 'var(--space-4) var(--space-5)', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ gridArea: 'prev' }}>
              <Button variant="secondary" icon={<window.Icon name="arrow" size={16} style={{ transform: 'scaleX(-1)' }} />} onClick={() => step(-1)} disabled={focusRow === 0}>Prev</Button>
            </div>
            <div style={{ gridArea: 'tools', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', minWidth: 0 }}>
              <Button variant="secondary" icon={<window.Icon name="check" size={16} />} onClick={() => checkAll('focus')}>Check row</Button>
              <Button variant="secondary" icon={<window.Icon name="eraser" size={16} />}
                onClick={() => clearInk('focus', inFocus.slots.filter((ci) => ci != null).map((ci) => inFocus.start + ci))}
                style={armed === 'focus' ? { borderColor: 'var(--error)', color: 'var(--error)' } : undefined}>
                {armed === 'focus' ? 'Tap again' : 'Clear row'}
              </Button>
            </div>
            <div style={{ gridArea: 'dots', display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', minWidth: 0 }}>
              {rows.map((r, i) => (
                <button key={i} type="button" onClick={() => setFocusRow(i)} aria-label={`Row ${i + 1}`}
                  style={{ width: i === focusRow ? 20 : 8, height: 8, padding: 0, borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer',
                           background: i === focusRow ? `var(--accent-${r.unit.accent})` : 'var(--border-color)',
                           transition: 'width var(--dur-fast, .15s) var(--ease)' }} />
              ))}
            </div>
            <div style={{ gridArea: 'next', justifySelf: 'end' }}>
            {focusRow === rows.length - 1
              ? <Button accent="practice" icon={<window.Icon name="check" size={16} />} onClick={exitFocus}>Done</Button>
              : <Button accent="practice" icon={<window.Icon name="arrow" size={16} />} onClick={() => step(1)}>Next</Button>}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
window.PracticeSheet = PracticeSheet;
