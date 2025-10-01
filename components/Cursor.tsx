'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Vérifier si on est côté client et si on a un appareil avec souris
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return // Pas de curseur personnalisé sur mobile/tablette
    }

    const cursor = cursorRef.current
    const dot = dotRef.current

    if (!cursor || !dot) return

    // Initialiser la position du curseur
    gsap.set([cursor, dot], { opacity: 0 })

    const handleMouseMove = (e: MouseEvent) => {
      gsap.set(cursor, {
        left: e.clientX - 20,
        top: e.clientY - 20,
        opacity: 1
      })
      gsap.set(dot, {
        left: e.clientX - 3,
        top: e.clientY - 3,
        opacity: 1
      })
    }

    const addHoverEffect = () => {
      if (!cursor) return
      gsap.to(cursor, {
        scale: 2,
        backgroundColor: 'rgba(255,107,107,0.1)',
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const removeHoverEffect = () => {
      if (!cursor) return
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: "power2.out"
      })
    }

    // Délai pour s'assurer que le DOM est chargé
    const timer = setTimeout(() => {
      // Add event listeners
      document.addEventListener('mousemove', handleMouseMove, { passive: true })

      // Add hover effects to interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .project-item, .magnetic, [role="button"]')
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', addHoverEffect, { passive: true })
        el.addEventListener('mouseleave', removeHoverEffect, { passive: true })
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousemove', handleMouseMove)
      const interactiveElements = document.querySelectorAll('a, button, .project-item, .magnetic, [role="button"]')
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverEffect)
        el.removeEventListener('mouseleave', removeHoverEffect)
      })
    }
  }, [])

  // Ne pas afficher le curseur sur mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed w-10 h-10 border border-accent rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-200 opacity-0"
        style={{ top: 0, left: 0 }}
      />

      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="fixed w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[9999] opacity-0"
        style={{ top: 0, left: 0 }}
      />
    </>
  )
}