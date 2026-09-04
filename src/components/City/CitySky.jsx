import { useMemo } from 'react'
import { makeRng, range } from './cityRandom'

/**
 * The sky layer shared by every section of the city. It renders the
 * gradient (day-blue -> night-indigo, morphed by the `.dark` CSS vars),
 * a moon that fades in at night, a sun that fades in by day, twinkling
 * stars at night, and slow-drifting clouds by day.
 *
 * Purely decorative + aria-hidden. No layout size opinions — the parent
 * controls width/height via className.
 */
export default function CitySky({
  seed = 1,
  showCelestial = true,
  starCount = 40,
  cloudCount = 3,
  celestialPosition = { top: '12%', right: '14%' },
  celestialClassName = '',
  className = '',
}) {
  const stars = useMemo(() => {
    const rng = makeRng(seed * 97 + 1)
    return Array.from({ length: starCount }, () => ({
      top: `${range(rng, 2, 78)}%`,
      left: `${range(rng, 2, 98)}%`,
      size: range(rng, 1.2, 2.6),
      delay: range(rng, 0, 4),
      duration: range(rng, 2.4, 4.4),
    }))
  }, [seed, starCount])

  const clouds = useMemo(() => {
    const rng = makeRng(seed * 53 + 7)
    return Array.from({ length: cloudCount }, () => ({
      top: `${range(rng, 6, 42)}%`,
      left: `${range(rng, -10, 80)}%`,
      scale: range(rng, 0.6, 1.3),
      duration: range(rng, 50, 95),
      delay: -range(rng, 0, 40),
      opacity: range(rng, 0.5, 0.9),
    }))
  }, [seed, cloudCount])

  return (
    <div className={`absolute inset-0 overflow-hidden bg-sky-gradient transition-colors duration-700 ${className}`} aria-hidden="true">
      {showCelestial && (
        <>
          {/* Sun — visible by day */}
          <div
            className={`absolute rounded-full opacity-100 dark:opacity-0 transition-opacity duration-700 ${celestialClassName}`}
            style={{
              ...(celestialClassName ? {} : celestialPosition),
              width: 56,
              height: 56,
              background: 'radial-gradient(circle, rgb(var(--glow)) 0%, rgb(var(--glow) / 0.35) 55%, transparent 75%)',
              boxShadow: '0 0 50px 14px rgb(var(--glow) / 0.35)',
            }}
          />
          {/* Moon — visible by night */}
          <div
            className={`absolute rounded-full opacity-0 dark:opacity-100 transition-opacity duration-700 ${celestialClassName}`}
            style={{
              ...(celestialClassName ? {} : celestialPosition),
              width: 46,
              height: 46,
              background: 'radial-gradient(circle at 38% 35%, #fdf8ec 0%, #f3ecd9 45%, #d9cfb0 100%)',
              boxShadow: '0 0 42px 10px rgb(var(--accent-soft) / 0.25)',
            }}
          />
        </>
      )}

      {/* Stars — night only */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Clouds — day only */}
      <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-700">
        {clouds.map((c, i) => (
          <svg
            key={i}
            viewBox="0 0 120 40"
            className="absolute animate-drift-slow"
            style={{
              top: c.top,
              left: c.left,
              width: 140 * c.scale,
              opacity: c.opacity,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          >
            <ellipse cx="30" cy="26" rx="26" ry="12" fill="rgb(var(--cloud))" />
            <ellipse cx="55" cy="18" rx="20" ry="15" fill="rgb(var(--cloud))" />
            <ellipse cx="80" cy="24" rx="22" ry="11" fill="rgb(var(--cloud))" />
          </svg>
        ))}
      </div>
    </div>
  )
}
