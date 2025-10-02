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
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    // Animer chaque item individuellement au scroll
    itemsRef.current.forEach((item) => {
      if (!item) return

      // Animation d'apparition simple et élégante
      gsap.fromTo(item, 
        {
          opacity: 0,
          y: 80,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            end: 'top center',
            toggleActions: 'play none none reverse',
            // markers: true // Pour debug
          }
        }
      )

      // Animation de la ligne de progression
      const progressLine = item.querySelector('.progress-line')
      if (progressLine) {
        gsap.fromTo(progressLine,
          {
            scaleY: 0
          },
          {
            scaleY: 1,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=100',
              end: 'bottom center',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen bg-bg py-32 px-6 md:px-12 lg:px-24"
    >
      {/* Section label */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-[11px] tracking-[4px] uppercase text-text-dim font-space-mono mb-4">
          004 / Journey
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text">
          Experience
        </h2>
      </div>

      {/* Timeline container */}
      <div className="max-w-5xl mx-auto relative">
        {/* Ligne verticale centrale */}
        <div 
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,210,255,0.2) 10%, rgba(0,210,255,0.2) 90%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Items */}
        <div className="space-y-24 md:space-y-32">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              ref={(el) => { itemsRef.current[idx] = el }}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Date - côté gauche sur desktop, au-dessus sur mobile */}
              <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} pl-20 md:pl-0`}>
                <div 
                  className="inline-block px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase backdrop-blur-md"
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

              {/* Point central sur la ligne */}
              <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: '#ffffff',
                    boxShadow: '0 0 20px rgba(0,210,255,0.9), 0 0 40px rgba(0,210,255,0.5)',
                    border: '2px solid rgba(0,210,255,0.8)'
                  }}
                />
                
                {/* Ligne de connexion horizontale - desktop uniquement */}
                <div 
                  className="hidden md:block progress-line absolute top-1/2 -translate-y-1/2 h-[1px] origin-left"
                  style={{
                    width: idx % 2 === 0 ? '4rem' : '4rem',
                    left: idx % 2 === 0 ? '100%' : 'auto',
                    right: idx % 2 === 0 ? 'auto' : '100%',
                    background: 'linear-gradient(90deg, rgba(0,210,255,0.5), transparent)',
                    transform: idx % 2 === 0 ? 'translateY(-50%)' : 'translateY(-50%) scaleX(-1)'
                  }}
                />
              </div>

              {/* Card - côté droit sur desktop */}
              <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} pl-20 md:pl-0`}>
                <div 
                  className="relative p-7 md:p-8 rounded-2xl backdrop-blur-md group hover:scale-[1.02] transition-transform duration-500"
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.03)'
                  }}
                >
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(0,210,255,0.1), transparent 70%)'
                    }}
                  />

                  <h3 
                    className="font-semibold mb-3 leading-tight relative z-10"
                    style={{ 
                      fontSize: '22px',
                      color: 'rgba(255,255,255,0.95)'
                    }}
                  >
                    {exp.title}
                  </h3>

                  <p 
                    className="leading-relaxed mb-5 relative z-10"
                    style={{ 
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: '1.7'
                    }}
                  >
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {exp.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-medium uppercase tracking-wider hover:bg-white/5 transition-colors duration-300"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: 'rgba(255,255,255,0.6)'
                        }}
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
      </div>
    </section>
  )
}