/* =================================================
   QMS DYNAMIC CHAPTERS ENGINE (Premium Toast Fix)
================================================= */

// Global Premium Toast Function
window.showPremiumToast = function(message) {
    const toast = document.createElement('div');
    toast.innerHTML = `<i class="ri-lock-fill"></i> ${message}`;
    toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
        background: #ff4d4d; color: #fff; padding: 12px 24px;
        border-radius: 50px; font-weight: 600; font-family: var(--font-main);
        box-shadow: 0 10px 30px rgba(255, 77, 77, 0.4); z-index: 10000;
        display: flex; align-items: center; gap: 8px; font-size: 0.95rem;
        animation: slideUp 0.4s ease forwards; white-space: nowrap;
    `;
    
    if(!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.innerHTML = `@keyframes slideUp { from { opacity: 0; bottom: -20px; } to { opacity: 1; bottom: 30px; } }`;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000); 
};


const qmsDatabase = {
    physics: [
        { id: 1, title: "वैद्युत आवेश तथा क्षेत्र", subtitle: "Electric Charges and Fields", time: "45 Min" },
        { id: 2, title: "स्थिरवैद्युत विभव तथा धारिता", subtitle: "Electrostatic Potential & Capacitance", time: "50 Min" },
        { id: 3, title: "विद्युत धारा", subtitle: "Current Electricity", time: "60 Min" },
        { id: 4, title: "गतिमान आवेश और चुंबकत्व", subtitle: "Moving Charges and Magnetism", time: "55 Min" },
        { id: 5, title: "चुंबकत्व एवं द्रव्य", subtitle: "Magnetism and Matter", time: "40 Min" }
    ],
    chemistry: [
        { id: 1, title: "विलयन", subtitle: "Solutions", time: "40 Min" },
        { id: 2, title: "वैद्युतरसायन", subtitle: "Electrochemistry", time: "55 Min" },
        { id: 3, title: "रासायनिक बलगतिकी", subtitle: "Chemical Kinetics", time: "45 Min" },
        { id: 4, title: "d- एवं f- ब्लॉक के तत्व", subtitle: "d- and f- Block Elements", time: "50 Min" }
    ],
    mathematics: [
        { id: 1, title: "संबंध एवं फलन", subtitle: "Relations and Functions", time: "50 Min" },
        { id: 2, title: "प्रतिलोम त्रिकोणमितीय फलन", subtitle: "Inverse Trigonometric Functions", time: "40 Min" },
        { id: 3, title: "आव्यूह", subtitle: "Matrices", time: "60 Min" },
        { id: 4, title: "सारणिक", subtitle: "Determinants", time: "65 Min" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const urlParams = new URLSearchParams(window.location.search);
    let subject = urlParams.get('subject');
    
    if(!subject || !qmsDatabase[subject]) {
        subject = 'physics'; 
    }

    const title = document.getElementById('subject-title');
    const subtitle = document.getElementById('subject-subtitle');
    const icon = document.getElementById('hero-icon');
    const heroCard = document.getElementById('subject-hero-card');
    const chapterListContainer = document.getElementById('dynamic-chapter-list');
    
    const totalCountText = document.getElementById('total-chapters-count');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-stats span:nth-child(2)');

    // Theme Update
    if (subject === 'chemistry') {
        title.innerText = 'रसायन विज्ञान';
        subtitle.innerText = 'Chemistry (PCM)';
        icon.innerHTML = '<i class="ri-test-tube-fill"></i>';
        heroCard.style.borderTopColor = '#b535ff';
        icon.style.color = '#b535ff';
        icon.style.boxShadow = '0 0 20px rgba(181,53,255,0.4)';
    } else if (subject === 'mathematics') {
        title.innerText = 'गणित';
        subtitle.innerText = 'Mathematics (PCM)';
        icon.innerHTML = '<i class="ri-functions"></i>';
        heroCard.style.borderTopColor = '#00ff88';
        icon.style.color = '#00ff88';
        icon.style.boxShadow = '0 0 20px rgba(0,255,136,0.4)';
    } 

    const chapters = qmsDatabase[subject];
    totalCountText.innerText = `कुल अध्याय: ${chapters.length}`;

    // Progress logic
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedSubjectChapters = 0;

    chapters.forEach(chap => {
        let chapterKey = subject + '_' + chap.id;
        if(completedData[chapterKey]) { completedSubjectChapters++; }
    });

    let progressPercentage = Math.round((completedSubjectChapters / chapters.length) * 100);
    progressFill.style.width = progressPercentage + '%';
    progressText.innerText = progressPercentage + '% पूर्ण';

    // Chapter List Logic
    chapterListContainer.innerHTML = ''; 

    chapters.forEach(chap => {
        let chapNumStr = chap.id < 10 ? `0${chap.id}` : chap.id;
        
        let isLocked = false;
        if (chap.id > 1) {
            let prevChapterKey = subject + '_' + (chap.id - 1);
            if (!completedData[prevChapterKey]) {
                isLocked = true; 
            }
        }

        let lockedClass = isLocked ? 'locked' : '';
        let numIcon = isLocked ? '<i class="ri-lock-fill"></i>' : chapNumStr;
        
        // NO MORE UGLY ALERT! Calling the new premium toast instead
        let onClickAction = isLocked 
            ? `showPremiumToast('यह अध्याय लॉक है! पहले अध्याय ${chap.id - 1} पूरा करें।')` 
            : `window.location.href='player.html?subject=${subject}&chapter=${chap.id}'`;
        
        let thisChapterKey = subject + '_' + chap.id;
        let isCompleted = completedData[thisChapterKey] ? true : false;
        
        let btnIcon = isCompleted ? '<i class="ri-check-double-line"></i>' : '<i class="ri-play-fill"></i>';
        let btnStyle = isCompleted ? 'background: #00ff88; color: #000;' : '';

        let cardHTML = `
            <div class="chapter-card glass-card ${lockedClass} sfx-trigger" onclick="${onClickAction}">
                <div class="chap-num">${numIcon}</div>
                <div class="chap-details">
                    <h4>${chap.title}</h4>
                    <p>${chap.subtitle}</p>
                    <div class="chap-meta">
                        <span><i class="ri-time-line"></i> ${chap.time}</span>
                        <span><i class="ri-play-circle-line"></i> Video</span>
                    </div>
                </div>
                <button class="btn-play" style="${btnStyle}">${btnIcon}</button>
            </div>
        `;
        chapterListContainer.innerHTML += cardHTML;
    });

    // Sound logic
    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSoundOn && sfxClick) {
                sfxClick.currentTime = 0; sfxClick.volume = 0.4; sfxClick.play().catch(() => {});
            }
        });
    });
});
