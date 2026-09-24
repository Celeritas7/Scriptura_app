/* @ds-bundle: {"format":4,"namespace":"ScripturaDesignSystem_72b484","components":[{"name":"Button","sourcePath":"design-system/components/buttons/Button.jsx"},{"name":"NavButton","sourcePath":"design-system/components/buttons/NavButton.jsx"},{"name":"Card","sourcePath":"design-system/components/data-display/Card.jsx"},{"name":"Pill","sourcePath":"design-system/components/data-display/Pill.jsx"},{"name":"StatChip","sourcePath":"design-system/components/data-display/StatChip.jsx"},{"name":"RangeSlider","sourcePath":"design-system/components/forms/RangeSlider.jsx"},{"name":"SegmentedControl","sourcePath":"design-system/components/forms/SegmentedControl.jsx"},{"name":"Toggle","sourcePath":"design-system/components/forms/Toggle.jsx"},{"name":"Tab","sourcePath":"design-system/components/navigation/Tab.jsx"},{"name":"ProgressRing","sourcePath":"design-system/components/progress/ProgressRing.jsx"},{"name":"XPBar","sourcePath":"design-system/components/progress/XPBar.jsx"},{"name":"DrawingCanvas","sourcePath":"design-system/patches/core/canvas.js"}],"sourceHashes":{"components/ConceptCard.jsx":"c9e5b36d99d0","components/DrawCanvas.jsx":"f5bfe7fb874f","components/Flashcard.jsx":"d6e946f3d3b5","components/Icons.jsx":"e93cfba3042b","components/LessonNode.jsx":"2bda8aeceb40","components/LessonPath.jsx":"6b93164f527b","components/Ring.jsx":"ef91388605c2","components/StrokeGlyph.jsx":"7a24451315f3","components/WordBuilder.jsx":"0c9c4c7c6437","data/data.js":"ff21d72aa14e","design-system/components/buttons/Button.jsx":"05de7c665621","design-system/components/buttons/NavButton.jsx":"aecee367b87b","design-system/components/data-display/Card.jsx":"a1758d8d721c","design-system/components/data-display/Pill.jsx":"b06a4418efd0","design-system/components/data-display/StatChip.jsx":"4f7cc7979773","design-system/components/forms/RangeSlider.jsx":"61234e41c57c","design-system/components/forms/SegmentedControl.jsx":"4a85688f2dca","design-system/components/forms/Toggle.jsx":"7ad824c5943b","design-system/components/navigation/Tab.jsx":"36a3b2b258ef","design-system/components/progress/ProgressRing.jsx":"d69c5f8c7c4e","design-system/components/progress/XPBar.jsx":"21c467883b8d","design-system/patches/core/canvas.js":"29ba022108f2","lib/srs.js":"ea32c4e39fa8","lib/store.js":"67b22179a3de","lib/trace.js":"90e58dbebfe6","screens/Dashboard.jsx":"798b97983d9b","screens/LessonView.jsx":"62e4a74f0e3f","screens/LoginScreen.jsx":"90c98cc39f06","screens/PracticeSheet.jsx":"f98a3ed45f35","screens/ProgressScreen.jsx":"e8ed54ddc714","screens/ReviewSession.jsx":"f4a3f724b37e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ScripturaDesignSystem_72b484 = window.ScripturaDesignSystem_72b484 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/ConceptCard.jsx
try { (() => {
// ConceptCard — a read-once explainer shown before a unit is drilled, for the
// facts a flashcard cannot teach: allophony, positional rules, letter families.
// Entirely data-driven from `unit.concept` (see data.js); if a unit has no
// concept the lesson skips this step, so adding one is a pure data change.
//
// Shape:
//   concept: { id, title, blurb, note, glyph, positions: [
//     { id, tab, sound, ipa, rule, parts:[{t,hi}], roman:[{t,hi}], mean } ],
//     contrast: { from:{text,font,label}, to:{text,font,label}, note } } }
function ConceptCard({
  concept,
  accent = 'quiz',
  font,
  onDone,
  doneLabel = 'Got it — start the letters',
  compact
}) {
  const {
    Card,
    Button
  } = window.ScripturaDesignSystem_72b484;
  const ACC = `var(--accent-${accent})`;
  const [sel, setSel] = React.useState(0);
  const positions = concept.positions || [];
  const p = positions[sel] || {};
  const glyphFont = concept.font || font;
  const Seg = ({
    parts,
    size,
    weight,
    family
  }) => /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: family,
      fontSize: size,
      fontWeight: weight,
      lineHeight: 1.35
    }
  }, (parts || []).map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      color: s.hi ? ACC : 'var(--text-primary)'
    }
  }, s.t)));
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-micro)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-tight)',
      fontWeight: 700,
      padding: '0.3rem 0.8rem',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--bg-secondary)',
      border: `1px solid ${ACC}`,
      color: ACC,
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, "Concept \xB7 not drilled"), concept.note && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-muted)'
    }
  }, concept.note)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-h2)',
      fontWeight: 700,
      textWrap: 'pretty'
    }
  }, concept.title), concept.blurb && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-body)',
      color: 'var(--text-secondary)',
      marginTop: 4,
      textWrap: 'pretty'
    }
  }, concept.blurb)), /*#__PURE__*/React.createElement("div", {
    className: "concept-hero",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-8)',
      flexWrap: 'wrap',
      padding: 'var(--space-6) 0',
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)'
    }
  }, concept.glyph && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: glyphFont,
      fontSize: compact ? '4rem' : '6.5rem',
      lineHeight: 1,
      color: ACC
    }
  }, concept.glyph), /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      animation: 'cc-pop var(--dur-base) var(--ease)',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: compact ? '2rem' : '3rem',
      fontWeight: 700,
      color: ACC
    }
  }, p.sound), p.ipa && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-lg)',
      color: 'var(--text-muted)'
    }
  }, p.ipa)), p.rule && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      maxWidth: 290,
      textWrap: 'pretty'
    }
  }, p.rule))), positions.length > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, positions.map((q, i) => /*#__PURE__*/React.createElement("button", {
    key: q.id,
    type: "button",
    onClick: () => setSel(i),
    "aria-pressed": i === sel,
    style: {
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-small)',
      padding: '0.45rem 0.95rem',
      minHeight: 40,
      borderRadius: 'var(--radius-pill)',
      transition: 'all var(--dur-fast) var(--ease)',
      whiteSpace: 'nowrap',
      background: i === sel ? `linear-gradient(135deg, var(--accent-${accent}), var(--accent-${accent}-deep))` : 'var(--bg-secondary)',
      color: i === sel ? 'var(--text-on-accent)' : 'var(--text-primary)',
      border: `1px solid ${i === sel ? 'transparent' : 'var(--border-color)'}`
    }
  }, q.tab))), p.parts && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      padding: 'var(--space-5)',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-lg, 14px)',
      border: '1px solid var(--border-color)'
    }
  }, /*#__PURE__*/React.createElement(Seg, {
    parts: p.parts,
    family: glyphFont,
    size: "2.2rem",
    weight: 400
  }), /*#__PURE__*/React.createElement(Seg, {
    parts: p.roman,
    family: "var(--font-ui)",
    size: "var(--fs-small)",
    weight: 600
  }), p.mean && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-muted)',
      fontStyle: 'italic'
    }
  }, "\u201C", p.mean, "\u201D")), concept.contrast && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-5)',
      flexWrap: 'wrap',
      padding: 'var(--space-5)',
      borderRadius: 'var(--radius-lg, 14px)',
      border: '1px dashed var(--border-color)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: concept.contrast.from.font,
      fontSize: '2rem',
      color: 'var(--text-secondary)',
      letterSpacing: '0.1em'
    }
  }, concept.contrast.from.text), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-micro)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-muted)'
    }
  }, concept.contrast.from.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "arrow",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: concept.contrast.to.font || glyphFont,
      fontSize: '2rem',
      color: ACC
    }
  }, concept.contrast.to.text), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-micro)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-muted)'
    }
  }, concept.contrast.to.label)), concept.contrast.note && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 220px',
      minWidth: 0,
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      textWrap: 'pretty'
    }
  }, concept.contrast.note)), onDone && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    accent: accent,
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "arrow",
      size: 16
    }),
    onClick: onDone
  }, doneLabel)));
}
window.ConceptCard = ConceptCard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ConceptCard.jsx", error: String((e && e.message) || e) }); }

// components/DrawCanvas.jsx
try { (() => {
// DrawCanvas — writing surface using the Pointer Events API so Apple Pencil /
// stylus input tracks correctly on iPad (old touch events were passive, so
// preventDefault was ignored and the page scrolled, making strokes jump).
// touch-action:none stops scroll/zoom; pointer capture keeps the stroke
// attached; pressure (when the Pencil reports it) modulates line width.
// Input hygiene shared with PracticeSheet: once a pen is seen anywhere in the
// app, touch is rejected outright (palm contact was committing 4px dots);
// before that, a contact patch wider than 35px is palm, not a fingertip.
function dcAccept(e) {
  if (e.pointerType === 'pen') {
    window.__scripturaPenSeen = true;
    return true;
  }
  if (!e.pointerType || e.pointerType === 'mouse') return true;
  if (window.__scripturaPenSeen) return false;
  return !((e.width || 0) > 35 || (e.height || 0) > 35);
}
const dcMayDot = e => e.pointerType === 'pen' || !e.pointerType || e.pointerType === 'mouse';
function DrawCanvas({
  guide,
  guideFont,
  showGuide = true,
  stroke = 8,
  size = 360,
  accent = 'var(--accent-quiz)'
}) {
  const canvasRef = React.useRef(null);
  const ctxRef = React.useRef(null);
  const drawing = React.useRef(false);
  const activeId = React.useRef(null); // pointer that owns the in-flight stroke
  const strokes = React.useRef([]);
  const cur = React.useRef(null);
  const raf = React.useRef(0);
  const getCtx = () => {
    if (!ctxRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1a1a25';
      ctx.fillStyle = '#1a1a25';
      ctxRef.current = ctx;
    }
    return ctxRef.current;
  };

  // paint only what's new since the last flush
  const paint = (ctx, s) => {
    const pts = s.pts;
    if (pts.length === 1) {
      if (s.dot && !s.dotDrawn) {
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, (pts[0].w || s.w) / 2, 0, Math.PI * 2);
        ctx.fill();
        s.dotDrawn = true;
      }
      return;
    }
    for (let i = Math.max(1, s.drawnUpTo + 1); i < pts.length; i++) {
      ctx.lineWidth = pts[i].w || s.w;
      ctx.beginPath();
      ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
      ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
    }
    s.drawnUpTo = pts.length - 1;
  };

  // full repaint — clear / undo / resize only
  const redraw = React.useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = getCtx();
    if (!ctx) return;
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (const s of strokes.current) {
      s.drawnUpTo = 0;
      s.dotDrawn = false;
      paint(ctx, s);
    }
  }, []);
  const flush = () => {
    raf.current = 0;
    const ctx = getCtx();
    if (ctx && cur.current) paint(ctx, cur.current);
  };
  const schedule = () => {
    if (!raf.current) raf.current = requestAnimationFrame(flush);
  };
  React.useEffect(() => {
    redraw();
  }, [redraw]);
  React.useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);
  const pos = e => {
    const cv = canvasRef.current;
    const r = cv.getBoundingClientRect();
    const w = e.pressure && e.pressure > 0 && e.pointerType === 'pen' ? stroke * (0.6 + e.pressure * 1.6) : stroke * 1.6;
    return {
      x: (e.clientX - r.left) * (cv.width / r.width),
      y: (e.clientY - r.top) * (cv.height / r.height),
      w
    };
  };
  const down = e => {
    // ignore secondary buttons / eraser-as-right-click
    if (e.button && e.button !== 0) return;
    if (!dcAccept(e)) return; // palm / stray touch
    e.preventDefault();
    try {
      canvasRef.current.setPointerCapture(e.pointerId);
    } catch (err) {}
    drawing.current = true;
    activeId.current = e.pointerId;
    cur.current = {
      w: stroke * 1.6,
      pts: [pos(e)],
      dot: dcMayDot(e),
      drawnUpTo: 0,
      dotDrawn: false
    };
    strokes.current.push(cur.current);
  };
  const move = e => {
    if (!drawing.current || !cur.current || e.pointerId !== activeId.current) return;
    if (!dcAccept(e)) return;
    e.preventDefault();
    // coalesced events give smoother high-frequency Pencil strokes
    const evs = e.nativeEvent && e.nativeEvent.getCoalescedEvents ? e.nativeEvent.getCoalescedEvents() : null;
    if (evs && evs.length) {
      evs.forEach(ce => cur.current.pts.push(pos(ce)));
    } else {
      cur.current.pts.push(pos(e));
    }
    schedule();
  };
  const up = e => {
    if (!drawing.current || e.pointerId !== activeId.current) return; // palm lifting mid-glyph
    drawing.current = false;
    activeId.current = null;
    try {
      canvasRef.current.releasePointerCapture(e.pointerId);
    } catch (err) {}
    const ctx = getCtx();
    if (ctx && cur.current) paint(ctx, cur.current);
  };

  // One finger (or Pencil) draws; two fingers scroll the page. touch-action
  // allows pan/zoom, and we preventDefault only single-touch moves (non-passive
  // native listener — React's synthetic touch events can be passive).
  React.useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const onTS = e => {
      if (e.touches.length > 1 && drawing.current) {
        drawing.current = false;
        activeId.current = null;
        strokes.current.pop();
        redraw(); // drop partial stroke, let the scroll happen
      }
    };
    const onTM = e => {
      if (e.touches.length === 1 && drawing.current) e.preventDefault();
    };
    cv.addEventListener('touchstart', onTS, {
      passive: true
    });
    cv.addEventListener('touchmove', onTM, {
      passive: false
    });
    return () => {
      cv.removeEventListener('touchstart', onTS);
      cv.removeEventListener('touchmove', onTM);
    };
  }, [redraw]);
  React.useEffect(() => {
    const node = canvasRef.current;
    node.__clear = () => {
      strokes.current = [];
      redraw();
    };
    node.__undo = () => {
      strokes.current.pop();
      redraw();
    };
    // read-only stroke log for trace scoring (points are in CANVAS pixel space,
    // so a scorer must measure against node.width/height, not the CSS box)
    node.__getStrokes = () => strokes.current;
  }, [redraw]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      maxWidth: '100%',
      margin: '0 auto',
      background: 'var(--canvas-bg)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-inset)'
    }
  }, showGuide && guide && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.62,
      fontFamily: guideFont,
      color: 'rgba(120,120,140,0.18)',
      pointerEvents: 'none',
      userSelect: 'none'
    }
  }, guide), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: size,
    height: size,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      cursor: 'crosshair',
      touchAction: 'pan-x pan-y pinch-zoom',
      userSelect: 'none',
      WebkitUserSelect: 'none'
    },
    onPointerDown: down,
    onPointerMove: move,
    onPointerUp: up,
    onPointerCancel: up
  }));
}
window.DrawCanvas = DrawCanvas;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/DrawCanvas.jsx", error: String((e && e.message) || e) }); }

// components/Flashcard.jsx
try { (() => {
// Flashcard — a 3D flip card. Front shows the prompt, back the answer +
// the Burmese letter-name mnemonic. Click / tap to flip.
function Flashcard({
  char,
  roman,
  name,
  gloss,
  front = 'roman',
  size = 280,
  accent = 'var(--accent-quiz)',
  flipped,
  onFlip,
  font = 'var(--font-burmese)'
}) {
  const [localFlip, setLocalFlip] = React.useState(false);
  const isFlipped = flipped != null ? flipped : localFlip;
  const flip = () => {
    onFlip ? onFlip(!isFlipped) : setLocalFlip(f => !f);
  };
  const face = {
    position: 'absolute',
    inset: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-2xl)',
    border: '1px solid var(--border-color)',
    padding: 'var(--space-6)',
    textAlign: 'center'
  };
  const promptText = front === 'roman' ? roman : char;
  const promptFont = front === 'roman' ? 'var(--font-ui)' : font;
  return /*#__PURE__*/React.createElement("div", {
    onClick: flip,
    style: {
      width: size,
      height: size,
      maxWidth: '100%',
      perspective: 1000,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transition: 'transform var(--dur-base) var(--ease)',
      transform: isFlipped ? 'rotateY(180deg)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...face,
      background: 'var(--bg-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-tight)',
      marginBottom: 'var(--space-4)'
    }
  }, front === 'roman' ? 'Sound' : 'Character'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: front === 'roman' ? '3.4rem' : '5rem',
      fontFamily: promptFont,
      fontWeight: front === 'roman' ? 700 : 400,
      color: accent,
      lineHeight: 1
    }
  }, promptText), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)',
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)'
    }
  }, "Tap to reveal")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...face,
      background: 'var(--bg-elevated)',
      transform: 'rotateY(180deg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '5rem',
      fontFamily: font,
      lineHeight: 1,
      color: 'var(--text-primary)'
    }
  }, char), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)',
      fontSize: 'var(--fs-lg)',
      color: accent,
      fontWeight: 600
    }
  }, roman), name && name !== roman && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-2)',
      fontFamily: font,
      fontSize: 'var(--fs-lg)',
      color: 'var(--text-primary)'
    }
  }, name), gloss && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      fontStyle: 'italic'
    }
  }, "\u201C", gloss, "\u201D"))));
}
window.Flashcard = Flashcard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Flashcard.jsx", error: String((e && e.message) || e) }); }

// components/Icons.jsx
try { (() => {
// Icon — line icon set (Lucide-derived paths) tinted from currentColor.
// mode="emoji" falls back to the original emoji, so screens can switch wholesale.
const ICON_PATHS = {
  home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V21h14V9.5', 'M10 21v-6h4v6'],
  map: ['M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z', 'M9 3v15', 'M15 6v15'],
  review: ['M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8', 'M3 3v5h5'],
  pen: ['M12 20h9', 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z'],
  chart: ['M12 20V10', 'M18 20V4', 'M6 20v-4'],
  build: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
  flame: ['M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'],
  arrow: ['M5 12h14', 'm12 5 7 7-7 7'],
  check: ['M20 6 9 17l-5-5'],
  zap: ['M13 2 3 14h9l-1 8 10-12h-9l1-8z'],
  cards: ['M3.5 8.5 9 3l5.5 5.5', 'M6 21h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z'],
  printer: ['M6 9V2h12v7', 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2', 'M6 14h12v8H6z'],
  target: ['M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20', 'M12 6a6 6 0 1 0 0 12a6 6 0 1 0 0-12', 'M12 10a2 2 0 1 0 0 4a2 2 0 1 0 0-4'],
  cloud: ['M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z'],
  lock: ['M5 11h14v10H5z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
  eraser: ['m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21', 'M22 21H7', 'm5 11 9 9'],
  sheet: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
  focus: ['M3 7V5a2 2 0 0 1 2-2h2', 'M17 3h2a2 2 0 0 1 2 2v2', 'M21 17v2a2 2 0 0 1-2 2h-2', 'M7 21H5a2 2 0 0 1-2-2v-2'],
  award: ['M12 2a6 6 0 1 0 0 12a6 6 0 1 0 0-12', 'M15.477 12.89 17 22l-5-3-5 3 1.523-9.11'],
  chevron: ['m9 18 6-6-6-6'],
  hand: ['M18 11V6a2 2 0 0 0-4 0v5', 'M14 10V4a2 2 0 0 0-4 0v2', 'M10 10.5V6a2 2 0 0 0-4 0v8', 'M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'],
  mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'm22 6-10 7L2 6'],
  user: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 3a4 4 0 1 0 0 8a4 4 0 1 0 0-8'],
  logout: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'm16 17 5-5-5-5', 'M21 12H9'],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3']
};
const ICON_EMOJI = {
  home: '🏠',
  map: '🗺️',
  review: '🧠',
  pen: '🖋️',
  chart: '📊',
  build: '🧩',
  flame: '🔥',
  arrow: '→',
  check: '✓',
  zap: '⚡',
  cards: '🃏',
  printer: '🖨️',
  target: '🎯',
  cloud: '☁️',
  lock: '🔒',
  x: '✕',
  eraser: '🗑',
  sheet: '📝',
  focus: '◎',
  award: '🎉',
  chevron: '›',
  hand: '✋',
  download: '↓',
  mail: '✉',
  user: '👤',
  logout: '⎋'
};
function Icon({
  name,
  size = 18,
  mode = 'line',
  style
}) {
  if (mode === 'emoji' || !ICON_PATHS[name]) return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.9,
      lineHeight: 1,
      ...style
    }
  }, ICON_EMOJI[name] || '•');
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      flexShrink: 0,
      ...style
    }
  }, ICON_PATHS[name].map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })));
}

// EmptyState — the one pattern every screen uses when there is nothing to show
// (nothing due, no results yet, script not supported): a line icon in a tinted
// disc, a one-line title, a sentence of guidance, and at most one action that
// leads somewhere useful. Keeps empty screens from being dead ends.
function EmptyState({
  icon = 'check',
  title,
  body,
  action,
  secondary,
  accent = 'var(--accent-practice)',
  compact,
  children
}) {
  const {
    Card,
    Button
  } = window.ScripturaDesignSystem_72b484;
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      textAlign: 'center',
      padding: compact ? 'var(--space-7) var(--space-6)' : 'var(--space-9) var(--space-7)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: compact ? 52 : 64,
      height: compact ? 52 : 64,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      color: accent,
      background: `color-mix(in oklab, ${accent} 16%, var(--bg-secondary))`,
      border: `1px solid color-mix(in oklab, ${accent} 40%, transparent)`,
      marginBottom: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: compact ? 24 : 28
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: compact ? 'var(--fs-body)' : 'var(--fs-lg)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      textWrap: 'balance'
    }
  }, title), body && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 'var(--fs-small)',
      maxWidth: 440,
      textWrap: 'pretty'
    }
  }, body), children, (action || secondary) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)',
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, action && /*#__PURE__*/React.createElement(Button, {
    accent: action.accent || 'practice',
    icon: action.icon ? /*#__PURE__*/React.createElement(Icon, {
      name: action.icon,
      size: 16
    }) : undefined,
    onClick: action.onClick
  }, action.label), secondary && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: secondary.icon ? /*#__PURE__*/React.createElement(Icon, {
      name: secondary.icon,
      size: 16
    }) : undefined,
    onClick: secondary.onClick
  }, secondary.label)));
}
window.Icon = Icon;
window.EmptyState = EmptyState;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Icons.jsx", error: String((e && e.message) || e) }); }

// components/LessonNode.jsx
try { (() => {
// LessonNode — one stop on the lesson path. Shows the unit's lead glyph in a
// ring of progress, the title/subtitle, a learned count, and a status state
// (done / active / locked). Active nodes pulse a soft accent glow.
function LessonNode({
  unit,
  learned,
  total,
  status,
  onClick
}) {
  const {
    ProgressRing
  } = window.ScripturaDesignSystem_72b484;
  const accent = `var(--accent-${unit.accent})`;
  const locked = status === 'locked';
  const done = status === 'done';
  const pct = total ? Math.round(learned / total * 100) : 0;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: locked,
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      width: '100%',
      textAlign: 'left',
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-2xl)',
      cursor: locked ? 'not-allowed' : 'pointer',
      background: 'var(--bg-card)',
      fontFamily: 'var(--font-ui)',
      border: `1px solid ${status === 'active' ? accent : 'var(--border-color)'}`,
      boxShadow: status === 'active' ? `var(--glow-${unit.accent})` : 'none',
      opacity: locked ? 0.55 : 1,
      transition: 'all var(--dur-base) var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(ProgressRing, {
    value: done ? total : learned,
    max: total,
    size: 76,
    stroke: 7,
    accent: unit.accent
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: unit.font || 'var(--font-burmese)',
      fontSize: '2rem',
      lineHeight: 1,
      color: locked ? 'var(--text-muted)' : 'var(--text-primary)'
    }
  }, locked ? /*#__PURE__*/React.createElement(window.Icon, {
    name: "lock",
    size: 24
  }) : unit.chars[0].char))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-lg)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, unit.title), done && /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent,
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "check",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      fontFamily: unit.font || 'var(--font-burmese)'
    }
  }, unit.subtitle), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 'var(--fs-micro)',
      color: locked ? 'var(--text-muted)' : accent,
      fontWeight: 600
    }
  }, locked ? 'Locked' : done ? 'Complete' : `${learned} / ${total} learned · ${pct}%`)), !locked && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      color: 'var(--text-secondary)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "chevron",
    size: 22
  })));
}
window.LessonNode = LessonNode;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/LessonNode.jsx", error: String((e && e.message) || e) }); }

// components/LessonPath.jsx
try { (() => {
// LessonPath — the vertical path of unit lesson nodes with overall progress.
// Header ring takes the language's theme colour; when every unit is learned the
// header turns into a completion state pointing at review / the sheet instead
// of a path with nothing left to open.
function LessonPath({
  units,
  learned,
  activeUnitId,
  onGo,
  langName,
  theme
}) {
  const {
    Card,
    ProgressRing,
    Button
  } = window.ScripturaDesignSystem_72b484;
  const {
    Icon
  } = window;
  const T = theme || {
    color: 'var(--accent-indic)',
    color2: 'var(--accent-indic-deep)'
  };
  const total = units.reduce((n, u) => n + u.chars.length, 0);
  const learnedCount = units.reduce((n, u) => n + u.chars.filter(c => learned.has(c.char)).length, 0);
  const activeIdx = units.findIndex(u => u.id === activeUnitId);
  const allDone = total > 0 && learnedCount >= total;
  const pct = total ? Math.round(learnedCount / total * 100) : 0;
  const statusOf = idx => {
    if (allDone || idx < activeIdx) return 'done';
    if (idx === activeIdx) return 'active';
    return 'locked';
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      backgroundImage: `radial-gradient(ellipse at 100% 0%, ${T.color}1f 0%, transparent 60%)`
    }
  }, /*#__PURE__*/React.createElement(ProgressRing, {
    value: learnedCount,
    max: total,
    size: 88,
    stroke: 9,
    color: T.color,
    label: `${pct}%`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 200px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 'var(--fs-lg)',
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: allDone ? 'award' : 'map',
    size: 20,
    style: {
      color: T.color
    }
  }), allDone ? `Every ${langName} unit learned` : `${langName} path`), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, allDone ? 'Nothing new to unlock — keep it fresh with review and the practice sheet.' : `${learnedCount} of ${total} learned · ${units.length} units`)), allDone && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    accent: "quiz",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "review",
      size: 16
    }),
    onClick: () => onGo({
      screen: 'review'
    })
  }, "Review"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "pen",
      size: 16
    }),
    onClick: () => onGo({
      screen: 'sheet'
    })
  }, "Practice sheet"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, units.map((u, i) => {
    const lc = u.chars.filter(c => learned.has(c.char)).length;
    return /*#__PURE__*/React.createElement(window.LessonNode, {
      key: u.id,
      unit: u,
      learned: lc,
      total: u.chars.length,
      status: statusOf(i),
      onClick: () => onGo({
        screen: 'lesson',
        unitId: u.id
      })
    });
  })));
}
window.LessonPath = LessonPath;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/LessonPath.jsx", error: String((e && e.message) || e) }); }

// components/Ring.jsx
try { (() => {
// Ring — a tiny self-contained progress ring with an arbitrary color, so the
// per-language themed rings render correctly without depending on the compiled
// design-system bundle. (The DS ProgressRing is still used for accent rings.)
function Ring({
  value = 0,
  max = 100,
  size = 120,
  stroke = 10,
  color = '#22c55e',
  label,
  sublabel,
  children
}) {
  const pct = Math.max(0, Math.min(1, max ? value / max : 0));
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--border-color)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: circ * (1 - pct),
    style: {
      transition: 'stroke-dashoffset var(--dur-base) var(--ease)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }
  }, children != null ? children : /*#__PURE__*/React.createElement(React.Fragment, null, label != null && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: size * 0.24,
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-primary)',
      lineHeight: 1
    }
  }, label), sublabel != null && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, sublabel))));
}
window.Ring = Ring;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Ring.jsx", error: String((e && e.message) || e) }); }

// components/StrokeGlyph.jsx
try { (() => {
// StrokeGlyph — an animated "watch it form" reveal of a character on a light
// card. Without true stroke-path data we use a top-to-bottom wipe with a
// travelling pen, which conveys general writing direction and is replayable.
function StrokeGlyph({
  char,
  size = 220,
  accent = 'var(--accent-practice)',
  auto = true,
  font = 'var(--font-burmese)'
}) {
  const [play, setPlay] = React.useState(0); // bump to replay
  const [revealed, setRevealed] = React.useState(!auto);
  React.useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(t);
  }, [play, char]);
  const dur = 1700;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      background: 'var(--canvas-bg)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-inset)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: font,
      fontSize: size * 0.66,
      color: 'rgba(120,120,140,0.14)'
    }
  }, char), /*#__PURE__*/React.createElement("div", {
    key: play,
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: font,
      fontSize: size * 0.66,
      color: '#1a1a25',
      clipPath: revealed ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
      transition: `clip-path ${dur}ms var(--ease)`
    }
  }, char), /*#__PURE__*/React.createElement("div", {
    key: 'pen' + play,
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 2,
      background: accent,
      boxShadow: `0 0 10px ${accent}`,
      top: revealed ? '88%' : '8%',
      opacity: revealed ? 0 : 0.9,
      transition: `top ${dur}ms var(--ease), opacity 300ms var(--ease) ${dur - 250}ms`
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setPlay(p => p + 1),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      padding: '0.5rem 1.1rem',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      color: 'var(--text-primary)',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-small)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "review",
    size: 15
  }), " Replay"));
}
window.StrokeGlyph = StrokeGlyph;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/StrokeGlyph.jsx", error: String((e && e.message) || e) }); }

// components/WordBuilder.jsx
try { (() => {
// WordBuilder — pick a consonant and a vowel sign; see them combine into a
// live Burmese syllable with its romanization. A playful, exploratory mode.
function WordBuilder({
  lang
}) {
  const {
    Card
  } = window.ScripturaDesignSystem_72b484;
  // Only consonants take vowel signs: skip independent vowels, āytam, and pre-composed ligatures.
  const consonants = (lang.allChars || []).filter(c => !c.noVowelSign);
  const [ci, setCi] = React.useState(0);
  const [vi, setVi] = React.useState(0);
  if (!lang.vowels) {
    return /*#__PURE__*/React.createElement(window.EmptyState, {
      icon: "build",
      title: `Word builder isn't set up for ${lang.name} yet`,
      body: "Vowel-sign combining is available for scripts that attach vowels to consonants. Pick one of those, or keep practising letters here."
    });
  }
  const c = consonants[ci];
  const v = lang.vowels[vi];
  const syllable = c.char + v.sign;
  const roman = c.roman.replace(/a$/, '') + v.label;
  const SF = lang.font;
  const Chip = ({
    active,
    accent,
    onClick,
    children,
    font
  }) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      minWidth: 52,
      height: 52,
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      fontFamily: font || 'var(--font-ui)',
      fontSize: font ? '1.6rem' : 'var(--fs-body)',
      background: active ? `linear-gradient(135deg, var(--accent-${accent}), var(--accent-${accent}-deep))` : 'var(--bg-secondary)',
      color: active ? 'var(--text-on-accent)' : 'var(--text-primary)',
      border: `1px solid ${active ? 'transparent' : 'var(--border-color)'}`,
      boxShadow: active ? `var(--glow-${accent})` : 'none',
      transition: 'all var(--dur-fast) var(--ease)'
    }
  }, children);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-7)',
      flexWrap: 'wrap',
      backgroundImage: 'var(--aurora)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      fontFamily: SF,
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '3.5rem',
      color: 'var(--text-primary)'
    }
  }, c.char), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '2rem'
    }
  }, "+"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '3.5rem',
      color: 'var(--text-primary)'
    }
  }, v.sign), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '2rem'
    }
  }, "=")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SF,
      fontSize: '5.5rem',
      lineHeight: 1,
      color: 'var(--accent-sheet)'
    }
  }, syllable), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-lg)',
      color: 'var(--text-secondary)',
      marginTop: 4
    }
  }, "\u201C", roman, "\u201D"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-tight)',
      marginBottom: 'var(--space-4)'
    }
  }, "Consonant"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, consonants.map((cc, idx) => /*#__PURE__*/React.createElement(Chip, {
    key: idx,
    active: idx === ci,
    accent: cc.accent,
    onClick: () => setCi(idx),
    font: SF
  }, cc.char)))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-tight)',
      marginBottom: 'var(--space-4)'
    }
  }, "Vowel sign"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, lang.vowels.map((vv, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    type: "button",
    onClick: () => setVi(idx),
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      minWidth: 60,
      padding: '0.5rem 0.8rem',
      borderRadius: 'var(--radius-lg)',
      cursor: 'pointer',
      background: idx === vi ? 'linear-gradient(135deg, var(--accent-sheet), var(--accent-sheet-deep))' : 'var(--bg-secondary)',
      color: idx === vi ? 'var(--text-on-accent)' : 'var(--text-primary)',
      border: `1px solid ${idx === vi ? 'transparent' : 'var(--border-color)'}`,
      boxShadow: idx === vi ? 'var(--glow-sheet)' : 'none',
      transition: 'all var(--dur-fast) var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SF,
      fontSize: '1.5rem'
    }
  }, "\u25CC", vv.sign), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      opacity: 0.85
    }
  }, vv.label))))));
}
window.WordBuilder = WordBuilder;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/WordBuilder.jsx", error: String((e && e.message) || e) }); }

// data/data.js
try { (() => {
// Scriptura — multi-script study data (static; no backend).
// Burmese is the deepest set (authentic letter-names + mnemonics + word builder).
// The other scripts use their real character inventories from the source app,
// grouped into teaching units. Each char carries at least { char, roman }.

(function () {
  const ACCENTS = ['practice', 'quiz', 'sheet', 'review', 'indic', 'cjk'];

  // Slice a flat char array into units per a plan; attach unit/char metadata.
  function makeUnits(flat, plan, font) {
    let i = 0;
    return plan.map((p, idx) => {
      const chars = flat.slice(i, i + p.count).map(c => ({
        char: c.char,
        roman: c.roman,
        name: c.name || c.roman,
        gloss: c.gloss || '',
        cognate: c.cognate || '',
        font
      }));
      i += p.count;
      return {
        id: p.id || 'u' + idx,
        title: p.title,
        subtitle: p.subtitle || '',
        accent: p.accent || ACCENTS[idx % ACCENTS.length],
        font,
        chars
      };
    });
  }
  const f = s => `var(--font-${s})`;

  // ---- Indic shared plan (5 vargas + misc) ----
  const indicPlan = miscCount => [{
    id: 'ka',
    title: 'Ka group',
    subtitle: 'Velar',
    accent: 'practice',
    count: 5
  }, {
    id: 'sa',
    title: 'Sa group',
    subtitle: 'Palatal',
    accent: 'quiz',
    count: 5
  }, {
    id: 'tta',
    title: 'Ta group',
    subtitle: 'Retroflex',
    accent: 'sheet',
    count: 5
  }, {
    id: 'ta',
    title: 'Ta group',
    subtitle: 'Dental',
    accent: 'review',
    count: 5
  }, {
    id: 'pa',
    title: 'Pa group',
    subtitle: 'Labial',
    accent: 'indic',
    count: 5
  }, {
    id: 'misc',
    title: 'Miscellaneous',
    subtitle: 'Semivowels & sibilants',
    accent: 'cjk',
    count: miscCount
  }];

  // ============================ BURMESE (rich) ============================
  const BUR = f('burmese');
  const burmeseUnits = [{
    id: 'ka',
    title: 'Ka group',
    subtitle: 'Velar · ကဝဂ်',
    accent: 'practice',
    font: BUR,
    chars: [{
      char: 'က',
      roman: 'ka',
      name: 'ကကြီး',
      gloss: 'big ka',
      cognate: 'क',
      font: BUR
    }, {
      char: 'ခ',
      roman: 'kha',
      name: 'ခကွေး',
      gloss: 'curved kha',
      cognate: 'ख',
      font: BUR
    }, {
      char: 'ဂ',
      roman: 'ga',
      name: 'ဂငယ်',
      gloss: 'small ga',
      cognate: 'ग',
      font: BUR,
      demoDue: true
    }, {
      char: 'ဃ',
      roman: 'gha',
      name: 'ဃကြီး',
      gloss: 'big ga',
      cognate: 'घ',
      font: BUR,
      demoDue: true
    }, {
      char: 'င',
      roman: 'nga',
      name: 'င',
      gloss: 'nga',
      cognate: 'ङ',
      font: BUR
    }]
  }, {
    id: 'sa',
    title: 'Sa group',
    subtitle: 'Palatal · စဝဂ်',
    accent: 'quiz',
    font: BUR,
    chars: [{
      char: 'စ',
      roman: 'sa',
      name: 'စလုံး',
      gloss: 'round sa',
      cognate: 'च',
      font: BUR
    }, {
      char: 'ဆ',
      roman: 'hsa',
      name: 'ဆလိမ်',
      gloss: 'twisted hsa',
      cognate: 'छ',
      font: BUR,
      demoDue: true
    }, {
      char: 'ဇ',
      roman: 'za',
      name: 'ဇကွဲ',
      gloss: 'split za',
      cognate: 'ज',
      font: BUR,
      demoDue: true
    }, {
      char: 'ဈ',
      roman: 'jha',
      name: 'ဈမျဉ်းဆွဲ',
      gloss: 'lined za',
      cognate: 'झ',
      font: BUR,
      demoDue: true
    }, {
      char: 'ည',
      roman: 'nya',
      name: 'ညကြီး',
      gloss: 'big nya',
      cognate: 'ञ',
      font: BUR,
      demoDue: true
    }]
  }, {
    id: 'tta',
    title: 'Ta group',
    subtitle: 'Retroflex · ဋဝဂ်',
    accent: 'sheet',
    font: BUR,
    chars: [{
      char: 'ဋ',
      roman: 'ta',
      name: 'ဋသန်လျင်းချိတ်',
      gloss: 'hooked ta',
      cognate: 'ट',
      font: BUR
    }, {
      char: 'ဌ',
      roman: 'hta',
      name: 'ဌဝမ်းဘဲ',
      gloss: 'duck-belly hta',
      cognate: 'ठ',
      font: BUR
    }, {
      char: 'ဍ',
      roman: 'da',
      name: 'ဍရင်ကောက်',
      gloss: 'curved-chest da',
      cognate: 'ड',
      font: BUR
    }, {
      char: 'ဎ',
      roman: 'dha',
      name: 'ဎရေမှုတ်',
      gloss: 'water-blown dha',
      cognate: 'ढ',
      font: BUR
    }, {
      char: 'ဏ',
      roman: 'na',
      name: 'ဏကြီး',
      gloss: 'big na',
      cognate: 'ण',
      font: BUR
    }]
  }, {
    id: 'ta',
    title: 'Ta group',
    subtitle: 'Dental · တဝဂ်',
    accent: 'review',
    font: BUR,
    chars: [{
      char: 'တ',
      roman: 'ta',
      name: 'တဝမ်းပူ',
      gloss: 'pot-belly ta',
      cognate: 'त',
      font: BUR
    }, {
      char: 'ထ',
      roman: 'hta',
      name: 'ထဆင်ထူး',
      gloss: 'elephant-fetter hta',
      cognate: 'थ',
      font: BUR
    }, {
      char: 'ဒ',
      roman: 'da',
      name: 'ဒထွေး',
      gloss: 'forked da',
      cognate: 'द',
      font: BUR
    }, {
      char: 'ဓ',
      roman: 'dha',
      name: 'ဓအောက်ခြိုက်',
      gloss: 'dented-below dha',
      cognate: 'ध',
      font: BUR
    }, {
      char: 'န',
      roman: 'na',
      name: 'နငယ်',
      gloss: 'small na',
      cognate: 'न',
      font: BUR
    }]
  }, {
    id: 'pa',
    title: 'Pa group',
    subtitle: 'Labial · ပဝဂ်',
    accent: 'indic',
    font: BUR,
    chars: [{
      char: 'ပ',
      roman: 'pa',
      name: 'ပစောက်',
      gloss: 'deep pa',
      cognate: 'प',
      font: BUR
    }, {
      char: 'ဖ',
      roman: 'pha',
      name: 'ဖဦးထုပ်',
      gloss: 'capped pha',
      cognate: 'फ',
      font: BUR
    }, {
      char: 'ဗ',
      roman: 'ba',
      name: 'ဗထက်ခြိုက်',
      gloss: 'dented-above ba',
      cognate: 'ब',
      font: BUR
    }, {
      char: 'ဘ',
      roman: 'bha',
      name: 'ဘကုန်း',
      gloss: 'humped bha',
      cognate: 'भ',
      font: BUR
    }, {
      char: 'မ',
      roman: 'ma',
      name: 'မ',
      gloss: 'ma',
      cognate: 'म',
      font: BUR
    }]
  }, {
    id: 'misc',
    title: 'Miscellaneous',
    subtitle: 'အမျိုးမျိုး',
    accent: 'cjk',
    font: BUR,
    chars: [{
      char: 'ယ',
      roman: 'ya',
      name: 'ယပက်လက်',
      gloss: 'supine ya',
      cognate: 'य',
      font: BUR
    }, {
      char: 'ရ',
      roman: 'ya',
      name: 'ရကောက်',
      gloss: 'curved ya',
      cognate: 'र',
      font: BUR
    }, {
      char: 'လ',
      roman: 'la',
      name: 'လ',
      gloss: 'la',
      cognate: 'ल',
      font: BUR
    }, {
      char: 'ဝ',
      roman: 'wa',
      name: 'ဝ',
      gloss: 'wa',
      cognate: 'व',
      font: BUR
    }, {
      char: 'သ',
      roman: 'tha',
      name: 'သ',
      gloss: 'tha',
      cognate: 'स',
      font: BUR
    }, {
      char: 'ဟ',
      roman: 'ha',
      name: 'ဟ',
      gloss: 'ha',
      cognate: 'ह',
      font: BUR
    }, {
      char: 'ဠ',
      roman: 'la',
      name: 'ဠကြီး',
      gloss: 'big la',
      cognate: 'ळ',
      font: BUR
    }, {
      char: 'အ',
      roman: 'a',
      name: 'အ',
      gloss: 'a',
      cognate: 'अ',
      font: BUR
    }]
  }];
  const burmeseVowels = [{
    sign: 'ာ',
    label: 'ā'
  }, {
    sign: 'ိ',
    label: 'i'
  }, {
    sign: 'ီ',
    label: 'ī'
  }, {
    sign: 'ု',
    label: 'u'
  }, {
    sign: 'ူ',
    label: 'ū'
  }, {
    sign: 'ေ',
    label: 'e'
  }, {
    sign: 'ဲ',
    label: 'ai'
  }, {
    sign: 'ော',
    label: 'aw'
  }];

  // ============================ HINDI ============================
  const hindiFlat = 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ळ क्ष ज्ञ'.split(' ').map((ch, i) => ({
    char: ch,
    roman: 'ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma ya ra la va śa ṣa sa ha ḷa kṣa jña'.split(' ')[i]
  }));

  // ============================ TELUGU ============================
  const teluguFlat = 'క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ ఱ'.split(' ').map((ch, i) => ({
    char: ch,
    roman: 'ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma ya ra la va śa ṣa sa ha ḷa ṟa'.split(' ')[i]
  }));

  // ============================ SINHALA ============================
  const sinhalaFlat = 'ක ඛ ග ඝ ඞ ච ඡ ජ ඣ ඤ ට ඨ ඩ ඪ ණ ත ථ ද ධ න ප ඵ බ භ ම ය ර ල ව ශ ෂ ස හ ළ ෆ'.split(' ').map((ch, i) => ({
    char: ch,
    roman: 'ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma ya ra la va śa ṣa sa ha ḷa fa'.split(' ')[i]
  }));
  const sinhalaVowels = [{
    sign: 'ා',
    label: 'ā'
  }, {
    sign: 'ි',
    label: 'i'
  }, {
    sign: 'ී',
    label: 'ī'
  }, {
    sign: 'ු',
    label: 'u'
  }, {
    sign: 'ූ',
    label: 'ū'
  }, {
    sign: 'ෙ',
    label: 'e'
  }, {
    sign: 'ේ',
    label: 'ē'
  }, {
    sign: 'ො',
    label: 'o'
  }];

  // ============================ TAMIL ============================
  // 18 consonants in the traditional three-way grouping.
  const TAM = f('tamil');
  const tamilUnits = [{
    id: 'uyir',
    title: 'Uyir',
    subtitle: 'Vowels · உயிர்',
    accent: 'practice',
    font: TAM,
    chars: [{
      char: 'அ',
      roman: 'a',
      name: 'அ',
      gloss: 'vowel a',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'ஆ',
      roman: 'ā',
      name: 'ஆ',
      gloss: 'long ā',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'இ',
      roman: 'i',
      name: 'இ',
      gloss: 'i',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'ஈ',
      roman: 'ī',
      name: 'ஈ',
      gloss: 'long ī',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'உ',
      roman: 'u',
      name: 'உ',
      gloss: 'u',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'ஊ',
      roman: 'ū',
      name: 'ஊ',
      gloss: 'long ū',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'எ',
      roman: 'e',
      name: 'எ',
      gloss: 'e',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'ஏ',
      roman: 'ē',
      name: 'ஏ',
      gloss: 'long ē',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'ஐ',
      roman: 'ai',
      name: 'ஐ',
      gloss: 'ai',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'ஒ',
      roman: 'o',
      name: 'ஒ',
      gloss: 'o',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'ஓ',
      roman: 'ō',
      name: 'ஓ',
      gloss: 'long ō',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'ஔ',
      roman: 'au',
      name: 'ஔ',
      gloss: 'au',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }]
  }, {
    id: 'ka',
    title: 'Ka group',
    subtitle: 'Velar · க ங',
    accent: 'quiz',
    font: TAM,
    // Read-once explainer, surfaced by LessonView before the first character.
    concept: {
      id: 'tamil-ka-allophony',
      title: 'One letter, two sounds',
      blurb: 'Tamil doesn’t spell the difference between k and g — where the letter sits in the word decides it.',
      note: 'Read once before the Ka group',
      glyph: 'க',
      positions: [{
        id: 'initial',
        tab: 'Start of word',
        sound: 'k',
        ipa: '/k/',
        rule: 'Word-initial க is always a hard k.',
        parts: [{
          t: 'க',
          hi: 1
        }, {
          t: 'டல்'
        }],
        roman: [{
          t: 'ka',
          hi: 1
        }, {
          t: 'dal'
        }],
        mean: 'sea'
      }, {
        id: 'double',
        tab: 'Doubled',
        sound: 'k',
        ipa: '/k/',
        rule: 'Doubled க்க stays hard — this is how Tamil writes a real k between vowels.',
        parts: [{
          t: 'ப'
        }, {
          t: 'க்க',
          hi: 1
        }, {
          t: 'ம்'
        }],
        roman: [{
          t: 'pa'
        }, {
          t: 'kka',
          hi: 1
        }, {
          t: 'm'
        }],
        mean: 'page, side'
      }, {
        id: 'medial',
        tab: 'Between vowels',
        sound: 'g',
        ipa: '/ɣ~g/',
        rule: 'A single க between two vowels softens to g — in some words closer to h.',
        parts: [{
          t: 'ம'
        }, {
          t: 'க',
          hi: 1
        }, {
          t: 'ன்'
        }],
        roman: [{
          t: 'ma'
        }, {
          t: 'ga',
          hi: 1
        }, {
          t: 'n'
        }],
        mean: 'son'
      }, {
        id: 'nasal',
        tab: 'After ங',
        sound: 'g',
        ipa: '/ŋg/',
        rule: 'After its own nasal ங, க voices to g.',
        parts: [{
          t: 'தங்'
        }, {
          t: 'க',
          hi: 1
        }, {
          t: 'ம்'
        }],
        roman: [{
          t: 'tha'
        }, {
          t: 'nga',
          hi: 1
        }, {
          t: 'm'
        }],
        mean: 'gold'
      }],
      contrast: {
        from: {
          text: 'क ख ग घ',
          font: 'var(--font-devanagari)',
          label: 'Hindi · 4 letters'
        },
        to: {
          text: 'க',
          label: 'Tamil · 1 letter'
        },
        note: 'Tamil has no aspirates and no separate voiced stops, so there was never a kha or gha to spell. The same holds for ச · ட · த · ப.'
      }
    },
    chars: [{
      char: 'க',
      roman: 'ka',
      name: 'க',
      gloss: 'ka · ga between vowels',
      cognate: 'क',
      font: TAM
    }, {
      char: 'ங',
      roman: 'ṅa',
      name: 'ங',
      gloss: 'nga',
      cognate: 'ङ',
      font: TAM
    }],
    // nasal sits in the Devanagari nasal column; the three middle cells stay blank
    slots: [0, null, null, null, 1]
  }, {
    id: 'ca',
    title: 'Ca group',
    subtitle: 'Palatal · ச ஞ',
    accent: 'sheet',
    font: TAM,
    chars: [{
      char: 'ச',
      roman: 'ca',
      name: 'ச',
      gloss: 'cha · sa at word start',
      cognate: 'च',
      font: TAM
    }, {
      char: 'ஞ',
      roman: 'ña',
      name: 'ஞ',
      gloss: 'nya',
      cognate: 'ञ',
      font: TAM
    }],
    // nasal sits in the Devanagari nasal column; the three middle cells stay blank
    slots: [0, null, null, null, 1]
  }, {
    id: 'tta',
    title: 'Ta group',
    subtitle: 'Retroflex · ட ண',
    accent: 'review',
    font: TAM,
    chars: [{
      char: 'ட',
      roman: 'ṭa',
      name: 'ட',
      gloss: 'retroflex ta · da between vowels',
      cognate: 'ट',
      font: TAM
    }, {
      char: 'ண',
      roman: 'ṇa',
      name: 'ண',
      gloss: 'retroflex na',
      cognate: 'ण',
      font: TAM
    }],
    // nasal sits in the Devanagari nasal column; the three middle cells stay blank
    slots: [0, null, null, null, 1]
  }, {
    id: 'ta',
    title: 'Ta group',
    subtitle: 'Dental · த ந',
    accent: 'indic',
    font: TAM,
    chars: [{
      char: 'த',
      roman: 'ta',
      name: 'த',
      gloss: 'dental ta · dha between vowels',
      cognate: 'त',
      font: TAM
    }, {
      char: 'ந',
      roman: 'na',
      name: 'ந',
      gloss: 'dental na',
      cognate: 'न',
      font: TAM
    }],
    // nasal sits in the Devanagari nasal column; the three middle cells stay blank
    slots: [0, null, null, null, 1]
  }, {
    id: 'pa',
    title: 'Pa group',
    subtitle: 'Labial · ப ம',
    accent: 'cjk',
    font: TAM,
    chars: [{
      char: 'ப',
      roman: 'pa',
      name: 'ப',
      gloss: 'pa · ba between vowels',
      cognate: 'प',
      font: TAM
    }, {
      char: 'ம',
      roman: 'ma',
      name: 'ம',
      gloss: 'ma',
      cognate: 'म',
      font: TAM
    }],
    // nasal sits in the Devanagari nasal column; the three middle cells stay blank
    slots: [0, null, null, null, 1]
  }, {
    id: 'ra',
    title: 'Ra group',
    subtitle: 'Alveolar · ற ன',
    accent: 'practice',
    font: TAM,
    chars: [{
      char: 'ற',
      roman: 'ṟa',
      name: 'ற',
      gloss: 'trilled ra · tra when doubled',
      cognate: '',
      font: TAM
    }, {
      char: 'ன',
      roman: 'ṉa',
      name: 'ன',
      gloss: 'alveolar na',
      cognate: '',
      font: TAM
    }],
    // nasal sits in the Devanagari nasal column; the three middle cells stay blank
    slots: [0, null, null, null, 1]
  }, {
    id: 'idaiyinam',
    title: 'Idaiyinam',
    subtitle: 'Semivowels & liquids · இடையினம்',
    accent: 'quiz',
    font: TAM,
    chars: [{
      char: 'ய',
      roman: 'ya',
      name: 'ய',
      gloss: 'ya',
      cognate: 'य',
      font: TAM
    }, {
      char: 'ர',
      roman: 'ra',
      name: 'ர',
      gloss: 'ra',
      cognate: 'र',
      font: TAM
    }, {
      char: 'ல',
      roman: 'la',
      name: 'ல',
      gloss: 'la',
      cognate: 'ल',
      font: TAM
    }, {
      char: 'வ',
      roman: 'va',
      name: 'வ',
      gloss: 'va',
      cognate: 'व',
      font: TAM
    }, {
      char: 'ழ',
      roman: 'ḻa',
      name: 'ழ',
      gloss: 'retroflex zha · unique to Tamil',
      cognate: '',
      font: TAM
    }, {
      char: 'ள',
      roman: 'ḷa',
      name: 'ள',
      gloss: 'retroflex la',
      cognate: 'ळ',
      font: TAM
    }]
  }, {
    id: 'grantha',
    title: 'Grantha & Āytam',
    subtitle: 'Borrowed · கிரந்தம்',
    accent: 'indic',
    font: TAM,
    chars: [{
      char: 'ஃ',
      roman: 'ḵ',
      name: 'ஆய்த எழுத்து',
      gloss: 'āytam · ஃப = f, ஃஜ = z',
      cognate: '',
      font: TAM,
      noVowelSign: true
    }, {
      char: 'ஜ',
      roman: 'ja',
      name: 'ஜ',
      gloss: 'ja · loanwords only',
      cognate: 'ज',
      font: TAM
    }, {
      char: 'ஷ',
      roman: 'ṣa',
      name: 'ஷ',
      gloss: 'retroflex sha',
      cognate: 'ष',
      font: TAM
    }, {
      char: 'ஸ',
      roman: 'sa',
      name: 'ஸ',
      gloss: 'sibilant sa',
      cognate: 'स',
      font: TAM
    }, {
      char: 'ஹ',
      roman: 'ha',
      name: 'ஹ',
      gloss: 'ha',
      cognate: 'ह',
      font: TAM
    }, {
      char: 'க்ஷ',
      roman: 'kṣa',
      name: 'க்ஷ',
      gloss: 'ksha · ligature',
      cognate: 'क्ष',
      font: TAM
    }, {
      char: 'ஸ்ரீ',
      roman: 'śrī',
      name: 'ஸ்ரீ',
      gloss: 'shri · ligature',
      cognate: 'श्री',
      font: TAM,
      noVowelSign: true
    }]
  }];
  const tamilVowels = [{
    sign: 'ா',
    label: 'ā'
  }, {
    sign: 'ி',
    label: 'i'
  }, {
    sign: 'ீ',
    label: 'ī'
  }, {
    sign: 'ு',
    label: 'u'
  }, {
    sign: 'ூ',
    label: 'ū'
  }, {
    sign: 'ெ',
    label: 'e'
  }, {
    sign: 'ே',
    label: 'ē'
  }, {
    sign: 'ை',
    label: 'ai'
  }, {
    sign: 'ொ',
    label: 'o'
  }, {
    sign: 'ோ',
    label: 'ō'
  }];

  // ============================ HIRAGANA / KATAKANA ============================
  const hiraChars = 'あ い う え お か き く け こ さ し す せ そ た ち つ て と な に ぬ ね の は ひ ふ へ ほ ま み む め も や ゆ よ ら り る れ ろ わ を ん'.split(' ');
  const kataChars = 'ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ ワ ヲ ン'.split(' ');
  const kanaRoman = 'a i u e o ka ki ku ke ko sa shi su se so ta chi tsu te to na ni nu ne no ha hi fu he ho ma mi mu me mo ya yu yo ra ri ru re ro wa wo n'.split(' ');
  const kanaPlan = lead => [{
    id: 'vowels',
    title: 'Vowels',
    subtitle: lead[0],
    accent: 'practice',
    count: 5
  }, {
    id: 'k',
    title: 'K-row',
    subtitle: lead[1],
    accent: 'quiz',
    count: 5
  }, {
    id: 's',
    title: 'S-row',
    subtitle: lead[2],
    accent: 'sheet',
    count: 5
  }, {
    id: 't',
    title: 'T-row',
    subtitle: lead[3],
    accent: 'review',
    count: 5
  }, {
    id: 'n',
    title: 'N-row',
    subtitle: lead[4],
    accent: 'indic',
    count: 5
  }, {
    id: 'h',
    title: 'H-row',
    subtitle: lead[5],
    accent: 'cjk',
    count: 5
  }, {
    id: 'm',
    title: 'M-row',
    subtitle: lead[6],
    accent: 'practice',
    count: 5
  }, {
    id: 'y',
    title: 'Y-row',
    subtitle: lead[7],
    accent: 'quiz',
    count: 3
  }, {
    id: 'r',
    title: 'R-row',
    subtitle: lead[8],
    accent: 'sheet',
    count: 5
  }, {
    id: 'w',
    title: 'W-row & N',
    subtitle: lead[9],
    accent: 'review',
    count: 3
  }];
  const hiraFlat = hiraChars.map((ch, i) => ({
    char: ch,
    roman: kanaRoman[i]
  }));
  const kataFlat = kataChars.map((ch, i) => ({
    char: ch,
    roman: kanaRoman[i]
  }));

  // ============================ KOREAN ============================
  const korChars = 'ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ ㄲ ㄸ ㅃ ㅆ ㅉ'.split(' ');
  const korRoman = 'g/k n d/t r/l m b/p s ng j ch k t p h kk tt pp ss jj'.split(' ');
  const korFlat = korChars.map((ch, i) => ({
    char: ch,
    roman: korRoman[i]
  }));
  const korPlan = [{
    id: 'basic1',
    title: 'Basic I',
    subtitle: 'ㄱ–ㅅ',
    accent: 'practice',
    count: 7
  }, {
    id: 'basic2',
    title: 'Basic II',
    subtitle: 'ㅇ–ㅎ',
    accent: 'quiz',
    count: 7
  }, {
    id: 'tense',
    title: 'Tense',
    subtitle: 'ㄲ–ㅉ',
    accent: 'sheet',
    count: 5
  }];

  // ============================ CHINESE ============================
  const zhRaw = [['一', 'yī', 'one'], ['二', 'èr', 'two'], ['三', 'sān', 'three'], ['四', 'sì', 'four'], ['五', 'wǔ', 'five'], ['六', 'liù', 'six'], ['七', 'qī', 'seven'], ['八', 'bā', 'eight'], ['九', 'jiǔ', 'nine'], ['十', 'shí', 'ten'], ['大', 'dà', 'big'], ['小', 'xiǎo', 'small'], ['人', 'rén', 'person'], ['口', 'kǒu', 'mouth'], ['日', 'rì', 'sun'], ['月', 'yuè', 'moon'], ['山', 'shān', 'mountain'], ['水', 'shuǐ', 'water'], ['火', 'huǒ', 'fire'], ['木', 'mù', 'wood']];
  const zhFlat = zhRaw.map(([char, roman, gloss]) => ({
    char,
    roman,
    gloss
  }));
  const zhPlan = [{
    id: 'numbers',
    title: 'Numbers',
    subtitle: '一 – 十',
    accent: 'practice',
    count: 10
  }, {
    id: 'nature',
    title: 'Nature & body',
    subtitle: '大 – 木',
    accent: 'indic',
    count: 10
  }];

  // ---- assemble languages ----
  function lang(id, name, native, scriptKey, group, units, vowels) {
    // startIndex lets a unit map its Nth character to the language-wide index
    // the SRS and stats stores key on.
    let at = 0;
    units.forEach(u => {
      u.startIndex = at;
      at += u.chars.length;
    });
    const allChars = units.flatMap(u => u.chars.map(c => ({
      ...c,
      unitId: u.id,
      unitTitle: u.title,
      accent: u.accent
    })));
    return {
      id,
      name,
      native,
      group,
      font: f(scriptKey),
      units,
      vowels: vowels || null,
      // demoDue marks the starter review queue shown to a learner with no history yet
      allChars,
      dueChars: allChars.filter(c => c.demoDue)
    };
  }
  const languages = {
    burmese: lang('burmese', 'Burmese', 'မြန်မာ', 'burmese', 'Southeast Asian', burmeseUnits, burmeseVowels),
    hindi: lang('hindi', 'Hindi', 'हिन्दी', 'devanagari', 'South Asian', makeUnits(hindiFlat, indicPlan(11), f('devanagari'))),
    telugu: lang('telugu', 'Telugu', 'తెలుగు', 'telugu', 'South Asian', makeUnits(teluguFlat, indicPlan(10), f('telugu'))),
    sinhala: lang('sinhala', 'Sinhala', 'සිංහල', 'sinhala', 'South Asian', makeUnits(sinhalaFlat, indicPlan(10), f('sinhala')), sinhalaVowels),
    tamil: lang('tamil', 'Tamil', 'தமிழ்', 'tamil', 'South Asian', tamilUnits, tamilVowels),
    hiragana: lang('hiragana', 'Hiragana', 'ひらがな', 'japanese', 'East Asian', makeUnits(hiraFlat, kanaPlan(['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ']), f('japanese'))),
    katakana: lang('katakana', 'Katakana', 'カタカナ', 'japanese', 'East Asian', makeUnits(kataFlat, kanaPlan(['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ']), f('japanese'))),
    korean: lang('korean', 'Korean', '한국어', 'korean', 'East Asian', makeUnits(korFlat, korPlan, f('korean'))),
    chinese: lang('chinese', 'Chinese', '汉字', 'chinese', 'East Asian', makeUnits(zhFlat, zhPlan, f('chinese')))
  };

  // ============================ CONCEPT CARDS ============================
  // Read-once explainers shown before a unit is drilled (see ConceptCard.jsx).
  // Attached here, after the units exist, so a card is a pure data addition.
  const DEV = f('devanagari');
  const attach = (lid, uid, concept) => {
    const u = languages[lid] && languages[lid].units.find(x => x.id === uid);
    if (u) u.concept = concept;
  };
  const seg = (...a) => a.map(x => Array.isArray(x) ? {
    t: x[0],
    hi: 1
  } : {
    t: x
  });

  // Tamil: the same one-letter-two-sounds rule as க, per stop.
  const tamilStop = (id, glyph, nasal, hard, soft, dev, pos, note) => ({
    id: `tamil-${id}-allophony`,
    glyph,
    title: `${glyph} — one letter, two sounds`,
    blurb: `Same rule as க: where ${glyph} sits in the word decides whether it is ${hard} or ${soft}.`,
    note: `Read once before the ${id === 'tta' ? 'retroflex Ta' : id === 'ta' ? 'dental Ta' : id[0].toUpperCase() + id.slice(1)} group`,
    positions: pos,
    contrast: {
      from: {
        text: dev,
        font: DEV,
        label: 'Hindi · 4 letters'
      },
      to: {
        text: glyph,
        label: 'Tamil · 1 letter'
      },
      note
    }
  });
  attach('tamil', 'ca', tamilStop('ca', 'ச', 'ஞ', 'ch', 's / j', 'च छ ज झ', [{
    id: 'initial',
    tab: 'Start of word',
    sound: 's',
    ipa: '/s~tʃ/',
    rule: 'Word-initial ச is usually s in speech (ch in careful reading).',
    parts: seg(['ச'], 'ட்டை'),
    roman: seg(['sa'], 'ṭṭai'),
    mean: 'shirt'
  }, {
    id: 'double',
    tab: 'Doubled',
    sound: 'ch',
    ipa: '/ttʃ/',
    rule: 'Doubled ச்ச is always a hard ch.',
    parts: seg('ப', ['ச்சை']),
    roman: seg('pa', ['cc'], 'ai'),
    mean: 'green'
  }, {
    id: 'medial',
    tab: 'Between vowels',
    sound: 's',
    ipa: '/s/',
    rule: 'A single ச between vowels is s.',
    parts: seg('ப', ['சு']),
    roman: seg('pa', ['su']),
    mean: 'cow'
  }, {
    id: 'nasal',
    tab: 'After ஞ',
    sound: 'j',
    ipa: '/ɲdʒ/',
    rule: 'After its own nasal ஞ, ச voices to j.',
    parts: seg('பஞ்', ['சு']),
    roman: seg('pañ', ['ju']),
    mean: 'cotton'
  }], 'No aspirates, no separate voiced letter — one ச covers all four Hindi sounds.'));
  attach('tamil', 'tta', tamilStop('tta', 'ட', 'ண', 'ṭ', 'ḍ', 'ट ठ ड ढ', [{
    id: 'initial',
    tab: 'Start of word',
    sound: 'ṭ',
    ipa: '/ʈ/',
    rule: 'Native Tamil words never start with ட — you only see it first in loanwords.',
    parts: seg(['ட'], 'ம்ளர்'),
    roman: seg(['ṭa'], 'mḷar'),
    mean: 'tumbler (loanword)'
  }, {
    id: 'double',
    tab: 'Doubled',
    sound: 'ṭṭ',
    ipa: '/ʈʈ/',
    rule: 'Doubled ட்ட stays hard.',
    parts: seg('ப', ['ட்ட'], 'ம்'),
    roman: seg('pa', ['ṭṭa'], 'm'),
    mean: 'kite; title'
  }, {
    id: 'medial',
    tab: 'Between vowels',
    sound: 'ḍ',
    ipa: '/ɖ~ɽ/',
    rule: 'A single ட between vowels softens to ḍ, often a quick flap.',
    parts: seg('வீ', ['டு']),
    roman: seg('vī', ['ḍu']),
    mean: 'house'
  }, {
    id: 'nasal',
    tab: 'After ண',
    sound: 'ḍ',
    ipa: '/ɳɖ/',
    rule: 'After its own nasal ண, ட voices to ḍ.',
    parts: seg('வண்', ['டி']),
    roman: seg('vaṇ', ['ḍi']),
    mean: 'cart'
  }], 'Tongue curled back for all of them — Tamil just doesn\u2019t spell voicing.'));
  attach('tamil', 'ta', tamilStop('ta', 'த', 'ந', 't', 'd', 'त थ द ध', [{
    id: 'initial',
    tab: 'Start of word',
    sound: 't',
    ipa: '/t̪/',
    rule: 'Word-initial த is a hard dental t — tongue on the teeth.',
    parts: seg(['த'], 'மிழ்'),
    roman: seg(['ta'], 'miḻ'),
    mean: 'Tamil'
  }, {
    id: 'double',
    tab: 'Doubled',
    sound: 'tt',
    ipa: '/t̪t̪/',
    rule: 'Doubled த்த stays hard.',
    parts: seg('ப', ['த்து']),
    roman: seg('pa', ['ttu']),
    mean: 'ten'
  }, {
    id: 'medial',
    tab: 'Between vowels',
    sound: 'd',
    ipa: '/d̪~ð/',
    rule: 'A single த between vowels softens to d, close to the th in “this”.',
    parts: seg('பா', ['த'], 'ம்'),
    roman: seg('pā', ['da'], 'm'),
    mean: 'foot'
  }, {
    id: 'nasal',
    tab: 'After ந',
    sound: 'd',
    ipa: '/n̪d̪/',
    rule: 'After its own nasal ந, த voices to d.',
    parts: seg('பந்', ['து']),
    roman: seg('pan', ['du']),
    mean: 'ball'
  }], 'Keep it dental: த is a different letter from the retroflex ட you just learned.'));
  attach('tamil', 'pa', tamilStop('pa', 'ப', 'ம', 'p', 'b', 'प फ ब भ', [{
    id: 'initial',
    tab: 'Start of word',
    sound: 'p',
    ipa: '/p/',
    rule: 'Word-initial ப is a hard p.',
    parts: seg(['ப'], 'ல்'),
    roman: seg(['pa'], 'l'),
    mean: 'tooth'
  }, {
    id: 'double',
    tab: 'Doubled',
    sound: 'pp',
    ipa: '/pp/',
    rule: 'Doubled ப்ப stays hard.',
    parts: seg('அ', ['ப்பா']),
    roman: seg('a', ['ppā']),
    mean: 'father'
  }, {
    id: 'medial',
    tab: 'Between vowels',
    sound: 'b',
    ipa: '/b~β/',
    rule: 'A single ப between vowels softens to b, lips barely touching.',
    parts: seg('கோ', ['ப'], 'ம்'),
    roman: seg('kō', ['ba'], 'm'),
    mean: 'anger'
  }, {
    id: 'nasal',
    tab: 'After ம',
    sound: 'b',
    ipa: '/mb/',
    rule: 'After its own nasal ம, ப voices to b.',
    parts: seg('பாம்', ['பு']),
    roman: seg('pām', ['bu']),
    mean: 'snake'
  }], 'That completes the pattern: க ச ட த ப each stand for a hard and a soft sound.'));

  // Burmese: stacked consonants, once every consonant is known.
  attach('burmese', 'misc', {
    id: 'burmese-stacking',
    glyph: 'န္တ',
    title: 'Letters that stack',
    blurb: 'In some words — mostly from Pali and Sanskrit — one consonant is tucked underneath another instead of being written after it.',
    note: 'Read once before the last consonant group',
    positions: [{
      id: 'nta',
      tab: 'န + တ',
      sound: 'n · d',
      ipa: '',
      rule: 'The top letter closes the syllable before it (as if it had ်); the bottom one starts the next.',
      parts: seg('မ', ['န္တ'], 'လေး'),
      roman: seg('ma', ['nda'], 'lay'),
      mean: 'Mandalay'
    }, {
      id: 'dda',
      tab: 'ဒ + ဓ',
      sound: 'k · d',
      ipa: '',
      rule: 'Stacks usually pair letters from the same row of the grid — here both are dentals. The top one closes as a stop.',
      parts: seg('ဗု', ['ဒ္ဓ']),
      roman: seg('bou', ['k-da']),
      mean: 'Buddha'
    }, {
      id: 'ssa',
      tab: 'စ + စ',
      sound: 't · s',
      ipa: '',
      rule: 'A letter can also stack on itself: the top copy closes the syllable, the bottom one opens the next.',
      parts: seg('ပ', ['စ္စ'], 'ည်း'),
      roman: seg('pyi', ['t-s'], 'i'),
      mean: 'thing, belongings'
    }],
    contrast: {
      from: {
        text: 'န် + တ',
        font: BUR,
        label: 'written in a row'
      },
      to: {
        text: 'န္တ',
        label: 'stacked'
      },
      note: 'Same sounds either way — stacking drops the ် and moves the second letter underneath. Read top, then bottom.'
    }
  });

  // Kana: dakuten / handakuten, before the K-row (the first row they apply to).
  // ex: [plain, marked, [marked-part, rest], [roman-hi, roman-rest], meaning] per row
  const kanaMarks = (lid, rows) => ({
    id: `${lid}-dakuten`,
    glyph: rows[0][1],
    title: 'Two small marks, a new sound',
    blurb: 'A tiny ゛ (dakuten) voices the consonant; a tiny ゜ (handakuten), only on the H-row, turns it into p. No new shapes to learn.',
    note: 'Read once before the K-row',
    positions: rows.map(([plain, marked, word, rom, mean, snd, rule]) => ({
      id: snd,
      tab: `${plain} → ${marked}`,
      sound: snd,
      ipa: `/${snd === 'g' ? 'ɡ' : snd}/`,
      rule,
      parts: seg([word[0]], word[1]),
      roman: seg([rom[0]], rom[1]),
      mean
    })),
    contrast: {
      from: {
        text: rows.slice(0, 4).map(r => r[0]).join(' '),
        font: f('japanese'),
        label: 'plain'
      },
      to: {
        text: rows.map(r => r[1]).join(' '),
        label: 'marked'
      },
      note: 'Five rows you already know give you 25 more sounds for free.'
    }
  });
  const R = {
    g: '゛ turns k into g.',
    z: '゛ turns s into z.',
    d: '゛ turns t into d.',
    b: '゛ on the H-row gives b, not v.',
    p: '゜ — the small circle — only goes on the H-row, and gives p.'
  };
  attach('hiragana', 'k', kanaMarks('hiragana', [['か', 'が', ['が', 'っこう'], ['ga', 'kkō'], 'school', 'g', R.g], ['さ', 'ざ', ['ざ', 'っし'], ['za', 'sshi'], 'magazine', 'z', R.z], ['た', 'だ', ['だ', 'いがく'], ['da', 'igaku'], 'university', 'd', R.d], ['は', 'ば', ['ば', 'んごはん'], ['ba', 'ngohan'], 'dinner', 'b', R.b], ['は', 'ぱ', ['ぱ', 'ん'], ['pa', 'n'], 'bread', 'p', R.p]]));
  // katakana words are loanwords, which is what katakana is actually used for
  attach('katakana', 'k', kanaMarks('katakana', [['カ', 'ガ', ['ガ', 'ム'], ['ga', 'mu'], 'chewing gum', 'g', R.g], ['サ', 'ザ', ['ゼ', 'ロ'], ['ze', 'ro'], 'zero', 'z', R.z], ['タ', 'ダ', ['ド', 'ア'], ['do', 'a'], 'door', 'd', R.d], ['ハ', 'バ', ['バ', 'ス'], ['ba', 'su'], 'bus', 'b', R.b], ['ハ', 'パ', ['パ', 'ン'], ['pa', 'n'], 'bread', 'p', R.p]]));

  // Per-language visual identity — signature color, native greeting, emblem,
  // and a watermark glyph. Gives each script a distinct dashboard & card look.
  const themes = {
    burmese: {
      color: '#f59e0b',
      color2: '#d97706',
      greeting: 'မင်္ဂလာပါ',
      hello: 'Mingalaba',
      emblem: '🛕',
      motif: 'က',
      blurb: 'Abugida · 33 consonants'
    },
    hindi: {
      color: '#ef4444',
      color2: '#b91c1c',
      greeting: 'नमस्ते',
      hello: 'Namaste',
      emblem: '🪔',
      motif: 'अ',
      blurb: 'Devanagari · 36 letters'
    },
    telugu: {
      color: '#22c55e',
      color2: '#15803d',
      greeting: 'నమస్కారం',
      hello: 'Namaskaram',
      emblem: '🌾',
      motif: 'క',
      blurb: 'Abugida · 35 consonants'
    },
    sinhala: {
      color: '#14b8a6',
      color2: '#0f766e',
      greeting: 'ආයුබෝවන්',
      hello: 'Āyubōwan',
      emblem: '🦚',
      motif: 'ස',
      blurb: 'Abugida · 35 consonants'
    },
    tamil: {
      color: '#8b5cf6',
      color2: '#6d28d9',
      greeting: 'வணக்கம்',
      hello: 'Vaṇakkam',
      emblem: '🪷',
      motif: 'அ',
      blurb: 'Abugida · 12 vowels + 18 consonants + Grantha'
    },
    hiragana: {
      color: '#ec4899',
      color2: '#be185d',
      greeting: 'こんにちは',
      hello: 'Konnichiwa',
      emblem: '🌸',
      motif: 'あ',
      blurb: 'Syllabary · 46 kana'
    },
    katakana: {
      color: '#6366f1',
      color2: '#4338ca',
      greeting: 'コンニチハ',
      hello: 'Konnichiwa',
      emblem: '⛩️',
      motif: 'カ',
      blurb: 'Syllabary · 46 kana'
    },
    korean: {
      color: '#3b82f6',
      color2: '#1d4ed8',
      greeting: '안녕하세요',
      hello: 'Annyeong',
      emblem: '☯',
      motif: '한',
      blurb: 'Hangul · 19 consonants'
    },
    chinese: {
      color: '#e11d48',
      color2: '#9f1239',
      greeting: '你好',
      hello: 'Nǐ hǎo',
      emblem: '🏮',
      motif: '汉',
      blurb: 'Logographic · starter set'
    }
  };
  window.ScripturaData = {
    languages,
    themes,
    languageList: [{
      id: 'burmese',
      name: 'Burmese',
      native: 'မြန်မာ',
      font: f('burmese'),
      group: 'Southeast Asian'
    }, {
      id: 'hindi',
      name: 'Hindi',
      native: 'हिन्दी',
      font: f('devanagari'),
      group: 'South Asian'
    }, {
      id: 'telugu',
      name: 'Telugu',
      native: 'తెలుగు',
      font: f('telugu'),
      group: 'South Asian'
    }, {
      id: 'sinhala',
      name: 'Sinhala',
      native: 'සිංහල',
      font: f('sinhala'),
      group: 'South Asian'
    }, {
      id: 'tamil',
      name: 'Tamil',
      native: 'தமிழ்',
      font: f('tamil'),
      group: 'South Asian'
    }, {
      id: 'hiragana',
      name: 'Hiragana',
      native: 'ひらがな',
      font: f('japanese'),
      group: 'East Asian'
    }, {
      id: 'katakana',
      name: 'Katakana',
      native: 'カタカナ',
      font: f('japanese'),
      group: 'East Asian'
    }, {
      id: 'korean',
      name: 'Korean',
      native: '한국어',
      font: f('korean'),
      group: 'East Asian'
    }, {
      id: 'chinese',
      name: 'Chinese',
      native: '汉字',
      font: f('chinese'),
      group: 'East Asian'
    }],
    defaultLang: 'burmese',
    // Seed prior progress for Burmese so the demo opens mid-journey.
    seed: {
      burmese: ['က', 'ခ', 'ဂ', 'ဃ', 'င', 'စ', 'ဇ', 'ည']
    },
    profile: {
      name: 'Learner',
      streak: 6,
      dailyGoalXp: 30,
      todayXp: 20,
      level: 4,
      levelXp: 180,
      levelMax: 250,
      xpPerCard: 5
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "data/data.js", error: String((e && e.message) || e) }); }

// design-system/components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ACCENTS = {
  practice: ['var(--accent-practice)', 'var(--accent-practice-deep)', 'var(--glow-practice)'],
  quiz: ['var(--accent-quiz)', 'var(--accent-quiz-deep)', 'var(--glow-quiz)'],
  sheet: ['var(--accent-sheet)', 'var(--accent-sheet-deep)', 'var(--glow-sheet)'],
  review: ['var(--accent-review)', 'var(--accent-review-deep)', 'var(--glow-review)'],
  indic: ['var(--accent-indic)', 'var(--accent-indic-deep)', 'var(--glow-chip)'],
  cjk: ['var(--accent-cjk)', 'var(--accent-cjk-deep)', 'var(--glow-cjk)'],
  danger: ['var(--error)', 'var(--error-deep)', '0 8px 25px rgba(239,68,68,0.3)']
};
const SIZES = {
  sm: {
    padding: '0.4rem 0.9rem',
    fontSize: 'var(--fs-micro)',
    radius: 'var(--radius-md)'
  },
  md: {
    padding: '0.8rem 2rem',
    fontSize: 'var(--fs-body)',
    radius: 'var(--radius-lg)'
  },
  lg: {
    padding: '1.25rem 4rem',
    fontSize: 'var(--fs-lg)',
    radius: 'var(--radius-xl)'
  }
};

/**
 * Scriptura primary action button. The signature look is a 135° gradient
 * fill in the chosen accent with a matching colored glow that intensifies
 * and lifts on hover.
 */
function Button({
  children,
  variant = 'primary',
  accent = 'practice',
  size = 'md',
  icon = null,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [base, deep, glow] = ACCENTS[accent] || ACCENTS.practice;
  const sz = SIZES[size] || SIZES.md;
  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${base}, ${deep})`,
      color: 'var(--text-on-accent)',
      border: 'none',
      boxShadow: hover && !disabled ? glow : 'none',
      transform: hover && !disabled ? 'var(--lift-button)' : 'none'
    },
    secondary: {
      background: hover && !disabled ? 'var(--bg-elevated)' : 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)'
    },
    ghost: {
      background: hover && !disabled ? 'var(--bg-card)' : 'transparent',
      color: hover && !disabled ? 'var(--text-primary)' : 'var(--text-secondary)',
      border: 'none'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: sz.padding,
      fontSize: sz.fontSize,
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--fw-semibold)',
      borderRadius: sz.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'all var(--dur-fast) var(--ease)',
      whiteSpace: 'nowrap',
      ...variants[variant],
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, icon), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// design-system/components/buttons/NavButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Circular icon button used for previous/next character navigation.
 * Neutral by default; fills with the quiz-blue accent on hover.
 */
function NavButton({
  children,
  onClick,
  ariaLabel,
  disabled = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 'var(--hit-target)',
      height: 'var(--hit-target)',
      borderRadius: 'var(--radius-full)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      color: 'var(--text-primary)',
      background: hover && !disabled ? 'var(--accent-quiz)' : 'var(--bg-secondary)',
      border: `1px solid ${hover && !disabled ? 'var(--accent-quiz)' : 'var(--border-color)'}`,
      transition: 'all var(--dur-fast) var(--ease)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { NavButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/components/buttons/NavButton.jsx", error: String((e && e.message) || e) }); }

// design-system/components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container — the product's standard rounded panel. `interactive`
 * adds a hover lift and border brighten (used for selectable cards).
 */
function Card({
  children,
  interactive = false,
  padding = 'var(--space-7)',
  style,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--bg-card)',
      border: `1px solid ${interactive && hover ? 'var(--text-secondary)' : 'var(--border-color)'}`,
      borderRadius: 'var(--radius-2xl)',
      padding,
      transition: 'all var(--dur-base) var(--ease)',
      transform: interactive && hover ? 'var(--lift-card)' : 'none',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// design-system/components/data-display/Pill.jsx
try { (() => {
/**
 * Rounded pill used for language selection chips and tags. Shows an optional
 * native-script glyph beside the label; active fills with an accent + glow.
 */
function Pill({
  children,
  native,
  nativeFont,
  active = false,
  accent = 'indic',
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const fill = `var(--accent-${accent})`;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.7rem',
      padding: '0.85rem 1.75rem',
      borderRadius: 'var(--radius-pill)',
      border: '2px solid transparent',
      fontFamily: 'var(--font-ui)',
      cursor: 'pointer',
      transition: 'all var(--dur-base) var(--ease)',
      background: active ? fill : hover ? 'var(--bg-elevated)' : 'transparent',
      boxShadow: active ? 'var(--glow-chip)' : 'none',
      ...style
    }
  }, native && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-lg)',
      lineHeight: 1,
      fontFamily: nativeFont || 'inherit',
      color: active ? 'var(--text-on-accent)' : 'var(--text-primary)'
    }
  }, native), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-body)',
      color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)'
    }
  }, children));
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/components/data-display/Pill.jsx", error: String((e && e.message) || e) }); }

// design-system/components/data-display/StatChip.jsx
try { (() => {
const TONES = {
  neutral: 'var(--text-primary)',
  correct: 'var(--success)',
  incorrect: 'var(--error)',
  streak: 'var(--accent-indic)',
  quiz: 'var(--accent-quiz)',
  practice: 'var(--accent-practice)'
};

/**
 * Compact stat chip — a bold value beside a muted label on an inset surface.
 * Used in the quiz stats bar (Correct / Wrong / Streak) and review tiles.
 */
function StatChip({
  value,
  label,
  tone = 'neutral',
  block = false,
  style
}) {
  const color = TONES[tone] || TONES.neutral;
  if (block) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '1rem 1.5rem',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        textAlign: 'center',
        minWidth: 90,
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-h2)',
        fontWeight: 'var(--fw-bold)',
        color,
        lineHeight: 'var(--lh-tight)'
      }
    }, value), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-hint)',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase'
      }
    }, label));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      padding: '0.6rem 1.25rem',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-md)',
      fontSize: 'var(--fs-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-lg)',
      color
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/components/data-display/StatChip.jsx", error: String((e && e.message) || e) }); }

// design-system/components/forms/RangeSlider.jsx
try { (() => {
/**
 * Thin range slider with a quiz-blue circular thumb. Used for stroke width
 * and similar bounded settings. Shows an optional value read-out.
 */
function RangeSlider({
  min = 2,
  max = 20,
  value = 8,
  step = 1,
  onChange,
  label,
  suffix = 'px',
  showValue = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange && onChange(Number(e.target.value)),
    className: "scriptura-range",
    style: {
      width: 80,
      height: 6,
      borderRadius: 3,
      background: 'var(--border-color)',
      WebkitAppearance: 'none',
      appearance: 'none',
      cursor: 'pointer'
    }
  }), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-primary)',
      minWidth: 34
    }
  }, value, suffix), /*#__PURE__*/React.createElement("style", null, `
        .scriptura-range::-webkit-slider-thumb{ -webkit-appearance:none; width:16px; height:16px;
          border-radius:50%; background:var(--accent-quiz); cursor:pointer; }
        .scriptura-range::-moz-range-thumb{ width:16px; height:16px; border:none;
          border-radius:50%; background:var(--accent-quiz); cursor:pointer; }
      `));
}
Object.assign(__ds_scope, { RangeSlider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/components/forms/RangeSlider.jsx", error: String((e && e.message) || e) }); }

// design-system/components/forms/SegmentedControl.jsx
try { (() => {
/**
 * Segmented pill control — a row of rounded options where the active one
 * fills with an accent. Used for practice modes (Sequential / Random /
 * Unpracticed) and review ranges (Last 5 / Overall).
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  accent = 'practice',
  style
}) {
  const fill = `var(--accent-${accent})`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: '0.4rem',
      flexWrap: 'wrap',
      ...style
    }
  }, options.map(opt => {
    const val = typeof opt === 'string' ? opt : opt.value;
    const lbl = typeof opt === 'string' ? opt : opt.label;
    const active = val === value;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      type: "button",
      onClick: () => onChange && onChange(val),
      style: {
        padding: '0.4rem 0.9rem',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-micro)',
        cursor: 'pointer',
        transition: 'all var(--dur-fast) var(--ease)',
        background: active ? fill : 'var(--bg-secondary)',
        color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)',
        border: `1px solid ${active ? fill : 'var(--border-color)'}`
      }
    }, lbl);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// design-system/components/forms/Toggle.jsx
try { (() => {
/**
 * Pill toggle switch. Off is a hairline-bordered track; on flips to the
 * practice-green fill with the knob sliding right.
 */
function Toggle({
  checked = false,
  onChange,
  label,
  disabled = false,
  style
}) {
  const knob = {
    position: 'absolute',
    height: 14,
    width: 14,
    left: 3,
    bottom: 3,
    borderRadius: 'var(--radius-full)',
    transition: 'var(--dur-base)',
    background: checked ? '#fff' : 'var(--text-secondary)',
    transform: checked ? 'translateX(18px)' : 'none'
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 40,
      height: 22,
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 22,
      transition: 'var(--dur-base)',
      background: checked ? 'var(--accent-practice)' : 'var(--bg-primary)',
      border: `1px solid ${checked ? 'var(--accent-practice)' : 'var(--border-color)'}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: knob
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// design-system/components/navigation/Tab.jsx
try { (() => {
const ACCENTS = {
  practice: ['var(--accent-practice)', 'var(--accent-practice-deep)'],
  quiz: ['var(--accent-quiz)', 'var(--accent-quiz-deep)'],
  sheet: ['var(--accent-sheet)', 'var(--accent-sheet-deep)'],
  review: ['var(--accent-review)', 'var(--accent-review-deep)'],
  indic: ['var(--accent-indic)', 'var(--accent-indic-deep)'],
  cjk: ['var(--accent-cjk)', 'var(--accent-cjk-deep)']
};

/**
 * Tab button used in the product's two-level navigation.
 * `layout="inline"` → icon + label on one line (mode tabs).
 * `layout="stacked"` → glyph over label over count (content-type tabs).
 * Active state fills with the accent gradient.
 */
function Tab({
  children,
  icon,
  count,
  active = false,
  accent = 'practice',
  layout = 'inline',
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [base, deep] = ACCENTS[accent] || ACCENTS.practice;
  const stacked = layout === 'stacked';
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      flex: stacked ? 1 : 'initial',
      display: 'flex',
      flexDirection: stacked ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: stacked ? '0.2rem' : '0.5rem',
      padding: stacked ? '0.75rem 1rem' : '0.7rem 1.4rem',
      border: 'none',
      borderRadius: stacked ? 'var(--radius-lg)' : 'var(--radius-md)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-body)',
      fontWeight: stacked ? 'var(--fw-semibold)' : 'var(--fw-medium)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all var(--dur-fast) var(--ease)',
      background: active ? `linear-gradient(135deg, ${base}, ${deep})` : hover ? 'var(--bg-card)' : 'transparent',
      color: active ? 'var(--text-on-accent)' : hover ? 'var(--text-primary)' : 'var(--text-secondary)',
      boxShadow: active ? 'var(--shadow-card)' : 'none',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: stacked ? 'var(--glyph-tab)' : '1rem'
    },
    "aria-hidden": "true"
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: stacked ? 'var(--fs-micro)' : 'inherit',
      whiteSpace: 'nowrap'
    }
  }, children), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      opacity: 0.7
    }
  }, count));
}
Object.assign(__ds_scope, { Tab });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/components/navigation/Tab.jsx", error: String((e && e.message) || e) }); }

// design-system/components/progress/ProgressRing.jsx
try { (() => {
const ACCENTS = {
  practice: 'var(--accent-practice)',
  quiz: 'var(--accent-quiz)',
  sheet: 'var(--accent-sheet)',
  review: 'var(--accent-review)',
  indic: 'var(--accent-indic)',
  cjk: 'var(--accent-cjk)'
};

/**
 * Circular progress ring with a centered value. Used for the daily-goal ring,
 * lesson completion, and any 0–100 metric. The track is a hairline; the
 * progress arc is the accent hue, animated to its length.
 */
function ProgressRing({
  value = 0,
  max = 100,
  size = 120,
  stroke = 10,
  accent = 'practice',
  color: colorProp,
  label,
  sublabel,
  children,
  style
}) {
  const pct = Math.max(0, Math.min(1, max ? value / max : 0));
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const color = colorProp || ACCENTS[accent] || ACCENTS.practice;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--border-color)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: circ * (1 - pct),
    style: {
      transition: 'stroke-dashoffset var(--dur-base) var(--ease)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }
  }, children != null ? children : /*#__PURE__*/React.createElement(React.Fragment, null, label != null && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: size * 0.24,
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-primary)',
      lineHeight: 1
    }
  }, label), sublabel != null && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, sublabel))));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/components/progress/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// design-system/components/progress/XPBar.jsx
try { (() => {
const ACCENTS = {
  practice: ['var(--accent-practice)', 'var(--accent-practice-deep)'],
  quiz: ['var(--accent-quiz)', 'var(--accent-quiz-deep)'],
  indic: ['var(--accent-indic)', 'var(--accent-indic-deep)'],
  review: ['var(--accent-review)', 'var(--accent-review-deep)']
};

/**
 * Horizontal XP / level progress bar. Shows a level chip, a gradient-filled
 * track, and the value read-out. Used for the learner's level progression.
 */
function XPBar({
  value = 0,
  max = 100,
  level,
  accent = 'indic',
  showValue = true,
  style
}) {
  const pct = Math.max(0, Math.min(1, max ? value / max : 0));
  const [base, deep] = ACCENTS[accent] || ACCENTS.indic;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      width: '100%',
      ...style
    }
  }, level != null && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-full)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-body)',
      color: 'var(--text-on-accent)',
      background: `linear-gradient(135deg, ${base}, ${deep})`,
      boxShadow: 'var(--shadow-card)'
    }
  }, level), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      borderRadius: 'var(--radius-full)',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${pct * 100}%`,
      borderRadius: 'var(--radius-full)',
      background: `linear-gradient(135deg, ${base}, ${deep})`,
      transition: 'width var(--dur-base) var(--ease)'
    }
  }))), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-secondary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value, " / ", max, " XP"));
}
Object.assign(__ds_scope, { XPBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/components/progress/XPBar.jsx", error: String((e && e.message) || e) }); }

// design-system/patches/core/canvas.js
try { (() => {
// Drawing Canvas Module - Works across all views
//
// Drop-in replacement for core/canvas.js. Same public API
// (constructor, init, setupCanvas, drawBackground, drawGuideCharacter,
// showGuide, hideGuide, clear, undo, redrawAllStrokes, setStrokeWidth,
// hasContent, reinit) — app.js needs no changes.
//
// Fixed in this revision:
//  1. Palm rejection. Migrated from mouse+touch listeners to Pointer Events,
//     which are the only ones that expose pointerType and the contact-patch
//     size. Once a pen is seen anywhere in the app, touch is rejected; before
//     that a patch wider than 35px is treated as palm, not a fingertip.
//  2. No more stray dots. startDrawing() used to fill a circle on every press,
//     so a resting palm left a strokeWidth-sized speck. The dot is now painted
//     in stopDrawing(), and only when the stroke really is a single point from
//     a pen or mouse.
//  3. Double-scaled touch coordinates. handleTouch() converted client coords
//     into canvas space, then startDrawing()/draw() multiplied by scaleX/scaleY
//     a second time — so touch strokes landed off-target whenever the canvas
//     was displayed at anything other than 1:1. One coordinate path now.
//  4. mouseout no longer aborts the stroke. Pointer capture keeps the stroke
//     attached when you cross the canvas edge.
//  5. A lifting palm can no longer end the pen's stroke: the pointer that owns
//     the stroke is recorded, and pointerup/cancel from any other pointer is
//     ignored.
//  6. Retina-correct backing store. The canvases were sized in CSS pixels, so
//     ink was soft on any DPR > 1. The buffer is now size * devicePixelRatio
//     with the context scaled to match; all drawing code works in CSS pixels
//     via this.size.
//  7. redrawAllStrokes() no longer blobs the start of every stroke — it drew a
//     filled circle at stroke[0] unconditionally, so undo/resize thickened the
//     start of each stroke. Only genuine single-point strokes get a dot.
//  8. Resize preserves ink (strokes are stored in CSS pixels and replayed).
//  9. Apple Pencil pressure modulates stroke width when reported.

// Shared across every DrawingCanvas instance: once a stylus has been used, we
// can safely treat all touch input as palm.
let penSeen = false;
const PALM_PATCH_PX = 35;
function acceptPointer(e) {
  if (e.pointerType === 'pen') {
    penSeen = true;
    return true;
  }
  if (!e.pointerType || e.pointerType === 'mouse') return true;
  if (penSeen) return false;
  return !((e.width || 0) > PALM_PATCH_PX || (e.height || 0) > PALM_PATCH_PX);
}

// Only a deliberate pen/mouse press may leave a dot.
const mayDot = e => e.pointerType === 'pen' || !e.pointerType || e.pointerType === 'mouse';
class DrawingCanvas {
  constructor(bgCanvasId, drawCanvasId, guideCanvasId = null) {
    this.bgCanvas = document.getElementById(bgCanvasId);
    this.drawCanvas = document.getElementById(drawCanvasId);
    this.guideCanvas = guideCanvasId ? document.getElementById(guideCanvasId) : null;
    if (!this.bgCanvas || !this.drawCanvas) {
      console.error('Canvas elements not found:', bgCanvasId, drawCanvasId);
      return;
    }
    this.bgCtx = this.bgCanvas.getContext('2d');
    this.drawCtx = this.drawCanvas.getContext('2d');
    this.guideCtx = this.guideCanvas ? this.guideCanvas.getContext('2d') : null;
    this.isDrawing = false;
    this.activePointerId = null;
    this.lastX = 0;
    this.lastY = 0;
    this.size = 0; // logical (CSS px) canvas size
    this.strokeWidth = 8;
    this.strokeColor = '#1a1a25';
    this.strokes = [];
    this.currentStroke = [];
    this.currentIsPenLike = true;
    this.guideChar = null;
    this.guideFont = null;
    this.initialized = false;
    this.init();
  }
  init() {
    if (this.initialized) return;
    this.setupCanvas();
    this.bindEvents();
    this.drawBackground();
    this.initialized = true;
  }
  setupCanvas() {
    const container = this.bgCanvas.parentElement;
    if (!container) return;
    const size = Math.min(container.offsetWidth || 400, 400);
    if (!size) return;
    const dpr = window.devicePixelRatio || 1;
    this.size = size;

    // CSS box stays in logical pixels; the backing store gets real device
    // pixels, and the context is scaled so all our drawing stays logical.
    [this.bgCanvas, this.drawCanvas, this.guideCanvas].forEach(canvas => {
      if (!canvas) return;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = size + 'px';
      canvas.style.height = size + 'px';
      const ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    });
    this.drawBackground();
    this.redrawAllStrokes();
    if (this.guideChar) this.drawGuideCharacter(this.guideChar, this.guideFont);
  }
  bindEvents() {
    // Pointer Events cover mouse, touch and stylus in one path — and are the
    // only ones carrying pointerType / contact-patch size, which is what
    // makes palm rejection possible at all.
    this.drawCanvas.style.touchAction = 'none';
    this.drawCanvas.addEventListener('pointerdown', e => this.startDrawing(e));
    this.drawCanvas.addEventListener('pointermove', e => this.draw(e));
    this.drawCanvas.addEventListener('pointerup', e => this.stopDrawing(e));
    this.drawCanvas.addEventListener('pointercancel', e => this.stopDrawing(e));

    // Resize handler with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.setupCanvas(), 100);
    });
  }

  // Single coordinate path, in logical (CSS) pixels — the context is already
  // DPR-scaled, so no further multiplication belongs here.
  pointFor(e) {
    const rect = this.drawCanvas.getBoundingClientRect();
    const w = e.pointerType === 'pen' && e.pressure > 0 ? this.strokeWidth * (0.55 + e.pressure * 1.1) : this.strokeWidth;
    return {
      x: (e.clientX - rect.left) / rect.width * this.size,
      y: (e.clientY - rect.top) / rect.height * this.size,
      w
    };
  }
  startDrawing(e) {
    if (e.button && e.button !== 0) return; // secondary button / eraser end
    if (!acceptPointer(e)) return; // palm or stray touch
    e.preventDefault();
    try {
      this.drawCanvas.setPointerCapture(e.pointerId);
    } catch (err) {}
    const p = this.pointFor(e);
    this.isDrawing = true;
    this.activePointerId = e.pointerId;
    this.currentIsPenLike = mayDot(e);
    this.lastX = p.x;
    this.lastY = p.y;
    this.currentStroke = [p];
    // No dot painted here — see stopDrawing(). Committing ink on press is
    // what turned every palm touch into a speck.
  }
  draw(e) {
    if (!this.isDrawing || e.pointerId !== this.activePointerId) return;
    if (!acceptPointer(e)) return;
    e.preventDefault();

    // Coalesced events give smoother high-frequency stylus strokes.
    const events = e.getCoalescedEvents ? e.getCoalescedEvents() : null;
    const batch = events && events.length ? events : [e];
    const ctx = this.drawCtx;
    ctx.strokeStyle = this.strokeColor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const ev of batch) {
      const p = this.pointFor(ev);
      ctx.lineWidth = p.w;
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      this.currentStroke.push(p);
      this.lastX = p.x;
      this.lastY = p.y;
    }
  }
  stopDrawing(e) {
    // Ignore pointerup from anything that isn't the pointer drawing this
    // stroke — a palm lifting mid-glyph used to truncate the pen's stroke.
    if (e && e.pointerId !== undefined && e.pointerId !== this.activePointerId) return;
    if (!this.isDrawing) return;
    if (e && e.pointerId !== undefined) {
      try {
        this.drawCanvas.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    if (this.currentStroke.length === 1) {
      // A press with no movement: ink it only if it came from a pen or
      // mouse, i.e. the user meant to make a dot.
      if (this.currentIsPenLike) {
        const p = this.currentStroke[0];
        this.drawCtx.beginPath();
        this.drawCtx.arc(p.x, p.y, (p.w || this.strokeWidth) / 2, 0, Math.PI * 2);
        this.drawCtx.fillStyle = this.strokeColor;
        this.drawCtx.fill();
        this.strokes.push([...this.currentStroke]);
      }
    } else if (this.currentStroke.length > 1) {
      this.strokes.push([...this.currentStroke]);
    }
    this.isDrawing = false;
    this.activePointerId = null;
    this.currentStroke = [];
  }
  drawBackground() {
    const size = this.size;
    if (!size) return;
    this.bgCtx.fillStyle = '#fefefe';
    this.bgCtx.fillRect(0, 0, size, size);

    // Draw grid lines
    this.bgCtx.strokeStyle = '#e0e0e0';
    this.bgCtx.lineWidth = 1;

    // Vertical center line
    this.bgCtx.beginPath();
    this.bgCtx.moveTo(size / 2, 0);
    this.bgCtx.lineTo(size / 2, size);
    this.bgCtx.stroke();

    // Horizontal center line
    this.bgCtx.beginPath();
    this.bgCtx.moveTo(0, size / 2);
    this.bgCtx.lineTo(size, size / 2);
    this.bgCtx.stroke();

    // Diagonal lines
    this.bgCtx.strokeStyle = '#f0f0f0';
    this.bgCtx.setLineDash([5, 5]);
    this.bgCtx.beginPath();
    this.bgCtx.moveTo(0, 0);
    this.bgCtx.lineTo(size, size);
    this.bgCtx.stroke();
    this.bgCtx.beginPath();
    this.bgCtx.moveTo(size, 0);
    this.bgCtx.lineTo(0, size);
    this.bgCtx.stroke();
    this.bgCtx.setLineDash([]);
  }
  drawGuideCharacter(char, fontFamily = 'Noto Sans Myanmar') {
    if (!this.guideCtx) return;
    const size = this.size;
    if (!size) return;
    this.guideChar = char;
    this.guideFont = fontFamily;
    this.guideCtx.clearRect(0, 0, size, size);

    // Calculate font size based on character length
    let fontSize = size * 0.6;
    if (char.length > 1) {
      fontSize = size * 0.5 / Math.max(1, char.length * 0.35);
    }
    this.guideCtx.font = `${fontSize}px "${fontFamily}"`;
    this.guideCtx.fillStyle = 'rgba(200, 200, 200, 0.4)';
    this.guideCtx.textAlign = 'center';
    this.guideCtx.textBaseline = 'middle';
    this.guideCtx.fillText(char, size / 2, size / 2);
  }
  hideGuide() {
    if (!this.guideCtx) return;
    this.guideChar = null;
    this.guideCtx.clearRect(0, 0, this.size, this.size);
  }
  showGuide(char, fontFamily) {
    this.drawGuideCharacter(char, fontFamily);
  }
  clear() {
    this.drawCtx.clearRect(0, 0, this.size, this.size);
    this.strokes = [];
    this.currentStroke = [];
    this.isDrawing = false;
    this.activePointerId = null;
  }
  undo() {
    if (this.strokes.length === 0) return;
    this.strokes.pop();
    this.redrawAllStrokes();
  }
  redrawAllStrokes() {
    const size = this.size;
    if (!size) return;
    const ctx = this.drawCtx;
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.strokeColor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const stroke of this.strokes) {
      if (stroke.length === 0) continue;

      // Only a true single-point stroke is a dot. The old code drew this
      // circle for every stroke, blobbing the start of each one.
      if (stroke.length === 1) {
        ctx.beginPath();
        ctx.arc(stroke[0].x, stroke[0].y, (stroke[0].w || this.strokeWidth) / 2, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineWidth = stroke[i].w || this.strokeWidth;
        ctx.beginPath();
        ctx.moveTo(stroke[i - 1].x, stroke[i - 1].y);
        ctx.lineTo(stroke[i].x, stroke[i].y);
        ctx.stroke();
      }
    }
  }
  setStrokeWidth(width) {
    this.strokeWidth = width;
  }
  hasContent() {
    return this.strokes.length > 0;
  }

  // Reinitialize canvas (useful when view becomes visible)
  reinit() {
    this.setupCanvas();
  }
}
Object.assign(__ds_scope, { DrawingCanvas });
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-system/patches/core/canvas.js", error: String((e && e.message) || e) }); }

// lib/srs.js
try { (() => {
// Scriptura — Leitner scheduling + 3-state mastery.
// Plain script; exposes window.ScripturaSRS. Storage is localStorage per
// language, Supabase-ready (same {c,w} counters ProgressStore already syncs,
// plus box/due/streak fields the cloud table can ignore until migrated).
//
// Leitner: five boxes. A correct answer promotes one box, a miss drops you to
// box 1 (classic Leitner, not SM-2 — it is forgiving to re-learn and needs no
// ease factors, which suits a 30-40 character alphabet).
//
//   box 1 → same session    box 2 → 1 day    box 3 → 3 days
//   box 4 → 7 days          box 5 → 21 days
//
// Mastery is DERIVED from the box, never stored twice:
//   new       — never attempted
//   learning  — box 1-3 (still inside the week)
//   mastered  — box 4-5 and the last answer was correct
(function () {
  const DAY = 86400000;
  const INTERVALS = [0, 0, 1 * DAY, 3 * DAY, 7 * DAY, 21 * DAY]; // index = box
  const MAX_BOX = 5;
  const SRS = {
    key: lang => `scriptura.srs.${lang}`,
    load(lang) {
      try {
        return JSON.parse(localStorage.getItem(this.key(lang)) || '{}');
      } catch (e) {
        return {};
      }
    },
    save(lang, m) {
      try {
        localStorage.setItem(this.key(lang), JSON.stringify(m));
      } catch (e) {}
    },
    // One character's record, defaulted. b=box, due=ms epoch, c/w=counters,
    // last='ok'|'miss', best=best trace score seen (0-100).
    rec(lang, idx, map) {
      const m = map || this.load(lang);
      return m[idx] || {
        b: 0,
        due: 0,
        c: 0,
        w: 0,
        last: null,
        best: 0
      };
    },
    // new | learning | mastered — the three states the UI paints.
    mastery(r) {
      if (!r || !r.b) return 'new';
      if (r.b >= 4 && r.last !== 'miss') return 'mastered';
      return 'learning';
    },
    isDue(r, now) {
      return r && r.b > 0 && (r.due || 0) <= (now || Date.now());
    },
    // Grade one attempt. ok=true promotes, false resets to box 1.
    // score (0-100) is optional trace feedback, recorded as a personal best.
    grade(lang, idx, ok, score) {
      const m = this.load(lang);
      const r = this.rec(lang, idx, m);
      if (ok) {
        r.b = Math.min(MAX_BOX, (r.b || 0) + 1);
        r.c++;
        r.last = 'ok';
      } else {
        r.b = 1;
        r.w++;
        r.last = 'miss';
      }
      r.due = Date.now() + INTERVALS[r.b];
      if (typeof score === 'number') r.best = Math.max(r.best || 0, Math.round(score));
      m[idx] = r;
      this.save(lang, m);
      return r;
    },
    // Bulk-grade a sheet pass. marks = { [idx]: 'mastered'|'learning'|'new' }
    // — anything not 'new' is an attempt; 'learning' counts as a miss so the
    // character comes back tomorrow rather than in three weeks.
    recordPass(lang, marks, scores) {
      const m = this.load(lang);
      Object.keys(marks || {}).forEach(k => {
        const state = marks[k];
        if (!state || state === 'new') return;
        const r = this.rec(lang, k, m);
        const ok = state === 'mastered';
        if (ok) {
          r.b = Math.min(MAX_BOX, (r.b || 0) + 1);
          r.c++;
          r.last = 'ok';
        } else {
          r.b = 1;
          r.w++;
          r.last = 'miss';
        }
        r.due = Date.now() + INTERVALS[r.b];
        const sc = scores && scores[k];
        if (typeof sc === 'number') r.best = Math.max(r.best || 0, Math.round(sc));
        m[k] = r;
      });
      this.save(lang, m);
      return m;
    },
    // Indices due for review, weakest box first, then longest overdue.
    dueList(lang, total) {
      const m = this.load(lang),
        now = Date.now(),
        out = [];
      for (let i = 0; i < total; i++) {
        const r = m[i];
        if (this.isDue(r, now)) out.push({
          i,
          b: r.b,
          due: r.due
        });
      }
      out.sort((a, b) => a.b - b.b || a.due - b.due);
      return out.map(o => o.i);
    },
    // Counts for the dashboard / progress screen.
    summary(lang, total) {
      const m = this.load(lang),
        now = Date.now();
      const s = {
        new: 0,
        learning: 0,
        mastered: 0,
        due: 0,
        boxes: [0, 0, 0, 0, 0, 0]
      };
      for (let i = 0; i < total; i++) {
        const r = m[i];
        s[this.mastery(r)]++;
        s.boxes[r && r.b || 0]++;
        if (this.isDue(r, now)) s.due++;
      }
      return s;
    },
    // When the next card comes back, as a short human string.
    nextDue(lang, total) {
      const m = this.load(lang),
        now = Date.now();
      let soonest = Infinity;
      for (let i = 0; i < total; i++) {
        const r = m[i];
        if (r && r.b > 0 && r.due > now) soonest = Math.min(soonest, r.due);
      }
      if (soonest === Infinity) return null;
      const d = Math.ceil((soonest - now) / DAY);
      return d <= 1 ? 'tomorrow' : `in ${d} days`;
    },
    // One-time lift from the old {c,w}-only stats store, so existing users keep
    // their history instead of resetting to all-new. Deliberately conservative:
    // in the old "mark only your mistakes" model an unmarked cell counted as
    // correct even if the learner never wrote it, so a clean record is weak
    // evidence — it earns a low box and has to be re-earned from there.
    migrateFrom(lang, stats) {
      const m = this.load(lang);
      if (Object.keys(m).length || !stats) return m;
      Object.keys(stats).forEach(k => {
        const st = stats[k],
          tries = (st.c || 0) + (st.w || 0);
        if (!tries) return;
        const rate = (st.c || 0) / tries;
        const b = rate === 1 ? tries >= 5 ? 4 : tries >= 3 ? 3 : 2 : rate >= 0.7 ? 2 : 1;
        m[k] = {
          b,
          due: Date.now() + INTERVALS[b],
          c: st.c || 0,
          w: st.w || 0,
          last: rate >= 0.5 ? 'ok' : 'miss',
          best: 0
        };
      });
      this.save(lang, m);
      return m;
    },
    reset(lang) {
      try {
        localStorage.removeItem(this.key(lang));
      } catch (e) {}
    },
    INTERVALS,
    MAX_BOX
  };

  // Presentation constants the UI shares, so mastery colours never drift apart.
  SRS.STATES = {
    new: {
      label: 'New',
      color: 'var(--text-muted)',
      icon: '○'
    },
    learning: {
      label: 'Learning',
      color: 'var(--warning, #f59e0b)',
      icon: '◐'
    },
    mastered: {
      label: 'Mastered',
      color: 'var(--success, #22c55e)',
      icon: '●'
    }
  };
  SRS.ORDER = ['new', 'learning', 'mastered'];
  SRS.next = s => SRS.ORDER[(SRS.ORDER.indexOf(s || 'new') + 1) % 3];
  window.ScripturaSRS = SRS;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "lib/srs.js", error: String((e && e.message) || e) }); }

// lib/store.js
try { (() => {
// Scriptura — progress store + optional Supabase cloud sync.
// Loaded as a plain script; exposes window.ProgressStore and window.ScripturaCloud.
// The app is fully functional OFFLINE: stats live in localStorage. If the user
// supplies Supabase keys (Progress screen → Cloud sync), stats also sync to a
// `sheet_stats` table so they follow them across devices.
//
// Accounts: progress only syncs for a signed-in user (Supabase Auth — email
// magic link or Google). Row-level security (sql/scriptura_app_auth.sql)
// limits every row to auth.uid(). Signed out, the app is device-only.
// ──────────────────────────────────────────────────────────────────────────
// Supabase table (see sql/scriptura_app_schema.sql + scriptura_app_auth.sql):
//
//   create table if not exists scriptura_app_sheet_stats (
//     user_id    text not null,
//     language   text not null,
//     char_index int  not null,
//     char       text,
//     correct    int  not null default 0,
//     wrong      int  not null default 0,
//     updated_at timestamptz default now(),
//     primary key (user_id, language, char_index)
//   );
//   alter table scriptura_app_sheet_stats enable row level security;
//   -- per-user policies: auth.uid()::text = user_id (see scriptura_app_auth.sql)
// ──────────────────────────────────────────────────────────────────────────

(function () {
  // ---------- local stats: { [charIndex]: { c: correctCount, w: wrongCount } } ----------
  const ProgressStore = {
    key: lang => `scriptura.stats.${lang}`,
    load(lang) {
      try {
        return JSON.parse(localStorage.getItem(this.key(lang)) || '{}');
      } catch (e) {
        return {};
      }
    },
    save(lang, stats) {
      try {
        localStorage.setItem(this.key(lang), JSON.stringify(stats));
      } catch (e) {}
    },
    // Record one full pass of a practice sheet. marks = { [idx]: 'wrong' }.
    // Unmarked cells count as correct (the app's original "mark only mistakes" model).
    recordPass(lang, total, marks) {
      const s = this.load(lang);
      for (let i = 0; i < total; i++) {
        const cur = s[i] || {
          c: 0,
          w: 0
        };
        if (marks[i] === 'wrong') cur.w++;else cur.c++;
        s[i] = cur;
      }
      this.save(lang, s);
      return s;
    },
    // Record only explicitly rated cells. marks = { [idx]: 'mastered'|'learning'|'new' }.
    // 'mastered' → correct, 'learning' → wrong, 'new' and absent → no attempt.
    // Used by the 3-state sheet, where an untouched cell must stay untouched.
    recordRated(lang, marks) {
      const s = this.load(lang);
      Object.keys(marks || {}).forEach(k => {
        const state = marks[k];
        if (state !== 'mastered' && state !== 'learning') return;
        const cur = s[k] || {
          c: 0,
          w: 0
        };
        if (state === 'mastered') cur.c++;else cur.w++;
        s[k] = cur;
      });
      this.save(lang, s);
      return s;
    },
    // Merge a cloud snapshot in; whichever side has more total attempts wins per char.
    merge(lang, cloudStats) {
      if (!cloudStats) return this.load(lang);
      const local = this.load(lang);
      const out = {
        ...local
      };
      Object.keys(cloudStats).forEach(i => {
        const c = cloudStats[i],
          l = local[i];
        const ct = (c.c || 0) + (c.w || 0),
          lt = l ? (l.c || 0) + (l.w || 0) : -1;
        if (ct >= lt) out[i] = {
          c: c.c || 0,
          w: c.w || 0
        };
      });
      this.save(lang, out);
      return out;
    },
    // Mastery tier for one character record → drives the heatmap color.
    tier(rec) {
      if (!rec || rec.c + rec.w === 0) return 'none';
      const wrongRate = rec.w / (rec.c + rec.w);
      if (wrongRate === 0) return 'strong'; // green  — never missed
      if (wrongRate <= 0.5) return 'shaky'; // orange — sometimes missed
      return 'weak'; // red    — missed more than half
    }
  };

  // ---------- optional Supabase cloud ----------
  const LS_CFG = 'scriptura.supabase';
  const LS_CLAIMED = 'scriptura.deviceClaimedBy';
  let client = null;
  let session = null;
  function readConfig() {
    if (window.SCRIPTURA_SUPABASE && window.SCRIPTURA_SUPABASE.url) return window.SCRIPTURA_SUPABASE;
    try {
      return JSON.parse(localStorage.getItem(LS_CFG) || 'null');
    } catch (e) {
      return null;
    }
  }
  // Signed-in Supabase user id, or null (signed out = device-only).
  function userId() {
    return session && session.user && session.user.id || null;
  }
  // Where magic links / Google send the browser back to: this exact page.
  function redirectUrl() {
    return location.origin + location.pathname;
  }
  const ScripturaCloud = {
    isConfigured() {
      const c = readConfig();
      return !!(c && c.url && c.anonKey);
    },
    setConfig(url, anonKey) {
      localStorage.setItem(LS_CFG, JSON.stringify({
        url: url.trim(),
        anonKey: anonKey.trim()
      }));
      client = null;
    },
    clearConfig() {
      localStorage.removeItem(LS_CFG);
      client = null;
    },
    userId,
    async init() {
      if (client) return client;
      const c = readConfig();
      if (!c || !c.url || !c.anonKey) return null;
      if (!window.supabase) {
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
          s.onload = res;
          s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      // implicit flow: the emailed link works even if it opens in a different
      // browser (e.g. Gmail's in-app browser) than the one that asked for it
      client = window.supabase.createClient(c.url, c.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: 'implicit'
        }
      });
      const {
        data
      } = await client.auth.getSession();
      session = data && data.session;
      return client;
    },
    // ---------- auth ----------
    async currentUser() {
      await this.init().catch(() => null);
      return session && session.user || null;
    },
    async onAuth(cb) {
      const cl = await this.init().catch(() => null);
      if (!cl) {
        cb(null, 'NO_CLOUD');
        return () => {};
      }
      const {
        data
      } = cl.auth.onAuthStateChange((evt, s) => {
        session = s;
        cb(s && s.user || null, evt);
      });
      return () => data && data.subscription && data.subscription.unsubscribe();
    },
    async signInWithEmail(email) {
      const cl = await this.init().catch(() => null);
      if (!cl) return {
        ok: false,
        error: 'Cloud sync is not configured.'
      };
      const {
        error
      } = await cl.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectUrl(),
          shouldCreateUser: true
        }
      });
      return {
        ok: !error,
        error: error && error.message
      };
    },
    async signInWithGoogle() {
      const cl = await this.init().catch(() => null);
      if (!cl) return {
        ok: false,
        error: 'Cloud sync is not configured.'
      };
      const {
        error
      } = await cl.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl()
        }
      });
      return {
        ok: !error,
        error: error && error.message
      };
    },
    async signOut() {
      const cl = await this.init().catch(() => null);
      if (cl) await cl.auth.signOut();
      session = null;
    },
    // First sign-in on this device: lift the device's progress into the
    // account (merged — higher attempt count wins per letter). Later sign-ins,
    // or a different account on the same device, only pull; the device's
    // history is never copied into a second person's account.
    async syncDevice(languageIds, charAtFor) {
      const uid = userId();
      if (!uid) return {
        ok: false
      };
      const claimedBy = localStorage.getItem(LS_CLAIMED);
      const upload = !claimedBy || claimedBy === uid;
      for (const id of languageIds) {
        const cloud = await this.loadStats(id);
        const merged = window.ProgressStore.merge(id, cloud || {});
        if (upload && Object.keys(merged).length) await this.saveStats(id, merged, charAtFor(id));
      }
      if (!claimedBy) localStorage.setItem(LS_CLAIMED, uid);
      return {
        ok: true,
        uploaded: upload
      };
    },
    // Push cumulative stats for a language. stats = { [idx]: { c, w } }.
    async saveStats(language, stats, charAt) {
      const cl = await this.init().catch(() => null);
      if (!cl) return {
        ok: false,
        offline: true
      };
      const uid = userId();
      if (!uid) return {
        ok: false,
        offline: true,
        signedOut: true
      };
      const rows = Object.keys(stats).map(i => ({
        user_id: uid,
        language_id: language,
        char_index: Number(i),
        char: charAt ? charAt(Number(i)) : null,
        correct: stats[i].c || 0,
        wrong: stats[i].w || 0,
        updated_at: new Date().toISOString()
      }));
      if (!rows.length) return {
        ok: true
      };
      const {
        error
      } = await cl.from('scriptura_app_sheet_stats').upsert(rows, {
        onConflict: 'user_id,language_id,char_index'
      });
      return {
        ok: !error,
        error
      };
    },
    async loadStats(language) {
      const cl = await this.init().catch(() => null);
      if (!cl || !userId()) return null;
      const {
        data,
        error
      } = await cl.from('scriptura_app_sheet_stats').select('char_index,correct,wrong').eq('user_id', userId()).eq('language_id', language);
      if (error) return null;
      const map = {};
      (data || []).forEach(r => {
        map[r.char_index] = {
          c: r.correct,
          w: r.wrong
        };
      });
      return map;
    },
    // Load ALL content (languages/units/characters/vowels) and rebuild the same
    // shape the app expects in window.ScripturaData.{languages,languageList}.
    async loadContent() {
      const cl = await this.init().catch(() => null);
      if (!cl) return null;
      const [L, U, C, V] = await Promise.all([cl.from('scriptura_app_languages').select('*').order('sort'), cl.from('scriptura_app_units').select('*').order('sort'), cl.from('scriptura_app_characters').select('*').order('char_index'), cl.from('scriptura_app_vowels').select('*').order('sort')]);
      if (L.error || !L.data || !L.data.length) return null;
      // Local catalogue, used to fill anything the cloud rows don't carry yet
      // (a project seeded before the slots / concept / no_vowel_sign columns).
      const local = window.ScripturaData && window.ScripturaData.languages || {};
      const languages = {},
        languageList = [];
      L.data.forEach(l => {
        languageList.push({
          id: l.id,
          name: l.name,
          native: l.native,
          font: l.font,
          group: l.grp
        });
        const loc = local[l.id] || {
          units: [],
          allChars: []
        };
        const units = (U.data || []).filter(u => u.language_id === l.id).map(u => {
          const id = String(u.id).replace(l.id + '_', '');
          const lu = loc.units.find(x => x.id === id) || {};
          return {
            id,
            _full: u.id,
            title: u.title,
            subtitle: u.subtitle,
            accent: u.accent,
            font: l.font,
            chars: [],
            slots: u.slots || lu.slots,
            concept: u.concept || lu.concept
          };
        });
        const byFull = {};
        units.forEach(u => {
          byFull[u._full] = u;
        });
        const allChars = [];
        (C.data || []).filter(c => c.language_id === l.id).forEach(c => {
          const u = byFull[c.unit_id];
          const lc = loc.allChars.find(x => x.char === c.char) || {};
          const obj = {
            char: c.char,
            roman: c.roman,
            name: c.name || c.roman,
            gloss: c.gloss || '',
            cognate: c.cognate || '',
            font: l.font,
            noVowelSign: c.no_vowel_sign != null ? !!c.no_vowel_sign : !!lc.noVowelSign
          };
          if (u) u.chars.push(obj);
          allChars.push({
            ...obj,
            unitId: u ? u.id : null,
            unitTitle: u ? u.title : '',
            accent: u ? u.accent : 'indic'
          });
        });
        // language-wide index of each unit's first character — the SRS and
        // stats stores key on it (see data.js)
        let at = 0;
        units.forEach(u => {
          u.startIndex = at;
          at += u.chars.length;
        });
        const vowels = (V.data || []).filter(v => v.language_id === l.id).map(v => ({
          sign: v.sign,
          label: v.label,
          name: v.name
        }));
        languages[l.id] = {
          id: l.id,
          name: l.name,
          native: l.native,
          group: l.grp,
          font: l.font,
          units: units.map(({
            _full,
            ...u
          }) => u),
          vowels: vowels.length ? vowels : null,
          allChars,
          dueChars: []
        };
      });
      return {
        languages,
        languageList
      };
    }
  };
  window.ProgressStore = ProgressStore;
  window.ScripturaCloud = ScripturaCloud;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "lib/store.js", error: String((e && e.message) || e) }); }

// lib/trace.js
try { (() => {
// Scriptura — trace feedback. Scores a handwritten stroke set against the
// target glyph. Plain script; exposes window.ScripturaTrace.
//
// Method: both the user's ink and the real glyph are rasterized, cropped to
// their bounding boxes, and resampled into the same small occupancy grid. That
// makes the comparison scale- and position-invariant — writing small in the
// corner or large in the middle is not an error, getting the SHAPE wrong is.
// Two independent numbers come out of it:
//
//   coverage  — how much of the glyph the ink reaches   → "you missed a part"
//   precision — how much of the ink lands on the glyph  → "you drew outside it"
//
// Neither alone is honest: one thick blob over the whole letter scores full
// coverage, and a single short tick scores full precision. The score is their
// harmonic mean, so both have to be good.
//
// Stroke ORDER and direction are not graded — when writing an abugida by hand
// the visual result is what the learner is judged on, and false "wrong order"
// failures on a correct-looking glyph are worse than no feedback at all.
//
// Known limit: letters that differ only by one small detail (Burmese က vs ဆ,
// which share a body and differ in a tail) score close together. The scorer is
// answering "is this an acceptable rendering of the letter you were asked for",
// not "which of the 33 letters is this" — so a false pass on a letter the
// learner wasn't even asked to write is an acceptable trade for not failing
// honest attempts.
(function () {
  const GRID = 40; // occupancy grid the shapes are compared in
  const RES = 240; // working raster size before bounding-box normalization
  const TOL = 1.6; // distance (in grid cells) at which credit falls to zero

  let pad = null;
  function scratch(w, h) {
    if (!pad) pad = document.createElement('canvas');
    if (pad.width !== w || pad.height !== h) {
      pad.width = w;
      pad.height = h;
    }
    return pad;
  }

  // ctx.font cannot parse `var(--font-tamil)` — it silently keeps its previous
  // value, which leaves the target raster empty and makes every score bogus.
  // Resolve CSS custom properties to a real family list via a probe element.
  let probe = null;
  const fontCache = {};
  function resolveFont(font) {
    if (!font) return 'sans-serif';
    if (font.indexOf('var(') === -1) return font;
    if (fontCache[font]) return fontCache[font];
    if (!probe) {
      probe = document.createElement('span');
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden';
      document.body.appendChild(probe);
    }
    probe.style.fontFamily = font;
    fontCache[font] = getComputedStyle(probe).fontFamily || 'sans-serif';
    return fontCache[font];
  }

  // Crop an ImageData's opaque pixels to their bounding box, then resample into
  // a GRID×GRID occupancy array. Returns null if there is nothing to sample.
  function normalize(img, w, h) {
    const d = img.data;
    let minX = w,
      minY = h,
      maxX = -1,
      maxY = -1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (d[(y * w + x) * 4 + 3] < 40) continue;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
    if (maxX < 0) return null;
    // keep the aspect ratio: fit the longer side to the grid so a tall letter
    // is not stretched into a square
    const bw = maxX - minX + 1,
      bh = maxY - minY + 1;
    const span = Math.max(bw, bh);
    const offX = minX - (span - bw) / 2,
      offY = minY - (span - bh) / 2;
    const cell = span / GRID;
    const g = new Uint8Array(GRID * GRID);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (d[(y * w + x) * 4 + 3] < 40) continue;
        const gx = Math.floor((x - offX) / cell),
          gy = Math.floor((y - offY) / cell);
        if (gx < 0 || gy < 0 || gx >= GRID || gy >= GRID) continue;
        g[gy * GRID + gx] = 1;
      }
    }
    return g;
  }
  function glyphGrid(char, font) {
    const fam = resolveFont(font);
    const cv = scratch(RES, RES);
    const ctx = cv.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, RES, RES);
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.round(RES * 0.6)}px ${fam}`;
    ctx.fillText(char, RES / 2, RES / 2);
    return normalize(ctx.getImageData(0, 0, RES, RES), RES, RES);
  }

  // Draw the stroke log into the working raster (scaled to fit RES) and
  // normalize it the same way.
  function inkGrid(strokes, w, h) {
    const s = RES / Math.max(w, h);
    const cv = scratch(RES, RES);
    const ctx = cv.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, RES, RES);
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#000';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    strokes.forEach(st => {
      const p = st.pts || [];
      if (!p.length) return;
      if (p.length === 1) {
        ctx.beginPath();
        ctx.arc(p[0].x * s, p[0].y * s, Math.max(1, (p[0].w || 4) * s / 2), 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      for (let i = 1; i < p.length; i++) {
        ctx.lineWidth = Math.max(1, (p[i].w || 4) * s);
        ctx.beginPath();
        ctx.moveTo(p[i - 1].x * s, p[i - 1].y * s);
        ctx.lineTo(p[i].x * s, p[i].y * s);
        ctx.stroke();
      }
    });
    return normalize(ctx.getImageData(0, 0, RES, RES), RES, RES);
  }

  // Chamfer distance transform: for every cell, the distance to the nearest set
  // cell of `g`. Binary dilation was too blunt here — at this resolution any two
  // Tamil letters overlap enough to look alike, so credit has to fall off with
  // distance instead of being all-or-nothing inside a fixed radius.
  const BIG = 1e6;
  function distField(g) {
    const d = new Float32Array(GRID * GRID);
    for (let i = 0; i < d.length; i++) d[i] = g[i] ? 0 : BIG;
    const D1 = 1,
      D2 = Math.SQRT2;
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const i = y * GRID + x;
        let v = d[i];
        if (y > 0) {
          v = Math.min(v, d[i - GRID] + D1);
          if (x > 0) v = Math.min(v, d[i - GRID - 1] + D2);
          if (x < GRID - 1) v = Math.min(v, d[i - GRID + 1] + D2);
        }
        if (x > 0) v = Math.min(v, d[i - 1] + D1);
        d[i] = v;
      }
    }
    for (let y = GRID - 1; y >= 0; y--) {
      for (let x = GRID - 1; x >= 0; x--) {
        const i = y * GRID + x;
        let v = d[i];
        if (y < GRID - 1) {
          v = Math.min(v, d[i + GRID] + D1);
          if (x < GRID - 1) v = Math.min(v, d[i + GRID + 1] + D2);
          if (x > 0) v = Math.min(v, d[i + GRID - 1] + D2);
        }
        if (x < GRID - 1) v = Math.min(v, d[i + 1] + D1);
        d[i] = v;
      }
    }
    return d;
  }

  // Mean credit for the set cells of `g`, where credit decays linearly with the
  // distance to the other shape and hits zero at TOL cells away.
  function similarity(g, field) {
    let n = 0,
      sum = 0;
    for (let i = 0; i < g.length; i++) {
      if (!g[i]) continue;
      n++;
      const c = 1 - field[i] / TOL;
      if (c > 0) sum += c;
    }
    return n ? sum / n : 0;
  }
  const count = g => {
    let n = 0;
    for (let i = 0; i < g.length; i++) n += g[i];
    return n;
  };
  const Trace = {
    // strokes: [{ pts:[{x,y,w}] }] in the coordinate space of a w×h box.
    // → { ok, score, coverage, precision, verdict, hint } or null when there is
    // not enough ink to judge.
    score(strokes, char, font, w, h) {
      if (!strokes || !strokes.length || !w || !h) return null;
      const pts = strokes.reduce((n, s) => n + (s.pts ? s.pts.length : 0), 0);
      if (pts < 5) return null; // a tap or a tick — nothing to score

      const ink = inkGrid(strokes, w, h);
      if (!ink) return null;
      const inkN = count(ink);
      if (inkN < 10) return null; // a smudge, not an attempt at a glyph

      const tgt = glyphGrid(char, font); // reuses the scratch canvas — after ink
      if (!tgt) return null;
      const tgtN = count(tgt);
      if (!tgtN) return null;

      // graded both ways: how close the glyph is to some ink, and the ink to
      // some glyph. Distance-weighted, so near-misses earn partial credit and
      // a differently-shaped letter does not.
      const coverage = similarity(tgt, distField(ink));
      const precision = similarity(ink, distField(tgt));
      const f = coverage + precision ? 2 * coverage * precision / (coverage + precision) : 0;
      const score = Math.round(f * 100);
      let verdict, hint;
      if (score >= 75) {
        verdict = 'good';
        hint = 'Clean match.';
      } else if (score >= 55) {
        verdict = 'close';
        hint = coverage < precision ? 'Close — part of the letter is missing.' : 'Close — some strokes run outside the letter.';
      } else {
        verdict = 'off';
        hint = coverage < 0.45 ? 'Not quite — compare against the ghost and try again.' : 'Shape is off — check the proportions against the ghost.';
      }
      return {
        ok: score >= 55,
        score,
        coverage: Math.round(coverage * 100),
        precision: Math.round(precision * 100),
        verdict,
        hint
      };
    },
    // Colour for a score, shared with the UI so the palette stays in one place.
    color(score) {
      if (score == null) return 'var(--text-muted)';
      if (score >= 75) return 'var(--success, #22c55e)';
      if (score >= 55) return 'var(--warning, #f59e0b)';
      return 'var(--error, #ef4444)';
    },
    GRID,
    TOL
  };
  window.ScripturaTrace = Trace;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "lib/trace.js", error: String((e && e.message) || e) }); }

// screens/Dashboard.jsx
try { (() => {
// Dashboard — the home screen. Left: what to do next (active unit, its actual
// glyphs, today's numbers, practice tools). Right: every script you're learning,
// grouped by writing-system family, with per-script progress.
function Dashboard({
  profile,
  units,
  learned,
  activeUnitId,
  dueCount,
  onGo,
  theme,
  lang,
  languageList,
  themes,
  currentLang,
  onPick
}) {
  const {
    Card,
    Button
  } = window.ScripturaDesignSystem_72b484;
  const Icon = window.Icon;
  const D = window.ScripturaData;
  const total = units.reduce((n, u) => n + u.chars.length, 0);
  const learnedCount = learned.size;
  const activeUnit = units.find(u => u.id === activeUnitId) || units[0];
  const activeLearned = activeUnit.chars.filter(c => learned.has(c.char)).length;
  const T = theme || {
    color: 'var(--accent-practice)',
    color2: 'var(--accent-practice-deep)',
    greeting: '',
    hello: '',
    emblem: '👋',
    motif: '',
    blurb: ''
  };
  const groups = React.useMemo(() => {
    const m = new Map();
    (languageList || []).forEach(l => {
      const k = l.group || 'Other';
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(l);
    });
    return [...m.entries()];
  }, [languageList]);
  const Label = ({
    children,
    style
  }) => /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-micro)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-label)',
      color: 'var(--text-secondary)',
      ...style
    }
  }, children);
  const ScriptRow = ({
    l
  }) => {
    const L = (D.languages || {})[l.id];
    const lt = themes && themes[l.id] || {
      color: 'var(--accent-indic)',
      color2: 'var(--accent-indic-deep)',
      emblem: '',
      motif: ''
    };
    const tot = L ? L.allChars.length : 0;
    const n = l.id === currentLang ? learnedCount : ((D.seed || {})[l.id] || []).length;
    const on = l.id === currentLang;
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onPick(l.id),
      title: l.name,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: '10px 12px',
        textAlign: 'left',
        cursor: 'pointer',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${on ? lt.color : 'var(--border-color)'}`,
        background: on ? `color-mix(in oklab, ${lt.color} 14%, var(--bg-card))` : 'var(--bg-card)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-ui)',
        transition: 'all var(--dur-fast) var(--ease)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        width: 40,
        height: 40,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-md)',
        display: 'grid',
        placeItems: 'center',
        fontFamily: l.font,
        fontSize: '1.35rem',
        lineHeight: 1,
        color: '#fff',
        background: `linear-gradient(135deg, ${lt.color}, ${lt.color2})`
      }
    }, lt.motif || l.native.slice(0, 1)), lt.emblem && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        right: -5,
        bottom: -5,
        width: 19,
        height: 19,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        fontSize: 11,
        lineHeight: 1,
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)'
      }
    }, lt.emblem)), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 8,
        fontSize: 'var(--fs-small)',
        fontWeight: 700
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, l.name), /*#__PURE__*/React.createElement("span", {
      style: {
        color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
        fontWeight: 500,
        fontVariantNumeric: 'tabular-nums'
      }
    }, n, "/", tot)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        height: 4,
        marginTop: 7,
        borderRadius: 2,
        background: 'var(--bg-secondary)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        height: '100%',
        width: `${tot ? n / tot * 100 : 0}%`,
        background: lt.color,
        borderRadius: 2
      }
    }))));
  };
  const [pickerOpen, setPickerOpen] = React.useState(false);
  React.useEffect(() => {
    if (!pickerOpen) return;
    const onKey = e => {
      if (e.key === 'Escape') setPickerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pickerOpen]);
  const pick = id => {
    setPickerOpen(false);
    onPick(id);
  };
  const groupOf = l => l.group || '';
  const countFor = id => id === currentLang ? learnedCount : ((D.seed || {})[id] || []).length;
  const totalFor = id => {
    const L = (D.languages || {})[id];
    return L ? L.allChars.length : 0;
  };
  const Tool = ({
    icon,
    label,
    desc,
    badge,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: '14px 16px',
      cursor: 'pointer',
      textAlign: 'left',
      minWidth: 0,
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-md)',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--bg-secondary)',
      color: T.color,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700,
      fontSize: 'var(--fs-small)'
    }
  }, label, badge > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      padding: '0 7px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--error)',
      color: '#fff'
    }
  }, badge)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)',
      marginTop: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, desc)));
  const goalPct = Math.max(0, Math.min(1, profile.dailyGoalXp ? profile.todayXp / profile.dailyGoalXp : 0));
  const R = 23,
    CIRC = 2 * Math.PI * R;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "dash-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: `radial-gradient(120% 100% at 100% 0%, color-mix(in oklab, ${T.color} 22%, transparent), transparent 60%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 46,
      height: 46,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 'var(--radius-md)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: lang.font,
      fontSize: '1.55rem',
      lineHeight: 1,
      color: '#fff',
      background: `linear-gradient(135deg, ${T.color}, ${T.color2})`
    }
  }, T.motif || lang.native.slice(0, 1)), T.emblem && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -7,
      bottom: -7,
      width: 26,
      height: 26,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      fontSize: 15,
      lineHeight: 1,
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)'
    }
  }, T.emblem)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      minWidth: 0
    }
  }, T.greeting ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: lang.font,
      fontSize: '1.6rem',
      fontWeight: 700,
      lineHeight: 1.15
    }
  }, T.greeting) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.3rem',
      fontWeight: 700
    }
  }, lang.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)'
    }
  }, T.hello ? `${T.hello} · ` : '', lang.name))), /*#__PURE__*/React.createElement(Label, null, "Up next"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-display)',
      fontWeight: 700,
      lineHeight: 1.05
    }
  }, activeUnit.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap'
    }
  }, activeUnit.subtitle, " \xB7 ", activeLearned, "/", activeUnit.chars.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, activeUnit.chars.slice(0, 8).map((c, i) => {
    const got = learned.has(c.char);
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        width: 58,
        height: 70,
        borderRadius: 'var(--radius-md)',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        fontFamily: lang.font,
        fontSize: '1.7rem',
        background: got ? `linear-gradient(135deg, ${T.color}, ${T.color2})` : 'var(--bg-secondary)',
        color: got ? '#fff' : 'var(--text-primary)',
        border: `1px solid ${got ? 'transparent' : 'var(--border-color)'}`
      }
    }, c.char, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: 4,
        fontSize: 11,
        fontFamily: 'var(--font-ui)',
        color: got ? 'rgba(255,255,255,.92)' : 'var(--text-secondary)'
      }
    }, c.roman));
  }), activeUnit.chars.length > 8 && /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: 'center',
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)'
    }
  }, "+", activeUnit.chars.length - 8)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => onGo({
      screen: 'lesson',
      unitId: activeUnit.id
    }),
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow",
      size: 16
    }),
    style: {
      background: `linear-gradient(135deg, ${T.color}, ${T.color2})`,
      color: '#fff'
    }
  }, "Continue lesson"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)'
    }
  }, learnedCount, " of ", total, " characters learned")))), /*#__PURE__*/React.createElement("div", {
    className: "dash-stats"
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 52,
      height: 52,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "52",
    height: "52",
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "26",
    cy: "26",
    r: R,
    fill: "none",
    stroke: "var(--bg-secondary)",
    strokeWidth: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "26",
    cy: "26",
    r: R,
    fill: "none",
    stroke: T.color,
    strokeWidth: "6",
    strokeLinecap: "round",
    strokeDasharray: CIRC,
    strokeDashoffset: CIRC * (1 - goalPct),
    style: {
      transition: 'stroke-dashoffset var(--dur-base) var(--ease)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      color: T.color
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, profile.todayXp, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)',
      fontWeight: 500
    }
  }, "/ ", profile.dailyGoalXp, " XP")), /*#__PURE__*/React.createElement(Label, null, "today"))), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0,
      background: 'var(--bg-secondary)',
      color: 'var(--accent-review)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, profile.streak, " days"), /*#__PURE__*/React.createElement(Label, null, "streak"))), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0,
      fontWeight: 700,
      color: '#fff',
      background: `linear-gradient(135deg, ${T.color}, ${T.color2})`
    }
  }, profile.level), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, "Level ", profile.level), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      marginTop: 6,
      borderRadius: 2,
      background: 'var(--bg-secondary)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${profile.levelXp / profile.levelMax * 100}%`,
      background: T.color
    }
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, {
    style: {
      display: 'block',
      marginBottom: 'var(--space-3)'
    }
  }, "Practice"), /*#__PURE__*/React.createElement("div", {
    className: "dash-tools"
  }, /*#__PURE__*/React.createElement(Tool, {
    icon: "review",
    label: "Review",
    badge: dueCount,
    desc: dueCount > 0 ? `${dueCount} cards due` : 'All caught up',
    onClick: () => onGo({
      screen: 'review'
    })
  }), /*#__PURE__*/React.createElement(Tool, {
    icon: "pen",
    label: "Practice sheet",
    desc: "Write every character by hand",
    onClick: () => onGo({
      screen: 'sheet'
    })
  }), lang.vowels ? /*#__PURE__*/React.createElement(Tool, {
    icon: "build",
    label: "Word builder",
    desc: "Consonant + vowel sign",
    onClick: () => onGo({
      screen: 'build'
    })
  }) : /*#__PURE__*/React.createElement(Tool, {
    icon: "cards",
    label: "Flashcards",
    desc: "Flip & recall every character",
    onClick: () => onGo({
      screen: 'flashcards'
    })
  }), /*#__PURE__*/React.createElement(Tool, {
    icon: "map",
    label: "Lesson path",
    desc: `${units.length} unit groups`,
    onClick: () => onGo({
      screen: 'path'
    })
  })))), /*#__PURE__*/React.createElement("div", {
    className: "dash-rail",
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Your scripts"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)'
    }
  }, (languageList || []).length)), /*#__PURE__*/React.createElement("div", {
    className: "dash-scripts"
  }, groups.map(([grp, items]) => /*#__PURE__*/React.createElement("div", {
    key: grp
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 8,
      padding: '2px 2px 6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      fontWeight: 700,
      color: 'var(--text-secondary)'
    }
  }, grp), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, items.length)), /*#__PURE__*/React.createElement("div", {
    className: "dash-group-items"
  }, items.map(l => /*#__PURE__*/React.createElement(ScriptRow, {
    key: l.id,
    l: l
  })))))))), /*#__PURE__*/React.createElement("div", {
    className: "dash-dock"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setPickerOpen(true),
    "aria-haspopup": "dialog",
    "aria-expanded": pickerOpen,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      width: '100%',
      minHeight: 58,
      padding: '8px 14px 8px 9px',
      cursor: 'pointer',
      borderRadius: 16,
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-ui)',
      textAlign: 'left',
      border: `1px solid color-mix(in oklab, ${T.color} 55%, transparent)`,
      background: `linear-gradient(135deg, color-mix(in oklab, ${T.color} 30%, var(--bg-card)), color-mix(in oklab, ${T.color2} 18%, var(--bg-card)))`,
      boxShadow: 'var(--shadow-lg, 0 8px 24px rgba(0,0,0,.35))'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 40,
      height: 40,
      borderRadius: 11,
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center',
      background: `linear-gradient(135deg, ${T.color}, ${T.color2})`,
      color: '#fff',
      fontFamily: lang.font,
      fontSize: '1.3rem',
      lineHeight: 1
    }
  }, T.motif || lang.native.slice(0, 1), T.emblem && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -6,
      bottom: -6,
      width: 21,
      height: 21,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      fontSize: 12,
      lineHeight: 1,
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)'
    }
  }, T.emblem)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--fs-body)',
      fontWeight: 700
    }
  }, lang.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)'
    }
  }, groupOf(lang), " \xB7 ", learnedCount, "/", total, " learned \xB7 tap to switch")), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      fontSize: '.85rem',
      fontWeight: 700,
      color: '#fff',
      background: `linear-gradient(135deg, ${T.color}, ${T.color2})`,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 16,
    style: {
      transform: 'rotate(-90deg)'
    }
  })))), pickerOpen && /*#__PURE__*/React.createElement("div", {
    className: "dash-dock-sheet",
    role: "dialog",
    "aria-label": "Choose a script"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setPickerOpen(false),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(4,4,8,0.66)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 201,
      maxHeight: '82vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-color)',
      borderRadius: '22px 22px 0 0',
      paddingBottom: 'env(safe-area-inset-bottom)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 4,
      borderRadius: 2,
      background: 'var(--border-color)',
      margin: '9px auto 4px',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '6px 18px 10px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 'var(--fs-lg)',
      fontWeight: 700
    }
  }, "Your scripts"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)'
    }
  }, (languageList || []).length, " \xB7 grouped by family")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      padding: '0 14px 18px'
    }
  }, groups.map(([grp, items]) => /*#__PURE__*/React.createElement("div", {
    key: grp
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '12px 4px 7px',
      position: 'sticky',
      top: 0,
      background: 'var(--bg-primary)'
    }
  }, /*#__PURE__*/React.createElement(Label, null, grp), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, items.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8
    }
  }, items.map(l => {
    const lt = themes && themes[l.id] || {
      color: 'var(--accent-indic)',
      color2: 'var(--accent-indic-deep)',
      motif: ''
    };
    const p = {
      learned: countFor(l.id),
      total: totalFor(l.id)
    };
    const on = l.id === currentLang;
    return /*#__PURE__*/React.createElement("button", {
      key: l.id,
      type: "button",
      onClick: () => pick(l.id),
      "aria-pressed": on,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        minHeight: 60,
        cursor: 'pointer',
        textAlign: 'left',
        borderRadius: 14,
        border: `1px solid ${on ? lt.color : 'var(--border-color)'}`,
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-ui)',
        background: on ? `color-mix(in oklab, ${lt.color} 15%, var(--bg-card))` : 'var(--bg-card)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        flexShrink: 0,
        display: 'grid',
        placeItems: 'center',
        color: '#fff',
        background: `linear-gradient(135deg, ${lt.color}, ${lt.color2})`,
        fontFamily: l.font,
        fontSize: '1.2rem',
        lineHeight: 1
      }
    }, lt.motif || l.native.slice(0, 1)), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 'var(--fs-small)',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, l.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: 'var(--text-secondary)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, p.learned, "/", p.total), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        height: 4,
        marginTop: 6,
        borderRadius: 2,
        background: 'var(--bg-secondary)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        height: '100%',
        borderRadius: 2,
        background: lt.color,
        width: `${Math.max(2, p.total ? p.learned / p.total * 100 : 0)}%`
      }
    }))));
  }))))))));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "screens/Dashboard.jsx", error: String((e && e.message) || e) }); }

// screens/LessonView.jsx
try { (() => {
// LessonView — the focused study loop for one unit. A unit with a `concept`
// opens with a read-once explainer, then each character runs
// Learn (watch it form + mnemonic) → Trace (write it, scored) → Quiz (recall & flip).
// Correct recalls mark the character learned, award XP, and grade into the SRS.
function LessonView({
  unit,
  learned,
  onComplete,
  onExit,
  xpPerCard = 5,
  langId
}) {
  const {
    Card,
    Button,
    NavButton
  } = window.ScripturaDesignSystem_72b484;
  const SRS = window.ScripturaSRS,
    Trace = window.ScripturaTrace;
  const accent = `var(--accent-${unit.accent})`;
  const hasConcept = !!(unit.concept && unit.concept.positions);
  const steps = ['learn', 'trace', 'quiz'];
  const [ci, setCi] = React.useState(0);
  const [step, setStep] = React.useState(hasConcept ? 'concept' : 'learn');
  const [flipped, setFlipped] = React.useState(false);
  const [xp, setXp] = React.useState(0);
  const [got, setGot] = React.useState(() => new Set());
  const [finished, setFinished] = React.useState(false);
  const [traceFb, setTraceFb] = React.useState(null); // { score, verdict, hint }
  const cv = React.useRef(null);
  const c = unit.chars[ci];
  const totalSteps = unit.chars.length * steps.length;
  const doneSteps = step === 'concept' ? 0 : ci * steps.length + steps.indexOf(step);
  // global index of this char within the language, for SRS keys
  const baseIdx = unit.startIndex || 0;
  const advance = learnedThis => {
    if (learnedThis) {
      setGot(g => new Set(g).add(c.char));
      setXp(x => x + xpPerCard);
    }
    if (SRS && langId) SRS.grade(langId, baseIdx + ci, !!learnedThis, traceFb ? traceFb.score : undefined);
    setFlipped(false);
    setTraceFb(null);
    if (ci + 1 >= unit.chars.length) {
      setFinished(true);
      return;
    }
    setCi(ci + 1);
    setStep('learn');
  };

  // Score the traced glyph against the real one. Reads the stroke log DrawCanvas
  // parks on its canvas element; if that is unavailable we simply advance
  // without feedback rather than blocking the lesson.
  const checkTrace = () => {
    const el = cv.current;
    const strokes = el && el.__getStrokes && el.__getStrokes();
    if (!Trace || !el || !strokes || !strokes.length) {
      setStep('quiz');
      return;
    }
    // DrawCanvas logs points in canvas pixel space — score against that box
    const fb = Trace.score(strokes, c.char, unit.font, el.width, el.height);
    if (!fb) {
      setStep('quiz');
      return;
    }
    setTraceFb(fb);
  };
  if (finished) {
    const Stat = ({
      n,
      label,
      color
    }) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-h2)',
        fontWeight: 700,
        color
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-hint)',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase'
      }
    }, label));
    return /*#__PURE__*/React.createElement(window.EmptyState, {
      icon: "award",
      accent: accent,
      title: `${unit.title} complete`,
      body: "Letters you got right are scheduled for review tomorrow; the rest come back today.",
      action: {
        label: 'Back to path',
        icon: 'arrow',
        accent: unit.accent,
        onClick: () => onComplete([...got], xp)
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-7)',
        justifyContent: 'center',
        marginTop: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(Stat, {
      n: `+${xp}`,
      label: "XP earned",
      color: accent
    }), /*#__PURE__*/React.createElement(Stat, {
      n: got.size,
      label: "learned",
      color: "var(--accent-practice)"
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onExit,
    "aria-label": "Exit lesson",
    style: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      color: 'var(--text-primary)',
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "x",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 12,
      borderRadius: 'var(--radius-full)',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${doneSteps / totalSteps * 100}%`,
      background: accent,
      borderRadius: 'var(--radius-full)',
      transition: 'width var(--dur-base) var(--ease)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      flexShrink: 0
    }
  }, ci + 1, "/", unit.chars.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      justifyContent: 'center'
    }
  }, (hasConcept ? ['concept'].concat(steps) : steps).map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      fontSize: 'var(--fs-micro)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-tight)',
      padding: '0.3rem 0.9rem',
      borderRadius: 'var(--radius-pill)',
      background: s === step ? accent : 'var(--bg-secondary)',
      color: s === step ? 'var(--text-on-accent)' : 'var(--text-muted)'
    }
  }, s))), step === 'concept' && /*#__PURE__*/React.createElement(window.ConceptCard, {
    concept: unit.concept,
    accent: unit.accent,
    font: unit.font,
    onDone: () => setStep('learn'),
    doneLabel: `Got it — start ${unit.title}`
  }), step === 'learn' && /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      gap: 'var(--space-8)',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(window.StrokeGlyph, {
    char: c.char,
    accent: accent,
    size: 220,
    font: unit.font
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 220px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '3rem',
      fontWeight: 700,
      color: accent
    }
  }, c.roman), c.name && c.name !== c.roman && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: unit.font,
      fontSize: 'var(--fs-title)',
      marginTop: 4
    }
  }, c.name), c.gloss && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-body)',
      color: 'var(--text-secondary)',
      fontStyle: 'italic'
    }
  }, "\u201C", c.gloss, "\u201D"), c.cognate && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-devanagari)',
      fontSize: '1.4rem',
      color: 'var(--text-primary)'
    }
  }, c.cognate), " Devanagari cognate"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    accent: unit.accent,
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "arrow",
      size: 16
    }),
    onClick: () => setStep('trace')
  }, "I've got it")))), step === 'trace' && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      color: 'var(--text-secondary)',
      marginBottom: 'var(--space-5)'
    }
  }, "Trace ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-primary)',
      fontFamily: unit.font
    }
  }, c.char), " \xB7 ", /*#__PURE__*/React.createElement("i", null, c.roman)), /*#__PURE__*/React.createElement("div", {
    ref: el => {
      cv.current = el && el.querySelector('canvas');
    }
  }, /*#__PURE__*/React.createElement(window.DrawCanvas, {
    guide: c.char,
    guideFont: unit.font,
    showGuide: true,
    stroke: 8,
    size: 340,
    accent: accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      justifyContent: 'center',
      marginTop: 'var(--space-6)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "eraser",
      size: 16
    }),
    onClick: () => {
      setTraceFb(null);
      cv.current && cv.current.__clear && cv.current.__clear();
    }
  }, "Clear"), !traceFb ? /*#__PURE__*/React.createElement(Button, {
    accent: unit.accent,
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "check",
      size: 16
    }),
    onClick: checkTrace
  }, "Check my trace") : /*#__PURE__*/React.createElement(Button, {
    accent: unit.accent,
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "arrow",
      size: 16
    }),
    onClick: () => setStep('quiz')
  }, "Continue"), !traceFb && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setStep('quiz')
  }, "Skip")), traceFb && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      marginTop: 'var(--space-5)',
      padding: 'var(--space-5)',
      borderRadius: 'var(--radius-lg, 14px)',
      background: 'var(--bg-secondary)',
      border: `1px solid ${Trace.color(traceFb.score)}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '2rem',
      fontWeight: 700,
      color: Trace.color(traceFb.score),
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, traceFb.score, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1rem'
    }
  }, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      fontWeight: 600,
      textWrap: 'pretty'
    }
  }, traceFb.hint), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, traceFb.coverage, "% of the letter covered \xB7 ", traceFb.precision, "% of your ink on it")))), step === 'quiz' && /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 'var(--fs-small)'
    }
  }, "Recall the character for this sound, then flip to check."), /*#__PURE__*/React.createElement(window.Flashcard, {
    char: c.char,
    roman: c.roman,
    name: c.name,
    gloss: c.gloss,
    font: unit.font,
    front: "roman",
    accent: accent,
    flipped: flipped,
    onFlip: setFlipped
  }), !flipped ? /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "review",
      size: 16
    }),
    onClick: () => setFlipped(true)
  }, "Flip to check") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    accent: "danger",
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "review",
      size: 16
    }),
    onClick: () => advance(false)
  }, "Again"), /*#__PURE__*/React.createElement(Button, {
    accent: "practice",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "check",
      size: 16
    }),
    onClick: () => advance(true)
  }, "Got it \xB7 +", xpPerCard))));
}
window.LessonView = LessonView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "screens/LessonView.jsx", error: String((e && e.message) || e) }); }

// screens/LoginScreen.jsx
try { (() => {
// LoginScreen — optional sign-in. Email magic link on top (primary), Google at
// the bottom, and a quiet "continue without an account" escape: the app works
// fully signed out, saving on this device only.
function LoginScreen({
  onSkip,
  cloudReady = true
}) {
  const {
    Button
  } = window.ScripturaDesignSystem_72b484;
  const {
    Icon
  } = window;
  const Cloud = window.ScripturaCloud;
  const [email, setEmail] = React.useState(() => {
    try {
      return localStorage.getItem('scriptura.lastEmail') || '';
    } catch (e) {
      return '';
    }
  });
  const [phase, setPhase] = React.useState('form'); // form | sending | sent
  const [err, setErr] = React.useState('');
  const [cool, setCool] = React.useState(0);
  const [gBusy, setGBusy] = React.useState(false);
  React.useEffect(() => {
    if (!cool) return;
    const t = setTimeout(() => setCool(cool - 1), 1000);
    return () => clearTimeout(t);
  }, [cool]);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const send = async e => {
    if (e) e.preventDefault();
    if (!valid) {
      setErr('Enter a valid email address.');
      return;
    }
    setErr('');
    setPhase('sending');
    const r = await Cloud.signInWithEmail(email);
    if (!r.ok) {
      setErr(r.error || 'Could not send the link. Try again.');
      setPhase('form');
      return;
    }
    try {
      localStorage.setItem('scriptura.lastEmail', email.trim());
    } catch (e2) {}
    setPhase('sent');
    setCool(30);
  };
  const google = async () => {
    setErr('');
    setGBusy(true);
    const r = await Cloud.signInWithGoogle(); // navigates away on success
    if (!r.ok) {
      setErr(r.error || 'Google sign-in is unavailable.');
      setGBusy(false);
    }
  };
  const field = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.85rem 1rem',
    minHeight: 48,
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${err ? 'var(--error)' : 'var(--border-color)'}`,
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--fs-body)',
    outline: 'none'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--space-6) var(--space-5)',
      boxSizing: 'border-box',
      backgroundImage: 'radial-gradient(ellipse at 20% 0%, rgba(34,197,94,.14) 0%, transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(139,92,246,.16) 0%, transparent 55%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 420,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-4)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "icons/logo.svg",
    alt: "",
    width: "64",
    height: "64",
    style: {
      display: 'block',
      borderRadius: 15
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-h2)',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
      textWrap: 'balance'
    }
  }, phase === 'sent' ? 'Check your inbox' : 'Sign in to Scriptura'), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 'var(--fs-small)',
      maxWidth: 340,
      textWrap: 'pretty'
    }
  }, phase === 'sent' ? /*#__PURE__*/React.createElement(React.Fragment, null, "We sent a sign-in link to ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-primary)'
    }
  }, email.trim()), ". Open it on the device you want to use.") : 'Your marks and review schedule follow you to every device. Progress already on this device moves into your account.')), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      boxShadow: 'var(--shadow-card)'
    }
  }, !cloudReady ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 'var(--fs-small)',
      textAlign: 'center'
    }
  }, "Sign-in isn't available \u2014 cloud sync isn't configured for this copy of the app.") : phase === 'sent' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-4)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 60,
      height: 60,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--accent-practice)',
      background: 'color-mix(in oklab, var(--accent-practice) 16%, var(--bg-secondary))',
      border: '1px solid color-mix(in oklab, var(--accent-practice) 40%, transparent)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 26
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-muted)'
    }
  }, "No email? Check spam, or resend."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    disabled: cool > 0,
    onClick: () => send()
  }, cool > 0 ? `Resend in ${cool}s` : 'Resend link'), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => {
      setPhase('form');
      setErr('');
    }
  }, "Use a different email"))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: send,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    },
    noValidate: true
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "login-email",
    style: {
      fontSize: 'var(--fs-small)',
      fontWeight: 600
    }
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    id: "login-email",
    type: "email",
    inputMode: "email",
    autoComplete: "email",
    autoFocus: true,
    placeholder: "you@example.com",
    value: email,
    onChange: e => {
      setEmail(e.target.value);
      if (err) setErr('');
    },
    style: field,
    "aria-invalid": !!err,
    "aria-describedby": "login-err"
  }), /*#__PURE__*/React.createElement(Button, {
    accent: "practice",
    type: "submit",
    disabled: phase === 'sending',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 16
    }),
    style: {
      width: '100%',
      justifyContent: 'center',
      minHeight: 48,
      marginTop: 'var(--space-2)'
    }
  }, phase === 'sending' ? 'Sending…' : 'Email me a sign-in link'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, "No password \u2014 the link signs you in.")), err && /*#__PURE__*/React.createElement("div", {
    id: "login-err",
    role: "alert",
    style: {
      color: 'var(--error)',
      fontSize: 'var(--fs-small)',
      textAlign: 'center'
    }
  }, err), cloudReady && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      color: 'var(--text-muted)',
      fontSize: 'var(--fs-hint)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border-color)'
    }
  }), "or", /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border-color)'
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: google,
    disabled: gBusy,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      width: '100%',
      minHeight: 48,
      padding: '0 1rem',
      borderRadius: 'var(--radius-md)',
      border: '1px solid #dadce0',
      background: '#fff',
      color: '#1f1f1f',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-body)',
      fontWeight: 600,
      cursor: gBusy ? 'wait' : 'pointer',
      opacity: gBusy ? 0.7 : 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 48 48",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#EA4335",
    d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#4285F4",
    d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FBBC05",
    d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#34A853",
    d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
  })), gBusy ? 'Opening Google…' : 'Continue with Google'))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSkip,
    style: {
      alignSelf: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-small)',
      padding: '0.75rem 1rem',
      minHeight: 44,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: 'underline',
      textUnderlineOffset: 3
    }
  }, "Continue without an account"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "Progress stays on this device only"))));
}
window.LoginScreen = LoginScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "screens/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// screens/PracticeSheet.jsx
try { (() => {
// PracticeSheet — a printable worksheet grouped by unit. One writable cell per
// character: a faint "ghost" glyph to trace (toggle), a romanized prompt (no
// answer shown), a canvas to write on, a Check button that scores the trace
// against the real glyph, and a 3-state mastery chip (new → learning →
// mastered). Cells open on what the Leitner scheduler already knows; ratings
// made this pass override that and are graded into the boxes on Save.

// Input hygiene (shared with DrawCanvas via window.__scripturaPenSeen): once a
// pen has been seen anywhere in the app, touch is rejected outright — a resting
// palm fires pointerdown and used to commit a one-point stroke, which redraw()
// rendered as a 4px filled dot. Before any pen is seen, touch is still allowed
// (finger writing) but a large contact patch is treated as palm, not ink.
const INK = '#1a1a25';
function acceptPointer(e) {
  if (e.pointerType === 'pen') {
    window.__scripturaPenSeen = true;
    return true;
  }
  if (!e.pointerType || e.pointerType === 'mouse') return true;
  if (window.__scripturaPenSeen) return false;
  return !((e.width || 0) > 35 || (e.height || 0) > 35);
}
// only pen/mouse may leave a deliberate dot; a stray one-point touch renders nothing
const mayDot = e => e.pointerType === 'pen' || !e.pointerType || e.pointerType === 'mouse';
function SheetCell({
  idx,
  item,
  font,
  showGhost,
  status,
  accent,
  onCycle,
  big,
  inkStore,
  rev,
  locked,
  onScore,
  onInk,
  checkers
}) {
  const canvasRef = React.useRef(null);
  const cellRef = React.useRef(null);
  const fitRef = React.useRef(null);
  const ctxRef = React.useRef(null);
  const dprRef = React.useRef(1);
  const drawing = React.useRef(false);
  const activeId = React.useRef(null); // pointer that owns the in-flight stroke
  // strokes live in the parent's inkStore (keyed by global char index) so the
  // grid cell and its focus-mode twin show the same ink
  const strokes = React.useRef(null);
  if (inkStore) strokes.current = inkStore[idx] || (inkStore[idx] = []);else if (!strokes.current) strokes.current = [];
  const raf = React.useRef(0);
  const getCtx = () => {
    if (!ctxRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = INK;
      ctx.fillStyle = INK;
      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0); // draw in CSS px, store at device px
      ctxRef.current = ctx;
    }
    return ctxRef.current;
  };

  // Ink is stored in a cell-independent frame: origin at the cell centre, unit =
  // the cell's shorter side. The grid cell and its focus-mode twin are very
  // different sizes and aspect ratios, so raw CSS px drawn in focus mode landed
  // outside the small grid canvas and looked like it had vanished on exit.
  // Normalising keeps the glyph centred and scaled to whichever cell shows it.
  const frame = () => {
    const cv = canvasRef.current,
      dpr = dprRef.current || 1;
    const w = cv ? cv.width / dpr : 1,
      h = cv ? cv.height / dpr : 1;
    return {
      cx: w / 2,
      cy: h / 2,
      s: Math.max(1, Math.min(w, h)),
      w,
      h
    };
  };
  const toPx = (p, f) => ({
    x: f.cx + p.x * f.s,
    y: f.cy + p.y * f.s,
    w: Math.max(1.6, (p.w || 0.02) * f.s)
  });

  // draw only the segments added since the last flush
  const paint = (ctx, s) => {
    const f = frame();
    const pts = s.pts;
    if (pts.length === 1) {
      if (s.dot && !s.dotDrawn) {
        const p = toPx(pts[0], f);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
        s.dotDrawn = true;
      }
      return;
    }
    for (let i = Math.max(1, (s.drawnUpTo || 0) + 1); i < pts.length; i++) {
      const a = toPx(pts[i - 1], f),
        b = toPx(pts[i], f);
      ctx.lineWidth = b.w;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    s.drawnUpTo = pts.length - 1;
  };

  // full repaint — reserved for clear / undo / resize, never for pointermove
  const redraw = React.useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = getCtx();
    if (!ctx) return;
    ctx.clearRect(0, 0, cv.width / dprRef.current, cv.height / dprRef.current);
    for (const s of strokes.current) {
      s.drawnUpTo = 0;
      s.dotDrawn = false;
      paint(ctx, s);
    }
  }, []);

  // Back the canvas with devicePixelRatio pixels so strokes are crisp on retina /
  // Android panels, and re-fit whenever the cell resizes (focus mode, rotation,
  // breakpoint change) or the window moves to a screen with a different DPR.
  React.useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const fit = () => {
      const r = cv.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const w = Math.round(r.width * dpr),
        h = Math.round(r.height * dpr);
      if (cv.width === w && cv.height === h && dprRef.current === dpr) return;
      cv.width = w;
      cv.height = h;
      dprRef.current = dpr;
      ctxRef.current = null; // resizing a canvas resets its context state
      redraw();
    };
    fit();
    fitRef.current = fit;
    let ro = null;
    // observe the cell wrapper, not the canvas: ResizeObserver does not report
    // box changes for replaced elements like <canvas> in every engine. RO is a
    // best-effort trigger only — start() re-fits on pointerdown, which is the
    // guarantee that the backing store is right at the moment ink is laid down.
    if (window.ResizeObserver && cellRef.current) {
      ro = new ResizeObserver(fit);
      ro.observe(cellRef.current);
    }
    window.addEventListener('resize', fit);
    return () => {
      fitRef.current = null;
      if (ro) ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, [redraw, big]);
  // parent bumps rev when ink may have changed elsewhere (focus-mode exit, save)
  React.useEffect(() => {
    redraw();
  }, [redraw, rev]);
  const flush = () => {
    raf.current = 0;
    const ctx = getCtx();
    if (!ctx) return;
    const s = strokes.current[strokes.current.length - 1];
    if (s) paint(ctx, s);
  };
  const schedule = () => {
    if (!raf.current) raf.current = requestAnimationFrame(flush);
  };
  React.useEffect(() => () => {
    if (raf.current) cancelAnimationFrame(raf.current);
  }, []);
  const pos = e => {
    const cv = canvasRef.current;
    const r = cv.getBoundingClientRect();
    const px = e.pressure && e.pressure > 0 && e.pointerType === 'pen' ? 2 + e.pressure * 6 : 4;
    const f = frame();
    // normalised frame (see frame()); round to keep the persisted log small
    const q = n => Math.round(n * 1000) / 1000;
    return {
      x: q((e.clientX - r.left - f.cx) / f.s),
      y: q((e.clientY - r.top - f.cy) / f.s),
      w: q(px / f.s)
    };
  };
  const start = e => {
    if (e.button && e.button !== 0) return;
    if (!acceptPointer(e)) return; // palm / stray touch — no preventDefault, no stroke
    e.preventDefault();
    if (fitRef.current) fitRef.current(); // layout may have changed since the last refit
    try {
      canvasRef.current.setPointerCapture(e.pointerId);
    } catch (err) {}
    drawing.current = true;
    activeId.current = e.pointerId;
    strokes.current.push({
      pts: [pos(e)],
      dot: mayDot(e),
      drawnUpTo: 0,
      dotDrawn: false
    });
  };
  const move = e => {
    if (!drawing.current || e.pointerId !== activeId.current) return;
    if (!acceptPointer(e)) return;
    e.preventDefault();
    const evs = e.nativeEvent && e.nativeEvent.getCoalescedEvents ? e.nativeEvent.getCoalescedEvents() : null;
    const s = strokes.current[strokes.current.length - 1];
    if (!s) return;
    if (evs && evs.length) evs.forEach(ce => s.pts.push(pos(ce)));else s.pts.push(pos(e));
    schedule();
  };
  const end = e => {
    if (!drawing.current || e.pointerId !== activeId.current) return; // palm lifting mid-glyph
    if (onInk) onInk();
    drawing.current = false;
    activeId.current = null;
    try {
      canvasRef.current.releasePointerCapture(e.pointerId);
    } catch (err) {}
    const ctx = getCtx();
    const s = strokes.current[strokes.current.length - 1];
    if (ctx && s) paint(ctx, s);
  };

  // one finger draws, two fingers scroll (see DrawCanvas.jsx for rationale)
  React.useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const onTS = e => {
      if (e.touches.length > 1 && drawing.current) {
        drawing.current = false;
        activeId.current = null;
        strokes.current.pop();
        redraw();
      }
    };
    const onTM = e => {
      if (e.touches.length === 1 && drawing.current) e.preventDefault();
    };
    cv.addEventListener('touchstart', onTS, {
      passive: true
    });
    cv.addEventListener('touchmove', onTM, {
      passive: false
    });
    return () => {
      cv.removeEventListener('touchstart', onTS);
      cv.removeEventListener('touchmove', onTM);
    };
  }, [redraw]);
  const clear = e => {
    e.stopPropagation();
    strokes.current.length = 0;
    redraw();
    setFb(null);
    if (onInk) onInk();
  };

  // --- trace feedback: score the ink against the real glyph, then self-grade ---
  const [fb, setFb] = React.useState(null);
  const Trace = window.ScripturaTrace;
  // silent=true is the Check-all path: an empty cell is skipped quietly instead
  // of showing "Write the character first" on every blank cell of the sheet.
  // Returns 'mastered' | 'learning' | null so the caller can tally the pass.
  const runCheck = silent => {
    const cvEl = canvasRef.current;
    if (!Trace || !cvEl) return null;
    // scorer wants CSS px in a w×h box — convert out of the normalised frame
    const f = frame();
    const px = strokes.current.map(s => ({
      pts: s.pts.map(p => toPx(p, f))
    }));
    const res = Trace.score(px, item.char, font, f.w, f.h);
    if (!res) {
      if (!silent) setFb({
        score: null,
        hint: 'Write the character first.',
        verdict: 'none'
      });
      return null;
    }
    setFb(res);
    // a confident match promotes the cell; anything else drops it to learning
    if (onScore) onScore(idx, res);
    return res.verdict === 'good' ? 'mastered' : 'learning';
  };
  const check = e => {
    e.stopPropagation();
    runCheck(false);
  };
  // register with the sheet so Check all can reach this cell; focus-mode twins
  // register under their own key so a focus Check all scores only that row
  const runRef = React.useRef(runCheck);
  runRef.current = runCheck;
  React.useEffect(() => {
    if (!checkers) return;
    const key = (big ? 'f' : 'g') + idx,
      fn = silent => runRef.current(silent);
    checkers[key] = fn;
    return () => {
      if (checkers[key] === fn) delete checkers[key];
    };
  }, [checkers, idx, big]);
  React.useEffect(() => {
    setFb(null);
  }, [rev]);
  const SRS = window.ScripturaSRS;
  const state = status || 'new';
  const st = SRS && SRS.STATES[state] || {
    color: 'var(--text-muted)',
    icon: '○',
    label: 'New'
  };
  const bg = state === 'mastered' ? 'color-mix(in oklab, var(--cell-complete) 45%, #fff)' : state === 'learning' ? 'color-mix(in oklab, var(--cell-incorrect) 40%, #fff)' : 'var(--cell-empty)';
  return /*#__PURE__*/React.createElement("div", {
    ref: cellRef,
    className: 'sheet-cell' + (big ? ' sheet-cell-focus' : ''),
    style: {
      position: 'relative',
      background: bg,
      borderRight: '1px solid #d2d2de',
      borderBottom: '1px solid #d2d2de',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 6,
      left: 8,
      zIndex: 3,
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontSize: '0.72rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'lowercase',
      color: '#23232f',
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 3,
      height: '0.85em',
      borderRadius: 2,
      background: accent,
      flexShrink: 0
    }
  }), item.roman), showGhost && /*#__PURE__*/React.createElement("div", {
    className: "sheet-ghost",
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: font,
      fontSize: big ? 'min(22vh, 9rem)' : undefined,
      color: 'rgba(150,150,165,0.28)',
      pointerEvents: 'none',
      userSelect: 'none'
    }
  }, item.char), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      cursor: 'crosshair',
      touchAction: 'pan-x pan-y pinch-zoom',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      zIndex: 2,
      pointerEvents: locked ? 'none' : 'auto'
    },
    onPointerDown: start,
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: end
  }), /*#__PURE__*/React.createElement("div", {
    className: "sheet-foot sheet-noprint",
    style: {
      position: 'absolute',
      left: 6,
      right: 6,
      bottom: 6,
      zIndex: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 8,
      pointerEvents: 'none'
    }
  }, fb && /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      alignSelf: 'stretch',
      padding: '5px 7px',
      borderRadius: 6,
      pointerEvents: 'auto',
      background: 'rgba(255,255,255,0.96)',
      border: `1px solid ${Trace ? Trace.color(fb.score) : '#ccc'}`,
      fontFamily: 'var(--font-ui)',
      textAlign: 'left'
    }
  }, fb.score != null && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: Trace.color(fb.score),
      fontVariantNumeric: 'tabular-nums'
    }
  }, fb.score, "% match"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#3a3a48',
      lineHeight: 1.3,
      textWrap: 'pretty'
    }
  }, fb.hint)), /*#__PURE__*/React.createElement("div", {
    className: "sheet-tools",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      pointerEvents: 'auto'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: clear,
    title: "Clear cell",
    "aria-label": "Clear cell",
    className: "sheet-clear",
    style: {
      borderRadius: 6,
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.92)',
      border: '1px solid #c9c9d6',
      color: '#3a3a48',
      fontSize: 13,
      lineHeight: 1,
      display: 'grid',
      placeItems: 'center'
    }
  }, "\u21BA"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: check,
    title: "Check my trace",
    className: "sheet-check",
    style: {
      borderRadius: 6,
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.94)',
      border: '1px solid #c9c9d6',
      color: '#23232f',
      fontSize: 11,
      fontWeight: 700,
      fontFamily: 'var(--font-ui)',
      display: 'grid',
      placeItems: 'center'
    }
  }, "Check"))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onCycle(idx);
    },
    title: `${st.label} — tap to change`,
    "aria-label": `Mastery: ${st.label}`,
    className: "sheet-mastery",
    style: {
      position: 'absolute',
      top: 6,
      right: 6,
      zIndex: 4,
      borderRadius: 6,
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center',
      fontWeight: 700,
      fontFamily: 'var(--font-ui)',
      border: state === 'new' ? '2px solid #b9b9c6' : 'none',
      color: state === 'new' ? '#8a8a99' : '#fff',
      background: state === 'mastered' ? 'var(--success, #22c55e)' : state === 'learning' ? 'var(--warning, #f59e0b)' : 'rgba(255,255,255,0.9)'
    }
  }, st.icon));
}
function PracticeSheet({
  lang,
  theme,
  onSaved
}) {
  const {
    Card,
    Toggle,
    Button
  } = window.ScripturaDesignSystem_72b484;
  const SRS = window.ScripturaSRS;
  const T = theme || {
    color: '#f59e0b',
    color2: '#d97706'
  };
  const storeKey = `scriptura.sheet.${lang.id}`;
  const [showGhost, setShowGhost] = React.useState(false);
  const [focusRow, setFocusRow] = React.useState(null); // index into rows[] while in focus mode
  const [penOn, setPenOn] = React.useState(true); // touch devices: off lets one finger scroll the page
  const [saved, setSaved] = React.useState('');
  // Grade automatically: on = Check sets the chip from the score; off = Check
  // only shows the score and the learner sets every chip by hand.
  const [autoGrade, setAutoGradeRaw] = React.useState(() => {
    try {
      return localStorage.getItem('scriptura.autoGrade') !== '0';
    } catch (e) {
      return true;
    }
  });
  const setAutoGrade = v => {
    setAutoGradeRaw(v);
    try {
      localStorage.setItem('scriptura.autoGrade', v ? '1' : '0');
    } catch (e) {}
  };
  // Check all: every mounted cell registers a scorer here (see SheetCell)
  const checkers = React.useRef({}).current;
  const [checkSum, setCheckSum] = React.useState(null); // { scope, mastered, learning, skipped }
  const checkAll = scope => {
    const prefix = scope === 'focus' ? 'f' : 'g';
    const tally = {
      scope,
      mastered: 0,
      learning: 0,
      skipped: 0
    };
    Object.keys(checkers).filter(k => k[0] === prefix).forEach(k => {
      const r = checkers[k](true);
      if (r) tally[r]++;else tally.skipped++;
    });
    setCheckSum(tally);
  };
  // Clear all / Clear row: wipes INK and score badges only — mastery ratings
  // stay, so clearing to have another go never throws away what you rated.
  // Two-tap confirm, because a whole sheet of handwriting is easy to lose.
  const [armed, setArmed] = React.useState(null); // 'grid' | 'focus' | null
  const armTimer = React.useRef(0);
  React.useEffect(() => () => clearTimeout(armTimer.current), []);
  const clearInk = (scope, idxs) => {
    if (armed !== scope) {
      setArmed(scope);
      clearTimeout(armTimer.current);
      armTimer.current = setTimeout(() => setArmed(null), 3000);
      return;
    }
    clearTimeout(armTimer.current);
    setArmed(null);
    (idxs || Object.keys(inkStore.current)).forEach(i => {
      const a = inkStore.current[i];
      if (a) a.length = 0;
    });
    Object.keys(scores.current).forEach(i => {
      if (!idxs || idxs.includes(+i)) delete scores.current[i];
    });
    setCheckSum(null);
    setInkRev(r => r + 1); // mounted cells repaint and drop their badges
    persistInk();
  };
  // idx -> strokes[], shared by grid and focus cells, and persisted per language
  // so ink survives leaving the sheet, switching screens, or a reload. It is
  // wiped only by Save results (the pass is over) or per-cell Clear.
  const inkKey = `scriptura.ink.${lang.id}`;
  const loadInk = k => {
    try {
      const raw = JSON.parse(localStorage.getItem(k) || '{}');
      const out = {};
      Object.keys(raw).forEach(i => {
        out[i] = (raw[i] || []).map(pts => ({
          pts,
          dot: pts.length === 1,
          drawnUpTo: 0,
          dotDrawn: false
        }));
      });
      return out;
    } catch (e) {
      return {};
    }
  };
  const inkStore = React.useRef(null);
  if (!inkStore.current) inkStore.current = loadInk(inkKey);
  const [inkRev, setInkRev] = React.useState(0); // bump to make mounted cells repaint from the store
  const inkTimer = React.useRef(0);
  const persistInk = React.useCallback(() => {
    clearTimeout(inkTimer.current);
    inkTimer.current = setTimeout(() => {
      const out = {};
      Object.keys(inkStore.current).forEach(i => {
        const a = inkStore.current[i];
        if (a && a.length) out[i] = a.map(s => s.pts);
      });
      try {
        if (Object.keys(out).length) localStorage.setItem(inkKey, JSON.stringify(out));else localStorage.removeItem(inkKey);
      } catch (e) {}
    }, 250);
  }, [inkKey]);
  React.useEffect(() => () => clearTimeout(inkTimer.current), []);
  const wipeInk = () => {
    Object.values(inkStore.current).forEach(a => {
      a.length = 0;
    });
    setInkRev(r => r + 1);
    persistInk();
  };
  const [marks, setMarks] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storeKey) || '{}');
    } catch (e) {
      return {};
    }
  });
  const scores = React.useRef({}); // idx -> trace score for this pass
  // Leitner state for the language, so the header can report what is due.
  const [srsRev, setSrsRev] = React.useState(0);
  React.useEffect(() => {
    if (SRS) SRS.migrateFrom(lang.id, window.ProgressStore.load(lang.id)); // one-time lift from {c,w} stats
    setSrsRev(r => r + 1);
  }, [lang.id]);
  const srsMap = React.useMemo(() => SRS ? SRS.load(lang.id) : {}, [lang.id, srsRev, saved]);
  const srs = React.useMemo(() => SRS ? SRS.summary(lang.id, lang.allChars.length) : null, [lang.id, srsRev, saved]);
  const nextDue = React.useMemo(() => SRS ? SRS.nextDue(lang.id, lang.allChars.length) : null, [lang.id, srsRev, saved]);
  // A cell shows what the scheduler knows about it, with this pass's rating
  // taking precedence — so a returning learner opens the sheet on their real
  // mastery instead of a screen full of "new".
  const stateOf = idx => Object.prototype.hasOwnProperty.call(marks, idx) ? marks[idx] : SRS ? SRS.mastery(srsMap[idx]) : 'new';
  React.useEffect(() => {
    // language changed: refill the store IN PLACE from that language's saved ink
    // (never reassign it — mounted cells hold references into it)
    const fresh = loadInk(inkKey);
    Object.keys(inkStore.current).forEach(i => {
      inkStore.current[i].length = 0;
    });
    Object.keys(fresh).forEach(i => {
      if (!inkStore.current[i]) inkStore.current[i] = [];
      inkStore.current[i].push(...fresh[i]);
    });
    setInkRev(r => r + 1);
    scores.current = {};
    setMarks(() => {
      try {
        return JSON.parse(localStorage.getItem(storeKey) || '{}');
      } catch (e) {
        return {};
      }
    });
  }, [storeKey]);

  // A pass rating is stored for ALL THREE states, including 'new'. Absence of a
  // key means "no rating this pass" — which is what lets stateOf fall back to
  // the scheduler — so 'new' must be an explicit override, not a deletion.
  const setMark = (idx, state) => {
    setMarks(prev => {
      const next = {
        ...prev
      };
      if (!state) delete next[idx];else next[idx] = state;
      try {
        localStorage.setItem(storeKey, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };
  // tap the chip to walk new → learning → mastered → new, starting from what the cell shows
  const cycle = idx => setMark(idx, SRS ? SRS.next(stateOf(idx)) : stateOf(idx) === 'learning' ? 'mastered' : 'learning');
  // Check button scored the cell — record the score, and (unless the learner
  // grades by hand) set the state it earned. Same threshold the badge uses for
  // "Clean match", so text and chip agree.
  const onScore = (idx, res) => {
    scores.current[idx] = res.score;
    if (autoGrade) setMark(idx, res.verdict === 'good' ? 'mastered' : 'learning');
  };
  // Record this sheet pass: Leitner boxes advance, and the legacy {c,w} store
  // (heatmap + cloud sync) gets ONLY the cells actually rated — untouched cells
  // are untouched, not silently counted as correct.
  const saveResults = async () => {
    if (SRS) SRS.recordPass(lang.id, marks, scores.current);
    window.ProgressStore.recordRated(lang.id, marks);
    setSaved('saving');
    let cloud = false;
    if (window.ScripturaCloud && window.ScripturaCloud.isConfigured()) {
      const stats = window.ProgressStore.load(lang.id);
      const res = await window.ScripturaCloud.saveStats(lang.id, stats, i => lang.allChars[i] && lang.allChars[i].char);
      cloud = res && res.ok;
    }
    // clear this pass's marks so the next round starts fresh
    try {
      localStorage.removeItem(storeKey);
    } catch (e) {}
    setMarks({});
    scores.current = {};
    wipeInk();
    setSrsRev(r => r + 1);
    setSaved(cloud ? 'synced' : 'local');
    if (onSaved) onSaved(cloud ? 'on' : 'off');
    setTimeout(() => setSaved(''), 2600);
  };
  const total = lang.allChars.length;
  const counts = {
    new: 0,
    learning: 0,
    mastered: 0
  };
  for (let i = 0; i < total; i++) counts[stateOf(i)]++;
  const rated = Object.keys(marks).length;
  const pct = total ? Math.round(counts.mastered / total * 100) : 0;

  // global index offset per unit (allChars order matches units order)
  let offset = 0;
  const blocks = lang.units.map(unit => {
    const start = offset;
    offset += unit.chars.length;
    return {
      unit,
      start
    };
  });

  // Focus mode walks the sheet one grid row at a time. A row is 5 slots wide —
  // the canonical varga row for the Indic grids — so each step is one
  // articulation series rather than an arbitrary chunk.
  const ROW = 5;
  const rows = [];
  blocks.forEach(({
    unit,
    start
  }) => {
    const slots = unit.slots || unit.chars.map((_, i) => i);
    for (let i = 0; i < slots.length; i += ROW) rows.push({
      unit,
      start,
      slots: slots.slice(i, i + ROW),
      n: Math.floor(i / ROW)
    });
  });
  const inFocus = focusRow != null && rows[focusRow];
  const exitFocus = () => {
    setFocusRow(null);
    setInkRev(r => r + 1);
  };
  const step = React.useCallback(d => setFocusRow(i => i == null ? i : Math.min(rows.length - 1, Math.max(0, i + d))), [rows.length]);
  React.useEffect(() => {
    if (focusRow == null) return;
    const onKey = e => {
      if (e.key === 'Escape') exitFocus();else if ((e.key === 'g' || e.key === 'G') && !e.metaKey && !e.ctrlKey) setShowGhost(v => !v);else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        step(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        step(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [focusRow, step]);
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-noprint",
    style: {
      padding: 'var(--space-6)',
      backgroundImage: `radial-gradient(ellipse at 100% 0%, ${T.color}26 0%, transparent 60%)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 'var(--fs-lg)',
      fontWeight: 700,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "sheet",
    size: 20,
    style: {
      color: T.color
    }
  }), " ", lang.name, " practice sheet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, "Write each character from its sound, tap ", /*#__PURE__*/React.createElement("b", null, "Check"), " to score your trace, then set how well you know it."), /*#__PURE__*/React.createElement("div", {
    className: "scroll-hint",
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-tertiary, var(--text-secondary))',
      marginTop: 4
    }
  }, "One finger writes \xB7 two fingers scroll \xB7 or tap Scroll below")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: showGhost,
    onChange: setShowGhost,
    label: "Ghost"
  }), /*#__PURE__*/React.createElement(Toggle, {
    checked: autoGrade,
    onChange: setAutoGrade,
    label: "Grade automatically"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "check",
      size: 16
    }),
    onClick: () => checkAll('grid')
  }, "Check all"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "eraser",
      size: 16
    }),
    onClick: () => clearInk('grid'),
    style: armed === 'grid' ? {
      borderColor: 'var(--error)',
      color: 'var(--error)'
    } : undefined
  }, armed === 'grid' ? 'Tap again to clear' : 'Clear all'), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "focus",
      size: 16
    }),
    onClick: () => setFocusRow(0)
  }, "Focus"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "printer",
      size: 16
    }),
    onClick: () => window.print()
  }, "Print"), /*#__PURE__*/React.createElement(Button, {
    accent: "practice",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: saved === 'synced' ? 'cloud' : 'check',
      size: 16
    }),
    onClick: saveResults
  }, saved === 'saving' ? 'Saving…' : saved === 'synced' ? 'Saved · synced' : saved === 'local' ? 'Saved' : 'Save results'))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 10,
      borderRadius: 'var(--radius-full)',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${pct}%`,
      borderRadius: 'var(--radius-full)',
      background: `linear-gradient(135deg, ${T.color}, ${T.color2})`,
      transition: 'width var(--dur-base) var(--ease)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--success)'
    }
  }, counts.mastered), " mastered \xB7 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--warning, #f59e0b)'
    }
  }, counts.learning), " learning \xB7 ", counts.new, " untouched")), srs && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      marginTop: 'var(--space-4)',
      flexWrap: 'wrap',
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: srs.due ? 'var(--warning, #f59e0b)' : 'var(--text-secondary)'
    }
  }, srs.due), " due for review now"), nextDue && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "next back ", nextDue)), rated > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, rated), " rated this pass"))), checkSum && checkSum.scope === 'grid' && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      marginTop: 'var(--space-3)',
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)'
    }
  }, checkSum.mastered + checkSum.learning === 0 ? 'Nothing to check yet — write in a few cells first.' : /*#__PURE__*/React.createElement(React.Fragment, null, "Checked ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-primary)'
    }
  }, checkSum.mastered + checkSum.learning), " \xB7 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--success)'
    }
  }, checkSum.mastered), " clean \xB7 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--warning, #f59e0b)'
    }
  }, checkSum.learning), " to redo \xB7 ", checkSum.skipped, " blank skipped", autoGrade ? '' : ' · chips unchanged, set them by hand'))), /*#__PURE__*/React.createElement("div", {
    id: "sheetPrintArea"
  }, blocks.map(({
    unit,
    start
  }) => {
    const acc = `var(--accent-${unit.accent})`;
    const uc = unit.chars.filter((_, i) => stateOf(start + i) === 'mastered').length;
    return /*#__PURE__*/React.createElement("div", {
      key: unit.id,
      className: "sheet-unit"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sheet-unit-head",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: '0.5rem var(--space-6)',
        background: `linear-gradient(90deg, ${acc}, transparent)`,
        color: '#fff',
        flexWrap: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 'var(--fs-small)',
        whiteSpace: 'nowrap'
      }
    }, unit.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-hint)',
        opacity: 0.9,
        fontFamily: unit.font,
        whiteSpace: 'nowrap'
      }
    }, unit.subtitle), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontSize: 'var(--fs-hint)',
        opacity: 0.95
      }
    }, uc, "/", unit.chars.length)), /*#__PURE__*/React.createElement("div", {
      className: "sheet-grid",
      style: {
        display: 'grid',
        background: '#fff',
        borderLeft: '1px solid #d2d2de'
      }
    }, (unit.slots || unit.chars.map((_, i) => i)).map((ci, i) => ci == null ? /*#__PURE__*/React.createElement("div", {
      key: 'blank' + i,
      "aria-hidden": "true",
      className: "sheet-blank",
      style: {
        borderRight: '1px solid #d2d2de',
        borderBottom: '1px solid #d2d2de',
        background: '#f7f7fb'
      }
    }) : /*#__PURE__*/React.createElement(SheetCell, {
      key: ci,
      idx: start + ci,
      item: unit.chars[ci],
      font: lang.font,
      showGhost: showGhost,
      status: stateOf(start + ci),
      accent: acc,
      onCycle: cycle,
      inkStore: inkStore.current,
      rev: inkRev,
      locked: !penOn,
      onScore: onScore,
      onInk: persistInk,
      checkers: checkers
    }))));
  })), !inFocus && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setPenOn(v => !v),
    className: "touch-only sheet-noprint",
    style: {
      position: 'fixed',
      right: 14,
      bottom: 'calc(70px + env(safe-area-inset-bottom) + 14px)',
      zIndex: 120,
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      minHeight: 44,
      cursor: 'pointer',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--border-color)',
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--fs-small)',
      fontWeight: 700,
      background: penOn ? `linear-gradient(135deg, ${T.color}, ${T.color2})` : 'var(--bg-elevated, var(--bg-card))',
      color: penOn ? '#fff' : 'var(--text-primary)',
      boxShadow: 'var(--shadow-lg, 0 8px 24px rgba(0,0,0,.35))'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: penOn ? 'pen' : 'hand',
    size: 16
  }), penOn ? 'Writing' : 'Scrolling')), inFocus && /*#__PURE__*/React.createElement("div", {
    className: "sheet-noprint",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 'env(safe-area-inset-bottom)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: 'var(--space-4) var(--space-5)',
      borderBottom: '1px solid var(--border-color)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 'var(--fs-base)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, inFocus.unit.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "Row ", focusRow + 1, " of ", rows.length, " \xB7 \u2190 \u2192 to move \xB7 G ghost \xB7 Esc to exit")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: showGhost,
    onChange: setShowGhost,
    label: "Ghost"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "x",
      size: 16
    }),
    onClick: exitFocus
  }, "Exit"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-focus-row",
    style: {
      display: 'grid',
      background: '#fff',
      width: '100%',
      height: '100%',
      borderLeft: '1px solid #d2d2de',
      borderTop: '1px solid #d2d2de',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, inFocus.slots.map((ci, i) => ci == null ? /*#__PURE__*/React.createElement("div", {
    key: 'fblank' + i,
    "aria-hidden": "true",
    className: "sheet-blank",
    style: {
      borderRight: '1px solid #d2d2de',
      borderBottom: '1px solid #d2d2de',
      background: '#f7f7fb'
    }
  }) : /*#__PURE__*/React.createElement(SheetCell, {
    key: 'f' + focusRow + '-' + ci,
    idx: inFocus.start + ci,
    item: inFocus.unit.chars[ci],
    font: lang.font,
    showGhost: showGhost,
    status: stateOf(inFocus.start + ci),
    accent: `var(--accent-${inFocus.unit.accent})`,
    onCycle: cycle,
    big: true,
    inkStore: inkStore.current,
    rev: inkRev,
    onScore: onScore,
    onInk: persistInk,
    checkers: checkers
  })))), /*#__PURE__*/React.createElement("div", {
    className: "focus-foot",
    style: {
      padding: 'var(--space-4) var(--space-5)',
      borderTop: '1px solid var(--border-color)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: 'prev'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "arrow",
      size: 16,
      style: {
        transform: 'scaleX(-1)'
      }
    }),
    onClick: () => step(-1),
    disabled: focusRow === 0
  }, "Prev")), /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: 'tools',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "check",
      size: 16
    }),
    onClick: () => checkAll('focus')
  }, "Check row"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "eraser",
      size: 16
    }),
    onClick: () => clearInk('focus', inFocus.slots.filter(ci => ci != null).map(ci => inFocus.start + ci)),
    style: armed === 'focus' ? {
      borderColor: 'var(--error)',
      color: 'var(--error)'
    } : undefined
  }, armed === 'focus' ? 'Tap again' : 'Clear row')), /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: 'dots',
      display: 'flex',
      gap: 5,
      flexWrap: 'wrap',
      justifyContent: 'center',
      minWidth: 0
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    onClick: () => setFocusRow(i),
    "aria-label": `Row ${i + 1}`,
    style: {
      width: i === focusRow ? 20 : 8,
      height: 8,
      padding: 0,
      borderRadius: 'var(--radius-full)',
      border: 'none',
      cursor: 'pointer',
      background: i === focusRow ? `var(--accent-${r.unit.accent})` : 'var(--border-color)',
      transition: 'width var(--dur-fast, .15s) var(--ease)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: 'next',
      justifySelf: 'end'
    }
  }, focusRow === rows.length - 1 ? /*#__PURE__*/React.createElement(Button, {
    accent: "practice",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "check",
      size: 16
    }),
    onClick: exitFocus
  }, "Done") : /*#__PURE__*/React.createElement(Button, {
    accent: "practice",
    icon: /*#__PURE__*/React.createElement(window.Icon, {
      name: "arrow",
      size: 16
    }),
    onClick: () => step(1)
  }, "Next")))));
}
window.PracticeSheet = PracticeSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "screens/PracticeSheet.jsx", error: String((e && e.message) || e) }); }

// screens/ProgressScreen.jsx
try { (() => {
// ProgressScreen — the mastery heatmap, read from the same Leitner scheduler
// the Practice Sheet and Review write to (ScripturaSRS), so every screen gives
// the same answer for the same letter:
//   green  = mastered (box 4-5, last answer right)
//   orange = learning (box 1-3, or just missed)
//   grey   = new (never rated)
// A small ring marks cards due for review now, and the pips show the box.
// Plus a "Focus next" list and the account / cloud-sync panel.
function ProgressScreen({
  lang,
  theme,
  cloudStatus,
  onCloud,
  onGo,
  user,
  onSignIn,
  onSignOut
}) {
  const {
    Card,
    Button
  } = window.ScripturaDesignSystem_72b484;
  const {
    Icon,
    EmptyState
  } = window;
  const SRS = window.ScripturaSRS;
  const T = theme || {
    color: 'var(--accent-indic)',
    color2: 'var(--accent-indic-deep)'
  };
  const total = lang.allChars.length;
  const load = () => {
    if (!SRS) return {};
    SRS.migrateFrom(lang.id, window.ProgressStore.load(lang.id)); // one-time lift from {c,w} stats
    return SRS.load(lang.id);
  };
  const [recs, setRecs] = React.useState(load);
  React.useEffect(() => {
    setRecs(load());
  }, [lang.id, cloudStatus]);
  const now = Date.now();
  const tones = {
    mastered: ['rgba(34,197,94,0.20)', 'var(--success)'],
    learning: ['rgba(245,158,11,0.20)', 'var(--warning, #f59e0b)'],
    new: ['var(--bg-secondary)', 'var(--border-color)']
  };
  const stateOf = i => SRS ? SRS.mastery(recs[i]) : 'new';
  const dueOf = i => !!(SRS && SRS.isDue(recs[i], now));
  const counts = {
    mastered: 0,
    learning: 0,
    new: 0,
    due: 0
  };
  for (let i = 0; i < total; i++) {
    counts[stateOf(i)]++;
    if (dueOf(i)) counts.due++;
  }
  const rated = counts.mastered + counts.learning;
  const nextDue = SRS ? SRS.nextDue(lang.id, total) : null;

  // weakest first: lowest box, then due before not-due
  const focus = lang.allChars.map((c, i) => ({
    c,
    i,
    s: stateOf(i),
    b: recs[i] && recs[i].b || 0,
    d: dueOf(i)
  })).filter(x => x.s === 'learning').sort((a, b) => a.b - b.b || Number(b.d) - Number(a.d));
  let off = 0;
  const blocks = lang.units.map(u => {
    const s = off;
    off += u.chars.length;
    return {
      u,
      s
    };
  });
  const Legend = ({
    k,
    label
  }) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 13,
      height: 13,
      borderRadius: 3,
      background: tones[k][0],
      border: `1px solid ${tones[k][1]}`
    }
  }), label);
  const Pips = ({
    b
  }) => /*#__PURE__*/React.createElement("span", {
    "aria-label": `box ${b} of 5`,
    style: {
      display: 'flex',
      gap: 2,
      marginTop: 4
    }
  }, [1, 2, 3, 4, 5].map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      width: 5,
      height: 5,
      borderRadius: 2,
      background: n <= b ? 'var(--text-secondary)' : 'var(--border-color)'
    }
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      backgroundImage: `radial-gradient(ellipse at 100% 0%, ${T.color}1f 0%, transparent 60%)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 'var(--fs-lg)',
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chart",
    size: 20,
    style: {
      color: T.color
    }
  }), " ", lang.name, " progress"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, counts.mastered, " of ", total, " mastered", counts.due > 0 ? ` · ${counts.due} due for review now` : nextDue ? ` · next review ${nextDue}` : '')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Legend, {
    k: "mastered",
    label: `Mastered ${counts.mastered}`
  }), /*#__PURE__*/React.createElement(Legend, {
    k: "learning",
    label: `Learning ${counts.learning}`
  }), /*#__PURE__*/React.createElement(Legend, {
    k: "new",
    label: `New ${counts.new}`
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: 'var(--accent-quiz)'
    }
  }), "Due ", counts.due))), counts.due > 0 && onGo && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    accent: "quiz",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "review",
      size: 16
    }),
    onClick: () => onGo({
      screen: 'review'
    })
  }, "Review ", counts.due, " due"))), rated === 0 && /*#__PURE__*/React.createElement(EmptyState, {
    compact: true,
    icon: "chart",
    accent: T.color,
    title: "No results yet",
    body: "Rate letters on the Practice Sheet \u2014 tap Check, or set each cell's chip \u2014 then Save results. Lessons and reviews count too.",
    action: onGo ? {
      label: 'Open practice sheet',
      icon: 'pen',
      onClick: () => onGo({
        screen: 'sheet'
      })
    } : undefined
  }), blocks.map(({
    u,
    s
  }) => /*#__PURE__*/React.createElement(Card, {
    key: u.id,
    style: {
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: `var(--accent-${u.accent})`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 'var(--fs-small)'
    }
  }, u.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)',
      fontFamily: u.font
    }
  }, u.subtitle), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, u.chars.filter((_, i) => stateOf(s + i) === 'mastered').length, "/", u.chars.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
      gap: 'var(--space-3)'
    }
  }, u.chars.map((c, i) => {
    const st = stateOf(s + i),
      [bg, bc] = tones[st],
      b = recs[s + i] && recs[s + i].b || 0;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      title: `${c.roman} · ${st}${b ? ` · box ${b}` : ''}${dueOf(s + i) ? ' · due now' : ''}`,
      style: {
        position: 'relative',
        aspectRatio: '1',
        background: bg,
        border: `2px solid ${bc}`,
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, dueOf(s + i) && /*#__PURE__*/React.createElement("span", {
      "aria-label": "due now",
      style: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--accent-quiz)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: lang.font,
        fontSize: '1.6rem',
        lineHeight: 1,
        color: 'var(--text-primary)'
      }
    }, c.char), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-hint)',
        color: 'var(--text-secondary)',
        marginTop: 2
      }
    }, c.roman), b > 0 && /*#__PURE__*/React.createElement(Pips, {
      b: b
    }));
  })))), focus.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700,
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "target",
    size: 18,
    style: {
      color: 'var(--warning, #f59e0b)'
    }
  }), " Focus next", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)'
    }
  }, "still learning \xB7 weakest first")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, focus.map(({
    c,
    i
  }) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.45rem',
      padding: '0.4rem 0.8rem',
      borderRadius: 'var(--radius-pill)',
      background: tones.learning[0],
      border: `1px solid ${tones.learning[1]}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: lang.font,
      fontSize: '1.2rem'
    }
  }, c.char), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)'
    }
  }, c.roman))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0,
      fontWeight: 700,
      color: user ? '#fff' : 'var(--text-secondary)',
      background: user ? 'var(--gradient-display)' : 'var(--bg-secondary)',
      border: user ? 'none' : '1px solid var(--border-color)'
    }
  }, user ? (user.email || '?').slice(0, 1).toUpperCase() : /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "cloud",
    size: 18
  }), " ", user ? 'Synced to your account' : 'Saved on this device'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      marginTop: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, user ? cloudStatus === 'error' ? `${user.email} · last sync failed — try Pull latest` : user.email : 'Sign in to keep your progress across devices.'))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      fontWeight: 700,
      padding: '0.3rem 0.8rem',
      borderRadius: 'var(--radius-pill)',
      color: '#fff',
      background: user ? cloudStatus === 'error' ? 'var(--error)' : 'var(--success)' : 'var(--text-muted)'
    }
  }, user ? cloudStatus === 'error' ? 'ERROR' : 'SYNCED' : 'DEVICE ONLY')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)',
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, user ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    accent: "quiz",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 16
    }),
    onClick: () => onCloud && onCloud('pull', lang.id)
  }, "Pull latest"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "logout",
      size: 16
    }),
    onClick: onSignOut
  }, "Sign out")) : /*#__PURE__*/React.createElement(Button, {
    accent: "practice",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 16
    }),
    onClick: onSignIn
  }, "Sign in"))));
}
function CloudForm({
  onSave
}) {
  const cfg = function () {
    try {
      return JSON.parse(localStorage.getItem('scriptura.supabase') || 'null');
    } catch (e) {
      return null;
    }
  }() || window.SCRIPTURA_SUPABASE || {
    url: '',
    anonKey: ''
  };
  const [url, setUrl] = React.useState(cfg.url || '');
  const [key, setKey] = React.useState(cfg.anonKey || '');
  const input = {
    padding: '0.6rem 0.8rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--fs-small)',
    width: '100%'
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)'
    }
  }, "Project URL", /*#__PURE__*/React.createElement("input", {
    style: input,
    value: url,
    onChange: e => setUrl(e.target.value),
    placeholder: "https://xxxx.supabase.co"
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-secondary)'
    }
  }, "Anon key", /*#__PURE__*/React.createElement("input", {
    style: input,
    value: key,
    onChange: e => setKey(e.target.value),
    placeholder: "eyJ..."
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.ScripturaDesignSystem_72b484.Button, {
    accent: "practice",
    onClick: () => onSave(url, key)
  }, "Save & connect")));
}
window.ProgressScreen = ProgressScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "screens/ProgressScreen.jsx", error: String((e && e.message) || e) }); }

// screens/ReviewSession.jsx
try { (() => {
// ReviewSession — flip each card, self-grade Again / Good.
//   mode="review"  (default) the spaced-repetition queue: the grade moves the
//                  character through its Leitner box.
//   mode="practice" free flashcards over every character: nothing is written
//                  to the scheduler, so drilling outside the schedule can never
//                  push a letter further out than it has earned.
function ReviewSession({
  queue,
  onExit,
  onComplete,
  xpPerCard = 5,
  langId,
  allChars,
  mode = 'review',
  onGo
}) {
  const {
    Card,
    Button
  } = window.ScripturaDesignSystem_72b484;
  const {
    Icon,
    EmptyState
  } = window;
  const SRS = window.ScripturaSRS;
  const practice = mode === 'practice';
  const [i, setI] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [tally, setTally] = React.useState({
    good: 0,
    again: 0
  });
  const [done, setDone] = React.useState(false);
  const c = queue[i];
  const rec = !practice && SRS && langId && c && c._i != null ? SRS.rec(langId, c._i) : null;
  const grade = ok => {
    if (!practice && SRS && langId && c && c._i != null) SRS.grade(langId, c._i, ok);
    setTally(t => ({
      good: t.good + (ok ? 1 : 0),
      again: t.again + (ok ? 0 : 1)
    }));
    setFlipped(false);
    if (i + 1 >= queue.length) {
      setDone(true);
      return;
    }
    setI(i + 1);
  };
  if (queue.length === 0) {
    const next = SRS && langId ? SRS.nextDue(langId, (allChars || []).length) : null;
    // immersive screen (no app bar / nav) — the empty state must carry its own way out
    return /*#__PURE__*/React.createElement(EmptyState, {
      icon: "check",
      accent: "var(--accent-quiz)",
      title: "Nothing due right now",
      body: `Everything you've learned is scheduled for later.${next ? ` Next cards are back ${next}.` : ''}${onGo ? ' Flashcards let you drill any letter in the meantime without changing the schedule.' : ''}`,
      action: onGo ? {
        label: 'Practise with flashcards',
        icon: 'cards',
        accent: 'quiz',
        onClick: () => onGo({
          screen: 'flashcards'
        })
      } : {
        label: 'Back to dashboard',
        accent: 'quiz',
        onClick: onExit
      },
      secondary: onGo ? {
        label: 'Back to dashboard',
        icon: 'home',
        onClick: onExit
      } : undefined
    });
  }
  if (done) {
    const xp = practice ? 0 : tally.good * xpPerCard;
    const Stat = ({
      n,
      label,
      color
    }) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-h2)',
        fontWeight: 700,
        color
      }
    }, n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-hint)',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase'
      }
    }, label));
    return /*#__PURE__*/React.createElement(EmptyState, {
      icon: "award",
      accent: "var(--accent-quiz)",
      title: practice ? 'Flashcards complete' : 'Review complete',
      body: practice ? 'Practice only — your review schedule is unchanged.' : 'Good cards move to a later box; Again cards come back today.',
      action: {
        label: 'Done',
        accent: 'quiz',
        onClick: () => onComplete(xp)
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-7)',
        justifyContent: 'center',
        marginTop: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(Stat, {
      n: tally.good,
      label: "good",
      color: "var(--success)"
    }), /*#__PURE__*/React.createElement(Stat, {
      n: tally.again,
      label: "again",
      color: "var(--error)"
    }), !practice && /*#__PURE__*/React.createElement(Stat, {
      n: `+${xp}`,
      label: "XP",
      color: "var(--accent-indic)"
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onExit,
    "aria-label": practice ? 'Exit flashcards' : 'Exit review',
    style: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      color: 'var(--text-primary)',
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      flexShrink: 0,
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 12,
      borderRadius: 'var(--radius-full)',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${i / queue.length * 100}%`,
      background: 'var(--accent-quiz)',
      borderRadius: 'var(--radius-full)',
      transition: 'width var(--dur-base) var(--ease)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      flexShrink: 0
    }
  }, i + 1, "/", queue.length)), practice ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "cards",
    size: 14
  }), " Flashcards \xB7 practice only, schedule unchanged") : rec && rec.b > 0 &&
  /*#__PURE__*/
  /* which Leitner box this card is in — makes the schedule legible */
  React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, [1, 2, 3, 4, 5].map(b => /*#__PURE__*/React.createElement("span", {
    key: b,
    title: `Box ${b}`,
    style: {
      width: b === rec.b ? 22 : 8,
      height: 8,
      borderRadius: 'var(--radius-full)',
      background: b === rec.b ? 'var(--accent-quiz)' : 'var(--border-color)',
      transition: 'width var(--dur-fast, .15s) var(--ease)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-muted)',
      marginLeft: 6
    }
  }, "box ", rec.b, " of 5")), /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(window.Flashcard, {
    char: c.char,
    roman: c.roman,
    name: c.name,
    gloss: c.gloss,
    font: c.font,
    front: "char",
    accent: "var(--accent-quiz)",
    flipped: flipped,
    onFlip: setFlipped
  }), !flipped ? /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "review",
      size: 16
    }),
    onClick: () => setFlipped(true)
  }, "Flip to check") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    accent: "danger",
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "review",
      size: 16
    }),
    onClick: () => grade(false)
  }, "Again"), /*#__PURE__*/React.createElement(Button, {
    accent: "practice",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 16
    }),
    onClick: () => grade(true)
  }, practice ? 'Good' : `Good · +${xpPerCard}`))));
}
window.ReviewSession = ReviewSession;
})(); } catch (e) { __ds_ns.__errors.push({ path: "screens/ReviewSession.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.NavButton = __ds_scope.NavButton;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.StatChip = __ds_scope.StatChip;

__ds_ns.RangeSlider = __ds_scope.RangeSlider;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Tab = __ds_scope.Tab;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.XPBar = __ds_scope.XPBar;

__ds_ns.DrawingCanvas = __ds_scope.DrawingCanvas;

})();
