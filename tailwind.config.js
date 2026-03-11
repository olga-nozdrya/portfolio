/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        card: 'var(--card)',
        t1: 'var(--t1)',
        t2: 'var(--t2)',
        t3: 'var(--t3)',
        line: 'var(--line)',
      },
      boxShadow: {
        sm: 'var(--sh)',
        md: 'var(--sh2)',
      },
      borderRadius: {
        DEFAULT: 'var(--r)',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};
