'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const skills = [
  { name: 'Data Analysis', level: 90 },
  { name: 'Web Development', level: 85 },
  { name: 'UX/UI Design', level: 80 },
  { name: 'Business Strategy', level: 85 }
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    // Animate text words
    const textSpans = textRef.current?.querySelectorAll('span')
    if (textSpans) {
      textSpans.forEach((span) => {
        gsap.to(span, {
          scrollTrigger: {
            trigger: span,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        })
      })
    }

    // Animate skills
    const skillItems = skillsRef.current?.querySelectorAll('.skill-item')
    if (skillItems) {
      skillItems.forEach((item, index) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%"
          },
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out"
        })

        const progress = item.querySelector('.skill-progress') as HTMLElement
        const width = progress?.dataset.width
        
        if (progress && width) {
          gsap.to(progress, {
            scrollTrigger: {
              trigger: item,
              start: "top 80%"
            },
            width: width + '%',
            duration: 1.5,
            delay: index * 0.1 + 0.3,
            ease: "power3.out"
          })
        }
      })
    }

    // Animate quote
    if (quoteRef.current) {
      gsap.to(quoteRef.current, {
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 80%"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="about" className="px-12 py-36 max-w-[1400px] mx-auto">
      <div className="text-sm tracking-[3px] uppercase text-text-dim mb-12 font-space-mono">
        001 / About
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div ref={textRef} className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.3] font-light">
          <span className="inline-block opacity-0 translate-y-8">I transform data into</span>{' '}
          <span className="inline-block opacity-0 translate-y-8">actionable insights and</span>{' '}
          <span className="inline-block opacity-0 translate-y-8">build digital experiences</span>{' '}
          <span className="inline-block opacity-0 translate-y-8">that make a difference.</span>{' '}
          <span className="inline-block opacity-0 translate-y-8">With a unique blend of</span>{' '}
          <span className="inline-block opacity-0 translate-y-8">analytical thinking and</span>{' '}
          <span className="inline-block opacity-0 translate-y-8">creative problem-solving.</span>
        </div>
        
        <div ref={skillsRef} className="grid gap-8">
          {skills.map((skill, index) => (
            <div key={skill.name} className="skill-item opacity-0 translate-x-8 pb-5 border-b border-border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">{skill.name}</span>
                <span className="font-space-mono text-sm text-text-dim">{skill.level}%</span>
              </div>
              <div className="h-0.5 bg-border relative overflow-hidden">
                <div 
                  className="skill-progress h-full bg-accent w-0 transition-all duration-1000 ease-out"
                  data-width={skill.level}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={quoteRef} className="mt-24 text-center opacity-0 translate-y-8">
        <blockquote className="text-[clamp(1.5rem,3vw,2rem)] font-light italic text-text mb-5">
          &ldquo;The best way to predict the future is to create it with data.&rdquo;
        </blockquote>
        <p className="font-space-mono text-sm text-text-dim">
          - My philosophy
        </p>
      </div>
    </section>
  )
}