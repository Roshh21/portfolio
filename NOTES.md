# City rework — what changed & how to run it

## Setup

```bash
cd build
npm install     # package.json changed (three.js removed, nothing new added)
npm run dev
```

One file was intentionally **left out of this zip**: `public/projects/traffic-demo.mp4`
(85MB, completely unchanged from your upload). Copy your existing copy back into
`build/public/projects/traffic-demo.mp4` — nothing in the code changed its path.

I could not run `npm install` or boot the dev server in my own environment (no
network access there), so this hasn't been visually verified in a live browser.
Everything was checked by hand plus scripted validation (JSX/JS syntax via esbuild,
every import/export resolved, every asset path resolved, React hooks-order rules,
Tailwind class-collision audit) — but please treat the first `npm run dev` as the
real first look, and ping me if anything renders unexpectedly.

## Latest round: the wave is gone

Per feedback that the animated wave still didn't look right, the whole rigged
avatar system has been removed. `src/avatar/Avatar.jsx` is now ~20 lines: it
just displays one static image (`src/assets/avatar-static.webp`), cropped
consistently by `pose`. No layers, no joints, no click-to-wave, no idle
motion at all.

That static image is the original artwork (`avatar-source-original.png`,
both arms attached, exactly as illustrated) with its flat purple backdrop
removed programmatically — a border-seeded flood fill that follows the
background's gradient rather than a flat color-key, so it composites
cleanly onto any scene without the seam artifacts a naive cutout would
leave. `src/avatar/README.md` has the honest version of this history, plus
what *would* be needed if animated motion is wanted again later (short
answer: real animated source art — a sprite sheet or a clip — not another
attempt at rigging the flat illustration).

The Hero also picked up a row of stat cards (Projects / Experience / Tech
Stack) under the fold, styled after your reference image. All three numbers
are pulled live from your actual data files (`projects.json`,
`experience.json`, `skills.json`) — nothing invented.

## From the first round (still true)

- **Day/night city**: `src/theme/ThemeContext.jsx` + CSS variables in
  `src/index.css` drive every color site-wide. `src/components/City/` holds
  the reusable sky/skyline/plant/string-lights pieces used across every
  section.
- `src/data/experience.json` — added your earlier **Mathological
  Technologies** internship (pulled from your uploaded resume, which had it
  but your live experience.json didn't). No dates were given for it in your
  resume, so it's labelled `"duration": "Earlier"` rather than an invented
  date — fill in real dates there if you have them.
- **Removed**: the unused three.js particle field and a couple of dead
  files (`PortfolioEnvironment`, `GradientBlobs`, `GithubSection`) that
  weren't wired into the live page even before this rework.

## Hero "sitting at a desk"

Your avatar art is a standing illustration — there's no seated pose to draw
from. The Hero crops to her upper body (which is all the reference images
really show anyway) and sits a desk graphic in front of that crop, so she
reads as sitting without inventing a pose the art doesn't have. If you want
a genuinely seated illustration, that needs new art in the same style —
happy to help brief that if you want to go there.
