import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 180,
  height: 180,
}
 
export const contentType = 'image/png'
 
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 88,
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          border: '4px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '40px',
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
