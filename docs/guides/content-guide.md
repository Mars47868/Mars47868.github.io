# 作品內容編輯指南

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

## 注意事項

- 刪除 `.astro` 快取目錄並重啟 dev server，可解決內容更新後不顯示的問題：
  ```bash
  rm -rf .astro && npm run dev
  ```
- `result` 欄位用「——」（全形破折號）分隔成效數字與說明，格式會自動處理
