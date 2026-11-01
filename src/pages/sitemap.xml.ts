import type { APIRoute } from 'astro';

// Lists every static page. Add new routes here as the site grows.
import { getCollection } from 'astro:content';


export const GET: APIRoute = async ({ site }) => {
  const work = await getCollection('work');
  const paths = ['/', ...work.map((w) => `/work/${w.id}/`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
