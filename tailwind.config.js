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
        clima: {
          lavender: '#C8B6E2',
          lilac: '#EAE2F4',
          blue: '#A9C6D8',
          pink: '#F2D5DF',
          yellow: '#F5D982',
          white: '#FFFDFB',
          purple: '#493A59',
          'purple-light': '#6B5780',
          'purple-dark': '#2E233B',
          dark: '#171221',
          'dark-card': '#241D32',
          'dark-card-hover': '#2F2642',
          'dark-border': '#3C3053',
        }
      },
      fontFamily: {
        title: ['Poppins', 'Nunito', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.03)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
          '50%': { transform: 'scale(1.35)', opacity: 1 },
        }
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(73, 58, 89, 0.08)',
        'soft-lg': '0 20px 40px -10px rgba(73, 58, 89, 0.12)',
        'glow-yellow': '0 0 25px rgba(245, 217, 130, 0.45)',
        'glow-purple': '0 0 25px rgba(200, 182, 226, 0.35)',
      }
    },
  },
  plugins: [],
}
