/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ---------------------------------------------------------------
        // City design-token system. Every value is a CSS custom property
        // defined in src/index.css under :root (day) and .dark (night),
        // so the whole palette morphs when the theme toggles instead of
        // hard-swapping components. See src/index.css for the raw values.
        // ---------------------------------------------------------------
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--ink-faint) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          solid: 'rgb(var(--surface-solid) / <alpha-value>)',
          strong: 'rgb(var(--surface-strong) / <alpha-value>)',
          border: 'rgb(var(--surface-border) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)',
          deep: 'rgb(var(--accent-deep) / <alpha-value>)',
        },
        glow: {
          DEFAULT: 'rgb(var(--glow) / <alpha-value>)',
        },
        warn: {
          DEFAULT: 'rgb(var(--warn) / <alpha-value>)',
        },
        screen: {
          DEFAULT: 'rgb(var(--screen) / <alpha-value>)',
        },
        canvas: {
          DEFAULT: 'rgb(var(--canvas) / <alpha-value>)',
          raised: 'rgb(var(--canvas-raised) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        script: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgb(var(--accent) / 0.45)',
        'glow-lg': '0 0 80px -12px rgb(var(--accent) / 0.5)',
        window: '0 0 14px 2px rgb(var(--glow) / 0.55)',
        card: '0 8px 32px rgb(var(--shadow-color) / var(--shadow-strength))',
        'card-lg': '0 24px 60px -12px rgb(var(--shadow-color) / var(--shadow-strength))',
        'inset-border': 'inset 0 0 0 1px rgb(var(--surface-border) / 1)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, rgb(var(--accent)) 0%, rgb(var(--accent-deep)) 100%)',
        // Button/CTA fills — kept separate from accent-gradient because
        // --accent is intentionally a light pastel in dark mode (for text
        // contrast on the night canvas), which is too washed-out to sit
        // behind white button labels. cta-gradient stays dark/saturated in
        // both themes so "Resume" / "Let's talk" stay crisp.
        'cta-gradient': 'linear-gradient(135deg, rgb(var(--cta-from)) 0%, rgb(var(--cta-to)) 100%)',
        'sky-gradient': 'linear-gradient(180deg, rgb(var(--sky-top)) 0%, rgb(var(--sky-mid)) 55%, rgb(var(--sky-horizon)) 100%)',
        'card-sheen': 'linear-gradient(155deg, rgb(var(--surface-strong)) 0%, rgb(var(--surface)) 100%)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.25, transform: 'scale(0.85)' },
          '50%': { opacity: 1, transform: 'scale(1.1)' },
        },
        drift: {
          '0%': { transform: 'translateX(-6%)' },
          '100%': { transform: 'translateX(6%)' },
        },
        'window-blink': {
          '0%, 92%, 100%': { opacity: 'var(--win-base, 0.85)' },
          '96%': { opacity: 'var(--win-dim, 0.35)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-1.2deg)' },
          '50%': { transform: 'rotate(1.2deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scaleY(1) translateY(0)' },
          '50%': { transform: 'scaleY(1.007) translateY(-1.5px)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'rail-move': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        steam: {
          '0%': { opacity: 0, transform: 'translateY(0) scaleY(1)' },
          '30%': { opacity: 0.6 },
          '100%': { opacity: 0, transform: 'translateY(-13px) scaleY(1.5)' },
        },
        eq: {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        twinkle: 'twinkle 3.2s ease-in-out infinite',
        drift: 'drift 60s linear infinite alternate',
        'drift-slow': 'drift 100s linear infinite alternate',
        'window-blink': 'window-blink 7s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3.5s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fade-in 0.8s ease forwards',
        sway: 'sway 6s ease-in-out infinite',
        breathe: 'breathe 4.6s ease-in-out infinite',
        bob: 'bob 5s ease-in-out infinite',
        rail: 'rail-move 22s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        blink: 'blink 1s step-end infinite',
        steam: 'steam 2.8s ease-in-out infinite',
        eq: 'eq 0.9s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
