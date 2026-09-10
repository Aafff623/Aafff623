# Tech Stack Mascot: Two Additional Action Groups

## Status

Approved for local implementation on 2026-09-10. This change is local-only; it must not be pushed to a remote branch.

## Goal

Extend the Tech Stack mascot loop with two new, internally coherent action groups while preserving the fixed `320×320` window, the character's stable head anchor, the current light/dark rendering path, and the retained rollback assets.

## Existing baseline

- The published assets are `assets/tech-stack-knight-v2.gif` and `assets/tech-stack-knight-v2-dark.gif`.
- The current loop has 16 supplied source poses and 48 transition frames, for 64 full-canvas frames.
- Existing source order is `16 → 1 → 6 → 2 → 3 → 4 → 5 → 9 → 10 → 11 → 12 → 14 → 8 → 13 → 7 → 15 → 16`.
- Existing registration uses a full opaque `320×320` canvas, character-head anchoring at `x=132`, `y=115`, shared scaling, and per-frame corrections. These invariants remain the source of truth for the new frames.
- The original supplied mascot fallback files remain untouched and hidden from the profile.

## New action groups

### Group C: evade and counter

This group extends the combat section without cutting directly from a punch to an unrelated expression:

`guard → crouch to charge → lean left → recover → step forward → jab → cross → impact recoil → return to guard → stable stance`

The first pose must be close to existing pose `5`; the last pose must be close enough to existing pose `9` that the `C10 → 9` connection can be animated rather than hard-cut.

### Group D: observe, understand, and celebrate

This group extends the expressive tail as one readable emotional progression:

`stable stance → notice something → turn to inspect → lean in → question → realization → hands up → small celebratory hop → land → settle`

The first pose must be close to existing pose `15`; the last pose must settle into existing pose `16` so the loop boundary remains calm.

## Sequence and frame policy

- Keep all existing internal connections unchanged where they remain visually compatible.
- Insert Group C between existing poses `5` and `9`.
- Insert Group D between existing pose `15` and the loop-boundary pose `16`.
- Replace only the old direct transition sets `5 → 9` and `15 → 16` with the new group connections.
- Each new group contains 10 generated key poses.
- Each connection touching a new key pose contains 3 generated in-between frames. No crossfade is allowed.
- The resulting loop has 36 key poses, 36 three-frame transition sets, and 144 full-canvas logical frames.
- Combat key poses keep the current quicker cadence. Expressive key poses receive longer holds, especially `question`, `realization`, `celebratory hop`, and `settle`.
- GIF delays must be quantized to centiseconds and must be recorded from the final binary rather than assumed from the source frame rate.

## Registration and visual acceptance

Every new key pose and in-between frame must pass the same pipeline as the existing loop:

1. Remove isolated sprite-sheet or generation matte residue before geometry detection.
2. Crop to the visible character plus nearby intentional action effects.
3. Register to the fixed `320×320` canvas using the warm-color head anchor, never by independently centering each frame's transparent bounds.
4. Keep the shared character scale stable; action effects may extend, but may not change the scale or position of the character body.
5. Composite separate light and dark canvases and encode each as a complete opaque GIF frame at `(0,0)` with no transparent-difference disposal.

Acceptance checks:

- The two GIFs have the same frame count, order, delays, dimensions, and loop count.
- Every GIF image descriptor is exactly `(left=0, top=0, width=320, height=320)` and has no transparent index.
- The generated sequence contains exactly 144 image frames.
- New frames do not change the existing source pose pixels or the two retained rollback assets.
- Head-anchor drift stays within the existing calibrated tolerance; no frame is allowed to introduce visible size pulsing or window-level movement.
- The local editor at `http://127.0.0.1:3000/edit` and the showcase preview at `http://127.0.0.1:3000/` both load the updated light/dark GIFs.

## Asset handling

- Generated source sheets, intermediate PNGs, probes, and rejected candidates belong under ignored `temp/` only.
- Only the two accepted published GIFs belong under `assets/`.
- `README.md` and `README.zh.md` keep the existing relative asset references and `<picture>` theme switch; no new external asset URL is introduced.
- `CONTEXT.md`, `docs/adr/0009-tech-stack-sprite-sheet-gif.md`, and `docs/assets-reproduction.md` are updated only after the final frame count, timing, and hashes are measured.
