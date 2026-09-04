import { FiExternalLink, FiGithub, FiGlobe } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import Badge from '../ui/Badge'
import RevealOnScroll from '../ui/RevealOnScroll'
import CityDivider from '../City/CityDivider'
import minorProjects from '../../data/minorProjects.json'

export default function MinorProjects() {
  return (
    <>
      <CityDivider seed={12} />
      <section id="minor-projects" className="relative section-pad !pt-10">
        <div className="container-max mx-auto">
          <SectionHeading
            eyebrow="// smaller builds"
            title="More projects & experiments."
            description="Smaller builds, algorithm exercises and frontend experiments that still show how I like to learn by building."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {minorProjects.map((project, i) => (
              <RevealOnScroll key={project.id} delay={i * 0.05}>
                <GlassCard className="p-6 h-full flex flex-col hover:border-accent/30 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <span className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                      <FiGlobe />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">{project.subtitle}</span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-ink mt-5">{project.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed mt-2 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.techStack.map((tech) => <Badge key={tech} size="sm">{tech}</Badge>)}
                  </div>

                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-surface-border">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-accent transition-colors">
                      <FiGithub /> Source
                    </a>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-accent transition-colors">
                        <FiExternalLink /> Live site
                      </a>
                    )}
                  </div>
                </GlassCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
