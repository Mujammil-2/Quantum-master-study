/* =================================================
   QMS DASHBOARD ENGINE (Smart Panel Integrated)
================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. INITIAL LOAD (Theme, Name, Avatar) ---
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

    // Load Stats
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedCount = Object.keys(completedData).length;
    document.getElementById('dash-completed-count').innerText = completedCount;
    document.getElementById('dash-total-xp').innerText = completedCount * 50;

    // --- 2. SOUND EFFECTS ---
    const sfxClick = document.getElementById('sfx-click');
    const soundToggle = document.getElementById('sound-toggle');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    soundToggle.checked = isSoundOn;

    soundToggle.addEventListener('change', (e) => {
        isSoundOn = e.target.checked;
        localStorage.setItem('qms_sound', isSoundOn ? 'on' : 'off');
    });

    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSoundOn && sfxClick) {
                sfxClick.currentTime = 0; sfxClick.volume = 0.4; sfxClick.play().catch(()=>{});
            }
        });
    });

    // --- 3. PANEL OPEN/CLOSE LOGIC ---
    const panel = document.getElementById('settings-panel');
    const overlay = document.getElementById('panel-overlay');
    const openBtn = document.getElementById('open-panel-btn');
    const closeBtn = document.getElementById('close-panel');

    function openPanel() { panel.classList.add('active'); overlay.classList.add('active'); }
    function closePanel() { panel.classList.remove('active'); overlay.classList.remove('active'); }

    openBtn.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    // --- 4. LIVE UPDATE: IMAGE UPLOAD ---
    const imgUploadInput = document.getElementById('img-upload');
    imgUploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgBase64 = e.target.result;
                // Update both places instantly!
                document.getElementById('dash-small-avatar').src = imgBase64;
                document.getElementById('panel-profile-img').src = imgBase64;
                localStorage.setItem('qms_profile_img', imgBase64);
            };
            reader.readAsDataURL(file);
        }
    });

    // --- 5. LIVE UPDATE: NAME CHANGE ---
    const editNameBtn = document.getElementById('edit-name-btn');
    editNameBtn.addEventListener('click', function() {
        const currentSavedName = localStorage.getItem('qms_user_name') || 'Alina Sami';
        const newName = prompt("अपना नया नाम दर्ज करें:", currentSavedName);
        if(newName && newName.trim() !== "") {
            const cleanName = newName.trim();
            localStorage.setItem('qms_user_name', cleanName);
            // Update both places instantly!
            document.getElementById('dash-user-name').innerText = cleanName;
            document.getElementById('panel-user-name').innerText = cleanName;
        }
    });

    // --- 6. LIVE UPDATE: THEME CHANGE ---
    document.querySelectorAll('.theme-dot').forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-set-theme');
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('qms_theme', newTheme);
        });
    });

    // --- 7. RESET LOGIC ---
    document.getElementById('reset-btn').addEventListener('click', () => {
        if(confirm("चेतावनी: क्या आप सच में अपनी सारी प्रोग्रेस डिलीट करना चाहते हैं?")) {
            localStorage.clear();
            window.location.href = "index.html"; 
        }
    });
});
