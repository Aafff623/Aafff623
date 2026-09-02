# Asset Reproduction

How the published binary assets in `assets/` were produced. Their working files
(source frames, candidate encodes, scripts) live in ignored `temp/` and are
**not tracked**, so this file is the durable record needed to regenerate or
replace an asset. Where a source is not available in the repo, it is marked
**source not tracked**.

## Conventions

- Published assets use **relative paths** (`./assets/...`) so they resolve on GitHub.
- Keep candidate encodes under `temp/`; only copy an approved file into `assets/`.
- After replacing an asset, verify locally and with `gh api markdown`, and check
  both the default light and default dark GitHub themes.

## `assets/mascot.gif` and `assets/mascot-dark.gif` — Tech Stack mascot

- **Full pipeline:** `docs/adr/0002-3d-chibi-knight-light-dark-gif.md` (scratch plan in `temp/reports/tech-stack-3d-mascot-plan.md`).
- **Source frames:** `temp/chibi-knight-import/chibi_knight_5_images/` — 5× `1254×1254` PNG (no alpha). Matte and align before encoding; do not rely on the original filenames for pose order (see plan §3).
- **Output:** `320×320`, 18 fps, ~73 frames, infinite loop. Light background near `#ffffff`; dark background near `#0d1117` with edges recomposited (not the light version darkened).
- **Shipped sizes (A-tier):** light ~442 KB, dark ~478 KB (budget ≤1.5 MB per GIF; hard cap 3 MB).
- **Encoding (representative two-pass palette):**

```bash
# 1) build an optimized palette (64 colors is enough for the chibi knight)
ffmpeg -framerate 18 -i temp/mascot-3d/frames-light/frame-%03d.png \
  -vf "scale=320:320:flags=lanczos,palettegen=max_colors=64:stats_mode=diff" \
  -update 1 -frames:v 1 -y temp/mascot-3d/palette-light.png

# 2) apply the palette; prefer no dither on flat areas
ffmpeg -framerate 18 -i temp/mascot-3d/frames-light/frame-%03d.png -i temp/mascot-3d/palette-light.png \
  -lavfi "scale=320:320:flags=lanczos[x];[x][1:v]paletteuse=dither=none" \
  -loop 0 -y temp/mascot-3d/mascot-light.candidate.gif
```

Repeat with `frames-dark/` for `mascot-dark.gif`. Then run the acceptance checks
in the plan (§12) before copying candidates into `assets/`.

## Activity snake (no local asset)

- **Current:** Platane/snk contribution snake, generated in-repo by `.github/workflows/snake.yml` (daily cron + manual dispatch + push) and pushed to the `output` branch; the README embeds light/dark SVGs from `raw.githubusercontent.com` via `<picture>`. See `docs/adr/0007-contribution-snake-replaces-activity-graph.md`.
- **Note:** the `github-readme-activity-graph` line chart was dropped when its public Vercel instance returned 402; activity visuals are generated in-repo via Actions, never wired to free public instances.

## `assets/agentcfo-banner.webp` — Classic project banner

- **Usage:** right cell of the Classic project table (`width="100%"`).
- **Origin:** copied from the upstream repo `San-Y108/agent-cfo` (`assets/images/readme/banner.png`, 1672×941 PNG) and self-hosted so the profile does not break if the teammate repo moves or goes private.
- **Encode:** WebP q90 via `ffmpeg -i <source>.png -quality 90` → ~297 KB (from ~1.8 MB PNG).

## `assets/comp-syscap-banner.webp` / `assets/comp-ai4s-ketan.webp` — Competitions thumbnails

- **Usage:** shared second row under Competitions copy (`width="100%"`). Both files are letterboxed to the **same canvas** (`960×360`) so equal column widths yield equal rendered heights and parallel bottoms.
- **Corners:** rounded mask baked into the WebP alpha (`radius≈28` on 960×360) — GitHub README strips most CSS `border-radius`, so do not rely on markup alone.
- **Sources:** organizer promo art (not generated in-repo). Fit inside canvas, centered, dark fill; then round; WebP q≈86.
- **Mapping:** `comp-syscap-banner.webp` → Lead Cup; `comp-ai4s-ketan.webp` → AI4S 书生国智科探.

## `assets/hero-knight.webp` — intro hero

- **Current:** WebP RGB, `800×1000`, quality 90, **sharp corners** (rounded / card-ring trial reverted 2026-08). See `docs/adr/0003-hero-webp.md`.
- **Why WebP:** the hero is a gradient-heavy illustration; PNG stored it at ~981 KB with no lossless headroom, while WebP q90 is ~10x smaller and visually near-identical.
- **Source not tracked.** The original high-res render lives outside the repo.
- **Regenerate (Pillow):**

```python
from PIL import Image
Image.open("<source>.png").convert("RGB").save(
    "assets/hero-knight.webp", format="WEBP", quality=90, method=6)
```

## `assets/v9-banner.gif` — top banner

- **Current:** static pixelized-mascot banner, bright palette, ~92 KB.
- **Source not tracked.** Frame source and encoding settings are not in the repo.
- If it needs a dark variant (see `CONTEXT.md` / `docs/adr/0002-3d-chibi-knight-light-dark-gif.md`), recompose on a
  `#0d1117`-based background and wire with `<picture>`, mirroring the mascot approach.

## Wordmarks — SVG source + published typewriter GIFs

- **Source (edit these):** `assets/brand-threetwoa.svg` / `assets/brand-threetwoa-dark.svg`.
  Hand-editable SVG; no build step for still frames. The dark wordmark is a
  lighter/blue-gradient variant.
- **Published (what README loads):** `assets/brand-threetwoa.gif` /
  `assets/brand-threetwoa-dark.gif`. Typewriter loop, switched with `<picture>`.
  See `docs/adr/0005-wordmark-typewriter-gif.md`.
- **Regenerate GIFs** after an SVG edit (Playwright Chromium + Pillow):

```bash
python temp/scripts/wordmark-typewriter/render.py
# then copy the two *.candidate.gif files into assets/ as

# brand-threetwoa.gif and brand-threetwoa-dark.gif
```

- **Motion:** caret blinks → types `threetwoa` left-to-right in the final word
  slot → caret blinks → hold ~2.6 s → loop. Tagline stays HTML, not in the GIF.
- **Encode:** 760×150 at 2× (1520×300), ~15 unique frames, ~341 KB each.
  Backgrounds `#ffffff` / `#0d1117` (GIF has no useful alpha).
