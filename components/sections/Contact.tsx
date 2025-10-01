'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const contactLinks = [
  { label: 'Email', href: 'mailto:mauricehermanns2@gmail.com' },
  { label: 'Call', href: 'tel:+32477244528' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/maurice-herm' },
  { label: 'GitHub', href: 'https://github.com/Hiroisekai12' },
  { label: 'Download CV', href: '#' }
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    // Animate title
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out"
      })
    }

    // Animate contact details
    if (detailsRef.current) {
      gsap.to(detailsRef.current, {
        scrollTrigger: {
          trigger: detailsRef.current,
          start: "top 80%"
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      })
    }

    // Animate contact links
    const links = linksRef.current?.querySelectorAll('.contact-link')
    if (links) {
      gsap.to(links, {
        scrollTrigger: {
          trigger: linksRef.current,
          start: "top 80%"
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="px-12 py-36 max-w-[1400px] mx-auto text-center">
      <div className="text-sm tracking-[3px] uppercase text-text-dim mb-12 font-space-mono">
        010 / Get in Touch
      </div>
      
      <h2 
        ref={titleRef}
        className="text-[clamp(3rem,8vw,6rem)] font-bold tracking-[-2px] mb-12 opacity-0 translate-y-12"
      >
        Let&apos;s Create Together
      </h2>
      
      <div className="mb-12">
        <div 
          ref={detailsRef}
          className="flex justify-center gap-12 flex-wrap font-space-mono text-sm text-text-dim opacity-0 translate-y-5"
        >
          <p className="flex items-center gap-2.5">
            📧 mauricehermanns2@gmail.com
          </p>
          <p className="flex items-center gap-2.5">
            📱 +32 477 24 45 28
          </p>
          <p className="flex items-center gap-2.5">
            📍 Brussels, Belgium
          </p>
        </div>
      </div>
      
      <div ref={linksRef} className="flex gap-12 justify-center flex-wrap">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="contact-link text-xl text-text no-underline relative opacity-0 translate-y-8 magnetic hover-underline-contact"
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style jsx>{`
        .hover-underline-contact::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent);
          transition: width 0.3s;
        }
        
        .hover-underline-contact:hover::after {
          width: 100%;
        }
      `}</style>
    </section>
  )
}