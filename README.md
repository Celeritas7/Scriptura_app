# Scriptura

Script-learning app (Burmese, Tamil, Hindi, Japanese, …): trace, review, master.

## Run
Double-click `run-scriptura.bat` (serves this folder at http://localhost:5144/), or open `index.html` from any static server.

## Layout
- `index.html` — the app entry
- `screens/` — Dashboard, LessonView, ReviewSession, PracticeSheet, ProgressScreen, LoginScreen
- `components/` — LessonPath, LessonNode, Flashcard, ConceptCard, WordBuilder, DrawCanvas, StrokeGlyph, Ring, Icons
- `lib/` — `store.js` (state + Supabase sync), `srs.js` (spaced repetition), `trace.js` (stroke scoring)
- `data/` — `data.js` language packages
- `icons/` — PWA icons + manifest
- `design-system/` — tokens, shared React primitives, guidelines. Full docs: `design-system/readme.md`, usage rules: `design-system/SKILL.md`
- `styles.css` — one-line shim importing `design-system/styles.css` (the compiler needs it at root)
- `_ds_bundle.js` — generated from `design-system/`; loaded by the app. Never edit by hand.
- `sql/` — Supabase schema + resync catalogue

## Components
Shared primitives compiled into `_ds_bundle.js` (namespace `ScripturaDesignSystem_72b484`), source in `design-system/components/`:
- Button
- NavButton
- Card
- Pill
- StatChip
- RangeSlider
- SegmentedControl
- Toggle
- Tab
- ProgressRing
- XPBar
- DrawingCanvas (`design-system/patches/core/canvas.js`)
