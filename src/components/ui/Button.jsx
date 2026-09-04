import { motion } from 'framer-motion'

const VARIANTS = {
  primary: 'bg-cta-gradient text-white shadow-glow hover:shadow-glow-lg',
  ghost: 'glass-panel text-ink hover:bg-accent/[0.08]',
  outline: 'border border-surface-border text-ink hover:border-accent/60 hover:text-accent',
}

export default function Button({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  icon: Icon,
  ...props
}) {
  const Component = motion[as] ?? motion.button

  return (
    <Component
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium
        transition-colors duration-300 focus-visible:outline-accent ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="text-base" aria-hidden="true" />}
      {children}
    </Component>
  )
}
