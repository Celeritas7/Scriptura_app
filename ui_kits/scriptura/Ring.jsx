// Ring — a tiny self-contained progress ring with an arbitrary color, so the
// per-language themed rings render correctly without depending on the compiled
// design-system bundle. (The DS ProgressRing is still used for accent rings.)
function Ring({ value = 0, max = 100, size = 120, stroke = 10, color = '#22c55e', label, sublabel, children }) {
  const pct = Math.max(0, Math.min(1, max ? value / max : 0));
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border-color)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
          style={{ transition: 'stroke-dashoffset var(--dur-base) var(--ease)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {children != null ? children : (
          <React.Fragment>
            {label != null && <div style={{ fontSize: size * 0.24, fontWeight: 'var(--fw-bold)', color: 'var(--text-primary)', lineHeight: 1 }}>{label}</div>}
            {sublabel != null && <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', marginTop: 2 }}>{sublabel}</div>}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
window.Ring = Ring;
