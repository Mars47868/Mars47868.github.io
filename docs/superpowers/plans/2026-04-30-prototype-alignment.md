# Prototype Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將現有 Astro 作品集網站的視覺與架構對齊 `docs/portfolio-prototype.html`，包含新色票（深青綠）、新字體（Noto TC）、單頁結構（Hero → 為什麼是我 → Cases 手風琴 → 工具箱 → CTA）。

**Architecture:** 保留 Astro Content Collections 驅動資料；index 頁重組為單頁設計；新增 CaseCard / WhyMeBlock / Toolbox 三個組件；移除 dark mode；移除 /about 頁；/projects/[slug] 保留並視覺重構。

**Tech Stack:** Astro 6, Tailwind CSS v4, Noto Serif TC / Noto Sans TC / JetBrains Mono (Google Fonts)

**Dev command:** `source ~/.nvm/nvm.sh && nvm use 22 && npm run dev`
**Build check:** `source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -5`

---

## File Map

| 操作 | 路徑 |
|---|---|
| Modify | `src/styles/global.css` |
| Modify | `src/layouts/BaseLayout.astro` |
| Modify | `src/components/Hero.astro` |
| Modify | `src/components/CTABlock.astro` |
| Modify | `src/components/TagPill.astro` |
| Modify | `src/content.config.ts` |
| Modify | `src/content/projects/aui.md` |
| Modify | `src/content/projects/holiday-orders.md` |
| Modify | `src/content/projects/quick-medication.md` |
| Modify | `src/content/projects/stock-dashboard.md` |
| Modify | `src/content/projects/video-notes.md` |
| Modify | `src/pages/index.astro` |
| Modify | `src/pages/projects/[slug].astro` |
| Create | `src/components/CaseCard.astro` |
| Create | `src/components/WhyMeBlock.astro` |
| Create | `src/components/Toolbox.astro` |
| Delete | `src/components/MetricBlock.astro` |
| Delete | `src/pages/about.astro` |

---

## Task 1: Design System — global.css

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace global.css with new design system**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-primary:   rgb(15 110 86);
  --color-secondary: rgb(13 95 74);
  --font-family-sans: 'Noto Sans TC', ui-sans-serif, system-ui, sans-serif;
}

@variant dark (&:where(.dark, .dark *));

*, *::before, *::after {
  box-sizing: border-box;
}

:root {
  --color-bg:              #FAFAF8;
  --color-bg-secondary:    #F3F2EF;
  --color-bg-tertiary:     #ECEAE5;
  --color-text-primary:    #1C1C1A;
  --color-text-secondary:  #5F5E5A;
  --color-text-tertiary:   #8F8D88;
  --color-teal:            #0F6E56;
  --color-teal-light:      #E1F5EE;
  --color-teal-mid:        #1D9E75;
  --color-amber:           #BA7517;
  --color-amber-light:     #FAEEDA;
  --color-border:          rgba(28,28,26,0.10);
  --color-border-mid:      rgba(28,28,26,0.18);
  --color-before-bg:       #FCEBEB;
  --color-before-text:     #7A2020;
  --color-think-bg:        #EBF3FB;
  --color-think-text:      #1A4A7A;
  --color-after-bg:        #EAF3DE;
  --color-after-text:      #2A5A12;
  --font-serif:  'Noto Serif TC', serif;
  --font-sans:   'Noto Sans TC', sans-serif;
  --font-mono:   'JetBrains Mono', monospace;
  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   14px;
  --transition:  0.18s ease;

  /* 向後相容別名，讓舊組件在重構前繼續正常 */
  --aw-color-text-default: var(--color-text-primary);
  --aw-color-text-muted:   var(--color-text-secondary);
  --aw-color-bg-page:      var(--color-bg);
  --aw-color-border:       var(--color-border);
}

html {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-size: 15px;
  line-height: 1.7;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a:focus-visible {
  outline: 2px solid var(--color-teal);
  outline-offset: 2px;
  border-radius: 2px;
}

::selection {
  background-color: var(--color-teal-light);
}
```

- [ ] **Step 2: Build check**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -5
```

Expected: build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: replace design system with warm teal palette and Noto fonts"
```

---

## Task 2: BaseLayout — Header, Footer, Google Fonts

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Replace BaseLayout.astro with new version**

```astro
---
import '../styles/global.css';
import { ClientRouter } from 'astro:transitions';

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const {
  title,
  description = '我找到流程裡的浪費，然後讓它消失。',
  ogImage = '/og-default.png',
} = Astro.props;

const siteUrl = 'https://marschen.dev';
---
<!DOCTYPE html>
<html lang="zh-TW" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`${siteUrl}${ogImage}`} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${siteUrl}${Astro.url.pathname}`} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500&family=Noto+Sans+TC:wght@400;500&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
    <ClientRouter />
  </head>
  <body class="antialiased">

    <header style="position:sticky;top:0;z-index:100;background:rgba(250,250,248,0.92);backdrop-filter:blur(10px);border-bottom:0.5px solid var(--color-border);padding:0 2rem;">
      <div style="max-width:720px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:52px;">
        <a href="/" style="font-size:14px;font-weight:500;color:var(--color-text-primary);text-decoration:none;letter-spacing:0.02em;">
          陳睿凱 Mars
        </a>
        <nav aria-label="主要導覽">
          <ul style="display:flex;gap:1.5rem;list-style:none;">
            <li><a href="/#about" style="font-size:13px;color:var(--color-text-secondary);text-decoration:none;">關於</a></li>
            <li><a href="/#cases" style="font-size:13px;color:var(--color-text-secondary);text-decoration:none;">作品</a></li>
            <li><a href="/#skills" style="font-size:13px;color:var(--color-text-secondary);text-decoration:none;">技術</a></li>
            <li><a href="/#contact" style="font-size:13px;color:var(--color-text-secondary);text-decoration:none;">合作</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer style="border-top:0.5px solid var(--color-border);padding:1.5rem 2rem;text-align:center;">
      <div style="max-width:720px;margin:0 auto;font-size:12px;color:var(--color-text-tertiary);font-family:var(--font-mono);">
        陳睿凱 · Ruei Kai Chen · 台北 · 2026
      </div>
    </footer>

  </body>
</html>

<style>
  header a:hover, nav a:hover {
    color: var(--color-teal) !important;
  }
</style>
```

- [ ] **Step 2: Build check**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -5
```

Expected: build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "style: update BaseLayout header/footer, add Google Fonts, remove dark mode"
```

---

## Task 3: Content Schema — Add Accordion Fields

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: Add new fields, keep metricPercentage/metricLabel optional for now**

```ts
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    industry: z.array(z.string()),
    tech: z.array(z.string()),
    metric: z.string(),
    before: z.string(),
    think: z.string(),
    after: z.string(),
    result: z.string(),
    problemLabel: z.string().optional(),
    icon: z.string().optional(),
    iconBg: z.enum(['green', 'blue', 'amber']).optional(),
    github: z.url().optional(),
    demo: z.url().optional(),
    cover: z.string().min(1).optional(),
    order: z.number(),
    metricPercentage: z.number().min(0).max(100).optional(),
    metricLabel: z.string().optional(),
  }),
});

export const collections = { projects };
```

- [ ] **Step 2: Build check (will fail until all md files have new fields)**

This step will show type errors until Task 4 is complete. Note the error message — it should say required fields `before`, `think`, `after`, `result` are missing. That confirms the schema is correct.

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | grep -E "error|Error" | head -5
```

Expected: errors about missing `before`/`think`/`after`/`result` in .md files.

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add before/think/after/result/icon/iconBg fields to project schema"
```

---

## Task 4: Content Files — Add Accordion Frontmatter

**Files:**
- Modify: `src/content/projects/aui.md`
- Modify: `src/content/projects/holiday-orders.md`
- Modify: `src/content/projects/quick-medication.md`
- Modify: `src/content/projects/stock-dashboard.md`
- Modify: `src/content/projects/video-notes.md`

- [ ] **Step 1: Update aui.md frontmatter**

Replace the frontmatter block (between `---` delimiters) with:

```yaml
---
title: "庫存表自動生成工具 AUI"
summary: "一行指令，ERP 三份報表秒變庫存會議用表"
industry: ["製造業", "供應鏈"]
tech: ["Python", "CLI"]
metric: "作業時間從 1 小時縮到 5 分鐘"
before: "每週固定從 ERP 匯出三份格式各異的報表，再逐欄手動比對八個倉別數字，整個流程穩定耗費一小時，還擔心哪個數字算錯、倉別搞混。"
think: "問題的本質是格式轉換加欄位映射——重複且有規則可以被程式化。選 Python 而非 Excel，是因為它可以進 Git 版本控制、打包成 exe 讓同事不需開發環境即可執行。"
after: "一行指令，五分鐘後拿到格式正確、欄位齊全的彙整表，可以直接帶進會議室。Python 打包成 exe，同事不需安裝任何工具就能執行。"
result: "作業時間從 1 小時縮到 5 分鐘——讓 PM 的時間留在分析數字，而不是整理數字"
problemLabel: "重複性人工整理"
icon: "📦"
iconBg: "green"
order: 1
---
```

- [ ] **Step 2: Update holiday-orders.md frontmatter**

```yaml
---
title: "年節訂單報表彙整"
summary: "POS 機 CSV 一鍵匯入，年菜訂購量自動統計完成"
industry: ["餐飲業"]
tech: ["Excel", "VBA"]
metric: "手動作業時間減少 80%"
before: "客人電話訂年菜，服務生手寫三聯單，行政再逐筆 key 進 POS，POS 資料再謄進 Excel——三道工序全程手工，年節旺季整理報表就要花掉半個工作天。"
think: "整個流程其實只有一個真正的資料來源：POS 匯出的 CSV。多餘的步驟來自「資料格式不對，人要去補洞」。用 VBA 直接讀取 CSV 並清洗格式，把三道工序壓成一個按鈕。"
after: "把 CSV 放進資料夾，按一個按鈕，統計表自動完成。格式統一、幾乎零錯誤，人力從整理資料移到使用資料。"
result: "手動整理時間減少 80%——讓行政把時間留給真正需要人判斷的事"
problemLabel: "年節訂單人工彙整"
icon: "📋"
iconBg: "amber"
order: 2
---
```

- [ ] **Step 3: Update quick-medication.md frontmatter**

```yaml
---
title: "快速用藥查詢工具"
summary: "個人專屬的診所用藥組合查詢介面，10 秒找到對應處方"
industry: ["醫療診所"]
tech: ["Google Apps Script", "Google Sheets"]
metric: "查詢時間從 2 分鐘縮到 10 秒"
before: "診所快速用藥清單是全院共用的，自己常開的處方混在所有醫師的設定裡，每次查詢都要翻半天，在看診節奏快的環境下每天累積成可觀的時間壓力。"
think: "問題不是系統不夠好，而是使用者需要「只有自己邏輯」的個人工具。選 Google Apps Script + Sheets：讓醫師自己維護資料、不依賴工程師，也不需要伺服器費用。"
after: "輸入關鍵字立刻找到對應藥品，支援中英文名、成分、代號四種搜尋方式。手機電腦都能開，不需安裝任何程式。"
result: "查詢時間從 2 分鐘縮到 10 秒——讓醫師的注意力留在病患，不是翻清單"
problemLabel: "查詢效率不足"
icon: "💊"
iconBg: "blue"
order: 3
---
```

- [ ] **Step 4: Update stock-dashboard.md frontmatter**

```yaml
---
title: "股票監控台"
summary: "整合多家券商持倉，3 秒看出哪支股票的錢在睡覺"
industry: ["個人財務"]
tech: ["Google Apps Script", "Google Sheets", "Chart.js"]
metric: "資產盤點從 30 分鐘縮到 2 分鐘"
before: "多家券商帳戶分開登入、逐筆記下持倉、手動加總換算台幣——每次想了解整體損益都要花半小時，而且算完仍然看不出哪些資金在有效工作。"
think: "核心問題是「資料分散」加上「缺少比較視角」。把所有帳戶交易記錄整合進同一份 Sheets，前端用持倉熱度排行視覺化漲跌動能，讓「哪支股票的錢在睡覺」一眼可見。"
after: "開啟 Web App，自動讀取記錄、抓取即時股價、計算 FIFO 損益，兩分鐘內看完整體狀況，可依持有人篩選不同帳戶。"
result: "資產盤點從 30 分鐘縮到 2 分鐘——讓投資決策建立在清晰數字上，而不是模糊的記憶"
problemLabel: "資料分散難以綜觀"
icon: "📈"
iconBg: "green"
order: 4
---
```

- [ ] **Step 5: Update video-notes.md frontmatter**

```yaml
---
title: "影片轉錄與摘要工具"
summary: "本地 AI 自動轉錄影片課程，輸出繁體字幕與結構化筆記"
industry: ["醫美教育", "內容創作"]
tech: ["Python", "faster-whisper", "FFmpeg"]
metric: "每天節省 40 分鐘整理時間"
before: "課程影片和 Podcast 沒有任何文字整理，想複習特定知識點只能重新播放影片。Whisper 的中文輸出以簡體為主，對繁體中文使用者閱讀體驗很差，手動整理逐字稿又太耗時。"
think: "謄稿是「人做沒有價值、機器做完全可以」的典型工作。選 faster-whisper（比原版快四倍）加 OpenCC 後處理，讓本地執行直接輸出繁體中文，不需 API 費用，也保護醫療課程的資料隱私。"
after: "把影片拖進工具，自動輸出 .srt 字幕檔與帶時間戳記的 Markdown 筆記。macOS 版雙擊開啟，不需要終端機。"
result: "每天節省 40 分鐘整理時間——讓學習者把精力留在消化內容，不是整理內容"
problemLabel: "影片後製重複流程"
icon: "🎬"
iconBg: "blue"
order: 5
---
```

- [ ] **Step 6: Build check**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -5
```

Expected: build completes without errors.

- [ ] **Step 7: Commit**

```bash
git add src/content/projects/
git commit -m "content: add before/think/after/result accordion fields to all projects"
```

---

## Task 5: TagPill — New Color Scheme

**Files:**
- Modify: `src/components/TagPill.astro`

- [ ] **Step 1: Replace TagPill with new color scheme (no dark classes)**

```astro
---
interface Props {
  label: string;
  variant?: 'tech' | 'industry';
}
const { label, variant = 'tech' } = Astro.props;
---
<span class:list={[
  'tag-pill',
  variant === 'tech' ? 'tag-tech' : 'tag-industry'
]}>
  {label}
</span>

<style>
  .tag-pill {
    display: inline-block;
    font-size: 11px;
    padding: 3px 9px;
    border-radius: 4px;
    white-space: nowrap;
    font-family: var(--font-mono);
  }
  .tag-tech {
    background: var(--color-teal-light);
    color: var(--color-teal);
  }
  .tag-industry {
    background: var(--color-amber-light);
    color: var(--color-amber);
  }
</style>
```

- [ ] **Step 2: Build check**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TagPill.astro
git commit -m "style: update TagPill to teal/amber palette, remove dark mode"
```

---

## Task 6: WhyMeBlock — New Component

**Files:**
- Create: `src/components/WhyMeBlock.astro`

- [ ] **Step 1: Create WhyMeBlock.astro**

```astro
---
// No props — content is fixed for this portfolio
---
<section class="why-section" id="about">
  <p class="section-label">為什麼是我</p>
  <div class="about-block">
    <p class="about-quote">
      「從發現問題，到交付解法，全程不需要翻譯。」
    </p>
    <div class="about-body">
      <p>
        我花了幾年在消費性電子產品的 PM 位置上，然後在某個說不清楚的時刻，
        決定去學寫程式。不是因為有人建議，而是因為我發現：我永遠比工程師
        更想知道「這個功能到底在解決誰的什麼問題」，也永遠比 PM 更想親手
        把解法做出來。
      </p>
      <p>
        這個位置讓我很長一段時間沒有辦法填一個整齊的職稱框框。但它也讓我
        能做到一件很少人能做的事：<strong>聽懂商業問題、轉譯成技術語言、
        再把解法做出來——全程不需要別人翻譯，也不需要別人補洞。</strong>
      </p>
      <p>
        我在乎的不是用了哪些技術，而是那個流程在我介入之前浪費了多少時間，
        以及介入之後，它是不是真的消失了。
      </p>
    </div>
  </div>
</section>

<style>
  .why-section {
    padding: 2.5rem 0;
    border-bottom: 0.5px solid var(--color-border);
  }
  .section-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text-tertiary);
    margin-bottom: 1.4rem;
    font-family: var(--font-mono);
  }
  .about-block {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    padding: 2rem;
    border-left: 3px solid var(--color-teal);
    border-top: 0.5px solid var(--color-border);
    border-right: 0.5px solid var(--color-border);
    border-bottom: 0.5px solid var(--color-border);
  }
  .about-quote {
    font-family: var(--font-serif);
    font-size: 17px;
    color: var(--color-teal);
    margin-bottom: 1.2rem;
    line-height: 1.5;
    letter-spacing: 0.01em;
  }
  .about-body {
    font-size: 15px;
    color: var(--color-text-secondary);
    line-height: 1.8;
  }
  .about-body p + p { margin-top: 1rem; }
  .about-body strong {
    color: var(--color-text-primary);
    font-weight: 500;
  }
</style>
```

- [ ] **Step 2: Build check**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/WhyMeBlock.astro
git commit -m "feat: add WhyMeBlock component"
```

---

## Task 7: Toolbox — New Component

**Files:**
- Create: `src/components/Toolbox.astro`

- [ ] **Step 1: Create Toolbox.astro**

```astro
---
const groups = [
  {
    label: '後端 / 系統',
    items: ['Java', 'Spring Boot', 'Redis', 'RabbitMQ', 'Docker', 'MySQL', 'ClickHouse'],
  },
  {
    label: 'AI / 自動化',
    items: ['Python', 'OpenAI API', 'Whisper', 'LangChain', 'Line API'],
  },
  {
    label: '前端',
    items: ['React', 'Vue', 'Angular', 'HTML / CSS'],
  },
  {
    label: '產品 / 流程',
    items: ['需求訪談', '流程分析', 'CI/CD', '敏捷開發', 'Git'],
  },
];
---
<section class="toolbox-section" id="skills">
  <p class="section-label">工具箱</p>
  <div class="skills-grid">
    {groups.map(group => (
      <div class="skill-group">
        <p class="skill-group-label">{group.label}</p>
        <div class="skill-items">
          {group.items.map(item => (
            <span class="skill-item">{item}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>

<style>
  .toolbox-section {
    padding: 2.5rem 0;
    border-bottom: 0.5px solid var(--color-border);
  }
  .section-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text-tertiary);
    margin-bottom: 1.4rem;
    font-family: var(--font-mono);
  }
  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .skill-group {
    padding: 14px 16px;
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-bg);
  }
  .skill-group-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-tertiary);
    margin-bottom: 10px;
    font-family: var(--font-mono);
  }
  .skill-items { display: flex; flex-wrap: wrap; gap: 5px; }
  .skill-item {
    font-size: 11px;
    color: var(--color-text-secondary);
    padding: 3px 8px;
    background: var(--color-bg-secondary);
    border-radius: 4px;
    font-family: var(--font-mono);
  }
  @media (max-width: 600px) {
    .skills-grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Build check**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Toolbox.astro
git commit -m "feat: add Toolbox component"
```

---

## Task 8: CTABlock — Three-Button Redesign

**Files:**
- Modify: `src/components/CTABlock.astro`

- [ ] **Step 1: Rewrite CTABlock with new interface**

```astro
---
interface Props {
  heading: string;
  desc?: string;
  email: string;
  linkedin?: string;
  github?: string;
}
const { heading, desc, email, linkedin, github } = Astro.props;
---
<section class="cta-section" id="contact">
  <div class="cta-block">
    <h2 class="cta-headline" set:html={heading} />
    {desc && <p class="cta-desc">{desc}</p>}
    <div class="cta-links">
      <a class="cta-btn cta-btn-primary" href={`mailto:${email}`}>
        寫信給我
      </a>
      {linkedin && (
        <a class="cta-btn cta-btn-secondary" href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn →
        </a>
      )}
      {github && (
        <a class="cta-btn cta-btn-secondary" href={github} target="_blank" rel="noopener noreferrer">
          GitHub →
        </a>
      )}
    </div>
  </div>
</section>

<style>
  .cta-section { padding: 2.5rem 0; }
  .cta-block {
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .cta-headline {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 500;
    color: var(--color-text-primary);
    line-height: 1.4;
  }
  .cta-desc {
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.7;
    max-width: 480px;
  }
  .cta-links {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }
  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: all var(--transition);
    cursor: pointer;
  }
  .cta-btn-primary {
    background: var(--color-teal);
    color: white;
    border: 1px solid var(--color-teal);
  }
  .cta-btn-primary:hover { background: #0D5F4A; border-color: #0D5F4A; }
  .cta-btn-secondary {
    background: transparent;
    color: var(--color-text-secondary);
    border: 0.5px solid var(--color-border-mid);
  }
  .cta-btn-secondary:hover {
    border-color: var(--color-teal);
    color: var(--color-teal);
  }
  @media (max-width: 600px) {
    .cta-links { flex-direction: column; }
    .cta-btn { justify-content: center; }
  }
</style>
```

- [ ] **Step 2: Build check — this will show errors from [slug].astro which uses old CTABlock props**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | grep -E "error|Error" | head -10
```

Expected: TypeScript errors about `heading`/`buttonText`/`buttonHref` props in `[slug].astro`. This is expected and will be fixed in Task 12.

- [ ] **Step 3: Commit**

```bash
git add src/components/CTABlock.astro
git commit -m "feat: redesign CTABlock with three-button layout"
```

---

## Task 9: Hero — New Copy & Chips Design

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Rewrite Hero.astro**

```astro
---
const chips = ['後端工程', 'AI 整合', '流程自動化', '產品思維', '全端開發'];
---
<section class="hero">
  <p class="hero-location">陳睿凱 · Ruei Kai Chen · 台北</p>
  <h1 class="hero-headline">
    我找到流程裡的浪費，<br />然後讓它<em>消失</em>。
  </h1>
  <p class="hero-sub">
    橫跨產品管理與後端工程的複合背景，專注於用 AI 與自動化，
    把重複的人工作業變成可以自己跑的系統。
  </p>
  <div class="chips">
    {chips.map(chip => <span class="chip">{chip}</span>)}
  </div>
</section>

<style>
  .hero {
    padding: 4rem 0 3rem;
    border-bottom: 0.5px solid var(--color-border);
  }
  .hero-location {
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-text-tertiary);
    margin-bottom: 1.2rem;
    font-family: var(--font-mono);
  }
  .hero-headline {
    font-family: var(--font-serif);
    font-size: 36px;
    font-weight: 500;
    color: var(--color-text-primary);
    line-height: 1.35;
    margin-bottom: 1.4rem;
    letter-spacing: -0.01em;
  }
  .hero-headline em {
    font-style: normal;
    color: var(--color-teal);
  }
  .hero-sub {
    font-size: 15px;
    color: var(--color-text-secondary);
    line-height: 1.7;
    max-width: 520px;
    margin-bottom: 1.6rem;
  }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    font-size: 12px;
    padding: 5px 12px;
    border-radius: 100px;
    border: 0.5px solid var(--color-border-mid);
    color: var(--color-text-secondary);
    background: var(--color-bg-secondary);
    letter-spacing: 0.01em;
    transition: border-color var(--transition), color var(--transition);
  }
  .chip:hover {
    border-color: var(--color-teal);
    color: var(--color-teal);
  }
  @media (max-width: 600px) {
    .hero { padding: 2.5rem 0 2rem; }
    .hero-headline { font-size: 28px; }
  }
</style>
```

- [ ] **Step 2: Build check**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "style: update Hero with new identity copy and chips design"
```

---

## Task 10: CaseCard — Accordion Component

**Files:**
- Create: `src/components/CaseCard.astro`

- [ ] **Step 1: Create CaseCard.astro**

```astro
---
interface Props {
  title: string;
  problemLabel?: string;
  before: string;
  think: string;
  after: string;
  result: string;
  tech: string[];
  slug: string;
  icon?: string;
  iconBg?: 'green' | 'blue' | 'amber';
  defaultOpen?: boolean;
}

const {
  title, problemLabel, before, think, after, result,
  tech, slug,
  icon = '📦', iconBg = 'green',
  defaultOpen = false,
} = Astro.props;
---

<div class:list={['case-card', { open: defaultOpen }]} data-case-card>
  <div class="case-header" role="button" tabindex="0" aria-expanded={String(defaultOpen)}>
    <div class:list={['case-icon', `icon-${iconBg}`]}>{icon}</div>
    <div class="case-info">
      {problemLabel && <p class="case-problem">問題 · {problemLabel}</p>}
      <p class="case-title">{title}</p>
    </div>
    <span class="case-toggle" aria-hidden="true">+</span>
  </div>
  <div class="case-body">
    <div class="divider"></div>
    <div class="journey">
      <div class="journey-step step-before">
        <p class="step-label label-before">Before · 之前的痛</p>
        <p class="step-text">{before}</p>
      </div>
      <div class="journey-step step-think">
        <p class="step-label label-think">Think · 我怎麼想</p>
        <p class="step-text">{think}</p>
      </div>
      <div class="journey-step step-after">
        <p class="step-label label-after">After · 最後的結果</p>
        <p class="step-text">{after}</p>
      </div>
    </div>
    <div class="result-bar">
      <span class="result-icon">✦</span>
      <p class="result-text"><strong>{result}</strong></p>
    </div>
    <div class="tech-row">
      {tech.map(t => <span class="tech">{t}</span>)}
    </div>
    <a href={`/projects/${slug}`} class="detail-link">查看完整案例 →</a>
  </div>
</div>

<style>
  .case-card {
    background: var(--color-bg);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: border-color var(--transition);
  }
  .case-card:hover { border-color: var(--color-border-mid); }
  .case-card.open { border-color: var(--color-teal); border-width: 1px; }

  .case-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 1.25rem 1.4rem;
    cursor: pointer;
  }
  .case-icon {
    width: 38px;
    height: 38px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .icon-green { background: var(--color-teal-light); }
  .icon-blue  { background: #E6F1FB; }
  .icon-amber { background: var(--color-amber-light); }

  .case-info { flex: 1; min-width: 0; }
  .case-problem {
    font-size: 12px;
    color: var(--color-text-tertiary);
    margin-bottom: 4px;
    letter-spacing: 0.02em;
  }
  .case-title {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text-primary);
    line-height: 1.4;
  }

  .case-toggle {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: var(--color-text-tertiary);
    flex-shrink: 0;
    transition: transform var(--transition), color var(--transition);
    margin-top: 6px;
  }
  .case-card.open .case-toggle {
    transform: rotate(45deg);
    color: var(--color-teal);
  }

  .case-body {
    display: none;
    padding: 0 1.4rem 1.4rem;
  }
  .case-card.open .case-body { display: block; }

  .divider {
    height: 0.5px;
    background: var(--color-border);
    margin-bottom: 1.2rem;
  }

  .journey {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 1.2rem;
  }
  .journey-step { padding: 12px 14px; border-radius: var(--radius-md); }
  .step-before { background: var(--color-before-bg); }
  .step-think  { background: var(--color-think-bg); }
  .step-after  { background: var(--color-after-bg); }

  .step-label {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 7px;
    font-family: var(--font-mono);
  }
  .label-before { color: var(--color-before-text); }
  .label-think  { color: var(--color-think-text); }
  .label-after  { color: var(--color-after-text); }
  .step-text { font-size: 12px; line-height: 1.65; color: var(--color-text-primary); }

  .result-bar {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
    padding: 12px 14px;
    margin-bottom: 1rem;
  }
  .result-icon { font-size: 16px; flex-shrink: 0; margin-top: 2px; }
  .result-text { font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; }
  .result-text strong { color: var(--color-text-primary); font-weight: 500; }

  .tech-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1rem; }
  .tech {
    font-size: 11px;
    padding: 4px 9px;
    border-radius: var(--radius-sm);
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    color: var(--color-text-secondary);
    font-family: var(--font-mono);
  }

  .detail-link {
    font-size: 12px;
    color: var(--color-teal);
    text-decoration: none;
    font-family: var(--font-mono);
    letter-spacing: 0.02em;
  }
  .detail-link:hover { text-decoration: underline; }

  @media (max-width: 600px) {
    .journey { grid-template-columns: 1fr; }
  }
</style>

<script>
  document.addEventListener('astro:page-load', () => {
    document.querySelectorAll('[data-case-card]').forEach(card => {
      const header = card.querySelector('.case-header');
      if (!header) return;
      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');
        document.querySelectorAll('[data-case-card]').forEach(c => {
          c.classList.remove('open');
          c.querySelector('.case-header')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          card.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
        }
      });
      header.addEventListener('keydown', (e: Event) => {
        const ke = e as KeyboardEvent;
        if (ke.key === 'Enter' || ke.key === ' ') {
          ke.preventDefault();
          (header as HTMLElement).click();
        }
      });
    });
  });
</script>
```

- [ ] **Step 2: Build check**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CaseCard.astro
git commit -m "feat: add CaseCard accordion component with Before/Think/After layout"
```

---

## Task 11: Index Page — Full Restructure

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace index.astro with single-page structure**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import WhyMeBlock from '../components/WhyMeBlock.astro';
import CaseCard from '../components/CaseCard.astro';
import Toolbox from '../components/Toolbox.astro';
import CTABlock from '../components/CTABlock.astro';

const projects = await getCollection('projects');
const sorted = [...projects].sort((a, b) => a.data.order - b.data.order);
---
<BaseLayout title="陳睿凱 Mars · 流程自動化工程師">
  <div style="max-width:720px;margin:0 auto;padding:0 2rem 4rem;">

    <Hero />

    <WhyMeBlock />

    <section style="padding:2.5rem 0;border-bottom:0.5px solid var(--color-border);" id="cases">
      <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:1.4rem;font-family:var(--font-mono);">
        我解決過的問題
      </p>
      <div style="display:flex;flex-direction:column;gap:10px;">
        {sorted.map((p, i) => (
          <CaseCard
            title={p.data.title}
            problemLabel={p.data.problemLabel}
            before={p.data.before}
            think={p.data.think}
            after={p.data.after}
            result={p.data.result}
            tech={p.data.tech}
            slug={p.id}
            icon={p.data.icon}
            iconBg={p.data.iconBg}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </section>

    <Toolbox />

    <CTABlock
      heading="你有一個重複在做、<br>但覺得「應該可以更好」的流程嗎？"
      desc="不管是工作上的作業流程、內容產出的繁瑣步驟、還是某個每天消耗你時間的重複動作——我很樂意聽你說說，再想想能不能把它消失掉。"
      email="marschen82@gmail.com"
      linkedin="https://linkedin.com/in/marschen"
      github="https://github.com/marschen82"
    />

  </div>
</BaseLayout>
```

- [ ] **Step 2: Build check**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Start dev server and verify visually**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run dev
```

Open http://localhost:4321. Verify:
- Hero shows serif headline with teal `消失`
- `為什麼是我` section appears below Hero with teal left border
- Cases accordion shows all 5 projects, first one expanded
- Toolbox shows 2-col grid
- CTA shows three buttons

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: restructure index page to single-page layout matching prototype"
```

---

## Task 12: Project Detail Page — Visual Restyle

**Files:**
- Modify: `src/pages/projects/[slug].astro`

- [ ] **Step 1: Rewrite [slug].astro removing dark classes, old CTABlock props, MetricBlock**

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import TagPill from '../../components/TagPill.astro';
import CTABlock from '../../components/CTABlock.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(p => ({
    params: { slug: p.id },
    props: { project: p },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);
const { title, summary, industry, tech, metric, github, demo } = project.data;
---

<BaseLayout title={title} description={summary}>
  <article style="max-width:720px;margin:0 auto;padding:3rem 2rem 4rem;">

    <a href="/" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--color-text-tertiary);text-decoration:none;margin-bottom:2rem;font-family:var(--font-mono);">
      ← 回首頁
    </a>

    <header style="margin-bottom:2rem;">
      <p style="font-family:var(--font-serif);font-size:36px;font-weight:500;color:var(--color-teal);line-height:1.3;margin-bottom:0.75rem;">
        {metric}
      </p>
      <h1 style="font-size:22px;font-weight:500;color:var(--color-text-primary);margin-bottom:0.75rem;line-height:1.4;">
        {title}
      </h1>
      <p style="font-size:15px;color:var(--color-text-secondary);margin-bottom:1.25rem;line-height:1.7;">
        {summary}
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:1.25rem;">
        {industry.map(tag => <TagPill label={tag} variant="industry" />)}
        {tech.map(tag => <TagPill label={tag} variant="tech" />)}
      </div>
      {(github || demo) && (
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:1.25rem;">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
               style="font-size:13px;color:var(--color-text-secondary);text-decoration:none;font-family:var(--font-mono);">
              GitHub →
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer"
               style="font-size:13px;color:var(--color-text-secondary);text-decoration:none;font-family:var(--font-mono);">
              Live Demo →
            </a>
          )}
        </div>
      )}
      <hr style="border:none;border-top:0.5px solid var(--color-border);" />
    </header>

    <div class="prose prose-stone max-w-none
      prose-h2:font-serif prose-h2:text-xl prose-h2:font-medium prose-h2:mt-10 prose-h2:mb-4
      prose-h2:pb-2 prose-h2:border-b prose-h2:border-[rgba(28,28,26,0.10)]
      prose-p:leading-relaxed prose-p:my-4 prose-p:text-[var(--color-text-secondary)]
      prose-li:my-1 prose-li:text-[var(--color-text-secondary)]
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-code:font-mono prose-code:text-sm">
      <Content />
    </div>

  </article>

  <div style="max-width:720px;margin:0 auto;padding:0 2rem;">
    <CTABlock
      heading="有類似需求？找我聊聊"
      desc="如果你也有一個重複在做、感覺可以更好的流程，我很樂意聊聊能不能讓它消失。"
      email="marschen82@gmail.com"
    />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Build check**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -5
```

Expected: build completes without errors.

- [ ] **Step 3: Start dev server, open a project detail page**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run dev
```

Open http://localhost:4321/projects/aui. Verify:
- Metric shows in large teal serif font
- No dark mode artifacts
- Back link to homepage
- CTA shows email-only button

- [ ] **Step 4: Commit**

```bash
git add src/pages/projects/[slug].astro
git commit -m "style: restyle project detail page, remove dark mode and MetricBlock"
```

---

## Task 13: Cleanup — Delete Unused Files & Remove Old Schema Fields

**Files:**
- Delete: `src/components/MetricBlock.astro`
- Delete: `src/pages/about.astro`
- Modify: `src/content.config.ts` (remove metricPercentage/metricLabel)

- [ ] **Step 1: Delete MetricBlock.astro**

```bash
rm src/components/MetricBlock.astro
```

- [ ] **Step 2: Delete about.astro**

```bash
rm src/pages/about.astro
```

- [ ] **Step 3: Remove metricPercentage and metricLabel from content.config.ts**

Replace the schema in `src/content.config.ts` with:

```ts
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    industry: z.array(z.string()),
    tech: z.array(z.string()),
    metric: z.string(),
    before: z.string(),
    think: z.string(),
    after: z.string(),
    result: z.string(),
    problemLabel: z.string().optional(),
    icon: z.string().optional(),
    iconBg: z.enum(['green', 'blue', 'amber']).optional(),
    github: z.url().optional(),
    demo: z.url().optional(),
    cover: z.string().min(1).optional(),
    order: z.number(),
  }),
});

export const collections = { projects };
```

- [ ] **Step 4: Final build check**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run build 2>&1 | tail -10
```

Expected: clean build. No TypeScript errors. Output shows generated pages for `/` and `/projects/[aui|holiday-orders|quick-medication|stock-dashboard|video-notes]`.

- [ ] **Step 5: Visual check — full flow**

```bash
source ~/.nvm/nvm.sh && nvm use 22 && npm run dev
```

Verify:
1. `/` — Hero serif headline visible, chips showing
2. Scroll down — `為什麼是我` with teal left border
3. Cases accordion — click to expand/collapse, only one open at a time
4. Toolbox — 2-col grid
5. CTA — three buttons (email primary, LinkedIn + GitHub secondary)
6. Footer — monospace text only
7. `/projects/aui` — metric in teal serif, content renders, CTA single button
8. Nav links `關於` / `作品` / `技術` / `合作` scroll to correct sections on index

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: remove MetricBlock, about page, and unused schema fields"
```
