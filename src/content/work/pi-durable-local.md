---
title: "pi-durable-local"
summary: "A small, portable software factory where durable coding-agent sessions take work from idea to merged PR under budgets and merge gates."
source: https://github.com/tonyjmartinez/pi-durable-local
sources:
  - README.md
problem: "Coding agents are easy to start and hard to trust. The README frames the goal as agents that keep running on your machine and take work from idea to merged PR inside a sandbox, under budgets and merge gates you control."
does:
  - "Runs named, long-running agent sessions that survive restarts and crashes; the daemon resumes from the last committed step."
  - "Opens PRs from a template and drives them with a deterministic state machine (pr_tick) that runs an independent review and merges low and medium risk changes that pass every gate."
  - "Wakes a session on an interval to push a goal forward, within a dollar budget and an iteration cap."
  - "Shares one durable memory between sessions and lets them message each other."
  - "Notifies the owner when something needs them and logs friction as GitHub issues that other agents fix."
built:
  - "One daemon, pdd, owns a pi-durable SQLite store; a small client, pd, talks to it over a Unix socket with mode 0600."
  - "Every agent shell runs in a bubblewrap sandbox with no credentials; the daemon pushes and opens PRs on the agents' behalf, and an audit log records every decision."
  - "A gate decides in code, before any model runs, whether a loop tick is worth it."
  - "A local web UI (pd ui) serves a small page on 127.0.0.1 for watching and steering sessions."
stack:
  - "Node 24"
  - "SQLite"
  - "Unix sockets"
  - "bubblewrap"
  - "GitHub CLI"
  - "Anthropic API"
interesting:
  - "Exactly one process opens the store because pi-durable has no cross-process locking; the daemon connects to the socket first at startup and exits if another daemon answers."
  - "There is a chain of command. Opus Claude Code sessions outside pi act as generals; pi is the cheap workforce, with reasoning roles on Sonnet and Haiku only for tool work."
  - "Iterations start with fresh context, keep command output bounded, and are prompted to stop after 12 substantive turns."
---
