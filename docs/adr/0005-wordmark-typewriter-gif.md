# ADR 0005: Typewriter GIF for the Profile Wordmark

## Status

Accepted (2026-08-20).

## Context

The published wordmark is a static SVG (`assets/brand-threetwoa.svg` / `assets/brand-threetwoa-dark.svg`) switched by theme with `<picture>`. We wanted the letters of `threetwoa` to appear left-to-right with a blinking caret.

GitHub's profile README cannot do that live:

- `<style>`, inline `style=`, and `<script>` are stripped.
- Inline `<svg>` is sanitized, so CSS/SMIL inside the README does not run.
- SVG loaded through `<img>` does not play CSS or SMIL animations in current browsers (same finding as ADR 0004).

The mascot already ships as a pre-rendered GIF for this reason (ADR 0002).

## Decision

Keep the SVGs as the editable source. Publish looping GIFs rasterized from those SVGs and wire them with the existing `<picture>` pair:

- **Light:** `assets/brand-threetwoa.gif` — background `#ffffff`.
- **Dark:** `assets/brand-threetwoa-dark.gif` — background `#0d1117`.
- **Motion:** caret blinks on empty, types `threetwoa` left-to-right in the final word's slot (not centered-per-prefix), caret blinks, then holds ~2.6 s and loops.
- **Encode:** Chromium screenshot at 760×150, deviceScaleFactor 2 (1520×300), Pillow GIF, ~15 unique frames after identical-frame merge, ~341 KB each.
- **Working files:** `.scratch/wordmark-typewriter/` (ignored). Regeneration: `python .scratch/wordmark-typewriter/render.py`.

The HTML tagline `Code Less, Architect More` stays as selectable text under the wordmark. It is not baked into the GIF.

## Consequences

- **Positive:** Typewriter plays on the GitHub profile; light/dark still switch with `<picture>`; SVG source remains editable.
- **Negative:** GIF has an opaque plate (1-bit alpha). Default light and default dark GitHub themes match; other GitHub dark palettes are best-effort, same as the mascot.
- **Negative:** Typography is frozen to Chromium's Georgia italic, not the viewer's SVG font fallback.
- **Reproducibility:** The render script lives in ignored `.scratch/`; `docs/assets-reproduction.md` records the settings.

## Alternatives Considered

- **CSS typewriter in `README.md`:** Rejected; GitHub strips CSS and JS.
- **Animated SVG as `<img>`:** Rejected; animations do not run.
- **Typewriter only in `preview-profile.html`:** Rejected; the published profile would stay static.
- **Bake the tagline into the GIF:** Rejected; the slogan should stay selectable HTML and easy to edit.

## Related

- `assets/brand-threetwoa.gif`, `assets/brand-threetwoa-dark.gif`
- `assets/brand-threetwoa.svg`, `assets/brand-threetwoa-dark.svg` (source)
- `docs/assets-reproduction.md`
- `temp/reports/dark-mode-checklist.md`
- ADR 0002 (same GIF + `<picture>` pattern)
