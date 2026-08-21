/* =========================================================================
   QMS CHAPTERS MASTER ENGINE
   Features: 100% Fixed Glass Cards Rendering, Progress Logic, Fireflies
========================================================================= */

// 1. QMS FULL DATABASE
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

// 2. PREMIUM TOAST LOGIC
window.showPremiumToast = function(message) {
    const existing = document.querySelector('.qms-toast-msg');
    if(existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'qms-toast-msg qms-toast-error';
    toast.innerHTML = `<i class="ri-lock-fill"></i> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000); 
};


document.addEventListener('DOMContentLoaded', () => {

    // 3. THEME & URL PARSING LOGIC
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const urlParams = new URLSearchParams(window.location.search);
    let subject = urlParams.get('subject') || 'physics';
    if(!qmsDatabase[subject]) subject = 'physics'; 
    const chapters = qmsDatabase[subject];

    // 4. HERO SECTION UI UPDATE
    const title = document.getElementById('subject-title');
    const subtitle = document.getElementById('subject-subtitle');
    const icon = document.getElementById('hero-icon');
    const heroCard = document.getElementById('subject-hero-card');

    if (subject === 'chemistry') {
        title.innerText = 'रसायन विज्ञान'; subtitle.innerText = 'Chemistry (PCM)';
        icon.innerHTML = '<i class="ri-test-tube-fill"></i>';
        heroCard.style.borderTopColor = '#b535ff'; icon.style.color = '#b535ff';
    } else if (subject === 'mathematics') {
        title.innerText = 'गणित'; subtitle.innerText = 'Mathematics (PCM)';
        icon.innerHTML = '<i class="ri-functions"></i>';
        heroCard.style.borderTopColor = '#00ff88'; icon.style.color = '#00ff88';
    } else {
        title.innerText = 'भौतिक विज्ञान'; subtitle.innerText = 'Physics (PCM)';
        icon.innerHTML = '<i class="ri-flashlight-fill"></i>';
        heroCard.style.borderTopColor = 'var(--accent-main)'; icon.style.color = 'var(--accent-main)';
    }

    // 5. PROGRESS LOGIC
    document.getElementById('total-chapters-count').innerText = `कुल अध्याय: ${chapters.length}`;
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedSubjectChapters = 0;

    chapters.forEach(chap => {
        if(completedData[subject + '_' + chap.id]) completedSubjectChapters++;
    });

    let progressPercentage = Math.round((completedSubjectChapters / chapters.length) * 100);
    document.querySelector('.progress-fill').style.width = progressPercentage + '%';
    document.getElementById('progress-text-display').innerText = progressPercentage + '% पूर्ण';

    // 6. 100% FIXED RENDER CHAPTER CARDS LOGIC
    const chapterListContainer = document.getElementById('dynamic-chapter-list');
    chapterListContainer.innerHTML = ''; 

    chapters.forEach(chap => {
        let chapNumStr = chap.id < 10 ? `0${chap.id}` : chap.id;
        
        // Lock Logic
        let isLocked = false;
        if (chap.id > 1) {
            let prevChapterKey = subject + '_' + (chap.id - 1);
            if (!completedData[prevChapterKey]) isLocked = true; 
        }

        let lockedClass = isLocked ? 'locked' : '';
        let numIcon = isLocked ? '<i class="ri-lock-fill"></i>' : chapNumStr;
        let onClickAction = isLocked ? `showPremiumToast('यह अध्याय लॉक है! पहले अध्याय ${chap.id - 1} पूरा करें।')` : `window.location.href='player.html?subject=${subject}&chapter=${chap.id}'`;
        
        let thisChapterKey = subject + '_' + chap.id;
        let isCompleted = completedData[thisChapterKey] ? true : false;
        
        // Button Classes
        let btnIcon = isCompleted ? '<i class="ri-check-double-line"></i>' : '<i class="ri-play-fill"></i>';
        let btnClass = isCompleted ? 'btn-play completed' : 'btn-play';

        // PERFECT HTML STRUCTURE TO MATCH CSS
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
                <button class="${btnClass}">${btnIcon}</button>
            </div>
        `;
        chapterListContainer.innerHTML += cardHTML;
    });

    // 7. CUSTOM SOUND EFFECTS 
    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSoundOn && sfxClick) {
                sfxClick.currentTime = 0; sfxClick.volume = 1.0; sfxClick.play().catch(() => {});
            }
        });
    });

    // 8. ADVANCED QUANTUM PARTICLES (FIREFLIES + FORMULAS)
    const canvas = document.getElementById('bg-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        const scienceSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let particlesArray = [];
        
        class QuantumParticle {
            constructor() {
                this.type = Math.random() > 0.4 ? 'dot' : 'symbol';
                this.symbol = scienceSymbols[Math.floor(Math.random() * scienceSymbols.length)];
                this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
                if (this.type === 'symbol') { this.size = Math.random() * 15 + 10; this.speedX = Math.random() * 0.5 - 0.25; this.speedY = Math.random() * -0.8 - 0.2; } 
                else { this.size = Math.random() * 3 + 1; this.speedX = Math.random() * 1 - 0.5; this.speedY = Math.random() * -1 - 0.2; }
                this.blinkSpeed = Math.random() * 0.05 + 0.02; this.angle = Math.random() * Math.PI * 2;
            }
            update() {
                this.y += this.speedY; this.x += this.speedX; this.angle += this.blinkSpeed;
                if (this.y < -30) { this.y = canvas.height + 30; this.x = Math.random() * canvas.width; }
                if (this.x < -30 || this.x > canvas.width + 30) this.speedX *= -1;
            }
            draw() {
                const rootStyle = getComputedStyle(document.documentElement);
                const accentColor = rootStyle.getPropertyValue('--accent-main').trim() || '#00f0ff';
                let currentOpacity = ((Math.sin(this.angle) + 1) / 2) * 0.8 + 0.1;
                
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                ctx.shadowBlur = currentOpacity * 20; ctx.shadowColor = accentColor;
                
                if (this.type === 'symbol') {
                    ctx.font = `${this.size}px "Space Grotesk", sans-serif`; ctx.fillText(this.symbol, this.x, this.y);
                } else {
                    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
                }
                ctx.shadowBlur = 0; 
            }
        }
        
        for (let i = 0; i < 60; i++) particlesArray.push(new QuantumParticle());
        function animateParticles() { ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animateParticles); }
        animateParticles();
        window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
    }
});
