import { useEffect } from 'react'
import { initLenis } from './lib/lenis'
import { ThemeProvider } from './theme/ThemeContext'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CursorGlow from './components/layout/CursorGlow'

import Hero from './components/sections/Hero'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import MinorProjects from './components/sections/MinorProjects'
import Achievements from './components/sections/Achievements'
import Contact from './components/sections/Contact'

export default function App() {
  useEffect(() => {
    const lenis = initLenis()
    return () => lenis?.destroy?.()
  }, [])

  return (
    <ThemeProvider>
      <div className="relative">
        <CursorGlow />
        <Navbar />

        <main>
          <Hero />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <MinorProjects />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
