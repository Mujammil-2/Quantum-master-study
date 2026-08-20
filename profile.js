/* =================================================
   QMS PROFILE ENGINE (Phase 10 - Pro Update)
================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // थीम लोड करना
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // ==========================================
    // 1. SOUND LOGIC (साउंड सेटिंग्स)
    // ==========================================
    const sfxClick = document.getElementById('sfx-click');
    const soundToggle = document.getElementById('sound-toggle');
    
    // पुराना साउंड स्टेट लोड करो
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    soundToggle.checked = isSoundOn;

    soundToggle.addEventListener('change', (e) => {
        isSoundOn = e.target.checked;
        localStorage.setItem('qms_sound', isSoundOn ? 'on' : 'off');
    });

    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSoundOn && sfxClick) {
                sfxClick.currentTime = 0;
                sfxClick.volume = 0.4;
                sfxClick.play().catch(() => {});
            }
        });
    });

    // ==========================================
    // 2. NAME & PROFILE PICTURE (कस्टम फोटो और नाम)
    // ==========================================
    const userNameElement = document.getElementById('user-display-name');
    const editNameBtn = document.getElementById('edit-name-btn');
    const profileImgElement = document.getElementById('user-profile-img');
    const imgUploadInput = document.getElementById('img-upload');

    // नाम लोड करना
    const savedName = localStorage.getItem('qms_user_name') || 'Alina Sami';
    // innerHTML का इस्तेमाल ताकि edit icon बना रहे
    userNameElement.innerHTML = `${savedName} <i class="ri-edit-circle-fill edit-icon sfx-trigger" id="edit-name-btn" title="नाम बदलें"></i>`;

    // नाम बदलने का लॉजिक
    document.addEventListener('click', function(e) {
        if(e.target && e.target.id === 'edit-name-btn'){
            const newName = prompt("अपना नया नाम दर्ज करें:", savedName);
            if(newName && newName.trim() !== "") {
                localStorage.setItem('qms_user_name', newName.trim());
                userNameElement.innerHTML = `${newName.trim()} <i class="ri-edit-circle-fill edit-icon sfx-trigger" id="edit-name-btn" title="नाम बदलें"></i>`;
            }
        }
    });

    // फोटो लोड करना
    const savedImg = localStorage.getItem('qms_profile_img');
    if (savedImg) {
        profileImgElement.src = savedImg;
    }

    // नई फोटो अपलोड करने का लॉजिक (फोन की गैलरी से)
    imgUploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgBase64 = e.target.result;
                profileImgElement.src = imgBase64;
                // फोटो को फोन में सेव करना
                localStorage.setItem('qms_profile_img', imgBase64);
            };
            reader.readAsDataURL(file);
        }
    });

    // ==========================================
    // 3. प्रोग्रेस (XP & Chapters)
    // ==========================================
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedCount = Object.keys(completedData).length;
    let totalXP = completedCount * 50;

    document.getElementById('profile-xp').innerText = totalXP;
    document.getElementById('profile-completed').innerText = completedCount;

    // ==========================================
    // 4. थीम चेंजर लॉजिक (Theme Settings)
    // ==========================================
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-set-theme');
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('qms_theme', newTheme);
        });
    });

    // ==========================================
    // 5. स्टडी मीडियम टॉगल (Hindi/English)
    // ==========================================
    const savedMedium = localStorage.getItem('qms_medium') || 'hindi';
    if(savedMedium === 'english') {
        document.getElementById('med-english').checked = true;
    }

    document.querySelectorAll('input[name="medium"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            localStorage.setItem('qms_medium', e.target.value);
            // यहाँ तुम बाद में पेज रीलोड करा सकते हो ताकि भाषा बदल जाए
        });
    });

    // ==========================================
    // 6. अकाउंट रीसेट (Clear Data)
    // ==========================================
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', () => {
        const confirmReset = confirm("चेतावनी: क्या आप सच में अपनी सारी प्रोग्रेस और सेटिंग्स डिलीट करना चाहते हैं?");
        if(confirmReset) {
            localStorage.clear(); // पूरा डेटा साफ़
            alert("आपका डेटा रीसेट कर दिया गया है।");
            window.location.reload(); 
        }
    });

});
