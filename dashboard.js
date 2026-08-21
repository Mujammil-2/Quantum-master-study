/* =========================================================================
   QMS DASHBOARD MASTER ENGINE (Profile Image Fix & Particles)
========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SPLASH SCREEN LOGIC ---
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

    // --- 2. DYNAMIC GREETING & QUOTES ---
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
        "ज्ञान वह निवेश है जिसका मुनाफा जीवन भर मिलता है।"
    ];
    document.getElementById('daily-quote').innerText = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;

    // --- 3. POMODORO TIMER ---
    let timerInterval; let timeLeft = 25 * 60; let isTimerRunning = false;
    const timerDisplay = document.getElementById('timer-display');
    const timerStartBtn = document.getElementById('timer-start-btn');
    const timerResetBtn = document.getElementById('timer-reset-btn');

    function updateTimerDisplay() {
        const m = Math.floor(timeLeft / 60); const s = timeLeft % 60;
        timerDisplay.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    timerStartBtn.addEventListener('click', () => {
        if (!isTimerRunning) {
            isTimerRunning = true; timerStartBtn.innerText = "पॉज़ (Pause)"; timerStartBtn.style.background = "#ffc107";
            timerInterval = setInterval(() => {
                if (timeLeft > 0) { timeLeft--; updateTimerDisplay(); } 
                else { clearInterval(timerInterval); isTimerRunning = false; alert("शानदार! ब्रेक लें।"); timeLeft = 25 * 60; updateTimerDisplay(); timerStartBtn.innerText = "स्टार्ट (Start)"; timerStartBtn.style.background = "var(--accent-main)"; }
            }, 1000);
        } else {
            clearInterval(timerInterval); isTimerRunning = false; timerStartBtn.innerText = "रिज्यूम (Resume)"; timerStartBtn.style.background = "var(--accent-main)";
        }
    });
    timerResetBtn.addEventListener('click', () => { clearInterval(timerInterval); isTimerRunning = false; timeLeft = 25 * 60; updateTimerDisplay(); timerStartBtn.innerText = "स्टार्ट (Start)"; timerStartBtn.style.background = "var(--accent-main)"; });

    // --- 4. FIREFLY PARTICLES (GLOWING SYMBOLS) ---
    const canvas = document.getElementById('bg-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        const scienceSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let particlesArray = [];
        class FireflyParticle {
            constructor() {
                this.symbol = scienceSymbols[Math.floor(Math.random() * scienceSymbols.length)];
                this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
                this.size = Math.random() * 15 + 10;
                this.speedX = Math.random() * 0.5 - 0.25; this.speedY = Math.random() * -0.8 - 0.2;
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
                ctx.font = `${this.size}px "Space Grotesk", sans-serif`; ctx.fillText(this.symbol, this.x, this.y);
                ctx.shadowBlur = 0;
            }
        }
        for (let i = 0; i < 50; i++) particlesArray.push(new FireflyParticle());
        function animateParticles() { ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animateParticles); }
        animateParticles();
        window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
    }

    // --- 5. INITIAL DATA LOAD (THEME & NAME) ---
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const savedName = localStorage.getItem('qms_user_name') || 'Student';
    document.getElementById('dash-user-name').innerText = savedName; document.getElementById('panel-user-name').innerText = savedName;
    
    // --- 6. PROFILE IMAGE LOAD ---
    const savedImg = localStorage.getItem('qms_profile_img');
    if(savedImg) {
        document.getElementById('dash-small-avatar').src = savedImg; document.getElementById('panel-profile-img').src = savedImg;
    }

    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedCount = Object.keys(completedData).length;
    document.getElementById('dash-completed-count').innerText = completedCount;
    document.getElementById('dash-total-xp').innerText = completedCount * 50;

    // --- 7. PANEL LOGIC & THEMES ---
    const panel = document.getElementById('settings-panel'); const overlay = document.getElementById('panel-overlay');
    function closePanel() { panel.classList.remove('active'); overlay.classList.remove('active'); }
    document.getElementById('open-panel-btn').addEventListener('click', () => { panel.classList.add('active'); overlay.classList.add('active'); });
    document.getElementById('close-panel').addEventListener('click', closePanel); overlay.addEventListener('click', closePanel);

    document.querySelectorAll('.theme-dot').forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-set-theme');
            document.documentElement.setAttribute('data-theme', newTheme); localStorage.setItem('qms_theme', newTheme);
        });
    });

    ['pdf-location-pref', 'video-quality-pref'].forEach(id => {
        const el = document.getElementById(id); const saved = localStorage.getItem(`qms_${id}`); if(saved) el.value = saved;
        el.addEventListener('change', (e) => localStorage.setItem(`qms_${id}`, e.target.value));
    });

    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => { if (isSoundOn && sfxClick) { sfxClick.currentTime = 0; sfxClick.volume = 1.0; sfxClick.play().catch(()=>{}); } });
    });

    // --- 8. FIX: COMPRESS AND SAVE PROFILE IMAGE ---
    document.getElementById('img-upload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    // Resize to 200x200 (compresses big 5MB photos into tiny sizes so localStorage NEVER fails)
                    const tempCanvas = document.createElement('canvas');
                    const tCtx = tempCanvas.getContext('2d');
                    const maxDim = 200;
                    let width = img.width; let height = img.height;
                    if (width > height) { if (width > maxDim) { height *= maxDim / width; width = maxDim; } } 
                    else { if (height > maxDim) { width *= maxDim / height; height = maxDim; } }
                    tempCanvas.width = width; tempCanvas.height = height;
                    tCtx.drawImage(img, 0, 0, width, height);
                    
                    const compressedBase64 = tempCanvas.toDataURL('image/jpeg', 0.8);
                    document.getElementById('dash-small-avatar').src = compressedBase64;
                    document.getElementById('panel-profile-img').src = compressedBase64;
                    
                    try {
                        localStorage.setItem('qms_profile_img', compressedBase64); // Now it will save permanently!
                    } catch(error) { alert("Error saving image."); }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Edit Name
    document.getElementById('edit-name-btn').addEventListener('click', function() {
        const currentName = localStorage.getItem('qms_user_name') || 'Student';
        const newName = prompt("अपना नया नाम दर्ज करें:", currentName);
        if(newName && newName.trim() !== "") {
            const cleanName = newName.trim();
            localStorage.setItem('qms_user_name', cleanName);
            document.getElementById('dash-user-name').innerText = cleanName; document.getElementById('panel-user-name').innerText = cleanName;
        }
    });
});
