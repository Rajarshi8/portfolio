/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6244C5',
          light: '#7B68EE',
          dark: '#4B2D9E',
        },
        secondary: {
          DEFAULT: '#FFC448',
          light: '#FFD700',
          dark: '#E5A500',
        },
        background: {
          light: '#FFFFFF',
          dark: '#0a0a0a',
        },
        surface: {
          light: '#F5F5F5',
          dark: '#171717',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1a1a1a',
        },
        text: {
          light: '#12141D',
          dark: '#EDEDED',
          muted: {
            light: '#6B7280',
            dark: '#A0A0A0',
          },
        },
        border: {
          light: 'rgba(0, 0, 0, 0.1)',
          dark: 'rgba(255, 255, 255, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': '0.625rem',
        'hero': 'clamp(2.5rem, 8vw, 5rem)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'section': '6rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(98, 68, 197, 0.1) 0%, rgba(255, 196, 72, 0.05) 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(98, 68, 197, 0.3)',
        'glow-lg': '0 0 40px rgba(98, 68, 197, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
