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
animation is placed at `y=390`, preserving its pose order around the inserted
chapters. The square source remains a `39.41-second` loop, while the display
manifest applies a general `1.15×` speed-up to keep the dense animation moving;
the repeated C-group punch chapter uses an effective `1.25×` rate so its rhythm
is quicker without changing the sword or celebration timing.
A 32-frame sword action is inserted between the first 104 base frames, which
contain the punch group, and the final 40 base frames, which contain the
celebration group. A short copy of the base loop's final pose bridges the
sword recovery into the celebration start. This makes the published display
stream 177 frames and `38.62 seconds` while making the intended story read
punch → sword → celebration. The top and bottom
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
- a separate hard-edge `tech-stack-impact-atlas.png` layer adds amplified punch
  impact, hand-off, celebration, and landing feedback on selected non-sword
  frames; the punch layer stays visible across each four-beat micro-sequence;
- the ornament frames use the same 177-frame cycle as the character, so the
  entire tall asset loops without a separate timing seam;
- no text or additional character is introduced, so the decoration stays
  subordinate to the Tech Stack content.

The composition pipeline is implemented by
`scripts/compose-tech-stack-tall-mascot.js`. It decodes the existing square
GIFs, prepares 32 cleaned/registered sword frames from
`scripts/art/tech-stack-sword/`, inserts those action frames between the first
104 base frames and the final 40 celebration frames, adds a 100 ms base-pose
bridge at the action hand-off, renders 177 matching transparent ornament
frames for each theme, layers the selected chapter effects from
`scripts/art/tech-stack-impact-atlas.png`, normalizes the source stream to
`RGB`, keys the dark source matte onto the canonical dark background, creates a shared-palette RGB
intermediate, encodes complete opaque GIF frames, and restores the display
delay manifest from `scripts/tech-stack-sword-sequence.js`.
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
- The action boundary is placed between the registered punch and celebration
  groups instead of appending sword motion after the full base cycle. The
  sword recovery hands to a 100 ms copy of the base loop's final pose, then to
  `source-D01`; measured character differences stay below 20 for the first
  hand-off and below 14 for the second, including the first celebration burst.
  The dark compositor removes the source
  GIF's `#0c0f16` matte before placing the character on `#0d1117`, so the
  centered character cannot expose a darker 320×320 panel.
- A single GitHub-hosted GIF cannot independently HTTP-lazy-load internal later
  frames. Keeping the known base chapter first is the static-Markdown-compatible
  streaming optimization; separate network loading would require separate
  assets and runtime code.
- Both README locales must continue to reference the same light/dark display
  contract.

## Verification

- Both display variants are `320×1100`, 177 frames, infinite loop, and
  `38.62 seconds` long; the general display rate is `1.15×`, with the punch
  chapter at an effective `1.25×` rate. The frame order is 104 base frames
  through the punch group, 32 sword-action frames, one bridge frame, and 40
  base frames through the celebration group.
- Every GIF image descriptor is a full opaque `320×1100` canvas at `(0,0)`.
- Pixel comparison across sampled frames confirms that both the top and bottom
  ornament regions change over the loop.
- The existing square base GIFs remain unchanged.
- `npm test`, `npm run lint`, and `npm run build` cover the asset, README,
  generator, and delay-rewrite contracts.
