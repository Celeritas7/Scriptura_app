// PracticeSheet — a printable worksheet grouped by unit. One writable cell per
// character: a faint "ghost" glyph to trace (toggle), a romanized prompt (no
// answer shown), a small canvas to write on, and a checkbox that cycles
// unrated → correct → wrong. Marks persist to localStorage in a Supabase-ready
// shape — see cycle()/pushToBackend().

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

function SheetCell({ idx, item, font, showGhost, status, accent, onCycle, big, inkStore, rev }) {
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

  // draw only the segments added since the last flush
  const paint = (ctx, s) => {
    const pts = s.pts;
    if (pts.length === 1) {
      if (s.dot && !s.dotDrawn) { ctx.beginPath(); ctx.arc(pts[0].x, pts[0].y, (pts[0].w || 4) / 2, 0, Math.PI * 2); ctx.fill(); s.dotDrawn = true; }
      return;
    }
    for (let i = Math.max(1, s.drawnUpTo + 1); i < pts.length; i++) {
      ctx.lineWidth = pts[i].w || 4;
      ctx.beginPath(); ctx.moveTo(pts[i - 1].x, pts[i - 1].y); ctx.lineTo(pts[i].x, pts[i].y); ctx.stroke();
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
    const w = (e.pressure && e.pressure > 0 && e.pointerType === 'pen') ? 2 + e.pressure * 6 : 4;
    return { x: e.clientX - r.left, y: e.clientY - r.top, w }; // CSS px; the ctx transform handles DPR
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
  const clear = (e) => { e.stopPropagation(); strokes.current.length = 0; redraw(); };

  const bg = status === 'wrong' ? 'var(--cell-incorrect)' : 'var(--cell-empty)';

  return (
    <div ref={cellRef} className={'sheet-cell' + (big ? ' sheet-cell-focus' : '')} style={{ position: 'relative', background: bg, borderRight: '1px solid #d2d2de',
                  borderBottom: '1px solid #d2d2de', overflow: 'hidden' }}>
      {/* romanized prompt only — the character itself is hidden (no answer) */}
      <div style={{ position: 'absolute', top: 6, left: 8, zIndex: 3, fontSize: '0.72rem', fontWeight: 700,
                    letterSpacing: '0.04em', textTransform: 'lowercase', color: accent, fontFamily: 'var(--font-ui)' }}>{item.roman}</div>
      {showGhost && (
        <div className="sheet-ghost" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: font, fontSize: big ? 'min(22vh, 9rem)' : undefined, color: 'rgba(150,150,165,0.28)', pointerEvents: 'none', userSelect: 'none' }}>{item.char}</div>
      )}
      <canvas ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'pan-x pan-y pinch-zoom', userSelect: 'none', WebkitUserSelect: 'none', zIndex: 2 }}
        onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} />
      <button type="button" onClick={clear} title="Clear cell" className="sheet-clear sheet-noprint"
        style={{ position: 'absolute', bottom: 6, left: 6, zIndex: 4, width: 22, height: 22, borderRadius: 5, cursor: 'pointer',
                 background: 'rgba(0,0,0,0.08)', border: 'none', color: '#666', fontSize: 12 }}>↺</button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onCycle(idx); }} title="Mark as wrong"
        style={{ position: 'absolute', top: 6, right: 6, zIndex: 4, width: 26, height: 26, borderRadius: 6, cursor: 'pointer',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff',
                 border: status === 'wrong' ? 'none' : '2px solid #b9b9c6',
                 background: status === 'wrong' ? 'var(--error)' : 'rgba(255,255,255,0.9)' }}>
        {status === 'wrong' ? '✗' : ''}
      </button>
    </div>
  );
}

function PracticeSheet({ lang, theme, onSaved }) {
  const { Card, Toggle, Button } = window.ScripturaDesignSystem_72b484;
  const T = theme || { color: '#f59e0b', color2: '#d97706' };
  const storeKey = `scriptura.sheet.${lang.id}`;
  const [showGhost, setShowGhost] = React.useState(false);
  const [focusRow, setFocusRow] = React.useState(null); // index into rows[] while in focus mode
  const [saved, setSaved] = React.useState('');
  const inkStore = React.useRef({}); // idx -> strokes[], shared by grid and focus cells
  const [inkRev, setInkRev] = React.useState(0); // bump to make mounted cells repaint from the store
  const wipeInk = () => { Object.values(inkStore.current).forEach((a) => { a.length = 0; }); setInkRev((r) => r + 1); };
  const [marks, setMarks] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(storeKey) || '{}'); } catch (e) { return {}; }
  });

  React.useEffect(() => {
    wipeInk(); // empty the store in place — never reassign it, mounted cells hold references into it
    setMarks(() => { try { return JSON.parse(localStorage.getItem(storeKey) || '{}'); } catch (e) { return {}; } });
  }, [storeKey]);

  const cycle = (idx) => {
    setMarks((prev) => {
      const cur = prev[idx];
      const nextStatus = cur === 'wrong' ? null : 'wrong';
      const next = { ...prev };
      if (nextStatus) next[idx] = nextStatus; else delete next[idx];
      try { localStorage.setItem(storeKey, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };
  // Record this sheet pass into the local stats store (and Supabase if configured).
  const saveResults = async () => {
    window.ProgressStore.recordPass(lang.id, total, marks);
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
    wipeInk();
    setSaved(cloud ? 'synced' : 'local');
    if (onSaved) onSaved(cloud ? 'on' : 'off');
    setTimeout(() => setSaved(''), 2600);
  };

  const total = lang.allChars.length;
  const wrong = Object.values(marks).filter((v) => v === 'wrong').length;
  const correct = total - wrong;
  const pct = Math.round((correct / total) * 100);

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
            <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, whiteSpace: 'nowrap' }}>📝 {lang.name} Practice Sheet</div>
            <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', marginTop: 2 }}>
              Write each character from its sound — only mark the ones you got wrong (✗).
            </div>
            <div className="scroll-hint" style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-tertiary, var(--text-secondary))', marginTop: 4 }}>
              One finger writes · two fingers scroll the page
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center', flexWrap: 'wrap' }}>
            <Toggle checked={showGhost} onChange={setShowGhost} label="Ghost" />
            <Button variant="secondary" icon="◎" onClick={() => setFocusRow(0)}>Focus</Button>
            <Button variant="secondary" icon="🖨️" onClick={() => window.print()}>Print</Button>
            <Button accent="practice" icon="✓" onClick={saveResults}>
              {saved === 'saving' ? 'Saving…' : saved === 'synced' ? 'Saved · synced ☁️' : saved === 'local' ? 'Saved ✓' : 'Save results'}
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
            <b style={{ color: 'var(--success)' }}>{correct}</b> correct · <b style={{ color: 'var(--error)' }}>{wrong}</b> redo · {total} total
          </span>
        </div>
      </div>

      {/* unit-grouped grid */}
      <div id="sheetPrintArea">
        {blocks.map(({ unit, start }) => {
          const acc = `var(--accent-${unit.accent})`;
          const uc = unit.chars.length - unit.chars.filter((_, i) => marks[start + i] === 'wrong').length;
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
                      status={marks[start + ci]} accent={acc} onCycle={cycle} inkStore={inkStore.current} rev={inkRev} />
                  )
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {inFocus && (
        <div className="sheet-noprint" style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'var(--bg-primary)',
                      display: 'flex', flexDirection: 'column', paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-4) var(--space-5)',
                        borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 'var(--fs-base)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inFocus.unit.title}</div>
              <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Row {focusRow + 1} of {rows.length} · ← → to move · Esc to exit</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <Toggle checked={showGhost} onChange={setShowGhost} label="Ghost" />
              <Button variant="secondary" icon="✕" onClick={exitFocus}>Exit</Button>
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
                    showGhost={showGhost} status={marks[inFocus.start + ci]} accent={`var(--accent-${inFocus.unit.accent})`} onCycle={cycle} big inkStore={inkStore.current} />
                )
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)',
                        padding: 'var(--space-4) var(--space-5)', borderTop: '1px solid var(--border-color)' }}>
            <Button variant="secondary" icon="←" onClick={() => step(-1)} disabled={focusRow === 0}>Prev</Button>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', maxWidth: '55%' }}>
              {rows.map((r, i) => (
                <button key={i} type="button" onClick={() => setFocusRow(i)} aria-label={`Row ${i + 1}`}
                  style={{ width: i === focusRow ? 20 : 8, height: 8, padding: 0, borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer',
                           background: i === focusRow ? `var(--accent-${r.unit.accent})` : 'var(--border-color)',
                           transition: 'width var(--dur-fast, .15s) var(--ease)' }} />
              ))}
            </div>
            {focusRow === rows.length - 1
              ? <Button accent="practice" icon="✓" onClick={exitFocus}>Done</Button>
              : <Button accent="practice" icon="→" onClick={() => step(1)}>Next</Button>}
          </div>
        </div>
      )}
    </Card>
  );
}
window.PracticeSheet = PracticeSheet;
