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

    // Calculate scroll amount
    const getScrollAmount = () => {
      const wrapperWidth = wrapper.scrollWidth
      return -(wrapperWidth - window.innerWidth)
    }

    // Main horizontal scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount()) * 2}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })

    // Scroll the wrapper horizontally
    tl.to(wrapper, {
      x: getScrollAmount,
      ease: 'none'
    })

    // Animate progress line
    tl.to(progressLine, {
      scaleX: 1,
      ease: 'none'
    }, 0)

    // Animate each item
    items.forEach((item, idx) => {
      const date = item.querySelector('.timeline-date')
      const dot = item.querySelector('.timeline-dot')
      const card = item.querySelector('.timeline-card')

      // Set initial states
      gsap.set([date, dot, card], { opacity: 0 })
      gsap.set(dot, { scale: 0 })
      gsap.set(card, { y: 80, scale: 0.9 })

      // Calculate timing for this item
      const start = idx * 0.2
      const duration = 0.8

      // Animate date
      tl.to(date, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, start)

      // Animate dot
      tl.to(dot, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(2)'
      }, start + 0.1)

      // Animate card
      tl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      }, start + 0.2)

      // Fade out
      tl.to([date, dot, card], {
        opacity: 0.3,
        duration: 0.3,
        ease: 'power2.in'
      }, start + duration)
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

      {/* Scrolling wrapper with initial offset */}
      <div 
        ref={wrapperRef}
        className="absolute top-0 left-0 w-full h-full flex items-center gap-64 will-change-transform"
        style={{ paddingLeft: '40vw' }}
      >
        {experiences.map((exp, idx) => (
          <div 
            key={idx}
            className="timeline-item relative flex flex-col justify-center"
            style={{ minWidth: '400px', height: '100vh' }}
          >
            {/* Date badge - appears first, floats above timeline */}
            <div 
              className="timeline-date absolute left-1/2 z-30"
              style={{
                top: 'calc(50vh - 60px)',
                transform: 'translateX(-50%)'
              }}
            >
              <div 
                className="px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase backdrop-blur-md"
                style={{
                  background: 'rgba(0,210,255,0.12)',
                  border: '1px solid rgba(0,210,255,0.3)',
                  color: 'rgba(0,210,255,0.95)',
                  boxShadow: '0 4px 16px rgba(0,210,255,0.2)'
                }}
              >
                {exp.date}
              </div>
            </div>

            {/* Dot on the horizontal line - appears second */}
            <div 
              className="timeline-dot absolute left-1/2 w-3 h-3 rounded-full z-20"
              style={{
                top: '50vh',
                transform: 'translate(-50%, -50%)',
                background: '#ffffff',
                boxShadow: '0 0 20px rgba(0,210,255,0.9), 0 0 40px rgba(0,210,255,0.5)',
                border: '1px solid rgba(255,255,255,0.95)'
              }}
              aria-hidden="true"
            ></div>

            {/* Vertical connector */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[1px] z-10"
              style={{
                top: idx % 2 === 0 ? 'calc(50vh - 194px)' : 'calc(50vh + 6px)',
                height: '194px',
                background: idx % 2 === 0 
                  ? 'linear-gradient(to top, rgba(0,210,255,0.25), transparent)'
                  : 'linear-gradient(to bottom, rgba(0,210,255,0.25), transparent)'
              }}
              aria-hidden="true"
            ></div>

            {/* Card - appears last */}
            <div 
              className="timeline-card relative w-full p-7 rounded-2xl backdrop-blur-md"
              style={{
                marginTop: idx % 2 === 0 ? '-200px' : '200px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.03)'
              }}
            >
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