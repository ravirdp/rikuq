export const SITE = {
  url: 'https://rikuq.com',
  name: 'rikuq',
  title: 'rikuq — Solo founder. 3 AI SaaS shipped. Here\'s how.',
  description:
    'The practitioner\'s blog for solo founders shipping real AI SaaS. Reviews of AI coding tools, deep-dives on LLM infrastructure, and case studies from someone actually shipping.',
  author: {
    name: 'Ravi',
    url: 'https://rikuq.com/about',
    twitter: '@rikuq',
    sameAs: [
      'https://batchwise.ai',
      'https://citare.ai',
      'https://ssimplifi.com',
    ],
  },
  social: {
    twitter: 'https://twitter.com/rikuq',
    github: 'https://github.com/ravirdp/rikuq', // public repo
    linkedin: 'https://linkedin.com/in/rikuq',
  },
  ogImage: '/og-default.png',
};

export const PILLARS = {
  tools: {
    slug: 'tools',
    title: 'AI Coding Tools',
    description:
      'Reviews and comparisons of Cursor, Claude Code, Windsurf, Antigravity, Copilot, and the rest — from someone actually shipping with them.',
  },
  infra: {
    slug: 'infra',
    title: 'LLM Infrastructure & FinOps',
    description:
      'AI gateways, caching, model routing, observability, and cost optimization. Practitioner deep-dives from building Prism.',
  },
  geo: {
    slug: 'geo',
    title: 'GEO (AI Search)',
    description:
      'How ChatGPT, Claude, Perplexity, and Google AI Overview actually index and cite content. From building Citare.',
  },
  stack: {
    slug: 'stack',
    title: 'Stack & Ops',
    description:
      'Supabase, Vercel, Cloudflare, Redis, Upstash — the production stack for shipping AI SaaS solo.',
  },
} as const;

export const PRODUCTS = [
  {
    name: 'Prism',
    by: 'Ssimplifi',
    url: 'https://ssimplifi.com',
    tagline: 'OpenAI-compatible AI gateway with measured savings + edge routing.',
    category: 'LLM infrastructure',
  },
  {
    name: 'Citare',
    url: 'https://citare.ai',
    tagline: 'Unified SEO + AI-search visibility across the four indexes.',
    category: 'SEO / GEO',
  },
  {
    name: 'BatchWise',
    url: 'https://batchwise.ai',
    tagline: 'Compliance marketplace for Indian SMEs and SEBI-listed enterprise.',
    category: 'Marketplace / Compliance',
  },
] as const;
