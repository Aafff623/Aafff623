# Tech Stack Impact Visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the non-sword chapter effects visibly read as punch impact, celebration, landing, and rail response in the published tall Tech Stack mascot GIF without changing the sword source artwork or the single-GIF delivery contract.

**Architecture:** Keep the existing `320×1100` transparent decoration renderer and `256×128` hard-edge impact atlas. Increase impact sprites through deliberate per-phase layering, scale, placement, and opacity; keep the sword chapter `104–135` excluded from the new character-cell layer. Regenerate both theme GIFs through the existing composer, then validate the transparent overlay metrics, final GIF metadata, and local browser rendering.

**Tech Stack:** Python 3, Pillow, existing PNG sprite atlases, Node.js composer, `ffmpeg`/`ffprobe`, Node built-in test runner, Express local preview, CodeGraph.

**Spec:** `docs/adr/0012-tech-stack-mascot-vertical-rail.md`

## Global Constraints

- Work in the current local `main` checkout and preserve existing unrelated worktree changes.
- Keep the published assets as one light GIF and one dark GIF at `320×1100`, `177` frames, and `38.62 seconds`.
- Keep the frame order `punch → sword → celebration` and the existing punch timing contract.
- Do not alter the sword source frames or add new character-cell effects to frames `104–135`.
- Reuse the existing local impact atlas and hard-edge nearest-neighbor rendering; no new runtime dependency or network request.
- Keep experimental renders, frame grids, and audit outputs outside tracked source or under ignored `temp/` paths.
- Update durable asset documentation only after the new measurements and browser verification are complete.
- Do not commit or push in this execution unless the user explicitly requests it later.

---

### Task 1: Lock the visibility regression contract with failing tests

**Files:**
- Modify: `test/tech-stack-tall-mascot.test.js`
- Test input: `scripts/tech-stack-tall-decorations.py`, `scripts/art/tech-stack-impact-atlas.png`

**Interfaces:**
- Consumes: the renderer's transparent PNG frames for indices `20`, `28–31`, `104`, `136`, `137`, and `161`.
- Produces: measurable thresholds for punch size/continuity, celebration size, landing-ring width, rail response, and sword exclusion.

- [x] **Step 1: Add a test helper that reports transparent-region metrics**

Extend the existing Python probe in `test/tech-stack-tall-mascot.test.js` to return, for each sampled renderer frame, the alpha bounding box and visible-pixel count for:

```text
character: (0, 390, 320, 710)
topRail:   (0, 0, 320, 360)
bottomRail:(0, 760, 320, 1100)
```

The helper must read real renderer output, not inspect function names or mock images.

- [x] **Step 2: Add assertions that describe the requested visible result**

Add assertions with these target behaviors:

```js
assert.ok(metrics['28'].character.width >= 44);
assert.ok(metrics['28'].character.height >= 40);
assert.ok(Math.min(...[28, 29, 30, 31].map(index => metrics[String(index)].character.pixels)) >= 160);
assert.ok(metrics['137'].character.width >= 118);
assert.ok(metrics['161'].character.width >= 120);
assert.ok(metrics['28'].topRail.pixels > metrics['20'].topRail.pixels);
assert.ok(metrics['28'].bottomRail.pixels > metrics['20'].bottomRail.pixels);
assert.equal(metrics['104'].character.pixels, 0);
assert.equal(metrics['135'].character.pixels, 0);
```

Keep the existing positive checks for the bridge and celebration and the existing GIF-level contract checks.

- [x] **Step 3: Run the focused test and verify the failure is meaningful**

Run: `node --test test/tech-stack-tall-mascot.test.js`

Expected: FAIL on the new visibility thresholds because the current punch peak is only about `30×30`, the current landing ring is about `76` pixels wide, and the four punch frames do not all meet the minimum visible-pixel threshold. The failure must come from the behavior assertion, not a syntax or fixture error.

---

### Task 2: Increase punch impact visibility without touching sword frames

**Files:**
- Modify: `scripts/tech-stack-tall-decorations.py:204-215`
- Test: `test/tech-stack-tall-mascot.test.js`

**Interfaces:**
- Consumes: `sprites` loaded from `scripts/art/tech-stack-impact-atlas.png` and the existing `character_center()` anchor.
- Produces: `draw_punch_effects(image, sprites, frame_index)` with a continuous four-step impact sequence visible on every punch frame.

- [x] **Step 1: Preserve the right-fist anchor and define phase-specific layers**

Keep the punch effect center to the right of the character's fist, around `character_center(170, 234)`, so the enlarged sprites remain outside the face and torso. Use the four existing tiles as layered effects instead of selecting exactly one tile per frame:

```python
# step 0: burst + short trail + upper sparks
# step 1: long trail + burst residue + sparks
# step 2: burst + forward spark + short trail residue
# step 3: long trail residue + burst residue + lower sparks
```

- [x] **Step 2: Implement the smallest visible scale/opacity increase**

Use nearest-neighbor sizes and opaque-enough values in these ranges:

```python
burst:  (46, 46)–(56, 56), opacity 220–245
trail:  (58, 18)–(72, 24), opacity 195–235
spark:  (28, 28)–(38, 34), opacity 180–225
sparks: (34, 30)–(44, 38), opacity 160–210
```

Keep all effects inside the `320×320` character crop and do not add a new image layer to sword frames.

- [x] **Step 3: Run the focused visibility test**

Run: `node --test test/tech-stack-tall-mascot.test.js`

Expected: the punch-size, punch-continuity, and sword-exclusion assertions pass; celebration and final GIF checks may remain unchanged at this step.

---

### Task 3: Strengthen celebration, landing, and chapter rail response

**Files:**
- Modify: `scripts/tech-stack-tall-decorations.py:178-197, 227-240`
- Test: `test/tech-stack-tall-mascot.test.js`

**Interfaces:**
- Consumes: the same impact atlas, light/dark palettes, and existing chapter boundaries.
- Produces: visible celebration burst/particles, a wide landing ring, and chapter-specific rail pulses while preserving the subordinate pixel-art style.

- [x] **Step 1: Make celebration effects occupy a readable envelope**

Keep the burst above and right of the character, but scale it to at least `58×58`. During phases `0–23`, layer a fading burst or sparkle with confetti on both sides so there is no single-frame visual gap. During phases `24–35`, scale the landing ring to at least `100×42` and keep a small upward particle layer. Late celebration frames may fade, but must not jump directly to zero.

- [x] **Step 2: Make the rail response visibly track chapters**

For punch frames, pulse both upper and lower bright rails with a two-step width pattern and add one adjacent node on the existing rail. For frame `136`, keep a short blue hand-off pulse. For the first celebration frames, use gold rails and two gold nodes; for the landing phase, brighten the existing bottom scan line and the neighboring horizontal rail. Do not move the static ornaments or change the canvas contract.

- [x] **Step 3: Run the focused test and inspect representative transparent frames**

Run: `node --test test/tech-stack-tall-mascot.test.js`

Then render temporary PNGs for indices `20`, `28`, `30`, `48`, `104`, `136`, `137`, and `161` under the system temp directory. Inspect the character crop and rail regions with the image viewer. Expected: punch frames show a bright impact beside the fist, frames `104` and `135` show no new transparent character overlay, frame `137` shows a large celebration burst, and frame `161` shows a wide landing ring.

---

### Task 4: Regenerate paired GIFs and verify the binary contract

**Files:**
- Modify: `assets/tech-stack-knight-v2-tall.gif`
- Modify: `assets/tech-stack-knight-v2-tall-dark.gif`
- Modify: `scripts/compose-tech-stack-tall-mascot.js` only if regeneration exposes a reproducibility issue
- Test: `test/tech-stack-sword-extension.test.js`, `test/tech-stack-tall-mascot.test.js`

**Interfaces:**
- Consumes: the updated decoration renderer and existing sword sequence manifest.
- Produces: two paired opaque GIFs with identical frame count/order and the strengthened non-sword effects.

- [x] **Step 1: Regenerate both display assets through the existing composer**

Run: `node scripts/compose-tech-stack-tall-mascot.js`

Expected output for both files: `320x1100`, `177 frames`, `38620 ms`.

- [x] **Step 2: Probe both GIFs independently**

Run `ffprobe` and the existing GIF descriptor parser. Verify:

```text
width=320
height=1100
nb_frames=177
duration=38.620000
```

Every image descriptor must remain `(left=0, top=0, width=320, height=1100, transparent=false)`. Confirm that the square base GIFs remain unchanged.

- [x] **Step 3: Run the sword boundary and tall-mascot tests**

Run: `node --test test/tech-stack-sword-extension.test.js test/tech-stack-tall-mascot.test.js`

Expected: all sword order, transition, bridge, full-canvas, dark-matte, effect visibility, and rail motion checks pass.

---

### Task 5: Complete repository QA, documentation, and local browser verification

**Files:**
- Modify: `CONTEXT.md` if measured visibility behavior or final effect contract changes
- Modify: `docs/adr/0012-tech-stack-mascot-vertical-rail.md`
- Modify: `docs/assets-reproduction.md`
- Modify: `test/profile.test.js` only if the documented asset contract needs a synchronized assertion
- Do not modify: `README.md`, `README.zh.md` unless the public asset path or displayed contract changes

**Interfaces:**
- Consumes: final measured assets, test output, CodeGraph status, and browser screenshot.
- Produces: durable reproducibility notes and a verified local preview at `http://127.0.0.1:3000/`.

- [x] **Step 1: Update durable docs with the final effect-layer facts**

Record that the impact atlas is reused as a hard-edge transparent layer, that punch/celebration/landing/rail effects are amplified only on selected non-sword frames, and that sword source frames remain untouched. Keep the single-GIF and `177`-frame streaming constraint explicit.

- [x] **Step 2: Run the complete automated checks**

Run all of:

```text
npm test
npm run lint
npm run build
python -m py_compile scripts\tech-stack-tall-decorations.py scripts\prepare-tech-stack-sword-frames.py scripts\generate-tech-stack-impact-atlas.py
git diff --check
```

Expected: all commands exit successfully; only normal Windows LF/CRLF notices may appear from Git.

- [x] **Step 3: Synchronize and inspect CodeGraph**

Run:

```text
node C:\Users\Lenovo\.agents\scripts\codegraph-autosync.mjs D:\code\Aafff623
node D:\develop\NodeJS\node_modules\@colbymchenry\codegraph\npm-shim.js status D:\code\Aafff623
```

Expected: the index reports `up to date` and includes the changed Python/JavaScript source files.

- [x] **Step 4: Verify the running browser surface**

Keep the existing local service on `127.0.0.1:3000`, refresh the current preview tab, scroll to `Tech Stack`, capture a screenshot, and read browser logs with `error` and `warn` levels. Expected: meaningful profile content is visible, the new rail/mascot composition is rendered, there is no framework error overlay, and no relevant console errors or warnings.

- [x] **Step 5: Audit the worktree without staging or committing**

Run `git status --short --branch`, `git diff --name-only`, and inspect modification times. Confirm only this task's source, tests, docs, and paired GIFs changed; keep ignored temporary audit files out of the tracked set. Report the current branch and explicitly state that commit/push were not performed.
