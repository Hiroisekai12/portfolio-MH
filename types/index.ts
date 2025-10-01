// Types globaux pour le portfolio
export interface Project {
    number: string
    title: string
    description: string
    tags: string[]
    link?: string
    image?: string
    status?: 'active' | 'completed' | 'upcoming'
}

export interface Goal {
    year: string
    title: string
    description: string
    status?: 'active' | 'upcoming' | 'future'
}

export interface Experience {
    year: string
    company: string
    position: string
    description: string
    technologies: string[]
    location?: string
}

export interface Certification {
    title: string
    issuer: string
    date: string
    image?: string
    link?: string
}

export interface Language {
    name: string
    level: string
    percentage: number
    flag?: string
}

export interface Technology {
    name: string
    category: 'frontend' | 'backend' | 'database' | 'tools' | 'design'
    level: number
    icon?: string
}

export interface ContactForm {
    name: string
    email: string
    message: string
    subject?: string
}

export interface NavigationItem {
    name: string
    href: string
    index: string
}

// Types pour les animations GSAP
export interface GSAPAnimation {
    duration?: number
    delay?: number
    ease?: string
    stagger?: number
}

export interface ScrollTriggerConfig {
    trigger: string | Element
    start?: string
    end?: string
    scrub?: boolean | number
    pin?: boolean
    toggleActions?: string
}

// Types pour les hooks personnalisés
export interface MagneticConfig {
    strength?: number
    duration?: number
    ease?: string
}

export interface CursorConfig {
    size?: number
    followSpeed?: number
    magneticStrength?: number
}