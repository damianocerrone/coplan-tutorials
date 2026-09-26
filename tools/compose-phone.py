#!/usr/bin/env python3
"""
compose-phone.py: turn 1-3 phone screenshots into one 2400x1200 guide plate.

The guide's plates are 2:1. Participant screens are captured on a phone (390x844 CSS px @3x = 1170x2532),
so this places each screenshot in a simple phone bezel on the app's warm, dotted background.
Use it with `frame: "phone"` on the step in tutorial/chapters/*.js (the plate then drops the browser bar).

Usage:
  python3 tools/compose-phone.py OUT.webp PHONE1.png [PHONE2.png [PHONE3.png]] [--json OUT.json]

It prints (and optionally writes) the placement of each phone's SCREEN on the plate, as normalised
[x, y, w, h]. To map a box measured on phone screenshot i (normalised 0..1 of that screenshot) onto the plate:
    X = sx + x * sw        Y = sy + y * sh        W = w * sw        H = h * sh
where [sx, sy, sw, sh] = screens[i]. `--map i x y w h` does that for you and prints the plate box.

Requires Pillow (pip install pillow).
"""
import json
import sys

from PIL import Image, ImageDraw, ImageFilter

W, H = 2400, 1200
BG = (241, 238, 233)          # the app's warm off-white
DOT = (214, 209, 201)
BEZEL = (20, 23, 28)          # website ink
SCREEN_H = 1040               # screen height on the plate, px
BEZEL_PX = 16
RADIUS = 58


def rounded_mask(size, radius):
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m


def compose(out, phones):
    plate = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(plate)
    for y in range(12, H, 24):              # dotted grid like the app background
        for x in range(12, W, 24):
            d.ellipse([x - 1, y - 1, x + 1, y + 1], fill=DOT)

    n = len(phones)
    shots = [Image.open(p).convert("RGB") for p in phones]
    screens = []
    gap = 150
    sizes = []
    for im in shots:
        sh = SCREEN_H
        sw = round(im.width * sh / im.height)
        sizes.append((sw, sh))
    total = sum(sw + 2 * BEZEL_PX for sw, _ in sizes) + gap * (n - 1)
    x = (W - total) // 2
    for im, (sw, sh) in zip(shots, sizes):
        bw, bh = sw + 2 * BEZEL_PX, sh + 2 * BEZEL_PX
        top = (H - bh) // 2
        # soft shadow
        shadow = Image.new("L", (bw + 120, bh + 120), 0)
        ImageDraw.Draw(shadow).rounded_rectangle([60, 70, 60 + bw, 70 + bh], radius=RADIUS + BEZEL_PX, fill=70)
        shadow = shadow.filter(ImageFilter.GaussianBlur(28))
        plate.paste((120, 110, 100), (x - 60, top - 60), shadow)
        # bezel
        bezel = Image.new("RGB", (bw, bh), BEZEL)
        plate.paste(bezel, (x, top), rounded_mask((bw, bh), RADIUS + BEZEL_PX))
        # screen
        scr = im.resize((sw, sh), Image.LANCZOS)
        plate.paste(scr, (x + BEZEL_PX, top + BEZEL_PX), rounded_mask((sw, sh), RADIUS))
        screens.append([round((x + BEZEL_PX) / W, 4), round((top + BEZEL_PX) / H, 4), round(sw / W, 4), round(sh / H, 4)])
        x += bw + gap

    plate.save(out, "WEBP", quality=86, method=6)
    return {"image": out, "size": [W, H], "screens": screens}


def main(argv):
    if "--map" in argv:
        i = argv.index("--map")
        meta = json.load(open(argv[i + 1]))
        idx, bx, by, bw, bh = int(argv[i + 2]), *map(float, argv[i + 3:i + 7])
        sx, sy, sw, sh = meta["screens"][idx]
        print(json.dumps([round(sx + bx * sw, 4), round(sy + by * sh, 4), round(bw * sw, 4), round(bh * sh, 4)]))
        return
    json_out = None
    if "--json" in argv:
        j = argv.index("--json")
        json_out = argv[j + 1]
        argv = argv[:j] + argv[j + 2:]
    if len(argv) < 3 or len(argv) > 5:
        print(__doc__)
        sys.exit(1)
    meta = compose(argv[1], argv[2:])
    if json_out:
        json.dump(meta, open(json_out, "w"), indent=1)
    print(json.dumps(meta))


if __name__ == "__main__":
    main(sys.argv)
