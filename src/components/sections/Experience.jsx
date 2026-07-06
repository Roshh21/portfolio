import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiMapPin } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import Badge from '../ui/Badge'
import RevealOnScroll from '../ui/RevealOnScroll'
import experience from '../../data/experience.json'

function ExperienceCard({ item, index }) {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <RevealOnScroll delay={index * 0.08} className="relative pl-10 md:pl-16">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-void-border md:left-6" aria-hidden="true" />
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="absolute left-[-5px] md:left-[19px] top-2 w-3 h-3 rounded-full bg-signal shadow-glow"
        aria-hidden="true"
      />

      <GlassCard className="p-6 mb-6 hover:border-white/20">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-start justify-between gap-4 text-left"
          aria-expanded={expanded}
        >
          <div>
            <h3 className="font-display font-semibold text-lg text-ink">{item.role}</h3>
            <p className="text-sm text-signal-soft">{item.company}</p>
            <div className="flex flex-wrap items-center gap-3 mt-1 font-mono text-xs text-ink-faint">
              <span>{item.duration}</span>
              <span className="flex items-center gap-1">
                <FiMapPin /> {item.location}
              </span>
            </div>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-ink-muted mt-1 shrink-0"
          >
            <FiChevronDown />
          </motion.span>
        </button>

        <p className="text-sm text-ink-muted mt-3">{item.summary}</p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2 border-t border-void-border pt-4">
                {item.details.map((d, i) => (
                  <li key={i} className="text-sm text-ink-muted flex items-start gap-2 leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-signal shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {item.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </RevealOnScroll>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative section-pad">
      <div className="container-max mx-auto">
        <SectionHeading
          eyebrow="// experience"
          title="Where I've applied it."
          description="Roles and research spanning applied ML, infra, and full-stack product work. Tap a card to expand."
        />

        <div className="max-w-3xl">
          {experience.map((item, i) => (
            <ExperienceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
