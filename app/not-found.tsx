'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)
  const glitchRef = useRef<HTMLDivElement>(null)
  const codeRainRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.registerPlugin(TextPlugin)

    // Animation d'entrée de la page
    const tl = gsap.timeline()

    // Animation des particules flottantes
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute w-1 h-1 bg-accent/20 rounded-full'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particlesRef.current?.appendChild(particle)

      gsap.to(particle, {
        y: -100,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        delay: Math.random() * 2,
        ease: "power2.out"
      })
    }

    // Animation du texte glitch
    const glitchText = glitchRef.current
    if (glitchText) {
      tl.fromTo(glitchText, {
        scale: 0,
        rotationX: 90,
        opacity: 0
      }, {
        scale: 1,
        rotationX: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)"
      })

      // Effet glitch récurrent
      gsap.to(glitchText, {
        x: () => Math.random() * 4 - 2,
        y: () => Math.random() * 4 - 2,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })

      // Changement de couleur glitch
      gsap.to(glitchText, {
        textShadow: "2px 0 #ff0000, -2px 0 #00ff00, 0 2px #0000ff",
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2
      })
    }

    // Animation de la pluie de code
    const createCodeRain = () => {
      const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</>{}[]();'
      
      for (let i = 0; i < 20; i++) {
        const span = document.createElement('span')
        span.textContent = characters[Math.floor(Math.random() * characters.length)]
        span.className = 'absolute text-accent/30 font-mono text-sm'
        span.style.left = Math.random() * 100 + '%'
        span.style.top = '-20px'
        codeRainRef.current?.appendChild(span)

        gsap.to(span, {
          y: window.innerHeight + 50,
          opacity: 0,
          duration: Math.random() * 3 + 2,
          ease: "none",
          onComplete: () => span.remove()
        })
      }
    }

    const rainInterval = setInterval(createCodeRain, 200)

    // Animation des éléments de contenu
    tl.from('.error-content', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.5")

    // Animation des boutons
    tl.from('.action-button', {
      scale: 0,
      rotation: 180,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.3")

    // Animations hover pour les boutons
    const buttons = document.querySelectorAll('.action-button')
    buttons.forEach(button => {
      const buttonElement = button as HTMLElement
      
      buttonElement.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.1,
          y: -5,
          boxShadow: "0 10px 30px rgba(255, 107, 107, 0.3)",
          duration: 0.3,
          ease: "power2.out"
        })
      })

      buttonElement.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          y: 0,
          boxShadow: "0 5px 15px rgba(255, 107, 107, 0.1)",
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    return () => {
      clearInterval(rainInterval)
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-bg relative overflow-hidden">
      <Navigation />
      
      {/* Particules d'arrière-plan */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>
      
      {/* Pluie de code */}
      <div ref={codeRainRef} className="absolute inset-0 pointer-events-none overflow-hidden"></div>
      
      {/* Effet de grille */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255, 107, 107, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255, 107, 107, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Titre principal avec effet glitch */}
          <div ref={glitchRef} className="mb-8">
            <h1 className="text-[10rem] md:text-[15rem] font-bold text-accent leading-none font-space-mono">
              404
            </h1>
          </div>

          {/* Contenu d'erreur */}
          <div className="error-content mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-text mb-6">
              Page Not Found
            </h2>
          </div>

          <div className="error-content mb-8">
            <p className="text-text-dim text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Oops! Il semblerait que cette page se soit perdue dans les méandres du cyberespace. 
              Ne vous inquiétez pas, même les meilleurs développeurs se perdent parfois.
            </p>
          </div>

          {/* ASCII Art */}
          <div className="error-content mb-12 font-mono text-accent/60 text-xs md:text-sm leading-tight">
            <pre>{`
    ╔═══════════════════════════════════════╗
    ║  ERROR: Page not found in database    ║
    ║  STATUS: 404 - Resource unavailable   ║
    ║  SUGGESTION: Try navigation below     ║
    ╚═══════════════════════════════════════╝
            `}</pre>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/" className="action-button group">
              <div className="flex items-center gap-3 px-8 py-4 bg-accent text-bg font-semibold rounded-xl 
                           transform transition-all duration-300 hover:scale-105 
                           shadow-lg hover:shadow-xl border border-accent/20">
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour à l&apos;accueil
              </div>
            </Link>

            <button 
              onClick={() => window.history.back()}
              className="action-button group"
            >
              <div className="flex items-center gap-3 px-8 py-4 bg-transparent text-accent font-semibold rounded-xl 
                           border-2 border-accent/30 hover:border-accent transition-all duration-300
                           hover:bg-accent/10">
                <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Page précédente
              </div>
            </button>
          </div>

          {/* Links rapides */}
          <div className="error-content mt-16">
            <h3 className="text-accent font-semibold mb-6 text-lg">Pages populaires</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { name: 'À propos', href: '/#about' },
                { name: 'Projets', href: '/#projects' },
                { name: 'Expériences', href: '/#experience' },
                { name: 'Contact', href: '/#contact' }
              ].map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="action-button px-4 py-2 text-text-dim hover:text-accent 
                           border border-border rounded-lg hover:border-accent/50 
                           transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Message de développeur */}
          <div className="error-content mt-16 p-6 bg-bg/50 backdrop-blur-sm border border-border rounded-xl max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent text-sm">💡</span>
              </div>
              <div className="text-left">
                <h4 className="text-accent font-semibold mb-2">Note du développeur</h4>
                <p className="text-text-dim text-sm leading-relaxed">
                  Si vous pensez que cette page devrait exister, n&apos;hésitez pas à me contacter. 
                  Les bugs sont des features non documentées ! 😉
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}