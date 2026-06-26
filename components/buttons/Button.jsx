import React from 'react';

const ACCENTS = {
  practice: ['var(--accent-practice)', 'var(--accent-practice-deep)', 'var(--glow-practice)'],
  quiz:     ['var(--accent-quiz)', 'var(--accent-quiz-deep)', 'var(--glow-quiz)'],
  sheet:    ['var(--accent-sheet)', 'var(--accent-sheet-deep)', 'var(--glow-sheet)'],
  review:   ['var(--accent-review)', 'var(--accent-review-deep)', 'var(--glow-review)'],
  indic:    ['var(--accent-indic)', 'var(--accent-indic-deep)', 'var(--glow-chip)'],
  cjk:      ['var(--accent-cjk)', 'var(--accent-cjk-deep)', 'var(--glow-cjk)'],
  danger:   ['var(--error)', 'var(--error-deep)', '0 8px 25px rgba(239,68,68,0.3)'],
};

const SIZES = {
  sm: { padding: '0.4rem 0.9rem', fontSize: 'var(--fs-micro)', radius: 'var(--radius-md)' },
  md: { padding: '0.8rem 2rem', fontSize: 'var(--fs-body)', radius: 'var(--radius-lg)' },
  lg: { padding: '1.25rem 4rem', fontSize: 'var(--fs-lg)', radius: 'var(--radius-xl)' },
};

/**
 * Scriptura primary action button. The signature look is a 135° gradient
 * fill in the chosen accent with a matching colored glow that intensifies
 * and lifts on hover.
 */
export function Button({
  children,
  variant = 'primary',
  accent = 'practice',
  size = 'md',
  icon = null,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [base, deep, glow] = ACCENTS[accent] || ACCENTS.practice;
  const sz = SIZES[size] || SIZES.md;

  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${base}, ${deep})`,
      color: 'var(--text-on-accent)',
      border: 'none',
      boxShadow: hover && !disabled ? glow : 'none',
      transform: hover && !disabled ? 'var(--lift-button)' : 'none',
    },
    secondary: {
      background: hover && !disabled ? 'var(--bg-elevated)' : 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)',
    },
    ghost: {
      background: hover && !disabled ? 'var(--bg-card)' : 'transparent',
      color: hover && !disabled ? 'var(--text-primary)' : 'var(--text-secondary)',
      border: 'none',
    },
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: sz.padding,
        fontSize: sz.fontSize,
        fontFamily: 'var(--font-ui)',
        fontWeight: 'var(--fw-semibold)',
        borderRadius: sz.radius,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'all var(--dur-fast) var(--ease)',
        whiteSpace: 'nowrap',
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </button>
  );
}
