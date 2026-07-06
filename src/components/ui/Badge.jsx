export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`font-mono text-xs px-3 py-1 rounded-full border border-void-border
        bg-white/[0.03] text-ink-muted whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  )
}
