const SIZES = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-3 py-1',
}

export default function Badge({ children, size = 'md', className = '' }) {
  return (
    <span
      className={`font-mono rounded-full border border-surface-border
        bg-surface-solid/40 text-ink-muted whitespace-nowrap ${SIZES[size] ?? SIZES.md} ${className}`}
    >
      {children}
    </span>
  )
}
