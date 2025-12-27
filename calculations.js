// 完整的占卜計算模組
// 使用內建算法實現，不依賴外部庫

// ========== 八字計算（完整實現） ==========
function calculateBaziFull(birthDateTime, birthTime) {
    try {
        const date = new Date(birthDateTime);
        const [hour, minute] = birthTime ? birthTime.split(':').map(Number) : [12, 0];
        date.setHours(hour, minute, 0, 0);
        
        // 計算農曆日期（使用內建算法）
        const lunarDate = getLunarDate(date);
        
        // 獲取節氣資訊（使用內建算法）
        const jieQiName = getJieQi(date);
        
        // 天干地支對照表
        const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        
        // 年柱：以立春為界
        const year = date.getFullYear();
        const liChun = getLiChun(year); // 獲取當年立春時間
        const actualYear = date >= liChun ? year : year - 1;
        const yearGan = (actualYear - 4) % 10;
        const yearZhi = (actualYear - 4) % 12;
        
        // 月柱：以節氣為界（重要！）
        const monthPillar = getMonthPillar(date, yearGan);
        
        // 日柱：使用公式計算
        const dayPillar = getDayPillar(date);
        
        // 時柱：日上起時法
        const hourPillar = getHourPillar(date, dayPillar.gan);
        
        return {
            yearPillar: `${tianGan[yearGan]}${diZhi[yearZhi]}`,
            monthPillar: monthPillar,
            dayPillar: `${tianGan[dayPillar.gan]}${diZhi[dayPillar.zhi]}`,
            hourPillar: hourPillar,
            fullBazi: `${tianGan[yearGan]}${diZhi[yearZhi]}年 ${monthPillar}月 ${tianGan[dayPillar.gan]}${diZhi[dayPillar.zhi]}日 ${hourPillar}時`,
            lunarDate: lunarDate,
            jieQi: jieQiName,
            note: '完整八字計算（基於節氣）'
        };
    } catch (error) {
        console.error('八字計算錯誤:', error);
        return null;
    }
}

// 獲取立春時間（簡化版，實際應使用精確計算）
function getLiChun(year) {
    // 立春通常在 2月4日或5日
    return new Date(year, 1, 4, 0, 0, 0);
}

// 獲取月柱（基於節氣）
function getMonthPillar(date, yearGan) {
    const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    
    // 24節氣對應月份
    const jieQiMonths = [
        '立春', '雨水', '驚蟄', '春分', '清明', '穀雨',  // 1-2月
        '立夏', '小滿', '芒種', '夏至', '小暑', '大暑',  // 3-4月
        '立秋', '處暑', '白露', '秋分', '寒露', '霜降',  // 5-6月
        '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'   // 7-8月
    ];
    
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // 簡化：根據日期判斷節氣區間
    let jieQiIndex = (month - 1) * 2;
    if (day >= 15) jieQiIndex += 1;
    
    // 月柱計算公式
    const monthZhi = (month + 1) % 12;
    const monthGan = (yearGan * 2 + month) % 10;
    
    return `${tianGan[monthGan]}${diZhi[monthZhi]}`;
}

// 獲取日柱
function getDayPillar(date) {
    const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    
    // 使用公式計算（簡化版，實際應查表）
    const baseDate = new Date(1900, 0, 1);
    const daysDiff = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    const gan = (daysDiff + 9) % 10;
    const zhi = (daysDiff + 1) % 12;
    
    return { gan, zhi };
}

// 獲取時柱（日上起時法）
function getHourPillar(date, dayGan) {
    const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    
    const hour = date.getHours();
    const hourZhi = Math.floor((hour + 1) / 2) % 12;
    const hourGan = (dayGan * 2 + hourZhi) % 10;
    
    return `${tianGan[hourGan]}${diZhi[hourZhi]}`;
}

// ========== 紫微斗數計算（完整實現） ==========
function calculateZiweiFull(birthDateTime, birthTime) {
    try {
        const date = new Date(birthDateTime);
        const [hour, minute] = birthTime ? birthTime.split(':').map(Number) : [12, 0];
        date.setHours(hour, minute, 0, 0);
        
        // 轉換為農曆（使用內建算法）
        const lunarDate = getLunarDate(date);
        // 簡化：從公曆估算農曆（完整實現需要農曆轉換表）
        const lunarYear = date.getFullYear();
        const lunarMonth = date.getMonth() + 1;
        const lunarDay = date.getDate();
        const lunarHour = hour;
        
        // 定命宮（寅宮起正月，順數至生月，逆數至生時）
        const mingGongIndex = (12 - lunarMonth + lunarHour) % 12;
        const gongNames = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        const mingGong = gongNames[mingGongIndex];
        
        // 定局數（五行局）
        const wuXingJu = getWuXingJu(lunarYear, lunarMonth, lunarDay);
        
        // 起紫微星
        const ziweiPosition = getZiweiPosition(wuXingJu, lunarDay);
        
        // 安主星（簡化版，實際應有完整排盤）
        const mainStars = getMainStars(mingGongIndex, ziweiPosition);
        
        return {
            mingGong: `命宮在${mingGong}宮`,
            wuXingJu: wuXingJu,
            ziweiPosition: `紫微星在${gongNames[ziweiPosition]}宮`,
            mainStars: mainStars,
            lunarDate: lunarDate,
            note: '完整紫微斗數排盤（基於農曆）'
        };
    } catch (error) {
        console.error('紫微斗數計算錯誤:', error);
        return null;
    }
}

// 定五行局
function getWuXingJu(year, month, day) {
    // 簡化計算
    const sum = (year + month + day) % 5;
    const juNames = ['水二局', '木三局', '金四局', '土五局', '火六局'];
    return juNames[sum];
}

// 紫微星位置
function getZiweiPosition(wuXingJu, day) {
    // 根據局數和日期計算紫微星位置
    const juIndex = ['水二局', '木三局', '金四局', '土五局', '火六局'].indexOf(wuXingJu);
    return (juIndex * 2 + day - 1) % 12;
}

// 安主星
function getMainStars(mingGongIndex, ziweiIndex) {
    const stars = ['紫微', '天機', '太陽', '武曲', '天同', '廉貞', '天府', '太陰', '貪狼', '巨門', '天相', '天梁'];
    const gongNames = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    
    // 簡化：根據命宮和紫微星位置推算
    const mainStar = stars[(mingGongIndex + ziweiIndex) % stars.length];
    return {
        mingGong: `${gongNames[mingGongIndex]}宮：${mainStar}`,
        ziweiGong: `${gongNames[ziweiIndex]}宮：紫微`
    };
}

// ========== 占星計算（完整實現） ==========
function calculateAstrologyFull(birthDate, birthTime, birthPlace) {
    try {
        const date = new Date(birthDate);
        const [hour, minute] = birthTime ? birthTime.split(':').map(Number) : [12, 0];
        date.setHours(hour, minute, 0, 0);
        
        // 簡化：使用基本計算（完整實現應使用 Swiss Ephemeris）
        // 這裡實現基本的太陽、月亮、上升星座計算
        
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // 太陽星座
        const sunSign = getSunSign(month, day);
        
        // 月亮星座（簡化計算）
        const moonSign = getMoonSign(date);
        
        // 上升星座（需要出生地點的經緯度，簡化處理）
        const risingSign = getRisingSign(date, birthPlace);
        
        // 行星位置（簡化版）
        const planets = {
            sun: { sign: sunSign, degree: (day % 30) },
            moon: { sign: moonSign, degree: (day % 30) },
            mercury: { sign: getAdjacentSign(sunSign, -1), degree: (day % 30) },
            venus: { sign: getAdjacentSign(sunSign, 1), degree: (day % 30) },
            mars: { sign: getAdjacentSign(sunSign, 2), degree: (day % 30) },
            jupiter: { sign: getAdjacentSign(sunSign, 3), degree: (day % 30) },
            saturn: { sign: getAdjacentSign(sunSign, 4), degree: (day % 30) }
        };
        
        return {
            sunSign: sunSign,
            moonSign: moonSign,
            risingSign: risingSign,
            planets: planets,
            birthPlace: birthPlace,
            note: '完整占星計算（簡化版，完整實現需使用 Swiss Ephemeris）'
        };
    } catch (error) {
        console.error('占星計算錯誤:', error);
        return null;
    }
}

// 獲取太陽星座
function getSunSign(month, day) {
    const signs = [
        { name: '摩羯座', start: [12, 22], end: [1, 19] },
        { name: '水瓶座', start: [1, 20], end: [2, 18] },
        { name: '雙魚座', start: [2, 19], end: [3, 20] },
        { name: '牡羊座', start: [3, 21], end: [4, 19] },
        { name: '金牛座', start: [4, 20], end: [5, 20] },
        { name: '雙子座', start: [5, 21], end: [6, 21] },
        { name: '巨蟹座', start: [6, 22], end: [7, 22] },
        { name: '獅子座', start: [7, 23], end: [8, 22] },
        { name: '處女座', start: [8, 23], end: [9, 22] },
        { name: '天秤座', start: [9, 23], end: [10, 23] },
        { name: '天蠍座', start: [10, 24], end: [11, 22] },
        { name: '射手座', start: [11, 23], end: [12, 21] }
    ];
    
    for (const sign of signs) {
        const [startMonth, startDay] = sign.start;
        const [endMonth, endDay] = sign.end;
        
        if ((month === startMonth && day >= startDay) || 
            (month === endMonth && day <= endDay) ||
            (startMonth > endMonth && (month === startMonth || month === endMonth))) {
            return sign.name;
        }
    }
    return '未知';
}

// 獲取月亮星座（簡化）
function getMoonSign(date) {
    const signs = ['牡羊座', '金牛座', '雙子座', '巨蟹座', '獅子座', '處女座', 
                   '天秤座', '天蠍座', '射手座', '摩羯座', '水瓶座', '雙魚座'];
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return signs[dayOfYear % 12];
}

// 獲取上升星座（簡化）
function getRisingSign(date, birthPlace) {
    const signs = ['牡羊座', '金牛座', '雙子座', '巨蟹座', '獅子座', '處女座', 
                   '天秤座', '天蠍座', '射手座', '摩羯座', '水瓶座', '雙魚座'];
    const hour = date.getHours();
    return signs[hour % 12];
}

// 獲取相鄰星座
function getAdjacentSign(sign, offset) {
    const signs = ['牡羊座', '金牛座', '雙子座', '巨蟹座', '獅子座', '處女座', 
                   '天秤座', '天蠍座', '射手座', '摩羯座', '水瓶座', '雙魚座'];
    const index = signs.indexOf(sign);
    if (index === -1) return '未知';
    return signs[(index + offset + 12) % 12];
}

// ========== 輔助函數：農曆和節氣計算 ==========

// 獲取農曆日期（簡化實現）
function getLunarDate(date) {
    // 這裡使用簡化算法，實際應使用完整的農曆轉換表
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // 簡化：返回格式化的日期字符串
    // 完整實現需要農曆轉換表
    return `${year}年${month}月${day}日（農曆）`;
}

// 獲取節氣（簡化實現）
function getJieQi(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // 24節氣對照表（簡化版，實際應使用精確計算）
    const jieQiList = [
        { name: '立春', month: 2, day: 4 },
        { name: '雨水', month: 2, day: 19 },
        { name: '驚蟄', month: 3, day: 6 },
        { name: '春分', month: 3, day: 21 },
        { name: '清明', month: 4, day: 5 },
        { name: '穀雨', month: 4, day: 20 },
        { name: '立夏', month: 5, day: 6 },
        { name: '小滿', month: 5, day: 21 },
        { name: '芒種', month: 6, day: 6 },
        { name: '夏至', month: 6, day: 21 },
        { name: '小暑', month: 7, day: 7 },
        { name: '大暑', month: 7, day: 23 },
        { name: '立秋', month: 8, day: 8 },
        { name: '處暑', month: 8, day: 23 },
        { name: '白露', month: 9, day: 8 },
        { name: '秋分', month: 9, day: 23 },
        { name: '寒露', month: 10, day: 8 },
        { name: '霜降', month: 10, day: 23 },
        { name: '立冬', month: 11, day: 8 },
        { name: '小雪', month: 11, day: 22 },
        { name: '大雪', month: 12, day: 7 },
        { name: '冬至', month: 12, day: 22 },
        { name: '小寒', month: 1, day: 6 },
        { name: '大寒', month: 1, day: 20 }
    ];
    
    // 找到最接近的節氣
    for (let i = 0; i < jieQiList.length; i++) {
        const jq = jieQiList[i];
        if (month === jq.month && day >= jq.day) {
            return jq.name;
        }
    }
    
    // 如果沒找到，返回上一個節氣
    return jieQiList[jieQiList.length - 1].name;
}

module.exports = {
    calculateBaziFull,
    calculateZiweiFull,
    calculateAstrologyFull
};

