import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiChevronDown, FiZap } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import Badge from '../ui/Badge'
import RevealOnScroll from '../ui/RevealOnScroll'
import { Avatar } from '../../avatar'
import experience from '../../data/experience.json'

function Station({ role, index, isLast }) {
  const [expanded, setExpanded] = useState(false)
  const current = role.duration === 'Current'

  return (
    <RevealOnScroll delay={index * 0.1} className="relative pl-10 md:pl-14 pb-10 last:pb-0">
      {!isLast && (
        <div
          className="absolute left-[7px] md:left-[15px] top-3 bottom-0 w-px bg-gradient-to-b from-accent/50 to-surface-border"
          aria-hidden="true"
        />
      )}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className={`absolute left-0 md:left-2 top-1 w-4 h-4 rounded-full flex items-center justify-center ${
          current ? 'bg-accent shadow-glow' : 'bg-surface-solid border-2 border-accent/50'
        }`}
        aria-hidden="true"
      >
        {current && <FiZap className="text-[9px] text-white" />}
      </motion.span>

      <GlassCard className="p-5 md:p-6 hover:border-accent/25">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
          <div>
            <h3 className="font-display font-semibold text-lg text-ink">{role.role}</h3>
            <p className="text-sm text-accent">{role.company}</p>
          </div>
          <span
            className={`shrink-0 font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border flex items-center gap-1 ${
              current ? 'bg-accent/10 text-accent border-accent/30' : 'bg-surface-solid/40 text-ink-faint border-surface-border'
            }`}
          >
            {current && <FiCheckCircle />}
            {role.duration}
          </span>
        </div>

        <p className="text-sm text-ink-muted leading-relaxed mt-3 mb-4">{role.summary}</p>

        <ul className="space-y-1.5 mb-4">
          {(role.highlights ?? []).map((h, i) => (
            <li key={i} className="text-sm text-ink flex items-start gap-2 leading-relaxed">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-1">
          {role.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        {role.milestones?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-surface-border">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-mono text-ink-faint hover:text-accent transition-colors"
              aria-expanded={expanded}
            >
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <FiChevronDown />
              </motion.span>
              {expanded ? 'Hide details' : `Show ${role.milestones.length} milestones`}
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="mt-3 space-y-3">
                    {role.milestones.map((m) => (
                      <li key={m.id} className="text-xs text-ink-muted leading-relaxed">
                        <span className="text-ink font-medium">{m.title}</span> — {m.description}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
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
          title="The route so far."
          description="Two stops on the line so far — an earlier internship, and the current role. One glance each, not a resume dump."
        />

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <div className="w-40 sm:w-48 lg:w-full mx-auto lg:mx-0">
              <Avatar pose="half" />
            </div>

            <GlassCard className="p-5 text-center lg:text-left">
              <p className="font-display text-2xl font-semibold text-ink">{experience.length} stops</p>
              <p className="text-xs text-ink-muted mt-1">on the line so far — still riding it.</p>
            </GlassCard>
          </div>

          <div>
            {experience.map((role, i) => (
              <Station key={role.id} role={role} index={i} isLast={i === experience.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
