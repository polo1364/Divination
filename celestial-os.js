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
        try {
            const results = await dataCenter.calculateAll(userProfile);
            this.displayDestinyDashboard();
        } catch (error) {
            console.error('計算命盤失敗:', error);
            this.showError('計算命盤失敗，請稍後再試');
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
                        <p class="card-status" id="ziweiStatus">${userProfile.calculatedData.ziwei ? '✓ 已計算' : ' : '未計算'}</p>
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
                        <textarea id="dreamText" class="dream-textarea" placeholder="記錄你的夢境..."></textarea>
                        <button class="btn-primary" onclick="celestialOS.analyzeDream()">AI 解夢分析</button>
                    </div>
                    
                    <div id="meditationTab" class="tab-content hidden">
                        <p>視覺冥想功能開發中...</p>
                    </div>
                    
                    <div id="calligraphyTab" class="tab-content hidden">
                        <input type="text" id="calligraphyText" placeholder="輸入一個字" maxlength="1">
                        <button class="btn-primary" onclick="celestialOS.analyzeCalligraphy()">測字分析</button>
                    </div>
                </div>
            </div>
        `;
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
        // 可以在這裡顯示載入動畫
        console.log('計算命盤中...');
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
    viewDetail(type) {
        // 切換到傳統模式並顯示對應的占卜類型
        document.getElementById('traditionalMode').classList.remove('hidden');
        if (typeof switchDivinationType === 'function') {
            switchDivinationType(type);
        }
    }

    // 發送問題（靈犀殿）
    sendQuestion() {
        const input = document.getElementById('questionInput');
        const question = input.value.trim();
        if (!question) return;

        // 顯示使用者的問題
        const messages = document.getElementById('chatMessages');
        messages.innerHTML += `
            <div class="message user-message">
                <p>${question}</p>
            </div>
        `;

        // 顯示占卜選項
        document.getElementById('divinationOptions').classList.remove('hidden');
        input.value = '';
    }

    // 選擇占卜類型（靈犀殿）
    selectDivinationType(type) {
        // 切換到傳統模式並執行對應的占卜
        document.getElementById('traditionalMode').classList.remove('hidden');
        if (typeof switchDivinationType === 'function') {
            switchDivinationType(type);
        }
    }

    // 顯示 AI 總顧問
    showMasterConsultant() {
        alert('AI 總顧問功能開發中...');
    }

    // 顯示今日運勢日報
    showDailyReport() {
        alert('今日運勢日報功能開發中...');
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

