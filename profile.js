/* =================================================
   QMS PROFILE ENGINE (Phase 10)
================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // थीम लोड करना
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // साउंड इफ़ेक्ट
    const sfxClick = document.getElementById('sfx-click');
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (sfxClick) {
                sfxClick.currentTime = 0;
                sfxClick.volume = 0.4;
                sfxClick.play().catch(() => {});
            }
        });
    });

    // ==========================================
    // 1. लोड प्रोग्रेस (XP & Completed Chapters)
    // ==========================================
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedCount = Object.keys(completedData).length;
    let totalXP = completedCount * 50;

    document.getElementById('profile-xp').innerText = totalXP;
    document.getElementById('profile-completed').innerText = completedCount;

    // ==========================================
    // 2. थीम चेंजर लॉजिक (Theme Settings)
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
    // 3. स्टडी मीडियम टॉगल (Hindi/English)
    // ==========================================
    const mediumSelector = document.getElementById('medium-selector');
    const savedMedium = localStorage.getItem('qms_medium') || 'hindi';
    mediumSelector.value = savedMedium; // पुराना सेव किया हुआ मीडियम दिखाओ

    mediumSelector.addEventListener('change', (e) => {
        const selectedMedium = e.target.value;
        localStorage.setItem('qms_medium', selectedMedium);
        // नोट: इसका असली इस्तेमाल हम Database वाले Phase में करेंगे
    });

    // ==========================================
    // 4. अकाउंट रीसेट (Clear Data)
    // ==========================================
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', () => {
        const confirmReset = confirm("चेतावनी: क्या आप सच में अपनी सारी प्रोग्रेस और XP डिलीट करना चाहते हैं?");
        if(confirmReset) {
            localStorage.removeItem('qms_completed');
            localStorage.removeItem('qms_streak');
            alert("आपका डेटा रीसेट कर दिया गया है।");
            window.location.reload(); // पेज रिफ्रेश करो
        }
    });

});
