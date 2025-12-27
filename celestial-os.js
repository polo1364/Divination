// 天機 Celestial OS - 主控制器
// 負責三個神殿的導航和整合邏輯

class CelestialOS {
    constructor() {
        this.currentTemple = null;
        this.init();
    }

    init() {
        this.checkProfile();
        this.setupTempleNavigation();
        this.setupProfileForm();
    }

    // 檢查使用者檔案
    checkProfile() {
        if (!userProfile.isProfileComplete()) {
            // 顯示檔案設置界面
            document.getElementById('profileSetup').classList.remove('hidden');
            document.getElementById('templeNavigation').classList.add('hidden');
        } else {
            // 顯示神殿導航
            document.getElementById('profileSetup').classList.add('hidden');
            document.getElementById('templeNavigation').classList.remove('hidden');
            this.showProfileStatus();
        }
    }

    // 設置神殿導航
    setupTempleNavigation() {
        const templeCards = document.querySelectorAll('.temple-card');
        templeCards.forEach(card => {
            card.addEventListener('click', () => {
                const temple = card.dataset.temple;
                this.enterTemple(temple);
            });
        });
    }

    // 進入神殿
    enterTemple(temple) {
        this.currentTemple = temple;
        
        // 隱藏神殿導航
        document.getElementById('templeNavigation').classList.add('hidden');
        
        // 根據神殿類型顯示對應內容
        switch(temple) {
            case 'destiny':
                this.showDestinyTemple();
                break;
            case 'divination':
                this.showDivinationTemple();
                break;
            case 'subconscious':
                this.showSubconsciousTemple();
                break;
        }
    }

    // 顯示天命殿（Dashboard 風格）
    showDestinyTemple() {
        // 首先檢查使用者檔案是否完整
        if (!userProfile.isProfileComplete()) {
            // 檔案不完整，提示用戶先設置
            this.showError('請先完成使用者檔案設置');
            // 顯示檔案設置界面
            document.getElementById('profileSetup').classList.remove('hidden');
            document.getElementById('templeNavigation').classList.remove('hidden');
            // 返回神殿導航
            this.backToTemples();
            return;
        }

        // 檢查是否已計算命盤
        const hasCalculated = userProfile.calculatedData.bazi || 
                             userProfile.calculatedData.ziwei || 
                             userProfile.calculatedData.astrology;

        if (!hasCalculated) {
            // 顯示計算中狀態
            this.showCalculatingState();
            // 開始計算
            this.calculateAllDestinyData();
        } else {
            // 顯示已計算的命盤
            this.displayDestinyDashboard();
        }
    }

    // 計算所有天命殿資料
    async calculateAllDestinyData() {
        // 再次檢查檔案完整性（雙重保險）
        if (!userProfile.isProfileComplete()) {
            this.showError('使用者檔案不完整，請先完成檔案設置');
            setTimeout(() => {
                this.backToTemples();
                document.getElementById('profileSetup').classList.remove('hidden');
            }, 1500);
            return;
        }

        try {
            const results = await dataCenter.calculateAll(userProfile);
            this.displayDestinyDashboard();
        } catch (error) {
            console.error('計算命盤失敗:', error);
            const errorMsg = error.message || '計算命盤失敗，請稍後再試';
            this.showError(errorMsg);
            
            // 如果是檔案不完整錯誤，顯示設置界面
            if (errorMsg.includes('檔案不完整') || errorMsg.includes('使用者檔案不完整')) {
                setTimeout(() => {
                    this.backToTemples();
                    document.getElementById('profileSetup').classList.remove('hidden');
                }, 1500);
            }
        }
    }

    // 顯示天命殿儀表板
    displayDestinyDashboard() {
        const container = document.getElementById('formContainer');
        container.innerHTML = `
            <div class="destiny-dashboard">
                <div class="dashboard-header">
                    <button class="back-btn" onclick="celestialOS.backToTemples()">← 返回神殿</button>
                    <h2>🏰 天命殿 - 你的命理儀表板</h2>
                </div>
                
                <div class="dashboard-grid">
                    <div class="dashboard-card" data-type="bazi">
                        <div class="card-icon">📅</div>
                        <h3>八字命盤</h3>
                        <p class="card-status" id="baziStatus">${userProfile.calculatedData.bazi ? '✓ 已計算' : '未計算'}</p>
                        <button class="card-action-btn" onclick="celestialOS.viewDetail('bazi')">查看詳情</button>
                    </div>
                    
                    <div class="dashboard-card" data-type="ziwei">
                        <div class="card-icon">⭐</div>
                        <h3>紫微斗數</h3>
                        <p class="card-status" id="ziweiStatus">${userProfile.calculatedData.ziwei ? '✓ 已計算' : '未計算'}</p>
                        <button class="card-action-btn" onclick="celestialOS.viewDetail('ziwei')">查看詳情</button>
                    </div>
                    
                    <div class="dashboard-card" data-type="astrology">
                        <div class="card-icon">🌙</div>
                        <h3>西方占星</h3>
                        <p class="card-status" id="astrologyStatus">${userProfile.calculatedData.astrology ? '✓ 已計算' : '未計算'}</p>
                        <button class="card-action-btn" onclick="celestialOS.viewDetail('astrology')">查看詳情</button>
                    </div>
                </div>
                
                <div class="dashboard-actions">
                    <button class="btn-primary" onclick="celestialOS.showMasterConsultant()">🤖 AI 總顧問綜合分析</button>
                    <button class="btn-secondary" onclick="celestialOS.showDailyReport()">📊 今日運勢日報</button>
                </div>
            </div>
        `;
    }

    // 顯示靈犀殿（對話風格）
    showDivinationTemple() {
        const container = document.getElementById('formContainer');
        container.innerHTML = `
            <div class="divination-temple">
                <div class="temple-header">
                    <button class="back-btn" onclick="celestialOS.backToTemples()">← 返回神殿</button>
                    <h2>🔮 靈犀殿 - 當下問題指引</h2>
                </div>
                
                <div class="chat-interface">
                    <div class="chat-messages" id="chatMessages">
                        <div class="message bot-message">
                            <p>歡迎來到靈犀殿！請告訴我你想詢問的問題，我會為你選擇最適合的占卜方式。</p>
                        </div>
                    </div>
                    
                    <div class="chat-input-area">
                        <input type="text" id="questionInput" placeholder="輸入你的問題..." class="chat-input">
                        <button onclick="celestialOS.sendQuestion()" class="chat-send-btn">發送</button>
                    </div>
                    
                    <div class="divination-options hidden" id="divinationOptions">
                        <p>你想使用哪種方式來探索這個問題？</p>
                        <div class="option-buttons">
                            <button class="option-btn" data-type="tarot" onclick="celestialOS.selectDivinationType('tarot')">🃏 塔羅牌</button>
                            <button class="option-btn" data-type="yijing" onclick="celestialOS.selectDivinationType('yijing')">☯️ 周易</button>
                            <button class="option-btn" data-type="migu" onclick="celestialOS.selectDivinationType('migu')">🌾 米卦</button>
                            <button class="option-btn" data-type="qiuqian" onclick="celestialOS.selectDivinationType('qiuqian')">🎋 求籤</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 顯示潛意識殿（筆記風格）
    showSubconsciousTemple() {
        const container = document.getElementById('formContainer');
        container.innerHTML = `
            <div class="subconscious-temple">
                <div class="temple-header">
                    <button class="back-btn" onclick="celestialOS.backToTemples()">← 返回神殿</button>
                    <h2>🌌 潛意識殿 - 探索內心世界</h2>
                </div>
                
                <div class="subconscious-tabs">
                    <button class="tab-btn active" data-tab="dream">🛌 解夢</button>
                    <button class="tab-btn" data-tab="meditation">🧘 視覺冥想</button>
                    <button class="tab-btn" data-tab="calligraphy">✍️ 測字</button>
                </div>
                
                <div class="subconscious-content">
                    <div id="dreamTab" class="tab-content active">
                        <div class="tab-instruction">
                            <p>記錄你的夢境，AI 將為你進行深度心理分析</p>
                        </div>
                        <textarea id="dreamText" class="dream-textarea" placeholder="請詳細描述你的夢境，包括夢中的場景、人物、情緒等..."></textarea>
                        <button class="btn-primary" onclick="celestialOS.analyzeDream()">🔮 AI 解夢分析</button>
                    </div>
                    
                    <div id="meditationTab" class="tab-content hidden">
                        <div class="meditation-content">
                            <h3>🧘 視覺冥想</h3>
                            <p>功能開發中，未來將支持塔羅牌視覺化生成...</p>
                            <div class="meditation-placeholder">
                                <div class="placeholder-icon">🎨</div>
                                <p>即將推出</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="calligraphyTab" class="tab-content hidden">
                        <div class="tab-instruction">
                            <p>輸入一個字，AI 將為你進行測字分析</p>
                        </div>
                        <div class="calligraphy-input-area">
                            <input type="text" id="calligraphyText" placeholder="輸入一個字" maxlength="1" 
                                   style="font-size: 3em; text-align: center; width: 200px; padding: 20px; margin: 20px auto; display: block; background: rgba(255,255,255,0.1); border: 2px solid rgba(138,43,226,0.5); border-radius: 10px; color: #ffffff;">
                            <button class="btn-primary" onclick="celestialOS.analyzeCalligraphy()">✍️ 測字分析</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 設置標籤切換（在 DOM 更新後）
        setTimeout(() => {
            this.setupSubconsciousTabs();
        }, 100);
    }

    // 設置潛意識殿標籤切換
    setupSubconsciousTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                // 移除所有活動狀態
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => {
                    c.classList.add('hidden');
                    c.classList.remove('active');
                });
                // 設置當前活動標籤
                btn.classList.add('active');
                const tabElement = document.getElementById(tab + 'Tab');
                if (tabElement) {
                    tabElement.classList.remove('hidden');
                    tabElement.classList.add('active');
                }
            });
        });
    }

    // 返回神殿導航
    backToTemples() {
        document.getElementById('formContainer').innerHTML = '';
        document.getElementById('templeNavigation').classList.remove('hidden');
        this.currentTemple = null;
    }

    // 設置使用者檔案表單
    setupProfileForm() {
        const form = document.getElementById('profileForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.saveProfile();
            });
        }
    }

    // 保存使用者檔案
    async saveProfile() {
        const formData = {
            birthYear: parseInt(document.getElementById('birthYear').value),
            birthMonth: parseInt(document.getElementById('birthMonth').value),
            birthDay: parseInt(document.getElementById('birthDay').value),
            birthHour: parseInt(document.getElementById('birthHour').value),
            birthMinute: parseInt(document.getElementById('birthMinute').value),
            birthPlace: document.getElementById('birthPlace').value.trim(),
            gender: document.getElementById('gender').value
        };

        try {
            userProfile.setBasicInfo(formData);
            
            // 顯示計算中狀態
            this.showCalculatingState();
            
            // 計算所有命理資料
            await dataCenter.calculateAll(userProfile);
            
            // 隱藏設置界面，顯示神殿
            document.getElementById('profileSetup').classList.add('hidden');
            document.getElementById('templeNavigation').classList.remove('hidden');
            
            this.showSuccess('檔案建立成功！命盤已計算完成');
        } catch (error) {
            this.showError('建立檔案失敗：' + error.message);
        }
    }

    // 顯示計算中狀態
    showCalculatingState() {
        const container = document.getElementById('formContainer');
        if (container) {
            container.innerHTML = `
                <div class="calculating-state" style="text-align: center; padding: 60px 20px;">
                    <div class="spinner" style="width: 60px; height: 60px; margin: 0 auto 20px;"></div>
                    <h2 style="color: #ffd700; margin-bottom: 10px;">正在計算你的命盤...</h2>
                    <p style="color: #d0d0d0;">這可能需要幾秒鐘時間，請稍候</p>
                </div>
            `;
        }
    }

    // 顯示成功訊息
    showSuccess(message) {
        // 使用現有的 showError 函數，但改為 success 類型
        if (typeof showError === 'function') {
            showError(message, 'success');
        }
    }

    // 顯示錯誤訊息
    showError(message) {
        if (typeof showError === 'function') {
            showError(message, 'error');
        }
    }

    // 查看詳情
    async viewDetail(type) {
        const calculatedData = userProfile.getCalculatedData(type);
        if (!calculatedData) {
            this.showError('該命盤尚未計算，請先計算命盤');
            return;
        }

        // 獲取使用者檔案資訊
        const profile = userProfile.profile;
        const question = '請為我詳細解讀我的命盤';

        // 構建資料
        let data = {
            birthDate: `${profile.birthYear}-${String(profile.birthMonth).padStart(2, '0')}-${String(profile.birthDay).padStart(2, '0'))}`,
            birthTime: `${String(profile.birthHour).padStart(2, '0')}:${String(profile.birthMinute).padStart(2, '0')}`,
            calculation: calculatedData
        };

        if (type === 'astrology') {
            data.birthPlace = profile.birthPlace;
        } else {
            data.name = profile.name || '';
            data.gender = profile.gender;
        }

        // 顯示載入
        const container = document.getElementById('formContainer');
        container.innerHTML = `
            <div class="detail-loading">
                <div class="spinner"></div>
                <p>AI 正在解讀你的命盤...</p>
            </div>
        `;

        try {
            const apiKey = getApiKey();
            if (!apiKey) {
                this.showError('請先設置 API 金鑰');
                setTimeout(() => openModal(), 500);
                return;
            }

            // 調用 AI 解讀
            const result = await getDivinationResult(type, question, data, apiKey);
            
            // 顯示結果
            this.displayDetailResult(type, question, data, result);
        } catch (error) {
            console.error('解讀失敗:', error);
            this.showError('解讀失敗：' + error.message);
        }
    }

    // 顯示詳情結果
    displayDetailResult(type, question, data, result) {
        const container = document.getElementById('formContainer');
        
        // 使用現有的 displayDivinationResult 函數
        if (typeof displayDivinationResult === 'function') {
            // 確保結果區域存在
            let resultSection = document.getElementById('resultSection');
            if (!resultSection) {
                // 創建結果區域
                const main = document.querySelector('main');
                resultSection = document.createElement('div');
                resultSection.id = 'resultSection';
                resultSection.className = 'result-section';
                resultSection.innerHTML = '<div id="resultContent" class="result-content"></div>';
                main.appendChild(resultSection);
            }
            
            displayDivinationResult(type, question, data, result);
            
            // 添加返回按鈕
            const resultContent = document.getElementById('resultContent');
            if (resultContent) {
                resultContent.insertAdjacentHTML('afterbegin', `
                    <div style="margin-bottom: 20px;">
                        <button class="back-btn" onclick="celestialOS.backToDestinyDashboard()">← 返回儀表板</button>
                    </div>
                `);
            }
        } else {
            // 備用顯示方式
            container.innerHTML = `
                <div class="detail-result">
                    <button class="back-btn" onclick="celestialOS.backToDestinyDashboard()">← 返回儀表板</button>
                    <h2>${type === 'bazi' ? '八字' : type === 'ziwei' ? '紫微斗數' : '西方占星'}命盤詳情</h2>
                    <pre>${JSON.stringify(result, null, 2)}</pre>
                </div>
            `;
        }
    }

    // 返回天命殿儀表板
    backToDestinyDashboard() {
        this.displayDestinyDashboard();
    }

    // 發送問題（靈犀殿）
    sendQuestion() {
        const input = document.getElementById('questionInput');
        const question = input.value.trim();
        if (!question) return;

        // 保存當前問題
        this.currentQuestion = question;

        // 顯示使用者的問題
        const messages = document.getElementById('chatMessages');
        messages.innerHTML += `
            <div class="message user-message">
                <p>${question}</p>
            </div>
        `;

        // 顯示 AI 回應
        messages.innerHTML += `
            <div class="message bot-message">
                <p>我理解了你的問題。請選擇一種占卜方式來探索答案：</p>
            </div>
        `;

        // 顯示占卜選項
        document.getElementById('divinationOptions').classList.remove('hidden');
        input.value = '';
        
        // 滾動到底部
        messages.scrollTop = messages.scrollHeight;
    }

    // 選擇占卜類型（靈犀殿）
    selectDivinationType(type) {
        const messages = document.getElementById('chatMessages');
        const typeNames = {
            'tarot': '塔羅牌',
            'yijing': '周易',
            'migu': '米卦',
            'qiuqian': '求籤'
        };

        // 顯示選擇的占卜方式
        messages.innerHTML += `
            <div class="message user-message">
                <p>我選擇：${typeNames[type]}</p>
            </div>
        `;

        messages.innerHTML += `
            <div class="message bot-message">
                <p>好的，讓我們開始 ${typeNames[type]} 占卜...</p>
            </div>
        `;

        // 隱藏選項
        document.getElementById('divinationOptions').classList.add('hidden');

        // 執行占卜
        this.executeDivination(type, this.currentQuestion);
    }

    // 執行占卜（靈犀殿）
    async executeDivination(type, question) {
        const messages = document.getElementById('chatMessages');
        
        // 顯示進行中訊息
        messages.innerHTML += `
            <div class="message bot-message">
                <div class="divination-progress">
                    <div class="spinner-small"></div>
                    <p>正在進行 ${type === 'tarot' ? '塔羅牌' : type === 'yijing' ? '周易' : type === 'migu' ? '米卦' : '求籤'} 占卜...</p>
                </div>
            </div>
        `;
        messages.scrollTop = messages.scrollHeight;

        try {
            const apiKey = getApiKey();
            if (!apiKey) {
                this.showError('請先設置 API 金鑰');
                return;
            }

            // 生成占卜資料
            let data = {};
            if (type === 'tarot') {
                const numCards = 3; // 靈犀殿使用三張牌
                drawnCards = drawRandomCards(numCards);
                data = { cards: drawnCards, spread: 'three' };
            } else {
                const guaData = generateGua(type);
                data = guaData;
            }

            // 調用 AI 解讀
            const result = await getDivinationResult(type, question, data, apiKey);
            
            // 顯示結果
            this.displayDivinationInChat(type, question, data, result);
        } catch (error) {
            console.error('占卜失敗:', error);
            messages.innerHTML += `
                <div class="message bot-message error">
                    <p>占卜失敗：${error.message}</p>
                </div>
            `;
            messages.scrollTop = messages.scrollHeight;
        }
    }

    // 在聊天中顯示占卜結果
    displayDivinationInChat(type, question, data, result) {
        const messages = document.getElementById('chatMessages');
        const resultData = result.result || result;

        // 移除進度訊息
        const progressMsg = messages.querySelector('.divination-progress');
        if (progressMsg) {
            progressMsg.parentElement.remove();
        }

        // 顯示結果
        let resultHtml = `
            <div class="message bot-message result-message">
                <div class="chat-result">
        `;

        // 顯示占卜資料（如塔羅牌）
        if (type === 'tarot' && data.cards) {
            resultHtml += `
                <div class="chat-tarot-cards">
                    ${data.cards.map(card => `
                        <div class="chat-card-mini">
                            <div class="card-emoji">${card.emoji}</div>
                            <div class="card-name">${card.displayName || card.name}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // 顯示 AI 解讀
        resultHtml += `
                    <div class="chat-interpretation">
                        <h4>🔮 解讀</h4>
                        <p>${resultData.opening || resultData.analysis || '解讀結果'}</p>
                    </div>
        `;

        if (resultData.advice && resultData.advice.length > 0) {
            resultHtml += `
                    <div class="chat-advice">
                        <h4>💡 建議</h4>
                        <ul>
                            ${resultData.advice.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    </div>
            `;
        }

        resultHtml += `
                </div>
            </div>
        `;

        messages.innerHTML += resultHtml;
        messages.scrollTop = messages.scrollHeight;

        // 添加繼續提問按鈕
        setTimeout(() => {
            messages.innerHTML += `
                <div class="message bot-message">
                    <p>還有其他問題嗎？請繼續提問。</p>
                </div>
            `;
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
    }

    // 顯示 AI 總顧問（交叉驗證系統）
    async showMasterConsultant() {
        if (!userProfile.isProfileComplete()) {
            this.showError('請先完成使用者檔案設置');
            return;
        }

        const container = document.getElementById('formContainer');
        container.innerHTML = `
            <div class="master-consultant">
                <div class="consultant-header">
                    <button class="back-btn" onclick="celestialOS.backToDestinyDashboard()">← 返回儀表板</button>
                    <h2>🤖 AI 總顧問 - 綜合命理分析</h2>
                    <p class="consultant-subtitle">整合八字、紫微、占星、塔羅的交叉驗證分析</p>
                </div>
                
                <div class="consultant-input">
                    <label>請輸入你想詢問的問題：</label>
                    <textarea id="consultantQuestion" class="consultant-textarea" placeholder="例如：我今年創業會成功嗎？"></textarea>
                    <button class="btn-primary" onclick="celestialOS.consultMaster()">開始綜合分析</button>
                </div>
                
                <div id="consultantResult" class="consultant-result hidden"></div>
            </div>
        `;
    }

    // 執行總顧問分析
    async consultMaster() {
        const question = document.getElementById('consultantQuestion').value.trim();
        if (!question) {
            this.showError('請輸入你的問題');
            return;
        }

        const resultDiv = document.getElementById('consultantResult');
        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = `
            <div class="consultant-loading">
                <div class="spinner"></div>
                <p>AI 總顧問正在綜合分析中...</p>
            </div>
        `;

        try {
            const apiKey = getApiKey();
            if (!apiKey) {
                this.showError('請先設置 API 金鑰');
                return;
            }

            // 收集所有命理資料
            const baziData = userProfile.getCalculatedData('bazi');
            const ziweiData = userProfile.getCalculatedData('ziwei');
            const astrologyData = userProfile.getCalculatedData('astrology');

            // 如果沒有計算資料，先計算
            if (!baziData || !ziweiData || !astrologyData) {
                resultDiv.innerHTML = '<p>正在計算命盤資料...</p>';
                await dataCenter.calculateAll(userProfile);
            }

            // 為問題抽取一張塔羅牌（增加隨機性）
            const numCards = 1;
            const tarotCard = drawRandomCards(numCards)[0];
            
            // 構建綜合分析資料
            const comprehensiveData = {
                question: question,
                bazi: userProfile.getCalculatedData('bazi'),
                ziwei: userProfile.getCalculatedData('ziwei'),
                astrology: userProfile.getCalculatedData('astrology'),
                tarot: {
                    card: tarotCard,
                    meaning: tarotCard.meaning
                },
                profile: userProfile.getProfileSummary()
            };

            // 調用 AI 總顧問 API
            const result = await this.callMasterConsultant(question, comprehensiveData, apiKey);
            
            // 顯示結果
            this.displayConsultantResult(result, tarotCard);
        } catch (error) {
            console.error('總顧問分析失敗:', error);
            resultDiv.innerHTML = `<div class="error-message">分析失敗：${error.message}</div>`;
        }
    }

    // 調用總顧問 API
    async callMasterConsultant(question, data, apiKey) {
        const response = await fetch('/api/divination', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'master_consultant',
                question: question,
                data: data,
                apiKey: apiKey,
                history: getRecentHistory(5)
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'API 請求失敗');
        }

        return await response.json();
    }

    // 顯示總顧問結果
    displayConsultantResult(result, tarotCard) {
        const resultDiv = document.getElementById('consultantResult');
        const resultData = result.result || result;

        resultDiv.innerHTML = `
            <div class="consultant-analysis">
                <div class="analysis-section">
                    <h3>🎴 塔羅指引</h3>
                    <div class="tarot-card-mini">
                        <div class="card-emoji">${tarotCard.emoji}</div>
                        <div class="card-name">${tarotCard.displayName || tarotCard.name}</div>
                    </div>
                </div>
                
                <div class="analysis-section">
                    <h3>📊 綜合分析</h3>
                    <div class="analysis-content">
                        ${resultData.analysis || resultData.opening || '分析結果載入中...'}
                    </div>
                </div>
                
                <div class="analysis-section">
                    <h3>💡 建議</h3>
                    <ul class="advice-list">
                        ${(resultData.advice || []).map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
                
                ${resultData.summary ? `
                    <div class="analysis-summary">
                        <h3>✨ 總結</h3>
                        <p>${resultData.summary}</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // 顯示今日運勢日報
    async showDailyReport() {
        if (!userProfile.isProfileComplete()) {
            this.showError('請先完成使用者檔案設置');
            return;
        }

        const container = document.getElementById('formContainer');
        container.innerHTML = `
            <div class="daily-report">
                <div class="report-header">
                    <button class="back-btn" onclick="celestialOS.backToDestinyDashboard()">← 返回儀表板</button>
                    <h2>📊 今日運勢日報</h2>
                    <p class="report-date">${new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
                </div>
                
                <div id="dailyReportContent" class="report-content">
                    <div class="report-loading">
                        <div class="spinner"></div>
                        <p>正在生成你的專屬運勢日報...</p>
                    </div>
                </div>
            </div>
        `;

        try {
            await this.generateDailyReport();
        } catch (error) {
            console.error('生成日報失敗:', error);
            this.showError('生成日報失敗：' + error.message);
        }
    }

    // 生成每日運勢日報
    async generateDailyReport() {
        const apiKey = getApiKey();
        if (!apiKey) {
            this.showError('請先設置 API 金鑰');
            return;
        }

        // 確保命盤已計算
        if (!userProfile.calculatedData.bazi || !userProfile.calculatedData.ziwei) {
            const content = document.getElementById('dailyReportContent');
            content.innerHTML = '<p>正在計算命盤...</p>';
            await dataCenter.calculateAll(userProfile);
        }

        const question = '請為我生成今日的運勢日報，包括整體運勢、愛情、事業、財運、健康等方面的建議';
        
        const data = {
            type: 'daily_report',
            bazi: userProfile.getCalculatedData('bazi'),
            ziwei: userProfile.getCalculatedData('ziwei'),
            astrology: userProfile.getCalculatedData('astrology'),
            date: new Date().toISOString().split('T')[0]
        };

        try {
            const result = await getDivinationResult('daily_report', question, data, apiKey);
            this.displayDailyReport(result);
        } catch (error) {
            throw error;
        }
    }

    // 顯示每日運勢日報
    displayDailyReport(result) {
        const content = document.getElementById('dailyReportContent');
        const resultData = result.result || result;

        content.innerHTML = `
            <div class="report-sections">
                ${resultData.analysis ? `
                    <div class="report-section">
                        <h3>📈 整體運勢</h3>
                        <p>${resultData.analysis}</p>
                    </div>
                ` : ''}
                
                ${resultData.advice ? `
                    <div class="report-section">
                        <h3>💡 今日建議</h3>
                        <ul class="advice-list">
                            ${resultData.advice.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${resultData.luckyItems || resultData.lucky_color ? `
                    <div class="report-section">
                        <h3>🍀 幸運元素</h3>
                        <div class="lucky-items">
                            ${resultData.luckyItems ? 
                                Object.entries(resultData.luckyItems).map(([key, value]) => 
                                    `<div class="lucky-item"><span class="lucky-label">${key}：</span><span class="lucky-value">${value}</span></div>`
                                ).join('') :
                                `
                                    ${resultData.lucky_color ? `<div class="lucky-item"><span class="lucky-label">幸運色：</span><span class="lucky-value">${resultData.lucky_color}</span></div>` : ''}
                                    ${resultData.lucky_direction ? `<div class="lucky-item"><span class="lucky-label">幸運方位：</span><span class="lucky-value">${resultData.lucky_direction}</span></div>` : ''}
                                    ${resultData.lucky_item ? `<div class="lucky-item"><span class="lucky-label">幸運小物：</span><span class="lucky-value">${resultData.lucky_item}</span></div>` : ''}
                                `
                            }
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // 解夢分析
    analyzeDream() {
        const dreamText = document.getElementById('dreamText').value.trim();
        if (!dreamText) {
            this.showError('請輸入夢境內容');
            return;
        }
        alert('解夢功能開發中...');
    }

    // 測字分析
    analyzeCalligraphy() {
        const text = document.getElementById('calligraphyText').value.trim();
        if (!text) {
            this.showError('請輸入一個字');
            return;
        }
        alert('測字功能開發中...');
    }

    // 顯示檔案狀態
    showProfileStatus() {
        const summary = userProfile.getProfileSummary();
        if (summary) {
            console.log('使用者檔案摘要:', summary);
        }
    }
}

// 初始化天機系統
const celestialOS = new CelestialOS();

