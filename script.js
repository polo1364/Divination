// 塔羅牌牌組
const tarotCards = [
    { name: '愚者', emoji: '🃏', meaning: '新的開始、冒險精神' },
    { name: '魔術師', emoji: '🎩', meaning: '創造力、意志力' },
    { name: '女祭司', emoji: '🌙', meaning: '直覺、內在智慧' },
    { name: '皇后', emoji: '👑', meaning: '豐盛、母性' },
    { name: '皇帝', emoji: '⚔️', meaning: '權威、穩定' },
    { name: '教皇', emoji: '📿', meaning: '傳統、靈性指導' },
    { name: '戀人', emoji: '💑', meaning: '愛情、選擇' },
    { name: '戰車', emoji: '🏇', meaning: '勝利、意志力' },
    { name: '力量', emoji: '💪', meaning: '內在力量、勇氣' },
    { name: '隱者', emoji: '🔦', meaning: '內省、尋求真理' },
    { name: '命運之輪', emoji: '🎡', meaning: '變化、命運' },
    { name: '正義', emoji: '⚖️', meaning: '平衡、公正' },
    { name: '倒吊人', emoji: '🙃', meaning: '犧牲、等待' },
    { name: '死神', emoji: '💀', meaning: '轉變、結束' },
    { name: '節制', emoji: '🍷', meaning: '平衡、調和' },
    { name: '惡魔', emoji: '😈', meaning: '誘惑、束縛' },
    { name: '塔', emoji: '🗼', meaning: '破壞、啟示' },
    { name: '星星', emoji: '⭐', meaning: '希望、靈感' },
    { name: '月亮', emoji: '🌙', meaning: '幻覺、潛意識' },
    { name: '太陽', emoji: '☀️', meaning: '快樂、成功' },
    { name: '審判', emoji: '📯', meaning: '復活、覺醒' },
    { name: '世界', emoji: '🌍', meaning: '完成、圓滿' },
    { name: '權杖Ace', emoji: '🔥', meaning: '新的行動、熱情' },
    { name: '權杖二', emoji: '🔥', meaning: '計劃、未來' },
    { name: '權杖三', emoji: '🔥', meaning: '探索、遠見' },
    { name: '權杖四', emoji: '🔥', meaning: '慶祝、穩定' },
    { name: '權杖五', emoji: '🔥', meaning: '衝突、競爭' },
    { name: '權杖六', emoji: '🔥', meaning: '勝利、成功' },
    { name: '權杖七', emoji: '🔥', meaning: '挑戰、防禦' },
    { name: '權杖八', emoji: '🔥', meaning: '快速行動、進展' },
    { name: '權杖九', emoji: '🔥', meaning: '堅持、最後努力' },
    { name: '權杖十', emoji: '🔥', meaning: '負擔、責任' },
    { name: '權杖侍從', emoji: '🔥', meaning: '新想法、探索' },
    { name: '權杖騎士', emoji: '🔥', meaning: '行動、冒險' },
    { name: '權杖皇后', emoji: '🔥', meaning: '獨立、自信' },
    { name: '權杖國王', emoji: '🔥', meaning: '領導、遠見' },
    { name: '聖杯Ace', emoji: '💧', meaning: '新的情感、愛' },
    { name: '聖杯二', emoji: '💧', meaning: '夥伴關係、和諧' },
    { name: '聖杯三', emoji: '💧', meaning: '友誼、慶祝' },
    { name: '聖杯四', emoji: '💧', meaning: '不滿、反思' },
    { name: '聖杯五', emoji: '💧', meaning: '失落、悲傷' },
    { name: '聖杯六', emoji: '💧', meaning: '回憶、童年' },
    { name: '聖杯七', emoji: '💧', meaning: '幻想、選擇' },
    { name: '聖杯八', emoji: '💧', meaning: '放棄、追尋' },
    { name: '聖杯九', emoji: '💧', meaning: '滿足、願望實現' },
    { name: '聖杯十', emoji: '💧', meaning: '和諧、家庭' },
    { name: '聖杯侍從', emoji: '💧', meaning: '創意、直覺' },
    { name: '聖杯騎士', emoji: '💧', meaning: '浪漫、理想主義' },
    { name: '聖杯皇后', emoji: '💧', meaning: '同情、情感' },
    { name: '聖杯國王', emoji: '💧', meaning: '智慧、情感成熟' },
    { name: '寶劍Ace', emoji: '⚔️', meaning: '新的想法、清晰' },
    { name: '寶劍二', emoji: '⚔️', meaning: '選擇、猶豫' },
    { name: '寶劍三', emoji: '⚔️', meaning: '心碎、悲傷' },
    { name: '寶劍四', emoji: '⚔️', meaning: '休息、恢復' },
    { name: '寶劍五', emoji: '⚔️', meaning: '衝突、爭論' },
    { name: '寶劍六', emoji: '⚔️', meaning: '轉變、離開' },
    { name: '寶劍七', emoji: '⚔️', meaning: '欺騙、策略' },
    { name: '寶劍八', emoji: '⚔️', meaning: '限制、束縛' },
    { name: '寶劍九', emoji: '⚔️', meaning: '焦慮、噩夢' },
    { name: '寶劍十', emoji: '⚔️', meaning: '結束、背叛' },
    { name: '寶劍侍從', emoji: '⚔️', meaning: '好奇心、學習' },
    { name: '寶劍騎士', emoji: '⚔️', meaning: '行動、衝動' },
    { name: '寶劍皇后', emoji: '⚔️', meaning: '清晰、直接' },
    { name: '寶劍國王', emoji: '⚔️', meaning: '真理、正義' },
    { name: '錢幣Ace', emoji: '💰', meaning: '新的機會、物質' },
    { name: '錢幣二', emoji: '💰', meaning: '平衡、優先順序' },
    { name: '錢幣三', emoji: '💰', meaning: '團隊合作、技能' },
    { name: '錢幣四', emoji: '💰', meaning: '安全、控制' },
    { name: '錢幣五', emoji: '💰', meaning: '貧困、孤立' },
    { name: '錢幣六', emoji: '💰', meaning: '分享、慷慨' },
    { name: '錢幣七', emoji: '💰', meaning: '耐心、投資' },
    { name: '錢幣八', emoji: '💰', meaning: '技能、專注' },
    { name: '錢幣九', emoji: '💰', meaning: '獨立、財務安全' },
    { name: '錢幣十', emoji: '💰', meaning: '財富、家庭' },
    { name: '錢幣侍從', emoji: '💰', meaning: '學習、新技能' },
    { name: '錢幣騎士', emoji: '💰', meaning: '效率、責任' },
    { name: '錢幣皇后', emoji: '💰', meaning: '實用、慷慨' },
    { name: '錢幣國王', emoji: '💰', meaning: '成功、財務穩定' }
];

// 三張牌的位置意義
const threeCardPositions = [
    { position: '過去', meaning: '代表過去的情況或影響' },
    { position: '現在', meaning: '代表當前的狀況' },
    { position: '未來', meaning: '代表未來的發展趨勢' }
];

let currentSpread = 'single';
let drawnCards = [];
let currentDivinationType = 'tarot'; // 當前選擇的占卜方式

// 音效管理
let audioContext = null;
try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
} catch (error) {
    console.log('音效初始化失敗:', error);
}

// 洗牌互動狀態
let shuffleState = {
    isShuffling: false,
    progress: 0,
    requiredProgress: 100,
    touchStartTime: 0,
    touchStartX: 0,
    touchStartY: 0
};

// 播放音效
function playSound(type) {
    if (!audioContext) return;
    
    try {
        let frequency, duration, waveType;
        switch(type) {
            case 'shuffle':
                frequency = 200;
                duration = 0.1;
                waveType = 'sawtooth';
                break;
            case 'cardFlip':
                frequency = 800;
                duration = 0.15;
                waveType = 'sine';
                break;
            case 'ambient':
                frequency = 150;
                duration = 0.05;
                waveType = 'sawtooth';
                break;
            default:
                return;
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = waveType;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.log('音效播放失敗:', error);
    }
}

// 初始化洗牌互動
function initShuffleInteraction() {
    const shuffleArea = document.getElementById('shuffleArea');
    const shuffleProgress = document.getElementById('shuffleProgress');
    const progressBar = document.querySelector('.shuffle-progress-bar');
    
    if (!shuffleArea) return;
    
    // 觸摸開始
    shuffleArea.addEventListener('touchstart', (e) => {
        if (currentDivinationType !== 'tarot') return;
        e.preventDefault();
        shuffleState.isShuffling = true;
        shuffleState.touchStartTime = Date.now();
        shuffleState.touchStartX = e.touches[0].clientX;
        shuffleState.touchStartY = e.touches[0].clientY;
        shuffleArea.classList.add('shuffling');
        playSound('shuffle');
    });
    
    // 觸摸移動（滑動切牌）
    shuffleArea.addEventListener('touchmove', (e) => {
        if (!shuffleState.isShuffling) return;
        e.preventDefault();
        const deltaX = Math.abs(e.touches[0].clientX - shuffleState.touchStartX);
        const deltaY = Math.abs(e.touches[0].clientY - shuffleState.touchStartY);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        shuffleState.progress = Math.min(100, shuffleState.progress + distance * 0.1);
        
        if (shuffleProgress) {
            shuffleProgress.textContent = Math.floor(shuffleState.progress) + '%';
        }
        if (progressBar) {
            progressBar.style.width = shuffleState.progress + '%';
        }
        
        if (Math.floor(shuffleState.progress) % 10 === 0) {
            playSound('shuffle');
        }
        
        shuffleState.touchStartX = e.touches[0].clientX;
        shuffleState.touchStartY = e.touches[0].clientY;
    });
    
    // 觸摸結束
    shuffleArea.addEventListener('touchend', (e) => {
        if (!shuffleState.isShuffling) return;
        e.preventDefault();
        shuffleState.isShuffling = false;
        shuffleArea.classList.remove('shuffling');
        
        if (shuffleState.progress >= shuffleState.requiredProgress) {
            shuffleArea.classList.add('hidden');
            startDivinationAfterShuffle();
        } else {
            shuffleState.progress = 0;
            if (shuffleProgress) shuffleProgress.textContent = '0%';
            if (progressBar) progressBar.style.width = '0%';
        }
    });
    
    // 滑鼠事件（桌面端）
    let mouseDown = false;
    let lastX = 0, lastY = 0;
    
    shuffleArea.addEventListener('mousedown', (e) => {
        if (currentDivinationType !== 'tarot') return;
        mouseDown = true;
        shuffleState.isShuffling = true;
        shuffleState.touchStartTime = Date.now();
        shuffleState.touchStartX = e.clientX;
        shuffleState.touchStartY = e.clientY;
        lastX = e.clientX;
        lastY = e.clientY;
        shuffleArea.classList.add('shuffling');
        playSound('shuffle');
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!mouseDown || !shuffleState.isShuffling) return;
        const deltaX = Math.abs(e.clientX - lastX);
        const deltaY = Math.abs(e.clientY - lastY);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        shuffleState.progress = Math.min(100, shuffleState.progress + distance * 0.1);
        
        if (shuffleProgress) {
            shuffleProgress.textContent = Math.floor(shuffleState.progress) + '%';
        }
        if (progressBar) {
            progressBar.style.width = shuffleState.progress + '%';
        }
        
        if (Math.floor(shuffleState.progress) % 10 === 0) {
            playSound('shuffle');
        }
        
        lastX = e.clientX;
        lastY = e.clientY;
    });
    
    document.addEventListener('mouseup', () => {
        if (!mouseDown) return;
        mouseDown = false;
        shuffleState.isShuffling = false;
        shuffleArea.classList.remove('shuffling');
        
        if (shuffleState.progress >= shuffleState.requiredProgress) {
            shuffleArea.classList.add('hidden');
            startDivinationAfterShuffle();
        } else {
            shuffleState.progress = 0;
            if (shuffleProgress) shuffleProgress.textContent = '0%';
            if (progressBar) progressBar.style.width = '0%';
        }
    });
}

// API 金鑰管理
function getApiKey() {
    // 優先從 localStorage 讀取
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey && savedKey.trim()) {
        return savedKey.trim();
    }
    
    // 如果 localStorage 沒有，嘗試從輸入框讀取（向後兼容）
    const apiKeyInput = document.getElementById('apiKey');
    if (apiKeyInput && apiKeyInput.value.trim()) {
        return apiKeyInput.value.trim();
    }
    
    return '';
}

function saveApiKey(apiKey) {
    if (apiKey) {
        localStorage.setItem('gemini_api_key', apiKey);
    } else {
        localStorage.removeItem('gemini_api_key');
    }
}

function loadApiKey() {
    const savedKey = localStorage.getItem('gemini_api_key');
    const apiKeyInput = document.getElementById('apiKey');
    if (apiKeyInput) {
        if (savedKey && savedKey.trim()) {
            apiKeyInput.value = savedKey;
            updateApiKeyStatus(true);
        } else {
            apiKeyInput.value = '';
            updateApiKeyStatus(false);
        }
    }
}

function updateApiKeyStatus(isSet) {
    const statusEl = document.getElementById('apiKeyStatus');
    if (statusEl) {
        if (isSet) {
            statusEl.textContent = '✓ 已設置';
            statusEl.className = 'api-key-status valid';
        } else {
            statusEl.textContent = '未設置';
            statusEl.className = 'api-key-status';
        }
    }
}

// 模態框管理
function openModal() {
    const modal = document.getElementById('apiKeyModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // 防止背景滾動
        // 載入保存的 API 金鑰
        loadApiKey();
    }
}

function closeModal() {
    const modal = document.getElementById('apiKeyModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // 恢復滾動
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化問題選擇器
    handleQuestionChange('question', 'questionCustom');
    handleQuestionChange('baziQuestion', 'baziQuestionCustom');
    handleQuestionChange('astrologyQuestion', 'astrologyQuestionCustom');
    handleQuestionChange('yijingQuestion', 'yijingQuestionCustom');
    
    // 初始化洗牌互動
    initShuffleInteraction();
    
    const spreadButtons = document.querySelectorAll('.spread-btn');
    const drawBtn = document.getElementById('drawBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const apiKeyInput = document.getElementById('apiKey');
    const toggleApiKeyBtn = document.getElementById('toggleApiKey');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const saveApiKeyBtn = document.getElementById('saveApiKey');

    // 打開設置模態框
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openModal);
    }

    // 關閉模態框
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // 按 ESC 鍵關閉模態框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            // 也關閉使用者檔案模態框
            if (typeof celestialOS !== 'undefined' && celestialOS.closeProfileModal) {
                celestialOS.closeProfileModal();
            }
        }
    });

    // 使用者檔案模態框事件監聽器
    const closeProfileModalBtn = document.getElementById('closeProfileModal');
    const profileModalOverlay = document.getElementById('profileModalOverlay');
    
    if (closeProfileModalBtn) {
        closeProfileModalBtn.addEventListener('click', () => {
            if (typeof celestialOS !== 'undefined' && celestialOS.closeProfileModal) {
                celestialOS.closeProfileModal();
            }
        });
    }
    
    if (profileModalOverlay) {
        profileModalOverlay.addEventListener('click', () => {
            if (typeof celestialOS !== 'undefined' && celestialOS.closeProfileModal) {
                celestialOS.closeProfileModal();
            }
        });
    }

    // 保存 API 金鑰
    if (saveApiKeyBtn) {
        saveApiKeyBtn.addEventListener('click', () => {
            const key = apiKeyInput ? apiKeyInput.value.trim() : '';
            if (key) {
                saveApiKey(key);
                updateApiKeyStatus(true);
                closeModal();
                // 顯示成功提示
                if (typeof celestialOS !== 'undefined' && celestialOS.showSuccess) {
                    celestialOS.showSuccess('API 金鑰已保存');
                } else {
                    alert('API 金鑰已保存');
                }
            } else {
                alert('請輸入 API 金鑰');
            }
        });
    }
    
    // 當輸入框內容改變時，實時檢查
    if (apiKeyInput) {
        apiKeyInput.addEventListener('input', () => {
            const key = apiKeyInput.value.trim();
            if (key) {
                // 實時保存（可選，或者只在點擊保存時保存）
                // saveApiKey(key);
            }
        });
    }

    // API 金鑰輸入監聽
    if (apiKeyInput) {
        apiKeyInput.addEventListener('input', (e) => {
            const key = e.target.value.trim();
            updateApiKeyStatus(key.length > 0);
        });
    }

    // 切換 API 金鑰顯示/隱藏
    if (toggleApiKeyBtn && apiKeyInput) {
        toggleApiKeyBtn.addEventListener('click', () => {
            const type = apiKeyInput.type === 'password' ? 'text' : 'password';
            apiKeyInput.type = type;
            toggleApiKeyBtn.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // 檢查是否有保存的 API 金鑰
    const savedKey = localStorage.getItem('gemini_api_key');
    if (!savedKey) {
        // 如果沒有保存的 API 金鑰，自動打開模態框
        setTimeout(openModal, 500);
    }

    // 占卜方式選擇（塔羅牌牌陣）
    if (spreadButtons.length > 0) {
        spreadButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                spreadButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentSpread = btn.dataset.spread;
                resetCards();
            });
        });
    }

    // 占卜類型選擇
    const divinationTypeButtons = document.querySelectorAll('.divination-type-btn');
    divinationTypeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            divinationTypeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentDivinationType = btn.dataset.type;
            switchDivinationType(currentDivinationType);
        });
    });

    // 占卜按鈕
    const divineBtn = document.getElementById('divineBtn');
    if (divineBtn) {
        divineBtn.addEventListener('click', handleDivination);
    }

    // 語音播放按鈕
    const speakBtn = document.getElementById('speakBtn');
    if (speakBtn) {
        speakBtn.addEventListener('click', speakResult);
    }
});

// 重置卡片
function resetCards() {
    const container = document.getElementById('cardsContainer');
    const resultSection = document.getElementById('resultSection');
    container.innerHTML = '';
    resultSection.classList.add('hidden');
    drawnCards = [];
}

// 獲取問題值（優先使用自定義輸入，否則使用下拉選單）
function getQuestionValue(selectId, customId) {
    const customInput = document.getElementById(customId);
    const customValue = customInput && !customInput.classList.contains('hidden') 
        ? customInput.value.trim() 
        : '';
    
    if (customValue) {
        return customValue;
    }
    
    const select = document.getElementById(selectId);
    const selectValue = select ? select.value.trim() : '';
    
    // 如果選擇的是"custom"，返回空字符串（應該使用自定義輸入）
    if (selectValue === 'custom') {
        return '';
    }
    
    return selectValue;
}

// 處理問題選擇變化
function handleQuestionChange(selectId, customId) {
    const select = document.getElementById(selectId);
    const customInput = document.getElementById(customId);
    
    if (!select || !customInput) return;
    
    select.addEventListener('change', () => {
        if (select.value === 'custom') {
            customInput.classList.remove('hidden');
            customInput.focus();
            customInput.required = true;
        } else {
            customInput.classList.add('hidden');
            customInput.value = '';
            customInput.required = false;
        }
    });
}

// 處理抽牌
async function handleDrawCards() {
    const question = getQuestionValue('question', 'questionCustom');
    const apiKey = getApiKey();
    const drawBtn = document.getElementById('drawBtn');
    const loading = document.getElementById('loading');
    const resultSection = document.getElementById('resultSection');

    if (!question) {
        alert('請先輸入您的問題！');
        return;
    }

    if (!apiKey) {
        alert('請先設置 Gemini API 金鑰！\n\n點擊右上角的設置按鈕來輸入 API 金鑰。');
        openModal();
        return;
    }

    // 禁用按鈕並顯示載入
    drawBtn.disabled = true;
    loading.classList.remove('hidden');
    resultSection.classList.add('hidden');

    // 抽牌
    const numCards = currentSpread === 'single' ? 1 : 3;
    drawnCards = drawRandomCards(numCards);

    // 顯示卡片動畫
    displayCards(drawnCards);

    // 等待動畫完成後請求 AI 解讀
    setTimeout(async () => {
        try {
            const interpretation = await getAIInterpretation(question, drawnCards);
            displayResult(interpretation);
        } catch (error) {
            console.error('解讀錯誤:', error);
            let errorMsg = '解讀失敗，請稍後再試。';
            if (error.message.includes('API 金鑰')) {
                errorMsg = '服務器配置錯誤：請聯繫管理員檢查 API 金鑰設置。';
            } else if (error.message.includes('配額')) {
                errorMsg = 'API 配額已用完，請稍後再試。';
            }
            alert(errorMsg + '\n\n錯誤詳情：' + error.message);
        } finally {
            loading.classList.add('hidden');
            drawBtn.disabled = false;
        }
    }, 2000);
}

/**
 * Fisher-Yates Shuffle 演算法
 * 這是目前公認最公平的洗牌方法，確保每張牌被選中的機率完全均等
 * 
 * 算法原理：
 * 1. 從陣列最後一個元素開始
 * 2. 隨機選擇一個從 0 到當前索引的元素
 * 3. 交換這兩個元素
 * 4. 重複直到第一個元素
 * 
 * 時間複雜度：O(n)
 * 空間複雜度：O(1) - 原地洗牌
 * 
 * @param {Array} array - 要洗牌的陣列
 * @returns {Array} - 洗牌後的陣列（新陣列，不修改原陣列）
 */
function fisherYatesShuffle(array) {
    // 創建陣列副本，避免修改原始陣列
    const shuffled = [...array];
    
    // 從最後一個元素開始，向前遍歷
    for (let i = shuffled.length - 1; i > 0; i--) {
        // 隨機選擇一個從 0 到 i（包含 i）的索引
        // Math.random() * (i + 1) 產生 [0, i+1) 的隨機數
        // Math.floor() 向下取整，得到 [0, i] 的整數
        const j = Math.floor(Math.random() * (i + 1));
        
        // 交換 shuffled[i] 和 shuffled[j]
        // 使用解構賦值進行交換，無需臨時變數
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}

/**
 * 隨機抽牌（使用 Fisher-Yates Shuffle + 正逆位判定）
 * 
 * 流程：
 * 1. 使用 Fisher-Yates 洗牌法對完整牌組進行洗牌
 * 2. 從洗好的牌組中抽取指定數量的牌（抽後不放回）
 * 3. 為每張抽到的牌隨機決定正位或逆位（各50%機率）
 * 4. 如果是三張牌牌陣，為每張牌分配位置意義
 * 
 * @param {number} count - 要抽取的牌數（1 或 3）
 * @returns {Array} - 抽取的牌陣列，包含正逆位和位置資訊
 */
function drawRandomCards(count) {
    // 步驟1：使用 Fisher-Yates Shuffle 對完整78張牌進行洗牌
    // 這確保每張牌被選中的機率完全均等，沒有偏差
    const shuffled = fisherYatesShuffle(tarotCards);
    
    // 步驟2：從洗好的牌組中抽取前 count 張牌（抽後不放回）
    // slice(0, count) 確保不會重複抽取同一張牌
    const selected = shuffled.slice(0, count).map(card => {
        // 步驟3：為每張牌隨機決定正位或逆位
        // Math.random() > 0.5 產生各50%的機率
        const isUpright = Math.random() > 0.5;
        
        return {
            ...card, // 保留原始卡片資訊（name, emoji, meaning）
            orientation: isUpright ? '正位' : '逆位',
            displayName: `${card.name}${isUpright ? '(正位)' : '(逆位)'}`
        };
    });
    
    // 步驟4：如果是三張牌牌陣，為每張牌分配位置意義
    if (currentSpread === 'three') {
        return selected.map((card, index) => ({
            ...card,
            position: threeCardPositions[index].position,
            positionMeaning: threeCardPositions[index].meaning
        }));
    }
    
    // 單張牌直接返回
    return selected;
}

// 顯示卡片
function displayCards(cards) {
    const container = document.getElementById('cardsContainer');
    if (!container) {
        console.warn('cardsContainer 元素不存在，跳過顯示卡片');
        return;
    }
    container.innerHTML = '';

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card back';
        cardElement.dataset.index = index;

        container.appendChild(cardElement);

        // 翻牌動畫
        setTimeout(() => {
            cardElement.classList.remove('back');
            cardElement.innerHTML = `
                <div class="card-image">${card.emoji}</div>
                <div class="card-name">${card.name}</div>
                ${card.position ? `<div class="card-position">${card.position}</div>` : ''}
            `;
        }, 500 + index * 300);
    });
}

// 獲取 AI 解讀
async function getAIInterpretation(question, cards) {
    const apiKey = getApiKey();
    const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: question,
            cards: cards,
            spread: currentSpread,
            apiKey: apiKey
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 'API 請求失敗';
        const errorDetails = errorData.details || `HTTP ${response.status}`;
        throw new Error(`${errorMessage}: ${errorDetails}`);
    }

    return await response.json();
}

// 顯示結果
function displayResult(data) {
    const resultSection = document.getElementById('resultSection');
    const resultContent = document.getElementById('resultContent');

    let html = `<p><strong>您的問題：</strong>${data.question}</p>`;
    
    html += '<div style="margin: 20px 0;">';
    data.cards.forEach((card, index) => {
        html += `<p><strong>${card.position || '抽到的牌'}：</strong>${card.name} ${card.emoji}</p>`;
    });
    html += '</div>';

    html += `<div style="margin-top: 20px; padding: 20px; background: white; border-radius: 10px; border-left: 4px solid #667eea;">`;
    html += `<p><strong>AI 解讀：</strong></p>`;
    html += `<div style="white-space: pre-wrap; line-height: 1.8;">${data.interpretation}</div>`;
    html += `</div>`;

    resultContent.innerHTML = html;
    resultSection.classList.remove('hidden');
    
}

// 切換占卜類型
function switchDivinationType(type) {
    // 隱藏所有表單
    document.querySelectorAll('.divination-form').forEach(form => {
        form.classList.add('hidden');
        form.classList.remove('active');
    });

    // 重置所有自定義輸入框
    document.querySelectorAll('.question-custom').forEach(input => {
        input.classList.add('hidden');
        input.value = '';
        input.required = false;
    });

    // 重置所有問題選擇器
    document.querySelectorAll('.question-select').forEach(select => {
        select.value = '';
    });

    // 顯示對應的表單
    const formMap = {
        'tarot': 'tarotForm',
        'bazi': 'baziForm',
        'ziwei': 'baziForm', // 共用同一個表單
        'astrology': 'astrologyForm',
        'yijing': 'yijingForm',
        'migu': 'yijingForm', // 共用同一個表單
        'qiuqian': 'yijingForm' // 共用同一個表單
    };

    const formId = formMap[type];
    if (formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.classList.remove('hidden');
            form.classList.add('active');
        }
    }
}

// 重複定義已移除，請使用文件頂部的定義（第 112-246 行）

// 洗牌完成後開始占卜
async function startDivinationAfterShuffle() {
    // 播放翻牌音效
    playSound('cardFlip');
    
    // 抽牌
    const numCards = currentSpread === 'single' ? 1 : 3;
    drawnCards = drawRandomCards(numCards);
    displayCards(drawnCards);
    
    // 心理延遲：3-5秒的過場動畫
    const loading = document.getElementById('loading');
    const loadingText = loading.querySelector('p');
    
    loading.classList.remove('hidden');
    
    // 階段性顯示文字，增加期待感
    const stages = [
        { text: '🔮 牌面正在顯現...', delay: 1000 },
        { text: '✨ 能量正在匯聚...', delay: 2000 },
        { text: '🌟 AI 正在解讀中...', delay: 3000 }
    ];
    
    for (let i = 0; i < stages.length; i++) {
        const stage = stages[i];
        const prevDelay = i > 0 ? stages[i - 1].delay : 0;
        await new Promise(resolve => setTimeout(resolve, stage.delay - prevDelay));
        if (loadingText) {
            loadingText.textContent = stage.text;
        }
        playSound('ambient');
    }
    
    // 繼續原有的占卜流程
    await continueDivination();
}

// 繼續占卜（從洗牌後開始）
async function continueDivination() {
    const apiKey = getApiKey();
    if (!apiKey) {
        showError('請先設置 Gemini API 金鑰！', 'error');
        setTimeout(() => openModal(), 500);
        return;
    }

    const divineBtn = document.getElementById('divineBtn');
    const loading = document.getElementById('loading');
    const resultSection = document.getElementById('resultSection');
    
    // 收集數據
    const question = getQuestionValue('question', 'questionCustom');
    if (!question) {
        showError('請先選擇或輸入您的問題！', 'error');
        return;
    }
    
    const numCards = currentSpread === 'single' ? 1 : 3;
    const data = { cards: drawnCards, spread: currentSpread };
    
    // 執行占卜
    await performDivination(question, data, apiKey, divineBtn, loading, resultSection);
}

// 心理延遲動畫（3-5秒過場）
async function performPsychologicalDelay() {
    const loading = document.getElementById('loading');
    const loadingText = loading.querySelector('p');
    
    loading.classList.remove('hidden');
    
    const stages = [
        { text: '🔮 正在連接宇宙能量...', delay: 1200 },
        { text: '✨ 牌面正在顯現...', delay: 1200 },
        { text: '🌟 AI 正在解讀中...', delay: 1500 }
    ];
    
    for (let i = 0; i < stages.length; i++) {
        const stage = stages[i];
        const prevDelay = i > 0 ? stages[i - 1].delay : 0;
        if (loadingText) {
            loadingText.textContent = stage.text;
        }
        playSound('ambient');
        await new Promise(resolve => setTimeout(resolve, stage.delay - prevDelay));
    }
}

// 執行占卜（統一函數）
async function performDivination(question, data, apiKey, divineBtn, loading, resultSection) {
    try {
        if (divineBtn) divineBtn.disabled = true;
        if (resultSection) resultSection.classList.add('hidden');
        
        const result = await getDivinationResult(currentDivinationType, question, data, apiKey);
        displayDivinationResult(currentDivinationType, question, data, result);
    } catch (error) {
        console.error('解讀錯誤:', error);
        showError('解讀失敗：' + error.message, 'error');
    } finally {
        if (loading) loading.classList.add('hidden');
        if (divineBtn) {
            divineBtn.disabled = false;
            divineBtn.style.display = '';
        }
    }
}

// 顯示錯誤提示（優化版）
function showError(message, type = 'error') {
    // 創建錯誤提示元素
    const errorDiv = document.createElement('div');
    errorDiv.className = `error-message ${type}`;
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'rgba(255, 100, 100, 0.9)' : 'rgba(255, 215, 0, 0.9)'};
        color: #1a1a2e;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        font-weight: bold;
    `;
    
    document.body.appendChild(errorDiv);
    
    // 3秒後自動移除
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

// 處理占卜
async function handleDivination() {
    const apiKey = getApiKey();
    if (!apiKey) {
        showError('請先設置 Gemini API 金鑰！', 'error');
        setTimeout(() => openModal(), 500);
        return;
    }

    const divineBtn = document.getElementById('divineBtn');
    const loading = document.getElementById('loading');
    const resultSection = document.getElementById('resultSection');

    // 收集數據
    let question = '';
    let data = {};

    switch(currentDivinationType) {
        case 'tarot':
            question = getQuestionValue('question', 'questionCustom');
            if (!question) {
                showError('請先選擇或輸入您的問題！', 'error');
                document.getElementById('question').focus();
                return;
            }
            
            // 顯示洗牌區域（儀式感）
            const shuffleArea = document.getElementById('shuffleArea');
            if (shuffleArea) {
                shuffleArea.classList.remove('hidden');
                shuffleState.progress = 0;
                const progressBar = document.querySelector('.shuffle-progress-bar');
                const shuffleProgress = document.getElementById('shuffleProgress');
                if (progressBar) progressBar.style.width = '0%';
                if (shuffleProgress) shuffleProgress.textContent = '0%';
                
                // 隱藏占卜按鈕，等待洗牌完成
                divineBtn.style.display = 'none';
                return; // 等待洗牌完成後再繼續
            }
            
            // 如果沒有洗牌區域，直接進行（向後兼容）
            const numCards = currentSpread === 'single' ? 1 : 3;
            drawnCards = drawRandomCards(numCards);
            displayCards(drawnCards);
            data = { cards: drawnCards, spread: currentSpread };
            
            // 心理延遲動畫
            await performPsychologicalDelay();
            
            // 繼續占卜流程
            await performDivination(question, data, apiKey, divineBtn, loading, resultSection);
            break;

        case 'bazi':
        case 'ziwei':
            question = getQuestionValue('baziQuestion', 'baziQuestionCustom');
            if (!question) {
                showError('請先選擇或輸入您的問題！', 'error');
                document.getElementById('baziQuestion').focus();
                return;
            }
            
            // 心理延遲動畫
            await performPsychologicalDelay();
            const birthDate = document.getElementById('birthDate').value;
            if (!birthDate) {
                showError('請輸入出生日期！', 'error');
                document.getElementById('birthDate').focus();
                return;
            }
            const birthTime = document.getElementById('birthTime').value;
            // 調用後端完整計算 API
            try {
                const calcResponse = await fetch('/api/calculate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: currentDivinationType,
                        birthDate: birthDate,
                        birthTime: birthTime || '12:00'
                    })
                });

                if (calcResponse.ok) {
                    const calcData = await calcResponse.json();
                    data = {
                        name: document.getElementById('baziName') ? document.getElementById('baziName').value.trim() : '',
                        gender: document.getElementById('gender').value,
                        birthDate: birthDate,
                        birthTime: birthTime,
                        calculation: calcData.result
                    };
                } else {
                    // 如果後端計算失敗，使用前端簡化計算
                    const birthDateTime = birthTime ? `${birthDate}T${birthTime}` : `${birthDate}T12:00`;
                    const calculation = currentDivinationType === 'bazi' 
                        ? calculateBazi(birthDateTime)
                        : calculateZiwei(birthDateTime);
                    data = {
                        name: document.getElementById('baziName') ? document.getElementById('baziName').value.trim() : '',
                        gender: document.getElementById('gender').value,
                        birthDate: birthDate,
                        birthTime: birthTime,
                        calculation: calculation
                    };
                }
            } catch (error) {
                console.error('計算錯誤，使用簡化版本:', error);
                // 使用前端簡化計算作為備用
                const birthDateTime = birthTime ? `${birthDate}T${birthTime}` : `${birthDate}T12:00`;
                const calculation = currentDivinationType === 'bazi' 
                    ? calculateBazi(birthDateTime)
                    : calculateZiwei(birthDateTime);
                data = {
                    name: document.getElementById('name').value.trim(),
                    gender: document.getElementById('gender').value,
                    birthDate: birthDate,
                    birthTime: birthTime,
                    calculation: calculation
                };
            }
            
            // 執行占卜
            await performDivination(question, data, apiKey, divineBtn, loading, resultSection);
            break;

        case 'astrology':
            question = getQuestionValue('astrologyQuestion', 'astrologyQuestionCustom');
            if (!question) {
                showError('請先選擇或輸入您的問題！', 'error');
                document.getElementById('astrologyQuestion').focus();
                return;
            }
            
            // 心理延遲動畫
            await performPsychologicalDelay();
            const astrologyBirthDate = document.getElementById('astrologyBirthDate').value;
            if (!astrologyBirthDate) {
                showError('請輸入出生日期！', 'error');
                document.getElementById('astrologyBirthDate').focus();
                return;
            }
            const birthPlaceEl = document.getElementById('astrologyBirthPlace') || document.getElementById('birthPlace');
            const birthPlace = birthPlaceEl ? birthPlaceEl.value.trim() : '';
            if (!birthPlace) {
                showError('請輸入出生地點！', 'error');
                if (birthPlaceEl) birthPlaceEl.focus();
                return;
            }
            
            // 調用後端完整計算 API
            try {
                const calcResponse = await fetch('/api/calculate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: 'astrology',
                        birthDate: astrologyBirthDate,
                        birthTime: '12:00',
                        birthPlace: birthPlace
                    })
                });

                if (calcResponse.ok) {
                    const calcData = await calcResponse.json();
                    data = {
                        birthDate: astrologyBirthDate,
                        birthPlace: birthPlace,
                        calculation: calcData.result
                    };
                } else {
                    // 如果後端計算失敗，使用前端簡化計算
                    const astrologyData = calculateAstrology(astrologyBirthDate, birthPlace);
                    data = {
                        birthDate: astrologyBirthDate,
                        birthPlace: birthPlace,
                        calculation: astrologyData
                    };
                }
            } catch (error) {
                console.error('計算錯誤，使用簡化版本:', error);
                // 使用前端簡化計算作為備用
                const astrologyData = calculateAstrology(astrologyBirthDate, birthPlace);
                data = {
                    birthDate: astrologyBirthDate,
                    birthPlace: birthPlace,
                    calculation: astrologyData
                };
            }
            
            // 執行占卜
            await performDivination(question, data, apiKey, divineBtn, loading, resultSection);
            break;

        case 'yijing':
        case 'migu':
        case 'qiuqian':
            question = getQuestionValue('yijingQuestion', 'yijingQuestionCustom');
            if (!question) {
                showError('請先選擇或輸入您的問題！', 'error');
                document.getElementById('yijingQuestion').focus();
                return;
            }
            
            // 心理延遲動畫
            await performPsychologicalDelay();
            
            // 隨機生成卦象或籤詩
            const guaData = generateGua(currentDivinationType);
            data = guaData;
            
            // 執行占卜
            await performDivination(question, data, apiKey, divineBtn, loading, resultSection);
            break;
    }
}

// 獲取占卜結果
async function getDivinationResult(type, question, data, apiKey) {
    // 創建超時控制器（60秒超時）
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);
    
    try {
        const response = await fetch('/api/divination', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                question: question,
                data: data,
                apiKey: apiKey
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || errorData.details || `API 請求失敗 (${response.status})`);
        }

        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error('請求超時，請檢查網路連接或稍後再試');
        }
        
        throw error;
    }
}

// 顯示占卜結果
function displayDivinationResult(type, question, data, result) {
    const resultSection = document.getElementById('resultSection');
    const resultContent = document.getElementById('resultContent');

    let html = '';

    // 問題卡片
    html += `
        <div class="result-card question-card">
            <div class="card-header">
                <span class="card-icon">💭</span>
                <h3 class="card-title">您的問題</h3>
            </div>
            <div class="card-body">
                <p class="question-text">${question}</p>
            </div>
        </div>
    `;

    // 數據卡片 - 根據不同占卜類型
    if (type === 'tarot' && data.cards) {
        html += '<div class="result-card data-card tarot-cards">';
        html += '<div class="card-header"><span class="card-icon">🃏</span><h3 class="card-title">抽到的牌</h3></div>';
        html += '<div class="card-body"><div class="tarot-cards-grid">';
        data.cards.forEach((card, index) => {
            const cardName = card.displayName || card.name;
            const position = card.position || `第${index + 1}張`;
            const orientation = card.orientation || '';
            const orientationClass = orientation === '逆位' ? 'reversed' : '';
            html += `
                <div class="tarot-result-card ${orientationClass}">
                    <div class="tarot-card-emoji">${card.emoji}</div>
                    <div class="tarot-card-name">${cardName}</div>
                    <div class="tarot-card-position">${position}</div>
                    ${orientation ? `<div class="tarot-card-orientation ${orientationClass}">${orientation}</div>` : ''}
                </div>
            `;
        });
        html += '</div></div></div>';
    } else if ((type === 'bazi' || type === 'ziwei') && data.birthDate) {
        html += '<div class="result-card data-card bazi-card">';
        html += '<div class="card-header"><span class="card-icon">📅</span><h3 class="card-title">出生資訊</h3></div>';
        html += '<div class="card-body">';
        html += `<div class="info-item"><span class="info-label">出生日期：</span><span class="info-value">${data.birthDate} ${data.birthTime || ''}</span></div>`;
        
        if (data.calculation) {
            if (type === 'bazi' && data.calculation.fullBazi) {
                html += `<div class="bazi-pillars">
                    <div class="pillar-card">
                        <div class="pillar-label">年柱</div>
                        <div class="pillar-value">${data.calculation.yearPillar}</div>
                    </div>
                    <div class="pillar-card">
                        <div class="pillar-label">月柱</div>
                        <div class="pillar-value">${data.calculation.monthPillar}</div>
                    </div>
                    <div class="pillar-card">
                        <div class="pillar-label">日柱</div>
                        <div class="pillar-value">${data.calculation.dayPillar}</div>
                    </div>
                    <div class="pillar-card">
                        <div class="pillar-label">時柱</div>
                        <div class="pillar-value">${data.calculation.hourPillar}</div>
                    </div>
                </div>`;
                html += `<div class="bazi-full">${data.calculation.fullBazi}</div>`;
                if (data.calculation.lunarDate) {
                    html += `<div class="info-item"><span class="info-label">農曆：</span><span class="info-value">${data.calculation.lunarDate}</span></div>`;
                }
                if (data.calculation.jieQi) {
                    html += `<div class="info-item"><span class="info-label">節氣：</span><span class="info-value">${data.calculation.jieQi}</span></div>`;
                }
            } else if (type === 'ziwei' && data.calculation.mingGong) {
                html += `<div class="ziwei-main">${data.calculation.mingGong}</div>`;
                if (data.calculation.wuXingJu) {
                    html += `<div class="info-item"><span class="info-label">五行局：</span><span class="info-value">${data.calculation.wuXingJu}</span></div>`;
                }
                if (data.calculation.ziweiPosition) {
                    html += `<div class="info-item"><span class="info-label">紫微星：</span><span class="info-value">${data.calculation.ziweiPosition}</span></div>`;
                }
                if (data.calculation.mainStars) {
                    html += '<div class="stars-grid">';
                    if (typeof data.calculation.mainStars === 'object') {
                        Object.values(data.calculation.mainStars).forEach(star => {
                            html += `<div class="star-item">${star}</div>`;
                        });
                    }
                    html += '</div>';
                }
                if (data.calculation.lunarDate) {
                    html += `<div class="info-item"><span class="info-label">農曆：</span><span class="info-value">${data.calculation.lunarDate}</span></div>`;
                }
            }
        }
        html += '</div></div>';
    } else if (type === 'astrology' && data.birthDate) {
        html += '<div class="result-card data-card astrology-card">';
        html += '<div class="card-header"><span class="card-icon">🌙</span><h3 class="card-title">星盤資訊</h3></div>';
        html += '<div class="card-body">';
        html += `<div class="info-item"><span class="info-label">出生日期：</span><span class="info-value">${data.birthDate}</span></div>`;
        html += `<div class="info-item"><span class="info-label">出生地點：</span><span class="info-value">${data.birthPlace || ''}</span></div>`;
        
        if (data.calculation) {
            html += '<div class="signs-grid">';
            if (data.calculation.sunSign) {
                html += `<div class="sign-card sun-sign">
                    <div class="sign-icon">☀️</div>
                    <div class="sign-label">太陽</div>
                    <div class="sign-value">${data.calculation.sunSign}${data.calculation.planets && data.calculation.planets.sun ? ` ${data.calculation.planets.sun.degree}°` : ''}</div>
                </div>`;
            }
            if (data.calculation.moonSign) {
                html += `<div class="sign-card moon-sign">
                    <div class="sign-icon">🌙</div>
                    <div class="sign-label">月亮</div>
                    <div class="sign-value">${data.calculation.moonSign}${data.calculation.planets && data.calculation.planets.moon ? ` ${data.calculation.planets.moon.degree}°` : ''}</div>
                </div>`;
            }
            if (data.calculation.risingSign) {
                html += `<div class="sign-card rising-sign">
                    <div class="sign-icon">⬆️</div>
                    <div class="sign-label">上升</div>
                    <div class="sign-value">${data.calculation.risingSign}</div>
                </div>`;
            }
            html += '</div>';
            
            if (data.calculation.planets) {
                html += '<div class="planets-grid">';
                const planetNames = {
                    mercury: { name: '水星', icon: '☿️' },
                    venus: { name: '金星', icon: '♀️' },
                    mars: { name: '火星', icon: '♂️' },
                    jupiter: { name: '木星', icon: '♃' },
                    saturn: { name: '土星', icon: '♄' }
                };
                Object.entries(data.calculation.planets).forEach(([key, planet]) => {
                    if (key !== 'sun' && key !== 'moon' && planetNames[key]) {
                        html += `<div class="planet-item">
                            <span class="planet-icon">${planetNames[key].icon}</span>
                            <span class="planet-name">${planetNames[key].name}</span>
                            <span class="planet-value">${planet.sign} ${planet.degree}°</span>
                        </div>`;
                    }
                });
                html += '</div>';
            }
        }
        html += '</div></div>';
    } else if (data.gua) {
        html += '<div class="result-card data-card gua-card">';
        html += `<div class="card-header"><span class="card-icon">☯️</span><h3 class="card-title">${data.guaName || '卦象/籤詩'}</h3></div>`;
        html += '<div class="card-body">';
        html += `<div class="gua-main">${data.gua}</div>`;
        if (data.benGua && data.bianGua) {
            html += `<div class="gua-info">
                <div class="gua-item"><span class="gua-label">本卦：</span><span class="gua-value">${data.benGua}</span></div>
                <div class="gua-item"><span class="gua-label">變爻：</span><span class="gua-value">${data.changingLines ? data.changingLines.join('、') : '無'}</span></div>
                <div class="gua-item"><span class="gua-label">之卦：</span><span class="gua-value">${data.bianGua}</span></div>
            </div>`;
        }
        if (data.number) {
            html += `<div class="qian-number">第 ${data.number} 籤</div>`;
        }
        html += '</div></div>';
    }

    // 解讀結果卡片
    const resultData = result.result || {};
    
    if (resultData.opening) {
        html += `
            <div class="result-card opening-card">
                <div class="card-header">
                    <span class="card-icon">✨</span>
                    <h3 class="card-title">開場語</h3>
                </div>
                <div class="card-body">
                    <p class="opening-text">${resultData.opening}</p>
                </div>
            </div>
        `;
    }

    if (resultData.summary) {
        html += `
            <div class="result-card summary-card">
                <div class="card-header">
                    <span class="card-icon">📋</span>
                    <h3 class="card-title">總結</h3>
                </div>
                <div class="card-body">
                    <p class="summary-text">${resultData.summary}</p>
                </div>
            </div>
        `;
    }

    if (resultData.analysis) {
        html += `
            <div class="result-card analysis-card">
                <div class="card-header">
                    <span class="card-icon">🔍</span>
                    <h3 class="card-title">詳細分析</h3>
                </div>
                <div class="card-body">
                    <div class="analysis-text">${resultData.analysis}</div>
                </div>
            </div>
        `;
    }

    if (resultData.advice && resultData.advice.length > 0) {
        html += `
            <div class="result-card advice-card">
                <div class="card-header">
                    <span class="card-icon">💡</span>
                    <h3 class="card-title">建議指引</h3>
                </div>
                <div class="card-body">
                    <div class="advice-grid">
        `;
        resultData.advice.forEach((advice, index) => {
            html += `
                <div class="advice-item">
                    <div class="advice-number">${index + 1}</div>
                    <div class="advice-text">${advice}</div>
                </div>
            `;
        });
        html += '</div></div></div>';
    }

    if (resultData.luckyItems) {
        html += `
            <div class="result-card lucky-card">
                <div class="card-header">
                    <span class="card-icon">🍀</span>
                    <h3 class="card-title">幸運元素</h3>
                </div>
                <div class="card-body">
                    <div class="lucky-grid">
        `;
        Object.entries(resultData.luckyItems).forEach(([key, value]) => {
            html += `
                <div class="lucky-item-card">
                    <div class="lucky-label">${key}</div>
                    <div class="lucky-value">${value}</div>
                </div>
            `;
        });
        html += '</div></div></div>';
    } else if (resultData.lucky_color || resultData.lucky_direction || resultData.lucky_item) {
        html += `
            <div class="result-card lucky-card">
                <div class="card-header">
                    <span class="card-icon">🍀</span>
                    <h3 class="card-title">幸運元素</h3>
                </div>
                <div class="card-body">
                    <div class="lucky-grid">
        `;
        if (resultData.lucky_color) {
            html += `<div class="lucky-item-card"><div class="lucky-label">幸運色</div><div class="lucky-value">${resultData.lucky_color}</div></div>`;
        }
        if (resultData.lucky_direction) {
            html += `<div class="lucky-item-card"><div class="lucky-label">幸運方位</div><div class="lucky-value">${resultData.lucky_direction}</div></div>`;
        }
        if (resultData.lucky_item) {
            html += `<div class="lucky-item-card"><div class="lucky-label">幸運小物</div><div class="lucky-value">${resultData.lucky_item}</div></div>`;
        }
        html += '</div></div></div>';
    }

    if (resultData.score !== undefined) {
        const scorePercent = resultData.score;
        const scoreColor = scorePercent >= 80 ? '#4ade80' : scorePercent >= 60 ? '#fbbf24' : '#f87171';
        html += `
            <div class="result-card score-card">
                <div class="card-header">
                    <span class="card-icon">⭐</span>
                    <h3 class="card-title">運勢評分</h3>
                </div>
                <div class="card-body">
                    <div class="score-display">
                        <div class="score-circle" style="--score: ${scorePercent}; --color: ${scoreColor};">
                            <div class="score-value">${scorePercent}</div>
                            <div class="score-label">分</div>
                        </div>
                        <div class="score-bar-container">
                            <div class="score-bar" style="width: ${scorePercent}%; background: ${scoreColor};"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    resultContent.innerHTML = html;
    resultSection.classList.remove('hidden');

    
    // 滾動到結果區域
    setTimeout(() => {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    // 顯示分享按鈕
    addShareButton(result);
}

// 添加分享按鈕
function addShareButton(result) {
    const resultHeader = document.querySelector('.result-header');
    if (!resultHeader) return;
    
    // 檢查是否已有分享按鈕
    if (document.getElementById('shareBtn')) return;
    
    const shareBtn = document.createElement('button');
    shareBtn.id = 'shareBtn';
    shareBtn.className = 'icon-btn-small';
    shareBtn.title = '分享結果';
    shareBtn.textContent = '📤';
    shareBtn.addEventListener('click', () => generateShareImage(result));
    
    resultHeader.appendChild(shareBtn);
}

// 生成分享圖片（IG Story 格式 9:16）
function generateShareImage(result) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // IG Story 尺寸：1080x1920 (9:16)
    canvas.width = 1080;
    canvas.height = 1920;
    
    // 背景漸變
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 添加星空效果
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 標題
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 80px Microsoft JhengHei';
    ctx.textAlign = 'center';
    ctx.fillText('🔮 AI 命理占卜', canvas.width / 2, 150);
    
    // 關鍵牌或結果
    const resultData = result.result || {};
    if (resultData.summary) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 60px Microsoft JhengHei';
        const summaryLines = wrapText(ctx, resultData.summary, canvas.width - 200, 60);
        summaryLines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, 400 + index * 80);
        });
    }
    
    // 金句
    if (resultData.opening) {
        ctx.fillStyle = '#ffd700';
        ctx.font = 'italic 50px Microsoft JhengHei';
        const openingLines = wrapText(ctx, resultData.opening, canvas.width - 200, 50);
        openingLines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, 700 + index * 70);
        });
    }
    
    // 幸運元素
    if (resultData.luckyItems) {
        ctx.fillStyle = '#d0d0d0';
        ctx.font = '40px Microsoft JhengHei';
        let yPos = 1400;
        Object.entries(resultData.luckyItems).forEach(([key, value]) => {
            ctx.fillText(`${key}：${value}`, canvas.width / 2, yPos);
            yPos += 60;
        });
    } else if (resultData.lucky_color || resultData.lucky_direction || resultData.lucky_item) {
        ctx.fillStyle = '#d0d0d0';
        ctx.font = '40px Microsoft JhengHei';
        let yPos = 1400;
        if (resultData.lucky_color) {
            ctx.fillText(`幸運色：${resultData.lucky_color}`, canvas.width / 2, yPos);
            yPos += 60;
        }
        if (resultData.lucky_direction) {
            ctx.fillText(`幸運方位：${resultData.lucky_direction}`, canvas.width / 2, yPos);
            yPos += 60;
        }
        if (resultData.lucky_item) {
            ctx.fillText(`幸運小物：${resultData.lucky_item}`, canvas.width / 2, yPos);
        }
    }
    
    // 評分
    if (resultData.score !== undefined) {
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 100px Microsoft JhengHei';
        ctx.fillText(`${resultData.score}分`, canvas.width / 2, 1700);
    }
    
    // 底部標記
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '30px Microsoft JhengHei';
    ctx.fillText('AI 命理占卜', canvas.width / 2, canvas.height - 100);
    
    // 轉換為圖片並下載
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `占卜結果_${new Date().toISOString().slice(0, 10)}.png`;
        a.click();
        URL.revokeObjectURL(url);
        
        showError('圖片已下載！可以分享到 Instagram Story 了', 'success');
    }, 'image/png');
}

// 文字換行輔助函數
function wrapText(ctx, text, maxWidth, fontSize) {
    const words = text.split('');
    const lines = [];
    let currentLine = '';
    
    for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = words[i];
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) {
        lines.push(currentLine);
    }
    return lines;
}

// 易經：模擬金錢卦法（正確的機率分佈）
function generateYijingGua() {
    // 64 卦對照表（簡化版，實際應有完整對照）
    const guaMap = {
        '111111': { name: '乾', fullName: '乾為天', meaning: '天行健，君子以自強不息' },
        '000000': { name: '坤', fullName: '坤為地', meaning: '地勢坤，君子以厚德載物' },
        '100010': { name: '屯', fullName: '水雷屯', meaning: '剛柔始交而難生' },
        '010001': { name: '蒙', fullName: '山水蒙', meaning: '山下出泉，蒙' },
        '111010': { name: '需', fullName: '水天需', meaning: '雲上於天，需' }
    };

    // 投擲 3 枚硬幣，投 6 次（從下到上：初爻到上爻）
    const lines = [];
    const changingLines = []; // 變爻位置
    
    for (let i = 0; i < 6; i++) {
        // 模擬投擲 3 枚硬幣
        const coins = [
            Math.random() < 0.5 ? 0 : 1, // 背面=0, 正面=1
            Math.random() < 0.5 ? 0 : 1,
            Math.random() < 0.5 ? 0 : 1
        ];
        
        const sum = coins.reduce((a, b) => a + b, 0);
        let line, isChanging;
        
        // 正確的機率分佈
        if (sum === 0) {
            // 3個背面 (老陰) = 變爻 (機率 1/8) -> 變為陽
            line = 0; // 陰爻
            isChanging = true;
        } else if (sum === 3) {
            // 3個正面 (老陽) = 變爻 (機率 1/8) -> 變為陰
            line = 1; // 陽爻
            isChanging = true;
        } else if (sum === 1) {
            // 2背1正 (少陽) = 不變 (機率 3/8)
            line = 1; // 陽爻
            isChanging = false;
        } else {
            // 2正1背 (少陰) = 不變 (機率 3/8)
            line = 0; // 陰爻
            isChanging = false;
        }
        
        lines.push(line);
        if (isChanging) {
            changingLines.push(i);
        }
    }
    
    // 構成本卦（從下到上）
    const benGua = lines.reverse().join(''); // 上爻到初爻
    
    // 構建變卦（變爻取反）
    const bianGua = lines.map((line, index) => 
        changingLines.includes(5 - index) ? (1 - line) : line
    ).reverse().join('');
    
    // 查找卦名（簡化版，實際應有完整 64 卦對照）
    const benGuaInfo = guaMap[benGua] || { name: '未知', fullName: '未知卦', meaning: '' };
    const bianGuaInfo = guaMap[bianGua] || { name: '未知', fullName: '未知卦', meaning: '' };
    
    return {
        gua: `${benGuaInfo.fullName}`,
        guaName: '本卦',
        benGua: benGuaInfo.fullName,
        bianGua: bianGuaInfo.fullName,
        changingLines: changingLines.map(i => {
            const positions = ['初', '二', '三', '四', '五', '上'];
            return `${positions[i]}${lines[5-i] === 1 ? '九' : '六'}`;
        }),
        meaning: `本卦：${benGuaInfo.fullName}，變爻：${changingLines.length > 0 ? changingLines.map(i => {
            const positions = ['初', '二', '三', '四', '五', '上'];
            return positions[i];
        }).join('、') : '無'}，之卦：${bianGuaInfo.fullName}`
    };
}

// 求籤：簡單隨機抽樣
function generateQian() {
    const qianNumber = Math.floor(Math.random() * 100) + 1; // 1-100 支籤
    
    // 籤的等級分佈（簡化版）
    let level, text, meaning;
    if (qianNumber <= 10) {
        level = '上上籤';
        text = '大吉大利，萬事順遂';
    } else if (qianNumber <= 30) {
        level = '上籤';
        text = '吉，凡事順利';
    } else if (qianNumber <= 60) {
        level = '中上籤';
        text = '平順，略有波折';
    } else if (qianNumber <= 80) {
        level = '中籤';
        text = '平平，需謹慎';
    } else {
        level = '中下籤';
        text = '小凶，需注意';
    }
    
    return {
        gua: `第${qianNumber}籤 - ${level}`,
        guaName: '籤詩',
        meaning: text,
        number: qianNumber
    };
}

// 生成卦象或籤詩
function generateGua(type) {
    if (type === 'yijing') {
        return generateYijingGua();
    } else if (type === 'migu') {
        // 米卦簡化為易經邏輯
        return generateYijingGua();
    } else if (type === 'qiuqian') {
        return generateQian();
    }
}

// 歷史記錄功能
// 語音播放功能
function speakResult() {
    const resultContent = document.getElementById('resultContent');
    if (!resultContent) return;

    const text = resultContent.innerText || resultContent.textContent;
    if (!text) return;

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-TW';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    } else {
        alert('您的瀏覽器不支持語音播放功能');
    }
}

// ========== 計算型占卜邏輯 ==========

// 八字計算（基於節氣，簡化版）
// 注意：完整實現需要使用 lunar-javascript 庫進行精確的節氣計算
function calculateBazi(birthDateTime) {
    const date = new Date(birthDateTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    
    // 天干地支對照表
    const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    
    // 簡化計算（實際應使用節氣判斷）
    // 年柱：以立春為界
    const yearGan = (year - 4) % 10;
    const yearZhi = (year - 4) % 12;
    
    // 月柱：以節氣為界（簡化為農曆月份）
    const monthGan = (yearGan * 2 + month) % 10;
    const monthZhi = (month + 1) % 12;
    
    // 日柱：簡化計算（實際應查表或使用公式）
    const baseDate = new Date(1900, 0, 1);
    const daysDiff = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    const dayGan = (daysDiff + 9) % 10;
    const dayZhi = (daysDiff + 1) % 12;
    
    // 時柱：日上起時法
    const hourZhi = Math.floor((hour + 1) / 2) % 12;
    const hourGan = (dayGan * 2 + hourZhi) % 10;
    
    return {
        yearPillar: `${tianGan[yearGan]}${diZhi[yearZhi]}`,
        monthPillar: `${tianGan[monthGan]}${diZhi[monthZhi]}`,
        dayPillar: `${tianGan[dayGan]}${diZhi[dayZhi]}`,
        hourPillar: `${tianGan[hourGan]}${diZhi[hourZhi]}`,
        fullBazi: `${tianGan[yearGan]}${diZhi[yearZhi]}年 ${tianGan[monthGan]}${diZhi[monthZhi]}月 ${tianGan[dayGan]}${diZhi[dayZhi]}日 ${tianGan[hourGan]}${diZhi[hourZhi]}時`,
        note: '注意：此為簡化計算，完整八字需使用節氣精確計算'
    };
}

// 紫微斗數計算（簡化版）
function calculateZiwei(birthDateTime) {
    const date = new Date(birthDateTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    
    // 紫微斗數需要農曆日期（簡化為使用公曆）
    // 實際應轉換為農曆
    
    // 定命宮（簡化公式）
    const mingGong = (month + hour) % 12;
    
    // 主星對照表（簡化）
    const mainStars = ['紫微', '天機', '太陽', '武曲', '天同', '廉貞', '天府', '太陰', '貪狼', '巨門', '天相', '天梁'];
    
    return {
        mingGong: `命宮在${['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'][mingGong]}宮`,
        mainStar: mainStars[day % 12],
        note: '注意：此為簡化計算，完整紫微斗數需使用農曆日期和完整排盤算法'
    };
}

// 西洋占星計算（簡化版）
// 注意：完整實現需要使用 Swiss Ephemeris 或類似庫
function calculateAstrology(birthDate, birthPlace) {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // 星座對照表（簡化，僅基於日期）
    const zodiacSigns = [
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
    
    // 簡化：僅計算太陽星座
    let sunSign = '未知';
    for (const sign of zodiacSigns) {
        const [startMonth, startDay] = sign.start;
        const [endMonth, endDay] = sign.end;
        
        if ((month === startMonth && day >= startDay) || 
            (month === endMonth && day <= endDay) ||
            (startMonth > endMonth && (month === startMonth || month === endMonth))) {
            sunSign = sign.name;
            break;
        }
    }
    
    return {
        sunSign: sunSign,
        birthPlace: birthPlace,
        note: '注意：此為簡化計算，完整占星盤需使用 Swiss Ephemeris 計算所有行星位置和相位'
    };
}

