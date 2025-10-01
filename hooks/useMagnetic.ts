'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface MagneticOptions {
  strength?: number
  duration?: number
  ease?: string
}

export function useMagnetic(options: MagneticOptions = {}) {
  const elementRef = useRef<HTMLElement>(null)
  const { strength = 0.3, duration = 0.3, ease = 'power2.out' } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration,
        ease
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration,
        ease
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, duration, ease])

  return elementRef
}