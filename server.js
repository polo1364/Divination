const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { calculateBaziFull, calculateZiweiFull, calculateAstrologyFull } = require('./calculations');
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
// 使用 Gemini 2.5 Flash 模型
const GEMINI_MODEL = 'gemini-2.5-flash'; // Gemini 2.5 Flash 模型
try {
    if (process.env.GEMINI_API_KEY) {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
        console.log(`✅ Gemini API 初始化成功 (模型: ${GEMINI_MODEL})`);
    } else {
        console.warn('⚠️  Gemini API 未初始化：缺少 API 金鑰');
    }
} catch (error) {
    console.error('❌ Gemini API 初始化失敗:', error.message);
}

// 計算 API（用於八字、紫微斗數、占星的精確計算）
app.post('/api/calculate', (req, res) => {
    try {
        const { type, birthDate, birthTime, birthPlace } = req.body;

        if (!type || !birthDate) {
            return res.status(400).json({ error: '缺少必要參數' });
        }

        let result = null;

        switch(type) {
            case 'bazi':
                result = calculateBaziFull(birthDate, birthTime);
                break;
            case 'ziwei':
                result = calculateZiweiFull(birthDate, birthTime);
                break;
            case 'astrology':
                if (!birthPlace) {
                    return res.status(400).json({ error: '占星計算需要出生地點' });
                }
                result = calculateAstrologyFull(birthDate, birthTime, birthPlace);
                break;
            default:
                return res.status(400).json({ error: '不支持的計算類型' });
        }

        if (!result) {
            return res.status(500).json({ error: '計算失敗' });
        }

        res.json({ type, result });
    } catch (error) {
        console.error('計算錯誤:', error);
        res.status(500).json({ error: '計算失敗', details: error.message });
    }
});

// 通用占卜解讀 API（支持多種占卜方式）
app.post('/api/divination', async (req, res) => {
    try {
        const { type, question, data, apiKey } = req.body;

        // 優先使用請求中的 API 金鑰，否則使用環境變數
        const geminiApiKey = apiKey || process.env.GEMINI_API_KEY;

        if (!geminiApiKey) {
            return res.status(400).json({ 
                error: '缺少 API 金鑰',
                details: '請在前端輸入 Gemini API 金鑰，或在服務器環境變數中設置 GEMINI_API_KEY'
            });
        }

        // 動態初始化 Gemini API
        const GEMINI_MODEL = 'gemini-2.5-flash';
        let currentModel;
        try {
            const genAI = new GoogleGenerativeAI(geminiApiKey);
            currentModel = genAI.getGenerativeModel({ model: GEMINI_MODEL });
        } catch (error) {
            console.error('❌ Gemini API 初始化失敗:', error);
            return res.status(400).json({ 
                error: 'API 金鑰無效',
                details: '請檢查您的 Gemini API 金鑰是否正確'
            });
        }

        if (!type || !question) {
            return res.status(400).json({ error: '缺少必要參數' });
        }

        console.log(`📝 收到${type}解讀請求`);

        // 構建提示詞（使用強烈的人設）
        const prompt = buildDivinationPrompt(type, question, data);

        console.log('🤖 調用 Gemini API...');
        
        // 調用 Gemini API
        const result = await currentModel.generateContent(prompt);
        const response = await result.response;
        let interpretation = response.text();

        // 嘗試解析 JSON（如果 AI 返回了結構化輸出）
        let structuredResult = null;
        try {
            // 嘗試從文本中提取 JSON
            const jsonMatch = interpretation.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                structuredResult = JSON.parse(jsonMatch[0]);
            }
        } catch (e) {
            // 如果不是 JSON，使用原始文本
        }

        // 如果成功解析為結構化輸出，使用它；否則使用原始文本
        const finalResult = structuredResult || {
            summary: interpretation.substring(0, 100) + '...',
            analysis: interpretation,
            advice: [],
            lucky_item: '',
            score: 75
        };

        console.log('✅ 解讀成功');

        res.json({
            type: type,
            question: question,
            data: data,
            result: finalResult,
            raw: interpretation
        });

    } catch (error) {
        console.error('❌ 解讀失敗:', error);
        res.status(500).json({ 
            error: '解讀失敗，請稍後再試',
            details: error.message 
        });
    }
});

// 構建占卜提示詞
function buildDivinationPrompt(type, question, data) {
    const systemPrompt = `你是一位精通東方玄學與西方心理學的資深命理大師。你的語氣神秘、溫和且充滿智慧，能夠給予使用者心靈上的指引。

你的任務是根據使用者提供的資訊進行詳細的運勢分析。

輸出規則：
1. 開場：用一句富有哲理的話作為開場
2. 核心分析：針對問題進行深入剖析，指出目前的能量狀態
3. 未來建議：給出 3 點具體可行的建議（包含心態調整或實際行動）
4. 幸運要素：給出今日幸運色、幸運方位或幸運小物

請使用繁體中文，避免過於生硬的翻譯腔，帶有一點「天機」的感覺，但最後要正面鼓勵。

絕對禁止：
- 不要給予醫療建議
- 不要預測死亡
- 不要給予具體的投資買賣點位

請以 JSON 格式輸出，格式如下：
{
  "summary": "一句話總結運勢",
  "opening": "富有哲理的開場白",
  "analysis": "詳細的分析文本（300-500字）",
  "advice": ["建議1", "建議2", "建議3"],
  "lucky_color": "幸運色",
  "lucky_direction": "幸運方位",
  "lucky_item": "幸運小物",
  "score": 85
}

現在開始解讀：\n\n`;

    let typeSpecificPrompt = '';

    switch(type) {
        case 'tarot':
            if (data.cards && data.cards.length > 0) {
                if (data.spread === 'single') {
                    const card = data.cards[0];
                    typeSpecificPrompt = `塔羅牌占卜 - 單張牌\n\n`;
                    typeSpecificPrompt += `用戶的問題：${question}\n`;
                    typeSpecificPrompt += `抽到的牌：${card.displayName || card.name}（${card.meaning}）\n`;
                    if (card.orientation) {
                        typeSpecificPrompt += `正逆位：${card.orientation}\n`;
                    }
                    typeSpecificPrompt += `\n`;
                } else if (data.spread === 'three') {
                    typeSpecificPrompt = `塔羅牌占卜 - 三張牌陣（過去-現在-未來）\n\n`;
                    typeSpecificPrompt += `用戶的問題：${question}\n`;
                    data.cards.forEach(card => {
                        typeSpecificPrompt += `${card.position}：${card.displayName || card.name}（${card.meaning}）`;
                        if (card.orientation) {
                            typeSpecificPrompt += ` - ${card.orientation}`;
                        }
                        typeSpecificPrompt += `\n`;
                    });
                }
            }
            break;

        case 'bazi':
        case 'ziwei':
            typeSpecificPrompt = `${type === 'bazi' ? '八字' : '紫微斗數'}命盤分析\n\n`;
            typeSpecificPrompt += `用戶的問題：${question}\n`;
            typeSpecificPrompt += `出生資訊：\n`;
            typeSpecificPrompt += `- 姓名：${data.name || '未提供'}\n`;
            typeSpecificPrompt += `- 性別：${data.gender || '未提供'}\n`;
            typeSpecificPrompt += `- 出生日期：${data.birthDate || '未提供'}\n`;
            if (data.birthTime) {
                typeSpecificPrompt += `- 出生時辰：${data.birthTime}\n`;
            }
            if (data.calculation) {
                if (type === 'bazi' && data.calculation.fullBazi) {
                    typeSpecificPrompt += `\n計算結果（四柱）：\n`;
                    typeSpecificPrompt += `- 年柱：${data.calculation.yearPillar}\n`;
                    typeSpecificPrompt += `- 月柱：${data.calculation.monthPillar}\n`;
                    typeSpecificPrompt += `- 日柱：${data.calculation.dayPillar}\n`;
                    typeSpecificPrompt += `- 時柱：${data.calculation.hourPillar}\n`;
                    typeSpecificPrompt += `完整八字：${data.calculation.fullBazi}\n`;
                } else if (type === 'ziwei' && data.calculation.mingGong) {
                    typeSpecificPrompt += `\n計算結果：\n`;
                    typeSpecificPrompt += `- ${data.calculation.mingGong}\n`;
                    typeSpecificPrompt += `- 主星：${data.calculation.mainStar}\n`;
                }
            }
            typeSpecificPrompt += `\n請根據以上資訊進行詳細的命盤分析。`;
            break;

        case 'astrology':
            typeSpecificPrompt = `西方占星分析\n\n`;
            typeSpecificPrompt += `用戶的問題：${question}\n`;
            typeSpecificPrompt += `出生資訊：\n`;
            typeSpecificPrompt += `- 出生日期：${data.birthDate || '未提供'}\n`;
            if (data.birthPlace) {
                typeSpecificPrompt += `- 出生地點：${data.birthPlace}\n`;
            }
            if (data.calculation) {
                typeSpecificPrompt += `\n計算結果：\n`;
                if (data.calculation.sunSign) {
                    typeSpecificPrompt += `- 太陽星座：${data.calculation.sunSign}\n`;
                }
            }
            typeSpecificPrompt += `\n請根據以上資訊進行詳細的星盤分析，包括行星落點、宮位和相位。`;
            break;

        case 'yijing':
        case 'migu':
        case 'qiuqian':
            const typeNames = {
                'yijing': '周易',
                'migu': '米卦',
                'qiuqian': '求籤'
            };
            typeSpecificPrompt = `${typeNames[type]}解讀\n\n`;
            typeSpecificPrompt += `用戶的問題：${question}\n`;
            if (data.gua) {
                typeSpecificPrompt += `${data.guaName || '卦象/籤詩'}：${data.gua}\n`;
            }
            if (data.benGua && data.bianGua) {
                typeSpecificPrompt += `本卦：${data.benGua}\n`;
                typeSpecificPrompt += `變爻：${data.changingLines ? data.changingLines.join('、') : '無'}\n`;
                typeSpecificPrompt += `之卦：${data.bianGua}\n`;
            }
            if (data.meaning) {
                typeSpecificPrompt += `基本含義：${data.meaning}\n`;
            }
            if (data.number) {
                typeSpecificPrompt += `籤號：第${data.number}籤\n`;
            }
            typeSpecificPrompt += `\n請進行詳細解讀。`;
            break;

        default:
            typeSpecificPrompt = `占卜解讀\n\n用戶的問題：${question}\n`;
    }

    return systemPrompt + typeSpecificPrompt;
}

// 塔羅牌解讀 API（保持向後兼容）
app.post('/api/interpret', async (req, res) => {
    try {
        const { question, cards, spread, apiKey } = req.body;

        // 優先使用請求中的 API 金鑰，否則使用環境變數
        const geminiApiKey = apiKey || process.env.GEMINI_API_KEY;

        if (!geminiApiKey) {
            return res.status(400).json({ 
                error: '缺少 API 金鑰',
                details: '請在前端輸入 Gemini API 金鑰，或在服務器環境變數中設置 GEMINI_API_KEY'
            });
        }

        // 動態初始化 Gemini API（使用請求中的 API 金鑰）
        // 使用 Gemini 2.5 Flash 模型
        const GEMINI_MODEL = 'gemini-2.5-flash'; // Gemini 2.5 Flash 模型
        let currentModel;
        try {
            const genAI = new GoogleGenerativeAI(geminiApiKey);
            currentModel = genAI.getGenerativeModel({ model: GEMINI_MODEL });
            console.log(`✅ 使用模型: ${GEMINI_MODEL}`);
        } catch (error) {
            console.error('❌ Gemini API 初始化失敗:', error);
            return res.status(400).json({ 
                error: 'API 金鑰無效',
                details: '請檢查您的 Gemini API 金鑰是否正確'
            });
        }

        if (!question || !cards || cards.length === 0) {
            return res.status(400).json({ error: '缺少必要參數' });
        }

        console.log('📝 收到解讀請求:', { question, spread, cardsCount: cards.length });

        // 構建提示詞
        let prompt = buildDivinationPrompt('tarot', question, { cards, spread });

        console.log('🤖 調用 Gemini API...');
        
        // 調用 Gemini API
        const result = await currentModel.generateContent(prompt);
        const response = await result.response;
        let interpretation = response.text();

        // 嘗試解析 JSON
        let structuredResult = null;
        try {
            const jsonMatch = interpretation.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                structuredResult = JSON.parse(jsonMatch[0]);
            }
        } catch (e) {
            // 使用原始文本
        }

        const finalResult = structuredResult || {
            summary: interpretation.substring(0, 100) + '...',
            analysis: interpretation,
            advice: [],
            lucky_item: '',
            score: 75
        };

        console.log('✅ 解讀成功');

        res.json({
            question: question,
            cards: cards,
            interpretation: finalResult.analysis || interpretation,
            result: finalResult,
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

