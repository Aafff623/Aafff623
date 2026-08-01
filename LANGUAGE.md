# LANGUAGE: Aafff623 Profile

## Profile sections

- **Intro**: Banner, wordmark, tagline, and the "who I am" table with the hero image.
- **Project quick links**: Deployed project URLs only (AgentCFO demo, Blog, Digital Garden), below the intro table.
- **Contact**: Icon links for GitHub, X, Bilibili, Telegram, and YouTube — placed above Agent workflow.
- **Tech stack**: Compact brand-color `flat-square` shields by category. No AI tools row. Mascot stays on the right.
- **Competitions**: Four cards — Lead Cup (vLLM / Hygon); AI4S 书生国智科探挑战赛 (模型与算子); HarmonyOS C4 (操作系统智能创新, tentative); Monad Builder Camp (in progress). No workflows / full-stack cards here.
- **Classic project**: AgentCFO only. Other / coursework cards stay off the profile; Blog and Digital Garden remain in Project quick links.
- **What I'm learning**: Topic list only — Java/Python business systems, Agent Engineering, systems & inference, scientific computing, OS & devices, Web3. No contest registration status.
- **Activity**: Animated contribution heatmap — a snake eats the contribution cells, shipped as light/dark GIFs switched with `<picture>` (see ADR 0004).

## Assets

- **mascot**: Animated GIF in the Tech stack section.
- **contribution-snake**: Animated contribution heatmap GIF in the Activity section (light + dark).
- **hero-knight**: Static image in the introduction table.
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
- Use sentence-case headings. Light section-title emoji is allowed when the profile needs visual pacing; keep body copy emoji-sparse.
- Do not call an image "evidence" unless its data matches the linked source.
- Avoid em dashes, marketing adjectives, and generic AI phrases.
- Chinese copy should stay factual and restrained like the English — not a looser marketing rewrite.

## Badge conventions

- Tech stack badges use `style=flat-square` with brand fill colors (not pastel `for-the-badge`).
- Project technology badges use `style=plastic`.
