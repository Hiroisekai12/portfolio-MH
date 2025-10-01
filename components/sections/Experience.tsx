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

    // Animation d'entrée simple des items
    const timelineItems = sectionRef.current.querySelectorAll('.timeline-item')
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

    // Animation de la barre de progression verticale avec animation des boules
    const sectionEl = sectionRef.current
    const progressEl = progressRef.current
    const timelineNodes = sectionEl.querySelectorAll('.timeline-node')

    if (sectionEl && progressEl) {
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
            // Animation des boules selon le progrès
            const progress = self.progress
            const totalNodes = timelineNodes.length

            timelineNodes.forEach((node, index) => {
              const nodeProgress = (progress * totalNodes) - index
              const nodeInner = node.querySelector('.node-inner')

              if (nodeProgress >= 0 && nodeProgress <= 1) {
                // La timeline atteint cette boule
                gsap.to(node, {
                  scale: 1.5,
                  duration: 0.3,
                  ease: 'back.out(1.7)'
                })
                gsap.to(nodeInner, {
                  scale: 1,
                  backgroundColor: '#00D2FF',
                  duration: 0.3
                })
              } else if (nodeProgress > 1) {
                // La timeline a dépassé cette boule
                gsap.to(node, {
                  scale: 1.2,
                  duration: 0.3
                })
                gsap.to(nodeInner, {
                  scale: 1,
                  backgroundColor: '#00D2FF',
                  duration: 0.3
                })
              } else {
                // La timeline n'a pas encore atteint cette boule
                gsap.to(node, {
                  scale: 1,
                  duration: 0.3
                })
                gsap.to(nodeInner, {
                  scale: 0,
                  backgroundColor: '#374151',
                  duration: 0.3
                })
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
    <section ref={sectionRef} className="experience" id="experience">
      <div className="section-label">004 / Journey</div>
      <div className="timeline-container">
        <div className="timeline-progress-line" aria-hidden="true" ref={progressRef}></div>

        <div className="timeline-wrapper">
          {experiences.map((exp, idx) => (
            <div className={`timeline-item`} key={idx}>
              <div className="timeline-marker">
                <div className="timeline-dot" aria-hidden="true"></div>
              </div>

              <div className="timeline-card">
                <div className="timeline-date">
                  <div className="date-year">{exp.date}</div>
                </div>

                <div className="timeline-content">
                  <h3><span>{exp.title}</span></h3>
                  <p>{exp.description}</p>

                  <div className="timeline-tags">
                    {exp.tags.map(tag => (
                      <span key={tag}>{tag}</span>
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