import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://maurice-hermanns.com/sitemap.xml

# Optimisations pour SEO
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 2

# Interdictions
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Host
Host: https://maurice-hermanns.com`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, must-revalidate'
    }
  })
}