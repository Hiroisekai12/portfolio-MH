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
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)
    // Apparition pro des items (staggered, subtle scale)
    const items = sectionRef.current.querySelectorAll('.timeline-item')
    gsap.fromTo(items, {
      y: 40,
      opacity: 0,
      scale: 0.98
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Animation de la barre de progression verticale et animation précise des nodes
    const sectionEl = sectionRef.current
    const progressEl = progressRef.current

    if (sectionEl && progressEl) {
      const timelineNodes = Array.from(sectionEl.querySelectorAll('.timeline-node')) as HTMLElement[]

      // initialise l'état des nodes
      timelineNodes.forEach((n) => {
        gsap.set(n, { scale: 1 })
        const inner = n.querySelector('.node-inner') as HTMLElement | null
        if (inner) gsap.set(inner, { scale: 0, backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-border') || '#374151' })
      })

      // ScrollTrigger: onUpdate we'll compute exact distance between progress line and node center
      gsap.fromTo(progressEl, {
        scaleY: 0,
        transformOrigin: 'top'
      }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 20%',
          end: 'bottom 80%',
          scrub: true,
          onUpdate: (self) => {
            // position Y de la ligne (au centre du viewport entre start/end)
            timelineNodes.forEach((node) => {
              const nodeRect = node.getBoundingClientRect()
              const nodeCenterY = nodeRect.top + nodeRect.height / 2

              // distance verticale entre le centre du node et la portion visible de la ligne
              const viewportHeight = window.innerHeight

              // compute normalized proximity based on viewport: 0 = far, 1 = overlapped
              const distance = Math.abs((nodeCenterY) - (viewportHeight * (self.progress)))
              const proximity = Math.max(0, 1 - (distance / (viewportHeight * 0.25))) // sensible falloff

              const inner = node.querySelector('.node-inner') as HTMLElement | null

              if (proximity > 0.6) {
                // near/overlap -> animate to active
                gsap.to(node, { scale: 1.45, duration: 0.4, ease: 'back.out(1.7)' })
                if (inner) gsap.to(inner, { scale: 1, backgroundColor: '#ffffff', duration: 0.35, ease: 'power2.out' })
              } else if (proximity > 0.25) {
                // approaching -> small grow
                gsap.to(node, { scale: 1.15, duration: 0.35, ease: 'power2.out' })
                if (inner) gsap.to(inner, { scale: 0.6, backgroundColor: '#ffffff', duration: 0.35, ease: 'power2.out' })
              } else {
                // default
                gsap.to(node, { scale: 1, duration: 0.35, ease: 'power2.out' })
                if (inner) gsap.to(inner, { scale: 0, backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-border') || '#374151', duration: 0.35, ease: 'power2.out' })
              }
            })
          }
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="px-5 sm:px-6 md:px-12 py-28 md:py-36 max-w-[1400px] mx-auto">
      <div className="text-sm tracking-[3px] uppercase text-text-dim mb-12 font-space-mono">
        004 / Journey
      </div>

      {/* Wrapper timeline */}
      <div className="relative">
        {/* Ligne verticale globale (positionnée pour mobile + desktop) */}
        <div className="pointer-events-none absolute left-8 md:left-[120px] top-0 bottom-0 w-px bg-border" aria-hidden="true" />
        {/* Barre de progression verticale */}
        <div ref={progressRef} className="pointer-events-none absolute left-8 md:left-[120px] top-0 bottom-0 w-px bg-accent/60 origin-top scale-y-0" aria-hidden="true" />

        <ol className="list-none pl-0 space-y-10 sm:space-y-12 md:space-y-16" aria-label="Timeline des expériences" style={{ listStyle: 'none' }}>
          {experiences.map((exp, index) => (
            <li
              key={index}
              className="timeline-item marker:text-transparent relative opacity-0 translate-x-8"
            >
              {/* Timeline node (left) */}
              <div className="timeline-node absolute left-7 md:left-[115px] top-6 w-3 h-3 bg-transparent border-2 border-bg rounded-full z-10">
                <div className="node-inner absolute inset-0 rounded-full"></div>
              </div>

              {/* Grille responsive: date / contenu */}
              <div className="md:grid md:grid-cols-[120px,1fr] md:gap-10 pl-12 md:pl-0">
                {/* Colonne date (desktop) */}
                <div className="hidden md:block text-right pr-6">
                  <div className="font-space-mono text-xs text-text-dim whitespace-nowrap">{exp.date}</div>
                </div>

                {/* Contenu */}
                <div>
                  {/* Date (mobile) */}
                  <div className="md:hidden font-space-mono text-[11px] text-text-dim mb-2">{exp.date}</div>

                  <h3 className="text-[20px] sm:text-2xl md:text-[28px] mb-2 font-semibold">{exp.title}</h3>
                  <p className="text-text-dim leading-relaxed text-[15px] sm:text-base mb-4 md:mb-5">{exp.description}</p>
                  <div className="flex gap-2.5 flex-wrap">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 rounded-[15px] text-[11px] md:text-xs uppercase tracking-[1px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}