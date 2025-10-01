'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const certifications = [
  { year: '2024', title: 'Certified Product Owner', organization: 'Scrum Alliance' },
  { year: '2023', title: 'Certified Scrum Master', organization: 'Scrum Alliance' },
  { year: '2023', title: 'Google Ads Certification', organization: 'Google' }
]

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const certCards = sectionRef.current.querySelectorAll('.cert-card')
    certCards.forEach((card, index) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%"
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
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
        006 / Certifications
      </div>
      
      <div className="grid gap-8">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="cert-card flex items-center gap-8 py-8 border-b border-border opacity-0 -translate-x-8"
          >
            <div className="font-space-mono text-sm text-text-dim min-w-[60px]">
              {cert.year}
            </div>
            <div>
              <h4 className="text-xl mb-1 font-medium">{cert.title}</h4>
              <span className="text-text-dim text-sm">{cert.organization}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}