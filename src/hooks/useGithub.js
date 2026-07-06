import { useEffect, useState } from 'react'

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Roshh21'
const API_BASE = 'https://api.github.com'

export function useGithub() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [languages, setLanguages] = useState({})
  const [status, setStatus] = useState('loading') 

  useEffect(() => {
    let cancelled = false

    async function fetchGithubData() {
      try {
        setStatus('loading')

        const [profileRes, reposRes] = await Promise.all([
          fetch(`${API_BASE}/users/${GITHUB_USERNAME}`),
          fetch(`${API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ])

        if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API request failed')

        const profileData = await profileRes.json()
        const reposData = await reposRes.json()

        if (cancelled) return

        const sortedRepos = [...reposData]
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)

        const langTally = {}
        reposData.forEach((r) => {
          if (r.language) langTally[r.language] = (langTally[r.language] || 0) + 1
        })

        setProfile(profileData)
        setRepos(sortedRepos)
        setLanguages(langTally)
        setStatus('success')
      } catch (err) {
        if (!cancelled) {
          console.error('useGithub error:', err)
          setStatus('error')
        }
      }
    }

    fetchGithubData()
    return () => {
      cancelled = true
    }
  }, [])

  return { profile, repos, languages, status, username: GITHUB_USERNAME }
}
