# temp/AGENTS.md — Temporary Workspace Governance

This document governs agent behavior inside the ignored local `temp/` directory.

## Core Rules

1. **Isolation Guarantee**:
   - `temp/` is strictly local and git-ignored (except for `temp/AGENTS.md` and `temp/README.md`).
   - Never reference anything inside `temp/` from tracked files (`README.md`, `README.zh.md`, `index.html`, etc.).
   - Tracked files must only reference assets in `assets/` or documentation in `docs/`.

2. **Payload Promotion Pipeline**:
   - **Scratch & Candidates**: Generate intermediate video frames, palette candidates, test images, and scratch scripts under `temp/`.
   - **Verification**: Verify visual appearance, file size budget, and dark/light mode compatibility locally.
   - **Promotion**: When a candidate is finalized:
     - Copy the approved binary to `assets/`.
     - Document reproduction parameters in `docs/assets-reproduction.md`.
     - Record architectural/design rationale in `docs/adr/`.
     - Clean up heavy candidate frames if no longer needed.

3. **Subdirectory Organization**:
   - `temp/preview/` — Legacy standalone preview snapshots. The canonical local preview is `server.js` + `index.html`; these snapshots are not launch inputs and may be absent after a fresh checkout.
   - `temp/reports/` — Intermediate analysis reports, audit logs, and checklists.
   - `temp/scripts/` — Disposable experimental scripts and candidate generator harnesses.

4. **Preservation of Entry Points**:
   - Never delete or modify `.gitignore` exclusions that protect `temp/` payloads from leaking into Git commits.
