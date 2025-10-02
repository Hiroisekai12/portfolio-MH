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
    const cards = wrapper.querySelectorAll('.timeline-card')

    // Initial states - ultra clean
    gsap.set(items, { opacity: 0, y: 80, scale: 0.9 })
    gsap.set(dots, { scale: 0, opacity: 0 })
    gsap.set(progressLine, { scaleX: 0, transformOrigin: 'left' })
    gsap.set(cards, { rotationY: 5, transformPerspective: 1000 })

    // Calculate scroll distance
    const getScrollAmount = () => {
      const wrapperWidth = wrapper.scrollWidth
      return -(wrapperWidth - window.innerWidth)
    }
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight * 1.5}`,
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Ultra smooth progress line
          gsap.to(progressLine, { 
            scaleX: progress, 
            duration: 0.05, 
            ease: 'none',
            force3D: true 
          })
          
          // Precise item activation
          items.forEach((item, idx) => {
            const card = cards[idx]
            const dot = dots[idx]
            const totalItems = items.length
            const itemStart = idx / totalItems
            const itemEnd = (idx + 1) / totalItems
            const itemProgress = (progress - itemStart) / (itemEnd - itemStart)
            
            // Calculate activation range
            const isActive = progress >= itemStart - 0.1 && progress <= itemEnd + 0.1
            const isPassed = progress > itemEnd + 0.1
            
            if (isActive) {
              // Active state - smooth reveal
              gsap.to(item, { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.8, 
                ease: 'power2.out',
                force3D: true
              })
              
              gsap.to(card, {
                rotationY: 0,
                duration: 0.8,
                ease: 'power2.out'
              })
              
              gsap.to(dot, { 
                scale: 1.5, 
                opacity: 1, 
                duration: 0.6, 
                ease: 'back.out(2)',
                force3D: true
              })
              
              // Dynamic glow based on progress
              const glowIntensity = 0.15 * (1 - Math.abs(itemProgress - 0.5) * 2)
              ;(item as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,210,255,${glowIntensity})`
              
            } else if (isPassed) {
              // Passed state - subtle fade
              gsap.to(item, { 
                opacity: 0.4, 
                scale: 0.92,
                y: -20,
                duration: 0.6,
                ease: 'power2.out'
              })
              gsap.to(dot, { 
                scale: 1, 
                opacity: 0.5, 
                duration: 0.4 
              })
              ;(item as HTMLElement).style.boxShadow = 'none'
              
            } else {
              // Not reached yet
              gsap.to(item, { 
                opacity: 0, 
                y: 80, 
                scale: 0.9, 
                duration: 0.5,
                ease: 'power2.in'
              })
              gsap.to(card, {
                rotationY: 5,
                duration: 0.5
              })
              gsap.to(dot, { 
                scale: 0, 
                opacity: 0, 
                duration: 0.3 
              })
              ;(item as HTMLElement).style.boxShadow = 'none'
            }
          })
        }
      }
    })

    // Smooth horizontal scroll
    tl.to(wrapper, {
      x: getScrollAmount,
      ease: 'none',
      force3D: true
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-bg">
      {/* Section label */}
      <div className="absolute top-12 left-12 z-10">
        <div className="text-[11px] tracking-[4px] uppercase text-text-dim font-space-mono">
          004 / Journey
        </div>
      </div>

      <div 
        ref={wrapperRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-32 px-32 will-change-transform"
      >
        {/* Timeline base line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" aria-hidden="true"></div>
        
        {/* Progress line */}
        <div 
          ref={progressLineRef}
          className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent to-accent/40 -translate-y-1/2 origin-left shadow-[0_0_20px_rgba(0,210,255,0.5)]"
          aria-hidden="true"
        ></div>

        {experiences.map((exp, idx) => (
          <div 
            key={idx}
            className="timeline-item relative min-w-[440px] max-w-[440px] will-change-transform"
          >
            {/* Timeline dot */}
            <div 
              className="timeline-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg border-[3px] border-accent z-20 shadow-[0_0_20px_rgba(0,210,255,0.6)]"
              aria-hidden="true"
            >
              <div className="absolute inset-[3px] rounded-full bg-accent"></div>
            </div>

            {/* Card */}
            <div 
              className={`timeline-card relative p-12 rounded-[28px] bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-2xl border border-white/[0.08] transition-all duration-700 hover:border-white/20 group ${
                idx % 2 === 0 ? 'mt-40' : 'mb-40'
              }`}
              style={{ 
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
              }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-accent/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="relative z-10">
                {/* Date badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(0,210,255,0.8)]"></div>
                  <span className="font-space-mono text-[22px] font-bold bg-gradient-to-r from-accent via-text to-text bg-clip-text text-transparent">
                    {exp.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[32px] font-bold mb-5 leading-[1.2] tracking-tight group-hover:text-accent transition-colors duration-500">
                  {exp.title}
                </h3>

                {/* Description */}
                <p className="text-text-dim leading-[1.7] mb-7 text-[15px]">
                  {exp.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {exp.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 text-[11px] uppercase tracking-[1.5px] font-semibold rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-accent hover:text-bg hover:border-accent hover:scale-105 transition-all duration-300 cursor-default"
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
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center">
        <p className="text-text-dim text-[10px] uppercase tracking-[2px] mb-3 font-space-mono">Scroll to navigate</p>
        <div className="flex gap-2 justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce shadow-[0_0_8px_rgba(0,210,255,0.8)]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce shadow-[0_0_8px_rgba(0,210,255,0.8)]" style={{animationDelay: '0.1s'}}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce shadow-[0_0_8px_rgba(0,210,255,0.8)]" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </section>
  )
}