import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        accent: {
          orange: '#FF5C00',
          green: '#1EE87E',
          yellow: '#FFD600',
          blue: '#3B82F6',
        },
        surface: {
          light: '#F2F2F0',
          card: '#FFFFFF',
          dark: '#0F0F0E',
          'card-dark': '#1A1A18',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 20px 0 rgba(0,0,0,0.06)',
        'soft-md': '0 4px 32px 0 rgba(0,0,0,0.09)',
        'soft-lg': '0 8px 48px 0 rgba(0,0,0,0.12)',
        'hover': '0 12px 40px 0 rgba(0,0,0,0.14)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both',
        'fade-in': 'fadeIn 0.5s ease both',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
