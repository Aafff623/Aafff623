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
| Hero | `./assets/hero-knight.gif` | Intro table right cell; animated seamless loop GIF generated from AI video (fallback: `hero-knight.webp`) |
| Mascot (light) | `./assets/mascot.gif` | Tech Stack right cell, light-theme 3D knight looping GIF |
| Mascot (dark) | `./assets/mascot-dark.gif` | Dark-theme mascot selected with `<picture>` (see ADR 0002) |
| AgentCFO banner | `./assets/agentcfo-banner.webp` | Classic project right cell; self-hosted copy of the upstream repo banner (WebP q90) |
| Badges | HTTPS shields.io / simpleicons.org URLs | Tech stack and social link icons |

## Copy & Badge Conventions

- **Copy style:** Use first person for the profile and name the work directly. Prefer specific facts and links over labels or claims such as "flagship" and "proof."
- **Headings:** Sentence-case headings with standardized thematic emoji prefixes (`⚡ Agent Workflow`, `🛠️ Tech Stack`, `🏆 Competitions`, `📊 GitHub Stats`, `🌟 Classic Projects`, `🚧 Currently Building`, `📚 What I'm Learning`, `📈 Activity`).
- **Emoji/Kaomoji quota:** Sparingly used. Intro section: at most 2 inline emoji; Agent workflow: at most 1. Section header emojis (⚡🔬🧭🔌🧪🚢 etc.) are allowed as prefix icons on card `<h4>` titles. Card body text in **What I'm Learning** is now emoji/kaomoji-free — the previous `🧭&#8288;(｀・ω・´)` and `🔬&#8288;(・∀・)` pair has been removed. Right-side badge capsules (plan-D aurora pill SVGs) remain unchanged. Tagline: `⭐ Code Less, Architect More 🚀`.
- **Badge styles:** Tech stack badges use `style=flat-square` with brand fill colors. Project technology badges use `style=plastic`.
- **Workflow terms:**
  - **AI-assisted development:** Using tools such as GPT, Claude Code, and Codex during planning and implementation while keeping final merge decisions with the author.
  - **MCP:** Model Context Protocol for connecting AI tools to external and local resources.
  - **ADRs:** Short durable records explaining architectural decisions.
  - **Docs as code:** Keeping context and decisions alongside the profile.

## Development & Bilingual Sync Flow

1. **EN published profile:** `README.md` is the published GitHub profile page.
2. **ZH mirror:** `README.zh.md` is the Simplified Chinese mirror for review. Keep structure, facts, links, and badge rows identical across locales on the **same branch**.
3. **Local previews (二元模式规范)**:
   - **成品展示模式 (Showcase Preview)**: `http://localhost:3000/` (`index.html`)。纯净无损展示 GitHub Profile 成品渲染效果，用于最终视觉验收与双语/主题切换对照。
   - **本地编辑/调试模式 (Editor & Annotation Mode)**: `http://localhost:3000/edit`（或直接打开 `temp/preview/preview-profile.html` / `preview-profile.zh.html`，启动脚本：`scripts/open-previews.bat` / `scripts/open-previews.ps1`）。集成现代化隐藏式浮动工具栏、内联文字实时编辑（Live Edit）、智能引用批注侧边栏（Element Annotation）、Prompt 导出与本地 localStorage 草稿持久化系统，用于本地日常调试、批注与内容迭代。
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
- **Typewriter Wordmark + Wave (ADR 0008, 2026-09):** `brand-threetwoa.gif` / `brand-threetwoa-dark.gif` upgraded to 56-frame seamless loop: characters type in → 👋 emoji swings 8-frame wrist-pivot (0°→16°→-8°→20°→-6°→16°→-4°→0°) → 2-second hold → backspace erase → repeat. Generated via `Pillow` + master-palette quantization; light 694 KB / dark 765 KB.
- **What I'm Learning Bento Layout (2026-09):** Section restructured from a flat bullet list to a 3×2 HTML `<table>` Bento grid. Each cell contains a right-aligned plan-D aurora-pill SVG badge (light + dark variants via `<picture>`), an `<h4>` card title with prefix emoji, prose description in genuine engineer voice, and a tech-tag `<code>` row. Body text is emoji/kaomoji-free.
- **Local Preview Dual-Mode (2026-09):** `index.html` + `server.js` implement a two-mode local preview server at `http://localhost:3000/`: Showcase mode (`/`) renders parsed Markdown via `/api/profile` (marked.js, no-cache); Editor & Annotation mode (`/edit`) adds a hidden floating toolbar with Live Edit, localStorage draft, element annotation sidebar, and Prompt export. Language (`en`/`zh`) and theme (`light`/`dark`/`auto`) are switchable at runtime.


## Pending Facts / 待确认事项

Follow `tta-init` asset-contracts: dynamic facts that are not finalized must be marked as `待确认` with the blocking question. Do not hallucinate or promote speculative claims.

- **AI4S 书生国智科探挑战赛最终成绩与证书:** `待确认` [官方榜单解冻与正式奖项评定何时发布？当前严格保持 live board v9 事实，不提前宣称最终名次或证书等级]
- **DSH 插件贡献与独立插件项目:** `待确认` [官方社区 PR 何时合并？自研独立插件何时完成首次发布？当前仅作为正在构建探索阶段记录，不上独立徽章]
- **分布式延时投递服务实战成果:** `待确认` [压测基准与吞吐 SLA 数据何时冻结？未产出独立可验证 repo 前不上徽章墙]
- **2026-08/09 极客时间三门实战营相关技术栈徽章:** `待确认` [何时在自研/竞赛项目中产生真实代码落地？按 ADR 0006 严格执行实证原则，无真实 repo 支撑前徽章保持下架]

