// 星座運勢跑馬燈控制器
class HoroscopeMarquee {
    constructor() {
        this.zodiacs = [
            { name: '白羊座', icon: '♈', english: 'Aries', emoji: '🐏' },
            { name: '金牛座', icon: '♉', english: 'Taurus', emoji: '🐂' },
            { name: '雙子座', icon: '♊', english: 'Gemini', emoji: '👯' },
            { name: '巨蟹座', icon: '♋', english: 'Cancer', emoji: '🦀' },
            { name: '獅子座', icon: '♌', english: 'Leo', emoji: '🦁' },
            { name: '處女座', icon: '♍', english: 'Virgo', emoji: '👸' },
            { name: '天秤座', icon: '♎', english: 'Libra', emoji: '⚖️' },
            { name: '天蠍座', icon: '♏', english: 'Scorpio', emoji: '🦂' },
            { name: '射手座', icon: '♐', english: 'Sagittarius', emoji: '🏹' },
            { name: '摩羯座', icon: '♑', english: 'Capricorn', emoji: '🐐' },
            { name: '水瓶座', icon: '♒', english: 'Aquarius', emoji: '💧' },
            { name: '雙魚座', icon: '♓', english: 'Pisces', emoji: '🐟' }
        ];
        this.currentIndex = 0;
        this.fortunes = new Map(); // 緩存運勢數據
        this.displayDuration = 8000; // 每個星座顯示8秒
        this.transitionDuration = 1000; // 過渡動畫1秒
        this.isPaused = false;
        this.init();
    }

    async init() {
        // 清理所有舊的緩存
        this.cleanAllOldCache();
        
        // 載入今日運勢
        await this.loadTodayFortunes();
        
        // 開始輪播（即使沒有數據也會顯示載入中）
        this.startMarquee();
        
        // 設置定時檢查：每小時檢查一次是否需要更新
        setInterval(() => {
            this.loadTodayFortunes();
        }, 60 * 60 * 1000);
        
        // 設置定時檢查：每天凌晨檢查並清理舊緩存
        setInterval(() => {
            this.cleanAllOldCache();
            this.loadTodayFortunes();
        }, 24 * 60 * 60 * 1000); // 每24小時檢查一次
    }
    
    // 清理舊的緩存（只保留今天的）
    cleanOldCache(today) {
        try {
            // 獲取所有以 horoscope_ 開頭的緩存鍵
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('horoscope_')) {
                    const keyDate = key.replace('horoscope_', '');
                    // 如果不是今天的，刪除
                    if (keyDate !== today) {
                        localStorage.removeItem(key);
                        console.log('刪除舊緩存:', key);
                    }
                }
            });
        } catch (e) {
            console.warn('清理舊緩存失敗:', e);
        }
    }
    
    // 清理所有舊的緩存（只保留今天的）
    cleanAllOldCache() {
        const today = new Date().toISOString().split('T')[0];
        this.cleanOldCache(today);
    }

    // 載入今日所有星座運勢
    async loadTodayFortunes() {
        const today = new Date().toISOString().split('T')[0];
        const cachedKey = `horoscope_${today}`;
        
        // 清理舊的緩存（隔天的數據）
        this.cleanOldCache(today);
        
        // 檢查今日緩存
        try {
            const cached = localStorage.getItem(cachedKey);
            if (cached) {
                const data = JSON.parse(cached);
                // 檢查緩存日期是否為今天
                const cacheDate = new Date(data.timestamp).toISOString().split('T')[0];
                if (cacheDate === today) {
                    // 清理緩存數據中的錯誤格式
                    const cleanedFortunes = new Map();
                    const cleanText = (text) => {
                        if (!text) return null;
                        let cleaned = String(text).trim();
                        
                        // 處理 JSON 轉義格式 "情\": \"敞開心扉..."
                        const jsonMatch1 = cleaned.match(/[^"]*["']?[^"']*["']?\s*[:：]\s*["']?([^"']+?)["']?/);
                        if (jsonMatch1 && jsonMatch1[1]) {
                            cleaned = jsonMatch1[1];
                        }
                        
                        const jsonMatch2 = cleaned.match(/\\"([^"]+?)\\"/);
                        if (jsonMatch2 && jsonMatch2[1]) {
                            cleaned = jsonMatch2[1];
                        }
                        
                        cleaned = cleaned.replace(/\\"/g, '"');
                        cleaned = cleaned.replace(/\\'/g, "'");
                        cleaned = cleaned.replace(/\\n/g, ' ');
                        cleaned = cleaned.replace(/\\t/g, ' ');
                        cleaned = cleaned.replace(/^["'「]|["'」]$/g, '');
                        cleaned = cleaned.replace(/^[^a-zA-Z\u4e00-\u9fa50-9]+[:：]\s*["']?/g, '');
                        cleaned = cleaned.replace(/["']?\s*[,，]?$/g, '');
                        cleaned = cleaned.replace(/^[^a-zA-Z\u4e00-\u9fa50-9]+/g, '');
                        
                        if (!cleaned || cleaned.length === 0 || /^[^a-zA-Z\u4e00-\u9fa50-9]+$/.test(cleaned)) {
                            return null;
                        }
                        
                        return cleaned.trim() || null;
                    };
                    
                    for (const [zodiacName, fortune] of data.fortunes) {
                        const cleanedFortune = { ...fortune };
                        cleanedFortune.love = cleanText(cleanedFortune.love);
                        cleanedFortune.career = cleanText(cleanedFortune.career);
                        cleanedFortune.wealth = cleanText(cleanedFortune.wealth);
                        cleanedFortune.health = cleanText(cleanedFortune.health);
                        cleanedFortunes.set(zodiacName, cleanedFortune);
                    }
                    
                    this.fortunes = cleanedFortunes;
                    console.log(`從緩存載入今日運勢，共 ${this.fortunes.size} 個星座`);
                    // 調試：檢查緩存數據
                    if (this.fortunes.size > 0) {
                        const firstFortune = Array.from(this.fortunes.values())[0];
                        console.log('緩存數據示例（清理後）:', JSON.stringify(firstFortune, null, 2));
                    }
                    // 如果正在運行，更新當前顯示
                    if (this.marqueeInterval) {
                        this.showCurrentZodiac();
                    }
                    return;
                } else {
                    // 緩存不是今天的，刪除它
                    localStorage.removeItem(cachedKey);
                    console.log('刪除過期緩存:', cachedKey);
                }
            }
        } catch (e) {
            console.warn('讀取運勢緩存失敗:', e);
            // 如果緩存損壞，刪除它
            localStorage.removeItem(cachedKey);
        }

        // 使用 Gemini API 獲取運勢
        const geminiApiKey = typeof getApiKey === 'function' ? getApiKey() : null;
        
        if (geminiApiKey) {
            console.log('使用 Gemini API 獲取運勢...');
            await this.fetchFortunesFromAI(geminiApiKey, today, cachedKey);
        } else {
            // 沒有 API 金鑰
            console.warn('❌ 沒有設置 Gemini API 金鑰，無法獲取運勢數據');
            throw new Error('請設置 Gemini API 金鑰');
        }
        
        // 驗證是否獲取到數據
        if (this.fortunes.size === 0) {
            throw new Error('未能獲取任何運勢數據');
        }
    }

    // 從 AI 獲取運勢（Gemini API 備用方案）
    async fetchFortunesFromAI(apiKey, date, cacheKey) {
        try {
            // 為所有星座生成運勢
            const fortunes = new Map();
            
            // 分批獲取（避免一次請求太多）
            for (const zodiac of this.zodiacs) {
                try {
                    const fortune = await this.fetchSingleZodiacFortune(zodiac, apiKey, date);
                    fortunes.set(zodiac.name, fortune);
                    
                    // 更新顯示（如果當前正在顯示這個星座）
                    if (this.marqueeInterval && this.zodiacs[this.currentIndex].name === zodiac.name) {
                        this.updateDisplay(zodiac, fortune);
                    }
                } catch (error) {
                    console.error(`[${zodiac.name}] 獲取運勢失敗:`, error);
                    // 不設置預設值，記錄錯誤即可
                }
                
                // 延遲一下，避免請求過快
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            
            this.fortunes = fortunes;
            
            // 保存到緩存
            const cacheData = {
                date: date, // 保存日期
                timestamp: new Date().toISOString(),
                fortunes: Array.from(fortunes.entries())
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            console.log(`已保存 ${fortunes.size} 個星座的運勢到緩存: ${cacheKey}`);
        } catch (error) {
            console.error('批量獲取運勢失敗:', error);
            // 不生成預設值，讓錯誤傳播
            throw error;
        }
    }

    // 獲取單個星座運勢（使用 Gemini API）
    async fetchSingleZodiacFortune(zodiac, apiKey, date) {
        // 使用 Gemini API
        const question = `請為${zodiac.name}（${zodiac.english}）生成今日（${date}）的運勢，包括：整體運勢（1-5星）、愛情、事業、財運、健康等方面的簡短建議。請用簡潔的語言，每項不超過20字。`;
        
        const data = {
            type: 'horoscope',
            zodiac: zodiac.name,
            date: date
        };

        try {
            const response = await fetch('/api/divination', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'horoscope',
                    question: question,
                    data: data,
                    apiKey: apiKey
                })
            });

            if (!response.ok) {
                throw new Error('API 請求失敗');
            }

            const result = await response.json();
            
            // 解析 AI 返回的實際結果（不添加預設值）
            if (result.result) {
                let resultData = result.result;
                
                // 調試：記錄原始數據
                console.log(`[${zodiac.name}] 原始數據類型:`, typeof resultData);
                console.log(`[${zodiac.name}] 原始數據:`, resultData);
                
                // 如果 resultData 是字符串，嘗試解析為 JSON
                if (typeof resultData === 'string') {
                    // 嘗試提取 JSON 部分（可能包含在 ```json ... ``` 中）
                    let jsonStr = resultData;
                    const jsonMatch = resultData.match(/```json\s*([\s\S]*?)\s*```/);
                    if (jsonMatch) {
                        jsonStr = jsonMatch[1];
                    } else {
                        // 嘗試提取 {...} 部分
                        const braceMatch = resultData.match(/\{[\s\S]*\}/);
                        if (braceMatch) {
                            jsonStr = braceMatch[0];
                        }
                    }
                    
                    try {
                        resultData = JSON.parse(jsonStr);
                        console.log(`[${zodiac.name}] 解析後的 JSON:`, JSON.stringify(resultData, null, 2));
                    } catch (e) {
                        console.warn(`[${zodiac.name}] JSON 解析失敗，當作文本處理:`, e);
                        // 如果不是 JSON，當作普通文本處理
                        resultData = { analysis: resultData };
                    }
                }
                
                // 處理新的 API 格式：可能包含 marqueeHoroscope 或 detailedReading
                if (resultData.marqueeHoroscope) {
                    console.log(`[${zodiac.name}] 使用 marqueeHoroscope 數據`);
                    resultData = resultData.marqueeHoroscope;
                } else if (resultData.detailedReading && !resultData.summary && !resultData.love) {
                    console.log(`[${zodiac.name}] 使用 detailedReading 數據`);
                    resultData = resultData.detailedReading;
                }
                
                // 嘗試直接使用結構化數據
                let fortune = {
                    overall: resultData.overall || resultData.overallRating || null,
                    love: resultData.love || resultData.愛情 || resultData['感情'] || resultData.romance || null,
                    career: resultData.career || resultData.事業 || resultData.work || resultData['工作'] || null,
                    wealth: resultData.wealth || resultData.財運 || resultData.finance || resultData['財富'] || resultData.money || null,
                    health: resultData.health || resultData.健康 || null,
                    summary: resultData.summary || resultData.opening || resultData.analysis || null
                };
                
                // 如果沒有具體運勢但有 summary/opening，使用它
                if (!fortune.love && !fortune.career && !fortune.wealth && !fortune.health) {
                    if (resultData.summary || resultData.opening) {
                        fortune.summary = resultData.summary || resultData.opening;
                        console.log(`[${zodiac.name}] 使用 summary/opening 作為運勢描述`);
                    }
                }
                
                // 清理數據：移除可能的 JSON 轉義字符和引號
                const cleanText = (text) => {
                    if (!text) return null;
                    let cleaned = String(text).trim();
                    
                    // 如果包含 JSON 轉義格式（如 "情\": \"敞開心扉..."），提取實際內容
                    // 匹配模式：任何字符 + 引號 + 冒號 + 空格 + 引號 + 實際內容
                    // 例如："情\": \"敞開心扉..." -> "敞開心扉..."
                    const jsonMatch1 = cleaned.match(/[^"]*["']?[^"']*["']?\s*[:：]\s*["']?([^"']+?)["']?/);
                    if (jsonMatch1 && jsonMatch1[1]) {
                        cleaned = jsonMatch1[1];
                    }
                    
                    // 另一個匹配模式：處理 "key\": \"value" 格式
                    const jsonMatch2 = cleaned.match(/\\"([^"]+?)\\"/);
                    if (jsonMatch2 && jsonMatch2[1]) {
                        cleaned = jsonMatch2[1];
                    }
                    
                    // 移除 JSON 轉義的引號（先處理轉義字符）
                    cleaned = cleaned.replace(/\\"/g, '"');
                    cleaned = cleaned.replace(/\\'/g, "'");
                    cleaned = cleaned.replace(/\\n/g, ' ');
                    cleaned = cleaned.replace(/\\t/g, ' ');
                    
                    // 移除開頭和結尾的引號
                    cleaned = cleaned.replace(/^["'「]|["'」]$/g, '');
                    
                    // 移除可能的 JSON 格式殘留（如 "key\": \"value" 或 情\": \"value）
                    // 匹配：開頭的非文字字符 + 冒號 + 空格 + 引號
                    cleaned = cleaned.replace(/^[^a-zA-Z\u4e00-\u9fa50-9]+[:：]\s*["']?/g, '');
                    cleaned = cleaned.replace(/["']?\s*[,，]?$/g, '');
                    
                    // 移除開頭的非文字字符（保留中英文和數字）
                    cleaned = cleaned.replace(/^[^a-zA-Z\u4e00-\u9fa50-9]+/g, '');
                    
                    // 如果清理後為空或只包含特殊字符，返回 null
                    if (!cleaned || cleaned.length === 0 || /^[^a-zA-Z\u4e00-\u9fa50-9]+$/.test(cleaned)) {
                        return null;
                    }
                    
                    return cleaned.trim() || null;
                };
                
                // 處理 summary 字段（可能包含 JSON 字符串或 Markdown 包裹的 JSON）
                if (fortune.summary && typeof fortune.summary === 'string') {
                    const originalSummary = fortune.summary;
                    let extractedSummary = null;
                    
                    // 檢查是否包含 JSON 格式的內容
                    if (originalSummary.includes('```json') || originalSummary.includes('"summary"') || originalSummary.includes('"opening"')) {
                        // 嘗試多種方式提取
                        
                        // 方法1：提取 "summary" 字段的值
                        const summaryMatch = originalSummary.match(/"summary"\s*:\s*"([^"]+)"/);
                        if (summaryMatch && summaryMatch[1]) {
                            extractedSummary = summaryMatch[1].replace(/\\n/g, ' ').replace(/\\"/g, '"');
                            console.log(`[${zodiac.name}] 從 JSON 提取 summary:`, extractedSummary);
                        }
                        
                        // 方法2：提取 "opening" 字段的值（通常更詳細）
                        const openingMatch = originalSummary.match(/"opening"\s*:\s*"([^"]+)"/);
                        if (openingMatch && openingMatch[1]) {
                            const opening = openingMatch[1].replace(/\\n/g, ' ').replace(/\\"/g, '"');
                            // 如果 opening 比 summary 長，使用 opening
                            if (!extractedSummary || opening.length > extractedSummary.length) {
                                extractedSummary = opening;
                                console.log(`[${zodiac.name}] 從 JSON 提取 opening:`, extractedSummary);
                            }
                        }
                        
                        // 方法3：提取 love/career/wealth/health
                        const loveMatch = originalSummary.match(/"(?:love|愛情|感情)"\s*:\s*"([^"]+)"/);
                        const careerMatch = originalSummary.match(/"(?:career|事業|工作)"\s*:\s*"([^"]+)"/);
                        const wealthMatch = originalSummary.match(/"(?:wealth|財運|財富)"\s*:\s*"([^"]+)"/);
                        const healthMatch = originalSummary.match(/"(?:health|健康)"\s*:\s*"([^"]+)"/);
                        
                        if (loveMatch) fortune.love = loveMatch[1].replace(/\\n/g, ' ').replace(/\\"/g, '"');
                        if (careerMatch) fortune.career = careerMatch[1].replace(/\\n/g, ' ').replace(/\\"/g, '"');
                        if (wealthMatch) fortune.wealth = wealthMatch[1].replace(/\\n/g, ' ').replace(/\\"/g, '"');
                        if (healthMatch) fortune.health = healthMatch[1].replace(/\\n/g, ' ').replace(/\\"/g, '"');
                        
                        // 更新 summary
                        if (extractedSummary) {
                            fortune.summary = extractedSummary;
                        }
                    }
                    
                    // 如果 summary 仍然以 ```json 開頭，清理它
                    if (fortune.summary && fortune.summary.startsWith('```')) {
                        // 移除 markdown 標記，只保留純文字
                        fortune.summary = fortune.summary
                            .replace(/```json\s*/g, '')
                            .replace(/```\s*/g, '')
                            .replace(/^\s*\{\s*/, '')
                            .replace(/\s*\}\s*$/, '')
                            .replace(/"[^"]+"\s*:\s*"?/g, '')
                            .trim();
                        
                        // 如果清理後為空或太短，使用 extractedSummary
                        if (fortune.summary.length < 10 && extractedSummary) {
                            fortune.summary = extractedSummary;
                        }
                    }
                }
                
                // 檢查是否有有效的運勢數據（包括 summary）
                if (fortune.overall || fortune.love || fortune.career || fortune.wealth || fortune.health || fortune.summary) {
                    // 清理所有文字
                    fortune.love = cleanText(fortune.love);
                    fortune.career = cleanText(fortune.career);
                    fortune.wealth = cleanText(fortune.wealth);
                    fortune.health = cleanText(fortune.health);
                    // summary 不需要 cleanText，因為它通常是完整的句子
                    if (fortune.summary) {
                        fortune.summary = String(fortune.summary).trim();
                    }
                    
                    console.log(`[${zodiac.name}] 最終運勢數據:`, JSON.stringify(fortune, null, 2));
                    return fortune;
                }
                
                // 否則解析文本內容
                const content = resultData.analysis || resultData.summary || resultData.opening || '';
                if (content) {
                    return this.parseFortuneContent(content, zodiac);
                }
            }
            
            // 如果沒有有效數據，拋出錯誤
            throw new Error('AI 返回的數據格式無法解析');
        } catch (error) {
            console.error(`[${zodiac.name}] 獲取運勢錯誤:`, error);
            // 不返回預設值，讓錯誤傳播
            throw error;
        }
    }
    
    // 將分數轉換為星級
    convertScoreToStars(score) {
        if (typeof score === 'number') {
            const stars = Math.round(score);
            return '⭐'.repeat(Math.max(1, Math.min(5, stars)));
        }
        return '⭐⭐⭐';
    }

    // 解析運勢內容
    parseFortuneContent(content, zodiac) {
        // 嘗試提取關鍵信息
        const lines = content.split('\n').filter(line => line.trim());
        
        let overall = null;
        let love = null;
        let career = null;
        let wealth = null;
        let health = null;
        
        // 解析每一行
        for (const line of lines) {
            const trimmedLine = line.trim();
            
            // 解析整體運勢（⭐符號）
            if (trimmedLine.includes('整體') || trimmedLine.includes('運勢')) {
                const stars = (trimmedLine.match(/[⭐★]/g) || []).length;
                if (stars > 0) {
                    overall = '⭐'.repeat(Math.min(stars, 5));
                } else {
                    // 嘗試從文字中提取星級
                    if (trimmedLine.includes('五') || trimmedLine.includes('5')) overall = '⭐⭐⭐⭐⭐';
                    else if (trimmedLine.includes('四') || trimmedLine.includes('4')) overall = '⭐⭐⭐⭐';
                    else if (trimmedLine.includes('三') || trimmedLine.includes('3')) overall = '⭐⭐⭐';
                    else if (trimmedLine.includes('二') || trimmedLine.includes('2')) overall = '⭐⭐';
                    else if (trimmedLine.includes('一') || trimmedLine.includes('1')) overall = '⭐';
                }
            }
            
            // 解析愛情運勢
            if (trimmedLine.includes('愛情') || trimmedLine.includes('感情')) {
                const match = trimmedLine.match(/(?:愛情|感情)[：:]\s*(.+)/);
                if (match && match[1]) {
                    love = match[1].trim();
                }
            }
            
            // 解析事業運勢
            if (trimmedLine.includes('事業') || trimmedLine.includes('工作')) {
                const match = trimmedLine.match(/(?:事業|工作)[：:]\s*(.+)/);
                if (match && match[1]) {
                    career = match[1].trim();
                }
            }
            
            // 解析財運
            if (trimmedLine.includes('財運') || trimmedLine.includes('財富')) {
                const match = trimmedLine.match(/(?:財運|財富)[：:]\s*(.+)/);
                if (match && match[1]) {
                    wealth = match[1].trim();
                }
            }
            
            // 解析健康
            if (trimmedLine.includes('健康')) {
                const match = trimmedLine.match(/健康[：:]\s*(.+)/);
                if (match && match[1]) {
                    health = match[1].trim();
                }
            }
        }
        
        // 只返回實際解析到的數據，不添加預設值
        const result = {
            overall: overall || null,
            love: love || null,
            career: career || null,
            wealth: wealth || null,
            health: health || null,
            summary: content ? (content.substring(0, 100) + (content.length > 100 ? '...' : '')) : null
        };
        
        // 驗證至少有一些數據
        const hasData = result.love || result.career || result.wealth || result.health || result.summary;
        if (!hasData) {
            throw new Error('無法從文本中解析出運勢內容');
        }
        
        return result;
    }

    // 生成預設運勢
    generateDefaultFortunes() {
        const fortunes = new Map();
        for (const zodiac of this.zodiacs) {
            fortunes.set(zodiac.name, this.getDefaultFortune(zodiac));
        }
        this.fortunes = fortunes;
    }

    // 獲取預設運勢
    getDefaultFortune(zodiac) {
        const fortunes = [
            { overall: '⭐⭐⭐⭐', love: '感情運勢佳，適合表達心意', career: '工作進展順利，有新的機會', wealth: '財運上升，投資需謹慎', health: '健康狀況良好，注意休息' },
            { overall: '⭐⭐⭐', love: '感情平穩，多溝通增進了解', career: '事業穩定發展，保持專注', wealth: '財運穩定，理性消費', health: '身體狀況良好，適度運動' },
            { overall: '⭐⭐⭐⭐⭐', love: '感情運勢極佳，單身者有望脫單', career: '事業運勢強勁，把握機會', wealth: '財運亨通，適合投資', health: '精力充沛，注意飲食' }
        ];
        
        // 根據星座索引選擇不同的運勢
        const index = this.zodiacs.indexOf(zodiac);
        return fortunes[index % fortunes.length];
    }

    // 開始跑馬燈
    startMarquee() {
        // 清除現有的定時器
        if (this.marqueeInterval) {
            clearInterval(this.marqueeInterval);
            this.marqueeInterval = null;
        }
        
        // 如果沒有運勢數據，顯示提示
        if (this.fortunes.size === 0) {
            console.warn('沒有運勢數據，顯示載入中狀態');
            const content = document.getElementById('marqueeContent');
            if (content) {
                content.innerHTML = `
                    <div class="marquee-item">
                        <div class="zodiac-icon">⏳</div>
                        <div class="zodiac-info">
                            <div class="zodiac-header">
                                <span class="zodiac-name">載入中...</span>
                            </div>
                            <div class="zodiac-fortune">
                                <span style="color: #ffb74d;">正在從 API 獲取運勢數據，請稍候...</span>
                            </div>
                        </div>
                    </div>
                `;
            }
            return;
        }
        
        // 立即顯示第一個
        this.showCurrentZodiac();
        
        // 設置定時器
        this.marqueeInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextZodiac();
            }
        }, this.displayDuration);
        
        console.log('跑馬燈已啟動，將每', this.displayDuration / 1000, '秒切換一次星座，共', this.fortunes.size || 0, '個星座');
    }

    // 顯示當前星座
    showCurrentZodiac() {
        const zodiac = this.zodiacs[this.currentIndex];
        const fortune = this.fortunes.get(zodiac.name);
        
        if (!fortune) {
            // 如果沒有運勢數據，顯示載入中
            const content = document.getElementById('marqueeContent');
            if (content) {
                const today = new Date();
                const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
                const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
                const weekday = weekdays[today.getDay()];
                
                content.innerHTML = `
                    <div class="marquee-item">
                        <div class="marquee-date">
                            <span class="date-text">📅 ${dateStr} 星期${weekday}</span>
                        </div>
                        <div class="zodiac-icon">${zodiac.icon}</div>
                        <div class="zodiac-info">
                            <div class="zodiac-header">
                                <span class="zodiac-name">${zodiac.name} ${zodiac.emoji}</span>
                            </div>
                            <div class="zodiac-fortune">
                                <span style="color: #ffb74d;">⏳ 正在載入運勢數據...</span>
                            </div>
                        </div>
                    </div>
                `;
            }
            return;
        }
        
        this.updateDisplay(zodiac, fortune);
    }

    // 更新顯示
    updateDisplay(zodiac, fortune) {
        const content = document.getElementById('marqueeContent');
        if (!content) return;

        // 調試：記錄要顯示的數據
        console.log(`[${zodiac.name}] 顯示運勢數據:`, JSON.stringify(fortune, null, 2));

        // 添加淡出效果
        content.style.opacity = '0';
        content.style.transform = 'translateX(-20px)';

        // 獲取今日日期
        const today = new Date();
        const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        const weekday = weekdays[today.getDay()];

        setTimeout(() => {
            // 生成指示器
            const indicators = this.zodiacs.map((z, i) => 
                `<div class="zodiac-dot ${i === this.currentIndex ? 'active' : ''}" 
                     data-index="${i}" 
                     title="${z.name}"
                     onclick="horoscopeMarquee.goToZodiac(${i})"></div>`
            ).join('');
            
            content.innerHTML = `
                <div class="marquee-item">
                    <div class="marquee-date">
                        <span class="date-text">📅 ${dateStr} 星期${weekday}</span>
                    </div>
                    <div class="zodiac-icon">${zodiac.icon}</div>
                    <div class="zodiac-info">
                        <div class="zodiac-header">
                            <span class="zodiac-name">${zodiac.name} ${zodiac.emoji}</span>
                            ${fortune.overall ? `<span class="zodiac-rating">${fortune.overall}</span>` : ''}
                        </div>
                        <div class="zodiac-fortune">
                            ${fortune.love ? `<span class="fortune-item">💕 感情：${String(fortune.love || '').trim()}</span>` : ''}
                            ${fortune.career ? `<span class="fortune-item">💼 事業：${String(fortune.career || '').trim()}</span>` : ''}
                            ${fortune.wealth ? `<span class="fortune-item">💰 財運：${String(fortune.wealth || '').trim()}</span>` : ''}
                            ${fortune.health ? `<span class="fortune-item">💚 健康：${String(fortune.health || '').trim()}</span>` : ''}
                            ${fortune.summary ? 
                                `<span class="fortune-item fortune-summary">✨ ${String(fortune.summary).trim()}</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="zodiac-indicators">${indicators}</div>
                <div class="marquee-progress"></div>
            `;

            // 添加淡入效果
            setTimeout(() => {
                content.style.opacity = '1';
                content.style.transform = 'translateX(0)';
            }, 50);
        }, this.transitionDuration / 2);
    }

    // 下一個星座
    nextZodiac() {
        this.currentIndex = (this.currentIndex + 1) % this.zodiacs.length;
        console.log('切換到星座:', this.zodiacs[this.currentIndex].name, '索引:', this.currentIndex);
        this.showCurrentZodiac();
    }

    // 暫停/繼續
    togglePause() {
        this.isPaused = !this.isPaused;
        if (!this.isPaused) {
            this.startMarquee();
        }
    }

    // 手動切換到指定星座
    goToZodiac(index) {
        if (index >= 0 && index < this.zodiacs.length) {
            this.currentIndex = index;
            this.showCurrentZodiac();
        }
    }
    
    // 截斷文本（改進版，確保不會在字符中間截斷）
    truncateText(text, maxLength) {
        if (!text) return '';
        const str = String(text).trim();
        // 如果文字長度不超過限制，直接返回
        if (str.length <= maxLength) {
            return str;
        }
        // 截斷並添加省略號
        return str.substring(0, maxLength) + '...';
    }
    
}

// 初始化跑馬燈
let horoscopeMarquee;
document.addEventListener('DOMContentLoaded', () => {
    horoscopeMarquee = new HoroscopeMarquee();
});

