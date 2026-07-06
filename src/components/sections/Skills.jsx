import { motion } from 'framer-motion'
import { FiCpu, FiDatabase, FiCode, FiTerminal, FiTool } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import SectionHeading from '../ui/SectionHeading'
import TiltCard from '../ui/TiltCard'
import GlassCard from '../ui/GlassCard'
import RevealOnScroll from '../ui/RevealOnScroll'
import skills from '../../data/skills.json'

const ICON_MAP = {
  brain: FiCpu,
  sparkles: HiOutlineSparkles,
  database: FiDatabase,
  code: FiCode,
  terminal: FiTerminal,
  wrench: FiTool,
}

export default function Skills() {
  return (
    <section id="skills" className="relative section-pad">
      <div className="container-max mx-auto">
        <SectionHeading
          eyebrow="// skills"
          title="The stack behind the work."
          description="Tools I reach for daily, grouped by where they show up in the ML lifecycle."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, i) => {
            const Icon = ICON_MAP[group.icon] ?? FiCode
            return (
              <RevealOnScroll key={group.category} delay={i * 0.06}>
                <TiltCard>
                  <GlassCard className="p-7 h-full group hover:border-white/20">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 4 + i * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-12 h-12 rounded-xl bg-signal-gradient/20 flex items-center justify-center text-2xl text-signal-soft mb-5 group-hover:shadow-glow transition-shadow"
                    >
                      <Icon />
                    </motion.div>

                    <h3 className="font-display font-semibold text-lg text-ink mb-4">
                      {group.category}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-xs px-3 py-1.5 rounded-lg bg-white/[0.03] border border-void-border text-ink-muted
                            transition-all duration-200 hover:border-signal/50 hover:text-signal-soft hover:-translate-y-0.5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </TiltCard>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
