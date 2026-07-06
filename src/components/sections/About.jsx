import { FiBookOpen, FiBriefcase, FiCompass } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import RevealOnScroll from '../ui/RevealOnScroll'
import profile from '../../data/profile.json'

const CARDS = [
  {
    icon: FiBookOpen,
    title: 'Education',
    accent: 'text-signal-soft',
    render: () =>
      profile.education.map((edu, i) => (
        <div key={i} className="space-y-1">
          <p className="font-display font-semibold text-ink">{edu.degree}</p>
          <p className="text-sm text-ink-muted">{edu.institution}</p>
          <p className="font-mono text-xs text-signal-soft">{edu.duration}</p>
          <p className="text-sm text-ink-muted pt-2 leading-relaxed">{edu.detail}</p>
        </div>
      )),
  },
  {
    icon: FiBriefcase,
    title: 'Internship',
    accent: 'text-pulse-soft',
    render: () =>
      profile.internships.map((intern, i) => (
        <div key={i} className="space-y-1">
          <p className="font-display font-semibold text-ink">{intern.role}</p>
          <p className="text-sm text-ink-muted">{intern.company}</p>
          <p className="font-mono text-xs text-pulse-soft">{intern.duration}</p>
          <p className="text-sm text-ink-muted pt-2 leading-relaxed">{intern.detail}</p>
        </div>
      )),
  },
  {
    icon: FiCompass,
    title: 'Research Interests',
    accent: 'text-amber',
    render: () => (
      <ul className="space-y-2">
        {profile.researchInterests.map((interest, i) => (
          <li key={i} className="text-sm text-ink-muted flex items-start gap-2 leading-relaxed">
            <span className="mt-2 w-1 h-1 rounded-full bg-amber shrink-0" />
            {interest}
          </li>
        ))}
      </ul>
    ),
  },
]

export default function About() {
  return (
    <section id="about" className="relative section-pad">
      <div className="container-max mx-auto">
        <SectionHeading
          eyebrow="// about"
          title="Grounded in research, shipped in production."
          description="A quick look at where I've studied, worked, and what I'm currently curious about."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <RevealOnScroll key={card.title} delay={i * 0.1}>
              <GlassCard className="p-7 h-full hover:border-white/20 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-xl ${card.accent}`}>
                    <card.icon />
                  </span>
                  <h3 className="font-display font-semibold text-lg text-ink">{card.title}</h3>
                </div>
                {card.render()}
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
