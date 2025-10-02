import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import ClientCursor from '@/components/ClientCursor'
import Loader from '@/components/Loader'
import Analytics from '@/components/Analytics'
import VercelAnalytics from '@/components/VercelAnalytics'

// Optimisation des fonts avec preload et display optimal
const inter = Inter({
  subsets: ['latin'],
  display: 'optional',
  preload: true,
  variable: '--font-inter',
  adjustFontFallback: true
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'optional',
  preload: true,
  variable: '--font-space-grotesk',
  adjustFontFallback: true
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'optional',
  preload: true,
  variable: '--font-space-mono',
  adjustFontFallback: true
})

// Configuration viewport optimisée pour mobile
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  viewportFit: 'cover'
}

// Métadonnées SEO complètes
export const metadata: Metadata = {
  metadataBase: new URL('https://maurice-hermanns.com'),
  title: {
    default: 'Maurice Hermanns - Business Data Analyst & Web Developer',
    template: '%s | Maurice Hermanns'
  },
  description: 'Maurice Hermanns - Spécialiste en analyse de données business et développement web. Freelance expert en analytics, machine learning et transformation digitale.',
  keywords: [
    'Maurice Hermanns',
    'Business Data Analyst',
    'Data Analyst',
    'Web Developer',
    'Freelance',
    'Analytics',
    'Machine Learning',
    'Business Intelligence',
    'Data Science',
    'Digital Transformation',
    'React',
    'Next.js',
    'TypeScript',
    'GSAP',
    'Portfolio'
  ],
  authors: [{ name: 'Maurice Hermanns', url: 'https://maurice-hermanns.com' }],
  creator: 'Maurice Hermanns',
  publisher: 'Maurice Hermanns',
  category: 'Technology',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US'],
    url: 'https://maurice-hermanns.com',
    title: 'Maurice Hermanns - Business Data Analyst & Web Developer',
    description: 'Spécialiste en analyse de données business et développement web. Expert en analytics, machine learning et transformation digitale.',
    siteName: 'Maurice Hermanns Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Maurice Hermanns - Portfolio',
        type: 'image/jpeg'
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Maurice Hermanns - Business Data Analyst & Web Developer',
    description: 'Spécialiste en analyse de données business et développement web.',
    creator: '@mauricehermanns',
    images: ['/twitter-image.jpg']
  },

  // Robots et indexation
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  // Liens canoniques et alternates
  alternates: {
    canonical: 'https://maurice-hermanns.com',
    languages: {
      'fr-FR': 'https://maurice-hermanns.com',
      'en-US': 'https://maurice-hermanns.com/en'
    }
  },

  // Vérifications
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code'
    }
  }
}

// Données structurées JSON-LD
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Maurice Hermanns',
  jobTitle: 'Business Data Analyst & Web Developer',
  description: 'Spécialiste en analyse de données business et développement web',
  url: 'https://maurice-hermanns.com',
  image: 'https://maurice-hermanns.com/maurice-hermanns.jpg',
  sameAs: [
    'https://linkedin.com/in/maurice-hermanns',
    'https://github.com/maurice-hermanns'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance'
  },
  knowsAbout: [
    'Business Data Analysis',
    'Machine Learning',
    'Web Development',
    'Business Intelligence',
    'Digital Transformation'
  ],
  offers: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Business Data Analysis & Web Development Services'
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <head>
        {/* Préchargement des ressources critiques */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

        {/* Manifest PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Données structurées */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <VercelAnalytics />
        <Loader />
        <ClientCursor />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
