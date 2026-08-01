# CONTEXT: Aafff623 GitHub Profile

## Purpose

Public GitHub profile repository for `Aafff623`. `README.md` at the repository root is rendered as the public profile page. All other files are static assets or local tooling that support the README.

## Audience

- Recruiters and hiring managers
- Hackathon teammates and potential collaborators
- Visitors interested in AI-assisted development, Web3, and software projects

## Identity and voice

- **Profile:** Second-year Software Engineering student at North University of China, working toward a Java/Python + Agent Engineering internship.
- **Tagline:** "Software Engineering student · Java & Python · Agent Engineering" (rendered under the wordmark).
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
| Hero | `./assets/hero-knight.webp` | Intro table right cell; 800×1000 WebP q90 (see ADR 0003) |
| Mascot (light) | `./assets/mascot.gif` | Tech Stack right cell, light-theme 3D knight looping GIF |
| Mascot (dark) | `./assets/mascot-dark.gif` | Dark-theme mascot selected with `<picture>` (see ADR 0002) |
| Badges | HTTPS shields.io / simpleicons.org URLs | Tech stack and social link icons |

## Development Flow

1. Edit `README.md` (English; published GitHub profile).
2. Mirror the same structure and facts in `README.zh.md` (Chinese; local review only — GitHub does not render it as the profile).
3. Keep `preview-profile.html` and `preview-profile.zh.html` in sync with their README counterparts (they are **saved GitHub renders**, so regenerate them from GitHub rather than hand-editing badge markup; see `CLAUDE.md`). Open both via `open-previews.bat` / `open-previews.ps1`.
4. For risky HTML/table changes, verify with `gh api markdown` before pushing.
5. Commit atomic changes with Conventional Commits.

## Bilingual sync

- **Same branch, same content:** ZH must match this branch’s EN (sections, facts, links, badge rows, assets). Do not sync ZH against another branch.
- **Pairs:** `README.md` ↔ `README.zh.md`; `preview-profile.html` ↔ `preview-profile.zh.html`.
- **Published surface:** only `README.md` is the GitHub profile. Chinese files are for review and repo-side documentation.

## Active Decisions

- **Note:** Entries are chronological. Where an older entry names a section that has since been renamed or removed (e.g., "What I've been working on", "Projects", "Other projects"), the current structure is the section list in `LANGUAGE.md` and `CLAUDE.md`: Contact, Agent workflow, Tech stack, Competitions, GitHub stats, Classic project, What I'm learning, Activity.
- Mascot is a 3D chibi knight shipped as light (`mascot.gif`) and dark (`mascot-dark.gif`) GIFs, switched with `<picture>`. See `docs/adr/0002-3d-chibi-knight-light-dark-gif.md` (supersedes ADR 0001).
- The hero is served as WebP (`hero-knight.webp`, 800×1000, quality 90, ~90 KB), replacing the earlier ~981 KB PNG. See `docs/adr/0003-hero-webp.md`.
- Project quick links sit below the intro table and point at deployed URLs only (AgentCFO demo, Blog, Digital Garden), not GitHub repos or contest sites.
- The Digital Garden link appears in the intro Quick links only (not in the Contact icon row); it is not treated as a top-tier destination like AgentCFO.
- Tech stack badges use shields.io `flat-square` with brand fill colors. No AI tools row (tools stay in intro copy). Trim concept badges (Smart Accounts, Session Keys, Skills) and universal noise (Git, GitHub). Keep only familiar items marked in the 2026-07 trim (drop Element Plus / Framer / GSAP / Vite / Ant Design / Pinia; Express; remaining Spring Cloud subcomponents beyond the 2026-08 course re-add; etcd / ZooKeeper; SQLite / PGVector / ShardingSphere; Pydantic / SQLAlchemy / httpx; Prometheus / Vercel). WeChat Pay / Alipay stay out of badge rows.
- 2026-08: re-added course-aligned enterprise badges from NB 微服务全栈（小坏说 Java / ai.e404e.cn/course）— UniApp, Gateway, OpenFeign, Sentinel, Seata, Kafka, MinIO, Harbor, SkyWalking, Grafana — still excluding payment badges and UI-lib noise (Element Plus / Axios / Vite).
- The four `highlight-*.png` illustrations were removed from both "What I've been working on" and `assets/`. They restated what the adjacent text already said and added scroll length without new information. The two cards that leaned on their image for detail (my-blogs, study track) got a sentence of extra specifics instead, pulled from facts already stated elsewhere in the README (my-blogs' tech badges, the study track's project list).
- Lead Cup 2026 (vLLM on Hygon DCU / gfx936) sits in "What I've been working on" as the fourth card, replacing "Study notes and course work". Study notes stay under Projects (AI Web3 Study Track) so the high-signal contest work gets above-the-fold space without a second Competitions section.
- Competition links use both `https://github.com/Aafff623/vllm-cscc-leadcup` (mirror, currently private) and the GitLab submission `https://gitlab.eduxiji.net/T2026101109912321/vllm-cscc-leadcup3`. Profile copy states measurable facts even if a visitor cannot open private remotes. Lead Cup card uses **Result** for the best-run line: 87.7839/100 · #26 / 132 (best run on the leaderboard, not a final award placement).
- Summer 2026: section renamed to **Competitions** (Lead Cup, AI4S 科探, tentative HarmonyOS C4, Monad Builder Camp Week 2). AI-assisted workflows and full-stack cards removed from that grid to avoid overlapping "What I'm learning". Learning lists topics only. No teammate PII in the published README.
- **Classic project** shows AgentCFO alone. Digital Garden / study track / coursework are not listed as project cards; live sites stay in Project quick links.
- The **Activity** section now shows a self-hosted animated contribution heatmap (snake eats the cells) as light/dark GIFs, replacing the third-party activity-graph chart. It is a snapshot: re-run `.scratch/contribution-heatmap/gen_heatmap_gif.py` to refresh. See `docs/adr/0004-contribution-heatmap-gif.md`.
