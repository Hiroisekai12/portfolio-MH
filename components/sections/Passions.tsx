'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const passions = [
  {
    icon: '💪',
    title: 'Sports & Fitness',
    description: 'Marathon runner, boxing enthusiast, and fitness training. Physical discipline translates to mental resilience in professional challenges.'
  },
  {
    icon: '🏕️',
    title: 'Adventure Travel',
    description: 'Bivouac camping and backpacking explorer. Finding inspiration in nature and different cultures around the world.'
  },
  {
    icon: '🎯',
    title: 'Personal Challenges',
    description: 'Constantly seeking new challenges to push personal limits. Growth happens outside the comfort zone.'
  },
  {
    icon: '🧠',
    title: 'Continuous Learning',
    description: 'Passionate about staying updated with tech trends, global news, and emerging technologies. Knowledge is power.'
  }
]

export default function Passions() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const passionCards = sectionRef.current.querySelectorAll('.passion-card')
    passionCards.forEach((card, index) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%"
        },
        y: 0,
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
        005 / Passions & Interests
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {passions.map((passion) => (
          <div
            key={passion.title}
            className="passion-card p-10 border border-border rounded-[10px] transition-all duration-300 hover:bg-white/[0.02] hover:-translate-y-1 opacity-0 translate-y-8"
          >
            <div className="text-5xl mb-5">{passion.icon}</div>
            <h4 className="text-xl mb-4 font-medium">{passion.title}</h4>
            <p className="text-text-dim leading-relaxed text-sm">{passion.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}