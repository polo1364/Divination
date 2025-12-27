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
        // 載入今日運勢
        await this.loadTodayFortunes();
        
        // 確保運勢數據已準備好後再開始輪播
        if (this.fortunes.size === 0) {
            this.generateDefaultFortunes();
        }
        
        // 開始輪播
        this.startMarquee();
        
        // 每小時更新一次運勢
        setInterval(() => {
            this.loadTodayFortunes();
        }, 60 * 60 * 1000);
    }

    // 載入今日所有星座運勢
    async loadTodayFortunes() {
        const today = new Date().toISOString().split('T')[0];
        const cachedKey = `horoscope_${today}`;
        
        // 檢查緩存
        try {
            const cached = localStorage.getItem(cachedKey);
            if (cached) {
                const data = JSON.parse(cached);
                // 檢查是否過期（超過24小時）
                if (new Date() - new Date(data.timestamp) < 24 * 60 * 60 * 1000) {
                    this.fortunes = new Map(data.fortunes);
                    // 如果正在運行，更新當前顯示
                    if (this.marqueeInterval) {
                        this.showCurrentZodiac();
                    }
                    return;
                }
            }
        } catch (e) {
            console.warn('讀取運勢緩存失敗:', e);
        }

        // 優先使用 Free Astrology API，如果沒有則使用 Gemini API
        const astrologyApiKey = typeof getAstrologyApiKey === 'function' ? getAstrologyApiKey() : null;
        const geminiApiKey = typeof getApiKey === 'function' ? getApiKey() : null;
        
        if (astrologyApiKey) {
            // 使用 Free Astrology API
            await this.fetchFortunesFromAstrologyAPI(astrologyApiKey, today, cachedKey);
        } else if (geminiApiKey) {
            // 使用 Gemini API 作為備用
            await this.fetchFortunesFromAI(geminiApiKey, today, cachedKey);
        } else {
            // 否則使用預設運勢
            this.generateDefaultFortunes();
        }
        
        // 確保運勢數據已準備好
        if (this.fortunes.size === 0) {
            this.generateDefaultFortunes();
        }
    }

    // 從 Free Astrology API 批量獲取運勢
    async fetchFortunesFromAstrologyAPI(apiKey, date, cacheKey) {
        try {
            const fortunes = new Map();
            
            // 並行獲取所有星座運勢
            const promises = this.zodiacs.map(async (zodiac) => {
                try {
                    const fortune = await this.fetchFromAstrologyAPI(zodiac, apiKey);
                    fortunes.set(zodiac.name, fortune);
                    
                    // 更新顯示（如果當前正在顯示這個星座）
                    if (this.marqueeInterval && this.zodiacs[this.currentIndex].name === zodiac.name) {
                        this.updateDisplay(zodiac, fortune);
                    }
                } catch (error) {
                    console.warn(`獲取${zodiac.name}運勢失敗:`, error);
                    fortunes.set(zodiac.name, this.getDefaultFortune(zodiac));
                }
            });
            
            await Promise.all(promises);
            
            this.fortunes = fortunes;
            
            // 保存到緩存
            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: new Date().toISOString(),
                fortunes: Array.from(fortunes.entries())
            }));
        } catch (error) {
            console.error('批量獲取運勢失敗:', error);
            this.generateDefaultFortunes();
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
                    console.warn(`獲取${zodiac.name}運勢失敗:`, error);
                    // 使用預設運勢
                    fortunes.set(zodiac.name, this.getDefaultFortune(zodiac));
                }
                
                // 延遲一下，避免請求過快
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            
            this.fortunes = fortunes;
            
            // 保存到緩存
            localStorage.setItem(cacheKey, JSON.stringify({
                timestamp: new Date().toISOString(),
                fortunes: Array.from(fortunes.entries())
            }));
        } catch (error) {
            console.error('批量獲取運勢失敗:', error);
            this.generateDefaultFortunes();
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
            
            // 解析 AI 返回的結果
            if (result.result) {
                // 嘗試直接使用結構化數據
                if (result.result.overall || result.result.love) {
                    return {
                        overall: result.result.overall || '⭐⭐⭐',
                        love: result.result.love || '感情運勢平穩',
                        career: result.result.career || result.result.事業 || '事業發展順利',
                        wealth: result.result.wealth || result.result.財運 || '財運穩定',
                        health: result.result.health || result.result.健康 || '健康狀況良好',
                        summary: result.result.summary || result.result.analysis || ''
                    };
                }
                
                // 否則解析文本內容
                const content = result.result.analysis || result.result.summary || result.result.opening || '';
                return this.parseFortuneContent(content, zodiac);
            }
            
            return this.getDefaultFortune(zodiac);
        } catch (error) {
            console.error(`獲取${zodiac.name}運勢錯誤:`, error);
            return this.getDefaultFortune(zodiac);
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
            
            // 解析 API 返回的數據
            return {
                overall: this.convertScoreToStars(data.score || 3),
                love: data.love || data.love_text || '感情運勢平穩',
                career: data.career || data.career_text || '事業發展順利',
                wealth: data.finance || data.finance_text || '財運穩定',
                health: data.health || data.health_text || '健康狀況良好',
                summary: data.prediction || data.description || ''
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
        
        return {
            overall: overall || '⭐⭐⭐',
            love: love || '感情運勢平穩',
            career: career || '事業發展順利',
            wealth: wealth || '財運穩定',
            health: health || '健康狀況良好',
            summary: content.substring(0, 100) + (content.length > 100 ? '...' : '')
        };
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
        
        // 確保運勢數據已準備好
        if (this.fortunes.size === 0) {
            this.generateDefaultFortunes();
        }
        
        // 立即顯示第一個
        this.showCurrentZodiac();
        
        // 設置定時器
        this.marqueeInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextZodiac();
            }
        }, this.displayDuration);
        
        console.log('跑馬燈已啟動，將每', this.displayDuration / 1000, '秒切換一次星座');
    }

    // 顯示當前星座
    showCurrentZodiac() {
        const zodiac = this.zodiacs[this.currentIndex];
        const fortune = this.fortunes.get(zodiac.name) || this.getDefaultFortune(zodiac);
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
                            <span class="zodiac-rating">${fortune.overall}</span>
                        </div>
                        <div class="zodiac-fortune">
                            <span class="fortune-item">💕 ${fortune.love}</span>
                            <span class="fortune-item">💼 ${fortune.career}</span>
                            <span class="fortune-item">💰 ${fortune.wealth}</span>
                            <span class="fortune-item">💚 ${fortune.health}</span>
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
}

// 初始化跑馬燈
let horoscopeMarquee;
document.addEventListener('DOMContentLoaded', () => {
    horoscopeMarquee = new HoroscopeMarquee();
});

