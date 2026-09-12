# ADR 0012: Use an animated vertical ornament rail for the Tech Stack mascot

- **Status:** Accepted
- **Date:** 2026-09-12
- **Scope:** Published `README.md` and `README.zh.md` Tech Stack right cell
- **Supersedes:** The square-only display assumption for the Tech Stack mascot; the square base animation remains unchanged.

## Context

The Tech Stack table contains a dense, two-column badge wall. Its left cells make
the table row much taller than the `320×320` mascot image placed in the right
cell. Because the right cell is vertically centered, the character appeared as
a small square in the middle of a long empty column. Reducing the animation's
canvas would not solve the problem: the unused height belongs to the table
layout, not only to the source sprite.

## Decision

Publish a paired vertical display variant generated from the existing square
mascot GIFs:

- `assets/tech-stack-knight-v2-tall.gif` for the light theme
- `assets/tech-stack-knight-v2-tall-dark.gif` for the dark theme

Each display asset is a `320×1100` full-canvas GIF. The original `320×320`
animation is placed at `y=390`, preserving the first 144 frames and their pose
order. The square source remains a `39.41-second` loop, while the display
manifest applies a uniform `1.15×` speed-up to keep the dense animation moving.
A 32-frame sword-dance chapter follows it, making the published display stream
176 frames and `39.20 seconds`. The top and bottom
zones contain sparse, deterministic pixel-art ornament layers rendered per frame by
`scripts/tech-stack-tall-decorations.py`, using the supplementary source sheet
at `scripts/art/tech-stack-ornament-sprites.png`:

- the top zone is a signal constellation with small nodes, stepped circuit
  traces, a moving scan point, and blue/gold pixel sparks that pulse in a slow
  loop;
- the bottom zone is a landing pad with data rails, small nodes, and matching
  pixel sparks, and a scan line that travels across the platform;
- the ornaments use separate light/dark palettes and never cover the character
  animation;
- the ornament frames use the same 176-frame cycle as the character, so the
  entire tall asset loops without a separate timing seam;
- no text or additional character is introduced, so the decoration stays
  subordinate to the Tech Stack content.

The composition pipeline is implemented by
`scripts/compose-tech-stack-tall-mascot.js`. It decodes the existing square
GIFs, prepares 32 cleaned/registered sword frames from
`scripts/art/tech-stack-sword/`, appends those frames after the 144-frame base
chapter, renders 176 matching transparent ornament frames for each theme,
creates a shared-palette RGB intermediate, encodes complete opaque GIF frames,
and restores the display delay manifest from `scripts/tech-stack-sword-sequence.js`.
Delay rewriting parses the GIF structure instead of scanning arbitrary compressed
bytes, inserts a missing default GCE when an encoder omits one, and stops at the
trailer, so every logical frame has an explicit delay and marker-like data after
the trailer cannot be mistaken for another frame.

## Consequences

- The right cell now has intentional visual content in the upper and lower
  regions instead of appearing as an empty vertical strip, and those regions
  carry a restrained loop of their own.
- The established mascot animation remains the source of truth for character
  motion and can be regenerated independently.
- The supplementary sprite sheet is kept beside the renderer, so the source
  ornaments can be replaced without changing the published asset contract.
- The generated sword sheets are kept beside their preparation script as
  replaceable source material. The keyframes preserve the current knight's
  identity; the second sheet supplies follow-through and return-to-ready poses,
  while the effect atlas is composited only on selected attack/recovery beats.
- The published GIFs are taller and may cost more bytes than the square base
  GIFs; this is accepted for the layout fix and should be revisited only with a
  measured visual and loading comparison.
- A single GitHub-hosted GIF cannot independently HTTP-lazy-load internal later
  frames. Keeping the known base chapter first is the static-Markdown-compatible
  streaming optimization; separate network loading would require separate
  assets and runtime code.
- Both README locales must continue to reference the same light/dark display
  contract.

## Verification

- Both display variants are `320×1100`, 176 frames, infinite loop, and
  `39.20 seconds` long at `1.15×` playback; the first 144 frames remain the
  original base chapter content.
- Every GIF image descriptor is a full opaque `320×1100` canvas at `(0,0)`.
- Pixel comparison across sampled frames confirms that both the top and bottom
  ornament regions change over the loop.
- The existing square base GIFs remain unchanged.
- `npm test`, `npm run lint`, and `npm run build` cover the asset, README,
  generator, and delay-rewrite contracts.
