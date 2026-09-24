// ReviewSession — flip each card, self-grade Again / Good.
//   mode="review"  (default) the spaced-repetition queue: the grade moves the
//                  character through its Leitner box.
//   mode="practice" free flashcards over every character: nothing is written
//                  to the scheduler, so drilling outside the schedule can never
//                  push a letter further out than it has earned.
function ReviewSession({ queue, onExit, onComplete, xpPerCard = 5, langId, allChars, mode = 'review', onGo }) {
  const { Card, Button } = window.ScripturaDesignSystem_72b484;
  const { Icon, EmptyState } = window;
  const SRS = window.ScripturaSRS;
  const practice = mode === 'practice';
  const [i, setI] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [tally, setTally] = React.useState({ good: 0, again: 0 });
  const [done, setDone] = React.useState(false);
  const c = queue[i];
  const rec = (!practice && SRS && langId && c && c._i != null) ? SRS.rec(langId, c._i) : null;

  const grade = (ok) => {
    if (!practice && SRS && langId && c && c._i != null) SRS.grade(langId, c._i, ok);
    setTally((t) => ({ good: t.good + (ok ? 1 : 0), again: t.again + (ok ? 0 : 1) }));
    setFlipped(false);
    if (i + 1 >= queue.length) { setDone(true); return; }
    setI(i + 1);
  };

  if (queue.length === 0) {
    const next = SRS && langId ? SRS.nextDue(langId, (allChars || []).length) : null;
    // immersive screen (no app bar / nav) — the empty state must carry its own way out
    return (
      <EmptyState icon="check" accent="var(--accent-quiz)" title="Nothing due right now"
        body={`Everything you've learned is scheduled for later.${next ? ` Next cards are back ${next}.` : ''}${onGo ? ' Flashcards let you drill any letter in the meantime without changing the schedule.' : ''}`}
        action={onGo ? { label: 'Practise with flashcards', icon: 'cards', accent: 'quiz', onClick: () => onGo({ screen: 'flashcards' }) }
                     : { label: 'Back to dashboard', accent: 'quiz', onClick: onExit }}
        secondary={onGo ? { label: 'Back to dashboard', icon: 'home', onClick: onExit } : undefined} />
    );
  }

  if (done) {
    const xp = practice ? 0 : tally.good * xpPerCard;
    const Stat = ({ n, label, color }) => (
      <div><div style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, color }}>{n}</div>
        <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{label}</div></div>
    );
    return (
      <EmptyState icon="award" accent="var(--accent-quiz)" title={practice ? 'Flashcards complete' : 'Review complete'}
        body={practice ? 'Practice only — your review schedule is unchanged.' : 'Good cards move to a later box; Again cards come back today.'}
        action={{ label: 'Done', accent: 'quiz', onClick: () => onComplete(xp) }}>
        <div style={{ display: 'flex', gap: 'var(--space-7)', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
          <Stat n={tally.good} label="good" color="var(--success)" />
          <Stat n={tally.again} label="again" color="var(--error)" />
          {!practice && <Stat n={`+${xp}`} label="XP" color="var(--accent-indic)" />}
        </div>
      </EmptyState>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
        <button type="button" onClick={onExit} aria-label={practice ? 'Exit flashcards' : 'Exit review'}
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)',
                   width: 44, height: 44, borderRadius: 'var(--radius-full)', cursor: 'pointer', flexShrink: 0,
                   display: 'grid', placeItems: 'center' }}><Icon name="x" size={18} /></button>
        <div style={{ flex: 1, height: 12, borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(i / queue.length) * 100}%`, background: 'var(--accent-quiz)',
                        borderRadius: 'var(--radius-full)', transition: 'width var(--dur-base) var(--ease)' }} />
        </div>
        <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', flexShrink: 0 }}>{i + 1}/{queue.length}</span>
      </div>

      {practice ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 'var(--fs-hint)', color: 'var(--text-muted)' }}>
          <Icon name="cards" size={14} /> Flashcards · practice only, schedule unchanged
        </div>
      ) : rec && rec.b > 0 && (
        /* which Leitner box this card is in — makes the schedule legible */
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {[1, 2, 3, 4, 5].map((b) => (
            <span key={b} title={`Box ${b}`} style={{ width: b === rec.b ? 22 : 8, height: 8, borderRadius: 'var(--radius-full)',
                           background: b === rec.b ? 'var(--accent-quiz)' : 'var(--border-color)',
                           transition: 'width var(--dur-fast, .15s) var(--ease)' }} />
          ))}
          <span style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-muted)', marginLeft: 6 }}>box {rec.b} of 5</span>
        </div>
      )}

      <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
        <window.Flashcard char={c.char} roman={c.roman} name={c.name} gloss={c.gloss} font={c.font} front="char" accent="var(--accent-quiz)" flipped={flipped} onFlip={setFlipped} />
        {!flipped ? (
          <Button variant="secondary" icon={<Icon name="review" size={16} />} onClick={() => setFlipped(true)}>Flip to check</Button>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button accent="danger" variant="secondary" icon={<Icon name="review" size={16} />} onClick={() => grade(false)}>Again</Button>
            <Button accent="practice" icon={<Icon name="check" size={16} />} onClick={() => grade(true)}>{practice ? 'Good' : `Good · +${xpPerCard}`}</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
window.ReviewSession = ReviewSession;
