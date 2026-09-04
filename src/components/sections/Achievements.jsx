import { FiAward, FiCode, FiTrendingUp } from 'react-icons/fi'
import GlassCard from '../ui/GlassCard'
import RevealOnScroll from '../ui/RevealOnScroll'
import achievements from '../../data/achievements.json'

const TYPE_ICON = {
  certification: FiAward,
  coding: FiCode,
  achievement: FiTrendingUp,
}

/**
 * Deliberately compact — a couple of credential chips, not a full
 * section with its own nav destination. Sits between Projects and
 * Contact like a small plaque on the way to the rooftop.
 */
export default function Achievements() {
  if (!achievements?.length) return null

  return (
    <section id="achievements" className="relative section-pad !py-12">
      <div className="container-max mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {achievements.map((item, i) => {
            const Icon = TYPE_ICON[item.type] ?? FiAward
            return (
              <RevealOnScroll key={item.id} delay={i * 0.06}>
                <GlassCard className="flex items-center gap-3 px-5 py-3.5 hover:border-accent/25">
                  <span className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-base shrink-0">
                    <Icon />
                  </span>
                  <div className="text-left">
                    <p className="font-display text-sm font-semibold text-ink leading-snug">{item.title}</p>
                    <p className="text-xs text-ink-muted">{item.issuer}</p>
                  </div>
                </GlassCard>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
