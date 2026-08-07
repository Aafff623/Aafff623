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
| Hero | `./assets/hero-knight.webp` | Intro table right cell; sharp-corner WebP 800×1000 q90 (see ADR 0003) |
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
- The hero is served as WebP (`hero-knight.webp`, 800×1000, quality 90), replacing the earlier ~981 KB PNG. See `docs/adr/0003-hero-webp.md`. 2026-08: rounded corners / card ring were tried then reverted — keep sharp corners.
- Project quick links sit below the intro table and point at deployed URLs only (AgentCFO demo, Blog, Digital Garden), not GitHub repos or contest sites.
- The Digital Garden link appears in the intro Quick links only (not in the Contact icon row); it is not treated as a top-tier destination like AgentCFO.
- Tech stack badges use shields.io `flat-square` with brand fill colors. No AI tools row (tools stay in intro copy). Trim concept badges (Smart Accounts, Session Keys, Skills) and universal noise (Git, GitHub). Keep RAG / MCP / Harness Agent / Loop Agent in AI row. Drop Element Plus / Framer / GSAP / Vite / Ant Design / Pinia; Express; etcd / ZooKeeper; SQLite / PGVector / ShardingSphere; Prometheus / Vercel; Kafka (RabbitMQ only); Monad badge. WeChat Pay / Alipay stay out of badge rows.
- 2026-08: course-aligned Java badges (UniApp, Gateway, OpenFeign, Sentinel, Seata, MinIO, Harbor, SkyWalking, Grafana) kept; Python/backend expanded to FastAPI + Pydantic + SQLAlchemy + httpx + Celery + pytest + asyncio.
- The four `highlight-*.png` illustrations were removed from both "What I've been working on" and `assets/`. They restated what the adjacent text already said and added scroll length without new information. The two cards that leaned on their image for detail (my-blogs, study track) got a sentence of extra specifics instead, pulled from facts already stated elsewhere in the README (my-blogs' tech badges, the study track's project list).
- **Competitions (current):** exactly two cards — Lead Cup + AI4S. HarmonyOS C4 and Monad Builder Camp are removed from the published grid (do not re-add without an explicit request). Learning lists topics only; no contest registration status there. No teammate PII in the README.
- Lead Cup lives only under Competitions (not a separate “working on” card). Copy covers 先导杯 / 智能计算创新设计赛题 1, SCNet DCU evidence, long-context concurrency=1 load, and best run 87.7839/100 · #26/132 (leaderboard best run, not a final award). Links: GitLab `vllm-cscc-leadcup3` + GitHub mirror `vllm-cscc-leadcup` (mirror may be private). Detail source of truth for internals: local `xiandaobei` repo — keep the profile card factual and short.
- Competition thumbnails: `comp-syscap-banner.webp` / `comp-ai4s-ketan.webp` — shared second table row, letterboxed `960×360`, rounded corners in WebP alpha.
- AI4S card status (2026-08): live board public NS64 rel-L2 0.035115 (dualview_r2 · report v9) · Spectral idle 3.811/8.054/29.560 ms @64/128/256 · worst rel ≈2.17e-7 · vs v8 +0.53% · ranking pending. Source: `fandou-ai4s`. Do not paste certificate recipient names into the README.
- **Classic project** shows AgentCFO alone. Digital Garden / study track / coursework are not listed as project cards; live sites stay in Project quick links.
- **Activity (2026-08):** restored `github-readme-activity-graph` line chart (light/dark `<picture>`). The contribution-snake GIF heatmap was removed as redundant with GitHub's native contribution calendar. ADR 0004 is superseded.
- **Voice recipe (2026-08):** profile copy follows `docs/voice/REPORTS.md` — minimal craftsman shell, systems metrics on Lead Cup, product clarity on AI4S / AgentCFO. No indie-MRR narrative; no “build almost anything” slogan.
- **Intro / Learning (2026-08):** tagline is `⭐ Code Less, Architect More 🚀`. Identity is incoming third-year (准大三). Practice bullets: full-chain / open source / evals (tools live under Agent workflow: Cursor / Claude Code / Codex + OpenCode Go). Evals: DeepSeek / GLM + OpenAI / Anthropic / xAI (not Gemini). Emoji+kaomoji never in H2; use `&#8288;` / short paragraph to avoid wrap splits. Contact icons have no heading and no HR above them.
- **2026-08 (course-driven additions):** author is taking three GeekTime bootcamps (企业级 AI 编程实战营 / AI Agent 全栈工程师训练营 / Agentic AI 产品训练营). Nine badges added — AI row: LangGraph, OpenAI Agents SDK, Dify, LiteLLM, Ragas, DeepEval; Distributed: gRPC, etcd (re-added, superseding the earlier "etcd / ZooKeeper" drop); Data: Milvus, FAISS; Systems/inference: TGI; DevOps: Prometheus (re-added, superseding the earlier "Prometheus / Vercel" drop); Java row: Rust. Round 2: Spring Security (Java), XXL-Job + Canal + Redisson (Data/middleware), CrewAI + Agentic UI (AI). What I'm learning gains 4 course bullets (Enterprise AI Coding, Agent engineering, Multi-Agent/Eval/ops, Agentic AI product) + NB Microservices Full-Stack (小坏说Java) → 10 bullets total. Intro rewritten to Spec-driven Coding under Harness Engineering; Agent workflow rewritten as a tool fleet (Grok/GPT/Claude Code on DeepSeek v4 Flash + MiniMax/Kimi Code/OpenCode/Pi/Cursor auto).
