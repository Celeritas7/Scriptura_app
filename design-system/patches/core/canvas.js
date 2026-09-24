// Drawing Canvas Module - Works across all views
//
// Drop-in replacement for core/canvas.js. Same public API
// (constructor, init, setupCanvas, drawBackground, drawGuideCharacter,
// showGuide, hideGuide, clear, undo, redrawAllStrokes, setStrokeWidth,
// hasContent, reinit) — app.js needs no changes.
//
// Fixed in this revision:
//  1. Palm rejection. Migrated from mouse+touch listeners to Pointer Events,
//     which are the only ones that expose pointerType and the contact-patch
//     size. Once a pen is seen anywhere in the app, touch is rejected; before
//     that a patch wider than 35px is treated as palm, not a fingertip.
//  2. No more stray dots. startDrawing() used to fill a circle on every press,
//     so a resting palm left a strokeWidth-sized speck. The dot is now painted
//     in stopDrawing(), and only when the stroke really is a single point from
//     a pen or mouse.
//  3. Double-scaled touch coordinates. handleTouch() converted client coords
//     into canvas space, then startDrawing()/draw() multiplied by scaleX/scaleY
//     a second time — so touch strokes landed off-target whenever the canvas
//     was displayed at anything other than 1:1. One coordinate path now.
//  4. mouseout no longer aborts the stroke. Pointer capture keeps the stroke
//     attached when you cross the canvas edge.
//  5. A lifting palm can no longer end the pen's stroke: the pointer that owns
//     the stroke is recorded, and pointerup/cancel from any other pointer is
//     ignored.
//  6. Retina-correct backing store. The canvases were sized in CSS pixels, so
//     ink was soft on any DPR > 1. The buffer is now size * devicePixelRatio
//     with the context scaled to match; all drawing code works in CSS pixels
//     via this.size.
//  7. redrawAllStrokes() no longer blobs the start of every stroke — it drew a
//     filled circle at stroke[0] unconditionally, so undo/resize thickened the
//     start of each stroke. Only genuine single-point strokes get a dot.
//  8. Resize preserves ink (strokes are stored in CSS pixels and replayed).
//  9. Apple Pencil pressure modulates stroke width when reported.

// Shared across every DrawingCanvas instance: once a stylus has been used, we
// can safely treat all touch input as palm.
let penSeen = false;

const PALM_PATCH_PX = 35;

function acceptPointer(e) {
    if (e.pointerType === 'pen') { penSeen = true; return true; }
    if (!e.pointerType || e.pointerType === 'mouse') return true;
    if (penSeen) return false;
    return !((e.width || 0) > PALM_PATCH_PX || (e.height || 0) > PALM_PATCH_PX);
}

// Only a deliberate pen/mouse press may leave a dot.
const mayDot = (e) => e.pointerType === 'pen' || !e.pointerType || e.pointerType === 'mouse';

export class DrawingCanvas {
    constructor(bgCanvasId, drawCanvasId, guideCanvasId = null) {
        this.bgCanvas = document.getElementById(bgCanvasId);
        this.drawCanvas = document.getElementById(drawCanvasId);
        this.guideCanvas = guideCanvasId ? document.getElementById(guideCanvasId) : null;

        if (!this.bgCanvas || !this.drawCanvas) {
            console.error('Canvas elements not found:', bgCanvasId, drawCanvasId);
            return;
        }

        this.bgCtx = this.bgCanvas.getContext('2d');
        this.drawCtx = this.drawCanvas.getContext('2d');
        this.guideCtx = this.guideCanvas ? this.guideCanvas.getContext('2d') : null;

        this.isDrawing = false;
        this.activePointerId = null;
        this.lastX = 0;
        this.lastY = 0;
        this.size = 0;              // logical (CSS px) canvas size
        this.strokeWidth = 8;
        this.strokeColor = '#1a1a25';
        this.strokes = [];
        this.currentStroke = [];
        this.currentIsPenLike = true;
        this.guideChar = null;
        this.guideFont = null;

        this.initialized = false;
        this.init();
    }

    init() {
        if (this.initialized) return;
        this.setupCanvas();
        this.bindEvents();
        this.drawBackground();
        this.initialized = true;
    }

    setupCanvas() {
        const container = this.bgCanvas.parentElement;
        if (!container) return;

        const size = Math.min(container.offsetWidth || 400, 400);
        if (!size) return;
        const dpr = window.devicePixelRatio || 1;
        this.size = size;

        // CSS box stays in logical pixels; the backing store gets real device
        // pixels, and the context is scaled so all our drawing stays logical.
        [this.bgCanvas, this.drawCanvas, this.guideCanvas].forEach((canvas) => {
            if (!canvas) return;
            canvas.width = Math.round(size * dpr);
            canvas.height = Math.round(size * dpr);
            canvas.style.width = size + 'px';
            canvas.style.height = size + 'px';
            const ctx = canvas.getContext('2d');
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        });

        this.drawBackground();
        this.redrawAllStrokes();
        if (this.guideChar) this.drawGuideCharacter(this.guideChar, this.guideFont);
    }

    bindEvents() {
        // Pointer Events cover mouse, touch and stylus in one path — and are the
        // only ones carrying pointerType / contact-patch size, which is what
        // makes palm rejection possible at all.
        this.drawCanvas.style.touchAction = 'none';
        this.drawCanvas.addEventListener('pointerdown', (e) => this.startDrawing(e));
        this.drawCanvas.addEventListener('pointermove', (e) => this.draw(e));
        this.drawCanvas.addEventListener('pointerup', (e) => this.stopDrawing(e));
        this.drawCanvas.addEventListener('pointercancel', (e) => this.stopDrawing(e));

        // Resize handler with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.setupCanvas(), 100);
        });
    }

    // Single coordinate path, in logical (CSS) pixels — the context is already
    // DPR-scaled, so no further multiplication belongs here.
    pointFor(e) {
        const rect = this.drawCanvas.getBoundingClientRect();
        const w = (e.pointerType === 'pen' && e.pressure > 0)
            ? this.strokeWidth * (0.55 + e.pressure * 1.1)
            : this.strokeWidth;
        return {
            x: ((e.clientX - rect.left) / rect.width) * this.size,
            y: ((e.clientY - rect.top) / rect.height) * this.size,
            w
        };
    }

    startDrawing(e) {
        if (e.button && e.button !== 0) return;   // secondary button / eraser end
        if (!acceptPointer(e)) return;            // palm or stray touch
        e.preventDefault();
        try { this.drawCanvas.setPointerCapture(e.pointerId); } catch (err) {}

        const p = this.pointFor(e);
        this.isDrawing = true;
        this.activePointerId = e.pointerId;
        this.currentIsPenLike = mayDot(e);
        this.lastX = p.x;
        this.lastY = p.y;
        this.currentStroke = [p];
        // No dot painted here — see stopDrawing(). Committing ink on press is
        // what turned every palm touch into a speck.
    }

    draw(e) {
        if (!this.isDrawing || e.pointerId !== this.activePointerId) return;
        if (!acceptPointer(e)) return;
        e.preventDefault();

        // Coalesced events give smoother high-frequency stylus strokes.
        const events = e.getCoalescedEvents ? e.getCoalescedEvents() : null;
        const batch = (events && events.length) ? events : [e];

        const ctx = this.drawCtx;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (const ev of batch) {
            const p = this.pointFor(ev);
            ctx.lineWidth = p.w;
            ctx.beginPath();
            ctx.moveTo(this.lastX, this.lastY);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
            this.currentStroke.push(p);
            this.lastX = p.x;
            this.lastY = p.y;
        }
    }

    stopDrawing(e) {
        // Ignore pointerup from anything that isn't the pointer drawing this
        // stroke — a palm lifting mid-glyph used to truncate the pen's stroke.
        if (e && e.pointerId !== undefined && e.pointerId !== this.activePointerId) return;
        if (!this.isDrawing) return;

        if (e && e.pointerId !== undefined) {
            try { this.drawCanvas.releasePointerCapture(e.pointerId); } catch (err) {}
        }

        if (this.currentStroke.length === 1) {
            // A press with no movement: ink it only if it came from a pen or
            // mouse, i.e. the user meant to make a dot.
            if (this.currentIsPenLike) {
                const p = this.currentStroke[0];
                this.drawCtx.beginPath();
                this.drawCtx.arc(p.x, p.y, (p.w || this.strokeWidth) / 2, 0, Math.PI * 2);
                this.drawCtx.fillStyle = this.strokeColor;
                this.drawCtx.fill();
                this.strokes.push([...this.currentStroke]);
            }
        } else if (this.currentStroke.length > 1) {
            this.strokes.push([...this.currentStroke]);
        }

        this.isDrawing = false;
        this.activePointerId = null;
        this.currentStroke = [];
    }

    drawBackground() {
        const size = this.size;
        if (!size) return;

        this.bgCtx.fillStyle = '#fefefe';
        this.bgCtx.fillRect(0, 0, size, size);

        // Draw grid lines
        this.bgCtx.strokeStyle = '#e0e0e0';
        this.bgCtx.lineWidth = 1;

        // Vertical center line
        this.bgCtx.beginPath();
        this.bgCtx.moveTo(size / 2, 0);
        this.bgCtx.lineTo(size / 2, size);
        this.bgCtx.stroke();

        // Horizontal center line
        this.bgCtx.beginPath();
        this.bgCtx.moveTo(0, size / 2);
        this.bgCtx.lineTo(size, size / 2);
        this.bgCtx.stroke();

        // Diagonal lines
        this.bgCtx.strokeStyle = '#f0f0f0';
        this.bgCtx.setLineDash([5, 5]);

        this.bgCtx.beginPath();
        this.bgCtx.moveTo(0, 0);
        this.bgCtx.lineTo(size, size);
        this.bgCtx.stroke();

        this.bgCtx.beginPath();
        this.bgCtx.moveTo(size, 0);
        this.bgCtx.lineTo(0, size);
        this.bgCtx.stroke();

        this.bgCtx.setLineDash([]);
    }

    drawGuideCharacter(char, fontFamily = 'Noto Sans Myanmar') {
        if (!this.guideCtx) return;

        const size = this.size;
        if (!size) return;

        this.guideChar = char;
        this.guideFont = fontFamily;
        this.guideCtx.clearRect(0, 0, size, size);

        // Calculate font size based on character length
        let fontSize = size * 0.6;
        if (char.length > 1) {
            fontSize = size * 0.5 / Math.max(1, char.length * 0.35);
        }

        this.guideCtx.font = `${fontSize}px "${fontFamily}"`;
        this.guideCtx.fillStyle = 'rgba(200, 200, 200, 0.4)';
        this.guideCtx.textAlign = 'center';
        this.guideCtx.textBaseline = 'middle';
        this.guideCtx.fillText(char, size / 2, size / 2);
    }

    hideGuide() {
        if (!this.guideCtx) return;
        this.guideChar = null;
        this.guideCtx.clearRect(0, 0, this.size, this.size);
    }

    showGuide(char, fontFamily) {
        this.drawGuideCharacter(char, fontFamily);
    }

    clear() {
        this.drawCtx.clearRect(0, 0, this.size, this.size);
        this.strokes = [];
        this.currentStroke = [];
        this.isDrawing = false;
        this.activePointerId = null;
    }

    undo() {
        if (this.strokes.length === 0) return;
        this.strokes.pop();
        this.redrawAllStrokes();
    }

    redrawAllStrokes() {
        const size = this.size;
        if (!size) return;
        const ctx = this.drawCtx;
        ctx.clearRect(0, 0, size, size);
        ctx.strokeStyle = this.strokeColor;
        ctx.fillStyle = this.strokeColor;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (const stroke of this.strokes) {
            if (stroke.length === 0) continue;

            // Only a true single-point stroke is a dot. The old code drew this
            // circle for every stroke, blobbing the start of each one.
            if (stroke.length === 1) {
                ctx.beginPath();
                ctx.arc(stroke[0].x, stroke[0].y, (stroke[0].w || this.strokeWidth) / 2, 0, Math.PI * 2);
                ctx.fill();
                continue;
            }

            for (let i = 1; i < stroke.length; i++) {
                ctx.lineWidth = stroke[i].w || this.strokeWidth;
                ctx.beginPath();
                ctx.moveTo(stroke[i - 1].x, stroke[i - 1].y);
                ctx.lineTo(stroke[i].x, stroke[i].y);
                ctx.stroke();
            }
        }
    }

    setStrokeWidth(width) {
        this.strokeWidth = width;
    }

    hasContent() {
        return this.strokes.length > 0;
    }

    // Reinitialize canvas (useful when view becomes visible)
    reinit() {
        this.setupCanvas();
    }
}
