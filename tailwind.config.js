/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Helvetica Neue"', 'sans-serif'],
        mono: ['"SF Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'apple-title': ['48px', { lineHeight: '1.083', fontWeight: '700', letterSpacing: '-0.003em' }],
        'apple-title-tablet': ['40px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.003em' }],
        'apple-headline': ['22px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '0em' }],
        'apple-body': ['17px', { lineHeight: '1.470', fontWeight: '400', letterSpacing: '-0.022em' }],
        'apple-callout': ['16px', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '-0.016em' }],
        'apple-caption': ['13px', { lineHeight: '1.385', fontWeight: '400', letterSpacing: '-0.008em' }],
        'apple-caption-sm': ['11px', { lineHeight: '1.455', fontWeight: '600', letterSpacing: '0em' }],
      },
      borderRadius: {
        'card': '18px',
        'card-lg': '20px',
        'pill': '980px',
      },
      colors: {
        'apple-bg': 'var(--color-bg)',
        'apple-bg-secondary': 'var(--color-bg-secondary)',
        'apple-bg-tertiary': 'var(--color-bg-tertiary)',
        'apple-text': 'var(--color-text)',
        'apple-text-secondary': 'var(--color-text-secondary)',
        'apple-border': 'var(--color-border)',
      },
      spacing: {
        '8px': '8px',
        '16px': '16px',
        '24px': '24px',
        '32px': '32px',
        '48px': '48px',
        '64px': '64px',
        '80px': '80px',
      },
      backdropBlur: {
        'apple': '20px',
        'apple-heavy': '40px',
      },
      boxShadow: {
        'apple-sm': '0 1px 2px rgba(0,0,0,0.04)',
        'apple-md': '0 4px 12px rgba(0,0,0,0.06)',
        'apple-lg': '0 8px 24px rgba(0,0,0,0.08)',
        'apple-hover': '0 12px 32px rgba(0,0,0,0.10)',
        'apple-card': '0 1px 3px rgba(0,0,0,0.04)',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
