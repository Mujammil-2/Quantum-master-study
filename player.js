/* =================================================
   QMS VIDEO PLAYER ENGINE (Phase 7, 8 & 9)
   Auto NCERT PDF Fetching Enabled
================================================= */

// यहाँ मैंने NCERT के असली और सीधे (Direct) लिंक्स जोड़ दिए हैं!
const qmsDatabase = {
    physics: [
        { id: 1, title: "वैद्युत आवेश तथा क्षेत्र", subtitle: "Electric Charges and Fields", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph101.pdf" },
        { id: 2, title: "स्थिरवैद्युत विभव तथा धारिता", subtitle: "Electrostatic Potential & Capacitance", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph102.pdf" },
        { id: 3, title: "विद्युत धारा", subtitle: "Current Electricity", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph103.pdf" }
    ],
    chemistry: [
        { id: 1, title: "विलयन", subtitle: "Solutions", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech101.pdf" },
        { id: 2, title: "वैद्युतरसायन", subtitle: "Electrochemistry", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech102.pdf" },
        { id: 3, title: "रासायनिक बलगतिकी", subtitle: "Chemical Kinetics", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech103.pdf" }
    ],
    mathematics: [
        { id: 1, title: "संबंध एवं फलन", subtitle: "Relations and Functions", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh101.pdf" },
        { id: 2, title: "प्रतिलोम त्रिकोणमितीय फलन", subtitle: "Inverse Trigonometric Functions", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh102.pdf" },
        { id: 3, title: "आव्यूह", subtitle: "Matrices", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh103.pdf" }
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

    let currentChapter = { title: "अज्ञात अध्याय", subtitle: "Unknown Chapter", pdfUrl: "#" };
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
    // PHASE 9: DOWNLOAD NCERT NOTES (Smart Logic)
    // ==========================================
    const downloadBtn = document.querySelector('.btn-secondary');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if(currentChapter.pdfUrl && currentChapter.pdfUrl !== "#") {
                // यह सीधे NCERT की साइट से उस चैप्टर की PDF खोल देगा
                window.open(currentChapter.pdfUrl, '_blank');
            } else {
                alert("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।");
            }
        });
    }

    // ==========================================
    // PHASE 8: MARK COMPLETE LOGIC
    // ==========================================
    const markCompleteBtn = document.querySelector('.btn-primary-glow');
    
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let chapterKey = subject + '_' + chapterId;

    if (completedData[chapterKey]) {
        markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)';
        markCompleteBtn.style.background = '#00ff88'; 
        markCompleteBtn.style.color = '#000';
        markCompleteBtn.disabled = true;
    }

    markCompleteBtn.addEventListener('click', () => {
        if (!completedData[chapterKey]) {
            completedData[chapterKey] = true;
            localStorage.setItem('qms_completed', JSON.stringify(completedData)); 
            
            markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)';
            markCompleteBtn.style.background = '#00ff88'; 
            markCompleteBtn.style.color = '#000';
            markCompleteBtn.disabled = true;

            alert('🎉 बधाई हो! आपने यह अध्याय पूरा कर लिया है। आपको 50 XP मिले!');
        }
    });
});
