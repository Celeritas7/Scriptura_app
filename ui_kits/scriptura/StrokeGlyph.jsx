// StrokeGlyph — an animated "watch it form" reveal of a character on a light
// card. Without true stroke-path data we use a top-to-bottom wipe with a
// travelling pen, which conveys general writing direction and is replayable.
function StrokeGlyph({ char, size = 220, accent = 'var(--accent-practice)', auto = true }) {
  const [play, setPlay] = React.useState(0);     // bump to replay
  const [revealed, setRevealed] = React.useState(!auto);

  React.useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(t);
  }, [play, char]);

  const dur = 1700;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
      <div style={{ position: 'relative', width: size, height: size, background: 'var(--canvas-bg)',
                    borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-inset)', overflow: 'hidden' }}>
        {/* faint full glyph as a target ghost */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-burmese)', fontSize: size * 0.66, color: 'rgba(120,120,140,0.14)' }}>{char}</div>
        {/* inked glyph, wiped in top→bottom */}
        <div key={play} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-burmese)', fontSize: size * 0.66, color: '#1a1a25',
                      clipPath: revealed ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
                      transition: `clip-path ${dur}ms var(--ease)` }}>{char}</div>
        {/* travelling pen line */}
        <div key={'pen' + play} style={{ position: 'absolute', left: 0, right: 0, height: 2, background: accent,
                      boxShadow: `0 0 10px ${accent}`, top: revealed ? '88%' : '8%',
                      opacity: revealed ? 0 : 0.9, transition: `top ${dur}ms var(--ease), opacity 300ms var(--ease) ${dur - 250}ms` }} />
      </div>
      <button type="button" onClick={() => setPlay((p) => p + 1)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.1rem',
                 background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)',
                 borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-small)', cursor: 'pointer' }}>
        ↻ Replay
      </button>
    </div>
  );
}
window.StrokeGlyph = StrokeGlyph;
