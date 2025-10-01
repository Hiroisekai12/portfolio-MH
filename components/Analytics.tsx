import Script from 'next/script'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

interface AnalyticsProps {
    gaId?: string
}

export default function Analytics({ gaId }: AnalyticsProps) {
    if (!gaId || process.env.NODE_ENV !== 'production') {
        return null
    }

    return (
        <>
            {/* Google Analytics */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false
          });
        `}
            </Script>

            {/* Web Vitals Monitoring */}
            <Script id="web-vitals" strategy="afterInteractive">
                {`
          function sendToGoogleAnalytics({name, delta, value, id}) {
            gtag('event', name, {
              event_category: 'Web Vitals',
              event_label: id,
              value: Math.round(name === 'CLS' ? delta * 1000 : delta),
              non_interaction: true,
            });
          }

          // Load Web Vitals library
          import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
            getCLS(sendToGoogleAnalytics);
            getFID(sendToGoogleAnalytics);
            getFCP(sendToGoogleAnalytics);
            getLCP(sendToGoogleAnalytics);
            getTTFB(sendToGoogleAnalytics);
          });
        `}
            </Script>

            {/* Vercel Analytics */}
            <VercelAnalytics />
        </>
    )
}