# 網站內容編輯指南

## 檔案位置

每個作品對應一個 Markdown 檔案：

```
src/content/projects/
  aui.md
  holiday-orders.md
  quick-medication.md
  stock-dashboard.md
  video-notes.md
```

檔名即為 URL slug，例如 `aui.md` → `https://你的網域/projects/aui`

---

## Frontmatter 欄位說明

```yaml
---
title: "庫存表自動生成工具 AUI"
# 手風琴卡片標題，也是 detail 頁的 h1

summary: "一行指令，ERP 三份報表秒變庫存會議用表"
# detail 頁的副標題說明文字

problemLabel: "重複性人工整理"
# 卡片 header 顯示「問題 · 重複性人工整理」
# 用短句描述問題類別

icon: "📦"
# 卡片左側 emoji 圖示

iconBg: "green"
# 圖示背景色：green（青綠）/ blue（淡藍）/ amber（琥珀）

before: "每週固定從 ERP 匯出三份格式各異的報表..."
# Before 色塊（紅底）：原本的痛點是什麼

think: "問題的本質是格式轉換加欄位映射..."
# Think 色塊（藍底）：我怎麼看這個問題、切入點是什麼

after: "一行指令，五分鐘後拿到格式正確的彙整表..."
# After 色塊（綠底）：做完之後的具體改變

result: "作業時間從 1 小時縮到 5 分鐘——讓 PM 的時間留在分析數字，而不是整理數字"
# Result bar：「——」前的文字會加粗，後面普通字重
# 格式：「[量化成效]——[對對方的意義]」

metric: "作業時間從 1 小時縮到 5 分鐘"
# detail 頁頂部的 teal 色大字（主要成效數字）

industry: ["製造業", "供應鏈"]
# 產業標籤（顯示在卡片 header 和 detail 頁）

tech: ["Python", "CLI"]
# 技術標籤（同上）

order: 1
# 首頁排序，數字小的排前面

github: "https://github.com/..."   # 選填
demo: "https://..."                 # 選填
cover: "projects/aui-cover.png"    # 選填，放在 src/assets/projects/
---
```

---

## Markdown 正文（detail 頁內容）

正文在 `---` 結束後開始，使用固定的四個 section：

```markdown
## 問題背景

描述你遇到這個問題的背景與脈絡。

## 解決方案

說明你怎麼解決這個問題。

## 技術決策

為什麼選這個技術方案？有哪些取捨？

## 挑戰與踩坑

實作過程中遇到什麼意外、怎麼解決。
```

---

## 新增作品

1. 在 `src/content/projects/` 建立新檔案，檔名為英文 slug：
   ```bash
   touch src/content/projects/your-project-name.md
   ```

2. 填入完整 frontmatter（參考上方欄位說明）

3. 填入 Markdown 正文

4. 調整 `order` 數字決定在首頁的排序位置

5. 存檔後 dev server 會自動顯示，無需其他設定

---

## 修改現有作品

直接編輯對應的 `.md` 檔案即可。

- **修改手風琴卡片內容**：改 `before` / `think` / `after` / `result` / `problemLabel`
- **修改 detail 頁**：改 Markdown 正文
- **修改標籤**：改 `industry` / `tech` 陣列
- **調整排序**：改 `order` 數字

---

---

## 修改首頁靜態區塊

以下區塊的文字**直接寫在組件檔裡**，不透過 content collection，直接編輯對應檔案即可。

### Hero（第一屏）

檔案：`src/components/Hero.astro`

可修改：
- `hero-location`：名字與城市那行小字（`陳睿凱 · Ruei Kai Chen · 台北`）
- `hero-headline`：身份句（`我找到流程裡的浪費，然後讓它消失。`）
- `hero-sub`：說明文字
- `chips` 陣列：能力標籤（`['後端工程', 'AI 整合', ...]`）

---

### 為什麼是我（About）

檔案：`src/components/WhyMeBlock.astro`

可修改：
- `.about-quote`：引言（serif 大字，teal 色）
- `.about-body` 的三段 `<p>`：本文段落

---

### 工具箱（Skills）

檔案：`src/components/Toolbox.astro`

修改 frontmatter 裡的 `groups` 陣列：

```js
const groups = [
  { label: '後端 / 系統', items: ['Java', 'Spring Boot', ...] },
  { label: 'AI / 自動化',  items: ['Python', 'OpenAI API', ...] },
  { label: '前端',         items: ['React', 'Vue', ...] },
  { label: '產品 / 流程',  items: ['需求訪談', '流程分析', ...] },
];
```

---

### 合作 CTA（Contact）

聯絡資訊在 `src/pages/index.astro` 底部的 CTABlock 傳入：

```astro
<CTABlock
  heading="你有一個重複在做、<br>但覺得「應該可以更好」的流程嗎？"
  desc="說明文字..."
  email="marschen82@gmail.com"
  linkedin="https://linkedin.com/in/marschen"
  github="https://github.com/marschen82"
/>
```

修改 `email` / `linkedin` / `github` 即可更新連結；`heading` 支援 `<br>` 換行。

---

### Header / Footer

檔案：`src/layouts/BaseLayout.astro`

- **Header 左側品牌名稱**：搜尋 `陳睿凱 Mars`，改為你要的文字
- **Header 導覽連結**：找 `<nav>` 區塊，修改各 `<a>` 的文字
- **Footer 文字**：搜尋 `陳睿凱 · Ruei Kai Chen · 台北 · 2026`，依年份更新

---

## 注意事項

- 刪除 `.astro` 快取目錄並重啟 dev server，可解決內容更新後不顯示的問題：
  ```bash
  rm -rf .astro && npm run dev
  ```
- `result` 欄位用「——」（全形破折號）分隔成效數字與說明，格式會自動處理
