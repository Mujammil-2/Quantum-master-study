/* =========================================================================
   QMS VIDEO PLAYER ENGINE (Master Code - Premium UI Fix)
   - Fixed: Removed browser alert() and added Custom Premium Toast
   - Features: Firefly Particles, PDF Reader Logic, Sound FX, Full Details
========================================================================= */

// 1. QMS DATABASE
const qmsDatabase = {
    physics: [
        { id: 1, title: "वैद्युत आवेश तथा क्षेत्र", subtitle: "Electric Charges and Fields", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph101.pdf" },
        { id: 2, title: "स्थिरवैद्युत विभव तथा धारिता", subtitle: "Electrostatic Potential & Capacitance", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph102.pdf" },
        { id: 3, title: "विद्युत धारा", subtitle: "Current Electricity", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph103.pdf" }
    ],
    chemistry: [
        { id: 1, title: "विलयन", subtitle: "Solutions", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech101.pdf" },
        { id: 2, title: "वैद्युतरसायन", subtitle: "Electrochemistry", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech102.pdf" }
    ],
    mathematics: [
        { id: 1, title: "संबंध एवं फलन", subtitle: "Relations and Functions", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh101.pdf" },
        { id: 2, title: "प्रतिलोम त्रिकोणमितीय फलन", subtitle: "Inverse Trigonometric Functions", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh102.pdf" }
    ]
};

// ==========================================
// 2. PREMIUM TOAST FUNCTION (No More Ugly Alerts!)
// ==========================================
window.showCustomToast = function(message, isError = false) {
    const existing = document.querySelector('.qms-toast-msg');
    if (existing) existing.remove(); // Remove older toasts so they don't pile up

    const toast = document.createElement('div');
    toast.className = isError ? 'qms-toast-msg qms-toast-error' : 'qms-toast-msg';
    toast.innerHTML = `<i class="${isError ? 'ri-error-warning-fill' : 'ri-checkbox-circle-fill'}"></i> ${message}`;
    document.body.appendChild(toast);
    
    // Auto disappear after 3 seconds
    setTimeout(() => { toast.remove(); }, 3000);
};


document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 3. INITIAL DATA LOAD (Theme & Profile Img)
    // ==========================================
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const savedImg = localStorage.getItem('qms_profile_img');
    if(savedImg) { 
        const navImg = document.getElementById('nav-profile-img'); 
        if(navImg) navImg.src = savedImg; 
    }

    // URL Parsing Logic
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject') || 'physics';
    const chapterId = parseInt(urlParams.get('chapter')) || 1;

    const backBtn = document.getElementById('back-to-chapters');
    if(backBtn) {
        backBtn.addEventListener('click', () => { 
            window.location.href = `chapters.html?subject=${subject}`; 
        });
    }

    // Set Chapter Details
    let currentChapter = { title: "अज्ञात अध्याय", subtitle: "Unknown", pdfUrl: "#" };
    if(qmsDatabase[subject]) { 
        const found = qmsDatabase[subject].find(ch => ch.id === chapterId); 
        if(found) currentChapter = found; 
    }

    document.getElementById('player-subject-tag').innerText = subject.toUpperCase();
    document.getElementById('player-chapter-title').innerText = currentChapter.title;
    
    const subtitleEl = document.getElementById('player-chapter-subtitle');
    if(subtitleEl) subtitleEl.innerText = currentChapter.subtitle;

    // ==========================================
    // 4. AUDIO FX SYSTEM
    // ==========================================
    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => { 
            if (isSoundOn && sfxClick) { 
                sfxClick.currentTime = 0; 
                sfxClick.volume = 1.0; 
                sfxClick.play().catch(()=>{}); 
            } 
        });
    });

    // ==========================================
    // 5. PDF READER & DOWNLOAD LOGIC
    // ==========================================
    const viewBtn = document.getElementById('btn-view-notes');
    const downloadBtn = document.getElementById('btn-download-notes');

    if (viewBtn && downloadBtn) {
        viewBtn.addEventListener('click', () => {
            if(currentChapter.pdfUrl !== "#") {
                const liveReaderUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(currentChapter.pdfUrl)}`;
                window.open(liveReaderUrl, '_blank');
            } else { 
                window.showCustomToast("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।", true); 
            }
        });

        downloadBtn.addEventListener('click', () => {
            if(currentChapter.pdfUrl !== "#") {
                const link = document.createElement('a');
                link.href = currentChapter.pdfUrl;
                link.download = `QMS_Notes_Chapter_${chapterId}.pdf`;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.showCustomToast("पीडीएफ डाउनलोड शुरू हो गया है।");
            } else { 
                window.showCustomToast("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।", true); 
            }
        });
    }

    // ==========================================
    // 6. MARK COMPLETE LOGIC (FIXED)
    // ==========================================
    const markCompleteBtn = document.getElementById('mark-complete-btn');
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let chapterKey = subject + '_' + chapterId;
    
    // If already completed on page load
    if (completedData[chapterKey]) { 
        markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया'; 
        markCompleteBtn.style.background = '#00ff88'; 
        markCompleteBtn.style.color = '#000'; 
        markCompleteBtn.disabled = true; 
    }
    
    // When user clicks the button
    markCompleteBtn.addEventListener('click', () => {
        if (!completedData[chapterKey]) {
            completedData[chapterKey] = true; 
            localStorage.setItem('qms_completed', JSON.stringify(completedData)); 
            
            markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया'; 
            markCompleteBtn.style.background = '#00ff88'; 
            markCompleteBtn.style.color = '#000'; 
            markCompleteBtn.disabled = true;
            
            // ✅ YAHAN FIX KIYA HAI: Ab koi Default Alert nahi aayega!
            window.showCustomToast("बधाई हो! आपने यह अध्याय पूरा कर लिया है। +50 XP");
        }
    });

    // ==========================================
    // 7. FIREFLY PARTICLES (GLOWING MATH/SCIENCE SYMBOLS)
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d'); 
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight;
        
        const scienceSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let particlesArray = [];
        
        class QuantumParticle {
            constructor() {
                this.type = Math.random() > 0.4 ? 'dot' : 'symbol';
                this.symbol = scienceSymbols[Math.floor(Math.random() * scienceSymbols.length)];
                this.x = Math.random() * canvas.width; 
                this.y = Math.random() * canvas.height;
                
                if (this.type === 'symbol') {
                    this.size = Math.random() * 15 + 10;
                    this.speedX = Math.random() * 0.5 - 0.25; 
                    this.speedY = Math.random() * -0.8 - 0.2;
                } else {
                    this.size = Math.random() * 3 + 1; 
                    this.speedX = Math.random() * 1 - 0.5; 
                    this.speedY = Math.random() * -1 - 0.2;
                }
                
                this.blinkSpeed = Math.random() * 0.05 + 0.02; 
                this.angle = Math.random() * Math.PI * 2;
            }
            update() {
                this.y += this.speedY; 
                this.x += this.speedX; 
                this.angle += this.blinkSpeed;
                if (this.y < -30) { 
                    this.y = canvas.height + 30; 
                    this.x = Math.random() * canvas.width; 
                }
                if (this.x < -30 || this.x > canvas.width + 30) this.speedX *= -1;
            }
            draw() {
                const rootStyle = getComputedStyle(document.documentElement);
                const accentColor = rootStyle.getPropertyValue('--accent-main').trim() || '#00f0ff';
                let currentOpacity = ((Math.sin(this.angle) + 1) / 2) * 0.8 + 0.1;
                
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                ctx.shadowBlur = currentOpacity * 20; 
                ctx.shadowColor = accentColor;
                
                if (this.type === 'symbol') {
                    ctx.font = `${this.size}px "Space Grotesk", sans-serif`; 
                    ctx.fillText(this.symbol, this.x, this.y);
                } else {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.shadowBlur = 0; 
            }
        }
        
        for (let i = 0; i < 60; i++) particlesArray.push(new QuantumParticle());
        
        function animateParticles() { 
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            particlesArray.forEach(p => { p.update(); p.draw(); }); 
            requestAnimationFrame(animateParticles); 
        }
        animateParticles();
        
        window.addEventListener('resize', () => { 
            canvas.width = window.innerWidth; 
            canvas.height = window.innerHeight; 
        });
    }

});
