export default function GlassCard({ children, className = '', as: Component = 'div', ...props }) {
  return (
    <Component
      className={`glass rounded-2xl shadow-card transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
