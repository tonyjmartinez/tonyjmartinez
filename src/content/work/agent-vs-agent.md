---
title: "Agent vs Agent"
summary: "A small bump-and-run spy board game for phone and desktop browsers."
live: https://agent-vs-agent.ajosephmartinez.workers.dev/
source: https://github.com/tonyjmartinez/agent-vs-agent
sources:
  - README.md
  - DESIGN_NOTES.md
  - package.json
problem: "A board game that works as well on a phone as on a desktop, with rules simple enough to learn quickly and a balance that holds up under test."
does:
  - "Two agents per side on a 6×6 board; move one square and everything next to where you land is bumped one square away."
  - "Bump spies off the edge to burn them, grab intel from the middle and carry 3 home to win."
  - "Ships 21 tactical missions, each proven solvable by src/missions.test.ts."
  - "Installs to a phone home screen to play fullscreen like an app."
built:
  - "TypeScript with Vite, and Phaser 4.2.1 for rendering."
  - "Board sizing uses CSS container query units, so the board is always the largest square that fits between the HUDs in both orientations (DESIGN_NOTES.md)."
  - "Checks are typecheck, ESLint, Vitest and Playwright end-to-end tests at desktop and phone sizes; a self-play simulator (npm run sim) measures balance."
  - "A static-assets Cloudflare Worker serves dist/, configured by the repo's own wrangler.jsonc."
stack:
  - "TypeScript"
  - "Phaser"
  - "Vite"
  - "Vitest"
  - "Playwright"
  - "Cloudflare Workers"
interesting:
  - "Rule decisions are each encoded in a test; for example, intel never spawns on an extraction zone so it cannot hand out free points."
  - "Balance is measured with a self-play simulation between AI difficulty levels, with sides swapped."
---
