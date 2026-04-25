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
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    cover: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { projects };
