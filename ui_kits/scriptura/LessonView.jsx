// LessonView — the focused study loop for one unit. Each character runs
// Learn (watch it form + mnemonic) → Trace (write it) → Quiz (recall & flip).
// Correct recalls mark the character learned and award XP.
function LessonView({ unit, learned, onComplete, onExit, xpPerCard = 5 }) {
  const { Card, Button, NavButton } = window.ScripturaDesignSystem_72b484;
  const accent = `var(--accent-${unit.accent})`;
  const steps = ['learn', 'trace', 'quiz'];
  const [ci, setCi] = React.useState(0);
  const [step, setStep] = React.useState('learn');
  const [flipped, setFlipped] = React.useState(false);
  const [xp, setXp] = React.useState(0);
  const [got, setGot] = React.useState(() => new Set());
  const [finished, setFinished] = React.useState(false);
  const cv = React.useRef(null);
  const c = unit.chars[ci];
  const totalSteps = unit.chars.length * steps.length;
  const doneSteps = ci * steps.length + steps.indexOf(step);

  const advance = (learnedThis) => {
    if (learnedThis) { setGot((g) => new Set(g).add(c.char)); setXp((x) => x + xpPerCard); }
    setFlipped(false);
    if (ci + 1 >= unit.chars.length) { setFinished(true); return; }
    setCi(ci + 1); setStep('learn');
  };

  if (finished) {
    return (
      <Card style={{ textAlign: 'center', padding: 'var(--space-9) var(--space-7)' }}>
        <div style={{ fontSize: '3.5rem' }}>🎉</div>
        <div style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, marginTop: 'var(--space-4)' }}>{unit.title} complete!</div>
        <div style={{ display: 'flex', gap: 'var(--space-6)', justifyContent: 'center', margin: 'var(--space-7) 0' }}>
          <div><div style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, color: accent }}>+{xp}</div>
            <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>XP earned</div></div>
          <div><div style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, color: 'var(--accent-practice)' }}>{got.size}</div>
            <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>learned</div></div>
        </div>
        <Button accent={unit.accent} onClick={() => onComplete([...got], xp)}>Back to path →</Button>
      </Card>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* lesson header + progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
        <button type="button" onClick={onExit} aria-label="Exit lesson"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)',
                   width: 40, height: 40, borderRadius: 'var(--radius-full)', cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0 }}>✕</button>
        <div style={{ flex: 1, height: 12, borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(doneSteps / totalSteps) * 100}%`, background: accent,
                        borderRadius: 'var(--radius-full)', transition: 'width var(--dur-base) var(--ease)' }} />
        </div>
        <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', flexShrink: 0 }}>{ci + 1}/{unit.chars.length}</span>
      </div>

      {/* step chips */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
        {steps.map((s) => (
          <span key={s} style={{ fontSize: 'var(--fs-micro)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-tight)',
            padding: '0.3rem 0.9rem', borderRadius: 'var(--radius-pill)',
            background: s === step ? accent : 'var(--bg-secondary)',
            color: s === step ? 'var(--text-on-accent)' : 'var(--text-muted)' }}>{s}</span>
        ))}
      </div>

      {/* STEP BODY */}
      {step === 'learn' && (
        <Card style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <window.StrokeGlyph char={c.char} accent={accent} size={220} />
          <div style={{ flex: '1 1 220px', minWidth: 0 }}>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: accent }}>{c.roman}</div>
            <div style={{ fontFamily: 'var(--font-burmese)', fontSize: 'var(--fs-title)', marginTop: 4 }}>{c.name}</div>
            <div style={{ fontSize: 'var(--fs-body)', color: 'var(--text-secondary)', fontStyle: 'italic' }}>“{c.gloss}”</div>
            <div style={{ marginTop: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
              <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: '1.4rem', color: 'var(--text-primary)' }}>{c.cognate}</span> Devanagari cognate
            </div>
            <div style={{ marginTop: 'var(--space-6)' }}>
              <Button accent={unit.accent} onClick={() => setStep('trace')}>I've got it →</Button>
            </div>
          </div>
        </Card>
      )}

      {step === 'trace' && (
        <Card>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
            Trace <b style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-burmese)' }}>{c.char}</b> · <i>{c.roman}</i>
          </div>
          <div ref={(el) => { cv.current = el && el.querySelector('canvas'); }}>
            <window.DrawCanvas guide={c.char} guideFont="var(--font-burmese)" showGuide={true} stroke={8} size={340} accent={accent} />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', marginTop: 'var(--space-6)' }}>
            <Button variant="secondary" onClick={() => cv.current && cv.current.__clear && cv.current.__clear()}>🗑 Clear</Button>
            <Button accent={unit.accent} icon="✓" onClick={() => setStep('quiz')}>Done →</Button>
          </div>
        </Card>
      )}

      {step === 'quiz' && (
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-small)' }}>Recall the character for this sound, then flip to check.</div>
          <window.Flashcard char={c.char} roman={c.roman} name={c.name} gloss={c.gloss} front="roman" accent={accent} flipped={flipped} onFlip={setFlipped} />
          {!flipped ? (
            <Button variant="secondary" onClick={() => setFlipped(true)}>Flip to check ↻</Button>
          ) : (
            <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
              <Button accent="danger" variant="secondary" onClick={() => advance(false)}>↻ Again</Button>
              <Button accent="practice" icon="✓" onClick={() => advance(true)}>Got it · +{xpPerCard}</Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
window.LessonView = LessonView;
