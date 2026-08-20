/* =================================================
   QMS PROFILE ENGINE (Live Theme Update Fixed)
================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. पेज लोड होते ही पुरानी सेव की हुई थीम लागू करना
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

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
                sfxClick.currentTime = 0;
                sfxClick.volume = 0.4;
                sfxClick.play().catch(() => {});
            }
        });
    });

    // Name Logic
    const userNameElement = document.getElementById('user-display-name');
    const editNameBtn = document.getElementById('edit-name-btn');
    const savedName = localStorage.getItem('qms_user_name') || 'Alina Sami';
    userNameElement.innerText = savedName;

    editNameBtn.addEventListener('click', function() {
        const newName = prompt("अपना नया नाम दर्ज करें:", savedName);
        if(newName && newName.trim() !== "") {
            localStorage.setItem('qms_user_name', newName.trim());
            userNameElement.innerText = newName.trim();
        }
    });

    // Profile Image Logic (Gallery Upload)
    const profileImgElement = document.getElementById('user-profile-img');
    const imgUploadInput = document.getElementById('img-upload');
    const savedImg = localStorage.getItem('qms_profile_img');
    
    if (savedImg) {
        profileImgElement.src = savedImg;
    }

    imgUploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgBase64 = e.target.result;
                profileImgElement.src = imgBase64;
                localStorage.setItem('qms_profile_img', imgBase64);
            };
            reader.readAsDataURL(file);
        }
    });

    // Stats Logic
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedCount = Object.keys(completedData).length;
    document.getElementById('profile-xp').innerText = completedCount * 50;
    document.getElementById('profile-completed').innerText = completedCount;

    // ==========================================
    // THEME LOGIC (यहाँ तुरंत थीम बदलेगी)
    // ==========================================
    document.querySelectorAll('.theme-dot').forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = btn.getAttribute('data-set-theme');
            
            // 1. तुरंत इस पेज (profile) की थीम बदलो
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // 2. ब्राउज़र की मेमोरी में सेव करो ताकि बाकी पेज भी बदल जाएं
            localStorage.setItem('qms_theme', newTheme);
        });
    });

    // Medium logic
    const savedMedium = localStorage.getItem('qms_medium') || 'hindi';
    if(savedMedium === 'english') {
        document.getElementById('med-english').checked = true;
    }
    document.querySelectorAll('input[name="medium"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            localStorage.setItem('qms_medium', e.target.value);
        });
    });

    // Reset Logic
    document.getElementById('reset-btn').addEventListener('click', () => {
        if(confirm("चेतावनी: क्या आप सच में अपनी सारी प्रोग्रेस डिलीट करना चाहते हैं?")) {
            localStorage.clear();
            alert("डेटा रीसेट कर दिया गया है।");
            window.location.href = "index.html"; // रीसेट होने पर सीधा लॉगिन पेज पर भेज दो
        }
    });
});
