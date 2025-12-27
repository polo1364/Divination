# 🔮 AI 塔羅牌占卜網頁

一個使用 Google Gemini AI 的塔羅牌占卜網頁應用，提供智能解讀功能。

## 功能特色

- ✨ 現代化的用戶界面設計
- 🎴 完整的 78 張塔羅牌牌組
- 🔮 單張牌和三張牌（過去-現在-未來）兩種占卜方式
- 🤖 使用 Gemini AI 進行智能解讀
- 📱 響應式設計，支持手機和桌面設備
- 🔒 API 金鑰安全存儲（使用環境變數）

## 安裝步驟

### 本地開發

#### 1. 安裝依賴

```bash
npm install
```

#### 2. 設置 Gemini API 金鑰

1. 前往 [Google AI Studio](https://makersuite.google.com/app/apikey) 申請您的 API 金鑰
2. 複製 `env.example` 文件並重命名為 `.env`
3. 在 `.env` 文件中填入您的 API 金鑰：

```
GEMINI_API_KEY=your_actual_api_key_here
```

#### 3. 啟動服務器

```bash
npm start
```

或者使用開發模式（自動重啟）：

```bash
npm run dev
```

#### 4. 訪問網頁

打開瀏覽器，訪問：`http://localhost:3000`

## Railway 部署

### 部署步驟

1. **註冊 Railway 帳號**
   - 前往 [Railway](https://railway.app) 註冊帳號
   - 可以使用 GitHub 帳號快速登錄

2. **創建新項目**
   - 點擊 "New Project"
   - 選擇 "Deploy from GitHub repo"（如果已連接 GitHub）
   - 或選擇 "Empty Project" 然後連接您的 Git 倉庫

3. **設置環境變數**
   - 在 Railway 項目設置中找到 "Variables" 標籤
   - 添加以下環境變數：
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     ```
   - Railway 會自動設置 `PORT` 環境變數，無需手動配置

4. **部署配置**
   - Railway 會自動檢測 `package.json` 和 `railway.json` 配置文件
   - 構建命令：`npm install`
   - 啟動命令：`npm start`（已在 `package.json` 中配置）

5. **訪問部署的應用**
   - 部署完成後，Railway 會提供一個公開的 URL
   - 點擊 "Settings" → "Generate Domain" 可以獲取自定義域名

### Railway 部署規格

- **構建器**：Nixpacks（自動檢測 Node.js 項目）
- **啟動命令**：`npm start`
- **端口**：Railway 自動分配（通過 `process.env.PORT` 讀取）
- **環境變數**：在 Railway 控制台設置，無需 `.env` 文件
- **重啟策略**：失敗時自動重啟（最多 10 次）

### 注意事項

- Railway 免費方案提供每月 $5 的額度，足夠小型應用使用
- 確保已設置 `GEMINI_API_KEY` 環境變數，否則應用無法正常運行
- Railway 會自動處理 HTTPS 和域名配置
- 如需自定義域名，可在項目設置中配置

## 使用說明

1. **輸入問題**：在文本框中輸入您想詢問的問題
2. **選擇占卜方式**：
   - **單張牌**：快速占卜，適合簡單問題
   - **三張牌**：過去-現在-未來牌陣，提供更詳細的解讀
3. **點擊抽牌**：系統會隨機抽取塔羅牌
4. **查看解讀**：AI 會根據您抽到的牌和問題提供專業解讀

## 項目結構

```
Divination/
├── index.html             # 前端 HTML 頁面
├── style.css         # 樣式文件
├── script.js         # 前端 JavaScript 邏輯
├── server.js         # 後端 API 服務器
├── package.json      # 項目依賴配置
├── railway.json      # Railway 部署配置
├── railway.toml      # Railway 部署配置（備用）
├── .env              # 環境變數（本地開發用）
├── env.example       # 環境變數範例
├── .gitignore        # Git 忽略文件
└── README.md         # 說明文件
```

## 技術棧

- **前端**：HTML5, CSS3, JavaScript (Vanilla)
- **後端**：Node.js, Express
- **AI 模型**：Google Gemini Pro
- **樣式**：漸變背景、動畫效果、響應式設計

## 後續擴充計劃

- [ ] 添加更多牌陣（如凱爾特十字、六芒星等）
- [ ] 支持牌的正位/逆位
- [ ] 添加占卜歷史記錄
- [ ] 支持其他占卜方式（如易經、星座等）
- [ ] 用戶登錄和個人化功能

## 注意事項

- 請妥善保管您的 Gemini API 金鑰，不要將 `.env` 文件提交到版本控制系統
- API 調用可能會產生費用，請注意使用量
- 本項目僅供娛樂和學習使用

## 授權

MIT License

