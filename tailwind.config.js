/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design token system — warm dark theme: oak/granite background,
        // cream ink, soft-yellow signal accent, lilac secondary accent.
        void: {
          DEFAULT: '#15130f', // page background — pale-oak-950
          surface: '#1e1b15', // card / panel background — pale-oak-900
          raised: '#3c352a', // hover / raised surface — pale-oak-800
          border: '#5a503f', // pale-oak-700
        },
        signal: {
          DEFAULT: '#e4da1b', // primary accent — soft yellow (light-yellow-500)
          soft: '#efe976', // light-yellow-300
        },
        pulse: {
          DEFAULT: '#a08ea4', // secondary accent — lilac-ash-400
          soft: '#b8aabb', // lilac-ash-300
        },
        amber: {
          DEFAULT: '#b88347', // sparing highlight — almond-cream-500
        },
        ink: {
          DEFAULT: '#f1e6da', // primary text — almond-cream-100 (cream)
          muted: '#c0b6a5', // secondary text — pale-oak-300
          faint: '#95856a', // pale-oak-500
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'signal-gradient': 'linear-gradient(135deg, #e4da1b 0%, #b88347 100%)',
        'grid-fade':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(228,218,27,0.12), transparent)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(228,218,27,0.4)',
        'glow-violet': '0 0 40px -10px rgba(160,142,164,0.45)',
        card: '0 8px 32px rgba(0,0,0,0.45)',
      },
      keyframes: {
        'trace-pulse': {
          '0%': { offsetDistance: '0%', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { offsetDistance: '100%', opacity: 0 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 10s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s ease forwards',
        blink: 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
}
