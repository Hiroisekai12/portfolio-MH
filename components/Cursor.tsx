'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    
    if (!cursor || !dot) return

    const handleMouseMove = (e: MouseEvent) => {
      gsap.set(cursor, {
        left: e.clientX - 20,
        top: e.clientY - 20
      })
      gsap.set(dot, {
        left: e.clientX,
        top: e.clientY
      })
    }

    const addHoverEffect = () => {
      gsap.to(cursor, {
        scale: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        duration: 0.2
      })
    }

    const removeHoverEffect = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        duration: 0.2
      })
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-item, .magnetic')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', addHoverEffect)
      el.addEventListener('mouseleave', removeHoverEffect)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverEffect)
        el.removeEventListener('mouseleave', removeHoverEffect)
      })
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed w-10 h-10 border border-accent rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-200"
        style={{ top: 0, left: 0 }}
      />
      
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="fixed w-1 h-1 bg-accent rounded-full pointer-events-none z-[10000] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
        style={{ top: 0, left: 0 }}
      />
    </>
  )
}