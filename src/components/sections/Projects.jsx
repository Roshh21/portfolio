import SectionHeading from '../ui/SectionHeading'
import RevealOnScroll from '../ui/RevealOnScroll'
import ProjectCard from './ProjectCard'
import projects from '../../data/projects.json'

export default function Projects() {
  return (
    <section id="projects" className="relative section-pad">
      <div className="container-max mx-auto">
        <SectionHeading
          eyebrow="// featured projects"
          title="Selected work, end to end."
          description="Each project below covers the full arc — architecture, what shipped, what broke, and what I'd do differently."
        />

        <div className="flex flex-col gap-10">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.id} delay={i * 0.05}>
              <ProjectCard project={project} reversed={i % 2 === 1} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
