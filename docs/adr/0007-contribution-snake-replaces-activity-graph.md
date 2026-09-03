# ADR 0007: Contribution Snake Replaces the Activity Graph Line Chart

## Status

Accepted (2026-08-28).

## Context

The Activity section embedded `github-readme-activity-graph.vercel.app` line charts (light/dark via `<picture>`). In 2026-08 the public Vercel instance began returning 402 Payment Required (Hobby-plan quota suspension) — the same failure mode that earlier killed `github-readme-stats.vercel.app` (stats cards moved to the community endpoint `github-readme-stats.shion.dev`). There is no reliable public mirror for this service (`shion.dev` does not host it, 404), and self-hosting a Vercel app is against the standing constraint in CONTEXT.md.

ADR 0004 previously removed the contribution-snake GIF as redundant with GitHub's native contribution calendar. That trade-off changed: the replacement visual now has to be generated inside this repository, and the snake is the community-standard option that runs entirely in-repo (Platane/snk as a scheduled GitHub Action committing SVGs to an `output` branch).

## Decision

Replace the line chart with the Platane/snk contribution snake:

- **Workflow:** `.github/workflows/snake.yml` — `Platane/snk/svg-only@v3`, triggered by daily cron `12 3 * * *`, `workflow_dispatch`, and pushes to `main`; job-level `contents: write`.
- **Outputs:** `github-contribution-grid-snake.svg` (light) and `github-contribution-grid-snake-dark.svg?palette=github-dark`, pushed to the `output` branch by `crazy-max/ghaction-github-pages@v4`.
- **Embed:** `<picture>` pair pointing at `raw.githubusercontent.com/Aafff623/Aafff623/output/...`, same light/dark switching pattern as the other assets.

## Consequences

The Activity visual no longer depends on any third-party runtime — it survives public-instance outages by construction. This supersedes ADR 0004's removal rationale: the redundancy with the native contribution calendar is accepted in exchange for self-generation (the native calendar still renders above the README). Each run is an SVG-only job and takes seconds. Between the push and the first successful workflow run, the snake URLs 404 briefly; the first run is triggered by the same push.
