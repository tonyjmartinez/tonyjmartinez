import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Case studies. Every claim must be sourced from the project's own README/docs/code.
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    live: z.string().url().optional(),
    source: z.string().url().optional(),
    sources: z.array(z.string()).min(1),
    problem: z.string(),
    does: z.array(z.string()).min(1),
    built: z.array(z.string()).min(1),
    stack: z.array(z.string()).min(1),
    interesting: z.array(z.string()).min(1),
  }),
});

export const collections = { work };
