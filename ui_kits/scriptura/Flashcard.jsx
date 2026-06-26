// Flashcard — a 3D flip card. Front shows the prompt, back the answer +
// the Burmese letter-name mnemonic. Click / tap to flip.
function Flashcard({ char, roman, name, gloss, front = 'roman', size = 280, accent = 'var(--accent-quiz)', flipped, onFlip }) {
  const [localFlip, setLocalFlip] = React.useState(false);
  const isFlipped = flipped != null ? flipped : localFlip;
  const flip = () => { onFlip ? onFlip(!isFlipped) : setLocalFlip((f) => !f); };

  const face = {
    position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-color)', padding: 'var(--space-6)', textAlign: 'center',
  };

  const promptText = front === 'roman' ? roman : char;
  const promptFont = front === 'roman' ? 'var(--font-ui)' : 'var(--font-burmese)';

  return (
    <div onClick={flip} style={{ width: size, height: size, maxWidth: '100%', perspective: 1000, cursor: 'pointer' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d',
                    transition: 'transform var(--dur-base) var(--ease)',
                    transform: isFlipped ? 'rotateY(180deg)' : 'none' }}>
        {/* FRONT */}
        <div style={{ ...face, background: 'var(--bg-card)' }}>
          <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-muted)', textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-4)' }}>
            {front === 'roman' ? 'Sound' : 'Character'}
          </div>
          <div style={{ fontSize: front === 'roman' ? '3.4rem' : '5rem', fontFamily: promptFont,
                        fontWeight: front === 'roman' ? 700 : 400, color: accent, lineHeight: 1 }}>{promptText}</div>
          <div style={{ marginTop: 'var(--space-5)', fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>Tap to reveal ↻</div>
        </div>
        {/* BACK */}
        <div style={{ ...face, background: 'var(--bg-elevated)', transform: 'rotateY(180deg)' }}>
          <div style={{ fontSize: '5rem', fontFamily: 'var(--font-burmese)', lineHeight: 1, color: 'var(--text-primary)' }}>{char}</div>
          <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--fs-lg)', color: accent, fontWeight: 600 }}>{roman}</div>
          <div style={{ marginTop: 'var(--space-2)', fontFamily: 'var(--font-burmese)', fontSize: 'var(--fs-lg)', color: 'var(--text-primary)' }}>{name}</div>
          <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', fontStyle: 'italic' }}>“{gloss}”</div>
        </div>
      </div>
    </div>
  );
}
window.Flashcard = Flashcard;
