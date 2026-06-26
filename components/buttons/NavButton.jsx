import React from 'react';

/**
 * Circular icon button used for previous/next character navigation.
 * Neutral by default; fills with the quiz-blue accent on hover.
 */
export function NavButton({ children, onClick, ariaLabel, disabled = false, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 'var(--hit-target)',
        height: 'var(--hit-target)',
        borderRadius: 'var(--radius-full)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        color: 'var(--text-primary)',
        background: hover && !disabled ? 'var(--accent-quiz)' : 'var(--bg-secondary)',
        border: `1px solid ${hover && !disabled ? 'var(--accent-quiz)' : 'var(--border-color)'}`,
        transition: 'all var(--dur-fast) var(--ease)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
