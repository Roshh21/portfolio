import {
  TbLayoutGrid,
  TbServer2,
  TbBrain,
  TbSparkles,
  TbDeviceGamepad2,
  TbWand,
  TbBook,
  TbCompass,
} from 'react-icons/tb'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import TiltCard from '../ui/TiltCard'
import RevealOnScroll from '../ui/RevealOnScroll'
import Badge from '../ui/Badge'
import { Avatar } from '../../avatar'
import CitySky from '../City/CitySky'
import CitySkyline from '../City/CitySkyline'
import Plant from '../City/Plant'
import profile from '../../data/profile.json'

const ICONS = {
  layout: TbLayoutGrid,
  server: TbServer2,
  brain: TbBrain,
  sparkles: TbSparkles,
  gamepad: TbDeviceGamepad2,
  wand: TbWand,
}

export default function About() {
  return (
    <section id="about" className="relative section-pad overflow-hidden">
      {/* A quieter corner of the same city — her window, not the skyline. */}
      <div className="absolute inset-0 -z-10 opacity-70 dark:opacity-60">
        <CitySky seed={9} starCount={16} cloudCount={2} celestialPosition={{ top: '8%', right: '8%' }} />
        <CitySkyline seed={21} count={8} depth="far" minHeight={14} maxHeight={30} className="absolute bottom-0" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-2/3 -z-10" style={{ background: 'linear-gradient(to bottom, transparent, rgb(var(--canvas)) 75%)' }} />

      <div className="container-max mx-auto">
        <SectionHeading
          eyebrow="// about"
          title="What I actually build."
          description="Six areas I keep coming back to — grounded in coursework, sharpened in production."
        />

        <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
          {/* Guide + quick facts — her corner of the room */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <div className="relative w-40 sm:w-48 lg:w-full mx-auto lg:mx-0">
              <Plant className="absolute -right-3 -bottom-2 w-10 opacity-80 hidden lg:block" swaying />
              <Avatar pose="half" />
            </div>

            <GlassCard className="p-5 hover:border-accent/25">
              <div className="flex items-center gap-2 mb-4">
                <TbBook className="text-accent text-lg" />
                <h3 className="font-display font-semibold text-sm text-ink">Education</h3>
              </div>
              <div className="flex flex-col gap-4">
                {profile.education.map((edu, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium text-ink leading-snug">{edu.degree}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{edu.institution}</p>
                    <p className="font-mono text-[11px] text-accent mt-0.5">{edu.duration}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5 hover:border-accent/25">
              <div className="flex items-center gap-2 mb-4">
                <TbCompass className="text-accent text-lg" />
                <h3 className="font-display font-semibold text-sm text-ink">Currently exploring</h3>
              </div>
              <ul className="space-y-2.5">
                {profile.researchInterests.map((interest, i) => (
                  <li key={i} className="text-xs text-ink-muted flex items-start gap-2 leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                    {interest}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* Focus area grid — her toolkit, laid out like little building panels */}
          <div className="grid sm:grid-cols-2 gap-5">
            {profile.focusAreas.map((area, i) => {
              const Icon = ICONS[area.icon] ?? TbSparkles
              return (
                <RevealOnScroll key={area.id} delay={i * 0.06}>
                  <TiltCard maxTilt={5}>
                    <GlassCard className="window-card p-6 h-full">
                      <span className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl mb-4">
                        <Icon />
                      </span>
                      <h3 className="font-display font-semibold text-ink mb-2">{area.title}</h3>
                      <p className="text-sm text-ink-muted leading-relaxed mb-4">{area.summary}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {area.tags.map((tag) => (
                          <Badge key={tag} size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </GlassCard>
                  </TiltCard>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
