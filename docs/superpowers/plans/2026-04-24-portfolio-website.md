# 個人作品集網站實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立個人作品集靜態網站，展示 5 個工具作品，用於求職與接案兩種場合。

**Architecture:** Astro 靜態網站，Content Collections 管理作品資料，深色主題 + 電藍強調色（`#3B82F6`），部署至 Vercel。

**Tech Stack:** Astro 4.x, TypeScript (strict), CSS Variables, Formspree（聯絡表單）, Vercel

---

## 專案位置

建立於：`/Users/marschen/develop/tool/portfolio-website/`

規格文件：`/Users/marschen/Desktop/personal_workspace/side-projects-intro/docs/superpowers/specs/2026-04-24-portfolio-website-design.md`

---

## 檔案結構

```
portfolio-website/
├── src/
│   ├── content/
│   │   ├── config.ts                    # Content Collections schema
│   │   └── projects/
│   │       ├── aui.md
│   │       ├── holiday-orders.md
│   │       ├── quick-medication.md
│   │       ├── stock-dashboard.md
│   │       └── video-notes.md
│   ├── layouts/
│   │   └── BaseLayout.astro             # HTML shell、Nav、Footer、OG meta
│   ├── components/
│   │   ├── Hero.astro                   # 首頁 Hero 區塊
│   │   ├── ProjectCard.astro            # 作品卡片（首頁用）
│   │   ├── MetricBlock.astro            # 成效視覺化（進度條 + 大數字）
│   │   ├── TagPill.astro                # 技術 / 產業標籤 Pill
│   │   └── CTABlock.astro              # 可重用 CTA 區塊
│   ├── pages/
│   │   ├── index.astro                  # 首頁
│   │   ├── projects/
│   │   │   └── [slug].astro             # 動態作品頁
│   │   ├── about.astro
│   │   └── contact.astro
│   └── styles/
│       └── global.css                   # CSS 變數、base reset
├── public/
│   └── images/                          # 截圖、封面圖（手動放入）
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

### Task 1: 初始化 Astro 專案

**Files:**
- Create: `/Users/marschen/develop/tool/portfolio-website/` (new directory)
- Create: `astro.config.mjs`

- [ ] **Step 1: 建立 Astro 專案**

```bash
cd /Users/marschen/develop/tool
npm create astro@latest portfolio-website -- --template minimal --typescript strict --git --install
cd portfolio-website
```

選項若有互動提示，選擇：Template = minimal，TypeScript = strict，Git = yes

- [ ] **Step 2: 啟動 dev server 確認專案正常**

```bash
npm run dev
```

預期：瀏覽器開啟 `http://localhost:4321`，顯示預設 Astro 頁面，無錯誤

- [ ] **Step 3: 設定 astro.config.mjs**

將 `astro.config.mjs` 內容完整替換為：

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://marschen.dev',
});
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: initialize Astro portfolio project"
```

---

### Task 2: 建立全域樣式與設計 Token

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: 建立 `src/styles/global.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --color-bg: #0F172A;
  --color-surface: #1E293B;
  --color-surface-hover: #263349;
  --color-border: #334155;
  --color-text: #F1F5F9;
  --color-text-muted: #94A3B8;
  --color-accent: #3B82F6;
  --color-accent-hover: #2563EB;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --radius: 8px;
  --radius-lg: 12px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
}

body {
  min-height: 100vh;
}

a {
  color: var(--color-accent);
  text-decoration: none;
}

a:hover {
  color: var(--color-accent-hover);
}

h1, h2, h3, h4 {
  line-height: 1.3;
  font-weight: 600;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section {
  padding: 4rem 0;
}
```

- [ ] **Step 2: 確認 build 無錯誤**

```bash
npm run build
```

預期：`dist/` 目錄生成，exit code 0

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add design tokens and global styles"
```

---

### Task 3: 建立 BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: 建立 `src/layouts/BaseLayout.astro`**

```astro
---
import { ViewTransitions } from 'astro:transitions';

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const {
  title,
  description = '我幫你把每天重複做的事，變成自動跑的系統。',
  ogImage = '/og-default.png',
} = Astro.props;

const siteUrl = 'https://marschen.dev';
---
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`${siteUrl}${ogImage}`} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <ViewTransitions />
  </head>
  <body>
    <nav class="nav">
      <div class="container nav__inner">
        <a href="/" class="nav__logo">Mars Chen</a>
        <ul class="nav__links">
          <li><a href="/#projects">作品</a></li>
          <li><a href="/about">關於我</a></li>
          <li><a href="/contact" class="nav__cta">聯絡我</a></li>
        </ul>
      </div>
    </nav>
    <main>
      <slot />
    </main>
    <footer class="footer">
      <div class="container">
        <p>© 2026 Mars Chen · <a href="https://github.com/marschen82" target="_blank" rel="noopener">GitHub</a></p>
      </div>
    </footer>
  </body>
</html>

<style is:global>
  @import '../styles/global.css';

  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--color-border);
  }

  .nav__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  .nav__logo {
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--color-text);
  }

  .nav__links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav__links a {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    transition: color 0.2s;
  }

  .nav__links a:hover {
    color: var(--color-text);
  }

  .nav__cta {
    background-color: var(--color-accent);
    color: var(--color-text) !important;
    padding: 0.4rem 1rem;
    border-radius: var(--radius);
    font-weight: 500;
  }

  .nav__cta:hover {
    background-color: var(--color-accent-hover) !important;
  }

  .footer {
    padding: 2rem 0;
    border-top: 1px solid var(--color-border);
    color: var(--color-text-muted);
    font-size: 0.9rem;
    text-align: center;
  }
</style>
```

- [ ] **Step 2: 更新 `src/pages/index.astro` 使用 BaseLayout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Mars Chen | AI × 流程自動化">
  <p style="padding: 2rem; color: var(--color-text-muted)">首頁建置中</p>
</BaseLayout>
```

- [ ] **Step 3: 啟動 dev server 確認 Nav 與 Footer 正常**

```bash
npm run dev
```

預期：`http://localhost:4321` 顯示深色背景、Nav 有 logo 和三個連結、底部有 Footer

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/pages/index.astro
git commit -m "feat: add BaseLayout with navigation, footer, and View Transitions"
```

---

### Task 4: 定義 Content Collections Schema

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/projects/aui.md`（佔位用）

- [ ] **Step 1: 建立 `src/content/config.ts`**

```typescript
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    industry: z.array(z.string()),
    tech: z.array(z.string()),
    metric: z.string(),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    cover: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { projects };
```

- [ ] **Step 2: 建立佔位檔確認 schema 可解析**

```bash
mkdir -p src/content/projects
```

建立 `src/content/projects/aui.md`：

```markdown
---
title: "庫存表自動生成工具 AUI"
summary: "一行指令，庫存整理從 1 小時縮到 5 分鐘"
industry: ["製造業", "供應鏈"]
tech: ["Python", "CLI"]
metric: "節省 55 分鐘／週"
order: 1
---

佔位內容，Task 8 完整撰寫。
```

- [ ] **Step 3: 驗證 TypeScript 型別正確**

```bash
npm run check
```

預期：`0 errors`

- [ ] **Step 4: Commit**

```bash
git add src/content/
git commit -m "feat: define Content Collections schema for projects"
```

---

### Task 5: 建立可重用元件（TagPill、CTABlock、MetricBlock）

**Files:**
- Create: `src/components/TagPill.astro`
- Create: `src/components/CTABlock.astro`
- Create: `src/components/MetricBlock.astro`

- [ ] **Step 1: 建立 `src/components/TagPill.astro`**

```astro
---
interface Props {
  label: string;
  variant?: 'tech' | 'industry';
}
const { label, variant = 'tech' } = Astro.props;
---
<span class={`tag tag--${variant}`}>{label}</span>

<style>
  .tag {
    display: inline-block;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 500;
    white-space: nowrap;
  }

  .tag--tech {
    background-color: rgba(59, 130, 246, 0.15);
    color: #93C5FD;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }

  .tag--industry {
    background-color: rgba(251, 191, 36, 0.12);
    color: #FCD34D;
    border: 1px solid rgba(251, 191, 36, 0.25);
  }
</style>
```

- [ ] **Step 2: 建立 `src/components/CTABlock.astro`**

```astro
---
interface Props {
  heading: string;
  buttonText: string;
  buttonHref: string;
}
const { heading, buttonText, buttonHref } = Astro.props;
---
<section class="cta-block">
  <p class="cta-block__heading">{heading}</p>
  <a href={buttonHref} class="cta-block__btn">{buttonText}</a>
</section>

<style>
  .cta-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding: 3rem 1.5rem;
    border-top: 1px solid var(--color-border);
    text-align: center;
  }

  .cta-block__heading {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .cta-block__btn {
    display: inline-block;
    background-color: var(--color-accent);
    color: #fff;
    padding: 0.7rem 1.75rem;
    border-radius: var(--radius);
    font-weight: 600;
    transition: background-color 0.2s;
  }

  .cta-block__btn:hover {
    background-color: var(--color-accent-hover);
    color: #fff;
  }
</style>
```

- [ ] **Step 3: 建立 `src/components/MetricBlock.astro`**

```astro
---
interface Props {
  metric: string;
  percentage?: number;
  label?: string;
}
const { metric, percentage = 70, label = '節省作業時間' } = Astro.props;
---
<div class="metric-block">
  <p class="metric-block__label">{label}</p>
  <div class="metric-block__bar">
    <div class="metric-block__fill" style={`width: ${percentage}%`}></div>
  </div>
  <p class="metric-block__value">{metric}</p>
</div>

<style>
  .metric-block {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    text-align: center;
    margin: 2rem 0;
  }

  .metric-block__label {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1rem;
  }

  .metric-block__bar {
    height: 8px;
    background-color: var(--color-border);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 1.25rem;
  }

  .metric-block__fill {
    height: 100%;
    background-color: var(--color-accent);
    border-radius: 999px;
  }

  .metric-block__value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text);
  }
</style>
```

- [ ] **Step 4: 驗證 TypeScript 型別**

```bash
npm run check
```

預期：`0 errors`

- [ ] **Step 5: Commit**

```bash
git add src/components/TagPill.astro src/components/CTABlock.astro src/components/MetricBlock.astro
git commit -m "feat: add TagPill, CTABlock, MetricBlock shared components"
```

---

### Task 6: 建立首頁（Hero + ProjectCard + 完整首頁）

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ProjectCard.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: 建立 `src/components/Hero.astro`**

```astro
---
const techStack = ['Java 後端', 'Python', 'AI 整合', '流程自動化'];
---
<section class="hero">
  <div class="container hero__inner">
    <p class="hero__eyebrow">AI × 流程自動化</p>
    <h1 class="hero__title">
      我幫你把每天重複做的事，<br />
      <span class="hero__accent">變成自動跑的系統。</span>
    </h1>
    <p class="hero__sub">
      {techStack.join(' × ')}
    </p>
    <div class="hero__actions">
      <a href="#projects" class="btn btn--primary">看作品</a>
      <a href="/contact" class="btn btn--outline">聯絡我</a>
    </div>
  </div>
</section>

<style>
  .hero {
    padding: 6rem 0 4rem;
  }

  .hero__inner {
    max-width: 700px;
  }

  .hero__eyebrow {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
  }

  .hero__title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .hero__accent {
    color: var(--color-accent);
  }

  .hero__sub {
    color: var(--color-text-muted);
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }

  .hero__actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-block;
    padding: 0.7rem 1.75rem;
    border-radius: var(--radius);
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.2s;
  }

  .btn--primary {
    background-color: var(--color-accent);
    color: #fff;
  }

  .btn--primary:hover {
    background-color: var(--color-accent-hover);
    color: #fff;
  }

  .btn--outline {
    border: 1.5px solid var(--color-border);
    color: var(--color-text);
  }

  .btn--outline:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
</style>
```

- [ ] **Step 2: 建立 `src/components/ProjectCard.astro`**

```astro
---
import TagPill from './TagPill.astro';

interface Props {
  title: string;
  summary: string;
  metric: string;
  industry: string[];
  tech: string[];
  slug: string;
  github?: string;
}

const { title, summary, metric, industry, tech, slug, github } = Astro.props;
---
<article class="card">
  <a href={`/projects/${slug}`} class="card__link">
    <p class="card__metric">{metric}</p>
    <h3 class="card__title">{title}</h3>
    <p class="card__summary">{summary}</p>
    <div class="card__tags">
      {industry.map(i => <TagPill label={i} variant="industry" />)}
      {tech.map(t => <TagPill label={t} variant="tech" />)}
    </div>
  </a>
  {github && (
    <a href={github} target="_blank" rel="noopener" class="card__github" aria-label="GitHub">
      GitHub →
    </a>
  )}
</article>

<style>
  .card {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    transition: border-color 0.2s, transform 0.2s;
    position: relative;
  }

  .card:hover {
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }

  .card__link {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  .card__metric {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-accent);
    margin-bottom: 0.4rem;
  }

  .card__title {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }

  .card__summary {
    font-size: 0.88rem;
    color: var(--color-text-muted);
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .card__github {
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    font-size: 0.8rem;
    color: var(--color-text-muted);
    transition: color 0.2s;
  }

  .card__github:hover {
    color: var(--color-accent);
  }
</style>
```

- [ ] **Step 3: 更新 `src/pages/index.astro` 為完整首頁**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import ProjectCard from '../components/ProjectCard.astro';
import TagPill from '../components/TagPill.astro';
import CTABlock from '../components/CTABlock.astro';

const projects = await getCollection('projects');
const sorted = projects.sort((a, b) => a.data.order - b.data.order);

const globalTech = ['Python', 'Java', 'Google Apps Script', 'Excel VBA', 'AI 整合', 'Spring Boot'];
---
<BaseLayout title="Mars Chen | AI × 流程自動化">
  <Hero />

  <section class="value-line container">
    <p>用程式解決真實生活中的重複作業——從製造業庫存到醫療診所，從個人投資到內容創作。</p>
  </section>

  <section class="tech-strip container">
    {globalTech.map(t => <TagPill label={t} variant="tech" />)}
  </section>

  <section class="section" id="projects">
    <div class="container">
      <p class="section-label">作品</p>
      <div class="projects-grid">
        {sorted.map(p => (
          <ProjectCard
            title={p.data.title}
            summary={p.data.summary}
            metric={p.data.metric}
            industry={p.data.industry}
            tech={p.data.tech}
            slug={p.slug}
            github={p.data.github}
          />
        ))}
      </div>
    </div>
  </section>

  <CTABlock
    heading="有類似需求？30 分鐘免費聊"
    buttonText="聯絡我"
    buttonHref="/contact"
  />
</BaseLayout>

<style>
  .value-line {
    padding: 1.5rem 0 0;
    color: var(--color-text-muted);
    font-size: 1rem;
    max-width: 680px;
  }

  .tech-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1.5rem 0 2rem;
  }

  .section-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 1.75rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
</style>
```

- [ ] **Step 4: 確認首頁完整顯示**

```bash
npm run dev
```

確認：Hero 顯示定位句和兩個按鈕、技術標籤列、作品格狀卡片、底部 CTA

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro src/components/ProjectCard.astro src/pages/index.astro
git commit -m "feat: build homepage with Hero, project cards, and CTA"
```

---

### Task 7: 建立作品詳細頁模板

**Files:**
- Create: `src/pages/projects/[slug].astro`

- [ ] **Step 1: 建立 `src/pages/projects/[slug].astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import TagPill from '../../components/TagPill.astro';
import MetricBlock from '../../components/MetricBlock.astro';
import CTABlock from '../../components/CTABlock.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map(p => ({
    params: { slug: p.slug },
    props: { project: p },
  }));
}

const { project } = Astro.props;
const { Content } = await project.render();
const { title, summary, industry, tech, metric, github, demo } = project.data;
---
<BaseLayout title={`${title} | Mars Chen`} description={summary}>
  <article class="project container">

    <header class="project__header">
      <p class="project__metric">{metric}</p>
      <h1 class="project__title">{title}</h1>
      <p class="project__summary">{summary}</p>
      <div class="project__tags">
        {industry.map(i => <TagPill label={i} variant="industry" />)}
        {tech.map(t => <TagPill label={t} variant="tech" />)}
      </div>
      {(github || demo) && (
        <div class="project__links">
          {github && <a href={github} target="_blank" rel="noopener" class="link-btn">GitHub →</a>}
          {demo && <a href={demo} target="_blank" rel="noopener" class="link-btn">Demo →</a>}
        </div>
      )}
    </header>

    <div class="prose">
      <Content />
    </div>

    <MetricBlock metric={metric} percentage={75} label="節省作業時間" />

  </article>

  <CTABlock
    heading="有類似需求？找我談談"
    buttonText="聯絡我"
    buttonHref="/contact"
  />
</BaseLayout>

<style>
  .project {
    padding: 3rem 0;
    max-width: 800px;
  }

  .project__header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
  }

  .project__metric {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-accent);
    margin-bottom: 0.5rem;
  }

  .project__title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .project__summary {
    font-size: 1.1rem;
    color: var(--color-text-muted);
    margin-bottom: 1.25rem;
    line-height: 1.6;
  }

  .project__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .project__links {
    display: flex;
    gap: 1.25rem;
    margin-top: 0.75rem;
  }

  .link-btn {
    font-size: 0.9rem;
    color: var(--color-accent);
    font-weight: 500;
  }

  .prose {
    color: var(--color-text);
    line-height: 1.8;
    margin-bottom: 2rem;
  }

  .prose :global(h2) {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 2.5rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-border);
  }

  .prose :global(p) {
    margin-bottom: 1rem;
  }

  .prose :global(ul),
  .prose :global(ol) {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  .prose :global(li) {
    margin-bottom: 0.4rem;
  }

  .prose :global(img) {
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
    margin: 1.5rem 0;
  }

  .prose :global(code) {
    background-color: var(--color-surface);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-size: 0.88em;
  }
</style>
```

- [ ] **Step 2: 確認路由正常**

```bash
npm run dev
```

瀏覽 `http://localhost:4321/projects/aui`，確認頁面顯示佔位內容、成效數字區塊、底部 CTA

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects/[slug].astro
git commit -m "feat: add dynamic project detail page with MetricBlock and CTA"
```

---

### Task 8: 撰寫 5 個作品的完整 Markdown 內容

參考素材：`/Users/marschen/Desktop/personal_workspace/side-projects-intro/工具彙整.md`

**Files:**
- Modify: `src/content/projects/aui.md`
- Create: `src/content/projects/holiday-orders.md`
- Create: `src/content/projects/quick-medication.md`
- Create: `src/content/projects/stock-dashboard.md`
- Create: `src/content/projects/video-notes.md`

- [ ] **Step 1: 完成 `src/content/projects/aui.md`**

```markdown
---
title: "庫存表自動生成工具 AUI"
summary: "一行指令，庫存整理從 1 小時縮到 5 分鐘"
industry: ["製造業", "供應鏈"]
tech: ["Python", "CLI"]
metric: "節省 55 分鐘／週"
order: 1
---

## 問題背景

在亞果元素任職期間，每週整理庫存表是固定任務——從多個來源手動彙整數據、格式化、確認正確性，光是這件事每次就要花上一個小時以上，還容易出錯。

當我開始學習程式設計，這件事馬上成為第一個想解決的目標。

## 解決方案

開發一個 Python CLI 工具，只需在終端機執行一行指令，工具會自動讀取原始數據、依照規則整理格式、輸出可直接用於庫存會議的報表。

整個流程從「打開電腦開始手動整理」變成「執行指令、等待數秒、完成」。

## 技術決策

選擇 Python 是因為它的資料處理生態（pandas）成熟，且 CLI 工具的開發門檻低。考慮過用 Excel VBA，但 Python 更便於日後擴充邏輯與版本控制，也能在 CI 環境中執行。

## 挑戰與踩坑

原始數據格式不統一——不同來源的欄位命名、日期格式都不同。最終選擇在工具中定義明確的欄位映射規則，並加入基本的格式驗證，確保輸出結果可靠，不需要人工再確認一遍。
```

- [ ] **Step 2: 建立 `src/content/projects/holiday-orders.md`**

```markdown
---
title: "年節訂單報表彙整"
summary: "POS 機 raw data 一鍵轉成餐廳可用的年菜訂購報表"
industry: ["餐飲業"]
tech: ["Excel VBA"]
metric: "手動作業時間減少 80%"
order: 2
---

## 問題背景

親戚在餐廳負責行政工作，每到農曆年節前夕就是她的地獄時期：客人手寫三聯單訂購年菜 → key in 到 POS 機 → 再從三聯單逐筆 key 到 Excel 統計訂購量。整個流程耗時費力，還容易漏單、算錯。

## 解決方案

直接在 Excel 裡用 VBA 撰寫巨集：從 POS 機匯出 CSV 原始資料後，執行巨集即可自動清洗資料、分類統計、產出餐廳人員看得懂的訂購量總表。

免安裝任何軟體，員工只需要會按一個按鈕。

## 技術決策

選擇 Excel VBA 而非獨立程式，是因為餐廳環境下推廣門檻極低——大家都有 Excel，不需要任何安裝或技術說明。對這個需求來說，VBA 的能力完全足夠，沒有必要引入更複雜的工具。

## 挑戰與踩坑

POS 機匯出的 CSV 欄位格式在不同日期有微小差異。最終在巨集中加入欄位自動偵測邏輯，確保即使欄位順序改變也能正確解析，降低未來維護成本。
```

- [ ] **Step 3: 建立 `src/content/projects/quick-medication.md`**

```markdown
---
title: "快速用藥查詢工具"
summary: "診所醫師的個人專屬用藥組合查詢介面"
industry: ["醫療診所"]
tech: ["Google Apps Script", "Google Sheets"]
metric: "查詢時間從 2 分鐘縮到 10 秒"
order: 3
---

## 問題背景

朋友在診所擔任醫師，現有的醫療系統雖然支援設定「快速用藥組合」，但這些設定是所有醫師共用的，無法建立個人專屬組合。她需要一個私人工具，能根據症狀或疾病快速找到自己習慣的用藥組合，且不會被其他同事看到。

## 解決方案

用 Google Apps Script 建立一個前端查詢介面，原始用藥資料存在 Google Sheets 中。醫師可以透過症狀關鍵字快速搜尋，找出對應的用藥組合與劑量建議。

整個工具無需安裝，用瀏覽器即可開啟，資料更新也只需直接編輯 Google Sheets。

## 技術決策

選擇 Google Apps Script 是因為它與 Google Sheets 的整合零摩擦，透過 Web App URL 即可存取，完全不需要後端伺服器或額外費用，且醫師本人就能自行維護資料。

## 挑戰與踩坑

這個工具目前仍是原型階段，尚未在真實看診環境中部署使用。主要考量是醫療資料的正確性責任——工具定位為輔助查詢，最終用藥決策仍由醫師判斷，因此介面上加入了明確的免責說明。
```

- [ ] **Step 4: 建立 `src/content/projects/stock-dashboard.md`**

```markdown
---
title: "股票監控台"
summary: "整合多家券商，即時掌握持倉成本與損益"
industry: ["個人財務"]
tech: ["Google Apps Script", "Google Sheets"]
metric: "資產盤點時間從 30 分鐘縮到 2 分鐘"
order: 4
---

## 問題背景

平時會幫家人透過不同券商購買美股，同時持有多個帳戶的股票。每次想了解目前的總投入成本、持有標的、整體損益，都需要分別登入不同券商查詢，再手動彙整計算，非常耗時且容易算錯。

## 解決方案

建立一個雲端監控台：將每筆交易紀錄手動輸入 Google Sheets，Apps Script 自動計算各標的的平均成本、當前損益、報酬率，並在 Dashboard 頁面統整顯示。

部署後隨時透過瀏覽器即可查看最新的資產狀況，不需要登入任何券商平台。

## 技術決策

選擇 Google Sheets + Apps Script 是因為交易紀錄本來就適合用試算表管理，且 Apps Script 可以直接讀取 Sheets 資料做計算，不需要額外的資料庫或後端部署成本。透過 `GOOGLEFINANCE()` 函式取得即時報價。

## 挑戰與踩坑

美股報價透過 `GOOGLEFINANCE()` 取得有 15-20 分鐘延遲，這對即時交易決策不夠用。目前定位為「持倉參考」工具，不作為交易依據，在介面上清楚標示延遲說明。
```

- [ ] **Step 5: 建立 `src/content/projects/video-notes.md`**

```markdown
---
title: "影片轉錄與摘要工具"
summary: "自動將醫學影片或 Podcast 轉成筆記，推播到 Line"
industry: ["醫美教育", "內容創作"]
tech: ["Python", "Whisper", "AI"]
metric: "每天節省 40 分鐘整理時間"
order: 5
---

## 問題背景

起初是為了朋友：她需要上大量美容醫學課程，但課程只有影片，沒有文字紀錄，事後很難複習。後來我自己也開始想把 Podcast 內容轉成文字——沒時間完整聽節目，但想掌握重點。

## 解決方案

用 OpenAI Whisper 對影片或音檔進行語音辨識，產出逐字稿；再透過 AI 對逐字稿進行校正與摘要，最終產出結構化的學習筆記。

後來進一步延伸：自動將摘要轉成圖片格式，透過 Line Notify 推播到 Line 群組，讓家人朋友也能輕鬆接收，不需要自己去找節目。

## 技術決策

Whisper 是目前開源語音辨識中中文準確率最高的選項，本地運行不需要 API 費用。AI 摘要選用 Claude API，中文摘要品質與語意理解優於其他選項。圖片生成使用 Pillow 套件，Line 推播透過 Line Notify API。

## 挑戰與踩坑

長影片（超過 1 小時）的處理時間過長，解法是先將音訊切成數段再批次處理，最後合併逐字稿。另外醫美術語（如藥物學名）辨識準確率較低，目前採人工校對作為後備機制。
```

- [ ] **Step 6: 確認所有作品頁面正常 build**

```bash
npm run build
```

預期：`dist/projects/` 底下有 5 個 HTML 檔案，無錯誤

- [ ] **Step 7: Commit**

```bash
git add src/content/projects/
git commit -m "feat: add complete content for all 5 project case studies"
```

---

### Task 9: 建立 About 頁面

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: 建立 `src/pages/about.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import TagPill from '../components/TagPill.astro';
import CTABlock from '../components/CTABlock.astro';

const techTags = [
  'Java', 'Spring Boot', 'Python', 'Google Apps Script',
  'Excel VBA', 'React', 'Vue', 'Docker', 'MySQL', 'Redis', 'AI 整合',
];

const timeline = [
  {
    period: '2025/8 — 至今',
    role: '全端工程師',
    company: '双引資訊',
    note: '負責銀行官網基金申辦系統、信託後台管理系統；學到：金融業場景下的嚴謹性與跨系統整合實務',
  },
  {
    period: '2024/8 — 2025/6',
    role: '後端工程師',
    company: '送子鳥診所',
    note: '用 Spring Boot 開發醫療 RESTful API，導入 RabbitMQ 事件驅動架構；學到：在醫療場景設計可靠的非同步系統',
  },
  {
    period: '2023/3 — 2024/6',
    role: 'Java 工程師',
    company: '現觀科技',
    note: '負責行動網路定位平台模組開發；學到：用 R-Tree 資料結構優化模組效能，處理時間減少 50% 以上',
  },
  {
    period: '2022/8 — 2023/1',
    role: '學員',
    company: '緯育 TibaMe Java 技術養成班',
    note: '從零建立軟體工程基礎；確認自己真的想走這條路之後，辭職報名了這個課程',
  },
  {
    period: '2022/5 — 2022/8',
    role: '軟體專案經理',
    company: '友訊科技',
    note: '學到：PM 能看清楚需求，但做不出東西——這讓我更確定要成為工程師',
  },
  {
    period: '2019/10 — 2022/5',
    role: 'Product Manager',
    company: '亞果元素',
    note: '負責核心產品線（佔公司營收 40%），2021 年主導 8 項新產品上市，營收成長 35%；學到：如何從業務角度定義問題',
  },
];
---
<BaseLayout title="關於我 | Mars Chen" description="從 PM 到工程師的轉變故事，以及為什麼這讓我比純工程師更懂你的問題。">
  <div class="about container">

    <section class="about__intro section">
      <h1 class="about__name">Mars Chen</h1>
      <p class="about__tagline">我幫懂業務但不懂技術的人，把重複的工作變成自動化系統。</p>
      <p class="about__bio">
        我同時理解「問題的業務面」和「解法的技術面」——這是大多數純工程師或純業務人員做不到的事。
        在成為工程師之前，我在科技公司擔任 Product Manager，負責管理佔公司營收 40% 的核心產品線。
        那段經歷讓我看到大量可以被自動化的流程，也讓我決定親手去解決它們。
      </p>
    </section>

    <section class="about__story section">
      <h2>為什麼從 PM 變成工程師</h2>
      <p>
        在亞果元素當 PM 的後期，我開始感覺到一種瓶頸：我能清楚看到問題在哪，
        也能定義解決方案，但我沒辦法親手把它做出來。每次需要請工程師開發一個工具，
        從提需求到上線，往往要等好幾個月。
      </p>
      <p>
        我沒有直接報名程式課程，而是先轉職成軟體 PM，想先近距離觀察工程師的工作方式。
        進入友訊不到三個月，我就確定了：我要成為那個能親手解決問題的人。
        下定決心後，我辭職、報名了半年的 Java 養成班，從零開始。
      </p>
      <p>
        找出問題、優化流程、提高效率——這件事在我當 PM 時就讓我有成就感，
        成為工程師之後，我終於能親手把解法做出來。
        這頁上的每一個作品，都是這個組合的產物。
      </p>
    </section>

    <section class="about__timeline section">
      <h2>工作經歷</h2>
      <div class="timeline">
        {timeline.map(item => (
          <div class="timeline__item">
            <p class="timeline__period">{item.period}</p>
            <div class="timeline__content">
              <p class="timeline__role">{item.role}</p>
              <p class="timeline__company">{item.company}</p>
              <p class="timeline__note">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section class="about__skills section">
      <h2>技術能力</h2>
      <div class="skills-tags">
        {techTags.map(tag => <TagPill label={tag} variant="tech" />)}
      </div>
    </section>

  </div>

  <CTABlock
    heading="想找一個懂業務也懂技術的人？"
    buttonText="和我聊聊"
    buttonHref="/contact"
  />
</BaseLayout>

<style>
  .about {
    max-width: 800px;
  }

  .about__name {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .about__tagline {
    font-size: 1.15rem;
    color: var(--color-accent);
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  .about__bio {
    color: var(--color-text-muted);
    line-height: 1.8;
    font-size: 1rem;
  }

  .about__story h2,
  .about__timeline h2,
  .about__skills h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-border);
  }

  .about__story p {
    color: var(--color-text);
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .timeline__item {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 1.5rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  .timeline__item:last-child {
    border-bottom: none;
  }

  .timeline__period {
    font-size: 0.82rem;
    color: var(--color-text-muted);
    padding-top: 0.15rem;
    line-height: 1.5;
  }

  .timeline__role {
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 0.2rem;
  }

  .timeline__company {
    font-size: 0.88rem;
    color: var(--color-accent);
    margin-bottom: 0.5rem;
  }

  .timeline__note {
    font-size: 0.86rem;
    color: var(--color-text-muted);
    line-height: 1.6;
  }

  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
```

- [ ] **Step 2: 確認頁面顯示正常**

```bash
npm run dev
```

瀏覽 `http://localhost:4321/about`，確認：自我介紹、轉職故事三段、時間軸 6 筆、技術標籤、底部 CTA 全部正常

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add About page with career narrative and timeline"
```

---

### Task 10: 建立 Contact 頁面

**Files:**
- Create: `src/pages/contact.astro`

> **前置步驟：** 到 [formspree.io](https://formspree.io) 免費註冊，建立新表單，取得 Form ID（格式為 `xxxxxabc`）。將下方 `YOUR_FORM_ID` 替換為實際 ID。

- [ ] **Step 1: 建立 `src/pages/contact.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="聯絡我 | Mars Chen" description="告訴我你的問題，我來評估能不能幫你。">
  <section class="contact container">
    <h1 class="contact__title">聯絡我</h1>
    <p class="contact__desc">告訴我你的問題，我來評估能不能幫你。</p>

    <form
      class="contact__form"
      action="https://formspree.io/f/YOUR_FORM_ID"
      method="POST"
    >
      <div class="form-group">
        <label for="name">姓名</label>
        <input type="text" id="name" name="name" required placeholder="你的名字" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required placeholder="your@email.com" />
      </div>
      <div class="form-group">
        <label for="message">需求描述</label>
        <textarea id="message" name="message" rows="5" required placeholder="簡單說說你想解決的問題..."></textarea>
      </div>
      <button type="submit" class="submit-btn">送出</button>
    </form>

    <p class="contact__alt">
      或直接寄信到 <a href="mailto:marschen82@gmail.com">marschen82@gmail.com</a>
    </p>
  </section>
</BaseLayout>

<style>
  .contact {
    max-width: 560px;
    padding: 4rem 0;
  }

  .contact__title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .contact__desc {
    color: var(--color-text-muted);
    margin-bottom: 2.5rem;
    font-size: 1rem;
  }

  .contact__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-group label {
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  .form-group input,
  .form-group textarea {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: 0.95rem;
    padding: 0.65rem 0.9rem;
    transition: border-color 0.2s;
    outline: none;
    resize: vertical;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: var(--color-accent);
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: var(--color-border);
  }

  .submit-btn {
    background-color: var(--color-accent);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    align-self: flex-start;
  }

  .submit-btn:hover {
    background-color: var(--color-accent-hover);
  }

  .contact__alt {
    margin-top: 2rem;
    font-size: 0.88rem;
    color: var(--color-text-muted);
  }
</style>
```

- [ ] **Step 2: 確認表單顯示正常**

```bash
npm run dev
```

瀏覽 `http://localhost:4321/contact`，確認三個欄位、送出按鈕、備用 email 文字正常顯示

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add Contact page with Formspree form"
```

---

### Task 11: 最終 Build 驗證與部署

- [ ] **Step 1: 完整 build 確認無錯誤**

```bash
npm run build
```

預期：
- `dist/` 目錄包含 `index.html`、`projects/aui/index.html`、`projects/holiday-orders/index.html`、`projects/quick-medication/index.html`、`projects/stock-dashboard/index.html`、`projects/video-notes/index.html`、`about/index.html`、`contact/index.html`
- 無 TypeScript 錯誤、無 build 錯誤

- [ ] **Step 2: TypeScript 型別完整檢查**

```bash
npm run check
```

預期：`0 errors`

- [ ] **Step 3: 推送到 GitHub**

先在 GitHub 建立新 repo `portfolio-website`，然後：

```bash
git remote add origin https://github.com/marschen82/portfolio-website.git
git branch -M main
git push -u origin main
```

- [ ] **Step 4: 部署到 Vercel**

1. 前往 [vercel.com](https://vercel.com) 登入（可用 GitHub 帳號）
2. 點擊「Add New Project」→ 選擇 `portfolio-website` repo
3. Framework Preset 自動偵測為 **Astro**（若未偵測，手動選擇）
4. 點擊「Deploy」

預期：部署完成，取得 `portfolio-website.vercel.app` 預覽網址

- [ ] **Step 5: 線上確認所有頁面正常**

瀏覽部署後的網址，逐一確認：
- `/` — Hero、作品卡片、CTA
- `/projects/aui` — 標題、內容四段、MetricBlock、CTA
- `/about` — 故事、時間軸、技術標籤、CTA
- `/contact` — 表單三欄、送出按鈕

- [ ] **Step 6: 更新 astro.config.mjs 的 site URL（若有自訂 domain）**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://marschen.dev',  // 替換成實際 domain
});
```

```bash
git add astro.config.mjs
git commit -m "chore: update production site URL"
git push
```

---

## 自我審查（Spec 覆蓋確認）

| 規格需求 | 對應 Task | 狀態 |
|---------|----------|------|
| 深色主題 + 電藍強調色 | Task 2 global.css | ✅ |
| Hero 定位句 + 兩個按鈕 | Task 6 Hero.astro | ✅ |
| 技術標籤 + 產業標籤 | Task 5 TagPill.astro | ✅ |
| 作品卡片（成效優先） | Task 6 ProjectCard.astro | ✅ |
| 首頁底部 CTA | Task 6 index.astro | ✅ |
| 作品頁 BLUF 成效在前 | Task 7 [slug].astro | ✅ |
| 進度條 + 大數字成效視覺化 | Task 5 MetricBlock.astro | ✅ |
| 作品頁底部 CTA | Task 7 [slug].astro | ✅ |
| 5 個作品完整內容 | Task 8 | ✅ |
| About 轉職敘事型故事 | Task 9 about.astro | ✅ |
| About 時間軸 + 學到什麼 | Task 9 about.astro | ✅ |
| About 底部 CTA | Task 9 about.astro | ✅ |
| Contact 三欄表單 | Task 10 contact.astro | ✅ |
| View Transitions | Task 3 BaseLayout.astro | ✅ |
| OG meta tags | Task 3 BaseLayout.astro | ✅（靜態 OG，動態 OG 為後續優化項） |
| Vercel 部署 | Task 11 | ✅ |
