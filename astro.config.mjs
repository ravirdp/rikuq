import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Pure static build → deploys to Cloudflare Pages.
// /api/subscribe runs as a Cloudflare Pages Function from /functions/api/subscribe.ts.
export default defineConfig({
  site: 'https://rikuq.com',
  integrations: [
    mdx(),
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
