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

// API 金鑰管理
function getApiKey() {
    const apiKeyInput = document.getElementById('apiKey');
    return apiKeyInput ? apiKeyInput.value.trim() : '';
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
    if (savedKey) {
        const apiKeyInput = document.getElementById('apiKey');
        if (apiKeyInput) {
            apiKeyInput.value = savedKey;
            updateApiKeyStatus(true);
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
            statusEl.textContent = '';
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
        }
    });

    // 保存 API 金鑰
    if (saveApiKeyBtn) {
        saveApiKeyBtn.addEventListener('click', () => {
            const key = apiKeyInput ? apiKeyInput.value.trim() : '';
            if (key) {
                saveApiKey(key);
                updateApiKeyStatus(true);
                closeModal();
            } else {
                alert('請輸入 API 金鑰');
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

    // 歷史記錄按鈕
    const historyBtn = document.getElementById('historyBtn');
    if (historyBtn) {
        historyBtn.addEventListener('click', openHistoryModal);
    }

    // 關閉歷史記錄模態框
    const closeHistoryModal = document.getElementById('closeHistoryModal');
    const historyModalOverlay = document.getElementById('historyModalOverlay');
    if (closeHistoryModal) {
        closeHistoryModal.addEventListener('click', closeHistoryModalFunc);
    }
    if (historyModalOverlay) {
        historyModalOverlay.addEventListener('click', closeHistoryModalFunc);
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

// 處理抽牌
async function handleDrawCards() {
    const question = document.getElementById('question').value.trim();
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

// 隨機抽牌
function drawRandomCards(count) {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    
    if (currentSpread === 'three') {
        return selected.map((card, index) => ({
            ...card,
            position: threeCardPositions[index].position,
            positionMeaning: threeCardPositions[index].meaning
        }));
    }
    
    return selected;
}

// 顯示卡片
function displayCards(cards) {
    const container = document.getElementById('cardsContainer');
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
    
    // 保存到歷史記錄
    saveToHistory({
        type: 'tarot',
        question: data.question,
        result: data,
        timestamp: new Date().toISOString()
    });
}

// 切換占卜類型
function switchDivinationType(type) {
    // 隱藏所有表單
    document.querySelectorAll('.divination-form').forEach(form => {
        form.classList.add('hidden');
        form.classList.remove('active');
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

// 處理占卜
async function handleDivination() {
    const apiKey = getApiKey();
    if (!apiKey) {
        alert('請先設置 Gemini API 金鑰！\n\n點擊右上角的設置按鈕來輸入 API 金鑰。');
        openModal();
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
            question = document.getElementById('question').value.trim();
            if (!question) {
                alert('請先輸入您的問題！');
                return;
            }
            const numCards = currentSpread === 'single' ? 1 : 3;
            drawnCards = drawRandomCards(numCards);
            displayCards(drawnCards);
            data = { cards: drawnCards, spread: currentSpread };
            break;

        case 'bazi':
        case 'ziwei':
            question = document.getElementById('baziQuestion').value.trim();
            if (!question) {
                alert('請先輸入您的問題！');
                return;
            }
            const birthDate = document.getElementById('birthDate').value;
            if (!birthDate) {
                alert('請輸入出生日期！');
                return;
            }
            data = {
                name: document.getElementById('name').value.trim(),
                gender: document.getElementById('gender').value,
                birthDate: birthDate,
                birthTime: document.getElementById('birthTime').value
            };
            break;

        case 'astrology':
            question = document.getElementById('astrologyQuestion').value.trim();
            if (!question) {
                alert('請先輸入您的問題！');
                return;
            }
            const astrologyBirthDate = document.getElementById('astrologyBirthDate').value;
            if (!astrologyBirthDate) {
                alert('請輸入出生日期！');
                return;
            }
            data = {
                birthDate: astrologyBirthDate,
                birthPlace: document.getElementById('birthPlace').value.trim()
            };
            break;

        case 'yijing':
        case 'migu':
        case 'qiuqian':
            question = document.getElementById('yijingQuestion').value.trim();
            if (!question) {
                alert('請先輸入您的問題！');
                return;
            }
            // 隨機生成卦象或籤詩
            const guaData = generateGua(currentDivinationType);
            data = guaData;
            break;
    }

    // 禁用按鈕並顯示載入
    divineBtn.disabled = true;
    loading.classList.remove('hidden');
    resultSection.classList.add('hidden');

    try {
        const result = await getDivinationResult(currentDivinationType, question, data, apiKey);
        displayDivinationResult(currentDivinationType, question, data, result);
    } catch (error) {
        console.error('解讀錯誤:', error);
        alert('解讀失敗：' + error.message);
    } finally {
        loading.classList.add('hidden');
        divineBtn.disabled = false;
    }
}

// 獲取占卜結果
async function getDivinationResult(type, question, data, apiKey) {
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
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'API 請求失敗');
    }

    return await response.json();
}

// 顯示占卜結果
function displayDivinationResult(type, question, data, result) {
    const resultSection = document.getElementById('resultSection');
    const resultContent = document.getElementById('resultContent');

    let html = '';

    // 顯示問題
    html += `<div class="result-question"><strong>您的問題：</strong>${question}</div>`;

    // 顯示數據（如抽到的牌、出生資訊等）
    if (type === 'tarot' && data.cards) {
        html += '<div class="result-data">';
        data.cards.forEach(card => {
            html += `<div class="card-info">${card.position || '抽到的牌'}：${card.name} ${card.emoji}</div>`;
        });
        html += '</div>';
    } else if ((type === 'bazi' || type === 'ziwei') && data.birthDate) {
        html += `<div class="result-data">出生資訊：${data.birthDate} ${data.birthTime || ''}</div>`;
    } else if (type === 'astrology' && data.birthDate) {
        html += `<div class="result-data">出生資訊：${data.birthDate} ${data.birthPlace || ''}</div>`;
    } else if (data.gua) {
        html += `<div class="result-data">${data.guaName}：${data.gua}</div>`;
    }

    // 顯示解讀結果
    const resultData = result.result || {};
    
    if (resultData.opening) {
        html += `<div class="opening">${resultData.opening}</div>`;
    }

    if (resultData.summary) {
        html += `<div class="summary">${resultData.summary}</div>`;
    }

    if (resultData.analysis) {
        html += `<div class="analysis">${resultData.analysis}</div>`;
    }

    if (resultData.advice && resultData.advice.length > 0) {
        html += '<div class="advice-section"><h3>💡 建議指引</h3><ul class="advice-list">';
        resultData.advice.forEach(advice => {
            html += `<li>${advice}</li>`;
        });
        html += '</ul></div>';
    }

    if (resultData.lucky_color || resultData.lucky_direction || resultData.lucky_item) {
        html += '<div class="lucky-section">';
        if (resultData.lucky_color) {
            html += `<div class="lucky-item"><strong>幸運色</strong><span>${resultData.lucky_color}</span></div>`;
        }
        if (resultData.lucky_direction) {
            html += `<div class="lucky-item"><strong>幸運方位</strong><span>${resultData.lucky_direction}</span></div>`;
        }
        if (resultData.lucky_item) {
            html += `<div class="lucky-item"><strong>幸運小物</strong><span>${resultData.lucky_item}</span></div>`;
        }
        html += '</div>';
    }

    if (resultData.score) {
        html += `<div class="score">運勢評分：${resultData.score} / 100</div>`;
    }

    resultContent.innerHTML = html;
    resultSection.classList.remove('hidden');

    // 保存到歷史記錄
    saveToHistory({
        type: type,
        question: question,
        data: data,
        result: result,
        timestamp: new Date().toISOString()
    });
}

// 生成卦象或籤詩
function generateGua(type) {
    const yijingGua = [
        { name: '乾', gua: '乾為天', meaning: '天行健，君子以自強不息' },
        { name: '坤', gua: '坤為地', meaning: '地勢坤，君子以厚德載物' },
        { name: '屯', gua: '水雷屯', meaning: '剛柔始交而難生' },
        { name: '蒙', gua: '山水蒙', meaning: '山下出泉，蒙' },
        { name: '需', gua: '水天需', meaning: '雲上於天，需' }
    ];

    const qian = [
        { number: 1, text: '上上籤', meaning: '大吉大利，萬事順遂' },
        { number: 2, text: '上籤', meaning: '吉，凡事順利' },
        { number: 3, text: '中上籤', meaning: '平順，略有波折' },
        { number: 4, text: '中籤', meaning: '平平，需謹慎' },
        { number: 5, text: '中下籤', meaning: '小凶，需注意' }
    ];

    if (type === 'yijing' || type === 'migu') {
        const randomGua = yijingGua[Math.floor(Math.random() * yijingGua.length)];
        return {
            gua: randomGua.gua,
            guaName: type === 'yijing' ? '卦象' : '米卦',
            meaning: randomGua.meaning
        };
    } else if (type === 'qiuqian') {
        const randomQian = qian[Math.floor(Math.random() * qian.length)];
        return {
            gua: `第${randomQian.number}籤 - ${randomQian.text}`,
            guaName: '籤詩',
            meaning: randomQian.meaning
        };
    }
}

// 歷史記錄功能
function saveToHistory(record) {
    let history = JSON.parse(localStorage.getItem('divination_history') || '[]');
    history.unshift(record);
    // 只保留最近 50 條記錄
    if (history.length > 50) {
        history = history.slice(0, 50);
    }
    localStorage.setItem('divination_history', JSON.stringify(history));
}

function openHistoryModal() {
    const modal = document.getElementById('historyModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        loadHistory();
    }
}

function closeHistoryModalFunc() {
    const modal = document.getElementById('historyModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function loadHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;

    const history = JSON.parse(localStorage.getItem('divination_history') || '[]');
    
    if (history.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #888; padding: 20px;">暫無歷史記錄</p>';
        return;
    }

    historyList.innerHTML = history.map((record, index) => {
        const date = new Date(record.timestamp);
        const typeNames = {
            'tarot': '塔羅牌',
            'bazi': '八字',
            'ziwei': '紫微斗數',
            'astrology': '西方占星',
            'yijing': '周易',
            'migu': '米卦',
            'qiuqian': '求籤'
        };
        return `
            <div class="history-item" onclick="loadHistoryItem(${index})">
                <div class="history-type">${typeNames[record.type] || record.type}</div>
                <div class="history-question">${record.question}</div>
                <div class="history-date">${date.toLocaleString('zh-TW')}</div>
            </div>
        `;
    }).join('');
}

function loadHistoryItem(index) {
    const history = JSON.parse(localStorage.getItem('divination_history') || '[]');
    if (history[index]) {
        const record = history[index];
        currentDivinationType = record.type;
        switchDivinationType(record.type);
        displayDivinationResult(record.type, record.question, record.data, record.result);
        closeHistoryModalFunc();
    }
}

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

