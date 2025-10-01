'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loader = loaderRef.current
    const text = textRef.current
    
    if (!loader || !text) return

    // Prevent scroll during loading
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline()
    
    tl.to(text, {
      text: "Welcome",
      duration: 1,
      ease: "power2.inOut"
    })
    .to(loader, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      delay: 0.5,
      onComplete: () => {
        if (loader) {
          loader.style.display = 'none'
          loader.style.visibility = 'hidden'
          loader.style.pointerEvents = 'none'
        }
        document.body.style.overflow = 'visible'
        document.body.style.overflowX = 'hidden'
        
        // Dispatch custom event to signal loader completion
        window.dispatchEvent(new CustomEvent('loaderComplete'))
      }
    })

    // Fallback to ensure scroll is enabled
    const fallbackTimer = setTimeout(() => {
      if (loader && loader.style.display !== 'none') {
        loader.style.display = 'none'
        document.body.style.overflow = 'visible'
        window.dispatchEvent(new CustomEvent('loaderComplete'))
      }
    }, 3000)

    return () => {
      clearTimeout(fallbackTimer)
      document.body.style.overflow = 'visible'
    }
  }, [])

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-screen bg-bg z-[10000] flex items-center justify-center pointer-events-auto"
    >
      <div
        ref={textRef}
        className="text-5xl font-bold tracking-[-2px] text-text"
      >
        Loading
      </div>
    </div>
  )
}