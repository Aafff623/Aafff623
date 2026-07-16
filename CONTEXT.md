# CONTEXT: Aafff623 GitHub Profile

## Purpose

Public GitHub profile repository for `Aafff623`. `README.md` at the repository root is rendered as the public profile page. All other files are static assets or local tooling that support the README.

## Audience

- Recruiters and hiring managers
- Hackathon teammates and potential collaborators
- Visitors interested in AI-assisted development, Web3, and software projects

## Identity and voice

- **Profile:** Second-year Software Engineering student building AI-assisted workflows, web applications, and Web3 prototypes.
- **Intro line:** "Software engineering student learning by building, testing, and writing things down."
- **Tone:** Direct, specific, and modest. Use first person and keep emoji sparse.
- **Evidence:** Prefer concrete details, repository links, and transaction records over self-assigned labels.
- **Editing reference:** Apply the anti-AI patterns from `humanizer-output-style`, adapted for an English profile.

## Constraints

- No build system, package manager, test suite, or linter. Only static Markdown, HTML, SVG, PNG, and GIF.
- `README.md` must use relative paths for local assets (e.g., `./assets/...`) so they resolve on GitHub.
- GitHub's cmark-gfm treats blank lines inside raw HTML blocks as block terminators. Keep `<table>` blocks compact.
- Profile is light-mode-first; assets should look correct on a white background.
- `assets/` contains only files used by the published profile. `.scratch/` is ignored and disposable; tracked files must not depend on anything inside it.

## Asset Conventions

| Asset | File | Usage |
| --- | --- | --- |
| Banner | `./assets/v9-banner.gif` | Top-center animated banner (pixelized mascot, bright palette) |
| Wordmark (light) | `./assets/brand-threetwoa.svg` | Default profile wordmark |
| Wordmark (dark) | `./assets/brand-threetwoa-dark.svg` | Dark-theme wordmark selected with `<picture>` |
| Hero | `./assets/hero-knight.png` | Intro table right cell; optimized 800×1000 RGB PNG |
| Mascot | `./assets/mascot.gif` | Tech Stack table right cell, white-background looping GIF |
| Badges | HTTPS shields.io / simpleicons.org URLs | Tech stack and social link icons |

## Development Flow

1. Edit `README.md`.
2. Verify visually via `preview-profile.html` (open directly or serve locally).
3. For risky HTML/table changes, verify with `gh api markdown` before pushing.
4. Commit atomic changes with Conventional Commits.

## Active Decisions

- Mascot uses a white-background looping GIF instead of a transparent PNG. See `docs/adr/0001-mascot-white-background-gif.md`.
- The hero remains PNG for repository-format consistency. It is downscaled from 1122×1402 to 800×1000 with lossless PNG encoding, reducing its size without changing the visible composition.
- Quick links (AgentCFO, my-blogs, AI Web3 Study Track, Blog, Digital Garden) sit below the intro table, not above the tagline, so first-time visitors read the tagline and intro before hitting a link row.
- The Digital Garden link appears in both Quick links and the Contact icon row for consistency; it is not treated as a top-tier destination like AgentCFO.
- Tech stack uses soft pastel shields.io `for-the-badge` pills only (fixed pixel size). pure `cdn.simpleicons.org` SVG icons were dropped: GitHub often ignores `height` on those SVGs so they render enormous. AI tools still read "Docs as Code."
- The four `highlight-*.png` illustrations were removed from both "What I've been working on" and `assets/`. They restated what the adjacent text already said and added scroll length without new information. The two cards that leaned on their image for detail (my-blogs, study track) got a sentence of extra specifics instead, pulled from facts already stated elsewhere in the README (my-blogs' tech badges, the study track's project list).
- Lead Cup 2026 (vLLM on Hygon DCU / gfx936) sits in "What I've been working on" as the fourth card, replacing "Study notes and course work". Study notes stay under Projects (AI Web3 Study Track) so the high-signal contest work gets above-the-fold space without a second Competitions section.
- Competition links use both `https://github.com/Aafff623/vllm-cscc-leadcup` (mirror, currently private) and the GitLab submission `https://gitlab.eduxiji.net/T2026101109912321/vllm-cscc-leadcup3`. Profile copy states measurable facts even if a visitor cannot open private remotes.
