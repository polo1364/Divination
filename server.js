const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 檢查環境變數
if (!process.env.GEMINI_API_KEY) {
    console.error('❌ 錯誤：未設置 GEMINI_API_KEY 環境變數！');
    console.error('請在 Railway 項目設置中添加 GEMINI_API_KEY 環境變數');
}

// 中間件
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// 初始化 Gemini API
let genAI, model;
try {
    if (process.env.GEMINI_API_KEY) {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        console.log('✅ Gemini API 初始化成功');
    } else {
        console.warn('⚠️  Gemini API 未初始化：缺少 API 金鑰');
    }
} catch (error) {
    console.error('❌ Gemini API 初始化失敗:', error.message);
}

// 塔羅牌解讀 API
app.post('/api/interpret', async (req, res) => {
    try {
        // 檢查 API 是否已初始化
        if (!model) {
            console.error('❌ Gemini API 未初始化');
            return res.status(500).json({ 
                error: '服務器配置錯誤',
                details: 'Gemini API 未正確初始化，請檢查 GEMINI_API_KEY 環境變數是否已設置'
            });
        }

        const { question, cards, spread } = req.body;

        if (!question || !cards || cards.length === 0) {
            return res.status(400).json({ error: '缺少必要參數' });
        }

        console.log('📝 收到解讀請求:', { question, spread, cardsCount: cards.length });

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

        console.log('🤖 調用 Gemini API...');
        
        // 調用 Gemini API
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const interpretation = response.text();

        console.log('✅ 解讀成功，返回結果');

        res.json({
            question: question,
            cards: cards,
            interpretation: interpretation,
            spread: spread
        });

    } catch (error) {
        console.error('❌ 解讀失敗:', error);
        console.error('錯誤詳情:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // 提供更詳細的錯誤信息
        let errorMessage = '解讀失敗，請稍後再試';
        let errorDetails = error.message;

        // 檢查是否是 API 金鑰問題
        if (error.message.includes('API_KEY') || error.message.includes('API key')) {
            errorMessage = 'API 金鑰錯誤';
            errorDetails = '請檢查 GEMINI_API_KEY 環境變數是否正確設置';
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
            errorMessage = 'API 配額已用完';
            errorDetails = '請檢查您的 Gemini API 配額';
        }

        res.status(500).json({ 
            error: errorMessage,
            details: errorDetails 
        });
    }
});

// 健康檢查
app.get('/api/health', (req, res) => {
    const hasApiKey = !!process.env.GEMINI_API_KEY;
    const apiKeyStatus = hasApiKey ? '已設置' : '未設置';
    const modelStatus = model ? '已初始化' : '未初始化';
    
    res.json({ 
        status: hasApiKey && model ? 'ok' : 'warning',
        message: 'AI 塔羅牌服務運行中',
        config: {
            port: PORT,
            geminiApiKey: apiKeyStatus,
            geminiModel: modelStatus
        }
    });
});

// 診斷端點（用於檢查配置）
app.get('/api/diagnose', (req, res) => {
    const diagnosis = {
        server: '運行中',
        port: PORT,
        geminiApiKey: {
            set: !!process.env.GEMINI_API_KEY,
            length: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0,
            preview: process.env.GEMINI_API_KEY ? 
                process.env.GEMINI_API_KEY.substring(0, 10) + '...' : '未設置'
        },
        geminiModel: model ? '已初始化' : '未初始化',
        timestamp: new Date().toISOString()
    };
    
    res.json(diagnosis);
});

// 啟動服務器
app.listen(PORT, () => {
    console.log(`🔮 AI 塔羅牌服務器運行在端口 ${PORT}`);
    console.log(`環境檢查:`);
    console.log(`  - PORT: ${PORT}`);
    console.log(`  - GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✅ 已設置' : '❌ 未設置'}`);
    if (!process.env.GEMINI_API_KEY) {
        console.log(`\n⚠️  警告：請在 Railway 項目設置中添加 GEMINI_API_KEY 環境變數`);
    }
});

