# CoPlanAI platform guide

An animated, scrollable guide to the CoPlanAI platform for the people who run workshops on it: city teams,
universities and agencies. It is styled after [coplanai.com](https://coplanai.com). Each step shows a real screen of
the platform. As the reader scrolls through the numbered instructions, the screenshot zooms in, spotlights the exact
button and plays a small click animation on it.

## Open it

- **Locally:** double-click `tutorial/index.html`. It needs no server and no internet connection.
- **Online:** upload the `tutorial/` folder to any static host, for example a `/guide/` folder on coplanai.com,
  GitHub Pages or Netlify. Everything it needs is inside the folder, including fonts and images.
- **Link to one step:** every step has an anchor. For example, `index.html#setup-type` opens the guide at "Choose
  what you are asking for", which is handy when answering a client's question.

## What's inside

```
tutorial/
  index.html              the page
  steps.js                creates the (empty) chapter list
  chapters/NN-*.js        one file per chapter: the text, screenshots and highlight positions
  img/                    the screenshots (2400x1200 WebP)
  assets/                 the engine (guide.js, guide.css), fonts (OFL) and logo
tools/
  capture.js              takes new screenshots with exact highlight positions from a signed-in browser
  compose-phone.py        puts phone screenshots on a wide plate for the guide
docs/
  platform-feedback.md    bugs and UX observations noted while exploring the platform
```

## Edit the text

Open the chapter file in `tutorial/chapters/` and change the `html` of a beat, or a step's `title` or `lead`. Each
beat is one numbered instruction:

```js
{
  html: "Click <strong>Create</strong> to start a new workshop.",       // strong, em, a, kbd are allowed
  highlight: { box: [x, y, w, h], label: "Create" },                     // area to spotlight (fractions of the image)
  cursor: { at: [x, y], click: true },                                   // where the pointer lands; click = tap animation
  zoom: [x, y, w, h]                                                     // optional 2:1 area to zoom into
}
```

Coordinates are fractions (0 to 1) of the screenshot, measured from the top-left. Write a word in a title between
asterisks (`Create a *workshop*`) to set it in amber italics, like the website's headlines. A step can have a
`note` (`info`, `tip` or `warning`) and `frame: "phone"` for phone screenshots.

To add a chapter, copy a chapter file, give it a new `id`, and add a `<script>` line for it in `index.html` after
the others.

## Add or update screenshots

When the platform changes, retake a screen with `tools/capture.js`. It runs in a browser where you are signed in and
writes the image together with the exact highlight positions, ready to paste. See `tools/README.md`. For phone
screens, `python3 tools/compose-phone.py` places one to three phone screenshots on a plate.

All screenshots were taken at 1900x950 at 2x (phones at 390x844 at 3x), so new ones match the old ones.

## How it was made

The screens were captured from the live platform on 25 September 2026 by an assistant signed in as the platform
owner. To avoid touching real workshops, it created a sandbox workshop, **"Senate Square 2040 (tutorial demo)"**, in
the CoPlanAI app, and made one copy of it to show duplicating and archiving. Every other workshop, library and
setting was only viewed. `docs/platform-feedback.md` lists what the exploration left behind on the platform.
