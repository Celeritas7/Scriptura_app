// LessonPath — the vertical path of unit lesson nodes with overall progress.
// Header ring takes the language's theme colour; when every unit is learned the
// header turns into a completion state pointing at review / the sheet instead
// of a path with nothing left to open.
function LessonPath({ units, learned, activeUnitId, onGo, langName, theme }) {
  const { Card, ProgressRing, Button } = window.ScripturaDesignSystem_72b484;
  const { Icon } = window;
  const T = theme || { color: 'var(--accent-indic)', color2: 'var(--accent-indic-deep)' };
  const total = units.reduce((n, u) => n + u.chars.length, 0);
  const learnedCount = units.reduce((n, u) => n + u.chars.filter((c) => learned.has(c.char)).length, 0);
  const activeIdx = units.findIndex((u) => u.id === activeUnitId);
  const allDone = total > 0 && learnedCount >= total;
  const pct = total ? Math.round((learnedCount / total) * 100) : 0;

  const statusOf = (idx) => {
    if (allDone || idx < activeIdx) return 'done';
    if (idx === activeIdx) return 'active';
    return 'locked';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Card style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap',
                     backgroundImage: `radial-gradient(ellipse at 100% 0%, ${T.color}1f 0%, transparent 60%)` }}>
        <ProgressRing value={learnedCount} max={total} size={88} stroke={9} color={T.color} label={`${pct}%`} />
        <div style={{ flex: '1 1 200px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-lg)', fontWeight: 700 }}>
            <Icon name={allDone ? 'award' : 'map'} size={20} style={{ color: T.color }} />
            {allDone ? `Every ${langName} unit learned` : `${langName} path`}
          </div>
          <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', marginTop: 2 }}>
            {allDone ? 'Nothing new to unlock — keep it fresh with review and the practice sheet.'
                     : `${learnedCount} of ${total} learned · ${units.length} units`}
          </div>
        </div>
        {allDone && (
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Button accent="quiz" icon={<Icon name="review" size={16} />} onClick={() => onGo({ screen: 'review' })}>Review</Button>
            <Button variant="secondary" icon={<Icon name="pen" size={16} />} onClick={() => onGo({ screen: 'sheet' })}>Practice sheet</Button>
          </div>
        )}
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
