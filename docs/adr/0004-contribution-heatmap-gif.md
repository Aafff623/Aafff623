# ADR 0004: Animated Contribution Heatmap as Light/Dark GIFs

## Status

Superseded by [ADR 0007](0007-contribution-snake-replaces-activity-graph.md) (2026-08-01; superseded 2026-08-28).


## Context

The **Activity** section previously showed a `github-readme-activity-graph.vercel.app` chart — a third-party service that renders a line/bar contribution graph. It worked, but it added a runtime dependency on an external service, and its visual style did not match the rest of the profile.

We wanted the standard GitHub contribution calendar (7 rows, one column per week) as a self-hosted widget, with a "snake eats the cells" animation like [Platane/snk](https://github.com/Platane/snk). That animation is authored as SMIL/SVG, but GitHub README strips inline `<svg>` (verified with `gh api markdown`), and SVG loaded via `<img>` does not play animations in Chrome/Firefox/Edge. The only reliable way to show animation on the GitHub profile is a pre-rendered GIF — the same pipeline already used for the mascot (`docs/tech-stack-3d-mascot-plan.md`).

## Decision

Replace the Activity graph with a self-hosted animated heatmap shipped as two GIFs, switched by theme with `<picture>` (same pattern as the mascot):

- **Light:** `assets/contribution-snake.gif` — white background, GitHub light calendar palette.
- **Dark:** `assets/contribution-snake-dark.gif` — `#0d1117` background, GitHub dark calendar palette.
- **Source of truth:** `temp/contribution-heatmap/gen_heatmap_gif.py` (not tracked). It fetches `github.com/users/Aafff623/contributions` without a token (regex `data-date=... data-level=...`), lays cells out Sunday-first / week columns, plans an **A\* shortest-path route** between colored cells (lowest level first, like snk's `getBestRoute` batches) so the snake weaves around un-eaten cells instead of sweeping rows, draws frames with Pillow (12px rounded cells on a 16px grid), and encodes with ffmpeg `palettegen` + `paletteuse`.
- **Trajectory robustness:** un-eaten colored cells act as walls, but the snake may step up to `PAD=2` cells outside the grid (mirrors snk's `isInsideLarge`) so a wall of colored cells never traps it; if A\* still fails, the fallback walks straight toward the goal cell by cell — the snake never teleports.
- **Motion:** variable speed per the profile owner's algorithm — open ground ahead glides fast (4.5 cells/frame), close to a colored cell it slows to 1.5 cells/frame to "aim" (`speed()`: NEAR/FAR = 2/6, VMIN/VMAX = 1.5/4.5). The snake is purple (distinct from the green cells) with snk-style size and color gradients from head to tail. Exterior bypasses may insert a short bump-turn before climbing to the far lane.
- **Spec (current render):** 896×192 (margins ≥ `PAD=2`), ~341 frames, 12 fps (~28 s loop), shipped ~247 KB each (`max_colors=64`). Level colors are GitHub's official calendar colors. Frame count, duration, and file size scale with the A\* path length, so they drift as contributions change.
- **Wiring:** README Activity section uses a compact `<picture>` (no blank lines) with `width="100%"`, plus a one-line caption. The external activity-graph URLs are removed.
- **Refresh:** the GIF is a snapshot. Re-run the generator script and replace both `assets/` files to update; a GitHub Actions cron could automate this later.

## Consequences

- **Positive:** no third-party dependency for Activity; the animation matches the profile's self-hosted asset strategy; dark mode is fully handled (dark GIF background matches `#0d1117`, no white box).
- **Negative:** the GIF is a snapshot that drifts as contributions grow — it needs a periodic regeneration (manual for now).
- **Negative:** two ~247 KB GIF assets and a ~28 s loop — still heavier/longer than the chart it replaced, but A-tier compressed for the profile budget. Speed/duration trade-offs are tuned in `speed()` (VMIN/VMAX/NEAR/FAR), bump frequency, and `FPS` / `MAX_COLORS`.
- **Negative:** GIF is raster at 896×192; it is rendered slightly softer than the vector chart it replaced, and the activity-graph's time-trend view is gone.

## Alternatives Considered

- **Keep `github-readme-activity-graph`:** rejected — external dependency and mismatched style.
- **Inline `<svg>` with SMIL animation:** rejected — GitHub's sanitizer strips `<svg>` from README (verified).
- **SVG heatmap via `<img>`:** rejected — would be a static image; animation does not play for SVG loaded through `<img>`.

## Related

- `temp/contribution-heatmap/gen_heatmap_gif.py`, `docs/assets-reproduction.md`
- `temp/reports/dark-mode-checklist.md`
- `assets/contribution-snake.gif`, `assets/contribution-snake-dark.gif`
