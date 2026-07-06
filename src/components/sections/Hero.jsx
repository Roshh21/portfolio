import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiDownload, FiMail, FiArrowDown } from 'react-icons/fi'
import Button from '../ui/Button'
import MagneticButton from '../ui/MagneticButton'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import { scrollToSection } from '../../lib/lenis'
import profile from '../../data/profile.json'

const ParticleField = lazy(() => import('../three/ParticleField'))

export default function Hero() {
  const typedRole = useTypingEffect(profile.roles, { pauseTime: 1400 })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-pad !pt-32"
    >
      <div className="absolute inset-0 opacity-60 mask-fade-b">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>

      <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />

      <div className="relative container-max mx-auto flex flex-col items-center text-center gap-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-signal-soft glass px-4 py-2 rounded-full"
        >
          Available for opportunities
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold max-w-4xl leading-[1.05] text-ink"
        >
          Hi, I'm {profile.name.split(' ')[0]}
          <br />

        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-mono text-base sm:text-lg glass rounded-xl px-5 py-3 flex items-center gap-2 text-ink-muted"
        >
          <span className="text-pulse">❯</span>
          <span>role --whoami</span>
          <span className="text-signal-soft">{typedRole}</span>
          <span className="w-[2px] h-5 bg-signal-soft animate-blink" aria-hidden="true" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-xl text-ink-muted text-base sm:text-lg leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <MagneticButton>
            <Button as="a" href={profile.resumeUrl} download icon={FiDownload}>
              Resume
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              as="a"
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              icon={FiGithub}
            >
              GitHub
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              as="a"
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              icon={FiLinkedin}
            >
              LinkedIn
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button variant="outline" icon={FiMail} onClick={() => scrollToSection('contact')}>
              Contact
            </Button>
          </MagneticButton>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onClick={() => scrollToSection('about')}
          aria-label="Scroll to About section"
          className="absolute -bottom-8 sm:bottom-0 text-ink-faint hover:text-signal-soft transition-colors"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="flex flex-col items-center gap-1"
          >
            <FiArrowDown className="text-xl" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  )
}
