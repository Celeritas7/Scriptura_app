// LoginScreen — optional sign-in. Email magic link on top (primary), Google at
// the bottom, and a quiet "continue without an account" escape: the app works
// fully signed out, saving on this device only.
function LoginScreen({ onSkip, cloudReady = true }) {
  const { Button } = window.ScripturaDesignSystem_72b484;
  const { Icon } = window;
  const Cloud = window.ScripturaCloud;
  const [email, setEmail] = React.useState(() => { try { return localStorage.getItem('scriptura.lastEmail') || ''; } catch (e) { return ''; } });
  const [phase, setPhase] = React.useState('form'); // form | sending | sent
  const [err, setErr] = React.useState('');
  const [cool, setCool] = React.useState(0);
  const [gBusy, setGBusy] = React.useState(false);
  React.useEffect(() => { if (!cool) return; const t = setTimeout(() => setCool(cool - 1), 1000); return () => clearTimeout(t); }, [cool]);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const send = async (e) => {
    if (e) e.preventDefault();
    if (!valid) { setErr('Enter a valid email address.'); return; }
    setErr(''); setPhase('sending');
    const r = await Cloud.signInWithEmail(email);
    if (!r.ok) { setErr(r.error || 'Could not send the link. Try again.'); setPhase('form'); return; }
    try { localStorage.setItem('scriptura.lastEmail', email.trim()); } catch (e2) {}
    setPhase('sent'); setCool(30);
  };
  const google = async () => {
    setErr(''); setGBusy(true);
    const r = await Cloud.signInWithGoogle(); // navigates away on success
    if (!r.ok) { setErr(r.error || 'Google sign-in is unavailable.'); setGBusy(false); }
  };

  const field = { width: '100%', boxSizing: 'border-box', padding: '0.85rem 1rem', minHeight: 48, borderRadius: 'var(--radius-md)',
    border: `1px solid ${err ? 'var(--error)' : 'var(--border-color)'}`, background: 'var(--bg-primary)', color: 'var(--text-primary)',
    fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-body)', outline: 'none' };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 'var(--space-6) var(--space-5)', boxSizing: 'border-box',
                  backgroundImage: 'radial-gradient(ellipse at 20% 0%, rgba(34,197,94,.14) 0%, transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(139,92,246,.16) 0%, transparent 55%)' }}>
      <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', textAlign: 'center' }}>
          <img src="icons/logo.svg" alt="" width="64" height="64" style={{ display: 'block', borderRadius: 15 }} />
          <div style={{ fontSize: 'var(--fs-h2)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, textWrap: 'balance' }}>
            {phase === 'sent' ? 'Check your inbox' : 'Sign in to Scriptura'}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-small)', maxWidth: 340, textWrap: 'pretty' }}>
            {phase === 'sent'
              ? <>We sent a sign-in link to <b style={{ color: 'var(--text-primary)' }}>{email.trim()}</b>. Open it on the device you want to use.</>
              : 'Your marks and review schedule follow you to every device. Progress already on this device moves into your account.'}
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', boxShadow: 'var(--shadow-card)' }}>
          {!cloudReady ? (
            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-small)', textAlign: 'center' }}>
              Sign-in isn't available — cloud sync isn't configured for this copy of the app.
            </div>
          ) : phase === 'sent' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', textAlign: 'center' }}>
              <span style={{ width: 60, height: 60, borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'var(--accent-practice)',
                             background: 'color-mix(in oklab, var(--accent-practice) 16%, var(--bg-secondary))',
                             border: '1px solid color-mix(in oklab, var(--accent-practice) 40%, transparent)' }}><Icon name="mail" size={26} /></span>
              <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-muted)' }}>No email? Check spam, or resend.</div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button variant="secondary" disabled={cool > 0} onClick={() => send()}>{cool > 0 ? `Resend in ${cool}s` : 'Resend link'}</Button>
                <Button variant="secondary" onClick={() => { setPhase('form'); setErr(''); }}>Use a different email</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }} noValidate>
              <label htmlFor="login-email" style={{ fontSize: 'var(--fs-small)', fontWeight: 600 }}>Email</label>
              <input id="login-email" type="email" inputMode="email" autoComplete="email" autoFocus placeholder="you@example.com"
                value={email} onChange={(e) => { setEmail(e.target.value); if (err) setErr(''); }} style={field}
                aria-invalid={!!err} aria-describedby="login-err" />
              <Button accent="practice" type="submit" disabled={phase === 'sending'} icon={<Icon name="mail" size={16} />}
                style={{ width: '100%', justifyContent: 'center', minHeight: 48, marginTop: 'var(--space-2)' }}>
                {phase === 'sending' ? 'Sending…' : 'Email me a sign-in link'}
              </Button>
              <div style={{ fontSize: 'var(--fs-hint)', color: 'var(--text-muted)', textAlign: 'center' }}>No password — the link signs you in.</div>
            </form>
          )}

          {err && <div id="login-err" role="alert" style={{ color: 'var(--error)', fontSize: 'var(--fs-small)', textAlign: 'center' }}>{err}</div>}

          {cloudReady && (
            <React.Fragment>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', color: 'var(--text-muted)', fontSize: 'var(--fs-hint)' }}>
                <span style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />or<span style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
              </div>
              <button type="button" onClick={google} disabled={gBusy}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, width: '100%', minHeight: 48,
                         padding: '0 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #dadce0', background: '#fff', color: '#1f1f1f',
                         fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-body)', fontWeight: 600, cursor: gBusy ? 'wait' : 'pointer', opacity: gBusy ? 0.7 : 1 }}>
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                {gBusy ? 'Opening Google…' : 'Continue with Google'}
              </button>
            </React.Fragment>
          )}
        </div>

        <button type="button" onClick={onSkip}
          style={{ alignSelf: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
                   fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-small)', padding: '0.75rem 1rem', minHeight: 44, textAlign: 'center' }}>
          <span style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>Continue without an account</span>
          <span style={{ display: 'block', fontSize: 'var(--fs-hint)', color: 'var(--text-muted)', marginTop: 2 }}>Progress stays on this device only</span>
        </button>
      </div>
    </div>
  );
}
window.LoginScreen = LoginScreen;
