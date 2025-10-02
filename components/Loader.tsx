'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loader = loaderRef.current
    const text = textRef.current

    if (!loader || !text) return

    // Évite une double exécution en mode Strict (dev)
    if (loader.style.display === 'none') return

    // Prevent scroll during loading
    document.body.classList.add('overflow-hidden')

    // Enregistrer le plugin nécessaire à l'animation du texte
    gsap.registerPlugin(TextPlugin)

    const tl = gsap.timeline()

    // Sécuriser l'animation texte: si le plugin n'est pas dispo, on remplace par un simple set
    try {
      tl.to(text, {
        text: 'Welcome',
        duration: 1,
        ease: 'power2.inOut'
      })
    } catch {
      text.textContent = 'Welcome'
      tl.to(text, { opacity: 1, duration: 0.3 })
    }

    tl.to(loader, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.3,
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

    // Fallback to ensure scroll is enabled (plus rapide)
    const fallbackTimer = setTimeout(() => {
      if (loader && loader.style.display !== 'none') {
        loader.style.display = 'none'
        document.body.classList.remove('overflow-hidden')
        document.body.style.overflow = 'visible'
        window.dispatchEvent(new CustomEvent('loaderComplete'))
      }
    }, 1500)

    return () => {
      clearTimeout(fallbackTimer)
      document.body.classList.remove('overflow-hidden')
      document.body.style.overflow = 'visible'
      try { tl.kill() } catch { }
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