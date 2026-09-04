import { FiBookOpen, FiCalendar } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import RevealOnScroll from '../ui/RevealOnScroll'
import CityDivider from '../City/CityDivider'
import education from '../../data/education.json'

export default function Education() {
  return (
    <>
      <CityDivider seed={3} />
      <section id="education" className="relative section-pad !pt-10">
        <div className="container-max mx-auto">
          <SectionHeading
            eyebrow="// education"
            title="The foundation behind the work."
            description="A compact view of my academic background, kept separate so the experience and project sections stay focused."
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {education.map((item, i) => (
              <RevealOnScroll key={`${item.institution}-${item.duration}`} delay={i * 0.08}>
                <GlassCard className="p-6 h-full hover:border-accent/30 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <span className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl">
                      <FiBookOpen />
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-surface-solid/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
                      <FiCalendar /> {item.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink leading-snug">{item.degree}</h3>
                  <p className="mt-2 text-sm font-medium text-accent">{item.institution}</p>
                  {item.detail && <p className="mt-4 text-sm text-ink-muted leading-relaxed">{item.detail}</p>}
                </GlassCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
