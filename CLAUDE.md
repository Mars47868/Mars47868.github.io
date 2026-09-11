# 個人作品集網站專案

## 專案概述

Mars Chen 的個人作品集靜態網站，用於求職與接案兩種場合。
核心定位：**AI × 流程自動化**，展示如何用技術解決真實生活問題。

---

## 技術架構

- **框架：** Astro 6（靜態網站生成器）
- **樣式：** Tailwind CSS v4（設定在 `src/styles/global.css`，無 `tailwind.config.js`）
- **部署：** GitHub Pages（自動部署，push master 即觸發）
- **上線 URL：** https://mars47868.github.io
- **GitHub Repo：** https://github.com/Mars47868/Mars47868.github.io
- **Node.js：** v22（啟動前需 `source ~/.nvm/nvm.sh && nvm use 22`）
- **作品資料：** Astro Content Collections，存放於 `src/content/projects/`
- **Schema 定義：** `src/content.config.ts`（Astro 6 路徑，非 `src/content/config.ts`）

### Astro 6 重要 API

- `render(entry)` 從 `astro:content` 匯入（非 `entry.render()`）
- 作品 slug 使用 `p.id`（非 `p.slug`）
- `ClientRouter` 從 `astro:transitions` 匯入

---

## 開發指令

```bash
# 首次安裝
source ~/.nvm/nvm.sh && nvm use 22
npm install

# 啟動開發伺服器（預設 http://localhost:4321）
npm run dev

# 建構靜態檔案
npm run build

# 預覽建構結果
npm run preview

# 內容後台（Decap CMS 本機模式，需搭配 npm run dev 一起跑）
npm run cms
```

---

## 品牌定位

**Hero 定位句：**
> 「我找到流程裡的浪費，然後讓它消失。」
> Java 後端 × Python × AI 整合 × 流程自動化

**視覺風格：** 雙主題（`html.dark` class 切換，localStorage 記憶 + 系統偏好預設）。淺色＝冷白 `#FBFBFA` × 墨綠 `#0F6E56`；深色＝深炭 `#0C0F13` × 亮綠 `#3DDC97`（墨綠的同色相亮色版）。標題用 Inter/Noto Sans 粗體（緊字距），標籤/眉標用 JetBrains Mono，無襯線字體、不用 serif

---

## 頁面架構

| 路由 | 說明 |
|------|------|
| `/` | 首頁：Hero + 為什麼是我（#about）+ 作品手風琴卡片（#cases）+ 工具箱（#skills）+ CTA（#contact） |
| `/projects/[slug]` | 個別作品 Case Study 頁 |
| `/experience` | 經歷頁：時間軸倒序 + 量化成就 bullets（內容源自 CV）+ 工具箱 + CTA |
| `/admin/` | Decap CMS 內容後台（本機模式：`npm run cms` + `npm run dev`，開 `localhost:4321/admin/index.html`；線上模式未啟用，需 OAuth proxy） |

- 無獨立 `/about`、`/contact` 頁，導覽列為首頁錨點連結 + `/experience`
- 導覽列有「履歷 PDF」按鈕，連到 `/resume.pdf`（來源：`/Users/marschen/Desktop/personal_workspace/CV/cv-source/` 的 `陳睿凱_CV.pdf`，CV 更新後需重新複製）

---

## 作品清單

| slug | 工具名稱 | 產業 | 技術 | order |
|------|---------|------|------|-------|
| `podcast-notes` | Podcast 筆記自動化流程 | 個人知識管理、內容創作 | Python、faster-whisper、GAS、LINE API | 1 |
| `aui` | 庫存表自動生成工具 | 製造業、供應鏈 | Python、CLI | 2 |
| `holiday-orders` | 年節訂單報表彙整 | 餐飲業 | Excel VBA | 3 |
| `quick-medication` | 快速用藥查詢工具 | 醫療診所 | Google Apps Script | 4 |
| `stock-dashboard` | 股票資產監控台 | 個人財務 | GAS、Sheets、Chart.js、Cloudflare Pages | 5 |
| `video-notes` | 影片轉錄與摘要工具 | 內容創作 | Python、faster-whisper、FFmpeg | 6 |
| `maoutseng` | 食品貿易商官網重建 | 食品貿易、B2B | PHP、Laravel 11、MySQL | 7 |
| `portfolio-site` | 個人作品集網站（本站） | 個人品牌 | Astro、GitHub Actions、Decap CMS | 8 |

新增作品時，需同步在 `src/lib/projectIcons.ts` 加入對應 slug 的幾何 SVG icon（stroke-width 1.6、round cap 風格）。

---

## Frontmatter 結構

```yaml
title: ""              # 工具名稱
summary: ""            # 一句話成效（內頁顯示）
industry: []           # 產業標籤陣列
tech: []               # 技術標籤陣列
metric: ""             # 成效數字（內頁大字顯示）
before: ""             # 卡片展開：之前的痛
think: ""              # 卡片展開：我怎麼想
after: ""              # 卡片展開：最後的結果
result: ""             # 卡片展開：結果列（「——」前的部分會加粗）
problemLabel: ""       # 選填，卡片標題上方的問題一句話
iconBg: "green"        # 選填，green / blue / amber
github: ""             # 選填
demo: ""               # 選填
cover: ""              # 選填，封面截圖路徑（src/assets/projects/）
order: 1               # 首頁排序
```

---

## Markdown 正文固定結構

```
## 問題背景
## 解決方案
## 我的角色與做法   ← 3 個 bullet：角色/獨立程度、關鍵做法、交付方式
## 技術決策
## 挑戰與踩坑
```

成效數字從 frontmatter `metric` 欄位自動渲染，不在正文重複。

---

## 設計規範（色彩）

> 雙主題 token 定義在 `src/styles/global.css`：`:root` 為淺色、`html.dark` 覆蓋為深色。元件一律走 CSS 變數，禁止硬編色碼或 `bg-white` / `border-gray-*` 等 class

| token | 淺色 | 深色 |
|-------|------|------|
| `--color-bg` | `#FBFBFA` | `#0C0F13` |
| `--color-bg-secondary` | `#F1F2F0` | `#161B21` |
| `--color-card` | `#FFFFFF` | `#11151A` |
| 文字 主/次/三 | `#16181A` / `#5B6058` / `#979B93` | `#E9EDF2` / `#9AA6B2` / `#61707E` |
| `--color-teal`（強調） | `#0F6E56` | `#3DDC97` |
| `--color-amber`（輔） | `#BA7517` | `#E5A34C` |
| 邊框 | `rgba(22,24,26,0.09)` | `rgba(233,237,242,0.09)` |

- 卡片展開三段色（before 紅 / think 藍 / after 綠）兩主題各有一組，見 global.css
- 深色新增色一律同時定義兩主題的值，不可只寫一邊
- 主題切換：BaseLayout head 內 inline script 於首繪前套用（防閃爍），`astro:after-swap` 換頁後重套；按鈕在導覽列

---

## 開發原則

- 作品卡片為手風琴式：collapsed 顯示 84×63 縮圖（frontmatter `cover` 檔名，指向 `src/assets/projects/`；無 cover 則 fallback 同尺寸幾何 icon 色塊）+ problemLabel + 標題 + 標籤，展開顯示 Before/Think/After 三格 + result 列 + 技術標籤
- 每個頁面底部需有 CTA（email 聯絡引導）
- OG 圖：`public/og-default.png`（1200×630，用 headless Chrome 渲染 HTML 產生）；`BaseLayout.astro` 的 `siteUrl` 為 `https://mars47868.github.io`

---

## 開發進度追蹤

進度記錄在 `tasks/todo.md`。任務完成後從清單移除即可，不保留歷史。

## 文件位置

| 文件 | 路徑 |
|------|------|
| 開發進度 | `tasks/todo.md` |
| 網站進化評估（更新項目清單） | `docs/superpowers/specs/2026-09-10-site-evolution-assessment.md` |
| 作品彙整原始資料 | `docs/工具彙整.md` |
| 設計規格 | `docs/superpowers/specs/2026-04-24-portfolio-website-design.md` |
| 履歷原始資料（最新） | `/Users/marschen/Desktop/personal_workspace/CV/cv-source/cv-zh.html` |
