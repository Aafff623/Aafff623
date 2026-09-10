# ADR 0009: Replace the Tech Stack mascot with a 16-pose sprite loop

- **Status:** Accepted
- **Date:** 2026-09-09
- **Scope:** Published `README.md` and `README.zh.md` Tech Stack right cell

## Decision

Use the user-supplied 4×4 chibi sprite sheet as the Tech Stack mascot. Crop its 16 poses, keep each pose proportional on a centered 320×320 canvas, and publish two infinite-loop GIFs. The playback order groups related actions and keeps the idle pose at the loop boundary: `16 → 1 → 6 → 2 → 3 → 4 → 5 → 9 → 10 → 11 → 12 → 14 → 8 → 13 → 7 → 15`.

- `assets/tech-stack-knight-v2.gif` — `#ffffff` light-theme background
- `assets/tech-stack-knight-v2-dark.gif` — `#0d1117` dark-theme background

Both GIFs are 16 frames at 3 fps and are selected through the existing `<picture>` theme switch in both README locales.

## Rationale

The sprite sheet already contains the intended pose sequence, so deterministic grid cropping preserves the supplied artwork and keeps the animation predictable. A fixed 320×320 output matches the former mascot box and avoids per-frame layout shifts. Separate light and dark encodes keep the character legible against GitHub's two themes.

## Fallback and rollback

The previous `assets/mascot.gif` and `assets/mascot-dark.gif` files remain unchanged as inactive rollback assets. They are hidden from the rendered README through source comments, documented in `docs/assets-reproduction.md`, and should not be deleted without a separate decision.

## Verification

- Source metadata: `1254×1254`, RGBA.
- Measured grid edges: `0, 314, 627, 941, 1254` on both axes.
- Published GIF metadata: `320×320`, 16 frames, 3 fps, infinite loop.
- Profile checks: `npm test`, `npm run lint`, and `npm run build`.
