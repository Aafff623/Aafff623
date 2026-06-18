# CONTEXT — Aafff623 GitHub Profile

## Purpose

Public GitHub profile repository for `Aafff623`. `README.md` at the repository root is rendered as the public profile page. All other files are static assets or local tooling that support the README.

## Audience

- Recruiters and hiring managers
- Hackathon teammates and potential collaborators
- Visitors interested in Agentic Coding, Web3, and AI workflows

## Identity & Voice

- **Builder identity:** Agentic Coding Explorer · Workflow Practitioner · Web3 & AI Hackathon Frontend & Full-Stack Builder
- **Tagline:** "Code less, Architect more."
- **Tone:** Professional but energetic; emoji-friendly; spec-driven.

## Constraints

- No build system, package manager, test suite, or linter. Only static Markdown, HTML, SVG, PNG, and GIF.
- `README.md` must use relative paths for local assets (e.g., `./assets/...`) so they resolve on GitHub.
- GitHub's cmark-gfm treats blank lines inside raw HTML blocks as block terminators. Keep `<table>` blocks compact.
- Profile is light-mode-first; assets should look correct on a white background.

## Asset Conventions

| Asset | File | Usage |
|---|---|---|
| Banner | `./assets/v8-banner.gif` | Top-center animated banner |
| Banner fallback | `./assets/v7-banner.gif` | Previous banner kept as versioned fallback |
| Hero | `./assets/hero-knight.png` | Intro table right cell |
| Mascot | `./assets/mascot.gif` | Tech Stack table right cell, white-background looping GIF |
| Badges | HTTPS shields.io URLs | Tech stack and project badges |

## Development Flow

1. Edit `README.md`.
2. Verify visually via `preview-profile.html` (open directly or serve locally).
3. For risky HTML/table changes, verify with `gh api markdown` before pushing.
4. Commit atomic changes with Conventional Commits.

## Active Decisions

- Mascot uses a white-background looping GIF instead of a transparent PNG. See `docs/adr/0001-mascot-white-background-gif.md`.
