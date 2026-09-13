# Scriptura — UI improvement roadmap

Five phases, ordered so each one ships on its own and nothing later depends on
work that hasn't landed. Phases 1–2 are mechanical; 3–5 change behaviour and
content. Rebuild `index.html` from `ui_kits/scriptura/index.html` at the end of
every phase.

Effort is rough: **S** = under an hour, **M** = a few hours, **L** = a day+.

---

## Phase 1 — Layout & chrome (ship first)

Pure layout. No data, no behaviour change. Fixes everything that makes the app
feel wrong on a phone or a portrait iPad.

| # | Item | Files | Effort |
|---|------|-------|--------|
| 1 | Breakpoint 700 → 900px; nav collapses before it clips | `index.html` | S |
| 2 | Hide the app bar entirely in Lesson + Review | `index.html` | S |
| 3 | Hide the language-strip scrollbar; add a fade edge | `index.html`, `Dashboard.jsx` | S |
| 6 | Bottom tab bar 6 → 4 tabs (Home · Path · Review · Progress) | `index.html` | S |
| 8 | XP bar takes the language theme colour, not `accent="indic"` | `Dashboard.jsx` | S |

**Detail**

- **1** — change the media query to `(max-width: 900px)`. Portrait iPad then gets
  the bottom tab bar and the compact header instead of a wrapping pill row.
  Optionally add a third state: ≥900px full nav, 700–900px icon-only pills,
  <700px bottom bar.
- **2** — the app has two `route.screen` values that own the whole viewport
  (`lesson`, `review`). Render the sticky bar only when
  `!['lesson','review'].includes(route.screen)`. The ✕ + progress row inside
  `LessonView`/`ReviewSession` is already sufficient chrome. Recovers ~120px.
- **3** — `.hscroll { scrollbar-width: none } .hscroll::-webkit-scrollbar { display: none }`
  plus a `mask-image: linear-gradient(90deg, #000 85%, transparent)` on the strip.
- **6** — keep Sheet and Build reachable from the Dashboard action cards (Sheet
  needs a new card; Build already has one).
- **8** — `Dashboard.jsx` already computes `T`; pass `T.color` into `XPBar`
  the same way the hero `Ring` receives it.

**Done when** — portrait iPad (768/834px) and iPhone (390px) both show a
single-row header, no clipped labels, and the trace canvas is above the fold.

---

## Phase 2 — Writing surface quality

Everything that makes the ink itself better. Self-contained in the two canvas
components. **4a and 4c are bugs, not polish — they ship first.**

| # | Item | Files | Effort |
|---|------|-------|--------|
| ~~4a~~ | ~~Palm rejection + no dots on pointerdown~~ | `PracticeSheet.jsx`, `DrawCanvas.jsx` | **done** |
| ~~4c~~ | ~~Incremental drawing (stop full redraw per move)~~ | `PracticeSheet.jsx`, `DrawCanvas.jsx` | **done** |
| 4 | DPR-correct canvas backing store | `PracticeSheet.jsx`, `DrawCanvas.jsx` | M |
| 4b | Bigger cells on phones (1-col swipe, or 2-col ≥180px) | `PracticeSheet.jsx`, `index.html` | M |
| 9 | Print: fixed column count + page-break per unit | `index.html` | S |
| 10 | Focus mode — chrome fades while a canvas is active | `index.html`, both canvas files | M |

**Detail**

- **4a — stray dots from palm contact.** ✅ *Shipped.* `start()` has no `pointerType` filter,
  so pen, mouse and touch are all accepted. A palm landing fires `pointerdown`,
  pushes a one-point stroke, and `redraw()` has an explicit branch that renders a
  single-point stroke as a filled circle. For non-pen input `w` falls back to a
  hardcoded `4` (line 26) — exactly the size of the specks in the ā / ē / ai / o
  cells. Fix:
  - module-scope `let penSeen = false` shared by all cells; a guard used by
    `start`, `move`, `end`. `pointerType === 'pen'` → set `penSeen = true`,
    accept. Mouse → accept. Touch → reject outright if `penSeen`; else reject if
    `e.width > 35 || e.height > 35` (palm contact patch). Rejected events return
    early without `preventDefault` and without pushing a stroke.
  - skip the single-point fill branch in `redraw()` unless the stroke came from
    pen or mouse, so a stray one-point touch stroke renders nothing.
  - drop `onPointerLeave={end}` (line 72) — `setPointerCapture` already keeps the
    stroke attached, and in cells this small it fires spuriously and chops
    strokes at cell borders.
- **4c — lag after lifting the pen is redraw cost.** ✅ *Shipped.* `move()` calls `redraw()` on
  every `pointermove`, and `redraw()` clears the canvas and re-strokes every point
  of every stroke in the cell with a separate `beginPath()`/`stroke()` per segment.
  `getCoalescedEvents` pushes 5–10 points per move, so per-frame work grows with
  everything already written in that cell — fine on stroke one, several hundred
  synchronous segments per frame by stroke four. Fix: cache the 2D context in a
  ref; give each stroke a `drawnUpTo` index; `move()` appends points and schedules
  one `requestAnimationFrame` flush (guard against double-scheduling) that strokes
  only `drawnUpTo → end` and advances the index. Full `redraw()` is reserved for
  clear, undo and resize.
- **4** — size the element with CSS, the buffer with pixels:
  `cv.width = rect.width * dpr; cv.height = rect.height * dpr; ctx.scale(dpr,dpr)`
  and drop the `cv.width / rect.width` factor from `pos()`. Re-run on resize.
  Currently a fixed 240×170 buffer is stretched into a ~110px-wide cell → blurry,
  and coordinates are double-scaled.
- **4b** — the 1-column swipe deck is the better UX (a full-width cell ≈ real
  paper) but is a bigger change; the 2-column `minHeight: 180` variant is a
  ten-minute win. Pick one, don't do both.
- **9** — inside `@media print`, force `.sheet-grid { grid-template-columns: repeat(5,1fr) }`
  and give each unit block `break-inside: avoid; break-before: page`.
- **10** — on `pointerdown` in a canvas set a `writing` flag: fade the app bar and
  tab bar to ~0.15 opacity and add `overflow:hidden` to `body`; clear on
  `pointerup`/blur. Two-finger scroll still works outside the canvas. Do this
  *after* Phase 1 (it depends on the bar being conditionally rendered).

**Done when** — a resting palm leaves no marks, the fourth stroke in a cell is as
responsive as the first, strokes are crisp on a Retina iPad, a printed sheet
breaks cleanly per unit, and writing with a Pencil doesn't drift the page.

> Not a bug: the 37 correct / 0 redo counter. The sheet uses a mark-only-mistakes
> model — `correct = total − wrong` — so everything counts as correct until a cell
> is tapped to flag it.

---

## Phase 3 — Make the practice actually teach

Behaviour changes. Highest learning value; also the highest risk, so it's on its
own.

| # | Item | Files | Effort |
|---|------|-------|--------|
| 5 | Trace step gives feedback instead of always advancing | `LessonView.jsx`, `DrawCanvas.jsx` | M |
| 11 | Per-cell 3-state mastery (long-press → shaky / wrong) | `PracticeSheet.jsx`, `store.js` | M |
| 12 | Leitner scheduling so Review reflects grades | `store.js`, `ReviewSession.jsx`, `data.js` | L |

**Detail**

- **5** — cheapest useful check: rasterise the ghost glyph to an offscreen canvas,
  then compare ink. Score = (user pixels inside glyph) / (glyph pixels) minus a
  penalty for user pixels far outside. Show "Good / Try again" and a ghost
  overlay of what they drew vs. the target. Don't block progress — grade it.
- **11** — the Progress heatmap already renders three states (strong/shaky/weak)
  but the sheet only ever writes `wrong`. Add a long-press (or second tap on the
  mark button) that cycles unrated → shaky → wrong → unrated, and store the
  middle state. Small schema addition on the Supabase side.
- **12** — `lang.dueChars` is a static list today, so "Again" in Review changes
  nothing. Minimum viable: per-character `{ box, dueAt }` in `store.js`;
  again → box 1 / due tomorrow, good → box+1 / interval ×2 (1, 2, 4, 8, 16 days).
  Compute `dueChars` from that instead of from `data.js`. Sync the same rows to
  Supabase alongside the existing stats.

**Done when** — the Review count changes after a session, and Trace tells the
user something.

---

## Phase 4 — Identity & mobile information architecture

Cosmetic and structural. Safe to defer, but this is what makes it stop looking
like a prototype.

| # | Item | Files | Effort |
|---|------|-------|--------|
| 7 | Replace emoji with a line-icon set | all screens + `index.html` | M |
| 13 | On phones, land on the Path with a compact XP header | `index.html`, `Dashboard.jsx`, `LessonPath.jsx` | M |

**Detail**

- **7** — inline a ~12-glyph SVG sprite (Lucide: `home`, `map`, `brain`, `pen-line`,
  `bar-chart`, `puzzle`, `flame`, `check`, `x`, `rotate-ccw`, `printer`,
  `volume-2`) and an `<Icon name size color>` component. Tint from
  `currentColor` so the theme colours apply for free. Keep the language emblems
  (🛕 etc.) — those are content, not UI. Worth adding the icon set to the design
  system proper so cards can use it too.
- **13** — when `isMobile`, default `route.screen` to `path` and render the XP
  ring + streak as a slim strip above the unit list; the full hero Dashboard
  stays on tablet/desktop. Saves two taps to start a lesson.

---

## Phase 5 — Content

Needs assets, not just code. Do last, per language.

| Item | Files | Effort |
|------|-------|--------|
| Audio pronunciation per character | `data.js`, `LessonView.jsx`, `Flashcard.jsx`, Supabase schema | L |
| Stroke-order replay button on the Learn card | `StrokeGlyph.jsx`, `LessonView.jsx` | M |
| Letter-name mnemonics for Hindi / Telugu / Sinhala / Tamil | `data.js`, Supabase seed | L |

**Detail**

- Audio: add an `audio` column to `scriptura_app_characters`, store files in a
  Supabase storage bucket, fall back to the Web Speech API when a clip is
  missing. A speaker button belongs on the Learn card and on the flipped side of
  every flashcard.
- Stroke order: `StrokeGlyph` already animates the glyph forming — it just needs
  a replay control and a slower speed option. Cheapest item in this phase.
- Mnemonics: Burmese has them (`gloss`), the other scripts don't. Content work,
  not engineering.

---

## Suggested sequencing

```
Phase 1  ──► Phase 2  ──► Phase 3  ──► Phase 4  ──► Phase 5
(layout)     (ink)        (teaching)   (identity)   (content)
  S/M          M            M/L           M            L
```

Phase 2's focus mode depends on Phase 1's conditional app bar. Phase 3's per-cell
mastery is easier after Phase 2's larger cells (more room for a long-press
affordance). Everything else is independent — Phase 4 and 5 can be pulled
forward if the look or the audio matters more to you than the scheduling.
