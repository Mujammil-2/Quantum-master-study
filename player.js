/* =================================================
   QMS VIDEO PLAYER ENGINE (Live PDF Reader Fixed)
================================================= */

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

    // प्रोफाइल फोटो लोड करना 
    const savedImg = localStorage.getItem('qms_profile_img');
    if(savedImg) {
        const navImg = document.getElementById('nav-profile-img');
        if(navImg) navImg.src = savedImg;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject') || 'physics';
    const chapterId = parseInt(urlParams.get('chapter')) || 1;

    document.getElementById('back-to-chapters').addEventListener('click', () => {
        window.location.href = `chapters.html?subject=${subject}`;
    });

    let currentChapter = { title: "अज्ञात अध्याय", subtitle: "Unknown", pdfUrl: "#" };
    if(qmsDatabase[subject]) {
        const found = qmsDatabase[subject].find(ch => ch.id === chapterId);
        if(found) currentChapter = found;
    }

    document.getElementById('player-subject-tag').innerText = subject.toUpperCase();
    document.getElementById('player-chapter-title').innerText = currentChapter.title;
    document.getElementById('player-chapter-subtitle').innerText = currentChapter.subtitle;

    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';

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
    // 1. PDF View and Download Logic (Live Fix)
    // ==========================================
    const viewBtn = document.getElementById('btn-view-notes');
    const downloadBtn = document.getElementById('btn-download-notes');

    if (viewBtn && downloadBtn) {
        
        // 'पढ़ें' (View) बटन - Google Docs के लाइव रीडर में खुलेगा (बिना डाउनलोड हुए)
        viewBtn.addEventListener('click', () => {
            if(currentChapter.pdfUrl !== "#") {
                // यह सबसे बेस्ट तरीका है लाइव PDF दिखाने का!
                const liveReaderUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(currentChapter.pdfUrl)}`;
                window.open(liveReaderUrl, '_blank');
            } else {
                alert("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।");
            }
        });

        // 'डाउनलोड' (Download) बटन - फोन में डायरेक्ट डाउनलोड करेगा
        downloadBtn.addEventListener('click', () => {
            if(currentChapter.pdfUrl !== "#") {
                const link = document.createElement('a');
                link.href = currentChapter.pdfUrl;
                link.download = `QMS_${subject}_Chapter_${chapterId}_Notes.pdf`;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।");
            }
        });
    }

    // ==========================================
    // 2. Mark Complete Logic
    // ==========================================
    const markCompleteBtn = document.getElementById('mark-complete-btn');
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
        }
    });
});
