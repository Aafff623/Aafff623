# Tech Stack Mascot Two Action Groups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two 10-pose action groups and their in-between frames to the Tech Stack mascot loop while retaining fixed-window registration and local-only preview behavior.

**Architecture:** Treat the existing 64-frame loop as a stable baseline. Insert a combat extension between existing poses `5` and `9`, insert an expressive extension between existing poses `15` and `16`, and build one 144-frame sequence from 36 key poses plus three in-betweens per connection. Generate candidates in ignored `temp/`, normalize every frame into a fixed opaque `320×320` canvas around the existing head anchor, then replace the two published light/dark GIFs only after binary and visual checks pass.

**Tech Stack:** Node.js scripts, `ffmpeg`, GIF89a, existing PNG parser/cropper, existing anchor-based normalizer, Node built-in test runner, local Express preview.

**Spec:** `docs/superpowers/specs/2026-09-10-tech-stack-mascot-two-action-groups-design.md`

## Global Constraints

- Work only on the current local `main` checkout; do not push to a remote branch.
- Preserve unrelated dirty files and the untracked rollback assets `assets/hero-knight-animated.webp` and `assets/v9-banner-animated.webp`.
- Keep generated candidates and scratch reports under ignored `temp/`; publish only the accepted GIFs under `assets/`.
- Keep `README.md` and `README.zh.md` references paired and relative.
- Every published mascot frame remains a complete opaque `320×320` canvas at `(0,0)`.
- Registration uses the existing head anchor (`x=132`, `y=115`) and shared-scale model; transparent-bounds centering is prohibited.

---

### Task 1: Lock the sequence contract with regression tests

**Files:**
- Modify: `test/profile.test.js`
- Create: `test/tech-stack-mascot-sequence.test.js`

**Interfaces:**
- Consumes: the published GIF files and the new sequence metadata file created in Task 2.
- Produces: assertions for 144 frames, paired light/dark metadata, complete canvases, and generated-group ordering.

- [ ] **Step 1: Write the failing tests**

Add tests that read the sequence manifest and assert:

```js
assert.equal(sequence.keyFrames.length, 36);
assert.equal(sequence.transitionsPerConnection, 3);
assert.equal(sequence.frameCount, 144);
assert.deepEqual(sequence.insertions, [
  { after: 5, before: 9, group: 'evade-counter' },
  { after: 15, before: 16, group: 'observe-understand-celebrate' }
]);
```

Update the existing mascot binary test from 64 frames and `14.620000` seconds to the measured 144-frame contract only after the new encoder output exists; keep its full-canvas and opaque-frame assertions unchanged.

- [ ] **Step 2: Run the focused tests to verify they fail**

Run: `node --test test/tech-stack-mascot-sequence.test.js test/profile.test.js`

Expected: FAIL because the sequence manifest and 144-frame GIF output do not exist yet.

- [ ] **Step 3: Keep the test scope narrow**

Do not weaken the existing descriptor, theme-pairing, fallback-retention, or README assertions to accommodate the larger loop.

---

### Task 2: Add a reproducible sequence manifest and candidate workspace

**Files:**
- Create: `scripts/tech-stack-mascot-sequence.js`
- Modify: `package.json`
- Modify: `docs/assets-reproduction.md`

**Interfaces:**
- Consumes: the existing 16 registered baseline frames plus accepted `C01–C10` and `D01–D10` key poses under `temp/tech-stack-mascot-v3/`.
- Produces: an exported manifest with key-pose labels, ordered connections, delay classes, and `frameCount=144`.

- [ ] **Step 1: Define the manifest before encoder changes**

Export a plain object with these exact fields:

```js
module.exports = {
  targetSize: 320,
  headAnchor: { x: 132, y: 115 },
  transitionsPerConnection: 3,
  groups: {
    'evade-counter': ['C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07', 'C08', 'C09', 'C10'],
    'observe-understand-celebrate': ['D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07', 'D08', 'D09', 'D10']
  },
  insertions: [
    { after: 5, before: 9, group: 'evade-counter' },
    { after: 15, before: 16, group: 'observe-understand-celebrate' }
  ]
};
```

Derive `keyFrames`, ordered `connections`, and `frameCount` from the manifest so the expected count cannot silently diverge from the declared sequence.

- [ ] **Step 2: Run the focused manifest test**

Run: `node --test test/tech-stack-mascot-sequence.test.js`

Expected: PASS for the manifest contract after the test from Task 1 is pointed at the exported object.

- [ ] **Step 3: Document the candidate and promotion directories**

Record that source sheets, generated key frames, normalized PNGs, palette probes, and rejected candidates remain in `temp/tech-stack-mascot-v3/`; only final GIFs are promoted to `assets/`.

---

### Task 3: Generate and screen the twenty key poses

**Files:**
- Create: `temp/tech-stack-mascot-v3/source/` (ignored generated candidates)
- Create: `temp/tech-stack-mascot-v3/key-frames/` (ignored generated candidates)
- Modify: none in tracked files until candidates pass review

**Interfaces:**
- Consumes: `C:\Users\Lenovo\AppData\Local\Temp\codex-clipboard-cfe503e9-6d1d-48f1-b7f1-f55cd37165e5.png` and the existing cropped baseline character references.
- Produces: exactly 20 transparent key-pose PNGs named `C01.png`–`C10.png` and `D01.png`–`D10.png`, each preserving the supplied chibi knight identity.

- [ ] **Step 1: Generate Group C from the supplied character reference**

Use the approved image-generation tool with the supplied sprite sheet as the reference. Generate the ten-pose evade/counter sequence with transparent background, no text, no grid, no new props, full-body framing, and consistent costume, hair, face, outline, and palette. Keep every candidate in `temp/tech-stack-mascot-v3/source/`.

- [ ] **Step 2: Generate Group D from the supplied character reference**

Generate the ten-pose observe/understand/celebrate sequence with the same constraints and keep candidates in the same ignored directory.

- [ ] **Step 3: Crop and inspect candidates**

Split generated sheets or individual outputs into the named key frames, remove only isolated boundary/matte residue, and reject any pose with clipped hair, feet, missing limbs, opaque background, or a visibly different character design. Do not promote a candidate merely because its action label is correct.

- [ ] **Step 4: Record rejected candidates without publishing them**

Keep rejected files and a short reason under `temp/tech-stack-mascot-v3/rejected/`; do not add them to `assets/` or tracked documentation.

---

### Task 4: Normalize key poses and create three in-betweens per new connection

**Files:**
- Modify: `scripts/normalize-tech-stack-frames.js`
- Modify: `scripts/crop-tech-stack-sprite.js` only if the generated source format needs the same boundary cleanup
- Create: `temp/tech-stack-mascot-v3/normalized/` (ignored)
- Create: `temp/tech-stack-mascot-v3/transitions/` (ignored)
- Test: `test/tech-stack-mascot-sequence.test.js`

**Interfaces:**
- Consumes: 36 key poses and the existing anchor-registration constants.
- Produces: 144 normalized full-canvas PNG frames in manifest order, with three explicit in-between frames per connection.

- [ ] **Step 1: Add a failing frame-count and registration test**

Assert that the build input directory has 144 frames, every normalized PNG is `320×320` RGBA, and no frame's detected head anchor falls outside the existing tolerance around `(132,115)`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test test/tech-stack-mascot-sequence.test.js`

Expected: FAIL because the new key frames and transitions are not yet normalized.

- [ ] **Step 3: Implement manifest-driven normalization**

Replace the fixed 64-frame assumption with the manifest's ordered frame list while retaining the current geometry filtering, shared base scale, head-anchor registration, and isolated-residue exclusion. New corrections must be generated from measured head silhouettes and reviewed as data; do not reintroduce transparent-bounds centering.

- [ ] **Step 4: Generate the three transition frames per connection**

For each adjacent key-pose pair touching a new group, generate `t1`, `t2`, and `t3` as actual pose intermediates. Use endpoint references, preserve the same character identity, and verify that no transition is a crossfade or a repeated endpoint.

- [ ] **Step 5: Run the focused normalization test**

Run: `node --test test/tech-stack-mascot-sequence.test.js`

Expected: PASS with exactly 144 normalized frame inputs and stable anchor/size metrics.

---

### Task 5: Encode, time, and promote the two theme GIFs

**Files:**
- Modify: `assets/tech-stack-knight-v2.gif`
- Modify: `assets/tech-stack-knight-v2-dark.gif`
- Modify: `test/profile.test.js`

**Interfaces:**
- Consumes: 144 normalized transparent frames and the existing light/dark background colors.
- Produces: paired infinite-loop GIFs with identical frame order and complete opaque canvases.

- [ ] **Step 1: Encode candidate light and dark GIFs in `temp/`**

Composite every frame over `#ffffff` and `#0d1117`, encode a full `320×320` GIF frame for each, disable GIF differential offsetting, set infinite looping, and write candidates under `temp/tech-stack-mascot-v3/candidates/`.

- [ ] **Step 2: Apply action-aware GIF delays**

Keep the existing punch cadence for unchanged combat frames. Use longer holds for the new expressive `question`, `realization`, `celebratory hop`, and `settle` poses. Read the final Graphic Control Extensions back from the binary and record the exact delay sequence; do not infer it from `ffmpeg`'s nominal frame rate.

- [ ] **Step 3: Probe candidate metadata**

Verify with `ffprobe` and the existing GIF parser that both candidates have 144 frames, the same total duration, an infinite loop, and one full opaque `320×320` descriptor per frame.

- [ ] **Step 4: Promote only after checks pass**

Copy the accepted candidates to the two exact existing asset paths. Do not replace `assets/mascot.gif`, `assets/mascot-dark.gif`, `assets/hero-knight-animated.webp`, or `assets/v9-banner-animated.webp`.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`

Expected: all profile, server, GIF, and sequence tests pass.

---

### Task 6: Update durable asset records and launch local preview

**Files:**
- Modify: `CONTEXT.md`
- Modify: `docs/adr/0009-tech-stack-sprite-sheet-gif.md`
- Modify: `docs/assets-reproduction.md`
- Modify: `README.md` only if the existing alt text needs the new frame count
- Modify: `README.zh.md` only if the matching Chinese alt text needs the new frame count

**Interfaces:**
- Consumes: final measured frame count, duration, file sizes, hashes, and verification output from Task 5.
- Produces: synchronized durable records and a running local preview for manual inspection.

- [ ] **Step 1: Update the asset contract with measured facts**

Record the 144-frame sequence, the two insertion points, the final measured duration/delays, and the exact light/dark hashes. Keep rollback asset statements unchanged.

- [ ] **Step 2: Run repository checks**

Run: `npm run lint`, `npm run build`, and `git diff --check`.

Expected: all commands exit successfully.

- [ ] **Step 3: Start the local preview**

Run `node server.js` with `HOST=127.0.0.1` and `PORT=3000`, then verify `/`, `/edit`, `/edit/zh`, both GIF URLs, and `/api/profile` return HTTP 200. Open `http://127.0.0.1:3000/edit` for manual review.

- [ ] **Step 4: Perform the final worktree audit**

Run `git status --short --branch`, inspect the diff, and confirm only the intended tracked assets/scripts/tests/docs changed. Do not use `git add .` and do not push.
