<p align="center">
  <img src="./assets/v9-banner.gif" alt="threetwoa banner" />
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/brand-threetwoa-dark.svg" />
    <img src="./assets/brand-threetwoa.svg" alt="threetwoa" width="680" />
  </picture>
</p>

<p align="center"><i>软件工程学生 · 自己做站 · 想找一份能真正上手的实习</i></p>

<table width="100%">
  <tr>
    <td width="60%" valign="top">
      <p>我是中北大学软件工程二年级学生。课余会写博客、养数字花园，也喜欢把小项目做到能打开的地址上，而不是只停在作业文件夹里。</p>
      <p>兴趣比较杂：记笔记、捣鼓前端和一点 Web3、看动画、把日常碎片丢进花园。更在意的是亲手交付东西，别人点开链接就能用。</p>
      <p>现阶段更像独立开发者：自己选题、自己上线、自己维护。接下来想找一份能真正上手的实习，进一个认真做产品的小队，能看见用户反馈，也能把代码和判断练扎实。理想状态是小队在乎发出去的东西，而不是只堆 PPT。</p>
      <p><b>Agentic Workflow：</b>先让 agent 帮我铺开探索和草稿，实现阶段把脏活跑掉，再用一轮 review 挑毛病。Skills、MCP 和文档跟仓库放一起，是为了下次少重来。合不合、发不发，最后还是我拍板。</p>
    </td>
    <td width="40%" align="center" valign="middle">
      <img src="./assets/hero-knight.png" width="92%" alt="threetwoa hero" />
    </td>
  </tr>
</table>

<p align="center">
  <b>🔗 项目快链：</b>
  <a href="https://agentcfo-frontend.vercel.app/">AgentCFO</a> ·
  <a href="https://my-blogs-roan-seven.vercel.app/">博客</a> ·
  <a href="https://threetwoa-digital-garden.vercel.app/">数字花园</a>
</p>

---

## 🏆 竞赛与训练营

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>⚡ Lead Cup · vLLM on Hygon DCU</h3>
      <p><b>已结束。</b>2026 全国大学生计算机系统能力大赛 · 领跑杯第 1 题。与队伍 <b>翻斗花园</b> 一起，在固定海光 DCU（gfx936）上优化 vLLM 0.18.1 推理 Qwen3.5-27B。我负责 kernel 级融合与 decode/prefill 路由——不是只拧配置。</p>
      <p><b>成绩：</b>最好一跑 <b>87.7839 / 100</b> · <b>#26 / 132</b><br />SLA 0 · precision 0</p>
      <ul>
        <li><b>工作：</b>fused shared-gate · gate-up ⊕ SwiGLU HIP kernel · GDN packed launch · Gather-FA routing · LPK prefetch</li>
        <li><b>收益：</b>相对官方基线 smoke — TTFT P99 −61%～−87% · TPOT P99 ≈ −35% · 吞吐 +7%～+24%</li>
      </ul>
      <p><a href="https://github.com/Aafff623/vllm-cscc-leadcup">GitHub</a> · <a href="https://gitlab.eduxiji.net/T2026101109912321/vllm-cscc-leadcup3">GitLab 提交</a></p>
    </td>
    <td width="50%" valign="top">
      <h3>🔬 AI4S · 书生国智科探挑战赛</h3>
      <p><b>进行中 · 已报名。</b>上海人工智能实验室 × 壁仞 · 赛道 <b>模型与算子</b>（壁仞飞翔杯）。队伍 <b>翻斗花园</b>（5 人，与 Lead Cup 同队名）；我是 <b>队员，不是队长</b>。</p>
      <p>赛制面向真实科研场景的 Skills / Agents：海选 → SCP 广场投票 → 后续轮次 / 黑客松。赛道落在壁仞 GPU 上——Agent 辅助的科学模型与算子（PINN / GNN / FNO 一类计算，外加算子工程）。海选开发尚未开始；上传窗口大约在 7 月下旬，目标是做出能上 SCP 广场、给科研用户试用的东西。</p>
      <p><a href="https://ai4scompetition.intern-ai.org.cn/">赛事主页</a></p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>📱 HarmonyOS · C4 高校创新赛</h3>
      <p><b>暂定 · 尚未写成已报名硬事实。</b>瞄准方向 <b>04 操作系统智能创新</b>，挂在 C4 鸿蒙赛道下（第九届中国高校计算机大赛—人工智能创意赛 / 华为 × 浙江大学）。三人队，来自与翻斗花园同一批系统类竞赛同学；我是 <b>队员，不是队长</b>。</p>
      <p>若确定参赛：异构调度、跨端通信，以及提升系统侧 AI 效率与多设备协同的感知数据流——更接近 OS 管道，而不是消费级应用。若进入，交付仍按 C4 六大件（演示系统 + 文档 / 视频 / PPT 等）。</p>
      <p><a href="https://developer.huawei.com/home/C4-AI">C4-AI 页面</a></p>
    </td>
    <td width="50%" valign="top">
      <h3>⛓️ Monad Builder Camp</h3>
      <p><b>进行中 · 第 2 周。</b>正式名称：Web3 暑期实习计划 · Monad Builder Camp——四周实战型成长计划，在 Monad 上做出第一个可展示的链上产品（Demo / Repo / 研究或运营材料 / 作品集），再进入黑客松周；可选第 5 周整理作品集。</p>
      <p>结构大致是三周共学、分轨与协作，再进入黑客松。第 2 周是 <b>Builder 分轨</b>（Tech / Ops / Research）；我还没定死走哪条轨。手册把产品闭环写得很具体：<a href="https://web3intern.xyz/zh/">web3intern.xyz</a>。</p>
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
      <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
      <img src="https://img.shields.io/badge/Element%20Plus-409EFF?style=flat-square&logo=element&logoColor=white" alt="Element Plus" />
      <img src="https://img.shields.io/badge/UniApp-2B9939?style=flat-square&logoColor=white" alt="UniApp" />
      <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
      <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black" alt="GSAP" />
      <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" /></p>
      <p><b>Java / Spring</b><br />
      <img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java" />
      <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot" />
      <img src="https://img.shields.io/badge/Spring%20Cloud%20Alibaba-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="Spring Cloud Alibaba" />
      <img src="https://img.shields.io/badge/MyBatis--Plus-1A7FBF?style=flat-square&logoColor=white" alt="MyBatis-Plus" />
      <img src="https://img.shields.io/badge/Nacos-2E6BE6?style=flat-square&logoColor=white" alt="Nacos" />
      <img src="https://img.shields.io/badge/Gateway-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="Gateway" />
      <img src="https://img.shields.io/badge/OpenFeign-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="OpenFeign" />
      <img src="https://img.shields.io/badge/Sentinel-E65C33?style=flat-square&logoColor=white" alt="Sentinel" />
      <img src="https://img.shields.io/badge/Seata-1890FF?style=flat-square&logoColor=white" alt="Seata" /></p>
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

## 📊 GitHub 统计

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

## 📦 经典项目

<table width="100%">
  <tr>
    <td width="65%" valign="top">
      <h3><a href="https://github.com/San-Y108/agent-cfo">AgentCFO：DAO 资金助手</a></h3>
      <p><i>一个黑客松项目：准备、检查、审批并发送 DAO 付款。</i></p>
      <p>AgentCFO 读取贡献记录与预算规则，生成付款计划，跑确定性风险检查，等人审批后，通过 <strong>Cobo Agentic Wallet (CAW)</strong> 打出已批准的款项，并为每次运行生成审计报告。</p>
      <ul>
        <li><b>黑客松赛道：</b>Cobo · Agentic Economy × CAW</li>
        <li><b>我的角色：</b>前端负责人，负责落地页与控制台 demo</li>
        <li><b>已验证：</b>两笔 Sepolia / SETH 打款，覆盖外部付款与内部转账</li>
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

## 📖 最近在学

- <b>系统 / 推理：</b>vLLM scheduler 与 attention backends、gfx936 上 decode-bound kernel profiling，以及固定 SLA 下 TTFT / TPOT / 吞吐的取舍
- <b>科学计算与算子：</b>壁仞 GPU 上 Agent 辅助的 PINN / GNN / FNO 一类模型工作与算子工程
- <b>操作系统 / 多端：</b>异构调度、跨端通信，以及面向系统侧 AI 效率的感知数据流（鸿蒙侧）
- <b>Web3：</b>Smart Account 与 Session Key 模式、Monad 链上产品闭环，以及测试网 demo 与主网级 UX 之间的差距
- <b>AI 辅助开发：</b>把一次性 prompt 收成可复用的 Skills / MCP 工具，以及能抓住自己失误的复查闭环
- <b>前端：</b>把一个 Next.js 应用交付并养下去，而不是每次从 starter 重开

---

## 📈 活跃度

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-activity-graph.vercel.app/graph/?username=Aafff623&bg_color=0d1117&color=58a6ff&line=58a6ff&point=d29922&hide_border=true" />
    <img src="https://github-readme-activity-graph.vercel.app/graph/?username=Aafff623&bg_color=ffffff&color=0969da&line=0969da&point=f59e0b&hide_border=true" alt="activity graph" />
  </picture>
</p>

---

## 📫 联系

<p align="center"><i>可以通过邮件或下面任一链接联系我。</i></p>

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
