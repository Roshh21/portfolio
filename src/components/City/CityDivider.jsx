import CitySkyline from './CitySkyline'

/**
 * A slim rooftop-silhouette strip dropped between sections so the page
 * reads as one continuous skyline being walked through, rather than a
 * stack of unrelated cards. Purely decorative.
 */
export default function CityDivider({ seed = 1, height = 'h-14 md:h-20', className = '' }) {
  return (
    <div className={`relative ${height} overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: 'rgb(var(--canvas))' }} />
      <CitySkyline seed={seed} count={16} depth="near" minHeight={40} maxHeight={100} className="absolute bottom-0 opacity-90" animated={false} />
    </div>
  )
}
