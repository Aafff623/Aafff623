# ADR 0008: Seamless 56-Frame Typewriter Wordmark with Waving Hand Animation

## Status

Accepted (2026-09). Supersedes ADR 0005.

## Context

ADR 0005 introduced a 15-frame typewriter GIF rasterized from the SVGs (`assets/brand-threetwoa.svg` / `brand-threetwoa-dark.svg`). While functional, it had two limitations:

1. **Static emoji anchor:** The 👋 emoji in the header remained completely static while the letters typed in, feeling visually disconnected from the greeting copy.
2. **Abrupt jump on loop:** After typing `threetwoa` and holding for 2.6 seconds, the wordmark instantly reset to blank, creating an abrupt visual pop rather than a natural, continuous rhythm.

We wanted a lively, organic greeting animation that introduces subtle personality without introducing heavy assets or third-party runtime scripts (which GitHub strips).

## Decision

Upgrade the typewriter GIFs to an organic, 56-frame seamless loop that pairs letter-by-letter typing with an anatomically natural waving animation and gentle backspace erasure:

- **Light:** `assets/brand-threetwoa.gif` — background `#ffffff` (~710 KB).
- **Dark:** `assets/brand-threetwoa-dark.gif` — background `#0d1117` (~784 KB).
- **Animation Sequence (56 frames):**
  1. **Typing phase (Frames 0–11):** Blinking cursor, typing `threetwoa` left-to-right into its reserved bounding slot.
  2. **Wave greeting phase (Frames 12–27):** Once the name completes, the 👋 emoji swings along an 8-frame wrist-pivot curve (`0° → 16° → -8° → 20° → -6° → 16° → -4° → 0°`) simulating a friendly wave.
  3. **Hold phase (Frames 28–42):** Static hold (~2.0 s) allowing the viewer to comfortably read the wordmark and tagline.
  4. **Backspace erasure phase (Frames 43–55):** Characters smoothly delete one-by-one with an active cursor, returning cleanly to the empty state before repeating.
- **Master Palette & Quantization:**
  Rendered at 2× scale (1520×300) via Playwright Chromium headless snapshots, then quantized and compiled using `Pillow` with a global master palette to eliminate color banding and dithering artifacts across transparent/solid boundary edges.
- **Tagline Preservation:**
  The tagline `⭐ Code Less, Architect More 🚀` remains pure HTML rendered outside the GIF to preserve text selectability and maintainability.

## Consequences

- **Positive:** Greatly elevates the first-impression visual polish of the profile with zero JavaScript runtime dependency.
- **Positive:** Solves the harsh loop reset; backspacing feels deliberate and playful.
- **Negative:** File size increased from ~341 KB to ~710–784 KB per file, but remains well within the profile budget (≤1.5 MB per hero asset).
- **Compatibility:** Continues using GitHub-native `<picture>` and `<source media="(prefers-color-scheme: dark)">` for seamless OS-level theme matching.

## Alternatives Considered

- **Continuous wave without typing loop:** Overwhelming and distracting during sustained reading.
- **Pure CSS/SVG SMIL wave:** Stripped or disabled by GitHub's cmark-gfm sanitization pipeline.
- **Larger frame count (>80 frames):** Exceeded 1.5 MB budget with minimal perceptible smoothness gain.

## Related

- `assets/brand-threetwoa.gif`, `assets/brand-threetwoa-dark.gif`
- `assets/brand-threetwoa.svg`, `assets/brand-threetwoa-dark.svg`
- `docs/adr/0005-wordmark-typewriter-gif.md` (superseded)
- `docs/assets-reproduction.md`
- `CONTEXT.md`
