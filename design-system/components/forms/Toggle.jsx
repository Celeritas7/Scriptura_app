import React from 'react';

/**
 * Pill toggle switch. Off is a hairline-bordered track; on flips to the
 * practice-green fill with the knob sliding right.
 */
export function Toggle({ checked = false, onChange, label, disabled = false, style }) {
  const knob = {
    position: 'absolute',
    height: 14,
    width: 14,
    left: 3,
    bottom: 3,
    borderRadius: 'var(--radius-full)',
    transition: 'var(--dur-base)',
    background: checked ? '#fff' : 'var(--text-secondary)',
    transform: checked ? 'translateX(18px)' : 'none',
  };
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}>
      <span style={{ position: 'relative', width: 40, height: 22, display: 'inline-block' }}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span style={{
          position: 'absolute', inset: 0, borderRadius: 22, transition: 'var(--dur-base)',
          background: checked ? 'var(--accent-practice)' : 'var(--bg-primary)',
          border: `1px solid ${checked ? 'var(--accent-practice)' : 'var(--border-color)'}`,
        }} />
        <span style={knob} />
      </span>
      {label && <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>{label}</span>}
    </label>
  );
}
