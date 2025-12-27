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

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const spreadButtons = document.querySelectorAll('.spread-btn');
    const drawBtn = document.getElementById('drawBtn');

    // 占卜方式選擇
    spreadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            spreadButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSpread = btn.dataset.spread;
            resetCards();
        });
    });

    // 抽牌按鈕
    drawBtn.addEventListener('click', handleDrawCards);
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
    const drawBtn = document.getElementById('drawBtn');
    const loading = document.getElementById('loading');
    const resultSection = document.getElementById('resultSection');

    if (!question) {
        alert('請先輸入您的問題！');
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
    const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: question,
            cards: cards,
            spread: currentSpread
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

