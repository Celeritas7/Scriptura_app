// ProgressScreen — the real mastery heatmap, driven by the marks you record on
// the Practice Sheet (ProgressStore). Green = never missed, orange = sometimes,
// red = missed >half, grey = not attempted yet. Plus a "Focus next" list and a
// Cloud-sync settings panel for Supabase.
function ProgressScreen({ lang, theme, cloudStatus, onCloud }) {
  const { Card, Button } = window.ScripturaDesignSystem_72b484;
  const T = theme || { color: 'var(--accent-indic)', color2: 'var(--accent-indic-deep)' };
  const [stats, setStats] = React.useState(() => window.ProgressStore.load(lang.id));
  const [showCfg, setShowCfg] = React.useState(false);

  React.useEffect(() => { setStats(window.ProgressStore.load(lang.id)); }, [lang.id, cloudStatus]);

  const tones = {
    strong: ['rgba(34,197,94,0.22)', 'var(--success)'],
    shaky:  ['rgba(245,158,11,0.22)', 'var(--accent-indic)'],
    weak:   ['rgba(239,68,68,0.22)', 'var(--error)'],
    none:   ['var(--bg-secondary)', 'var(--border-color)'],
  };
  const tierOf = (idx) => window.ProgressStore.tier(stats[idx]);
  const counts = { strong: 0, shaky: 0, weak: 0, none: 0 };
  lang.allChars.forEach((_, i) => { counts[tierOf(i)]++; });
  const attempted = counts.strong + counts.shaky + counts.weak;

  const focus = lang.allChars.map((c, i) => ({ c, i, t: tierOf(i) }))
    .filter((x) => x.t === 'weak' || x.t === 'shaky')
    .sort((a, b) => (a.t === 'weak' ? -1 : 1) - (b.t === 'weak' ? -1 : 1));

  // group offsets
  let off = 0;
  const blocks = lang.units.map((u) => { const s = off; off += u.chars.length; return { u, s }; });

  const Legend = ({ k, label }) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)' }}>
      <span style={{ width: 13, height: 13, borderRadius: 3, background: tones[k][0], border: `1px solid ${tones[k][1]}` }} />{label}
    </span>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <Card style={{ backgroundImage: `radial-gradient(ellipse at 100% 0%, ${T.color}1f 0%, transparent 60%)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, whiteSpace: 'nowrap' }}>📊 {lang.name} Progress</div>
            <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-secondary)', marginTop: 2 }}>
              {attempted} of {lang.allChars.length} attempted · from your Practice Sheet results
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Legend k="strong" label={`Strong ${counts.strong}`} />
            <Legend k="shaky" label={`Shaky ${counts.shaky}`} />
            <Legend k="weak" label={`Weak ${counts.weak}`} />
            <Legend k="none" label={`New ${counts.none}`} />
          </div>
        </div>

        {attempted === 0 && (
          <div style={{ marginTop: 'var(--space-5)', padding: 'var(--space-5)', background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-lg)', color: 'var(--text-secondary)', fontSize: 'var(--fs-small)' }}>
            No results yet. Open <b style={{ color: 'var(--text-primary)' }}>Sheet</b>, write each character, mark any you got wrong with ✗, then tap <b style={{ color: 'var(--text-primary)' }}>Save results</b> — they'll appear here.
          </div>
        )}
      </Card>

      {/* heatmap grouped by unit */}
      {blocks.map(({ u, s }) => (
        <Card key={u.id} style={{ padding: 'var(--space-5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: `var(--accent-${u.accent})` }} />
            <span style={{ fontWeight: 700, fontSize: 'var(--fs-small)' }}>{u.title}</span>
            <span style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', fontFamily: u.font }}>{u.subtitle}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: 'var(--space-3)' }}>
            {u.chars.map((c, i) => {
              const [bg, bc] = tones[tierOf(s + i)];
              return (
                <div key={i} style={{ aspectRatio: '1', background: bg, border: `2px solid ${bc}`, borderRadius: 'var(--radius-md)',
                              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: lang.font, fontSize: '1.6rem', lineHeight: 1, color: 'var(--text-primary)' }}>{c.char}</span>
                  <span style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-secondary)', marginTop: 2 }}>{c.roman}</span>
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      {/* focus next */}
      {focus.length > 0 && (
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 'var(--space-4)' }}>🎯 Focus next</div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            {focus.map(({ c, t }, k) => (
              <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.4rem 0.8rem',
                            borderRadius: 'var(--radius-pill)', background: tones[t][0], border: `1px solid ${tones[t][1]}` }}>
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
            <div style={{ fontWeight: 700 }}>☁️ Cloud sync</div>
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
          {cloudStatus === 'on' && <Button accent="quiz" onClick={() => onCloud && onCloud('pull', lang.id)}>↓ Pull latest</Button>}
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
