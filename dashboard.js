/* =========================================================================
   QMS DASHBOARD MASTER ENGINE (With Bookmarks Logic)
   - 100% Full Code (No Shortcuts)
========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SMART BGM MEMORY SYSTEM (Multi-Track)
    // ==========================================
    const bgmAudio = document.getElementById('bgm-audio');
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgmVolumeControl = document.getElementById('bgm-volume');
    const bgmTrackSelect = document.getElementById('bgm-track-select');
    
    let isBgmOn = localStorage.getItem('qms_bgm') === 'on';
    let savedBgmVolume = localStorage.getItem('qms_bgm_volume') || 0.3;
    let savedBgmTime = localStorage.getItem('qms_bgm_time') || 0;
    let savedBgmTrack = localStorage.getItem('qms_bgm_track') || 'bgm1.mp3'; 

    function updateToggleUI(checkbox) {
        if(!checkbox) return;
        if(checkbox.checked) {
            checkbox.nextElementSibling.style.backgroundColor = 'var(--accent-main)';
            checkbox.nextElementSibling.style.boxShadow = '0 0 10px var(--accent-glow)';
        } else {
            checkbox.nextElementSibling.style.backgroundColor = 'rgba(255,255,255,0.1)';
            checkbox.nextElementSibling.style.boxShadow = 'none';
        }
    }

    if (bgmAudio) {
        bgmAudio.src = savedBgmTrack;
        bgmAudio.volume = parseFloat(savedBgmVolume);
        bgmAudio.currentTime = parseFloat(savedBgmTime);

        if(bgmTrackSelect) bgmTrackSelect.value = savedBgmTrack;
        if(bgmVolumeControl) bgmVolumeControl.value = savedBgmVolume;
        if(bgmToggle) { bgmToggle.checked = isBgmOn; updateToggleUI(bgmToggle); }

        const playBgmSafely = () => { if (isBgmOn && bgmAudio.paused) bgmAudio.play().catch(e => console.log(e)); };
        document.body.addEventListener('click', playBgmSafely, { once: true });

        if(bgmTrackSelect) {
            bgmTrackSelect.addEventListener('change', (e) => {
                const newTrack = e.target.value; localStorage.setItem('qms_bgm_track', newTrack); 
                bgmAudio.src = newTrack; if (isBgmOn) bgmAudio.play();
            });
        }
        if(bgmToggle) {
            bgmToggle.addEventListener('change', (e) => {
                isBgmOn = e.target.checked; localStorage.setItem('qms_bgm', isBgmOn ? 'on' : 'off');
                updateToggleUI(e.target); if (isBgmOn) bgmAudio.play(); else bgmAudio.pause();
            });
        }
        if(bgmVolumeControl) {
            bgmVolumeControl.addEventListener('input', (e) => {
                bgmAudio.volume = e.target.value; localStorage.setItem('qms_bgm_volume', e.target.value);
            });
        }
        window.addEventListener('beforeunload', () => { localStorage.setItem('qms_bgm_time', bgmAudio.currentTime); });
    }

    // ==========================================
    // 2. SPLASH SCREEN LOGIC
    // ==========================================
    const splashScreen = document.getElementById('splash-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15; if (progress > 100) progress = 100;
        if(loadingBar) loadingBar.style.width = `${progress}%`;
        if (progress > 30 && progress < 70 && loadingText) loadingText.innerText = 'यूज़र प्रोफाइल सिंक्रनाइज़ हो रही है...';
        if (progress > 70 && loadingText) loadingText.innerText = 'क्वांटम इंजन लोड हो रहा है...';
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => { if(splashScreen) { splashScreen.style.opacity = '0'; setTimeout(() => splashScreen.style.visibility = 'hidden', 800); } }, 600); 
        }
    }, 200);

    // ==========================================
    // 3. DYNAMIC GREETING & QUOTES
    // ==========================================
    const hour = new Date().getHours();
    let greetingText = "नमस्ते";
    if (hour < 12) greetingText = "सुप्रभात (Good Morning)";
    else if (hour < 18) greetingText = "शुभ दोपहर (Good Afternoon)";
    else greetingText = "शुभ संध्या (Good Evening)";
    if(document.getElementById('dynamic-greeting')) document.getElementById('dynamic-greeting').innerText = greetingText;

    const quotes = [ "शिक्षा भविष्य का पासपोर्ट है, क्योंकि कल उनका है जो आज इसकी तैयारी करते हैं।", "जितना कठिन संघर्ष होगा, जीत उतनी ही शानदार होगी।", "सफलता की शुरुआत हमेशा 'मैं कर सकता हूँ' से होती है।" ];
    if(document.getElementById('daily-quote')) document.getElementById('daily-quote').innerText = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;

    // ==========================================
    // 4. POMODORO FOCUS TIMER
    // ==========================================
    let timerInterval; let timeLeft = 25 * 60; let isTimerRunning = false;
    const timerDisplay = document.getElementById('timer-display');
    const timerStartBtn = document.getElementById('timer-start-btn');
    const timerResetBtn = document.getElementById('timer-reset-btn');

    function updateTimerDisplay() {
        if(!timerDisplay) return;
        const m = Math.floor(timeLeft / 60); const s = timeLeft % 60;
        timerDisplay.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    
    if(timerStartBtn) {
        timerStartBtn.addEventListener('click', () => {
            if (!isTimerRunning) {
                isTimerRunning = true; timerStartBtn.innerText = "पॉज़ (Pause)"; timerStartBtn.style.background = "#ffc107";
                timerInterval = setInterval(() => {
                    if (timeLeft > 0) { timeLeft--; updateTimerDisplay(); } 
                    else { clearInterval(timerInterval); isTimerRunning = false; if(window.showCustomToast) window.showCustomToast("शानदार! आपका 25 मिनट का फोकस सेशन पूरा हुआ।", false); timeLeft = 25 * 60; updateTimerDisplay(); timerStartBtn.innerText = "स्टार्ट (Start)"; timerStartBtn.style.background = "var(--accent-main)"; }
                }, 1000);
            } else { clearInterval(timerInterval); isTimerRunning = false; timerStartBtn.innerText = "रिज्यूम (Resume)"; timerStartBtn.style.background = "var(--accent-main)"; }
        });
    }
    if(timerResetBtn) { timerResetBtn.addEventListener('click', () => { clearInterval(timerInterval); isTimerRunning = false; timeLeft = 25 * 60; updateTimerDisplay(); timerStartBtn.innerText = "स्टार्ट (Start)"; timerStartBtn.style.background = "var(--accent-main)"; }); }

    // ==========================================
    // 5. 🔖 RENDER BOOKMARKS (SAVED NOTES) LOGIC
    // ==========================================
    const bookmarksContainer = document.getElementById('bookmarks-container');
    if (bookmarksContainer) {
        let bookmarks = JSON.parse(localStorage.getItem('qms_bookmarks')) || {};
        let keys = Object.keys(bookmarks);

        if (keys.length === 0) {
            bookmarksContainer.innerHTML = `
                <div class="glass-card" style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                    <i class="ri-bookmark-line" style="font-size: 2.5rem; margin-bottom: 10px; display: block; opacity: 0.5;"></i>
                    <p>अभी तक कोई नोट्स सेव नहीं किया गया है।</p>
                    <p style="font-size: 0.8rem; margin-top: 5px;">वीडियो प्लेयर पर जाकर ❤️ बुकमार्क पर क्लिक करें।</p>
                </div>`;
        } else {
            // Apply Grid directly
            bookmarksContainer.style.display = 'grid';
            bookmarksContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
            bookmarksContainer.style.gap = '15px';
            
            let bookmarksHTML = '';
            keys.forEach(key => {
                let bm = bookmarks[key];
                let iconColor = 'var(--accent-main)';
                if(bm.subject === 'chemistry') iconColor = '#b535ff';
                if(bm.subject === 'mathematics') iconColor = '#00ff88';

                bookmarksHTML += `
                    <div class="glass-card sfx-trigger" style="padding: 1.2rem; cursor: pointer; display: flex; align-items: center; gap: 15px; transition: 0.3s; border-left: 4px solid ${iconColor};" onclick="window.location.href='player.html?subject=${bm.subject}&chapter=${bm.id}'" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
                        <div style="width: 45px; height: 45px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; justify-content: center; align-items: center; font-size: 1.5rem; color: ${iconColor}; flex-shrink: 0;">
                            <i class="ri-bookmark-3-fill"></i>
                        </div>
                        <div>
                            <h4 style="font-family: var(--font-hindi); font-size: 1.05rem; margin-bottom: 3px; line-height:1.2; color: #fff;">${bm.title}</h4>
                            <p style="font-size: 0.8rem; color: var(--text-secondary); text-transform: capitalize;">${bm.subject} • Chapter ${bm.id}</p>
                        </div>
                    </div>
                `;
            });
            bookmarksContainer.innerHTML = bookmarksHTML;
        }
    }

    // ==========================================
    // 6. ADVANCED QUANTUM PARTICLES
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        const scienceSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let particlesArray = [];
        
        class QuantumParticle {
            constructor() {
                this.type = Math.random() > 0.4 ? 'dot' : 'symbol';
                this.symbol = scienceSymbols[Math.floor(Math.random() * scienceSymbols.length)];
                this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
                if (this.type === 'symbol') { this.size = Math.random() * 15 + 10; this.speedX = Math.random() * 0.5 - 0.25; this.speedY = Math.random() * -0.8 - 0.2; } 
                else { this.size = Math.random() * 3 + 1; this.speedX = Math.random() * 1 - 0.5; this.speedY = Math.random() * -1 - 0.2; }
                this.blinkSpeed = Math.random() * 0.05 + 0.02; this.angle = Math.random() * Math.PI * 2;
            }
            update() {
                this.y += this.speedY; this.x += this.speedX; this.angle += this.blinkSpeed;
                if (this.y < -30) { this.y = canvas.height + 30; this.x = Math.random() * canvas.width; }
                if (this.x < -30 || this.x > canvas.width + 30) this.speedX *= -1;
            }
            draw() {
                const rootStyle = getComputedStyle(document.documentElement);
                const accentColor = rootStyle.getPropertyValue('--accent-main').trim() || '#00f0ff';
                let currentOpacity = ((Math.sin(this.angle) + 1) / 2) * 0.8 + 0.1;
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                ctx.shadowBlur = currentOpacity * 20; ctx.shadowColor = accentColor;
                if (this.type === 'symbol') { ctx.font = `${this.size}px "Space Grotesk", sans-serif`; ctx.fillText(this.symbol, this.x, this.y); } 
                else { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
                ctx.shadowBlur = 0; 
            }
        }
        for (let i = 0; i < 60; i++) particlesArray.push(new QuantumParticle());
        function animateParticles() { ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animateParticles); }
        animateParticles();
        window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
    }

    // ==========================================
    // 7. PREMIUM MODALS & TOASTS 
    // ==========================================
    window.showCustomToast = function(message, isError = false) {
        const existingToast = document.querySelector('.qms-toast-msg'); if (existingToast) existingToast.remove();
        const toast = document.createElement('div'); toast.className = isError ? 'qms-toast-msg qms-toast-error' : 'qms-toast-msg';
        toast.innerHTML = `<i class="${isError ? 'ri-error-warning-fill' : 'ri-checkbox-circle-fill'}"></i> ${message}`;
        document.body.appendChild(toast); setTimeout(() => { if (toast) toast.remove(); }, 3500);
    };

    const modalOverlay = document.createElement('div'); modalOverlay.className = 'qms-modal-overlay';
    modalOverlay.innerHTML = `<div class="qms-modal-box"><div class="qms-modal-title" id="qms-modal-title"></div><input type="text" class="qms-modal-input" id="qms-modal-input"><div class="qms-modal-buttons"><button class="qms-modal-btn btn-cancel" id="qms-modal-cancel">रद्द करें</button><button class="qms-modal-btn btn-confirm" id="qms-modal-confirm">सेव करें</button></div></div>`;
    document.body.appendChild(modalOverlay);

    const modalTitle = document.getElementById('qms-modal-title'); const modalInput = document.getElementById('qms-modal-input'); const modalConfirm = document.getElementById('qms-modal-confirm'); let currentCallback = null;

    window.showCustomPrompt = function(title, defaultValue, callback) { modalTitle.innerHTML = `<i class="ri-edit-2-line" style="color: var(--accent-main); font-size: 1.5rem; display:block; margin-bottom: 5px;"></i> ${title}`; modalInput.style.display = 'block'; modalInput.value = defaultValue; modalConfirm.style.background = 'var(--accent-main)'; modalConfirm.style.color = '#000'; modalConfirm.innerText = 'सेव करें'; modalOverlay.classList.add('active'); setTimeout(() => modalInput.focus(), 100); currentCallback = callback; }
    window.showCustomConfirm = function(title, callback) { modalTitle.innerHTML = `<i class="ri-error-warning-line" style="color: #ff4d4d; font-size: 2rem; display:block; margin-bottom: 5px;"></i> ${title}`; modalInput.style.display = 'none'; modalConfirm.style.background = '#ff4d4d'; modalConfirm.style.color = '#fff'; modalConfirm.innerText = 'हाँ, करें'; modalOverlay.classList.add('active'); currentCallback = callback; }
    
    document.getElementById('qms-modal-cancel').addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalConfirm.addEventListener('click', () => { if (currentCallback) currentCallback(modalInput.style.display === 'none' ? true : modalInput.value); modalOverlay.classList.remove('active'); });

    // ==========================================
    // 8. LOAD USER DATA & SETTINGS PANEL
    // ==========================================
    const savedName = localStorage.getItem('qms_user_name') || 'Alina Sami';
    if(document.getElementById('dash-user-name')) document.getElementById('dash-user-name').innerText = savedName; 
    if(document.getElementById('panel-user-name')) document.getElementById('panel-user-name').innerText = savedName;
    const savedImg = localStorage.getItem('qms_profile_img');
    if(savedImg) { if(document.getElementById('dash-small-avatar')) document.getElementById('dash-small-avatar').src = savedImg; if(document.getElementById('panel-profile-img')) document.getElementById('panel-profile-img').src = savedImg; }

    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedCount = Object.keys(completedData).length;
    if(document.getElementById('dash-completed-count')) document.getElementById('dash-completed-count').innerText = completedCount;
    if(document.getElementById('dash-total-xp')) document.getElementById('dash-total-xp').innerText = completedCount * 50;

    const panel = document.getElementById('settings-panel'); const overlay = document.getElementById('panel-overlay');
    function closePanel() { if(panel) panel.classList.remove('active'); if(overlay) overlay.classList.remove('active'); }
    if(document.getElementById('open-panel-btn')) document.getElementById('open-panel-btn').addEventListener('click', () => { panel.classList.add('active'); overlay.classList.add('active'); });
    if(document.getElementById('close-panel')) document.getElementById('close-panel').addEventListener('click', closePanel); 
    if(overlay) overlay.addEventListener('click', closePanel);

    document.querySelectorAll('.theme-option-card').forEach(card => {
        card.addEventListener('click', function() { const newTheme = this.getAttribute('data-set-theme'); document.documentElement.setAttribute('data-theme', newTheme); localStorage.setItem('qms_theme', newTheme); });
    });

    ['pdf-location-pref', 'video-quality-pref'].forEach(id => {
        const el = document.getElementById(id); const saved = localStorage.getItem(`qms_${id}`); if(saved && el) el.value = saved;
        if(el) el.addEventListener('change', (e) => localStorage.setItem(`qms_${id}`, e.target.value));
    });

    // ==========================================
    // 9. PROFILE IMAGE UPLOAD & COMPRESSION
    // ==========================================
    const imgUpload = document.getElementById('img-upload');
    if(imgUpload) {
        imgUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = new Image();
                    img.onload = function() {
                        const tempCanvas = document.createElement('canvas'); const tCtx = tempCanvas.getContext('2d');
                        const maxDim = 200; let width = img.width; let height = img.height;
                        if (width > height) { if (width > maxDim) { height *= maxDim / width; width = maxDim; } } 
                        else { if (height > maxDim) { width *= maxDim / height; height = maxDim; } }
                        tempCanvas.width = width; tempCanvas.height = height; tCtx.drawImage(img, 0, 0, width, height);
                        const compressedBase64 = tempCanvas.toDataURL('image/jpeg', 0.8);
                        document.getElementById('dash-small-avatar').src = compressedBase64; document.getElementById('panel-profile-img').src = compressedBase64;
                        try { localStorage.setItem('qms_profile_img', compressedBase64); window.showCustomToast("प्रोफाइल फोटो सेव हो गई!"); } 
                        catch(error) { window.showCustomToast("फोटो सेव करने में एरर!", true); }
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Edit Name & Logout
    const editBtn = document.getElementById('edit-name-btn');
    if(editBtn) { editBtn.addEventListener('click', function() { const currentName = localStorage.getItem('qms_user_name') || 'Alina Sami'; window.showCustomPrompt("अपना नया नाम दर्ज करें", currentName, (newName) => { if(newName && newName.trim() !== "") { const cleanName = newName.trim(); localStorage.setItem('qms_user_name', cleanName); document.getElementById('dash-user-name').innerText = cleanName; document.getElementById('panel-user-name').innerText = cleanName; window.showCustomToast("नाम अपडेट हो गया!"); } }); }); }

    const resetBtn = document.getElementById('reset-btn');
    if(resetBtn) { resetBtn.addEventListener('click', () => { window.showCustomConfirm("क्या आप सच में लॉगआउट करना चाहते हैं?", (confirmed) => { if (confirmed) { window.location.href = "index.html"; } }); }); }

    // Sound FX
    const sfxClick = document.getElementById('sfx-click'); let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    const soundToggle = document.getElementById('sound-toggle');
    if(soundToggle) { soundToggle.checked = isSoundOn; updateToggleUI(soundToggle); soundToggle.addEventListener('change', (e) => { isSoundOn = e.target.checked; localStorage.setItem('qms_sound', isSoundOn ? 'on' : 'off'); updateToggleUI(e.target); }); }
    document.querySelectorAll('.sfx-trigger').forEach(btn => { btn.addEventListener('click', () => { if (isSoundOn && sfxClick) { sfxClick.currentTime = 0; sfxClick.volume = 1.0; sfxClick.play().catch(()=>{}); } }); });
});
