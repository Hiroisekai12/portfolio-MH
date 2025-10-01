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
        const percentEl = item.querySelector('.skill-percent') as HTMLElement
        const target = percentEl ? Number(percentEl.dataset.target) || 0 : 0

        // Animation synchronisée et optimisée de la barre et du compteur
        if (progress && percentEl) {
          // Reset initial state
          progress.style.width = '0%'
          percentEl.textContent = '0%'

          const counter = { value: 0 }
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: "play none none reverse"
            }
          })

          // Animation principale synchronisée
          tl.to(counter, {
            value: target,
            duration: 2,
            delay: index * 0.15 + 0.5,
            ease: 'power2.out',
            onUpdate: () => {
              const currentValue = counter.value
              const clampedValue = Math.max(0, Math.min(currentValue, target))
              const roundedValue = Math.round(clampedValue)

              // Synchronisation parfaite barre/compteur
              progress.style.width = `${clampedValue}%`
              percentEl.textContent = `${roundedValue}%`

              // Animation du compteur avec classe CSS
              if (Math.floor(currentValue) !== Math.floor(currentValue - 1)) {
                percentEl.classList.add('counter-animate')
                setTimeout(() => percentEl.classList.remove('counter-animate'), 500)
              }

              // Effet de brillance progressif
              const glowIntensity = (clampedValue / target) * 0.6
              progress.style.boxShadow = `0 0 ${8 + glowIntensity * 20}px rgba(236, 72, 153, ${0.3 + glowIntensity})`

              // Ajout de la classe glow pour l'effet après
              if (clampedValue > 10) {
                progress.classList.add('skill-progress-glow')
              }
            },
            onComplete: () => {
              // Animation finale de validation
              gsap.to(progress, {
                scale: 1.02,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'back.out(1.7)'
              })

              // Effet de particle final (simulé avec un glow pulsant)
              gsap.to(progress, {
                boxShadow: '0 0 25px rgba(236, 72, 153, 0.8)',
                duration: 0.6,
                yoyo: true,
                repeat: 2,
                ease: 'power2.inOut'
              })

              // Animation de l'indicateur de niveau
              const levelIndicator = item.querySelector('.level-indicator') as HTMLElement
              if (levelIndicator) {
                levelIndicator.style.animationDelay = '0.3s'
                levelIndicator.classList.add('level-indicator')
              }
            }
          })

          // Animation d'apparition de la barre conteneur avec effet élastique
          tl.from(progress.parentElement, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.8,
            ease: 'back.out(1.7)'
          }, `-=${2 - index * 0.1}`)

          // Micro-animation des points de jauge
          const gaugePoints = progress.parentElement?.querySelectorAll('.gauge-point')
          if (gaugePoints) {
            gaugePoints.forEach((point, i) => {
              tl.from(point, {
                scaleY: 0,
                duration: 0.3,
                delay: i * 0.05,
                ease: 'back.out(2)'
              }, `-=${1.5 - i * 0.1}`)
            })
          }
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
            <div key={skill.name} className="skill-item opacity-0 translate-x-8 pb-6 border-b border-border/30 hover:border-border transition-colors duration-300">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-text">{skill.name}</span>
                <span className="skill-percent font-space-mono text-sm text-accent font-bold" data-target={skill.level}>0%</span>
              </div>

              {/* Container de la barre avec effet glassmorphism */}
              <div className="relative h-2 bg-border/20 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Barre de progression avec gradient et animation */}
                <div
                  className="skill-progress h-full bg-gradient-to-r from-accent via-accent to-accent/80 rounded-full w-0 relative transition-all duration-300"
                  data-width={skill.level}
                  style={{
                    boxShadow: '0 0 8px rgba(236, 72, 153, 0.3)'
                  }}
                >
                  {/* Effet de brillance qui se déplace */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
                </div>

                {/* Points de jauge subtils */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center">
                  {[25, 50, 75].map((point) => (
                    <div
                      key={point}
                      className="gauge-point absolute w-0.5 h-full bg-border/40"
                      style={{ left: `${point}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Indicateur de niveau textuel */}
              <div className="level-indicator mt-3 text-xs text-text-dim font-space-mono opacity-0">
                {skill.level >= 90 ? '🎯 Expert Level' :
                  skill.level >= 80 ? '🚀 Advanced' :
                    skill.level >= 70 ? '📈 Intermediate' : '🌱 Beginner'}
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