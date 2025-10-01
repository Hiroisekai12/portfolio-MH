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
      <nav>
        <div className="nav-container">
          <div className="logo magnetic">MH</div>
          <ul className="nav-links">
            <li><a href="#about" className="magnetic" onClick={(e) => { e.preventDefault(); handleLinkClick('#about') }}>About</a></li>
            <li><a href="#projects" className="magnetic" onClick={(e) => { e.preventDefault(); handleLinkClick('#projects') }}>Work</a></li>
            <li><a href="#contact" className="magnetic" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact') }}>Contact</a></li>
          </ul>
          <div className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); handleLinkClick('#about') }}>About</a></li>
          <li><a href="#projects" onClick={(e) => { e.preventDefault(); handleLinkClick('#projects') }}>Work</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact') }}>Contact</a></li>
        </ul>
      </div>
    </>
  )
}
