const BULB_POSITIONS = [6, 16, 26, 36, 46, 56, 66, 76, 86, 94]

/**
 * A sagging string of fairy lights across the top of a "room" scene.
 * Bulbs glow softly and twinkle at night; by day they read as a plain
 * cozy string (no glow) so the scene doesn't look lit at noon.
 */
export default function StringLights({ className = '' }) {
  return (
    <svg viewBox="0 0 100 14" preserveAspectRatio="none" className={`w-full ${className}`} aria-hidden="true">
      <path d="M0 1 Q 25 13 50 3 Q 75 13 100 1" fill="none" stroke="rgb(var(--ink-faint) / 0.4)" strokeWidth="0.4" />
      {BULB_POSITIONS.map((x, i) => {
        const y = 1 + Math.sin((x / 100) * Math.PI * 2 + 0.4) * 5 + 4.2
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={1.3}
            fill="rgb(var(--glow))"
            className="opacity-40 dark:opacity-90 dark:animate-glow-pulse"
            style={{ animationDelay: `${(i % 5) * 0.6}s` }}
          />
        )
      })}
    </svg>
  )
}
