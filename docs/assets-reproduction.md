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

## `assets/tech-stack-knight-v2.gif` and `assets/tech-stack-knight-v2-dark.gif` — Tech Stack mascot

- **Source:** User-supplied `1254×1254` RGBA sprite sheet, arranged as a 4×4 grid. The source image is external to the repository and is not tracked.
- **Crop:** Split on the measured grid edges (`0, 314, 627, 941, 1254` in both axes), then pad each cell to a centered `320×320` transparent canvas. This preserves each pose's proportions while keeping the published GIF size aligned with the original Tech Stack box.
- **Output:** 16 frames in an action-grouped loop (`16, 1, 6, 2, 3, 4, 5, 9, 10, 11, 12, 14, 8, 13, 7, 15`), 3 fps, infinite loop. Light background `#ffffff`; dark background `#0d1117`.
- **Working frames:** 16 ignored local PNGs, `frame-01.png` through `frame-16.png`; regenerate them from the supplied source when needed. Their local directory is intentionally not part of the tracked instructions.
- **Encoding (representative):**

```bash
ffmpeg -framerate 3 -i <frame-dir>/frame-%02d.png \
  -f lavfi -i 'color=c=white:s=320x320:r=3' \
  -filter_complex '[1:v][0:v]overlay=0:0:format=auto:shortest=1,split[s0][s1];[s0]palettegen=max_colors=256:stats_mode=diff[p];[s1][p]paletteuse=dither=sierra2_4a' \
  -frames:v 16 -loop 0 -y assets/tech-stack-knight-v2.gif

ffmpeg -framerate 3 -i <frame-dir>/frame-%02d.png \
  -f lavfi -i 'color=c=#0d1117:s=320x320:r=3' \
  -filter_complex '[1:v][0:v]overlay=0:0:format=auto:shortest=1,split[s0][s1];[s0]palettegen=max_colors=256:stats_mode=diff[p];[s1][p]paletteuse=dither=sierra2_4a' \
  -frames:v 16 -loop 0 -y assets/tech-stack-knight-v2-dark.gif
```

- **Fallback:** `assets/mascot.gif` and `assets/mascot-dark.gif` are retained unchanged for rollback or later reuse. They are intentionally not rendered by either README.

## `assets/mascot.gif` and `assets/mascot-dark.gif` — Retained Tech Stack mascot fallback

- **Full pipeline:** `docs/adr/0002-3d-chibi-knight-light-dark-gif.md` (scratch plan in `temp/reports/tech-stack-3d-mascot-plan.md`).
- **Source frames:** `temp/chibi-knight-import/chibi_knight_5_images/` — 5× `1254×1254` PNG (no alpha). Matte and align before encoding; do not rely on the original filenames for pose order (see plan §3).
- **Output:** `320×320`, 18 fps, 115 frames seamless loop. Light background `#ffffff` (~1.75 MB); dark background `#0d1117` with edges recomposited (~1.85 MB).
- **Encoding (representative two-pass palette):**

```bash
# 1) build an optimized palette (64-128 colors for the chibi knight)
ffmpeg -framerate 18 -i temp/mascot-3d/frames-light/frame-%03d.png \
  -vf "scale=320:320:flags=lanczos,palettegen=max_colors=128:stats_mode=diff" \
  -update 1 -frames:v 1 -y temp/mascot-3d/palette-light.png

# 2) apply the palette; prefer no dither on flat areas
ffmpeg -framerate 18 -i temp/mascot-3d/frames-light/frame-%03d.png -i temp/mascot-3d/palette-light.png \
  -lavfi "scale=320:320:flags=lanczos[x];[x][1:v]paletteuse=dither=none" \
  -loop 0 -y temp/mascot-3d/mascot-light.candidate.gif
```

Repeat with `frames-dark/` for `mascot-dark.gif`.

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

## `assets/hero-knight.gif` and `assets/hero-knight.webp` — Intro hero

- **Current (Primary):** `assets/hero-knight.gif` — 28-frame seamless loop GIF generated from AI video synthesis (~2.60 MB). Cropped and color-calibrated to preserve sharp edges and avoid loop stutters.
- **Fallback / Baseline:** `assets/hero-knight.webp` — WebP RGB, `800×1000`, quality 90, **sharp corners** (~131 KB). See `docs/adr/0003-hero-webp.md`.
- **Source not tracked.** The original high-res render and raw video sequence live outside the repo.
- **Regenerate WebP fallback (Pillow):**

```python
from PIL import Image
Image.open("<source>.png").convert("RGB").save(
    "assets/hero-knight.webp", format="WEBP", quality=90, method=6)
```

## `assets/v9-banner.gif` — Top banner

- **Current:** Dynamic pixelized-mascot animated banner, bright palette, 24 frames, ~2.52 MB (optimized from `temp/banner_24f_342_c36.gif`).
- **Source not tracked.** Frame sequence originates from pixel-art motion synthesis.
- **Theme behavior:** Light-first palette with high-contrast elements; renders cleanly across both light and dark GitHub profile wrappers.

## Wordmarks — SVG source + published typewriter GIFs

- **Source (edit these):** `assets/brand-threetwoa.svg` / `assets/brand-threetwoa-dark.svg`. Hand-editable SVG; no build step for still frames. The dark wordmark uses a lighter gradient variant.
- **Published (what README loads):** `assets/brand-threetwoa.gif` / `assets/brand-threetwoa-dark.gif`. 56-frame typewriter + wave + backspace loop, switched with `<picture>`. See `docs/adr/0008-typewriter-wordmark-wave.md` (supersedes `docs/adr/0005-wordmark-typewriter-gif.md`).
- **Motion flow:**
  1. Caret blinks on empty
  2. Types `threetwoa` left-to-right (12 frames)
  3. 👋 emoji swings an 8-frame wrist pivot curve (`0° → 16° → -8° → 20° → -6° → 16° → -4° → 0°`)
  4. Holds for ~2.0 s (15 frames)
  5. Backspace smoothly erases characters back to blank
  6. Loop repeats seamlessly
- **Sizes:** Light ~710 KB, Dark ~784 KB (1520×300 @ 2×, master palette quantization via Pillow).
- **Regenerate GIFs:** `python scripts/render-wordmark.py` (candidate GIFs placed in `temp/scripts/wordmark-typewriter/`, then promoted to `assets/`).

## `assets/badge-status-*.svg` — What I'm Learning Bento Grid Badges

- **Usage:** Plan-D aurora-pill status badges embedded via `<picture>` inside each cell of the 3×2 Bento grid (`What I'm Learning`).
- **Structure (16 files):**
  - 4 status types: `inprogress` (进行中), `prototyping` (原型验证), `exploring` (探索中), `lab` (实验室).
  - 2 locales: EN (`badge-status-[type]-en.svg`) and ZH (`badge-status-[type].svg`).
  - 2 theme variants: Light (`.svg`) and Dark (`-dark.svg`).
- **Design rules:** Self-contained SVG pill badges with subtle border-glow and uppercase text; no external web fonts or scripts; rendered cleanly at native height (`34px`).
