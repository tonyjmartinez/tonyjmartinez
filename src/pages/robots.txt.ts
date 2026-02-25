import type { APIContext } from "astro";

export function GET(context: APIContext) {
  const siteUrl = context.site?.href ?? "";
  const body = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${siteUrl}sitemap-index.xml`,
    "",
    "# Block the local-only Keystatic admin route (not present in production builds)",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
