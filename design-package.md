# Design Package: Bloom & Crack (v3, cool sheets)

Earlier versions are kept in `review/`: `index-dark-v1.html` (cinematic scroll) and
`site-warm-v2.css` (warm cream retail).

v3 restyles the warm retail build to the language of **eloqwnt.com**, which the user gave as a
reference. Studied live rather than guessed: a cool grey canvas, big white rounded sheets
floating on it, one sans in 400 and 500, headings set tight with negative tracking, pill
buttons, sentence case labels with a bullet, a big uppercase ticker, and a lot of air.

## 1. The brand premise

Unchanged, and still the spine of the page: **bloom**, the dome fresh grounds make when hot water
hits them. Fresh coffee blooms, old coffee lies flat, so the roast date is printed on the front of
every bag. The difference in v2 is where the idea sits. The page opens as a shop and proves the
idea further down, instead of opening with the proof.

## 2. The palette as CSS tokens

```css
:root{
  --page:#E5E9EB;     /* the cool grey canvas, taken from the reference */
  --page-2:#DDE2E5;
  --card:#FFFFFF;     /* the sheets that float on it */
  --ink:#0A0B0B;      /* text and primary buttons */
  --ink-2:#5A6063;    /* body, 6.4:1 on white */
  --ink-3:#61696C;    /* meta, 4.6:1 on grey and 5.6:1 on white */
  --line:#D2D8DB;
  --line-2:#C2C9CD;
  --accent:#2F6B4F;   /* the only colour left: bullets and focus */
  --ember:#8F5719;    /* roast dots only */
}
```
Every text pair measured on the built page, lowest 4.59:1.

## 3. The typeface

One family, the way the reference does it: **Hanken Grotesk**, 400 and 500 only. Headings run at
500 with tracking from -0.028em to -0.038em and line height near 1.02, which is what gives the
reference its tight, confident masthead feel. The serif and the mono are both gone.

## 4. The page, in order

1. **Announcement bar**: roast days and the free shipping threshold.
2. **Sticky nav**: brand, four links, one dark pill. Burger menu under 1000px.
3. **Hero**: centred, the reference's shape. A quiet line, then a very large tight headline, two
   pill buttons, then the brewing loop as a wide rounded sheet with a small white card on it, and
   three trust lines under that.
4. **Ticker**: one uppercase band of promises, scrolling slowly, paused on hover and stopped
   under reduced motion. It replaced the stats strip and is the most literal borrow from the
   reference.
5. **The coffee** (#buy): three product cards, each with its own bag, notes, a five dot roast
   meter, price and button. The middle card carries the green border and the flag.
6. **What the bloom tells you**: three day cards, each with a real bloom drawn at that age.
7. **Pour one yourself**: the press and hold moment, now crossfading two real photographs of the
   same cup rather than a drawing.
8. **How a bag reaches you**: four step timeline with the self drawing line, beside a sticky card
   showing the roast date as it appears on the bag.
9. **Where your $19 goes**: the cost breakdown bar.
10. **Reviews**: rating headline plus three quotes with stars.
11. **Straight answers**: six question accordion.
12. **Not sure which bag**: copy plus the form card, on a tinted section. One card, not a card
    inside a card.
13. **Footer**: four columns and the fictional brand disclosure.
14. **Sticky buy bar** under 1000px, from the shop section until the form comes into view.

## 4b. Photography and the hero loop (Canva)

Made in the user's connected Canva account, exported and served locally:

| File | Source | Where it sits |
|---|---|---|
| `assets/hero-loop.mp4` | Canva still, animated here with ffmpeg | The hero, a 12 second silent loop |
| `assets/hero-poster.jpg` | first frame of the loop | Hero still on phones and reduced motion |
| `assets/beans.jpg` | Canva | Beside the roast date card in the freshness section |
| `assets/counter.jpg` | Canva | The full bleed band between the shop and the bloom test |
| `assets/og.jpg` | Canva photo, typeset here at 1200x630 | The link preview card |
| `assets/bloom-off.jpg` | Canva | Flat bed: Day 40 card, and the resting state of the hold |
| `assets/bloom-mid.jpg` | Canva | Gentle rise: Day 14 card |
| `assets/bloom-on.jpg` | Canva | Risen cracked dome: Day 3 card, and the held state |
| `assets/bag-day.jpg` | Canva | Day Break product card |
| `assets/bag-hearth.jpg` | Canva | Hearth product card |
| `assets/bag-night.jpg` | Canva | Nightshift product card |

The two bed shots are a matched pair: both overhead, same white cup, same light. They were
generated separately, so they are aligned in post by finding the dark bed in each frame and
cropping both to the same framing around it. Holding the button crossfades one into the other,
so the bed visibly rises and cracks. Let go early and it sinks back; finish the pour and it
stays bloomed, which is exactly what the copy beside it promises.

Canva's own mp4 export of a still design has no real motion, so the loop is built with ffmpeg:
a slow ping pong zoom over twelve seconds that ends exactly where it starts, so it repeats with
no visible cut. The video is muted, has no controls, and is fetched only on pointer-fine screens
wider than 720px, with reduced motion and Save Data both honored. Everywhere else the poster
carries the hero and the mp4 is never requested.

Canva's resize to 1200x630 left a hole in the middle of the share card, so the card is composed
here in the site's own type and colour with the Canva photograph inside it.

## 5. The product imagery

Three bag photographs, one per roast level: sand, kraft, espresso. They were generated
separately, so they are matched in post. Each is cropped so the bag is the same height and sits
in the same place, and their exposures are levelled to a shared background value, which is what
makes the grid read as one shoot rather than three stock pictures.

The bags are shot blank on purpose. The label is printed onto them in the page: a small block
with the mark, the brand, the blend and the origin, sized in container query units so it tracks
the card, and composited with `mix-blend-mode: multiply` on the two light bags and `screen` on
the dark one. Blending is what sells it, because the type then picks up the bag's own shading
and shadow instead of sitting on top like a sticker.

The three bloom cards use the same matched trio as the hold moment, so Day 3, Day 14 and Day 40
are the same cup in the same framing, which is the only honest way to show a difference.

## 6. What was cut

From v1: the 700vh scroll hero, its five caption bands, the split text entrances and the scrub
engine. Then, once photography arrived, the canvas renderer itself and the CSS pouches that
preceded it. JavaScript went from 55 KB in v1 to 10 KB: entrances, the menu, the accordion, the
form, the hold and the video gate, and nothing else.

## 6b. Matching the reference

Section heads follow the reference pattern: a small sentence case label with a bullet on the
left, the statement and its note on the right. Content sits in white sheets with a 28px radius on
the grey page, rather than in bordered cards on a tinted background. All photography was regraded
cooler (a colour balance pull toward blue plus a small saturation cut) so the warm Canva imagery
sits on a cool page without clashing; the coffee itself stays brown.

## 7. The standing rules

Nothing ships with an em dash or a stock word. Every entrance is transform and opacity only.
Reduced motion is honored live in both directions. The design detector runs clean, with three
scoped exceptions recorded in `.impeccable/config.json`: the bag print contrast (the tool reads the
page colour instead of the bag; measured for real instead), the label panel counted as a nested
card, the second frame of the hold crossfade sitting at opacity 0 until you press, and the ticker,
which the user asked for by naming the reference.
