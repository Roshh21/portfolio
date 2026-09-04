import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiDownload, FiMail, FiArrowDown, FiFolder, FiBriefcase, FiCpu, FiHeadphones } from 'react-icons/fi'
import Button from '../ui/Button'
import MagneticButton from '../ui/MagneticButton'
import GlassCard from '../ui/GlassCard'
import { useTypingEffect } from '../../hooks/useTypingEffect'
import { scrollToSection } from '../../lib/lenis'
import { Avatar } from '../../avatar'
import CityScene from '../City/CityScene'
import CitySkyline from '../City/CitySkyline'
import StringLights from '../City/StringLights'
import Desk from '../hero/Desk'
import profile from '../../data/profile.json'
import projects from '../../data/projects.json'
import experience from '../../data/experience.json'
import skills from '../../data/skills.json'

const techCount = skills.reduce((sum, g) => sum + g.items.length, 0)

const STATS = [
  { icon: FiFolder, value: String(projects.length), label: 'Selected projects', title: 'Projects', section: 'projects', seed: 31 },
  { icon: FiBriefcase, value: String(experience.length), label: 'Internships & current role', title: 'Experience', section: 'experience', seed: 32 },
  { icon: FiCpu, value: `${techCount}+`, label: 'Across the stack', title: 'Tech Stack', section: 'skills', seed: 33 },
]

export default function Hero() {
  const typedRole = useTypingEffect(profile.roles, { pauseTime: 1400 })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-pad !pt-28 sm:!pt-32"
    >
      <CityScene seed={1} starCount={50} celestialClassName="top-[68px] right-[6%] lg:top-[9%] lg:right-[32%]" />

      <div className="relative container-max mx-auto w-full flex flex-col gap-14">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="hidden lg:flex absolute -top-2 right-0 items-center gap-3 glass-panel-strong rounded-full py-2 pl-2 pr-4 shadow-card"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
            <FiHeadphones className="text-sm" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight text-left">
            <span className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">Currently playing</span>
            <span className="text-xs font-medium text-ink">Lo-fi Beats</span>
          </span>
          <span className="flex items-end gap-[3px] h-3" aria-hidden="true">
            <span className="w-[3px] h-full origin-bottom rounded-full bg-accent animate-eq" />
            <span className="w-[3px] h-full origin-bottom rounded-full bg-accent animate-eq [animation-delay:0.2s]" />
            <span className="w-[3px] h-full origin-bottom rounded-full bg-accent animate-eq [animation-delay:0.4s]" />
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(250px,0.72fr)_minmax(0,1.28fr)] items-center gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="relative mx-auto w-[min(68vw,290px)] sm:w-[min(48vw,330px)] lg:w-full max-w-[360px] lg:justify-self-end"
          >
            <StringLights className="mb-1 opacity-80 w-[85%] mx-auto" />

            <div className="relative flex items-end justify-center">
              {/* Rendered at 64% of this (now smaller) column — a uniform scale-down
                  of the same crop, not a re-crop. The bust crop has no background
                  margin of its own (she fills the frame), so shrinking her relative
                  width is what actually opens up clearance for the mug/plant to sit
                  beside her instead of on top of her. */}
              <Avatar pose="bust" ariaLabel="Illustration of Roshni at her desk" className="w-[64%] mx-auto" />

              {/* soft shadow where she meets the desk, so the two read as one illustration */}
              <div
                className="pointer-events-none absolute inset-x-[20%] bottom-0 h-5 sm:h-6"
                style={{ background: 'linear-gradient(to top, rgb(var(--shadow-color) / 0.4), transparent)' }}
                aria-hidden="true"
              />

              <motion.span
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute -top-2 left-1/2 -translate-x-1/2 sm:left-auto sm:right-[10%] sm:translate-x-0 whitespace-nowrap rounded-2xl rounded-bl-sm glass-panel-strong px-4 py-2 font-display text-sm text-ink shadow-card"
              >
                Hey there! <span aria-hidden="true">👋</span>
              </motion.span>
            </div>

            {/* Desk she's sitting at — wider than her own crop so it reads as a real
                surface, glued to the bottom of the avatar frame */}
            <Desk className="relative z-10 -mt-2 w-full" />
          </motion.div>

          <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="eyebrow glass-panel px-4 py-2 rounded-full flex items-center gap-2 normal-case tracking-normal"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow-pulse" aria-hidden="true" />
              Available for opportunities
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold max-w-4xl leading-[1.05] text-ink"
            >
              Hi, I&apos;m{' '}
              <span className="font-script text-gradient text-[1.25em] leading-none align-baseline">
                {profile.name.split(' ')[0]}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-mono text-sm sm:text-lg glass-panel rounded-xl px-5 py-3 flex items-center gap-2 text-ink-muted"
            >
              <span className="text-accent">❯</span>
              <span>role --whoami</span>
              <span className="text-accent">{typedRole}</span>
              <span className="w-[2px] h-5 bg-accent animate-blink" aria-hidden="true" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="max-w-xl text-ink-muted text-base sm:text-lg leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-1"
            >
              <MagneticButton>
                <Button as="a" href={profile.resumeUrl} download icon={FiDownload}>
                  Resume
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button as="a" href={profile.socials.github} target="_blank" rel="noreferrer" variant="ghost" icon={FiGithub}>
                  GitHub
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button as="a" href={profile.socials.linkedin} target="_blank" rel="noreferrer" variant="ghost" icon={FiLinkedin}>
                  LinkedIn
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button variant="outline" icon={FiMail} onClick={() => scrollToSection('contact')}>
                  Contact
                </Button>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Quick stats — real counts, each a little skyline of its own */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid sm:grid-cols-3 gap-5 pb-4"
        >
          {STATS.map((stat) => (
            <button key={stat.title} onClick={() => scrollToSection(stat.section)} className="text-left group">
              <GlassCard className="relative overflow-hidden p-5 h-full hover:border-accent/30 hover:-translate-y-1 transition-all duration-300">
                <div className="relative z-10 flex items-start justify-between">
                  <span className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-lg">
                    <stat.icon />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">{stat.title}</span>
                </div>
                <p className="relative z-10 font-display text-3xl font-semibold text-ink mt-4">{stat.value}</p>
                <p className="relative z-10 text-xs text-ink-muted mt-1">{stat.label}</p>

                <div className="absolute inset-x-0 bottom-0 h-8 opacity-30 group-hover:opacity-50 transition-opacity">
                  <CitySkyline seed={stat.seed} count={10} depth="near" minHeight={30} maxHeight={100} animated={false} className="absolute bottom-0" />
                </div>
              </GlassCard>
            </button>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        onClick={() => scrollToSection('experience')}
        aria-label="Scroll to Experience section"
        className="absolute left-1/2 -translate-x-1/2 bottom-2 text-ink-faint hover:text-accent transition-colors"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="flex flex-col items-center gap-1">
          <FiArrowDown className="text-xl" />
        </motion.span>
      </motion.button>
    </section>
  )
}
