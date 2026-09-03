<p align="center">
  <img src="./assets/v9-banner.gif" alt="threetwoa banner" />
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/brand-threetwoa-dark.gif" />
    <img src="./assets/brand-threetwoa.gif" alt="threetwoa" width="680" />
  </picture>
</p>

<p align="center"><i>⭐ Code Less, Architect More 🚀</i></p>

<table width="100%">
  <tr>
    <td width="60%" valign="top">
      <p>你好！我是中北大学软件工程专业的准大三学生。💻&#8288;(￣▽￣)</p>
      <p>暑假主攻 Java 微服务与中间件、大模型底层知识，以及 Harness 工程下的 Spec-driven Coding。对 vibe coding 的新鲜期已经过去——我更在意架构、可维护性与经得起时间考验的代码。</p>
      <p>⚡&#8288;(¬‿¬) 少一点一次性代码，多一点判断与 Workflow。</p>
      <p>正在实践：</p>
      <ul>
        <li><b>构建与实践 (Builder Culture)：</b>紧跟开源主流范式，秉持“通过造轮子理解系统”的思路——参考 <a href="https://github.com/codecrafters-io/build-your-own-x">Build Your Own X</a> 与 CodeCrafters 动手把核心机制做成练手玩具（如终端 Shell、简易 Redis、以及参考 <a href="https://github.com/SaladDay/pi-from-scratch">pi-from-scratch</a> 手搓极简 Agent Loop）；结合 <a href="https://github.com/datawhalechina/Hello-Agents">Hello-Agents</a> 与李博杰 <a href="https://github.com/bojieli/ai-agent-book">ai-agent-book</a> 实验体系，在 OpenCode、Harness Agent 与自研工作流中吃透 Agent 架构；吸纳 <a href="https://github.com/datawhalechina/easy-vibe">Easy-Vibe</a> 与 VibeHub 的敏捷造物节奏，长期经营数字花园。</li>
        <li><b>实战积累与数据底座：</b>打通支付、数据库调优、微信生态、阿里云与 UniApp，并借鉴阿江（MediaCrawler）经验实践 CDP 浏览器自动化与数据抓取；习惯切换视角想问题——做产品、做全栈、做黑客松交付。</li>
        <li><b>开源探索：</b>从自己的仓库和社区前沿入手，拆解优质开源项目拉代码跑跑看，做二次开发、优化与维护。</li>
        <li><b>模型实测与多模态：</b>动手测测国模（DeepSeek、GLM、Kimi）与国外御三家（Anthropic、OpenAI、xAI）；把 MiniMax / StepFun 的多模态能力（生图、视频、配音、音乐）接进自己的 Agent 工作流，搭配自写的小 Skill 和 MCP 跑跑看。</li>
        <li><b>自创 TTA 系列 Skills：</b>以个人网名缩写（TTA）命名的一套面向 Agent 的小工具集（<code>tta-cover</code> · <code>tta-draw-ui</code> · <code>tta-frontend</code> · <code>tta-html</code> · <code>tta-motion</code> · <code>tta-ppt</code> · <code>tta-tone</code> · <code>tta-visual</code>），覆盖封面、UI、前端、可分享 HTML、动效、演示、文案与解释型配图。</li>
      </ul>
      <p>技术之外：自行车爱好者 🚲，常看五大环赛等赛事；闲时写博客、经营数字花园，记录追番与随手感悟，在代码之外留一点温热。</p>
    </td>
    <td width="40%" align="center" valign="middle">
      <img src="./assets/hero-knight.webp" width="92%" alt="threetwoa hero" />
    </td>
  </tr>
</table>

<p align="center">
  <a href="mailto:laiyif68@gmail.com">邮箱</a> ·
  <a href="https://my-blogs-roan-seven.vercel.app/">博客</a> ·
  <a href="https://fork-firefly.vercel.app/">数字花园</a>
</p>

<p align="center">
  <a href="https://github.com/Aafff623"><img height="42" width="42" src="https://cdn.simpleicons.org/github/181717" alt="GitHub" title="GitHub" /></a>
  &nbsp;&nbsp;
  <a href="https://x.com/FanLaiyi26341"><img height="42" width="42" src="https://cdn.simpleicons.org/x/000000" alt="X / Twitter" title="X / Twitter" /></a>
  &nbsp;&nbsp;
  <a href="https://space.bilibili.com/549916339"><img height="42" width="42" src="https://cdn.simpleicons.org/bilibili/00A1D6" alt="Bilibili" title="Bilibili" /></a>
  &nbsp;&nbsp;
  <a href="https://t.me/threetwoa"><img height="42" width="42" src="https://cdn.simpleicons.org/telegram/26A5E4" alt="Telegram" title="Telegram" /></a>
  &nbsp;&nbsp;
  <a href="https://www.youtube.com/@laiyiFan-23"><img height="42" width="42" src="https://cdn.simpleicons.org/youtube/FF0000" alt="YouTube" title="YouTube" /></a>
</p>

---

## Agent 工作流

Coding agent 是一支协同车队，不是单一工具。Grok 网页端摸排实时热点，闲时也喜欢捣鼓 Grokbot；GPT 负责做深挖与需求拆解；~~此前日常用 Claude Code 配合 V4-Flash 搭配 MiniMax 各种多模态能力~~，现在核心开发转向在 **ZCode** 里配合 GLM Lite 老套餐，用 **GLM 5.3 Flash** 配合开发任务，充分利用其 Harness 生态和插件市场能力；~~OpenCode 和 Pi 分担轻量小任务~~，轻量小任务现已交给 **Antigravity** 里的 **Gemini 3.8 Flash**；Cursor 顺手修修补补。不重复造轮子，各家 CLI 配置好对应的 Harness 生态和插件市场，结合自研设计的 `harness-sync` 技能，一键跨端同步并持续维护迭代。Harness 大于 Prompt：限定上下文、理清仓库规约、跑通确定性命令与测试、写清文档并做好最后的 diff 审查。📋&#8288;(・ω・)ノ 架构判断与每一次 merge，都在我手里。

---

## 技术栈

<table width="100%">
  <tr>
    <td width="78%" valign="top">
      <p><b>前端</b><br />
      <img src="https://img.shields.io/badge/Vue-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue" />
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
      <img src="https://img.shields.io/badge/UniApp-2B9939?style=flat-square&logoColor=white" alt="UniApp" />
      <img src="https://img.shields.io/badge/Astro-BC52EE?style=flat-square&logo=astro&logoColor=white" alt="Astro" />
      <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" /></p>
      <p><b>Java / Spring</b><br />
      <img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java" />
      <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot" />
      <img src="https://img.shields.io/badge/Spring%20MVC-6DB33F?style=flat-square&logoColor=white" alt="Spring MVC" />
      <img src="https://img.shields.io/badge/MyBatis--Plus-1A7FBF?style=flat-square&logoColor=white" alt="MyBatis-Plus" />
      <img src="https://img.shields.io/badge/Sa--Token-6DB33F?style=flat-square&logoColor=white" alt="Sa-Token" /></p>
      <p><b>中间件与微服务</b><br />
      <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL" />
      <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" alt="Redis" />
      <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
      <img src="https://img.shields.io/badge/MinIO-C72E49?style=flat-square&logo=minio&logoColor=white" alt="MinIO" />
      <img src="https://img.shields.io/badge/RocketMQ-D77C10?style=flat-square&logo=apacherocketmq&logoColor=white" alt="RocketMQ" />
      <img src="https://img.shields.io/badge/Netty-1F2937?style=flat-square&logoColor=white" alt="Netty" />
      <img src="https://img.shields.io/badge/Nacos-2E6BE6?style=flat-square&logoColor=white" alt="Nacos" />
      <img src="https://img.shields.io/badge/Gateway-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="Gateway" /></p>
      <p><b>AI 与智能体</b><br />
      <img src="https://img.shields.io/badge/LangChain4j-1C3C3C?style=flat-square&logoColor=white" alt="LangChain4j" />
      <img src="https://img.shields.io/badge/Qwen-615CED?style=flat-square&logo=alibabacloud&logoColor=white" alt="通义千问 / DashScope" />
      <img src="https://img.shields.io/badge/MCP-111827?style=flat-square&logoColor=white" alt="模型上下文协议" />
      <img src="https://img.shields.io/badge/RAG-7C3AED?style=flat-square&logoColor=white" alt="检索增强生成" /></p>
      <p><b>Python</b><br />
      <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
      <img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white" alt="Django" />
      <img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white" alt="Flask" /></p>
      <p><b>系统与推理（竞赛实证）</b><br />
      <img src="https://img.shields.io/badge/vLLM-1F2937?style=flat-square&logoColor=white" alt="vLLM" />
      <img src="https://img.shields.io/badge/HIP%20%2F%20ROCm-7C3AED?style=flat-square&logoColor=white" alt="HIP / ROCm" />
      <img src="https://img.shields.io/badge/Hygon%20DCU-4F46E5?style=flat-square&logoColor=white" alt="Hygon DCU" />
      <img src="https://img.shields.io/badge/Biren%20GPU-059669?style=flat-square&logoColor=white" alt="Biren GPU" /></p>
      <p><b>DevOps</b><br />
      <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
      <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" alt="Git" />
      <img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black" alt="Linux" /></p>
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

## 竞赛

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>Lead Cup · vLLM on Hygon DCU</h3>
      <p>2026 全国大学生计算机系统能力大赛 · 智能计算创新设计赛（先导杯）赛题 1 · 队伍翻斗花园</p>
      <p><b>证明拆分：</b>官方最佳锚为 87.7839 / 100 · #26 / 132 · SLA 0 · precision 0；本队最佳锚为 87.6933 / 100，4k–8k / 8k–16k / 16k–32k 吞吐为 20.39 / 18.29 / 14.61 tok/s，precision 0。</p>
      <p>工作负载：在固定国产 DCU、concurrency=1 下提升长上下文 Qwen 吞吐，并满足 TTFT / TPOT P99 SLA（输入档 4k–8k / 8k–16k / 16k–32k）。</p>
      <p>技术栈：vLLM 0.18.1 · Qwen3.5-27B BF16 · 海光 DCU（gfx936）· SCNet 实测。我负责 shared-gate 融合、SwiGLU HIP kernel、GDN launch packing、Gather-FA routing、LPK prefetch。</p>
      <p><b>验证配方：</b>fused shared-gate 开启 · LPK stages=1 · Gather-FA ≤16K · rocBLAS + TunableOp · LPK prefetch。LONG prefill 与 LLMM1+fusion 经实测回退，后者曾降至 83.8886。</p>
      <p>相对官方基线 smoke：TTFT P99 −61%–87% · TPOT P99 ≈ −35% · 吞吐 +7%–24%。分数以 SCNet 跑分为准，不用本地 Windows 数字顶替。</p>
      <p><a href="https://gitlab.eduxiji.net/T2026101109912321/vllm-cscc-leadcup3">赛事提交</a> · <a href="https://github.com/Aafff623/vllm-cscc-leadcup">源码镜像</a></p>
    </td>
    <td width="50%" valign="top">
      <h3>AI4S · 书生国智科探挑战赛</h3>
      <p>2026 书生国智科探挑战赛暨飞翔杯 AI Agent/Skills 开发大赛 · 上海 AI 实验室 × 壁仞 · 赛道 5 模型与算子 · 队伍翻斗花园</p>
      <p><b>实时榜单：</b>公开 NS64 rel-L2 <b>0.035115</b> · tag <code>dualview_r2</code> · 报告 <b>v9</b> · Spectral idle <b>3.811 / 8.054 / 29.560 ms</b> @64/128/256 · worst rel ≈ <b>2.17e-7</b>（≤1e-4）· 排行待出</p>
      <p>问题：交付壁仞原生的 Spectral Convolution（SUPA / Extension），并在公开 64×64 Navier–Stokes 数据集（1000/128）上复用于 ≥4 层 FNO-NS——需附带 Agent/Skills 日志（约 15% 权重）。</p>
      <p>技术栈：Biren106B · SDK 1.11 · <code>device=supa</code> · 融合 suFFT + SUPA 双角 mul · FNO width32/modes16 · Cursor Agent harness（<code>skill.md</code>、算子优化回路、promote 门控）。</p>
      <p>证据：正式 Spectral idle 已冻结；CPU↔SUPA 链路 <code>&lt;1e-4</code>；公开 NS64 上 Pred/GT 可视化；Agent 日志 35+ 段已审查，遵循 abort / NO_SIGNAL 纪律（无静默 promote）。</p>
      <p>相对正式 v8（0.035302）：公开 L2 提升 ≈ <b>+0.53%</b>（双视角一致性打磨后）；Spectral 耗时保持不变（有意为之）。</p>
      <p><a href="https://github.com/Aafff623/fandou-ai4s">源码</a> · <a href="https://ai4scompetition.intern-ai.org.cn/">赛事主页</a></p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="bottom" align="center">
      <img src="./assets/comp-syscap-banner.webp" width="100%" alt="2026 全国大学生计算机系统能力大赛" />
    </td>
    <td width="50%" valign="bottom" align="center">
      <img src="./assets/comp-ai4s-ketan.webp" width="100%" alt="书生国智科探挑战赛 — 上海 AI 实验室 × 壁仞" />
    </td>
  </tr>
</table>

---

## GitHub 统计

<table width="100%">
  <tr>
    <td width="60%" align="center" valign="top">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.shion.dev/api?username=Aafff623&show_icons=true&bg_color=0d1117&title_color=58a6ff&text_color=e6edf3&icon_color=d29922&hide=prs,issues&hide_border=false&border_color=30363d&card_width=500" />
        <img src="https://github-readme-stats.shion.dev/api?username=Aafff623&show_icons=true&bg_color=ffffff&title_color=0969da&text_color=1f2328&icon_color=f59e0b&hide=prs,issues&hide_border=false&border_color=d1d9e0&card_width=500" alt="GitHub stats" />
      </picture>
    </td>
    <td width="40%" align="center" valign="top">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.shion.dev/api/top-langs/?username=Aafff623&layout=compact&bg_color=0d1117&title_color=58a6ff&text_color=e6edf3&icon_color=d29922&hide_border=false&border_color=30363d&card_width=320" />
        <img src="https://github-readme-stats.shion.dev/api/top-langs/?username=Aafff623&layout=compact&bg_color=ffffff&title_color=0969da&text_color=1f2328&icon_color=f59e0b&hide=prs,issues&hide_border=false&border_color=d1d9e0&card_width=320" alt="Top languages" />
      </picture>
    </td>
  </tr>
</table>

---

## 经典项目

<table width="100%">
  <tr>
    <td width="65%" valign="top">
      <h3><a href="https://github.com/San-Y108/agent-cfo">AgentCFO：DAO 资金助手</a></h3>
      <p>帮 DAO 运营方通过 Cobo Agentic Wallet 准备并审批资金支付，而不是靠零散表格和不透明转账。黑客松原型。</p>
      <ul>
        <li><b>赛道：</b>Cobo · Agentic Economy × CAW</li>
        <li><b>我的角色：</b>前端负责人；落地页与演示用操作控制台</li>
        <li><b>流程：</b>贡献记录和预算规则 → 付款计划 → 确定性检查 → 人工审批 → 支付与审计报告</li>
        <li><b>证明：</b>两笔 Sepolia / SETH 支付（外部付款 + 内部转账）</li>
        <li><b>技术：</b>Next.js、TypeScript、FastAPI、Cobo CAW</li>
      </ul>
      <p><a href="https://agentcfo-frontend.vercel.app/">在线演示</a> · <a href="https://github.com/San-Y108/agent-cfo">仓库</a></p>
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
      <img src="./assets/agentcfo-banner.webp" width="100%" alt="AgentCFO banner" />
    </td>
  </tr>
</table>

---

## 正在构建

- <b>DSH 插件生态：</b>深入研究 DSH 插件体系，正向官方社区贡献一个插件，同时独立从零开发另一个全新插件。
- <b>分布式延时投递服务：</b>偏重可靠性与削峰填谷的 Spring Cloud / 中间件实战。
- <b>企业级 Dify 深入定制：</b>面向真实业务流程定制知识库与工作流插件。
- <b>Grokbot 探索实验：</b>摸索 Grokbot 的交互机制与自动化工作流玩法。

---

## 最近在学

- <b>Java 微服务全栈：</b>系统梳理微服务治理（Spring Cloud Alibaba、Nacos、Sentinel、Gateway）与高并发中间件可靠性保障。
- <b>AI 辅助端到端测试：</b>用 MCP 工具让模型参与 E2E，尽早抓住断裂的业务流。🔬&#8288;(・∀・)
- <b>轻量 CLI × 重度 IDE：</b>ZCode / Claude Code 做快速开发与探索，Antigravity (Gemini) 分担轻量小任务；Cursor（内置浏览器、调试、项目上下文）扛长期维护。
- <b>范式演进：</b>Prompt → Context → Harness → Loop Engineering。用规范和纪律收窄人机理解偏差，逼自己把系统架构想清楚。🧭&#8288;(｀・ω・´)
- <b>多端 Harness 协同与自研 Skill：</b>自研 <code>harness-sync</code> 维护多环境配置，以网名缩写（TTA）沉淀实用系列 Skills，走向规范驱动开发。
- <b>兴趣驱动的独立开发链路：</b>打通 App / 小程序 + 海外支付；用信息推动开发，在 AI 探索业务时查漏补缺。
- <b>规范驱动编程 (SDD)：</b>实践 Spec-Kit / OpenSpec 模式，通过清晰的前置契约收敛人机认知偏差。
- <b>Agent 核心工程（Python）：</b>LLM 网关分流、Function Calling / MCP 运行时、带状态机与 Checkpoint 的 Agent Loop、混合检索 RAG。
- <b>多 Agent 协作与评测：</b>Subagent 协同调度、Golden Dataset 构建、LLM-as-Judge 自动化评测、Trace 观测与成本治理。
- <b>Agentic 产品落地：</b>从想法到原型（PM → Builder），把记忆体系、主动触达与动态 UI 整合进真实场景。

---

## 活跃度

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Aafff623/Aafff623/output/github-contribution-grid-snake-dark.svg" />
    <img src="https://raw.githubusercontent.com/Aafff623/Aafff623/output/github-contribution-grid-snake.svg" alt="贡献贪吃蛇" />
  </picture>
</p>

---

<p align="center"><i>最近更新：2026 年 9 月</i></p>
