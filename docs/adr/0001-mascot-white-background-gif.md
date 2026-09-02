# ADR 0001: Use a White-Background Looping GIF for the Tech Stack Mascot

## Status

Superseded by [ADR 0002](0002-3d-chibi-knight-light-dark-gif.md).

The 2D white-background GIF described here was replaced by a 3D chibi knight shipped as separate light (`assets/mascot.gif`) and dark (`assets/mascot-dark.gif`) GIFs, switched with `<picture>`. The dark-mode "white box" tradeoff recorded below no longer applies. This record is kept for history.

## Context

The Tech Stack section has a mascot image in the right table cell. The original asset was a static PNG (`assets/mascot.png`) with a transparent background. During production we discovered the cutout had alpha-matting issues: only 7 fully opaque pixels, making the body slightly translucent. This is invisible in the Read preview but renders poorly on the live profile. The user also requested that the mascot animate through a provided 5-pose storyboard.

## Decision

Replace the static transparent PNG with a white-background looping GIF (`assets/mascot.gif`) and treat that published GIF as the canonical asset.

- **Frames:** 5 storyboard poses scaled to 360×360 source, displayed at 90% width in the table cell.
- **Timing:** 12 frames held per pose, 6-frame eased crossfade, 18 fps, ~4.5 s loop.
- **Easing:** `smoothstep(t) = t²(3 − 2t)` for crossfades.
- **Encoding:** ffmpeg `palettegen` + `paletteuse` with 64 colors and no dither, output ~1 MB.
- **Background:** Pure white (`#ffffff`) to match the profile's light-mode page and avoid GIF 1-bit transparency jagged edges.
- **Working files:** Generated frames, candidate encodes, and local scripts may live under ignored `.scratch/`, but this ADR records the durable production settings. Tracked files do not depend on scratch content.

## Consequences

- **Positive:** Animated mascot draws attention; no alpha-matting defects; consistent with the light-mode background.
- **Negative:** GIF supports only 1-bit transparency, so a dark-mode visitor would see a white box. Acceptable because GitHub profile defaults to light mode and the rest of the profile is also light-mode-first.
- **Negative:** Exact regeneration requires the original local storyboard poses; those disposable working files are not part of the published repository.
- **Tradeoff:** File size ~1 MB vs. PNG ~841 KB; acceptable for the animation value.

## Alternatives Considered

- **Transparent GIF:** Rejected due to 1-bit transparency causing jagged edges around the saber-wielding silhouette.
- **Video (MiniMax image-to-video):** Rejected because it accepts only a single first frame, would discard the 5-pose storyboard, and could alter the white background.
- **Slower variant with longer holds:** Produced but not used; user selected the standard-timing version.

## Related

- `assets/mascot.gif`
- `temp/reports/dark-mode-checklist.md` (scratch report)
