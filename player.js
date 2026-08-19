/* =================================================
   QMS VIDEO PLAYER ENGINE (Phase 7)
================================================= */

// वही मिनी-डेटाबेस ताकि हम चैप्टर का नाम दिखा सकें
const qmsDatabase = {
    physics: [
        { id: 1, title: "वैद्युत आवेश तथा क्षेत्र", subtitle: "Electric Charges and Fields" },
        { id: 2, title: "स्थिरवैद्युत विभव तथा धारिता", subtitle: "Electrostatic Potential & Capacitance" },
        { id: 3, title: "विद्युत धारा", subtitle: "Current Electricity" }
    ],
    chemistry: [
        { id: 1, title: "विलयन", subtitle: "Solutions" },
        { id: 2, title: "वैद्युतरसायन", subtitle: "Electrochemistry" },
        { id: 3, title: "रासायनिक बलगतिकी", subtitle: "Chemical Kinetics" }
    ],
    mathematics: [
        { id: 1, title: "संबंध एवं फलन", subtitle: "Relations and Functions" },
        { id: 2, title: "प्रतिलोम त्रिकोणमितीय फलन", subtitle: "Inverse Trigonometric Functions" },
        { id: 3, title: "आव्यूह", subtitle: "Matrices" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    
    // थीम सेट करना
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // URL से सब्जेक्ट और चैप्टर ID पढ़ना
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject') || 'physics';
    const chapterId = parseInt(urlParams.get('chapter')) || 1;

    // बैक बटन को सही पेज पर भेजना
    const backBtn = document.getElementById('back-to-chapters');
    if(backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = `chapters.html?subject=${subject}`;
        });
    }

    // डेटाबेस से चैप्टर की डिटेल्स खोजना
    let currentChapter = { title: "अज्ञात अध्याय", subtitle: "Unknown Chapter" };
    if(qmsDatabase[subject]) {
        const found = qmsDatabase[subject].find(ch => ch.id === chapterId);
        if(found) currentChapter = found;
    }

    // पेज पर डिटेल्स अपडेट करना
    document.getElementById('player-subject-tag').innerText = subject.toUpperCase();
    document.getElementById('player-chapter-title').innerText = currentChapter.title;
    document.getElementById('player-chapter-subtitle').innerText = currentChapter.subtitle;

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
