# Warm Palette Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將作品集網站配色從冷調中性升級為暖調，提升質感，不改動版面、字型、間距。

**Architecture:** 先在 `global.css` 更新 CSS 變數（`:root` / `.dark`），再逐一更新 8 個元件/頁面，把寫死的 Tailwind 冷調 class 換成暖調值或 CSS 變數參照。無架構改動，只是 class 替換。

**Tech Stack:** Astro 6、Tailwind CSS v4、`src/styles/global.css`（Tailwind 設定入口）

---

## 色彩對照表（實作參考）

| 用途 | 舊 class / 值 | 新 class / 值 |
|------|--------------|--------------|
| 頁面背景 | `bg-white` / `rgb(255 255 255)` | `var(--aw-color-bg-page)` / `rgb(250 250 248)` |
| Navbar 背景 | `bg-white/90 dark:bg-[rgb(3_6_32)]/90` | `bg-[#F0EDE8]/90 dark:bg-[#141210]/90` |
| 深色背景 | `rgb(3 6 32)` | `rgb(20 18 16)` |
| 卡片背景（深色） | `dark:bg-slate-800/50` | `dark:bg-[rgba(30,26,22,0.6)]` |
| 邊框 | `border-gray-200 dark:border-slate-700/800` | `border-[var(--aw-color-border)]` |
| 主文字 | `text-gray-900 dark:text-white` | `text-[#1C1917] dark:text-[#E8E0D8]` |
| 次要文字 | `text-gray-600 dark:text-slate-300/400` | `text-[#78716C] dark:text-[#A09590]` |
| 淡色文字 | `text-gray-400/500 dark:text-slate-400/500/600` | `text-[#A09590] dark:text-[#6B6460]` |
| 進度條軌道 | `bg-gray-200 dark:bg-slate-700` | `bg-[rgba(80,60,40,0.1)] dark:bg-[rgba(255,240,220,0.1)]` |
| 區塊背景 | `bg-gray-50 dark:bg-slate-800/50` | `bg-[var(--aw-color-bg-page)] dark:bg-[rgba(30,26,22,0.6)]` |

---

## Task 1: 更新 global.css CSS 變數

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: 更新 `:root` 和 `.dark` 色彩變數**

將 `src/styles/global.css` 的 `:root` 和 `.dark` 區塊替換為：

```css
:root {
  --aw-color-primary: 1 97 239;
  --aw-color-secondary: 1 84 207;
  --aw-color-accent: 109 40 217;

  --aw-color-text-default: rgb(28 25 23);
  --aw-color-text-muted: rgb(28 25 23 / 55%);
  --aw-color-bg-page: rgb(250 250 248);
  --aw-color-border: rgba(80, 60, 40, 0.09);
}

.dark {
  --aw-color-text-default: rgb(232 224 216);
  --aw-color-text-muted: rgb(232 224 216 / 55%);
  --aw-color-bg-page: rgb(20 18 16);
  --aw-color-border: rgba(255, 240, 220, 0.08);
}
```

- [ ] **Step 2: 驗證編譯無誤**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build
```

預期：`dist/` 生成完畢，無 error。

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: update CSS variables to warm palette"
```

---

## Task 2: 更新 BaseLayout.astro

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: 更新 Navbar class**

將 `<header>` 的 class 從：
```
border-b border-gray-200 dark:border-slate-800 bg-white/90 dark:bg-[rgb(3_6_32)]/90 backdrop-blur-md
```
改為：
```
border-b border-[var(--aw-color-border)] bg-[#F0EDE8]/90 dark:bg-[#141210]/90 backdrop-blur-md
```

- [ ] **Step 2: 更新 Navbar 品牌連結文字色**

將 `<a href="/" class="font-bold text-lg ...">` 的 class 從：
```
text-gray-900 dark:text-white hover:text-primary transition-colors
```
改為：
```
text-[#1C1917] dark:text-[#E8E0D8] hover:text-primary transition-colors
```

- [ ] **Step 3: 更新 Navbar 導覽連結文字色**

兩個 `<a href="/#projects">` 和 `<a href="/about">` 的 class 從：
```
text-gray-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors
```
改為：
```
text-[#78716C] dark:text-[#A09590] hover:text-primary dark:hover:text-primary transition-colors
```

- [ ] **Step 4: 更新深色模式切換按鈕**

`<button id="theme-toggle">` 的 class 從：
```
text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors
```
改為：
```
text-[#78716C] dark:text-[#A09590] hover:bg-[rgba(80,60,40,0.06)] dark:hover:bg-[rgba(255,240,220,0.06)] transition-colors
```

- [ ] **Step 5: 更新 Footer 邊框**

`<footer>` 的 class 從：
```
border-t border-gray-200 dark:border-slate-800 py-8 mt-16
```
改為：
```
border-t border-[var(--aw-color-border)] py-8 mt-16
```

- [ ] **Step 6: 更新 Footer icon 連結色**

Footer 內所有四個社群 icon `<a>` 的 class 從：
```
text-gray-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors
```
改為：
```
text-[#A09590] dark:text-[#6B6460] hover:text-primary dark:hover:text-primary transition-colors
```

- [ ] **Step 7: 更新 Footer 版權文字**

`<p class="text-xs text-gray-400 dark:text-slate-600">` 改為：
```
text-xs text-[#A09590] dark:text-[#6B6460]
```

- [ ] **Step 8: 啟動 dev server 視覺確認**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run dev
```

在瀏覽器開啟 `http://localhost:4321`，確認：
- Navbar 背景為微暖白（非純白）
- Footer icon 顏色為暖棕灰
- 切換深色模式後背景為暖炭黑（非冷藍深色）

- [ ] **Step 9: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "style: update BaseLayout navbar and footer to warm palette"
```

---

## Task 3: 更新小元件（Hero、CTABlock）

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/components/CTABlock.astro`

- [ ] **Step 1: 更新 Hero.astro 文字色**

`src/components/Hero.astro` 中：

將 `<h1>` 的 class 從：
```
text-gray-900 dark:text-white leading-tight mb-6
```
改為：
```
text-[#1C1917] dark:text-[#E8E0D8] leading-tight mb-6
```

將 `<p>` 的 class 從：
```
text-gray-600 dark:text-slate-300 mb-8
```
改為：
```
text-[#78716C] dark:text-[#A09590] mb-8
```

- [ ] **Step 2: 更新 CTABlock.astro 邊框與文字**

`src/components/CTABlock.astro` 中：

將 `<section>` 的 class 從：
```
border-t border-gray-200 dark:border-slate-800 py-16 mt-16
```
改為：
```
border-t border-[var(--aw-color-border)] py-16 mt-16
```

將 `<h2>` 的 class 從：
```
text-gray-900 dark:text-white mb-6
```
改為：
```
text-[#1C1917] dark:text-[#E8E0D8] mb-6
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro src/components/CTABlock.astro
git commit -m "style: update Hero and CTABlock text/border to warm palette"
```

---

## Task 4: 更新卡片元件（ProjectCard、MetricBlock）

**Files:**
- Modify: `src/components/ProjectCard.astro`
- Modify: `src/components/MetricBlock.astro`

- [ ] **Step 1: 更新 ProjectCard.astro**

`src/components/ProjectCard.astro` 的 `<article>` class 從：
```
group relative bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 hover:border-primary dark:hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-200
```
改為：
```
group relative bg-[var(--aw-color-bg-page)] dark:bg-[rgba(30,26,22,0.6)] border border-[var(--aw-color-border)] rounded-2xl p-6 hover:border-primary dark:hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-200
```

將 `<h3>` 的 class 從：
```
text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors
```
改為：
```
text-[#1C1917] dark:text-[#E8E0D8] mb-2 group-hover:text-primary transition-colors
```

將 summary `<p>` 的 class 從：
```
text-gray-600 dark:text-slate-400 mb-4 leading-relaxed
```
改為：
```
text-[#78716C] dark:text-[#A09590] mb-4 leading-relaxed
```

將 GitHub `<a>` 的 class 從：
```
text-gray-400 dark:text-slate-500 hover:text-primary transition-colors
```
改為：
```
text-[#A09590] dark:text-[#6B6460] hover:text-primary transition-colors
```

- [ ] **Step 2: 更新 MetricBlock.astro**

將 `<div>` 外層 class 從：
```
bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 text-center my-8
```
改為：
```
bg-[var(--aw-color-bg-page)] dark:bg-[rgba(30,26,22,0.6)] border border-[var(--aw-color-border)] rounded-2xl p-8 text-center my-8
```

將 label `<p>` 的 class 從：
```
text-gray-500 dark:text-slate-400 mb-4
```
改為：
```
text-[#78716C] dark:text-[#A09590] mb-4
```

將進度條軌道 `<div>` 的 class 從：
```
w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-6 overflow-hidden
```
改為：
```
w-full bg-[rgba(80,60,40,0.1)] dark:bg-[rgba(255,240,220,0.1)] rounded-full h-2 mb-6 overflow-hidden
```

將 metric 數字 `<p>` 的 class 從：
```
text-gray-900 dark:text-white
```
改為：
```
text-[#1C1917] dark:text-[#E8E0D8]
```

- [ ] **Step 3: 視覺確認首頁卡片**

確認 `http://localhost:4321`：
- 卡片背景在淺色模式為微暖白
- 卡片邊框為暖棕（非冷灰）
- 深色模式卡片為暖炭色（非冷藍 slate）

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.astro src/components/MetricBlock.astro
git commit -m "style: update ProjectCard and MetricBlock to warm palette"
```

---

## Task 5: 更新 index.astro

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: 更新 tech strip section**

將 `<section class="py-4 border-b ...">` 的 class 從：
```
py-4 border-b border-gray-100 dark:border-slate-800/50
```
改為：
```
py-4 border-b border-[var(--aw-color-border)]
```

將 tech strip 的 `<p>` class 從：
```
text-gray-600 dark:text-slate-300 mb-3
```
改為：
```
text-[#78716C] dark:text-[#A09590] mb-3
```

- [ ] **Step 2: 更新 projects section 標籤文字**

將 `<p class="text-xs font-semibold uppercase ...">` 的 class 從：
```
text-gray-400 dark:text-slate-500 mb-8
```
改為：
```
text-[#A09590] dark:text-[#6B6460] mb-8
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "style: update index page to warm palette"
```

---

## Task 6: 更新 about.astro

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: 替換所有邊框 class（replace_all）**

about.astro 中有大量 `border-gray-100 dark:border-slate-800`，全部替換為 `border-[var(--aw-color-border)]`。

同樣，h2 內的 `border-b border-gray-100 dark:border-slate-800` 也一起換。

- [ ] **Step 2: 更新 h1 文字色**

將 `<h1>` 的 class 從：
```
text-4xl font-bold text-gray-900 dark:text-white mb-4
```
改為：
```
text-4xl font-bold text-[#1C1917] dark:text-[#E8E0D8] mb-4
```

- [ ] **Step 3: 更新所有 h2 文字色**

about.astro 中共四個 `<h2>`，將其 class 中的 `text-gray-900 dark:text-white` 全部替換為 `text-[#1C1917] dark:text-[#E8E0D8]`。

- [ ] **Step 4: 更新段落文字色**

將 `div.space-y-5` 內 `text-gray-600 dark:text-slate-300` 改為 `text-[#78716C] dark:text-[#A09590]`。

- [ ] **Step 5: 更新 timeline 文字色**

將 timeline item 的 `<span>` class 從：
```
text-xs text-gray-500 dark:text-slate-400 pt-0.5 shrink-0
```
改為：
```
text-xs text-[#78716C] dark:text-[#A09590] pt-0.5 shrink-0
```

將 timeline note `<p>` 的 class 從：
```
text-sm text-gray-500 dark:text-slate-400 leading-relaxed
```
改為：
```
text-sm text-[#78716C] dark:text-[#A09590] leading-relaxed
```

將 timeline role `<p>` 的 class 從：
```
font-semibold text-gray-900 dark:text-white
```
改為：
```
font-semibold text-[#1C1917] dark:text-[#E8E0D8]
```

- [ ] **Step 6: 視覺確認 /about 頁**

在瀏覽器開啟 `http://localhost:4321/about`，確認：
- 標題、正文、timeline 文字色均為暖調
- 分隔線為暖棕邊框
- 深淺色模式切換時一致

- [ ] **Step 7: Commit**

```bash
git add src/pages/about.astro
git commit -m "style: update about page to warm palette"
```

---

## Task 7: 更新 projects/[slug].astro

**Files:**
- Modify: `src/pages/projects/[slug].astro`

- [ ] **Step 1: 更新 h1 文字色**

將 `<h1>` 的 class 從：
```
text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3
```
改為：
```
text-2xl md:text-3xl font-bold text-[#1C1917] dark:text-[#E8E0D8] mb-3
```

- [ ] **Step 2: 更新 summary 段落文字色**

將 summary `<p>` 的 class 從：
```
text-lg text-gray-600 dark:text-slate-300 mb-6
```
改為：
```
text-lg text-[#78716C] dark:text-[#A09590] mb-6
```

- [ ] **Step 3: 更新 GitHub / Demo 連結文字色**

將兩個連結 `<a>` 的 class 中 `text-gray-700 dark:text-slate-300` 改為 `text-[#78716C] dark:text-[#A09590]`。

- [ ] **Step 4: 更新 header 分隔線**

將 `<hr>` 的 class 從：
```
border-b border-gray-200 dark:border-slate-700
```
改為：
```
border-b border-[var(--aw-color-border)]
```

- [ ] **Step 5: 更新 prose h2 邊框**

將 prose div 的 class 中：
```
prose-h2:border-gray-200 dark:prose-h2:border-slate-700
```
改為：
```
prose-h2:border-[rgba(80,60,40,0.09)] dark:prose-h2:border-[rgba(255,240,220,0.08)]
```

- [ ] **Step 6: 視覺確認 /projects/[slug] 頁**

在瀏覽器開啟 `http://localhost:4321/projects/aui`，確認：
- 標題、摘要文字為暖調
- 分隔線、prose h2 下線為暖棕
- MetricBlock 卡片為暖調（Task 4 已完成）

- [ ] **Step 7: Commit**

```bash
git add "src/pages/projects/[slug].astro"
git commit -m "style: update project detail page to warm palette"
```

---

## Task 8: 最終 QA 與建構驗證

- [ ] **Step 1: 全頁面視覺 QA**

依序在瀏覽器確認以下頁面，淺色和深色模式各確認一次：

| 頁面 | URL | 確認要點 |
|------|-----|---------|
| 首頁 | `http://localhost:4321/` | Hero 文字、卡片、分隔線 |
| 作品詳頁 | `http://localhost:4321/projects/aui` | prose、MetricBlock、CTA |
| 關於頁 | `http://localhost:4321/about` | timeline、標題、分隔線 |

確認沒有殘留的純白背景、冷灰邊框、或冷藍深色背景。

- [ ] **Step 2: 建構驗證**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build
```

預期：build 成功，無 warning 或 error。

- [ ] **Step 3: 停止 visual companion server（若還在跑）**

```bash
bash /Users/marschen/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.7/skills/brainstorming/scripts/stop-server.sh /Users/marschen/develop/tool/portfolio-website/.superpowers/brainstorm/4037-1777446314
```

- [ ] **Step 4: 確認 .gitignore 包含 .superpowers/**

在 `.gitignore` 中確認有 `.superpowers/` 一行，若無則加入。

- [ ] **Step 5: 最終 commit**

```bash
git add .gitignore
git commit -m "chore: add .superpowers to gitignore"
```
