# Dark Mode Adaptation — Checklist & Compatibility Notes

> 配套文档：记录 GitHub Profile 暗色模式适配的技术边界、已知问题、已做工作与待办。

---

## 1. 技术边界（GitHub README 能做 / 不能做）

| 能力 | GitHub README | preview-profile.html | 说明 |
| --- | --- | --- | --- |
| `<picture>` + `<source media>` 按主题切图 | ✅ 官方支持 | ✅ 原生支持 | 暗色资产切换的**唯一**可靠方式 |
| `#gh-dark-mode-only` URL fragment | ⚠️ 可用但不推荐 | ❌ | 旧 hack，已被 `<picture>` 取代 |
| CSS `prefers-color-scheme` 媒体查询 | ❌ 被 cmark 剥离 | ✅ | README 的 `<style>` 会被清掉 |
| `<style>` 内联样式表 | ❌ 被剥离 | ✅ | README 里写 `<style>` 无效 |
| `style="..."` 内联属性 | ❌ 被剥离 | ✅ | README 里 img 的 style 会被删 |
| JS 动态切换 | ❌ 禁止执行 | ✅ | README 不跑脚本 |

**结论**：
- `preview-profile.html` 可以做**完整暗色**（CSS 变量 + 媒体查询）。
- `README.md` 只能通过 `<picture>` 切换**图片资产**，文字/布局颜色由 GitHub 主题接管，无法手动控制。

---

## 2. 已完成项 ✅

### preview-profile.html
- [x] 引入 `@media (prefers-color-scheme: dark)` 暗色变量集（对齐 GitHub dark default 配色）
- [x] 背景 `--bg`、文字 `--text`、边框 `--border`、链接 `--link`、`code` 背景、`h2` 标题全部走变量
- [x] 白底 GIF 资产（mascot / banner）在暗色下加圆角 + `outline` 边框，弱化白框突兀感
- [x] 字标用 `<picture>` 包裹，暗色切换到 `brand-threetwoa-dark.svg`

### README.md
- [x] 字标 `<picture>` 切换：亮色 `brand-threetwoa.svg` ↔ 暗色 `brand-threetwoa-dark.svg`
- [x] 新增 `assets/brand-threetwoa-dark.svg`（浅蓝渐变，适配暗色背景）
- [x] 吉祥物 `<picture>` 切换：亮色 `mascot.gif` ↔ 暗色 `mascot-dark.gif`（3D 骑士，见 ADR 0002）

### 新增资产
- [x] `assets/brand-threetwoa-dark.svg`（暗色字标）
- [x] `assets/mascot-dark.gif`（暗色吉祥物，3D 骑士）

---

## 3. 兼容性问题清单（逐项分析）

### 3.1 字体对比度
- **问题**：暗色模式下，正文字体颜色若仍是深色（`#1f2328`），会在深色背景上不可读。
- **README 现状**：GitHub 自动处理正文文字颜色，**无需干预**。
- **preview 现状**：已通过 `--text` 变量切换到 `#e6edf3`。✅

### 3.2 链接对比度
- **问题**：亮色链接 `#0969da` 在暗色背景上对比度偏低。
- **README 现状**：GitHub 自动处理。✅
- **preview 现状**：已切换到 `#4493f8`。✅

### 3.3 卡片布局 / 表格
- **问题**：GitHub 的 `<table>` 在暗色下边框会自动变色，但 `<td>` 无背景时是透明的，不会有问题。
- **README 现状**：表格未用硬编码颜色，**无冲突**。✅
- **preview 现状**：表格 `td` padding 正常，暗色下无白底。✅

### 3.4 白底资产（最大问题源）
- **问题**：`mascot.gif` / `v9-banner.gif` / `hero-knight.png` 都以白色或浅色为主，暗色模式下会显示为明显的亮色区域。
- **README 现状**：**无法用 CSS 软化**（GitHub 剥离 style），只能靠 `<picture>` 切换暗色资产。逐个进展：
  - **mascot**：✅ 已制作暗色版 `assets/mascot-dark.gif`，README 与预览均用 `<picture>` 按主题切换。决策见 ADR 0002（取代 ADR 0001）。
  - **v9-banner**：⬜ 仍为单一白底 GIF，暗色下有亮色块（见 §4 待办，成本高）。
  - **hero-knight**：⬜ 仍为单一浅色 PNG，暗色下偏亮（见 §4 待办，需换底或重出）。
- **preview 现状**：白底 GIF 已加圆角 + outline 软化；hero 保持与 README 一致。✅

### 3.5 外部服务图片（stats / activity graph）
- **问题**：统计卡和活动图需要分别提供亮色、暗色参数，单一 URL 无法跟随主题。
- **README 现状**：Stats、Top Languages 和 Activity graph 均已使用 `<picture>` + 两套 URL。✅
- **preview 现状**：与 README 使用相同的 `<picture>` 结构。✅

---

## 4. Checklist To-Do（待办）

> 优先级：P0 = 首屏可见、影响大；P1 = 次要；P2 = 锦上添花

- [x] **P1** 为 github-readme-stats 卡片做 `<picture>` 明暗切换
- [x] **P1** 为 Top Languages 卡片做 `<picture>` 明暗切换
- [x] **P1** 为 Activity graph 做 `<picture>` 明暗切换
- [x] **P2** mascot.gif 暗色版本 — 已交付 `assets/mascot-dark.gif`（3D 骑士，见 ADR 0002）
- [ ] **P2** v9-banner.gif 暗色版本 — 同上，成本高
- [ ] **P2** hero-knight.png 暗色版本 — 需要换底色或重新生成

---

## 5. 本地测试方法

### preview-profile.html 测试暗色
1. **系统级切换**：Windows 设置 → 个性化 → 颜色 → 选择"暗色"。浏览器会自动跟随。
2. **浏览器 DevTools**（推荐，不改系统）：
   - Chrome：打开 DevTools → 更多工具 → 渲染（Rendering）→ `Emulate CSS media feature prefers-color-scheme` → 选 `dark`
   - Edge / Firefox 也有类似选项
3. **刷新 preview**，观察：
   - 背景是否变深
   - 字标是否切换到浅蓝渐变
   - mascot / banner 白框是否被圆角边框软化
   - 文字 / 链接对比度是否可读

### README.md 测试暗色（GitHub 真实环境）
1. 推送到 GitHub 后，访问 `github.com/Aafff623`
2. 右上角头像 → Settings → Appearance → 选 Dark
3. 刷新主页，观察 `<picture>` 字标是否正确切换
4. 注意：GitHub 有图片缓存（见已知问题），切换主题后可能需要硬刷新（Ctrl+F5）

---

## 6. 已知坑

- **GitHub 图片缓存**：`<picture>` 切换在 GitHub 上有缓存问题，切换主题后可能短时间内显示旧版本。硬刷新或等待几分钟可解决。
- **cmark-gfm 块终止符**：README 里 `<picture>` 块前后不能有空行，否则 GitHub 会把 `<picture>` 当作两个独立 HTML 块，导致渲染断裂。当前写法已规避（`<picture>` 紧贴 `<p align>`）。
- **GIF 1-bit 透明**：暗色模式下白底 GIF 无法变透明（GIF 只支持 1-bit alpha），这是格式硬限制，只能靠重制资产解决。

---

## 7. 参考来源

- [GitHub Blog: How to make images adjust for dark mode and light mode](https://github.blog/developer-skills/github/how-to-make-your-images-in-markdown-on-github-adjust-for-dark-mode-and-light-mode/)
- [Stack Overflow: Changing README image for dark/light mode](https://stackoverflow.com/questions/65413712)
- [DEV.to: Make images responsive to light/dark mode on GitHub](https://dev.to/mateusabelli/make-images-responsive-to-lightdark-mode-on-github-3gbg)
