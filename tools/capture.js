#!/usr/bin/env node
/*
 * tools/capture.js: screenshots with exact highlight coordinates for the CoPlanAI platform guide.
 *
 * Every screenshot in tutorial/img is 2400x1200 WebP (2:1), taken from a 1900x950 CSS-pixel viewport at
 * deviceScaleFactor 2 and downscaled. Beats in tutorial/steps.js point at parts of the screenshot with
 * normalised coordinates (0..1, origin top-left). This helper takes the screenshot AND measures the elements
 * you name, so the numbers are exact and you never have to guess them by eye.
 *
 * LIBRARY (CommonJS)
 *   const capture = require('./tools/capture');
 *   const { page, close } = await capture.connect({ cdp: 'http://127.0.0.1:9222' });   // your logged-in browser
 *   //   or: await capture.connect({ launch: true, storageState: 'tools/.auth/coplan.json', headless: true });
 *   await page.goto('https://coplanai.ikonai.app/');
 *   await page.getByRole('button', { name: 'Create' }).waitFor();
 *   const res = await capture.shot(page, '08-create-workshop', {
 *     highlights: { create: page.getByRole('button', { name: 'Create' }) },   // Locator, selector string, or spec
 *     points:     { create: 'role=button[name=/Create/]' },   // role=...[name="X"] is exact; /X/ is a substring
 *   });
 *   console.log(res.snippet);   // beat objects ready to paste into steps.js
 *   await close();              // CDP: closes only the tab it opened, then disconnects
 *
 * CLI
 *   node tools/capture.js shot <name> --url <url> (--cdp <endpoint> | --state <file> | --user-data-dir <dir>)
 *        [--click <sel>] [--hover <sel>] [--press <key>] [--scroll <sel|px>] [--wait <ms>]   (run in order)
 *        [--highlight key=<sel>]... [--point key=<sel>]... [--hide <sel>]...
 *        [--out <dir>] [--debug <dir>] [--pad <px>] [--settle <ms>] [--quality <0-100>] [--strict]
 *   node tools/capture.js run <script.js> (--cdp ... | --state ...) [--out <dir>] [--debug <dir>]
 *   node tools/capture.js login --state <file> [--url <url>]
 *   node tools/capture.js --demo [--out <dir>] [--demo-page <file>]
 *   node tools/capture.js help
 *
 * OUTPUT for shot(page, name)
 *   <out>/<name>.webp  2400x1200 (out defaults to tutorial/img)
 *   <out>/<name>.json  { image, url, viewport, highlights: {key: {box, center, zoom}}, points: {key: [x, y]},
 *                        beats: {key: {highlight, cursor, zoom}}, warnings }
 *   <debug>/<name>.debug.png  (only with the debug option) boxes, points and zoom drawn on the final image
 *
 * Coordinates are fractions of the 1900x950 viewport, 4 decimals. Highlight boxes are padded by `pad` CSS px
 * (default 6) so the spotlight hugs the element with a small margin. `zoom` is a suggested 2:1 camera region
 * (w === h in normalised units) that contains the box, never zooms past 2.4x, and is null when the box is so
 * large that zooming is pointless. A locator that is missing, hidden or off-screen yields null plus a warning;
 * it never aborts the capture.
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { pathToFileURL } = require('url');

const VIEWPORT = Object.freeze({ width: 1900, height: 950 });
const DEVICE_SCALE_FACTOR = 2;
const OUTPUT = Object.freeze({ width: 2400, height: 1200 });
const MAX_ZOOM = 2.4; // the guide engine never zooms further than this
const MIN_ZOOM_SIZE = Math.ceil(10000 / MAX_ZOOM) / 10000; // 0.4167: smallest zoom region, normalised
const REPO_ROOT = path.resolve(__dirname, '..');
const DEFAULT_OUT_DIR = path.join(REPO_ROOT, 'tutorial', 'img');
const PLAYWRIGHT_FALLBACK = '/opt/node22/lib/node_modules/playwright';

const DEFAULTS = Object.freeze({
  out: DEFAULT_OUT_DIR, // where <name>.webp and <name>.json are written
  debug: null, // directory for <name>.debug.png (boxes drawn on the image); null = none
  pad: 6, // CSS px added around every highlight box
  settle: 400, // ms to wait before measuring (after which fonts, images and CSS animations are awaited too)
  locatorTimeout: 2000, // ms to wait for each locator to become visible
  quality: 85, // WebP quality
  zoomMargin: 0.06, // normalised margin around a highlight inside the suggested zoom region
  hide: [], // selectors/locators made visibility:hidden during the shot (toasts, dev banners...)
  mask: [], // locators painted over with maskColor in the image (e.g. personal data)
  maskColor: '#F3F4F6',
  hideScrollbars: true,
  resizer: 'auto', // 'auto' | 'sharp' | 'pillow' | 'browser'
  quiet: false, // true = do not print warnings (they are still returned and written to the JSON)
});

/* ------------------------------------------------------------------------------------------------------------
 * Dependencies (resolved lazily so the pure helpers can be required without Playwright installed)
 * ---------------------------------------------------------------------------------------------------------- */

let playwrightCache = null;
function loadPlaywright() {
  if (playwrightCache) return playwrightCache;
  const errors = [];
  const attempts = [
    () => require.resolve('playwright'),
    () => require.resolve('playwright', { paths: [__dirname, process.cwd()] }),
    () => require.resolve(PLAYWRIGHT_FALLBACK),
  ];
  for (const attempt of attempts) {
    try {
      playwrightCache = require(attempt());
      return playwrightCache;
    } catch (e) {
      errors.push(firstLine(e.message));
    }
  }
  throw new Error(
    'Playwright was not found. Run `npm install` inside tools/ (or install playwright globally).\n  ' + errors.join('\n  ')
  );
}

let sharpCache;
function loadSharp() {
  if (sharpCache !== undefined) return sharpCache;
  sharpCache = null;
  for (const paths of [undefined, [__dirname, process.cwd()]]) {
    try {
      sharpCache = require(require.resolve('sharp', paths ? { paths } : undefined));
      break;
    } catch (e) {
      /* not installed: fall through */
    }
  }
  return sharpCache;
}

let pythonCache;
function findPillowPython() {
  if (pythonCache !== undefined) return pythonCache;
  pythonCache = null;
  for (const exe of [process.env.PYTHON, 'python3', 'python'].filter(Boolean)) {
    const r = spawnSync(exe, ['-c', 'import PIL'], { stdio: 'ignore' });
    if (r.status === 0) {
      pythonCache = exe;
      break;
    }
  }
  return pythonCache;
}

function runPython(script, args, input) {
  const exe = findPillowPython();
  if (!exe) throw new Error('Python with Pillow is not available (pip install pillow)');
  const r = spawnSync(exe, ['-c', script, ...args.map(String)], { input, maxBuffer: 64 * 1024 * 1024 });
  if (r.error) throw r.error;
  if (r.status !== 0) throw new Error(`python exited with ${r.status}: ${String(r.stderr).trim()}`);
  return String(r.stdout);
}

/* ------------------------------------------------------------------------------------------------------------
 * connect(): an existing browser over CDP, or a launched one
 * ---------------------------------------------------------------------------------------------------------- */

function defaultExecutablePath() {
  if (process.env.CAPTURE_CHROMIUM) return process.env.CAPTURE_CHROMIUM;
  if (fs.existsSync('/opt/pw-browsers/chromium')) return '/opt/pw-browsers/chromium'; // this dev container
  return undefined; // Playwright's own bundled Chromium
}

function defaultLaunchArgs() {
  const args = [];
  if (typeof process.getuid === 'function' && process.getuid() === 0) args.push('--no-sandbox');
  if (process.env.CAPTURE_CHROME_ARGS) args.push(...process.env.CAPTURE_CHROME_ARGS.split(/\s+/).filter(Boolean));
  return args;
}

const cdpSessions = new WeakMap(); // keeps the emulation session alive for pages opened over CDP

/**
 * Force the 1900x950 @2x viewport on a page whose context has no viewport of its own (pages opened over CDP).
 * Launched contexts already have it; calling this on them is harmless.
 */
async function emulateViewport(page) {
  const session = await page.context().newCDPSession(page);
  await session.send('Emulation.setDeviceMetricsOverride', {
    width: VIEWPORT.width,
    height: VIEWPORT.height,
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    mobile: false,
    screenWidth: VIEWPORT.width,
    screenHeight: VIEWPORT.height,
  });
  cdpSessions.set(page, session);
  return page;
}

/**
 * connect(options) -> { browser, context, page, mode, newPage(), close() }
 *
 *   { cdp: 'http://127.0.0.1:9222' }
 *       Attach to a Chromium you started with --remote-debugging-port and are logged into. A NEW tab is opened in
 *       its default (logged-in) context; existing tabs are never touched. close() closes only that tab and
 *       disconnects, leaving the browser running.
 *   { launch: true, storageState: 'tools/.auth/coplan.json', headless: true }
 *       Launch Chromium with a session saved by `capture.js login` (cookies, localStorage and IndexedDB).
 *   { launch: true, userDataDir: 'tools/.auth/profile' }
 *       Launch with a persistent profile directory instead (log in once with headless: false).
 * Extra launch options: executablePath (default: $CAPTURE_CHROMIUM, /opt/pw-browsers/chromium, or Playwright's
 * own browser), args (added to --no-sandbox when root and $CAPTURE_CHROME_ARGS).
 */
async function connect(options = {}) {
  const { chromium } = loadPlaywright();

  if (options.cdp) {
    const browser = await chromium.connectOverCDP(options.cdp);
    const context = browser.contexts()[0] || (await browser.newContext());
    const opened = [];
    const newPage = async () => {
      const p = await context.newPage();
      opened.push(p);
      await emulateViewport(p);
      return p;
    };
    const page = await newPage();
    const close = async () => {
      for (const p of opened) await p.close().catch(() => {});
      await browser.close().catch(() => {}); // over CDP this only disconnects
    };
    return { browser, context, page, mode: 'cdp', newPage, close };
  }

  if (options.launch || options.storageState || options.userDataDir) {
    const headless = options.headless !== false;
    const launchOptions = {
      headless,
      executablePath: options.executablePath || defaultExecutablePath(),
      args: [...defaultLaunchArgs(), ...(options.args || [])],
    };
    const contextOptions = {
      viewport: { ...VIEWPORT },
      deviceScaleFactor: DEVICE_SCALE_FACTOR,
      ...(options.contextOptions || {}),
    };
    let browser;
    let context;
    if (options.userDataDir) {
      context = await chromium.launchPersistentContext(path.resolve(options.userDataDir), {
        ...launchOptions,
        ...contextOptions,
      });
      browser = context.browser();
    } else {
      if (options.storageState && typeof options.storageState === 'string' && !fs.existsSync(options.storageState)) {
        throw new Error(`storageState file not found: ${options.storageState} (create it with: capture.js login)`);
      }
      browser = await chromium.launch(launchOptions);
      context = await browser.newContext({ ...contextOptions, storageState: options.storageState || undefined });
    }
    const newPage = () => context.newPage();
    const page = context.pages()[0] || (await newPage());
    const close = async () => {
      await context.close().catch(() => {});
      if (browser) await browser.close().catch(() => {});
    };
    return { browser, context, page, mode: options.userDataDir ? 'persistent' : 'launch', newPage, close };
  }

  throw new Error('connect(): pass { cdp: <endpoint> } or { launch: true, storageState | userDataDir }');
}

/* ------------------------------------------------------------------------------------------------------------
 * Geometry (pure functions, exported for tests)
 * ---------------------------------------------------------------------------------------------------------- */

const round4 = (n) => {
  const r = Math.round(n * 10000) / 10000;
  return Object.is(r, -0) ? 0 : r;
};
const ceil4 = (n) => Math.ceil(n * 10000 - 1e-9) / 10000;
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

/** CSS-px rect {x,y,width,height} -> normalised [x,y,w,h], padded by `pad` px and clipped to the viewport. */
function normaliseBox(rect, vp, pad = 0) {
  const x0 = clamp(rect.x - pad, 0, vp.width);
  const y0 = clamp(rect.y - pad, 0, vp.height);
  const x1 = clamp(rect.x + rect.width + pad, 0, vp.width);
  const y1 = clamp(rect.y + rect.height + pad, 0, vp.height);
  const nx0 = round4(x0 / vp.width);
  const ny0 = round4(y0 / vp.height);
  return [nx0, ny0, round4(x1 / vp.width - nx0), round4(y1 / vp.height - ny0)];
}

/** Normalised [x,y] of a point given in CSS px. */
function normalisePoint(x, y, vp) {
  return [round4(x / vp.width), round4(y / vp.height)];
}

/**
 * Suggested camera region for a normalised box: a 2:1 region (equal normalised w and h), at most 2.4x zoom,
 * centred on the box and kept inside the image. Returns null when the box is too big for zooming to help.
 */
function suggestZoom(box, margin = DEFAULTS.zoomMargin) {
  if (!box) return null;
  const [x, y, w, h] = box;
  const size = Math.max(MIN_ZOOM_SIZE, Math.max(w, h) + 2 * margin);
  if (size >= 0.85) return null;
  const s = Math.min(1, ceil4(size));
  const zx = round4(clamp(x + w / 2 - s / 2, 0, 1 - s));
  const zy = round4(clamp(y + h / 2 - s / 2, 0, 1 - s));
  return [Math.min(zx, round4(1 - s)), Math.min(zy, round4(1 - s)), s, s];
}

/** Intersection of a CSS-px rect with the viewport, or null when nothing of it is on screen. */
function visiblePart(rect, vp) {
  const x0 = Math.max(0, rect.x);
  const y0 = Math.max(0, rect.y);
  const x1 = Math.min(vp.width, rect.x + rect.width);
  const y1 = Math.min(vp.height, rect.y + rect.height);
  if (x1 <= x0 || y1 <= y0) return null;
  return { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
}

/* ------------------------------------------------------------------------------------------------------------
 * Locators
 * ---------------------------------------------------------------------------------------------------------- */

const isLocator = (v) => v && typeof v === 'object' && typeof v.boundingBox === 'function' && typeof v.first === 'function';
const isRect = (v) => v && typeof v === 'object' && ['x', 'y', 'width', 'height'].every((k) => typeof v[k] === 'number');

/**
 * A target can be:
 *   'css or playwright selector'                   e.g. '#create', 'text=Log out', 'role=button[name="Create"]'
 *   page.getByRole('button', { name: 'Create' })   any Playwright Locator
 *   (page) => Locator                              a function returning a Locator
 *   { x, y, width, height }                        a literal rect in CSS px (for canvas/map areas)
 *   { locator: <any of the above>, nth, pad, anchor: [fx, fy], label, shape, click }   a spec with options
 */
function toSpec(value) {
  if (value && typeof value === 'object' && !isLocator(value) && !isRect(value) && 'locator' in value) {
    return { ...value, target: value.locator };
  }
  return { target: value };
}

function describeTarget(target) {
  if (typeof target === 'string') return JSON.stringify(target);
  if (isRect(target)) return `rect ${JSON.stringify(target)}`;
  if (isLocator(target)) return String(target).replace(/^Locator@/, '');
  if (typeof target === 'function') return 'function target';
  return String(target);
}

/** -> { rect } (CSS px, element's own box) or { error } */
async function locate(page, spec, timeout) {
  let target = spec.target;
  if (target == null) return { error: 'no locator given' };
  if (isRect(target)) return { rect: { ...target } };
  if (typeof target === 'function') target = await target(page);
  let loc;
  if (typeof target === 'string') loc = page.locator(target);
  else if (isLocator(target)) loc = target;
  else return { error: `unsupported target type (${typeof target})` };

  let count;
  try {
    count = await loc.count();
    if (count === 0) {
      await loc.first().waitFor({ state: 'attached', timeout }).catch(() => {});
      count = await loc.count();
    }
  } catch (e) {
    return { error: `invalid locator: ${firstLine(e.message)}` };
  }
  if (count === 0) {
    const hint = typeof spec.target === 'string' && /role=[^\]]*\[name="/.test(spec.target) ? ' (role names match exactly; try name=/part of it/)' : '';
    return { error: `no element matches ${describeTarget(spec.target)}${hint}` };
  }

  const note = [];
  let el;
  if (Number.isInteger(spec.nth)) {
    if (spec.nth >= count) return { error: `nth=${spec.nth} but only ${count} element(s) match ${describeTarget(spec.target)}` };
    el = loc.nth(spec.nth);
  } else {
    el = loc.first();
    if (count > 1) note.push(`${count} elements match ${describeTarget(spec.target)}; used the first (set nth or narrow the selector)`);
  }

  let rect = null;
  try {
    await el.waitFor({ state: 'visible', timeout });
    rect = await el.boundingBox({ timeout });
  } catch (e) {
    /* hidden */
  }
  if (!rect || rect.width <= 0 || rect.height <= 0) return { error: `element is hidden or has no size (${describeTarget(spec.target)})`, note };
  return { rect, note };
}

/* ------------------------------------------------------------------------------------------------------------
 * shot()
 * ---------------------------------------------------------------------------------------------------------- */

function sanitizeName(name) {
  const base = String(name || '')
    .trim()
    .replace(/\.(webp|png|json)$/i, '');
  if (!base || !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(base)) {
    throw new Error(`invalid screenshot name ${JSON.stringify(name)}: use letters, digits, dot, dash, underscore (e.g. 08-create-workshop)`);
  }
  return base;
}

/** Wait for fonts, on-screen images and running finite CSS/Web animations (capped), then two frames. */
async function settlePage(page, ms, cap = 3000) {
  if (ms > 0) await page.waitForTimeout(ms);
  await page
    .evaluate(async (maxMs) => {
      const t0 = performance.now();
      const left = () => Math.max(0, maxMs - (performance.now() - t0));
      const timeout = (t) => new Promise((r) => setTimeout(r, t));
      try {
        if (document.fonts && document.fonts.ready) await Promise.race([document.fonts.ready, timeout(left())]);
      } catch (e) {}
      const pending = Array.from(document.images).filter((img) => {
        if (img.complete) return false;
        const r = img.getBoundingClientRect();
        return r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth;
      });
      if (pending.length) {
        await Promise.race([
          Promise.all(pending.map((img) => new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); }))),
          timeout(left()),
        ]);
      }
      const running = () =>
        (document.getAnimations ? document.getAnimations() : []).filter((a) => {
          if (a.playState !== 'running' || !a.effect) return false;
          const t = a.effect.getComputedTiming();
          return Number.isFinite(t.endTime);
        });
      let list = running();
      while (list.length && left() > 0) {
        await Promise.race([Promise.all(list.map((a) => a.finished.catch(() => {}))), timeout(Math.min(150, left()))]);
        list = running();
      }
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    }, cap)
    .catch(() => {});
}

/** Temporary CSS (no text caret, optionally no scrollbars) and hidden elements. Returns an async undo(). */
async function applyTemporaryStyles(page, o, warn) {
  const undo = [];
  let css = '*,*::before,*::after{caret-color:transparent!important}';
  if (o.hideScrollbars) css += '*{scrollbar-width:none!important}*::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}';
  try {
    const handle = await page.addStyleTag({ content: css });
    undo.push(() => handle.evaluate((n) => n.remove()).catch(() => {}));
  } catch (e) {
    warn(`could not add the temporary stylesheet (${firstLine(e.message)}); scrollbars/caret may show`);
  }
  for (const target of [].concat(o.hide || [])) {
    try {
      const t = typeof target === 'function' ? await target(page) : target;
      const loc = typeof t === 'string' ? page.locator(t) : t;
      const n = await loc.evaluateAll((els) => {
        for (const el of els) {
          el.setAttribute('data-capture-prev-visibility', el.style.getPropertyValue('visibility') + '|' + el.style.getPropertyPriority('visibility'));
          el.style.setProperty('visibility', 'hidden', 'important');
        }
        return els.length;
      });
      undo.push(() =>
        loc
          .evaluateAll((els) => {
            for (const el of els) {
              const [v, p] = (el.getAttribute('data-capture-prev-visibility') || '|').split('|');
              if (v) el.style.setProperty('visibility', v, p);
              else el.style.removeProperty('visibility');
              el.removeAttribute('data-capture-prev-visibility');
            }
          })
          .catch(() => {})
      );
      if (n === 0) warn(`hide: nothing matches ${describeTarget(target)}`);
    } catch (e) {
      warn(`hide: ${describeTarget(target)} failed (${firstLine(e.message)})`);
    }
  }
  return async () => {
    for (const fn of undo.reverse()) await fn();
  };
}

/** Cover elements with flat boxes of `color` (in the page, so it works the same over CDP). Returns undo(). */
async function applyMasks(page, masks, color, warn) {
  const rects = [];
  for (const target of [].concat(masks || [])) {
    try {
      const t = typeof target === 'function' ? await target(page) : target;
      const loc = typeof t === 'string' ? page.locator(t) : t;
      const n = await loc.count();
      if (!n) warn(`mask: nothing matches ${describeTarget(target)}`);
      for (let i = 0; i < n; i++) {
        const b = await loc.nth(i).boundingBox({ timeout: 1000 }).catch(() => null);
        if (b) rects.push(b);
      }
    } catch (e) {
      warn(`mask: ${describeTarget(target)} failed (${firstLine(e.message)})`);
    }
  }
  if (!rects.length) return async () => {};
  await page.evaluate(
    ({ rects, color }) => {
      const host = document.createElement('div');
      host.setAttribute('data-capture-mask', '');
      host.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:2147483647';
      for (const r of rects) {
        const d = document.createElement('div');
        d.style.cssText = `position:absolute;left:${r.x}px;top:${r.y}px;width:${r.width}px;height:${r.height}px;background:${color};border-radius:4px`;
        host.appendChild(d);
      }
      document.documentElement.appendChild(host);
    },
    { rects, color }
  );
  return () => page.evaluate(() => document.querySelectorAll('[data-capture-mask]').forEach((n) => n.remove())).catch(() => {});
}

/**
 * PNG of exactly the viewport at device resolution. Pages opened over CDP are captured through the session that
 * holds their 2x emulation (Playwright's own screenshot would come out at 1x there).
 */
async function captureViewportPng(page) {
  const session = cdpSessions.get(page);
  if (session) {
    const { data } = await session.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
    return Buffer.from(data, 'base64');
  }
  return page.screenshot({ type: 'png', scale: 'device', caret: 'hide', animations: 'disabled', timeout: 30000 });
}

function pngSize(buf) {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) throw new Error('screenshot is not a PNG');
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const PY_RESIZE = `
import io, sys
from PIL import Image
out, w, h, q = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])
im = Image.open(io.BytesIO(sys.stdin.buffer.read())).convert('RGB')
lanczos = getattr(getattr(Image, 'Resampling', Image), 'LANCZOS')
im.resize((w, h), lanczos).save(out, 'WEBP', quality=q, method=6)
`;

/** PNG buffer -> 2400x1200 WebP at `file`. Tries sharp, then Python Pillow, then the browser's own encoder. */
async function encodeWebp(png, file, { quality = DEFAULTS.quality, resizer = 'auto', page } = {}) {
  const order = resizer === 'auto' ? ['sharp', 'pillow', 'browser'] : [resizer];
  const tmp = `${file}.tmp-${process.pid}`;
  const errors = [];
  for (const engine of order) {
    try {
      if (engine === 'sharp') {
        const sharp = loadSharp();
        if (!sharp) throw new Error('sharp is not installed');
        await sharp(png).resize(OUTPUT.width, OUTPUT.height, { fit: 'fill', kernel: 'lanczos3' }).webp({ quality, effort: 6 }).toFile(tmp);
      } else if (engine === 'pillow') {
        runPython(PY_RESIZE, [tmp, OUTPUT.width, OUTPUT.height, quality], png);
      } else if (engine === 'browser') {
        if (!page) throw new Error('no page to encode with');
        const b64 = await page.evaluate(
          async ({ data, w, h, q }) => {
            const bin = atob(data);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            const bmp = await createImageBitmap(new Blob([bytes], { type: 'image/png' }), { resizeWidth: w, resizeHeight: h, resizeQuality: 'high' });
            const canvas = new OffscreenCanvas(w, h);
            canvas.getContext('2d').drawImage(bmp, 0, 0);
            const blob = await canvas.convertToBlob({ type: 'image/webp', quality: q / 100 });
            if (blob.type !== 'image/webp') throw new Error('this browser cannot encode WebP');
            const out = new Uint8Array(await blob.arrayBuffer());
            let s = '';
            for (let i = 0; i < out.length; i += 0x8000) s += String.fromCharCode.apply(null, out.subarray(i, i + 0x8000));
            return btoa(s);
          },
          { data: png.toString('base64'), w: OUTPUT.width, h: OUTPUT.height, q: quality }
        );
        fs.writeFileSync(tmp, Buffer.from(b64, 'base64'));
      } else {
        throw new Error(`unknown resizer "${engine}"`);
      }
      fs.renameSync(tmp, file);
      return engine;
    } catch (e) {
      fs.rmSync(tmp, { force: true });
      errors.push(`${engine}: ${firstLine(e.message)}`);
    }
  }
  throw new Error('could not write the WebP:\n  ' + errors.join('\n  '));
}

function urlPill(href) {
  try {
    const u = new URL(href);
    if (u.protocol === 'file:') return path.basename(decodeURIComponent(u.pathname));
    return (u.host + u.pathname).replace(/\/$/, '');
  } catch (e) {
    return '';
  }
}

/**
 * shot(page, name, options) -> Promise<{ name, image, json, debugImage, data, snippet, warnings, resizer }>
 *
 * options (all optional; see DEFAULTS):
 *   highlights: { key: target }   boxes to spotlight -> data.highlights[key] = { box, center, zoom, css } | null
 *   points:     { key: target }   cursor targets     -> data.points[key] = [x, y] | null  (element centre, or `anchor`)
 *   out, debug, pad, settle, locatorTimeout, quality, zoomMargin, hide, mask, maskColor, hideScrollbars, resizer, quiet
 * A target spec may carry per-key options: { locator, nth, pad, anchor: [fx, fy], label, shape, click }.
 */
async function shot(page, name, options = {}) {
  const o = { ...DEFAULTS, ...options };
  const base = sanitizeName(name);
  const warnings = [];
  const warn = (msg) => {
    warnings.push(msg);
    if (!o.quiet) console.warn(`[capture] ${base}: ${msg}`);
  };
  const outDir = path.resolve(o.out || DEFAULT_OUT_DIR);
  fs.mkdirSync(outDir, { recursive: true });

  const restore = await applyTemporaryStyles(page, o, warn);
  let png;
  let info;
  const measured = { highlights: [], points: [] };
  try {
    await settlePage(page, o.settle);
    info = await page.evaluate(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
      dpr: window.devicePixelRatio,
      href: location.href,
      title: document.title,
    }));
    if (info.width !== VIEWPORT.width || info.height !== VIEWPORT.height) {
      warn(`viewport is ${info.width}x${info.height}, expected ${VIEWPORT.width}x${VIEWPORT.height}; use connect() or emulateViewport(page)`);
    }
    if (info.dpr !== DEVICE_SCALE_FACTOR) warn(`devicePixelRatio is ${info.dpr}, expected ${DEVICE_SCALE_FACTOR}; the image will be softer`);
    const vp = { width: info.width, height: info.height };

    const measureAll = (kind, map) =>
      Promise.all(
        Object.entries(map || {}).map(async ([key, value]) => {
          const spec = toSpec(value);
          const found = await locate(page, spec, o.locatorTimeout);
          for (const n of found.note || []) warn(`${kind} "${key}": ${n}`);
          if (found.error) {
            warn(`${kind} "${key}": ${found.error}`);
            return [key, null, spec];
          }
          const vis = visiblePart(found.rect, vp);
          if (!vis) {
            warn(`${kind} "${key}": element is outside the viewport (scroll it into view first)`);
            return [key, null, spec];
          }
          if (vis.width < found.rect.width - 0.5 || vis.height < found.rect.height - 0.5) {
            warn(`${kind} "${key}": element is partly outside the viewport; the box was clipped`);
          }
          return [key, { rect: found.rect, vis }, spec];
        })
      );
    measured.highlights = await measureAll('highlight', o.highlights);
    measured.points = await measureAll('point', o.points);

    const unmask = await applyMasks(page, o.mask, o.maskColor, warn);
    try {
      png = await captureViewportPng(page);
    } finally {
      await unmask();
    }
  } finally {
    await restore();
  }

  const size = pngSize(png);
  if (Math.abs(size.width / size.height - OUTPUT.width / OUTPUT.height) > 0.002) {
    throw new Error(`screenshot is ${size.width}x${size.height}, not 2:1; the viewport must be ${VIEWPORT.width}x${VIEWPORT.height}`);
  }
  if (size.width < VIEWPORT.width * DEVICE_SCALE_FACTOR) {
    warn(`screenshot is only ${size.width}x${size.height} px; it is upscaled to ${OUTPUT.width}x${OUTPUT.height} and will look soft`);
  }
  // Boxes are measured in CSS px of the layout viewport, which is exactly what the screenshot shows.
  const vp = { width: info.width, height: info.height };

  const highlights = {};
  for (const [key, m, spec] of measured.highlights) {
    if (!m) {
      highlights[key] = null;
      continue;
    }
    const pad = spec.pad != null ? spec.pad : o.pad;
    const box = normaliseBox(m.vis, vp, pad);
    const center = normalisePoint(m.vis.x + m.vis.width / 2, m.vis.y + m.vis.height / 2, vp);
    const entry = { box, center, zoom: suggestZoom(box, o.zoomMargin) };
    if (spec.shape) entry.shape = spec.shape;
    if (spec.label) entry.label = spec.label;
    entry.css = [m.rect.x, m.rect.y, m.rect.width, m.rect.height].map((n) => Math.round(n * 2) / 2);
    highlights[key] = entry;
  }
  const points = {};
  const clicks = {};
  for (const [key, m, spec] of measured.points) {
    if (!m) {
      points[key] = null;
      continue;
    }
    const [fx, fy] = Array.isArray(spec.anchor) ? spec.anchor : [0.5, 0.5];
    const r = Array.isArray(spec.anchor) ? m.rect : m.vis; // explicit anchors are relative to the whole element
    const px = r.x + r.width * fx;
    const py = r.y + r.height * fy;
    if (px < 0 || py < 0 || px > vp.width || py > vp.height) {
      warn(`point "${key}": the anchor lands outside the viewport`);
      points[key] = null;
      continue;
    }
    points[key] = normalisePoint(px, py, vp);
    if (spec.click === false) clicks[key] = false;
  }

  const beats = {};
  for (const key of new Set([...Object.keys(highlights), ...Object.keys(points)])) {
    const h = highlights[key];
    const p = points[key];
    if (!h && !p) continue;
    const beat = {};
    if (h) {
      beat.highlight = { box: h.box };
      if (h.shape) beat.highlight.shape = h.shape;
      if (h.label) beat.highlight.label = h.label;
    }
    if (p) beat.cursor = { at: p, click: clicks[key] !== false };
    if (h && h.zoom) beat.zoom = h.zoom;
    beats[key] = beat;
  }

  const image = path.join(outDir, `${base}.webp`);
  const resizer = await encodeWebp(png, image, { quality: o.quality, resizer: o.resizer, page });

  const data = {
    name: base,
    image: `img/${base}.webp`,
    url: urlPill(info.href),
    pageTitle: info.title,
    capturedAt: new Date().toISOString(),
    viewport: { width: vp.width, height: vp.height, deviceScaleFactor: info.dpr },
    screenshot: [size.width, size.height],
    size: [OUTPUT.width, OUTPUT.height],
    pad: o.pad,
    highlights,
    points,
    beats,
    warnings,
  };
  const json = path.join(outDir, `${base}.json`);
  fs.writeFileSync(json, toPrettyJson(data) + '\n');

  let debugImage = null;
  if (o.debug) {
    const debugDir = path.resolve(o.debug === true ? outDir : o.debug);
    fs.mkdirSync(debugDir, { recursive: true });
    debugImage = path.join(debugDir, `${base}.debug.png`);
    try {
      await drawDebug(image, data, debugImage);
    } catch (e) {
      warn(`debug overlay failed (${firstLine(e.message)})`);
      debugImage = null;
    }
  }

  return { name: base, image, json, debugImage, data, snippet: toSnippet(data), warnings, resizer };
}

/* ------------------------------------------------------------------------------------------------------------
 * Output helpers
 * ---------------------------------------------------------------------------------------------------------- */

/** JSON.stringify with flat number arrays kept on one line: "box": [0.1, 0.2, 0.3, 0.4] */
function toPrettyJson(value) {
  return JSON.stringify(value, null, 2).replace(/\[\s*(-?[\d.e+-]+(?:,\s*-?[\d.e+-]+)*)\s*\]/g, (_, inner) => `[${inner.split(/,\s*/).join(', ')}]`);
}

function jsLiteral(value) {
  if (Array.isArray(value)) return `[${value.map(jsLiteral).join(', ')}]`;
  if (value && typeof value === 'object') {
    const parts = Object.entries(value).map(([k, v]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${jsLiteral(v)}`);
    return `{ ${parts.join(', ')} }`;
  }
  return JSON.stringify(value);
}

/** steps.js-ready text: the image line plus one beat per key. */
function toSnippet(data) {
  const lines = [`// ${data.name}: paste into tutorial/steps.js (write the html text for each beat)`, `image: ${JSON.stringify(data.image)},`];
  if (data.url) lines.push(`url: ${JSON.stringify(data.url)},`);
  lines.push('beats: [');
  for (const [key, beat] of Object.entries(data.beats)) lines.push(`  ${jsLiteral({ html: `TODO (${key})`, ...beat })},`);
  lines.push(']');
  const missing = [...Object.entries(data.highlights), ...Object.entries(data.points)].filter(([, v]) => v === null).map(([k]) => k);
  if (missing.length) lines.push(`// not measured (null): ${[...new Set(missing)].join(', ')}`);
  return lines.join('\n');
}

const PY_DEBUG = `
import json, sys
from PIL import Image, ImageDraw, ImageFont
img_path, json_path, out_path = sys.argv[1:4]
d = json.load(open(json_path))
im = Image.open(img_path).convert('RGBA')
W, H = im.size
ov = Image.new('RGBA', im.size, (0, 0, 0, 0))
dr = ImageDraw.Draw(ov)
try:
    font = ImageFont.load_default(size=22)
except TypeError:
    font = ImageFont.load_default()
placed = []
def px(b):
    return (b[0] * W, b[1] * H, (b[0] + b[2]) * W, (b[1] + b[3]) * H)
def tag(x, y, text, bg):
    # greedy placement: move down until the tag does not cover an earlier tag
    l, t, r, b = dr.textbbox((0, 0), text, font=font)
    w, h = r - l + 16, b - t + 10
    x = max(0, min(W - w, x))
    y = max(0, min(H - h, y))
    for _ in range(12):
        if not any(x < px1 and x + w > px0 and y < py1 and y + h > py0 for px0, py0, px1, py1 in placed):
            break
        y = min(H - h, y + h + 2)
    placed.append((x, y, x + w, y + h))
    dr.rectangle((x, y, x + w, y + h), fill=bg)
    dr.text((x + 8 - l, y + 5 - t), text, fill=(255, 255, 255, 255), font=font)
AMBER = (201, 138, 30, 255); BLUE = (45, 108, 255, 150); PINK = (225, 0, 120, 255)
hl = d.get('highlights') or {}
pts = d.get('points') or {}
for k, h in hl.items():
    if h and h.get('zoom'):
        dr.rectangle(px(h['zoom']), outline=BLUE, width=2)
for k, h in hl.items():
    if not h:
        continue
    box = px(h['box'])
    if h.get('shape') == 'circle':
        dr.ellipse(box, fill=(201, 138, 30, 50), outline=AMBER, width=3)
    else:
        dr.rectangle(box, fill=(201, 138, 30, 50), outline=AMBER, width=3)
    cx, cy = h['center'][0] * W, h['center'][1] * H
    dr.ellipse((cx - 5, cy - 5, cx + 5, cy + 5), fill=AMBER)
for k, p in pts.items():
    if not p:
        continue
    x, y = p[0] * W, p[1] * H
    dr.line((x - 22, y, x + 22, y), fill=PINK, width=3)
    dr.line((x, y - 22, x, y + 22), fill=PINK, width=3)
    dr.ellipse((x - 11, y - 11, x + 11, y + 11), outline=PINK, width=3)
# labels last, so they stay readable
for k, h in hl.items():
    if h:
        box = px(h['box'])
        tag(box[0], box[1] - 34, 'box ' + k, (138, 75, 0, 235))
for k, p in pts.items():
    if p:
        tag(p[0] * W + 16, p[1] * H + 14, 'point ' + k, (225, 0, 120, 225))
for k, h in hl.items():
    if h and h.get('zoom'):
        z = px(h['zoom'])
        tag(z[0] + 4, z[3] - 36, 'zoom ' + k, (45, 108, 255, 200))
missing = sorted(set([k for k, v in hl.items() if v is None] + [k for k, v in pts.items() if v is None]))
if missing:
    tag(16, H - 48, 'null (not measured): ' + ', '.join(missing), (20, 23, 28, 230))
Image.alpha_composite(im, ov).convert('RGB').save(out_path)
`;

function escapeXml(s) {
  return String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);
}

/** Draw boxes (amber), points (pink) and zoom regions (blue) on the final image: Pillow, else sharp. */
async function drawDebug(image, data, out) {
  if (findPillowPython()) {
    const tmpJson = path.join(os.tmpdir(), `capture-debug-${process.pid}-${Date.now()}.json`);
    fs.writeFileSync(tmpJson, JSON.stringify(data));
    try {
      runPython(PY_DEBUG, [image, tmpJson, out]);
    } finally {
      fs.rmSync(tmpJson, { force: true });
    }
    return;
  }
  const sharp = loadSharp();
  if (!sharp) throw new Error('needs Python Pillow or sharp');
  const W = OUTPUT.width;
  const H = OUTPUT.height;
  const r = (b) => `x="${b[0] * W}" y="${b[1] * H}" width="${b[2] * W}" height="${b[3] * H}"`;
  const svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="sans-serif" font-size="24">`];
  for (const [k, h] of Object.entries(data.highlights)) {
    if (!h) continue;
    if (h.zoom) svg.push(`<rect ${r(h.zoom)} fill="none" stroke="#2D6CFF" stroke-opacity=".6" stroke-width="2"/><text x="${h.zoom[0] * W + 8}" y="${(h.zoom[1] + h.zoom[3]) * H - 10}" fill="#2D6CFF">zoom ${escapeXml(k)}</text>`);
    const right = h.box[0] > 0.75;
    const tx = (right ? h.box[0] + h.box[2] : h.box[0]) * W;
    const shape = h.shape === 'circle'
      ? `<ellipse cx="${(h.box[0] + h.box[2] / 2) * W}" cy="${(h.box[1] + h.box[3] / 2) * H}" rx="${(h.box[2] / 2) * W}" ry="${(h.box[3] / 2) * H}"`
      : `<rect ${r(h.box)}`;
    svg.push(`${shape} fill="rgba(201,138,30,.2)" stroke="#C98A1E" stroke-width="3"/><text x="${tx}" y="${h.box[1] * H > 30 ? h.box[1] * H - 8 : (h.box[1] + h.box[3]) * H + 26}" text-anchor="${right ? 'end' : 'start'}" fill="#8A4B00">box ${escapeXml(k)}</text>`);
  }
  for (const [k, p] of Object.entries(data.points)) {
    if (!p) continue;
    const x = p[0] * W;
    const y = p[1] * H;
    const right = p[0] > 0.8;
    svg.push(`<g stroke="#E10078" stroke-width="3" fill="none"><path d="M${x - 22} ${y}H${x + 22}M${x} ${y - 22}V${y + 22}"/><circle cx="${x}" cy="${y}" r="11"/></g><text x="${right ? x - 14 : x + 14}" y="${y + 36}" text-anchor="${right ? 'end' : 'start'}" fill="#E10078">point ${escapeXml(k)}</text>`);
  }
  svg.push('</svg>');
  await sharp(image).composite([{ input: Buffer.from(svg.join('')), top: 0, left: 0 }]).png().toFile(out);
}

function firstLine(s) {
  return String(s || '').split('\n')[0];
}

/* ------------------------------------------------------------------------------------------------------------
 * CLI
 * ---------------------------------------------------------------------------------------------------------- */

const HELP = `capture.js: screenshots + exact highlight coordinates for the CoPlanAI platform guide

Commands
  shot <name> --url <url> CONNECT [ACTIONS] [MEASURE] [OUTPUT]
      Open <url> in a new tab, run ACTIONS in order, then write <out>/<name>.webp (2400x1200) and <name>.json.
  run <script.js> CONNECT [OUTPUT]
      Run a script: module.exports = async ({ page, shot, context, capture }) => { ... }.
      Inside it, shot(name, options) is capture.shot(page, name, options) with --out/--debug applied.
  login --state <file> [--url <url>] [--headless]
      Launch a visible browser, sign in by hand, press Enter: the session (cookies, localStorage, IndexedDB)
      is saved to <file> for --state. The file holds live credentials; keep it out of git (tools/.auth/ is ignored).
  --demo [--out <dir>] [--demo-page <file>] [--headed]
      End-to-end self-test on a local file:// page (written to --demo-page, default <out>/demo-page.html).
      Default --out for the demo is ${path.join(os.tmpdir(), 'coplan-capture-demo')}; it never writes to tutorial/img.

CONNECT (one of)
  --cdp <endpoint>        attach to a running Chromium (e.g. http://127.0.0.1:9222); opens a new tab and closes only that
  --state <file>          launch Chromium with a saved session from \`login\`
  --user-data-dir <dir>   launch Chromium with a persistent profile
  --headed                show the launched browser window

ACTIONS (run in the order given, after the page loads)
  --click <sel>   --hover <sel>   --press <key>   --wait <ms>   --scroll <sel | y-px>

MEASURE (repeatable; key = a short name you choose, sel = CSS or Playwright selector)
  --highlight key=<sel>   box to spotlight (+ centre, + suggested zoom)
  --point key=<sel>       cursor target (element centre)
  --hide <sel>            hide matching elements during the shot (toasts, banners)
  --mask <sel>            paint over matching elements in the image (personal data)

OUTPUT
  --out <dir>        default tutorial/img
  --debug <dir>      also write <name>.debug.png with the boxes drawn into <dir> (keep it out of tutorial/img)
  --pad <px>         padding around highlight boxes (default ${DEFAULTS.pad})
  --settle <ms>      wait before measuring (default ${DEFAULTS.settle})
  --quality <n>      WebP quality (default ${DEFAULTS.quality})
  --resizer <name>   auto | sharp | pillow | browser (default auto)
  --keep-open        do not close the tab/browser at the end (CDP: leaves the new tab open)
  --strict           exit with code 2 when there are warnings

Selectors: '#create', '.menu >> text=Log out', 'text=Show archived', 'role=switch[name="Show archived"]'
(role names match exactly; use a regex for part of a name: 'role=button[name=/Create/]'), 'role=menuitem >> nth=1'.
Examples (the selectors are illustrative: check the real ones with the browser's inspector or a --debug image):
  node tools/capture.js shot 08-create --cdp http://127.0.0.1:9222 --url https://coplanai.ikonai.app/ \\
       --highlight create='role=button[name=/Create/]' --point create='role=button[name=/Create/]' --debug /tmp/cap
  node tools/capture.js shot 09-profile-menu --state tools/.auth/coplan.json --url https://coplanai.ikonai.app/ \\
       --click 'role=button[name="Account"]' --wait 300 --highlight menu='role=menu' --point logout='text=Log out'
`;

function parseArgs(argv) {
  const args = { _: [], actions: [], highlights: {}, points: {}, hide: [], mask: [] };
  const list = [];
  for (const a of argv) {
    const m = /^(--[a-z-]+)=(.*)$/s.exec(a);
    if (m) list.push(m[1], m[2]);
    else list.push(a);
  }
  const keyValue = (flag, v) => {
    const i = v.indexOf('=');
    if (i < 1) throw new Error(`${flag} expects key=<selector>, got ${JSON.stringify(v)}`);
    return [v.slice(0, i).trim(), v.slice(i + 1)];
  };
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    const value = () => {
      if (i + 1 >= list.length) throw new Error(`${a} needs a value`);
      return list[++i];
    };
    const number = () => {
      const v = value();
      const n = Number(v);
      if (!Number.isFinite(n)) throw new Error(`${a} expects a number, got ${JSON.stringify(v)}`);
      return n;
    };
    switch (a) {
      case '--cdp': args.cdp = value(); break;
      case '--state': args.state = value(); break;
      case '--user-data-dir': args.userDataDir = value(); break;
      case '--headed': args.headed = true; break;
      case '--headless': args.headless = true; break;
      case '--url': args.url = value(); break;
      case '--click': args.actions.push({ type: 'click', target: value() }); break;
      case '--hover': args.actions.push({ type: 'hover', target: value() }); break;
      case '--press': args.actions.push({ type: 'press', key: value() }); break;
      case '--wait': args.actions.push({ type: 'wait', ms: number() }); break;
      case '--scroll': args.actions.push({ type: 'scroll', target: value() }); break;
      case '--highlight': { const [k, v] = keyValue(a, value()); args.highlights[k] = v; break; }
      case '--point': { const [k, v] = keyValue(a, value()); args.points[k] = v; break; }
      case '--hide': args.hide.push(value()); break;
      case '--mask': args.mask.push(value()); break;
      case '--out': args.out = value(); break;
      case '--debug': args.debug = value(); break;
      case '--pad': args.pad = number(); break;
      case '--settle': args.settle = number(); break;
      case '--quality': args.quality = number(); break;
      case '--timeout': args.locatorTimeout = number(); break;
      case '--resizer': args.resizer = value(); break;
      case '--keep-open': args.keepOpen = true; break;
      case '--strict': args.strict = true; break;
      case '--demo': args.demo = true; break;
      case '--demo-page': args.demoPage = value(); break;
      case '--help': case '-h': args.help = true; break;
      default:
        if (a.startsWith('--')) throw new Error(`unknown option ${a} (see: node tools/capture.js help)`);
        args._.push(a);
    }
  }
  return args;
}

function connectOptionsFromArgs(args) {
  if (args.cdp) return { cdp: args.cdp };
  if (args.state) return { launch: true, storageState: args.state, headless: !args.headed };
  if (args.userDataDir) return { launch: true, userDataDir: args.userDataDir, headless: !args.headed };
  throw new Error('say how to reach a logged-in browser: --cdp <endpoint>, --state <file> or --user-data-dir <dir>');
}

function shotOptionsFromArgs(args) {
  const o = { quiet: true }; // report() prints the warnings once, after the snippet
  for (const k of ['out', 'debug', 'pad', 'settle', 'quality', 'locatorTimeout', 'resizer']) if (args[k] !== undefined) o[k] = args[k];
  if (args.hide.length) o.hide = args.hide;
  if (args.mask.length) o.mask = args.mask;
  return o;
}

async function runActions(page, actions) {
  for (const act of actions) {
    if (act.type === 'wait') await page.waitForTimeout(act.ms);
    else if (act.type === 'press') await page.keyboard.press(act.key);
    else if (act.type === 'click') await page.locator(act.target).first().click();
    else if (act.type === 'hover') await page.locator(act.target).first().hover();
    else if (act.type === 'scroll') {
      if (/^-?\d+(\.\d+)?$/.test(act.target)) await page.evaluate((y) => window.scrollTo(0, y), Number(act.target));
      else await page.locator(act.target).first().scrollIntoViewIfNeeded();
    }
  }
}

function report(res) {
  console.log(`image: ${res.image}  (2400x1200, via ${res.resizer})`);
  console.log(`json:  ${res.json}`);
  if (res.debugImage) console.log(`debug: ${res.debugImage}`);
  console.log('');
  console.log(res.snippet);
  if (res.warnings.length) console.log(`\n${res.warnings.length} warning(s):\n  - ${res.warnings.join('\n  - ')}`);
}

function waitForEnter(prompt) {
  return new Promise((resolve) => {
    process.stdout.write(prompt);
    const onData = () => {
      process.stdin.off('data', onData);
      process.stdin.pause();
      resolve();
    };
    process.stdin.resume();
    process.stdin.on('data', onData);
    process.stdin.on('end', onData);
  });
}

async function cliLogin(args) {
  if (!args.state) throw new Error('login needs --state <file>, e.g. --state tools/.auth/coplan.json');
  const url = args.url || 'https://coplanai.ikonai.app/';
  const state = path.resolve(args.state);
  const conn = await connect({
    launch: true,
    headless: !!args.headless,
    storageState: fs.existsSync(state) ? state : undefined,
    userDataDir: args.userDataDir,
  });
  try {
    await conn.page.goto(url);
    await waitForEnter(`Sign in to ${url} in the browser window, then press Enter here to save the session... `);
    fs.mkdirSync(path.dirname(state), { recursive: true });
    let saved;
    try {
      saved = await conn.context.storageState({ indexedDB: true });
    } catch (e) {
      saved = await conn.context.storageState();
    }
    fs.writeFileSync(state, JSON.stringify(saved, null, 2), { mode: 0o600 });
    console.log(`\nsaved ${saved.cookies.length} cookie(s) and ${saved.origins.length} origin(s) to ${state}`);
    console.log('keep this file private: it signs you in. It is ignored by git inside tools/.auth/.');
  } finally {
    await conn.close();
  }
}

async function cliShot(args) {
  const name = args._[1];
  if (!name) throw new Error('shot needs a name, e.g. shot 08-create-workshop');
  if (!args.url) throw new Error('shot needs --url <url>');
  const conn = await connect(connectOptionsFromArgs(args));
  try {
    await conn.page.goto(args.url, { waitUntil: 'load' });
    await runActions(conn.page, args.actions);
    const res = await shot(conn.page, name, { ...shotOptionsFromArgs(args), highlights: args.highlights, points: args.points });
    report(res);
    return res.warnings.length;
  } finally {
    if (!args.keepOpen) await conn.close();
  }
}

async function cliRun(args) {
  const script = args._[1];
  if (!script) throw new Error('run needs a script path');
  let fn = require(path.resolve(script));
  if (fn && typeof fn.default === 'function') fn = fn.default;
  if (typeof fn !== 'function') throw new Error(`${script} must export an async function ({ page, shot }) => {}`);
  const conn = await connect(connectOptionsFromArgs(args));
  let warnings = 0;
  try {
    const defaults = shotOptionsFromArgs(args);
    await fn({
      ...conn,
      capture: module.exports,
      args,
      shot: async (name, options = {}) => {
        const res = await shot(conn.page, name, { ...defaults, ...options });
        report(res);
        console.log('');
        warnings += res.warnings.length;
        return res;
      },
    });
  } finally {
    if (!args.keepOpen) await conn.close();
  }
  return warnings;
}

/* ------------------------------------------------------------------------------------------------------------
 * --demo: an end-to-end self-test against a local page that looks a little like the CoPlanAI dashboard
 * ---------------------------------------------------------------------------------------------------------- */

async function runDemo(args) {
  const out = path.resolve(args.out || path.join(os.tmpdir(), 'coplan-capture-demo'));
  if (path.resolve(out) === path.resolve(DEFAULT_OUT_DIR)) throw new Error('the demo must not write into tutorial/img; pass --out <scratch dir>');
  fs.mkdirSync(out, { recursive: true });
  const pagePath = path.resolve(args.demoPage || path.join(out, 'demo-page.html'));
  fs.mkdirSync(path.dirname(pagePath), { recursive: true });
  fs.writeFileSync(pagePath, DEMO_HTML);
  const common = { out, debug: args.debug || out, locatorTimeout: 800, resizer: args.resizer || 'auto' };

  const conn = await connect({ launch: true, headless: !args.headed });
  const { page } = conn;
  const failures = [];
  const expect = (cond, msg) => {
    if (!cond) failures.push(msg);
    console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${msg}`);
  };
  // Independent check: re-measure the element with getBoundingClientRect and compare with the JSON numbers.
  const expectBox = async (res, key, selector) => {
    const h = res.data.highlights[key];
    const r = await page.locator(selector).first().evaluate((el) => {
      const b = el.getBoundingClientRect();
      return { x: b.x, y: b.y, w: b.width, h: b.height };
    });
    const pad = res.data.pad;
    const want = normaliseBox({ x: r.x, y: r.y, width: r.w, height: r.h }, VIEWPORT, pad);
    const ok = h && h.box.every((v, i) => Math.abs(v - want[i]) <= 0.0002);
    expect(ok, `highlight "${key}" box ${h && JSON.stringify(h.box)} matches getBoundingClientRect ${JSON.stringify(want)}`);
  };
  const expectPoint = async (res, key, selector) => {
    const p = res.data.points[key];
    const c = await page.locator(selector).first().evaluate((el) => {
      const b = el.getBoundingClientRect();
      return [(b.x + b.width / 2) / innerWidth, (b.y + b.height / 2) / innerHeight];
    });
    const ok = p && Math.abs(p[0] - c[0]) <= 0.0001 && Math.abs(p[1] - c[1]) <= 0.0001;
    expect(ok, `point "${key}" ${JSON.stringify(p)} is the element centre ${JSON.stringify(c.map(round4))}`);
  };

  try {
    await page.goto(pathToFileURL(pagePath).href);
    console.log(`demo page: ${pagePath}\noutput:    ${out}\n`);

    // 1. Dashboard: selectors of every kind, plus a missing and a hidden target (null + warning, no crash).
    const r1 = await shot(page, 'demo-01-dashboard', {
      ...common,
      quiet: true,
      hide: ['.toast'],
      highlights: {
        create: page.getByRole('button', { name: 'Create' }),
        tabs: '[role=tablist]',
        archived: { locator: 'role=switch[name="Show archived"]', label: 'Show archived' },
        card: { locator: '.card', nth: 1, label: 'Workshop card' },
        missing: '#does-not-exist',
        hidden: '#hidden-banner',
      },
      points: {
        create: 'role=button[name=/Create/]',
        archived: (p) => p.getByRole('switch', { name: 'Show archived' }),
        cardMenu: { locator: '.card .more', nth: 1 },
        missing: '.nope',
      },
    });
    report(r1);
    console.log('\nchecks:');
    expect(fs.existsSync(r1.image), 'webp written');
    const dims = spawnSync(findPillowPython() || 'python3', ['-c', 'import sys;from PIL import Image;print(*Image.open(sys.argv[1]).size)', r1.image], { encoding: 'utf8' }).stdout.trim();
    expect(dims === '2400 1200', `image is 2400x1200 (got ${dims || 'unknown'})`);
    expect(r1.data.screenshot.join('x') === '3800x1900', `raw screenshot 3800x1900 (got ${r1.data.screenshot.join('x')})`);
    await expectBox(r1, 'create', '#create');
    await expectBox(r1, 'tabs', '[role=tablist]');
    await expectBox(r1, 'archived', '#archived');
    await expectPoint(r1, 'create', '#create');
    await expectPoint(r1, 'cardMenu', '.card:nth-child(2) .more');
    expect(r1.data.highlights.missing === null && r1.data.points.missing === null, 'missing locators -> null');
    expect(r1.data.highlights.hidden === null, 'hidden locator -> null');
    expect(r1.warnings.length >= 3, `warnings reported (${r1.warnings.length})`);
    expect(r1.data.beats.create && r1.data.beats.create.cursor && r1.data.beats.create.zoom, 'beat "create" has highlight + cursor + zoom');
    const z = r1.data.highlights.create.zoom;
    const b = r1.data.highlights.create.box;
    expect(z && z[2] === z[3] && z[2] >= MIN_ZOOM_SIZE && z[0] <= b[0] && z[1] <= b[1] && z[0] + z[2] >= b[0] + b[2] - 1e-4 && z[1] + z[3] >= b[1] + b[3] - 1e-4 && z[0] + z[2] <= 1 && z[1] + z[3] <= 1,
      `zoom ${JSON.stringify(z)} is 2:1, <= 2.4x, contains the box and stays inside the image`);
    const toastHidden = await page.locator('.toast').evaluate((el) => getComputedStyle(el).visibility);
    expect(toastHidden === 'visible', 'hidden elements are restored after the shot');

    // 2. Open the profile menu (animated) and capture it; an off-screen element is reported, not measured.
    await page.click('#avatar');
    const r2 = await shot(page, 'demo-02-profile-menu', {
      ...common,
      quiet: true,
      hide: ['.toast'],
      highlights: {
        menu: { locator: '[role=menu]', label: 'Account menu' },
        language: 'text=Language',
        logout: page.getByRole('menuitem', { name: 'Log out' }),
        avatar: { locator: '#avatar', shape: 'circle' },
        belowFold: '#footer-note',
      },
      points: { logout: 'role=menuitem[name="Log out"]', avatar: '#avatar', settings: { locator: '#settings', anchor: [0.5, 0.5], click: false } },
      mask: ['.who small'],
    });
    console.log('');
    report(r2);
    console.log('\nchecks:');
    await expectBox(r2, 'menu', '[role=menu]');
    await expectBox(r2, 'logout', 'role=menuitem[name="Log out"]');
    await expectPoint(r2, 'logout', 'role=menuitem[name="Log out"]');
    expect(r2.data.highlights.belowFold === null, 'off-screen element -> null');
    expect(r2.data.beats.avatar.highlight.shape === 'circle', 'shape passes through to the beat');
    expect(r2.data.beats.settings.cursor.click === false, 'click:false passes through to the beat');
    expect(r2.data.highlights.menu.zoom !== undefined, 'menu has a zoom suggestion');
    const email = await page.locator('.who small').boundingBox();
    const py = findPillowPython();
    if (py && email) {
      const px = [Math.round(((email.x + email.width / 2) / VIEWPORT.width) * OUTPUT.width), Math.round(((email.y + email.height / 2) / VIEWPORT.height) * OUTPUT.height)];
      const rgb = spawnSync(py, ['-c', 'import sys;from PIL import Image;print(*Image.open(sys.argv[1]).convert("RGB").getpixel((int(sys.argv[2]),int(sys.argv[3]))))', r2.image, px[0], px[1]], { encoding: 'utf8' }).stdout.trim();
      const [r, g, bl] = rgb.split(' ').map(Number);
      expect(Math.abs(r - 0xf3) <= 3 && Math.abs(g - 0xf4) <= 3 && Math.abs(bl - 0xf6) <= 3, `masked e-mail is painted over with maskColor (pixel ${rgb})`);
    }
    const masksLeft = await page.locator('[data-capture-mask]').count();
    expect(masksLeft === 0, 'mask overlays removed after the shot');

    // 3. Library-style use after scrolling: a literal CSS-px rect and a clipped (partly visible) element.
    await page.keyboard.press('Escape');
    await page.evaluate(() => window.scrollTo(0, 420));
    const r3 = await shot(page, 'demo-03-scrolled', {
      ...common,
      quiet: true,
      highlights: { area: { x: 40, y: 40, width: 300, height: 120 }, panel: '.panel', footer: '#footer-note' },
      points: { footer: '#footer-note' },
    });
    console.log('');
    report(r3);
    console.log('\nchecks:');
    expect(JSON.stringify(r3.data.highlights.area.box) === JSON.stringify(normaliseBox({ x: 40, y: 40, width: 300, height: 120 }, VIEWPORT, DEFAULTS.pad)), 'literal rect normalised');
    expect(r3.warnings.some((w) => /clipped/.test(w)), 'partly visible element is clipped with a warning');
    await expectBox(r3, 'footer', '#footer-note');
  } finally {
    await conn.close();
  }
  console.log(failures.length ? `\nDEMO FAILED: ${failures.length} check(s) failed` : `\nDEMO OK: open ${path.join(out, '*.debug.png')} to see the boxes`);
  return failures.length ? 1 : 0;
}

async function main(argv) {
  let args;
  try {
    args = parseArgs(argv);
  } catch (e) {
    console.error(`capture.js: ${e.message}`);
    return 64;
  }
  const cmd = args._[0];
  if (args.help || cmd === 'help' || (!cmd && !args.demo)) {
    console.log(HELP);
    return args.help || cmd === 'help' ? 0 : 64;
  }
  try {
    if (args.demo) return await runDemo(args);
    if (cmd === 'shot') {
      const n = await cliShot(args);
      return args.strict && n ? 2 : 0;
    }
    if (cmd === 'run') {
      const n = await cliRun(args);
      return args.strict && n ? 2 : 0;
    }
    if (cmd === 'login') {
      await cliLogin(args);
      return 0;
    }
    console.error(`capture.js: unknown command "${cmd}" (see: node tools/capture.js help)`);
    return 64;
  } catch (e) {
    let msg = String(e && e.message ? e.message : e).replace(/\x1b\[[0-9;]*m/g, '');
    if (/ECONNREFUSED/.test(msg) && args.cdp) msg += `\nIs a Chromium running with --remote-debugging-port at ${args.cdp}?`;
    console.error(`capture.js: ${msg}`);
    return 1;
  }
}

/* The demo page: a tiny, dependency-free imitation of the CoPlanAI dashboard (buttons, tabs, a switch, cards
 * with "more" buttons, an animated account menu, a toast, a hidden banner and content below the fold). */
const DEMO_HTML = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>capture.js demo: Your Workshops</title>
<style>
  :root{--green:#2F5D3A;--ink:#14171C;--muted:#5E646C;--rule:rgba(20,23,28,.12)}
  *{box-sizing:border-box} html{color-scheme:light}
  body{margin:0;font:15px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ink);
    background:#F4F2EE radial-gradient(rgba(20,23,28,.13) 1px,transparent 1.2px) 0 0/22px 22px;min-height:1700px}
  header{display:flex;align-items:center;justify-content:space-between;padding:14px 22px}
  .logo{width:30px;height:30px;border-radius:8px;background:var(--ink);color:#fff;display:grid;place-items:center;font-weight:700}
  .icons{display:flex;gap:14px;align-items:center}
  .icon{width:34px;height:34px;border:0;background:none;border-radius:8px;cursor:pointer;color:var(--ink);font-size:18px}
  #avatar{width:42px;height:42px;border-radius:50%;background:var(--green);color:#fff;border:0;cursor:pointer;font-weight:600}
  .hero{max-width:1540px;margin:70px auto 60px;padding:0 20px}
  h1{font:600 64px/1.05 Georgia,serif;margin:0;letter-spacing:-.02em} h1 em{color:var(--green);font-style:normal}
  .hero p{color:var(--muted);margin:8px 0 0;font-size:19px}
  .panel{max-width:1540px;margin:0 auto;background:#fff;border-radius:22px;padding:34px 40px;box-shadow:0 1px 2px rgba(0,0,0,.04)}
  .row{display:flex;align-items:center;justify-content:space-between;gap:16px}
  h2{font:600 30px/1.2 Georgia,serif;margin:0}
  .btn{background:var(--green);color:#fff;border:0;border-radius:8px;padding:11px 20px;font:600 15px system-ui;cursor:pointer}
  [role=tablist]{display:inline-flex;gap:4px;background:#F1F1EF;border-radius:8px;padding:4px;margin:30px 0}
  [role=tab]{border:0;background:none;padding:8px 16px;border-radius:6px;font:15px system-ui;color:#3A4048;cursor:pointer}
  [role=tab][aria-selected=true]{background:var(--green);color:#fff}
  .filters{display:flex;gap:10px;align-items:center}
  select{font:15px system-ui;padding:8px 12px;border:1px solid var(--rule);border-radius:8px;background:#fff}
  #archived{width:44px;height:26px;border-radius:13px;border:0;background:#D9DBDF;position:relative;cursor:pointer}
  #archived::after{content:"";position:absolute;left:3px;top:3px;width:20px;height:20px;border-radius:50%;background:#fff}
  .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
  .card{border:1px solid var(--rule);border-radius:14px;padding:10px;position:relative}
  .thumb{height:200px;border-radius:10px;background:linear-gradient(135deg,#5E9B62,#A7C98F)}
  .card:nth-child(2) .thumb{background:linear-gradient(135deg,#6C8F7A,#C9D8B6)}
  .card:nth-child(3) .thumb{background:linear-gradient(135deg,#7F8E70,#D9D1B8)}
  .tags{display:flex;gap:6px;margin:12px 4px 6px}.tag{background:#EEF4E6;color:var(--green);border-radius:6px;padding:2px 8px;font-size:12px;font-weight:600}
  .card h3{margin:4px;font-size:17px}.card p{margin:4px;color:var(--muted);font-size:14px}
  .more{position:absolute;right:16px;bottom:44px;border:0;background:none;font-size:22px;letter-spacing:1px;cursor:pointer;padding:2px 8px;border-radius:6px}
  [role=menu]{position:absolute;top:64px;right:18px;width:300px;background:#fff;border:1px solid var(--rule);border-radius:12px;
    box-shadow:0 12px 30px rgba(20,23,28,.14);padding:8px 0;display:none;transform-origin:top right;animation:pop .22s ease-out}
  [role=menu].open{display:block}
  @keyframes pop{from{opacity:0;transform:scale(.94) translateY(-6px)}to{opacity:1;transform:none}}
  .who{padding:8px 16px 12px;border-bottom:1px solid var(--rule)}.who b{display:block}.who small{color:var(--muted)}
  [role=menuitem]{display:flex;align-items:center;justify-content:space-between;width:100%;border:0;background:none;padding:11px 16px;font:15px system-ui;text-align:left;cursor:pointer}
  [role=menuitem]:hover{background:#F3F4F6}
  .toast{position:fixed;left:24px;bottom:24px;background:var(--ink);color:#fff;padding:12px 18px;border-radius:10px}
  #hidden-banner{display:none}
  #footer-note{max-width:1540px;margin:420px auto 0;padding:20px 40px;background:#fff;border-radius:14px}
</style></head>
<body>
<header>
  <div class="logo" aria-label="CoPlanAI">C</div>
  <div class="icons">
    <button class="icon" aria-label="Library">&#9635;</button>
    <button class="icon" id="settings" aria-label="Settings">&#9881;</button>
    <button id="avatar" aria-haspopup="menu" aria-label="Account">DC</button>
  </div>
</header>
<div role="menu" aria-label="Account menu" id="account-menu">
  <div class="who"><b>Demo Organiser</b><small>organiser@example.org</small></div>
  <button role="menuitem">Profile</button>
  <button role="menuitem">Language <select tabindex="-1"><option>English</option></select></button>
  <button role="menuitem">Theme <select tabindex="-1"><option>Light</option></select></button>
  <button role="menuitem">Log out</button>
</div>
<div id="hidden-banner">You never see this</div>
<section class="hero"><h1>Choose your <em>experience</em></h1><p>Select a creative flow to get started.</p></section>
<main class="panel">
  <div class="row"><h2>Your Workshops</h2><button class="btn" id="create">+ Create</button></div>
  <div class="row">
    <div role="tablist" aria-label="Status">
      <button role="tab" aria-selected="true">All</button><button role="tab">Live</button><button role="tab">Upcoming</button>
      <button role="tab">Ended</button><button role="tab">Paused</button><button role="tab">Draft</button><button role="tab">Published</button>
    </div>
    <div class="filters"><select><option>Newest</option></select><select><option>Created by all</option></select>
      <span>Show archived</span><button id="archived" role="switch" aria-checked="false" aria-label="Show archived"></button></div>
  </div>
  <div class="cards">
    <article class="card"><div class="thumb"></div><div class="tags"><span class="tag">Public</span><span class="tag">Live</span></div><h3>Riverside workshop</h3><p>Imagine the new waterfront together</p><button class="more" aria-label="More options">&middot;&middot;&middot;</button></article>
    <article class="card"><div class="thumb"></div><div class="tags"><span class="tag">Public</span><span class="tag">Ended</span></div><h3>Market square</h3><p>Ideas for a car-free square</p><button class="more" aria-label="More options">&middot;&middot;&middot;</button></article>
    <article class="card"><div class="thumb"></div><div class="tags"><span class="tag">Draft</span></div><h3>School yard</h3><p>Pupils design their playground</p><button class="more" aria-label="More options">&middot;&middot;&middot;</button></article>
  </div>
</main>
<p id="footer-note">Below the fold: only visible after scrolling.</p>
<div class="toast">Workshop saved</div>
<script>
  const menu = document.getElementById('account-menu');
  document.getElementById('avatar').addEventListener('click', () => menu.classList.toggle('open'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') menu.classList.remove('open'); });
</script>
</body></html>
`;

module.exports = {
  VIEWPORT,
  DEVICE_SCALE_FACTOR,
  OUTPUT,
  MAX_ZOOM,
  DEFAULTS,
  connect,
  emulateViewport,
  shot,
  settlePage,
  encodeWebp,
  drawDebug,
  normaliseBox,
  normalisePoint,
  suggestZoom,
  toSnippet,
  loadPlaywright,
  main,
};

if (require.main === module) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code || 0),
    (e) => {
      console.error(e);
      process.exit(1);
    }
  );
}
