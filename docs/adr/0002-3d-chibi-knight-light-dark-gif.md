# ADR 0002: Replace the 2D Mascot with a 3D Chibi Knight (Light + Dark GIFs)

## Status

Accepted. Supersedes [ADR 0001](0001-mascot-white-background-gif.md).

## Context

ADR 0001 chose a single white-background looping GIF for the Tech Stack mascot and accepted that dark-mode visitors would see a white box. Two things changed after that decision:

- The mascot was redesigned as a 3D chibi knight cycling through a five-pose sword sequence, replacing the earlier 2D character.
- Dark-mode support matured across the rest of the profile — the wordmark, GitHub stats, top languages, and activity graph all switch by theme via `<picture>`. That left the light-only mascot as the last visible dark-mode defect.

The full production plan (asset audit, motion, transitions, encoding budget) lives in `docs/tech-stack-3d-mascot-plan.md`.

## Decision

Ship two pre-composited GIFs and switch them by theme with `<picture>`:

- **Light:** `assets/mascot.gif` — near-white background matching the GitHub light page.
- **Dark:** `assets/mascot-dark.gif` — `#0d1117`-based background with edges recomposited (not the light version darkened).
- **Wiring:** in both `README.md` and `preview-profile.html` (and the Chinese pair), the Tech Stack right cell uses a compact block so cmark-gfm does not terminate the raw HTML:

```html
<picture>
<source media="(prefers-color-scheme: dark)" srcset="./assets/mascot-dark.gif">
<img src="./assets/mascot.gif" width="90%" alt="animated threetwoa mascot">
</picture>
```

- **Encoding:** 320×320, 18 fps, ~73 frames, 64-color palette (A-tier compress). Shipped sizes: light ~442 KB, dark ~478 KB — within the plan's ≤1.5 MB budget.

## Consequences

- **Positive:** The mascot now follows the light and dark themes; no more white box on the default dark theme.
- **Positive:** Each GIF came in under the ~1 MB the earlier 2D GIF cost.
- **Negative:** Two assets to maintain instead of one, and ~1.26 MB combined if a client prefetches both `<picture>` candidates.
- **Carried over from ADR 0001:** GitHub has many dark themes; a single dark GIF cannot match every background. Verify the default light and default dark themes look correct; other themes are best-effort.
- **Reproducibility:** Source poses and the frame pipeline live in ignored `.scratch/` and are not tracked, so exact regeneration depends on local working files. Same limitation as ADR 0001.

## Alternatives Considered

- **Keep the single light-only GIF (ADR 0001):** Rejected; the white box was the most visible remaining dark-mode issue.
- **One theme-neutral background:** Rejected; no single background reads well on both `#ffffff` and `#0d1117` without a visible plate.

## Related

- Supersedes `docs/adr/0001-mascot-white-background-gif.md`
- `docs/tech-stack-3d-mascot-plan.md`
- `docs/dark-mode-checklist.md`
- `assets/mascot.gif`, `assets/mascot-dark.gif`
