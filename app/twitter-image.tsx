import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = 'Maurice Hermanns - Data Analyst & Developer'
export const size = {
  width: 1200,
  height: 600,
}
export const contentType = 'image/png'
 
export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Minimal grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Centered content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            Maurice Hermanns
          </div>
          
          <div
            style={{
              fontSize: 32,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '800px',
            }}
          >
            Transform Your Business with Data & Code
          </div>
          
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                padding: '10px 20px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                fontSize: 18,
                color: '#fff',
              }}
            >
              📊 Analytics
            </div>
            <div
              style={{
                padding: '10px 20px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                fontSize: 18,
                color: '#fff',
              }}
            >
              💻 Development
            </div>
            <div
              style={{
                padding: '10px 20px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                fontSize: 18,
                color: '#fff',
              }}
            >
              🤖 ML
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
