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
  const GRID = 40;   // occupancy grid the shapes are compared in
  const RES = 240;   // working raster size before bounding-box normalization
  const TOL = 1.6;   // distance (in grid cells) at which credit falls to zero

  let pad = null;
  function scratch(w, h) {
    if (!pad) pad = document.createElement('canvas');
    if (pad.width !== w || pad.height !== h) { pad.width = w; pad.height = h; }
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
    let minX = w, minY = h, maxX = -1, maxY = -1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (d[(y * w + x) * 4 + 3] < 40) continue;
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
    if (maxX < 0) return null;
    // keep the aspect ratio: fit the longer side to the grid so a tall letter
    // is not stretched into a square
    const bw = maxX - minX + 1, bh = maxY - minY + 1;
    const span = Math.max(bw, bh);
    const offX = minX - (span - bw) / 2, offY = minY - (span - bh) / 2;
    const cell = span / GRID;
    const g = new Uint8Array(GRID * GRID);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (d[(y * w + x) * 4 + 3] < 40) continue;
        const gx = Math.floor((x - offX) / cell), gy = Math.floor((y - offY) / cell);
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
    ctx.strokeStyle = '#000'; ctx.fillStyle = '#000';
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    strokes.forEach((st) => {
      const p = st.pts || [];
      if (!p.length) return;
      if (p.length === 1) {
        ctx.beginPath(); ctx.arc(p[0].x * s, p[0].y * s, Math.max(1, ((p[0].w || 4) * s) / 2), 0, Math.PI * 2); ctx.fill(); return;
      }
      for (let i = 1; i < p.length; i++) {
        ctx.lineWidth = Math.max(1, (p[i].w || 4) * s);
        ctx.beginPath(); ctx.moveTo(p[i - 1].x * s, p[i - 1].y * s); ctx.lineTo(p[i].x * s, p[i].y * s); ctx.stroke();
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
    const D1 = 1, D2 = Math.SQRT2;
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const i = y * GRID + x; let v = d[i];
        if (y > 0) { v = Math.min(v, d[i - GRID] + D1); if (x > 0) v = Math.min(v, d[i - GRID - 1] + D2); if (x < GRID - 1) v = Math.min(v, d[i - GRID + 1] + D2); }
        if (x > 0) v = Math.min(v, d[i - 1] + D1);
        d[i] = v;
      }
    }
    for (let y = GRID - 1; y >= 0; y--) {
      for (let x = GRID - 1; x >= 0; x--) {
        const i = y * GRID + x; let v = d[i];
        if (y < GRID - 1) { v = Math.min(v, d[i + GRID] + D1); if (x < GRID - 1) v = Math.min(v, d[i + GRID + 1] + D2); if (x > 0) v = Math.min(v, d[i + GRID - 1] + D2); }
        if (x < GRID - 1) v = Math.min(v, d[i + 1] + D1);
        d[i] = v;
      }
    }
    return d;
  }

  // Mean credit for the set cells of `g`, where credit decays linearly with the
  // distance to the other shape and hits zero at TOL cells away.
  function similarity(g, field) {
    let n = 0, sum = 0;
    for (let i = 0; i < g.length; i++) {
      if (!g[i]) continue;
      n++;
      const c = 1 - field[i] / TOL;
      if (c > 0) sum += c;
    }
    return n ? sum / n : 0;
  }
  const count = (g) => { let n = 0; for (let i = 0; i < g.length; i++) n += g[i]; return n; };

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
      const f = (coverage + precision) ? (2 * coverage * precision) / (coverage + precision) : 0;
      const score = Math.round(f * 100);

      let verdict, hint;
      if (score >= 75) { verdict = 'good'; hint = 'Clean match.'; }
      else if (score >= 55) {
        verdict = 'close';
        hint = coverage < precision ? 'Close — part of the letter is missing.' : 'Close — some strokes run outside the letter.';
      } else {
        verdict = 'off';
        hint = coverage < 0.45 ? 'Not quite — compare against the ghost and try again.' : 'Shape is off — check the proportions against the ghost.';
      }
      return { ok: score >= 55, score, coverage: Math.round(coverage * 100), precision: Math.round(precision * 100), verdict, hint };
    },

    // Colour for a score, shared with the UI so the palette stays in one place.
    color(score) {
      if (score == null) return 'var(--text-muted)';
      if (score >= 75) return 'var(--success, #22c55e)';
      if (score >= 55) return 'var(--warning, #f59e0b)';
      return 'var(--error, #ef4444)';
    },
    GRID, TOL,
  };

  window.ScripturaTrace = Trace;
})();
