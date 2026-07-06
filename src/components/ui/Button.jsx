import { motion } from 'framer-motion'

const VARIANTS = {
  primary:
    'bg-signal-gradient text-void shadow-glow hover:shadow-[0_0_50px_-8px_rgba(228,218,27,0.65)]',
  ghost: 'glass text-ink hover:bg-white/[0.08]',
  outline: 'border border-void-border text-ink hover:border-signal/60 hover:text-signal-soft',
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
        transition-colors duration-300 focus-visible:outline-signal ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="text-base" aria-hidden="true" />}
      {children}
    </Component>
  )
}
