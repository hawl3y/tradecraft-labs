export const SITE = {
  name: 'Tradecraft Labs',
  mission: {
    // Used in header subtitle and meta description
    short: 'Independent research on cybersecurity governance',
    // Used in hero, footer, about page, and OG meta
    full: 'Independent research exploring the human side of cybersecurity governance, leadership, and risk-informed decision making.',
  },
  links: {
    personal: 'https://joehawley.com',
    linkedin: 'https://www.linkedin.com/in/joehawley/',
  },
  year: new Date().getFullYear().toString(),
} as const
