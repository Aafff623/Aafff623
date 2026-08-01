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

## `assets/contribution-snake.gif` and `assets/contribution-snake-dark.gif` — Activity heatmap

- **Decision:** `docs/adr/0004-contribution-heatmap-gif.md`.
- **Generator (not tracked):** `.scratch/contribution-heatmap/gen_heatmap_gif.py` —
  fetches `github.com/users/{user}/contributions` without a token, lays out the GitHub
  calendar (Sunday-first rows, one column per week, last 52 weeks), plans an A* route
  between colored cells (lowest level first; un-eaten cells are walls, snake may step
  `PAD=2` cells outside the grid to bypass them), draws frames with Pillow, and encodes
  with ffmpeg.
- **Output:** `896×192` (margins ≥ `PAD=2` cells so out-of-grid weave stays on-canvas),
  12 fps, infinite loop, `palettegen max_colors=64`. Light `#ffffff` / dark `#0d1117`.
  Purple snake with size/color gradients; variable speed `VMIN/VMAX=1.5/4.5` (open/near ≈ 3×).
  Exterior bypass may insert a short bump-turn. Frame count scales with the A* path —
  A-tier render ~341 frames / ~28 s / ~247 KB per GIF.
- **Regenerate and refresh** (the GIF is a snapshot of the last 52 weeks):

```bash
python .scratch/contribution-heatmap/gen_heatmap_gif.py
# candidates land in .scratch/contribution-heatmap/; copy the approved files to assets/
cp .scratch/contribution-heatmap/contribution-snake.gif assets/
cp .scratch/contribution-heatmap/contribution-snake-dark.gif assets/
```

## `assets/hero-knight.webp` — intro hero

- **Current:** WebP, `800×1000`, quality 90 (~90 KB). See `docs/adr/0003-hero-webp.md`.
- **Why WebP:** the hero is a gradient-heavy illustration; PNG stored it at ~981 KB with no lossless headroom, while WebP q90 is ~10x smaller at the same size and visually near-identical.
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
- If it needs a dark variant (see `docs/dark-mode-checklist.md` §4), recompose on a
  `#0d1117`-based background and wire with `<picture>`, mirroring the mascot approach.

## Wordmarks — `assets/brand-threetwoa.svg` / `assets/brand-threetwoa-dark.svg`

- Hand-editable SVG; no build step. The dark wordmark is a lighter/blue-gradient
  variant selected via `<picture>` on the dark theme. Edit the SVG source directly.
