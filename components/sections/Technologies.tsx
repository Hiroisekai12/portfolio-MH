'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const techCategories = [
  {
    title: 'Development',
    tags: ['JavaScript', 'Node.js', 'Next.js', 'React', 'Python', 'SQL', 'MongoDB', 'Supabase']
  },
  {
    title: 'Design & Creative',
    tags: ['Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro', 'Figma', 'After Effects']
  },
  {
    title: 'Business & Analytics',
    tags: ['Power BI', 'Excel', 'Tableau', 'Google Analytics', 'SEO/SEA', 'Agile/Scrum']
  }
]

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const categories = sectionRef.current.querySelectorAll('.tech-category')
    categories.forEach((category, index) => {
      gsap.to(category, {
        scrollTrigger: {
          trigger: category,
          start: "top 80%"
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out"
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="px-12 py-36 max-w-[1400px] mx-auto">
      <div className="text-sm tracking-[3px] uppercase text-text-dim mb-12 font-space-mono">
        002 / Technologies
      </div>
      
      <div className="grid gap-20">
        {techCategories.map((category, index) => (
          <div key={category.title} className="tech-category opacity-0 translate-y-8">
            <h3 className="text-2xl text-text-dim font-normal mb-6">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-4">
              {category.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-2.5 border border-border rounded-[30px] text-sm transition-all duration-300 hover:bg-accent hover:text-bg hover:-translate-y-1 cursor-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}