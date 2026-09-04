import CitySky from './CitySky'
import CitySkyline from './CitySkyline'

/**
 * Full backdrop for a section: sky + two parallax skyline layers + a
 * soft fade into the page canvas color at the bottom so foreground
 * content (cards, text) stays readable. Drop this in as an
 * `absolute inset-0 -z-10` backdrop, then lay real content on top.
 *
 * `seed` should differ per section so each part of the site reads as a
 * different vantage point of the same city rather than a repeated tile.
 */
export default function CityScene({
  seed = 1,
  starCount = 42,
  showCelestial = true,
  celestialPosition,
  celestialClassName,
  farCount = 9,
  nearCount = 7,
  farHeight = [18, 40],
  nearHeight = [28, 60],
  fade = true,
  className = '',
  children,
}) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      <CitySky
        seed={seed}
        showCelestial={showCelestial}
        starCount={starCount}
        {...(celestialPosition ? { celestialPosition } : {})}
        {...(celestialClassName ? { celestialClassName } : {})}
      />

      <div className="absolute inset-x-0 bottom-0 h-[70%] opacity-70 dark:opacity-60">
        <CitySkyline
          seed={seed * 3 + 1}
          count={farCount}
          depth="far"
          minHeight={farHeight[0]}
          maxHeight={farHeight[1]}
          className="absolute bottom-0"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[62%]">
        <CitySkyline
          seed={seed * 5 + 2}
          count={nearCount}
          depth="near"
          minHeight={nearHeight[0]}
          maxHeight={nearHeight[1]}
          className="absolute bottom-0"
        />
      </div>

      {fade && (
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: 'linear-gradient(to bottom, transparent, rgb(var(--canvas)) 92%)' }}
        />
      )}

      {children}
    </div>
  )
}
