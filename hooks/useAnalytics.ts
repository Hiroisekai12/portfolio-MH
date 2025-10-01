'use client'

import { track } from '@vercel/analytics'

// Types pour les événements personnalisés
type PortfolioEvent = 
  | 'project_view'
  | 'contact_form_submit'
  | 'cv_download'
  | 'section_view'
  | 'external_link_click'
  | 'magnetic_cursor_interaction'

interface EventProperties {
  section?: string
  project?: string
  technology?: string
  url?: string
  form_type?: string
  format?: string
  element?: string
  context?: string
  [key: string]: string | number | boolean | undefined
}

export function useAnalytics() {
  const trackEvent = (event: PortfolioEvent, properties?: EventProperties) => {
    // Track seulement en production
    if (process.env.NODE_ENV === 'production') {
      // Filtrer les valeurs undefined et s'assurer du bon type pour Vercel Analytics
      if (properties) {
        const cleanProperties: Record<string, string | number | boolean> = {}
        Object.entries(properties).forEach(([key, value]) => {
          if (value !== undefined) {
            cleanProperties[key] = value
          }
        })
        track(event, cleanProperties)
      } else {
        track(event)
      }
    } else {
      console.log(`📊 Analytics Event: ${event}`, properties)
    }
  }

  const trackProjectView = (projectName: string, technology?: string) => {
    trackEvent('project_view', {
      project: projectName,
      technology: technology
    })
  }

  const trackSectionView = (sectionName: string) => {
    trackEvent('section_view', {
      section: sectionName
    })
  }

  const trackContactSubmit = (formType: 'contact' | 'newsletter') => {
    trackEvent('contact_form_submit', {
      form_type: formType
    })
  }

  const trackExternalLink = (url: string, context: string) => {
    trackEvent('external_link_click', {
      url: url,
      context: context
    })
  }

  const trackCVDownload = (format: 'pdf' | 'doc') => {
    trackEvent('cv_download', {
      format: format
    })
  }

  const trackMagneticInteraction = (element: string) => {
    trackEvent('magnetic_cursor_interaction', {
      element: element
    })
  }

  return {
    trackEvent,
    trackProjectView,
    trackSectionView,
    trackContactSubmit,
    trackExternalLink,
    trackCVDownload,
    trackMagneticInteraction
  }
}