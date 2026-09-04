import { motion } from 'framer-motion'
import { FiCpu, FiDatabase, FiCode, FiTerminal, FiTool, FiServer, FiCloud, FiLayers, FiShield } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import SectionHeading from '../ui/SectionHeading'
import TiltCard from '../ui/TiltCard'
import GlassCard from '../ui/GlassCard'
import RevealOnScroll from '../ui/RevealOnScroll'
import CityDivider from '../City/CityDivider'
import skills from '../../data/skills.json'

const ICON_MAP = {
  brain: FiCpu,
  sparkles: HiOutlineSparkles,
  database: FiDatabase,
  code: FiCode,
  terminal: FiTerminal,
  wrench: FiTool,
  server: FiServer,
  cloud: FiCloud,
  layers: FiLayers,
  shield: FiShield,
}

export default function Skills() {
  return (
    <>
      <CityDivider seed={4} />
      <section id="skills" className="relative section-pad !pt-10">
        <div className="container-max mx-auto">
          <SectionHeading
            eyebrow="// tech district"
            title="The stack behind the work."
            description="Every card below is a window in the same district — grouped the way they actually show up in my work, from languages to GenAI tooling."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((group, i) => {
              const Icon = ICON_MAP[group.icon] ?? FiCode
              return (
                <RevealOnScroll key={group.category} delay={i * 0.06}>
                  <TiltCard>
                    <GlassCard className="window-card p-7 h-full group relative overflow-hidden">
                      <span
                        className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-glow animate-glow-pulse"
                        aria-hidden="true"
                      />
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 4 + i * 0.3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-2xl text-accent mb-5 group-hover:shadow-glow transition-shadow"
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
                            className="font-mono text-xs px-3 py-1.5 rounded-lg bg-surface-solid/40 border border-surface-border text-ink-muted
                              transition-all duration-200 hover:border-accent/50 hover:text-accent hover:-translate-y-0.5"
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
    </>
  )
}
