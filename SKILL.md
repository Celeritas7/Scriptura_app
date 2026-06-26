---
name: scriptura-design
description: Use this skill to generate well-branded interfaces and assets for Multi-Script Practice (the "Scriptura" design system) — a dark, glyph-forward handwriting-practice app for non-Latin scripts. Use for production work or throwaway prototypes/mocks. Contains design guidelines, color & type tokens, fonts, and reusable UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy the token CSS and read the rules here to become an expert in designing with this brand.

Quick map:
- `styles.css` — link this one file to inherit every token and the webfonts.
- `tokens/` — colors, typography, spacing, effects (CSS custom properties).
- `components/` — reusable React primitives (Button, NavButton, Toggle, RangeSlider, SegmentedControl, Tab, Card, Pill, StatChip). Each has a `.prompt.md` with usage.
- `ui_kits/scriptura/` — a full interactive recreation of the app to copy screens from.
- `guidelines/` — foundation specimen cards.

Brand in one line: near-black surfaces, one vivid accent hue per mode (practice=green, quiz=blue, sheet=violet, review=orange) rendered as 135° gradients with matching colored glows; Outfit for UI, Noto Sans per script for native glyphs; large glyphs, round corners, gentle fades; emoji + native characters as iconography (no icon library, no SVGs).

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
