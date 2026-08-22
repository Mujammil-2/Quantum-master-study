/* =========================================================================
   QMS VIDEO PLAYER MASTER ENGINE
   Features: 🔖 Bookmarks System, Smart BGM Memory, Particles, Toasts
========================================================================= */

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

window.showCustomToast = function(message, isError = false) {
    const existingToast = document.querySelector('.qms-toast-msg'); if (existingToast) existingToast.remove();
    const toastElement = document.createElement('div');
    toastElement.className = isError ? 'qms-toast-msg qms-toast-error' : 'qms-toast-msg';
    toastElement.innerHTML = isError ? `<i class="ri-error-warning-fill"></i> ${message}` : `<i class="ri-checkbox-circle-fill"></i> ${message}`;
    document.body.appendChild(toastElement); setTimeout(() => { if (toastElement) toastElement.remove(); }, 3500);
};

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SMART BGM MEMORY SYSTEM (Resumes Music)
    // ==========================================
    const bgmAudio = document.getElementById('bgm-audio');
    if(bgmAudio) {
        let isBgmOn = localStorage.getItem('qms_bgm') === 'on';
        let savedBgmVolume = localStorage.getItem('qms_bgm_volume') || 0.3;
        let savedBgmTime = localStorage.getItem('qms_bgm_time') || 0;
        let savedBgmTrack = localStorage.getItem('qms_bgm_track') || 'bgm1.mp3';

        bgmAudio.src = savedBgmTrack;
        bgmAudio.volume = parseFloat(savedBgmVolume);
        bgmAudio.currentTime = parseFloat(savedBgmTime);

        const playBgmSafely = () => { if (isBgmOn && bgmAudio.paused) bgmAudio.play().catch(e => console.log(e)); };
        document.body.addEventListener('click', playBgmSafely, { once: true });
        
        // Auto play if already allowed
        if (isBgmOn) bgmAudio.play().catch(e => console.log("Waiting for user interaction"));

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('qms_bgm_time', bgmAudio.currentTime);
        });
    }

    // ==========================================
    // 2. LOAD DATA (Theme, Image, Chapter Info)
    // ==========================================
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const savedProfileImage = localStorage.getItem('qms_profile_img');
    if (savedProfileImage && document.getElementById('nav-profile-img')) document.getElementById('nav-profile-img').src = savedProfileImage;

    const urlParams = new URLSearchParams(window.location.search);
    let subject = urlParams.get('subject') || 'physics';
    let chapterId = parseInt(urlParams.get('chapter')) || 1;

    if (document.getElementById('back-to-chapters')) document.getElementById('back-to-chapters').addEventListener('click', () => { window.location.href = `chapters.html?subject=${subject}`; });

    let currentChapterDetails = { title: "अध्याय नहीं मिला", subtitle: "Not Found", pdfUrl: "#" };
    if (qmsDatabase[subject]) { const foundChapter = qmsDatabase[subject].find(ch => ch.id === chapterId); if (foundChapter) currentChapterDetails = foundChapter; }

    if (document.getElementById('player-subject-tag')) document.getElementById('player-subject-tag').innerText = subject.toUpperCase();
    if (document.getElementById('player-chapter-title')) document.getElementById('player-chapter-title').innerText = currentChapterDetails.title;
    if (document.getElementById('player-chapter-subtitle')) document.getElementById('player-chapter-subtitle').innerText = currentChapterDetails.subtitle;

    // SFX Sounds
    const sfxClickAudio = document.getElementById('sfx-click'); let isSoundTurnedOn = localStorage.getItem('qms_sound') !== 'off';
    document.querySelectorAll('.sfx-trigger').forEach(button => { button.addEventListener('click', () => { if (isSoundTurnedOn && sfxClickAudio) { sfxClickAudio.currentTime = 0; sfxClickAudio.volume = 1.0; sfxClickAudio.play().catch(()=>{}); } }); });

    // ==========================================
    // 3. 🔖 BOOKMARK / SAVE NOTES LOGIC
    // ==========================================
    const bookmarkBtn = document.getElementById('btn-bookmark');
    let bookmarksData = JSON.parse(localStorage.getItem('qms_bookmarks')) || {};
    const currentChapterKey = subject + '_' + chapterId;

    // Check if already bookmarked
    if (bookmarksData[currentChapterKey]) {
        if(bookmarkBtn) {
            bookmarkBtn.innerHTML = '<i class="ri-heart-fill"></i> सेव्ड नोट्स (Saved)';
            bookmarkBtn.classList.add('saved');
        }
    }

    if(bookmarkBtn) {
        bookmarkBtn.addEventListener('click', () => {
            if (bookmarksData[currentChapterKey]) {
                // Remove Bookmark
                delete bookmarksData[currentChapterKey];
                bookmarkBtn.innerHTML = '<i class="ri-heart-add-line"></i> बुकमार्क में सेव करें (Save)';
                bookmarkBtn.classList.remove('saved');
                window.showCustomToast("नोट्स को बुकमार्क से हटा दिया गया।");
            } else {
                // Add Bookmark
                bookmarksData[currentChapterKey] = {
                    subject: subject,
                    id: chapterId,
                    title: currentChapterDetails.title,
                    subtitle: currentChapterDetails.subtitle
                };
                bookmarkBtn.innerHTML = '<i class="ri-heart-fill"></i> सेव्ड नोट्स (Saved)';
                bookmarkBtn.classList.add('saved');
                window.showCustomToast("चैप्टर बुकमार्क में सेव हो गया! ❤️");
            }
            localStorage.setItem('qms_bookmarks', JSON.stringify(bookmarksData));
        });
    }

    // ==========================================
    // 4. PDF DOWNLOAD & VIEW LOGIC
    // ==========================================
    const btnViewNotes = document.getElementById('btn-view-notes');
    if (btnViewNotes) { btnViewNotes.addEventListener('click', () => { if (currentChapterDetails.pdfUrl !== "#") { window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(currentChapterDetails.pdfUrl)}`, '_blank'); } else { window.showCustomToast("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।", true); } }); }

    const btnDownloadNotes = document.getElementById('btn-download-notes');
    const downloadModal = document.getElementById('download-modal');
    const downloadProgressFill = document.getElementById('download-progress-fill');
    const downloadStatusText = document.getElementById('download-status-text');

    if (btnDownloadNotes) {
        btnDownloadNotes.addEventListener('click', () => {
            if (currentChapterDetails.pdfUrl !== "#") {
                downloadModal.classList.add('active'); let progressValue = 0;
                const progressInterval = setInterval(() => {
                    progressValue += Math.floor(Math.random() * 10) + 5; if (progressValue > 100) progressValue = 100;
                    downloadProgressFill.style.width = `${progressValue}%`; downloadStatusText.innerText = `सुरक्षित रूप से डाउनलोड हो रहा है... ${progressValue}%`;
                    if (progressValue === 100) {
                        clearInterval(progressInterval);
                        setTimeout(() => {
                            downloadModal.classList.remove('active');
                            setTimeout(() => { downloadProgressFill.style.width = '0%'; downloadStatusText.innerText = 'तैयार किया जा रहा है... 0%'; }, 500);
                            const tempLink = document.createElement('a'); tempLink.href = currentChapterDetails.pdfUrl; tempLink.download = `QMS_Notes_Chapter_${chapterId}.pdf`; tempLink.target = '_blank'; document.body.appendChild(tempLink); tempLink.click(); document.body.removeChild(tempLink);
                            window.showCustomToast("PDF सफलतापूर्वक डाउनलोड हो गई है!");
                        }, 500);
                    }
                }, 200);
            } else { window.showCustomToast("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।", true); }
        });
    }

    // ==========================================
    // 5. MARK COMPLETE LOGIC
    // ==========================================
    const markCompleteBtn = document.getElementById('mark-complete-btn');
    let completedDataStorage = localStorage.getItem('qms_completed'); let completedData = {}; if (completedDataStorage) completedData = JSON.parse(completedDataStorage);
    if (completedData[currentChapterKey] === true) { if (markCompleteBtn) { markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)'; markCompleteBtn.style.background = '#00ff88'; markCompleteBtn.style.color = '#000'; markCompleteBtn.disabled = true; } }
    
    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', () => {
            if (completedData[currentChapterKey] !== true) {
                completedData[currentChapterKey] = true; localStorage.setItem('qms_completed', JSON.stringify(completedData));
                markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)'; markCompleteBtn.style.background = '#00ff88'; markCompleteBtn.style.color = '#000'; markCompleteBtn.disabled = true;
                window.showCustomToast("बधाई हो! आपने यह अध्याय पूरा कर लिया है। +50 XP");
            }
        });
    }

    // ==========================================
    // 6. FIREFLY PARTICLES (GLOWING SYMBOLS)
    // ==========================================
    const particleCanvas = document.getElementById('bg-canvas');
    if (particleCanvas) {
        const canvasCtx = particleCanvas.getContext('2d'); particleCanvas.width = window.innerWidth; particleCanvas.height = window.innerHeight;
        const scienceFormulas = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ']; let activeParticlesArray = [];
        class QuantumFirefly {
            constructor() {
                this.particleType = Math.random() > 0.4 ? 'dot' : 'symbol';
                this.symbolText = scienceFormulas[Math.floor(Math.random() * scienceFormulas.length)];
                this.positionX = Math.random() * particleCanvas.width; this.positionY = Math.random() * particleCanvas.height;
                if (this.particleType === 'symbol') { this.fontSize = Math.random() * 15 + 10; this.velocityX = Math.random() * 0.5 - 0.25; this.velocityY = Math.random() * -0.8 - 0.2; } 
                else { this.fontSize = Math.random() * 3 + 1; this.velocityX = Math.random() * 1 - 0.5; this.velocityY = Math.random() * -1 - 0.2; }
                this.blinkSpeed = Math.random() * 0.05 + 0.02; this.blinkAngle = Math.random() * Math.PI * 2;
            }
            updatePosition() {
                this.positionY += this.velocityY; this.positionX += this.velocityX; this.blinkAngle += this.blinkSpeed;
                if (this.positionY < -30) { this.positionY = particleCanvas.height + 30; this.positionX = Math.random() * particleCanvas.width; }
                if (this.positionX < -30 || this.positionX > particleCanvas.width + 30) { this.velocityX = this.velocityX * -1; }
            }
            drawParticle(context) {
                const rootCssStyles = getComputedStyle(document.documentElement); let themeAccentColor = rootCssStyles.getPropertyValue('--accent-main').trim() || '#00f0ff';
                let calculatedOpacity = ((Math.sin(this.blinkAngle) + 1) / 2) * 0.8 + 0.1;
                context.fillStyle = `rgba(255, 255, 255, ${calculatedOpacity})`; context.shadowBlur = calculatedOpacity * 20; context.shadowColor = themeAccentColor;
                if (this.particleType === 'symbol') { context.font = `${this.fontSize}px "Space Grotesk", sans-serif`; context.fillText(this.symbolText, this.positionX, this.positionY); } 
                else { context.beginPath(); context.arc(this.positionX, this.positionY, this.fontSize, 0, Math.PI * 2); context.fill(); }
                context.shadowBlur = 0;
            }
        }
        for (let counter = 0; counter < 60; counter++) activeParticlesArray.push(new QuantumFirefly());
        function executeAnimationLoop() { canvasCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height); for (let i = 0; i < activeParticlesArray.length; i++) { activeParticlesArray[i].updatePosition(); activeParticlesArray[i].drawParticle(canvasCtx); } requestAnimationFrame(executeAnimationLoop); }
        executeAnimationLoop();
        window.addEventListener('resize', () => { particleCanvas.width = window.innerWidth; particleCanvas.height = window.innerHeight; });
    }
});
