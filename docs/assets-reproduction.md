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
- **Output:** `360×360`, 18 fps, ~73 frames, infinite loop. Light background near `#ffffff`; dark background near `#0d1117` with edges recomposited (not the light version darkened).
- **Shipped sizes:** light ~605 KB, dark ~657 KB (budget ≤1.5 MB per GIF; hard cap 3 MB).
- **Encoding (representative two-pass palette):**

```bash
# 1) build an optimized palette (start at 96 colors, raise toward 128 on banding)
ffmpeg -framerate 18 -i .scratch/mascot-3d/frames-light/%04d.png \
  -vf "scale=360:360:flags=lanczos,palettegen=max_colors=128:stats_mode=diff" \
  -y .scratch/mascot-3d/palette-light.png

# 2) apply the palette; prefer no dither on flat areas, light ordered dither only if banding appears
ffmpeg -framerate 18 -i .scratch/mascot-3d/frames-light/%04d.png -i .scratch/mascot-3d/palette-light.png \
  -lavfi "scale=360:360:flags=lanczos[x];[x][1:v]paletteuse=dither=none" \
  -loop 0 -y .scratch/mascot-3d/mascot-light.candidate.gif
```

Repeat with `frames-dark/` for `mascot-dark.gif`. Then run the acceptance checks
in the plan (§12) before copying candidates into `assets/`.

## `assets/hero-knight.png` — intro hero

- **Current:** RGB PNG, downscaled from `1122×1402` to `800×1000` (ADR 0001 note).
- **Format decision:** kept as PNG for repository-format consistency.
- **Source not tracked.** The original high-res render lives outside the repo.
- **Recompression:** losslessly re-optimize, or downscale to display size, keeping
  PNG. The hero renders at ~40% of a ~900px column (≈360px), so the `800×1000`
  source is already oversampled; a smaller source is safe for display fidelity.

## `assets/v9-banner.gif` — top banner

- **Current:** static pixelized-mascot banner, bright palette, ~92 KB.
- **Source not tracked.** Frame source and encoding settings are not in the repo.
- If it needs a dark variant (see `docs/dark-mode-checklist.md` §4), recompose on a
  `#0d1117`-based background and wire with `<picture>`, mirroring the mascot approach.

## Wordmarks — `assets/brand-threetwoa.svg` / `assets/brand-threetwoa-dark.svg`

- Hand-editable SVG; no build step. The dark wordmark is a lighter/blue-gradient
  variant selected via `<picture>` on the dark theme. Edit the SVG source directly.
