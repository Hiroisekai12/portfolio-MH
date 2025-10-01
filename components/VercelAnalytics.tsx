'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { useEffect } from 'react'

export default function VercelAnalytics() {
  useEffect(() => {
    // Log que les analytics sont initialisés en mode développement
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Vercel Analytics & Speed Insights initialized')
    }
  }, [])

  return (
    <>
      {/* Vercel Analytics - Track page views and user interactions */}
      <Analytics />
      
      {/* Speed Insights - Monitor Core Web Vitals and performance metrics */}
      <SpeedInsights />
    </>
  )
}