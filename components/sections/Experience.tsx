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
    gsap.set(items, { opacity: 0 })
    gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 })
    gsap.set(dots, { scale: 0.5, opacity: 0 })
    gsap.set(progressLine, { scaleX: 0, transformOrigin: 'left' })

    // Calculate scroll distance
    const getScrollAmount = () => {
      const wrapperWidth = wrapper.scrollWidth
      return -(wrapperWidth - window.innerWidth + 200)
    }
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight * 2}`,
        scrub: 2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Progress line smooth
          gsap.to(progressLine, { 
            scaleX: progress, 
            duration: 0.1, 
            ease: 'none'
          })
          
          // Precise activation per item
          items.forEach((item, idx) => {
            const card = cards[idx]
            const dot = dots[idx]
            const totalItems = items.length
            
            // Each item activates when progress line reaches it
            const activationPoint = (idx + 0.5) / totalItems
            const activationRange = 0.15
            
            const distanceFromActivation = Math.abs(progress - activationPoint)
            const isActive = distanceFromActivation < activationRange
            
            if (isActive) {
              // Calculate fade based on distance
              const fadeProgress = 1 - (distanceFromActivation / activationRange)
              
              gsap.to(item, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
              })
              
              gsap.to(card, { 
                opacity: fadeProgress,
                y: 0,
                scale: 1,
                duration: 0.6, 
                ease: 'power2.out'
              })
              
              gsap.to(dot, { 
                scale: 1.2,
                opacity: 1,
                duration: 0.4, 
                ease: 'back.out(1.5)'
              })
              
            } else if (progress > activationPoint + activationRange) {
              // Passed - subtle fade
              gsap.to(card, { 
                opacity: 0.3,
                scale: 0.98,
                duration: 0.4
              })
              gsap.to(dot, { 
                scale: 0.8,
                opacity: 0.4,
                duration: 0.3
              })
              
            } else {
              // Not reached yet
              gsap.to(item, {
                opacity: 0,
                duration: 0.3
              })
              gsap.to(card, { 
                opacity: 0,
                y: 40,
                scale: 0.95,
                duration: 0.4
              })
              gsap.to(dot, { 
                scale: 0.5,
                opacity: 0,
                duration: 0.3
              })
            }
          })
        }
      }
    })

    // Smooth horizontal scroll
    tl.to(wrapper, {
      x: getScrollAmount,
      ease: 'none'
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

      {/* Timeline progress line - fixed in center */}
      <div 
        ref={progressLineRef}
        className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 origin-left z-10"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(0,210,255,0.5) 100%)',
          boxShadow: '0 0 8px rgba(0,210,255,0.25)'
        }}
        aria-hidden="true"
      ></div>

      {/* Scrolling wrapper */}
      <div 
        ref={wrapperRef}
        className="absolute top-0 left-0 w-full h-full flex items-center gap-64 px-32 will-change-transform"
      >
        {experiences.map((exp, idx) => (
          <div 
            key={idx}
            className="timeline-item relative flex flex-col items-center"
            style={{ minWidth: '400px' }}
          >
            {/* Dot on the horizontal line */}
            <div 
              className="timeline-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-20"
              style={{
                background: '#ffffff',
                boxShadow: '0 0 16px rgba(0,210,255,0.8), 0 0 32px rgba(0,210,255,0.4)',
                border: '1px solid rgba(255,255,255,0.9)'
              }}
              aria-hidden="true"
            ></div>

            {/* Vertical connector */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[1px] z-10"
              style={{
                top: idx % 2 === 0 ? 'calc(50% - 200px)' : 'calc(50% + 6px)',
                height: '194px',
                background: 'linear-gradient(to bottom, rgba(0,210,255,0.2), transparent)'
              }}
              aria-hidden="true"
            ></div>

            {/* Card - cleaner design */}
            <div 
              className="timeline-card relative w-full p-7 rounded-2xl backdrop-blur-md"
              style={{
                marginTop: idx % 2 === 0 ? '-200px' : '200px',
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
              }}
            >
              {/* Date badge - minimal */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-medium tracking-widest uppercase"
                style={{
                  background: 'rgba(0,210,255,0.06)',
                  border: '1px solid rgba(0,210,255,0.15)',
                  color: 'rgba(0,210,255,0.8)'
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                {exp.date}
              </div>

              {/* Title */}
              <h3 
                className="font-semibold mb-3 leading-tight"
                style={{ 
                  fontSize: '22px',
                  color: 'rgba(255,255,255,0.95)'
                }}
              >
                {exp.title}
              </h3>

              {/* Description */}
              <p 
                className="leading-relaxed mb-4"
                style={{ 
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: '1.6'
                }}
              >
                {exp.description}
              </p>

              {/* Skills - ultra minimal */}
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="px-2.5 py-1 rounded text-[10px] font-medium uppercase tracking-wider"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      color: 'rgba(255,255,255,0.55)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center z-20">
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