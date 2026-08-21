/* =========================================================================
   QMS VIDEO PLAYER MASTER ENGINE
   Features: 
   1. Detailed Firefly & Formula Particles
   2. Custom Premium Toasts (No Alerts)
   3. Animated PDF Download Modal
   4. Save Progress Logic
   5. Dynamic Profile Image & Themes
========================================================================= */

// --------------------------------------------------------------------------
// 1. QMS FULL DATABASE
// --------------------------------------------------------------------------
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

// --------------------------------------------------------------------------
// 2. PREMIUM CUSTOM TOAST FUNCTION (NO ALERTS)
// --------------------------------------------------------------------------
window.showCustomToast = function(message, isError = false) {
    // If a toast already exists, remove it first
    const existingToast = document.querySelector('.qms-toast-msg');
    if (existingToast) {
        existingToast.remove();
    }

    // Create a new toast element
    const toastElement = document.createElement('div');
    
    // Assign classes based on whether it is an error or success
    if (isError === true) {
        toastElement.className = 'qms-toast-msg qms-toast-error';
    } else {
        toastElement.className = 'qms-toast-msg';
    }

    // Add icon and message
    if (isError === true) {
        toastElement.innerHTML = `<i class="ri-error-warning-fill"></i> ${message}`;
    } else {
        toastElement.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${message}`;
    }

    // Append to body
    document.body.appendChild(toastElement);
    
    // Automatically remove after 3.5 seconds
    setTimeout(() => {
        if (toastElement) {
            toastElement.remove();
        }
    }, 3500);
};

// --------------------------------------------------------------------------
// 3. MAIN DOM CONTENT LOADED EVENT
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    // --- 3.1. LOAD THEME & PROFILE IMAGE ---
    const savedTheme = localStorage.getItem('qms_theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        document.documentElement.setAttribute('data-theme', 'default');
    }
    
    const savedProfileImage = localStorage.getItem('qms_profile_img');
    const navProfileImageElement = document.getElementById('nav-profile-img');
    
    if (savedProfileImage && navProfileImageElement) {
        navProfileImageElement.src = savedProfileImage;
    }

    // --- 3.2. URL PARSING FOR CHAPTER DETAILS ---
    const urlParams = new URLSearchParams(window.location.search);
    
    let subject = urlParams.get('subject');
    if (!subject || subject === "") {
        subject = 'physics';
    }

    let chapterId = parseInt(urlParams.get('chapter'));
    if (!chapterId || isNaN(chapterId)) {
        chapterId = 1;
    }

    // Set Back Button URL
    const backToChaptersBtn = document.getElementById('back-to-chapters');
    if (backToChaptersBtn) {
        backToChaptersBtn.addEventListener('click', () => { 
            window.location.href = `chapters.html?subject=${subject}`; 
        });
    }

    // Find the Chapter in Database
    let currentChapterDetails = { 
        title: "अध्याय नहीं मिला", 
        subtitle: "Not Found", 
        pdfUrl: "#" 
    };

    if (qmsDatabase[subject]) {
        const foundChapter = qmsDatabase[subject].find(ch => ch.id === chapterId);
        if (foundChapter) {
            currentChapterDetails = foundChapter;
        }
    }

    // Update UI with Chapter Name
    const subjectTagElement = document.getElementById('player-subject-tag');
    if (subjectTagElement) {
        subjectTagElement.innerText = subject.toUpperCase();
    }

    const chapterTitleElement = document.getElementById('player-chapter-title');
    if (chapterTitleElement) {
        chapterTitleElement.innerText = currentChapterDetails.title;
    }
    
    const chapterSubtitleElement = document.getElementById('player-chapter-subtitle');
    if (chapterSubtitleElement) {
        chapterSubtitleElement.innerText = currentChapterDetails.subtitle;
    }

    // --- 3.3. AUDIO FX SYSTEM ---
    const sfxClickAudio = document.getElementById('sfx-click');
    let isSoundTurnedOn = true;
    
    const soundSetting = localStorage.getItem('qms_sound');
    if (soundSetting === 'off') {
        isSoundTurnedOn = false;
    }

    const allSfxButtons = document.querySelectorAll('.sfx-trigger');
    allSfxButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (isSoundTurnedOn === true && sfxClickAudio) {
                sfxClickAudio.currentTime = 0;
                sfxClickAudio.volume = 1.0;
                sfxClickAudio.play().catch((error) => {
                    console.log("Audio play prevented by browser:", error);
                });
            }
        });
    });

    // --- 3.4. PDF READER LOGIC (LIVE VIEW) ---
    const btnViewNotes = document.getElementById('btn-view-notes');
    if (btnViewNotes) {
        btnViewNotes.addEventListener('click', () => {
            if (currentChapterDetails.pdfUrl !== "#") {
                // Open PDF safely in Google Docs Viewer
                const liveReaderUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(currentChapterDetails.pdfUrl)}`;
                window.open(liveReaderUrl, '_blank');
            } else {
                window.showCustomToast("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।", true);
            }
        });
    }

    // --- 3.5. PREMIUM PDF DOWNLOAD LOGIC WITH ANIMATION ---
    const btnDownloadNotes = document.getElementById('btn-download-notes');
    const downloadModal = document.getElementById('download-modal');
    const downloadProgressFill = document.getElementById('download-progress-fill');
    const downloadStatusText = document.getElementById('download-status-text');

    if (btnDownloadNotes) {
        btnDownloadNotes.addEventListener('click', () => {
            if (currentChapterDetails.pdfUrl !== "#") {
                
                // 1. Show the download modal
                downloadModal.classList.add('active');
                
                let progressValue = 0;
                
                // 2. Start Fake Progress Interval for Premium Feel
                const progressInterval = setInterval(() => {
                    // Increment progress randomly between 5 and 15
                    progressValue += Math.floor(Math.random() * 10) + 5;
                    
                    if (progressValue > 100) {
                        progressValue = 100;
                    }
                    
                    // Update UI
                    downloadProgressFill.style.width = `${progressValue}%`;
                    downloadStatusText.innerText = `सुरक्षित रूप से डाउनलोड हो रहा है... ${progressValue}%`;

                    // 3. When reaches 100%
                    if (progressValue === 100) {
                        clearInterval(progressInterval);
                        
                        setTimeout(() => {
                            // Hide Modal
                            downloadModal.classList.remove('active');
                            
                            // Reset Modal for next time
                            setTimeout(() => {
                                downloadProgressFill.style.width = '0%';
                                downloadStatusText.innerText = 'तैयार किया जा रहा है... 0%';
                            }, 500);

                            // Actually Trigger Download
                            const tempLink = document.createElement('a');
                            tempLink.href = currentChapterDetails.pdfUrl;
                            tempLink.download = `QMS_Physics_Chapter_${chapterId}.pdf`; // Browser decides final name
                            tempLink.target = '_blank';
                            document.body.appendChild(tempLink);
                            tempLink.click();
                            document.body.removeChild(tempLink);
                            
                            // Show Success Toast
                            window.showCustomToast("PDF सफलतापूर्वक डाउनलोड हो गई है!");
                            
                        }, 500); // Small delay so user sees 100%
                    }
                }, 200); // Update every 200ms

            } else {
                window.showCustomToast("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।", true);
            }
        });
    }

    // --- 3.6. MARK COMPLETE LOGIC (XP SYSTEM) ---
    const markCompleteBtn = document.getElementById('mark-complete-btn');
    
    // Parse existing data
    let completedDataStorage = localStorage.getItem('qms_completed');
    let completedData = {};
    if (completedDataStorage) {
        completedData = JSON.parse(completedDataStorage);
    }
    
    // Unique key for this chapter
    const currentChapterKey = subject + '_' + chapterId;
    
    // Check if already completed on page load
    if (completedData[currentChapterKey] === true) {
        if (markCompleteBtn) {
            markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)';
            markCompleteBtn.style.background = '#00ff88';
            markCompleteBtn.style.color = '#000';
            markCompleteBtn.disabled = true;
        }
    }
    
    // Handle click to mark complete
    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', () => {
            if (completedData[currentChapterKey] !== true) {
                
                // Save to LocalStorage
                completedData[currentChapterKey] = true;
                localStorage.setItem('qms_completed', JSON.stringify(completedData));
                
                // Update Button Style
                markCompleteBtn.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)';
                markCompleteBtn.style.background = '#00ff88';
                markCompleteBtn.style.color = '#000';
                markCompleteBtn.disabled = true;
                
                // Show Premium Success Message (NO MORE ALERTS!)
                window.showCustomToast("बधाई हो! आपने यह अध्याय पूरा कर लिया है। +50 XP");
            }
        });
    }

    // ==========================================
    // 4. FIREFLY & FORMULA PARTICLES ENGINE
    // ==========================================
    const particleCanvas = document.getElementById('bg-canvas');
    if (particleCanvas) {
        const canvasCtx = particleCanvas.getContext('2d');
        
        // Set full screen size
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
        
        const scienceFormulas = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let activeParticlesArray = [];
        
        // Define Particle Class explicitly
        class QuantumFirefly {
            constructor() {
                // 40% chance to be a math symbol, 60% chance to be a small glowing dot
                const randomTypeDecider = Math.random();
                if (randomTypeDecider > 0.4) {
                    this.particleType = 'dot';
                } else {
                    this.particleType = 'symbol';
                }
                
                // Pick a random symbol
                const randomSymbolIndex = Math.floor(Math.random() * scienceFormulas.length);
                this.symbolText = scienceFormulas[randomSymbolIndex];
                
                // Random spawn positions
                this.positionX = Math.random() * particleCanvas.width;
                this.positionY = Math.random() * particleCanvas.height;
                
                // Sizing and Speeds based on type
                if (this.particleType === 'symbol') {
                    this.fontSize = Math.random() * 15 + 10;
                    this.velocityX = Math.random() * 0.5 - 0.25;
                    this.velocityY = Math.random() * -0.8 - 0.2;
                } else {
                    this.fontSize = Math.random() * 3 + 1; // Tiny radius for dots
                    this.velocityX = Math.random() * 1 - 0.5;
                    this.velocityY = Math.random() * -1 - 0.2;
                }
                
                // Blinking Logic Properties
                this.blinkSpeed = Math.random() * 0.05 + 0.02;
                this.blinkAngle = Math.random() * Math.PI * 2;
            }
            
            updatePosition() {
                this.positionY += this.velocityY;
                this.positionX += this.velocityX;
                this.blinkAngle += this.blinkSpeed;
                
                // Loop back to bottom if floats off top
                if (this.positionY < -30) {
                    this.positionY = particleCanvas.height + 30;
                    this.positionX = Math.random() * particleCanvas.width;
                }
                
                // Bounce off side walls
                if (this.positionX < -30 || this.positionX > particleCanvas.width + 30) {
                    this.velocityX = this.velocityX * -1;
                }
            }
            
            drawParticle(context) {
                // Get theme color dynamically
                const rootCssStyles = getComputedStyle(document.documentElement);
                let themeAccentColor = rootCssStyles.getPropertyValue('--accent-main').trim();
                
                if (!themeAccentColor || themeAccentColor === "") {
                    themeAccentColor = '#00f0ff'; // Fallback cyan
                }
                
                // Calculate glowing opacity (Sine wave creates the blinking firefly effect)
                let calculatedOpacity = ((Math.sin(this.blinkAngle) + 1) / 2) * 0.8 + 0.1;
                
                context.fillStyle = `rgba(255, 255, 255, ${calculatedOpacity})`;
                context.shadowBlur = calculatedOpacity * 20;
                context.shadowColor = themeAccentColor;
                
                if (this.particleType === 'symbol') {
                    context.font = `${this.fontSize}px "Space Grotesk", sans-serif`;
                    context.fillText(this.symbolText, this.positionX, this.positionY);
                } else {
                    context.beginPath();
                    context.arc(this.positionX, this.positionY, this.fontSize, 0, Math.PI * 2);
                    context.fill();
                }
                
                // Reset shadow to avoid affecting other elements
                context.shadowBlur = 0;
            }
        }
        
        // Initialize 60 particles
        for (let counter = 0; counter < 60; counter++) {
            const newParticle = new QuantumFirefly();
            activeParticlesArray.push(newParticle);
        }
        
        // Animation Loop
        function executeAnimationLoop() {
            canvasCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            
            for (let i = 0; i < activeParticlesArray.length; i++) {
                activeParticlesArray[i].updatePosition();
                activeParticlesArray[i].drawParticle(canvasCtx);
            }
            
            requestAnimationFrame(executeAnimationLoop);
        }
        
        // Start Loop
        executeAnimationLoop();
        
        // Handle Screen Resize
        window.addEventListener('resize', () => {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        });
    }

});
