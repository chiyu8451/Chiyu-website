# 祈聿教育官網 + 內容後台

Next.js + Payload CMS。官網內容全部從後台編輯，同仁不用碰程式碼。

## 這是什麼

- **官網**：`http://localhost:3000` — 家長看到的網站
- **後台**：`http://localhost:3000/admin` — 同仁登入後編輯內容的地方

官網上看到的文字、圖片、FAQ、課程卡片，全部在後台改，存檔後官網立即更新。

---

## 第一次在自己電腦上跑

需要先裝 [Node.js](https://nodejs.org/)（20 以上）。

```bash
cd qiyu-website
npm install          # 第一次才需要，裝相依套件
npm run dev          # 啟動
```

打開瀏覽器：

- 官網 → http://localhost:3000
- 後台 → http://localhost:3000/admin

第一次進後台會要你**建立管理員帳號**（填 email + 密碼），之後就用這組登入。

> 本機開發用 SQLite（自動建立 `qiyu.db` 檔），不需要安裝資料庫，開箱即用。

---

## 同仁怎麼編輯內容

進 `/admin` 登入後，左邊側欄分成幾區：

- **首頁區段**：Hero、為什麼選我們、服務流程、課程類型、師資篩選、常見問題、CTA
  每個點進去就能改文字、換圖、增減項目（例如多加一題 FAQ、多一個賣點）
- **全站**：網站設定（Logo、導覽選單、**Google 問卷連結**、**LINE 連結**、頁尾）
- **內容**：圖片庫（上傳照片，給 Hero 和課程卡片用）

改完按右下角 **Save**，官網重新整理就會看到。

### 要記得填的兩個連結
到「全站 → 網站設定」把這兩個換成真的：
- **Google 問卷連結**：所有「填寫問卷」按鈕會連過去
- **LINE 聯絡連結**：所有「LINE 聯絡」按鈕會連過去

沒填的話按鈕會連到 `#`（不會跳轉）。

### 邀請其他同仁
「系統 → 管理員」→ 右上 **Create New** → 填同仁 email 和密碼，把帳密給他即可。每位管理員權限相同。

---

## 正式上線（部署到網路上）

1. **建資料庫**：到 [Supabase](https://supabase.com/) 開免費專案，
   Settings → Database → Connection string，複製 URI。
2. **部署到 [Vercel](https://vercel.com/)**：連 GitHub repo，設定環境變數：
   - `PAYLOAD_SECRET`：一段隨機長字串
   - `DATABASE_URI`：上面 Supabase 的連線字串（設了就自動切換成 Postgres）
   - `NEXT_PUBLIC_SERVER_URL`：你的網域，例如 `https://qiyu-edu.com`
3. Deploy 完成後，到 `你的網域/admin` 建立管理員帳號。

> 本機（SQLite）和線上（Postgres）是兩套資料，內容不會互通。線上要重新填一次內容（或之後做匯入）。

---

## 技術備忘（給工程師）

- 內容模型：`src/globals/*`（各區段）、`src/collections/*`（管理員、圖片）
- 改完欄位定義要跑 `npm run generate:types` 更新型別
- 前台：`src/app/(frontend)/`，後台路由：`src/app/(payload)/`
- 資料庫切換邏輯在 `src/payload.config.ts`（有 `DATABASE_URI` 用 Postgres，否則 SQLite）
