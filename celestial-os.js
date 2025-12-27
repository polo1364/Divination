// 天機 Celestial OS - 主控制器
// 負責三個神殿的導航和整合邏輯

class CelestialOS {
    constructor() {
        this.currentTemple = null;
        this.init();
    }

    init() {
        this.checkProfile();
        // 確保 DOM 加載完成後再設置事件監聽器
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupTempleNavigation();
                this.setupProfileForm();
                this.setupHeaderButtons();
            });
        } else {
            // DOM 已經加載完成
            this.setupTempleNavigation();
            this.setupProfileForm();
            this.setupHeaderButtons();
        }
    }

    // 設置頂部按鈕事件
    setupHeaderButtons() {
        // 使用者檔案按鈕
        const profileBtn = document.getElementById('profileBtn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                this.showProfileModal();
            });
        }

        // 歷史記錄按鈕
        const historyBtn = document.getElementById('historyBtn');
        if (historyBtn) {
            historyBtn.addEventListener('click', () => {
                if (typeof openHistoryModal === 'function') {
                    openHistoryModal();
                }
            });
        }

        // 設置按鈕
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                if (typeof openModal === 'function') {
                    openModal();
                }
            });
        }
    }

    // 顯示使用者檔案模態框
    showProfileModal() {
        const container = document.getElementById('celestialContent');
        const profile = userProfile.profile;
        const isComplete = userProfile.isProfileComplete();

        container.innerHTML = `
            <div class="profile-modal-content">
                <div class="profile-modal-header">
                    <h2>👤 使用者檔案</h2>
                    <button class="close-btn" onclick="celestialOS.closeProfileModal()">×</button>
                </div>
                
                <div class="profile-info">
                    ${isComplete ? `
                        <div class="profile-status-badge complete">✓ 檔案完整</div>
                        <div class="profile-details">
                            <div class="detail-item">
                                <span class="detail-label">姓名：</span>
                                <span class="detail-value">${profile.name || '未設置'}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">性別：</span>
                                <span class="detail-value">${profile.gender === 'male' ? '男' : profile.gender === 'female' ? '女' : '未設置'}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">出生日期：</span>
                                <span class="detail-value">${profile.birthYear}年${profile.birthMonth}月${profile.birthDay}日</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">出生時間：</span>
                                <span class="detail-value">${String(profile.birthHour).padStart(2, '0')}:${String(profile.birthMinute).padStart(2, '0')}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">出生地：</span>
                                <span class="detail-value">${profile.birthPlace || '未設置'}</span>
                            </div>
                            
                            <div class="calculated-status">
                                <h3>命盤計算狀態</h3>
                                <div class="status-grid">
                                    <div class="status-item ${userProfile.calculatedData.bazi ? 'calculated' : 'pending'}">
                                        <span class="status-icon">${userProfile.calculatedData.bazi ? '✓' : '○'}</span>
                                        <span class="status-text">八字命盤</span>
                                    </div>
                                    <div class="status-item ${userProfile.calculatedData.ziwei ? 'calculated' : 'pending'}">
                                        <span class="status-icon">${userProfile.calculatedData.ziwei ? '✓' : '○'}</span>
                                        <span class="status-text">紫微斗數</span>
                                    </div>
                                    <div class="status-item ${userProfile.calculatedData.astrology ? 'calculated' : 'pending'}">
                                        <span class="status-icon">${userProfile.calculatedData.astrology ? '✓' : '○'}</span>
                                        <span class="status-text">西方占星</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="profile-actions">
                            <button class="btn-secondary" onclick="celestialOS.editProfile()">✏️ 編輯檔案</button>
                            <button class="btn-secondary" onclick="celestialOS.recalculateDestiny()">🔄 重新計算命盤</button>
                            <button class="btn-secondary" onclick="celestialOS.exportProfile()">📥 導出檔案</button>
                        </div>
                    ` : `
                        <div class="profile-status-badge incomplete">⚠ 檔案不完整</div>
                        <p class="profile-warning">請先完成使用者檔案設置才能使用完整功能</p>
                        <button class="btn-primary" onclick="celestialOS.editProfile()">建立檔案</button>
                    `}
                </div>
            </div>
        `;
    }

    // 關閉檔案模態框
    closeProfileModal() {
        this.backToTemples();
    }

    // 編輯使用者檔案
    editProfile() {
        // 顯示檔案設置界面
        document.getElementById('profileSetup').classList.remove('hidden');
        document.getElementById('templeNavigation').classList.add('hidden');
        const celestialContent = document.getElementById('celestialContent');
        if (celestialContent) {
            celestialContent.innerHTML = '';
        }
        
        // 如果已有檔案，填充表單
        const profile = userProfile.profile;
        if (profile.birthYear) {
            document.getElementById('birthYear').value = profile.birthYear;
            document.getElementById('birthMonth').value = profile.birthMonth;
            document.getElementById('birthDay').value = profile.birthDay;
            document.getElementById('birthHour').value = profile.birthHour;
            document.getElementById('birthMinute').value = profile.birthMinute;
            document.getElementById('birthPlace').value = profile.birthPlace || '';
            document.getElementById('gender').value = profile.gender || '';
            if (document.getElementById('name')) {
                document.getElementById('name').value = profile.name || '';
            }
        }
    }

    // 重新計算命盤
    async recalculateDestiny() {
        if (!userProfile.isProfileComplete()) {
            this.showError('請先完成使用者檔案設置');
            return;
        }

        if (confirm('確定要重新計算命盤嗎？這可能需要幾秒鐘時間。')) {
            try {
                this.showCalculatingState();
                await dataCenter.calculateAll(userProfile);
                this.showSuccess('命盤重新計算完成！');
                this.showProfileModal(); // 刷新顯示
            } catch (error) {
                console.error('重新計算失敗:', error);
                this.showError('重新計算失敗：' + error.message);
            }
        }
    }

    // 導出使用者檔案
    exportProfile() {
        const profile = userProfile.profile;
        const data = {
            profile: profile,
            calculatedData: {
                bazi: userProfile.calculatedData.bazi ? '已計算' : '未計算',
                ziwei: userProfile.calculatedData.ziwei ? '已計算' : '未計算',
                astrology: userProfile.calculatedData.astrology ? '已計算' : '未計算'
            },
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `命理檔案_${profile.name || 'user'}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showSuccess('檔案導出成功！');
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
        console.log('找到神殿卡片數量:', templeCards.length); // 調試用
        
        if (templeCards.length === 0) {
            console.warn('未找到神殿卡片，延遲設置事件監聽器');
            // 如果找不到元素，延遲重試
            setTimeout(() => {
                this.setupTempleNavigation();
            }, 100);
            return;
        }
        
        templeCards.forEach((card) => {
            const temple = card.dataset.temple;
            
            if (card.hasAttribute('data-listener-attached')) {
                return;
            }
            
            card.setAttribute('data-listener-attached', 'true');
            
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.enterTemple(temple);
            });
            
            card.style.cursor = 'pointer';
        });
    }

    // 進入神殿
    enterTemple(temple) {
        if (!temple) {
            console.error('神殿類型未指定');
            return;
        }
        
        this.currentTemple = temple;
        
        // 隱藏神殿導航
        const templeNav = document.getElementById('templeNavigation');
        if (templeNav) {
            templeNav.classList.add('hidden');
            console.log('隱藏神殿導航'); // 調試用
        } else {
            console.error('找不到 templeNavigation 元素');
        }
        
        // 隱藏檔案設置界面
        const profileSetup = document.getElementById('profileSetup');
        if (profileSetup) {
            profileSetup.classList.add('hidden');
        }
        
        // 確保 celestialContent 可見
        const celestialContent = document.getElementById('celestialContent');
        if (celestialContent) {
            celestialContent.classList.remove('hidden');
        }
        
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
            default:
                this.showError('未知的神殿類型');
        }
    }

    // 顯示天命殿（Dashboard 風格）
    showDestinyTemple() {
        // 首先檢查使用者檔案是否完整
        const isComplete = userProfile.isProfileComplete();
        
        if (!isComplete) {
            this.showError('請先完成使用者檔案設置');
            document.getElementById('profileSetup').classList.remove('hidden');
            document.getElementById('templeNavigation').classList.remove('hidden');
            this.backToTemples();
            return;
        }

        // 檢查是否已計算命盤
        const hasCalculated = userProfile.calculatedData.bazi || 
                             userProfile.calculatedData.ziwei || 
                             userProfile.calculatedData.astrology;

        if (!hasCalculated) {
            this.showCalculatingState();
            this.calculateAllDestinyData();
        } else {
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
        const container = document.getElementById('celestialContent');
        
        if (!container) {
            this.showError('無法顯示儀表板');
            return;
        }
        
        container.classList.remove('hidden');
        
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
        
        // 再次確保容器可見（設置 innerHTML 後）
        container.classList.remove('hidden');
        container.style.display = 'block';
        container.style.visibility = 'visible';
        container.style.opacity = '1';
        
        console.log('儀表板 HTML 已設置，容器應該可見'); // 調試用
        console.log('formContainer 內容長度:', container.innerHTML.length); // 調試用
        console.log('formContainer 實際位置:', container.getBoundingClientRect()); // 調試用
        
        // 強制重繪
        void container.offsetHeight;
    }

    // 顯示靈犀殿（對話風格）
    showDivinationTemple() {
        const container = document.getElementById('celestialContent');
        if (!container) {
            this.showError('無法顯示靈犀殿');
            return;
        }
        
        container.innerHTML = `
            <div class="divination-temple">
                <div class="temple-header">
                    <button class="back-btn" onclick="celestialOS.backToTemples()">← 返回神殿</button>
                    <h2>🔮 靈犀殿 - 當下問題指引</h2>
                </div>
                
                <div class="chat-interface">
                    <div class="chat-messages" id="chatMessages">
                        <div class="message bot-message">
                            <div class="bot-avatar">🔮</div>
                            <div class="message-content">
                                <p>歡迎來到靈犀殿！</p>
                                <p>請告訴我你想詢問的問題，我會為你進行占卜指引。</p>
                                <p class="message-hint">💡 試試問：「我最近的感情運勢如何？」</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat-input-area">
                        <input type="text" id="questionInput" placeholder="輸入你的問題..." class="chat-input" 
                               onkeypress="if(event.key === 'Enter') celestialOS.sendQuestion()">
                        <button onclick="celestialOS.sendQuestion()" class="chat-send-btn">🔮 占卜</button>
                    </div>
                    
                    <div class="divination-options hidden" id="divinationOptions">
                        <p class="options-title">選擇占卜方式：</p>
                        <div class="option-buttons">
                            <button class="option-btn" onclick="celestialOS.selectDivinationType('tarot')">
                                <span class="option-icon">🃏</span>
                                <span class="option-name">塔羅牌</span>
                                <span class="option-desc">具體問題指引</span>
                            </button>
                            <button class="option-btn" onclick="celestialOS.selectDivinationType('yijing')">
                                <span class="option-icon">☯️</span>
                                <span class="option-name">周易</span>
                                <span class="option-desc">重大決策分析</span>
                            </button>
                            <button class="option-btn" onclick="celestialOS.selectDivinationType('qiuqian')">
                                <span class="option-icon">🎋</span>
                                <span class="option-name">求籤</span>
                                <span class="option-desc">運勢總體預測</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 顯示潛意識殿（筆記風格）
    showSubconsciousTemple() {
        const container = document.getElementById('celestialContent');
        if (!container) {
            this.showError('無法顯示潛意識殿');
            return;
        }
        
        container.innerHTML = `
            <div class="subconscious-temple">
                <div class="temple-header">
                    <button class="back-btn" onclick="celestialOS.backToTemples()">← 返回神殿</button>
                    <h2>🌌 潛意識殿 - 探索內心世界</h2>
                </div>
                
                <div class="subconscious-tabs">
                    <button class="tab-btn active" data-tab="dream">🛌 解夢</button>
                    <button class="tab-btn" data-tab="calligraphy">✍️ 測字</button>
                </div>
                
                <div class="subconscious-content">
                    <div id="dreamTab" class="tab-content active">
                        <div class="dream-section">
                            <div class="section-icon">🌙</div>
                            <h3>AI 解夢分析</h3>
                            <p class="section-desc">記錄你的夢境，AI 將為你進行深度心理分析和象徵解讀</p>
                            <textarea id="dreamText" class="dream-textarea" placeholder="請詳細描述你的夢境...

例如：
- 夢中的場景是什麼？
- 有哪些人物出現？
- 你在夢中的情緒如何？
- 發生了什麼事件？"></textarea>
                            <button class="btn-primary" onclick="celestialOS.analyzeDream()">🔮 開始解夢</button>
                        </div>
                    </div>
                    
                    <div id="calligraphyTab" class="tab-content hidden">
                        <div class="calligraphy-section">
                            <div class="section-icon">✍️</div>
                            <h3>AI 測字分析</h3>
                            <p class="section-desc">輸入一個字，AI 將分析其字形結構和象徵意義</p>
                            <div class="calligraphy-input-wrapper">
                                <input type="text" id="calligraphyText" class="calligraphy-input" placeholder="輸入一個字" maxlength="1">
                            </div>
                            <button class="btn-primary" onclick="celestialOS.analyzeCalligraphy()">✍️ 開始測字</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 設置標籤切換
        setTimeout(() => this.setupSubconsciousTabs(), 100);
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
        const celestialContent = document.getElementById('celestialContent');
        if (celestialContent) {
            celestialContent.innerHTML = '';
        }
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
        const nameInput = document.getElementById('name');
        const formData = {
            name: nameInput ? nameInput.value.trim() : '',
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
        const container = document.getElementById('celestialContent');
        
        if (!container) {
            this.showError('無法顯示計算狀態');
            return;
        }
        
        container.classList.remove('hidden');
        container.style.display = 'block';
        
        container.innerHTML = `
            <div class="calculating-state">
                <div class="loading-animation">
                    <div class="mystical-orb">
                        <div class="orb-core"></div>
                        <div class="orb-ring ring-1"></div>
                        <div class="orb-ring ring-2"></div>
                        <div class="orb-ring ring-3"></div>
                    </div>
                </div>
                <h2 class="loading-title">正在計算你的命盤...</h2>
                <p class="loading-subtitle">AI 正在分析你的八字、紫微斗數和占星資料</p>
                <div class="loading-progress">
                    <div class="progress-steps">
                        <div class="step active" id="step1">📅 八字計算</div>
                        <div class="step" id="step2">⭐ 紫微排盤</div>
                        <div class="step" id="step3">🌙 占星分析</div>
                    </div>
                </div>
                <p class="loading-tip">💡 提示：首次計算需要 5-15 秒，請耐心等待</p>
            </div>
        `;
        
        // 模擬進度更新
        setTimeout(() => {
            const step2 = document.getElementById('step2');
            if (step2) step2.classList.add('active');
        }, 2000);
        
        setTimeout(() => {
            const step3 = document.getElementById('step3');
            if (step3) step3.classList.add('active');
        }, 4000);
    }

    // 顯示成功訊息
    showSuccess(message) {
        this.showToast(message, 'success');
    }

    // 顯示錯誤訊息
    showError(message) {
        this.showToast(message, 'error');
    }
    
    // 統一的訊息提示
    showToast(message, type = 'info') {
        // 移除舊的 toast
        const oldToast = document.querySelector('.toast-message');
        if (oldToast) oldToast.remove();
        
        const toast = document.createElement('div');
        toast.className = `toast-message toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="toast-text">${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // 動畫顯示
        setTimeout(() => toast.classList.add('show'), 10);
        
        // 自動消失
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
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
            birthDate: `${profile.birthYear}-${String(profile.birthMonth).padStart(2, '0')}-${String(profile.birthDay).padStart(2, '0')}`,
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
        const container = document.getElementById('celestialContent');
        container.innerHTML = `
            <div class="detail-loading">
                <div class="spinner"></div>
                <p>AI 正在解讀你的命盤...</p>
                <p class="loading-hint">這可能需要 10-30 秒，請耐心等待</p>
            </div>
        `;

        try {
            const apiKey = getApiKey();
            if (!apiKey) {
                container.innerHTML = '';
                this.showError('請先設置 API 金鑰');
                setTimeout(() => openModal(), 500);
                return;
            }

            // 調用 AI 解讀（帶超時處理）
            const result = await getDivinationResult(type, question, data, apiKey);
            
            // 清除載入狀態
            container.innerHTML = '';
            
            // 顯示結果
            this.displayDetailResult(type, question, data, result);
        } catch (error) {
            console.error('解讀失敗:', error);
            
            // 清除載入狀態
            container.innerHTML = `
                <div class="error-display">
                    <div class="error-icon">⚠️</div>
                    <h3>解讀失敗</h3>
                    <p>${error.message || '未知錯誤'}</p>
                    <button class="btn-primary" onclick="celestialOS.backToDestinyDashboard()">返回儀表板</button>
                </div>
            `;
            
            this.showError('解讀失敗：' + (error.message || '請稍後再試'));
        }
    }

    // 顯示詳情結果
    displayDetailResult(type, question, data, result) {
        const container = document.getElementById('celestialContent');
        if (!container) {
            this.showError('無法顯示結果');
            return;
        }
        
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
            
            // 清空容器，顯示結果區域
            container.innerHTML = '';
            resultSection.style.display = 'block';
            
            // 顯示結果
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
            
            // 滾動到結果區域
            setTimeout(() => {
                resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            // 備用顯示方式：直接在容器中顯示
            const resultData = result.result || result;
            container.innerHTML = `
                <div class="detail-result">
                    <button class="back-btn" onclick="celestialOS.backToDestinyDashboard()">← 返回儀表板</button>
                    <h2>${type === 'bazi' ? '八字' : type === 'ziwei' ? '紫微斗數' : '西方占星'}命盤詳情</h2>
                    <div class="result-content">
                        ${resultData.opening ? `<div class="result-opening">${resultData.opening}</div>` : ''}
                        ${resultData.analysis ? `<div class="result-analysis">${resultData.analysis}</div>` : ''}
                        ${resultData.advice && resultData.advice.length > 0 ? `
                            <div class="result-advice">
                                <h3>建議</h3>
                                <ul>
                                    ${resultData.advice.map(a => `<li>${a}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
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
        
        // 顯示進行中訊息（帶進度指示）
        const progressMsgId = 'divination-progress-' + Date.now();
        messages.innerHTML += `
            <div class="message bot-message divination-progress" id="${progressMsgId}">
                <div class="bot-avatar">🔮</div>
                <div class="message-content">
                    <p>正在為你進行 ${type === 'tarot' ? '塔羅牌' : type === 'yijing' ? '周易' : type === 'migu' ? '米卦' : '求籤'} 占卜...</p>
                    <div class="loading-dots">
                        <span></span><span></span><span></span>
                    </div>
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
            
            // 移除進度訊息
            const progressMsg = document.getElementById(progressMsgId);
            if (progressMsg) {
                progressMsg.remove();
            }
            
            // 顯示錯誤訊息
            messages.innerHTML += `
                <div class="message bot-message error-message">
                    <div class="bot-avatar">⚠️</div>
                    <div class="message-content">
                        <p><strong>占卜失敗</strong></p>
                        <p>${error.message || '請稍後再試'}</p>
                        <p class="error-hint">💡 提示：請檢查 API 金鑰是否正確，或網路連接是否正常</p>
                    </div>
                </div>
            `;
            messages.scrollTop = messages.scrollHeight;
            
            this.showError('占卜失敗：' + (error.message || '請稍後再試'));
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

        const container = document.getElementById('celestialContent');
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

        const container = document.getElementById('celestialContent');
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

