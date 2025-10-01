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

    // Animation sophistiquée des items de timeline
    const timelineItems = sectionRef.current.querySelectorAll('.timeline-item')
    const timelineDots = sectionRef.current.querySelectorAll('.timeline-dot')

    // Animation d'entrée des items
    timelineItems.forEach((item, index) => {
      gsap.fromTo(item, {
        x: 50,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    // Animation de la barre de progression verticale qui suit le scroll
    const sectionEl = sectionRef.current
    const progressEl = progressRef.current

    if (sectionEl && progressEl && timelineDots.length > 0) {
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
            // Animation des dots qui deviennent actifs avec la progression
            const progress = self.progress
            const totalDots = timelineDots.length

            timelineDots.forEach((dot, index) => {
              const dotProgress = (index + 1) / totalDots
              const dotElement = dot as HTMLElement

              if (progress >= dotProgress - 0.1) {
                // Dot devient actif (blanc)
                gsap.to(dotElement, {
                  backgroundColor: '#ffffff',
                  scale: 1.2,
                  duration: 0.3,
                  ease: 'back.out(1.7)'
                })
              } else {
                // Dot reste inactif (gris)
                gsap.to(dotElement, {
                  backgroundColor: '#333333',
                  scale: 1,
                  duration: 0.3,
                  ease: 'power2.out'
                })
              }
            })
          }
        }
      })
    }

    // Animation hover sophistiquée
    timelineItems.forEach((item) => {
      const itemElement = item as HTMLElement
      const dot = item.querySelector('.timeline-dot') as HTMLElement

      itemElement.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        })
        if (dot) {
          gsap.to(dot, {
            scale: 1.4,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
        }
      })

      itemElement.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
        if (dot) {
          gsap.to(dot, {
            scale: 1.2, // Retour à la taille active ou normale selon l'état
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      })
    })

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
              {/* Point sur la ligne - commence gris */}
              <div
                className="timeline-dot absolute left-8 md:left-[120px] -translate-x-1/2 top-2 w-2.5 h-2.5 rounded-full bg-gray-600 z-10 transition-all duration-300"
                aria-hidden="true"
              />

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