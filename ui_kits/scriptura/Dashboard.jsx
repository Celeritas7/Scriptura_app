// Dashboard — the home/router. Daily goal, streak, level, and routes into
// the active lesson, the review queue, the path, and the word builder.
function Dashboard({ profile, units, learned, activeUnitId, dueCount, onGo, theme, lang, languageList, themes, currentLang, onPick }) {
  const { Card, Button, XPBar } = window.ScripturaDesignSystem_72b484;
  const total = units.reduce((n, u) => n + u.chars.length, 0);
  const learnedCount = learned.size;
  const activeUnit = units.find((u) => u.id === activeUnitId) || units[0];
  const activeLearned = activeUnit.chars.filter((c) => learned.has(c.char)).length;
  const T = theme || { color: 'var(--accent-practice)', color2: 'var(--accent-practice-deep)', greeting: 'Welcome back', hello: '', emblem: '👋', motif: '', blurb: '' };

  const Action = ({ icon, title, desc, accent, onClick, badge }) => (
    <Card interactive onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', flex: '1 1 240px' }}>
      <div style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 'var(--radius-lg)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
                    background: `linear-gradient(135deg, var(--accent-${accent}), var(--accent-${accent}-deep))` }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{title}</span>
          {badge != null && badge > 0 && (
            <span style={{ fontSize: 'var(--fs-hint)', fontWeight: 700, color: 'var(--text-on-accent)',
                           background: 'var(--error)', borderRadius: 'var(--radius-pill)', padding: '1px 8px' }}>{badge}</span>
          )}
        </div>
        <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', marginTop: 2 }}>{desc}</div>
      </div>
      <span style={{ color: 'var(--text-secondary)', fontSize: '1.3rem' }}>›</span>
    </Card>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* LANGUAGE STRIP */}
      {languageList && (
        <div>
          <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-muted)', textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-label)', margin: '0 0 var(--space-3)' }}>Language</div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', overflowX: 'auto', paddingBottom: 4 }}>
            {languageList.map((l) => {
              const lt = (themes && themes[l.id]) || { color: 'var(--accent-indic)', color2: 'var(--accent-indic-deep)' };
              const active = l.id === currentLang;
              return (
                <button key={l.id} type="button" onClick={() => onPick && onPick(l.id)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 0.9rem', flexShrink: 0,
                           borderRadius: 'var(--radius-pill)', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-small)',
                           whiteSpace: 'nowrap', transition: 'all var(--dur-fast) var(--ease)',
                           background: active ? `linear-gradient(135deg, ${lt.color}, ${lt.color2})` : 'var(--bg-card)',
                           color: active ? '#fff' : 'var(--text-secondary)',
                           border: `1px solid ${active ? 'transparent' : 'var(--border-color)'}`,
                           boxShadow: active ? `0 4px 14px ${lt.color}55` : 'none' }}>
                  <span style={{ fontFamily: l.font, fontSize: '1.05rem', lineHeight: 1 }}>{l.native.slice(0, 1)}</span>{l.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* HERO */}
      <Card style={{ position: 'relative', overflow: 'hidden', display: 'flex', gap: 'var(--space-8)', alignItems: 'center', flexWrap: 'wrap',
                     background: `var(--bg-card)`,
                     backgroundImage: `radial-gradient(ellipse at 100% 0%, ${T.color}22 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, ${T.color2}1a 0%, transparent 55%)` }}>
        {/* watermark motif glyph */}
        <div aria-hidden="true" style={{ position: 'absolute', right: -10, bottom: -54, fontFamily: lang.font, fontSize: 230,
                      lineHeight: 1, color: T.color, opacity: 0.08, pointerEvents: 'none', userSelect: 'none' }}>{T.motif}</div>
        <window.Ring value={profile.todayXp} max={profile.dailyGoalXp} size={140} stroke={12} color={T.color}
          label={profile.todayXp} sublabel={`/ ${profile.dailyGoalXp} XP today`} />
        <div style={{ flex: '1 1 260px', minWidth: 0, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{T.emblem}</span>
            <div>
              <div style={{ fontFamily: lang.font, fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>{T.greeting}</div>
              {T.hello && <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>{T.hello} · {lang.name}</div>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', margin: 'var(--space-5) 0 var(--space-4)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem',
                           background: 'var(--bg-secondary)', borderRadius: 'var(--radius-pill)', fontSize: 'var(--fs-small)' }}>
              🔥 <b style={{ color: 'var(--accent-review)' }}>{profile.streak}</b> day streak</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem',
                           background: 'var(--bg-secondary)', borderRadius: 'var(--radius-pill)', fontSize: 'var(--fs-small)' }}>
              ✍️ <b style={{ color: T.color }}>{learnedCount}</b> / {total} learned</span>
          </div>
          <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-secondary)', textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-tight)', margin: '0 0 6px' }}>Level {profile.level}</div>
          <XPBar level={profile.level} value={profile.levelXp} max={profile.levelMax} accent="indic" />
          <div style={{ marginTop: 'var(--space-5)' }}>
            <Button onClick={() => onGo({ screen: 'lesson', unitId: activeUnit.id })}
              style={{ background: `linear-gradient(135deg, ${T.color}, ${T.color2})`, color: '#fff' }}>
              Continue · {activeUnit.title} ({activeLearned}/{activeUnit.chars.length}) →
            </Button>
          </div>
        </div>
      </Card>

      {/* ACTIONS */}
      <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
        <Action icon="🧠" accent="quiz" title="Review" badge={dueCount}
          desc={dueCount > 0 ? `${dueCount} cards due today` : 'All caught up'} onClick={() => onGo({ screen: 'review' })} />
        <Action icon="🗺️" accent="indic" title="Lesson Path"
          desc={`${units.length} unit groups · ${T.blurb}`} onClick={() => onGo({ screen: 'path' })} />
        {lang.vowels
          ? <Action icon="🧩" accent="sheet" title="Word Builder" desc="Combine consonants + vowels" onClick={() => onGo({ screen: 'build' })} />
          : <Action icon="🃏" accent="sheet" title="Flashcards" desc="Flip & recall every character" onClick={() => onGo({ screen: 'review' })} />}
      </div>
    </div>
  );
}
window.Dashboard = Dashboard;
