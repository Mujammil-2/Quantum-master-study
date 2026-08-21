/* =========================================================================
   QMS DASHBOARD MASTER ENGINE
   Features: Firefly Particles, Pomodoro Timer, Dynamic Quotes, Premium Modals
========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SPLASH SCREEN LOGIC (LOADING)
    // ==========================================
    const splashScreen = document.getElementById('splash-screen');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        loadingBar.style.width = `${progress}%`;
        
        if (progress > 30 && progress < 70) loadingText.innerText = 'यूज़र प्रोफाइल सिंक्रनाइज़ हो रही है...';
        if (progress > 70) loadingText.innerText = 'क्वांटम इंजन लोड हो रहा है...';
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                splashScreen.style.opacity = '0';
                setTimeout(() => splashScreen.style.visibility = 'hidden', 800);
            }, 600); 
        }
    }, 200);

    // ==========================================
    // 2. DYNAMIC GREETING & MOTIVATIONAL QUOTES
    // ==========================================
    const hour = new Date().getHours();
    let greetingText = "नमस्ते";
    if (hour < 12) greetingText = "सुप्रभात (Good Morning)";
    else if (hour < 18) greetingText = "शुभ दोपहर (Good Afternoon)";
    else greetingText = "शुभ संध्या (Good Evening)";
    document.getElementById('dynamic-greeting').innerText = greetingText;

    const quotes = [
        "शिक्षा भविष्य का पासपोर्ट है, क्योंकि कल उनका है जो आज इसकी तैयारी करते हैं।",
        "जितना कठिन संघर्ष होगा, जीत उतनी ही शानदार होगी।",
        "सफलता की शुरुआत हमेशा 'मैं कर सकता हूँ' से होती है।",
        "ज्ञान वह निवेश है जिसका मुनाफा जीवन भर मिलता है।",
        "ब्रह्मांड को समझने के लिए पहले खुद पर विश्वास करना पड़ता है।"
    ];
    document.getElementById('daily-quote').innerText = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;

    // ==========================================
    // 3. POMODORO FOCUS TIMER (25 Minutes)
    // ==========================================
    let timerInterval;
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let isTimerRunning = false;
    const timerDisplay = document.getElementById('timer-display');
    const timerStartBtn = document.getElementById('timer-start-btn');
    const timerResetBtn = document.getElementById('timer-reset-btn');

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    timerStartBtn.addEventListener('click', () => {
        if (!isTimerRunning) {
            isTimerRunning = true;
            timerStartBtn.innerText = "पॉज़ (Pause)";
            timerStartBtn.style.background = "#ffc107";
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    isTimerRunning = false;
                    alert("शानदार! आपका 25 मिनट का फोकस सेशन पूरा हुआ। 5 मिनट का ब्रेक लें।");
                    timeLeft = 25 * 60;
                    updateTimerDisplay();
                    timerStartBtn.innerText = "स्टार्ट (Start)";
                    timerStartBtn.style.background = "var(--accent-main)";
                }
            }, 1000);
        } else {
            clearInterval(timerInterval);
            isTimerRunning = false;
            timerStartBtn.innerText = "रिज्यूम (Resume)";
            timerStartBtn.style.background = "var(--accent-main)";
        }
    });

    timerResetBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        isTimerRunning = false;
        timeLeft = 25 * 60;
        updateTimerDisplay();
        timerStartBtn.innerText = "स्टार्ट (Start)";
        timerStartBtn.style.background = "var(--accent-main)";
    });

    // ==========================================
    // 4. FIREFLY PARTICLES (GLOWING MATH/SCIENCE SYMBOLS)
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const scienceSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
    let particlesArray = [];
    
    class FireflyParticle {
        constructor() {
            this.symbol = scienceSymbols[Math.floor(Math.random() * scienceSymbols.length)];
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 15 + 10; // Font size 10 to 25
            this.speedX = Math.random() * 0.5 - 0.25; // Gentle horizontal drift
            this.speedY = Math.random() * -0.8 - 0.2; // Float upwards
            this.blinkSpeed = Math.random() * 0.05 + 0.02; // Speed of blinking
            this.angle = Math.random() * Math.PI * 2; // Starting phase for blink
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.angle += this.blinkSpeed; // Increment angle for sine wave
            
            // Loop around screen
            if (this.y < -30) {
                this.y = canvas.height + 30;
                this.x = Math.random() * canvas.width;
            }
            if (this.x < -30 || this.x > canvas.width + 30) this.speedX *= -1;
        }
        draw() {
            // Get current theme color for the glowing effect dynamically
            const rootStyle = getComputedStyle(document.documentElement);
            const accentColor = rootStyle.getPropertyValue('--accent-main').trim() || '#00f0ff';
            
            // Calculate opacity using sine wave (0.1 to 0.9) to simulate Firefly blink
            let currentOpacity = ((Math.sin(this.angle) + 1) / 2) * 0.8 + 0.1;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
            ctx.shadowBlur = currentOpacity * 20; // Glow gets stronger as it gets brighter
            ctx.shadowColor = accentColor; // The glow matches the theme!
            ctx.font = `${this.size}px "Space Grotesk", sans-serif`;
            ctx.fillText(this.symbol, this.x, this.y);
            
            ctx.shadowBlur = 0; // Reset for next items
        }
    }
    
    // Create 50 Fireflies
    for (let i = 0; i < 50; i++) { particlesArray.push(new FireflyParticle()); }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // ==========================================
    // 5. PREMIUM CUSTOM MODALS (UI ALERTS)
    // ==========================================
    const modalStyle = document.createElement('style');
    modalStyle.innerHTML = `
        .qms-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); z-index: 10000; display: flex; justify-content: center; align-items: center; opacity: 0; pointer-events: none; transition: 0.3s ease; }
        .qms-modal-overlay.active { opacity: 1; pointer-events: auto; }
        .qms-modal-box { background: rgba(15, 15, 25, 0.95); border: 1px solid rgba(255,255,255,0.1); padding: 2rem; border-radius: 15px; text-align: center; max-width: 350px; width: 90%; transform: translateY(20px); transition: 0.3s ease; box-shadow: 0 15px 30px rgba(0,0,0,0.8); }
        .qms-modal-overlay.active .qms-modal-box { transform: translateY(0); }
        .qms-modal-title { font-family: var(--font-heading); font-size: 1.1rem; margin-bottom: 15px; color: #fff; line-height: 1.4; }
        .qms-modal-input { width: 100%; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); padding: 12px 15px; border-radius: 8px; color: #fff; margin-bottom: 20px; font-size: 1rem; outline: none; transition: 0.3s; }
        .qms-modal-input:focus { border-color: var(--accent-main); box-shadow: 0 0 10px rgba(0, 240, 255, 0.2); }
        .qms-modal-buttons { display: flex; gap: 10px; justify-content: center; }
        .qms-modal-btn { padding: 12px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; transition: 0.2s; flex: 1; font-family: var(--font-main); }
        .btn-cancel { background: rgba(255,255,255,0.1); color: #fff; }
        .btn-cancel:hover { background: rgba(255,255,255,0.2); }
        .btn-confirm { background: var(--accent-main); color: #000; }
        .btn-danger-confirm { background: #ff4d4d; color: #fff; }
    `;
    document.head.appendChild(modalStyle);

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

    function showCustomPrompt(title, defaultValue, callback) {
        modalTitle.innerHTML = `<i class="ri-edit-2-line" style="color: var(--accent-main); font-size: 1.5rem; display:block; margin-bottom: 5px;"></i> ${title}`;
        modalInput.style.display = 'block'; modalInput.value = defaultValue;
        modalConfirm.className = 'qms-modal-btn btn-confirm'; modalConfirm.innerText = 'सेव करें';
        modalOverlay.classList.add('active'); setTimeout(() => modalInput.focus(), 100); currentCallback = callback;
    }

    function showCustomConfirm(title, callback) {
        modalTitle.innerHTML = `<i class="ri-error-warning-line" style="color: #ff4d4d; font-size: 2rem; display:block; margin-bottom: 5px;"></i> ${title}`;
        modalInput.style.display = 'none';
        modalConfirm.className = 'qms-modal-btn btn-danger-confirm'; modalConfirm.innerText = 'हाँ, लॉगआउट करें';
        modalOverlay.classList.add('active'); currentCallback = callback;
    }

    document.getElementById('qms-modal-cancel').addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalConfirm.addEventListener('click', () => {
        if (currentCallback) currentCallback(modalInput.style.display === 'none' ? true : modalInput.value);
        modalOverlay.classList.remove('active');
    });

    // ==========================================
    // 6. INITIAL DATA LOAD & THEME MANAGEMENT
    // ==========================================
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedName = localStorage.getItem('qms_user_name') || 'Student';
    document.getElementById('dash-user-name').innerText = savedName;
    document.getElementById('panel-user-name').innerText = savedName;

    const savedImg = localStorage.getItem('qms_profile_img');
    if(savedImg) {
        document.getElementById('dash-small-avatar').src = savedImg;
        document.getElementById('panel-profile-img').src = savedImg;
    }

    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedCount = Object.keys(completedData).length;
    document.getElementById('dash-completed-count').innerText = completedCount;
    document.getElementById('dash-total-xp').innerText = completedCount * 50;

    // ==========================================
    // 7. SETTINGS PANEL LOGIC
    // ==========================================
    const panel = document.getElementById('settings-panel');
    const overlay = document.getElementById('panel-overlay');
    function closePanel() { panel.classList.remove('active'); overlay.classList.remove('active'); }
    
    document.getElementById('open-panel-btn').addEventListener('click', () => { panel.classList.add('active'); overlay.classList.add('active'); });
    document.getElementById('close-panel').addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    // 8 Themes switching logic
    document.querySelectorAll('.theme-dot').forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-set-theme');
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('qms_theme', newTheme);
        });
    });

    // PDF and Video Prefs
    ['pdf-location-pref', 'video-quality-pref'].forEach(id => {
        const el = document.getElementById(id);
        const saved = localStorage.getItem(`qms_${id}`);
        if(saved) el.value = saved;
        el.addEventListener('change', (e) => localStorage.setItem(`qms_${id}`, e.target.value));
    });

    // ==========================================
    // 8. SOUND FX & PROFILE EDITS
    // ==========================================
    const sfxClick = document.getElementById('sfx-click');
    const soundToggle = document.getElementById('sound-toggle');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    
    // Custom Checkbox UI styling update
    function updateToggleUI(checkbox) {
        if(checkbox.checked) {
            checkbox.nextElementSibling.style.backgroundColor = 'var(--accent-main)';
            checkbox.nextElementSibling.style.boxShadow = '0 0 10px var(--accent-glow)';
        } else {
            checkbox.nextElementSibling.style.backgroundColor = 'rgba(255,255,255,0.1)';
            checkbox.nextElementSibling.style.boxShadow = 'none';
        }
    }
    
    soundToggle.checked = isSoundOn;
    updateToggleUI(soundToggle);
    
    soundToggle.addEventListener('change', (e) => {
        isSoundOn = e.target.checked; 
        localStorage.setItem('qms_sound', isSoundOn ? 'on' : 'off');
        updateToggleUI(e.target);
    });

    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSoundOn && sfxClick) { sfxClick.currentTime = 0; sfxClick.volume = 1.0; sfxClick.play().catch(()=>{}); }
        });
    });

    document.getElementById('img-upload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgBase64 = e.target.result;
                document.getElementById('dash-small-avatar').src = imgBase64;
                document.getElementById('panel-profile-img').src = imgBase64;
                localStorage.setItem('qms_profile_img', imgBase64);
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('edit-name-btn').addEventListener('click', function() {
        const currentName = localStorage.getItem('qms_user_name') || 'Student';
        showCustomPrompt("अपना नया नाम दर्ज करें", currentName, (newName) => {
            if(newName && newName.trim() !== "") {
                const cleanName = newName.trim();
                localStorage.setItem('qms_user_name', cleanName);
                document.getElementById('dash-user-name').innerText = cleanName;
                document.getElementById('panel-user-name').innerText = cleanName;
            }
        });
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        showCustomConfirm("चेतावनी<br>क्या आप लॉगआउट करना चाहते हैं?", (confirmed) => {
            if (confirmed) { window.location.href = "index.html"; }
        });
    });
});
