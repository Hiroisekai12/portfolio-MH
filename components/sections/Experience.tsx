'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const experiences = [
  {
    date: '2025 - Present',
    title: 'Freelance Web Developer & Designer',
    description: 'Building professional websites with Next.js, GSAP animations, and creating brand identities for businesses.',
    tags: ['Next.js', 'Design Systems', 'SEO']
  },
  {
    date: '2025 - 2026',
    title: 'Specialization Business Data Analysis',
    description: 'EPHEC Brussels - Evening classes to deepen expertise in data science and advanced analytics.',
    tags: ['Machine Learning', 'Big Data', 'AI']
  },
  {
    date: '2025',
    title: 'Business Analyst Internship',
    description: 'ISI SRL - Led digital transformation projects, analyzed business needs, and created technical specifications.',
    tags: ['Project Management', 'WordPress', 'Documentation']
  },
  {
    date: '2022 - 2025',
    title: 'Bachelor in Business Analysis',
    description: 'EPHEC Brussels - Comprehensive business and technical education with focus on data-driven decision making.',
    tags: ['Business Intelligence', 'Data Modeling', 'Strategy']
  }
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !wrapperRef.current || !progressLineRef.current) return

    gsap.registerPlugin(ScrollTrigger)
    
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    const progressLine = progressLineRef.current
    const items = wrapper.querySelectorAll('.timeline-item')
    const dots = wrapper.querySelectorAll('.timeline-dot')

    // Initial states
    gsap.set(items, { opacity: 0, y: 60, scale: 0.95 })
    gsap.set(dots, { scale: 0, opacity: 0 })
    gsap.set(progressLine, { scaleX: 0 })

    // Horizontal scroll animation
    const scrollWidth = wrapper.scrollWidth - window.innerWidth
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth + window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Progress line follows scroll
          gsap.to(progressLine, { scaleX: self.progress, duration: 0.1, ease: 'none' })
          
          // Activate items & dots based on scroll progress
          items.forEach((item, idx) => {
            const itemProgress = (self.progress * items.length) - idx
            const dot = dots[idx]
            
            if (itemProgress >= -0.2 && itemProgress <= 1.2) {
              // Item is in view - activate
              gsap.to(item, { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 0.6, 
                ease: 'power3.out' 
              })
              gsap.to(dot, { 
                scale: 1.4, 
                opacity: 1, 
                duration: 0.5, 
                ease: 'back.out(1.7)' 
              })
              // Add glow
              ;(item as HTMLElement).style.boxShadow = '0 20px 60px rgba(255,255,255,0.1)'
            } else if (itemProgress > 1.2) {
              // Passed - shrink slightly
              gsap.to(item, { opacity: 0.6, scale: 0.95, duration: 0.4 })
              gsap.to(dot, { scale: 1, opacity: 0.6, duration: 0.4 })
              ;(item as HTMLElement).style.boxShadow = 'none'
            } else {
              // Not yet reached
              gsap.to(item, { opacity: 0, y: 60, scale: 0.95, duration: 0.4 })
              gsap.to(dot, { scale: 0, opacity: 0, duration: 0.4 })
              ;(item as HTMLElement).style.boxShadow = 'none'
            }
          })
        }
      }
    })

    // Horizontal scroll
    tl.to(wrapper, {
      x: () => -(scrollWidth),
      ease: 'none'
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-bg">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-[12px] tracking-[3px] uppercase text-text-dim font-space-mono opacity-30">
          004 / Journey
        </div>
      </div>

      <div 
        ref={wrapperRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-24 px-24 will-change-transform"
      >
        {/* Timeline base line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2" aria-hidden="true"></div>
        
        {/* Progress line */}
        <div 
          ref={progressLineRef}
          className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-accent via-accent/80 to-accent/60 -translate-y-1/2 origin-left"
          aria-hidden="true"
        ></div>

        {experiences.map((exp, idx) => (
          <div 
            key={idx}
            className="timeline-item relative min-w-[420px] max-w-[420px] will-change-transform"
          >
            {/* Timeline dot */}
            <div 
              className="timeline-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-bg border-3 border-accent z-20"
              aria-hidden="true"
            >
              <div className="absolute inset-1 rounded-full bg-accent animate-pulse"></div>
            </div>

            {/* Card */}
            <div 
              className={`relative p-10 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl border border-white/10 transition-all duration-500 ${
                idx % 2 === 0 ? 'mt-32' : 'mb-32'
              }`}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="font-space-mono text-2xl font-bold bg-gradient-to-r from-accent to-text bg-clip-text text-transparent">
                    {exp.date}
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-4 leading-tight">
                  {exp.title}
                </h3>

                <p className="text-text-dim leading-relaxed mb-6 text-base">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:text-bg hover:border-accent transition-all duration-300 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center opacity-70">
        <p className="text-text-dim text-xs uppercase tracking-wider mb-2">Scroll to navigate</p>
        <div className="flex gap-1.5 justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </section>
  )
}