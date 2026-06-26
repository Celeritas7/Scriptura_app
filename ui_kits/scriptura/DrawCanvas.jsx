// DrawCanvas — a lightweight functional writing surface (mouse/touch),
// with a faint guide glyph behind. Mirrors core/canvas.js from the app.
function DrawCanvas({ guide, guideFont, showGuide = true, stroke = 8, size = 360, accent = 'var(--accent-quiz)' }) {
  const canvasRef = React.useRef(null);
  const drawing = React.useRef(false);
  const strokes = React.useRef([]);
  const cur = React.useRef(null);

  const redraw = React.useCallback(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#1a1a25';
    for (const s of strokes.current) {
      ctx.lineWidth = s.w; ctx.beginPath();
      s.pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
      ctx.stroke();
    }
  }, []);

  React.useEffect(() => { redraw(); }, [redraw]);

  const pos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: (t.clientX - r.left) * (canvasRef.current.width / r.width),
             y: (t.clientY - r.top) * (canvasRef.current.height / r.height) };
  };
  const start = (e) => { e.preventDefault(); drawing.current = true; cur.current = { w: stroke * 2, pts: [pos(e)] }; strokes.current.push(cur.current); };
  const move = (e) => { if (!drawing.current) return; e.preventDefault(); cur.current.pts.push(pos(e)); redraw(); };
  const end = () => { drawing.current = false; };

  // expose clear/undo on the DOM node
  React.useEffect(() => {
    const node = canvasRef.current;
    node.__clear = () => { strokes.current = []; redraw(); };
    node.__undo = () => { strokes.current.pop(); redraw(); };
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
                 cursor: 'crosshair', touchAction: 'none' }}
        onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
        onTouchStart={start} onTouchMove={move} onTouchEnd={end}
      />
    </div>
  );
}
window.DrawCanvas = DrawCanvas;
