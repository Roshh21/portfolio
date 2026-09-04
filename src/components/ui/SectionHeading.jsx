import RevealOnScroll from './RevealOnScroll'

export default function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <RevealOnScroll className={`flex flex-col gap-4 mb-16 max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <span className="eyebrow flex items-center gap-2">
          <span className="w-6 h-px bg-accent/60" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink leading-tight text-balance">
        {title}
      </h2>
      {description && <p className="text-ink-muted text-base md:text-lg leading-relaxed">{description}</p>}
    </RevealOnScroll>
  )
}
