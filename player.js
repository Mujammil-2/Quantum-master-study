/* =========================================================================
   QMS VIDEO PLAYER MASTER ENGINE (EXPANDED FULL CODE)
   - 100% COMPLETE FILE
   - FEATURES:
     1. Database Loading
     2. Smart BGM Memory Resume
     3. 🔖 Bookmarks System (Save/Remove)
     4. Animated Download PDF Logic
     5. Complete Status Tracker
     6. Quantum Fireflies
========================================================================= */

// --------------------------------------------------------------------------
// 1. QMS DATABASE
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
// 2. CUSTOM TOAST NOTIFICATION SYSTEM
// --------------------------------------------------------------------------
window.showCustomToast = function(messageContentText, isErrorNotification = false) {
    // Prevent duplicate toasts
    const existingOldToast = document.querySelector('.qms-toast-msg'); 
    if (existingOldToast) {
        existingOldToast.remove();
    }
    
    // Create new DOM element for Toast
    const dynamicToastElement = document.createElement('div');
    
    if (isErrorNotification) {
        dynamicToastElement.className = 'qms-toast-msg qms-toast-error';
        dynamicToastElement.innerHTML = `<i class="ri-error-warning-fill"></i> ${messageContentText}`;
    } else {
        dynamicToastElement.className = 'qms-toast-msg';
        dynamicToastElement.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${messageContentText}`;
    }
    
    document.body.appendChild(dynamicToastElement); 
    
    // Self destruct timer
    setTimeout(() => { 
        if (dynamicToastElement) {
            dynamicToastElement.remove(); 
        }
    }, 3500);
};

// --------------------------------------------------------------------------
// 3. MAIN DOM INITIALIZATION LOGIC
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // A. SMART BGM MEMORY SYSTEM (Resumes Music)
    // ==========================================
    const backgroundAudioPlayerNode = document.getElementById('bgm-audio');
    
    if (backgroundAudioPlayerNode) {
        let isSystemBgmTurnedOn = localStorage.getItem('qms_bgm') === 'on';
        let currentlySavedBgmVolume = localStorage.getItem('qms_bgm_volume') || 0.3;
        let lastStoppedBgmTime = localStorage.getItem('qms_bgm_time') || 0;
        let chosenBgmTrackName = localStorage.getItem('qms_bgm_track') || 'bgm1.mp3';

        // Apply saved properties
        backgroundAudioPlayerNode.src = chosenBgmTrackName;
        backgroundAudioPlayerNode.volume = parseFloat(currentlySavedBgmVolume);
        backgroundAudioPlayerNode.currentTime = parseFloat(lastStoppedBgmTime);

        const tryPlayBgmSafelyAction = () => { 
            if (isSystemBgmTurnedOn && backgroundAudioPlayerNode.paused) {
                backgroundAudioPlayerNode.play().catch(errorData => {
                    console.log("Audio play blocked by browser security.", errorData);
                }); 
            }
        };
        
        // Listen for a global click to ensure audio plays
        document.body.addEventListener('click', tryPlayBgmSafelyAction, { once: true });
        
        // Auto play if browser already trusts the site
        if (isSystemBgmTurnedOn) {
            backgroundAudioPlayerNode.play().catch(errorData => {
                console.log("Waiting for user manual interaction to start BGM.");
            });
        }

        // Before user leaves this page, save exact audio time!
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('qms_bgm_time', backgroundAudioPlayerNode.currentTime);
        });
    }

    // ==========================================
    // B. LOAD DATA & SET UI CONTENT
    // ==========================================
    
    // Theme Configuration
    const currentlySavedUiTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', currentlySavedUiTheme);
    
    // Profile Avatar Logic
    const savedUserProfileImageStr = localStorage.getItem('qms_profile_img');
    const playerNavProfileImageNode = document.getElementById('nav-profile-img');
    if (savedUserProfileImageStr && playerNavProfileImageNode) {
        playerNavProfileImageNode.src = savedUserProfileImageStr;
    }

    // URL Parsing for Content Identification
    const documentUrlParams = new URLSearchParams(window.location.search);
    let activeSubjectQuery = documentUrlParams.get('subject') || 'physics';
    let activeChapterIdQuery = parseInt(documentUrlParams.get('chapter')) || 1;

    // Back Button Redirection Setup
    const returnToChaptersButtonNode = document.getElementById('back-to-chapters');
    if (returnToChaptersButtonNode) {
        returnToChaptersButtonNode.addEventListener('click', () => { 
            window.location.href = `chapters.html?subject=${activeSubjectQuery}`; 
        });
    }

    // Lookup Content in Database
    let mappedChapterDetailsObj = { 
        title: "अध्याय नहीं मिला", 
        subtitle: "Not Found", 
        pdfUrl: "#" 
    };
    
    if (qmsDatabase[activeSubjectQuery]) { 
        const matchedChapterObject = qmsDatabase[activeSubjectQuery].find(ch => ch.id === activeChapterIdQuery); 
        if (matchedChapterObject) {
            mappedChapterDetailsObj = matchedChapterObject; 
        }
    }

    // Inject Text into DOM elements
    const tagDisplayElement = document.getElementById('player-subject-tag');
    if (tagDisplayElement) {
        tagDisplayElement.innerText = activeSubjectQuery.toUpperCase();
    }
    
    const titleDisplayElement = document.getElementById('player-chapter-title');
    if (titleDisplayElement) {
        titleDisplayElement.innerText = mappedChapterDetailsObj.title;
    }
    
    const subtitleDisplayElement = document.getElementById('player-chapter-subtitle');
    if (subtitleDisplayElement) {
        subtitleDisplayElement.innerText = mappedChapterDetailsObj.subtitle;
    }

    // Sound FX Event Listeners configuration
    const sfxClickSoundAudioNode = document.getElementById('sfx-click'); 
    let isSfxTurnedOnAppWide = localStorage.getItem('qms_sound') !== 'off';
    
    const allSfxClickableButtons = document.querySelectorAll('.sfx-trigger');
    allSfxClickableButtons.forEach(actionButton => { 
        actionButton.addEventListener('click', () => { 
            if (isSfxTurnedOnAppWide && sfxClickSoundAudioNode) { 
                sfxClickSoundAudioNode.currentTime = 0; 
                sfxClickSoundAudioNode.volume = 1.0; 
                sfxClickSoundAudioNode.play().catch(()=>{}); 
            } 
        }); 
    });

    // ==========================================
    // C. 🔖 BOOKMARK / SAVE NOTES LOGIC
    // ==========================================
    const saveBookmarkActionButton = document.getElementById('btn-bookmark');
    
    // Retrieve Bookmarks Data
    let userBookmarksDataCollection = {};
    const existingRawBookmarksData = localStorage.getItem('qms_bookmarks');
    if (existingRawBookmarksData) {
        userBookmarksDataCollection = JSON.parse(existingRawBookmarksData);
    }
    
    const specificChapterKeyIdentifier = activeSubjectQuery + '_' + activeChapterIdQuery;

    // Validate if chapter is already bookmarked on load
    if (userBookmarksDataCollection[specificChapterKeyIdentifier]) {
        if (saveBookmarkActionButton) {
            saveBookmarkActionButton.innerHTML = '<i class="ri-heart-fill"></i> सेव्ड नोट्स (Saved)';
            saveBookmarkActionButton.classList.add('saved');
        }
    }

    // Bookmark Button Click Event
    if (saveBookmarkActionButton) {
        saveBookmarkActionButton.addEventListener('click', () => {
            
            // IF ALREADY BOOKMARKED -> REMOVE
            if (userBookmarksDataCollection[specificChapterKeyIdentifier]) {
                delete userBookmarksDataCollection[specificChapterKeyIdentifier];
                
                // Update Button Design
                saveBookmarkActionButton.innerHTML = '<i class="ri-heart-add-line"></i> बुकमार्क में सेव करें (Save)';
                saveBookmarkActionButton.classList.remove('saved');
                
                window.showCustomToast("नोट्स को बुकमार्क से हटा दिया गया।");
                
            } else {
                // IF NOT BOOKMARKED -> ADD TO SYSTEM
                userBookmarksDataCollection[specificChapterKeyIdentifier] = {
                    subject: activeSubjectQuery,
                    id: activeChapterIdQuery,
                    title: mappedChapterDetailsObj.title,
                    subtitle: mappedChapterDetailsObj.subtitle
                };
                
                // Update Button Design
                saveBookmarkActionButton.innerHTML = '<i class="ri-heart-fill"></i> सेव्ड नोट्स (Saved)';
                saveBookmarkActionButton.classList.add('saved');
                
                window.showCustomToast("चैप्टर बुकमार्क में सेव हो गया! ❤️");
            }
            
            // Save modified collection to LocalStorage
            localStorage.setItem('qms_bookmarks', JSON.stringify(userBookmarksDataCollection));
        });
    }

    // ==========================================
    // D. PDF DOWNLOAD & VIEW LOGIC
    // ==========================================
    const buttonLiveViewNotes = document.getElementById('btn-view-notes');
    if (buttonLiveViewNotes) { 
        buttonLiveViewNotes.addEventListener('click', () => { 
            if (mappedChapterDetailsObj.pdfUrl !== "#") { 
                const encodedPdfUrlString = encodeURIComponent(mappedChapterDetailsObj.pdfUrl);
                window.open(`https://docs.google.com/viewer?url=${encodedPdfUrlString}`, '_blank'); 
            } else { 
                window.showCustomToast("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।", true); 
            } 
        }); 
    }

    const buttonDownloadPdfNotes = document.getElementById('btn-download-notes');
    const dynamicDownloadModalOverlay = document.getElementById('download-modal');
    const progressFillAnimatedBar = document.getElementById('download-progress-fill');
    const progressStatusUpdateText = document.getElementById('download-status-text');

    if (buttonDownloadPdfNotes) {
        buttonDownloadPdfNotes.addEventListener('click', () => {
            if (mappedChapterDetailsObj.pdfUrl !== "#") {
                
                // Show modal overlay
                dynamicDownloadModalOverlay.classList.add('active'); 
                
                let pseudoProgressValue = 0;
                
                // Start Fake Progress Loop
                const downloadProgressIntervalTimer = setInterval(() => {
                    
                    // Increment 5 to 15 percent
                    pseudoProgressValue += Math.floor(Math.random() * 10) + 5; 
                    
                    if (pseudoProgressValue > 100) {
                        pseudoProgressValue = 100;
                    }
                    
                    progressFillAnimatedBar.style.width = `${pseudoProgressValue}%`; 
                    progressStatusUpdateText.innerText = `सुरक्षित रूप से डाउनलोड हो रहा है... ${pseudoProgressValue}%`;
                    
                    if (pseudoProgressValue === 100) {
                        clearInterval(downloadProgressIntervalTimer);
                        
                        setTimeout(() => {
                            dynamicDownloadModalOverlay.classList.remove('active');
                            
                            // Reset bar visually after modal closes
                            setTimeout(() => { 
                                progressFillAnimatedBar.style.width = '0%'; 
                                progressStatusUpdateText.innerText = 'तैयार किया जा रहा है... 0%'; 
                            }, 500);
                            
                            // Trigger actual Browser File Download
                            const temporaryHyperlink = document.createElement('a'); 
                            temporaryHyperlink.href = mappedChapterDetailsObj.pdfUrl; 
                            temporaryHyperlink.download = `QMS_Notes_Chapter_${activeChapterIdQuery}.pdf`; 
                            temporaryHyperlink.target = '_blank'; 
                            
                            document.body.appendChild(temporaryHyperlink); 
                            temporaryHyperlink.click(); 
                            document.body.removeChild(temporaryHyperlink);
                            
                            window.showCustomToast("PDF सफलतापूर्वक डाउनलोड हो गई है!");
                        }, 500);
                    }
                }, 200);
                
            } else { 
                window.showCustomToast("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।", true); 
            }
        });
    }

    // ==========================================
    // E. MARK COMPLETE LOGIC (XP & Tracker)
    // ==========================================
    const buttonMarkCompleteChapter = document.getElementById('mark-complete-btn');
    
    // Look up completion history
    const savedCompletedDataRawString = localStorage.getItem('qms_completed'); 
    let allCompletedChaptersDataObj = {}; 
    
    if (savedCompletedDataRawString) {
        allCompletedChaptersDataObj = JSON.parse(savedCompletedDataRawString);
    }
    
    // Evaluate initial UI state
    if (allCompletedChaptersDataObj[specificChapterKeyIdentifier] === true) { 
        if (buttonMarkCompleteChapter) { 
            buttonMarkCompleteChapter.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)'; 
            buttonMarkCompleteChapter.style.background = '#00ff88'; 
            buttonMarkCompleteChapter.style.color = '#000'; 
            buttonMarkCompleteChapter.disabled = true; 
        } 
    }
    
    // Listen for completion click
    if (buttonMarkCompleteChapter) {
        buttonMarkCompleteChapter.addEventListener('click', () => {
            if (allCompletedChaptersDataObj[specificChapterKeyIdentifier] !== true) {
                
                // Add to record
                allCompletedChaptersDataObj[specificChapterKeyIdentifier] = true; 
                localStorage.setItem('qms_completed', JSON.stringify(allCompletedChaptersDataObj));
                
                // Change appearance
                buttonMarkCompleteChapter.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)'; 
                buttonMarkCompleteChapter.style.background = '#00ff88'; 
                buttonMarkCompleteChapter.style.color = '#000'; 
                buttonMarkCompleteChapter.disabled = true;
                
                // Notify user
                window.showCustomToast("बधाई हो! आपने यह अध्याय पूरा कर लिया है। +50 XP");
            }
        });
    }

    // ==========================================
    // F. FIREFLY PARTICLES (GLOWING SYMBOLS)
    // ==========================================
    const targetParticleCanvasElement = document.getElementById('bg-canvas');
    
    if (targetParticleCanvasElement) {
        const primaryCanvasContext2D = targetParticleCanvasElement.getContext('2d'); 
        
        targetParticleCanvasElement.width = window.innerWidth; 
        targetParticleCanvasElement.height = window.innerHeight;
        
        const listOfScienceFormulaSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ']; 
        let globalActiveParticlesArray = [];
        
        class QuantumFireflyObjectEngine {
            constructor() {
                const shapeProbabilityFloat = Math.random();
                if (shapeProbabilityFloat > 0.4) {
                    this.geometricShapeType = 'dot';
                } else {
                    this.geometricShapeType = 'symbol';
                }
                
                const randomSymbolSelectionIndex = Math.floor(Math.random() * listOfScienceFormulaSymbols.length);
                this.textStringSymbol = listOfScienceFormulaSymbols[randomSymbolSelectionIndex];
                
                this.canvasPositionX = Math.random() * targetParticleCanvasElement.width; 
                this.canvasPositionY = Math.random() * targetParticleCanvasElement.height;
                
                if (this.geometricShapeType === 'symbol') { 
                    this.renderPixelSize = Math.random() * 15 + 10; 
                    this.movementSpeedX = Math.random() * 0.5 - 0.25; 
                    this.movementSpeedY = Math.random() * -0.8 - 0.2; 
                } else { 
                    this.renderPixelSize = Math.random() * 3 + 1; 
                    this.movementSpeedX = Math.random() * 1 - 0.5; 
                    this.movementSpeedY = Math.random() * -1 - 0.2; 
                }
                
                this.alphaBlinkingVelocity = Math.random() * 0.05 + 0.02; 
                this.alphaSineWaveAngle = Math.random() * Math.PI * 2;
            }
            
            recalculateCoordinateLogic() {
                this.canvasPositionY += this.movementSpeedY; 
                this.canvasPositionX += this.movementSpeedX; 
                this.alphaSineWaveAngle += this.alphaBlinkingVelocity;
                
                if (this.canvasPositionY < -30) { 
                    this.canvasPositionY = targetParticleCanvasElement.height + 30; 
                    this.canvasPositionX = Math.random() * targetParticleCanvasElement.width; 
                }
                
                if (this.canvasPositionX < -30 || this.canvasPositionX > targetParticleCanvasElement.width + 30) { 
                    this.movementSpeedX = this.movementSpeedX * -1; 
                }
            }
            
            renderVisualsToCanvas(ctx) {
                const globalRootComputedStyles = getComputedStyle(document.documentElement);
                let currentThemeAccentColorHex = globalRootComputedStyles.getPropertyValue('--accent-main').trim();
                
                if (currentThemeAccentColorHex === "") {
                    currentThemeAccentColorHex = '#00f0ff';
                }
                
                let dynamicOpacityFloatValue = ((Math.sin(this.alphaSineWaveAngle) + 1) / 2) * 0.8 + 0.1;
                
                ctx.fillStyle = `rgba(255, 255, 255, ${dynamicOpacityFloatValue})`; 
                ctx.shadowBlur = dynamicOpacityFloatValue * 20; 
                ctx.shadowColor = currentThemeAccentColorHex;
                
                if (this.geometricShapeType === 'symbol') { 
                    ctx.font = `${this.renderPixelSize}px "Space Grotesk", sans-serif`; 
                    ctx.fillText(this.textStringSymbol, this.canvasPositionX, this.canvasPositionY); 
                } else { 
                    ctx.beginPath(); 
                    ctx.arc(this.canvasPositionX, this.canvasPositionY, this.renderPixelSize, 0, Math.PI * 2); 
                    ctx.fill(); 
                }
                
                ctx.shadowBlur = 0; 
            }
        }
        
        for (let loopCounter = 0; loopCounter < 60; loopCounter++) {
            globalActiveParticlesArray.push(new QuantumFireflyObjectEngine());
        }
        
        function runMainRenderingLoop() { 
            primaryCanvasContext2D.clearRect(0, 0, targetParticleCanvasElement.width, targetParticleCanvasElement.height); 
            
            globalActiveParticlesArray.forEach(singleParticleElement => { 
                singleParticleElement.recalculateCoordinateLogic(); 
                singleParticleElement.renderVisualsToCanvas(primaryCanvasContext2D); 
            }); 
            
            requestAnimationFrame(runMainRenderingLoop); 
        }
        
        runMainRenderingLoop();
        
        window.addEventListener('resize', () => { 
            targetParticleCanvasElement.width = window.innerWidth; 
            targetParticleCanvasElement.height = window.innerHeight; 
        });
    }
});
