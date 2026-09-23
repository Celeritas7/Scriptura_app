// ProgressScreen — the mastery heatmap, read from the same Leitner scheduler
// the Practice Sheet and Review write to (ScripturaSRS), so every screen gives
// the same answer for the same letter:
//   green  = mastered (box 4-5, last answer right)
//   orange = learning (box 1-3, or just missed)
//   grey   = new (never rated)
// A small ring marks cards due for review now, and the pips show the box.
// Plus a "Focus next" list and the Supabase cloud-sync panel.
function ProgressScreen({ lang, theme, cloudStatus, onCloud, onGo }) {
  const { Card, Button } = window.ScripturaDesignSystem_72b484;
  const { Icon, EmptyState } = window;
  const SRS = window.ScripturaSRS;
  const T = theme || { color: 'var(--accent-indic)', color2: 'var(--accent-indic-deep)' };
  const total = lang.allChars.length;
  const load = () => {
    if (!SRS) return {};
    SRS.migrateFrom(lang.id, window.ProgressStore.load(lang.id)); // one-time lift from {c,w} stats
    return SRS.load(lang.id);
  };
  const [recs, setRecs] = React.useState(load);
  const [showCfg, setShowCfg] = React.useState(false);
  React.useEffect(() => { setRecs(load()); }, [lang.id, cloudStatus]);

  const now = Date.now();
  const tones = {
    mastered: ['rgba(34,197,94,0.20)', 'var(--success)'],
    learning: ['rgba(245,158,11,0.20)', 'var(--warning, #f59e0b)'],
    new:      ['var(--bg-secondary)', 'var(--border-color)'],
  };
  const stateOf = (i) => (SRS ? SRS.mastery(recs[i]) : 'new');
  const dueOf = (i) => !!(SRS && SRS.isDue(recs[i], now));
  const counts = { mastered: 0, learning: 0, new: 0, due: 0 };
  for (let i = 0; i < total; i++) { counts[stateOf(i)]++; if (dueOf(i)) counts.due++; }
  const rated = counts.mastered + counts.learning;
  const nextDue = SRS ? SRS.nextDue(lang.id, total) : null;

  // weakest first: lowest box, then due before not-due
  const focus = lang.allChars.map((c, i) => ({ c, i, s: stateOf(i), b: (recs[i] && recs[i].b) || 0, d: dueOf(i) }))
    .filter((x) => x.s === 'learning')
    .sort((a, b) => a.b - b.b || Number(b.d) - Number(a.d));

  let off = 0;
  const blocks = lang.units.map((u) => { const s = off; off += u.chars.length; return { u, s }; });

  const Legend = ({ k, label }) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)' }}>
      <span style={{ width: 13, height: 13, borderRadius: 3, background: tones[k][0], border: `1px solid ${tones[k][1]}` }} />{label}
    </span>
  );
  const Pips = ({ b }) => (
    <span aria-label={`box ${b} of 5`} style={{ display: 'flex', gap: 2, marginTop: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ width: 5, height: 5, borderRadius: 2, background: n <= b ? 'var(--text-secondary)' : 'var(--border-color)' }} />
      ))}
    </span>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Card style={{ backgroundImage: `radial-gradient(ellipse at 100% 0%, ${T.color}1f 0%, transparent 60%)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-lg)', fontWeight: 700 }}>
              <Icon name="chart" size={20} style={{ color: T.color }} /> {lang.name} progress
            </div>
            <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', marginTop: 2 }}>
              {counts.mastered} of {total} mastered
              {counts.due > 0 ? ` · ${counts.due} due for review now` : nextDue ? ` · next review ${nextDue}` : ''}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Legend k="mastered" label={`Mastered ${counts.mastered}`} />
            <Legend k="learning" label={`Learning ${counts.learning}`} />
            <Legend k="new" label={`New ${counts.new}`} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent-quiz)' }} />Due {counts.due}
            </span>
          </div>
        </div>
        {counts.due > 0 && onGo && (
          <div style={{ marginTop: 'var(--space-5)' }}>
            <Button accent="quiz" icon={<Icon name="review" size={16} />} onClick={() => onGo({ screen: 'review' })}>Review {counts.due} due</Button>
          </div>
        )}
      </Card>

      {rated === 0 && (
        <EmptyState compact icon="chart" accent={T.color} title="No results yet"
          body="Rate letters on the Practice Sheet — tap Check, or set each cell's chip — then Save results. Lessons and reviews count too."
          action={onGo ? { label: 'Open practice sheet', icon: 'pen', onClick: () => onGo({ screen: 'sheet' }) } : undefined} />
      )}

      {/* heatmap grouped by unit */}
      {blocks.map(({ u, s }) => (
        <Card key={u.id} style={{ padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: `var(--accent-${u.accent})` }} />
            <span style={{ fontWeight: 700, fontSize: 'var(--fs-small)' }}>{u.title}</span>
            <span style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', fontFamily: u.font }}>{u.subtitle}</span>
            <span style={{ marginLeft: 'auto', fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
              {u.chars.filter((_, i) => stateOf(s + i) === 'mastered').length}/{u.chars.length}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: 'var(--space-3)' }}>
            {u.chars.map((c, i) => {
              const st = stateOf(s + i), [bg, bc] = tones[st], b = (recs[s + i] && recs[s + i].b) || 0;
              return (
                <div key={i} title={`${c.roman} · ${st}${b ? ` · box ${b}` : ''}${dueOf(s + i) ? ' · due now' : ''}`}
                  style={{ position: 'relative', aspectRatio: '1', background: bg, border: `2px solid ${bc}`, borderRadius: 'var(--radius-md)',
                           display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  {dueOf(s + i) && <span aria-label="due now" style={{ position: 'absolute', top: 5, right: 5, width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-quiz)' }} />}
                  <span style={{ fontFamily: lang.font, fontSize: '1.6rem', lineHeight: 1, color: 'var(--text-primary)' }}>{c.char}</span>
                  <span style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', marginTop: 2 }}>{c.roman}</span>
                  {b > 0 && <Pips b={b} />}
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      {/* focus next */}
      {focus.length > 0 && (
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, marginBottom: 'var(--space-4)' }}>
            <Icon name="target" size={18} style={{ color: 'var(--warning, #f59e0b)' }} /> Focus next
            <span style={{ fontWeight: 400, fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)' }}>still learning · weakest first</span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            {focus.map(({ c, i }) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.4rem 0.8rem',
                            borderRadius: 'var(--radius-pill)', background: tones.learning[0], border: `1px solid ${tones.learning[1]}` }}>
                <span style={{ fontFamily: lang.font, fontSize: '1.2rem' }}>{c.char}</span>
                <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)' }}>{c.roman}</span>
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* cloud sync */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}><Icon name="cloud" size={18} /> Cloud sync</div>
            <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', marginTop: 2 }}>
              {cloudStatus === 'on' ? 'Connected — results sync to Supabase across devices.'
                : cloudStatus === 'error' ? 'Configured, but the last sync failed. Check keys / tables.'
                : 'Offline — results are saved on this device only.'}
            </div>
          </div>
          <span style={{ fontSize: 'var(--fs-hint)', fontWeight: 700, padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-pill)',
                         color: '#fff', background: cloudStatus === 'on' ? 'var(--success)' : cloudStatus === 'error' ? 'var(--error)' : 'var(--text-muted)' }}>
            {cloudStatus === 'on' ? 'CONNECTED' : cloudStatus === 'error' ? 'ERROR' : 'OFFLINE'}
          </span>
        </div>
        <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={() => setShowCfg((v) => !v)}>{showCfg ? 'Hide settings' : 'Edit connection'}</Button>
          {cloudStatus === 'on' && <Button accent="quiz" icon={<Icon name="download" size={16} />} onClick={() => onCloud && onCloud('pull', lang.id)}>Pull latest</Button>}
        </div>
        {showCfg && (
          <div style={{ marginTop: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <CloudForm onSave={(url, key) => { window.ScripturaCloud.setConfig(url, key); onCloud && onCloud('configured', lang.id); setShowCfg(false); }} />
          </div>
        )}
      </Card>
    </div>
  );
}

function CloudForm({ onSave }) {
  const cfg = (function () { try { return JSON.parse(localStorage.getItem('scriptura.supabase') || 'null'); } catch (e) { return null; } })()
    || window.SCRIPTURA_SUPABASE || { url: '', anonKey: '' };
  const [url, setUrl] = React.useState(cfg.url || '');
  const [key, setKey] = React.useState(cfg.anonKey || '');
  const input = { padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
    background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-small)', width: '100%' };
  return (
    <React.Fragment>
      <label style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)' }}>Project URL
        <input style={input} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://xxxx.supabase.co" /></label>
      <label style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)' }}>Anon key
        <input style={input} value={key} onChange={(e) => setKey(e.target.value)} placeholder="eyJ..." /></label>
      <div>
        <window.ScripturaDesignSystem_72b484.Button accent="practice" onClick={() => onSave(url, key)}>Save & connect</window.ScripturaDesignSystem_72b484.Button>
      </div>
    </React.Fragment>
  );
}
window.ProgressScreen = ProgressScreen;
