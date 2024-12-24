import type {Config} from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gray: {
          50: '#f3f5f7',
          500: '#777777',
          600: '#4d4d4d',
          800: '#2d2d2d',
          900: '#181818',
          950: '#1e1e1e',
        },
        white: {
          5: '#ffffff0d',
        },
      },
      width: {
        15: '3.75rem',
      },
      height: {
        15: '3.75rem',
      },
      boxShadow: {
        custom: '0 0 12px 0 rgba(0, 0, 0, 0.04), 0 0 0 48px rgb(10 10 10)',
      },
      borderRadius: {
        lg: '0.625rem',
      },
      borderColor: {
        gray: {
          25: '#f3f5f726',
        },
      },
      keyframes: {
        'slide-in': {
          '0%': {transform: 'translateX(100%)'},
          '100%': {transform: 'translateX(0)'},
        },
        'slide-out': {
          '0%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(100%)'},
        },
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out',
        'slide-out': 'slide-out 0.3s ease-out',
      },
    },
    fontFamily: {
      sans: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
    },
  },
  plugins: [],
} satisfies Config
