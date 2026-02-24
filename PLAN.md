# Portfolio Website Rewrite Plan

## Overview

A from-scratch portfolio website built with **Astro + MDX**, deployed to **Cloudflare Pages** as a fully static site. The site is heavily MDX-driven, uses **React islands** for interactive components (e.g., NBA data visualizations in blog posts), and includes a local **MDXEditor-powered admin page** for composing posts with live preview. Styling via **Tailwind CSS**, dark/light mode toggle, and a strong focus on performance and accessibility (targeting 95+ Lighthouse scores across the board).

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Astro 5** | Static-first, islands architecture, zero JS by default, native MDX/Content Collections |
| Content | **MDX** via `@astrojs/mdx` | Mix markdown with React components inline |
| UI Islands | **React 19** via `@astrojs/react` | Interactive components hydrated only when needed |
| Styling | **Tailwind CSS 4** via `@astrojs/tailwind` | Utility-first, purged at build, great Astro integration |
| Syntax highlighting | **Shiki** (built into Astro) | Build-time only, zero client JS, VS Code-quality grammars |
| Local MDX editor | **`@mdxeditor/editor`** | WYSIWYG MDX editing with custom JSX component support |
| Deployment | **Cloudflare Pages** (static) | Global edge CDN, no adapter needed for static builds |
| Package manager | **pnpm** | Fast, disk-efficient |
| Type safety | **TypeScript** | Strict mode throughout |

---

## Project Structure

```
tonyjmartinez/
├── astro.config.mjs          # Astro config (MDX, React, Tailwind, Shiki)
├── tailwind.config.mjs       # Tailwind configuration + dark mode
├── tsconfig.json
├── package.json
├── public/
│   ├── fonts/                # Self-hosted WOFF2 fonts
│   ├── images/               # Static images (profile photo, og-images)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/           # Header, Footer, Nav, SkipLink, ThemeToggle
│   │   ├── mdx/              # Custom MDX components (mapped to HTML elements)
│   │   │   ├── Callout.astro
│   │   │   ├── CodeBlock.astro
│   │   │   ├── Figure.astro
│   │   │   └── Link.astro
│   │   ├── blog/             # Blog-specific components (PostCard, TagList, etc.)
│   │   ├── resume/           # Resume/CV components (Timeline, ExperienceCard)
│   │   └── interactive/      # React islands (client-hydrated)
│   │       ├── NbaChart.tsx           # Example: interactive NBA data viz
│   │       ├── NbaPlayerComparison.tsx
│   │       ├── ThemeToggle.tsx        # Dark/light mode toggle (client:load)
│   │       └── SearchPosts.tsx        # Client-side blog search
│   ├── content/
│   │   ├── config.ts         # Content Collection schemas (Zod)
│   │   └── blog/             # MDX blog posts
│   │       ├── my-first-post.mdx
│   │       └── nba-analysis-2025.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro  # HTML shell, <head>, skip link, font preloads
│   │   ├── PageLayout.astro  # Standard page (header + main + footer)
│   │   └── BlogPostLayout.astro  # Blog post layout with TOC, metadata, components mapping
│   ├── pages/
│   │   ├── index.astro       # Home / About Me page
│   │   ├── blog/
│   │   │   ├── index.astro   # Blog listing page
│   │   │   └── [...slug].astro  # Dynamic blog post pages from Content Collections
│   │   ├── resume.astro      # Resume / CV page
│   │   └── admin/
│   │       └── index.astro   # Local-only MDXEditor page (dev mode only)
│   ├── styles/
│   │   └── global.css        # Tailwind directives, font-face declarations, base styles
│   └── utils/
│       ├── mdx-components.ts # Central MDX component mapping
│       └── reading-time.ts   # Reading time calculation for blog posts
├── .github/
│   └── workflows/
│       └── deploy.yml        # (Optional) GitHub Actions -> Cloudflare Pages
└── wrangler.toml             # (Only if needed later for SSR/bindings)
```

---

## Implementation Phases

### Phase 1: Project Scaffolding & Core Infrastructure

**Goal**: Get a working Astro project with all integrations configured, deployed to Cloudflare Pages.

1. **Initialize Astro project**
   ```bash
   pnpm create astro@latest . -- --template minimal --typescript strict
   ```

2. **Add integrations**
   ```bash
   pnpm astro add mdx react tailwindcss
   ```

3. **Configure `astro.config.mjs`**
   - Add MDX integration with Shiki syntax highlighting (theme: `one-dark-pro` for dark, `github-light` for light, using Shiki's dual-theme support)
   - Add React integration for island components
   - Add Tailwind integration
   - Set `output: 'static'` (default, no Cloudflare adapter needed)
   - Configure `site` URL for canonical URLs and sitemap

4. **Set up Tailwind**
   - Configure `tailwind.config.mjs` with `darkMode: 'class'`
   - Define design tokens (colors, typography scale, spacing)
   - Create `src/styles/global.css` with `@tailwind` directives, font-face declarations, and CSS custom properties for theme colors

5. **Self-host fonts**
   - Download chosen font family in WOFF2 format (e.g., Inter for body, JetBrains Mono for code)
   - Place in `public/fonts/`
   - Subset to Latin character set for minimal file size
   - Add `<link rel="preload">` in base layout for critical fonts
   - Use `font-display: swap`

6. **Create base layouts**
   - `BaseLayout.astro`: HTML document shell with `<head>` (meta tags, OG tags, font preloads, theme script), skip link, slot
   - `PageLayout.astro`: Wraps BaseLayout, adds Header, Footer, `<main id="main-content">`
   - Inline a tiny blocking script in `<head>` to read theme preference from `localStorage` and set `class="dark"` on `<html>` before paint (prevents flash of wrong theme)

7. **Deploy to Cloudflare Pages**
   - Connect the GitHub repo to Cloudflare Pages dashboard
   - Build command: `pnpm build`
   - Output directory: `dist`
   - Verify the bare site deploys and serves correctly

**Deliverable**: Empty but functional Astro site deployed to Cloudflare Pages with all tooling configured.

---

### Phase 2: Layout, Navigation & Theme Toggle

**Goal**: Build the site shell -- header, footer, navigation, dark/light mode, and responsive design.

1. **Header component** (`src/components/layout/Header.astro`)
   - Site logo/name
   - Navigation links: Home, Blog, Resume
   - Theme toggle button (React island, `client:load`)
   - Mobile hamburger menu (can be CSS-only with `<details>`/`<summary>` or a small React island)
   - `aria-current="page"` on active nav link

2. **Footer component** (`src/components/layout/Footer.astro`)
   - Social links (GitHub, LinkedIn, Twitter/X, etc.)
   - Copyright
   - Accessible: links have descriptive `aria-label`s

3. **Skip link** (`src/components/layout/SkipLink.astro`)
   - First focusable element in DOM
   - Visually hidden, visible on focus
   - Links to `#main-content`

4. **Theme toggle** (`src/components/interactive/ThemeToggle.tsx`)
   - React component with `client:load` (needs to be interactive immediately)
   - Toggles `dark` class on `<html>`
   - Persists preference to `localStorage`
   - Respects `prefers-color-scheme` as default
   - Sun/moon icon with smooth transition
   - `aria-label="Switch to dark/light theme"`

5. **Responsive design**
   - Mobile-first approach
   - Breakpoints via Tailwind (`sm`, `md`, `lg`)
   - Test at 320px, 768px, 1024px, 1440px

**Deliverable**: Fully navigable site shell with responsive layout and working dark/light mode.

---

### Phase 3: Home Page (About Me)

**Goal**: Build the main landing page that introduces who you are.

1. **Hero section**
   - Profile photo (optimized with Astro `<Image />`, eager loaded, with `alt` text)
   - Name, title/tagline
   - Brief intro paragraph
   - CTA buttons (e.g., "Read my blog", "View resume")

2. **About section**
   - Longer bio / what you do
   - Key skills or interests (could be a simple grid of tags)
   - What you're currently working on

3. **Featured blog posts section**
   - Pull latest 3 posts from Content Collections
   - Post cards with title, date, description, read time
   - "View all posts" link

4. **SEO**
   - Proper `<title>`, `<meta description>`
   - Open Graph and Twitter Card meta tags
   - Structured data (JSON-LD for Person schema)

**Deliverable**: Polished home page with profile info and featured posts.

---

### Phase 4: Blog Infrastructure & Content Collections

**Goal**: Set up the blog system with Content Collections, MDX rendering, and custom component mapping.

1. **Define Content Collection schema** (`src/content/config.ts`)
   ```typescript
   import { defineCollection, z } from 'astro:content';

   const blog = defineCollection({
     type: 'content',
     schema: z.object({
       title: z.string(),
       description: z.string(),
       pubDate: z.date(),
       updatedDate: z.date().optional(),
       heroImage: z.string().optional(),
       tags: z.array(z.string()).default([]),
       draft: z.boolean().default(false),
     }),
   });

   export const collections = { blog };
   ```

2. **Create MDX component mapping** (`src/utils/mdx-components.ts`)
   Central file that maps HTML elements to custom Astro/React components:
   - `a` -> custom `Link` (external link icon, opens in new tab if external)
   - `img` -> custom `Figure` (with optional caption, lazy loading)
   - `blockquote` -> custom `Callout` (styled tip/warning/info boxes)
   - `pre`/`code` -> custom `CodeBlock` (copy button, filename header, line highlighting via Shiki)
   - `h2`/`h3`/`h4` -> custom headings with anchor links for deep linking
   - `table` -> responsive wrapper

3. **Blog post layout** (`src/layouts/BlogPostLayout.astro`)
   - Post title, date, tags, reading time
   - Table of contents (generated from `getHeadings()`)
   - `<Content components={mdxComponents} />` with the central mapping
   - Previous/next post navigation
   - Proper `<article>` semantic markup with `<time datetime="...">`

4. **Blog listing page** (`src/pages/blog/index.astro`)
   - List all non-draft posts, sorted by date
   - Post cards with title, date, description, tags, read time
   - Filter by tag (can be static -- one page per tag via `[...tag].astro`)

5. **Dynamic blog post pages** (`src/pages/blog/[...slug].astro`)
   - `getStaticPaths()` from Content Collections
   - Filter out drafts in production
   - Render MDX with custom components

6. **Write 1-2 sample blog posts**
   - One simple text-heavy post to test typography and MDX component mapping
   - One post with an interactive React component (e.g., a simple NBA stat chart) to validate the islands workflow

**Deliverable**: Fully working blog with Content Collections, custom MDX components, and sample posts.

---

### Phase 5: Interactive React Components (Islands)

**Goal**: Build the interactive React components that make blog posts special, particularly NBA-focused data visualizations.

1. **Shared island patterns**
   - All interactive components live in `src/components/interactive/`
   - Each component is a `.tsx` file that can be imported in MDX
   - Use `client:visible` for below-the-fold components (most blog embeds)
   - Use `client:load` only for above-the-fold interactivity
   - Keep bundle sizes minimal -- lazy-load heavy libraries (e.g., D3, recharts)

2. **Example NBA components** (build 2-3 to establish patterns)
   - `NbaChart.tsx` -- Interactive bar/line chart comparing player stats
     - Could use **Recharts** (lightweight, React-native) or **visx** (D3-based, more control)
     - Hover tooltips, responsive sizing
     - `client:visible` hydration
   - `NbaPlayerComparison.tsx` -- Side-by-side player comparison widget
     - Dropdowns to select players, stats update reactively
     - `client:visible` hydration
   - `InteractiveQuiz.tsx` -- Simple quiz/poll component for engagement
     - `client:visible` hydration

3. **MDX usage pattern**
   In a blog post `.mdx` file:
   ```mdx
   ---
   title: "NBA Season Analysis 2025"
   description: "Breaking down the most improved players this season"
   pubDate: 2025-12-01
   tags: ["nba", "data"]
   ---
   import NbaChart from '../../components/interactive/NbaChart.tsx';

   # NBA Season Analysis 2025

   Let's look at how the top scorers compare this season.

   <NbaChart
     client:visible
     players={["Luka Doncic", "Shai Gilgeous-Alexander", "Jayson Tatum"]}
     stat="ppg"
   />

   As you can see from the chart above, the scoring race is tighter than ever...
   ```

4. **Performance guardrails**
   - Each island should have a static fallback / placeholder visible before hydration
   - Use `loading="lazy"` concepts -- `client:visible` handles this automatically
   - Monitor bundle sizes per component (target: <50KB gzipped per island)
   - Consider using Astro's `<script>` tag for simple interactions that don't need React

**Deliverable**: 2-3 polished interactive React components demonstrating the islands pattern in blog posts.

---

### Phase 6: Resume / CV Page

**Goal**: Build a clean, printable resume page.

1. **Resume page** (`src/pages/resume.astro`)
   - Timeline-style layout for work experience
   - Education section
   - Skills section (grouped by category)
   - Print-friendly styles (`@media print`)
   - Download PDF link (optional: generate from the same data)

2. **Data-driven approach**
   - Store resume data in a TypeScript file or JSON (`src/data/resume.ts`)
   - Render from data so it's easy to update
   - Reusable components: `Timeline`, `ExperienceCard`, `SkillGroup`

**Deliverable**: Clean resume page that looks good on screen and prints well.

---

### Phase 7: Local Admin / MDX Editor Page

**Goal**: A development-only page for composing MDX blog posts with live preview.

1. **Admin page** (`src/pages/admin/index.astro`)
   - Only rendered in `dev` mode (gate with `import.meta.env.DEV`)
   - In production, returns a 404 or redirect

2. **MDXEditor integration**
   - Install `@mdxeditor/editor`
   - Create a React component (`src/components/interactive/PostEditor.tsx`) that wraps MDXEditor
   - Use `client:only="react"` (MDXEditor doesn't support SSR)
   - Configure plugins: headings, lists, tables, code blocks, links, images, frontmatter
   - Configure `jsxPlugin` with descriptors for your custom components (NbaChart, Callout, etc.) so they render inline in the editor

3. **Editor features**
   - **Live preview**: MDXEditor provides WYSIWYG inline preview by default
   - **Frontmatter editing**: Form fields for title, description, tags, pubDate
   - **Save to file**: Button that writes the MDX content to `src/content/blog/[slug].mdx` via a local API endpoint (Astro dev server endpoint or a simple script)
   - **Load existing posts**: Dropdown to select and edit existing posts from the content directory

4. **Alternative lightweight approach**
   If MDXEditor proves too heavy or complex for your needs:
   - Use a split-pane editor: raw MDX textarea on the left, rendered preview on the right
   - Preview rendered via `@mdx-js/mdx` `compile` + `evaluate` on the client
   - Simpler but still gives live feedback

**Deliverable**: Local-only admin page for composing and previewing MDX posts.

---

### Phase 8: Performance & Accessibility Hardening

**Goal**: Achieve 95+ Lighthouse scores and WCAG 2.2 AA compliance.

1. **Performance checklist**
   - [ ] All pages render as static HTML (verify zero unexpected JS in production build)
   - [ ] Images: use `<Image />` / `<Picture />` from `astro:assets`, AVIF/WebP with fallbacks
   - [ ] Hero image: `loading="eager"`, preloaded in `<head>`
   - [ ] Below-fold images: `loading="lazy"`
   - [ ] Fonts: self-hosted WOFF2, subsetted, preloaded, `font-display: swap`
   - [ ] CSS: Tailwind purge removes unused styles (automatic)
   - [ ] Islands: verify `client:visible` components don't load JS until scrolled to
   - [ ] No layout shift: all images have explicit `width`/`height`, font fallback matches metrics
   - [ ] Shiki syntax highlighting: verify zero client JS (all build-time)
   - [ ] Add `<link rel="sitemap" href="/sitemap-index.xml">` (via `@astrojs/sitemap`)

2. **Accessibility checklist**
   - [ ] Skip link works and is first focusable element
   - [ ] All landmark regions present: `<header>`, `<nav>`, `<main>`, `<footer>`
   - [ ] Multiple `<nav>` elements have distinct `aria-label`s
   - [ ] Heading hierarchy is logical (one `<h1>` per page, sequential)
   - [ ] All images have meaningful `alt` text (or `alt=""` for decorative)
   - [ ] Color contrast: 4.5:1 minimum for normal text, 3:1 for large text
   - [ ] Focus indicators visible on all interactive elements (minimum 3:1 contrast)
   - [ ] `aria-current="page"` on active nav link
   - [ ] Theme toggle has `aria-label`
   - [ ] Interactive components are keyboard navigable
   - [ ] No content requires horizontal scrolling at 400% zoom
   - [ ] Links distinguished by more than color alone (underline)
   - [ ] Test with VoiceOver / NVDA screen reader

3. **SEO**
   - [ ] Install `@astrojs/sitemap` for automatic sitemap generation
   - [ ] Add `robots.txt` to `public/`
   - [ ] Canonical URLs on all pages
   - [ ] Open Graph + Twitter Card meta on all pages
   - [ ] JSON-LD structured data (Person on home, BlogPosting on posts)
   - [ ] RSS feed for blog (`@astrojs/rss`)

4. **Testing**
   - Run Lighthouse CI in GitHub Actions
   - Use `eslint-plugin-jsx-a11y` for React components
   - Manual keyboard navigation test
   - Screen reader test

**Deliverable**: Production-ready site with excellent Lighthouse scores and accessibility.

---

### Phase 9: Polish & Launch

1. **404 page** -- Custom styled 404 page
2. **RSS feed** -- Via `@astrojs/rss`, auto-generated from Content Collections
3. **Sitemap** -- Via `@astrojs/sitemap`
4. **OG image generation** -- Consider `satori` or `@vercel/og`-style approach for dynamic OG images per blog post
5. **Analytics** -- Cloudflare Web Analytics (free, privacy-friendly, no JS needed -- just a `<script>` tag) or Plausible/Fathom
6. **Custom domain** -- Configure in Cloudflare Pages settings
7. **Final review** -- Cross-browser testing (Chrome, Firefox, Safari), mobile testing, one final Lighthouse audit

---

## Key Architectural Decisions

### Why Astro over Next.js (inspired by Josh Comeau's pain points)

Josh Comeau's blog post reveals significant pain with Next.js App Router: 30-60s dev server startup, CSS over-bundling (245KB loaded, 47KB used), and Server Components complexity. Astro avoids all of these:

- **Zero JS by default** -- static HTML, no hydration overhead for content pages
- **Islands architecture** -- only interactive components ship JS, and only when needed
- **Fast dev server** -- Vite-based, sub-second hot reload
- **Native MDX support** -- first-class integration, no `next-mdx-remote` workaround needed
- **Simpler mental model** -- no Server vs Client Component decisions, just "add `client:*` when you need interactivity"

### Why static build (no Cloudflare adapter)

A blog doesn't need SSR. Static build means:
- Fastest possible TTFB (files served directly from edge CDN)
- No cold starts, no function invocations, no billing surprises
- Simpler deployment and debugging
- Can always add the adapter later for specific SSR routes if needed

### Why MDXEditor for the admin page

- Only library that natively understands MDX syntax with JSX components
- Built on Meta's Lexical framework (robust, well-maintained)
- `jsxPlugin` lets you register your custom components with custom inline editors
- Local-only approach keeps the architecture simple (no auth, no database, no API)
- Posts save as `.mdx` files committed to the repo -- content lives in version control

### Why Tailwind CSS

- Purges unused CSS at build (tiny production bundles)
- `darkMode: 'class'` integrates cleanly with the theme toggle
- Utility-first approach avoids CSS specificity wars
- Excellent Astro integration via `@astrojs/tailwind`
- No runtime JS overhead (unlike CSS-in-JS)

---

## Dependencies Summary

### Core
- `astro` -- Framework
- `@astrojs/mdx` -- MDX integration
- `@astrojs/react` -- React islands
- `@astrojs/tailwind` -- Tailwind integration
- `@astrojs/sitemap` -- Sitemap generation
- `@astrojs/rss` -- RSS feed
- `react`, `react-dom` -- React runtime (only shipped for hydrated islands)
- `tailwindcss` -- Styling
- `typescript` -- Type safety

### Blog components
- `recharts` or `visx` -- Charts for NBA data viz (lazy-loaded per island)
- `reading-time` -- Calculate reading time from MDX content

### Admin page (dev dependency)
- `@mdxeditor/editor` -- WYSIWYG MDX editor

### Dev tooling
- `prettier` + `prettier-plugin-astro` + `prettier-plugin-tailwindcss` -- Formatting
- `eslint` + `eslint-plugin-astro` + `eslint-plugin-jsx-a11y` -- Linting + accessibility
