// ReviewSession — the spaced-repetition queue. Flip each due card, self-grade
// Again / Good; a tally bar tracks the run, then a summary.
function ReviewSession({ queue, onExit, onComplete, xpPerCard = 5 }) {
  const { Card, Button } = window.ScripturaDesignSystem_72b484;
  const [i, setI] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [tally, setTally] = React.useState({ good: 0, again: 0 });
  const [done, setDone] = React.useState(false);
  const c = queue[i];

  const grade = (ok) => {
    setTally((t) => ({ good: t.good + (ok ? 1 : 0), again: t.again + (ok ? 0 : 1) }));
    setFlipped(false);
    if (i + 1 >= queue.length) { setDone(true); return; }
    setI(i + 1);
  };

  if (queue.length === 0) {
    return (
      <Card style={{ textAlign: 'center', padding: 'var(--space-9)' }}>
        <div style={{ fontSize: '3rem' }}>✅</div>
        <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, marginTop: 'var(--space-4)' }}>Nothing due right now</div>
        <div style={{ color: 'var(--text-secondary)', margin: 'var(--space-3) 0 var(--space-6)' }}>Come back later, or keep learning new units.</div>
        <Button accent="quiz" onClick={onExit}>Back to dashboard</Button>
      </Card>
    );
  }

  if (done) {
    const xp = tally.good * xpPerCard;
    return (
      <Card style={{ textAlign: 'center', padding: 'var(--space-9) var(--space-7)' }}>
        <div style={{ fontSize: '3.5rem' }}>🧠</div>
        <div style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, marginTop: 'var(--space-4)' }}>Review complete</div>
        <div style={{ display: 'flex', gap: 'var(--space-6)', justifyContent: 'center', margin: 'var(--space-7) 0' }}>
          <div><div style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, color: 'var(--success)' }}>{tally.good}</div>
            <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>good</div></div>
          <div><div style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, color: 'var(--error)' }}>{tally.again}</div>
            <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>again</div></div>
          <div><div style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, color: 'var(--accent-indic)' }}>+{xp}</div>
            <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>XP</div></div>
        </div>
        <Button accent="quiz" onClick={() => onComplete(xp)}>Done</Button>
      </Card>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
        <button type="button" onClick={onExit} aria-label="Exit review"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)',
                   width: 40, height: 40, borderRadius: 'var(--radius-full)', cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0 }}>✕</button>
        <div style={{ flex: 1, height: 12, borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(i / queue.length) * 100}%`, background: 'var(--accent-quiz)',
                        borderRadius: 'var(--radius-full)', transition: 'width var(--dur-base) var(--ease)' }} />
        </div>
        <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', flexShrink: 0 }}>{i + 1}/{queue.length}</span>
      </div>

      <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
        <window.Flashcard char={c.char} roman={c.roman} name={c.name} gloss={c.gloss} front="char" accent="var(--accent-quiz)" flipped={flipped} onFlip={setFlipped} />
        {!flipped ? (
          <Button variant="secondary" onClick={() => setFlipped(true)}>Flip to check ↻</Button>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
            <Button accent="danger" variant="secondary" onClick={() => grade(false)}>↻ Again</Button>
            <Button accent="practice" icon="✓" onClick={() => grade(true)}>Good · +{xpPerCard}</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
window.ReviewSession = ReviewSession;
