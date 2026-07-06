import { FiStar, FiGitBranch, FiExternalLink, FiAlertCircle } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import RevealOnScroll from '../ui/RevealOnScroll'
import Badge from '../ui/Badge'
import { useGithub } from '../../hooks/useGithub'

const LANGUAGE_COLORS = {
  Python: '#3572A5',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Go: '#00ADD8',
  Rust: '#DEA584',
  'C++': '#f34b7d',
}

function RepoCardSkeleton() {
  return <div className="h-40 rounded-2xl bg-white/[0.03] animate-pulse" />
}

export default function GithubSection() {
  const { profile, repos, languages, status, username } = useGithub()

  const topRepos = repos.slice(0, 6)
  const totalLangCount = Object.values(languages).reduce((a, b) => a + b, 0) || 1
  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  return (
    <section id="github" className="relative section-pad">
      <div className="container-max mx-auto">
        <SectionHeading
          eyebrow="// github"
          title="Open-source & experiments."
          description="Live from the GitHub API — top repositories ranked by stars, language mix, and daily contribution activity."
        />

        {status === 'error' && (
          <GlassCard className="p-6 flex items-center gap-3 mb-10 text-ink-muted">
            <FiAlertCircle className="text-amber shrink-0" />
            <p className="text-sm">
              Couldn't reach the GitHub API right now (likely a rate limit). Set{' '}
              <code className="font-mono text-signal-soft">VITE_GITHUB_USERNAME</code> in your{' '}
              <code className="font-mono text-signal-soft">.env</code> and try again shortly.
            </p>
          </GlassCard>
        )}

        <RevealOnScroll className="mb-10">
          <GlassCard className="p-6 overflow-x-auto">
            <h3 className="font-display font-semibold text-ink mb-4">Contribution Activity</h3>
            <img
              src={`https://ghchart.rshah.org/E4DA1B/${username}`}
              alt={`${username}'s GitHub contribution graph`}
              className="w-full min-w-[600px]"
              loading="lazy"
            />
          </GlassCard>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Top / pinned-style repos */}
          <RevealOnScroll className="lg:col-span-2">
            <GlassCard className="p-6 h-full">
              <h3 className="font-display font-semibold text-ink mb-5">Top Repositories</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {status === 'loading' &&
                  Array.from({ length: 4 }).map((_, i) => <RepoCardSkeleton key={i} />)}

                {status === 'success' &&
                  topRepos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block p-4 rounded-xl border border-void-border bg-white/[0.02] hover:border-signal/40 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm text-ink truncate">{repo.name}</span>
                        <FiExternalLink className="text-ink-faint shrink-0" />
                      </div>
                      <p className="text-xs text-ink-muted line-clamp-2 mb-3 min-h-[2rem]">
                        {repo.description || 'No description provided.'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-ink-faint">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: LANGUAGE_COLORS[repo.language] || '#c0b6a5' }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <FiStar /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiGitBranch /> {repo.forks_count}
                        </span>
                      </div>
                    </a>
                  ))}
              </div>
            </GlassCard>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <GlassCard className="p-6 h-full flex flex-col gap-6">
              <div>
                <h3 className="font-display font-semibold text-ink mb-4">Languages</h3>
                <div className="space-y-3">
                  {topLanguages.map(([lang, count]) => (
                    <div key={lang}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-ink-muted">{lang}</span>
                        <span className="text-ink-faint font-mono">
                          {Math.round((count / totalLangCount) * 100)}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-signal-gradient"
                          style={{ width: `${(count / totalLangCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  {status === 'loading' && (
                    <p className="text-xs text-ink-faint font-mono">Loading languages…</p>
                  )}
                </div>
              </div>

              {profile && (
                <div className="pt-4 border-t border-void-border grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="font-display text-2xl font-semibold text-ink">
                      {profile.public_repos}
                    </p>
                    <p className="text-xs text-ink-faint font-mono">repos</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-semibold text-ink">
                      {profile.followers}
                    </p>
                    <p className="text-xs text-ink-faint font-mono">followers</p>
                  </div>
                </div>
              )}

              <Badge className="self-start">@{username}</Badge>
            </GlassCard>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
