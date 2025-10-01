'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useAnalytics } from '@/hooks/useAnalytics'

// Floating geometry component
function FloatingGeometry() {
  const shapes = [
    { width: 300, height: 300, top: '10%', left: '5%', delay: 0, rotate: 45 },
    { width: 200, height: 200, bottom: '10%', right: '10%', delay: 5, borderRadius: '50%' },
    { width: 150, height: 150, top: '50%', right: '5%', delay: 10 }
  ]

  return (
    <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
      {shapes.map((shape, index) => (
        <div
          key={index}
          className="absolute border border-white/10 animate-float"
          style={{
            width: shape.width,
            height: shape.height,
            top: shape.top,
            bottom: shape.bottom,
            left: shape.left,
            right: shape.right,
            transform: shape.rotate ? `rotate(${shape.rotate}deg)` : undefined,
            borderRadius: shape.borderRadius || '0',
            animationDelay: `${shape.delay}s`
          }}
        />
      ))}
    </div>
  )
}

// Availability badge component
function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 mt-8 px-5 py-2.5 bg-green-500/10 border border-green-500/30 rounded-[30px] opacity-0 availability-badge">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-dot" />
      <span className="text-xs uppercase tracking-[1px] text-green-400/80">
        Available for Projects
      </span>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const { trackSectionView } = useAnalytics()

  useEffect(() => {
    // Track hero section view
    trackSectionView('hero')

    const handleLoaderComplete = () => {
      // Hero Animation Timeline
      const tl = gsap.timeline()

      // Animate title words
      const titleSpans = titleRef.current?.querySelectorAll('span')
      if (titleSpans) {
        tl.to(titleSpans, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out"
        })
      }

      // Animate subtitle
      if (subtitleRef.current) {
        tl.to(subtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out"
        }, "-=0.5")
      }

      // Animate availability badge
      if (badgeRef.current) {
        tl.to(badgeRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power4.out"
        }, "-=0.5")
      }

      // Animate scroll indicator
      if (scrollIndicatorRef.current) {
        tl.to(scrollIndicatorRef.current, {
          opacity: 0.5,
          duration: 1
        }, "-=0.5")
      }
    }

    // Listen for loader completion
    window.addEventListener('loaderComplete', handleLoaderComplete)

    // Fallback in case loader event doesn't fire
    const fallbackTimer = setTimeout(handleLoaderComplete, 3000)

    return () => {
      window.removeEventListener('loaderComplete', handleLoaderComplete)
      clearTimeout(fallbackTimer)
    }
  }, [trackSectionView])

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <FloatingGeometry />

      <div className="text-center z-[2] relative">
        <h1
          ref={titleRef}
          className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-4px] mb-5 overflow-hidden"
        >
          <span className="inline-block opacity-0 translate-y-full">Maurice</span>
          <br />
          <span className="inline-block opacity-0 translate-y-full">Hermanns</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-[clamp(1rem,2vw,1.5rem)] text-text-dim font-space-mono tracking-[2px] opacity-0 translate-y-5"
        >
          Business Analyst & Digital Craftsman
        </p>

        <div ref={badgeRef}>
          <AvailabilityBadge />
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 font-space-mono text-xs tracking-[2px] uppercase opacity-0 animate-bounce-slow"
      >
        Scroll to explore
      </div>
    </section>
  )
}