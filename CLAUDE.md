# 個人作品集網站專案

## 專案概述

Mars Chen 的個人作品集靜態網站，用於求職與接案兩種場合。
核心定位：**AI × 流程自動化**，展示如何用技術解決真實生活問題。

---

## 技術架構

- **框架：** Astro 6（靜態網站生成器）
- **樣式：** Tailwind CSS v4（設定在 `src/styles/global.css`，無 `tailwind.config.js`）
- **部署：** Vercel
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
```

---

## 品牌定位

**Hero 定位句：**
> 「我幫你把每天重複做的事，變成自動跑的系統。」
> Java 後端 × Python × AI 整合 × 流程自動化

**視覺風格：** 白底/深色雙模式，主色電藍 `#3B82F6`（`--color-primary`）

---

## 頁面架構

| 路由 | 說明 |
|------|------|
| `/` | 首頁：Hero + 作品卡片列表 |
| `/projects/[slug]` | 個別作品 Case Study 頁 |
| `/about` | 關於我（轉職故事敘事型） |

聯絡方式放在 Footer（icon-only 社群連結），無獨立 `/contact` 頁。

---

## 作品清單

| slug | 工具名稱 | 產業 | 技術 |
|------|---------|------|------|
| `aui` | 庫存表自動生成工具 AUI | 製造業、供應鏈 | Python、CLI |
| `holiday-orders` | 年節訂單報表彙整 | 餐飲業 | Excel VBA |
| `quick-medication` | 快速用藥查詢工具 | 醫療診所 | Google Apps Script |
| `stock-dashboard` | 股票監控台 | 個人財務 | Google Apps Script、Google Sheets |
| `video-notes` | 影片轉錄文字工具 | 醫美教育、內容創作 | Python、AI、faster-whisper |

---

## Frontmatter 結構

```yaml
title: ""              # 工具名稱
summary: ""            # 一句話成效（作品卡片顯示）
industry: []           # 產業標籤陣列
tech: []               # 技術標籤陣列
metric: ""             # 成效數字（視覺化大字顯示）
metricPercentage: 80   # 選填，進度條百分比（0–100）
metricLabel: ""        # 選填，進度條說明文字
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
## 技術決策
## 挑戰與踩坑
```

成效數字從 frontmatter `metric` 欄位自動渲染，不在正文重複。

---

## 設計規範（色彩）

> 完整 spec：`docs/superpowers/specs/2026-04-29-warm-palette-design.md`

### 淺色模式
- 背景：`#FAFAF8`（微暖白）
- Navbar backdrop：`#F0EDE8`
- 主文字：`#1C1917`，次要文字：`rgba(28,25,23,0.55)`
- 邊框：`rgba(80,60,40,0.09)`

### 深色模式
- 背景：`#141210`（暖炭黑）
- 卡片面：`rgba(30,26,22,0.6)`
- 主文字：`#E8E0D8`，次要文字：`rgba(232,224,216,0.55)`
- 邊框：`rgba(255,240,220,0.08)`

### 保留不動
- 主色電藍：`#0161EF`（`--color-primary`）
- TagPill 配色（藍/琥珀）
- 禁止在元件中使用 `bg-white`、`border-gray-*`、`dark:bg-slate-*` 等冷調 class

---

## 開發原則

- 作品卡片視覺優先順序：成效數字 > 一句話摘要 > 產業標籤 > 技術標籤
- 成效區塊使用「進度條 + 放大數字」，不用表格
- 每個頁面底部需有 CTA（email 聯絡引導）
- `/about` 的工作經歷採敘事型轉職故事，不用純時間軸條列
- 卡片 hover：`-translate-y-1` 上浮 + `shadow-xl`

---

## 開發進度追蹤

進度記錄在 `tasks/todo.md`。任務完成後從清單移除即可，不保留歷史。

## 文件位置

| 文件 | 路徑 |
|------|------|
| 開發進度 | `tasks/todo.md` |
| 作品彙整原始資料 | `docs/工具彙整.md` |
| 設計規格 | `docs/superpowers/specs/2026-04-24-portfolio-website-design.md` |
| 實作計畫 | `docs/superpowers/plans/2026-04-24-portfolio-website.md` |
| 工作經歷原始資料 | `/Users/marschen/Desktop/印度占星/KAI/工作經歷及近況.txt` |
