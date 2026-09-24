// Icon — line icon set (Lucide-derived paths) tinted from currentColor.
// mode="emoji" falls back to the original emoji, so screens can switch wholesale.
const ICON_PATHS = {
  home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V21h14V9.5', 'M10 21v-6h4v6'],
  map: ['M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z', 'M9 3v15', 'M15 6v15'],
  review: ['M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', 'M3 3v5h5'],
  pen: ['M12 20h9', 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z'],
  chart: ['M12 20V10', 'M18 20V4', 'M6 20v-4'],
  build: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  arrow: ['M5 12h14', 'm12 5 7 7-7 7'],
  check: ['M20 6 9 17l-5-5'],
  zap: ['M13 2 3 14h9l-1 8 10-12h-9l1-8z'],
  cards: ['M3.5 8.5 9 3l5.5 5.5', 'M6 21h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z'],
  printer: ['M6 9V2h12v7', 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2', 'M6 14h12v8H6z'],
  target: ['M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20', 'M12 6a6 6 0 1 0 0 12a6 6 0 1 0 0-12', 'M12 10a2 2 0 1 0 0 4a2 2 0 1 0 0-4'],
  cloud: ['M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'],
  lock: ['M5 11h14v10H5z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
  eraser: ['m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21', 'M22 21H7', 'm5 11 9 9'],
  sheet: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
  focus: ['M3 7V5a2 2 0 0 1 2-2h2', 'M17 3h2a2 2 0 0 1 2 2v2', 'M21 17v2a2 2 0 0 1-2 2h-2', 'M7 21H5a2 2 0 0 1-2-2v-2'],
  award: ['M12 2a6 6 0 1 0 0 12a6 6 0 1 0 0-12', 'M15.477 12.89 17 22l-5-3-5 3 1.523-9.11'],
  chevron: ['m9 18 6-6-6-6'],
  hand: ['M18 11V6a2 2 0 0 0-4 0v5', 'M14 10V4a2 2 0 0 0-4 0v2', 'M10 10.5V6a2 2 0 0 0-4 0v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'm22 6-10 7L2 6'],
  user: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8'],
  logout: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'm16 17 5-5-5-5', 'M21 12H9'],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3'],
};
const ICON_EMOJI = { home: '🏠', map: '🗺️', review: '🧠', pen: '🖋️', chart: '📊', build: '🧩', flame: '🔥', arrow: '→', check: '✓', zap: '⚡', cards: '🃏',
  printer: '🖨️', target: '🎯', cloud: '☁️', lock: '🔒', x: '✕', eraser: '🗑', sheet: '📝', focus: '◎', award: '🎉', chevron: '›', hand: '✋', download: '↓', mail: '✉', user: '👤', logout: '⎋' };

function Icon({ name, size = 18, mode = 'line', style }) {
  if (mode === 'emoji' || !ICON_PATHS[name]) return <span style={{ fontSize: size * 0.9, lineHeight: 1, ...style }}>{ICON_EMOJI[name] || '•'}</span>;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, ...style }}>
      {ICON_PATHS[name].map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// EmptyState — the one pattern every screen uses when there is nothing to show
// (nothing due, no results yet, script not supported): a line icon in a tinted
// disc, a one-line title, a sentence of guidance, and at most one action that
// leads somewhere useful. Keeps empty screens from being dead ends.
function EmptyState({ icon = 'check', title, body, action, secondary, accent = 'var(--accent-practice)', compact, children }) {
  const { Card, Button } = window.ScripturaDesignSystem_72b484;
  return (
    <Card style={{ textAlign: 'center', padding: compact ? 'var(--space-7) var(--space-6)' : 'var(--space-9) var(--space-7)',
                   display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
      <span style={{ width: compact ? 52 : 64, height: compact ? 52 : 64, borderRadius: '50%', display: 'grid', placeItems: 'center',
                     color: accent, background: `color-mix(in oklab, ${accent} 16%, var(--bg-secondary))`,
                     border: `1px solid color-mix(in oklab, ${accent} 40%, transparent)`, marginBottom: 'var(--space-2)' }}>
        <Icon name={icon} size={compact ? 24 : 28} />
      </span>
      <div style={{ fontSize: compact ? 'var(--fs-body)' : 'var(--fs-lg)', fontWeight: 700, color: 'var(--text-primary)', textWrap: 'balance' }}>{title}</div>
      {body && <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-small)', maxWidth: 440, textWrap: 'pretty' }}>{body}</div>}
      {children}
      {(action || secondary) && (
        <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {action && <Button accent={action.accent || 'practice'} icon={action.icon ? <Icon name={action.icon} size={16} /> : undefined} onClick={action.onClick}>{action.label}</Button>}
          {secondary && <Button variant="secondary" icon={secondary.icon ? <Icon name={secondary.icon} size={16} /> : undefined} onClick={secondary.onClick}>{secondary.label}</Button>}
        </div>
      )}
    </Card>
  );
}
window.Icon = Icon;
window.EmptyState = EmptyState;
