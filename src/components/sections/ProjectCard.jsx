import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight, FiPlay, FiTool } from 'react-icons/fi'
import GlassCard from '../ui/GlassCard'
import Badge from '../ui/Badge'

const DEFAULT_TABS = [
  { key: 'keyFeatures', label: 'Key Features' },
  { key: 'results', label: 'Results' },
  { key: 'challenges', label: 'Challenges' },
  { key: 'lessonsLearned', label: 'Lessons Learned' },
]

export default function ProjectCard({ project, reversed = false, featured = false }) {
  const tabs = project.tabs ?? DEFAULT_TABS
  const [slide, setSlide] = useState(0)
  const [activeTab, setActiveTab] = useState(tabs[0].key)
  const [showVideo, setShowVideo] = useState(false)

  const slides = project.images ?? []
  const inDevelopment = project.status === 'in-development'

  // Determine which link to open when image/card is clicked
  const defaultLink = project.liveUrl || project.githubUrl

  function nextSlide() {
    setSlide((s) => (s + 1) % slides.length)
  }
  function prevSlide() {
    setSlide((s) => (s - 1 + slides.length) % slides.length)
  }

  function handleImageClick(e) {
    // Don't open link if user is clicking nav arrows or other buttons
    if (e.target.closest('button')) return
    if (defaultLink) {
      window.open(defaultLink, '_blank')
    }
  }

  return (
    <GlassCard
      className={`p-4 sm:p-6 lg:p-8 hover:border-accent/25 ${
        featured ? 'border-accent/30 shadow-glow' : ''
      }`}
    >
      {featured && (
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2 h-2 rounded-full bg-accent shadow-glow animate-pulse" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Current focus
          </span>
        </div>
      )}

      <div className={`grid lg:grid-cols-2 gap-8 items-start ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div
          className={`relative aspect-video rounded-xl overflow-hidden bg-canvas-raised border border-surface-border transition-all ${
            defaultLink ? 'cursor-pointer hover:border-accent/50' : ''
          }`}
          onClick={handleImageClick}
          role={defaultLink ? 'button' : undefined}
          tabIndex={defaultLink ? 0 : undefined}
          onKeyDown={
            defaultLink
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleImageClick(e)
                  }
                }
              : undefined
          }
        >
          {showVideo && project.demoVideo ? (
            <video
              src={project.demoVideo}
              controls
              autoPlay
              className="w-full h-full object-cover"
              onEnded={() => setShowVideo(false)}
            />
          ) : slides.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.img
                  key={slide}
                  src={slides[slide]}
                  alt={`${project.title} screenshot ${slide + 1} of ${slides.length}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {slides.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    aria-label="Previous screenshot"
                    className="absolute left-2 top-1/2 -translate-y-1/2 glass-panel rounded-full p-2 text-ink hover:bg-accent/10"
                  >
                    <FiChevronLeft />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next screenshot"
                    className="absolute right-2 top-1/2 -translate-y-1/2 glass-panel rounded-full p-2 text-ink hover:bg-accent/10"
                  >
                    <FiChevronRight />
                  </button>
                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlide(i)}
                        aria-label={`Go to screenshot ${i + 1}`}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          i === slide ? 'bg-accent w-4' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {project.demoVideo && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                  aria-label="Play demo video"
                >
                  <span className="w-14 h-14 rounded-full bg-cta-gradient flex items-center justify-center text-white text-xl shadow-glow">
                    <FiPlay />
                  </span>
                </button>
              )}
            </>
          ) : project.architectureDiagram ? (
            <img
              src={project.architectureDiagram}
              alt={`${project.title} architecture diagram`}
              loading="lazy"
              className="w-full h-full object-contain bg-canvas-raised p-2"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-ink-faint text-sm gap-2">
              <FiTool className="text-xl" />
              Screenshots coming as the build progresses
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="font-mono text-xs text-accent uppercase tracking-wide">
              {project.subtitle}
            </p>
            {inDevelopment && (
              <span className="font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-warn/10 text-warn border border-warn/30">
                {project.statusLabel || 'In development'}
              </span>
            )}
          </div>
          <h3 className="font-display text-2xl font-semibold text-ink mb-4">{project.title}</h3>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.techStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
              >
                <FiGithub /> Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
              >
                <FiExternalLink /> Live demo
              </a>
            )}
            {project.architectureDiagram && slides.length > 0 && (
              <a
                href={project.architectureDiagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors"
              >
                Architecture ↗
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-1 border-b border-surface-border mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-3 py-2 text-xs font-mono uppercase tracking-wide transition-colors ${
                  activeTab === tab.key ? 'text-ink' : 'text-ink-faint hover:text-ink-muted'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.span
                    layoutId={`tab-underline-${project.id}`}
                    className="absolute left-0 right-0 -bottom-px h-px bg-accent"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 min-h-[96px]"
            >
              {(project[activeTab] ?? []).map((point, i) => (
                <li key={i} className="text-sm text-ink-muted flex items-start gap-2 leading-relaxed">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                  {point}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </GlassCard>
  )
}
