# Scriptura — roadmap

Phases 1–4 (sheet, practice polish, learning engine, visual refinement) are complete.
The app is live at https://celeritas7.github.io/Scriptura_app/

## Phase 5 — Secure progress — built, setup pending
- [x] Login page: email link (top), Google (bottom), continue without an account
- [x] Per-user progress policies (sql/scriptura_app_auth.sql)
- [x] Device progress moves into the account on first sign-in
- [ ] Run sql/scriptura_app_auth.sql in Supabase
- [ ] Supabase → Authentication → URL Configuration: Site URL + redirect URLs
- [ ] Google provider: OAuth client in Google Cloud, keys into Supabase
- [ ] Sync review boxes (Leitner schedule) to the account, not just right/wrong counts

## Phase 6 — Installable app — done
- [x] Tracing-cell logo, favicon, home-screen icon, web app manifest (ui_kits/scriptura/icons/)

## Phase 7 — Concept cards
- Hindi: the hidden "a" (क = ka; ् removes the vowel)
- Telugu: how vowel signs attach, with real words
- Native-speaker check of the Tamil and Burmese example words (one-page review sheet)

## Phase 8 — Sound
- Tap a letter or example word to hear it (device text-to-speech)
- Speaker button only where the device has a voice for that language

## Phase 9 — New script
- Pick one: Korean (easiest), Thai (medium), Arabic (hardest: right-to-left, joined letters)
- Letters, units, theme, concept card, database resync
