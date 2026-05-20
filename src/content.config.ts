import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(70, 'Title should be ≤70 chars for SERP'),
    description: z.string().min(120).max(160, 'Meta desc should be 120–160 chars'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['tools', 'infra', 'geo', 'stack']),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Ravi'),
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
    canonical: z.string().url().optional(),
    affiliateDisclosure: z.boolean().default(false),
    prismDisclosure: z.boolean().default(false),
    citareDisclosure: z.boolean().default(false),
    relatedPosts: z.array(z.string()).default([]),
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(80),
    description: z.string().min(120).max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    product: z.enum(['batchwise', 'citare', 'prism']),
    productUrl: z.string().url(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Ravi'),
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
    timeToShip: z.string().optional(),
    monthlyCost: z.string().optional(),
  }),
});

export const collections = { blog, 'case-studies': caseStudies };
