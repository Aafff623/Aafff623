<p align="center">
  <img src="./assets/v9-banner.gif" alt="threetwoa banner" />
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/brand-threetwoa-dark.svg" />
    <img src="./assets/brand-threetwoa.svg" alt="threetwoa" width="680" />
  </picture>
</p>

<p align="center"><i>Software engineering student learning by building, testing, and writing things down.</i></p>

<table width="100%">
  <tr>
    <td width="60%" valign="top">
      <p>I'm a second-year Software Engineering student at North University of China. Recent work spans AI-assisted development, full-stack web apps, Web3 prototypes, and inference serving on domestic accelerators.</p>
      <p>I use GPT, Claude Code, Kiro, and Codex at different points in a project. They help me explore an idea, implement it, review the result, and keep the documentation in sync. I decide what to keep and what to change.</p>
      <p>This profile is a record of what I have built and studied so far, including product demos and system-level contest work. Some items are finished; some are still experiments. I keep both because they show what I was learning at the time.</p>
      <ul>
        <li><b>Studying:</b> Software Engineering, second year, North University of China</li>
        <li><b>Working on:</b> AI coding workflows, full-stack apps, Web3 prototypes, and vLLM optimization on Hygon DCU</li>
        <li><b>How I use AI tools:</b> GPT for early exploration, Claude Code and Kiro for implementation, and Codex for a second review</li>
      </ul>
    </td>
    <td width="40%" align="center" valign="middle">
      <img src="./assets/hero-knight.png" width="92%" alt="threetwoa hero" />
    </td>
  </tr>
</table>

<p align="center">
  <b>🔗 Quick links:</b>
  <a href="https://github.com/San-Y108/agent-cfo">AgentCFO</a> ·
  <a href="https://github.com/Aafff623/vllm-cscc-leadcup">Lead Cup / vLLM</a> ·
  <a href="https://github.com/Aafff623/my-blogs">my-blogs</a> ·
  <a href="https://github.com/Aafff623/web3career-study-track">AI Web3 Study Track</a> ·
  <a href="https://my-blogs-roan-seven.vercel.app/">Blog</a> ·
  <a href="https://threetwoa-digital-garden.vercel.app/">Digital Garden</a>
</p>

---

## 🛠️ What I've been working on

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>🤖 AI-assisted workflows</h3>
      <p>I maintain six reusable Skills, including <code>cascade-maintain</code>, <code>daily-log-sync</code>, <code>pre-study-note</code>, and <code>wcb-sync</code>. I use them across Claude Code, Kiro, and Codex for recurring work such as documentation maintenance, log syncing, and study notes.</p>
      <p><i>This repository also uses <code>CONTEXT.md</code>, <code>LANGUAGE.md</code>, and ADRs so later edits do not depend on chat history alone.</i></p>
    </td>
    <td width="50%" valign="top">
      <h3>🌐 AgentCFO and Web3</h3>
      <p>I was the frontend lead for AgentCFO, where I worked on the landing page and console demo. I also tested the Cobo Agentic Wallet payment flow. Two testnet transactions from that work are linked below:</p>
      <ul>
        <li><b>External payment:</b> SETH · <code>0.001</code> → <code>0xAf3f...594B</code> · <a href="https://sepolia.etherscan.io/tx/0x85a5a2e934ca0e34c7fb3e038ca06e54e15bd29b56b64e5b01ff80eb20ed4d98">transaction</a></li>
        <li><b>Internal transfer:</b> Sepolia · <code>0.001</code> → <code>0xaa55...c199</code> · <a href="https://sepolia.etherscan.io/tx/0x6bd793bc3030c995245b2e73a466898e46278be092aa9f7a3c86cad21cbbae8a">transaction</a></li>
      </ul>
      <p><i>The hackathon submission required transaction hashes, so I kept the records here.</i></p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🧱 Full-stack projects</h3>
      <p>I work on both frontend and backend code, depending on the project. <a href="https://github.com/Aafff623/my-blogs"><b>my-blogs</b></a> uses Next.js 16, GitHub for content storage, and Vercel for deployment, with Zustand for state and SWR for data fetching. Posts render through Shiki for syntax highlighting, and I can write and publish one from the browser without running a separate CMS.</p>
    </td>
    <td width="50%" valign="top">
      <h3>⚡ Lead Cup · vLLM on Hygon DCU</h3>
      <p>For the 2026 National Collegiate Computer System Capability Competition (Lead Cup, Problem 1), team 翻斗花园 optimized vLLM 0.18.1 serving of Qwen3.5-27B on a fixed Hygon DCU (gfx936). My part was kernel-level fusion and decode/prefill routing, not config-only tuning.</p>
      <ul>
        <li><b>Best score:</b> 87.7839 / 100 · SLA 0 · precision 0</li>
        <li><b>Work:</b> fused shared-gate, gate-up ⊕ SwiGLU HIP kernel, GDN packed launch, Gather-FA routing, LPK prefetch</li>
        <li><b>Measured:</b> TTFT P99 down 61% to 87%, TPOT P99 down about 35%, throughput up 7% to 24% vs official baseline smoke tests</li>
      </ul>
      <p><a href="https://github.com/Aafff623/vllm-cscc-leadcup">GitHub</a> · <a href="https://gitlab.eduxiji.net/T2026101109912321/vllm-cscc-leadcup3">GitLab submission</a></p>
    </td>
  </tr>
</table>

---

## Tech stack

<table width="100%">
  <tr>
    <td width="78%" valign="top">
      <p><b>Frontend</b><br />
      <img src="https://img.shields.io/badge/React-F4F5F7?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
      <img src="https://img.shields.io/badge/Vue-F4F5F7?style=for-the-badge&logo=vuedotjs&logoColor=42B883" alt="Vue" />
      <img src="https://img.shields.io/badge/TypeScript-F4F5F7?style=for-the-badge&logo=typescript&logoColor=3178C6" alt="TypeScript" />
      <img src="https://img.shields.io/badge/Tailwind-F4F5F7?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4" alt="Tailwind CSS" />
      <img src="https://img.shields.io/badge/Framer%20Motion-F4F5F7?style=for-the-badge&logo=framer&logoColor=0055FF" alt="Framer Motion" />
      <img src="https://img.shields.io/badge/GSAP-F4F5F7?style=for-the-badge&logo=greensock&logoColor=88CE02" alt="GSAP" />
      <img src="https://img.shields.io/badge/Vite-F4F5F7?style=for-the-badge&logo=vite&logoColor=646CFF" alt="Vite" /></p>
      <p><b>Systems / inference</b><br />
      <img src="https://img.shields.io/badge/vLLM-EEF2FF?style=for-the-badge" alt="vLLM" />
      <img src="https://img.shields.io/badge/HIP%20%2F%20ROCm-FEF2F2?style=for-the-badge" alt="HIP / ROCm" />
      <img src="https://img.shields.io/badge/Triton-F0FDF4?style=for-the-badge" alt="Triton" />
      <img src="https://img.shields.io/badge/Hygon%20DCU-F5F3FF?style=for-the-badge" alt="Hygon DCU" />
      <img src="https://img.shields.io/badge/Qwen3.5-ECFDF5?style=for-the-badge" alt="Qwen3.5" /></p>
      <p><b>Web3</b><br />
      <img src="https://img.shields.io/badge/Ethers.js-F4F5F7?style=for-the-badge&logo=ethereum&logoColor=627EEA" alt="Ethers.js" />
      <img src="https://img.shields.io/badge/Viem-F4F5F7?style=for-the-badge&logo=ethereum&logoColor=FF6B35" alt="Viem" />
      <img src="https://img.shields.io/badge/Wagmi-F4F5F7?style=for-the-badge&logo=ethereum&logoColor=1A1B1F" alt="Wagmi" />
      <img src="https://img.shields.io/badge/Smart%20Accounts-EFF6FF?style=for-the-badge" alt="Smart Accounts" />
      <img src="https://img.shields.io/badge/Session%20Keys-FFFBEB?style=for-the-badge" alt="Session Keys" /></p>
      <p><b>Backend and database</b><br />
      <img src="https://img.shields.io/badge/Java-F4F5F7?style=for-the-badge&logo=openjdk&logoColor=ED8B00" alt="Java" />
      <img src="https://img.shields.io/badge/Spring%20Boot-F4F5F7?style=for-the-badge&logo=springboot&logoColor=6DB33F" alt="Spring Boot" />
      <img src="https://img.shields.io/badge/Python-F4F5F7?style=for-the-badge&logo=python&logoColor=3776AB" alt="Python" />
      <img src="https://img.shields.io/badge/FastAPI-F4F5F7?style=for-the-badge&logo=fastapi&logoColor=009688" alt="FastAPI" />
      <img src="https://img.shields.io/badge/Supabase-F4F5F7?style=for-the-badge&logo=supabase&logoColor=3ECF8E" alt="Supabase" />
      <img src="https://img.shields.io/badge/PostgreSQL-F4F5F7?style=for-the-badge&logo=postgresql&logoColor=4169E1" alt="PostgreSQL" />
      <img src="https://img.shields.io/badge/MySQL-F4F5F7?style=for-the-badge&logo=mysql&logoColor=4479A1" alt="MySQL" />
      <img src="https://img.shields.io/badge/Redis-F4F5F7?style=for-the-badge&logo=redis&logoColor=DC382D" alt="Redis" /></p>
      <p><b>AI tools</b><br />
      <img src="https://img.shields.io/badge/Claude%20Code-F4F5F7?style=for-the-badge&logo=claude&logoColor=D4A27F" alt="Claude Code" />
      <img src="https://img.shields.io/badge/Cursor-F4F5F7?style=for-the-badge&logo=cursor&logoColor=1F2328" alt="Cursor" />
      <img src="https://img.shields.io/badge/Codex-F4F5F7?style=for-the-badge&logo=openai&logoColor=412991" alt="Codex" />
      <img src="https://img.shields.io/badge/MCP-EFF6FF?style=for-the-badge" alt="MCP" />
      <img src="https://img.shields.io/badge/Skills-FFFBEB?style=for-the-badge" alt="Skills" />
      <img src="https://img.shields.io/badge/Docs%20as%20Code-F4F5F7?style=for-the-badge" alt="Docs as Code" /></p>
      <p><b>DevOps and tools</b><br />
      <img src="https://img.shields.io/badge/Docker-F4F5F7?style=for-the-badge&logo=docker&logoColor=2496ED" alt="Docker" />
      <img src="https://img.shields.io/badge/Nginx-F4F5F7?style=for-the-badge&logo=nginx&logoColor=009639" alt="Nginx" />
      <img src="https://img.shields.io/badge/Linux-F4F5F7?style=for-the-badge&logo=linux&logoColor=FCC624" alt="Linux" />
      <img src="https://img.shields.io/badge/Git-F4F5F7?style=for-the-badge&logo=git&logoColor=F05032" alt="Git" />
      <img src="https://img.shields.io/badge/GitHub-F4F5F7?style=for-the-badge&logo=github&logoColor=181717" alt="GitHub" /></p>
    </td>
    <td width="22%" align="center" valign="middle">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./assets/mascot-dark.gif" />
        <img src="./assets/mascot.gif" width="90%" alt="animated threetwoa mascot" />
      </picture>
    </td>
  </tr>
</table>

---

## 📊 GitHub stats

<table width="100%">
  <tr>
    <td width="60%" align="center" valign="top">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats-sigma-five.vercel.app/api?username=Aafff623&show_icons=true&bg_color=0d1117&title_color=58a6ff&text_color=e6edf3&icon_color=d29922&hide=prs,issues&count_private=true&hide_border=false&border_color=30363d&card_width=500" />
        <img src="https://github-readme-stats-sigma-five.vercel.app/api?username=Aafff623&show_icons=true&bg_color=ffffff&title_color=0969da&text_color=1f2328&icon_color=f59e0b&hide=prs,issues&count_private=true&hide_border=false&border_color=d1d9e0&card_width=500" alt="GitHub stats" />
      </picture>
    </td>
    <td width="40%" align="center" valign="top">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=Aafff623&layout=compact&bg_color=0d1117&title_color=58a6ff&text_color=e6edf3&icon_color=d29922&hide_border=false&border_color=30363d&card_width=320" />
        <img src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=Aafff623&layout=compact&bg_color=ffffff&title_color=0969da&text_color=1f2328&icon_color=f59e0b&hide_border=false&border_color=d1d9e0&card_width=320" alt="Top languages" />
      </picture>
    </td>
  </tr>
</table>

---

## 📦 Projects

### 💼 AgentCFO

<table width="100%">
  <tr>
    <td width="65%" valign="top">
      <h3><a href="https://github.com/San-Y108/agent-cfo">AgentCFO: DAO treasury assistant</a></h3>
      <p><i>A hackathon project for preparing, checking, approving, and sending DAO payments.</i></p>
      <p>AgentCFO reads contribution records and budget rules, creates payment plans, runs deterministic risk checks, waits for human approval, and sends approved payouts through the <strong>Cobo Agentic Wallet (CAW)</strong>. It creates an audit report for each run.</p>
      <ul>
        <li><b>Hackathon track:</b> Cobo · Agentic Economy × CAW</li>
        <li><b>My role:</b> frontend lead for the landing page and console demo</li>
        <li><b>Tested:</b> two Sepolia / SETH payouts covering an external payment and an internal transfer</li>
      </ul>
      <p><a href="https://agentcfo-frontend.vercel.app/">Live demo</a> · <a href="https://github.com/San-Y108/agent-cfo">Repository</a></p>
      <p>
        <img src="https://img.shields.io/badge/Next.js-000000?style=plastic&logo=next.js&logoColor=white" alt="Next.js" />
        <img src="https://img.shields.io/badge/React-20232a?style=plastic&logo=react" alt="React" />
        <img src="https://img.shields.io/badge/TypeScript-3178c6?style=plastic&logo=typescript&logoColor=white" alt="TypeScript" />
        <img src="https://img.shields.io/badge/Tailwind-06b6d4?style=plastic&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
        <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=plastic&logo=framer&logoColor=white" alt="Framer Motion" />
        <img src="https://img.shields.io/badge/GSAP-88CE02?style=plastic&logo=greensock&logoColor=white" alt="GSAP" />
        <img src="https://img.shields.io/badge/Recharts-FF7300?style=plastic&logo=recharts&logoColor=white" alt="Recharts" />
        <img src="https://img.shields.io/badge/FastAPI-009688?style=plastic&logo=fastapi&logoColor=white" alt="FastAPI" />
        <img src="https://img.shields.io/badge/Cobo%20CAW-0969da?style=plastic" alt="Cobo CAW" />
      </p>
    </td>
    <td width="35%" align="center" valign="middle">
      <img src="https://raw.githubusercontent.com/San-Y108/agent-cfo/master/assets/images/readme/banner.png" width="100%" alt="AgentCFO banner" />
    </td>
  </tr>
</table>

### 🧩 Other projects

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3><a href="https://github.com/Aafff623/threetwoa-digital-garden">🌱 Digital Garden</a></h3>
      <p><i>A personal digital garden for notes, photo walls, footprints, and long-lived archives. Built with Next.js and deployed on Vercel.</i></p>
      <p><a href="https://threetwoa-digital-garden.vercel.app/">Website</a> · <a href="https://github.com/Aafff623/threetwoa-digital-garden">Repo</a></p>
      <p><img src="https://img.shields.io/badge/Next.js-000000?style=plastic&logo=next.js&logoColor=white" alt="Next.js" /> <img src="https://img.shields.io/badge/React-20232a?style=plastic&logo=react" alt="React" /> <img src="https://img.shields.io/badge/TypeScript-3178c6?style=plastic&logo=typescript&logoColor=white" alt="TypeScript" /> <img src="https://img.shields.io/badge/Tailwind-06b6d4?style=plastic&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /> <img src="https://img.shields.io/badge/GSAP-88CE02?style=plastic&logo=greensock&logoColor=white" alt="GSAP" /> <img src="https://img.shields.io/badge/Lenis-1f2328?style=plastic" alt="Lenis" /> <img src="https://img.shields.io/badge/Vercel-000000?style=plastic&logo=vercel&logoColor=white" alt="Vercel" /></p>
    </td>
    <td width="50%" valign="top">
      <h3><a href="https://github.com/Aafff623/web3career-study-track">📚 AI Web3 Study Track</a></h3>
      <p><i>Notes, exercises, and hackathon work from an AI and Web3 cohort.</i></p>
      <p><a href="https://github.com/Aafff623/web3career-study-track">Repo</a></p>
      <p><img src="https://img.shields.io/badge/AI%20×%20Web3-0969da?style=plastic" alt="AI x Web3" /> <img src="https://img.shields.io/badge/Smart%20Account-f59e0b?style=plastic" alt="Smart Account" /> <img src="https://img.shields.io/badge/Session%20Keys-f59e0b?style=plastic" alt="Session Keys" /> <img src="https://img.shields.io/badge/MCP-0969da?style=plastic" alt="MCP" /> <img src="https://img.shields.io/badge/Skills-f59e0b?style=plastic" alt="Skills" /> <img src="https://img.shields.io/badge/Claude%20Code-d4a27f?style=plastic&logo=claude" alt="Claude Code" /></p>
    </td>
  </tr>
</table>

---

## 📖 What I'm learning

- <b>Systems / inference:</b> vLLM serving on Hygon DCU (gfx936), HIP kernel fusion, decode/prefill routing, and reading TTFT / TPOT / throughput under contest SLAs
- <b>Web3:</b> Smart Accounts, Session Keys, Agentic Wallets, on-chain interactions, and testnet deployments
- <b>AI-assisted development:</b> reusable Skills, MCP tooling, and repeatable review and maintenance workflows
- <b>Frontend:</b> complex forms, state management, PWA offline behavior, and faster demo iteration

---

## 🎯 Goals for 2026

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>🚀 Publish three projects</h3>
      <p><i>Finish and publish at least three projects with a working demo or real users.</i></p>
    </td>
    <td width="50%" valign="top">
      <h3>🔧 Release reusable tools</h3>
      <p><i>Publish some of the Skills or CLI tools that I currently use locally.</i></p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🏆 Join more contests</h3>
      <p><i>Join more AI or Web3 hackathons and system-capability contests, and get better at turning fixed constraints into measured results.</i></p>
    </td>
    <td width="50%" valign="top">
      <h3>✍️ Write as I go</h3>
      <p><i>Keep notes and retrospectives close to the code, especially when a project changes direction.</i></p>
    </td>
  </tr>
</table>

---

## 📈 Activity

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-activity-graph.vercel.app/graph/?username=Aafff623&bg_color=0d1117&color=58a6ff&line=58a6ff&point=d29922&hide_border=true" />
    <img src="https://github-readme-activity-graph.vercel.app/graph/?username=Aafff623&bg_color=ffffff&color=0969da&line=0969da&point=f59e0b&hide_border=true" alt="activity graph" />
  </picture>
</p>

---

## 📫 Contact

<p align="center"><i>You can reach me by email or through any of the links below.</i></p>

<p align="center">
  <a href="mailto:laiyif68@gmail.com"><img height="42" width="42" src="https://cdn.simpleicons.org/gmail/EA4335" alt="Email" title="Email" /></a>
  &nbsp;&nbsp;
  <a href="https://github.com/Aafff623"><img height="42" width="42" src="https://cdn.simpleicons.org/github/181717" alt="GitHub" title="GitHub" /></a>
  &nbsp;&nbsp;
  <a href="https://x.com/FanLaiyi26341"><img height="42" width="42" src="https://cdn.simpleicons.org/x/000000" alt="X / Twitter" title="X / Twitter" /></a>
  &nbsp;&nbsp;
  <a href="https://space.bilibili.com/549916339"><img height="42" width="42" src="https://cdn.simpleicons.org/bilibili/00A1D6" alt="Bilibili" title="Bilibili" /></a>
  &nbsp;&nbsp;
  <a href="https://t.me/threetwoa"><img height="42" width="42" src="https://cdn.simpleicons.org/telegram/26A5E4" alt="Telegram" title="Telegram" /></a>
  &nbsp;&nbsp;
  <a href="https://my-blogs-roan-seven.vercel.app/"><img height="42" width="42" src="https://cdn.simpleicons.org/blogger/F57D00" alt="Blog" title="Blog" /></a>
  &nbsp;&nbsp;
  <a href="https://threetwoa-digital-garden.vercel.app/"><img height="42" width="42" src="https://cdn.simpleicons.org/obsidian/7C3AED" alt="Digital Garden" title="Digital Garden" /></a>
  &nbsp;&nbsp;
  <a href="https://www.youtube.com/@laiyiFan-23"><img height="42" width="42" src="https://cdn.simpleicons.org/youtube/FF0000" alt="YouTube" title="YouTube" /></a>
  &nbsp;&nbsp;
  <a href="https://www.buymeacoffee.com/Aafff623"><img height="42" width="42" src="https://cdn.simpleicons.org/buymeacoffee/FFDD00" alt="Buy Me a Coffee" title="Buy Me a Coffee" /></a>
</p>

---

<p align="center"><i>Last updated: July 2026</i></p>
