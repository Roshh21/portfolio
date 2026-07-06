import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
export default function CursorGlow() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 120, damping: 25 })
  const springY = useSpring(y, { stiffness: 120, damping: 25 })

  useEffect(() => {
    if (prefersReducedMotion) return
    const handleMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [x, y, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] hidden md:block w-[500px] h-[500px] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background:
          'radial-gradient(circle, rgba(228,218,27,0.08) 0%, rgba(137,113,142,0.04) 45%, transparent 70%)',
      }}
    />
  )
}
