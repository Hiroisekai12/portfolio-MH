'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const stats = [
  { value: 100, label: 'SEO Score Achieved' },
  { value: 250, label: '% Brand Visibility Increase' },
  { value: 4, label: 'Languages Spoken' },
  { value: 15, label: 'Technologies Mastered' }
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const statNumbers = sectionRef.current.querySelectorAll('.stat-number')
    statNumbers.forEach((stat) => {
      const endValue = parseInt((stat as HTMLElement).dataset.value || '0')
      
      ScrollTrigger.create({
        trigger: stat,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(stat, {
            textContent: endValue,
            duration: 2,
            ease: "power1.inOut",
            snap: { textContent: 1 },
            onUpdate: function() {
              ;(this.targets()[0] as HTMLElement).innerHTML = Math.ceil(parseFloat((this.targets()[0] as HTMLElement).textContent || '0')).toString()
            },
          })
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-white/[0.02] border-t border-b border-border"
    >
      <div className="max-w-[1400px] mx-auto px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div 
                className="stat-number text-[clamp(3rem,5vw,4rem)] font-bold text-accent font-space-mono"
                data-value={stat.value}
              >
                0
              </div>
              <div className="text-sm text-text-dim uppercase tracking-[1px] mt-2.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}