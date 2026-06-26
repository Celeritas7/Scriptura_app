import React from 'react';

const ACCENTS = {
  practice: ['var(--accent-practice)', 'var(--accent-practice-deep)'],
  quiz: ['var(--accent-quiz)', 'var(--accent-quiz-deep)'],
  indic: ['var(--accent-indic)', 'var(--accent-indic-deep)'],
  review: ['var(--accent-review)', 'var(--accent-review-deep)'],
};

/**
 * Horizontal XP / level progress bar. Shows a level chip, a gradient-filled
 * track, and the value read-out. Used for the learner's level progression.
 */
export function XPBar({ value = 0, max = 100, level, accent = 'indic', showValue = true, style }) {
  const pct = Math.max(0, Math.min(1, max ? value / max : 0));
  const [base, deep] = ACCENTS[accent] || ACCENTS.indic;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', width: '100%', ...style }}>
      {level != null && (
        <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                       width: 34, height: 34, borderRadius: 'var(--radius-full)', fontWeight: 'var(--fw-bold)',
                       fontSize: 'var(--fs-body)', color: 'var(--text-on-accent)',
                       background: `linear-gradient(135deg, ${base}, ${deep})`, boxShadow: 'var(--shadow-card)' }}>
          {level}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ height: 10, borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct * 100}%`, borderRadius: 'var(--radius-full)',
                        background: `linear-gradient(135deg, ${base}, ${deep})`,
                        transition: 'width var(--dur-base) var(--ease)' }} />
        </div>
      </div>
      {showValue && (
        <span style={{ flexShrink: 0, fontSize: 'var(--fs-micro)', color: 'var(--text-secondary)',
                       fontVariantNumeric: 'tabular-nums' }}>{value} / {max} XP</span>
      )}
    </div>
  );
}
