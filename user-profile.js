// 統一使用者檔案系統 (User Profile)
// 核心概念：One Profile, All Destinies

class UserProfile {
    constructor() {
        this.profile = this.loadProfile();
        this.calculatedData = {
            astrology: null,
            bazi: null,
            ziwei: null
        };
    }

    // 載入使用者檔案
    loadProfile() {
        try {
            const saved = localStorage.getItem('celestial_user_profile');
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('載入使用者檔案失敗:', error);
        }
        return null;
    }

    // 保存使用者檔案
    saveProfile() {
        try {
            localStorage.setItem('celestial_user_profile', JSON.stringify(this.profile));
            return true;
        } catch (error) {
            console.error('保存使用者檔案失敗:', error);
            return false;
        }
    }

    // 設置使用者基本資料
    setBasicInfo(data) {
        const required = ['birthYear', 'birthMonth', 'birthDay', 'birthHour', 'birthMinute', 'birthPlace', 'gender'];
        const missing = required.filter(field => !data[field]);
        
        if (missing.length > 0) {
            throw new Error(`缺少必要欄位: ${missing.join(', ')}`);
        }

        this.profile = {
            ...this.profile,
            ...data,
            updatedAt: new Date().toISOString()
        };

        // 清除已計算的資料，需要重新計算
        this.calculatedData = {
            astrology: null,
            bazi: null,
            ziwei: null
        };

        return this.saveProfile();
    }

    // 獲取完整出生日期時間字串
    getBirthDateTime() {
        if (!this.profile) return null;
        const { birthYear, birthMonth, birthDay, birthHour, birthMinute } = this.profile;
        return `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}T${String(birthHour).padStart(2, '0')}:${String(birthMinute).padStart(2, '0')}:00`;
    }

    // 檢查檔案是否完整
    isProfileComplete() {
        if (!this.profile) return false;
        const required = ['birthYear', 'birthMonth', 'birthDay', 'birthHour', 'birthMinute', 'birthPlace', 'gender'];
        return required.every(field => this.profile[field] !== undefined && this.profile[field] !== null && this.profile[field] !== '');
    }

    // 獲取計算後的資料（如果已計算）
    getCalculatedData(type) {
        return this.calculatedData[type] || null;
    }

    // 設置計算後的資料
    setCalculatedData(type, data) {
        this.calculatedData[type] = {
            ...data,
            calculatedAt: new Date().toISOString()
        };
        // 可以選擇性地保存到 localStorage（但通常不需要，因為可以重新計算）
    }

    // 清除所有資料
    clearProfile() {
        this.profile = null;
        this.calculatedData = {
            astrology: null,
            bazi: null,
            ziwei: null
        };
        localStorage.removeItem('celestial_user_profile');
    }

    // 獲取使用者資訊摘要
    getProfileSummary() {
        if (!this.isProfileComplete()) {
            return null;
        }
        return {
            birthDate: `${this.profile.birthYear}-${String(this.profile.birthMonth).padStart(2, '0')}-${String(this.profile.birthDay).padStart(2, '0')}`,
            birthTime: `${String(this.profile.birthHour).padStart(2, '0')}:${String(this.profile.birthMinute).padStart(2, '0')}`,
            birthPlace: this.profile.birthPlace,
            gender: this.profile.gender,
            hasCalculatedData: {
                astrology: !!this.calculatedData.astrology,
                bazi: !!this.calculatedData.bazi,
                ziwei: !!this.calculatedData.ziwei
            }
        };
    }
}

// 全域使用者檔案實例
const userProfile = new UserProfile();

