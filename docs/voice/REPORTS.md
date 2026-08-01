# Voice REPORTS — 文风研究总汇（Profile 润色参考）

> 用途：作为 `Aafff623` 公开 README / 中文镜像 / preview 的文风优化总参考。  
> 五类分报告由并行 Agent 调研真实独立开发者 GitHub / 博客后写成；本文件只做**选型建议与可执行清单**，细节与原文引用见分册。  
> 日期：2026-08-01

---

## 0. 五类分报告索引

| # | 类别 | 文件 | 代表样本（见分册 URL） |
| --- | --- | --- | --- |
| 01 | Minimal craftsman（极简工匠） | [01-minimal-craftsman.md](./01-minimal-craftsman.md) | antfu · sindresorhus · pacocoursey · sxzz |
| 02 | Narrative maker（叙事 Maker） | [02-narrative-maker.md](./02-narrative-maker.md) | levelsio · Marc Lou · Tony Dinh |
| 03 | Systems / deep-tech（系统深技） | [03-systems-deep-tech.md](./03-systems-deep-tech.md) | Brendan Gregg · Dan Luu · Jepsen · vLLM Blog |
| 04 | Playful personality（玩趣人格） | [04-playful-personality.md](./04-playful-personality.md) | cassidoo · CoolDotty · levelsio · swyx |
| 05 | Product clarity（产品清晰） | [05-product-clarity.md](./05-product-clarity.md) | ShipFast · Plausible · Photo AI |

调研 Agent：[Minimal craftsman](982e4ba0-ba53-4628-accf-f23dc08962fb) · [Narrative maker](30c251f6-f4b6-4973-9702-585d1739717d) · [Systems deep-tech](178f941f-7f72-479d-a71b-694bf67d3ee0) · [Playful personality](027401e4-a8a6-4dca-937b-5345062157e7) · [Product clarity](b9d278de-7a8c-43fd-af53-e27a65547d02)

---

## 1. 本仓库推荐主声线（混合配方）

当前 profile 身份：**软工学生 · Java/Python · Agent Engineering · 先导杯 / AI4S 竞赛证据 · AgentCFO**。  
不适合单一照搬 indie MRR 叙事或纯 meme 玩趣页。

| 模块 | 主参考类别 | 辅参考 | 理由 |
| --- | --- | --- | --- |
| Intro / tagline / Contact | **01 Minimal** | 04 轻触 | 短身份句 + 作品优先；玩趣最多一句 |
| Agent workflow | **01** + **05** | — | 说清 harness / 责任边界（Problem→做法→你负责 merge） |
| Tech stack | **01** | — | badge 是扫描器；少概念词、少空行 |
| Competitions · Lead Cup | **03 Systems** | 05 | P99 / SLA / SCNet 锁定；禁 SOTA 空话 |
| Competitions · AI4S | **05 Product** | 02 一句旅程 | 赛道痛点 → 提交证明 → 收尾状态 |
| Classic project · AgentCFO | **05 Product** | 01 | 角色 / 流程 / 双笔验证 / Live demo |
| What I'm learning | **01** | 02 极短 | 主题列表即可；勿写成参赛报名墙 |
| Activity | **01** | — | 一句说明 GIF 是什么即可 |

**一句话配方**：外壳极简工匠 · 竞赛段落系统深技 · 项目卡片产品清晰 · 全篇禁止假 MRR / Bali 人设。

---

## 2. 跨类别「口头禅」速查（可偷句式）

### 2.1 极简工匠（01）

- 身份：`design engineer` / `Open Source Enthusiast` 式**短标签**，勿「全栈天才」。
- 动词：`crafting` · `building` · `shipping` · `implementing`。
- 结构：列表 > 长段落；emoji / badge 密度压低。

### 2.2 叙事 Maker（02）

- 弧线：`I was blocked by X, so I built Y`（学生版：课设/竞赛卡点 → 仓库交付）。
- 节奏：`Ship early / small / frequently`。
- **禁**：`$0→$65k`、被炒长篇、完美主义鸡汤——与求职 profile 错位。

### 2.3 系统深技（03）

- 方法：问题陈述 → 测量 → 拆延迟 → 估加速（Gregg / Dan Luu）。
- 数字：带单位与边界（`TTFT P99`、`concurrency=1`、`SCNet`、硬件型号）。
- 口头禅中文可用：「先写问题陈述，再选工具。」「分数以实测 commit 为准。」

### 2.4 玩趣人格（04）

- 标准：**玩笑是调味，交付物是主菜。**
- 可用：三拍并列、括号旁白、`you might like` 式项目引导。
- 学生档：正文 emoji ≤ 4；禁猫 GIF 墙、禁「我很 funny」无 pinned 作品。

### 2.5 产品清晰（05）

- 骨架：`Problem → Solution → Proof`。
- 句式：`days not weeks` · `instead of …` · `No X, just Y` · 动词利益 bullet · **单一 CTA**。
- AgentCFO：偷结构不偷炒作——用「双笔 Sepolia + 角色边界 + live demo」。

---

## 3. 针对本 README 的可执行润色清单

### 3.1 优先做（高收益）

1. **Intro**：保持 2–4 句；每句至少挂一个可核验方向（实习目标 / Agent / 博客链接），删空泛励志。
2. **Lead Cup**：已有数字骨架则继续加硬约束词（workload、SLA、SCNet），删「我们很强」类形容词。
3. **AI4S**：维持「已提交 / 收尾中 / 无榜」诚实状态；用 05 的痛点→交付句，不必加收入叙事。
4. **AgentCFO**：第一句说清「给谁解决什么」；第二句角色；第三句 proof（两笔 payout + demo）。
5. **Tech stack**：继续压概念 badge；行标题短；避免 Distributed 空行式「凑分类」。

### 3.2 刻意不做

- 不把 profile 改成 indie hacker 收入故事。
- 不恢复已删除竞赛卡来「凑热闹」。
- 不用玩趣声线盖过竞赛数字。
- 不把 Learning 写成第二竞赛区。

### 3.3 中英同步规则（沿用 LANGUAGE.md）

- 同一分支事实与章节顺序一致。
- 中文克制、事实优先；专有名词（vLLM、SCNet、TTFT）保留原文。
- 少用破折号营销腔与「赋能 / 打造闭环」等空话。

---

## 4. 模块级「改写提示词」备忘（给后续润色用）

| 模块 | 提示要点 |
| --- | --- |
| Intro | 01：短身份 + 路径一句；禁口号 |
| Competitions / Lead Cup | 03：度量词齐全；证据边界写明 |
| Competitions / AI4S | 05：赛道问题 → 已交付 → 状态 |
| Classic project | 05：用户价值 → 你做了什么 → 验证 |
| Learning | 01：名词短语列表；每条一行 |

---

## 5. 与仓库治理文档的关系

| 文档 | 关系 |
| --- | --- |
| `LANGUAGE.md` | 日常用词与章节约定；润色时仍优先遵守 |
| `CONTEXT.md` | 事实与决策；文风不能改写事实 |
| `CLAUDE.md` | Agent 读 profile 时的内容摘要 |
| `docs/voice/0x-*.md` | 外部样本与口头禅库存 |
| **本文件 `REPORTS.md`** | 五类汇总 + **本仓库选用配方** |

**已落地（2026-08-01）：** EN/ZH README + 两个 preview 已按本配方润色；`CONTEXT.md` Active Decisions 已记录 Voice recipe。后续改文案仍以分册口头禅为库存，以本文件模块表为准。

---

## 6. 分册口头禅密度一览（便于扫读）

```text
01 Minimal     → craft / build / small modules / quiet confidence
02 Narrative   → I shipped / I failed / so I built / ship frequently
03 Systems     → measure / P99 / SLA / trade-off / reproducible
04 Playful     → hello nerds / a little strange / (within reason)
05 Product     → days not weeks / no X just Y / proof + single CTA
```

选用时：**03 管竞赛数字，05 管项目卡片，01 管整页骨架，02/04 只作点缀。**
