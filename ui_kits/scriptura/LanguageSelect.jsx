// LanguageSelect — the visual landing screen for choosing a script. Big native
// glyph per language, grouped Indic / CJK, with each language's own progress.
function LanguageSelect({ languages, languageList, learnedByLang, current, onPick, themes }) {
  const { Card } = window.ScripturaDesignSystem_72b484;
  const groups = ['Indic', 'CJK'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-7)',
                  padding: 'var(--space-7) 0', backgroundImage: 'var(--aurora)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '2rem' }}>✍️</span>
          <h1 style={{ margin: 0, fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)', whiteSpace: 'nowrap',
                       background: 'var(--gradient-display)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Choose a script
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0' }}>Pick a writing system to learn — switch any time.</p>
      </div>

      {groups.map((g) => {
        const items = languageList.filter((l) => l.group === g);
        return (
          <div key={g} style={{ width: '100%' }}>
            <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)', textTransform: 'uppercase',
                          letterSpacing: 'var(--tracking-label)', margin: '0 0 var(--space-4)', textAlign: 'center' }}>{g} scripts</div>
            <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap', justifyContent: 'center' }}>
              {items.map((l) => {
                const total = languages[l.id].allChars.length;
                const learned = (learnedByLang[l.id] || new Set()).size;
                const isCurrent = l.id === current;
                const t = (themes && themes[l.id]) || { color: 'var(--accent-indic)', emblem: '' };
                return (
                  <Card key={l.id} interactive onClick={() => onPick(l.id)}
                    style={{ position: 'relative', overflow: 'hidden', flex: '1 1 200px', maxWidth: 260, display: 'flex', alignItems: 'center', gap: 'var(--space-5)',
                             border: `1px solid ${isCurrent ? t.color : 'var(--border-color)'}`,
                             boxShadow: isCurrent ? `0 8px 30px ${t.color}40` : 'none',
                             backgroundImage: `radial-gradient(ellipse at 110% -10%, ${t.color}1f 0%, transparent 60%)` }}>
                    <window.Ring value={learned} max={total} size={64} stroke={6} color={t.color}>
                      <span style={{ fontFamily: l.font, fontSize: '1.7rem', lineHeight: 1, color: 'var(--text-primary)' }}>{l.native.slice(0, 1)}</span>
                    </window.Ring>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{l.name}</span>
                        <span style={{ fontSize: '0.95rem' }}>{t.emblem}</span>
                      </div>
                      <div style={{ fontFamily: l.font, fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>{l.native}</div>
                      <div style={{ fontSize: 'var(--fs-hint)', color: t.color, marginTop: 2, fontWeight: 600 }}>
                        {learned > 0 ? `${learned} / ${total} learned` : `${total} characters`}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
window.LanguageSelect = LanguageSelect;
