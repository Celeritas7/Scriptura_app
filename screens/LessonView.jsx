// LessonView — the focused study loop for one unit. A unit with a `concept`
// opens with a read-once explainer, then each character runs
// Learn (watch it form + mnemonic) → Trace (write it, scored) → Quiz (recall & flip).
// Correct recalls mark the character learned, award XP, and grade into the SRS.
function LessonView({ unit, learned, onComplete, onExit, xpPerCard = 5, langId }) {
  const { Card, Button, NavButton } = window.ScripturaDesignSystem_72b484;
  const SRS = window.ScripturaSRS, Trace = window.ScripturaTrace;
  const accent = `var(--accent-${unit.accent})`;
  const hasConcept = !!(unit.concept && unit.concept.positions);
  const steps = ['learn', 'trace', 'quiz'];
  const [ci, setCi] = React.useState(0);
  const [step, setStep] = React.useState(hasConcept ? 'concept' : 'learn');
  const [flipped, setFlipped] = React.useState(false);
  const [xp, setXp] = React.useState(0);
  const [got, setGot] = React.useState(() => new Set());
  const [finished, setFinished] = React.useState(false);
  const [traceFb, setTraceFb] = React.useState(null); // { score, verdict, hint }
  const cv = React.useRef(null);
  const c = unit.chars[ci];
  const totalSteps = unit.chars.length * steps.length;
  const doneSteps = step === 'concept' ? 0 : ci * steps.length + steps.indexOf(step);
  // global index of this char within the language, for SRS keys
  const baseIdx = unit.startIndex || 0;

  const advance = (learnedThis) => {
    if (learnedThis) { setGot((g) => new Set(g).add(c.char)); setXp((x) => x + xpPerCard); }
    if (SRS && langId) SRS.grade(langId, baseIdx + ci, !!learnedThis, traceFb ? traceFb.score : undefined);
    setFlipped(false); setTraceFb(null);
    if (ci + 1 >= unit.chars.length) { setFinished(true); return; }
    setCi(ci + 1); setStep('learn');
  };

  // Score the traced glyph against the real one. Reads the stroke log DrawCanvas
  // parks on its canvas element; if that is unavailable we simply advance
  // without feedback rather than blocking the lesson.
  const checkTrace = () => {
    const el = cv.current;
    const strokes = el && el.__getStrokes && el.__getStrokes();
    if (!Trace || !el || !strokes || !strokes.length) { setStep('quiz'); return; }
    // DrawCanvas logs points in canvas pixel space — score against that box
    const fb = Trace.score(strokes, c.char, unit.font, el.width, el.height);
    if (!fb) { setStep('quiz'); return; }
    setTraceFb(fb);
  };

  if (finished) {
    const Stat = ({ n, label, color }) => (
      <div><div style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, color }}>{n}</div>
        <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{label}</div></div>
    );
    return (
      <window.EmptyState icon="award" accent={accent} title={`${unit.title} complete`}
        body="Letters you got right are scheduled for review tomorrow; the rest come back today."
        action={{ label: 'Back to path', icon: 'arrow', accent: unit.accent, onClick: () => onComplete([...got], xp) }}>
        <div style={{ display: 'flex', gap: 'var(--space-7)', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
          <Stat n={`+${xp}`} label="XP earned" color={accent} />
          <Stat n={got.size} label="learned" color="var(--accent-practice)" />
        </div>
      </window.EmptyState>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* lesson header + progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
        <button type="button" onClick={onExit} aria-label="Exit lesson"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)',
                   width: 44, height: 44, borderRadius: 'var(--radius-full)', cursor: 'pointer', flexShrink: 0,
                   display: 'grid', placeItems: 'center' }}><window.Icon name="x" size={18} /></button>
        <div style={{ flex: 1, height: 12, borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(doneSteps / totalSteps) * 100}%`, background: accent,
                        borderRadius: 'var(--radius-full)', transition: 'width var(--dur-base) var(--ease)' }} />
        </div>
        <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', flexShrink: 0 }}>{ci + 1}/{unit.chars.length}</span>
      </div>

      {/* step chips */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
        {(hasConcept ? ['concept'].concat(steps) : steps).map((s) => (
          <span key={s} style={{ fontSize: 'var(--fs-micro)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-tight)',
            padding: '0.3rem 0.9rem', borderRadius: 'var(--radius-pill)',
            background: s === step ? accent : 'var(--bg-secondary)',
            color: s === step ? 'var(--text-on-accent)' : 'var(--text-muted)' }}>{s}</span>
        ))}
      </div>

      {/* STEP BODY */}
      {step === 'concept' && (
        <window.ConceptCard concept={unit.concept} accent={unit.accent} font={unit.font}
          onDone={() => setStep('learn')} doneLabel={`Got it — start ${unit.title}`} />
      )}
      {step === 'learn' && (
        <Card style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <window.StrokeGlyph char={c.char} accent={accent} size={220} font={unit.font} />
          <div style={{ flex: '1 1 220px', minWidth: 0 }}>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: accent }}>{c.roman}</div>
            {c.name && c.name !== c.roman && <div style={{ fontFamily: unit.font, fontSize: 'var(--fs-title)', marginTop: 4 }}>{c.name}</div>}
            {c.gloss && <div style={{ fontSize: 'var(--fs-body)', color: 'var(--text-secondary)', fontStyle: 'italic' }}>“{c.gloss}”</div>}
            {c.cognate && (
            <div style={{ marginTop: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>
              <span style={{ fontFamily: 'var(--font-devanagari)', fontSize: '1.4rem', color: 'var(--text-primary)' }}>{c.cognate}</span> Devanagari cognate
            </div>
            )}
            <div style={{ marginTop: 'var(--space-6)' }}>
              <Button accent={unit.accent} icon={<window.Icon name="arrow" size={16} />} onClick={() => setStep('trace')}>I've got it</Button>
            </div>
          </div>
        </Card>
      )}

      {step === 'trace' && (
        <Card>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
            Trace <b style={{ color: 'var(--text-primary)', fontFamily: unit.font }}>{c.char}</b> · <i>{c.roman}</i>
          </div>
          <div ref={(el) => { cv.current = el && el.querySelector('canvas'); }}>
            <window.DrawCanvas guide={c.char} guideFont={unit.font} showGuide={true} stroke={8} size={340} accent={accent} />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
            <Button variant="secondary" icon={<window.Icon name="eraser" size={16} />} onClick={() => { setTraceFb(null); cv.current && cv.current.__clear && cv.current.__clear(); }}>Clear</Button>
            {!traceFb
              ? <Button accent={unit.accent} icon={<window.Icon name="check" size={16} />} onClick={checkTrace}>Check my trace</Button>
              : <Button accent={unit.accent} icon={<window.Icon name="arrow" size={16} />} onClick={() => setStep('quiz')}>Continue</Button>}
            {!traceFb && <Button variant="secondary" onClick={() => setStep('quiz')}>Skip</Button>}
          </div>
          {traceFb && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', marginTop: 'var(--space-5)', padding: 'var(--space-5)',
                          borderRadius: 'var(--radius-lg, 14px)', background: 'var(--bg-secondary)',
                          border: `1px solid ${Trace.color(traceFb.score)}` }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: Trace.color(traceFb.score), fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{traceFb.score}<span style={{ fontSize: '1rem' }}>%</span></div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 'var(--fs-small)', fontWeight: 600, textWrap: 'pretty' }}>{traceFb.hint}</div>
                <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', marginTop: 2 }}>
                  {traceFb.coverage}% of the letter covered · {traceFb.precision}% of your ink on it
                </div>
              </div>
            </div>
          )}
        </Card>
      )}

      {step === 'quiz' && (
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-small)' }}>Recall the character for this sound, then flip to check.</div>
          <window.Flashcard char={c.char} roman={c.roman} name={c.name} gloss={c.gloss} font={unit.font} front="roman" accent={accent} flipped={flipped} onFlip={setFlipped} />
          {!flipped ? (
            <Button variant="secondary" icon={<window.Icon name="review" size={16} />} onClick={() => setFlipped(true)}>Flip to check</Button>
          ) : (
            <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
              <Button accent="danger" variant="secondary" icon={<window.Icon name="review" size={16} />} onClick={() => advance(false)}>Again</Button>
              <Button accent="practice" icon={<window.Icon name="check" size={16} />} onClick={() => advance(true)}>Got it · +{xpPerCard}</Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
window.LessonView = LessonView;
