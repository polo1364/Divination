const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// 初始化 Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// 塔羅牌解讀 API
app.post('/api/interpret', async (req, res) => {
    try {
        const { question, cards, spread } = req.body;

        if (!question || !cards || cards.length === 0) {
            return res.status(400).json({ error: '缺少必要參數' });
        }

        // 構建提示詞
        let prompt = `你是一位專業的塔羅牌占卜師，請根據以下信息為用戶進行詳細的塔羅牌解讀。\n\n`;
        prompt += `用戶的問題：${question}\n\n`;

        if (spread === 'single') {
            const card = cards[0];
            prompt += `抽到的牌：${card.name}（${card.meaning}）\n\n`;
            prompt += `請為這張牌提供詳細的解讀，包括：\n`;
            prompt += `1. 這張牌的基本含義\n`;
            prompt += `2. 針對用戶問題的具體解讀\n`;
            prompt += `3. 給用戶的建議和指引\n`;
            prompt += `請用溫暖、專業且易懂的語氣回答，字數約300-500字。`;
        } else if (spread === 'three') {
            prompt += `三張牌陣（過去-現在-未來）：\n`;
            cards.forEach((card, index) => {
                prompt += `${card.position}：${card.name}（${card.meaning}）\n`;
            });
            prompt += `\n請為這個三張牌陣提供詳細的解讀，包括：\n`;
            prompt += `1. 每張牌在各自位置上的含義\n`;
            prompt += `2. 三張牌之間的關聯和整體故事\n`;
            prompt += `3. 針對用戶問題的綜合解讀\n`;
            prompt += `4. 給用戶的建議和指引\n`;
            prompt += `請用溫暖、專業且易懂的語氣回答，字數約500-800字。`;
        }

        // 調用 Gemini API
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const interpretation = response.text();

        res.json({
            question: question,
            cards: cards,
            interpretation: interpretation,
            spread: spread
        });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ 
            error: '解讀失敗，請稍後再試',
            details: error.message 
        });
    }
});

// 健康檢查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'AI 塔羅牌服務運行中' });
});

// 啟動服務器
app.listen(PORT, () => {
    console.log(`🔮 AI 塔羅牌服務器運行在 http://localhost:${PORT}`);
    console.log(`請確保已設置 GEMINI_API_KEY 環境變數`);
});

