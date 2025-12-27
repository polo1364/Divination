# 🚀 Railway 部署指南

本文件詳細說明如何將 AI 塔羅牌占卜網頁部署到 Railway 平台。

## Railway 平台簡介

Railway 是一個現代化的雲端部署平台，支持自動部署、環境變數管理、日誌查看等功能。

## 部署前準備

### 1. 準備材料

- ✅ GitHub 帳號（推薦）或 Git 倉庫
- ✅ Google Gemini API 金鑰
- ✅ Railway 帳號（可免費註冊）

### 2. 獲取 Gemini API 金鑰

1. 前往 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 登錄您的 Google 帳號
3. 點擊 "Create API Key"
4. 複製生成的 API 金鑰（格式類似：`AIzaSy...`）

## 部署步驟

### 方法一：從 GitHub 部署（推薦）

1. **推送代碼到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **連接 Railway 到 GitHub**
   - 登錄 [Railway](https://railway.app)
   - 點擊 "New Project"
   - 選擇 "Deploy from GitHub repo"
   - 授權 Railway 訪問您的 GitHub
   - 選擇您的倉庫

3. **設置環境變數**
   - 在項目頁面，點擊 "Variables" 標籤
   - 點擊 "New Variable"
   - 添加：
     - **Name**: `GEMINI_API_KEY`
     - **Value**: 您的 Gemini API 金鑰
   - 點擊 "Add"

4. **部署**
   - Railway 會自動開始構建和部署
   - 等待構建完成（通常 2-5 分鐘）

5. **獲取訪問 URL**
   - 部署完成後，點擊 "Settings"
   - 在 "Domains" 部分，點擊 "Generate Domain"
   - 複製生成的 URL（例如：`https://your-app-name.up.railway.app`）

### 方法二：使用 Railway CLI

1. **安裝 Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **登錄 Railway**
   ```bash
   railway login
   ```

3. **初始化項目**
   ```bash
   railway init
   ```

4. **設置環境變數**
   ```bash
   railway variables set GEMINI_API_KEY=your_api_key_here
   ```

5. **部署**
   ```bash
   railway up
   ```

## 配置說明

### Railway 自動配置

Railway 會自動：
- ✅ 檢測 Node.js 項目
- ✅ 運行 `npm install` 安裝依賴
- ✅ 使用 `npm start` 啟動應用
- ✅ 分配端口並設置 `PORT` 環境變數
- ✅ 提供 HTTPS 支持

### 環境變數

必須設置的環境變數：
- `GEMINI_API_KEY`: Google Gemini API 金鑰

自動設置的環境變數：
- `PORT`: Railway 分配的端口（應用會自動讀取）

### 配置文件

項目包含以下 Railway 配置文件：

- **railway.json**: Railway 部署配置（JSON 格式）
- **railway.toml**: Railway 部署配置（TOML 格式，備用）

這些文件指定了：
- 構建器：Nixpacks
- 啟動命令：`npm start`
- 重啟策略：失敗時自動重啟

## 驗證部署

### 1. 檢查健康狀態

訪問：`https://your-app-url.railway.app/api/health`

應該返回：
```json
{
  "status": "ok",
  "message": "AI 塔羅牌服務運行中"
}
```

### 2. 測試主頁

訪問：`https://your-app-url.railway.app`

應該看到塔羅牌占卜界面。

### 3. 測試 API

使用以下命令測試 API：
```bash
curl -X POST https://your-app-url.railway.app/api/interpret \
  -H "Content-Type: application/json" \
  -d '{
    "question": "測試問題",
    "cards": [{"name": "愚者", "emoji": "🃏", "meaning": "新的開始"}],
    "spread": "single"
  }'
```

## 常見問題

### 1. 部署失敗

**問題**：構建失敗或應用無法啟動

**解決方案**：
- 檢查 Railway 日誌（點擊 "View Logs"）
- 確認 `package.json` 中的 `start` 腳本正確
- 確認所有依賴都已正確安裝
- 檢查環境變數是否正確設置

### 2. API 調用失敗

**問題**：前端無法調用後端 API

**解決方案**：
- 確認 `GEMINI_API_KEY` 環境變數已設置
- 檢查 API 金鑰是否有效
- 查看 Railway 日誌中的錯誤信息

### 3. 端口問題

**問題**：應用無法啟動，提示端口錯誤

**解決方案**：
- Railway 會自動設置 `PORT` 環境變數
- 確認 `server.js` 使用 `process.env.PORT || 3000`
- 不要硬編碼端口號

### 4. 靜態文件無法加載

**問題**：CSS 或 JS 文件無法加載

**解決方案**：
- 確認 `server.js` 中有 `app.use(express.static('.'))`
- 檢查文件路徑是否正確
- 確認所有文件都已提交到 Git

## 監控和日誌

### 查看日誌

1. 在 Railway 項目頁面
2. 點擊 "View Logs"
3. 可以看到實時日誌輸出

### 監控指標

Railway 提供：
- CPU 使用率
- 內存使用率
- 網絡流量
- 請求數量

## 更新部署

### 自動更新（推薦）

如果使用 GitHub 部署：
1. 推送新代碼到 GitHub
2. Railway 會自動檢測並重新部署

### 手動更新

1. 在 Railway 項目頁面
2. 點擊 "Redeploy"
3. 選擇要部署的分支或提交

## 成本說明

### 免費方案

- 每月 $5 免費額度
- 適合小型應用和測試
- 足夠支持輕量級使用

### 付費方案

- 按使用量付費
- 適合生產環境
- 提供更多資源和功能

## 安全建議

1. **保護 API 金鑰**
   - 永遠不要在代碼中硬編碼 API 金鑰
   - 使用環境變數存儲敏感信息
   - 不要將 `.env` 文件提交到 Git

2. **使用 HTTPS**
   - Railway 自動提供 HTTPS
   - 確保所有 API 調用使用 HTTPS

3. **限制訪問**
   - 考慮添加速率限制
   - 監控異常請求

## 後續優化

- [ ] 添加速率限制中間件
- [ ] 實現緩存機制
- [ ] 添加錯誤追蹤（如 Sentry）
- [ ] 設置自定義域名
- [ ] 配置 CDN 加速靜態資源

## 相關資源

- [Railway 官方文檔](https://docs.railway.app)
- [Railway 定價](https://railway.app/pricing)
- [Node.js 部署指南](https://docs.railway.app/guides/nodejs)

