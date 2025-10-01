/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
      },
      colors: {
        bg: '#0a0a0a',
        text: '#fafafa',
        'text-dim': '#666',
        accent: '#fff',
        border: 'rgba(255,255,255,0.1)',
      },
      animation: {
        'pulse-dot': 'pulse 2s infinite',
        'float': 'float 20s infinite linear',
        'bounce-slow': 'bounce 2s infinite',
        'heartbeat': 'heartbeat 1.5s ease infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-30px) rotate(90deg)' },
          '50%': { transform: 'translateY(0) rotate(180deg)' },
          '75%': { transform: 'translateY(30px) rotate(270deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      mixBlendMode: {
        'difference': 'difference',
      },
    },
  },
  plugins: [],
}