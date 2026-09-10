# ADR 0010: Restore Historical Tech Stack Coverage

## Status

Accepted (2026-09-10). Supersedes the narrow display scope in ADR 0006.

## Context

The profile had been reduced from the richer historical Tech Stack wall to 32
badges. That made the current page cleaner, but it also hid technologies that
had appeared in earlier profile revisions and represented the broader learning
and project history the author wanted to show. The separate
`Harness Engineering & TTA Toolchain` highlight repeated the AI-tooling story
and made the introduction heavier than necessary.

## Decision

- Restore the historical badge coverage in the Tech Stack table, including the
  previously recorded frontend, Node.js, Java/Spring, distributed systems,
  middleware/data, AI/agent, Python, inference, Web3, and DevOps entries.
- Keep English and Chinese tables structurally identical; only headings and
  localized alt text may differ.
- Treat the restored wall as a portfolio/history inventory, not a claim that
  every listed tool is a current production dependency or equal-depth skill.
- Remove the standalone `Harness Engineering & TTA Toolchain` / `工程 Harness &
  TTA 工具链` introduction item. AI coding tools remain grouped under
  `AI / agents`.

## Consequences

The Tech Stack section is intentionally denser and taller than the compact
32-badge version. Future additions should be backed by either a prior profile
record, a repository/competition artifact, or an explicit current learning
item; new claims about production use still require separate evidence. ADR 0006
remains useful as the historical record of why the compact version existed,
but its “32 badges only” display constraint no longer governs this profile.
