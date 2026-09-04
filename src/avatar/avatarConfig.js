// Crop windows into the single static avatar image, expressed as
// percentages so the same source art frames consistently at every size.
// `zoom` = the inner image's height as a % of the outer (cropped) box;
// `x`/`y` = translate offsets (in % of the inner image's own size) used to
// pan that zoomed image within the crop window.
export const AVATAR_POSES = {
  bust: {
    aspect: 0.826,
    zoom: 230.1,
    x: -44.26,
    y: -22.93,
    label: 'upper body',
  },
  half: {
    aspect: 0.624,
    zoom: 159.7,
    x: -44.26,
    y: -32.5,
    label: 'half body',
  },
  full: {
    aspect: 0.434,
    zoom: 102.8,
    x: -44.66,
    y: -49.44,
    label: 'full body',
  },
}
