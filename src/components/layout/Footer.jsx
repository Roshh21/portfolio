import { FiGithub, FiLinkedin, FiCode } from 'react-icons/fi'
import profile from '../../data/profile.json'

const SOCIAL_ICONS = [
  { key: 'github', icon: FiGithub, label: 'GitHub' },
  { key: 'linkedin', icon: FiLinkedin, label: 'LinkedIn' },
  { key: 'leetcode', icon: FiCode, label: 'LeetCode' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-void-border">
      <div className="container-max mx-auto px-6 sm:px-10 lg:px-24 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="font-mono text-xs text-ink-faint">
          © {year} {profile.name}. Built with React, Tailwind & a lot of coffee.
        </p>

        <div className="flex items-center gap-4">
          {SOCIAL_ICONS.map(({ key, icon: Icon, label }) =>
            profile.socials[key] ? (
              <a
                key={key}
                href={profile.socials[key]}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="text-ink-muted hover:text-signal-soft transition-colors duration-200 text-lg"
              >
                <Icon />
              </a>
            ) : null
          )}
        </div>
      </div>
    </footer>
  )
}
