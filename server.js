const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { calculateBaziFull, calculateZiweiFull, calculateAstrologyFull } = require('./calculations');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 載入塔羅牌定義（RAG 資料庫）
let tarotDefinitions = {};
try {
    const definitionsPath = path.join(__dirname, 'tarot-definitions.json');
    const definitionsData = fs.readFileSync(definitionsPath, 'utf8');
    tarotDefinitions = JSON.parse(definitionsData);
    console.log('✅ 塔羅牌定義載入成功，共', Object.keys(tarotDefinitions).length, '張牌');
} catch (error) {
    console.warn('⚠️  無法載入塔羅牌定義文件:', error.message);
}

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// 初始化 Gemini API（可選：如果設置了環境變數則預先初始化）
let genAI, model;
// 使用 Gemini 2.5 Flash 模型
const GEMINI_MODEL = 'gemini-2.5-flash'; // Gemini 2.5 Flash 模型
try {
    if (process.env.GEMINI_API_KEY) {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
        console.log(`✅ Gemini API 預先初始化成功 (模型: ${GEMINI_MODEL})`);
        console.log('💡 提示：用戶也可以在前端輸入自己的 API 金鑰');
    } else {
        console.log('ℹ️  提示：未設置 GEMINI_API_KEY 環境變數');
        console.log('💡 這是正常的，用戶可以在前端輸入自己的 API 金鑰');
    }
} catch (error) {
    console.warn('⚠️  Gemini API 預先初始化失敗（不影響使用，用戶可在前端提供 API 金鑰）:', error.message);
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

        // 構建提示詞（使用強烈的人設 + RAG + 冷讀術 + 記憶）
        let prompt;
        try {
            prompt = buildDivinationPrompt(type, question, data || {});
            console.log('✅ 提示詞構建成功，長度:', prompt.length);
        } catch (promptError) {
            console.error('❌ 提示詞構建失敗:', promptError);
            throw new Error(`提示詞構建失敗: ${promptError.message}`);
        }

        console.log('🤖 調用 Gemini API...');
        
        // 調用 Gemini API（添加錯誤處理）
        let result, response, interpretation;
        try {
            result = await currentModel.generateContent(prompt);
            response = await result.response;
            interpretation = response.text();
            
            if (!interpretation || interpretation.trim().length === 0) {
                throw new Error('AI 返回了空內容');
            }
            
            console.log('✅ AI 回應成功，長度:', interpretation.length);
        } catch (apiError) {
            console.error('❌ Gemini API 調用失敗:', apiError);
            console.error('API 錯誤詳情:', {
                message: apiError.message,
                name: apiError.name,
                stack: apiError.stack
            });
            throw new Error(`AI 解讀失敗: ${apiError.message || '未知錯誤'}`);
        }

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
        console.error('錯誤堆疊:', error.stack);
        console.error('請求數據:', {
            type: req.body?.type,
            question: req.body?.question ? req.body.question.substring(0, 50) + '...' : '無',
            hasData: !!req.body?.data,
            hasApiKey: !!req.body?.apiKey,
        });
        
        res.status(500).json({ 
            error: '解讀失敗，請稍後再試',
            details: error.message || '未知錯誤',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// 構建占卜提示詞（加入 RAG、冷讀術、記憶功能）
function buildDivinationPrompt(type, question, data) {
    const systemPrompt = `你是一位精通東方玄學與西方心理學的資深命理大師，擁有數十年的占卜經驗。你的語氣神秘、溫和且充滿智慧，能夠給予使用者心靈上的指引。

【重要：冷讀術技巧】
你必須運用「巴南效應」和「冷讀術」技巧，讓解讀更具說服力和共鳴：

1. **兩面性語句**：使用這種句型結構，例如：
   - "你外表看起來很堅強，能夠獨當一面，但其實內心渴望一個能真正理解你的人。"
   - "你表面上追求穩定，但內心其實充滿冒險的渴望。"
   - "你給人的印象是理性冷靜，但實際上你的情感非常豐富且敏感。"

2. **肯定當下情緒**：在分析前，先同理使用者的焦慮和感受：
   - "這張牌顯示你最近在 [問題領域] 可能感到有些力不從心..."
   - "我能感受到你對這個問題的擔憂和不安..."
   - "你現在的心情，我完全理解..."

3. **開放式結尾**：不要把話說死，引導使用者自己去聯想：
   - "這可能與你最近遇到的某個人或某件事有關..."
   - "你心裡應該已經有答案了，只是需要一些確認..."
   - "這個指引會在你最需要的時候顯現..."


你的任務是根據使用者提供的資訊進行詳細的運勢分析。

輸出規則：
1. 開場：用一句富有哲理的話作為開場，必須包含兩面性語句
2. 核心分析：針對問題進行深入剖析，先肯定使用者的情緒，然後指出目前的能量狀態（300-500字）
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
  "opening": "富有哲理的開場白（必須包含兩面性語句）",
  "analysis": "詳細的分析文本（300-500字，先肯定情緒，再深入分析）",
  "advice": ["建議1", "建議2", "建議3"],
  "luckyItems": {
    "幸運色": "顏色",
    "幸運方位": "方位",
    "幸運小物": "物品"
  },
  "score": 85
}

現在開始解讀：\n\n`;

    let typeSpecificPrompt = '';

    switch(type) {
        case 'master_consultant':
            typeSpecificPrompt = `AI 總顧問 - 綜合命理分析\n\n`;
            typeSpecificPrompt += `用戶的問題：${question}\n\n`;
            typeSpecificPrompt += `【綜合命理資料】\n`;
            
            if (data.bazi) {
                typeSpecificPrompt += `八字命盤：${data.bazi.fullBazi || '已計算'}\n`;
                typeSpecificPrompt += `- 年柱：${data.bazi.yearPillar || ''}\n`;
                typeSpecificPrompt += `- 月柱：${data.bazi.monthPillar || ''}\n`;
                typeSpecificPrompt += `- 日柱：${data.bazi.dayPillar || ''}\n`;
                typeSpecificPrompt += `- 時柱：${data.bazi.hourPillar || ''}\n\n`;
            }
            
            if (data.ziwei) {
                typeSpecificPrompt += `紫微斗數：${data.ziwei.mingGong || '已計算'}\n`;
                typeSpecificPrompt += `- 主星：${data.ziwei.mainStar || ''}\n\n`;
            }
            
            if (data.astrology) {
                typeSpecificPrompt += `西方占星：\n`;
                typeSpecificPrompt += `- 太陽星座：${data.astrology.sunSign || ''}\n`;
                if (data.astrology.moonSign) {
                    typeSpecificPrompt += `- 月亮星座：${data.astrology.moonSign}\n`;
                }
                if (data.astrology.risingSign) {
                    typeSpecificPrompt += `- 上升星座：${data.astrology.risingSign}\n`;
                }
                typeSpecificPrompt += `\n`;
            }
            
            if (data.tarot) {
                typeSpecificPrompt += `塔羅牌指引：${data.tarot.card.displayName || data.tarot.card.name}（${data.tarot.meaning}）\n\n`;
            }
            
            typeSpecificPrompt += `【任務】\n`;
            typeSpecificPrompt += `請綜合以上所有命理資料，進行交叉驗證分析。你需要：\n`;
            typeSpecificPrompt += `1. 比較不同命理系統的結論，找出共同點和矛盾點\n`;
            typeSpecificPrompt += `2. 分析塔羅牌與命盤的關聯性\n`;
            typeSpecificPrompt += `3. 給出綜合性的建議，平衡不同系統的觀點\n`;
            typeSpecificPrompt += `4. 如果發現矛盾，要解釋為什麼會有這種差異\n`;
            typeSpecificPrompt += `5. 最終給出一個綜合性的結論和建議\n\n`;
            typeSpecificPrompt += `請以「大師綜合分析」的口吻，整合所有資訊，給出最全面的解答。`;
            break;

        case 'daily_report':
            typeSpecificPrompt = `每日運勢日報生成\n\n`;
            typeSpecificPrompt += `日期：${data.date || new Date().toISOString().split('T')[0]}\n\n`;
            
            if (data.bazi) {
                typeSpecificPrompt += `八字命盤：${data.bazi.fullBazi || '已計算'}\n`;
            }
            if (data.ziwei) {
                typeSpecificPrompt += `紫微斗數：${data.ziwei.mingGong || '已計算'}\n`;
            }
            if (data.astrology) {
                typeSpecificPrompt += `占星：${data.astrology.sunSign || ''}\n`;
            }
            
            typeSpecificPrompt += `\n【任務】\n`;
            typeSpecificPrompt += `請根據今天的星象、流日、流月，結合使用者的命盤，生成一份詳細的今日運勢日報。\n`;
            typeSpecificPrompt += `內容應包括：\n`;
            typeSpecificPrompt += `1. 整體運勢（1-5星評分）\n`;
            typeSpecificPrompt += `2. 愛情運勢\n`;
            typeSpecificPrompt += `3. 事業運勢\n`;
            typeSpecificPrompt += `4. 財運\n`;
            typeSpecificPrompt += `5. 健康運勢\n`;
            typeSpecificPrompt += `6. 今日幸運元素（顏色、方位、數字等）\n`;
            typeSpecificPrompt += `7. 今日注意事項\n\n`;
            typeSpecificPrompt += `請以日報的格式，簡潔明瞭地呈現。`;
            break;

        case 'dream':
            typeSpecificPrompt = `AI 解夢分析\n\n`;
            typeSpecificPrompt += `夢境內容：${data.dream || data.dreamText || question}\n\n`;
            typeSpecificPrompt += `【任務】\n`;
            typeSpecificPrompt += `請運用心理學（榮格心理學、佛洛伊德理論）和象徵學的知識，深入分析這個夢境。你需要：\n`;
            typeSpecificPrompt += `1. 識別並分析夢境中的主要象徵符號（如水象徵情緒、飛行象徵自由等）\n`;
            typeSpecificPrompt += `2. 探討可能的潛意識訊息和隱藏的心理需求\n`;
            typeSpecificPrompt += `3. 分析夢境反映的情緒狀態和內心衝突\n`;
            typeSpecificPrompt += `4. 給出實際可行的心理建議和自我成長方向\n\n`;
            typeSpecificPrompt += `請以溫和專業的心理分析師角度解讀，帶有神秘感但不迷信。\n\n`;
            typeSpecificPrompt += `JSON 輸出格式：\n`;
            typeSpecificPrompt += `{\n`;
            typeSpecificPrompt += `  "opening": "富有詩意的開場白",\n`;
            typeSpecificPrompt += `  "analysis": "詳細的夢境分析（300-500字）",\n`;
            typeSpecificPrompt += `  "symbols": ["象徵1", "象徵2", "象徵3"],\n`;
            typeSpecificPrompt += `  "emotion": "夢境反映的情緒狀態分析",\n`;
            typeSpecificPrompt += `  "advice": ["建議1", "建議2", "建議3"]\n`;
            typeSpecificPrompt += `}`;
            break;

        case 'calligraphy':
            typeSpecificPrompt = `測字分析\n\n`;
            typeSpecificPrompt += `測的字：「${data.character || question}」\n\n`;
            typeSpecificPrompt += `【任務】\n`;
            typeSpecificPrompt += `請運用傳統測字術（拆字法、會意法、形象法）結合現代心理學，分析這個字對使用者的啟示。你需要：\n`;
            typeSpecificPrompt += `1. 分析字的結構組成（部首、筆畫、拆解後的含義）\n`;
            typeSpecificPrompt += `2. 探討字形的象徵意義和聯想\n`;
            typeSpecificPrompt += `3. 解讀這個字背後的能量和訊息\n`;
            typeSpecificPrompt += `4. 提供基於此字的生活指引和建議\n\n`;
            typeSpecificPrompt += `請以傳統測字師的神秘感，結合心理學的專業性，給出分析。\n\n`;
            typeSpecificPrompt += `JSON 輸出格式：\n`;
            typeSpecificPrompt += `{\n`;
            typeSpecificPrompt += `  "opening": "關於這個字的玄妙開場",\n`;
            typeSpecificPrompt += `  "analysis": "詳細的字形分析和象徵解讀（300-500字）",\n`;
            typeSpecificPrompt += `  "structure": "字的結構拆解分析",\n`;
            typeSpecificPrompt += `  "advice": ["建議1", "建議2", "建議3"],\n`;
            typeSpecificPrompt += `  "luckyItems": {"幸運色": "顏色", "幸運數字": "數字"}\n`;
            typeSpecificPrompt += `}`;
            break;

        case 'meditation':
            typeSpecificPrompt = `視覺冥想引導生成\n\n`;
            typeSpecificPrompt += `冥想主題：${data.theme || question}\n\n`;
            typeSpecificPrompt += `【任務】\n`;
            typeSpecificPrompt += `請為使用者生成一個完整的視覺冥想引導。你需要：\n`;
            typeSpecificPrompt += `1. 創建一個生動、詳細的視覺場景描述（如：寧靜的森林、海邊日出、星空下等），讓使用者能夠在腦海中清晰想像。\n`;
            typeSpecificPrompt += `2. 提供逐步的冥想引導步驟（建議5-8步），包括如何進入場景、如何感受環境、如何與場景互動等。\n`;
            typeSpecificPrompt += `3. 給出呼吸節奏建議（如：4-4-4-4 呼吸法，或根據主題自定義）。\n`;
            typeSpecificPrompt += `4. 提供冥想結束後的建議，幫助使用者將冥想中的感受帶回現實生活。\n`;
            typeSpecificPrompt += `5. 建議冥想時長（如：10分鐘、15分鐘等）。\n\n`;
            typeSpecificPrompt += `請以冥想導師的角度，用溫和、引導性的語言，創造一個能夠幫助使用者達到「${data.theme || '平靜'}」狀態的冥想體驗。\n\n`;
            typeSpecificPrompt += `JSON 輸出格式：\n`;
            typeSpecificPrompt += `{\n`;
            typeSpecificPrompt += `  "scene": "詳細的視覺場景描述（200-300字）",\n`;
            typeSpecificPrompt += `  "guide": ["步驟1", "步驟2", "步驟3", "步驟4", "步驟5"],\n`;
            typeSpecificPrompt += `  "breathing": "呼吸節奏建議（如：吸氣4秒，屏息4秒，呼氣4秒，停頓4秒）",\n`;
            typeSpecificPrompt += `  "advice": ["結束後建議1", "結束後建議2", "結束後建議3"],\n`;
            typeSpecificPrompt += `  "duration": "建議時長（如：10-15分鐘）"\n`;
            typeSpecificPrompt += `}`;
            break;

        case 'tarot':
            if (data.cards && data.cards.length > 0) {
                // RAG：從定義庫中獲取牌的詳細資訊
                let ragContext = '';
                
                if (data.spread === 'single') {
                    const card = data.cards[0];
                    const cardName = card.name; // 去除正逆位標記，只取牌名
                    const cardDef = tarotDefinitions[cardName];
                    
                    typeSpecificPrompt = `塔羅牌占卜 - 單張牌\n\n`;
                    typeSpecificPrompt += `用戶的問題：${question}\n\n`;
                    
                    // RAG：加入牌的官方定義
                    if (cardDef) {
                        const orientation = card.orientation === '逆位' ? 'reversed' : 'upright';
                        const cardInfo = cardDef[orientation] || cardDef.upright;
                        
                        typeSpecificPrompt += `【牌的官方定義 - 請嚴格遵循此定義進行解讀】\n`;
                        typeSpecificPrompt += `牌名：${cardName}\n`;
                        typeSpecificPrompt += `關鍵字：${cardDef.keywords.join('、')}\n`;
                        typeSpecificPrompt += `核心含義：${cardDef.meaning}\n`;
                        typeSpecificPrompt += `${orientation === 'reversed' ? '逆位' : '正位'}含義：${cardInfo.meaning}\n`;
                        typeSpecificPrompt += `${orientation === 'reversed' ? '逆位' : '正位'}建議：${cardInfo.advice}\n\n`;
                    }
                    
                    typeSpecificPrompt += `抽到的牌：${card.displayName || card.name}\n`;
                    if (card.orientation) {
                        typeSpecificPrompt += `正逆位：${card.orientation}\n`;
                    }
                    typeSpecificPrompt += `\n請根據以上官方定義，結合用戶的問題進行解讀。必須確保解讀不偏離牌的核心原義。\n`;
                } else if (data.spread === 'three') {
                    typeSpecificPrompt = `塔羅牌占卜 - 三張牌陣（過去-現在-未來）\n\n`;
                    typeSpecificPrompt += `用戶的問題：${question}\n\n`;
                    
                    // RAG：為每張牌加入定義
                    typeSpecificPrompt += `【牌的官方定義 - 請嚴格遵循此定義進行解讀】\n`;
                    data.cards.forEach((card, index) => {
                        const cardName = card.name;
                        const cardDef = tarotDefinitions[cardName];
                        const orientation = card.orientation === '逆位' ? 'reversed' : 'upright';
                        
                        if (cardDef) {
                            const cardInfo = cardDef[orientation] || cardDef.upright;
                            typeSpecificPrompt += `\n${card.position}（${card.displayName || cardName}）：\n`;
                            typeSpecificPrompt += `- 關鍵字：${cardDef.keywords.join('、')}\n`;
                            typeSpecificPrompt += `- 核心含義：${cardDef.meaning}\n`;
                            typeSpecificPrompt += `- ${orientation === 'reversed' ? '逆位' : '正位'}含義：${cardInfo.meaning}\n`;
                        } else {
                            typeSpecificPrompt += `\n${card.position}：${card.displayName || cardName}（${card.meaning}）\n`;
                        }
                    });
                    typeSpecificPrompt += `\n請根據以上官方定義，結合三張牌的關係和用戶的問題進行綜合解讀。必須確保解讀不偏離每張牌的核心原義。\n`;
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

        case 'numerology':
            typeSpecificPrompt = `生命靈數占卜\n\n`;
            typeSpecificPrompt += `生命靈數：${data.number || ''}\n`;
            typeSpecificPrompt += `含義：${data.meaning || ''}\n`;
            typeSpecificPrompt += `\n請根據生命靈數的特質，結合用戶的問題進行解讀。`;
            break;

        case 'color':
            typeSpecificPrompt = `顏色占卜\n\n`;
            typeSpecificPrompt += `選擇的顏色：${data.color || question}\n`;
            typeSpecificPrompt += `\n請根據顏色的象徵意義，結合用戶的問題進行解讀。`;
            break;

        case 'time':
            typeSpecificPrompt = `時間占卜\n\n`;
            typeSpecificPrompt += `選擇的時間：${data.time || ''}\n`;
            typeSpecificPrompt += `時段：${data.timeSlot || ''}\n`;
            typeSpecificPrompt += `\n請根據時間的能量特質，結合用戶的問題進行解讀。`;
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
    console.log(`  - GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✅ 已設置（可選）' : 'ℹ️  未設置（用戶可在前端提供）'}`);
    if (!process.env.GEMINI_API_KEY) {
        console.log(`\n💡 提示：用戶可以在前端輸入自己的 API 金鑰，無需設置環境變數`);
    }
});

