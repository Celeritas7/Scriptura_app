**Two-level navigation tab.** `layout="stacked"` for the top content-type row (glyph + label + count); `layout="inline"` for the mode row (emoji + label). Active tab fills with the accent gradient. Wrap a row of them in a `bg-secondary` rail with `radius-xl` and a hairline border.

```jsx
<Tab layout="stacked" icon="က" count={33} accent="indic" active>Consonants</Tab>
<Tab layout="inline" icon="✏️" accent="practice" active>Practice</Tab>
<Tab layout="inline" icon="🧠" accent="quiz">Quiz</Tab>
```

Mode→accent convention: Practice green, Quiz blue, Sheet violet, Review orange.
