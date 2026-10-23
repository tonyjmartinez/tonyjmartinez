# Living memory for the hourly portfolio-iteration routine

Stack: Astro 7 static site ("Rosette" succulents design system), deployed as a Cloudflare Worker (`wrangler.toml`, serves `dist/`).
Single page: `src/pages/index.astro`; layout `src/layouts/Base.astro`; tokens in `src/styles/tokens.css`.
Goal of the routine: improve capabilities, polish and professionalism WITHOUT adding much content. Verify with `npm run build` (and `npm run check`) before committing. Don't open PRs unless asked; push to the designated branch.

## Log (newest first)
- 2026-10-23 (hourly run, last): Verified build + check clean, headers complete. No code changes; stop-gap: further iteration needs owner input (OG PNG, resume/email) — avoid churn.
- 2026-10-23 (hourly run): Added Cross-Origin-Resource-Policy: same-origin header. Reduced-motion + forced-colors already handled in base.css. Site is at diminishing returns; remaining backlog needs owner input or a real PNG.
- 2026-10-23 (hourly run): Added Content-Security-Policy to public/_headers (self-only; inline script/style allowed for theme script + Astro styles). If external fonts/analytics/images are ever added, update the CSP.
- 2026-10-23 (hourly run): Added /.well-known/security.txt (contact = LinkedIn; Expires 2027-10-23 — renew before then). Remaining: OG PNG, axe pass, resume/email.
- 2026-10-23 (owner asked to use LinkedIn for inspiration): Public profile (linkedin.com/in/tonyjmartinez) confirms bio already matches (9 yrs, accessibility). Added LinkedIn button + JSON-LD sameAs. Profile also lists tonyjmartinez.com and 23vs23.com; employer shown is Vanta but NOT added to site (owner hasn't asked). Remaining: OG PNG, axe pass, resume/email.
- 2026-10-23 (later): Added COOP + HSTS headers and author meta. Site is quite polished; remaining backlog items need owner input or a real PNG.
- 2026-10-23: Print stylesheet (plain ink, hides toggle/skip link, shows link URLs). Focus ring reviewed: ink ring + yellow halo on light; cream ring on dark paper — acceptable.
- 2026-10-22 (later): Web manifest, `public/_headers` (security + immutable asset cache headers), color-scheme meta, theme toggle hidden until JS runs (no dead button).
- 2026-10-22: Added footer light/dark theme toggle (persisted, no-flash inline script), JSON-LD Person data, 404 page, sitemap.xml + robots sitemap link, this file.

## Ideas backlog
- Social/OG image (needs a real PNG; summary card is used now)
- Lighthouse/a11y pass with Playwright + axe
- Add a link to resume/email once the owner supplies them (do not invent)
