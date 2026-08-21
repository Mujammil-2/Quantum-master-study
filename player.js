/* =================================================
   QMS VIDEO PLAYER ENGINE (With Firefly Particles)
================================================= */
const qmsDatabase = {
    physics: [{ id: 1, title: "वैद्युत आवेश", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph101.pdf" }]
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme & Profile Img
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const savedImg = localStorage.getItem('qms_profile_img');
    if(savedImg) { const navImg = document.getElementById('nav-profile-img'); if(navImg) navImg.src = savedImg; }

    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject') || 'physics';
    const chapterId = parseInt(urlParams.get('chapter')) || 1;

    document.getElementById('back-to-chapters').addEventListener('click', () => { window.location.href = `chapters.html?subject=${subject}`; });

    let currentChapter = { title: "अज्ञात अध्याय", pdfUrl: "#" };
    if(qmsDatabase[subject]) { const found = qmsDatabase[subject].find(ch => ch.id === chapterId); if(found) currentChapter = found; }

    document.getElementById('player-subject-tag').innerText = subject.toUpperCase();
    document.getElementById('player-chapter-title').innerText = currentChapter.title;

    // 2. Sound
    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => { if (isSoundOn && sfxClick) { sfxClick.currentTime = 0; sfxClick.play().catch(()=>{}); } });
    });

    // 3. Mark Complete
    const markCompleteBtn = document.getElementById('mark-complete-btn');
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let chapterKey = subject + '_' + chapterId;
    if (completedData[chapterKey]) { markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया'; markCompleteBtn.style.background = '#00ff88'; markCompleteBtn.style.color = '#000'; markCompleteBtn.disabled = true; }
    markCompleteBtn.addEventListener('click', () => {
        if (!completedData[chapterKey]) {
            completedData[chapterKey] = true; localStorage.setItem('qms_completed', JSON.stringify(completedData)); 
            markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया'; markCompleteBtn.style.background = '#00ff88'; markCompleteBtn.style.color = '#000'; markCompleteBtn.disabled = true;
            alert("बधाई हो! अध्याय पूरा हुआ।");
        }
    });

    // 4. FIREFLY PARTICLES
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
