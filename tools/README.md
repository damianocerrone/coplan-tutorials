# tools/capture.js

Adds new screenshots to the platform guide (`tutorial/`) with exact coordinates for the spotlight, the
cursor and the zoom, so you never have to measure boxes by eye.

For each shot it writes:

- `tutorial/img/<name>.webp`: 2400x1200, captured from a 1900x950 CSS-px viewport at 2x, like every other plate.
- `tutorial/img/<name>.json`: normalised `[x, y, w, h]` boxes (4 decimals) and centre points for every key you
  named, a suggested 2:1 `zoom` region for each box, and ready-made `beats` for a chapter file.
- It also prints a snippet you can paste straight into a chapter file (`tutorial/chapters/NN-*.js`).

## Setup

```sh
cd tools
npm install                      # playwright (+ sharp, optional)
npx playwright install chromium  # skip if you point CAPTURE_CHROMIUM at a Chromium/Chrome you already have
```

To resize the image, the tool tries sharp first, then Python with Pillow, then the browser's own WebP encoder.
You need at least one of them. In the dev container, Playwright is found at
`/opt/node22/lib/node_modules/playwright` and Chromium at `/opt/pw-browsers/chromium` without any setup.

Check that everything works (this writes to a temp folder, never to `tutorial/img`):

```sh
node tools/capture.js --demo --out /tmp/capture-demo   # then open /tmp/capture-demo/*.debug.png
```

## 1. Get a signed-in browser

Pick one of these:

**A. Your own Chrome/Chromium over CDP.** Use this when you are already signed in.

```sh
chromium --remote-debugging-port=9222 --user-data-dir="$HOME/.coplan-capture-profile"
# sign in to https://coplanai.ikonai.app/ in that window, then:
node tools/capture.js shot ... --cdp http://127.0.0.1:9222
```

The tool opens a new tab and sets its viewport to 1900x950 at 2x, however big your window is. When it finishes,
it closes that tab and disconnects. Your other tabs are never touched.

**B. A saved session.** Use this for headless or repeat runs.

```sh
node tools/capture.js login --state tools/.auth/coplan.json   # sign in in the window, press Enter
node tools/capture.js shot ... --state tools/.auth/coplan.json
```

The session file holds your cookies, localStorage and IndexedDB. **It signs you in, so keep it private.**
`tools/.gitignore` keeps `tools/.auth/` out of git. You can also use `--user-data-dir <dir>` for a persistent profile.

## 2. Capture

One screen from the command line. Actions (`--click`, `--hover`, `--press`, `--scroll`, `--wait`) run in the order
you give them:

```sh
node tools/capture.js shot 08-create-workshop --cdp http://127.0.0.1:9222 \
  --url https://coplanai.ikonai.app/ \
  --highlight create='role=button[name=/Create/]' --point create='role=button[name=/Create/]' \
  --highlight tabs='[role=tablist]' \
  --hide '.toast' --mask 'text=@coplanai.com' \
  --debug /tmp/capture-debug
```

Multi-step flows are easiest as a small script:

```js
// my-flow.js  ->  node tools/capture.js run my-flow.js --state tools/.auth/coplan.json --debug /tmp/capture-debug
module.exports = async ({ page, shot }) => {
  await page.goto('https://coplanai.ikonai.app/');
  const create = page.getByRole('button', { name: 'Create' });
  await create.waitFor();
  await shot('08-create-workshop', { highlights: { create }, points: { create } });

  await page.getByRole('button', { name: 'Account' }).click();          // illustrative selector
  await shot('09-profile-menu', {
    highlights: { menu: { locator: '[role=menu]', label: 'Account menu' } },
    points: { logout: 'text=Log out' },
    mask: ['text=@'],                                                   // paint over e-mail addresses
  });
};
```

You can also use it as a library (CommonJS):

```js
const capture = require('./tools/capture');
const { page, close } = await capture.connect({ cdp: 'http://127.0.0.1:9222' });
// or capture.connect({ launch: true, storageState: 'tools/.auth/coplan.json', headless: true })
const res = await capture.shot(page, '08-create-workshop', { highlights: {...}, points: {...} });
console.log(res.snippet, res.warnings);
await close();
```

### What you can pass as a target

| Form | Example |
| --- | --- |
| CSS or Playwright selector | `'#create'`, `'text=Log out'`, `'role=switch[name="Show archived"]'` |
| Playwright Locator | `page.getByRole('button', { name: 'Create' })` |
| Function | `(page) => page.locator('.card').nth(2)` |
| Literal rect in CSS px | `{ x: 40, y: 40, width: 300, height: 120 }` (for canvas or map areas) |
| Spec with options | `{ locator, nth, pad, anchor: [fx, fy], label, shape: 'circle', click: false }` |

`role=...[name="X"]` matches the whole name exactly. To match part of a name, use a regex:
`role=button[name=/Create/]`. If a target is missing, hidden or outside the viewport, you get `null` and a warning.
The capture itself never fails because of a target. When several elements match, the first one is used, with a
warning. Use `--strict` to exit with code 2 when there are warnings.

### shot() options

| Option | Default | What it does |
| --- | --- | --- |
| `out` | `tutorial/img` | Where the image and JSON go. |
| `debug` | none | Folder for `<name>.debug.png`, with boxes, points and zooms drawn on the final image. Keep this folder outside `tutorial/img`. |
| `pad` | `6` | CSS px added around each highlight box. |
| `settle` | `400` | ms to wait before measuring. After that it also waits for fonts, on-screen images and running CSS animations, up to 3 s. |
| `hide` | none | Elements set to `visibility: hidden` during the shot, such as toasts. |
| `mask` | none | Elements painted over with `maskColor`, for personal data. |
| `quality` | `85` | WebP quality. |
| `resizer` | `auto` | `sharp`, `pillow` or `browser`. |
| `locatorTimeout` | `2000` | ms to wait for each target to become visible. |

## 3. Paste into a chapter file

The printed snippet (also stored under `beats` in the JSON) looks like this:

```js
image: "img/08-create-workshop.webp",
url: "coplanai.ikonai.app",
beats: [
  { html: "TODO (create)", highlight: { box: [0.8211, 0.3481, 0.0663, 0.0548] }, cursor: { at: [0.8543, 0.3755], click: true }, zoom: [0.5833, 0.1672, 0.4167, 0.4167] },
]
```

Write the `html` text, add a `label` if you want one, and keep, change or delete the `zoom`. The suggested zoom is
centred on the box, stays inside the image, never zooms in more than 2.4x (width 0.4167 or more), and is `null`
when the box is too big for zooming to help. A highlight and a point that share a key are merged into one beat.
The JSON file is only a reference and nothing loads it. You can delete it or keep it next to the image.

## Caveats

- Boxes are measured just before the screenshot. Anything that moves afterwards, like a late toast or a spinner
  that finishes, is not reflected, so check the `--debug` image.
- Only the main page's viewport is captured. Elements in iframes work, but content outside the 1900x950 viewport
  comes back as `null` (scroll first with `--scroll <selector>`).
- The tool adds temporary CSS (no scrollbars, no text caret) and removes it after the shot. Pages with a strict CSP
  may refuse it. You then get a warning, and scrollbars might show in the image.
- Never commit anything in `tools/.auth/`.
