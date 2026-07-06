import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { scrollToSection } from '../../lib/lenis'
import profile from '../../data/profile.json'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav
        className={`container-max mx-4 sm:mx-8 lg:mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
          scrolled ? 'glass shadow-card' : 'bg-transparent'
        }`}
        aria-label="Primary"
      >
        <button
          onClick={() => handleNavClick('hero')}
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          {profile.name.split(' ')[0]}<span className="text-signal">.</span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                  activeSection === link.id
                    ? 'text-ink'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-white/[0.06] rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleNavClick('contact')}
          className="hidden md:inline-flex items-center rounded-full bg-signal-gradient px-5 py-2 text-sm font-medium text-void shadow-glow"
        >
          Let's talk
        </button>

        <button
          className="md:hidden text-2xl text-ink"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass mx-4 mt-3 rounded-2xl p-4 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-3 rounded-xl text-sm ${
                  activeSection === link.id ? 'bg-white/[0.06] text-ink' : 'text-ink-muted'
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
