# ADR 0003: Serve the Intro Hero as WebP

## Status

Accepted. Reverses the "hero stays PNG" note in `CONTEXT.md` Active Decisions.

## Context

The intro hero is a gradient-heavy anime illustration (soft shading, background light rays). PNG stores that kind of image poorly: the tracked file was ~981 KB at 800×1000, and lossless re-optimization saved nothing. An earlier decision kept the hero as PNG "for repository-format consistency," but the hero is the only raster illustration in the repo (the banner and mascot are GIF), so that argument is weak — and ~981 KB was the single heaviest asset the profile loads.

Measured alternatives (source 800×1000, ~981 KB):

| Option | Size |
| --- | --- |
| PNG, lossless re-optimize | ~981 KB (no change) |
| PNG downscaled to 560×700 | ~516 KB |
| WebP 800×1000, quality 90 | ~90 KB |

## Decision

Serve the hero as `assets/hero-knight.webp` (WebP, quality 90, `method=6`) at the original 800×1000, and remove `assets/hero-knight.png`.

- GitHub Markdown renders WebP in `<img>`, so the published profile is unaffected.
- Update the `<img src>` (and preview anchor `href`) in `README.md`, `README.zh.md`, `preview-profile.html`, and `preview-profile.zh.html`.
- Regenerate from the source render (kept outside the repo) with Pillow; see `docs/assets-reproduction.md`.

## Consequences

- **Positive:** ~10x smaller hero (981 KB → 90 KB), full resolution, visually near-identical. The profile's heaviest asset becomes one of its lightest.
- **Negative:** WebP has slightly less universal support than PNG in non-browser contexts, but every current browser and GitHub render it.
- **Unchanged:** still a single light-background image with no dark variant (see `temp/reports/dark-mode-checklist.md`).

## Related

- Supersedes the hero PNG note in `CONTEXT.md` Active Decisions.
- `docs/assets-reproduction.md`, `assets/hero-knight.webp`
