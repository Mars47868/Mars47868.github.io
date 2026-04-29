# 暖調配色升級設計規格

**日期：** 2026-04-29  
**範圍：** 色彩 token、元件配色  
**狀態：** 待實作

---

## 設計目標

將作品集網站配色從冷調中性升級為暖調，提升質感與人味，與「AI × 流程自動化」定位形成反差（科技工具，但有溫度的人在背後）。不改動版面結構、字型、間距。

---

## 決策紀錄

| 決策 | 選擇 | 理由 |
|------|------|------|
| 背景色調 | 微暖白 | 比純白多溫度，不搶眼 |
| 深色模式 | 暖炭黑 | 和淺色模式同調，切換不割裂 |
| 文字色調 | 暖深棕 / 暖米白 | 整體一致 |
| 主色 | 電藍保留 | 高對比、科技感、辨識度強，未來再評估 |
| TagPill | 不動 | 藍/琥珀與主色仍協調 |

---

## 色彩 Token

### 淺色模式（`:root`）

```css
--aw-color-bg-page:      #FAFAF8;          /* 微暖白（原：#FFFFFF） */
--aw-color-bg-nav:       #F0EDE8;          /* Navbar backdrop */
--aw-color-text-default: #1C1917;          /* 暖深棕（原：rgb(16,16,16)） */
--aw-color-text-muted:   rgba(28,25,23,0.55); /* 暖次要文字 */
--aw-color-border:       rgba(80,60,40,0.09); /* 暖棕邊框（原：#E5E7EB） */
```

### 深色模式（`.dark`）

```css
--aw-color-bg-page:      #141210;              /* 暖炭黑（原：rgb(3,6,32)） */
--aw-color-bg-card:      rgba(30,26,22,0.6);   /* 卡片表面 */
--aw-color-text-default: #E8E0D8;              /* 暖米白（原：rgb(229,236,246)） */
--aw-color-text-muted:   rgba(232,224,216,0.55); /* 暖次要文字 */
--aw-color-border:       rgba(255,240,220,0.08); /* 暖光邊框 */
```

### 保留不動

```css
--color-primary:   rgb(1,97,239);   /* 電藍 #0161EF */
--color-secondary: rgb(1,84,207);
--color-accent:    rgb(109,40,217);
```

---

## 元件異動清單

### `src/styles/global.css`

- 更新 `:root` 和 `.dark` 的色彩變數（見上方 token）
- 新增 `--aw-color-bg-nav`、`--aw-color-bg-card`、`--aw-color-border` 三個新 token

### `src/layouts/BaseLayout.astro`

| 現在 | 改後 |
|------|------|
| `bg-white/90 dark:bg-[rgb(3_6_32)]/90` | `bg-[var(--aw-color-bg-nav)]/90 dark:bg-[#141210]/90` |
| `border-gray-200 dark:border-slate-800` | `border-[var(--aw-color-border)] dark:border-[var(--aw-color-border)]` |
| Footer `border-gray-200 dark:border-slate-800` | 同上 |

### `src/components/ProjectCard.astro`

| 現在 | 改後 |
|------|------|
| `bg-white dark:bg-slate-800/50` | `bg-[var(--aw-color-bg-page)] dark:bg-[rgba(30,26,22,0.6)]` |
| `border-gray-200 dark:border-slate-700` | `border-[var(--aw-color-border)] dark:border-[var(--aw-color-border)]` |
| `text-gray-900 dark:text-white` | `text-[#1C1917] dark:text-[#E8E0D8]` |
| `text-gray-600 dark:text-slate-400` | `text-[#78716C] dark:text-[#A09590]` |
| `text-gray-400 dark:text-slate-500` | `text-[#A09590] dark:text-[#6B6460]` |

### `src/components/CTABlock.astro`

| 現在 | 改後 |
|------|------|
| `border-gray-200 dark:border-slate-800` | `border-[var(--aw-color-border)] dark:border-[var(--aw-color-border)]` |
| `text-gray-900 dark:text-white` | `text-[#1C1917] dark:text-[#E8E0D8]` |

### `src/components/Hero.astro`

| 現在 | 改後 |
|------|------|
| `text-gray-900 dark:text-white` | `text-[#1C1917] dark:text-[#E8E0D8]` |
| `text-gray-600 dark:text-slate-300` | `text-[#78716C] dark:text-[#A09590]` |

### `src/pages/index.astro`

| 現在 | 改後 |
|------|------|
| `border-gray-100 dark:border-slate-800/50` | `border-[var(--aw-color-border)] dark:border-[var(--aw-color-border)]` |
| `text-gray-600 dark:text-slate-300` | `text-[#78716C] dark:text-[#A09590]` |
| `text-gray-400 dark:text-slate-500` | `text-[#A09590] dark:text-[#6B6460]` |

### `src/pages/about.astro` 和 `src/pages/projects/[slug].astro`

- 文字色：`text-gray-*` → 對應暖調色值
- 邊框：`border-gray-*` / `border-slate-*` → `border-[var(--aw-color-border)]`
- 背景：`bg-gray-50` / `bg-slate-800` → 對應暖調色值

---

## 不在範圍內

- 主色 `#0161EF` 及其 hover 色
- TagPill 配色（`bg-blue-100`、`bg-amber-100` 等）
- 版面結構、字型、間距、RWD 行為
- 按鈕圓角、hover 動畫
