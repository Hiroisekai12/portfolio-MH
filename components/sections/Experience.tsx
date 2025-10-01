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

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const timelineItems = sectionRef.current.querySelectorAll('.timeline-item')
    timelineItems.forEach((item, index) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 80%"
        },
        x: 0,
        opacity: 1,
        duration: 1,
        delay: index * 0.15,
        ease: "power3.out"
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="px-12 py-36 max-w-[1400px] mx-auto">
      <div className="text-sm tracking-[3px] uppercase text-text-dim mb-12 font-space-mono">
        004 / Journey
      </div>
      
      <div className="relative pl-24">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 h-full w-px bg-border" />
        
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item relative mb-20 opacity-0 translate-x-8">
            {/* Timeline dot */}
            <div className="absolute -left-[105px] top-1 w-2.5 h-2.5 bg-accent rounded-full" />
            
            {/* Date */}
            <div className="absolute -left-[200px] top-0 w-20 text-right font-space-mono text-xs text-text-dim">
              {exp.date}
            </div>
            
            {/* Content */}
            <div>
              <h3 className="text-2xl mb-2.5 font-semibold">{exp.title}</h3>
              <p className="text-text-dim leading-relaxed mb-4">{exp.description}</p>
              <div className="flex gap-2.5 flex-wrap">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 rounded-[15px] text-xs uppercase tracking-[1px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}