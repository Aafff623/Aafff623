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
  - `threetwoa-digital-garden` (Other projects): Personal digital garden for notes, photo walls, footprints, and archives; Next.js + Vercel.
  - `my-blogs`: Still referenced under full-stack work and Quick links; personal blog based on an open-source template.
  - `AI Web3 Study Track`: Notes, exercises, and hackathon work from an AI and Web3 cohort.
  - `vllm-cscc-leadcup` (also in "What I've been working on"): 2026 Lead Cup Problem 1; kernel-level vLLM optimization on Hygon DCU (gfx936) for Qwen3.5-27B; best score 87.7839/100. Dual links: GitHub mirror + GitLab submission.
- **Writing:** [Blog](https://my-blogs-roan-seven.vercel.app/) and [Digital Garden](https://threetwoa-digital-garden.vercel.app/), linked from a Quick links line below the intro table and from the Contact icon row.
- **Workflow model:** GPT is mainly used for early exploration, Claude Code and Kiro for implementation, and Codex for a second review. The author decides what to keep and what to change.
- **Contact:** GitHub [@Aafff623](https://github.com/Aafff623).

## Repository structure

```text
README.md                      # Public GitHub profile content
preview-profile.html           # Local preview of the README layout (not published)
CONTEXT.md                     # Project context, audience, constraints, and decisions
LANGUAGE.md                    # Glossary and naming conventions for the profile
docs/adr/                      # Architecture Decision Records
assets/
  v9-banner.gif                # Animated banner used by README and preview
  brand-threetwoa.svg          # Light-theme wordmark
  brand-threetwoa-dark.svg     # Dark-theme wordmark selected with <picture>
  hero-knight.png              # Optimized 800×1000 intro hero image
  mascot.gif                   # Animated mascot beside the Tech Stack section
```

`assets/` contains only files currently used by the published profile. `.scratch/` is ignored, disposable local workspace for generated frames, compression candidates, and visual checks. Do not reference `.scratch/` from `README.md` or tracked documentation; durable production decisions belong in `CONTEXT.md` or an ADR.

## Documentation

This repo follows the Matt Pocock single-context documentation layout:

- `CONTEXT.md` — project purpose, audience, constraints, asset conventions, and active decisions.
- `LANGUAGE.md` — glossary for profile sections, assets, workflow terms, and badge conventions.
- `docs/adr/` — Architecture Decision Records for significant choices (e.g., mascot GIF format).

When starting a significant change, align on intent using these docs, then update them as decisions land.
