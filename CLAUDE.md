# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Rules & Context

- **Shared rules:** Read and follow [`AGENTS.md`](AGENTS.md). It is the shared entry point across all AI coding agents — do not create a second competing rule system here.
- **Domain facts & decisions:** Refer directly to [`CONTEXT.md`](CONTEXT.md) for verified facts, constraints, active decisions, and `待确认` items.
- **Workspace boundaries:** Check [`temp/AGENTS.md`](temp/AGENTS.md) before creating or modifying temporary materials under `temp/`.
- **Durable records:** Architecture decisions are recorded in [`docs/adr/`](docs/adr/), and asset reproduction instructions are in [`docs/assets-reproduction.md`](docs/assets-reproduction.md).

## Quick Guidance

- **No build system:** Pure static repository (Markdown, HTML, SVG, WebP, GIF). No npm, pip, or test runners.
- **Published profile:** `README.md` (EN) is the sole published profile page. `README.zh.md` is the local-review Chinese mirror; keep them synchronized on the same branch.
- **Local previews (二元模式)**: 成品展示预览访问 `http://localhost:3000/`；本地编辑/调试模式访问 `http://localhost:3000/edit` 或运行 `scripts/open-previews.bat` 打开 `temp/preview/preview-profile.html` 及中文版（具备隐藏工具栏、内联编辑与批注侧边栏）。
- **Writing tone:** Follow `humanizer-tone` — direct, specific, modest, first-person.



