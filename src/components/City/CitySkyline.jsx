import { useMemo } from 'react'
import { makeRng, range, pick } from './cityRandom'

const DEPTH_COLOR = {
  far: 'rgb(var(--building-far))',
  mid: 'rgb(var(--building-mid))',
  near: 'rgb(var(--building-near))',
}

/**
 * A deterministic row of building silhouettes with lit windows. Used at
 * different `depth` values to build parallax (far/mid/near) and at
 * different heights/seeds so each section of the site reads as a
 * different vantage point of the same city, not a repeated background.
 */
export default function CitySkyline({
  seed = 1,
  count = 12,
  depth = 'mid',
  minHeight = 30,
  maxHeight = 78,
  className = '',
  animated = true,
}) {
  const buildings = useMemo(() => {
    const rng = makeRng(seed * 131 + count)
    let x = -2
    const items = []
    for (let i = 0; i < count; i++) {
      const width = range(rng, 6, 11)
      const height = range(rng, minHeight, maxHeight)
      const hasRoof = rng() > 0.7
      const roofType = pick(rng, ['antenna', 'tank', 'flat'])
      const cols = Math.max(2, Math.round(width / 2.4))
      const rowH = 3.4
      const rows = Math.max(3, Math.floor(height / rowH) - 1)
      const windows = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (rng() > 0.42) continue
          windows.push({
            x: x + 1.1 + c * ((width - 2.2) / Math.max(1, cols - 1 || 1)),
            y: 100 - height + 2.4 + r * rowH,
            lit: rng() > 0.16,
            blink: rng() > 0.82,
            delay: range(rng, 0, 6),
          })
        }
      }
      items.push({ x, width, height, hasRoof, roofType, windows, key: i })
      x += width + range(rng, 0.6, 2.4)
    }
    return { items, totalWidth: x + 2 }
  }, [seed, count, minHeight, maxHeight])

  const color = DEPTH_COLOR[depth] || DEPTH_COLOR.mid

  return (
    <svg
      viewBox={`0 0 ${buildings.totalWidth} 100`}
      preserveAspectRatio="none"
      className={`block w-full h-full ${className}`}
      aria-hidden="true"
    >
      {buildings.items.map((b) => (
        <g key={b.key}>
          <rect x={b.x} y={100 - b.height} width={b.width} height={b.height} fill={color} rx={0.4} />
          {b.hasRoof && b.roofType === 'antenna' && (
            <line
              x1={b.x + b.width / 2}
              y1={100 - b.height}
              x2={b.x + b.width / 2}
              y2={100 - b.height - 6}
              stroke={color}
              strokeWidth={0.4}
            />
          )}
          {b.hasRoof && b.roofType === 'tank' && (
            <rect x={b.x + b.width * 0.3} y={100 - b.height - 3} width={b.width * 0.4} height={3} fill={color} />
          )}
          {b.windows.map((w, wi) => (
            <rect
              key={wi}
              x={w.x}
              y={w.y}
              width={0.9}
              height={1.7}
              rx={0.15}
              fill={w.lit ? 'rgb(var(--window-lit))' : 'rgb(var(--window-dark) / 0.18)'}
              opacity={w.lit ? 0.92 : 1}
              className={animated && w.lit && w.blink ? 'animate-window-blink' : undefined}
              style={w.blink ? { animationDelay: `${w.delay}s` } : undefined}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}
