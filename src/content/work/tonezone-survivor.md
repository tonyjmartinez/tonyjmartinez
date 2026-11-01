---
title: "Tone Zone Survivors"
summary: "A Vampire Survivors-like in plain HTML5 canvas with no build step."
live: https://tonezone-survivor.ajosephmartinez.workers.dev/
source: https://github.com/tonyjmartinez/tonezone-survivor
sources:
  - README.md
  - package.json
  - "src/ directory listing (game.js, sprites.js)"
problem: "The README sets a deliberately small brief: a Vampire Survivors-like in plain HTML5 canvas, with no build step, where you open index.html and play."
does:
  - "Move with WASD or arrow keys, or drag on touch screens."
  - "Weapons fire automatically."
  - "Pick an upgrade on level-up with keys 1-3 or by tapping."
built:
  - "Plain HTML5 canvas; the game code lives in src/game.js and src/sprites.js and is loaded from index.html."
  - "A smoke test (tests/smoke.js) runs with Node."
  - "Cloudflare deploys every push to main through its GitHub connection; npm run build copies the game into dist/ and wrangler deploy publishes it (config in wrangler.jsonc)."
  - "The repo carries agent rules (CLAUDE.md), a plan (ROADMAP.md) and a living log (MEMORY.md) so agent sessions can pick up where the last one stopped."
stack:
  - "JavaScript"
  - "HTML5 canvas"
  - "Cloudflare Workers"
interesting:
  - "No framework and no bundler: opening index.html is enough to run it."
  - "It is developed with agent sessions, guided by in-repo rules, roadmap and memory files."
---
