# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This is a GitHub profile repository (`Aafff623/Aafff623`). The `README.md` at the root is rendered as the public GitHub profile page for user `Aafff623`. All other files are static assets referenced by the README or by local preview files.

## Build / test / lint commands

There is no build system, package manager, test suite, or linter in this repository. It contains only static Markdown, HTML, SVG, PNG, and GIF files.

## Development workflow

- **Source of truth for the published profile:** `README.md`.
- **Local preview:** `preview-profile.html` is a standalone HTML file that mirrors the README layout using the same `assets/` files. Open it directly in a browser to check visual changes before updating `README.md`.
- **Asset paths:** Use relative paths (e.g., `./assets/v9-banner.gif`) in `README.md` so they resolve correctly on GitHub. External badges and images use HTTPS URLs.
- **Copy style:** Write in first person and use specific, restrained language. Avoid slogans, promotional adjectives, and AI filler. Use `humanizer-output-style` as the editing reference.

## Content from README.md

- **Profile:** Second-year Software Engineering student working on AI-assisted development, web applications, and Web3.
- **Stack:** Claude Code, Kiro, Codex, MCP, and reusable Skills for development work; React, Vue, Tailwind CSS, and related frontend tools; Java Spring Boot and FastAPI on the backend.
- **Projects:**
  - `AgentCFO`: Web3 hackathon team project; frontend lead for the landing page and console demo.
  - `my-blogs`: Personal blog based on an open-source template, with GitHub content storage and Vercel deployment.
  - `AI Web3 Study Track`: Notes, exercises, and hackathon work from an AI and Web3 cohort.
- **Workflow model:** GPT is mainly used for early exploration, Claude Code and Kiro for implementation, and Codex for a second review. The author decides what to keep and what to change.
- **Contact:** GitHub [@Aafff623](https://github.com/Aafff623).

## Repository structure

```
README.md                 # Public GitHub profile content
preview-profile.html      # Local preview of the README layout (not published)
CONTEXT.md                # Project context, audience, constraints, and decisions
LANGUAGE.md               # Glossary and naming conventions for the profile
docs/adr/                 # Architecture Decision Records
assets/
  v9-banner.gif           # Current pixelized-mascot banner used by README and preview
  hero-knight.png         # Hero image used by README and preview
  mascot.gif              # Animated mascot (looping GIF) beside the Tech Stack section
```

## Documentation

This repo follows the Matt Pocock single-context documentation layout:

- `CONTEXT.md` — project purpose, audience, constraints, asset conventions, and active decisions.
- `LANGUAGE.md` — glossary for profile sections, assets, workflow terms, and badge conventions.
- `docs/adr/` — Architecture Decision Records for significant choices (e.g., mascot GIF format).

When starting a significant change, align on intent using these docs, then update them as decisions land.
