// Dashboard — the home screen. Left: what to do next (active unit, its actual
// glyphs, today's numbers, practice tools). Right: every script you're learning,
// grouped by writing-system family, with per-script progress.
function Dashboard({ profile, units, learned, activeUnitId, dueCount, onGo, theme, lang, languageList, themes, currentLang, onPick }) {
  const { Card, Button } = window.ScripturaDesignSystem_72b484;
  const Icon = window.Icon;
  const D = window.ScripturaData;
  const total = units.reduce((n, u) => n + u.chars.length, 0);
  const learnedCount = learned.size;
  const activeUnit = units.find((u) => u.id === activeUnitId) || units[0];
  const activeLearned = activeUnit.chars.filter((c) => learned.has(c.char)).length;
  const T = theme || { color: 'var(--accent-practice)', color2: 'var(--accent-practice-deep)', greeting: '', hello: '', emblem: '👋', motif: '', blurb: '' };

  const groups = React.useMemo(() => {
    const m = new Map();
    (languageList || []).forEach((l) => { const k = l.group || 'Other'; if (!m.has(k)) m.set(k, []); m.get(k).push(l); });
    return [...m.entries()];
  }, [languageList]);

  const Label = ({ children, style }) => (
    <span style={{ fontSize: 'var(--fs-micro)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)',
                   color: 'var(--text-secondary)', ...style }}>{children}</span>
  );

  const ScriptRow = ({ l }) => {
    const L = (D.languages || {})[l.id];
    const lt = (themes && themes[l.id]) || { color: 'var(--accent-indic)', color2: 'var(--accent-indic-deep)', emblem: '', motif: '' };
    const tot = L ? L.allChars.length : 0;
    const n = l.id === currentLang ? learnedCount : (((D.seed || {})[l.id]) || []).length;
    const on = l.id === currentLang;
    return (
      <button type="button" onClick={() => onPick(l.id)} title={l.name}
        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: '10px 12px', textAlign: 'left', cursor: 'pointer',
                 borderRadius: 'var(--radius-lg)', border: `1px solid ${on ? lt.color : 'var(--border-color)'}`,
                 background: on ? `color-mix(in oklab, ${lt.color} 14%, var(--bg-card))` : 'var(--bg-card)',
                 color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', transition: 'all var(--dur-fast) var(--ease)' }}>
        <span style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
          <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center',
                         fontFamily: l.font, fontSize: '1.35rem', lineHeight: 1, color: '#fff',
                         background: `linear-gradient(135deg, ${lt.color}, ${lt.color2})` }}>{lt.motif || l.native.slice(0, 1)}</span>
          {lt.emblem && (
            <span aria-hidden="true" style={{ position: 'absolute', right: -5, bottom: -5, width: 19, height: 19, borderRadius: '50%',
                           display: 'grid', placeItems: 'center', fontSize: 11, lineHeight: 1,
                           background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>{lt.emblem}</span>
          )}
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 'var(--fs-small)', fontWeight: 700 }}>
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</span>
            <span style={{ color: on ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{n}/{tot}</span>
          </span>
          <span style={{ display: 'block', height: 4, marginTop: 7, borderRadius: 2, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <span style={{ display: 'block', height: '100%', width: `${tot ? (n / tot) * 100 : 0}%`, background: lt.color, borderRadius: 2 }} />
          </span>
        </span>
      </button>
    );
  };

  const LangChip = ({ l }) => {
    const lt = (themes && themes[l.id]) || { color: 'var(--accent-indic)', color2: 'var(--accent-indic-deep)', motif: '' };
    const on = l.id === currentLang;
    return (
      <button type="button" onClick={() => onPick(l.id)} title={l.name}
        style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0, padding: '7px 13px 7px 8px', minHeight: 44, cursor: 'pointer',
                 borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-small)', fontWeight: 700,
                 border: `1px solid ${on ? 'transparent' : 'var(--border-color)'}`,
                 background: on ? `linear-gradient(135deg, ${lt.color}, ${lt.color2})` : 'var(--bg-card)',
                 color: on ? '#fff' : 'var(--text-secondary)' }}>
        <span style={{ fontFamily: l.font, fontSize: '1.15rem', lineHeight: 1 }}>{lt.motif || l.native.slice(0, 1)}</span>
        {l.name}
      </button>
    );
  };

  const [pickerOpen, setPickerOpen] = React.useState(false);
  React.useEffect(() => {
    if (!pickerOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setPickerOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pickerOpen]);
  const pick = (id) => { setPickerOpen(false); onPick(id); };
  const groupOf = (l) => l.group || '';
  const countFor = (id) => id === currentLang ? learnedCount : (((D.seed || {})[id]) || []).length;
  const totalFor = (id) => { const L = (D.languages || {})[id]; return L ? L.allChars.length : 0; };

  const Tool = ({ icon, label, desc, badge, onClick }) => (
    <button type="button" onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: '14px 16px', cursor: 'pointer', textAlign: 'left', minWidth: 0,
               background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)',
               color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
      <span style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center',
                     background: 'var(--bg-secondary)', color: T.color, flexShrink: 0 }}><Icon name={icon} /></span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 'var(--fs-small)' }}>{label}
          {badge > 0 && <span style={{ fontSize: 'var(--fs-hint)', padding: '0 7px', borderRadius: 'var(--radius-pill)', background: 'var(--error)', color: '#fff' }}>{badge}</span>}</span>
        <span style={{ display: 'block', fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', marginTop: 1,
                       whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{desc}</span>
      </span>
    </button>
  );

  const goalPct = Math.max(0, Math.min(1, profile.dailyGoalXp ? profile.todayXp / profile.dailyGoalXp : 0));
  const R = 23, CIRC = 2 * Math.PI * R;

  return (
    <>
    <div className="dash-grid">
      {/* ---- main column ---- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minWidth: 0 }}>
        <Card style={{ position: 'relative', overflow: 'hidden', padding: 'var(--space-7)' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: `radial-gradient(120% 100% at 100% 0%, color-mix(in oklab, ${T.color} 22%, transparent), transparent 60%)` }} />
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <span style={{ position: 'relative', width: 46, height: 46, flexShrink: 0 }}>
                <span style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center',
                               fontFamily: lang.font, fontSize: '1.55rem', lineHeight: 1, color: '#fff',
                               background: `linear-gradient(135deg, ${T.color}, ${T.color2})` }}>{T.motif || lang.native.slice(0, 1)}</span>
                {T.emblem && (
                <span aria-hidden="true" style={{ position: 'absolute', right: -7, bottom: -7, width: 26, height: 26, borderRadius: '50%',
                                 display: 'grid', placeItems: 'center', fontSize: 15, lineHeight: 1,
                                 background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>{T.emblem}</span>
                )}
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                {T.greeting
                  ? <span style={{ fontFamily: lang.font, fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.15 }}>{T.greeting}</span>
                  : <span style={{ fontSize: '1.3rem', fontWeight: 700 }}>{lang.name}</span>}
                <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>{T.hello ? `${T.hello} · ` : ''}{lang.name}</span>
              </span>
            </div>
            <Label>Up next</Label>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'var(--fs-display)', fontWeight: 700, lineHeight: 1.05 }}>{activeUnit.title}</span>
              <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{activeUnit.subtitle} · {activeLearned}/{activeUnit.chars.length}</span>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {activeUnit.chars.slice(0, 8).map((c, i) => {
                const got = learned.has(c.char);
                return (
                  <span key={i} style={{ width: 58, height: 70, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center',
                                         position: 'relative', fontFamily: lang.font, fontSize: '1.7rem',
                                         background: got ? `linear-gradient(135deg, ${T.color}, ${T.color2})` : 'var(--bg-secondary)',
                                         color: got ? '#fff' : 'var(--text-primary)',
                                         border: `1px solid ${got ? 'transparent' : 'var(--border-color)'}` }}>
                    {c.char}
                    <span style={{ position: 'absolute', bottom: 4, fontSize: 11, fontFamily: 'var(--font-ui)',
                                   color: got ? 'rgba(255,255,255,.92)' : 'var(--text-secondary)' }}>{c.roman}</span>
                  </span>
                );
              })}
              {activeUnit.chars.length > 8 && (
                <span style={{ alignSelf: 'center', fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>+{activeUnit.chars.length - 8}</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Button onClick={() => onGo({ screen: 'lesson', unitId: activeUnit.id })}
                style={{ background: `linear-gradient(135deg, ${T.color}, ${T.color2})`, color: '#fff' }}>Continue lesson →</Button>
              <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>{learnedCount} of {total} characters learned</span>
            </div>
          </div>
        </Card>

        <div className="dash-stats">
          <Card style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: '14px 16px' }}>
            <span style={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
              <svg width="52" height="52" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="26" cy="26" r={R} fill="none" stroke="var(--bg-secondary)" strokeWidth="6" />
                <circle cx="26" cy="26" r={R} fill="none" stroke={T.color} strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - goalPct)}
                        style={{ transition: 'stroke-dashoffset var(--dur-base) var(--ease)' }} />
              </svg>
              <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: T.color }}><Icon name="zap" size={16} /></span>
            </span>
            <div><div style={{ fontWeight: 700 }}>{profile.todayXp} <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>/ {profile.dailyGoalXp} XP</span></div><Label>today</Label></div>
          </Card>
          <Card style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: '14px 16px' }}>
            <span style={{ width: 52, height: 52, borderRadius: '50%', display: 'grid', placeItems: 'center', flexShrink: 0,
                           background: 'var(--bg-secondary)', color: 'var(--accent-review)' }}><Icon name="flame" size={22} /></span>
            <div><div style={{ fontWeight: 700 }}>{profile.streak} days</div><Label>streak</Label></div>
          </Card>
          <Card style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: '14px 16px' }}>
            <span style={{ width: 52, height: 52, borderRadius: '50%', display: 'grid', placeItems: 'center', flexShrink: 0,
                           fontWeight: 700, color: '#fff', background: `linear-gradient(135deg, ${T.color}, ${T.color2})` }}>{profile.level}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700 }}>Level {profile.level}</div>
              <div style={{ height: 4, marginTop: 6, borderRadius: 2, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(profile.levelXp / profile.levelMax) * 100}%`, background: T.color }} />
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Label style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Practice</Label>
          <div className="dash-tools">
            <Tool icon="review" label="Review" badge={dueCount}
              desc={dueCount > 0 ? `${dueCount} cards due` : 'All caught up'} onClick={() => onGo({ screen: 'review' })} />
            <Tool icon="pen" label="Practice sheet" desc="Write every character by hand" onClick={() => onGo({ screen: 'sheet' })} />
            {lang.vowels
              ? <Tool icon="build" label="Word builder" desc="Consonant + vowel sign" onClick={() => onGo({ screen: 'build' })} />
              : <Tool icon="cards" label="Flashcards" desc="Flip & recall every character" onClick={() => onGo({ screen: 'review' })} />}
            <Tool icon="map" label="Lesson path" desc={`${units.length} unit groups`} onClick={() => onGo({ screen: 'path' })} />
          </div>
        </div>
      </div>

      {/* ---- scripts ---- */}
      <div className="dash-rail" style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
          <Label>Your scripts</Label>
          <span style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)' }}>{(languageList || []).length}</span>
        </div>
        <div className="dash-scripts">
          {groups.map(([grp, items]) => (
            <div key={grp}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, padding: '2px 2px 6px' }}>
                <span style={{ fontSize: 'var(--fs-hint)', fontWeight: 700, color: 'var(--text-secondary)' }}>{grp}</span>
                <span style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{items.length}</span>
              </div>
              <div className="dash-group-items">
                {items.map((l) => <ScriptRow key={l.id} l={l} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ---- phone / tablet: docked language bar + grouped picker sheet (≤900px, CSS-gated) ---- */}
    <div className="dash-dock">
      <button type="button" onClick={() => setPickerOpen(true)} aria-haspopup="dialog" aria-expanded={pickerOpen}
        style={{ display: 'flex', alignItems: 'center', gap: 11, width: '100%', minHeight: 58, padding: '8px 14px 8px 9px', cursor: 'pointer',
                 borderRadius: 16, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', textAlign: 'left',
                 border: `1px solid color-mix(in oklab, ${T.color} 55%, transparent)`,
                 background: `linear-gradient(135deg, color-mix(in oklab, ${T.color} 30%, var(--bg-card)), color-mix(in oklab, ${T.color2} 18%, var(--bg-card)))`,
                 boxShadow: 'var(--shadow-lg, 0 8px 24px rgba(0,0,0,.35))' }}>
        <span style={{ position: 'relative', width: 40, height: 40, borderRadius: 11, flexShrink: 0, display: 'grid', placeItems: 'center',
                       background: `linear-gradient(135deg, ${T.color}, ${T.color2})`, color: '#fff', fontFamily: lang.font, fontSize: '1.3rem', lineHeight: 1 }}>
          {T.motif || lang.native.slice(0, 1)}
          {T.emblem && <span style={{ position: 'absolute', right: -6, bottom: -6, width: 21, height: 21, borderRadius: '50%', display: 'grid', placeItems: 'center',
                                      fontSize: 12, lineHeight: 1, background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>{T.emblem}</span>}
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 'var(--fs-body)', fontWeight: 700 }}>{lang.name}</span>
          <span style={{ display: 'block', fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)' }}>{groupOf(lang)} · {learnedCount}/{total} learned · tap to switch</span>
        </span>
        <span style={{ width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '.85rem', fontWeight: 700, color: '#fff',
                       background: `linear-gradient(135deg, ${T.color}, ${T.color2})`, flexShrink: 0 }}>⌃</span>
      </button>
    </div>

    {pickerOpen && (
      <div className="dash-dock-sheet" role="dialog" aria-label="Choose a script">
        <div onClick={() => setPickerOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(4,4,8,0.66)' }} />
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 201, maxHeight: '82vh', display: 'flex', flexDirection: 'column',
                      background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', borderRadius: '22px 22px 0 0',
                      paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <span style={{ width: 38, height: 4, borderRadius: 2, background: 'var(--border-color)', margin: '9px auto 4px', flexShrink: 0 }} />
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '6px 18px 10px', flexShrink: 0 }}>
            <b style={{ fontSize: 'var(--fs-lg)', fontWeight: 700 }}>Your scripts</b>
            <span style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)' }}>{(languageList || []).length} · grouped by family</span>
          </div>
          <div style={{ overflowY: 'auto', padding: '0 14px 18px' }}>
            {groups.map(([grp, items]) => (
                <div key={grp}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '12px 4px 7px', position: 'sticky', top: 0, background: 'var(--bg-primary)' }}>
                    <Label>{grp}</Label>
                    <span style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{items.length}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {items.map((l) => {
                      const lt = (themes && themes[l.id]) || { color: 'var(--accent-indic)', color2: 'var(--accent-indic-deep)', motif: '' };
                      const p = { learned: countFor(l.id), total: totalFor(l.id) };
                      const on = l.id === currentLang;
                      return (
                        <button key={l.id} type="button" onClick={() => pick(l.id)} aria-pressed={on}
                          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, minHeight: 60, cursor: 'pointer', textAlign: 'left', borderRadius: 14,
                                   border: `1px solid ${on ? lt.color : 'var(--border-color)'}`, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)',
                                   background: on ? `color-mix(in oklab, ${lt.color} 15%, var(--bg-card))` : 'var(--bg-card)' }}>
                          <span style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, display: 'grid', placeItems: 'center', color: '#fff',
                                         background: `linear-gradient(135deg, ${lt.color}, ${lt.color2})`, fontFamily: l.font, fontSize: '1.2rem', lineHeight: 1 }}>{lt.motif || l.native.slice(0, 1)}</span>
                          <span style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ display: 'block', fontSize: 'var(--fs-small)', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</span>
                            <span style={{ fontSize: 10, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{p.learned}/{p.total}</span>
                            <span style={{ display: 'block', height: 4, marginTop: 6, borderRadius: 2, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                              <span style={{ display: 'block', height: '100%', borderRadius: 2, background: lt.color, width: `${Math.max(2, p.total ? (p.learned / p.total) * 100 : 0)}%` }} />
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
window.Dashboard = Dashboard;
