# Voice Category 03 — Systems / Deep-Tech Precise

> 面向 GitHub profile polish 的声音研究笔记。类别侧重：**低炒作、重测量、基础设施 / 系统 / ML-systems**（kernel、observability、inference、compilers）。**精度优先于个性**。

---

## Category definition

| 维度 | 定义 |
| --- | --- |
| 语气 | 冷静、可审计、少形容词；用数字与可复现条件说话 |
| 主题 | latency / throughput / utilization / saturation / consistency / SLA / kernel path / scheduler / memory layout |
| 说服方式 | 方法 → 测量 → 分解瓶颈 → 给出 trade-off，而不是「我们很强」 |
| 人格密度 | 低。允许轻微干幽默，但人格不抢事实 |
| 与本 profile 的契合点 | Lead Cup（vLLM on Hygon DCU）、gfx936 kernel、TTFT/TPOT P99、固定 SLA 下的吞吐取舍，天然落在本类别 |

本类声音的读者预期：**能核对你的数字、假设与边界**。任何无法指向 workload、硬件、版本或 SLA 的句子，都会显得「像宣传」。

---

## Source list（≥3）

| # | 人物 / 站点 | 角色 | 主要 URL |
| --- | ---: | --- | --- |
| 1 | **Brendan Gregg** | Systems performance / methodology / eBPF | https://www.brendangregg.com/blog/2012-12-13/usenix-lisa-2012-performance-analysis-methodology.html |
| 2 | **Dan Luu** | Measurement-heavy systems writing；metrics / latency / infra ROI | https://danluu.com/why-benchmark/ · https://danluu.com/metrics-analytics/ · https://danluu.com/perf-tracing/ |
| 3 | **Kyle Kingsbury (Aphyr) / Jepsen** | Distributed systems correctness；consistency trade-offs | https://aphyr.com/posts/281-jepsen-on-the-perils-of-network-partitions · https://aphyr.com/posts/313-strong-consistency-models · https://jepsen.io/consistency |
| 4 | **vLLM Blog**（补充：ML inference systems 语域） | Inference serving、KV cache、throughput vs latency | https://vllm.ai/blog/2023-06-20-vllm · https://blog.vllm.ai/2025/09/05/anatomy-of-vllm.html |

> 1–3 为「声音」主样本；4 提供与本 profile（vLLM / DCU / SLA）同语域的 wording，便于直接迁移到 Competition 卡片。

---

## Catchphrases / wording habits + quotes

### 1) Brendan Gregg — 清单化方法论，先定义问题再谈工具

**习惯**

- 用 **numbered methods / anti-methods**（Problem Statement、USE、Latency Analysis）
- 资源三维：**Utilization / Saturation / Errors**
- 动词偏好：measure、divide、quantify、profile、confirm
- 很少用「amazing / game-changing」；用「confirm」「estimate speedup」

**原句摘录**

> For every resource, check: 1. Utilization 2. Saturation 3. Errors  
> — https://www.brendangregg.com/blog/2012-12-13/usenix-lisa-2012-performance-analysis-methodology.html

> Latency Analysis Method: 1. Measure operation time (latency) 2. Divide into logical synchronous components 3. Continue division until latency origin is identified 4. Quantify: estimate speedup if problem fixed  
> — 同上

> What makes you think there is a performance problem? … Can the performance degradation be expressed in terms of latency or run time?  
> — Problem Statement Method，同上

**可迁移口头禅（中文 paraphrase，profile 可用）**

- 「先写问题陈述，再选工具。」
- 「利用率、饱和、错误——逐资源过一遍。」
- 「把延迟拆到能指出源头的一层，再估计修掉能快多少。」

---

### 2) Dan Luu — 测量即产品；无聊名字、可量化 ROI

**习惯**

- 长文、证据链、承认不确定性（「I would bet…」「from the outside…」）
- 偏爱 **boring, descriptive names**（如 `LongTermMetrics`）
- 数字带数量级：`mid 7 figure`、`p90` / `p99` / `p999`、overhead `~1%` / `~5%`
- 明确「测什么 / 不测什么」；批评测 throughput 却忽略用户感知 latency

**原句摘录**

> If anything, because measurement is, like writing, not generally valued, it's much easier to find high ROI measurement projects than high ROI building projects.  
> — https://danluu.com/why-benchmark/

> We spent one day building a system that immediately found a mid 7 figure optimization (which ended up shipping). … we've called it LongTermMetrics (LTM) internally since I like boring, descriptive, names.  
> — https://danluu.com/metrics-analytics/

> I felt like terminal benchmarks were all benchmarking something that's basically irrelevant to user experience (throughput) and wanted to know what it would look like if someone benchmarked something that might matter more  
> — https://danluu.com/why-benchmark/（附录动机列表，指向 term-latency）

> If you're wondering how much overhead these tools have, Andi Kleen claims that the Intel tracing support in Linux has about a 5% overhead, and Dick Sites mentions in the talk that they have a budget of about 1% overhead.  
> — https://danluu.com/perf-tracing/

**可迁移口头禅**

- 「名字无聊一点，数字清楚一点。」
- 「先问：这个 benchmark 测的是用户在乎的量吗？」
- 「用 p90/p99，别只用均值。」

---

### 3) Aphyr / Jepsen — 精确定义 + 失败模式 + 明确 trade-off

**习惯**

- 先给 **formal / operational 定义**（consistency model = set of allowed histories）
- 用失败与边界说话：partition、timeout、drop、reorder
- 结尾常落到 hybrid：弱一致用于性能/可用，强一致用于必要不变量
- 干幽默克制（`ERRNO_YOLO`），但不稀释技术断言

**原句摘录**

> Detecting network failures is hard. Since our only knowledge of the other nodes passes through the network, delays are indistinguishible from failure. This is the fundamental problem of the network partition: latency high enough to be considered a failure.  
> — https://aphyr.com/posts/281-jepsen-on-the-perils-of-network-partitions

> The CAP theorem tells us that we can either have consistency (technically, linearizability for a read-write register), or availability (all nodes can continue to handle requests), but not both.  
> — 同上

> Stronger consistency models also tend to require more coordination–more messages back and forth–to ensure their operations occur in the correct order. Not only are they less available, but they can also impose higher latency constraints.  
> — https://aphyr.com/posts/313-strong-consistency-models

> “Weaker” consistency models wherever possible, for availability and performance. “Stronger” consistency models where necessary… Bottom line, though: anyone who says their consistency model is the only right choice is likely trying to sell something. You can’t have your cake and eat it too.  
> — 同上

**可迁移口头禅**

- 「先写清保证是什么——不是口号，是允许的历史集合。」
- 「延迟高到超时，就是分区。」
- 「能弱则弱，必须强才强；没有免费午餐。」

---

### 4) vLLM Blog — inference systems 的测量句式（与 Lead Cup 同语域）

**习惯**

- 瓶颈声明 → 机制（PagedAttention / KV blocks）→ **对照实验数字**（× throughput、% waste、GPU 型号与模型尺寸）
- 把 OS 概念借到 ML systems（pages / processes / copy-on-write）——精确类比，不是营销隐喻
- 生产语境补充：SLA、TPOT、disaggregation（见 2025 anatomy / SLA 系列标题语感）

**原句摘录**

> vLLM equipped with PagedAttention redefines the new state of the art in LLM serving: it delivers up to 24x higher throughput than HuggingFace Transformers, without requiring any model architecture changes.  
> — https://vllm.ai/blog/2023-06-20-vllm

> In vLLM, we identify that the performance of LLM serving is bottlenecked by memory. … We find that existing systems waste 60% – 80% of memory due to fragmentation and over-reservation.  
> — 同上

> In practice, this results in near-optimal memory usage, with a mere waste of under 4%.  
> — 同上

（同语域延伸阅读）https://blog.vllm.ai/2025/09/05/anatomy-of-vllm.html — scheduling、paged attention、continuous batching、prefix caching；以及标题语感 *From Day 0 to Production SLAs*（https://blog.vllm.ai/ 系列）。

---

## Sentence patterns（numbers, SLA, trade-offs）

把本类声音压缩成可复用句型。括号内为占位符。

### A. 问题陈述（Gregg）

1. `{symptom}` under `{workload}` on `{hw/version}`; expressed as `{latency|runtime|throughput}` not “feels slow”.
2. Changed recently: `{software|hardware|load|config}` — isolate before optimizing.

### B. 资源 / 饱和扫描（Gregg USE）

3. For `{CPU|HBM|KV pool|NIC}`: util `{u%}`, saturation `{queue|spill|OOM}`, errors `{count}`.
4. Bottleneck confirmed at `{layer}` by `{tool/trace}`; not hypothesized from dashboards alone.

### C. 百分位与 SLA（Luu + inference 实务）

5. Report `{metric}` at **P50 / P90 / P99** (and P999 if tails matter); mean alone is insufficient.
6. Under fixed SLA `{TTFT P99 ≤ X, TPOT P99 ≤ Y}`, maximize `{throughput|concurrency}` subject to `{precision|accuracy|=0 violations}`.
7. Overhead budget: instrumentation / tracing ≤ `{1–5%}` or call the number out.

### D. 分解与量化收益（Gregg Latency Analysis + vLLM）

8. Split `{e2e latency}` into `{prefill|decode|schedule|H2D|kernel}`; largest slice is `{Z}`; estimated speedup if fixed: `{Δ%}`.
9. Baseline `{A}` vs treatment `{B}` on `{GPU/DCU, model, dtype, dataset}`: `{metric} +N% / −N%}`; scores locked to `{env}` (e.g. SCNet), not local smoke.

### E. Trade-off 句（Aphyr 结构）

10. Prefer `{weaker|cheaper|simpler}` where `{availability|throughput}` dominates; reserve `{stronger|heavier}` for `{invariant|SLA|correctness}`.
11. Cost of stronger path: `{extra RTT|coordination|memory}` → higher latency / lower availability.
12. Explicit non-goal: not claiming `{linearizability|SOTA|production-ready}` unless measured under stated failure / load model.

### F. Profile 一行压缩模板（适配 Lead Cup 已有事实）

```
{Contest} · {engine} {version} · {model} {dtype} on {device} ({arch}).
Focus: {3–5 kernel/scheduler nouns}.
Best run: {score} · #{rank}/{N} · SLA {k} · precision {k}.
vs baseline: TTFT P99 {Δ} · TPOT P99 {Δ} · throughput {Δ}; numbers from {SCNet}, concurrency={1}.
```

当前 README 已接近该模板，宜**保持句型、克制形容词**，而不是换成更「热情」的 indie 嗓音。

---

## Steal-for-profile：Do / Don't

> 前提：profile 已含 Lead Cup · vLLM on Hygon DCU 事实（best run 87.7839/100 · #26/132 · SLA 0 · precision 0；vLLM 0.18.1 · Qwen3.5-27B BF16 · gfx936 · TTFT/TPOT/吞吐对照；个人焦点：shared-gate fusion、SwiGLU HIP、GDN packing、Gather-FA、LPK prefetch）。

### Do ✅

| 做法 | 为何像本类声音 |
| --- | --- |
| 继续用 **版本 · 型号 · dtype · 并发 · SLA · 百分位** 并列 | Gregg/Luu/vLLM 的默认信息密度 |
| 职责写成 **可核对的子系统名词**（fusion / kernel / packing / routing / prefetch） | 像 design note，不像自我介绍形容词 |
| 标明 **分数锁定环境**（SCNet vs local Windows） | Luu 式：测量条件与结论绑定 |
| bio / Systems 行用 trade-off 句：`TTFT, TPOT, throughput under fixed SLAs` | 已有英文句，符合 Aphyr「没有免费午餐」结构 |
| 一处点明 **非最终奖项 / leaderboard best run**（CONTEXT 已要求） | 精确边界 = 信任 |

### Don't ❌

| 做法 | 为何违背本类 |
| --- | --- |
| 「重构了推理栈 / 大幅提升 / SOTA on DCU」而无对照表 | 高炒作、不可审计 |
| 把 Lead Cup 写成人生叙事或热血竞赛文案 | 人格压过精度 |
| 省略 P99，只写「延迟降低很多」 | 丢掉 Luu/Gregg 的百分位纪律 |
| 混入未验证的生产 SLA 承诺（「可支撑百万 QPS」） | Aphyr 会视为 overclaim |
| 用 emoji 口号或「🚀 blazing fast inference」装饰 systems 行 | 与 low-hype 冲突 |
| 把 teammate / 证书姓名等 PII 写进卡片 | 与仓库规则冲突，且与本类无关 |

### 可直接偷的「半句」（英文 profile 友好）

- `…under fixed TTFT/TPOT P99 SLAs…`
- `…scores locked to SCNet runs, not local smoke…`
- `…bottlenecked by {memory|launch overhead|attention backend}; addressed via {mechanism}…`
- `…trade throughput for tail latency only when SLA headroom allows…`

---

## Anti-patterns

| Anti-pattern | 表现 | 本类纠正 |
| --- | --- | --- |
| **Streetlight method**（Gregg） | 因为会用某个 profiler / 某篇博客手法就只看那里 | 先 problem statement，再选工具 |
| **Blame-someone-else** | 「肯定是驱动 / 框架的锅」而无 confirm | 用独立测量证实后再归因 |
| **Mean-only reporting** | 只报平均 TTFT/TPOT | 至少 P99；SLA 场景必须报违约次数 |
| **Benchmark theater** | 测易涨的吞吐、藏差的尾延迟；换 workload 不声明 | 固定 input mix / concurrency / dtype / 环境 |
| **Consistency marketing**（Aphyr） | 「强一致且高可用且低延迟」一句打完 | 写出牺牲项；hybrid 诚实 |
| **Buzzword stacking** | HIP + Triton + vLLM + ROCm 徽章墙代替一句可验证成果 | 徽章可以留，但正文一句要有数字与边界 |
| **Personality-first systems bio** | 「obsessed with kernels」「performance wizard」 | 改成做过的路径与指标 |
| **Unreproducible deltas** | 「−80% latency」不写基线与是否同 SLA | 始终 `vs {baseline}` + 环境锁 |

---

## Quick synthesis（给后续改写者）

若在五类声音里单独拉高 **Systems / deep-tech precise** 权重：

1. **保留** Lead Cup 卡片现有「数字骨架」——它已经比多数 indie profile 更接近 Gregg/vLLM。
2. **删减** 任何无法挂到测量条件上的情绪副词。
3. **统一** bio / Competitions / Systems 行的动词：optimize → measure → split → trade off。
4. **不要** 为了「更有个性」把本卡片改成故事体；个性放在 blog / digital garden，系统事实放在 profile 硬块。

---

*Generated for category 3/5 · Systems / deep-tech precise · sources fetched 2026-08-01.*
