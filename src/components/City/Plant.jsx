/**
 * Small cozy potted plant used to dress interior "rooms" of the city
 * (About, Contact). currentColor-driven leaves so it can be tinted;
 * subtle sway on the leaf cluster via the `sway` keyframe.
 */
export default function Plant({ className = '', swaying = true }) {
  return (
    <svg viewBox="0 0 80 100" className={className} aria-hidden="true">
      <g className={swaying ? 'origin-bottom animate-sway' : undefined} style={{ transformOrigin: '40px 78px' }}>
        <path d="M40 78 C30 60 22 46 26 26 C30 40 36 52 40 62 C44 52 50 40 54 26 C58 46 50 60 40 78Z" fill="rgb(var(--accent) / 0.55)" />
        <path d="M40 70 C34 54 30 44 32 30 C36 42 39 50 40 58 C41 50 44 42 48 30 C50 44 46 54 40 70Z" fill="rgb(var(--accent-soft) / 0.6)" />
      </g>
      <path d="M22 78 L58 78 L54 98 L26 98 Z" fill="rgb(var(--surface-solid))" stroke="rgb(var(--surface-border))" strokeWidth="1" />
      <rect x="20" y="72" width="40" height="8" rx="2" fill="rgb(var(--surface-solid))" stroke="rgb(var(--surface-border))" strokeWidth="1" />
    </svg>
  )
}
