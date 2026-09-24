import React from 'react';

const ACCENTS = {
  practice: ['var(--accent-practice)', 'var(--accent-practice-deep)'],
  quiz:     ['var(--accent-quiz)', 'var(--accent-quiz-deep)'],
  sheet:    ['var(--accent-sheet)', 'var(--accent-sheet-deep)'],
  review:   ['var(--accent-review)', 'var(--accent-review-deep)'],
  indic:    ['var(--accent-indic)', 'var(--accent-indic-deep)'],
  cjk:      ['var(--accent-cjk)', 'var(--accent-cjk-deep)'],
};

/**
 * Tab button used in the product's two-level navigation.
 * `layout="inline"` → icon + label on one line (mode tabs).
 * `layout="stacked"` → glyph over label over count (content-type tabs).
 * Active state fills with the accent gradient.
 */
export function Tab({
  children, icon, count, active = false, accent = 'practice',
  layout = 'inline', onClick, style,
}) {
  const [hover, setHover] = React.useState(false);
  const [base, deep] = ACCENTS[accent] || ACCENTS.practice;
  const stacked = layout === 'stacked';

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: stacked ? 1 : 'initial',
        display: 'flex',
        flexDirection: stacked ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: stacked ? '0.2rem' : '0.5rem',
        padding: stacked ? '0.75rem 1rem' : '0.7rem 1.4rem',
        border: 'none',
        borderRadius: stacked ? 'var(--radius-lg)' : 'var(--radius-md)',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-body)',
        fontWeight: stacked ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all var(--dur-fast) var(--ease)',
        background: active
          ? `linear-gradient(135deg, ${base}, ${deep})`
          : hover ? 'var(--bg-card)' : 'transparent',
        color: active ? 'var(--text-on-accent)' : hover ? 'var(--text-primary)' : 'var(--text-secondary)',
        boxShadow: active ? 'var(--shadow-card)' : 'none',
        ...style,
      }}
    >
      {icon && <span style={{ fontSize: stacked ? 'var(--glyph-tab)' : '1rem' }} aria-hidden="true">{icon}</span>}
      <span style={{ fontSize: stacked ? 'var(--fs-micro)' : 'inherit', whiteSpace: 'nowrap' }}>{children}</span>
      {count != null && (
        <span style={{ fontSize: 'var(--fs-hint)', opacity: 0.7 }}>{count}</span>
      )}
    </button>
  );
}
