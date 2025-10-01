import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ANIMATION_CONFIG, SCROLL_CONFIG } from './constants'
import type { GSAPAnimation, ScrollTriggerConfig } from '@/types'

// Initialisation GSAP optimisée pour performance
export const initGSAP = () => {
    gsap.registerPlugin(ScrollTrigger)

    // Configuration globale optimisée
    gsap.defaults({
        duration: ANIMATION_CONFIG.durations.normal,
        ease: ANIMATION_CONFIG.easing.power3,
        force3D: true, // Force GPU acceleration
        transformOrigin: "center center"
    })

    // Configuration ScrollTrigger pour performance
    ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
        ignoreMobileResize: true
    })

    // Optimisation refresh rate
    ScrollTrigger.refresh()
}

// Animation de fade in optimisée avec will-change
export const fadeInStagger = (
    elements: string | Element | Element[],
    config: GSAPAnimation & { trigger?: string | Element } = {}
) => {
    const {
        duration = ANIMATION_CONFIG.durations.normal,
        delay = 0,
        stagger = ANIMATION_CONFIG.stagger.cards,
        ease = ANIMATION_CONFIG.easing.power3,
        trigger
    } = config

    // Optimisation will-change pour GPU
    gsap.set(elements, { willChange: "transform, opacity" })

    const animation = gsap.fromTo(elements, {
        y: 30, // Réduction pour moins de layout shift
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease,
        force3D: true,
        onComplete: () => {
            // Nettoyer will-change après animation
            gsap.set(elements, { willChange: "auto" })
        },
        scrollTrigger: trigger ? {
            trigger,
            start: SCROLL_CONFIG.fadeStart
        } : undefined
    })

    return animation
}

// Animation de slide optimisée
export const slideInHorizontal = (
    elements: string | Element | Element[],
    direction: 'left' | 'right' = 'left',
    config: GSAPAnimation = {}
) => {
    const {
        duration = ANIMATION_CONFIG.durations.normal,
        delay = 0,
        ease = ANIMATION_CONFIG.easing.power3
    } = config

    const startX = direction === 'left' ? -50 : 50 // Réduction pour performance

    gsap.set(elements, { willChange: "transform, opacity" })

    return gsap.fromTo(elements, {
        x: startX,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration,
        delay,
        ease,
        force3D: true,
        onComplete: () => {
            gsap.set(elements, { willChange: "auto" })
        }
    })
}

// Animation de texte optimisée
export const animateText = (
    element: string | Element,
    config: GSAPAnimation = {}
) => {
    const {
        duration = ANIMATION_CONFIG.durations.slow,
        delay = 0,
        stagger = ANIMATION_CONFIG.stagger.text,
        ease = ANIMATION_CONFIG.easing.power3
    } = config

    const textElement = typeof element === 'string' ? document.querySelector(element) : element
    if (!textElement) return

    const text = textElement.textContent || ''

    // Optimisation: utiliser DocumentFragment pour éviter reflows
    const fragment = document.createDocumentFragment()
    text.split('').forEach(char => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        fragment.appendChild(span)
    })

    textElement.innerHTML = ''
    textElement.appendChild(fragment)

    const chars = textElement.querySelectorAll('span')
    gsap.set(chars, { willChange: "transform, opacity" })

    return gsap.fromTo(chars, {
        y: 50,
        opacity: 0,
        rotationX: 45
    }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration,
        delay,
        stagger,
        ease,
        force3D: true,
        onComplete: () => {
            gsap.set(chars, { willChange: "auto" })
        }
    })
}

// Animation magnétique optimisée avec throttling
export const createMagneticEffect = (
    element: Element,
    strength: number = 0.3
) => {
    let isAnimating = false

    const handleMouseMove = (e: Event) => {
        if (isAnimating) return

        isAnimating = true
        requestAnimationFrame(() => {
            const mouseEvent = e as MouseEvent
            const rect = element.getBoundingClientRect()
            const x = mouseEvent.clientX - (rect.left + rect.width / 2)
            const y = mouseEvent.clientY - (rect.top + rect.height / 2)

            gsap.to(element, {
                x: x * strength,
                y: y * strength,
                duration: 0.3,
                ease: ANIMATION_CONFIG.easing.power2,
                force3D: true,
                onComplete: () => {
                    isAnimating = false
                }
            })
        })
    }

    const handleMouseLeave = () => {
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: ANIMATION_CONFIG.easing.elastic,
            force3D: true
        })
    }

    element.addEventListener('mousemove', handleMouseMove, { passive: true })
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
    }
}

// Animation de scroll horizontal optimisée
export const createHorizontalScroll = (
    container: string | Element,
    config: Partial<ScrollTriggerConfig> & { width?: number } = {}
) => {
    const {
        trigger,
        start = SCROLL_CONFIG.pinStart,
        end,
        scrub = 1,
        pin = true,
        width
    } = config

    const containerElement = typeof container === 'string' ?
        document.querySelector(container) : container

    if (!containerElement || !trigger) return

    const scrollWidth = width || containerElement.scrollWidth
    const viewportWidth = window.innerWidth

    // Optimisation GPU
    gsap.set(containerElement, { willChange: "transform" })

    const animation = gsap.to(containerElement, {
        x: -(scrollWidth - viewportWidth),
        ease: "none",
        force3D: true,
        scrollTrigger: {
            trigger,
            start,
            end: end || `+=${scrollWidth}`,
            scrub,
            pin,
            anticipatePin: 1,
            onLeave: () => {
                gsap.set(containerElement, { willChange: "auto" })
            },
            onEnterBack: () => {
                gsap.set(containerElement, { willChange: "transform" })
            }
        }
    })

    return animation
}

// Nettoyage optimisé des ScrollTriggers
export const cleanupScrollTriggers = () => {
    ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill()
    })
    ScrollTrigger.clearMatchMedia()
    ScrollTrigger.refresh()
}