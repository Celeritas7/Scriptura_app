// Scriptura — pronunciation. Order: hub clip (public bucket akatsuki-audio, via
// lib/scriptura-adapter.js) → app-folder clip (audio/<lang>/) → device voice.
// Plain script; exposes window.ScripturaSpeech. If none exists for a language,
// has() is false and the UI hides its speaker button rather than reading the
// letter in the wrong language. Never calls a paid API.
(function () {
  const LOCALES = {
    burmese: ['my-MM', 'my'], hindi: ['hi-IN', 'hi'], telugu: ['te-IN', 'te'], sinhala: ['si-LK', 'si'],
    tamil: ['ta-IN', 'ta-LK', 'ta'], hiragana: ['ja-JP', 'ja'], katakana: ['ja-JP', 'ja'],
    korean: ['ko-KR', 'ko'], chinese: ['zh-CN', 'zh-TW', 'zh-HK', 'zh'],
    thai: ['th-TH', 'th'], arabic: ['ar-SA', 'ar'],
  };
  const synth = typeof window !== 'undefined' && window.speechSynthesis;
  const subs = new Set();
  let voices = [];

  function refresh() {
    voices = synth ? synth.getVoices() : [];
    subs.forEach((cb) => { try { cb(); } catch (e) {} });
  }
  if (synth) {
    refresh();
    if (synth.addEventListener) synth.addEventListener('voiceschanged', refresh);
    else synth.onvoiceschanged = refresh;
  }

  const norm = (s) => String(s || '').replace('_', '-').toLowerCase();
  // Best voice for a language: exact locale first, then same base language;
  // on-device voices beat network ones (they work offline and start faster).
  function voiceFor(lang) {
    const want = LOCALES[lang];
    if (!want || !voices.length) return null;
    for (const loc of want) {
      const l = norm(loc);
      const hits = voices.filter((v) => (loc.includes('-') ? norm(v.lang) === l : norm(v.lang).split('-')[0] === l));
      if (hits.length) return hits.find((v) => v.localService) || hits[0];
    }
    return null;
  }

  function speakTts(text, lang, opts) {
    const v = voiceFor(lang);
    if (!synth || !v || !text) return false;
    const u = new SpeechSynthesisUtterance(text);
    u.voice = v; u.lang = v.lang;
    u.rate = (opts && opts.rate) || 0.8;
    if (opts && opts.onend) { u.onend = opts.onend; u.onerror = opts.onend; }
    synth.speak(u);
    return true;
  }

  // ---- recorded clips: audio/<lang>/index.json lists the keys that exist ----
  const BASE = 'audio';
  const clips = {};   // lang -> Set of keys (empty Set = none / not found)
  const loading = {};
  let current = null;
  const keyOf = (t) => [...String(t).normalize('NFC')].map((c) => c.codePointAt(0).toString(16)).join('-');
  function loadClips(lang) {
    if (!lang || clips[lang] || loading[lang]) return;
    loading[lang] = fetch(`${BASE}/${lang}/index.json`, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : { keys: [] }))
      .catch(() => ({ keys: [] }))
      .then((j) => { clips[lang] = new Set(j.keys || []); subs.forEach((cb) => { try { cb(); } catch (e) {} }); });
  }
  const hasClip = (lang, text) => !!(clips[lang] && clips[lang].has(keyOf(text)));

  // ---- hub clips: ScripturaAudio reads <lang>/_index.json from the bucket ----
  let hub = null;
  const hubTried = {};   // lang -> last fetch time; retried after 60 s so a tab opened before the clips landed still picks them up
  const hubPlayer = () => hub || (window.ScripturaAudio ? (hub = window.ScripturaAudio({ fallback: (t, l) => speakLocal(t, l) })) : null);
  function loadHub(lang) {
    const p = hubPlayer();
    const now = Date.now();
    if (!p || !lang || (hubTried[lang] && now - hubTried[lang] < 60000)) return;
    hubTried[lang] = now;
    p.load(lang).then(() => subs.forEach((cb) => { try { cb(); } catch (e) {} }));
  }
  const hubUrl = (lang, text) => { const p = hubPlayer(); return p && text ? p.url(lang, text) : null; };

  // Clips play slowed a little, like the device voice; pitch is preserved.
  const CLIP_RATE = 0.85;
  function playUrl(url, text, lang, opts, next) {
    const end = (opts && opts.onend) || null;
    current = new Audio(url);
    current.playbackRate = (opts && opts.rate) || CLIP_RATE;
    current.preservesPitch = true;
    if (end) current.onended = end;
    const fail = () => { current = null; if (!next() && end) end(); };
    current.onerror = fail;
    current.play().catch(fail);
    return true;
  }
  function speakLocal(text, lang, opts) {
    if (text && hasClip(lang, text)) return playUrl(`${BASE}/${lang}/${keyOf(text)}.mp3`, text, lang, opts, () => speakTts(text, lang, opts));
    return speakTts(text, lang, opts);
  }

  const Speech = {
    supported: !!synth,
    LOCALES,
    voiceFor,
    keyOf,
    hasClip,
    hubUrl,
    ensure(lang) { loadClips(lang); loadHub(lang); },
    // Can this text be played? A clip (hub or app folder) counts even with no device voice.
    has(lang, text) { this.ensure(lang); return (text != null && (!!hubUrl(lang, text) || hasClip(lang, text))) || !!voiceFor(lang); },
    // Learners want it slower than conversational speed.
    speak(text, lang, opts) {
      this.stop();
      const u = hubUrl(lang, text);
      if (u) return playUrl(u, text, lang, opts, () => speakLocal(text, lang, opts));
      return speakLocal(text, lang, opts);
    },
    // Device voice only — the adapter's default fallback name.
    speakDevice(text, lang, opts) { return speakTts(text, lang, opts); },
    stop() { if (current) { current.pause(); current = null; } if (synth) synth.cancel(); },
    // Voices arrive asynchronously (Chrome loads them after page load).
    subscribe(cb) { subs.add(cb); return () => subs.delete(cb); },
    // Languages this device can speak — for the Progress screen.
    available() { return Object.keys(LOCALES).filter((l) => !!voiceFor(l) || (clips[l] && clips[l].size)); },
  };
  window.ScripturaSpeech = Speech;
})();
