/* =================================================
   QMS SUBJECTS ENGINE (Phase 4)
================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // थीम लोड करना
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // क्लास सिलेक्टर लॉजिक (11th / 12th)
    const classBtns = document.querySelectorAll('.class-btn');
    
    classBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // एक्टिव क्लास हटाना
            classBtns.forEach(b => b.classList.remove('active'));
            // जिस पर क्लिक किया उसे एक्टिव करना
            e.target.classList.add('active');
            
            // यहाँ बाद में डेटाबेस से 11वीं या 12वीं का सिलेबस लोड करने का लॉजिक आएगा
            const selectedClass = e.target.getAttribute('data-class');
            console.log(`Class ${selectedClass} selected`);
        });
    });

    // बटन्स पर साउंड इफ़ेक्ट
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

});
