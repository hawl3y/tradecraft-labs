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
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'Menlo', 'monospace'],
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink'),
            maxWidth: 'none',
            fontFamily: theme('fontFamily.serif'),
            lineHeight: '1.75',
            p: {
              marginTop: '1.4em',
              marginBottom: '1.4em',
            },
            'p:first-child': {
              marginTop: '0',
            },
            a: {
              color: theme('colors.navy.DEFAULT'),
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: theme('colors.navy.DEFAULT'),
                opacity: '0.75',
              },
            },
            strong: {
              fontWeight: '600',
              color: theme('colors.ink'),
            },
            h1: {
              fontFamily: theme('fontFamily.serif'),
              fontWeight: '500',
              color: theme('colors.ink'),
              lineHeight: '1.2',
            },
            h2: {
              fontFamily: theme('fontFamily.serif'),
              fontWeight: '500',
              color: theme('colors.ink'),
              lineHeight: '1.3',
              marginTop: '2.2em',
              marginBottom: '0.9em',
            },
            h3: {
              fontFamily: theme('fontFamily.serif'),
              fontWeight: '500',
              color: theme('colors.ink'),
              lineHeight: '1.4',
              marginTop: '1.8em',
              marginBottom: '0.75em',
            },
            h4: {
              fontFamily: theme('fontFamily.serif'),
              fontWeight: '600',
              color: theme('colors.ink'),
              marginTop: '1.6em',
              marginBottom: '0.6em',
            },
            'ul > li': {
              paddingLeft: '0.4em',
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            'ol > li': {
              paddingLeft: '0.4em',
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            'ul, ol': {
              marginTop: '1.4em',
              marginBottom: '1.4em',
            },
            blockquote: {
              fontFamily: theme('fontFamily.serif'),
              fontStyle: 'italic',
              borderLeftColor: theme('colors.navy.DEFAULT'),
              color: theme('colors.ink'),
              lineHeight: '1.6',
            },
            code: {
              fontFamily: theme('fontFamily.mono'),
              fontWeight: '400',
              color: theme('colors.ink'),
              backgroundColor: theme('colors.surface'),
              borderRadius: '0.25rem',
              padding: '0.15em 0.4em',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              fontFamily: theme('fontFamily.mono'),
              backgroundColor: theme('colors.surface'),
              color: theme('colors.ink'),
              border: `1px solid ${theme('colors.gray.200')}`,
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
            thead: {
              fontFamily: theme('fontFamily.sans'),
              borderBottomColor: theme('colors.gray.300'),
            },
            'thead th': {
              fontWeight: '500',
              fontSize: '0.8125rem',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              color: theme('colors.muted'),
            },
            'tbody td, tbody th': {
              fontFamily: theme('fontFamily.serif'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.100'),
            },
            hr: {
              borderColor: theme('colors.gray.200'),
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
