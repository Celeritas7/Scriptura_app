import React from 'react';

/**
 * Surface container — the product's standard rounded panel. `interactive`
 * adds a hover lift and border brighten (used for selectable cards).
 */
export function Card({ children, interactive = false, padding = 'var(--space-7)', style, onClick, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${interactive && hover ? 'var(--text-secondary)' : 'var(--border-color)'}`,
        borderRadius: 'var(--radius-2xl)',
        padding,
        transition: 'all var(--dur-base) var(--ease)',
        transform: interactive && hover ? 'var(--lift-card)' : 'none',
        cursor: interactive ? 'pointer' : 'default',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
