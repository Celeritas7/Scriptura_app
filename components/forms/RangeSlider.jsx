import React from 'react';

/**
 * Thin range slider with a quiz-blue circular thumb. Used for stroke width
 * and similar bounded settings. Shows an optional value read-out.
 */
export function RangeSlider({
  min = 2, max = 20, value = 8, step = 1, onChange,
  label, suffix = 'px', showValue = true, style,
}) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', ...style }}>
      {label && <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>{label}</span>}
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        className="scriptura-range"
        style={{ width: 80, height: 6, borderRadius: 3, background: 'var(--border-color)',
                 WebkitAppearance: 'none', appearance: 'none', cursor: 'pointer' }}
      />
      {showValue && (
        <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-primary)', minWidth: 34 }}>
          {value}{suffix}
        </span>
      )}
      <style>{`
        .scriptura-range::-webkit-slider-thumb{ -webkit-appearance:none; width:16px; height:16px;
          border-radius:50%; background:var(--accent-quiz); cursor:pointer; }
        .scriptura-range::-moz-range-thumb{ width:16px; height:16px; border:none;
          border-radius:50%; background:var(--accent-quiz); cursor:pointer; }
      `}</style>
    </div>
  );
}
