# AI / ML Engineer Portfolio

A premium, dark-themed portfolio built with **React + Vite + Tailwind CSS**, featuring
glassmorphism, gradient lighting, Framer Motion animations, a subtle React Three Fiber
particle background, Lenis smooth scrolling, live GitHub data, and an EmailJS contact form.

## Quick start

```bash
npm install
cp .env.example .env   # then fill in your GitHub username + EmailJS keys
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Folder structure

```
src/
  components/
    layout/       Navbar, Footer, CursorGlow, GradientBlobs — page chrome
    ui/            Reusable primitives: Button, GlassCard, TiltCard, Badge,
                    SectionHeading, MagneticButton, RevealOnScroll, AnimatedCounter
    three/          ParticleField — the subtle R3F neural-network background
    sections/       One component per page section (Hero, About, Experience,
                    Skills, Projects, ProjectCard, GithubSection, Achievements, Contact)
  data/             *** Edit these JSON files to update your content ***
    profile.json    Name, roles, tagline, education, internships, research interests, socials
    experience.json Work / research timeline entries
    skills.json     Skill categories + items
    projects.json   Featured projects — images, video, tech stack, features, results, etc.
    achievements.json Certifications & achievements timeline
  hooks/
    useGithub.js            Fetches profile/repos/languages from the GitHub REST API
    useTypingEffect.js      Hero role-cycling typewriter effect
    usePrefersReducedMotion.js
  lib/
    lenis.js         Smooth-scroll singleton + scrollToSection helper
  App.jsx            Section order lives here
  index.css          Design tokens' CSS layer (glass, gradients, focus states)
public/
  resume.pdf          Add your resume here (linked from Hero + Contact)
  projects/           Add screenshots / demo videos / architecture diagrams here
```

## Updating your content

Everything content-related is data-driven — **you should rarely need to touch component
code**. To update the site:

1. **Personal info, socials, resume link** → `src/data/profile.json`
2. **Work experience / research timeline** → `src/data/experience.json`
3. **Skills** → `src/data/skills.json`
4. **Projects** (the richest one) → `src/data/projects.json`. Each project supports:
   `images` (carousel), `demoVideo`, `architectureDiagram`, `githubUrl`, `liveUrl`,
   `techStack`, `keyFeatures`, `results`, `challenges`, `lessonsLearned`.
5. **Certifications / achievements** → `src/data/achievements.json`
6. Drop matching screenshots/videos into `public/projects/` and your resume into
   `public/resume.pdf`.

## GitHub section

Set `VITE_GITHUB_USERNAME` in `.env`. The section fetches:
- Public profile stats (repo count, followers) via `/users/{username}`
- Repositories via `/users/{username}/repos`, ranked by stars (GitHub's real "pinned
  repos" list requires an authenticated GraphQL call, which isn't safe to make from the
  browser without exposing a token — starred-ranking is the closest equivalent that
  works with a public, unauthenticated REST call)
- A language breakdown computed client-side from repo metadata
- A contribution calendar image via a public SVG chart service (`ghchart.rshah.org`),
  since GitHub's contribution calendar is likewise GraphQL/auth-only

If you later add a backend, swap `useGithub.js` for a real GraphQL call to unlock true
pinned repos and the native contribution graph.

## Contact form (EmailJS)

Create a free account at [emailjs.com](https://www.emailjs.com), then set:
```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```
Your EmailJS template should include `user_name`, `user_email`, and `message` variables
to match the form's field names.

## Performance notes

- The Three.js/R3F bundle is lazy-loaded and code-split so it never blocks first paint.
- Particle count and connection-line recompute are capped to stay cheap on low-end devices.
- All scroll-reveal animations respect `prefers-reduced-motion`.
- Images use `loading="lazy"`.

## Accessibility

- Visible focus rings on all interactive elements (`:focus-visible`)
- Semantic headings, `aria-label`s on icon-only buttons, `aria-expanded` on toggles
- Reduced-motion media query disables non-essential animation site-wide
