'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Components
import Loader from '@/components/Loader'
import Cursor from '@/components/Cursor'
import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Technologies from '@/components/sections/Technologies'
import Languages from '@/components/sections/Languages'
import Stats from '@/components/sections/Stats'
import Experience from '@/components/sections/Experience'
import Passions from '@/components/sections/Passions'
import Certifications from '@/components/sections/Certifications'
import Projects from '@/components/sections/Projects'
import Goals from '@/components/sections/Goals'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin)
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP ScrollTrigger configuration for performance
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 40
    })

    // Navigation hide/show on scroll
    let lastScroll = 0
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        gsap.to('nav', { y: -100, duration: 0.3 })
      } else {
        gsap.to('nav', { y: 0, duration: 0.3 })
      }
      
      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <Loader />
      <Cursor />
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Technologies />
        <Languages />
        <Stats />
        <Experience />
        <Passions />
        <Certifications />
        <Projects />
        <Goals />
        <Contact />
      </main>
      
      <Footer />
    </div>
  )
}