import React from 'react';

/**
 * Rounded pill used for language selection chips and tags. Shows an optional
 * native-script glyph beside the label; active fills with an accent + glow.
 */
export function Pill({ children, native, nativeFont, active = false, accent = 'indic', onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const fill = `var(--accent-${accent})`;
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '0.85rem 1.75rem',
        borderRadius: 'var(--radius-pill)',
        border: '2px solid transparent',
        fontFamily: 'var(--font-ui)',
        cursor: 'pointer',
        transition: 'all var(--dur-base) var(--ease)',
        background: active ? fill : hover ? 'var(--bg-elevated)' : 'transparent',
        boxShadow: active ? 'var(--glow-chip)' : 'none',
        ...style,
      }}
    >
      {native && (
        <span style={{ fontSize: 'var(--fs-lg)', lineHeight: 1, fontFamily: nativeFont || 'inherit',
                       color: active ? 'var(--text-on-accent)' : 'var(--text-primary)' }}>
          {native}
        </span>
      )}
      <span style={{ fontSize: 'var(--fs-body)',
                     color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)' }}>
        {children}
      </span>
    </button>
  );
}
