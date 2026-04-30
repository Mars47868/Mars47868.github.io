import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    industry: z.array(z.string()),
    tech: z.array(z.string()),
    metric: z.string(),
    before: z.string(),
    think: z.string(),
    after: z.string(),
    result: z.string(),
    problemLabel: z.string().optional(),
    icon: z.string().optional(),
    iconBg: z.enum(['green', 'blue', 'amber']).optional(),
    github: z.url().optional(),
    demo: z.url().optional(),
    cover: z.string().min(1).optional(),
    order: z.number(),
    metricPercentage: z.number().min(0).max(100).optional(),
    metricLabel: z.string().optional(),
  }),
});

export const collections = { projects };
