/* =================================================
   QMS CHAPTERS ENGINE (With Firefly Particles)
================================================= */
const qmsDatabase = {
    physics: [
        { id: 1, title: "वैद्युत आवेश तथा क्षेत्र", subtitle: "Electric Charges and Fields", time: "45 Min" },
        { id: 2, title: "स्थिरवैद्युत विभव तथा धारिता", subtitle: "Electrostatic Potential & Capacitance", time: "50 Min" },
        { id: 3, title: "विद्युत धारा", subtitle: "Current Electricity", time: "60 Min" }
    ],
    chemistry: [
        { id: 1, title: "विलयन", subtitle: "Solutions", time: "40 Min" },
        { id: 2, title: "वैद्युतरसायन", subtitle: "Electrochemistry", time: "55 Min" }
    ],
    mathematics: [
        { id: 1, title: "संबंध एवं फलन", subtitle: "Relations and Functions", time: "50 Min" },
        { id: 2, title: "प्रतिलोम त्रिकोणमितीय फलन", subtitle: "Inverse Trigonometric Functions", time: "40 Min" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme & Setup
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const urlParams = new URLSearchParams(window.location.search);
    let subject = urlParams.get('subject') || 'physics';
    const chapters = qmsDatabase[subject];

    const title = document.getElementById('subject-title');
    const subtitle = document.getElementById('subject-subtitle');
    const icon = document.getElementById('hero-icon');
    const heroCard = document.getElementById('subject-hero-card');

    if (subject === 'chemistry') {
        title.innerText = 'रसायन विज्ञान'; subtitle.innerText = 'Chemistry (PCM)';
        icon.innerHTML = '<i class="ri-test-tube-fill"></i>'; heroCard.style.borderTopColor = '#b535ff'; icon.style.color = '#b535ff';
    } else if (subject === 'mathematics') {
        title.innerText = 'गणित'; subtitle.innerText = 'Mathematics (PCM)';
        icon.innerHTML = '<i class="ri-functions"></i>'; heroCard.style.borderTopColor = '#00ff88'; icon.style.color = '#00ff88';
    } 

    // 2. Load Progress
    document.getElementById('total-chapters-count').innerText = `कुल अध्याय: ${chapters.length}`;
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedSubjectChapters = 0;
    chapters.forEach(chap => { if(completedData[subject + '_' + chap.id]) completedSubjectChapters++; });
    let progressPercentage = Math.round((completedSubjectChapters / chapters.length) * 100);
    document.querySelector('.progress-fill').style.width = progressPercentage + '%';
    document.getElementById('progress-text-display').innerText = progressPercentage + '% पूर्ण';

    // 3. Render Chapters
    const list = document.getElementById('dynamic-chapter-list');
    list.innerHTML = '';
    chapters.forEach(chap => {
        let isLocked = false;
        if (chap.id > 1 && !completedData[subject + '_' + (chap.id - 1)]) isLocked = true;
        
        let numIcon = isLocked ? '<i class="ri-lock-fill"></i>' : (chap.id < 10 ? `0${chap.id}` : chap.id);
        let onClickAction = isLocked ? `alert('यह अध्याय लॉक है!')` : `window.location.href='player.html?subject=${subject}&chapter=${chap.id}'`;
        let isCompleted = completedData[subject + '_' + chap.id] ? true : false;
        let btnStyle = isCompleted ? 'background: #00ff88; color: #000;' : '';
        let btnIcon = isCompleted ? '<i class="ri-check-double-line"></i>' : '<i class="ri-play-fill"></i>';

        list.innerHTML += `
            <div class="chapter-card glass-card ${isLocked ? 'locked' : ''} sfx-trigger" onclick="${onClickAction}">
                <div class="chap-num">${numIcon}</div>
                <div class="chap-details"><h4>${chap.title}</h4><p>${chap.subtitle}</p></div>
                <button class="btn-play" style="${btnStyle}">${btnIcon}</button>
            </div>
        `;
    });

    // 4. Sound
    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => { if (isSoundOn && sfxClick) { sfxClick.currentTime = 0; sfxClick.play().catch(()=>{}); } });
    });

    // 5. FIREFLY PARTICLES
    const canvas = document.getElementById('bg-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        const scienceSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let particlesArray = [];
        class FireflyParticle {
            constructor() {
                this.symbol = scienceSymbols[Math.floor(Math.random() * scienceSymbols.length)];
                this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
                this.size = Math.random() * 15 + 10;
                this.speedX = Math.random() * 0.5 - 0.25; this.speedY = Math.random() * -0.8 - 0.2;
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
                ctx.font = `${this.size}px "Space Grotesk", sans-serif`; ctx.fillText(this.symbol, this.x, this.y);
                ctx.shadowBlur = 0;
            }
        }
        for (let i = 0; i < 50; i++) particlesArray.push(new FireflyParticle());
        function animateParticles() { ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animateParticles); }
        animateParticles();
        window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
    }
});
