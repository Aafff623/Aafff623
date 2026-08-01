# LANGUAGE: Aafff623 Profile

## Profile sections

- **Intro**: Banner, wordmark, tagline, and the "who I am" table with the hero image.
- **Project quick links**: Deployed project URLs only (AgentCFO demo, Blog, Digital Garden), below the intro table.
- **Contact icons**: Icon links for GitHub, X, Bilibili, Telegram, and YouTube sit under Project quick links with **no section heading** and **no leading horizontal rule**; a rule still separates them from Agent workflow.
- **Tech stack**: Compact brand-color `flat-square` shields by category. No AI tools row. Mascot stays on the right.
- **Competitions**: Two cards only — Lead Cup (vLLM / Hygon / 先导杯) and AI4S 书生国智科探挑战赛. Layout is a 2×2 table: text row, then a shared image row so both thumbnails share one baseline. Do not reintroduce removed camps/contests in this section.
- **Classic project**: AgentCFO only. Other / coursework cards stay off the profile; Blog and Digital Garden remain in Project quick links.
- **What I'm learning**: Five practice topics only — AI-assisted E2E (MCP), light CLI × heavy IDE, Prompt→Context→Harness→Loop, custom Skills / Spec-driven Coding, indie App/mini-program + overseas payments. No Web3 / OS / systems-inference rows here, no contest registration status, and no mirror of Competitions cards.
- **Activity**: Third-party contribution activity line graph (`github-readme-activity-graph`) with light/dark `<picture>` URLs. Do not reintroduce the contribution-snake GIF heatmap here — GitHub's own calendar already covers that.

## Assets

- **mascot**: Animated GIF in the Tech stack section.
- **comp-syscap-banner / comp-ai4s-ketan**: Competitions event thumbnails (WebP, rounded alpha).
- **hero-knight**: Static intro hero (WebP with rounded alpha; GitHub strips CSS `border-radius`).
- **v9-banner**: Animated banner at the top of the profile.

## Workflow terms

- **AI-assisted development**: Using tools such as GPT, Claude Code, Kiro, and Codex during planning, implementation, and review while keeping final decisions with the author.
- **MCP**: Model Context Protocol, used to connect AI tools to external services and local resources.
- **Skills**: Reusable instruction modules for recurring development and documentation tasks.
- **ADRs**: Short records explaining decisions that future edits need to preserve.
- **Docs as code**: Keeping `CONTEXT.md`, `LANGUAGE.md`, and ADRs alongside the profile so edits do not depend on chat history. Shown as a badge instead of "Matt Pocock Skills," which is an internal workflow reference with no meaning to an outside reader.

## Locales

- **EN:** `README.md` + `preview-profile.html` — published GitHub profile is English.
- **ZH:** `README.zh.md` + `preview-profile.zh.html` — Simplified Chinese mirror for review.
- Keep section order, facts, links, and badge rows identical across locales on the **same branch**.

## Copy conventions

- Use first person for the profile and name the work directly.
- Prefer specific facts and links over identity labels, slogans, or claims such as "flagship" and "proof."
- Use sentence-case headings. Do **not** put emoji/kaomoji in section titles. Quota for restrained engineer-facing emoji+kaomoji: Intro **2**, Agent workflow **1**, What I'm learning **2**. Each combo must use a distinct emoji and a distinct kaomoji face (no repeats). Avoid cute/soft-moe faces. Prevent mid-combo line breaks with word joiner `&#8288;` after the emoji and/or by putting the combo on its own short paragraph (GitHub strips CSS `white-space`). Tagline: `⭐ Code Less, Architect More 🚀`.
- Do not call an image "evidence" unless its data matches the linked source.
- Avoid em dashes, marketing adjectives, and generic AI phrases.
- Chinese copy should stay factual and restrained like the English — not a looser marketing rewrite.
- Voice recipe for polish (external samples + module-level mix): `docs/voice/REPORTS.md` and the five category reports under `docs/voice/`.

## Badge conventions

- Tech stack badges use `style=flat-square` with brand fill colors (not pastel `for-the-badge`).
- Project technology badges use `style=plastic`.
