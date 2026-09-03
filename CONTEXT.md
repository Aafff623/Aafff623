# CONTEXT: Aafff623 GitHub Profile

## Purpose

Public GitHub profile repository for `Aafff623`. `README.md` at the repository root is rendered as the public profile page. All other files are static assets or local tooling that support the README.

## Audience

- Recruiters and hiring managers
- Hackathon teammates and potential collaborators
- Visitors interested in AI-assisted development, Web3, and software projects

## Identity and Voice

- **Profile:** Incoming third-year Software Engineering student at North University of China, working toward a Java/Python + Agent Engineering internship.
- **Tagline:** `⭐ Code Less, Architect More 🚀` (rendered under the wordmark).
- **Tone:** Direct, specific, and modest. Use first person and keep emoji sparse.
- **Evidence:** Prefer concrete details, repository links, and transaction records over self-assigned labels.
- **Voice recipe:** Minimal craftsman shell, systems metrics on Lead Cup, product clarity on AI4S / AgentCFO.

## Constraints

- No build system, package manager, test suite, or linter. Only static Markdown, HTML, SVG, PNG, and GIF.
- `README.md` must use relative paths for local assets (e.g., `./assets/...`) so they resolve on GitHub.
- GitHub's cmark-gfm treats blank lines inside raw HTML blocks as block terminators. Keep `<table>` blocks compact.
- Profile is light-mode-first; assets should look correct on a white background.
- `assets/` contains only files used by the published profile. `temp/` is the ignored, disposable local workspace for generated frames, compression candidates, and scratch reports; tracked files must not depend on anything inside it.

## Profile Sections & Structure

- **Intro**: Banner, wordmark, tagline, and the "who I am" table with the sharp-corner hero image.
- **Contact icons**: Icon links for GitHub, X, Bilibili, Telegram, and YouTube sit under Project quick links with no section heading and no leading horizontal rule.
- **Agent workflow**: Tool fleet and harness responsibility (no heading emoji).
- **Tech stack**: Compact brand-color `flat-square` shields by category (repo-evidence only). Mascot stays on the right.
- **Competitions**: Exactly two cards (Lead Cup and AI4S) in a 2×2 table with a shared thumbnail row.
- **GitHub stats**: Community-hosted official-algorithm cards (`github-readme-stats.shion.dev`).
- **Classic project**: AgentCFO only (with self-hosted banner).
- **Currently building**: High-level in-progress projects (DSH plugin ecosystem, Distributed delay-delivery, Dify customization, Grokbot).
- **What I'm learning**: Topics in practice (Microservices, AI E2E, Harness, Skills, Courses).
- **Activity**: In-repo Platane/snk contribution snake SVGs generated via GitHub Actions to `output` branch.

## Asset Conventions

| Asset | File | Usage |
| --- | --- | --- |
| Banner | `./assets/v9-banner.gif` | Top-center animated banner (pixelized mascot, bright palette) |
| Wordmark (light) | `./assets/brand-threetwoa.gif` | Default typewriter wordmark (SVG source: `brand-threetwoa.svg`) |
| Wordmark (dark) | `./assets/brand-threetwoa-dark.gif` | Dark-theme typewriter wordmark selected with `<picture>` (SVG source: `brand-threetwoa-dark.svg`) |
| Hero | `./assets/hero-knight.webp` | Intro table right cell; sharp-corner WebP 800×1000 q90 (see ADR 0003) |
| Mascot (light) | `./assets/mascot.gif` | Tech Stack right cell, light-theme 3D knight looping GIF |
| Mascot (dark) | `./assets/mascot-dark.gif` | Dark-theme mascot selected with `<picture>` (see ADR 0002) |
| AgentCFO banner | `./assets/agentcfo-banner.webp` | Classic project right cell; self-hosted copy of the upstream repo banner (WebP q90) |
| Badges | HTTPS shields.io / simpleicons.org URLs | Tech stack and social link icons |

## Copy & Badge Conventions

- **Copy style:** Use first person for the profile and name the work directly. Prefer specific facts and links over labels or claims such as "flagship" and "proof."
- **Headings:** Sentence-case headings. Do **not** put emoji/kaomoji in section titles.
- **Emoji/Kaomoji quota:** Restrained engineer-facing emoji+kaomoji: Intro **2**, Agent workflow **1**, What I'm learning **2**. Each combo must use a distinct emoji and kaomoji face. Prevent line breaks with word joiner `&#8288;` after emoji. Tagline: `⭐ Code Less, Architect More 🚀`.
- **Badge styles:** Tech stack badges use `style=flat-square` with brand fill colors. Project technology badges use `style=plastic`.
- **Workflow terms:**
  - **AI-assisted development:** Using tools such as GPT, Claude Code, and Codex during planning and implementation while keeping final merge decisions with the author.
  - **MCP:** Model Context Protocol for connecting AI tools to external and local resources.
  - **ADRs:** Short durable records explaining architectural decisions.
  - **Docs as code:** Keeping context and decisions alongside the profile.

## Development & Bilingual Sync Flow

1. **EN published profile:** `README.md` is the published GitHub profile page.
2. **ZH mirror:** `README.zh.md` is the Simplified Chinese mirror for review. Keep structure, facts, links, and badge rows identical across locales on the **same branch**.
3. **Local previews:** `temp/preview/preview-profile.html` (EN) and `temp/preview/preview-profile.zh.html` (ZH) are saved GitHub renders. Open both via `scripts/open-previews.bat` / `scripts/open-previews.ps1`.
4. For risky HTML/table changes, verify with `gh api markdown` before pushing.
5. Commit atomic changes with Conventional Commits.

## Active Decisions

- **Mascot (ADR 0002):** 3D chibi knight shipped as light (`mascot.gif`) and dark (`mascot-dark.gif`) GIFs, switched with `<picture>` (supersedes ADR 0001).
- **Hero (ADR 0003):** Served as WebP (`hero-knight.webp`, 800×1000, quality 90, sharp corners), replacing the earlier ~981 KB PNG.
- **Wordmark Typewriter (ADR 0005):** Published as `brand-threetwoa.gif` / `brand-threetwoa-dark.gif` (caret + left-to-right type then hold). Editable SVG sources kept in `assets/`.
- **Tech Stack Badges (ADR 0006):** Badges are **repo-evidence only** — 7 groups / 32 badges, each backed by a repository or competition artifact. No course-only or ungrounded badges.
- **Activity Visual (ADR 0007):** In-repo Platane/snk contribution snake SVGs generated by `.github/workflows/snake.yml` to the `output` branch (supersedes ADR 0004 and defunct external activity-graph).
- **Self-Hosted Assets:** `agentcfo-banner.webp` is self-hosted to survive upstream teammate repo changes. Stats cards use `github-readme-stats.shion.dev` as a light community endpoint exception.
- **Workflow Evolution (2026-09):** Core dev migrated from Claude Code (V4-Flash + MiniMax) to ZCode (GLM Lite / GLM 5.3 Flash), lightweight routines moved from OpenCode/Pi to Antigravity (Gemini 3.8 Flash). Cross-tool sync managed via custom `harness-sync` skill.

## Pending Facts / 待确认事项

Follow `tta-init` asset-contracts: dynamic facts that are not finalized must be marked as `待确认` with the blocking question. Do not hallucinate or promote speculative claims.

- **AI4S 书生国智科探挑战赛最终成绩与证书:** `待确认` [官方榜单解冻与正式奖项评定何时发布？当前严格保持 live board v9 事实，不提前宣称最终名次或证书等级]
- **DSH 插件贡献与独立插件项目:** `待确认` [官方社区 PR 何时合并？自研独立插件何时完成首次发布？当前仅作为正在构建探索阶段记录，不上独立徽章]
- **分布式延时投递服务实战成果:** `待确认` [压测基准与吞吐 SLA 数据何时冻结？未产出独立可验证 repo 前不上徽章墙]
- **2026-08/09 极客时间三门实战营相关技术栈徽章:** `待确认` [何时在自研/竞赛项目中产生真实代码落地？按 ADR 0006 严格执行实证原则，无真实 repo 支撑前徽章保持下架]

