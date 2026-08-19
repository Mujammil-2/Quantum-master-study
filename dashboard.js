/* =================================================
   QMS DASHBOARD ENGINE (Phase 3 & 8)
================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

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
    // PHASE 8: LOAD PROGRESS DATA ON DASHBOARD
    // ==========================================
    
    // फोन से पढ़ना कि कितने चैप्टर पूरे हुए हैं
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    
    // कुल पूर्ण हुए चैप्टर्स की गिनती
    let completedCount = Object.keys(completedData).length;
    
    // XP पॉइंट्स (हर चैप्टर के 50 पॉइंट्स)
    let totalXP = completedCount * 50;

    // डैशबोर्ड के नंबर्स अपडेट करना
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        statNumbers[2].innerText = completedCount; // ✅ पूर्ण किए गए
        statNumbers[3].innerText = totalXP;        // 🏆 कुल पॉइंट्स (XP)
    }

    // स्ट्रीक (Streak) का लॉजिक
    const streakBadge = document.querySelector('.streak-badge span');
    if (streakBadge) {
        let currentStreak = localStorage.getItem('qms_streak') || 1;
        streakBadge.innerText = currentStreak + " दिन";
    }

    // दैनिक लक्ष्य (Goal) का प्रोग्रेस बार भरना
    setTimeout(() => {
        const goalFill = document.querySelector('.progress-fill');
        if(goalFill) {
            let progressPercent = (completedCount * 25) + 10; 
            if(progressPercent > 100) progressPercent = 100;
            goalFill.style.width = progressPercent + '%';
        }
    }, 500);
});
