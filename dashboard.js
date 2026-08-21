/* =========================================================================
   QMS JAVASCRIPT MASTER ENGINE (DASHBOARD)
   - Features: Advanced Particles (Formulas + Dots), Modals, Timer, Audio
========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SPLASH SCREEN LOGIC (LOADING) ---
    const splashScreen = document.getElementById('splash-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        if(loadingBar) loadingBar.style.width = `${progress}%`;
        
        if (progress > 30 && progress < 70 && loadingText) loadingText.innerText = 'यूज़र प्रोफाइल सिंक्रनाइज़ हो रही है...';
        if (progress > 70 && loadingText) loadingText.innerText = 'क्वांटम इंजन लोड हो रहा है...';
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                if(splashScreen) {
                    splashScreen.style.opacity = '0';
                    setTimeout(() => splashScreen.style.visibility = 'hidden', 800);
                }
            }, 600); 
        }
    }, 200);

    // --- 2. DYNAMIC GREETING & QUOTES ---
    const hour = new Date().getHours();
    let greetingText = "नमस्ते";
    if (hour < 12) greetingText = "सुप्रभात (Good Morning)";
    else if (hour < 18) greetingText = "शुभ दोपहर (Good Afternoon)";
    else greetingText = "शुभ संध्या (Good Evening)";
    
    const greetingEl = document.getElementById('dynamic-greeting');
    if(greetingEl) greetingEl.innerText = greetingText;

    const quotes = [
        "शिक्षा भविष्य का पासपोर्ट है, क्योंकि कल उनका है जो आज इसकी तैयारी करते हैं।",
        "जितना कठिन संघर्ष होगा, जीत उतनी ही शानदार होगी।",
        "सफलता की शुरुआत हमेशा 'मैं कर सकता हूँ' से होती है।",
        "ज्ञान वह निवेश है जिसका मुनाफा जीवन भर मिलता है।"
    ];
    const quoteEl = document.getElementById('daily-quote');
    if(quoteEl) quoteEl.innerText = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;

    // --- 3. POMODORO TIMER LOGIC ---
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
                    else { 
                        clearInterval(timerInterval); isTimerRunning = false; 
                        showCustomToast("शानदार! आपका 25 मिनट का फोकस सेशन पूरा हुआ।", false); 
                        timeLeft = 25 * 60; updateTimerDisplay(); 
                        timerStartBtn.innerText = "स्टार्ट (Start)"; timerStartBtn.style.background = "var(--accent-main)"; 
                    }
                }, 1000);
            } else {
                clearInterval(timerInterval); isTimerRunning = false; timerStartBtn.innerText = "रिज्यूम (Resume)"; timerStartBtn.style.background = "var(--accent-main)";
            }
        });
    }
    if(timerResetBtn) {
        timerResetBtn.addEventListener('click', () => { clearInterval(timerInterval); isTimerRunning = false; timeLeft = 25 * 60; updateTimerDisplay(); timerStartBtn.innerText = "स्टार्ट (Start)"; timerStartBtn.style.background = "var(--accent-main)"; });
    }

    // --- 4. ADVANCED QUANTUM PARTICLES (BOTH FORMULAS & DOTS) ---
    const canvas = document.getElementById('bg-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        const scienceSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let particlesArray = [];
        
        class QuantumParticle {
            constructor() {
                // 60% chance to be a glowing firefly dot, 40% chance to be a formula symbol
                this.type = Math.random() > 0.4 ? 'dot' : 'symbol';
                this.symbol = scienceSymbols[Math.floor(Math.random() * scienceSymbols.length)];
                this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
                
                if (this.type === 'symbol') {
                    this.size = Math.random() * 15 + 10;
                    this.speedX = Math.random() * 0.5 - 0.25; this.speedY = Math.random() * -0.8 - 0.2;
                } else {
                    this.size = Math.random() * 3 + 1; // Small firefly dots
                    this.speedX = Math.random() * 1 - 0.5; this.speedY = Math.random() * -1 - 0.2;
                }
                
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
                
                // Pulsing blink effect
                let currentOpacity = ((Math.sin(this.angle) + 1) / 2) * 0.8 + 0.1;
                
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                ctx.shadowBlur = currentOpacity * 20; 
                ctx.shadowColor = accentColor;
                
                if (this.type === 'symbol') {
                    ctx.font = `${this.size}px "Space Grotesk", sans-serif`; 
                    ctx.fillText(this.symbol, this.x, this.y);
                } else {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.shadowBlur = 0; // Reset
            }
        }
        
        // Generate 60 mixed particles (Dots + Symbols)
        for (let i = 0; i < 60; i++) particlesArray.push(new QuantumParticle());
        
        function animateParticles() { 
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            particlesArray.forEach(p => { p.update(); p.draw(); }); 
            requestAnimationFrame(animateParticles); 
        }
        animateParticles();
        window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
    }

    // --- 5. PREMIUM MODALS & TOASTS (Reusable functions) ---
    window.showCustomToast = function(message, isError = false) {
        const toast = document.createElement('div');
        toast.className = isError ? 'qms-toast-msg qms-toast-error' : 'qms-toast-msg';
        toast.innerHTML = `<i class="${isError ? 'ri-error-warning-fill' : 'ri-checkbox-circle-fill'}"></i> ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => { toast.remove(); }, 3000); 
    };

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'qms-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="qms-modal-box">
            <div class="qms-modal-title" id="qms-modal-title"></div>
            <input type="text" class="qms-modal-input" id="qms-modal-input">
            <div class="qms-modal-buttons">
                <button class="qms-modal-btn btn-cancel" id="qms-modal-cancel">रद्द करें</button>
                <button class="qms-modal-btn btn-confirm" id="qms-modal-confirm">सेव करें</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const modalTitle = document.getElementById('qms-modal-title');
    const modalInput = document.getElementById('qms-modal-input');
    const modalConfirm = document.getElementById('qms-modal-confirm');
    let currentCallback = null;

    window.showCustomPrompt = function(title, defaultValue, callback) {
        modalTitle.innerHTML = `<i class="ri-edit-2-line" style="color: var(--accent-main); font-size: 1.5rem; display:block; margin-bottom: 5px;"></i> ${title}`;
        modalInput.style.display = 'block'; modalInput.value = defaultValue;
        modalConfirm.style.background = 'var(--accent-main)'; modalConfirm.style.color = '#000'; modalConfirm.innerText = 'सेव करें';
        modalOverlay.classList.add('active'); setTimeout(() => modalInput.focus(), 100); currentCallback = callback;
    }

    window.showCustomConfirm = function(title, callback) {
        modalTitle.innerHTML = `<i class="ri-error-warning-line" style="color: #ff4d4d; font-size: 2rem; display:block; margin-bottom: 5px;"></i> ${title}`;
        modalInput.style.display = 'none';
        modalConfirm.style.background = '#ff4d4d'; modalConfirm.style.color = '#fff'; modalConfirm.innerText = 'हाँ, करें';
        modalOverlay.classList.add('active'); currentCallback = callback;
    }

    document.getElementById('qms-modal-cancel').addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalConfirm.addEventListener('click', () => {
        if (currentCallback) currentCallback(modalInput.style.display === 'none' ? true : modalInput.value);
        modalOverlay.classList.remove('active');
    });

    // --- 6. LOAD USER DATA & STATS ---
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const savedName = localStorage.getItem('qms_user_name') || 'Alina Sami';
    
    if(document.getElementById('dash-user-name')) document.getElementById('dash-user-name').innerText = savedName; 
    if(document.getElementById('panel-user-name')) document.getElementById('panel-user-name').innerText = savedName;
    
    const savedImg = localStorage.getItem('qms_profile_img');
    if(savedImg) {
        if(document.getElementById('dash-small-avatar')) document.getElementById('dash-small-avatar').src = savedImg; 
        if(document.getElementById('panel-profile-img')) document.getElementById('panel-profile-img').src = savedImg;
    }

    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedCount = Object.keys(completedData).length;
    if(document.getElementById('dash-completed-count')) document.getElementById('dash-completed-count').innerText = completedCount;
    if(document.getElementById('dash-total-xp')) document.getElementById('dash-total-xp').innerText = completedCount * 50;

    // --- 7. PANEL LOGIC & SETTINGS ---
    const panel = document.getElementById('settings-panel'); const overlay = document.getElementById('panel-overlay');
    function closePanel() { if(panel) panel.classList.remove('active'); if(overlay) overlay.classList.remove('active'); }
    
    if(document.getElementById('open-panel-btn')) document.getElementById('open-panel-btn').addEventListener('click', () => { panel.classList.add('active'); overlay.classList.add('active'); });
    if(document.getElementById('close-panel')) document.getElementById('close-panel').addEventListener('click', closePanel); 
    if(overlay) overlay.addEventListener('click', closePanel);

    document.querySelectorAll('.theme-dot').forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-set-theme');
            document.documentElement.setAttribute('data-theme', newTheme); localStorage.setItem('qms_theme', newTheme);
        });
    });

    ['pdf-location-pref', 'video-quality-pref'].forEach(id => {
        const el = document.getElementById(id); const saved = localStorage.getItem(`qms_${id}`); if(saved && el) el.value = saved;
        if(el) el.addEventListener('change', (e) => localStorage.setItem(`qms_${id}`, e.target.value));
    });

    // --- 8. AUDIO FX SYSTEM ---
    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => { if (isSoundOn && sfxClick) { sfxClick.currentTime = 0; sfxClick.volume = 1.0; sfxClick.play().catch(()=>{}); } });
    });

    // --- 9. PROFILE IMAGE UPLOAD (COMPRESSION FIX) ---
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
                        document.getElementById('dash-small-avatar').src = compressedBase64;
                        document.getElementById('panel-profile-img').src = compressedBase64;
                        
                        try { localStorage.setItem('qms_profile_img', compressedBase64); window.showCustomToast("प्रोफाइल फोटो सेव हो गई!"); } 
                        catch(error) { window.showCustomToast("फोटो सेव करने में एरर!", true); }
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 10. EDIT NAME & LOGOUT ---
    const editBtn = document.getElementById('edit-name-btn');
    if(editBtn) {
        editBtn.addEventListener('click', function() {
            const currentName = localStorage.getItem('qms_user_name') || 'Alina Sami';
            window.showCustomPrompt("अपना नया नाम दर्ज करें", currentName, (newName) => {
                if(newName && newName.trim() !== "") {
                    const cleanName = newName.trim(); localStorage.setItem('qms_user_name', cleanName);
                    document.getElementById('dash-user-name').innerText = cleanName; document.getElementById('panel-user-name').innerText = cleanName;
                    window.showCustomToast("नाम अपडेट हो गया!");
                }
            });
        });
    }

    const resetBtn = document.getElementById('reset-btn');
    if(resetBtn) {
        resetBtn.addEventListener('click', () => {
            window.showCustomConfirm("क्या आप सच में लॉगआउट करना चाहते हैं?", (confirmed) => {
                if (confirmed) { window.location.href = "index.html"; }
            });
        });
    }
});
