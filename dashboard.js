/* =================================================
   QMS DASHBOARD ENGINE (Pro Version with Particles)
================================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. BACKGROUND PARTICLES LOGIC ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedY = Math.random() * -0.5 - 0.1;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.y += this.speedY;
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create 70 particles for premium feel
    for (let i = 0; i < 70; i++) { particlesArray.push(new Particle()); }
    
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

    // --- 2. PREMIUM CUSTOM MODALS ---
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
        .btn-confirm:hover { box-shadow: 0 0 15px var(--accent-glow); }
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
        modalConfirm.className = 'qms-modal-btn btn-danger-confirm'; modalConfirm.innerText = 'हाँ, डिलीट करें';
        modalOverlay.classList.add('active'); currentCallback = callback;
    }

    document.getElementById('qms-modal-cancel').addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalConfirm.addEventListener('click', () => {
        if (currentCallback) currentCallback(modalInput.style.display === 'none' ? true : modalInput.value);
        modalOverlay.classList.remove('active');
    });

    // --- 3. LOAD USER DATA ---
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedName = localStorage.getItem('qms_user_name') || 'Alina Sami';
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

    // --- 4. PANEL OPEN/CLOSE LOGIC ---
    const panel = document.getElementById('settings-panel');
    const overlay = document.getElementById('panel-overlay');
    function closePanel() { panel.classList.remove('active'); overlay.classList.remove('active'); }
    
    document.getElementById('open-panel-btn').addEventListener('click', () => { panel.classList.add('active'); overlay.classList.add('active'); });
    document.getElementById('close-panel').addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    // --- 5. SETTINGS: THEMES (8 Colors) ---
    document.querySelectorAll('.theme-dot').forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-set-theme');
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('qms_theme', newTheme);
        });
    });

    // --- 6. SETTINGS: PDF LOCATION ---
    const pdfPref = document.getElementById('pdf-location-pref');
    const savedPdfPref = localStorage.getItem('qms_pdf_pref') || 'default';
    pdfPref.value = savedPdfPref;
    pdfPref.addEventListener('change', (e) => {
        localStorage.setItem('qms_pdf_pref', e.target.value);
    });

    // --- 7. SETTINGS: SOUND & PROFILE EDITS ---
    const sfxClick = document.getElementById('sfx-click');
    const soundToggle = document.getElementById('sound-toggle');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    soundToggle.checked = isSoundOn;
    soundToggle.addEventListener('change', (e) => {
        isSoundOn = e.target.checked; localStorage.setItem('qms_sound', isSoundOn ? 'on' : 'off');
    });

    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSoundOn && sfxClick) { sfxClick.currentTime = 0; sfxClick.volume = 0.4; sfxClick.play().catch(()=>{}); }
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
        const currentName = localStorage.getItem('qms_user_name') || 'Alina Sami';
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
        showCustomConfirm("चेतावनी<br>क्या आप सच में अपना सारा डेटा और प्रोग्रेस डिलीट करना चाहते हैं?", (confirmed) => {
            if (confirmed) { localStorage.clear(); window.location.href = "index.html"; }
        });
    });
});
