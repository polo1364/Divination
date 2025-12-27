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
                    this.fortunes = new Map(data.fortunes);
                    console.log(`從緩存載入今日運勢，共 ${this.fortunes.size} 個星座`);
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

        // 優先使用 Free Astrology API
        const astrologyApiKey = typeof getAstrologyApiKey === 'function' ? getAstrologyApiKey() : null;
        const geminiApiKey = typeof getApiKey === 'function' ? getApiKey() : null;
        
        if (astrologyApiKey) {
            // 優先使用 Free Astrology API 獲取運勢
            console.log('使用 Free Astrology API 獲取運勢...');
            try {
                await this.fetchFortunesFromAstrologyAPI(astrologyApiKey, today, cachedKey);
                console.log('✅ Free Astrology API 獲取成功');
            } catch (error) {
                console.error('❌ Free Astrology API 獲取失敗:', error);
                // 如果失敗，嘗試使用 Gemini API 作為備用
                if (geminiApiKey) {
                    console.log('⚠️ 切換到 Gemini API 作為備用...');
                    try {
                        await this.fetchFortunesFromAI(geminiApiKey, today, cachedKey);
                        console.log('✅ Gemini API 備用獲取成功');
                    } catch (geminiError) {
                        console.error('❌ Gemini API 也失敗:', geminiError);
                        throw new Error('所有 API 都無法獲取運勢數據');
                    }
                } else {
                    throw new Error('Free Astrology API 失敗且沒有 Gemini API 備用，請檢查 API 金鑰設置');
                }
            }
        } else if (geminiApiKey) {
            // 如果沒有 Free Astrology API，使用 Gemini API
            console.log('⚠️ 未設置 Free Astrology API，使用 Gemini API 作為備用...');
            await this.fetchFortunesFromAI(geminiApiKey, today, cachedKey);
        } else {
            // 沒有 API 金鑰
            console.warn('❌ 沒有設置任何 API 金鑰，無法獲取運勢數據');
            throw new Error('請設置 Free Astrology API 金鑰（優先）或 Gemini API 金鑰（備用）');
        }
        
        // 驗證是否獲取到數據
        if (this.fortunes.size === 0) {
            throw new Error('未能獲取任何運勢數據');
        }
    }

    // 從 Free Astrology API 批量獲取運勢
    async fetchFortunesFromAstrologyAPI(apiKey, date, cacheKey) {
        try {
            const fortunes = new Map();
            
            console.log(`🔮 開始從 Free Astrology API 獲取 ${this.zodiacs.length} 個星座的運勢...`);
            
            // 並行獲取所有星座運勢
            const promises = this.zodiacs.map(async (zodiac) => {
                try {
                    const fortune = await this.fetchFromAstrologyAPI(zodiac, apiKey);
                    // 驗證數據完整性
                    if (fortune && (fortune.love || fortune.career || fortune.wealth || fortune.health || fortune.summary)) {
                        fortunes.set(zodiac.name, fortune);
                        console.log(`✅ [${zodiac.name}] 運勢獲取成功`);
                        
                        // 更新顯示（如果當前正在顯示這個星座）
                        if (this.marqueeInterval && this.zodiacs[this.currentIndex].name === zodiac.name) {
                            this.updateDisplay(zodiac, fortune);
                        }
                        return { status: 'fulfilled', zodiac: zodiac.name };
                    } else {
                        console.warn(`⚠️ [${zodiac.name}] API 返回的數據不完整:`, fortune);
                        throw new Error('API 返回的數據不完整');
                    }
                } catch (error) {
                    console.error(`❌ [${zodiac.name}] 運勢獲取失敗:`, error);
                    return { status: 'rejected', zodiac: zodiac.name, error: error.message };
                }
            });
            
            // 使用 Promise.allSettled 來處理部分失敗的情況
            const results = await Promise.allSettled(promises);
            
            // 檢查成功獲取的數量
            const successCount = fortunes.size;
            const failCount = this.zodiacs.length - successCount;
            console.log(`📊 運勢獲取完成: 成功 ${successCount}/${this.zodiacs.length} 個，失敗 ${failCount} 個`);
            
            if (fortunes.size > 0) {
                this.fortunes = fortunes;
                
                // 保存到緩存（只保存成功獲取的）
                const cacheData = {
                    date: date, // 保存日期
                    timestamp: new Date().toISOString(),
                    source: 'freeastrologyapi', // 標記數據來源
                    fortunes: Array.from(fortunes.entries())
                };
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));
                console.log(`💾 已保存 ${fortunes.size} 個星座的運勢到緩存: ${cacheKey}`);
            } else {
                throw new Error('未能獲取任何星座運勢數據');
            }
        } catch (error) {
            console.error('❌ 批量獲取運勢失敗:', error);
            // 不生成預設值，讓錯誤傳播
            throw error;
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
                const resultData = result.result;
                
                // 嘗試直接使用結構化數據
                if (resultData.overall || resultData.love || resultData.career || resultData.wealth || resultData.health) {
                    return {
                        overall: resultData.overall || null,
                        love: resultData.love || resultData.愛情 || null,
                        career: resultData.career || resultData.事業 || resultData.work || null,
                        wealth: resultData.wealth || resultData.財運 || resultData.finance || null,
                        health: resultData.health || resultData.健康 || null,
                        summary: resultData.summary || resultData.analysis || resultData.opening || null
                    };
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
    
    // 從 Free Astrology API 獲取運勢
    async fetchFromAstrologyAPI(zodiac, apiKey) {
        // 星座名稱映射到 API 需要的格式
        const zodiacMap = {
            '白羊座': 'aries',
            '金牛座': 'taurus',
            '雙子座': 'gemini',
            '巨蟹座': 'cancer',
            '獅子座': 'leo',
            '處女座': 'virgo',
            '天秤座': 'libra',
            '天蠍座': 'scorpio',
            '射手座': 'sagittarius',
            '摩羯座': 'capricorn',
            '水瓶座': 'aquarius',
            '雙魚座': 'pisces'
        };
        
        const zodiacSign = zodiacMap[zodiac.name] || zodiac.name.toLowerCase();
        
        try {
            // 使用 Free Astrology API 獲取今日運勢
            const response = await fetch(`https://json.astrologyapi.com/v1/horoscope/daily/${zodiacSign}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(apiKey + ':')}`
                }
            });

            if (!response.ok) {
                throw new Error(`API 請求失敗: ${response.status}`);
            }

            const data = await response.json();
            
            // 調試：查看實際返回的數據結構
            console.log(`[${zodiac.name}] Free Astrology API 返回數據:`, data);
            
            // 解析 API 返回的實際數據（不添加任何預設值）
            let loveText = null;
            let careerText = null;
            let wealthText = null;
            let healthText = null;
            let overallScore = null;
            let summaryText = null;
            
            // 檢查數據結構
            if (typeof data === 'object' && data !== null) {
                // 方法1: 檢查是否有分開的字段（最常見的格式）
                if (data.love) loveText = String(data.love).trim();
                if (data.career) careerText = String(data.career).trim();
                if (data.finance) wealthText = String(data.finance).trim();
                if (data.health) healthText = String(data.health).trim();
                
                // 方法2: 檢查其他可能的字段名變體
                if (!loveText && (data.love_text || data.loveText || data.relationship || data.love_prediction)) {
                    loveText = String(data.love_text || data.loveText || data.relationship || data.love_prediction).trim();
                }
                if (!careerText && (data.career_text || data.careerText || data.work || data.career_prediction)) {
                    careerText = String(data.career_text || data.careerText || data.work || data.career_prediction).trim();
                }
                if (!wealthText && (data.finance_text || data.financeText || data.wealth || data.money || data.finance_prediction)) {
                    wealthText = String(data.finance_text || data.financeText || data.wealth || data.money || data.finance_prediction).trim();
                }
                if (!healthText && (data.health_text || data.healthText || data.health_prediction)) {
                    healthText = String(data.health_text || data.healthText || data.health_prediction).trim();
                }
                
                // 方法3: 如果有 prediction 文本，嘗試解析（作為備選）
                if (data.prediction && typeof data.prediction === 'string') {
                    summaryText = String(data.prediction).trim();
                    // 嘗試從 prediction 中提取各項運勢（如果沒有獨立字段）
                    if (!loveText) {
                        const loveMatch = summaryText.match(/(?:愛情|感情|love|relationship)[：:]\s*([^。\n，,]+)/i);
                        if (loveMatch) loveText = loveMatch[1].trim();
                    }
                    if (!careerText) {
                        const careerMatch = summaryText.match(/(?:事業|工作|career|work)[：:]\s*([^。\n，,]+)/i);
                        if (careerMatch) careerText = careerMatch[1].trim();
                    }
                    if (!wealthText) {
                        const wealthMatch = summaryText.match(/(?:財運|財富|finance|money)[：:]\s*([^。\n，,]+)/i);
                        if (wealthMatch) wealthText = wealthMatch[1].trim();
                    }
                    if (!healthText) {
                        const healthMatch = summaryText.match(/(?:健康|health)[：:]\s*([^。\n，,]+)/i);
                        if (healthMatch) healthText = healthMatch[1].trim();
                    }
                }
                
                // 獲取評分
                if (data.score !== undefined && data.score !== null) {
                    overallScore = typeof data.score === 'number' ? data.score : parseInt(data.score);
                    if (isNaN(overallScore)) overallScore = null;
                }
                
                // 獲取摘要（如果沒有 prediction）
                if (!summaryText && (data.description || data.summary || data.text || data.prediction)) {
                    summaryText = String(data.description || data.summary || data.text || data.prediction).trim();
                }
            } else if (typeof data === 'string') {
                // 如果返回的是字符串，作為摘要
                summaryText = data.trim();
            }
            
            // 驗證：至少要有一些實際數據
            const hasData = loveText || careerText || wealthText || healthText || summaryText;
            if (!hasData) {
                console.error(`[${zodiac.name}] API 返回的數據格式無法解析:`, data);
                throw new Error('API 返回的數據格式無法解析，沒有找到有效的運勢內容');
            }
            
            // 只返回實際獲取到的數據，不添加任何預設值
            return {
                overall: overallScore !== null ? this.convertScoreToStars(overallScore) : null,
                love: loveText,
                career: careerText,
                wealth: wealthText,
                health: healthText,
                summary: summaryText
            };
        } catch (error) {
            console.error(`Free Astrology API 錯誤:`, error);
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
        
        let overall = '⭐⭐⭐';
        let love = '感情運勢平穩';
        let career = '事業發展順利';
        let wealth = '財運穩定';
        let health = '健康狀況良好';
        
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
                const match = trimmedLine.match(/[愛情感情：:]\s*(.+)/);
                if (match && match[1]) {
                    love = match[1].trim().substring(0, 20);
                }
            }
            
            // 解析事業運勢
            if (trimmedLine.includes('事業') || trimmedLine.includes('工作')) {
                const match = trimmedLine.match(/[事業工作：:]\s*(.+)/);
                if (match && match[1]) {
                    career = match[1].trim().substring(0, 20);
                }
            }
            
            // 解析財運
            if (trimmedLine.includes('財運') || trimmedLine.includes('財富')) {
                const match = trimmedLine.match(/[財運財富：:]\s*(.+)/);
                if (match && match[1]) {
                    wealth = match[1].trim().substring(0, 20);
                }
            }
            
            // 解析健康
            if (trimmedLine.includes('健康')) {
                const match = trimmedLine.match(/健康[：:]\s*(.+)/);
                if (match && match[1]) {
                    health = match[1].trim().substring(0, 20);
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

        // 添加淡出效果
        content.style.opacity = '0';
        content.style.transform = 'translateX(-20px)';

        // 獲取今日日期
        const today = new Date();
        const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        const weekday = weekdays[today.getDay()];

        setTimeout(() => {
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
                            ${fortune.love ? `<span class="fortune-item">💕 ${this.truncateText(fortune.love, 20)}</span>` : ''}
                            ${fortune.career ? `<span class="fortune-item">💼 ${this.truncateText(fortune.career, 20)}</span>` : ''}
                            ${fortune.wealth ? `<span class="fortune-item">💰 ${this.truncateText(fortune.wealth, 20)}</span>` : ''}
                            ${fortune.health ? `<span class="fortune-item">💚 ${this.truncateText(fortune.health, 20)}</span>` : ''}
                            ${!fortune.love && !fortune.career && !fortune.wealth && !fortune.health && fortune.summary ? 
                                `<span class="fortune-item">${this.truncateText(fortune.summary, 50)}</span>` : ''}
                        </div>
                    </div>
                </div>
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
    
    // 截斷文本
    truncateText(text, maxLength) {
        if (!text) return '';
        const str = String(text);
        return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    }
    
    // 強制重新抓取運勢（清除緩存並重新獲取）
    async refreshFortunes() {
        const today = new Date().toISOString().split('T')[0];
        const cachedKey = `horoscope_${today}`;
        
        console.log('🔄 開始強制重新抓取運勢...');
        
        // 清除今日緩存
        try {
            localStorage.removeItem(cachedKey);
            console.log('🗑️ 已清除今日緩存:', cachedKey);
        } catch (e) {
            console.warn('清除緩存失敗:', e);
        }
        
        // 清空當前運勢數據
        this.fortunes.clear();
        
        // 顯示載入中狀態
        const content = document.getElementById('marqueeContent');
        if (content) {
            const todayDate = new Date();
            const dateStr = `${todayDate.getFullYear()}年${todayDate.getMonth() + 1}月${todayDate.getDate()}日`;
            const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
            const weekday = weekdays[todayDate.getDay()];
            
            content.innerHTML = `
                <div class="marquee-item">
                    <div class="marquee-date">
                        <span class="date-text">📅 ${dateStr} 星期${weekday}</span>
                    </div>
                    <div class="zodiac-icon">🔄</div>
                    <div class="zodiac-info">
                        <div class="zodiac-header">
                            <span class="zodiac-name">重新載入中...</span>
                        </div>
                        <div class="zodiac-fortune">
                            <span style="color: #ffb74d;">正在從 API 重新獲取運勢數據...</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // 重新載入運勢
        try {
            await this.loadTodayFortunes();
            console.log('✅ 運勢重新載入完成');
            
            // 如果輪播已啟動，更新顯示
            if (this.marqueeInterval) {
                this.showCurrentZodiac();
            } else {
                // 如果輪播未啟動，重新啟動
                this.startMarquee();
            }
        } catch (error) {
            console.error('❌ 重新載入運勢失敗:', error);
            // 顯示錯誤狀態
            if (content) {
                content.innerHTML = `
                    <div class="marquee-item">
                        <div class="zodiac-icon">⚠️</div>
                        <div class="zodiac-info">
                            <div class="zodiac-header">
                                <span class="zodiac-name">載入失敗</span>
                            </div>
                            <div class="zodiac-fortune">
                                <span style="color: #ff6b6b;">${error.message || '無法獲取運勢數據'}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }
}

// 初始化跑馬燈
let horoscopeMarquee;
document.addEventListener('DOMContentLoaded', () => {
    horoscopeMarquee = new HoroscopeMarquee();
});

