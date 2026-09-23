/* @ds-bundle: {"format":4,"namespace":"ScripturaDesignSystem_72b484","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"NavButton","sourcePath":"components/buttons/NavButton.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"Pill","sourcePath":"components/data-display/Pill.jsx"},{"name":"StatChip","sourcePath":"components/data-display/StatChip.jsx"},{"name":"RangeSlider","sourcePath":"components/forms/RangeSlider.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"Tab","sourcePath":"components/navigation/Tab.jsx"},{"name":"ProgressRing","sourcePath":"components/progress/ProgressRing.jsx"},{"name":"XPBar","sourcePath":"components/progress/XPBar.jsx"},{"name":"DrawingCanvas","sourcePath":"patches/core/canvas.js"}],"sourceHashes":{"components/buttons/Button.jsx":"05de7c665621","components/buttons/NavButton.jsx":"aecee367b87b","components/data-display/Card.jsx":"a1758d8d721c","components/data-display/Pill.jsx":"b06a4418efd0","components/data-display/StatChip.jsx":"4f7cc7979773","components/forms/RangeSlider.jsx":"61234e41c57c","components/forms/SegmentedControl.jsx":"4a85688f2dca","components/forms/Toggle.jsx":"7ad824c5943b","components/navigation/Tab.jsx":"36a3b2b258ef","components/progress/ProgressRing.jsx":"d69c5f8c7c4e","components/progress/XPBar.jsx":"21c467883b8d","patches/core/canvas.js":"29ba022108f2","ui_kits/scriptura/Dashboard.jsx":"0328313042c7","ui_kits/scriptura/DrawCanvas.jsx":"48545f7ef17d","ui_kits/scriptura/Flashcard.jsx":"159b047e66d4","ui_kits/scriptura/LanguageSelect.jsx":"1028e8b992d0","ui_kits/scriptura/LessonNode.jsx":"41a97c24a7cb","ui_kits/scriptura/LessonPath.jsx":"6cced7cbf031","ui_kits/scriptura/LessonView.jsx":"44f658ead247","ui_kits/scriptura/PracticeSheet.jsx":"aaaf6e13bd58","ui_kits/scriptura/ProgressScreen.jsx":"0e0fae0c9088","ui_kits/scriptura/ReviewSession.jsx":"7e3978e46240","ui_kits/scriptura/Ring.jsx":"ef91388605c2","ui_kits/scriptura/StrokeGlyph.jsx":"e32d293cf123","ui_kits/scriptura/WordBuilder.jsx":"9b5c4b316a82","ui_kits/scriptura/data.js":"03cd88805985","ui_kits/scriptura/store.js":"a31889c4bad7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ScripturaDesignSystem_72b484 = window.ScripturaDesignSystem_72b484 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/NavButton.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/NavButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Pill.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Pill.jsx", error: String((e && e.message) || e) }); }

// components/data-display/StatChip.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/StatChip.jsx", error: String((e && e.message) || e) }); }

// components/forms/RangeSlider.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RangeSlider.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tab.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tab.jsx", error: String((e && e.message) || e) }); }

// components/progress/ProgressRing.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/progress/XPBar.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/XPBar.jsx", error: String((e && e.message) || e) }); }

// patches/core/canvas.js
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "patches/core/canvas.js", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/Dashboard.jsx
try { (() => {
// Dashboard — the home/router. Daily goal, streak, level, and routes into
// the active lesson, the review queue, the path, and the word builder.
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
    Button,
    XPBar
  } = window.ScripturaDesignSystem_72b484;
  const total = units.reduce((n, u) => n + u.chars.length, 0);
  const learnedCount = learned.size;
  const activeUnit = units.find(u => u.id === activeUnitId) || units[0];
  const activeLearned = activeUnit.chars.filter(c => learned.has(c.char)).length;
  const T = theme || {
    color: 'var(--accent-practice)',
    color2: 'var(--accent-practice-deep)',
    greeting: 'Welcome back',
    hello: '',
    emblem: '👋',
    motif: '',
    blurb: ''
  };
  const Action = ({
    icon,
    title,
    desc,
    accent,
    onClick,
    badge
  }) => /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      flex: '1 1 240px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.6rem',
      background: `linear-gradient(135deg, var(--accent-${accent}), var(--accent-${accent}-deep))`
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
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
      fontWeight: 700,
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap'
    }
  }, title), badge != null && badge > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      fontWeight: 700,
      color: 'var(--text-on-accent)',
      background: 'var(--error)',
      borderRadius: 'var(--radius-pill)',
      padding: '1px 8px'
    }
  }, badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, desc)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '1.3rem'
    }
  }, "\u203A"));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, languageList && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-label)',
      margin: '0 0 var(--space-3)'
    }
  }, "Language"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      overflowX: 'auto',
      paddingBottom: 4
    }
  }, languageList.map(l => {
    const lt = themes && themes[l.id] || {
      color: 'var(--accent-indic)',
      color2: 'var(--accent-indic-deep)'
    };
    const active = l.id === currentLang;
    return /*#__PURE__*/React.createElement("button", {
      key: l.id,
      type: "button",
      onClick: () => onPick && onPick(l.id),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.45rem 0.9rem',
        flexShrink: 0,
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-small)',
        whiteSpace: 'nowrap',
        transition: 'all var(--dur-fast) var(--ease)',
        background: active ? `linear-gradient(135deg, ${lt.color}, ${lt.color2})` : 'var(--bg-card)',
        color: active ? '#fff' : 'var(--text-secondary)',
        border: `1px solid ${active ? 'transparent' : 'var(--border-color)'}`,
        boxShadow: active ? `0 4px 14px ${lt.color}55` : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: l.font,
        fontSize: '1.05rem',
        lineHeight: 1
      }
    }, l.native.slice(0, 1)), l.name);
  }))), /*#__PURE__*/React.createElement(Card, {
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      gap: 'var(--space-8)',
      alignItems: 'center',
      flexWrap: 'wrap',
      background: `var(--bg-card)`,
      backgroundImage: `radial-gradient(ellipse at 100% 0%, ${T.color}22 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, ${T.color2}1a 0%, transparent 55%)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -10,
      bottom: -54,
      fontFamily: lang.font,
      fontSize: 230,
      lineHeight: 1,
      color: T.color,
      opacity: 0.08,
      pointerEvents: 'none',
      userSelect: 'none'
    }
  }, T.motif), /*#__PURE__*/React.createElement(window.Ring, {
    value: profile.todayXp,
    max: profile.dailyGoalXp,
    size: 140,
    stroke: 12,
    color: T.color,
    label: profile.todayXp,
    sublabel: `/ ${profile.dailyGoalXp} XP today`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 260px',
      minWidth: 0,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.8rem',
      lineHeight: 1
    }
  }, T.emblem), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: lang.font,
      fontSize: 'var(--fs-title)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      lineHeight: 1.1
    }
  }, T.greeting), T.hello && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)'
    }
  }, T.hello, " \xB7 ", lang.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      flexWrap: 'wrap',
      margin: 'var(--space-5) 0 var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      padding: '0.4rem 0.9rem',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--fs-small)'
    }
  }, "\uD83D\uDD25 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--accent-review)'
    }
  }, profile.streak), " day streak"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4rem',
      padding: '0.4rem 0.9rem',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--fs-small)'
    }
  }, "\u270D\uFE0F ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: T.color
    }
  }, learnedCount), " / ", total, " learned")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-micro)',
      color: 'var(--text-secondary)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-tight)',
      margin: '0 0 6px'
    }
  }, "Level ", profile.level), /*#__PURE__*/React.createElement(XPBar, {
    level: profile.level,
    value: profile.levelXp,
    max: profile.levelMax,
    accent: "indic"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => onGo({
      screen: 'lesson',
      unitId: activeUnit.id
    }),
    style: {
      background: `linear-gradient(135deg, ${T.color}, ${T.color2})`,
      color: '#fff'
    }
  }, "Continue \xB7 ", activeUnit.title, " (", activeLearned, "/", activeUnit.chars.length, ") \u2192")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Action, {
    icon: "\uD83E\uDDE0",
    accent: "quiz",
    title: "Review",
    badge: dueCount,
    desc: dueCount > 0 ? `${dueCount} cards due today` : 'All caught up',
    onClick: () => onGo({
      screen: 'review'
    })
  }), /*#__PURE__*/React.createElement(Action, {
    icon: "\uD83D\uDDFA\uFE0F",
    accent: "indic",
    title: "Lesson Path",
    desc: `${units.length} unit groups · ${T.blurb}`,
    onClick: () => onGo({
      screen: 'path'
    })
  }), lang.vowels ? /*#__PURE__*/React.createElement(Action, {
    icon: "\uD83E\uDDE9",
    accent: "sheet",
    title: "Word Builder",
    desc: "Combine consonants + vowels",
    onClick: () => onGo({
      screen: 'build'
    })
  }) : /*#__PURE__*/React.createElement(Action, {
    icon: "\uD83C\uDCCF",
    accent: "sheet",
    title: "Flashcards",
    desc: "Flip & recall every character",
    onClick: () => onGo({
      screen: 'review'
    })
  })));
}
window.Dashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/DrawCanvas.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/DrawCanvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/Flashcard.jsx
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
  }, "Tap to reveal \u21BB")), /*#__PURE__*/React.createElement("div", {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/Flashcard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/LanguageSelect.jsx
try { (() => {
// LanguageSelect — the visual landing screen for choosing a script. Big native
// glyph per language, grouped Indic / CJK, with each language's own progress.
function LanguageSelect({
  languages,
  languageList,
  learnedByLang,
  current,
  onPick,
  themes
}) {
  const {
    Card
  } = window.ScripturaDesignSystem_72b484;
  const groups = ['Indic', 'CJK'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-7)',
      padding: 'var(--space-7) 0',
      backgroundImage: 'var(--aurora)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.6rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '2rem'
    }
  }, "\u270D\uFE0F"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-h2)',
      fontWeight: 'var(--fw-bold)',
      whiteSpace: 'nowrap',
      background: 'var(--gradient-display)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }
  }, "Choose a script")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      margin: '0.5rem 0 0'
    }
  }, "Pick a writing system to learn \u2014 switch any time.")), groups.map(g => {
    const items = languageList.filter(l => l.group === g);
    return /*#__PURE__*/React.createElement("div", {
      key: g,
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-micro)',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-label)',
        margin: '0 0 var(--space-4)',
        textAlign: 'center'
      }
    }, g, " scripts"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-5)',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }
    }, items.map(l => {
      const total = languages[l.id].allChars.length;
      const learned = (learnedByLang[l.id] || new Set()).size;
      const isCurrent = l.id === current;
      const t = themes && themes[l.id] || {
        color: 'var(--accent-indic)',
        emblem: ''
      };
      return /*#__PURE__*/React.createElement(Card, {
        key: l.id,
        interactive: true,
        onClick: () => onPick(l.id),
        style: {
          position: 'relative',
          overflow: 'hidden',
          flex: '1 1 200px',
          maxWidth: 260,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-5)',
          border: `1px solid ${isCurrent ? t.color : 'var(--border-color)'}`,
          boxShadow: isCurrent ? `0 8px 30px ${t.color}40` : 'none',
          backgroundImage: `radial-gradient(ellipse at 110% -10%, ${t.color}1f 0%, transparent 60%)`
        }
      }, /*#__PURE__*/React.createElement(window.Ring, {
        value: learned,
        max: total,
        size: 64,
        stroke: 6,
        color: t.color
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: l.font,
          fontSize: '1.7rem',
          lineHeight: 1,
          color: 'var(--text-primary)'
        }
      }, l.native.slice(0, 1))), /*#__PURE__*/React.createElement("div", {
        style: {
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 700,
          color: 'var(--text-primary)'
        }
      }, l.name), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: '0.95rem'
        }
      }, t.emblem)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: l.font,
          fontSize: 'var(--fs-small)',
          color: 'var(--text-secondary)'
        }
      }, l.native), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 'var(--fs-hint)',
          color: t.color,
          marginTop: 2,
          fontWeight: 600
        }
      }, learned > 0 ? `${learned} / ${total} learned` : `${total} characters`)));
    })));
  }));
}
window.LanguageSelect = LanguageSelect;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/LanguageSelect.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/LessonNode.jsx
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
  }, locked ? '🔒' : unit.chars[0].char))), /*#__PURE__*/React.createElement("div", {
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
      fontSize: 'var(--fs-body)'
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("div", {
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
      fontSize: '1.3rem',
      color: 'var(--text-secondary)'
    }
  }, "\u203A"));
}
window.LessonNode = LessonNode;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/LessonNode.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/LessonPath.jsx
try { (() => {
// LessonPath — the vertical path of unit lesson nodes with overall progress.
function LessonPath({
  units,
  learned,
  activeUnitId,
  onGo,
  langName
}) {
  const {
    Card,
    ProgressRing
  } = window.ScripturaDesignSystem_72b484;
  const total = units.reduce((n, u) => n + u.chars.length, 0);
  const learnedCount = learned.size;
  const activeIdx = units.findIndex(u => u.id === activeUnitId);
  const statusOf = idx => {
    if (idx < activeIdx) return 'done';
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
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(ProgressRing, {
    value: learnedCount,
    max: total,
    size: 88,
    stroke: 9,
    accent: "indic",
    label: `${Math.round(learnedCount / total * 100)}%`
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-lg)',
      fontWeight: 700
    }
  }, langName || 'Burmese', " characters"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)'
    }
  }, learnedCount, " of ", total, " learned \xB7 ", units.length, " units"))), /*#__PURE__*/React.createElement("div", {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/LessonPath.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/LessonView.jsx
try { (() => {
// LessonView — the focused study loop for one unit. Each character runs
// Learn (watch it form + mnemonic) → Trace (write it) → Quiz (recall & flip).
// Correct recalls mark the character learned and award XP.
function LessonView({
  unit,
  learned,
  onComplete,
  onExit,
  xpPerCard = 5
}) {
  const {
    Card,
    Button,
    NavButton
  } = window.ScripturaDesignSystem_72b484;
  const accent = `var(--accent-${unit.accent})`;
  const steps = ['learn', 'trace', 'quiz'];
  const [ci, setCi] = React.useState(0);
  const [step, setStep] = React.useState('learn');
  const [flipped, setFlipped] = React.useState(false);
  const [xp, setXp] = React.useState(0);
  const [got, setGot] = React.useState(() => new Set());
  const [finished, setFinished] = React.useState(false);
  const cv = React.useRef(null);
  const c = unit.chars[ci];
  const totalSteps = unit.chars.length * steps.length;
  const doneSteps = ci * steps.length + steps.indexOf(step);
  const advance = learnedThis => {
    if (learnedThis) {
      setGot(g => new Set(g).add(c.char));
      setXp(x => x + xpPerCard);
    }
    setFlipped(false);
    if (ci + 1 >= unit.chars.length) {
      setFinished(true);
      return;
    }
    setCi(ci + 1);
    setStep('learn');
  };
  if (finished) {
    return /*#__PURE__*/React.createElement(Card, {
      style: {
        textAlign: 'center',
        padding: 'var(--space-9) var(--space-7)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '3.5rem'
      }
    }, "\uD83C\uDF89"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-h2)',
        fontWeight: 700,
        marginTop: 'var(--space-4)'
      }
    }, unit.title, " complete!"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-6)',
        justifyContent: 'center',
        margin: 'var(--space-7) 0'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-h2)',
        fontWeight: 700,
        color: accent
      }
    }, "+", xp), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-hint)',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase'
      }
    }, "XP earned")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-h2)',
        fontWeight: 700,
        color: 'var(--accent-practice)'
      }
    }, got.size), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-hint)',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase'
      }
    }, "learned"))), /*#__PURE__*/React.createElement(Button, {
      accent: unit.accent,
      onClick: () => onComplete([...got], xp)
    }, "Back to path \u2192"));
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
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      fontSize: '1.1rem',
      flexShrink: 0
    }
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
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
  }, steps.map(s => /*#__PURE__*/React.createElement("span", {
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
  }, s))), step === 'learn' && /*#__PURE__*/React.createElement(Card, {
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
    onClick: () => setStep('trace')
  }, "I've got it \u2192")))), step === 'trace' && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
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
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => cv.current && cv.current.__clear && cv.current.__clear()
  }, "\uD83D\uDDD1 Clear"), /*#__PURE__*/React.createElement(Button, {
    accent: unit.accent,
    icon: "\u2713",
    onClick: () => setStep('quiz')
  }, "Done \u2192"))), step === 'quiz' && /*#__PURE__*/React.createElement(Card, {
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
    onClick: () => setFlipped(true)
  }, "Flip to check \u21BB") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    accent: "danger",
    variant: "secondary",
    onClick: () => advance(false)
  }, "\u21BB Again"), /*#__PURE__*/React.createElement(Button, {
    accent: "practice",
    icon: "\u2713",
    onClick: () => advance(true)
  }, "Got it \xB7 +", xpPerCard))));
}
window.LessonView = LessonView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/LessonView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/PracticeSheet.jsx
try { (() => {
// PracticeSheet — a printable worksheet grouped by unit. One writable cell per
// character: a faint "ghost" glyph to trace (toggle), a romanized prompt (no
// answer shown), a small canvas to write on, and a checkbox that cycles
// unrated → correct → wrong. Marks persist to localStorage in a Supabase-ready
// shape — see cycle()/pushToBackend().

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
  onCycle
}) {
  const canvasRef = React.useRef(null);
  const ctxRef = React.useRef(null);
  const drawing = React.useRef(false);
  const activeId = React.useRef(null); // pointer that owns the in-flight stroke
  const strokes = React.useRef([]);
  const raf = React.useRef(0);
  const getCtx = () => {
    if (!ctxRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = INK;
      ctx.fillStyle = INK;
      ctxRef.current = ctx;
    }
    return ctxRef.current;
  };

  // draw only the segments added since the last flush
  const paint = (ctx, s) => {
    const pts = s.pts;
    if (pts.length === 1) {
      if (s.dot && !s.dotDrawn) {
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, (pts[0].w || 4) / 2, 0, Math.PI * 2);
        ctx.fill();
        s.dotDrawn = true;
      }
      return;
    }
    for (let i = Math.max(1, s.drawnUpTo + 1); i < pts.length; i++) {
      ctx.lineWidth = pts[i].w || 4;
      ctx.beginPath();
      ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
      ctx.lineTo(pts[i].x, pts[i].y);
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
    const w = e.pressure && e.pressure > 0 && e.pointerType === 'pen' ? 2 + e.pressure * 6 : 4;
    return {
      x: (e.clientX - r.left) * (cv.width / r.width),
      y: (e.clientY - r.top) * (cv.height / r.height),
      w
    };
  };
  const start = e => {
    if (e.button && e.button !== 0) return;
    if (!acceptPointer(e)) return; // palm / stray touch — no preventDefault, no stroke
    e.preventDefault();
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
    strokes.current = [];
    redraw();
  };
  const bg = status === 'wrong' ? 'var(--cell-incorrect)' : 'var(--cell-empty)';
  return /*#__PURE__*/React.createElement("div", {
    className: "sheet-cell",
    style: {
      position: 'relative',
      background: bg,
      borderRight: '1px solid #d2d2de',
      borderBottom: '1px solid #d2d2de',
      minHeight: 140,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 6,
      left: 8,
      zIndex: 3,
      fontSize: '0.72rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'lowercase',
      color: accent,
      fontFamily: 'var(--font-ui)'
    }
  }, item.roman), showGhost && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: font,
      fontSize: '3.4rem',
      color: 'rgba(150,150,165,0.28)',
      pointerEvents: 'none',
      userSelect: 'none'
    }
  }, item.char), /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    width: 240,
    height: 170,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      cursor: 'crosshair',
      touchAction: 'pan-x pan-y pinch-zoom',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      zIndex: 2
    },
    onPointerDown: start,
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: end
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: clear,
    title: "Clear cell",
    className: "sheet-clear sheet-noprint",
    style: {
      position: 'absolute',
      bottom: 6,
      left: 6,
      zIndex: 4,
      width: 22,
      height: 22,
      borderRadius: 5,
      cursor: 'pointer',
      background: 'rgba(0,0,0,0.08)',
      border: 'none',
      color: '#666',
      fontSize: 12
    }
  }, "\u21BA"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onCycle(idx);
    },
    title: "Mark as wrong",
    style: {
      position: 'absolute',
      top: 6,
      right: 6,
      zIndex: 4,
      width: 26,
      height: 26,
      borderRadius: 6,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      fontWeight: 700,
      color: '#fff',
      border: status === 'wrong' ? 'none' : '2px solid #b9b9c6',
      background: status === 'wrong' ? 'var(--error)' : 'rgba(255,255,255,0.9)'
    }
  }, status === 'wrong' ? '✗' : ''));
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
  const T = theme || {
    color: '#f59e0b',
    color2: '#d97706'
  };
  const storeKey = `scriptura.sheet.${lang.id}`;
  const [showGhost, setShowGhost] = React.useState(false);
  const [saved, setSaved] = React.useState('');
  const [marks, setMarks] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storeKey) || '{}');
    } catch (e) {
      return {};
    }
  });
  React.useEffect(() => {
    setMarks(() => {
      try {
        return JSON.parse(localStorage.getItem(storeKey) || '{}');
      } catch (e) {
        return {};
      }
    });
  }, [storeKey]);
  const cycle = idx => {
    setMarks(prev => {
      const cur = prev[idx];
      const nextStatus = cur === 'wrong' ? null : 'wrong';
      const next = {
        ...prev
      };
      if (nextStatus) next[idx] = nextStatus;else delete next[idx];
      try {
        localStorage.setItem(storeKey, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };
  // Record this sheet pass into the local stats store (and Supabase if configured).
  const saveResults = async () => {
    window.ProgressStore.recordPass(lang.id, total, marks);
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
    setSaved(cloud ? 'synced' : 'local');
    if (onSaved) onSaved(cloud ? 'on' : 'off');
    setTimeout(() => setSaved(''), 2600);
  };
  const total = lang.allChars.length;
  const wrong = Object.values(marks).filter(v => v === 'wrong').length;
  const correct = total - wrong;
  const pct = Math.round(correct / total * 100);

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
      fontSize: 'var(--fs-lg)',
      fontWeight: 700,
      whiteSpace: 'nowrap'
    }
  }, "\uD83D\uDCDD ", lang.name, " Practice Sheet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, "Write each character from its sound \u2014 only mark the ones you got wrong (\u2717)."), /*#__PURE__*/React.createElement("div", {
    className: "scroll-hint",
    style: {
      fontSize: 'var(--fs-hint)',
      color: 'var(--text-tertiary, var(--text-secondary))',
      marginTop: 4
    }
  }, "One finger writes \xB7 two fingers scroll the page")), /*#__PURE__*/React.createElement("div", {
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
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "\uD83D\uDDA8\uFE0F",
    onClick: () => window.print()
  }, "Print"), /*#__PURE__*/React.createElement(Button, {
    accent: "practice",
    icon: "\u2713",
    onClick: saveResults
  }, saved === 'saving' ? 'Saving…' : saved === 'synced' ? 'Saved · synced ☁️' : saved === 'local' ? 'Saved ✓' : 'Save results'))), /*#__PURE__*/React.createElement("div", {
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
  }, correct), " correct \xB7 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--error)'
    }
  }, wrong), " redo \xB7 ", total, " total"))), /*#__PURE__*/React.createElement("div", {
    id: "sheetPrintArea"
  }, blocks.map(({
    unit,
    start
  }) => {
    const acc = `var(--accent-${unit.accent})`;
    const uc = unit.chars.length - unit.chars.filter((_, i) => marks[start + i] === 'wrong').length;
    return /*#__PURE__*/React.createElement("div", {
      key: unit.id
    }, /*#__PURE__*/React.createElement("div", {
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
    }, unit.chars.map((item, i) => /*#__PURE__*/React.createElement(SheetCell, {
      key: i,
      idx: start + i,
      item: item,
      font: lang.font,
      showGhost: showGhost,
      status: marks[start + i],
      accent: acc,
      onCycle: cycle
    }))));
  })));
}
window.PracticeSheet = PracticeSheet;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/PracticeSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/ProgressScreen.jsx
try { (() => {
// ProgressScreen — the real mastery heatmap, driven by the marks you record on
// the Practice Sheet (ProgressStore). Green = never missed, orange = sometimes,
// red = missed >half, grey = not attempted yet. Plus a "Focus next" list and a
// Cloud-sync settings panel for Supabase.
function ProgressScreen({
  lang,
  theme,
  cloudStatus,
  onCloud
}) {
  const {
    Card,
    Button
  } = window.ScripturaDesignSystem_72b484;
  const T = theme || {
    color: 'var(--accent-indic)',
    color2: 'var(--accent-indic-deep)'
  };
  const [stats, setStats] = React.useState(() => window.ProgressStore.load(lang.id));
  const [showCfg, setShowCfg] = React.useState(false);
  React.useEffect(() => {
    setStats(window.ProgressStore.load(lang.id));
  }, [lang.id, cloudStatus]);
  const tones = {
    strong: ['rgba(34,197,94,0.22)', 'var(--success)'],
    shaky: ['rgba(245,158,11,0.22)', 'var(--accent-indic)'],
    weak: ['rgba(239,68,68,0.22)', 'var(--error)'],
    none: ['var(--bg-secondary)', 'var(--border-color)']
  };
  const tierOf = idx => window.ProgressStore.tier(stats[idx]);
  const counts = {
    strong: 0,
    shaky: 0,
    weak: 0,
    none: 0
  };
  lang.allChars.forEach((_, i) => {
    counts[tierOf(i)]++;
  });
  const attempted = counts.strong + counts.shaky + counts.weak;
  const focus = lang.allChars.map((c, i) => ({
    c,
    i,
    t: tierOf(i)
  })).filter(x => x.t === 'weak' || x.t === 'shaky').sort((a, b) => (a.t === 'weak' ? -1 : 1) - (b.t === 'weak' ? -1 : 1));

  // group offsets
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-lg)',
      fontWeight: 700,
      whiteSpace: 'nowrap'
    }
  }, "\uD83D\uDCCA ", lang.name, " Progress"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, attempted, " of ", lang.allChars.length, " attempted \xB7 from your Practice Sheet results")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Legend, {
    k: "strong",
    label: `Strong ${counts.strong}`
  }), /*#__PURE__*/React.createElement(Legend, {
    k: "shaky",
    label: `Shaky ${counts.shaky}`
  }), /*#__PURE__*/React.createElement(Legend, {
    k: "weak",
    label: `Weak ${counts.weak}`
  }), /*#__PURE__*/React.createElement(Legend, {
    k: "none",
    label: `New ${counts.none}`
  }))), attempted === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)',
      padding: 'var(--space-5)',
      background: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-lg)',
      color: 'var(--text-secondary)',
      fontSize: 'var(--fs-small)'
    }
  }, "No results yet. Open ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-primary)'
    }
  }, "Sheet"), ", write each character, mark any you got wrong with \u2717, then tap ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-primary)'
    }
  }, "Save results"), " \u2014 they'll appear here.")), blocks.map(({
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
  }, u.subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
      gap: 'var(--space-3)'
    }
  }, u.chars.map((c, i) => {
    const [bg, bc] = tones[tierOf(s + i)];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        aspectRatio: '1',
        background: bg,
        border: `2px solid ${bc}`,
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
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
    }, c.roman));
  })))), focus.length > 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 'var(--space-4)'
    }
  }, "\uD83C\uDFAF Focus next"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, focus.map(({
    c,
    t
  }, k) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.45rem',
      padding: '0.4rem 0.8rem',
      borderRadius: 'var(--radius-pill)',
      background: tones[t][0],
      border: `1px solid ${tones[t][1]}`
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, "\u2601\uFE0F Cloud sync"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, cloudStatus === 'on' ? 'Connected — results sync to Supabase across devices.' : cloudStatus === 'error' ? 'Configured, but the last sync failed. Check keys / tables.' : 'Offline — results are saved on this device only.')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-hint)',
      fontWeight: 700,
      padding: '0.3rem 0.8rem',
      borderRadius: 'var(--radius-pill)',
      color: '#fff',
      background: cloudStatus === 'on' ? 'var(--success)' : cloudStatus === 'error' ? 'var(--error)' : 'var(--text-muted)'
    }
  }, cloudStatus === 'on' ? 'CONNECTED' : cloudStatus === 'error' ? 'ERROR' : 'OFFLINE')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-4)',
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setShowCfg(v => !v)
  }, showCfg ? 'Hide settings' : 'Edit connection'), cloudStatus === 'on' && /*#__PURE__*/React.createElement(Button, {
    accent: "quiz",
    onClick: () => onCloud && onCloud('pull', lang.id)
  }, "\u2193 Pull latest")), showCfg && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(CloudForm, {
    onSave: (url, key) => {
      window.ScripturaCloud.setConfig(url, key);
      onCloud && onCloud('configured', lang.id);
      setShowCfg(false);
    }
  }))));
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/ProgressScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/ReviewSession.jsx
try { (() => {
// ReviewSession — the spaced-repetition queue. Flip each due card, self-grade
// Again / Good; a tally bar tracks the run, then a summary.
function ReviewSession({
  queue,
  onExit,
  onComplete,
  xpPerCard = 5
}) {
  const {
    Card,
    Button
  } = window.ScripturaDesignSystem_72b484;
  const [i, setI] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [tally, setTally] = React.useState({
    good: 0,
    again: 0
  });
  const [done, setDone] = React.useState(false);
  const c = queue[i];
  const grade = ok => {
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
    return /*#__PURE__*/React.createElement(Card, {
      style: {
        textAlign: 'center',
        padding: 'var(--space-9)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '3rem'
      }
    }, "\u2705"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-lg)',
        fontWeight: 700,
        marginTop: 'var(--space-4)'
      }
    }, "Nothing due right now"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-secondary)',
        margin: 'var(--space-3) 0 var(--space-6)'
      }
    }, "Come back later, or keep learning new units."), /*#__PURE__*/React.createElement(Button, {
      accent: "quiz",
      onClick: onExit
    }, "Back to dashboard"));
  }
  if (done) {
    const xp = tally.good * xpPerCard;
    return /*#__PURE__*/React.createElement(Card, {
      style: {
        textAlign: 'center',
        padding: 'var(--space-9) var(--space-7)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '3.5rem'
      }
    }, "\uD83E\uDDE0"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-h2)',
        fontWeight: 700,
        marginTop: 'var(--space-4)'
      }
    }, "Review complete"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-6)',
        justifyContent: 'center',
        margin: 'var(--space-7) 0'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-h2)',
        fontWeight: 700,
        color: 'var(--success)'
      }
    }, tally.good), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-hint)',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase'
      }
    }, "good")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-h2)',
        fontWeight: 700,
        color: 'var(--error)'
      }
    }, tally.again), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-hint)',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase'
      }
    }, "again")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-h2)',
        fontWeight: 700,
        color: 'var(--accent-indic)'
      }
    }, "+", xp), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-hint)',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase'
      }
    }, "XP"))), /*#__PURE__*/React.createElement(Button, {
      accent: "quiz",
      onClick: () => onComplete(xp)
    }, "Done"));
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
    "aria-label": "Exit review",
    style: {
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      color: 'var(--text-primary)',
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      fontSize: '1.1rem',
      flexShrink: 0
    }
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
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
  }, i + 1, "/", queue.length)), /*#__PURE__*/React.createElement(Card, {
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
    onClick: () => setFlipped(true)
  }, "Flip to check \u21BB") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    accent: "danger",
    variant: "secondary",
    onClick: () => grade(false)
  }, "\u21BB Again"), /*#__PURE__*/React.createElement(Button, {
    accent: "practice",
    icon: "\u2713",
    onClick: () => grade(true)
  }, "Good \xB7 +", xpPerCard))));
}
window.ReviewSession = ReviewSession;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/ReviewSession.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/Ring.jsx
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/Ring.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/StrokeGlyph.jsx
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
  }, "\u21BB Replay"));
}
window.StrokeGlyph = StrokeGlyph;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/StrokeGlyph.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/WordBuilder.jsx
try { (() => {
// WordBuilder — pick a consonant and a vowel sign; see them combine into a
// live Burmese syllable with its romanization. A playful, exploratory mode.
function WordBuilder({
  lang
}) {
  const {
    Card
  } = window.ScripturaDesignSystem_72b484;
  const consonants = lang.allChars;
  const [ci, setCi] = React.useState(0);
  const [vi, setVi] = React.useState(0);
  if (!lang.vowels) {
    return /*#__PURE__*/React.createElement(Card, {
      style: {
        textAlign: 'center',
        padding: 'var(--space-9) var(--space-7)',
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '3rem',
        marginBottom: 'var(--space-4)'
      }
    }, "\uD83E\uDDE9"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-lg)',
        fontWeight: 700,
        color: 'var(--text-primary)'
      }
    }, "Word Builder isn't set up for ", lang.name, " yet"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'var(--space-3)'
      }
    }, "Vowel-sign combining is currently available for Burmese. Switch language from the top bar to try it."));
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/WordBuilder.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/data.js
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
        font,
        mastery: 'new',
        srs: 'new'
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
      font: BUR,
      mastery: 'strong',
      srs: 'learned'
    }, {
      char: 'ခ',
      roman: 'kha',
      name: 'ခကွေး',
      gloss: 'curved kha',
      cognate: 'ख',
      font: BUR,
      mastery: 'strong',
      srs: 'learned'
    }, {
      char: 'ဂ',
      roman: 'ga',
      name: 'ဂငယ်',
      gloss: 'small ga',
      cognate: 'ग',
      font: BUR,
      mastery: 'good',
      srs: 'due'
    }, {
      char: 'ဃ',
      roman: 'gha',
      name: 'ဃကြီး',
      gloss: 'big ga',
      cognate: 'घ',
      font: BUR,
      mastery: 'medium',
      srs: 'due'
    }, {
      char: 'င',
      roman: 'nga',
      name: 'င',
      gloss: 'nga',
      cognate: 'ङ',
      font: BUR,
      mastery: 'good',
      srs: 'learned'
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
      font: BUR,
      mastery: 'strong',
      srs: 'learned'
    }, {
      char: 'ဆ',
      roman: 'hsa',
      name: 'ဆလိမ်',
      gloss: 'twisted hsa',
      cognate: 'छ',
      font: BUR,
      mastery: 'weak',
      srs: 'due'
    }, {
      char: 'ဇ',
      roman: 'za',
      name: 'ဇကွဲ',
      gloss: 'split za',
      cognate: 'ज',
      font: BUR,
      mastery: 'medium',
      srs: 'due'
    }, {
      char: 'ဈ',
      roman: 'jha',
      name: 'ဈမျဉ်းဆွဲ',
      gloss: 'lined za',
      cognate: 'झ',
      font: BUR,
      mastery: 'very-weak',
      srs: 'due'
    }, {
      char: 'ည',
      roman: 'nya',
      name: 'ညကြီး',
      gloss: 'big nya',
      cognate: 'ञ',
      font: BUR,
      mastery: 'good',
      srs: 'due'
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
      font: BUR,
      mastery: 'medium',
      srs: 'new'
    }, {
      char: 'ဌ',
      roman: 'hta',
      name: 'ဌဝမ်းဘဲ',
      gloss: 'duck-belly hta',
      cognate: 'ठ',
      font: BUR,
      mastery: 'not-attempted',
      srs: 'new'
    }, {
      char: 'ဍ',
      roman: 'da',
      name: 'ဍရင်ကောက်',
      gloss: 'curved-chest da',
      cognate: 'ड',
      font: BUR,
      mastery: 'weak',
      srs: 'new'
    }, {
      char: 'ဎ',
      roman: 'dha',
      name: 'ဎရေမှုတ်',
      gloss: 'water-blown dha',
      cognate: 'ढ',
      font: BUR,
      mastery: 'not-attempted',
      srs: 'new'
    }, {
      char: 'ဏ',
      roman: 'na',
      name: 'ဏကြီး',
      gloss: 'big na',
      cognate: 'ण',
      font: BUR,
      mastery: 'good',
      srs: 'new'
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
      font: BUR,
      mastery: 'strong',
      srs: 'new'
    }, {
      char: 'ထ',
      roman: 'hta',
      name: 'ထဆင်ထူး',
      gloss: 'elephant-fetter hta',
      cognate: 'थ',
      font: BUR,
      mastery: 'medium',
      srs: 'new'
    }, {
      char: 'ဒ',
      roman: 'da',
      name: 'ဒထွေး',
      gloss: 'forked da',
      cognate: 'द',
      font: BUR,
      mastery: 'not-attempted',
      srs: 'new'
    }, {
      char: 'ဓ',
      roman: 'dha',
      name: 'ဓအောက်ခြိုက်',
      gloss: 'dented-below dha',
      cognate: 'ध',
      font: BUR,
      mastery: 'new',
      srs: 'new'
    }, {
      char: 'န',
      roman: 'na',
      name: 'နငယ်',
      gloss: 'small na',
      cognate: 'न',
      font: BUR,
      mastery: 'good',
      srs: 'new'
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
      font: BUR,
      mastery: 'medium',
      srs: 'new'
    }, {
      char: 'ဖ',
      roman: 'pha',
      name: 'ဖဦးထုပ်',
      gloss: 'capped pha',
      cognate: 'फ',
      font: BUR,
      mastery: 'not-attempted',
      srs: 'new'
    }, {
      char: 'ဗ',
      roman: 'ba',
      name: 'ဗထက်ခြိုက်',
      gloss: 'dented-above ba',
      cognate: 'ब',
      font: BUR,
      mastery: 'not-attempted',
      srs: 'new'
    }, {
      char: 'ဘ',
      roman: 'bha',
      name: 'ဘကုန်း',
      gloss: 'humped bha',
      cognate: 'भ',
      font: BUR,
      mastery: 'new',
      srs: 'new'
    }, {
      char: 'မ',
      roman: 'ma',
      name: 'မ',
      gloss: 'ma',
      cognate: 'म',
      font: BUR,
      mastery: 'good',
      srs: 'new'
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
      font: BUR,
      mastery: 'medium',
      srs: 'new'
    }, {
      char: 'ရ',
      roman: 'ya',
      name: 'ရကောက်',
      gloss: 'curved ya',
      cognate: 'र',
      font: BUR,
      mastery: 'not-attempted',
      srs: 'new'
    }, {
      char: 'လ',
      roman: 'la',
      name: 'လ',
      gloss: 'la',
      cognate: 'ल',
      font: BUR,
      mastery: 'good',
      srs: 'new'
    }, {
      char: 'ဝ',
      roman: 'wa',
      name: 'ဝ',
      gloss: 'wa',
      cognate: 'व',
      font: BUR,
      mastery: 'medium',
      srs: 'new'
    }, {
      char: 'သ',
      roman: 'tha',
      name: 'သ',
      gloss: 'tha',
      cognate: 'स',
      font: BUR,
      mastery: 'good',
      srs: 'new'
    }, {
      char: 'ဟ',
      roman: 'ha',
      name: 'ဟ',
      gloss: 'ha',
      cognate: 'ह',
      font: BUR,
      mastery: 'not-attempted',
      srs: 'new'
    }, {
      char: 'ဠ',
      roman: 'la',
      name: 'ဠကြီး',
      gloss: 'big la',
      cognate: 'ळ',
      font: BUR,
      mastery: 'new',
      srs: 'new'
    }, {
      char: 'အ',
      roman: 'a',
      name: 'အ',
      gloss: 'a',
      cognate: 'अ',
      font: BUR,
      mastery: 'good',
      srs: 'new'
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
  const hindiFlat = 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह'.split(' ').map((ch, i) => ({
    char: ch,
    roman: 'ka kha ga gha ṅa ca cha ja jha ña ṭa ṭha ḍa ḍha ṇa ta tha da dha na pa pha ba bha ma ya ra la va śa ṣa sa ha'.split(' ')[i]
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
      allChars,
      dueChars: allChars.filter(c => c.srs === 'due')
    };
  }
  const languages = {
    burmese: lang('burmese', 'Burmese', 'မြန်မာ', 'burmese', 'indic', burmeseUnits, burmeseVowels),
    hindi: lang('hindi', 'Hindi', 'हिन्दी', 'devanagari', 'indic', makeUnits(hindiFlat, indicPlan(8), f('devanagari'))),
    telugu: lang('telugu', 'Telugu', 'తెలుగు', 'telugu', 'indic', makeUnits(teluguFlat, indicPlan(10), f('telugu'))),
    sinhala: lang('sinhala', 'Sinhala', 'සිංහල', 'sinhala', 'indic', makeUnits(sinhalaFlat, indicPlan(10), f('sinhala')), sinhalaVowels),
    hiragana: lang('hiragana', 'Hiragana', 'ひらがな', 'japanese', 'cjk', makeUnits(hiraFlat, kanaPlan(['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ']), f('japanese'))),
    katakana: lang('katakana', 'Katakana', 'カタカナ', 'japanese', 'cjk', makeUnits(kataFlat, kanaPlan(['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ']), f('japanese'))),
    korean: lang('korean', 'Korean', '한국어', 'korean', 'cjk', makeUnits(korFlat, korPlan, f('korean'))),
    chinese: lang('chinese', 'Chinese', '汉字', 'chinese', 'cjk', makeUnits(zhFlat, zhPlan, f('chinese')))
  };

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
      blurb: 'Devanagari · 33 consonants'
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
      group: 'Indic'
    }, {
      id: 'hindi',
      name: 'Hindi',
      native: 'हिन्दी',
      font: f('devanagari'),
      group: 'Indic'
    }, {
      id: 'telugu',
      name: 'Telugu',
      native: 'తెలుగు',
      font: f('telugu'),
      group: 'Indic'
    }, {
      id: 'sinhala',
      name: 'Sinhala',
      native: 'සිංහල',
      font: f('sinhala'),
      group: 'Indic'
    }, {
      id: 'hiragana',
      name: 'Hiragana',
      native: 'ひらがな',
      font: f('japanese'),
      group: 'CJK'
    }, {
      id: 'katakana',
      name: 'Katakana',
      native: 'カタカナ',
      font: f('japanese'),
      group: 'CJK'
    }, {
      id: 'korean',
      name: 'Korean',
      native: '한국어',
      font: f('korean'),
      group: 'CJK'
    }, {
      id: 'chinese',
      name: 'Chinese',
      native: '汉字',
      font: f('chinese'),
      group: 'CJK'
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/data.js", error: String((e && e.message) || e) }); }

// ui_kits/scriptura/store.js
try { (() => {
// Scriptura — progress store + optional Supabase cloud sync.
// Loaded as a plain script; exposes window.ProgressStore and window.ScripturaCloud.
// The app is fully functional OFFLINE: stats live in localStorage. If the user
// supplies Supabase keys (Progress screen → Cloud sync), stats also sync to a
// `sheet_stats` table so they follow them across devices.
//
// ──────────────────────────────────────────────────────────────────────────
// Supabase table (run once in the SQL editor):
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
//   -- simplest policy for a single-user / anon-key demo:
//   create policy "anon all" on scriptura_app_sheet_stats for all using (true) with check (true);
//
// For real multi-user auth, replace user_id with auth.uid() and scope the policy
// to `auth.uid() = user_id`.
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
    // Unmarked cells count as correct (the app's "mark only mistakes" model).
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
  const LS_UID = 'scriptura.uid';
  let client = null;
  function readConfig() {
    if (window.SCRIPTURA_SUPABASE && window.SCRIPTURA_SUPABASE.url) return window.SCRIPTURA_SUPABASE;
    try {
      return JSON.parse(localStorage.getItem(LS_CFG) || 'null');
    } catch (e) {
      return null;
    }
  }
  function userId() {
    let id = localStorage.getItem(LS_UID);
    if (!id) {
      id = 'dev-' + Math.random().toString(36).slice(2, 10);
      localStorage.setItem(LS_UID, id);
    }
    return id;
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
      client = window.supabase.createClient(c.url, c.anonKey);
      return client;
    },
    // Push cumulative stats for a language. stats = { [idx]: { c, w } }.
    async saveStats(language, stats, charAt) {
      const cl = await this.init().catch(() => null);
      if (!cl) return {
        ok: false,
        offline: true
      };
      const uid = userId();
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
      if (!cl) return null;
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
        const units = (U.data || []).filter(u => u.language_id === l.id).map(u => ({
          id: String(u.id).replace(l.id + '_', ''),
          _full: u.id,
          title: u.title,
          subtitle: u.subtitle,
          accent: u.accent,
          font: l.font,
          chars: []
        }));
        const byFull = {};
        units.forEach(u => {
          byFull[u._full] = u;
        });
        const allChars = [];
        (C.data || []).filter(c => c.language_id === l.id).forEach(c => {
          const u = byFull[c.unit_id];
          const obj = {
            char: c.char,
            roman: c.roman,
            name: c.name || c.roman,
            gloss: c.gloss || '',
            cognate: c.cognate || '',
            font: l.font,
            mastery: 'new',
            srs: 'new'
          };
          if (u) u.chars.push(obj);
          allChars.push({
            ...obj,
            unitId: u ? u.id : null,
            unitTitle: u ? u.title : '',
            accent: u ? u.accent : 'indic'
          });
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scriptura/store.js", error: String((e && e.message) || e) }); }

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
