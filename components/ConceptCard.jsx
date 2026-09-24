// ConceptCard — a read-once explainer shown before a unit is drilled, for the
// facts a flashcard cannot teach: allophony, positional rules, letter families.
// Entirely data-driven from `unit.concept` (see data.js); if a unit has no
// concept the lesson skips this step, so adding one is a pure data change.
//
// Shape:
//   concept: { id, title, blurb, note, glyph, positions: [
//     { id, tab, sound, ipa, rule, parts:[{t,hi}], roman:[{t,hi}], mean } ],
//     contrast: { from:{text,font,label}, to:{text,font,label}, note } } }
function ConceptCard({ concept, accent = 'quiz', font, onDone, doneLabel = 'Got it — start the letters', compact }) {
  const { Card, Button } = window.ScripturaDesignSystem_72b484;
  const ACC = `var(--accent-${accent})`;
  const [sel, setSel] = React.useState(0);
  const positions = concept.positions || [];
  const p = positions[sel] || {};
  const glyphFont = concept.font || font;

  const Seg = ({ parts, size, weight, family }) => (
    <span style={{ fontFamily: family, fontSize: size, fontWeight: weight, lineHeight: 1.35 }}>
      {(parts || []).map((s, i) => <span key={i} style={{ color: s.hi ? ACC : 'var(--text-primary)' }}>{s.t}</span>)}
    </span>
  );

  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 'var(--fs-micro)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-tight)', fontWeight: 700,
                       padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-pill)', background: 'var(--bg-secondary)',
                       border: `1px solid ${ACC}`, color: ACC, whiteSpace: 'nowrap', flexShrink: 0 }}>Concept · not drilled</span>
        {concept.note && <span style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-muted)' }}>{concept.note}</span>}
      </div>

      <div>
        <div style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, textWrap: 'pretty' }}>{concept.title}</div>
        {concept.blurb && <div style={{ fontSize: 'var(--fs-body)', color: 'var(--text-secondary)', marginTop: 4, textWrap: 'pretty' }}>{concept.blurb}</div>}
      </div>

      {/* the letter + what it sounds like in the selected position */}
      <div className="concept-hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-8)', flexWrap: 'wrap',
                    padding: 'var(--space-6) 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        {concept.glyph && <div style={{ fontFamily: glyphFont, fontSize: compact ? '4rem' : '6.5rem', lineHeight: 1, color: ACC }}>{concept.glyph}</div>}
        <div key={p.id} style={{ animation: 'cc-pop var(--dur-base) var(--ease)', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
            <span style={{ fontSize: compact ? '2rem' : '3rem', fontWeight: 700, color: ACC }}>{p.sound}</span>
            {p.ipa && <span style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-muted)' }}>{p.ipa}</span>}
          </div>
          {p.rule && <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', maxWidth: 290, textWrap: 'pretty' }}>{p.rule}</div>}
        </div>
      </div>

      {/* position tabs */}
      {positions.length > 1 && (
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {positions.map((q, i) => (
            <button key={q.id} type="button" onClick={() => setSel(i)} aria-pressed={i === sel}
              style={{ cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-small)', padding: '0.45rem 0.95rem', minHeight: 40,
                       borderRadius: 'var(--radius-pill)', transition: 'all var(--dur-fast) var(--ease)', whiteSpace: 'nowrap',
                       background: i === sel ? `linear-gradient(135deg, var(--accent-${accent}), var(--accent-${accent}-deep))` : 'var(--bg-secondary)',
                       color: i === sel ? 'var(--text-on-accent)' : 'var(--text-primary)',
                       border: `1px solid ${i === sel ? 'transparent' : 'var(--border-color)'}` }}>{q.tab}</button>
          ))}
        </div>
      )}

      {/* worked example for the selected position */}
      {p.parts && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 'var(--space-5)',
                      background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg, 14px)', border: '1px solid var(--border-color)' }}>
          <Seg parts={p.parts} family={glyphFont} size="2.2rem" weight={400} />
          <Seg parts={p.roman} family="var(--font-ui)" size="var(--fs-small)" weight={600} />
          {p.mean && <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-muted)', fontStyle: 'italic' }}>“{p.mean}”</div>}
        </div>
      )}

      {/* optional side-by-side contrast with a script the learner already knows */}
      {concept.contrast && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-5)', flexWrap: 'wrap',
                      padding: 'var(--space-5)', borderRadius: 'var(--radius-lg, 14px)', border: '1px dashed var(--border-color)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: concept.contrast.from.font, fontSize: '2rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>{concept.contrast.from.text}</div>
            <div style={{ fontSize: 'var(--fs-micro)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-muted)' }}>{concept.contrast.from.label}</div>
          </div>
          <div style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><window.Icon name="arrow" size={22} /></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: concept.contrast.to.font || glyphFont, fontSize: '2rem', color: ACC }}>{concept.contrast.to.text}</div>
            <div style={{ fontSize: 'var(--fs-micro)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-tight)', color: 'var(--text-muted)' }}>{concept.contrast.to.label}</div>
          </div>
          {concept.contrast.note && (
            <div style={{ flex: '1 1 220px', minWidth: 0, fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', textWrap: 'pretty' }}>{concept.contrast.note}</div>
          )}
        </div>
      )}

      {onDone && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button accent={accent} icon={<window.Icon name="arrow" size={16} />} onClick={onDone}>{doneLabel}</Button>
        </div>
      )}
    </Card>
  );
}
window.ConceptCard = ConceptCard;
