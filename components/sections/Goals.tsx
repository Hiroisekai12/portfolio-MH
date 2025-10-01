'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const goals = [
  {
    year: '2025',
    title: 'Current Focus',
    description: 'Specializing in Business Data Analysis while building freelance portfolio. Mastering advanced analytics and machine learning foundations.'
  },
  {
    year: '2027',
    title: 'Mid-Term Goal',
    description: 'Data Analyst position in innovative tech company. Leading data-driven transformation projects and mentoring junior analysts.'
  },
  {
    year: '2030',
    title: 'Long-Term Vision',
    description: 'Become recognized expert in AI-driven business intelligence. Chief Data Officer or founding data-centric startup.'
  }
]

export default function Goals() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const goalItems = sectionRef.current.querySelectorAll('.goal-item')
    goalItems.forEach((item, index) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 80%"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out"
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="goals" className="py-36">
      <div className="px-12 max-w-[1400px] mx-auto">
        <div className="text-sm tracking-[3px] uppercase text-text-dim mb-16 font-space-mono">
          008 / Goals
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {goals.map((goal) => (
            <div 
              key={goal.year}
              className="goal-item opacity-0 translate-y-20 p-8 rounded-3xl border border-border bg-bg/50 backdrop-blur-sm hover:border-accent/50 transition-colors duration-300"
            >
              <div className="text-6xl font-bold text-accent mb-6 font-space-mono">
                {goal.year}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-text">
                {goal.title}
              </h3>
              <p className="text-text-dim leading-relaxed">
                {goal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
