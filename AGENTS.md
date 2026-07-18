# AGENTS.md

Cross-tool entry point for AI coding agents (Cursor, Codex, and other AGENTS.md-aware tools). Claude Code reads `CLAUDE.md` directly.

## Repo nature

Static **GitHub profile repository** (`Aafff623/Aafff623`). The root `README.md` is rendered as the public profile page. **No build system, package manager, test suite, or linter** — only Markdown, HTML, SVG, PNG, and GIF.

## Source of truth

- **Published profile (GitHub)** → `README.md` (English only; GitHub renders this as the public profile)
- **Chinese mirror (local review)** → `README.zh.md` — same structure/facts as `README.md` on **this branch**
- **Local previews** → `preview-profile.html` (EN) + `preview-profile.zh.html` (ZH); open together via `open-previews.bat` / `open-previews.ps1`
- **Asset paths** must be relative (`./assets/...`) so they resolve on GitHub; external badges use HTTPS
- **Profile copy** should be direct, specific, and modest. Use first person, prefer facts and links over labels, and apply the anti-AI patterns from `humanizer-output-style`.

## Bilingual sync (per branch)

- EN and ZH are maintained **on the same branch together**. Changing structure, facts, links, or layout in EN requires the matching ZH update in the same change set.
- ZH on a branch must mirror **that branch’s** EN (`README.md` / `preview-profile.html`), not another branch’s Chinese files.
- Pairing: `README.md` ↔ `README.zh.md`; `preview-profile.html` ↔ `preview-profile.zh.html`.
- For review, start both previews (launcher or both files). Each preview has an EN / 中文 switcher.

## Critical gotchas

- cmark-gfm treats **blank lines inside raw HTML blocks** (`<table>`, `<picture>`) as block terminators → keep HTML blocks compact, no blank lines inside `<table>`.
- README strips `<style>`, inline `style=`, `<script>`, and CSS media queries → dark-mode image switching uses `<picture>` + `<source media>` only.
- For risky HTML/table changes, verify with `gh api markdown` before pushing.

## Full detail

`CLAUDE.md` (complete guide) · `CONTEXT.md` (purpose, audience, constraints) · `LANGUAGE.md` (glossary) · `docs/adr/` (decisions).
