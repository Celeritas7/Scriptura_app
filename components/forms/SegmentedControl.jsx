import React from 'react';

/**
 * Segmented pill control — a row of rounded options where the active one
 * fills with an accent. Used for practice modes (Sequential / Random /
 * Unpracticed) and review ranges (Last 5 / Overall).
 */
export function SegmentedControl({ options = [], value, onChange, accent = 'practice', style }) {
  const fill = `var(--accent-${accent})`;
  return (
    <div style={{ display: 'inline-flex', gap: '0.4rem', flexWrap: 'wrap', ...style }}>
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value;
        const lbl = typeof opt === 'string' ? opt : opt.label;
        const active = val === value;
        return (
          <button
            key={val}
            type="button"
            onClick={() => onChange && onChange(val)}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--fs-micro)',
              cursor: 'pointer',
              transition: 'all var(--dur-fast) var(--ease)',
              background: active ? fill : 'var(--bg-secondary)',
              color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)',
              border: `1px solid ${active ? fill : 'var(--border-color)'}`,
            }}
          >
            {lbl}
          </button>
        );
      })}
    </div>
  );
}
