<p align="center">
  <img src="./assets/v9-banner.gif" alt="threetwoa banner" />
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/brand-threetwoa-dark.svg" />
    <img src="./assets/brand-threetwoa.svg" alt="threetwoa" width="680" />
  </picture>
</p>

<p align="center"><i>软件工程学生 · Java &amp; Python · Agent Engineering</i></p>

<table width="100%">
  <tr>
    <td width="60%" valign="top">
      <p>我是中北大学软件工程二年级学生。下一步希望进入实习，在 Java 与 Python 业务生态中真正参与开发，同时继续积累 Agent 开发能力。</p>
      <p>我给自己安排的路径很明确：先理解真实团队如何开发和维护业务软件，再把 Agent Engineering 做深；用 Harness Engineering 的方法，让 AI 辅助开发具备可复现、可测试、可审查的工程约束；最后把这些判断力带进自己的产品。长期目标说起来简单，做到很难：成为能把想法独立做成上线产品、可以 Build Almost Everything 的独立开发者。</p>
      <p>代码之外，我会写博客、养数字花园、看动画，也会把不想忘掉的东西随手记下来。</p>
    </td>
    <td width="40%" align="center" valign="middle">
      <img src="./assets/hero-knight.webp" width="92%" alt="threetwoa hero" />
    </td>
  </tr>
</table>

<p align="center">
  <a href="mailto:laiyif68@gmail.com">邮箱</a> ·
  <a href="https://my-blogs-roan-seven.vercel.app/">博客</a> ·
  <a href="https://threetwoa-digital-garden.vercel.app/">数字花园</a>
</p>

---

## Agent 工作流

我会让 coding agent 参与仓库探索、资料调查、重复编辑和第一轮实现。比 prompt 更重要的是外围约束：清楚的任务范围、仓库规则、可复现命令、测试、文档和最终 diff review。设计判断和每一次合并仍由我负责。

---

## 竞赛

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>Lead Cup · vLLM on Hygon DCU</h3>
      <p>2026 全国大学生计算机系统能力大赛，领跑杯第 1 题。</p>
      <p><b>队伍：</b>翻斗花园 · <b>职责：</b>kernel 融合与 decode/prefill 路由</p>
      <p><b>榜单最好一跑：</b>87.7839 / 100 · #26 / 132 · SLA 0 · precision 0</p>
      <p>我们在固定海光 DCU（gfx936）上优化 vLLM 0.18.1 推理 Qwen3.5-27B。我负责 shared-gate 融合、gate-up 与 SwiGLU HIP kernel、GDN launch packing、Gather-FA routing 和 LPK prefetch。</p>
      <ul>
        <li>相对官方基线 smoke tests，TTFT P99 降低 61% 至 87%</li>
        <li>TPOT P99 降低约 35%，吞吐提升 7% 至 24%</li>
      </ul>
      <p><a href="https://gitlab.eduxiji.net/T2026101109912321/vllm-cscc-leadcup3">赛事提交</a> · <a href="https://github.com/Aafff623/vllm-cscc-leadcup">源码镜像</a></p>
    </td>
    <td width="50%" valign="top">
      <h3>AI4S · 书生国智科探挑战赛</h3>
      <p><b>状态：</b>已报名、准备中 · <b>队伍：</b>翻斗花园，5 人 · <b>角色：</b>队员</p>
      <p>我们参加上海人工智能实验室与壁仞组织的模型与算子赛道。目前准备内容包括壁仞 GPU 上 Agent 辅助的 PINN、GNN、FNO 类科学模型与算子工作。当前尚无分数或公开交付物。</p>
      <p><a href="https://ai4scompetition.intern-ai.org.cn/">赛事主页</a></p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>HarmonyOS · C4 高校创新赛</h3>
      <p><b>状态：</b>正在考虑，尚未确认报名。</p>
      <p>计划方向是操作系统智能创新，包括异构调度、跨端通信，以及面向系统侧 AI 效率的感知数据流。如果队伍最终确认参赛，我会在这里补充仓库、Demo 和正式提交材料。</p>
      <p><a href="https://developer.huawei.com/home/C4-AI">赛事页面</a></p>
    </td>
    <td width="50%" valign="top">
      <h3>Monad Builder Camp</h3>
      <p><b>状态：</b>进行中。</p>
      <p>这是一个围绕 Monad 链上产品开发与展示展开的 Web3 实践计划。我目前正在完成 Builder 阶段，再决定最终产品方向。</p>
      <p><a href="https://web3intern.xyz/zh/">计划手册</a></p>
    </td>
  </tr>
</table>

---

## 技术栈

<table width="100%">
  <tr>
    <td width="78%" valign="top">
      <p><b>前端</b><br />
      <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
      <img src="https://img.shields.io/badge/Vue-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue" />
      <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
      <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></p>
      <p><b>Node.js / 实时通信</b><br />
      <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
      <img src="https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socketdotio&logoColor=white" alt="Socket.IO" />
      <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
      <img src="https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white" alt="Vitest" /></p>
      <p><b>Java / Spring</b><br />
      <img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java" />
      <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot" />
      <img src="https://img.shields.io/badge/Spring%20Cloud%20Alibaba-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="Spring Cloud Alibaba" />
      <img src="https://img.shields.io/badge/MyBatis--Plus-1A7FBF?style=flat-square&logoColor=white" alt="MyBatis-Plus" />
      <img src="https://img.shields.io/badge/Nacos-2E6BE6?style=flat-square&logoColor=white" alt="Nacos" /></p>
      <p><b>AI / 智能体</b><br />
      <img src="https://img.shields.io/badge/Spring%20AI-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="Spring AI" />
      <img src="https://img.shields.io/badge/LangChain4j-1C3C3C?style=flat-square&logoColor=white" alt="LangChain4j" />
      <img src="https://img.shields.io/badge/LangGraph4j-334155?style=flat-square&logoColor=white" alt="LangGraph4j" />
      <img src="https://img.shields.io/badge/RAG-7C3AED?style=flat-square&logoColor=white" alt="检索增强生成" />
      <img src="https://img.shields.io/badge/MCP-111827?style=flat-square&logoColor=white" alt="模型上下文协议" />
      <img src="https://img.shields.io/badge/Qwen-615CED?style=flat-square&logo=alibabacloud&logoColor=white" alt="通义千问 / DashScope" /></p>
      <p><b>分布式系统</b><br />
      <img src="https://img.shields.io/badge/RPC-0F766E?style=flat-square&logoColor=white" alt="RPC" />
      <img src="https://img.shields.io/badge/Vert.x-782A90?style=flat-square&logo=eclipsevertica&logoColor=white" alt="Vert.x" /></p>
      <p><b>数据 / 中间件</b><br />
      <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL" />
      <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" alt="Redis" />
      <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white" alt="RabbitMQ" />
      <img src="https://img.shields.io/badge/Elasticsearch-005571?style=flat-square&logo=elasticsearch&logoColor=white" alt="Elasticsearch" />
      <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
      <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" /></p>
      <p><b>Python / API</b><br />
      <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python" />
      <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI" /></p>
      <p><b>系统 / 推理</b><br />
      <img src="https://img.shields.io/badge/vLLM-1F2937?style=flat-square&logoColor=white" alt="vLLM" />
      <img src="https://img.shields.io/badge/HIP%20%2F%20ROCm-7C3AED?style=flat-square&logoColor=white" alt="HIP / ROCm" />
      <img src="https://img.shields.io/badge/Triton-0F766E?style=flat-square&logoColor=white" alt="Triton" />
      <img src="https://img.shields.io/badge/Hygon%20DCU-4F46E5?style=flat-square&logoColor=white" alt="Hygon DCU" />
      <img src="https://img.shields.io/badge/Biren%20GPU-059669?style=flat-square&logoColor=white" alt="Biren GPU" /></p>
      <p><b>Web3</b><br />
      <img src="https://img.shields.io/badge/Viem-FF6B35?style=flat-square&logo=ethereum&logoColor=white" alt="Viem" />
      <img src="https://img.shields.io/badge/Wagmi-1A1B1F?style=flat-square&logo=ethereum&logoColor=white" alt="Wagmi" />
      <img src="https://img.shields.io/badge/Monad-836EF9?style=flat-square&logoColor=white" alt="Monad" /></p>
      <p><b>DevOps / 可观测</b><br />
      <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
      <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white" alt="Kubernetes" />
      <img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white" alt="Nginx" />
      <img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black" alt="Linux" />
      <img src="https://img.shields.io/badge/ELK-005571?style=flat-square&logo=elastic&logoColor=white" alt="ELK" /></p>
    <td width="22%" align="center" valign="middle">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./assets/mascot-dark.gif" />
        <img src="./assets/mascot.gif" width="90%" alt="animated threetwoa mascot" />
      </picture>
    </td>
  </tr>
</table>

---

## GitHub 统计

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

## 经典项目

<table width="100%">
  <tr>
    <td width="65%" valign="top">
      <h3><a href="https://github.com/San-Y108/agent-cfo">AgentCFO：DAO 资金助手</a></h3>
      <p>AgentCFO 是一个通过 Cobo Agentic Wallet 准备和审批 DAO 资金支付的黑客松原型。</p>
      <ul>
        <li><b>黑客松赛道：</b>Cobo · Agentic Economy × CAW</li>
        <li><b>我的角色：</b>前端负责人，完成落地页和演示使用的操作控制台</li>
        <li><b>业务流程：</b>贡献记录和预算规则 → 付款计划 → 确定性检查 → 人工审批 → 支付与审计报告</li>
        <li><b>验证：</b>两笔 Sepolia / SETH 支付，覆盖外部付款与内部转账</li>
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
      <img src="https://raw.githubusercontent.com/San-Y108/agent-cfo/master/assets/images/readme/banner.png" width="100%" alt="AgentCFO banner" />
    </td>
  </tr>
</table>

---

## 最近在学

- <b>Java 与 Python 业务系统：</b>服务边界、持久化、缓存、部署，以及后端或 AI 应用工程实习真正需要面对的维护工作。
- <b>Agent Engineering：</b>Tool Calling、RAG、MCP、上下文设计、评测，以及让 Agent 产出可审查的仓库 Harness。
- <b>系统与推理：</b>vLLM 调度、attention backend、gfx936 kernel profiling，以及固定 SLA 下 TTFT、TPOT 和吞吐的取舍。
- <b>科学计算：</b>Agent 辅助的 PINN、GNN、FNO 类工作负载，以及壁仞 GPU 上的算子工程。
- <b>操作系统与设备：</b>异构调度、跨端通信，以及面向系统侧 AI 的感知数据流。
- <b>Web3：</b>Smart Account、Session Key、Monad 产品开发，以及测试网 Demo 与生产级体验之间的差距。

---

## 活跃度

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-activity-graph.vercel.app/graph/?username=Aafff623&bg_color=0d1117&color=58a6ff&line=58a6ff&point=d29922&hide_border=true" />
    <img src="https://github-readme-activity-graph.vercel.app/graph/?username=Aafff623&bg_color=ffffff&color=0969da&line=0969da&point=f59e0b&hide_border=true" alt="activity graph" />
  </picture>
</p>

---

## 联系

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

<p align="center"><i>最近更新：2026 年 7 月</i></p>
