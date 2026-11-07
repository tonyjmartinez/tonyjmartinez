---
title: "Succulents.info"
summary: "Plain-language succulent care: care guides, a plant library and a symptom-led plant doctor."
live: https://succulents-info.ajosephmartinez.workers.dev/
sources:
  - README.md
  - CLAUDE.md
  - "(from the repository)"
problem: "Succulent care advice online is dense and jargon-heavy. The brief is plain-language care guides, a plant library and a symptom-led plant doctor that anyone can use."
does:
  - "Care guides, a plant library and a symptom-led plant doctor, all in plain language with no jargon without a glossary entry."
  - "Everything works without JavaScript; small scripts only add optional interactive extras."
  - "Works at 360px wide and on desktop, in light and dark mode."
built:
  - "A static Astro site with no client framework, served from Cloudflare Workers static assets."
  - "One plant per content file, with schemas that fail the build on missing fields."
  - "Accessibility is enforced by tests: AAA colour contrast, an axe-core scan of every built page in light and dark, and an internal link check where every link and anchor must point somewhere real."
  - "GitHub Actions type-checks, tests, builds and deploys on every push; pull requests get their own preview URL."
stack:
  - "Astro"
  - "Static site"
  - "Cloudflare Workers"
interesting:
  - "Pet-safety guidance follows the ASPCA lists, and plant-care claims must be well established: no invented facts."
  - "It is iterated by agent sessions guided by in-repo rules, a roadmap and a run log."
---
