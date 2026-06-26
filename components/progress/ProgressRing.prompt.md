**Circular progress ring with a centered read-out — daily goal, lesson completion, any 0–100 metric.** Pass `label`/`sublabel` for the centered text, or `children` for custom content.

```jsx
<ProgressRing value={24} max={30} accent="practice" label="24" sublabel="/ 30 XP" />
<ProgressRing value={3} max={5} size={64} stroke={7} accent="indic"><span>3/5</span></ProgressRing>
```
