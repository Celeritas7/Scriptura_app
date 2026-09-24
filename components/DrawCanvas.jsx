// DrawCanvas — writing surface using the Pointer Events API so Apple Pencil /
// stylus input tracks correctly on iPad (old touch events were passive, so
// preventDefault was ignored and the page scrolled, making strokes jump).
// touch-action:none stops scroll/zoom; pointer capture keeps the stroke
// attached; pressure (when the Pencil reports it) modulates line width.
// Input hygiene shared with PracticeSheet: once a pen is seen anywhere in the
// app, touch is rejected outright (palm contact was committing 4px dots);
// before that, a contact patch wider than 35px is palm, not a fingertip.
function dcAccept(e) {
  if (e.pointerType === 'pen') { window.__scripturaPenSeen = true; return true; }
  if (!e.pointerType || e.pointerType === 'mouse') return true;
  if (window.__scripturaPenSeen) return false;
  return !((e.width || 0) > 35 || (e.height || 0) > 35);
}
const dcMayDot = (e) => e.pointerType === 'pen' || !e.pointerType || e.pointerType === 'mouse';

function DrawCanvas({ guide, guideFont, showGuide = true, stroke = 8, size = 360, accent = 'var(--accent-quiz)' }) {
  const canvasRef = React.useRef(null);
  const ctxRef = React.useRef(null);
  const drawing = React.useRef(false);
  const activeId = React.useRef(null); // pointer that owns the in-flight stroke
  const strokes = React.useRef([]);
  const cur = React.useRef(null);
  const raf = React.useRef(0);

  const getCtx = () => {
    if (!ctxRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#1a1a25'; ctx.fillStyle = '#1a1a25';
      ctxRef.current = ctx;
    }
    return ctxRef.current;
  };

  // paint only what's new since the last flush
  const paint = (ctx, s) => {
    const pts = s.pts;
    if (pts.length === 1) {
      if (s.dot && !s.dotDrawn) { ctx.beginPath(); ctx.arc(pts[0].x, pts[0].y, (pts[0].w || s.w) / 2, 0, Math.PI * 2); ctx.fill(); s.dotDrawn = true; }
      return;
    }
    for (let i = Math.max(1, s.drawnUpTo + 1); i < pts.length; i++) {
      ctx.lineWidth = pts[i].w || s.w;
      ctx.beginPath(); ctx.moveTo(pts[i - 1].x, pts[i - 1].y); ctx.lineTo(pts[i].x, pts[i].y); ctx.stroke();
    }
    s.drawnUpTo = pts.length - 1;
  };

  // full repaint — clear / undo / resize only
  const redraw = React.useCallback(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = getCtx(); if (!ctx) return;
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const s of strokes.current) { s.drawnUpTo = 0; s.dotDrawn = false; paint(ctx, s); }
  }, []);

  const flush = () => {
    raf.current = 0;
    const ctx = getCtx();
    if (ctx && cur.current) paint(ctx, cur.current);
  };
  const schedule = () => { if (!raf.current) raf.current = requestAnimationFrame(flush); };

  React.useEffect(() => { redraw(); }, [redraw]);
  React.useEffect(() => () => { if (raf.current) cancelAnimationFrame(raf.current); }, []);

  const pos = (e) => {
    const cv = canvasRef.current;
    const r = cv.getBoundingClientRect();
    const w = (e.pressure && e.pressure > 0 && e.pointerType === 'pen')
      ? stroke * (0.6 + e.pressure * 1.6) : stroke * 1.6;
    return { x: (e.clientX - r.left) * (cv.width / r.width),
             y: (e.clientY - r.top) * (cv.height / r.height), w };
  };

  const down = (e) => {
    // ignore secondary buttons / eraser-as-right-click
    if (e.button && e.button !== 0) return;
    if (!dcAccept(e)) return; // palm / stray touch
    e.preventDefault();
    try { canvasRef.current.setPointerCapture(e.pointerId); } catch (err) {}
    drawing.current = true; activeId.current = e.pointerId;
    cur.current = { w: stroke * 1.6, pts: [pos(e)], dot: dcMayDot(e), drawnUpTo: 0, dotDrawn: false };
    strokes.current.push(cur.current);
  };
  const move = (e) => {
    if (!drawing.current || !cur.current || e.pointerId !== activeId.current) return;
    if (!dcAccept(e)) return;
    e.preventDefault();
    // coalesced events give smoother high-frequency Pencil strokes
    const evs = (e.nativeEvent && e.nativeEvent.getCoalescedEvents) ? e.nativeEvent.getCoalescedEvents() : null;
    if (evs && evs.length) { evs.forEach((ce) => cur.current.pts.push(pos(ce))); }
    else { cur.current.pts.push(pos(e)); }
    schedule();
  };
  const up = (e) => {
    if (!drawing.current || e.pointerId !== activeId.current) return; // palm lifting mid-glyph
    drawing.current = false; activeId.current = null;
    try { canvasRef.current.releasePointerCapture(e.pointerId); } catch (err) {}
    const ctx = getCtx();
    if (ctx && cur.current) paint(ctx, cur.current);
  };

  // One finger (or Pencil) draws; two fingers scroll the page. touch-action
  // allows pan/zoom, and we preventDefault only single-touch moves (non-passive
  // native listener — React's synthetic touch events can be passive).
  React.useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const onTS = (e) => {
      if (e.touches.length > 1 && drawing.current) {
        drawing.current = false; activeId.current = null; strokes.current.pop(); redraw(); // drop partial stroke, let the scroll happen
      }
    };
    const onTM = (e) => { if (e.touches.length === 1 && drawing.current) e.preventDefault(); };
    cv.addEventListener('touchstart', onTS, { passive: true });
    cv.addEventListener('touchmove', onTM, { passive: false });
    return () => { cv.removeEventListener('touchstart', onTS); cv.removeEventListener('touchmove', onTM); };
  }, [redraw]);

  React.useEffect(() => {
    const node = canvasRef.current;
    node.__clear = () => { strokes.current = []; redraw(); };
    node.__undo = () => { strokes.current.pop(); redraw(); };
    // read-only stroke log for trace scoring (points are in CANVAS pixel space,
    // so a scorer must measure against node.width/height, not the CSS box)
    node.__getStrokes = () => strokes.current;
  }, [redraw]);

  return (
    <div style={{ position: 'relative', width: size, height: size, maxWidth: '100%',
                  margin: '0 auto', background: 'var(--canvas-bg)', borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden', boxShadow: 'var(--shadow-inset)' }}>
      {showGuide && guide && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: size * 0.62, fontFamily: guideFont,
                      color: 'rgba(120,120,140,0.18)', pointerEvents: 'none', userSelect: 'none' }}>
          {guide}
        </div>
      )}
      <canvas
        ref={canvasRef} width={size} height={size}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                 cursor: 'crosshair', touchAction: 'pan-x pan-y pinch-zoom', userSelect: 'none', WebkitUserSelect: 'none' }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
      />
    </div>
  );
}
window.DrawCanvas = DrawCanvas;
