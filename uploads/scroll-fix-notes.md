# Scroll-while-writing fix — Consonants_writing_app_advanced

Root cause: every writing surface sets `touch-action: none` AND calls
`e.preventDefault()` on every touch, so the browser never gets a chance to
scroll. On phones/iPads the practice-sheet grid fills the whole screen with
canvases, leaving nowhere to scroll from. Fix = one finger writes, two fingers
scroll (same rule Scriptura now uses).

## 1. css/styles.css  (two rules, ~line 466 and ~line 707)

```css
.writing-canvas { /* … */ touch-action: pan-x pan-y pinch-zoom; }
.sheet-canvas-cell .cell-canvas { /* … */ touch-action: pan-x pan-y pinch-zoom; }
```

## 2. core/canvas.js — replace bindEvents() touch block + handleTouch()

```js
// Touch: single finger draws, 2+ fingers scroll the page
this.drawCanvas.addEventListener('touchstart', (e) => this.handleTouch(e, 'start'), { passive: false });
this.drawCanvas.addEventListener('touchmove',  (e) => this.handleTouch(e, 'move'),  { passive: false });
this.drawCanvas.addEventListener('touchend',    (e) => { if (e.touches.length === 0) this.stopDrawing(); });
this.drawCanvas.addEventListener('touchcancel', () => this.cancelStroke());
```

```js
handleTouch(e, type) {
    if (e.touches.length > 1) {          // second finger → hand over to the scroller
        if (this.isDrawing) this.cancelStroke();
        return;                           // no preventDefault → page scrolls / pinches
    }
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.drawCanvas.getBoundingClientRect();
    const x = (touch.clientX - rect.left) * (this.drawCanvas.width  / rect.width);
    const y = (touch.clientY - rect.top)  * (this.drawCanvas.height / rect.height);
    if (type === 'start') this.startDrawing({ offsetX: x, offsetY: y, _scaled: true });
    else                  this.draw({ offsetX: x, offsetY: y, _scaled: true });
}

// drop the half-drawn stroke that was started before the second finger landed
cancelStroke() {
    this.isDrawing = false;
    this.currentStroke = [];
    this.redrawStrokes();                 // you already keep this.strokes — re-paint them
}
```

Note: startDrawing()/draw() currently multiply `offsetX` by scaleX again when
`offsetX !== undefined`, so touch coords get scaled twice. Guard with the
`_scaled` flag: `if (e.offsetX !== undefined && !e._scaled) { x = e.offsetX*scaleX … } else { x = e.offsetX … }`.

## 3. js/app.js — setupSheetCellCanvas() drawing events (~line 596)

```js
function getPos(e) {
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - r.left, y: src.clientY - r.top };   // ctx is already dpr-scaled
}
function start(e) {
    if (e.touches && e.touches.length > 1) { drawing = false; return; }
    e.preventDefault(); drawing = true; /* …unchanged… */
}
function draw(e) {
    if (e.touches && e.touches.length > 1) { drawing = false; return; } // let the page scroll
    if (!drawing) return;
    e.preventDefault(); /* …unchanged… */
}
```

## 4. Optional but recommended
* Add to `body`: `touch-action: pan-x pan-y pinch-zoom;` and
  `-webkit-user-select: none; -webkit-touch-callout: none;` (kills the
  text-selection / magnifier popup that interrupts strokes on iOS).
* Show a one-line hint under the sheet header on touch devices:
  `@media (pointer: coarse) { .scroll-hint { display: block } }` —
  "One finger writes · two fingers scroll".
* Longer term: switch to Pointer Events (`pointerdown/move/up` +
  `setPointerCapture`) as Scriptura does — gives Apple Pencil pressure,
  `getCoalescedEvents()` smoothing, and strokes don't drop when the finger
  leaves the cell.
