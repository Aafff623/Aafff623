# AGENTS.md

Cross-tool entry point for AI coding agents (Cursor, Codex, and other AGENTS.md-aware tools). Claude Code reads `CLAUDE.md` directly.

## Repo nature

Static **GitHub profile repository** (`Aafff623/Aafff623`). The root `README.md` is rendered as the public profile page. **No build system, package manager, test suite, or linter** — only Markdown, HTML, SVG, PNG, and GIF.

## Source of truth

- **Published profile** → `README.md`
- **Local preview** → `preview-profile.html` (standalone, mirrors README using the same `assets/`)
- **Asset paths** must be relative (`./assets/...`) so they resolve on GitHub; external badges use HTTPS
- **Profile copy** should be direct, specific, and modest. Use first person, prefer facts and links over labels, and apply the anti-AI patterns from `humanizer-output-style`.

## Critical gotchas

- cmark-gfm treats **blank lines inside raw HTML blocks** (`<table>`, `<picture>`) as block terminators → keep HTML blocks compact, no blank lines inside `<table>`.
- README strips `<style>`, inline `style=`, `<script>`, and CSS media queries → dark-mode image switching uses `<picture>` + `<source media>` only.
- For risky HTML/table changes, verify with `gh api markdown` before pushing.

## Full detail

`CLAUDE.md` (complete guide) · `CONTEXT.md` (purpose, audience, constraints) · `LANGUAGE.md` (glossary) · `docs/adr/` (decisions).
