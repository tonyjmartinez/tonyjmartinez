# Living memory for the hourly portfolio-iteration routine

Stack: Astro 7 static site ("Rosette" succulents design system), deployed as a Cloudflare Worker (`wrangler.toml`, serves `dist/`).
Single page: `src/pages/index.astro`; layout `src/layouts/Base.astro`; tokens in `src/styles/tokens.css`.
Goal of the routine: improve capabilities, polish and professionalism WITHOUT adding much content. Verify with `npm run build` (and `npm run check`) before committing. Don't open PRs unless asked; push to the designated branch.

## Log (newest first)
- 2026-10-22 (later): Web manifest, `public/_headers` (security + immutable asset cache headers), color-scheme meta, theme toggle hidden until JS runs (no dead button).
- 2026-10-22: Added footer light/dark theme toggle (persisted, no-flash inline script), JSON-LD Person data, 404 page, sitemap.xml + robots sitemap link, this file.

## Ideas backlog
- Social/OG image (needs a real PNG; summary card is used now)
- Check color contrast of focus ring / toggle in both themes
- Print stylesheet polish
- Lighthouse/a11y pass with Playwright + axe
- Add a link to resume/LinkedIn/email once the owner supplies them (do not invent)
