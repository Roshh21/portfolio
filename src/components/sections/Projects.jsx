import SectionHeading from '../ui/SectionHeading'
import RevealOnScroll from '../ui/RevealOnScroll'
import ProjectCard from './ProjectCard'
import CityDivider from '../City/CityDivider'
import { Avatar } from '../../avatar'
import projects from '../../data/projects.json'

const primary = projects.filter((p) => p.tier !== 'secondary')
const secondary = projects.filter((p) => p.tier === 'secondary')

export default function Projects() {
  return (
    <>
      <CityDivider seed={7} />
      <section id="projects" className="relative section-pad !pt-10">
        <div className="container-max mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-16">
            <div className="w-28 shrink-0 hidden sm:block">
              <Avatar pose="bust" />
            </div>
            <SectionHeading
              eyebrow="// city showcase"
              title="Selected work, end to end."
              description="These are the projects I want to put front and centre — from a real-time multiplayer system to agentic RAG, deep learning and reinforcement learning."
              className="!mb-0"
            />
          </div>

          <div className="flex flex-col gap-10">
            {primary.map((project, i) => (
              <RevealOnScroll key={project.id} delay={i * 0.05}>
                <ProjectCard
                  project={project}
                  reversed={i % 2 === 1}
                  featured={project.status === 'in-development'}
                />
              </RevealOnScroll>
            ))}
          </div>

          {secondary.length > 0 && (
            <div className="mt-16">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint mb-6">
                {'// additional featured work'}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {secondary.map((project, i) => (
                  <RevealOnScroll key={project.id} delay={i * 0.05}>
                    <ProjectCard project={project} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
