/* =================================================
   QMS VIDEO PLAYER ENGINE (Phase 7 & 8)
================================================= */

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
    
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject') || 'physics';
    const chapterId = parseInt(urlParams.get('chapter')) || 1;

    const backBtn = document.getElementById('back-to-chapters');
    if(backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = `chapters.html?subject=${subject}`;
        });
    }

    let currentChapter = { title: "अज्ञात अध्याय", subtitle: "Unknown Chapter" };
    if(qmsDatabase[subject]) {
        const found = qmsDatabase[subject].find(ch => ch.id === chapterId);
        if(found) currentChapter = found;
    }

    document.getElementById('player-subject-tag').innerText = subject.toUpperCase();
    document.getElementById('player-chapter-title').innerText = currentChapter.title;
    document.getElementById('player-chapter-subtitle').innerText = currentChapter.subtitle;

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
    // PHASE 8: MARK COMPLETE LOGIC
    // ==========================================
    const markCompleteBtn = document.querySelector('.btn-primary-glow');
    
    // लोकल स्टोरेज से चेक करना कि क्या ये चैप्टर पहले से पूरा है?
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let chapterKey = subject + '_' + chapterId;

    // अगर पहले से पूरा है, तो बटन को हरा कर दो
    if (completedData[chapterKey]) {
        markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)';
        markCompleteBtn.style.background = '#00ff88'; // Green color
        markCompleteBtn.style.color = '#000';
        markCompleteBtn.disabled = true;
    }

    // जब यूजर 'Mark Complete' बटन दबाए
    markCompleteBtn.addEventListener('click', () => {
        if (!completedData[chapterKey]) {
            completedData[chapterKey] = true;
            localStorage.setItem('qms_completed', JSON.stringify(completedData)); // फोन में सेव करना
            
            // बटन का डिज़ाइन बदलना
            markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)';
            markCompleteBtn.style.background = '#00ff88'; 
            markCompleteBtn.style.color = '#000';
            markCompleteBtn.disabled = true;

            alert('🎉 बधाई हो! आपने यह अध्याय पूरा कर लिया है। आपको 50 XP मिले!');
        }
    });
});
