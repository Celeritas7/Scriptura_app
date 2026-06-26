import React from 'react';

const ACCENTS = {
  practice: 'var(--accent-practice)', quiz: 'var(--accent-quiz)', sheet: 'var(--accent-sheet)',
  review: 'var(--accent-review)', indic: 'var(--accent-indic)', cjk: 'var(--accent-cjk)',
};

/**
 * Circular progress ring with a centered value. Used for the daily-goal ring,
 * lesson completion, and any 0–100 metric. The track is a hairline; the
 * progress arc is the accent hue, animated to its length.
 */
export function ProgressRing({
  value = 0, max = 100, size = 120, stroke = 10, accent = 'practice',
  label, sublabel, children, style,
}) {
  const pct = Math.max(0, Math.min(1, max ? value / max : 0));
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const color = ACCENTS[accent] || ACCENTS.practice;

  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border-color)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          style={{ transition: 'stroke-dashoffset var(--dur-base) var(--ease)' }}
        />
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
