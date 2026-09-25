/*!
 * CoPlanAI · Platform guide · guide.js
 *
 * Renders window.COPLAN_TUTORIAL (tutorial/steps.js) into index.html and animates each
 * step's screenshot "plate" while the reader scrolls through the step's numbered beats.
 * Plain ES5 + DOM, no dependencies and no modules, so it runs from file:// and any static host.
 *
 * The scene inside a plate
 *   .plate__view     the 2:1 viewport (clips)
 *   .plate__canvas   screenshot + overlays, laid out in the IMAGE's coordinate space. The camera
 *                    is one CSS transform on this element: translate(tx, ty) scale(z).
 *   overlays         spotlight (one SVG: dim with a cut-out, halo, ring), two label pills (they
 *                    cross-fade) and the pointer. They live in canvas pixels and are counter-scaled
 *                    by 1/z, so ring, label and pointer keep the same on-screen size at any zoom.
 *
 * One requestAnimationFrame renderer per plate interpolates every channel (camera, spotlight,
 * pointer, labels) and writes them in the same frame, so the overlays can never drift from the
 * picture while it zooms. Only transform and opacity are animated on HTML elements; the SVG
 * cut-out path is re-drawn in the same frame (paint only, no layout).
 *
 * Cancellation: every activation bumps the plate's run token. Timers scheduled for an older token
 * do nothing, Web Animations (tap, ripple) are cancelled, and every tween re-targets from the
 * value currently on screen. Fast scrolling or clicking through beats therefore never queues
 * animations, never pops, and never leaves a timer running.
 */
(function () {
  'use strict';

  var doc = document, win = window, root = doc.documentElement;
  var SVGNS = 'http://www.w3.org/2000/svg';

  /* ================================================================== 1 · Settings */
  var CFG = {
    maxZoom: 2.4,          // camera zoom limit
    maxZoomSmall: 3,       // … on small plates (phones), where the screenshot is tiny
    smallPlate: 560,       // px: a plate narrower than this counts as small
    smallBoost: 1.2,       // extra zoom on small plates (never past the highlight)
    camMs: 900,            // camera move
    spotMs: 600,           // spotlight move between two highlights while the camera stays put
    spotInMs: 560,         // spotlight appearing (fades in while it tightens onto the target)
    spotOutMs: 380,        // spotlight fading out
    spotHideMs: 180,       // long jumps: the spotlight fades out, travels hidden …
    spotBackAt: 450,       // … and tightens onto the target again this long before the camera lands
    curDelay: 150,         // the pointer starts a beat after the camera
    curMs: 800,            // pointer glide
    curInMs: 280,          // pointer fade in / out
    curOutMs: 220,
    arcMin: 40,            // on-screen glides shorter than this (px) go straight, without the arc
    dwell: 180,            // the pointer rests a moment before it clicks
    labelDelay: 620,       // the label pill appears once the camera has nearly settled
    labelMs: 280,
    labelOutMs: 160,
    tapEvery: 2800,        // idle "invitation" tap while the beat stays active …
    idleTaps: 1,           // … repeated this often, so the motion ends within ~5 s (WCAG 2.2.2)
    resetMs: 380,          // replay: the calm zoom back out to the whole screen
    pad: 6,                // on-screen px between the target and the ring
    radius: 8,             // on-screen corner radius of the cut-out
    ring: 2,               // ring width (px on screen)
    halo: 8,               // soft glow width (px on screen)
    pulse: 5,              // width of the tap pulse, drawn just outside the ring (px on screen)
    readLine: 0.45,        // the reading line, as a fraction of the viewport height
    engage: 0.78,          // a step starts once its plate's top is above this fraction of the viewport …
    engageVis: 0.8         // … and, on wide screens, once this much of the plate is on screen
  };

  /* ================================================================== 2 · Helpers */
  function isArr(v) { return Array.isArray(v); }
  function arr(v) { return isArr(v) ? v : []; }
  function isObj(v) { return v !== null && typeof v === 'object' && !isArr(v); }
  function str(v) { return typeof v === 'string' ? v.trim() : (typeof v === 'number' && isFinite(v) ? String(v) : ''); }
  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function now() { return win.performance && performance.now ? performance.now() : Date.now(); }
  function fx(n) { return Math.round(n * 100) / 100; }      // 2 decimals for style strings
  function q(sel, ctx) { return (ctx || doc).querySelector(sel); }

  function media(query) { try { return win.matchMedia ? win.matchMedia(query) : null; } catch (e) { return null; } }
  function onMedia(m, fn) { if (!m) return; if (m.addEventListener) m.addEventListener('change', fn); else if (m.addListener) m.addListener(fn); }
  var mqReduce = media('(prefers-reduced-motion: reduce)');
  var mqWide = media('(min-width: 1024px)');
  var mqShort = media('(max-height: 340px) and (max-width: 1023.98px)');   // guide.css un-sticks the plate there
  function reduced() { return !!(mqReduce && mqReduce.matches); }
  function wide() { return mqWide ? mqWide.matches : win.innerWidth >= 1024; }
  function short() { return !!(mqShort && mqShort.matches); }

  /* cubic-bezier(x1,y1,x2,y2) → easing function (Newton-Raphson with a bisection fallback) */
  function bezier(x1, y1, x2, y2) {
    var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    var cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    function sx(t) { return ((ax * t + bx) * t + cx) * t; }
    function sy(t) { return ((ay * t + by) * t + cy) * t; }
    function dx(t) { return (3 * ax * t + 2 * bx) * t + cx; }
    function solve(x) {
      var t = x, i, e, d;
      for (i = 0; i < 8; i++) {
        e = sx(t) - x; if (Math.abs(e) < 1e-5) return t;
        d = dx(t); if (Math.abs(d) < 1e-6) break;
        t -= e / d;
      }
      var lo = 0, hi = 1; t = x;
      for (i = 0; i < 30 && lo < hi; i++) {
        e = sx(t); if (Math.abs(e - x) < 1e-5) return t;
        if (x > e) lo = t; else hi = t;
        t = (lo + hi) / 2;
      }
      return t;
    }
    return function (x) { return x <= 0 ? 0 : x >= 1 ? 1 : sy(solve(x)); };
  }
  var EASE = {
    camera: bezier(0.65, 0, 0.35, 1),   // the spec's calm in-out
    glide: bezier(0.42, 0, 0.18, 1),    // pointer: eases in, settles softly
    settle: bezier(0.2, 0.7, 0.2, 1),   // things arriving (spotlight tightening, label)
    fade: bezier(0.45, 0, 0.55, 1)
  };

  /* A tween over a small vector of numbers. It always re-targets from the value it has *now*, so
     an interrupted move continues smoothly towards the new target instead of jumping. */
  function Tween(v) { this.from = v.slice(); this.to = v.slice(); this.t0 = 0; this.dur = 0; this.delay = 0; this.ease = EASE.camera; }
  Tween.prototype.at = function (t, out) {             // writes the value at time t into out; returns progress 0..1
    var p = this.dur <= 0 ? (t >= this.t0 + this.delay ? 1 : 0) : (t - this.t0 - this.delay) / this.dur;
    p = clamp(p, 0, 1);
    var e = this.ease(p), i;
    for (i = 0; i < this.to.length; i++) out[i] = this.from[i] + (this.to[i] - this.from[i]) * e;
    return p;
  };
  Tween.prototype.value = function (t) { var o = []; this.at(t, o); return o; };
  Tween.prototype.go = function (t, to, dur, delay, ease) {
    this.from = this.value(t); this.to = to.slice(); this.t0 = t;
    this.dur = dur || 0; this.delay = delay || 0; if (ease) this.ease = ease;
  };
  Tween.prototype.set = function (v) { this.from = v.slice(); this.to = v.slice(); this.dur = 0; this.delay = 0; this.t0 = 0; };
  Tween.prototype.busy = function (t) { return t < this.t0 + this.delay + this.dur; };

  /* DOM building */
  function h(tag, attrs, kids) {
    var el = doc.createElement(tag), k;
    if (attrs) for (k in attrs) {
      if (!attrs.hasOwnProperty(k) || attrs[k] == null || attrs[k] === false) continue;
      if (k === 'text') el.textContent = attrs[k];
      else el.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    }
    if (kids != null) add(el, kids);
    return el;
  }
  function add(el, kids) {
    (isArr(kids) ? kids : [kids]).forEach(function (c) {
      if (c == null || c === false) return;
      el.appendChild(typeof c === 'string' ? doc.createTextNode(c) : c);
    });
    return el;
  }
  function s(tag, attrs) { var el = doc.createElementNS(SVGNS, tag), k; for (k in attrs) if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]); return el; }
  function markup(html) { var t = doc.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

  /* Inline HTML from the content file: only a few phrasing tags survive (strong, em, a, kbd …).
     Anything else is unwrapped to its text, so a typo in steps.js can never break the layout. */
  var KEEP = { STRONG: 1, B: 1, EM: 1, I: 1, A: 1, KBD: 1, CODE: 1, BR: 1, SMALL: 1 };
  var DROP = { SCRIPT: 1, STYLE: 1, IFRAME: 1, OBJECT: 1, EMBED: 1, TEMPLATE: 1, LINK: 1, META: 1 };
  function rich(html) {
    var t = doc.createElement('template');
    t.innerHTML = String(html == null ? '' : html);
    (function clean(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (k) {
        if (k.nodeType === 3) return;
        if (k.nodeType !== 1 || DROP[k.tagName]) { node.removeChild(k); return; }
        clean(k);
        if (!KEEP[k.tagName]) { while (k.firstChild) node.insertBefore(k.firstChild, k); node.removeChild(k); return; }
        Array.prototype.slice.call(k.attributes).forEach(function (a) {
          var n = a.name.toLowerCase();
          if (k.tagName === 'A' && (n === 'href' || n === 'target' || n === 'title')) return;
          k.removeAttribute(a.name);
        });
        if (k.tagName === 'A') {
          if (/^\s*(javascript|data|vbscript):/i.test(k.getAttribute('href') || '')) k.removeAttribute('href');
          if (k.getAttribute('target') === '_blank') k.setAttribute('rel', 'noopener');
        }
      });
    })(t.content);
    return t.content;
  }
  function plainText(html) { var t = doc.createElement('template'); t.innerHTML = String(html == null ? '' : html); return (t.content.textContent || '').replace(/\s+/g, ' ').trim(); }

  /* "Learn the *platform*" → Learn the <em>platform</em>. With auto=true and no asterisks, the last
     word takes the accent (the site's heading idiom: "The four tasks of *coplanning*."). */
  function accent(text, auto) {
    var frag = doc.createDocumentFragment(), src = String(text || '');
    if (/\*[^*]+\*/.test(src)) {
      src.split(/(\*[^*]+\*)/).forEach(function (part) {
        if (/^\*[^*]+\*$/.test(part)) frag.appendChild(h('em', { text: part.slice(1, -1) }));
        else if (part) frag.appendChild(doc.createTextNode(part));
      });
      return frag;
    }
    var m = auto ? src.match(/^([\s\S]*?)([^\s]+?)([.!?,:;]*)$/) : null;
    if (m && m[2]) {
      if (m[1]) frag.appendChild(doc.createTextNode(m[1]));
      frag.appendChild(h('em', { text: m[2] }));
      if (m[3]) frag.appendChild(doc.createTextNode(m[3]));
    } else frag.appendChild(doc.createTextNode(src));
    return frag;
  }
  function unstar(text) { return String(text || '').replace(/\*([^*]+)\*/g, '$1'); }

  /* ================================================================== 3 · Data */
  function isBox(b) { return isArr(b) && b.length >= 4 && isNum(b[0]) && isNum(b[1]) && isNum(b[2]) && isNum(b[3]) && b[2] > 0 && b[3] > 0; }
  function isPt(p) { return isArr(p) && p.length >= 2 && isNum(p[0]) && isNum(p[1]); }
  function box01(b) {
    var x = clamp(b[0], 0, 1), y = clamp(b[1], 0, 1);
    return [x, y, clamp(b[2], 0.002, 1 - x) || 0.002, clamp(b[3], 0.002, 1 - y) || 0.002];
  }
  function slug(v) { return str(v).replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-+|-+$/g, ''); }
  var RESERVED = { main: 1, 'site-header': 1, 'hero-h': 1, 'toc-h': 1 };

  function normalise(raw) {
    raw = isObj(raw) ? raw : {};
    var used = {}, k, stepNo = 0, beatCount = 0;
    for (k in RESERVED) used[k] = 1;
    function uid(v, fallback) {
      var id = slug(v);
      if (!id || used[id]) { id = fallback; var n = 2; while (used[id]) id = fallback + '-' + n++; }
      used[id] = 1; return id;
    }
    var model = { title: str(raw.title) || 'Platform guide', hero: isObj(raw.hero) ? raw.hero : {}, chapters: [], steps: [] };
    arr(raw.chapters).forEach(function (c) {
      if (!isObj(c)) return;
      var ch = { no: model.chapters.length + 1, steps: [] };
      ch.id = uid(c.id, 'chapter-' + ch.no);
      ch.title = str(c.title) || 'Chapter ' + ch.no;
      ch.summary = str(c.summary);
      ch.accent = c.accent !== false;
      arr(c.steps).forEach(function (st) {
        if (!isObj(st)) return;
        stepNo++;
        var m = { no: stepNo, chapter: ch, beats: [] };
        m.id = uid(st.id, 'step-' + stepNo);
        m.title = str(st.title) || 'Step ' + stepNo;
        m.lead = str(st.lead);
        m.image = str(st.image);
        m.url = str(st.url);
        m.frame = str(st.frame).toLowerCase() === 'phone' ? 'phone' : 'browser';   // "phone": no browser bar, fingertip pointer
        m.alt = str(st.alt) || unstar(m.title);
        m.note = isObj(st.note) && (str(st.note.html) || str(st.note.title)) ? {
          kind: /^(info|tip|warning)$/.test(st.note.kind) ? st.note.kind : 'info',
          title: str(st.note.title), html: str(st.note.html)
        } : null;
        arr(st.beats).forEach(function (b) {
          if (!isObj(b)) return;
          var beat = { html: str(b.html) || str(b.text), highlight: null, cursor: null, zoom: null };
          var hl = b.highlight;
          if (isObj(hl) && isBox(hl.box)) beat.highlight = { box: box01(hl.box), shape: hl.shape === 'circle' ? 'circle' : 'rect', label: str(hl.label),
            side: str(hl.side).toLowerCase().split(/[\s,]+/).filter(function (v) { return /^(left|right|above|below)$/.test(v); }) };
          if (isObj(b.cursor) && isPt(b.cursor.at)) beat.cursor = { at: [clamp(b.cursor.at[0], 0, 1), clamp(b.cursor.at[1], 0, 1)], click: !!b.cursor.click };
          if (isBox(b.zoom)) beat.zoom = box01(b.zoom);
          m.beats.push(beat); beatCount++;
        });
        ch.steps.push(m); model.steps.push(m);
      });
      if (ch.steps.length) model.chapters.push(ch);     // a chapter without steps is left out
    });
    model.chapters.forEach(function (ch, i) { ch.no = i + 1; });
    model.beatCount = beatCount;
    return model;
  }

  /* ================================================================== 4 · Scene geometry */

  /* The camera for a beat: [centreX, centreY, ln(zoom)] in normalised image units. The viewport
     has the image's 2:1 ratio, so at zoom z it shows 1/z of the image on both axes. */
  function cameraFor(beat, W) {
    var small = W > 0 && W < CFG.smallPlate, zr = beat && beat.zoom;
    var z = 1, cx = 0.5, cy = 0.5;
    if (zr) {
      z = Math.min(1 / zr[2], 1 / zr[3]) * (small ? CFG.smallBoost : 1);
      cx = zr[0] + zr[2] / 2; cy = zr[1] + zr[3] / 2;
      z = clamp(z, 1, small ? CFG.maxZoomSmall : CFG.maxZoom);
      // never crop the highlight: zoom out just enough for it (plus a margin) to fit, then nudge it inside
      var hl = beat.highlight && beat.highlight.box, m = 0.02;
      if (hl) z = Math.max(1, Math.min(z, 1 / (hl[2] + 2 * m), 1 / (hl[3] + 2 * m)));
      var half = 0.5 / z;
      if (hl) { cx = contain(cx, half, hl[0] - m, hl[0] + hl[2] + m); cy = contain(cy, half, hl[1] - m, hl[1] + hl[3] + m); }
      if (beat.cursor) { var p = beat.cursor.at; cx = contain(cx, half, p[0] - 0.01, p[0] + 0.03); cy = contain(cy, half, p[1] - 0.01, p[1] + 0.05); }
    }
    var hf = 0.5 / z;                                  // never show anything outside the image
    return [clamp(cx, hf, 1 - hf), clamp(cy, hf, 1 - hf), Math.log(z)];
  }
  function contain(c, half, lo, hi) {
    if (hi - lo > 2 * half) return c;
    if (lo < c - half) c = lo + half;
    if (hi > c + half) c = hi - half;
    return c;
  }
  /* Spotlight geometry [x, y, w, h, roundness]; a circle becomes a square box (in pixels) with roundness 1,
     so rect ↔ circle morphs are a plain interpolation. */
  function spotFor(hl, W, H) {
    var b = hl.box;
    if (hl.shape !== 'circle') return [b[0], b[1], b[2], b[3], 0];
    var cx = (b[0] + b[2] / 2) * W, cy = (b[1] + b[3] / 2) * H, d = Math.max(b[2] * W, b[3] * H);
    return [(cx - d / 2) / W, (cy - d / 2) / H, d / W, d / H, 1];
  }
  function rrect(x, y, w, h, r) {
    r = Math.max(0, Math.min(r, w / 2, h / 2));
    var X = fx(x), Y = fx(y), R = fx(r), X2 = fx(x + w), Y2 = fx(y + h);
    return 'M' + fx(x + r) + ' ' + Y + 'H' + fx(x + w - r) + 'A' + R + ' ' + R + ' 0 0 1 ' + X2 + ' ' + fx(y + r) +
      'V' + fx(y + h - r) + 'A' + R + ' ' + R + ' 0 0 1 ' + fx(x + w - r) + ' ' + Y2 +
      'H' + fx(x + r) + 'A' + R + ' ' + R + ' 0 0 1 ' + X + ' ' + fx(y + h - r) +
      'V' + fx(y + r) + 'A' + R + ' ' + R + ' 0 0 1 ' + fx(x + r) + ' ' + Y + 'Z';
  }
  /* A point of the image (normalised) → where it is in the viewport (fractions of the view) under camera cam.
     View and image share the 2:1 ratio, so both axes scale by the same zoom. */
  function toView(p, cam) { var z = Math.exp(cam[2]); return [(p[0] - cam[0]) * z + 0.5, (p[1] - cam[1]) * z + 0.5]; }
  /* Control point for the pointer's glide: a gentle arc that bows upwards (like a hand), never a straight line.
     a and b are fractions of a W×H area (the viewport: the glide is planned on screen). */
  function arcControl(a, b, W, H) {
    var ax = a[0] * W, ay = a[1] * H, bx = b[0] * W, by = b[1] * H, dx = bx - ax, dy = by - ay;
    var len = Math.sqrt(dx * dx + dy * dy);
    if (len < 1) return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    var nx = -dy / len, ny = dx / len;
    if (ny > 0 || (ny === 0 && nx < 0)) { nx = -nx; ny = -ny; }
    var k = Math.min(len * 0.2, 90);
    return [((ax + bx) / 2 + nx * k) / W, ((ay + by) / 2 + ny * k) / H];
  }

  /* ================================================================== 5 · The plate scene */
  var ICON_REPLAY = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M13.2 8a5.2 5.2 0 1 1-1.52-3.68" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12.9 1.9v2.9H10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_LOCK = '<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><rect x="2.25" y="5.25" width="7.5" height="5.5" rx="1.4" fill="currentColor"/><path d="M4 5.4V4a2 2 0 0 1 4 0v1.4" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';
  var ICON_ARROW = '<svg class="plate__arrow" viewBox="0 0 25 25" aria-hidden="true" focusable="false"><path d="M4.5 3.5v16.2l4.1-3.9 2.9 6.4 2.9-1.3-2.8-6.2h5.8z" fill="#fff" stroke="#14171C" stroke-width="1.35" stroke-linejoin="round"/></svg>';
  var ICON_CHEVRON = '<svg class="chev" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.75 4.5 6 7.75 9.25 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_IMAGE ='<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect x="4" y="6" width="24" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="11.5" cy="12.5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 23l7-6.5 5 4.5 3.5-3 6.5 5.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';

  function Scene(step) {
    var self = this;
    this.step = step;
    this.W = 0; this.H = 0;
    this.cam = new Tween([0.5, 0.5, 0]);
    this.camDip = 0;                                    // extra zoom-out (ln units) at the middle of a long pan
    this.spot = new Tween([0.45, 0.45, 0.1, 0.1, 0]);
    this.spotA = new Tween([0]);
    this.curP = new Tween([1]);                         // progress along the glide
    this.curA = new Tween([0]);
    // the glide is planned ON SCREEN (fractions of the view): from, control, to. It ends on gTo, the
    // target in image units, as framed by a camera of zoom gZ.
    this.g0 = [0.5, 0.5]; this.g1 = [0.5, 0.5]; this.g2 = [0.5, 0.5]; this.gTo = [0.5, 0.5]; this.gZ = 1;
    this.token = 0; this.timers = []; this.effects = []; this.loopTimer = 0; this.raf = 0; this.idleLeft = 0;
    this.visible = false; this.ready = false; this.missing = false;
    this.beat = null; this.pending = null;
    this.frame = function (t) { self.raf = 0; if (self.render(now())) self.kick(); };
    this.build();
  }

  Scene.prototype.build = function () {
    var st = this.step, self = this;
    var replay = h('button', { type: 'button', class: 'plate__replay', 'aria-label': 'Replay this animation', title: 'Replay' });
    replay.appendChild(markup(ICON_REPLAY));
    var url = h('span', { class: 'plate__url' });
    if (st.url) { url.appendChild(markup(ICON_LOCK)); url.appendChild(h('span', { text: st.url })); } else url.hidden = true;

    this.img = h('img', { class: 'plate__img', alt: '', draggable: 'false', decoding: 'async', loading: st.no === 1 ? 'eager' : 'lazy', width: '2400', height: '1200' });
    this.svg = s('svg', { class: 'plate__spot', 'aria-hidden': 'true', focusable: 'false', preserveAspectRatio: 'none' });
    this.dim = s('path', { class: 'dim' });
    this.halo = s('path', { class: 'halo' });
    this.pulse = s('path', { class: 'pulse' });
    this.ring = s('path', { class: 'ring' });
    this.svg.appendChild(this.dim); this.svg.appendChild(this.halo); this.svg.appendChild(this.pulse); this.svg.appendChild(this.ring);
    this.tags = [0, 1].map(function () {
      var el = h('span', { class: 'plate__tag', 'aria-hidden': 'true' }, [h('i'), h('span')]);
      return { el: el, text: el.lastChild, a: new Tween([0]), anchor: [0, 0], off: [0, 0] };
    });
    this.tagIndex = 0;
    this.finger = h('span', { class: 'plate__finger' });
    this.ptr = h('span', { class: 'plate__ptr' }, [markup(ICON_ARROW), this.finger]);
    this.ripple = h('span', { class: 'plate__ripple' });
    this.cursor = h('span', { class: 'plate__cursor', 'aria-hidden': 'true' }, [this.ripple, this.ptr]);
    this.canvas = h('div', { class: 'plate__canvas' }, [this.img, this.svg, this.tags[0].el, this.tags[1].el, this.cursor]);
    var missing = h('div', { class: 'plate__missing', 'aria-hidden': 'true' });
    missing.appendChild(markup(ICON_IMAGE));
    missing.appendChild(h('p', { class: 'lab', text: 'Screenshot coming soon' }));
    this.view = h('div', { class: 'plate__view', role: 'img', 'aria-label': st.alt }, [this.canvas, missing]);
    this.capText = h('span', { class: 'lab', text: 'Step ' + pad2(st.no) });
    this.segs = h('span', { class: 'plate__segs', 'aria-hidden': 'true' });
    st.beats.forEach(function () { self.segs.appendChild(h('i')); });
    // a phone plate (frame: "phone") has no browser bar: the replay button floats in the frame's top-right
    // corner instead, and the pointer is a fingertip on every device (guide.css)
    var phone = st.frame === 'phone';
    if (phone) replay.classList.add('plate__replay--float');
    this.el = h('figure', { class: 'plate' + (phone ? ' plate--phone' : ''), id: 'plate-' + st.id }, [
      h('div', { class: 'plate__frame' }, phone ? [this.view, replay] : [
        h('div', { class: 'plate__bar' }, [h('span', { class: 'plate__dots', 'aria-hidden': 'true' }, [h('i'), h('i'), h('i')]), url, replay]),
        this.view
      ]),
      h('figcaption', { class: 'plate__cap' }, [this.capText, this.segs])
    ]);
    this.replayBtn = replay;
    if (!st.beats.length) replay.disabled = true;
    replay.addEventListener('click', function () { self.replay(); });

    this.img.addEventListener('load', function () { self.onReady(); });
    this.img.addEventListener('error', function () { self.setMissing(); });
    if (st.image) {
      if (st.no === 1 && 'fetchPriority' in this.img) this.img.fetchPriority = 'high';
      this.img.src = st.image;
      if (this.img.complete && this.img.naturalWidth) this.onReady();
    } else this.setMissing();

    // keep the scene's pixel size in sync with the viewport (layout changes, breakpoints, zoom)
    if (win.ResizeObserver) {
      new ResizeObserver(function (entries) {
        var r = entries[0].contentRect; self.resize(r.width, r.height);
      }).observe(this.view);
    } else {
      win.addEventListener('resize', function () { self.resize(self.view.clientWidth, self.view.clientHeight); });
      setTimeout(function () { self.resize(self.view.clientWidth, self.view.clientHeight); }, 0);
    }
  };

  Scene.prototype.onReady = function () {
    if (this.ready) return;
    this.ready = true;
    this.el.classList.add('is-ready');
    if (this.pending) this.play(this.pending);
  };
  Scene.prototype.setMissing = function () {
    this.missing = true; this.ready = true;
    this.el.classList.add('is-missing');
    this.view.setAttribute('aria-label', 'Screenshot coming soon');   // don't describe a picture that isn't there
    this.cancel();
  };

  Scene.prototype.resize = function (W, H) {
    if (!W || !H || (Math.abs(W - this.W) < 0.5 && Math.abs(H - this.H) < 0.5)) return;
    var first = !this.W;
    this.W = W; this.H = H;
    this.small = W < CFG.smallPlate;
    this.el.classList.toggle('is-small', this.small);
    this.svg.setAttribute('viewBox', '0 0 ' + fx(W) + ' ' + fx(H));
    if (first && this.pending && this.ready) { this.play(this.pending); return; }
    this.refit();
  };
  /* After a size change: land on the current beat's framing at once (timers and loops keep going). */
  Scene.prototype.refit = function () {
    var t = now(), b = this.beat;
    if (b && !this.missing) {
      this.cam.set(this.shot(b, this.labelled(b) ? this.tags[this.tagIndex] : null));
      if (b.highlight) this.spot.set(spotFor(b.highlight, this.W, this.H));
      // (a glide in flight is planned in fractions of the view, so it survives the new size as it is)
    }
    this.kick();
  };

  /* Re-measure the visible label (after webfonts load its width changes) and re-frame if needed. */
  Scene.prototype.retag = function () {
    var b = this.beat;
    if (!b || !this.labelled(b) || !this.W || this.missing) return;
    var camT = this.shot(b, this.tags[this.tagIndex]);
    if (Math.abs(camT[2] - this.cam.to[2]) > 1e-3) this.cam.go(now(), camT, reduced() ? 0 : CFG.camMs / 2, 0, EASE.camera);
    this.kick();
  };
  Scene.prototype.labelled = function (b) { return !!(b && b.highlight && b.highlight.label); };

  /* Show beat b. Camera and spotlight move together; the pointer follows 150 ms later and taps. */
  Scene.prototype.play = function (beat, opts) {
    opts = opts || {};
    this.beat = beat;
    if (!this.ready || !this.W) { this.pending = beat; return; }
    this.pending = null;
    this.cancel();
    if (this.missing) return;

    var self = this, t = now(), W = this.W, H = this.H;
    var still = reduced() || opts.instant;
    var hl = beat.highlight, g = hl ? spotFor(hl, W, H) : null;

    // label pills: the old one fades out; the new one takes the other slot (placed with the framing below)
    var old = this.tags[this.tagIndex], tag = null;
    old.a.go(t, [0], still ? 0 : CFG.labelOutMs, 0, EASE.fade);
    if (g && hl.label) {
      this.tagIndex ^= 1;
      tag = this.tags[this.tagIndex];
      tag.text.textContent = hl.label;
    }
    var camT = this.shot(beat, tag), zT = Math.exp(camT[2]);
    if (tag) { tag.a.set([0]); tag.a.go(t, [1], still ? 0 : CFG.labelMs, still ? 0 : CFG.labelDelay, EASE.settle); }

    // camera: a long pan also eases out a touch in the middle, so the reader keeps their bearings
    var camNow = this.cameraAt(t), zMax = Math.exp(Math.max(camNow[2], camT[2]));
    var travel = Math.max(Math.abs(camT[0] - camNow[0]), Math.abs(camT[1] - camNow[1])) * zMax;   // in view widths
    var camMoves = Math.abs(camT[0] - camNow[0]) + Math.abs(camT[1] - camNow[1]) + Math.abs(camT[2] - camNow[2]) > 1e-3;
    this.cam.go(t, camT, still ? 0 : CFG.camMs, 0, EASE.camera);
    this.cam.from = camNow;                              // start exactly where the picture is now (dip included)
    this.camDip = still ? 0 : clamp((travel - 0.5) * 0.45, 0, 0.32);

    // spotlight
    if (g) {
      var shown = this.spotA.to[0] > 0 && this.spotA.value(t)[0] > 0.05;
      var jump = false;
      if (shown && !still) {
        // how far the ring would travel ON SCREEN (in view widths), and whether it changes shape
        var cur = this.spot.value(t), a0 = toView([cur[0] + cur[2] / 2, cur[1] + cur[3] / 2], camNow), a1 = toView([g[0] + g[2] / 2, g[1] + g[3] / 2], camT);
        var onScreen = Math.sqrt(Math.pow(a1[0] - a0[0], 2) + Math.pow((a1[1] - a0[1]) * H / W, 2));
        jump = travel > 0.5 || onScreen > 0.35 || Math.abs(g[4] - cur[4]) > 0.5;
      }
      if (jump) {
        // a long way to go: rather than sweep a lit window across unrelated parts of the screen, the
        // spotlight fades out, travels hidden and tightens onto the target again as the camera lands
        this.spotA.go(t, [0], CFG.spotHideMs, 0, EASE.fade);
        this.later(Math.max(CFG.spotHideMs, CFG.camMs - CFG.spotBackAt), function () { self.enterSpot(now(), g, zT); self.kick(); });
      } else if (!shown && !still) this.enterSpot(t, g, zT);
      else {
        // camera and spotlight on ONE clock (same duration, delay and ease) whenever the picture moves,
        // so the ring stays glued to its target on screen and never overshoots or swings back
        this.spot.go(t, g, still ? 0 : (camMoves ? CFG.camMs : CFG.spotMs), 0, EASE.camera);
        this.spotA.go(t, [1], still ? 0 : CFG.spotInMs * 0.7, 0, EASE.fade);
      }
    } else this.spotA.go(t, [0], still ? 0 : CFG.spotOutMs, 0, EASE.fade);

    // pointer: the glide is planned on screen, from where the pointer is now to where the target will be
    // once the camera has landed, so a pan under a pointer that barely has to move leaves it almost still
    var c = beat.cursor;
    if (c) {
      var to = c.at, e2 = toView(to, camT), e0;
      var curShown = this.curA.to[0] > 0 && this.curA.value(t)[0] > 0.05;
      if (still) e0 = e2;
      else if (curShown) e0 = toView(this.pointerAt(t), camNow);
      else e0 = [clamp(e2[0] + 70 / W, 0, 1), clamp(e2[1] + 54 / H, 0, 1)];   // enters from lower right
      var dx = (e2[0] - e0[0]) * W, dy = (e2[1] - e0[1]) * H;
      this.g0 = e0; this.g2 = e2; this.gTo = to.slice(); this.gZ = zT;
      this.g1 = dx * dx + dy * dy < CFG.arcMin * CFG.arcMin ? [(e0[0] + e2[0]) / 2, (e0[1] + e2[1]) / 2] : arcControl(e0, e2, W, H);
      this.curP.set([0]);
      this.curP.go(t, [1], still ? 0 : CFG.curMs, still ? 0 : CFG.curDelay, EASE.glide);
      this.curA.go(t, [1], still ? 200 : CFG.curInMs, still ? 0 : CFG.curDelay, EASE.fade);
      // glide, rest a moment, then press
      if (c.click && !reduced()) this.later(still ? 250 : CFG.curDelay + CFG.curMs + CFG.dwell, function () { self.tap(true); self.invite(); });
    } else this.curA.go(t, [0], still ? 0 : CFG.curOutMs, 0, EASE.fade);

    this.kick();
  };

  /* The spotlight appears: it fades in while it tightens onto the target from ~28 px wider on every side. */
  Scene.prototype.enterSpot = function (t, g, zT) {
    var gw = 56 / (this.W * zT), gh = 56 / (this.H * zT);
    this.spot.set([g[0] - gw / 2, g[1] - gh / 2, g[2] + gw, g[3] + gh, g[4]]);
    this.spot.go(t, g, CFG.spotInMs + 120, 60, EASE.settle);
    this.spotA.go(t, [1], CFG.spotInMs * 0.7, 0, EASE.fade);
  };

  /* Replay the current beat: a calm zoom back out to the whole screen, then the beat plays again. */
  Scene.prototype.replay = function () {
    if (!this.beat || this.missing) return;
    var self = this, b = this.beat, t = now();
    this.cancel();
    if (reduced()) {
      this.cam.set([0.5, 0.5, 0]); this.camDip = 0; this.spotA.set([0]); this.curA.set([0]);
      this.tags[0].a.set([0]); this.tags[1].a.set([0]);
      this.render(t);
      this.play(b);
      return;
    }
    var camNow = this.cameraAt(t);
    this.cam.go(t, [0.5, 0.5, 0], CFG.resetMs, 0, EASE.camera);
    this.cam.from = camNow; this.camDip = 0;
    this.spotA.go(t, [0], CFG.resetMs * 0.6, 0, EASE.fade);
    this.curA.go(t, [0], CFG.curOutMs, 0, EASE.fade);
    this.tags.forEach(function (tag) { tag.a.go(t, [0], CFG.labelOutMs, 0, EASE.fade); });
    this.later(CFG.resetMs + 80, function () { self.play(b); });
    this.kick();
  };

  /* Back to the plain, unzoomed screenshot with nothing on it (a step the reader has not reached yet). */
  Scene.prototype.neutral = function () {
    this.cancel();
    this.beat = null; this.pending = null;
    this.cam.set([0.5, 0.5, 0]); this.camDip = 0;
    this.spotA.set([0]); this.curA.set([0]); this.curP.set([1]);
    this.tags[0].a.set([0]); this.tags[1].a.set([0]);
    this.kick();
  };

  /* The camera actually on screen at time t: [cx, cy, ln z], with the pan dip and the edge clamp applied. */
  Scene.prototype.cameraAt = function (t) {
    var v = [], p = this.cam.at(t, v);
    if (p < 1 && this.camDip) v[2] -= this.camDip * Math.sin(Math.PI * this.cam.ease(p));
    v[2] = Math.max(0, v[2]);
    var hf = 0.5 / Math.exp(v[2]);
    v[0] = clamp(v[0], hf, 1 - hf); v[1] = clamp(v[1], hf, 1 - hf);
    return v;
  };

  /* Where the pointer tip is at time t, in image units. It follows its quadratic glide on screen, mapped
     through the camera of that moment; towards the end the mapping hands over to the target framing, so
     the tip always lands exactly on the target, even if the camera is still settling. */
  Scene.prototype.pointerAt = function (t) {
    var u = this.curP.value(t)[0];
    if (u >= 1) return this.gTo.slice();
    var v = 1 - u, g0 = this.g0, g1 = this.g1, g2 = this.g2;
    var sx = v * v * g0[0] + 2 * v * u * g1[0] + u * u * g2[0], sy = v * v * g0[1] + 2 * v * u * g1[1] + u * u * g2[1];
    var cam = this.cameraAt(t), z = Math.exp(cam[2]);
    var ax = cam[0] + (sx - 0.5) / z, ay = cam[1] + (sy - 0.5) / z;                          // on screen, camera now
    var bx = this.gTo[0] + (sx - g2[0]) / this.gZ, by = this.gTo[1] + (sy - g2[1]) / this.gZ;  // on screen, target framing
    var w = clamp((u - 0.7) / 0.3, 0, 1); w = w * w * (3 - 2 * w);
    return [lerp(ax, bx, w), lerp(ay, by, w)];
  };

  /* Place a label pill next to the highlight, judged in the TARGET camera's screen space. It sits
     beside the ring (left first: the pointer hangs down-right from its tip), else above or below it,
     and always inside the frame, over the dimmed part of the screen rather than over the target.
     highlight.side in steps.js ("above", or a list such as "left below") tries those sides first, in
     that order, for screens where the default would cover a neighbouring control.
     Stored as anchor (image units) + on-screen offset, so it stays attached while the camera moves. */
  Scene.prototype.placeTag = function (tag, g, camT, cursor, side) {
    var W = this.W, H = this.H; if (!W) return;
    var z = Math.exp(camT[2]), tx = W / 2 - camT[0] * W * z, ty = H / 2 - camT[1] * H * z;
    var pad = this.small ? CFG.pad - 2 : CFG.pad, gap = this.small ? 7 : 10, m = this.small ? 6 : 10;
    var ax = g[0] * W * z + tx, ay = g[1] * H * z + ty;                    // anchor (box top-left) on screen
    var x0 = ax - pad, y0 = ay - pad, x1 = (g[0] + g[2]) * W * z + tx + pad, y1 = (g[1] + g[3]) * H * z + ty + pad;
    var lw = tag.el.offsetWidth || 80, lh = tag.el.offsetHeight || 24;
    var midY = clamp((y0 + y1) / 2 - lh / 2, m, H - m - lh);
    var spots = [
      [x0 - gap - lw, midY],                                              // left
      [x1 + gap, midY],                                                   // right
      [clamp(x0, m, W - m - lw), y0 - gap - lh],                          // above
      [clamp(x0, m, W - m - lw), y1 + gap]                                // below
    ];
    var named = { left: spots[0], right: spots[1], above: spots[2], below: spots[3] };
    if (!cursor) spots.push(spots.splice(2, 1)[0]);                       // no pointer: prefer below over above
    (side || []).slice().reverse().forEach(function (k) {                 // the sides the content asked for go first
      spots.unshift(spots.splice(spots.indexOf(named[k]), 1)[0]);
    });
    var pick = null, i;
    for (i = 0; i < spots.length && !pick; i++) {
      var p = spots[i];
      if (p[0] >= m && p[0] + lw <= W - m && p[1] >= m && p[1] + lh <= H - m) pick = p;
    }
    var fits = !!pick;
    if (!pick) pick = [clamp(x0, m, W - m - lw), clamp(y0 - lh / 2, m, H - m - lh)];   // no room: straddle the ring's top edge
    tag.anchor = [g[0], g[1]];
    tag.off = [pick[0] - ax, pick[1] - ay];
    return fits;
  };

  /* The framing for a beat: its camera, zoomed out a little further when that is what it takes for the
     label pill to sit outside the ring (small plates, large highlights). Also places the label. */
  Scene.prototype.shot = function (beat, tag) {
    var camT = cameraFor(beat, this.W), hl = beat.highlight;
    if (!hl || !hl.label || !tag) return camT;
    var g = spotFor(hl, this.W, this.H), z = Math.exp(camT[2]);
    while (!this.placeTag(tag, g, camT, beat.cursor, hl.side) && z > 1.001) {
      z = Math.max(1, z * 0.88);
      var hf = 0.5 / z;
      camT = [clamp(camT[0], hf, 1 - hf), clamp(camT[1], hf, 1 - hf), Math.log(z)];
    }
    return camT;
  };

  /* The tap: a quick press of the pointer and a small amber ripple from its tip. The first tap of a beat
     also gives the ring one soft pulse, drawn just outside it so it never covers the target or its neighbours. */
  Scene.prototype.tap = function (pulse) {
    if (reduced() || !this.ptr.animate || this.missing) return;
    this.stopEffects();
    var spotOn = this.spotA.to[0] > 0;
    this.effects = [
      this.ptr.animate([{ transform: 'scale(1)' }, { transform: 'scale(.86)', offset: 0.28 }, { transform: 'scale(1)' }],
        { duration: 250, easing: 'cubic-bezier(.3,0,.2,1)' }),
      // touch screens: the see-through fingertip shows fully only while it presses
      this.finger.animate([{ opacity: 0.55, backgroundColor: 'rgba(255,255,255,0)' }, { opacity: 1, backgroundColor: 'rgba(255,255,255,.5)', offset: 0.28 }, { opacity: 0.55, backgroundColor: 'rgba(255,255,255,0)' }],
        { duration: 460, easing: 'ease-out' }),
      this.ripple.animate([{ transform: 'scale(.2)', opacity: 1 }, { transform: 'scale(.62)', opacity: 0.85, offset: 0.3 }, { transform: 'scale(1)', opacity: 0 }],
        { duration: 640, delay: 50, easing: 'cubic-bezier(.2,.7,.2,1)' })
    ];
    if (pulse && spotOn) this.effects.push(this.pulse.animate([{ opacity: 0 }, { opacity: 0.35, offset: 0.3 }, { opacity: 0 }],
      { duration: 800, delay: 50, easing: 'ease-out' }));
  };
  /* While the beat stays active and the plate is on screen, tap again a little later, CFG.idleTaps times,
     so the motion stops within about five seconds. Replay, a new beat, or the plate coming back on screen
     (or the tab coming back) invite once more. */
  Scene.prototype.invite = function (first) {
    this.idleLeft = first ? 1 : CFG.idleTaps;
    this.loop(first);
  };
  Scene.prototype.loop = function (first) {
    var self = this, tok = this.token, b = this.beat;
    clearTimeout(this.loopTimer); this.loopTimer = 0;
    if (this.idleLeft <= 0 || !this.visible || doc.hidden || reduced() || this.missing || !b || !b.cursor || !b.cursor.click) return;
    this.loopTimer = setTimeout(function () {
      self.loopTimer = 0;
      if (tok !== self.token) return;
      self.idleLeft--;
      self.tap(false); self.loop();
    }, first || CFG.tapEvery);
  };
  Scene.prototype.setVisible = function (v) {
    if (v === this.visible) return;
    this.visible = v;
    if (!v) { clearTimeout(this.loopTimer); this.loopTimer = 0; }
    else if (!this.curP.busy(now())) this.invite(900);   // back on screen: invite again shortly
  };

  Scene.prototype.later = function (ms, fn) {
    var self = this, tok = this.token, id = setTimeout(function () {
      var i = self.timers.indexOf(id); if (i >= 0) self.timers.splice(i, 1);
      if (tok === self.token) fn();
    }, ms);
    this.timers.push(id);
  };
  Scene.prototype.stopEffects = function () {
    this.effects.forEach(function (a) { try { a.cancel(); } catch (e) { /* already gone */ } });
    this.effects = [];
  };
  Scene.prototype.cancel = function () {
    this.token++;
    this.timers.forEach(clearTimeout); this.timers = [];
    clearTimeout(this.loopTimer); this.loopTimer = 0;
    this.stopEffects();
  };
  Scene.prototype.kick = function () { if (!this.raf) this.raf = requestAnimationFrame(this.frame); };

  /* One frame: evaluate every channel at time t and write the scene. Returns true while anything moves. */
  Scene.prototype.render = function (t) {
    var W = this.W, H = this.H;
    if (!W || !H || this.missing) return false;
    var busy = false, v = [], z, tx, ty;

    // camera (clamped every frame so the view never leaves the picture, even mid-move)
    if (this.cam.busy(t)) busy = true;
    v = this.cameraAt(t);
    z = Math.exp(v[2]); tx = W / 2 - v[0] * W * z; ty = H / 2 - v[1] * H * z;
    style(this.canvas, 'transform', 'translate(' + fx(tx) + 'px,' + fx(ty) + 'px) scale(' + z.toFixed(4) + ')');
    var inv = ' scale(' + (1 / z).toFixed(4) + ')';

    // spotlight
    var a = []; if (this.spotA.at(t, a) < 1) busy = true;
    if (a[0] > 0.002) {
      var g = []; if (this.spot.at(t, g) < 1) busy = true;
      var pad = (this.small ? CFG.pad - 2 : CFG.pad) / z, x = g[0] * W - pad, y = g[1] * H - pad, w = g[2] * W + 2 * pad, hh = g[3] * H + 2 * pad;
      // keep the whole ring inside the picture: a target on the screenshot's edge (the avatar, the icons
      // in the top-right corner) would otherwise lose part of its ring to the frame. Rects give up their
      // padding on that side only; circles shrink evenly so they stay round.
      var e = (CFG.ring / 2 + 1) / z;
      var cl = Math.max(0, e - x), cr = Math.max(0, x + w - (W - e)), ct = Math.max(0, e - y), cb = Math.max(0, y + hh - (H - e));
      if (cl || cr || ct || cb) {
        var sh = Math.max(cl, cr, ct, cb);
        cl = lerp(cl, sh, g[4]); cr = lerp(cr, sh, g[4]); ct = lerp(ct, sh, g[4]); cb = lerp(cb, sh, g[4]);
        x += cl; y += ct; w = Math.max(1, w - cl - cr); hh = Math.max(1, hh - ct - cb);
      }
      var r = lerp(CFG.radius / z, Math.min(w, hh) / 2, g[4]);
      var d = rrect(x, y, w, hh, r);
      attr(this.dim, 'd', 'M' + fx(-W) + ' ' + fx(-H) + 'H' + fx(2 * W) + 'V' + fx(2 * H) + 'H' + fx(-W) + 'Z' + d);
      attr(this.ring, 'd', d); attr(this.halo, 'd', d);
      attr(this.ring, 'stroke-width', (CFG.ring / z).toFixed(3));
      attr(this.halo, 'stroke-width', (CFG.halo / z).toFixed(3));
      var o = (CFG.ring / 2 + CFG.pulse / 2 + 1) / z;   // the tap pulse: a thin band just outside the ring
      attr(this.pulse, 'd', rrect(x - o, y - o, w + 2 * o, hh + 2 * o, r + o));
      attr(this.pulse, 'stroke-width', (CFG.pulse / z).toFixed(3));
    }
    style(this.svg, 'opacity', a[0] > 0.002 ? a[0].toFixed(3) : '0');

    // label pills
    for (var i = 0; i < 2; i++) {
      var tag = this.tags[i], ta = [];
      if (tag.a.at(t, ta) < 1) busy = true;
      if (ta[0] > 0.002) {
        var rise = (1 - ta[0]) * 5;
        style(tag.el, 'transform', 'translate(' + fx(tag.anchor[0] * W + tag.off[0] / z) + 'px,' + fx(tag.anchor[1] * H + (tag.off[1] + rise) / z) + 'px)' + inv);
      }
      style(tag.el, 'opacity', ta[0] > 0.002 ? ta[0].toFixed(3) : '0');
    }

    // pointer
    var ca = []; if (this.curA.at(t, ca) < 1) busy = true;
    if (ca[0] > 0.002) {
      if (this.curP.busy(t)) busy = true;
      var p = this.pointerAt(t);
      style(this.cursor, 'transform', 'translate(' + fx(p[0] * W) + 'px,' + fx(p[1] * H) + 'px)' + inv);
    }
    style(this.cursor, 'opacity', ca[0] > 0.002 ? ca[0].toFixed(3) : '0');
    return busy;
  };
  /* write a style / attribute only when it changed */
  function style(el, prop, val) { var c = el.__s || (el.__s = {}); if (c[prop] !== val) { el.style[prop] = val; c[prop] = val; } }
  function attr(el, name, val) { var c = el.__a || (el.__a = {}); if (c[name] !== val) { el.setAttribute(name, val); c[name] = val; } }

  /* ================================================================== 6 · Steps (text + plate) */
  function Step(m) {
    this.m = m; this.active = -1; this.live = false; this.beats = [];
    this.scene = new Scene(m);
    this.build();
  }
  Step.prototype.build = function () {
    var m = this.m, self = this;
    var head = h('header', { class: 'step__head' }, [
      h('p', { class: 'eyebrow', text: 'Step ' + pad2(m.no) }),
      h('h3', { class: 'h3', id: m.id + '-h' }, accent(m.title, false))
    ]);
    if (m.lead) head.appendChild(add(h('p', { class: 'step__lead' }), rich(m.lead)));

    var body = h('div', { class: 'step__body' });
    if (m.beats.length) {
      this.list = h('ol', { class: 'beats', 'aria-label': 'Instructions for ' + unstar(m.title) });
      var n = m.beats.length;
      m.beats.forEach(function (b, i) {
        var tid = m.id + '-b' + (i + 1);
        // the button is the keyboard control; its short name says what it does, and the instruction itself is
        // read once, as its description (and as ordinary text when reading the page)
        var btn = h('button', { type: 'button', class: 'beat__btn', 'aria-label': 'Show instruction ' + (i + 1) + ' of ' + n + ' on the screenshot',
          'aria-describedby': tid, 'aria-controls': 'plate-' + m.id, 'aria-keyshortcuts': 'ArrowUp ArrowDown' });
        var body = h('div', { class: 'beat__body' }, [
          btn,
          h('span', { class: 'beat__no', 'aria-hidden': 'true', text: pad2(i + 1) }),
          add(h('div', { class: 'beat__text', id: tid }), rich(b.html))
        ]);
        var li = h('li', { class: 'beat' }, body);
        btn.addEventListener('focus', function () {
          if (Nav.restoring) { Nav.restoring = false; return; }   // the window got focus back: don't jump
          if (!Nav.silentFocus) Nav.go(self, i, true);
        });
        // the whole beat is the mouse / touch target (the button lets pointer events through, so the text can
        // still be selected and copied); a keyboard press on the button lands here too
        body.addEventListener('click', function (e) {
          if (e.target && e.target.closest && e.target.closest('a')) return;
          var sel = win.getSelection ? win.getSelection() : null;
          if (sel && !sel.isCollapsed && sel.anchorNode && body.contains(sel.anchorNode)) return;
          Nav.go(self, i, true);
          if (e.detail === 0) Nav.say('Screenshot shows instruction ' + (i + 1) + ' of ' + n + '.');   // keyboard: confirm it
        });
        self.beats.push({ li: li, btn: btn, text: plainText(b.html) });
        self.list.appendChild(li);
      });
      this.list.addEventListener('keydown', function (e) { self.onKey(e); });
      body.appendChild(this.list);
    }
    var after = h('div', { class: 'step__after' });
    if (m.note) {
      var labels = { info: 'Good to know', tip: 'Tip', warning: 'Important' };
      var note = h('aside', { class: 'note note--' + m.note.kind, 'aria-label': m.note.title || labels[m.note.kind] }, [h('p', { class: 'lab', text: labels[m.note.kind] })]);
      if (m.note.title) note.appendChild(h('p', { class: 'note__title', text: m.note.title }));
      if (m.note.html) note.appendChild(add(h('div', { class: 'note__body' }), rich(m.note.html)));
      after.appendChild(note);
    }
    this.stage = h('div', { class: 'step__stage' }, this.scene.el);
    this.el = h('section', { class: 'step' + (m.beats.length ? '' : ' step--static'), id: m.id, 'aria-labelledby': m.id + '-h' },
      h('div', { class: 'wrap step__grid' }, [head, body, after, this.stage]));   // plate last: Tab reaches the beats first
    this.el.__step = this;
    this.stage.__step = this;
    this.caption(-1);
  };
  /* ↑/↓ (and Home/End) move between the beats of this step while focus is in the list */
  Step.prototype.onKey = function (e) {
    var i = -1, j, n = this.beats.length;
    for (j = 0; j < n; j++) if (this.beats[j].btn === e.target) i = j;
    if (i < 0 || e.altKey || e.ctrlKey || e.metaKey) return;
    var k = e.key, to = -1;
    if (k === 'ArrowDown' || k === 'Down') to = i + 1;
    else if (k === 'ArrowUp' || k === 'Up') to = i - 1;
    else if (k === 'Home') to = 0;
    else if (k === 'End') to = n - 1;
    else return;
    if (to < 0 || to >= n) return;              // past either end: let the page scroll as usual
    e.preventDefault();
    Nav.silentFocus = true;
    try { this.beats[to].btn.focus({ preventScroll: true }); } catch (err) { this.beats[to].btn.focus(); }
    Nav.silentFocus = false;
    Nav.go(this, to, true);
  };
  Step.prototype.activate = function (i) {
    var n = this.beats.length;
    if (!n) return;
    i = clamp(i, 0, n - 1);
    if (i === this.active) return;
    this.active = i;
    this.beats.forEach(function (b, j) {
      b.li.classList.toggle('is-active', j === i);
      if (j === i) b.btn.setAttribute('aria-current', 'step'); else b.btn.removeAttribute('aria-current');
    });
    this.caption(i);
    this.scene.play(this.m.beats[i]);
  };
  /* The reader has left this step downwards (it is below the viewport again): forget the beat, so that
     the next time the step comes into view it starts cleanly from its first beat. */
  Step.prototype.reset = function () {
    if (this.active < 0) return;
    this.active = -1;
    this.beats.forEach(function (b) { b.li.classList.remove('is-active'); b.btn.removeAttribute('aria-current'); });
    this.caption(-1);
    this.scene.neutral();
  };
  Step.prototype.caption = function (i) {
    var m = this.m, n = m.beats.length, sc = this.scene;
    sc.capText.textContent = 'Step ' + pad2(m.no) + (n ? ' · ' + (Math.max(i, 0) + 1) + ' / ' + n : '');
    Array.prototype.forEach.call(sc.segs.children, function (el, j) {
      el.className = j === i ? 'is-on' : (j < i ? 'is-done' : '');
    });
    if (sc.missing) return;                     // setMissing() has already named the placeholder
    var label = m.alt.replace(/[\s.]+$/, '') + '.';
    if (i >= 0 && this.beats[i]) label += ' Step ' + (i + 1) + ' of ' + n + ': ' + this.beats[i].text;
    sc.view.setAttribute('aria-label', label);
  };

  /* ================================================================== 7 · Scroll + navigation */
  var STEPS = [], CHAPTER_ELS = [], NAV_LINKS = [];
  var header, progressBar;

  var Nav = {
    pending: false, prog: null, hold: null, anchor: null, progTimer: 0, chapter: -1, silentFocus: false, restoring: false,

    request: function () { if (!Nav.pending) { Nav.pending = true; requestAnimationFrame(Nav.update); } },

    headerH: function () { return header ? header.offsetHeight : 72; },

    /* the line a beat must cross to become active: 45% of the viewport; on narrow screens it sits
       below the sticky plate */
    line: function (st) {
      var vh = win.innerHeight;
      if (wide() || short()) return vh * CFG.readLine;                 // (short screens: the plate isn't sticky)
      var stuck = Nav.headerH() + st.stage.offsetHeight;
      return Math.max(vh * CFG.readLine, stuck + (vh - stuck) * 0.28);
    },

    update: function () {
      Nav.pending = false;
      var vh = win.innerHeight, vw = win.innerWidth, y = win.pageYOffset || root.scrollTop || 0;
      // the layout width changed (rotation, resize across a breakpoint): the same scroll offset now points
      // somewhere else, so bring the beat the reader was on back to the reading line
      if (Nav.anchor && Nav.anchor.vw !== vw) { Nav.restore(Nav.anchor); y = win.pageYOffset || root.scrollTop || 0; }
      if (header) header.classList.toggle('is-scrolled', y > 4);
      if (progressBar) {
        var max = root.scrollHeight - vh;
        style(progressBar, 'transform', 'scaleX(' + (max > 0 ? clamp(y / max, 0, 1) : 0).toFixed(4) + ')');
      }
      if (Nav.hold && Math.abs(y - Nav.hold.y) > 48) Nav.hold = null;

      var anchor = null;
      STEPS.forEach(function (st) {
        if (!st.live || !st.beats.length) return;
        var sr = st.stage.getBoundingClientRect(), er = st.el.getBoundingClientRect();
        // engaged once the plate is well on screen: its top above 78% of the viewport and, on wide
        // screens, most of it visible (so the first zoom doesn't play half below the fold)
        var enter = vh * CFG.engage;
        if (wide()) enter = Math.min(enter, vh - sr.height * CFG.engageVis);
        if (sr.top > enter || er.bottom < vh * 0.22) {
          // left downwards (the whole section is below the viewport): start from scratch next time
          if (er.top >= vh && !(Nav.prog && Nav.prog.step === st)) st.reset();
          return;
        }
        var idx, line = Nav.line(st);
        if (Nav.prog && Nav.prog.step === st) idx = Nav.prog.index;
        else if (Nav.hold && Nav.hold.step === st) idx = Nav.hold.index;
        else {
          idx = 0;
          for (var i = 1; i < st.beats.length; i++) {
            if (st.beats[i].li.getBoundingClientRect().top <= line) idx = i; else break;
          }
        }
        st.activate(idx);
        if (er.top <= line && er.bottom > line) anchor = { st: st, index: st.active, vw: vw };
      });
      Nav.anchor = anchor;

      // the chapter in view, for the header links
      var cur = -1, lineY = vh * CFG.readLine;
      for (var c = 0; c < CHAPTER_ELS.length; c++) if (CHAPTER_ELS[c].getBoundingClientRect().top <= lineY) cur = c;
      if (cur !== Nav.chapter) {
        Nav.chapter = cur;
        NAV_LINKS.forEach(function (a) { if (+a.getAttribute('data-i') === cur) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
        Menu.mark(cur);
      }
    },

    /* activate beat i of a step and bring it to the reading line */
    go: function (st, i, smooth) {
      st.activate(i);
      var r = st.beats[i].li.getBoundingClientRect();
      var y = win.pageYOffset, max = root.scrollHeight - win.innerHeight;
      var target = clamp(y + r.top - (Nav.line(st) - 14), 0, Math.max(0, max));
      Nav.prog = { step: st, index: i };
      clearTimeout(Nav.progTimer);
      if (Math.abs(target - y) < 2) { Nav.end(); return; }
      Nav.progTimer = setTimeout(Nav.end, smooth && !reduced() ? 1600 : 120);
      try { win.scrollTo({ top: target, behavior: smooth && !reduced() ? 'smooth' : 'instant' }); }
      catch (e) { win.scrollTo(0, target); }
    },
    end: function () {
      if (!Nav.prog) return;
      clearTimeout(Nav.progTimer);
      Nav.hold = { step: Nav.prog.step, index: Nav.prog.index, y: win.pageYOffset };
      Nav.prog = null;
      Nav.request();
    },
    /* the reader takes over: stop steering */
    release: function () { if (Nav.prog) { Nav.prog = null; clearTimeout(Nav.progTimer); } Nav.hold = null; },

    /* after a change of layout width: put the beat the reader was on back just past the reading line */
    restore: function (a) {
      Nav.anchor = null; Nav.hold = null;
      if (Nav.prog) { Nav.prog = null; clearTimeout(Nav.progTimer); }
      var b = a.st.beats[a.index]; if (!b) return;
      var y = win.pageYOffset, max = root.scrollHeight - win.innerHeight;
      var target = clamp(y + b.li.getBoundingClientRect().top - (Nav.line(a.st) - 14), 0, Math.max(0, max));
      if (Math.abs(target - y) < 1) return;
      try { win.scrollTo({ top: target, behavior: 'instant' }); } catch (e) { win.scrollTo(0, target); }
    },

    /* a short, polite message for screen readers */
    say: function (text) {
      var el = q('[data-guide="live"]'); if (!el) return;
      el.textContent = '';
      setTimeout(function () { el.textContent = text; }, 60);
    }
  };

  /* The header's chapter menu: a "Chapters" disclosure button and a panel with one link per chapter (a plain
     list of links, not an ARIA menu, so it reads and tabs like any navigation). The button counts the chapter
     on screen ("03/07") and its link carries aria-current. Esc, a click outside, leaving it with Tab or
     following a link close it; ↑/↓, Home and End move between the links. */
  var Menu = {
    nav: null, btn: null, panel: null, count: null, open: false, total: 0,

    build: function (list, nCh, nSt) {
      var nav = list.parentNode;
      if (!nav) return;
      Menu.nav = nav; Menu.total = nCh;
      Menu.count = h('span', { class: 'site-nav__count', 'aria-hidden': 'true' });
      Menu.btn = h('button', { type: 'button', class: 'site-nav__btn', 'aria-expanded': 'false', 'aria-controls': 'chapter-menu' },
        [h('span', { class: 'site-nav__word', text: 'Chapters' }), Menu.count]);
      Menu.btn.appendChild(markup(ICON_CHEVRON));
      nav.insertBefore(Menu.btn, list);
      Menu.panel = h('div', { class: 'site-nav__panel', id: 'chapter-menu' }, [
        h('p', { class: 'lab site-nav__lab', 'aria-hidden': 'true', text: nCh + (nCh === 1 ? ' chapter · ' : ' chapters · ') + nSt + (nSt === 1 ? ' step' : ' steps') }),
        list
      ]);
      nav.appendChild(Menu.panel);

      Menu.btn.addEventListener('click', function () { Menu.set(!Menu.open); });
      list.addEventListener('click', function (e) { if (e.target && e.target.closest && e.target.closest('a')) Menu.set(false); });
      nav.addEventListener('keydown', Menu.onKey);
      nav.addEventListener('focusout', function (e) {
        if (!Menu.open) return;
        var to = e.relatedTarget;
        if (to && nav.contains(to)) return;
        setTimeout(function () { if (!nav.contains(doc.activeElement)) Menu.set(false); }, 0);
      });
      doc.addEventListener('click', function (e) { if (Menu.open && !nav.contains(e.target)) Menu.set(false); });
    },

    set: function (v) {
      if (!Menu.btn || v === Menu.open) return;
      Menu.open = v;
      Menu.btn.setAttribute('aria-expanded', String(v));
      Menu.nav.classList.toggle('is-open', v);
    },

    onKey: function (e) {
      var k = e.key, n = NAV_LINKS.length;
      if (k === 'Escape' || k === 'Esc') {
        if (!Menu.open) return;
        e.preventDefault(); Menu.set(false); Menu.btn.focus();
        return;
      }
      if (!/^(ArrowDown|ArrowUp|Down|Up|Home|End)$/.test(k) || e.altKey || e.ctrlKey || e.metaKey) return;
      var i = NAV_LINKS.indexOf(doc.activeElement), down = k === 'ArrowDown' || k === 'Down', to;
      if (i < 0) {                                    // on the button: open, and go to the chapter on screen
        if (k === 'Home' || k === 'End') return;
        Menu.set(true);
        to = down ? Math.max(0, Nav.chapter) : n - 1;
      } else to = k === 'Home' ? 0 : k === 'End' ? n - 1 : clamp(i + (down ? 1 : -1), 0, n - 1);
      e.preventDefault();
      NAV_LINKS[to].focus();
    },

    /* the chapter on screen (-1: none yet, the reader is in the hero) */
    mark: function (cur) {
      if (!Menu.count) return;
      Menu.count.textContent = cur >= 0 ? pad2(cur + 1) + '/' + pad2(Menu.total) : '';
      Menu.nav.classList.toggle('has-current', cur >= 0);
    }
  };

  /* ================================================================== 8 · Page render */
  function render(model) {
    var target = q('[data-guide="chapters"]');
    doc.title = unstar(model.title) + ' · CoPlanAI';
    header = q('#site-header');
    if (!q('[data-guide="live"]')) doc.body.appendChild(h('p', { class: 'sr', 'aria-live': 'polite', 'data-guide': 'live' }));
    progressBar = q('[data-guide="progress"]');

    setText('[data-guide="eyebrow"]', 'CoPlanAI · ' + unstar(model.title));
    var hero = model.hero;
    if (str(hero.heading)) replaceKids(q('[data-guide="heading"]'), accent(str(hero.heading), false));
    if (str(hero.subline)) setText('[data-guide="subline"]', str(hero.subline));
    if (str(hero.intro)) replaceKids(q('[data-guide="intro"]'), rich(str(hero.intro)));

    var nCh = model.chapters.length, nSt = model.steps.length, nB = model.beatCount;
    var stats = q('[data-guide="stats"]');
    if (stats && nSt) {
      add(stats, [stat(nCh, 'chapter', 'chapters'), stat(nSt, 'step', 'steps'), stat(nB, 'animated tip', 'animated tips')]);
      stats.hidden = false;
      var cue = q('[data-guide="cue"]'); if (cue) cue.hidden = false;
    }
    var start = q('[data-guide="start"]');
    if (start) {
      if (nSt) start.setAttribute('href', '#' + model.steps[0].id);
      else start.hidden = true;
    }

    // index of chapters: one row per chapter (a link to it), each with a disclosure button that lists its
    // steps, so the index stays compact however many chapters and steps the guide has
    var toc = q('[data-guide="toc"]');
    if (toc && nSt) {
      var list = h('ol', { class: 'toc__chapters' });
      model.chapters.forEach(function (ch) {
        if (!ch.steps.length) return;
        var sid = ch.id + '-steps', n = ch.steps.length, title = unstar(ch.title);
        var steps = h('ol', { class: 'toc__steps', id: sid, hidden: true });
        ch.steps.forEach(function (st) {
          steps.appendChild(h('li', null, h('a', { href: '#' + st.id }, [
            h('span', { class: 'toc__no', text: pad2(st.no) }),
            h('span', { class: 'toc__t', text: unstar(st.title) })
          ])));
        });
        var toggle = h('button', { type: 'button', class: 'toc__toggle', 'aria-expanded': 'false', 'aria-controls': sid }, [
          h('span', { text: n + (n === 1 ? ' step' : ' steps') }), h('span', { class: 'sr', text: ' in ' + title })
        ]);
        toggle.appendChild(markup(ICON_CHEVRON));
        toggle.addEventListener('click', function () {
          var open = toggle.getAttribute('aria-expanded') !== 'true';
          toggle.setAttribute('aria-expanded', String(open));
          steps.hidden = !open;
          item.classList.toggle('is-open', open);
        });
        var item = h('li', { class: 'toc__chapter' }, [
          h('div', { class: 'toc__row' }, [
            h('a', { class: 'toc__head', href: '#' + ch.id }, [
              h('span', { class: 'lab', text: 'Chapter ' + pad2(ch.no) }),
              h('span', { class: 'toc__title', text: title })
            ]),
            toggle
          ]),
          steps
        ]);
        list.appendChild(item);
      });
      toc.appendChild(list);
      toc.hidden = false;
    }

    // header menu + footer chapter links
    var nav = q('[data-guide="nav"]'), fnav = q('[data-guide="footer-nav"]');
    model.chapters.forEach(function (ch, i) {
      if (nav) {
        var a = h('a', { href: '#' + ch.id, 'data-i': String(i) }, [
          h('span', { class: 'site-nav__no', 'aria-hidden': 'true', text: pad2(ch.no) }),
          h('span', { class: 'site-nav__t', text: unstar(ch.title) }),
          h('span', { class: 'site-nav__n', text: ch.steps.length + (ch.steps.length === 1 ? ' step' : ' steps') })
        ]);
        NAV_LINKS.push(a); nav.appendChild(h('li', null, a));
      }
      if (fnav) fnav.appendChild(h('li', null, h('a', { href: '#' + ch.id, text: unstar(ch.title) })));
    });
    if (nav && NAV_LINKS.length) Menu.build(nav, nCh, nSt);

    if (!target) return;
    if (!nCh || !nSt) {
      target.appendChild(h('div', { class: 'wrap empty' }, h('div', { class: 'note' }, [
        h('p', { class: 'lab', text: 'Coming soon' }),
        h('p', { class: 'note__title', text: 'The steps of this guide are on their way.' }),
        add(h('p', { class: 'note__body' }), ['In the meantime, write to us at ', h('a', { href: 'mailto:info@coplanai.com', text: 'info@coplanai.com' }), '.'])
      ])));
      return;
    }

    // chapters and their steps
    var frag = doc.createDocumentFragment();
    model.chapters.forEach(function (ch) {
      var main = h('div', { class: 'chapter__main' }, [
        h('p', { class: 'eyebrow', text: 'Chapter ' + pad2(ch.no) + ' · ' + ch.steps.length + (ch.steps.length === 1 ? ' step' : ' steps') }),
        h('h2', { class: 'h2', id: ch.id + '-h' }, accent(ch.title, ch.accent))
      ]);
      var rule = h('div', { class: 'chapter__rule' }, main);
      if (ch.summary) rule.appendChild(add(h('p', { class: 'chapter__summary' }), rich(ch.summary)));
      var sec = h('section', { class: 'chapter', id: ch.id, 'aria-labelledby': ch.id + '-h' }, h('div', { class: 'wrap chapter__head' }, rule));
      ch.steps.forEach(function (m) {
        var st = new Step(m);
        STEPS.push(st);
        sec.appendChild(st.el);
      });
      CHAPTER_ELS.push(sec);
      frag.appendChild(sec);
    });
    target.appendChild(frag);
  }
  function stat(n, one, many) { return h('span', null, [h('b', { text: String(n) }), ' ' + (n === 1 ? one : many)]); }
  function setText(sel, text) { var el = q(sel); if (el) el.textContent = text; }
  function replaceKids(el, frag) { if (!el) return; while (el.firstChild) el.removeChild(el.firstChild); el.appendChild(frag); }

  /* ================================================================== 9 · Wiring */
  function wire() {
    var hasIO = 'IntersectionObserver' in win;
    // which steps are near the viewport (only those are measured on scroll and may animate)
    if (hasIO) {
      var liveIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var st = e.target.__step;
          st.live = e.isIntersecting;
          // a jump (Home key, "Back to the top") can carry a step out of range in one go: if it is now below
          // the viewport, forget its beat so it starts from scratch next time
          if (!e.isIntersecting && e.boundingClientRect.top > 0 && !(Nav.prog && Nav.prog.step === st)) st.reset();
        });
        Nav.request();
      }, { rootMargin: '25% 0px 25% 0px' });
      // which plates are actually on screen (the idle tap loop runs only there)
      var visIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.target.__step.scene.setVisible(e.isIntersecting && e.intersectionRatio >= 0.2); });
      }, { threshold: [0, 0.2, 0.5] });
      STEPS.forEach(function (st) { liveIO.observe(st.el); visIO.observe(st.stage); });
    } else STEPS.forEach(function (st) { st.live = true; st.scene.setVisible(true); });

    win.addEventListener('scroll', Nav.request, { passive: true });
    win.addEventListener('orientationchange', Nav.request);
    var fitPending = 0;
    win.addEventListener('resize', function () {
      Nav.request();
      if (!fitPending) fitPending = requestAnimationFrame(function () { fitPending = 0; fitNav(); });
    });
    fitNav();
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () {
      fitNav();
      STEPS.forEach(function (st) { st.scene.retag(); });
    });
    win.addEventListener('scrollend', function () { if (Nav.prog) Nav.end(); });
    // the reader scrolling on their own ends any programmatic steering
    ['wheel', 'touchstart', 'mousedown'].forEach(function (type) {
      win.addEventListener(type, function (e) {
        if (type === 'mousedown' && e.target && e.target.closest && e.target.closest('.beat__body')) return;
        Nav.release();
      }, { passive: true, capture: true });
    });
    win.addEventListener('keydown', function (e) {
      if (/^(PageUp|PageDown|Home|End|ArrowUp|ArrowDown| |Spacebar)$/.test(e.key) && !(e.target && e.target.classList && e.target.classList.contains('beat__btn'))) Nav.release();
    }, true);
    // coming back to the tab re-focuses the last beat button; that must not scroll the page
    win.addEventListener('blur', function () {
      var a = doc.activeElement;
      Nav.restoring = !!(a && a.classList && a.classList.contains('beat__btn'));
    });
    win.addEventListener('focus', function () { setTimeout(function () { Nav.restoring = false; }, 60); });
    doc.addEventListener('visibilitychange', function () {
      STEPS.forEach(function (st) {
        if (doc.hidden) { clearTimeout(st.scene.loopTimer); st.scene.loopTimer = 0; }
        else if (st.scene.visible) st.scene.invite(900);
      });
    });
    onMedia(mqReduce, function () { STEPS.forEach(function (st) { st.scene.loop(); }); });
    onMedia(mqWide, Nav.request);
    onMedia(mqShort, Nav.request);
  }

  /* show the chapter menu in the header only when the whole bar fits (and close it when it goes) */
  function fitNav() {
    var bar = q('.site-header__bar'), nav = q('.site-nav');
    if (!bar || !nav || !NAV_LINKS.length) { if (bar) bar.classList.add('is-tight'); return; }
    bar.classList.remove('is-tight');
    if (nav.offsetWidth && bar.scrollWidth > bar.clientWidth + 1) bar.classList.add('is-tight');
    if (!nav.offsetWidth) Menu.set(false);
  }

  /* deep links: content is rendered after the browser tried to jump, so jump again */
  function followHash() {
    var id = (location.hash || '').slice(1);
    try { id = decodeURIComponent(id); } catch (e) { /* a malformed hash: use it as it is */ }
    if (!id) return false;
    var el = doc.getElementById(id);
    if (!el || el === q('#main')) return false;
    try { el.scrollIntoView({ block: 'start', behavior: 'instant' }); } catch (e) { el.scrollIntoView(true); }
    return true;
  }

  function init() {
    try {
      var model = normalise(win.COPLAN_TUTORIAL);
      if (!isObj(win.COPLAN_TUTORIAL) && win.console) console.warn('CoPlanAI guide: steps.js did not define window.COPLAN_TUTORIAL.');
      render(model);
      wire();
      var jumped = followHash();
      Nav.request();
      if (jumped && doc.fonts && doc.fonts.ready) {
        // fonts can shift the layout by a few pixels: land on the anchor again unless the reader moved
        var y0 = win.pageYOffset;
        doc.fonts.ready.then(function () { if (Math.abs(win.pageYOffset - y0) < 4) { followHash(); Nav.request(); } });
      }
    } finally {
      root.classList.add('guide-ready');           // whatever happens, the page leaves its loading state
    }
  }

  // expose a tiny read-only handle for debugging and tests
  win.CoPlanGuide = { version: '1.1', steps: function () { return STEPS; }, config: CFG };

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
})();
