/* =================================================
   QMS DYNAMIC CHAPTERS ENGINE (Phase 6)
================================================= */

// 1. HAMARA MINI DATABASE
const qmsDatabase = {
    physics: [
        { id: 1, title: "वैद्युत आवेश तथा क्षेत्र", subtitle: "Electric Charges and Fields", time: "45 Min", locked: false },
        { id: 2, title: "स्थिरवैद्युत विभव तथा धारिता", subtitle: "Electrostatic Potential & Capacitance", time: "50 Min", locked: false },
        { id: 3, title: "विद्युत धारा", subtitle: "Current Electricity", time: "60 Min", locked: false },
        { id: 4, title: "गतिमान आवेश और चुंबकत्व", subtitle: "Moving Charges and Magnetism", time: "55 Min", locked: true },
        { id: 5, title: "चुंबकत्व एवं द्रव्य", subtitle: "Magnetism and Matter", time: "40 Min", locked: true }
    ],
    chemistry: [
        { id: 1, title: "विलयन", subtitle: "Solutions", time: "40 Min", locked: false },
        { id: 2, title: "वैद्युतरसायन", subtitle: "Electrochemistry", time: "55 Min", locked: false },
        { id: 3, title: "रासायनिक बलगतिकी", subtitle: "Chemical Kinetics", time: "45 Min", locked: false },
        { id: 4, title: "d- एवं f- ब्लॉक के तत्व", subtitle: "d- and f- Block Elements", time: "50 Min", locked: true }
    ],
    mathematics: [
        { id: 1, title: "संबंध एवं फलन", subtitle: "Relations and Functions", time: "50 Min", locked: false },
        { id: 2, title: "प्रतिलोम त्रिकोणमितीय फलन", subtitle: "Inverse Trigonometric Functions", time: "40 Min", locked: false },
        { id: 3, title: "आव्यूह", subtitle: "Matrices", time: "60 Min", locked: false },
        { id: 4, title: "सारणिक", subtitle: "Determinants", time: "65 Min", locked: true }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const urlParams = new URLSearchParams(window.location.search);
    let subject = urlParams.get('subject');
    
    // Agar koi direct link khole bina subject ke, toh physics default rahega
    if(!subject || !qmsDatabase[subject]) {
        subject = 'physics'; 
    }

    // UI Elements
    const title = document.getElementById('subject-title');
    const subtitle = document.getElementById('subject-subtitle');
    const icon = document.getElementById('hero-icon');
    const heroCard = document.getElementById('subject-hero-card');
    const chapterListContainer = document.getElementById('dynamic-chapter-list');
    const totalCountText = document.getElementById('total-chapters-count');

    // Subject ke hisaab se Header change karna
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

    // Database se chapters load karna
    const chapters = qmsDatabase[subject];
    totalCountText.innerText = `कुल अध्याय: ${chapters.length}`;

    chapterListContainer.innerHTML = ''; // Pehle se kuch ho toh clear kar do

    chapters.forEach(chap => {
        // Number ko 01, 02 format mein karna
        let chapNumStr = chap.id < 10 ? `0${chap.id}` : chap.id;

        let lockedClass = chap.locked ? 'locked' : '';
        let numIcon = chap.locked ? '<i class="ri-lock-fill"></i>' : chapNumStr;
        let onClickAction = chap.locked 
            ? `alert('यह अध्याय अभी लॉक है! पहले पिछले अध्याय पूरे करें।')` 
            : `window.location.href='player.html?subject=${subject}&chapter=${chap.id}'`;

        // Card ka HTML generate karna
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
                <button class="btn-play"><i class="ri-play-fill"></i></button>
            </div>
        `;
        chapterListContainer.innerHTML += cardHTML;
    });

    // Sound effect trigger add karna naye buttons pe
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
