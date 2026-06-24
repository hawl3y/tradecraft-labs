import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        // Background layers
        background: '#FAFAF8',
        surface: '#F3F2EF',
        // Text
        ink: '#1A1A1A',
        muted: '#5E6779',
        // Brand accent
        navy: {
          DEFAULT: '#1E3A5F',
          light: '#E8EEF5',
        },
        // Status (semantic)
        status: {
          active: '#15803D',      // green-700
          draft: '#B45309',       // amber-700
          planned: '#6B7280',     // gray-500
          published: '#1E3A5F',   // navy
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'Menlo', 'monospace'],
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink'),
            maxWidth: 'none',
            a: {
              color: theme('colors.navy.DEFAULT'),
              textDecoration: 'underline',
              '&:hover': {
                color: theme('colors.navy.DEFAULT'),
                opacity: '0.8',
              },
            },
            h1: {
              fontFamily: theme('fontFamily.serif'),
              color: theme('colors.ink'),
            },
            h2: {
              fontFamily: theme('fontFamily.serif'),
              color: theme('colors.ink'),
            },
            h3: {
              fontFamily: theme('fontFamily.serif'),
              color: theme('colors.ink'),
            },
            h4: {
              fontFamily: theme('fontFamily.serif'),
              color: theme('colors.ink'),
            },
            blockquote: {
              borderLeftColor: theme('colors.navy.DEFAULT'),
              color: theme('colors.ink'),
            },
          },
        },
      }),
      maxWidth: {
        content: '68rem',
        prose: '48rem',
      },
    },
  },
  plugins: [typography],
}

export default config
