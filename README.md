<p align="center">
  <img src="./assets/v9-banner.gif" alt="threetwoa banner" />
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/brand-threetwoa-dark.svg" />
    <img src="./assets/brand-threetwoa.svg" alt="threetwoa" width="680" />
  </picture>
</p>

<p align="center"><i>Software Engineering student · Java &amp; Python · Agent Engineering</i></p>

<table width="100%">
  <tr>
    <td width="60%" valign="top">
      <p>I'm a second-year Software Engineering student at North University of China. My next step is an internship where I can work across the Java and Python business ecosystem while continuing to build AI agents.</p>
      <p>The path I am working toward is deliberate: learn how real teams build and maintain business software; develop Agent Engineering skills; use Harness Engineering practices to make AI-assisted work reproducible, testable, and reviewable; then carry that judgment into independent products. The long-term goal is simple to say and hard to earn: become an independent developer who can build almost anything from idea to deployment.</p>
      <p>Outside code, I keep a blog and a digital garden, watch anime, and write down whatever I do not want to forget.</p>
    </td>
    <td width="40%" align="center" valign="middle">
      <img src="./assets/hero-knight.webp" width="92%" alt="threetwoa hero" />
    </td>
  </tr>
</table>

<p align="center">
  <a href="mailto:laiyif68@gmail.com">Email</a> ·
  <a href="https://my-blogs-roan-seven.vercel.app/">Blog</a> ·
  <a href="https://threetwoa-digital-garden.vercel.app/">Digital Garden</a>
</p>

---

## Agent workflow

I use coding agents for repository exploration, research, repetitive edits, and first-pass implementation. The surrounding harness matters more than the prompt: scoped tasks, repository rules, reproducible commands, tests, documentation, and a final diff review. I remain responsible for the design decisions and every merge.

---

## Competitions

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>Lead Cup · vLLM on Hygon DCU</h3>
      <p>2026 National Collegiate Computer System Capability Competition, Lead Cup Problem 1.</p>
      <p><b>Team:</b> 翻斗花园 · <b>Role:</b> kernel fusion and decode/prefill routing</p>
      <p><b>Leaderboard best run:</b> 87.7839 / 100 · #26 / 132 · SLA 0 · precision 0</p>
      <p>We optimized vLLM 0.18.1 serving Qwen3.5-27B on a fixed Hygon DCU (gfx936). My work covered shared-gate fusion, a gate-up and SwiGLU HIP kernel, GDN launch packing, Gather-FA routing, and LPK prefetch.</p>
      <ul>
        <li>Against official baseline smoke tests: TTFT P99 reduced by 61% to 87%</li>
        <li>TPOT P99 reduced by about 35%; throughput increased by 7% to 24%</li>
      </ul>
      <p><a href="https://gitlab.eduxiji.net/T2026101109912321/vllm-cscc-leadcup3">Submission</a> · <a href="https://github.com/Aafff623/vllm-cscc-leadcup">Source mirror</a></p>
    </td>
    <td width="50%" valign="top">
      <h3>AI4S · 书生国智科探挑战赛</h3>
      <p><b>Status:</b> registered and preparing · <b>Team:</b> 翻斗花园, five members · <b>Role:</b> team member</p>
      <p>We entered the 模型与算子 track organized by Shanghai AI Laboratory and Biren. The current preparation covers agent-assisted scientific models and operator work for PINN, GNN, and FNO-style computation on Biren GPU. No score or public deliverable is available yet.</p>
      <p><a href="https://ai4scompetition.intern-ai.org.cn/">Competition site</a></p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>HarmonyOS · C4 University Innovation Competition</h3>
      <p><b>Status:</b> under consideration; registration is not yet confirmed.</p>
      <p>The intended direction is operating-system intelligence: heterogeneous scheduling, cross-device communication, and perception data flow for system-side AI efficiency. If the team confirms entry, the work will be documented here with its repository, demo, and submission materials.</p>
      <p><a href="https://developer.huawei.com/home/C4-AI">Competition page</a></p>
    </td>
    <td width="50%" valign="top">
      <h3>Monad Builder Camp</h3>
      <p><b>Status:</b> in progress.</p>
      <p>A practical Web3 program organized around building and presenting an on-chain product on Monad. I am currently working through the builder track before committing to a final product direction.</p>
      <p><a href="https://web3intern.xyz/zh/">Program handbook</a></p>
    </td>
  </tr>
</table>

---

## Tech stack

<table width="100%">
  <tr>
    <td width="78%" valign="top">
      <p><b>Frontend</b><br />
      <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
      <img src="https://img.shields.io/badge/Vue-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue" />
      <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
      <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
      <img src="https://img.shields.io/badge/Element%20Plus-409EFF?style=flat-square&logo=element&logoColor=white" alt="Element Plus" />
      <img src="https://img.shields.io/badge/UniApp-2B9939?style=flat-square&logoColor=white" alt="UniApp" />
      <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
      <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black" alt="GSAP" />
      <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
      <img src="https://img.shields.io/badge/Ant%20Design-0170FE?style=flat-square&logo=antdesign&logoColor=white" alt="Ant Design" />
      <img src="https://img.shields.io/badge/Pinia-FFD859?style=flat-square&logoColor=black" alt="Pinia" /></p>
      <p><b>Node.js / real-time</b><br />
      <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
      <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
      <img src="https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socketdotio&logoColor=white" alt="Socket.IO" />
      <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
      <img src="https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white" alt="Vitest" /></p>
      <p><b>Java / Spring</b><br />
      <img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java" />
      <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot" />
      <img src="https://img.shields.io/badge/Spring%20Cloud%20Alibaba-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="Spring Cloud Alibaba" />
      <img src="https://img.shields.io/badge/MyBatis--Plus-1A7FBF?style=flat-square&logoColor=white" alt="MyBatis-Plus" />
      <img src="https://img.shields.io/badge/Nacos-2E6BE6?style=flat-square&logoColor=white" alt="Nacos" />
      <img src="https://img.shields.io/badge/Gateway-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="Gateway" />
      <img src="https://img.shields.io/badge/OpenFeign-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="OpenFeign" />
      <img src="https://img.shields.io/badge/Sentinel-E65C33?style=flat-square&logoColor=white" alt="Sentinel" />
      <img src="https://img.shields.io/badge/Seata-1890FF?style=flat-square&logoColor=white" alt="Seata" />
      <img src="https://img.shields.io/badge/Dubbo-2E6BE6?style=flat-square&logo=apache&logoColor=white" alt="Apache Dubbo" />
      <img src="https://img.shields.io/badge/FreeMarker-0050B2?style=flat-square&logo=apachefreemarker&logoColor=white" alt="FreeMarker" /></p>
      <p><b>AI / agents</b><br />
      <img src="https://img.shields.io/badge/Spring%20AI-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="Spring AI" />
      <img src="https://img.shields.io/badge/LangChain4j-1C3C3C?style=flat-square&logoColor=white" alt="LangChain4j" />
      <img src="https://img.shields.io/badge/LangGraph4j-334155?style=flat-square&logoColor=white" alt="LangGraph4j" />
      <img src="https://img.shields.io/badge/RAG-7C3AED?style=flat-square&logoColor=white" alt="Retrieval-Augmented Generation" />
      <img src="https://img.shields.io/badge/MCP-111827?style=flat-square&logoColor=white" alt="Model Context Protocol" />
      <img src="https://img.shields.io/badge/Qwen-615CED?style=flat-square&logo=alibabacloud&logoColor=white" alt="Qwen / DashScope" /></p>
      <p><b>Distributed systems</b><br />
      <img src="https://img.shields.io/badge/RPC-0F766E?style=flat-square&logoColor=white" alt="RPC" />
      <img src="https://img.shields.io/badge/Vert.x-782A90?style=flat-square&logo=eclipsevertica&logoColor=white" alt="Vert.x" />
      <img src="https://img.shields.io/badge/etcd-419EDA?style=flat-square&logo=etcd&logoColor=white" alt="etcd" />
      <img src="https://img.shields.io/badge/ZooKeeper-D4A017?style=flat-square&logo=apache&logoColor=white" alt="Apache ZooKeeper" /></p>
      <p><b>Data / middleware</b><br />
      <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL" />
      <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" alt="Redis" />
      <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white" alt="RabbitMQ" />
      <img src="https://img.shields.io/badge/Elasticsearch-005571?style=flat-square&logo=elasticsearch&logoColor=white" alt="Elasticsearch" />
      <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
      <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
      <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite / sql.js" />
      <img src="https://img.shields.io/badge/PGVector-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PGVector" />
      <img src="https://img.shields.io/badge/ShardingSphere-1E6BB8?style=flat-square&logo=apache&logoColor=white" alt="Apache ShardingSphere" /></p>
      <p><b>Python / API</b><br />
      <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
      <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" />
      <img src="https://img.shields.io/badge/Pydantic-E92063?style=flat-square&logo=pydantic&logoColor=white" alt="Pydantic" />
      <img src="https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white" alt="SQLAlchemy" />
      <img src="https://img.shields.io/badge/httpx-1F2937?style=flat-square&logoColor=white" alt="httpx" /></p>
      <p><b>Systems / inference</b><br />
      <img src="https://img.shields.io/badge/vLLM-1F2937?style=flat-square&logoColor=white" alt="vLLM" />
      <img src="https://img.shields.io/badge/HIP%20%2F%20ROCm-7C3AED?style=flat-square&logoColor=white" alt="HIP / ROCm" />
      <img src="https://img.shields.io/badge/Triton-0F766E?style=flat-square&logoColor=white" alt="Triton" />
      <img src="https://img.shields.io/badge/Hygon%20DCU-4F46E5?style=flat-square&logoColor=white" alt="Hygon DCU" />
      <img src="https://img.shields.io/badge/Biren%20GPU-059669?style=flat-square&logoColor=white" alt="Biren GPU" /></p>
      <p><b>Web3</b><br />
      <img src="https://img.shields.io/badge/Viem-FF6B35?style=flat-square&logo=ethereum&logoColor=white" alt="Viem" />
      <img src="https://img.shields.io/badge/Wagmi-1A1B1F?style=flat-square&logo=ethereum&logoColor=white" alt="Wagmi" />
      <img src="https://img.shields.io/badge/Monad-836EF9?style=flat-square&logoColor=white" alt="Monad" /></p>
      <p><b>DevOps / observability</b><br />
      <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
      <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white" alt="Kubernetes" />
      <img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white" alt="Nginx" />
      <img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black" alt="Linux" />
      <img src="https://img.shields.io/badge/ELK-005571?style=flat-square&logo=elastic&logoColor=white" alt="ELK" />
      <img src="https://img.shields.io/badge/SkyWalking-E54C20?style=flat-square&logoColor=white" alt="SkyWalking" />
      <img src="https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=prometheus&logoColor=white" alt="Prometheus" />
      <img src="https://img.shields.io/badge/Grafana-F46800?style=flat-square&logo=grafana&logoColor=white" alt="Grafana" />
      <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" /></p>
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

## GitHub stats

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
        <img src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=Aafff623&layout=compact&bg_color=ffffff&title_color=0969da&text_color=1f2328&icon_color=f59e0b&hide=prs,issues&count_private=true&hide_border=false&border_color=d1d9e0&card_width=320" alt="Top languages" />
      </picture>
    </td>
  </tr>
</table>

---

## Classic project

<table width="100%">
  <tr>
    <td width="65%" valign="top">
      <h3><a href="https://github.com/San-Y108/agent-cfo">AgentCFO: DAO treasury assistant</a></h3>
      <p>AgentCFO is a hackathon prototype for preparing and approving DAO treasury payments through the Cobo Agentic Wallet.</p>
      <ul>
        <li><b>Hackathon track:</b> Cobo · Agentic Economy × CAW</li>
        <li><b>My role:</b> frontend lead; built the landing page and the operator console used in the demo</li>
        <li><b>Flow:</b> contribution records and budget rules → payment plan → deterministic checks → human approval → payout and audit report</li>
        <li><b>Verification:</b> two Sepolia / SETH payouts, covering an external payment and an internal transfer</li>
        <li><b>Stack:</b> Next.js, TypeScript, FastAPI, Cobo CAW</li>
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

---

## What I'm learning

- <b>Java and Python business systems:</b> service boundaries, persistence, caching, deployment, and the maintenance work expected in a backend or AI application engineering internship.
- <b>Agent Engineering:</b> tool calling, RAG, MCP, context design, evaluations, and the repository harness needed to make agent output reviewable.
- <b>Systems and inference:</b> vLLM scheduling, attention backends, gfx936 kernel profiling, and TTFT, TPOT, throughput trade-offs under fixed SLAs.
- <b>Scientific computing:</b> agent-assisted PINN, GNN, and FNO-style workloads plus operator engineering on Biren GPU.
- <b>Operating systems and devices:</b> heterogeneous scheduling, cross-device communication, and perception data flow for system-side AI.
- <b>Web3:</b> Smart Accounts, Session Keys, Monad product development, and the gap between a testnet demo and production UX.

---

## Activity

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-activity-graph.vercel.app/graph/?username=Aafff623&bg_color=0d1117&color=58a6ff&line=58a6ff&point=d29922&hide_border=true" />
    <img src="https://github-readme-activity-graph.vercel.app/graph/?username=Aafff623&bg_color=ffffff&color=0969da&line=0969da&point=f59e0b&hide_border=true" alt="activity graph" />
  </picture>
</p>

---

## Contact

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
