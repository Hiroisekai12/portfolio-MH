'use client'

import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin)
}

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLinkClick = (href: string) => {
    const target = document.querySelector(href)
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: target,
        ease: "power3.inOut"
      })
    }
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-8 z-[1000] mix-blend-difference">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter text-white">MH</div>
          <ul className="hidden md:flex gap-10 list-none">
            <li><a href="#about" className="text-white text-sm tracking-wider uppercase font-medium hover:text-accent transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full" onClick={(e) => { e.preventDefault(); handleLinkClick('#about') }}>About</a></li>
            <li><a href="#projects" className="text-white text-sm tracking-wider uppercase font-medium hover:text-accent transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full" onClick={(e) => { e.preventDefault(); handleLinkClick('#projects') }}>Work</a></li>
            <li><a href="#contact" className="text-white text-sm tracking-wider uppercase font-medium hover:text-accent transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact') }}>Contact</a></li>
          </ul>
          <div className={`flex md:hidden flex-col gap-1.5 cursor-pointer z-[1001] ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <span className={`w-8 h-0.5 bg-accent transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-8 h-0.5 bg-accent transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </div>
        </div>
      </nav>

      <div className={`fixed top-0 left-0 w-full h-screen bg-bg/95 backdrop-blur-lg z-[1002] flex items-center justify-center transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <ul className="text-center space-y-8">
          <li><a href="#about" className="text-4xl text-text hover:text-accent transition-colors duration-300" onClick={(e) => { e.preventDefault(); handleLinkClick('#about') }}>About</a></li>
          <li><a href="#projects" className="text-4xl text-text hover:text-accent transition-colors duration-300" onClick={(e) => { e.preventDefault(); handleLinkClick('#projects') }}>Work</a></li>
          <li><a href="#contact" className="text-4xl text-text hover:text-accent transition-colors duration-300" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact') }}>Contact</a></li>
        </ul>
      </div>
    </>
  )
}
