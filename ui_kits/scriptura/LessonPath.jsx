// LessonPath — the vertical path of unit lesson nodes with overall progress.
function LessonPath({ units, learned, activeUnitId, onGo }) {
  const { Card, ProgressRing } = window.ScripturaDesignSystem_72b484;
  const D = window.ScripturaData;
  const total = D.allChars.length;
  const learnedCount = learned.size;
  const activeIdx = units.findIndex((u) => u.id === activeUnitId);

  const statusOf = (idx) => {
    if (idx < activeIdx) return 'done';
    if (idx === activeIdx) return 'active';
    return 'locked';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Card style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        <ProgressRing value={learnedCount} max={total} size={88} stroke={9} accent="indic" label={`${Math.round(learnedCount/total*100)}%`} />
        <div>
          <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700 }}>Burmese Consonants</div>
          <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
            {learnedCount} of {total} learned · {units.length} units
          </div>
        </div>
      </Card>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {units.map((u, i) => {
          const lc = u.chars.filter((c) => learned.has(c.char)).length;
          return (
            <window.LessonNode key={u.id} unit={u} learned={lc} total={u.chars.length}
              status={statusOf(i)} onClick={() => onGo({ screen: 'lesson', unitId: u.id })} />
          );
        })}
      </div>
    </div>
  );
}
window.LessonPath = LessonPath;
