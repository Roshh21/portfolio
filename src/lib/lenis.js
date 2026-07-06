import Lenis from 'lenis'

let lenisInstance = null

export function initLenis() {
  if (lenisInstance) return lenisInstance

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return null

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  })

  function raf(time) {
    lenisInstance.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}

export function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -80 })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
