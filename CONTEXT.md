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

## Asset Conventions

| Asset | File | Usage |
|---|---|---|
| Banner | `./assets/v9-banner.gif` | Top-center animated banner (pixelized mascot, bright palette) |
| Hero | `./assets/hero-knight.png` | Intro table right cell |
| Mascot | `./assets/mascot.gif` | Tech Stack table right cell, white-background looping GIF |
| Badges | HTTPS shields.io / simpleicons.org URLs | Tech stack and social link icons |

## Development Flow

1. Edit `README.md`.
2. Verify visually via `preview-profile.html` (open directly or serve locally).
3. For risky HTML/table changes, verify with `gh api markdown` before pushing.
4. Commit atomic changes with Conventional Commits.

## Active Decisions

- Mascot uses a white-background looping GIF instead of a transparent PNG. See `docs/adr/0001-mascot-white-background-gif.md`.
- Quick links (AgentCFO, my-blogs, AI Web3 Study Track, Blog, Digital Garden) sit below the intro table, not above the tagline, so first-time visitors read the tagline and intro before hitting a link row.
- The Digital Garden link appears in both Quick links and the Contact icon row for consistency; it is not treated as a top-tier destination like AgentCFO.
- Tech stack badge reads "Docs as Code," not "Matt Pocock Skills." The latter names an internal workflow reference the profile's audience (recruiters, teammates) has no context for.
- The four `highlight-*.png` illustrations were removed from "What I've been working on." They restated what the adjacent text already said and added scroll length without new information. The two cards that leaned on their image for detail (my-blogs, study track) got a sentence of extra specifics instead, pulled from facts already stated elsewhere in the README (my-blogs' tech badges, the study track's project list).
