# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This is a GitHub profile repository (`Aafff623/Aafff623`). The `README.md` at the root is rendered as the public GitHub profile page for user `Aafff623`. All other files are static assets referenced by the README or by local preview files.

## Build / test / lint commands

There is no build system, package manager, test suite, or linter in this repository. It contains only static Markdown, HTML, SVG, PNG, and GIF files.

## Development workflow

- **Source of truth for the published profile:** `README.md` (English; GitHub profile page).
- **Chinese mirror:** `README.zh.md` — same structure/facts as `README.md` on the current branch (local review only).
- **Local preview:** `preview-profile.html` (EN) and `preview-profile.zh.html` (ZH). Open both together with `open-previews.bat` / `open-previews.ps1`. Keep each preview paired with its README.
  - These are **saved GitHub renders** (they contain `camo.githubusercontent.com` proxied URLs and GitHub web components such as `themed-picture` / `markdown-accessiblity-table`), plus a small hand-added dark-mode `<style>` and an EN/中文 switcher — not hand-written HTML mirrors.
  - **Regenerate** after a README change by re-rendering the README on GitHub and saving the article HTML, then re-adding the `<style>` block and switcher — do not hand-edit badge markup.
  - They can **drift** from the README because the camo URLs are frozen at capture time (e.g., a stats dark URL may lag). `README.md` remains the source of truth.
- **Bilingual sync:** On any branch, EN↔ZH must stay aligned with **that branch’s** English files, not another branch’s Chinese. Change structure/facts/links in both languages in the same edit.
- **Asset paths:** Use relative paths (e.g., `./assets/v9-banner.gif`) in `README.md` so they resolve correctly on GitHub. External badges and images use HTTPS URLs.
- **Copy style:** Write in first person and use specific, restrained language. Avoid slogans, promotional adjectives, and AI filler. Use `humanizer-output-style` as the editing reference.
- **Source of truth for facts & decisions:** Refer directly to `CONTEXT.md` for background, glossary, copy conventions, and active decisions. Do not duplicate facts across entry files.

## Repository structure

```text
README.md                      # Public GitHub profile content (EN)
README.zh.md                   # Chinese mirror for local review (not the GitHub profile page)
preview-profile.html           # Local EN preview (saved GitHub render)
preview-profile.zh.html        # Local ZH preview (saved GitHub render)
open-previews.bat / .ps1       # Open EN + ZH previews together
CONTEXT.md                     # Single source of truth (context, constraints, glossary, decisions)
AGENTS.md                      # Cross-tool entry point for AI agents
LICENSE                        # MIT License
docs/
  adr/                         # Architecture Decision Records (0001 - 0007)
  assets-reproduction.md       # How each assets/ file was produced and regenerated
assets/
  v9-banner.gif                # Animated banner used by README and preview
  brand-threetwoa.gif          # Light-theme typewriter wordmark (ADR 0005)
  brand-threetwoa-dark.gif     # Dark-theme typewriter wordmark selected with <picture>
  brand-threetwoa.svg          # Editable SVG source for the light GIF
  brand-threetwoa-dark.svg     # Editable SVG source for the dark GIF
  hero-knight.webp             # Intro hero (sharp-corner WebP, see ADR 0003)
  mascot.gif                   # Light-theme animated mascot (Tech Stack section)
  mascot-dark.gif              # Dark-theme animated mascot selected with <picture>
  comp-syscap-banner.webp      # Lead Cup competition thumbnail (960×360 WebP)
  comp-ai4s-ketan.webp         # AI4S competition thumbnail (960×360 WebP)
  agentcfo-banner.webp         # Classic project banner (self-hosted copy of upstream)
temp/
  README.md                    # Temp workspace boundary explanation
  AGENTS.md                    # Temp handling rules for agents
```

`assets/` contains only binary files currently referenced by the published profile. `temp/` is the ignored, disposable local workspace for generated frames, compression candidates, and scratch reports. Payloads must not be committed. Do not reference `temp/` from `README.md` or public documentation; durable production decisions belong in `CONTEXT.md` or `docs/adr/`.

## Documentation & Rules

This repo follows the unified single-context documentation layout:

- `AGENTS.md` — cross-tool shared rules, repo nature, and file boundaries.
- `CONTEXT.md` — project purpose, audience, constraints, glossary, asset conventions, and active decisions.
- `temp/AGENTS.md` — local workspace rules before working under `temp/`.
- `docs/adr/` — Architecture Decision Records for significant choices (0001 - 0007).
- `docs/assets-reproduction.md` — how each `assets/` file was produced and how to regenerate it.


