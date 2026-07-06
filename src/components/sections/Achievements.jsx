import { motion } from 'framer-motion'
import { FiAward, FiCode, FiTrendingUp } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import RevealOnScroll from '../ui/RevealOnScroll'
import achievements from '../../data/achievements.json'

const TYPE_ICON = {
  certification: FiAward,
  coding: FiCode,
  achievement: FiTrendingUp,
}

const TYPE_COLOR = {
  certification: 'text-signal-soft bg-signal/10',
  coding: 'text-amber bg-amber/10',
  achievement: 'text-pulse-soft bg-pulse/10',
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative section-pad">
      <div className="container-max mx-auto">
        <SectionHeading
          eyebrow="// achievements"
          title="Milestones along the way."
          description="Certifications, competition wins, and coding-platform standing."
          align="center"
        />

        <div className="relative max-w-3xl mx-auto">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-void-border md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {achievements.map((item, i) => {
              const Icon = TYPE_ICON[item.type] ?? FiAward
              const isLeft = i % 2 === 0

              return (
                <RevealOnScroll
                  key={item.id}
                  delay={i * 0.08}
                  className={`relative pl-12 md:pl-0 md:w-1/2 ${
                    isLeft ? 'md:pr-10 md:self-start md:text-right' : 'md:pl-10 md:self-end'
                  }`}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className={`absolute left-2.5 md:left-auto ${
                      isLeft ? 'md:-right-1.5' : 'md:-left-1.5'
                    } top-1 w-3 h-3 rounded-full bg-signal shadow-glow`}
                  />

                  <GlassCard className="p-5 inline-block w-full md:w-auto md:min-w-[280px] hover:border-white/20">
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${TYPE_COLOR[item.type]}`}>
                        <Icon />
                      </span>
                      <span className="font-mono text-xs text-ink-faint">{item.date}</span>
                    </div>
                    <h3 className="font-display font-semibold text-ink">{item.title}</h3>
                    <p className="text-sm text-ink-muted mt-1">{item.issuer}</p>
                  </GlassCard>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
