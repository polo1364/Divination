// 新功能模組
// 包含：語音輸入、命盤導出、許願、更多占卜方式、知識庫、運勢對比

// ========== 1. 語音輸入功能 ==========
class VoiceInput {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.init();
    }

    init() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'zh-TW';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const input = document.getElementById('questionInput');
                if (input) {
                    input.value = transcript;
                    input.dispatchEvent(new Event('input'));
                }
                this.stop();
            };

            this.recognition.onerror = (event) => {
                console.error('語音識別錯誤:', event.error);
                this.stop();
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.updateButtonState();
            };
        }
    }

    start() {
        if (!this.recognition) {
            alert('您的瀏覽器不支持語音輸入功能');
            return;
        }

        if (this.isListening) {
            this.stop();
            return;
        }

        try {
            this.recognition.start();
            this.isListening = true;
            this.updateButtonState();
        } catch (error) {
            console.error('啟動語音識別失敗:', error);
        }
    }

    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.updateButtonState();
        }
    }

    updateButtonState() {
        const btn = document.getElementById('voiceInputBtn');
        if (btn) {
            if (this.isListening) {
                btn.classList.add('listening');
                btn.textContent = '🔴';
                btn.title = '正在聆聽...點擊停止';
            } else {
                btn.classList.remove('listening');
                btn.textContent = '🎤';
                btn.title = '語音輸入';
            }
        }
    }
}

// ========== 2. 命盤導出功能 ==========
class DestinyExport {
    // 導出八字命盤為圖片
    static exportBaziImage(baziData) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 1200;
        canvas.height = 1600;
        
        // 背景
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#0f3460');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 標題
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 60px Microsoft JhengHei';
        ctx.textAlign = 'center';
        ctx.fillText('八字命盤', canvas.width / 2, 100);
        
        // 四柱
        const pillars = [
            { label: '年柱', value: baziData.yearPillar || '' },
            { label: '月柱', value: baziData.monthPillar || '' },
            { label: '日柱', value: baziData.dayPillar || '' },
            { label: '時柱', value: baziData.hourPillar || '' }
        ];
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '40px Microsoft JhengHei';
        let yPos = 300;
        pillars.forEach(pillar => {
            ctx.fillText(`${pillar.label}: ${pillar.value}`, canvas.width / 2, yPos);
            yPos += 100;
        });
        
        // 完整八字
        if (baziData.fullBazi) {
            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 50px Microsoft JhengHei';
            ctx.fillText(baziData.fullBazi, canvas.width / 2, yPos + 100);
        }
        
        // 下載
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `八字命盤_${new Date().toISOString().slice(0, 10)}.png`;
            a.click();
            URL.revokeObjectURL(url);
        }, 'image/png');
    }

    // 導出為 PDF（需要 html2pdf 庫，這裡提供接口）
    static exportToPDF(type, data) {
        // 這裡可以整合 html2pdf.js 或類似的庫
        console.log('PDF 導出功能需要額外的庫支持');
    }
}

// ========== 3. 許願功能 ==========
class WishSystem {
    constructor() {
        this.wishes = this.loadWishes();
    }

    // 獲取新月/滿月日期
    static getNextMoonPhase() {
        const now = new Date();
        // 簡化版：計算下一個新月和滿月（實際應該用天文算法）
        const daysSinceNewMoon = 15; // 假設今天是滿月後15天
        const nextNewMoon = new Date(now.getTime() + (30 - daysSinceNewMoon) * 24 * 60 * 60 * 1000);
        const nextFullMoon = new Date(now.getTime() + (15 - daysSinceNewMoon) * 24 * 60 * 60 * 1000);
        
        return {
            nextNewMoon: nextNewMoon.toISOString().split('T')[0],
            nextFullMoon: nextFullMoon.toISOString().split('T')[0],
            isNewMoon: daysSinceNewMoon < 2,
            isFullMoon: daysSinceNewMoon > 13 && daysSinceNewMoon < 17
        };
    }

    // 保存許願
    saveWish(wish, moonPhase) {
        const wishRecord = {
            id: Date.now(),
            wish: wish,
            moonPhase: moonPhase,
            date: new Date().toISOString(),
            status: 'pending'
        };
        
        this.wishes.push(wishRecord);
        localStorage.setItem('celestial_wishes', JSON.stringify(this.wishes));
        return wishRecord;
    }

    // 載入許願記錄
    loadWishes() {
        try {
            return JSON.parse(localStorage.getItem('celestial_wishes') || '[]');
        } catch {
            return [];
        }
    }

    // 獲取許願建議（基於命盤）
    async getWishAdvice(userProfile) {
        // 這裡可以調用 AI 生成許願建議
        return {
            luckyTime: '新月時分',
            direction: '東方',
            color: '金色',
            items: ['水晶', '蠟燭', '許願紙']
        };
    }
}

// ========== 4. 更多占卜方式 ==========
class ExtendedDivination {
    // 數字占卜（生命靈數）
    static numerologyDivination(birthDate) {
        const dateStr = birthDate.replace(/-/g, '');
        let sum = 0;
        
        for (let char of dateStr) {
            sum += parseInt(char);
        }
        
        while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
            sum = String(sum).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        }
        
        const meanings = {
            1: '領導者、獨立、創新',
            2: '合作、和諧、敏感',
            3: '創造、表達、樂觀',
            4: '穩定、務實、組織',
            5: '自由、冒險、變化',
            6: '責任、關愛、服務',
            7: '內省、智慧、神秘',
            8: '權力、成功、物質',
            9: '完成、智慧、人道',
            11: '直覺、啟發、理想',
            22: '建設、實用、大師',
            33: '教導、療癒、奉獻'
        };
        
        return {
            number: sum,
            meaning: meanings[sum] || '未知',
            description: `你的生命靈數是 ${sum}`
        };
    }

    // 顏色占卜
    static colorDivination(selectedColor) {
        const colorMeanings = {
            '紅': { meaning: '熱情、行動、勇氣', advice: '適合主動出擊' },
            '橙': { meaning: '創造、活力、社交', advice: '多與人交流' },
            '黃': { meaning: '智慧、快樂、樂觀', advice: '保持積極心態' },
            '綠': { meaning: '成長、平衡、和諧', advice: '尋求內在平衡' },
            '藍': { meaning: '平靜、溝通、信任', advice: '表達真實想法' },
            '紫': { meaning: '靈性、直覺、神秘', advice: '相信你的直覺' },
            '粉': { meaning: '愛情、溫柔、浪漫', advice: '關注感情生活' },
            '黑': { meaning: '力量、保護、神秘', advice: '需要內省' },
            '白': { meaning: '純潔、新開始、清晰', advice: '重新開始' }
        };
        
        return colorMeanings[selectedColor] || { meaning: '未知', advice: '請選擇有效顏色' };
    }

    // 時間占卜（選擇時間點）
    static timeDivination(selectedTime, question) {
        const hour = new Date(selectedTime).getHours();
        const timeMeanings = {
            '子時(23-1)': '新開始、潛力',
            '丑時(1-3)': '內省、準備',
            '寅時(3-5)': '行動、突破',
            '卯時(5-7)': '成長、發展',
            '辰時(7-9)': '穩定、建立',
            '巳時(9-11)': '變化、轉化',
            '午時(11-13)': '高峰、成就',
            '未時(13-15)': '調整、平衡',
            '申時(15-17)': '溝通、交流',
            '酉時(17-19)': '收穫、完成',
            '戌時(19-21)': '保護、守護',
            '亥時(21-23)': '結束、準備'
        };
        
        const timeSlot = this.getTimeSlot(hour);
        return {
            time: timeSlot,
            meaning: timeMeanings[timeSlot] || '未知',
            advice: `在${timeSlot}時段，能量最適合${question}相關的事務`
        };
    }

    static getTimeSlot(hour) {
        const slots = [
            '子時(23-1)', '丑時(1-3)', '寅時(3-5)', '卯時(5-7)',
            '辰時(7-9)', '巳時(9-11)', '午時(11-13)', '未時(13-15)',
            '申時(15-17)', '酉時(17-19)', '戌時(19-21)', '亥時(21-23)'
        ];
        return slots[Math.floor((hour + 1) / 2) % 12];
    }
}

// ========== 5. 命理知識庫 ==========
class KnowledgeBase {
    static getTarotCardInfo(cardName) {
        // 從 tarot-definitions.json 獲取
        if (typeof tarotDefinitions !== 'undefined' && tarotDefinitions[cardName]) {
            return tarotDefinitions[cardName];
        }
        return null;
    }

    static getBaziBasics() {
        return {
            title: '八字基礎知識',
            content: `
                <h3>什麼是八字？</h3>
                <p>八字，又稱四柱，是根據出生年、月、日、時的天干地支組合而成的命理系統。</p>
                
                <h3>天干地支</h3>
                <p>天干：甲、乙、丙、丁、戊、己、庚、辛、壬、癸</p>
                <p>地支：子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥</p>
                
                <h3>五行</h3>
                <p>金、木、水、火、土，相生相剋的關係影響命運。</p>
            `
        };
    }

    static getZiweiBasics() {
        return {
            title: '紫微斗數基礎',
            content: `
                <h3>什麼是紫微斗數？</h3>
                <p>紫微斗數是中國傳統命理學，通過星曜在十二宮位的分布來分析命運。</p>
                
                <h3>主要星曜</h3>
                <p>紫微、天機、太陽、武曲、天同、廉貞、天府、太陰、貪狼、巨門、天相、天梁、七殺、破軍</p>
            `
        };
    }

    static getAstrologyBasics() {
        return {
            title: '西方占星基礎',
            content: `
                <h3>十二星座</h3>
                <p>白羊、金牛、雙子、巨蟹、獅子、處女、天秤、天蠍、射手、摩羯、水瓶、雙魚</p>
                
                <h3>重要概念</h3>
                <p>太陽星座：代表核心性格</p>
                <p>月亮星座：代表情感需求</p>
                <p>上升星座：代表外在表現</p>
            `
        };
    }
}

// ========== 6. 運勢對比功能 ==========
class FortuneComparison {
    constructor() {
        this.records = this.loadRecords();
    }

    // 保存運勢記錄
    saveRecord(type, date, data) {
        const record = {
            id: Date.now(),
            type: type,
            date: date,
            data: data,
            timestamp: new Date().toISOString()
        };
        
        this.records.push(record);
        localStorage.setItem('celestial_fortune_records', JSON.stringify(this.records));
        return record;
    }

    // 載入記錄
    loadRecords() {
        try {
            return JSON.parse(localStorage.getItem('celestial_fortune_records') || '[]');
        } catch {
            return [];
        }
    }

    // 對比兩個時期的運勢
    comparePeriods(period1, period2) {
        const record1 = this.records.find(r => r.id === period1);
        const record2 = this.records.find(r => r.id === period2);
        
        if (!record1 || !record2) {
            return null;
        }
        
        return {
            period1: record1,
            period2: record2,
            changes: this.analyzeChanges(record1.data, record2.data)
        };
    }

    analyzeChanges(data1, data2) {
        // 簡化的變化分析
        return {
            scoreChange: (data2.score || 0) - (data1.score || 0),
            adviceChange: '運勢有所變化',
            trend: data2.score > data1.score ? '上升' : '下降'
        };
    }
}

// 全局實例（確保在 window 上可訪問）
window.voiceInput = new VoiceInput();
window.wishSystem = new WishSystem();
window.fortuneComparison = new FortuneComparison();

// 導出類供其他腳本使用
window.VoiceInput = VoiceInput;
window.WishSystem = WishSystem;
window.ExtendedDivination = ExtendedDivination;
window.KnowledgeBase = KnowledgeBase;
window.FortuneComparison = FortuneComparison;
window.DestinyExport = DestinyExport;

