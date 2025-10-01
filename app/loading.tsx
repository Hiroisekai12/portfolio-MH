'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loading() {
    const containerRef = useRef<HTMLDivElement>(null)
    const loadingCircleRef = useRef<HTMLDivElement>(null)
    const dotsRef = useRef<HTMLDivElement>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Animation du cercle de chargement principal
        if (loadingCircleRef.current) {
            gsap.to(loadingCircleRef.current, {
                rotation: 360,
                duration: 2,
                repeat: -1,
                ease: "none"
            })

            // Animation de pulsation
            gsap.to(loadingCircleRef.current, {
                scale: 1.1,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            })
        }

        // Animation des points de chargement
        if (dotsRef.current) {
            const dots = dotsRef.current.children
            gsap.fromTo(Array.from(dots), {
                y: 0,
                opacity: 0.3
            }, {
                y: -10,
                opacity: 1,
                duration: 0.6,
                stagger: 0.2,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            })
        }

        // Animation de la barre de progression
        if (progressBarRef.current) {
            gsap.fromTo(progressBarRef.current, {
                scaleX: 0
            }, {
                scaleX: 1,
                duration: 3,
                repeat: -1,
                ease: "power2.inOut"
            })
        }

        // Animation d'entrée du container
        gsap.fromTo(containerRef.current, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        })

        // Création de particules flottantes
        const createParticles = () => {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div')
                particle.className = 'absolute w-1 h-1 bg-accent/30 rounded-full'
                particle.style.left = Math.random() * 100 + '%'
                particle.style.top = Math.random() * 100 + '%'
                containerRef.current?.appendChild(particle)

                gsap.to(particle, {
                    y: -100,
                    x: (Math.random() - 0.5) * 100,
                    opacity: 0,
                    duration: Math.random() * 3 + 2,
                    repeat: -1,
                    delay: Math.random() * 2,
                    ease: "power2.out"
                })
            }
        }

        createParticles()

        // Animation de respiration du fond
        gsap.to('.breathing-bg', {
            scale: 1.05,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        })

    }, [])

    return (
        <div ref={containerRef} className="fixed inset-0 bg-bg z-50 flex items-center justify-center overflow-hidden">
            {/* Fond avec effet de respiration */}
            <div className="breathing-bg absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10"></div>

            {/* Grille d'arrière-plan */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `
                 linear-gradient(rgba(255, 107, 107, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255, 107, 107, 0.1) 1px, transparent 1px)
               `,
                        backgroundSize: '30px 30px'
                    }}>
                </div>
            </div>

            <div className="relative z-10 text-center">
                {/* Cercle de chargement principal */}
                <div className="relative mb-8">
                    <div
                        ref={loadingCircleRef}
                        className="w-24 h-24 mx-auto border-4 border-border border-t-accent rounded-full"
                    ></div>

                    {/* Cercle intérieur */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-accent/30 border-b-accent rounded-full animate-spin"
                            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
                        </div>
                    </div>

                    {/* Point central */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Texte de chargement */}
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
                        Chargement en cours
                    </h2>
                    <p className="text-text-dim">
                        Préparation de votre expérience...
                    </p>
                </div>

                {/* Points de chargement animés */}
                <div ref={dotsRef} className="flex justify-center gap-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="w-3 h-3 bg-accent rounded-full"
                        ></div>
                    ))}
                </div>

                {/* Barre de progression */}
                <div className="w-64 h-1 bg-border rounded-full mx-auto mb-8 overflow-hidden">
                    <div
                        ref={progressBarRef}
                        className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full origin-left"
                    ></div>
                </div>

                {/* Messages de chargement */}
                <div className="space-y-2 text-sm text-text-dim">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Initialisation des composants...</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span>Chargement des animations...</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>Configuration de l&apos;interface...</span>
                    </div>
                </div>

                {/* ASCII Art de chargement */}
                <div className="mt-12 font-mono text-accent/40 text-xs leading-tight">
                    <pre>{`
    ┌─────────────────────────────────┐
    │  🚀  Portfolio Loading...       │
    │  ⚡  Optimizing performance...  │
    │  ✨  Almost ready!             │
    └─────────────────────────────────┘
          `}</pre>
                </div>

                {/* Indicateur technique */}
                <div className="mt-8 flex justify-center">
                    <div className="bg-bg/50 border border-border rounded-lg px-4 py-2 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                            <span className="text-text-dim text-xs font-mono">system.loading</span>
                        </div>
                    </div>
                </div>

                {/* Conseils pendant le chargement */}
                <div className="mt-12 max-w-md mx-auto">
                    <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-accent text-xs">💡</span>
                            </div>
                            <div className="text-left">
                                <h4 className="text-accent font-semibold text-sm mb-1">Le saviez-vous ?</h4>
                                <p className="text-text-dim text-xs leading-relaxed">
                                    Ce portfolio utilise les dernières technologies web pour une expérience optimale.
                                    Merci de votre patience ! ⚡
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}