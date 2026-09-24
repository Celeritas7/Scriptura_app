> **Status: DONE in the project copy (2026-09-24).** Download the project and replace the local folder; then reconcile anything local-only. Kept below as the record of what changed.

# Handoff: move the app to the repo root, design system into `design-system/`

Repo: `Celeritas7/Scriptura_app` (local: `D:\Coding\App_generation\Language_study\Scriptura_app`).
Owner: Fable. Do this on a branch; run the app after step 5 before merging.

## Target layout

```
Scriptura_app/
  index.html              ← the real app (was ui_kits/scriptura/index.html)
  screens/                Dashboard LessonView ReviewSession PracticeSheet ProgressScreen LoginScreen (.jsx)
  components/             LessonPath LessonNode Flashcard ConceptCard WordBuilder DrawCanvas StrokeGlyph Ring Icons (.jsx)
  lib/                    store.js srs.js trace.js
  data/                   data.js (split per language later — separate task)
  icons/                  logo.svg, manifest.webmanifest, png icons
  design-system/
    styles.css            (was root styles.css; @imports fixed, see step 3)
    tokens/  components/  guidelines/  patches/  SKILL.md  readme.md
  sql/
  styles.css              ← ONE LINE shim, see step 3 (compiler requires it at root)
  thumbnail.html          ← stays at root (compiler requires it there)
  _ds_bundle.js           ← stays at root (generated; do not move or edit)
  run-scriptura.bat  .gitignore  .nojekyll  github.md  ROADMAP.md
```

## Steps

1. **Delete backups.** `Temp/` and `ui_kits/scriptura/Temp/` — both already gitignored, contents are in git history. Also delete root `fonts.css` and `typography.css` if they are stale duplicates of `tokens/*` (diff first). Move `uploads/` out of the repo entirely.

2. **Move design-system files** into `design-system/`: `tokens/`, `components/` (the DS primitives: buttons/, data-display/, forms/, navigation/, progress/), `guidelines/`, `patches/`, `styles.css`, `SKILL.md`, `readme.md`. Leave `thumbnail.html` at root.
   - Do this move **before** step 4 so the DS `components/` folder is out of the way for the app's `components/`.

3. **Root `styles.css` shim.** The design-system compiler only finds global CSS at the project root. Create a new root `styles.css` containing exactly:
   ```css
   @import url('design-system/styles.css');
   ```
   `design-system/styles.css` keeps its `@import url('tokens/…')` lines unchanged (they are relative to that file).

4. **Move the app to root.** From `ui_kits/scriptura/`:
   - `index.html` → root (overwrite the redirect stub).
   - Screens → `screens/`, pieces → `components/`, `store.js srs.js trace.js` → `lib/`, `data.js` → `data/`, `icons/` → root `icons/`.
   - Delete the now-empty `ui_kits/`.

5. **Path fixes** (all in root `index.html` unless noted):
   - `href="../../styles.css"` → `href="styles.css"`
   - `src="../../_ds_bundle.js"` → `src="_ds_bundle.js"`
   - `src="data.js"` → `src="data/data.js"`; `store.js srs.js trace.js` → `lib/…`
   - The 15 `<script type="text/babel" src="X.jsx">` lines (index.html ~156–170) → `screens/X.jsx` or `components/X.jsx` per the layout above. **Keep the same load order.**
   - `icons/manifest.webmanifest`: `"start_url": "../index.html"` → `"./index.html"`, `"scope": "../"` → `"./"`. Icon `src` values are relative to the manifest — unchanged.
   - Keep the two comment lines at the very top of index.html (`@dsCard`, `@startingPoint`) — they register the app in the design-system picker.
   - `design-system/guidelines/brand-logo.card.html`: `../ui_kits/scriptura/icons/logo.svg` → `../../icons/logo.svg`.
   - `design-system/components/*/*.card.html`: `../../styles.css` and `../../_ds_bundle.js` → `../../../styles.css` and `../../../_ds_bundle.js` (5 files, 2 lines each).
   - `.gitignore`: replace the two `Temp/` lines with a single `Temp/`; drop `ui_kits/…`.
   - `github.md` screen map + `design-system/SKILL.md` + `design-system/readme.md` (lines ~131, 153, 163, 170): update `ui_kits/scriptura/` → new paths, `tokens/` → `design-system/tokens/`, `components/` → `design-system/components/`.
   - `run-scriptura.bat`: no change needed (serves the folder it sits in; root `index.html` is now the app).

6. **Verify.** Run `run-scriptura.bat`, open `http://localhost:5144/`. Check: fonts/colours load (styles shim), DS components render (Button, Toggle, ProgressRing, DrawingCanvas come from `_ds_bundle.js`), every screen opens, PWA install still offered, no 404s in the console. Then open each `design-system/**/*.card.html` directly and confirm they're styled.

7. **Commit.** `git mv` for everything so history follows the files. Do not commit `_ds_manifest.json` or `_adherence.oxlintrc.json` (already ignored); `_ds_bundle.js` stays committed as before — it regenerates on the next design-system sync.

## Do NOT
- Move, rename, or hand-edit `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` — generated.
- Rename any `.jsx`/`.d.ts` — the `.d.ts` + `.jsx` sibling pairs in `design-system/components/` are how components get compiled.
- Change the babel script load order in index.html.

## Follow-up (separate task, not part of this one)
Split `data/data.js` into one file per language (`data/burmese.js`, `data/tamil.js`, …) plus `data/index.js`.
