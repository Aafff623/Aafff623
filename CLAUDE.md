# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This is a GitHub profile repository (`Aafff623/Aafff623`). The `README.md` at the root is rendered as the public GitHub profile page for user `Aafff623`. All other files are static assets referenced by the README or by local preview files.

## Build / test / lint commands

There is no build system, package manager, test suite, or linter in this repository. It contains only static Markdown, HTML, SVG, and PNG files.

## Development workflow

- **Source of truth for the published profile:** `README.md`.
- **Local preview:** `preview-profile.html` is a standalone HTML file that mirrors the README layout using the same `assets/` files. Open it directly in a browser to check visual changes before updating `README.md`.
- **Asset paths:** Use relative paths (e.g., `./assets/v7-banner.gif`) in `README.md` so they resolve correctly on GitHub. External badges and images use HTTPS URLs.

## Content from README.md

- **Builder identity:** AI Workflow Builder · Spec-driven Student Builder · Web3 Hackathon Frontend.
- **Stack:** Claude Code, Cursor, Codex, MCP, Skills, Workflow on the AI side; React, Vue, Tailwind CSS, Framer Motion, Web3 on the frontend; Java Spring Boot and FastAPI on the backend.
- **Projects:**
  - `AgentCFO` — DAO AI 财务官 / Web3 hackathon team project (frontend lead / contributor).
  - `threetwoa-blogs` — Valaxy static blog with Sakura theme, ECharts visualizations, and progressive UI enhancements.
  - `threetwoa-cc-workshop` — AI Workflow Operating System / Claude Code 配置工坊 & 知识资产库.
- **Workflow model:** GPT as Brain · Claude Code as Executor · Codex as Reviewer · Human-in-the-loop.
- **Contact:** GitHub [@Aafff623](https://github.com/Aafff623).

## Repository structure

```
README.md                 # Public GitHub profile content
preview-profile.html      # Local preview of the README layout (not published)
assets/
  v7-banner.gif           # Banner image used by README and preview
  hero-knight.png         # Hero image used by README and preview
  mascot.png              # Transparent-background mascot beside the Tech Stack section
```
