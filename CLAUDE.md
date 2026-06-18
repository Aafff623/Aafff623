# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This is a GitHub profile repository (`Aafff623/Aafff623`). The `README.md` at the root is rendered as the public GitHub profile page for user `Aafff623`. All other files are static assets referenced by the README or by local preview files.

## Build / test / lint commands

There is no build system, package manager, test suite, or linter in this repository. It contains only static Markdown, HTML, SVG, PNG, and GIF files.

## Development workflow

- **Source of truth for the published profile:** `README.md`.
- **Local preview:** `preview-profile.html` is a standalone HTML file that mirrors the README layout using the same `assets/` files. Open it directly in a browser to check visual changes before updating `README.md`.
- **Asset paths:** Use relative paths (e.g., `./assets/v7-banner.gif`) in `README.md` so they resolve correctly on GitHub. External badges and images use HTTPS URLs.

## Content from README.md

- **Builder identity:** Agentic Coding Explorer · Workflow Practitioner · Web3 & AI Hackathon Frontend & Full-Stack Builder
- **Stack:** Claude Code, Cursor, Codex, MCP, Skills, Workflow on the AI side; React, Vue, Tailwind CSS, Framer Motion, Web3 on the frontend; Java Spring Boot and FastAPI on the backend.
- **Projects:**
  - `AgentCFO` — DAO AI 财务官 / Web3 hackathon team project (frontend lead / contributor).
  - `threetwoa-blogs` — Valaxy static blog with Sakura theme, ECharts visualizations, and progressive UI enhancements.
  - `AI Web3 Study Track` — Full learning and hackathon journey through the AI Web3 cohort, with custom Skills and Smart Account + Session Key work.
- **Workflow model:** GPT drives deep planning and creative sparks, Claude Code handles execution and architecture, Codex ensures rigorous review — with me always steering the human judgment layer to close the loop from idea to shipped product.
- **Contact:** GitHub [@Aafff623](https://github.com/Aafff623).

## Repository structure

```
README.md                 # Public GitHub profile content
preview-profile.html      # Local preview of the README layout (not published)
CONTEXT.md                # Project context, audience, constraints, and decisions
LANGUAGE.md               # Glossary and naming conventions for the profile
docs/adr/                 # Architecture Decision Records
assets/
  v7-banner.gif           # Banner image used by README and preview
  hero-knight.png         # Hero image used by README and preview
  mascot.gif              # Animated mascot (looping GIF) beside the Tech Stack section
```

## Documentation

This repo follows the Matt Pocock single-context documentation layout:

- `CONTEXT.md` — project purpose, audience, constraints, asset conventions, and active decisions.
- `LANGUAGE.md` — glossary for profile sections, assets, workflow terms, and badge conventions.
- `docs/adr/` — Architecture Decision Records for significant choices (e.g., mascot GIF format).

When starting a significant change, align on intent using these docs, then update them as decisions land.
