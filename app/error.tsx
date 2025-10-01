'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navigation from '@/components/Navigation'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const errorCodeRef = useRef<HTMLDivElement>(null)
  const circuitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Animation d'entrée
    const tl = gsap.timeline()

    // Création du circuit électronique animé
    const createCircuitLines = () => {
      const circuit = circuitRef.current
      if (!circuit) return

      for (let i = 0; i < 15; i++) {
        const line = document.createElement('div')
        line.className = 'absolute bg-accent/30 rounded-full'
        
        // Lignes horizontales et verticales aléatoires
        if (Math.random() > 0.5) {
          line.style.width = Math.random() * 200 + 50 + 'px'
          line.style.height = '2px'
          line.style.left = Math.random() * 80 + '%'
          line.style.top = Math.random() * 80 + '%'
        } else {
          line.style.width = '2px'
          line.style.height = Math.random() * 200 + 50 + 'px'
          line.style.left = Math.random() * 80 + '%'
          line.style.top = Math.random() * 80 + '%'
        }

        circuit.appendChild(line)

        // Animation de pulsation
        gsap.to(line, {
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 2
        })
      }

      // Ajout de points de circuit
      for (let i = 0; i < 10; i++) {
        const point = document.createElement('div')
        point.className = 'absolute w-3 h-3 bg-accent rounded-full'
        point.style.left = Math.random() * 90 + '%'
        point.style.top = Math.random() * 90 + '%'
        circuit.appendChild(point)

        gsap.to(point, {
          scale: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 3 + 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 3
        })
      }
    }

    createCircuitLines()

    // Animation du code d'erreur
    tl.fromTo(errorCodeRef.current, {
      scale: 0,
      rotationY: 180,
      opacity: 0
    }, {
      scale: 1,
      rotationY: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)"
    })

    // Animation des éléments de contenu
    tl.from('.error-content', {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.6")

    // Animation des boutons
    tl.from('.error-button', {
      scale: 0,
      rotation: 90,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.4")

    // Effet de glitch sur le titre d'erreur
    const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 3 })
    glitchTl.to('.glitch-text', {
      x: 2,
      duration: 0.1,
      ease: "none"
    })
    .to('.glitch-text', {
      x: -2,
      skewX: 2,
      duration: 0.1,
      ease: "none"
    })
    .to('.glitch-text', {
      x: 0,
      skewX: 0,
      duration: 0.1,
      ease: "none"
    })

    return () => {
      tl.kill()
      glitchTl.kill()
    }
  }, [])

  // Animation des boutons au hover
  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>, isEnter: boolean) => {
    const button = e.currentTarget
    if (isEnter) {
      gsap.to(button, {
        scale: 1.05,
        y: -3,
        boxShadow: "0 15px 35px rgba(255, 107, 107, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      })
    } else {
      gsap.to(button, {
        scale: 1,
        y: 0,
        boxShadow: "0 5px 15px rgba(255, 107, 107, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-bg relative overflow-hidden">
      <Navigation />
      
      {/* Circuit d'arrière-plan */}
      <div ref={circuitRef} className="absolute inset-0 pointer-events-none opacity-20"></div>
      
      {/* Overlay avec gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg via-transparent to-bg/90"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Code d'erreur principal */}
          <div ref={errorCodeRef} className="mb-8">
            <div className="inline-block p-8 bg-accent/10 border border-accent/30 rounded-2xl backdrop-blur-sm">
              <h1 className="text-6xl md:text-8xl font-bold text-accent font-space-mono glitch-text">
                ERROR
              </h1>
            </div>
          </div>

          {/* Message d'erreur */}
          <div className="error-content mb-6">
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-4 glitch-text">
              Quelque chose s&apos;est mal passé
            </h2>
          </div>

          <div className="error-content mb-8">
            <p className="text-text-dim text-lg leading-relaxed max-w-2xl mx-auto">
              Une erreur inattendue s&apos;est produite. Ne vous inquiétez pas, nos robots sont déjà en train de réparer ça ! 🤖
            </p>
          </div>

          {/* Détails techniques */}
          {error.message && (
            <div className="error-content mb-8">
              <details className="bg-bg/50 border border-border rounded-xl p-6 text-left max-w-2xl mx-auto backdrop-blur-sm">
                <summary className="cursor-pointer text-accent font-semibold mb-2 hover:text-accent/80 transition-colors">
                  Détails techniques
                </summary>
                <div className="mt-4 p-4 bg-bg/30 rounded-lg border border-border/50">
                  <p className="font-mono text-sm text-text-dim break-all">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="font-mono text-xs text-text-dim/60 mt-2">
                      Digest: {error.digest}
                    </p>
                  )}
                </div>
              </details>
            </div>
          )}

          {/* ASCII Art d'erreur */}
          <div className="error-content mb-12 font-mono text-accent/40 text-xs leading-tight">
            <pre>{`
    ┌─────────────────────────────────────────┐
    │  ⚠️  SYSTEM ERROR DETECTED            │
    │  🔧  Attempting automatic recovery...   │
    │  📡  Diagnostic mode activated         │
    └─────────────────────────────────────────┘
            `}</pre>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={reset}
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
              className="error-button group"
            >
              <div className="flex items-center gap-3 px-8 py-4 bg-accent text-bg font-semibold rounded-xl 
                           transform transition-all duration-300 shadow-lg border border-accent/20">
                <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-500" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Réessayer
              </div>
            </button>

            <button 
              onClick={() => window.location.href = '/'}
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
              className="error-button group"
            >
              <div className="flex items-center gap-3 px-8 py-4 bg-transparent text-accent font-semibold rounded-xl 
                           border-2 border-accent/30 hover:border-accent transition-all duration-300
                           hover:bg-accent/10">
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Retour à l&apos;accueil
              </div>
            </button>
          </div>

          {/* Console de débogage */}
          <div className="error-content mt-16">
            <div className="bg-bg/30 border border-border rounded-xl p-6 max-w-3xl mx-auto backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-text-dim text-sm font-mono">debug.console</span>
              </div>
              
              <div className="font-mono text-sm space-y-2">
                <div className="text-green-400">$ system.check()</div>
                <div className="text-text-dim">Checking components...</div>
                <div className="text-yellow-400">⚠️  Error detected in module</div>
                <div className="text-blue-400">💡 Recovery options available</div>
                <div className="text-green-400">✅ Backup systems operational</div>
                <div className="text-text-dim">$ _</div>
              </div>
            </div>
          </div>

          {/* Message rassurant */}
          <div className="error-content mt-12 p-6 bg-accent/5 border border-accent/20 rounded-xl max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🛠️</span>
              </div>
              <div className="text-left">
                <h4 className="text-accent font-semibold mb-2">Pas de panique !</h4>
                <p className="text-text-dim text-sm leading-relaxed">
                  Cette erreur a été automatiquement signalée. L&apos;équipe technique travaille déjà sur une solution. 
                  Essayez de rafraîchir la page ou revenez dans quelques minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}