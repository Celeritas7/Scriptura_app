// LessonNode — one stop on the lesson path. Shows the unit's lead glyph in a
// ring of progress, the title/subtitle, a learned count, and a status state
// (done / active / locked). Active nodes pulse a soft accent glow.
function LessonNode({ unit, learned, total, status, onClick }) {
  const { ProgressRing } = window.ScripturaDesignSystem_72b484;
  const accent = `var(--accent-${unit.accent})`;
  const locked = status === 'locked';
  const done = status === 'done';
  const pct = total ? Math.round((learned / total) * 100) : 0;

  return (
    <button type="button" disabled={locked} onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', width: '100%', textAlign: 'left',
               padding: 'var(--space-6)', borderRadius: 'var(--radius-2xl)', cursor: locked ? 'not-allowed' : 'pointer',
               background: 'var(--bg-card)', fontFamily: 'var(--font-ui)',
               border: `1px solid ${status === 'active' ? accent : 'var(--border-color)'}`,
               boxShadow: status === 'active' ? `var(--glow-${unit.accent})` : 'none',
               opacity: locked ? 0.55 : 1, transition: 'all var(--dur-base) var(--ease)' }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <ProgressRing value={done ? total : learned} max={total} size={76} stroke={7} accent={unit.accent}>
          <span style={{ fontFamily: 'var(--font-burmese)', fontSize: '2rem', lineHeight: 1,
                         color: locked ? 'var(--text-muted)' : 'var(--text-primary)' }}>
            {locked ? '🔒' : unit.chars[0].char}
          </span>
        </ProgressRing>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, color: 'var(--text-primary)' }}>{unit.title}</span>
          {done && <span style={{ color: accent, fontSize: 'var(--fs-body)' }}>✓</span>}
        </div>
        <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', fontFamily: 'var(--font-burmese)' }}>{unit.subtitle}</div>
        <div style={{ marginTop: 6, fontSize: 'var(--fs-micro)', color: locked ? 'var(--text-muted)' : accent, fontWeight: 600 }}>
          {locked ? 'Locked' : done ? 'Complete' : `${learned} / ${total} learned · ${pct}%`}
        </div>
      </div>
      {!locked && (
        <span style={{ flexShrink: 0, fontSize: '1.3rem', color: 'var(--text-secondary)' }}>›</span>
      )}
    </button>
  );
}
window.LessonNode = LessonNode;
