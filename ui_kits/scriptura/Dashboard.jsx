// Dashboard — the home/router. Daily goal, streak, level, and routes into
// the active lesson, the review queue, the path, and the word builder.
function Dashboard({ profile, units, learned, activeUnitId, dueCount, onGo }) {
  const { Card, Button, ProgressRing, XPBar } = window.ScripturaDesignSystem_72b484;
  const D = window.ScripturaData;
  const total = D.allChars.length;
  const learnedCount = learned.size;
  const activeUnit = units.find((u) => u.id === activeUnitId) || units[0];
  const activeLearned = activeUnit.chars.filter((c) => learned.has(c.char)).length;

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
      {/* HERO */}
      <Card style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center', flexWrap: 'wrap',
                     background: 'var(--bg-card)', backgroundImage: 'var(--aurora)' }}>
        <ProgressRing value={profile.todayXp} max={profile.dailyGoalXp} size={140} stroke={12} accent="practice"
          label={profile.todayXp} sublabel={`/ ${profile.dailyGoalXp} XP today`} />
        <div style={{ flex: '1 1 260px', minWidth: 0 }}>
          <div style={{ fontSize: 'var(--fs-title)', fontWeight: 700, color: 'var(--text-primary)' }}>Welcome back 👋</div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', margin: 'var(--space-4) 0' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem',
                           background: 'var(--bg-secondary)', borderRadius: 'var(--radius-pill)', fontSize: 'var(--fs-small)' }}>
              🔥 <b style={{ color: 'var(--accent-review)' }}>{profile.streak}</b> day streak</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.9rem',
                           background: 'var(--bg-secondary)', borderRadius: 'var(--radius-pill)', fontSize: 'var(--fs-small)' }}>
              ✍️ <b style={{ color: 'var(--accent-practice)' }}>{learnedCount}</b> / {total} learned</span>
          </div>
          <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-secondary)', textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-tight)', margin: '0 0 6px' }}>Level {profile.level}</div>
          <XPBar level={profile.level} value={profile.levelXp} max={profile.levelMax} accent="indic" />
          <div style={{ marginTop: 'var(--space-5)' }}>
            <Button accent="practice" onClick={() => onGo({ screen: 'lesson', unitId: activeUnit.id })}>
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
          desc="Browse all six unit groups" onClick={() => onGo({ screen: 'path' })} />
        <Action icon="🧩" accent="sheet" title="Word Builder"
          desc="Combine consonants + vowels" onClick={() => onGo({ screen: 'build' })} />
      </div>
    </div>
  );
}
window.Dashboard = Dashboard;
