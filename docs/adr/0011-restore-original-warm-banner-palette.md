# ADR 0011: Restore the original warm banner palette

- **Status:** Accepted
- **Date:** 2026-09-10
- **Scope:** `assets/v9-banner.gif` and its animated WebP derivative

## Context

The top profile banner was temporarily rebuilt with a brighter color grade.
The resulting image was technically clearer in midtones, but it changed the
art direction: the original warm, slightly wax-yellow pixel-art palette was
intentional and was the version the profile had previously used.

## Decision

Restore the exact canonical GIF from the accepted pre-grade revision. Keep the
animated WebP delivery path for GitHub's `<picture>` fallback optimization, but
generate it as a neutral transcode of the canonical GIF. No CSS filter, gamma
lift, saturation boost, or other color correction belongs in the published
banner pipeline.

## Consequences

- The banner returns to the original warm visual style.
- GIF and WebP keep the same `760×342`, 24-frame, 3.6-second animation contract.
- `scripts/encode-banner-webp.js` can rebuild the WebP derivative without
  changing the source palette.
- The banner brightness regression test now protects the original warm range
  instead of enforcing an artificial brightness threshold.
