# Asset Reproduction

How the published binary assets in `assets/` were produced. Their working files
(source frames, candidate encodes, scripts) live in ignored `.scratch/` and are
**not tracked**, so this file is the durable record needed to regenerate or
replace an asset. Where a source is not available in the repo, it is marked
**source not tracked**.

## Conventions

- Published assets use **relative paths** (`./assets/...`) so they resolve on GitHub.
- Keep candidate encodes under `.scratch/`; only copy an approved file into `assets/`.
- After replacing an asset, verify locally and with `gh api markdown`, and check
  both the default light and default dark GitHub themes.

## `assets/mascot.gif` and `assets/mascot-dark.gif` — Tech Stack mascot

- **Decision:** `docs/adr/0002-3d-chibi-knight-light-dark-gif.md` (supersedes ADR 0001).
- **Full pipeline:** `docs/tech-stack-3d-mascot-plan.md` (asset audit, motion, transitions, encoding budget).
- **Source frames:** `.scratch/chibi-knight-import/chibi_knight_5_images/` — 5× `1254×1254` PNG (no alpha). Matte and align before encoding; do not rely on the original filenames for pose order (see plan §3).
- **Output:** `320×320`, 18 fps, ~73 frames, infinite loop. Light background near `#ffffff`; dark background near `#0d1117` with edges recomposited (not the light version darkened).
- **Shipped sizes (A-tier):** light ~442 KB, dark ~478 KB (budget ≤1.5 MB per GIF; hard cap 3 MB).
- **Encoding (representative two-pass palette):**

```bash
# 1) build an optimized palette (64 colors is enough for the chibi knight)
ffmpeg -framerate 18 -i .scratch/mascot-3d/frames-light/frame-%03d.png \
  -vf "scale=320:320:flags=lanczos,palettegen=max_colors=64:stats_mode=diff" \
  -update 1 -frames:v 1 -y .scratch/mascot-3d/palette-light.png

# 2) apply the palette; prefer no dither on flat areas
ffmpeg -framerate 18 -i .scratch/mascot-3d/frames-light/frame-%03d.png -i .scratch/mascot-3d/palette-light.png \
  -lavfi "scale=320:320:flags=lanczos[x];[x][1:v]paletteuse=dither=none" \
  -loop 0 -y .scratch/mascot-3d/mascot-light.candidate.gif
```

Repeat with `frames-dark/` for `mascot-dark.gif`. Then run the acceptance checks
in the plan (§12) before copying candidates into `assets/`.

## Activity graph (no local asset)

- **Current:** `github-readme-activity-graph.vercel.app` line chart in the Activity section, light/dark via `<picture>`.
- **Note:** the former `contribution-snake*.gif` heatmap (ADR 0004) was removed as redundant with GitHub's native calendar.

## `assets/comp-syscap-banner.webp` / `assets/comp-ai4s-ketan.webp` — Competitions thumbnails

- **Usage:** shared second row under Competitions copy (`width="100%"`). Both files are letterboxed to the **same canvas** (`960×360`) so equal column widths yield equal rendered heights and parallel bottoms.
- **Corners:** rounded mask baked into the WebP alpha (`radius≈28` on 960×360) — GitHub README strips most CSS `border-radius`, so do not rely on markup alone.
- **Sources:** organizer promo art (not generated in-repo). Fit inside canvas, centered, dark fill; then round; WebP q≈86.
- **Mapping:** `comp-syscap-banner.webp` → Lead Cup; `comp-ai4s-ketan.webp` → AI4S 书生国智科探.

## `assets/hero-knight.webp` — intro hero

- **Current:** WebP RGBA, trimmed from `800×1000` to ~`752×950`, quality 90, competition-style rounded alpha (`radius≈9%` of short side) plus a thin dual ring so the curve reads on light GitHub backgrounds (hero art is near-white at the edges). See `docs/adr/0003-hero-webp.md`.
- **Why WebP:** the hero is a gradient-heavy illustration; PNG stored it at ~981 KB with no lossless headroom, while WebP q90 is ~10x smaller and visually near-identical.
- **Why baked radius:** GitHub README strips most CSS `border-radius`; same approach as competition thumbnails (`comp-*-*.webp`).
- **Source not tracked.** The original high-res render lives outside the repo. Local helper: `.scratch/round_hero.py` (restore flat `git checkout HEAD -- assets/hero-knight.webp` first if re-running after a rounded save).

## `assets/v9-banner.gif` — top banner

- **Current:** static pixelized-mascot banner, bright palette, ~92 KB.
- **Source not tracked.** Frame source and encoding settings are not in the repo.
- If it needs a dark variant (see `docs/dark-mode-checklist.md` §4), recompose on a
  `#0d1117`-based background and wire with `<picture>`, mirroring the mascot approach.

## Wordmarks — `assets/brand-threetwoa.svg` / `assets/brand-threetwoa-dark.svg`

- Hand-editable SVG; no build step. The dark wordmark is a lighter/blue-gradient
  variant selected via `<picture>` on the dark theme. Edit the SVG source directly.
