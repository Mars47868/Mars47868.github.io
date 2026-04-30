# 設計規格：Portfolio Prototype 對齊方案

**版本：** v1.0
**日期：** 2026-04-30
**參考文件：**
- `docs/portfolio-design-guidelines.md`
- `docs/portfolio-prototype.html`

---

## 一、背景與目標

使用者提供新的設計方針（`portfolio-design-guidelines.md`）與手刻 HTML prototype（`portfolio-prototype.html`），目標是讓現有 Astro 專案的視覺與架構對齊這份 prototype，同時保留 Astro + Content Collections 的資料管理優勢。

### 核心決策

| 決策 | 結論 |
|---|---|
| `/projects/[slug]` 個別頁 | **保留**——手風琴是摘要入口，detail 頁展示完整內容與截圖 |
| Dark mode | **移除**——只維護淺色版本，更聚焦內容 |
| `/about` 頁 | **刪除**——內容過於詳細，暴露不必要個人資訊 |
| 樣式策略 | Tailwind 處理結構，Astro scoped `<style>` 處理組件視覺細節 |

---

## 二、頁面架構

### 路由結構

```
/ (index.astro)        ← 全部核心內容（新架構）
/projects/[slug]       ← 保留，視覺重構
/about                 ← 刪除
```

### Index 頁 Section 順序

```
Header（sticky）
  ↓
Hero（名字 + 身份句 + chips）
  ↓
WhyMeBlock（為什麼是我，id="about"）
  ↓
Cases section（手風琴，id="cases"）
  ↓
Toolbox（工具箱，id="skills"）
  ↓
CTABlock（合作，id="contact"）
Footer
```

### Header

- 左側：`陳睿凱 Mars`
- 右側 nav：`關於` `作品` `技術` `合作`（全為錨點連結）
- 移除 dark mode toggle
- 移除 `/about` 頁面連結
- 高度：52px，backdrop blur

### Footer

- 從 icon 社群連結改為純文字 monospace
- 內容：`陳睿凱 · Ruei Kai Chen · 台北 · 2026`
- 聯絡資訊集中至 CTA section，footer 不重複

---

## 三、設計系統

### CSS Variables（`global.css` 全面替換）

```css
:root {
  /* 背景層次 */
  --color-bg:            #FAFAF8;
  --color-bg-secondary:  #F3F2EF;
  --color-bg-tertiary:   #ECEAE5;

  /* 文字層次 */
  --color-text-primary:   #1C1C1A;
  --color-text-secondary: #5F5E5A;
  --color-text-tertiary:  #8F8D88;

  /* 主色與輔色 */
  --color-teal:           #0F6E56;   /* 主色，取代電藍 #0161EF */
  --color-teal-light:     #E1F5EE;
  --color-teal-mid:       #1D9E75;
  --color-amber:          #BA7517;
  --color-amber-light:    #FAEEDA;

  /* 邊框 */
  --color-border:         rgba(28,28,26,0.10);
  --color-border-mid:     rgba(28,28,26,0.18);

  /* Before / Think / After 色塊 */
  --color-before-bg:      #FCEBEB;
  --color-before-text:    #7A2020;
  --color-think-bg:       #EBF3FB;
  --color-think-text:     #1A4A7A;
  --color-after-bg:       #EAF3DE;
  --color-after-text:     #2A5A12;

  /* 字體 */
  --font-serif: 'Noto Serif TC', serif;
  --font-sans:  'Noto Sans TC', sans-serif;
  --font-mono:  'JetBrains Mono', monospace;

  /* 圓角 */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  /* 過渡 */
  --transition: 0.18s ease;
}
```

**移除：**
- `.dark { ... }` 整個 block
- `--aw-color-*` 命名前綴
- Inter Variable 字體 import

### 字體載入（`BaseLayout.astro` `<head>`）

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500&family=Noto+Sans+TC:wght@400;500&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

### Body 預設

```css
font-family: var(--font-sans);
font-size: 15px;
line-height: 1.7;
background: var(--color-bg);
color: var(--color-text-primary);
```

### 版面寬度

- 全站統一 `max-w-[720px]`（從 `max-w-5xl` 縮窄）
- Index 頁單欄，不再有三欄 grid

---

## 四、組件設計

### 保留並改造

#### `BaseLayout.astro`
- Header：新文字、新 nav 錨點、移除 dark toggle 與 /about 連結
- Footer：純 monospace 文字
- `<head>`：換字體 import，移除 dark mode init script

#### `Hero.astro`
- location 行：monospace 小字，`陳睿凱 · Ruei Kai Chen · 台北`
- Headline：serif 體，`我找到流程裡的浪費，然後讓它消失。`，`消失` 套 teal 色
- Sub：15px 說明文字，max-width 520px
- Chips：圓角 100px pills，列出能力維度（後端工程、AI 整合、流程自動化、產品思維、全端開發）
- 移除現有 CTA 按鈕

#### `CTABlock.astro`
- Serif headline：「你有一個重複在做、但覺得『應該可以更好』的流程嗎？」
- Desc：說明文字
- 三個按鈕：`寫信給我`（teal primary）、`LinkedIn →`（secondary）、`GitHub →`（secondary）
- Props 介面調整為接收 email、linkedin、github

#### `TagPill.astro`
- 對齊新色票，保留 `variant` props 介面

### 新增組件

#### `CaseCard.astro`

手風琴卡片，預設收合，點擊展開。

**Header（永遠顯示）：**
- icon（emoji，帶色塊背景）
- problem label（問題類別小字）
- title（案例標題）
- case-tags（tech/industry 標籤，monospace）
- toggle 符號（`+` / `×`，展開時旋轉 45deg + teal 色）

**Body（展開後顯示）：**
- 分隔線
- Journey grid（3 欄）：Before / Think / After 各自色塊
- Result bar（icon + 成效一句話）
- Tech row（技術標籤）
- 「查看完整案例 →」連結到 `/projects/[slug]`

**Props：**
```ts
title: string
problem: string       // 問題類別 label
before: string
think: string
after: string
result: string
tech: string[]
industry: string[]
slug: string
icon?: string
iconBg?: 'green' | 'blue' | 'amber'
defaultOpen?: boolean
```

**互動行為：**
- 同一時間只有一張展開（點擊已開的會收合）
- 展開狀態：border 改為 1px teal

#### `WhyMeBlock.astro`

左側 3px teal 邊框卡片。

**結構：**
- section-label：`為什麼是我`（monospace 小字）
- about-quote：serif，teal 色引言
- about-body：本文 2-3 段，次要文字色

**Props：** 無（內容直接寫在組件內，不從 Content Collections 驅動）

#### `Toolbox.astro`

2 欄技術分類 grid（手機版單欄）。

**分類：**
```
後端 / 系統   → Java, Spring Boot, Redis, RabbitMQ, Docker, MySQL, ClickHouse
AI / 自動化   → Python, OpenAI API, Whisper, LangChain, Line API
前端          → React, Vue, Angular, HTML / CSS
產品 / 流程   → 需求訪談, 流程分析, CI/CD, 敏捷開發, Git
```

**Props：** 無（靜態資料寫在組件內）

### 刪除

| 組件/頁面 | 原因 |
|---|---|
| `MetricBlock.astro` | Prototype 與 guidelines 均不使用進度條設計 |
| `about.astro` | 架構決策移除 |

### `/projects/[slug].astro`（重構視覺）

- 版面寬度改 `max-w-[720px]`
- 移除所有 `dark:` class variants
- 主色全面換 teal
- `MetricBlock` 組件移除後，改用 `metric` frontmatter 欄位直接渲染為 teal 色大字（`font-serif`，36px）

---

## 五、Content Schema 變更

### `content.config.ts` 新增欄位

```ts
before:  z.string(),           // 之前的痛（Before 色塊）
think:   z.string(),           // 我怎麼想（Think 色塊）
after:   z.string(),           // 最後的結果（After 色塊）
result:  z.string(),           // Result bar 一句話成效
icon:    z.string().optional(), // Emoji icon
iconBg:  z.enum(['green', 'blue', 'amber']).optional(),
```

### 移除欄位

- `metricPercentage` — 進度條廢棄
- `metricLabel` — 同上

### 保留欄位

`title`、`summary`、`metric`、`industry`、`tech`、`github`、`demo`、`cover`、`order`

### 5 個 `.md` 檔需補寫

每個作品補 `before`、`think`、`after`、`result` 四個欄位（各約 1–3 句話）。這是手風琴展開後的核心內容，語氣需對齊 design guidelines 的「問題語言」原則。

### Index 頁案例顯示

- 全部作品按 `order` 排序顯示
- 預設第一張展開，其他收合

---

## 六、實作順序建議

1. `global.css` — 換色票、換字體、移除 dark mode
2. `BaseLayout.astro` — header/footer 重構
3. `Hero.astro` — 新文案與 chips 設計
4. `WhyMeBlock.astro` — 新組件
5. `Toolbox.astro` — 新組件
6. `content.config.ts` — schema 更新
7. 5 個 `.md` 檔 — 補寫 before/think/after/result
8. `CaseCard.astro` — 手風琴新組件
9. `index.astro` — 重組所有 section
10. `CTABlock.astro` — 重寫
11. `TagPill.astro` — 色票更新
12. `/projects/[slug].astro` — 視覺重構
13. 刪除 `MetricBlock.astro`、`about.astro`
