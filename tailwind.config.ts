import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1280px' }
    },
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-fg': 'rgb(var(--muted-fg) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-fg': 'rgb(var(--card-fg) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
        // 한국 전통 팔레트 (dahong=다홍, meok=먹, misek=미색, dancheong-blue/green)
        dahong: {
          DEFAULT: 'rgb(var(--dahong) / <alpha-value>)',
          soft: 'rgb(var(--dahong-soft) / <alpha-value>)'
        },
        meok: 'rgb(var(--meok) / <alpha-value>)',
        misek: 'rgb(var(--misek) / <alpha-value>)',
        dancheong: {
          blue: 'rgb(var(--dancheong-blue) / <alpha-value>)',
          green: 'rgb(var(--dancheong-green) / <alpha-value>)',
          gold: 'rgb(var(--dancheong-gold) / <alpha-value>)'
        }
      },
      fontFamily: {
        sans: [
          'Pretendard',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Malgun Gothic',
          'sans-serif'
        ],
        serif: [
          'Gowun Batang',
          'Apple SD Gothic Neo',
          'Nanum Myeongjo',
          'Georgia',
          'ui-serif',
          'serif'
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'steam': {
          '0%': { opacity: '0', transform: 'translateY(0) scale(1)' },
          '40%': { opacity: '0.7' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(1.4)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'steam': 'steam 3s ease-out infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
