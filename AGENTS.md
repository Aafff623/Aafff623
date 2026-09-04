# AGENTS.md

Cross-tool entry point for AI coding agents (Cursor, Codex, and other AGENTS.md-aware tools). Claude Code reads `CLAUDE.md` directly.

## Repo nature

Static **GitHub profile repository** (`Aafff623/Aafff623`). The root `README.md` is rendered as the public profile page. **No build system, package manager, test suite, or linter** — only Markdown, HTML, SVG, PNG, and GIF.

## Source of truth

- **Published profile (GitHub)** → `README.md` (English only; GitHub renders this as the public profile)
- **Chinese mirror (local review)** → `README.zh.md` — same structure/facts as `README.md` on **this branch**
- **Local previews (二元模式)**:
  - **成品展示预览**: `http://localhost:3000/` (`index.html`) — 真实 GitHub 渲染成品效果，无覆盖工具栏；
  - **本地编辑/调试模式**: `http://localhost:3000/edit` 或 `temp/preview/preview-profile.html` (EN) + `temp/preview/preview-profile.zh.html` (ZH)（通过 `scripts/open-previews.bat` 批量启动），内置隐藏式浮动工具栏、内联文字实时编辑（Live Edit）、智能引用批注侧边栏（Annotations）与 AI 审查 Prompt 导出。
- **Asset paths** must be relative (`./assets/...`) so they resolve on GitHub; external badges use HTTPS
- **Profile copy** should be direct, specific, and modest. Use first person, prefer facts and links over labels, and apply the anti-AI patterns from `humanizer-tone`.

## Bilingual sync (per branch)

- EN and ZH are maintained **on the same branch together**. Changing structure, facts, links, or layout in EN requires the matching ZH update in the same change set.
- ZH on a branch must mirror **that branch’s** EN (`README.md` / `temp/preview/preview-profile.html`), not another branch’s Chinese files.
- Pairing: `README.md` ↔ `README.zh.md`; `temp/preview/preview-profile.html` ↔ `temp/preview/preview-profile.zh.html`.
- For review, start both previews (launcher or both files). Each preview has an EN / 中文 switcher.

## Critical gotchas

- cmark-gfm treats **blank lines inside raw HTML blocks** (`<table>`, `<picture>`) as block terminators → keep HTML blocks compact, no blank lines inside `<table>`.
- README strips `<style>`, inline `style=`, `<script>`, and CSS media queries → dark-mode image switching uses `<picture>` + `<source media>` only.
- For risky HTML/table changes, verify with `gh api markdown` before pushing.

## Read first

- `README.md` for the published profile and daily layout.
- `CONTEXT.md` for verified domain facts, glossary, constraints, active decisions, and `待确认` items.
- `temp/AGENTS.md` before entering or creating files under `temp/`.
- `docs/adr/` when making or evaluating significant architecture/asset decisions.

## File boundaries

- `assets/` contains only binary files currently referenced by the published profile (reproduction steps recorded in `docs/assets-reproduction.md`).
- `temp/` is the local, ignored workspace for experimental scripts, compression frames, and scratch reports. Payloads must not be committed.
- Durable decisions belong in `docs/adr/` or `CONTEXT.md`, never as loose unpromoted files.

## Full detail

`CLAUDE.md` (Claude entry) · `CONTEXT.md` (single source of truth) · `docs/adr/` (durable decisions) · `temp/AGENTS.md` (temp workspace rules).


