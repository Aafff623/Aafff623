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

- **Source:** User-supplied `1254×1254` RGBA sprite sheet, arranged as a 4×4 grid, plus two locally generated `5×2` action sheets for groups C and D. All source sheets are external/candidate material and are not tracked.
- **Crop:** The supplied sheet uses measured grid edges (`0, 314, 627, 941, 1254` in both axes). The generated `1983×793` sheets use rounded proportional edges (`x: 0, 397, 793, 1190, 1586, 1983`; `y: 0, 397, 793`) through `scripts/crop-generated-mascot-sheet.js`. Every cell is kept proportional, then normalized into the fixed `320×320` transparent canvas. `scripts/strip-generated-background.js` removes only boundary-connected neutral matte pixels, including pure black, so generated backgrounds cannot become a window-sized black/gray flash.
- **Registration:** Run `node scripts/normalize-tech-stack-frames.js <source-dir> <registered-dir> [calibration.json]` before encoding. The old 64 registered baseline frames are reused unchanged; only the 20 new key poses and 66 new transition frames are independently registered. The pass uses a shared base scale (`TARGET_SCALE=0.9`) and per-frame calibration toward a safe `122px` canonical head silhouette, then places the warm-color head anchor at `x=132`, `y=115`. The geometry pass ignores isolated edge specks while retaining the main character and nearby action components, so a generated matte cannot change the registration box. Full alpha bounds are retained for rendering, but are never used as the placement anchor: question marks, impact trails, and celebration particles must not move the character itself.
- **Output:** `scripts/tech-stack-mascot-sequence.js` defines 36 key poses: the original order with `C01–C10` inserted after `5` and before `9`, and `D01–D10` inserted after `15` and before `16`. `scripts/assemble-tech-stack-mascot-loop.js` emits each connection as `[source, transition 1, transition 2, transition 3]`, for 144 frames total. The C group keeps the punch cadence; the D group uses progressively longer key holds and transition delays for question, realization, celebration, landing, and settle beats. Light background `#ffffff`; dark background `#0d1117`. Each encoded image frame must be a full, opaque `320×320` canvas at `(0,0)`; transparent difference rectangles are forbidden because they make a new pose depend on prior-frame compositing.
- **Working frames:** 16 supplied baseline source poses, 20 generated key poses, 66 generated transition poses, and the 42 retained transitions from unchanged baseline connections. The ignored working tree under `temp/tech-stack-mascot-v3/` records the source, cropped, cleaned, registered, assembled, and candidate stages; it is intentionally not part of the tracked asset payload.
- **Encoding (representative):**

```bash
ffmpeg -framerate 10 -i <sequence-dir>/frame-%03d.png \
  -f lavfi -i 'color=c=white:s=320x320:r=10' \
  -filter_complex '[1:v][0:v]overlay=0:0:format=auto:shortest=1,split[s0][s1];[s0]palettegen=max_colors=256:stats_mode=diff[p];[s1][p]paletteuse=dither=sierra2_4a' \
  -frames:v 144 -loop 0 -gifflags -offsetting-transdiff -y assets/tech-stack-knight-v2.gif

ffmpeg -framerate 10 -i <sequence-dir>/frame-%03d.png \
  -f lavfi -i 'color=c=#0d1117:s=320x320:r=10' \
  -filter_complex '[1:v][0:v]overlay=0:0:format=auto:shortest=1,split[s0][s1];[s0]palettegen=max_colors=256:stats_mode=diff[p];[s1][p]paletteuse=dither=sierra2_4a' \
  -frames:v 144 -loop 0 -gifflags -offsetting-transdiff -y assets/tech-stack-knight-v2-dark.gif
```

- **Timing pass:** After encoding, rewrite the GIF Graphic Control Extension delays with `node temp/scripts/rewrite-gif-delays.js <uniform.gif> <timed.gif> <manifest.frameDurations...>`. The manifest keeps the existing punch cadence, sets the C recovery to `120/120/260 ms`, and progressively slows the D group from `550–1000 ms` key holds with `180–640 ms` transition steps. The final binary contains 144 delays totaling `39.41 seconds` for both variants. This changes only playback timing; the decoded RGB frames remain unchanged. Recheck the final output's GIF image descriptors after this pass; all 144 must still be full opaque canvases.
- **In-between generation:** Generate three transparent reference-guided frames for every connection touching the new C/D groups: `5→C01`, `C01→C02` through `C09→C10`, `C10→9`, `15→D01`, and `D01→D02` through `D09→D10`, `D10→16`. Unchanged baseline connections reuse their previously registered frames. Reject any candidate with a background, changed character identity, extra limbs, or a shifted foot baseline; do not use crossfade frames.

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

- **Current:** Dynamic pixelized-mascot animated banner, 24 frames at `760×342`, ~2.52 MB (optimized from `temp/banner_24f_342_c36.gif`). The published GIF is the canonical accepted asset; its original warm pixel-art palette is intentionally preserved.
- **Color treatment:** No CSS filter, sepia pass, or brightness lift is applied. The earlier warmer/yellower midtone is part of the chosen artwork style. The animated WebP is a neutral transcode of the same GIF, using quality `75` and compression level `6`.
- **Source not tracked.** Frame sequence originates from pixel-art motion synthesis.
- **Theme behavior:** Light-first palette with high-contrast elements; renders cleanly across both light and dark GitHub profile wrappers.

Regenerate the WebP derivative after changing the canonical GIF with:

```bash
node scripts/encode-banner-webp.js
```

The script writes through a temporary directory before copying the result to
`assets/v9-banner-animated.webp`; the canonical GIF remains unchanged.

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
