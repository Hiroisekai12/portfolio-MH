'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
  {
    number: '01',
    title: 'MindFit App',
    description: 'Mental well-being application designed for enterprises. B2B platform with emotion tracking, team analytics dashboard, and psychological support features.',
    tags: ['Ionic', 'Angular', 'Firebase', 'B2B', 'Analytics']
  },
  {
    number: '02',
    title: 'Digital Transformation',
    description: 'Complete digital strategy and website development for local business. Achieved perfect SEO score and significantly improved online visibility.',
    tags: ['Next.js', 'Supabase', 'GSAP', 'SEO', 'Strategy']
  },
  {
    number: '03',
    title: 'Business Intelligence Dashboard',
    description: 'Advanced analytics platform for real-time business metrics. Interactive visualizations, predictive analytics, and automated reporting system.',
    tags: ['Power BI', 'SQL', 'Data Viz', 'Python']
  },
  {
    number: '04',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with modern UI, secure payment processing, inventory management, and customer analytics.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    number: '05',
    title: 'JOY Brussels Campaign',
    description: 'Digital marketing campaign with Google Ads optimization. Increased local brand visibility by 250% and improved conversion rates.',
    tags: ['Google Ads', 'SEA', 'Analytics', 'Marketing']
  }
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    // Animation d'entrée des projets
    const projectItems = sectionRef.current.querySelectorAll('.project-item')
    projectItems.forEach((item) => {
      gsap.fromTo(item, {
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: item,
          start: "top 80%"
        },
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      })
    })

    // Animations smooth sur hover avec GSAP
    projectItems.forEach((item) => {
      const projectContent = item.querySelector('.project-content')
      const projectNumber = item.querySelector('.project-number')
      const projectTitle = item.querySelector('.project-title')
      const projectDescription = item.querySelector('.project-description')
      const projectTags = item.querySelector('.project-tags')
      const tags = item.querySelectorAll('.tag')
      const projectArrow = item.querySelector('.project-arrow')
      
      const tl = gsap.timeline({ paused: true })
      
      // Animation en cascade avec délais progressifs
      tl.to(projectContent, {
        y: -8,
        duration: 0.8,
        ease: "power2.out"
      }, 0.1)
      .to(projectNumber, {
        x: 8,
        duration: 0.8,
        ease: "power2.out"
      }, 0.2)
      .to(projectTitle, {
        x: 12,
        duration: 0.8,
        ease: "power2.out"
      }, 0.3)
      .to(projectDescription, {
        x: 10,
        duration: 0.8,
        ease: "power2.out"
      }, 0.4)
      .to(projectTags, {
        x: 15,
        duration: 0.8,
        ease: "power2.out"
      }, 0.5)
      .to(tags, {
        y: -4,
        scale: 1.05,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out"
      }, 0.6)
      .to(projectArrow, {
        x: 20,
        rotation: 360,
        scale: 1.15,
        duration: 1,
        ease: "power2.out"
      }, 0.9)
      
      item.addEventListener('mouseenter', () => tl.play())
      item.addEventListener('mouseleave', () => tl.reverse())
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-36">
      <div className="px-12 max-w-[1400px] mx-auto mb-24">
        <div className="text-sm tracking-[3px] uppercase text-text-dim mb-12 font-space-mono">
          007 / Selected Work
        </div>
      </div>
      
      {projects.map((project) => (
        <div
          key={project.number}
          className="project-item py-20 px-12 border-t border-border relative overflow-hidden group"
        >
          {/* Hover background effect */}
          <div className="absolute top-0 -left-full w-full h-full bg-accent transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:left-0 -z-10" />
          
          <div className="project-content max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <div className="project-number font-space-mono text-sm text-text-dim mb-2.5 group-hover:text-bg">
                {project.number}
              </div>
              <h3 className="project-title text-[clamp(2rem,4vw,3.5rem)] font-semibold mb-4 tracking-[-1px] group-hover:text-bg">
                {project.title}
              </h3>
              <p className="project-description text-base text-text-dim leading-relaxed mb-5 max-w-[600px] group-hover:text-bg">
                {project.description}
              </p>
              <div className="project-tags flex gap-4 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag px-4 py-1 border border-border rounded-[20px] text-xs uppercase tracking-[1px] group-hover:border-bg group-hover:bg-bg/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-arrow text-5xl hidden lg:block group-hover:text-bg">
              →
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}