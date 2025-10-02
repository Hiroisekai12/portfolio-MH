import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = 'Maurice Hermanns - Business Data Analyst & Full-Stack Developer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#000',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#fff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Maurice Hermanns
          </div>
          
          <div
            style={{
              fontSize: 36,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            Business Data Analyst & Full-Stack Developer
          </div>
          
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                fontSize: 20,
                color: '#fff',
              }}
            >
              Data Analytics
            </div>
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                fontSize: 20,
                color: '#fff',
              }}
            >
              Web Development
            </div>
            <div
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                fontSize: 20,
                color: '#fff',
              }}
            >
              Machine Learning
            </div>
          </div>
          
          <div
            style={{
              marginTop: '40px',
              fontSize: 24,
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'monospace',
            }}
          >
            www.maurice-hermanns.com
          </div>
        </div>
        
        {/* Availability badge */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 80,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 28px',
            backgroundColor: 'rgba(34,197,94,0.15)',
            border: '2px solid rgba(34,197,94,0.4)',
            borderRadius: '50px',
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#22c55e',
            }}
          />
          <div style={{ fontSize: 20, color: '#22c55e', fontWeight: 600 }}>
            AVAILABLE FOR PROJECTS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
