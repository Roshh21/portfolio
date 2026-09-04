# Avatar — static image, on purpose

This used to be a layered, code-rigged wave animation (shoulder + wrist
joints, spring easing, the works). It's not anymore — per direct feedback
after seeing it live, the animated wave never read as natural no matter how
the joints/timing were tuned, so it's been replaced with a plain static
image.

## What's here now

`avatar-static.webp` is the original artwork (`avatar-source-original.png`,
both arms attached, exactly as illustrated) with its flat purple backdrop
removed programmatically (a tolerance-based flood fill from the border,
not a hard color-key), so it composites cleanly with transparency onto any
scene. `Avatar.jsx` just crops that one image consistently via `pose`
(`bust` / `half` / `full`) — no layers, no animation, no click handlers.

## If animated motion is wanted again later

Don't re-rig the existing flat artwork — that path was tried twice and
didn't hold up. The honest options, in order of effort:

1. **A short pre-rendered GIF/video clip** of a wave, made by an illustrator
   or generated as a clip (not assembled from these static layers), looped
   or played once. Drop it in as `<video>`/`<img src=".gif">` in place of
   `Avatar.jsx`'s `<img>` — no rig needed.
2. **A proper sprite sheet** — several actual illustrated frames of the
   wave (not code-interpolated between two poses), stepped through on a
   timer.
3. **New layered source art**, illustrated with the joints the animation
   actually needs (a bent elbow, a distinct hand-only layer with clean
   overlap at the seams) — this is what the previous rig was missing, and
   what made it look like a cropped image rotating rather than a limb
   moving.

Whatever the source, the same pitfall applies: if it's assembled from a
flat illustration by rotating pieces in code, it will very likely look the
same way this did. Prefer real animated source material over rigging.
