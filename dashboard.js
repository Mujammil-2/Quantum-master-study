/* =================================================
   QMS DASHBOARD ENGINE (Phase 2)
================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // थीम को लोकल स्टोरेज से लेकर अप्लाई करना (ताकि डैशबोर्ड पर भी थीम सेम रहे)
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // साउंड इफ़ेक्ट (बटन्स के लिए)
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

    // प्रोग्रेस बार का एनीमेशन (दैनिक लक्ष्य)
    setTimeout(() => {
        const goalFill = document.querySelector('.progress-fill');
        if(goalFill) {
            goalFill.style.width = '10%'; // डमी डेटा, बाद में डेटाबेस से आएगा
        }
    }, 500);

});
