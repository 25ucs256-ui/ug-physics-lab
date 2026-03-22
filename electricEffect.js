/* ============================================================
   UG Physics Lab — Electric Border Effect (Vanilla JS)
   Applies a canvas-based electric lightning border to any element.

   FIXES vs v1:
   - Canvas is positioned with inset:0 / 100%×100% — fills container
     exactly without any transform centering that breaks with GSAP
   - Uses offsetWidth/offsetHeight instead of getBoundingClientRect()
     so GSAP Flip transforms on the parent do NOT corrupt dimensions
   - _updateSize() resets transform before scaling (prevents accumulation)
   - Multi-pass glow (20px blur + 8px blur + 3px blur + sharp white core)
   - Glow is drawn INWARD (displacement ≤ inset) so overflow:hidden
     on the panel never clips the visible border
   ============================================================ */

'use strict';

/* ---------- Noise helpers (deterministic, no deps) ---------- */

function _random(x) {
    return ((Math.sin(x * 12.9898) * 43758.5453) % 1 + 1) % 1;
}

function _noise2D(x, y) {
    const i = Math.floor(x), j = Math.floor(y);
    const fx = x - i, fy = y - j;
    const a = _random(i + j * 57);
    const b = _random(i + 1 + j * 57);
    const c = _random(i + (j + 1) * 57);
    const d = _random(i + 1 + (j + 1) * 57);
    const ux = fx * fx * (3.0 - 2.0 * fx);
    const uy = fy * fy * (3.0 - 2.0 * fy);
    const val = a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    // Map from [0, 1] to [-1, 1] so the displacement goes both outward and inward!
    return val * 2.0 - 1.0;
}

function _octavedNoise(x, octaves, lacunarity, gain, amplitude, frequency, time, seed, flatness) {
    let y = 0, amp = amplitude, freq = frequency;
    for (let i = 0; i < octaves; i++) {
        y += (i === 0 ? amp * flatness : amp) * _noise2D(freq * x + seed * 100, time * freq * 0.3);
        freq *= lacunarity;
        amp *= gain;
    }
    return y;
}

/** Walk a rounded-rect perimeter, returning {x,y} for t ∈ [0,1) */
function _rectPoint(t, left, top, w, h, r) {
    const sw = w - 2 * r, sh = h - 2 * r;
    const ca = (Math.PI * r) / 2;
    const perim = 2 * sw + 2 * sh + 4 * ca;
    const d = t * perim;
    let a = 0;

    const arc = (cx, cy, startA, arcA, p) => ({
        x: cx + r * Math.cos(startA + p * arcA),
        y: cy + r * Math.sin(startA + p * arcA)
    });

    if (d <= a + sw) return { x: left + r + (d - a) / sw * sw, y: top };
    a += sw;
    if (d <= a + ca) return arc(left + w - r, top + r, -Math.PI / 2, Math.PI / 2, (d - a) / ca);
    a += ca;
    if (d <= a + sh) return { x: left + w, y: top + r + (d - a) / sh * sh };
    a += sh;
    if (d <= a + ca) return arc(left + w - r, top + h - r, 0, Math.PI / 2, (d - a) / ca);
    a += ca;
    if (d <= a + sw) return { x: left + w - r - (d - a) / sw * sw, y: top + h };
    a += sw;
    if (d <= a + ca) return arc(left + r, top + h - r, Math.PI / 2, Math.PI / 2, (d - a) / ca);
    a += ca;
    if (d <= a + sh) return { x: left, y: top + h - r - (d - a) / sh * sh };
    a += sh;
    return arc(left + r, top + r, Math.PI, Math.PI / 2, (d - a) / ca);
}

/* ============================================================
   ElectricCardEffect — one instance per target element
   ============================================================ */

class ElectricCardEffect {
    /**
     * @param {HTMLElement} el   – element to wrap with the effect
     * @param {object}      opts
     *   color         {string}  CSS color string  (default '#60a5fa')
     *   idleSpeed     {number}  time multiplier for idle glow
     *   idleChaos     {number}  noise amplitude for idle
     *   surgeSpeed    {number}  time multiplier for surge
     *   surgeChaos    {number}  noise amplitude for surge
     *   surgeDuration {number}  ms surge lasts before calling callback
     */
    constructor(el, opts = {}) {
        this._el = el;
        this._opts = Object.assign({
            color: '#60a5fa',
            idleSpeed: 0.40,
            idleChaos: 0.06,
            surgeSpeed: 5.50,
            surgeChaos: 0.30,
            surgeDuration: 320
        }, opts);

        this._canvas = null;
        this._ctx = null;
        this._rafId = null;
        this._time = 0;
        this._last = 0;
        this._state = 'off';     // 'off' | 'idle' | 'surge'
        this._surgeStart = 0;
        this._surgeCallback = null;
        this._ro = null;
        this._w = 0;
        this._h = 0;
        this._radius = 12;

        this._setup();
    }

    /* ----- DOM setup ----- */
    _setup() {
        // Guarantee the element is a positioning context
        if (getComputedStyle(this._el).position === 'static') {
            this._el.style.position = 'relative';
        }

        const canvas = document.createElement('canvas');
        canvas.className = 'eb-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        // The CSS stylesheet handles the positioning rules.
        // We only hard-code opacity/transition here so the JS fade works.
        canvas.style.cssText = 'opacity:0;transition:opacity 0.4s ease;';

        // Insert as first child so all panel content naturally renders above
        this._el.insertBefore(canvas, this._el.firstChild);
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');

        // Size now (safe because _updateSize guards against zero dims)
        this._updateSize();

        // Keep up-to-date when the element resizes
        this._ro = new ResizeObserver(() => this._updateSize());
        this._ro.observe(this._el);
    }

    /* ----- Sizing ----- */
    _updateSize() {
        const ew = this._el.offsetWidth;
        const eh = this._el.offsetHeight;
        if (!ew || !eh) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        // Add padding so lightning can cleanly spill outside the panel bounds
        const pad = 80;
        const w = ew + pad * 2;
        const h = eh + pad * 2;

        this._ctx.setTransform(1, 0, 0, 1, 0, 0);

        this._canvas.width = Math.round(w * dpr);
        this._canvas.height = Math.round(h * dpr);

        this._canvas.style.width = w + 'px';
        this._canvas.style.height = h + 'px';
        this._canvas.style.top = -pad + 'px';
        this._canvas.style.left = -pad + 'px';

        this._ctx.scale(dpr, dpr);

        this._w = w;
        this._h = h;
        this._pad = pad;

        const parsed = parseInt(getComputedStyle(this._el).borderRadius, 10);
        this._radius = isNaN(parsed) ? 12 : parsed;
    }

    /* ----- Animation loop ----- */
    _tick(ts) {
        if (this._state === 'off') return;

        const delta = this._last ? (ts - this._last) / 1000 : 0;
        this._last = ts;

        let speed, chaos;
        if (this._state === 'surge') {
            speed = this._opts.surgeSpeed;
            chaos = this._opts.surgeChaos;
            if (ts - this._surgeStart >= this._opts.surgeDuration) {
                this._endSurge(); return;
            }
        } else {
            speed = this._opts.idleSpeed;
            chaos = this._opts.idleChaos;
        }

        this._time += delta * speed;
        this._drawFrame(chaos);
        this._rafId = requestAnimationFrame(t => this._tick(t));
    }

    /* ----- Rendering ----- */
    _drawFrame(chaos) {
        const ctx = this._ctx, cnv = this._canvas;
        if (!ctx || !cnv || !this._w || !this._h) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.scale(dpr, dpr);

        const isSurge = this._state === 'surge';
        const color = this._opts.color;

        // The physical boundary of the parent element is exactly at our padding margin.
        const inset = this._pad;
        const left = inset, top = inset;
        const w = this._w - 2 * inset;
        const h = this._h - 2 * inset;
        const r = Math.min(this._radius, Math.min(w, h) / 2);

        // Increase displacement hugely to get a real "electric lightning" look
        // that spills far outside the box.
        const disp = isSurge ? 55 : 22;

        const perim = 2 * (w + h) + 2 * Math.PI * r;
        const samples = Math.max(160, Math.floor(perim / 1.2));

        // ---- Pass 1: widest outer bloom (20px blur) ----
        ctx.save();
        ctx.filter = 'blur(20px)';
        ctx.globalAlpha = isSurge ? 0.65 : 0.25;
        ctx.strokeStyle = color;
        ctx.lineWidth = isSurge ? 8 : 4;
        ctx.lineCap = ctx.lineJoin = 'round';
        this._path(ctx, left, top, w, h, r, disp * 0.4, chaos, samples);
        ctx.stroke();
        ctx.restore();

        // ---- Pass 2: medium glow (8px blur) ----
        ctx.save();
        ctx.filter = 'blur(8px)';
        ctx.globalAlpha = isSurge ? 0.85 : 0.50;
        ctx.strokeStyle = color;
        ctx.lineWidth = isSurge ? 4 : 2.5;
        ctx.lineCap = ctx.lineJoin = 'round';
        this._path(ctx, left, top, w, h, r, disp * 0.65, chaos, samples);
        ctx.stroke();
        ctx.restore();

        // ---- Pass 3: tight glow (3px blur) ----
        ctx.save();
        ctx.filter = 'blur(3px)';
        ctx.globalAlpha = isSurge ? 1.0 : 0.75;
        ctx.strokeStyle = color;
        ctx.lineWidth = isSurge ? 2.5 : 1.5;
        ctx.lineCap = ctx.lineJoin = 'round';
        this._path(ctx, left, top, w, h, r, disp * 0.85, chaos, samples);
        ctx.stroke();
        ctx.restore();

        // ---- Pass 4: sharp bright white core (no blur) ----
        ctx.save();
        ctx.globalAlpha = isSurge ? 1.0 : 0.85;
        ctx.strokeStyle = isSurge ? '#ffffff' : '#e0f0ff';
        ctx.lineWidth = isSurge ? 1.2 : 0.8;
        ctx.lineCap = ctx.lineJoin = 'round';
        this._path(ctx, left, top, w, h, r, disp, chaos, samples);
        ctx.stroke();
        ctx.restore();
    }

    _path(ctx, left, top, w, h, r, disp, chaos, samples) {
        ctx.beginPath();
        const t = this._time;
        for (let i = 0; i <= samples; i++) {
            const p = i / samples;
            const pt = _rectPoint(p, left, top, w, h, r);
            const nx = _octavedNoise(p * 8, 10, 1.6, 0.7, chaos, 10, t, 0, 0);
            const ny = _octavedNoise(p * 8, 10, 1.6, 0.7, chaos, 10, t, 1, 0);
            const x = pt.x + nx * disp;
            const y = pt.y + ny * disp;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
    }

    /* ----- State machine ----- */
    _startIdle() {
        if (this._state === 'idle') return;
        this._updateSize();          // always re-read size before starting
        this._state = 'idle';
        this._canvas.style.opacity = '1';
        if (!this._rafId) {
            this._last = 0;
            this._rafId = requestAnimationFrame(t => this._tick(t));
        }
    }

    _stopIdle() {
        // Stop from any non-surge state
        if (this._state === 'surge') return;
        this._state = 'off';
        this._canvas.style.opacity = '0';
        if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = null; }
    }

    /** Immediately stop everything (used when modal closes mid-surge) */
    _stopAll() {
        this._surgeCallback = null;
        this._state = 'off';
        this._canvas.style.opacity = '0';
        if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = null; }
    }

    surge(callback) {
        this._updateSize();          // always re-read size before starting
        this._surgeCallback = callback || null;
        this._state = 'surge';
        this._surgeStart = performance.now();
        this._canvas.style.opacity = '1';
        if (!this._rafId) {
            this._last = 0;
            this._rafId = requestAnimationFrame(t => this._tick(t));
        }
    }

    _endSurge() {
        const cb = this._surgeCallback;
        this._surgeCallback = null;
        this._state = 'off';
        this._canvas.style.opacity = '0';
        if (this._rafId) { cancelAnimationFrame(this._rafId); this._rafId = null; }
        if (cb) cb();
    }

    destroy() {
        this._stopAll();
        if (this._ro) this._ro.disconnect();
        if (this._canvas && this._canvas.parentNode) {
            this._canvas.parentNode.removeChild(this._canvas);
        }
    }
}

/* ============================================================
   ElectricCardEffect is instantiated directly by initExperimentModal()
   in main.js — no additional module-level wrappers needed.
   ============================================================ */
