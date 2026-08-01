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

## Content from README.md

- **Profile:** Incoming third-year Software Engineering student at North University of China. Tagline: "Code Less, Architect More 🚀". Summer focus: Java microservices, Python / Python AI, Harness Engineering guided AI Coding; tools Cursor / Claude Code / Codex; evals domestic models + OpenAI / Anthropic / xAI (not Gemini). Optional emoji+kaomoji only at end of Intro / Agent / Learning body (never in headings). Outside tech: cycling, blog, digital garden, anime notes.
- **Section order:** Intro (banner, wordmark, self-intro table + hero, quick links: Email/Blog/Digital Garden) → Contact icons (no heading) → Agent workflow → Tech stack → Competitions → GitHub stats → Classic project → What I'm learning → Activity (`github-readme-activity-graph` line chart; no contribution-snake GIF).
- **Agent workflow:** Agents for exploration / research / repetitive edits / first-pass; tools Cursor / Claude Code / Codex + OpenCode Go; light CLI vs heavy IDE; harness over prompt; author owns design and every merge.
- **Competitions (2 cards only — do not restore dropped cards):**
  - `Lead Cup · vLLM on Hygon DCU`: 先导杯 / 智能计算创新设计赛题 1; team 翻斗花园; vLLM 0.18.1 · Qwen3.5-27B BF16 on Hygon DCU (gfx936) / SCNet; long-context concurrency=1. Author focus: shared-gate fusion, SwiGLU HIP, GDN packing, Gather-FA, LPK prefetch. Best run 87.7839/100 · #26/132. Links: GitLab submission + GitHub mirror. Thumbnail: `assets/comp-syscap-banner.webp`.
  - `AI4S · 书生国智科探挑战赛`: 模型与算子 track (Shanghai AI Lab × Biren / 飞翔杯 Agent·Skills); submission complete (完赛结项 2026-07-28), wrap-up in coming days; no public ranking yet. Thumbnail: `assets/comp-ai4s-ketan.webp`. Do not publish certificate personal names.
- **Tech stack:** ~59 shields.io `flat-square` badges across 10 categories (Frontend, Node.js/real-time, Java/Spring, AI/agents, Distributed systems, Data/middleware, Python/backend, Systems/inference, Web3, DevOps/observability). AI row includes Harness Agent + Loop Agent; Python row covers FastAPI ecosystem (Pydantic, SQLAlchemy, httpx, Celery, pytest, asyncio). MQ is RabbitMQ only; no Monad / Kafka badges. No AI-tools row. Mascot GIF in the right cell.
- **Classic project:** `AgentCFO` (repo under teammate `San-Y108/agent-cfo`): hackathon prototype for preparing/approving DAO treasury payments via Cobo Agentic Wallet; author was frontend lead (landing page + operator console); verified with two Sepolia/SETH payouts. Stack: Next.js, TypeScript, FastAPI, Cobo CAW.
- **What I'm learning:** AI-assisted E2E (MCP), light CLI × heavy IDE, Prompt→Context→Harness→Loop, custom Skills / Spec-driven Coding, indie App/mini-program + overseas payments. No Web3 / OS / systems-inference rows; no contest registration status.
- **Writing:** [Blog](https://my-blogs-roan-seven.vercel.app/) and [Digital Garden](https://threetwoa-digital-garden.vercel.app/), linked from the intro quick links.
- **Contact:** GitHub [@Aafff623](https://github.com/Aafff623), X, Bilibili, Telegram, YouTube.

## Repository structure

```text
README.md                      # Public GitHub profile content (EN)
README.zh.md                   # Chinese mirror for local review (not the GitHub profile page)
preview-profile.html           # Local EN preview (saved GitHub render)
preview-profile.zh.html        # Local ZH preview (saved GitHub render)
open-previews.bat / .ps1       # Open EN + ZH previews together
CONTEXT.md                     # Project context, audience, constraints, and decisions
LANGUAGE.md                    # Glossary and naming conventions for the profile
AGENTS.md                      # Cross-tool entry point for AI agents
CONTRIBUTING.md / SECURITY.md / LICENSE  # Community and maintenance files
docs/
  adr/                         # Architecture Decision Records (0001 superseded by 0002)
  dark-mode-checklist.md       # Dark-mode capability notes and to-dos
  tech-stack-3d-mascot-plan.md # 3D mascot production plan (implemented)
  assets-reproduction.md       # How each assets/ file was produced and regenerated
assets/
  v9-banner.gif                # Animated banner used by README and preview
  brand-threetwoa.svg          # Light-theme wordmark
  brand-threetwoa-dark.svg     # Dark-theme wordmark selected with <picture>
  hero-knight.webp             # Intro hero (rounded-alpha WebP, see ADR 0003)
  mascot.gif                   # Light-theme animated mascot (Tech Stack section)
  mascot-dark.gif              # Dark-theme animated mascot selected with <picture>
```

`assets/` contains only files currently used by the published profile. `.scratch/` is ignored, disposable local workspace for generated frames, compression candidates, and visual checks. Do not reference `.scratch/` from `README.md` or tracked documentation; durable production decisions belong in `CONTEXT.md` or an ADR.

## Documentation

This repo follows the Matt Pocock single-context documentation layout:

- `CONTEXT.md` — project purpose, audience, constraints, asset conventions, and active decisions.
- `LANGUAGE.md` — glossary for profile sections, assets, workflow terms, and badge conventions.
- `docs/adr/` — Architecture Decision Records for significant choices (e.g., mascot GIF format).
- `docs/assets-reproduction.md` — how each `assets/` file was produced and how to regenerate it.

When starting a significant change, align on intent using these docs, then update them as decisions land.
