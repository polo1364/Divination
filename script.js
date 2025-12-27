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

// Fisher-Yates Shuffle 演算法（正確的洗牌方法）
function fisherYatesShuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 隨機抽牌（使用 Fisher-Yates Shuffle + 正逆位判定）
function drawRandomCards(count) {
    // 使用 Fisher-Yates Shuffle 洗牌
    const shuffled = fisherYatesShuffle(tarotCards);
    
    // 抽後不放回，並判定正逆位
    const selected = shuffled.slice(0, count).map(card => {
        const isUpright = Math.random() > 0.5;
        return {
            ...card,
            orientation: isUpright ? '正位' : '逆位',
            displayName: `${card.name}(${isUpright ? '正位' : '逆位'})`
        };
    });
    
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
                        name: document.getElementById('name').value.trim(),
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
                        name: document.getElementById('name').value.trim(),
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
            const birthPlace = document.getElementById('birthPlace').value.trim();
            if (!birthPlace) {
                alert('請輸入出生地點！');
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
            const cardName = card.displayName || card.name;
            html += `<div class="card-info">${card.position || '抽到的牌'}：${cardName} ${card.emoji} ${card.orientation ? `(${card.orientation})` : ''}</div>`;
        });
        html += '</div>';
    } else if ((type === 'bazi' || type === 'ziwei') && data.birthDate) {
        html += `<div class="result-data">`;
        html += `<div>出生資訊：${data.birthDate} ${data.birthTime || ''}</div>`;
        if (data.calculation) {
            if (type === 'bazi' && data.calculation.fullBazi) {
                html += `<div class="bazi-result"><strong>四柱八字：</strong>${data.calculation.fullBazi}</div>`;
                html += `<div>年柱：${data.calculation.yearPillar} | 月柱：${data.calculation.monthPillar} | 日柱：${data.calculation.dayPillar} | 時柱：${data.calculation.hourPillar}</div>`;
                if (data.calculation.lunarDate) {
                    html += `<div>農曆：${data.calculation.lunarDate}</div>`;
                }
                if (data.calculation.jieQi) {
                    html += `<div>節氣：${data.calculation.jieQi}</div>`;
                }
            } else if (type === 'ziwei' && data.calculation.mingGong) {
                html += `<div class="ziwei-result"><strong>${data.calculation.mingGong}</strong></div>`;
                if (data.calculation.wuXingJu) {
                    html += `<div>五行局：${data.calculation.wuXingJu}</div>`;
                }
                if (data.calculation.ziweiPosition) {
                    html += `<div>${data.calculation.ziweiPosition}</div>`;
                }
                if (data.calculation.mainStars) {
                    html += `<div>主星配置：</div>`;
                    if (typeof data.calculation.mainStars === 'object') {
                        Object.values(data.calculation.mainStars).forEach(star => {
                            html += `<div>${star}</div>`;
                        });
                    }
                }
                if (data.calculation.lunarDate) {
                    html += `<div>農曆：${data.calculation.lunarDate}</div>`;
                }
            }
        }
        html += `</div>`;
    } else if (type === 'astrology' && data.birthDate) {
        html += `<div class="result-data">`;
        html += `<div>出生資訊：${data.birthDate} ${data.birthPlace || ''}</div>`;
        if (data.calculation) {
            if (data.calculation.sunSign) {
                html += `<div class="astrology-result"><strong>太陽星座：</strong>${data.calculation.sunSign}`;
                if (data.calculation.planets && data.calculation.planets.sun) {
                    html += ` ${data.calculation.planets.sun.degree}°`;
                }
                html += `</div>`;
            }
            if (data.calculation.moonSign) {
                html += `<div><strong>月亮星座：</strong>${data.calculation.moonSign}`;
                if (data.calculation.planets && data.calculation.planets.moon) {
                    html += ` ${data.calculation.planets.moon.degree}°`;
                }
                html += `</div>`;
            }
            if (data.calculation.risingSign) {
                html += `<div><strong>上升星座：</strong>${data.calculation.risingSign}</div>`;
            }
            if (data.calculation.planets) {
                html += `<div class="planets-section"><strong>行星位置：</strong></div>`;
                const planetNames = {
                    mercury: '水星',
                    venus: '金星',
                    mars: '火星',
                    jupiter: '木星',
                    saturn: '土星'
                };
                Object.entries(data.calculation.planets).forEach(([key, planet]) => {
                    if (key !== 'sun' && key !== 'moon' && planetNames[key]) {
                        html += `<div>${planetNames[key]}：${planet.sign} ${planet.degree}°</div>`;
                    }
                });
            }
        }
        html += `</div>`;
    } else if (data.gua) {
        html += `<div class="result-data">`;
        html += `<div><strong>${data.guaName || '卦象/籤詩'}：</strong>${data.gua}</div>`;
        if (data.benGua && data.bianGua) {
            html += `<div>本卦：${data.benGua}</div>`;
            html += `<div>變爻：${data.changingLines ? data.changingLines.join('、') : '無'}</div>`;
            html += `<div>之卦：${data.bianGua}</div>`;
        }
        if (data.number) {
            html += `<div>籤號：第${data.number}籤</div>`;
        }
        html += `</div>`;
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

