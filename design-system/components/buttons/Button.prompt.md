**Gradient action button — the main commit control (Start Practice, Done Next, Check Answer).** Use `primary` for the one main action on a view; `secondary` for Skip/Back; `ghost` for low-emphasis toolbar actions.

```jsx
<Button accent="practice" icon="✓">Done, Next</Button>
<Button variant="secondary">Skip</Button>
<Button variant="primary" accent="quiz" size="lg">Start Practice →</Button>
```

Variants: `primary` (gradient + colored glow, lifts on hover), `secondary` (bordered surface), `ghost` (transparent). Accent picks the hue and maps to the product's modes: `practice` green, `quiz` blue, `sheet` violet, `review` orange, plus `indic`/`cjk`/`danger`. Sizes `sm` / `md` / `lg`.
