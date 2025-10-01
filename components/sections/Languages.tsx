'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const languages = [
  { flag: '🇫🇷', name: 'French', level: 100, desc: 'Native / Fluent' },
  { flag: '🇬🇧', name: 'English', level: 90, desc: 'Professional' },
  { flag: '🇩🇪', name: 'German', level: 75, desc: 'Good' },
  { flag: '🇳🇱', name: 'Dutch', level: 75, desc: 'Good' }
]

export default function Languages() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)

      const langCards = gsap.utils.toArray('.lang-card') as Element[]
      langCards.forEach((card, index) => {
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
        
        const fill = card.querySelector('.lang-fill')
        const level = fill?.getAttribute('data-level')
        
        if (fill && level) {
          gsap.to(fill, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%"
            },
            width: level + '%',
            duration: 1.5,
            delay: index * 0.1 + 0.3,
            ease: "power3.out"
          })
        }
      })
    }
  }, [])

  return (
    <section className="languages" ref={sectionRef}>
      <div className="section-label">003 / Languages</div>
      <div className="lang-container">
        {languages.map((lang, index) => (
          <div key={index} className="lang-card">
            <div className="lang-flag">{lang.flag}</div>
            <h4 className="lang-name">{lang.name}</h4>
            <div className="lang-level-bar">
              <div className="lang-fill" data-level={lang.level}></div>
            </div>
            <span className="lang-desc">{lang.desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
