# Roadmap: next milestone

Single-page Astro site (`src/pages/index.astro`, tokens in `src/styles/tokens.css`). Items are ordered by user value, each sized for one loop iteration. Every item must be verifiable from code (`npm run build`, `npm run check`, `npm test`). No new fonts, images or dependencies, and no copy that states facts not already in the repo.

## Design (design-polish loop)

1. **Add a `prefers-contrast: more` block.** Why: `base.css` handles `prefers-reduced-motion`, `forced-colors` and print, but `grep prefers-contrast src` finds nothing. Raise muted text, borders and shadows to full ink in `tokens.css`. Test: compute contrast ratios from the token values.
2. **Make work-card hover and active states consistent with `.btn`.** Why: `.btn` lifts 2px on hover and presses 3px on active (`ui.css` lines 31-38), while cards lift 3px (`ui.css` ~136). Unify the offsets into shared tokens and keep the reduced-motion guard.
3. [x] **Audit the 360px layout of hero, cards and footer by code.** Why: `scripts/visual-check.mjs` exists but runs only at 375 and 1280. Add 320 and 360 to the documented widths in `CLAUDE.md`, and fix any overflow or tight spacing found, using `--space-*` tokens only.
4. **Print and 404 polish.** Why: print has its own stylesheet (`base.css` ~232) and `404.astro` is the only other page. Check both use tokens and have a clear primary action. Touches `404.astro` and the print block only.

## Product (product loop)

5. **Add a "back to top" link in the footer.** Why: the page is long on mobile and has `#work` anchors but no way back (`scroll-padding-top` is already set). A native anchor needs no JS. Test: add a build assertion in `tests/build.test.mjs`.
6. **Expand the build smoke tests.** Why: `tests/build.test.mjs` covers the h1, canonical and robots only. Add checks that the JSON-LD parses, every `href="#..."` has a matching id, and the `_headers` CSP has no external origins. This protects the CSP rule noted in `CLAUDE.md`.
7. **Add a `.github` PR/CI proposal check.** Why: `docs/proposed-ci` holds a CI workflow that is not active. Document in the README how to enable it. Docs only, and wiring it up is Tony's call.

## Blocked on Tony

Tracked in one `needs-decision` issue, "needs-decision: owner facts for the portfolio (resume/email, OG image, custom domain)". We need exactly:

- **Resume URL or contact email.** Optional; omitted if you don't want it public.
- **OG image.** A real PNG, 1200x630, committed to `public/`.
- **Custom domain.** Confirm that `tonyjmartinez.com` is attached to the Worker. The canonical URL already assumes it.
- **Descriptions of other repos or projects.** Any copy about projects beyond the live cards (for example employer or other repos) needs facts from you, because unverified project copy is rejected in review (pi-durable-local#3).
