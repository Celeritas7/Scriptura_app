// WordBuilder — pick a consonant and a vowel sign; see them combine into a
// live Burmese syllable with its romanization. A playful, exploratory mode.
function WordBuilder() {
  const { Card } = window.ScripturaDesignSystem_72b484;
  const D = window.ScripturaData;
  const consonants = D.allChars;
  const [ci, setCi] = React.useState(0);
  const [vi, setVi] = React.useState(0);
  const c = consonants[ci];
  const v = D.vowels[vi];
  const syllable = c.char + v.sign;
  const roman = c.roman.replace(/a$/, '') + v.label;

  const Chip = ({ active, accent, onClick, children, font }) => (
    <button type="button" onClick={onClick}
      style={{ minWidth: 52, height: 52, borderRadius: 'var(--radius-lg)', cursor: 'pointer',
               fontFamily: font || 'var(--font-ui)', fontSize: font ? '1.6rem' : 'var(--fs-body)',
               background: active ? `linear-gradient(135deg, var(--accent-${accent}), var(--accent-${accent}-deep))` : 'var(--bg-secondary)',
               color: active ? 'var(--text-on-accent)' : 'var(--text-primary)',
               border: `1px solid ${active ? 'transparent' : 'var(--border-color)'}`,
               boxShadow: active ? `var(--glow-${accent})` : 'none', transition: 'all var(--dur-fast) var(--ease)' }}>
      {children}
    </button>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* live result */}
      <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-7)', flexWrap: 'wrap',
                     backgroundImage: 'var(--aurora)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', fontFamily: 'var(--font-burmese)', color: 'var(--text-secondary)' }}>
          <span style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>{c.char}</span>
          <span style={{ fontSize: '2rem' }}>+</span>
          <span style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>{v.sign}</span>
          <span style={{ fontSize: '2rem' }}>=</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-burmese)', fontSize: '5.5rem', lineHeight: 1, color: 'var(--accent-sheet)' }}>{syllable}</div>
          <div style={{ fontSize: 'var(--fs-lg)', color: 'var(--text-secondary)', marginTop: 4 }}>“{roman}”</div>
        </div>
      </Card>

      <Card>
        <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-4)' }}>Consonant</div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {consonants.map((cc, idx) => (
            <Chip key={idx} active={idx === ci} accent={cc.accent} onClick={() => setCi(idx)} font="var(--font-burmese)">{cc.char}</Chip>
          ))}
        </div>
      </Card>

      <Card>
        <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-tight)', marginBottom: 'var(--space-4)' }}>Vowel sign</div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {D.vowels.map((vv, idx) => (
            <button key={idx} type="button" onClick={() => setVi(idx)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 60, padding: '0.5rem 0.8rem',
                       borderRadius: 'var(--radius-lg)', cursor: 'pointer',
                       background: idx === vi ? 'linear-gradient(135deg, var(--accent-sheet), var(--accent-sheet-deep))' : 'var(--bg-secondary)',
                       color: idx === vi ? 'var(--text-on-accent)' : 'var(--text-primary)',
                       border: `1px solid ${idx === vi ? 'transparent' : 'var(--border-color)'}`,
                       boxShadow: idx === vi ? 'var(--glow-sheet)' : 'none', transition: 'all var(--dur-fast) var(--ease)' }}>
              <span style={{ fontFamily: 'var(--font-burmese)', fontSize: '1.5rem' }}>◌{vv.sign}</span>
              <span style={{ fontSize: 'var(--fs-hint)', opacity: 0.85 }}>{vv.label}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
window.WordBuilder = WordBuilder;
