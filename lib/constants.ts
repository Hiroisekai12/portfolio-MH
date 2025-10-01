// Configuration des animations GSAP
export const ANIMATION_CONFIG = {
  durations: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    loading: 2.5
  },
  easing: {
    power1: "power1.out",
    power2: "power2.out", 
    power3: "power3.out",
    elastic: "elastic.out(1, 0.3)",
    back: "back.out(1.7)",
    bounce: "bounce.out"
  },
  stagger: {
    cards: 0.2,
    text: 0.05,
    tags: 0.08,
    nav: 0.1
  }
} as const

// Configuration du curseur magnétique
export const CURSOR_CONFIG = {
  size: 40,
  followSpeed: 0.8,
  magneticStrength: 0.3,
  hoverScale: 1.5
} as const

// Configuration ScrollTrigger
export const SCROLL_CONFIG = {
  start: "top 80%",
  end: "bottom 20%",
  fadeStart: "top 85%",
  pinStart: "top top"
} as const

// Configuration responsive
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  xl: 1536
} as const

// Configuration couleurs
export const COLORS = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  text: "var(--text)",
  textDim: "var(--text-dim)",
  border: "var(--border)"
} as const