import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiSun, FiMoon } from 'react-icons/fi'
import { scrollToSection } from '../../lib/lenis'
import { useTheme } from '../../theme/ThemeContext'
import profile from '../../data/profile.json'

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'minor-projects', label: 'More Projects' },
  { id: 'contact', label: 'Contact' },
]

function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to day view' : 'Switch to night view'}
      className={`relative flex items-center h-8 w-14 rounded-full border border-surface-border transition-colors duration-300 ${
        isDark ? 'bg-white/5' : 'bg-black/5'
      } ${className}`}
    >
      <motion.span
        className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full bg-cta-gradient text-white shadow-glow"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {isDark ? <FiMoon className="h-3.5 w-3.5" /> : <FiSun className="h-3.5 w-3.5" />}
      </motion.span>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  function handleNavClick(id) {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <nav
        className={`container-max mx-4 sm:mx-8 lg:mx-auto flex items-center justify-between rounded-2xl px-5 py-3 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'glass-panel shadow-card' : 'bg-canvas/30 border border-transparent'
        }`}
        aria-label="Primary"
      >
        <button onClick={() => handleNavClick('hero')} className="font-script text-2xl font-semibold tracking-tight text-ink flex items-center gap-1">
          {profile.name.split(' ')[0]}
          <span className="text-accent">.</span>
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                  activeSection === link.id ? 'text-ink' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-accent/[0.12] rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => handleNavClick('contact')}
            className="inline-flex items-center rounded-full bg-cta-gradient px-5 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
          >
            Let&apos;s talk
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="text-2xl text-ink p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden glass-panel mx-4 mt-3 rounded-2xl p-4 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-3 rounded-xl text-sm ${
                  activeSection === link.id ? 'bg-accent/[0.12] text-ink' : 'text-ink-muted'
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
