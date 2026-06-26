import React from 'react';

const TONES = {
  neutral: 'var(--text-primary)',
  correct: 'var(--success)',
  incorrect: 'var(--error)',
  streak: 'var(--accent-indic)',
  quiz: 'var(--accent-quiz)',
  practice: 'var(--accent-practice)',
};

/**
 * Compact stat chip — a bold value beside a muted label on an inset surface.
 * Used in the quiz stats bar (Correct / Wrong / Streak) and review tiles.
 */
export function StatChip({ value, label, tone = 'neutral', block = false, style }) {
  const color = TONES[tone] || TONES.neutral;
  if (block) {
    return (
      <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-xl)', textAlign: 'center', minWidth: 90, ...style }}>
        <div style={{ fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)', color, lineHeight: 'var(--lh-tight)' }}>{value}</div>
        <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{label}</div>
      </div>
    );
  }
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.6rem 1.25rem', background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-body)', ...style }}>
      <span style={{ fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-lg)', color }}>{value}</span>
      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  );
}
