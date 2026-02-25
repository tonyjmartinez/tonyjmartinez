import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import wywInJS from "@wyw-in-js/vite";

// Keystatic is a local-dev-only admin UI.
// Including its integration in production would require a server adapter
// (its routes use SSR) and would be unreachable anyway since Cloudflare Pages
// serves only static files. We strip it from production builds entirely.
const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  site: "https://tonyjmartinez.dev",
  output: "static",
  integrations: [
    mdx(),
    react(),
    sitemap(),
    ...(isDev ? [keystatic()] : []),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
  vite: {
    plugins: [
      wywInJS({
        include: ["**/*.{ts,tsx}"],
      }),
    ],
  },
});
