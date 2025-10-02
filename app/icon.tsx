import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
 
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00D2FF',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          border: '2px solid rgba(0, 210, 255, 0.3)',
          borderRadius: '6px',
        }}
      >
        MH
      </div>
    ),
    {
      ...size,
    }
  )
}
