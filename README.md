# Bloom &amp; Crack

A one page site for a small batch coffee roaster. Plain HTML, CSS and vanilla JavaScript. No
framework, no build step, no dependencies: clone it and open `index.html`.

**Live:** https://babaweb-develpoer.github.io/bloom-and-crack/

> Bloom &amp; Crack is a fictional brand, built as a design demo. Nothing on the site is for sale,
> the form does not send anywhere, and the imagery was generated rather than photographed.

## The idea

The whole page is built on one word from coffee's own world: **bloom**, the dome a bed of fresh
grounds makes when hot water hits it and the gas from the roast pushes it up. Fresh coffee blooms.
Old coffee lies flat. So the roast date is printed on the front of every bag, and the page proves
the claim instead of asserting it.

## What is interesting in here

- **Press and hold to pour.** The interactive moment crossfades two photographs of the same cup,
  a flat bed and a risen cracked dome, so holding the button visibly raises the bloom. Let go
  early and it sinks back; finish the pour and it stays. The two shots were generated separately,
  then aligned in post by locating the dark coffee bed in each frame and cropping both to the
  same framing.
- **Labels printed onto the bags.** The three product photographs are of blank pouches. The brand,
  blend and origin are live text in the page, composited with `mix-blend-mode: multiply` on the
  light bags and `screen` on the dark one, so the type picks up the bag's own shading instead of
  sitting on top like a sticker. Changing a blend name is a text edit, not a re-shoot.
- **A hero loop that costs a phone a third of what it costs a desktop.** The nine second video
  ships in two encodes and the page picks by viewport: 563 KB at 1280px wide, 202 KB at 854px
  for screens under 720px, visually identical at phone size. Under reduced motion or Save Data
  neither is requested and the poster carries the hero.
- **10 KB of JavaScript**, doing entrances, the menu, the accordion, the form, the hold and the
  video gate. Nothing else.

## Layout

```
index.html              the whole page
assets/site.css         the visual system
assets/site.js          the behaviour
assets/*.jpg|mp4        photography, the hero loop and the share card
design-package.md       palette, type, section order and the decisions behind them
```

## Running it locally

Open `index.html` directly, or serve the folder if you prefer a real origin:

```bash
npx http-server . -p 8123 -c-1
```

## Accessibility and quality notes

Every text pair was measured on the built page; the lowest is 4.59:1. Reduced motion is honored
live in both directions, the ticker stops, scroll driven states pin to their finished values and
the hero video is never fetched. All touch targets are at least 44px. The page is complete and
readable with JavaScript switched off.

## Credits

Photography generated in Canva, then cropped, exposure matched and colour graded with ffmpeg.
Typeface: [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk).
