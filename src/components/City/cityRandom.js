// Small deterministic PRNG so every "random" city layout (stars, windows,
// building widths...) is stable across re-renders and identical between
// server-render and client, instead of reshuffling every paint.
// mulberry32 — tiny, fast, good-enough distribution for decorative use.
export function makeRng(seed) {
  let a = seed >>> 0 || 1
  return function rng() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function range(rng, min, max) {
  return min + rng() * (max - min)
}

export function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)]
}
