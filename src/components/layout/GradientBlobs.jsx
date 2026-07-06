export default function GradientBlobs({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`} aria-hidden="true">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-signal/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-pulse/20 rounded-full blur-[120px] animate-blob [animation-delay:2s]" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber/10 rounded-full blur-[120px] animate-blob [animation-delay:4s]" />
    </div>
  )
}
