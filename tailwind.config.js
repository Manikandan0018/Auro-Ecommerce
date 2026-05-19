/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lime: { 400: '#C6F135', 500: '#b5e020', 600: '#9dc919' },
        dark: { 900: '#0a0a0a', 800: '#111111', 700: '#1a1a1a', 600: '#222222', 500: '#2a2a2a' },
      },
      fontFamily: {
        display: ['Bebas Neue', 'cursive'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        'fade-in': 'fadeIn 0.4s ease',
        'slide-up': 'slideUp 0.4s ease',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
