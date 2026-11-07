# Living memory for the hourly portfolio-iteration routine

Stack: Astro 7 static site (direction v2: dark-first editorial redesign, one teal accent; see ROADMAP.md; tokens + AA contrast test in tests/contrast.test.mjs), deployed as a Cloudflare Worker (`wrangler.toml`, serves `dist/`).
Single page: `src/pages/index.astro`; layout `src/layouts/Base.astro`; tokens in `src/styles/tokens.css`.
Goal of the routine: improve capabilities, polish and professionalism WITHOUT adding much content. Verify with `npm run build` (and `npm run check`) before committing. Don't open PRs unless asked; push to the designated branch.

## Visual check
`npm run build` then `CHROMIUM=<browser-path> node scripts/visual-check.mjs --widths 320,360,375,1280 --out /tmp/visual-check`.
It serves `dist/` in-process, screenshots each width, and exits 1 on horizontal overflow. Requires `playwright` as a project dependency (not yet added; see the needs-decision friction issue). Exit codes: 0 ok, 1 overflow, 2 setup missing. Open the PNGs to check layout; the script does not judge aesthetics.

## Log (newest first)
- 2026-11-07 (factory run): Added the Succulents.info case study (`src/content/work/succulents-info.md`, claims sourced from its README/CLAUDE.md) and linked it from the work card (no GitHub source link: the repo is private and tests/build.test.mjs guards that). Ticked ROADMAP v2 items 2-8 as shipped (6 cut by direction v3). Checked: `npm run build`, `npm test`. Next: Garden Defense is the only card without a case study (needs facts from its repo), else backlog is owner-input items.
- 2026-11-03 (factory run): Direction v3 — refocus the site on Tony, not the factory. Rewrote hero claim/sub to lead with frontend + accessibility; pi-durable-local now gets one short mention. Removed the Pipeline hero element and the "How I build" Factory section from the index (components kept in repo, unused). Updated og:image:alt to match. Checked: `npm run build` clean; `npm test` (contrast + build smoke) green. Next: Tony to confirm the new hero copy lands, then either restore a compact "how I think" element or move on to OG refresh.
- 2026-10-23 (hourly run): axe-core pass via Playwright on built site, light + dark: 0 violations. Build + check clean. (To rerun: `npm ci`, `npm run build`, `astro preview`, inject axe-core.) Nothing else changed; remaining backlog needs owner input.
- 2026-10-23 (hourly run): Added Cross-Origin-Resource-Policy: same-origin header. Reduced-motion + forced-colors already handled in base.css. Site is at diminishing returns; remaining backlog needs owner input or a real PNG.
- 2026-10-23 (hourly run): Added Content-Security-Policy to public/_headers (self-only; inline script/style allowed for theme script + Astro styles). If external fonts/analytics/images are ever added, update the CSP.
- 2026-10-23 (hourly run): Added /.well-known/security.txt (contact = LinkedIn; Expires 2027-10-23 — renew before then). Remaining: OG PNG, axe pass, resume/email.
- 2026-10-23 (owner asked to use LinkedIn for inspiration): Public profile (linkedin.com/in/tonyjmartinez) confirms bio already matches (9 yrs, accessibility). Added LinkedIn button + JSON-LD sameAs. Profile also lists tonyjmartinez.com and 23vs23.com; employer shown is Vanta but NOT added to site (owner hasn't asked). Remaining: OG PNG, axe pass, resume/email.
- 2026-10-23 (later): Added COOP + HSTS headers and author meta. Site is quite polished; remaining backlog items need owner input or a real PNG.
- 2026-10-23: Print stylesheet (plain ink, hides toggle/skip link, shows link URLs). Focus ring reviewed: ink ring + yellow halo on light; cream ring on dark paper — acceptable.
- 2026-10-22 (later): Web manifest, `public/_headers` (security + immutable asset cache headers), color-scheme meta, theme toggle hidden until JS runs (no dead button).
- 2026-10-22: Added footer light/dark theme toggle (persisted, no-flash inline script), JSON-LD Person data, 404 page, sitemap.xml + robots sitemap link, this file.

## Ideas backlog
- ~~Social/OG image~~ done: scripts/generate-og.mjs -> public/og.png
- ~~a11y pass with Playwright + axe~~ done (0 violations); Lighthouse optional
- Add a link to resume/email once the owner supplies them (do not invent)
