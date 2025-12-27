// 資料中台 (Data Center)
// 負責統一計算並緩存八字、紫微、占星資料

class DataCenter {
    constructor() {
        this.cache = new Map();
        this.cacheExpiry = 24 * 60 * 60 * 1000; // 24小時
    }

    // 計算所有命理資料（一次性計算）
    async calculateAll(userProfile) {
        if (!userProfile.isProfileComplete()) {
            throw new Error('使用者檔案不完整');
        }

        const birthDateTime = userProfile.getBirthDateTime();
        const { birthPlace, gender } = userProfile.profile;

        const results = {
            bazi: null,
            ziwei: null,
            astrology: null
        };

        try {
            // 並行計算所有資料
            const [baziResult, ziweiResult, astrologyResult] = await Promise.allSettled([
                this.calculateBazi(birthDateTime, gender),
                this.calculateZiwei(birthDateTime, gender),
                this.calculateAstrology(birthDateTime, birthPlace)
            ]);

            if (baziResult.status === 'fulfilled') {
                results.bazi = baziResult.value;
                userProfile.setCalculatedData('bazi', results.bazi);
            }

            if (ziweiResult.status === 'fulfilled') {
                results.ziwei = ziweiResult.value;
                userProfile.setCalculatedData('ziwei', results.ziwei);
            }

            if (astrologyResult.status === 'fulfilled') {
                results.astrology = astrologyResult.value;
                userProfile.setCalculatedData('astrology', results.astrology);
            }

            return results;
        } catch (error) {
            console.error('計算命理資料失敗:', error);
            throw error;
        }
    }

    // 計算八字
    async calculateBazi(birthDateTime, gender) {
        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'bazi',
                    birthDate: birthDateTime.split('T')[0],
                    birthTime: birthDateTime.split('T')[1]?.substring(0, 5) || '12:00'
                })
            });

            if (response.ok) {
                const data = await response.json();
                return data.result;
            } else {
                throw new Error('八字計算失敗');
            }
        } catch (error) {
            console.error('計算八字錯誤:', error);
            // 使用前端簡化計算作為備用
            return this.calculateBaziFallback(birthDateTime);
        }
    }

    // 計算紫微斗數
    async calculateZiwei(birthDateTime, gender) {
        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'ziwei',
                    birthDate: birthDateTime.split('T')[0],
                    birthTime: birthDateTime.split('T')[1]?.substring(0, 5) || '12:00'
                })
            });

            if (response.ok) {
                const data = await response.json();
                return data.result;
            } else {
                throw new Error('紫微斗數計算失敗');
            }
        } catch (error) {
            console.error('計算紫微斗數錯誤:', error);
            return this.calculateZiweiFallback(birthDateTime);
        }
    }

    // 計算占星
    async calculateAstrology(birthDateTime, birthPlace) {
        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'astrology',
                    birthDate: birthDateTime.split('T')[0],
                    birthTime: birthDateTime.split('T')[1]?.substring(0, 5) || '12:00',
                    birthPlace: birthPlace
                })
            });

            if (response.ok) {
                const data = await response.json();
                return data.result;
            } else {
                throw new Error('占星計算失敗');
            }
        } catch (error) {
            console.error('計算占星錯誤:', error);
            return this.calculateAstrologyFallback(birthDateTime, birthPlace);
        }
    }

    // 備用計算方法（簡化版）
    calculateBaziFallback(birthDateTime) {
        // 在前端環境中，直接調用全局函數（如果存在）
        if (typeof calculateBazi === 'function') {
            return calculateBazi(birthDateTime);
        }
        // 如果函數不存在，返回基本結構
        return {
            fullBazi: '計算中...',
            yearPillar: '',
            monthPillar: '',
            dayPillar: '',
            hourPillar: ''
        };
    }

    calculateZiweiFallback(birthDateTime) {
        if (typeof calculateZiwei === 'function') {
            return calculateZiwei(birthDateTime);
        }
        return {
            mingGong: '計算中...',
            mainStar: ''
        };
    }

    calculateAstrologyFallback(birthDateTime, birthPlace) {
        if (typeof calculateAstrology === 'function') {
            return calculateAstrology(birthDateTime.split('T')[0], birthPlace);
        }
        return {
            sunSign: '計算中...',
            birthPlace: birthPlace
        };
    }

    // 獲取緩存的資料
    getCached(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }

    // 設置緩存
    setCache(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }
}

// 全域資料中台實例
const dataCenter = new DataCenter();

