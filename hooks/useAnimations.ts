import { useEffect, useRef } from 'react'
import { initGSAP, fadeInStagger, cleanupScrollTriggers } from '@/lib/animations'
import type { GSAPAnimation } from '@/types'

// Hook pour initialiser GSAP
export const useGSAP = () => {
    useEffect(() => {
        initGSAP()

        return () => {
            cleanupScrollTriggers()
        }
    }, [])
}

// Hook pour animation de fade in avec ScrollTrigger
export const useFadeInAnimation = (
    trigger?: string,
    config: GSAPAnimation = {}
) => {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const elements = Array.from(ref.current.querySelectorAll('[data-animate]'))
        if (elements.length === 0) return

        fadeInStagger(elements, {
            ...config,
            trigger: trigger || ref.current
        })

        return () => {
            cleanupScrollTriggers()
        }
    }, [trigger, config])

    return ref
}

// Hook pour animations custom avec nettoyage automatique
export const useCustomAnimation = (
    animationFn: () => void,
    dependencies: any[] = []
) => {
    useEffect(() => {
        animationFn()

        return () => {
            cleanupScrollTriggers()
        }
    }, dependencies)
}