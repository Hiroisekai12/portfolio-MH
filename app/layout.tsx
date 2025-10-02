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

// Métadonnées SEO optimisées pour clients et entreprises
export const metadata: Metadata = {
  metadataBase: new URL('https://www.maurice-hermanns.com'),
  title: {
    default: 'Maurice Hermanns | Business Data Analyst & Full-Stack Developer',
    template: '%s | Maurice Hermanns'
  },
  description: 'Transform your business with data-driven insights and modern web solutions. Freelance Business Data Analyst & Full-Stack Developer specializing in analytics, machine learning, and digital transformation. Available for projects in Brussels & remote.',
  keywords: [
    'Maurice Hermanns',
    'Business Data Analyst',
    'Full-Stack Developer',
    'Freelance Developer Brussels',
    'Data Analytics Expert',
    'Web Development Services',
    'Machine Learning Consultant',
    'Business Intelligence',
    'Digital Transformation',
    'Next.js Developer',
    'React Developer',
    'TypeScript Expert',
    'Data Visualization',
    'Python Data Analysis',
    'Freelance Belgium',
    'EPHEC Brussels'
  ],
  authors: [{ name: 'Maurice Hermanns', url: 'https://www.maurice-hermanns.com' }],
  creator: 'Maurice Hermanns',
  publisher: 'Maurice Hermanns',
  category: 'Technology',

  // Open Graph optimisé pour partage professionnel
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR', 'nl_BE'],
    url: 'https://www.maurice-hermanns.com',
    title: 'Maurice Hermanns | Data-Driven Solutions & Modern Web Development',
    description: 'Freelance Business Data Analyst & Full-Stack Developer. I help businesses make smarter decisions through data analytics and build exceptional digital experiences with modern web technologies.',
    siteName: 'Maurice Hermanns - Professional Portfolio',
    images: [
      {
        url: 'https://www.maurice-hermanns.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Maurice Hermanns - Business Data Analyst & Full-Stack Developer',
        type: 'image/jpeg'
      }
    ]
  },

  // Twitter Card optimisé
  twitter: {
    card: 'summary_large_image',
    title: 'Maurice Hermanns | Data Analyst & Developer',
    description: 'Transform your business with data-driven insights and modern web solutions. Available for freelance projects.',
    creator: '@mauricehermanns',
    images: ['https://www.maurice-hermanns.com/twitter-image.jpg']
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
    canonical: 'https://www.maurice-hermanns.com',
    languages: {
      'en-US': 'https://www.maurice-hermanns.com',
      'fr-FR': 'https://www.maurice-hermanns.com/fr',
      'nl-BE': 'https://www.maurice-hermanns.com/nl'
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

// Données structurées JSON-LD optimisées pour SEO professionnel
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Maurice Hermanns',
  jobTitle: 'Business Data Analyst & Full-Stack Developer',
  description: 'Freelance Business Data Analyst and Full-Stack Developer specializing in data-driven insights, machine learning, and modern web applications. Based in Brussels, Belgium.',
  url: 'https://www.maurice-hermanns.com',
  image: 'https://www.maurice-hermanns.com/maurice-profile.jpg',
  sameAs: [
    'https://www.linkedin.com/in/maurice-hermanns',
    'https://github.com/mauricehermanns',
    'https://twitter.com/mauricehermanns'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance'
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'EPHEC Brussels',
    url: 'https://www.ephec.be'
  },
  knowsAbout: [
    'Business Data Analysis',
    'Machine Learning',
    'Full-Stack Web Development',
    'Business Intelligence',
    'Digital Transformation',
    'React',
    'Next.js',
    'Python',
    'TypeScript',
    'Data Visualization'
  ],
  knowsLanguage: [
    'English',
    'French',
    'Dutch'
  ],
  offers: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Business Data Analysis & Web Development Services',
      description: 'Professional services including data analytics consulting, machine learning solutions, custom web application development, and digital transformation strategies.',
      serviceType: [
        'Business Data Analysis',
        'Web Development',
        'Machine Learning Consulting',
        'Business Intelligence',
        'Digital Strategy'
      ]
    },
    availability: 'https://schema.org/InStock',
    availableAtOrFrom: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Brussels',
        addressCountry: 'BE'
      }
    }
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Professional Services',
    availableLanguage: ['English', 'French', 'Dutch']
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
