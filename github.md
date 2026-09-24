repo: Celeritas7/Scriptura_app
branch: main

## Last sync
date: 2026-09-24T00:00:00Z
### Updated in this project
- Restructured: app moved to repo root, design system into design-system/
- Root styles.css is now a one-line shim importing design-system/styles.css
- Temp/ backups and ui_kits/ removed

## Sync history
- 2026-09-23T08:02:37Z — Verified the push: _ds_bundle.js committed, all Temp/ backups untracked; SQL consolidated into sql/

## Screen map
| Screen | Repo files |
|---|---|
| App shell / routing | index.html, lib/store.js, lib/srs.js, data/data.js |
| Home | screens/Dashboard.jsx |
| Path | components/LessonPath.jsx, components/LessonNode.jsx |
| Lesson + concept cards | screens/LessonView.jsx, components/ConceptCard.jsx, lib/trace.js |
| Review / Flashcards | screens/ReviewSession.jsx, components/Flashcard.jsx |
| Practice sheet | screens/PracticeSheet.jsx, components/DrawCanvas.jsx |
| Progress | screens/ProgressScreen.jsx |
| Login | screens/LoginScreen.jsx |
| Word builder | components/WordBuilder.jsx |
| Design system | design-system/ (tokens, components, guidelines, patches), styles.css shim |
