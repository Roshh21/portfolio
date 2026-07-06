import { useEffect } from 'react'
import { initLenis } from './lib/lenis'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CursorGlow from './components/layout/CursorGlow'
import GradientBlobs from './components/layout/GradientBlobs'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import GithubSection from './components/sections/GithubSection'
import Achievements from './components/sections/Achievements'
import Contact from './components/sections/Contact'

export default function App() {
  useEffect(() => {
    const lenis = initLenis()
    return () => lenis?.destroy?.()
  }, [])

  return (
    <div className="relative">
      <CursorGlow />
      <Navbar />

      <main>
        <Hero />

        <div className="relative">
          <GradientBlobs />
          <About />
          <Experience />
        </div>

        <Skills />

        <div className="relative">
          <GradientBlobs />
          <Projects />
        </div>

        {/* <GithubSection /> */}
        <Achievements />

        <div className="relative">
          <GradientBlobs />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  )
}
