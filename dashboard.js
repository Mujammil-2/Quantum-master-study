/* =========================================================================
   QMS JAVASCRIPT MASTER ENGINE (DASHBOARD - 100% EXPANDED CODE)
   - FEATURES:
     1. Multi-Track BGM Memory System
     2. Advanced Firefly Particles
     3. User Authentication (Logout, Edit Name) - PRIVACY ENHANCED
     4. Pomodoro Timer
     5. Bookmarks (Saved Notes) Renderer
     6. Gamification & Badges Logic
     7. DAILY STREAK CALENDAR LOGIC
========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SMART BGM MEMORY SYSTEM (Multi-Track)
    // ==========================================
    const bgmAudio = document.getElementById('bgm-audio');
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgmVolumeControl = document.getElementById('bgm-volume');
    const bgmTrackSelect = document.getElementById('bgm-track-select');
    
    let isBgmOn = localStorage.getItem('qms_bgm') === 'on';
    let savedBgmVolume = localStorage.getItem('qms_bgm_volume');
    if (savedBgmVolume === null) {
        savedBgmVolume = 0.3; 
    }
    
    let savedBgmTime = localStorage.getItem('qms_bgm_time');
    if (savedBgmTime === null) {
        savedBgmTime = 0; 
    }
    
    let savedBgmTrack = localStorage.getItem('qms_bgm_track');
    if (savedBgmTrack === null) {
        savedBgmTrack = 'bgm1.mp3'; 
    }

    function updateToggleUI(checkboxElement) {
        if (!checkboxElement) return;
        
        const sliderElement = checkboxElement.nextElementSibling;
        
        if (checkboxElement.checked) {
            sliderElement.style.backgroundColor = 'var(--accent-main)';
            sliderElement.style.boxShadow = '0 0 10px var(--accent-glow)';
        } else {
            sliderElement.style.backgroundColor = 'rgba(255,255,255,0.1)';
            sliderElement.style.boxShadow = 'none';
        }
    }

    if (bgmAudio) {
        bgmAudio.src = savedBgmTrack;
        bgmAudio.volume = parseFloat(savedBgmVolume);
        bgmAudio.currentTime = parseFloat(savedBgmTime);

        if (bgmTrackSelect) bgmTrackSelect.value = savedBgmTrack;
        if (bgmVolumeControl) bgmVolumeControl.value = savedBgmVolume;
        if (bgmToggle) {
            bgmToggle.checked = isBgmOn;
            updateToggleUI(bgmToggle);
        }

        const playBgmSafely = () => {
            if (isBgmOn && bgmAudio.paused) {
                bgmAudio.play().catch(error => {
                    console.log("BGM Autoplay blocked by browser.", error);
                });
            }
        };
        
        document.body.addEventListener('click', playBgmSafely, { once: true });

        if (bgmTrackSelect) {
            bgmTrackSelect.addEventListener('change', (event) => {
                const newTrackValue = event.target.value;
                localStorage.setItem('qms_bgm_track', newTrackValue); 
                bgmAudio.src = newTrackValue; 
                if (isBgmOn) bgmAudio.play();
            });
        }

        if (bgmToggle) {
            bgmToggle.addEventListener('change', (event) => {
                isBgmOn = event.target.checked;
                if (isBgmOn) {
                    localStorage.setItem('qms_bgm', 'on');
                    bgmAudio.play();
                } else {
                    localStorage.setItem('qms_bgm', 'off');
                    bgmAudio.pause();
                }
                updateToggleUI(event.target);
            });
        }

        if (bgmVolumeControl) {
            bgmVolumeControl.addEventListener('input', (event) => {
                const newVolume = event.target.value;
                bgmAudio.volume = newVolume;
                localStorage.setItem('qms_bgm_volume', newVolume);
            });
        }

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('qms_bgm_time', bgmAudio.currentTime);
        });
    }

    // ==========================================
    // 2. SPLASH SCREEN (LOADING LOGIC)
    // ==========================================
    const splashScreenElement = document.getElementById('splash-screen');
    const loadingBarElement = document.getElementById('loading-bar');
    const loadingTextElement = document.getElementById('loading-text');
    
    let loadingProgress = 0;
    
    const loadingInterval = setInterval(() => {
        loadingProgress += Math.random() * 15;
        if (loadingProgress > 100) loadingProgress = 100;
        
        if (loadingBarElement) {
            loadingBarElement.style.width = `${loadingProgress}%`;
        }
        
        if (loadingTextElement) {
            if (loadingProgress > 30 && loadingProgress < 70) {
                loadingTextElement.innerText = 'यूज़र प्रोफाइल सिंक्रनाइज़ हो रही है...';
            }
            if (loadingProgress > 70) {
                loadingTextElement.innerText = 'क्वांटम इंजन लोड हो रहा है...';
            }
        }
        
        if (loadingProgress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                if (splashScreenElement) {
                    splashScreenElement.style.opacity = '0';
                    setTimeout(() => {
                        splashScreenElement.style.visibility = 'hidden';
                    }, 800);
                }
            }, 600); 
        }
    }, 200);

    // ==========================================
    // 3. DYNAMIC GREETING & QUOTES
    // ==========================================
    const currentHour = new Date().getHours();
    let dynamicGreetingText = "नमस्ते";
    
    if (currentHour < 12) dynamicGreetingText = "सुप्रभात (Good Morning)";
    else if (currentHour < 18) dynamicGreetingText = "शुभ दोपहर (Good Afternoon)";
    else dynamicGreetingText = "शुभ संध्या (Good Evening)";
    
    const greetingDisplayElement = document.getElementById('dynamic-greeting');
    if (greetingDisplayElement) {
        greetingDisplayElement.innerText = dynamicGreetingText;
    }

    const motivationalQuotesArray = [
        "शिक्षा भविष्य का पासपोर्ट है, क्योंकि कल उनका है जो आज इसकी तैयारी करते हैं।",
        "जितना कठिन संघर्ष होगा, जीत उतनी ही शानदार होगी।",
        "सफलता की शुरुआत हमेशा 'मैं कर सकता हूँ' से होती है।"
    ];
    
    const quoteDisplayElement = document.getElementById('daily-quote');
    if (quoteDisplayElement) {
        const randomIndex = Math.floor(Math.random() * motivationalQuotesArray.length);
        quoteDisplayElement.innerText = `"${motivationalQuotesArray[randomIndex]}"`;
    }

    // ==========================================
    // 4. POMODORO FOCUS TIMER
    // ==========================================
    let focusTimerInterval; 
    let focusTimeLeftInSeconds = 25 * 60; 
    let isFocusTimerRunning = false;
    
    const timerDisplayElement = document.getElementById('timer-display');
    const timerStartButton = document.getElementById('timer-start-btn');
    const timerResetButton = document.getElementById('timer-reset-btn');

    function updateTimerUserInterface() {
        if (!timerDisplayElement) return;
        const remainingMinutes = Math.floor(focusTimeLeftInSeconds / 60);
        const remainingSeconds = focusTimeLeftInSeconds % 60;
        
        const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        
        timerDisplayElement.innerText = `${formattedMinutes}:${formattedSeconds}`;
    }
    
    if (timerStartButton) {
        timerStartButton.addEventListener('click', () => {
            if (isFocusTimerRunning === false) {
                isFocusTimerRunning = true; 
                timerStartButton.innerText = "पॉज़ (Pause)"; 
                timerStartButton.style.background = "#ffc107"; 
                
                focusTimerInterval = setInterval(() => {
                    if (focusTimeLeftInSeconds > 0) {
                        focusTimeLeftInSeconds--; 
                        updateTimerUserInterface(); 
                    } else {
                        clearInterval(focusTimerInterval); 
                        isFocusTimerRunning = false; 
                        
                        if (window.showCustomToast) {
                            window.showCustomToast("शानदार! आपका 25 मिनट का फोकस सेशन पूरा हुआ।", false); 
                        }
                        
                        focusTimeLeftInSeconds = 25 * 60; 
                        updateTimerUserInterface(); 
                        
                        timerStartButton.innerText = "स्टार्ट (Start)"; 
                        timerStartButton.style.background = "var(--accent-main)"; 
                    }
                }, 1000);
            } else {
                clearInterval(focusTimerInterval); 
                isFocusTimerRunning = false; 
                timerStartButton.innerText = "रिज्यूम (Resume)"; 
                timerStartButton.style.background = "var(--accent-main)"; 
            }
        });
    }
    
    if (timerResetButton) {
        timerResetButton.addEventListener('click', () => { 
            clearInterval(focusTimerInterval); 
            isFocusTimerRunning = false; 
            focusTimeLeftInSeconds = 25 * 60; 
            updateTimerUserInterface(); 
            timerStartButton.innerText = "स्टार्ट (Start)"; 
            timerStartButton.style.background = "var(--accent-main)"; 
        });
    }

    // ==========================================
    // 5. 🔖 RENDER BOOKMARKS (SAVED NOTES) LOGIC
    // ==========================================
    const bookmarksContainerElement = document.getElementById('bookmarks-container');
    
    if (bookmarksContainerElement) {
        const rawBookmarksData = localStorage.getItem('qms_bookmarks');
        let parsedBookmarks = {};
        
        if (rawBookmarksData) {
            parsedBookmarks = JSON.parse(rawBookmarksData);
        }
        
        const bookmarkKeysArray = Object.keys(parsedBookmarks);

        if (bookmarkKeysArray.length === 0) {
            bookmarksContainerElement.innerHTML = `
                <div class="glass-card" style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                    <i class="ri-bookmark-line" style="font-size: 2.5rem; margin-bottom: 10px; display: block; opacity: 0.5;"></i>
                    <p>अभी तक कोई नोट्स सेव नहीं किया गया है।</p>
                    <p style="font-size: 0.8rem; margin-top: 5px;">वीडियो प्लेयर पर जाकर ❤️ बुकमार्क पर क्लिक करें।</p>
                </div>
            `;
        } else {
            bookmarksContainerElement.style.display = 'grid';
            bookmarksContainerElement.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
            bookmarksContainerElement.style.gap = '15px';
            
            let finalBookmarksHTML = '';
            
            bookmarkKeysArray.forEach(key => {
                let bookmarkItem = parsedBookmarks[key];
                let iconColorHex = 'var(--accent-main)'; 
                
                if (bookmarkItem.subject === 'chemistry') { iconColorHex = '#b535ff'; }
                if (bookmarkItem.subject === 'mathematics') { iconColorHex = '#00ff88'; }

                finalBookmarksHTML += `
                    <div class="glass-card sfx-trigger" 
                         style="padding: 1.2rem; cursor: pointer; display: flex; align-items: center; gap: 15px; transition: 0.3s; border-left: 4px solid ${iconColorHex};" 
                         onclick="window.location.href='player.html?subject=${bookmarkItem.subject}&chapter=${bookmarkItem.id}'" 
                         onmouseover="this.style.background='rgba(255,255,255,0.05)'" 
                         onmouseout="this.style.background='transparent'">
                         
                        <div style="width: 45px; height: 45px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; justify-content: center; align-items: center; font-size: 1.5rem; color: ${iconColorHex}; flex-shrink: 0;">
                            <i class="ri-bookmark-3-fill"></i>
                        </div>
                        
                        <div>
                            <h4 style="font-family: var(--font-hindi); font-size: 1.05rem; margin-bottom: 3px; line-height:1.2; color: #fff;">
                                ${bookmarkItem.title}
                            </h4>
                            <p style="font-size: 0.8rem; color: var(--text-secondary); text-transform: capitalize;">
                                ${bookmarkItem.subject} • Chapter ${bookmarkItem.id}
                            </p>
                        </div>
                        
                    </div>
                `;
            });
            
            bookmarksContainerElement.innerHTML = finalBookmarksHTML;
        }
    }

    // ==========================================
    // 6. ADVANCED QUANTUM PARTICLES ENGINE
    // ==========================================
    const backgroundCanvasElement = document.getElementById('bg-canvas');
    
    if (backgroundCanvasElement) {
        const canvasContext = backgroundCanvasElement.getContext('2d'); 
        backgroundCanvasElement.width = window.innerWidth; 
        backgroundCanvasElement.height = window.innerHeight;
        
        const scienceMathSymbolsArray = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let quantumParticlesArray = [];
        
        class QuantumFireflyParticle {
            constructor() {
                const typeProbability = Math.random();
                if (typeProbability > 0.4) { this.particleShapeType = 'dot'; } 
                else { this.particleShapeType = 'symbol'; }
                
                const randomSymbolIndex = Math.floor(Math.random() * scienceMathSymbolsArray.length);
                this.symbolCharacter = scienceMathSymbolsArray[randomSymbolIndex];
                
                this.coordinateX = Math.random() * backgroundCanvasElement.width; 
                this.coordinateY = Math.random() * backgroundCanvasElement.height;
                
                if (this.particleShapeType === 'symbol') { 
                    this.particleSize = Math.random() * 15 + 10; 
                    this.speedVelocityX = Math.random() * 0.5 - 0.25; 
                    this.speedVelocityY = Math.random() * -0.8 - 0.2; 
                } else { 
                    this.particleSize = Math.random() * 3 + 1; 
                    this.speedVelocityX = Math.random() * 1 - 0.5; 
                    this.speedVelocityY = Math.random() * -1 - 0.2; 
                }
                
                this.blinkingSpeed = Math.random() * 0.05 + 0.02; 
                this.blinkingSineAngle = Math.random() * Math.PI * 2;
            }
            
            updateParticleCoordinates() {
                this.coordinateY += this.speedVelocityY; 
                this.coordinateX += this.speedVelocityX; 
                this.blinkingSineAngle += this.blinkingSpeed;
                
                if (this.coordinateY < -30) { 
                    this.coordinateY = backgroundCanvasElement.height + 30; 
                    this.coordinateX = Math.random() * backgroundCanvasElement.width; 
                }
                if (this.coordinateX < -30 || this.coordinateX > backgroundCanvasElement.width + 30) { 
                    this.speedVelocityX = this.speedVelocityX * -1; 
                }
            }
            
            drawParticleToCanvas(ctx) {
                const rootCssVariables = getComputedStyle(document.documentElement);
                let themePrimaryColor = rootCssVariables.getPropertyValue('--accent-main').trim() || '#00f0ff';
                let dynamicOpacityValue = ((Math.sin(this.blinkingSineAngle) + 1) / 2) * 0.8 + 0.1;
                
                ctx.fillStyle = `rgba(255, 255, 255, ${dynamicOpacityValue})`;
                ctx.shadowBlur = dynamicOpacityValue * 20; 
                ctx.shadowColor = themePrimaryColor;
                
                if (this.particleShapeType === 'symbol') { 
                    ctx.font = `${this.particleSize}px "Space Grotesk", sans-serif`; 
                    ctx.fillText(this.symbolCharacter, this.coordinateX, this.coordinateY); 
                } else { 
                    ctx.beginPath(); 
                    ctx.arc(this.coordinateX, this.coordinateY, this.particleSize, 0, Math.PI * 2); 
                    ctx.fill(); 
                }
                
                ctx.shadowBlur = 0; 
            }
        }
        
        for (let iterationCount = 0; iterationCount < 60; iterationCount++) {
            quantumParticlesArray.push(new QuantumFireflyParticle());
        }
        
        function executeParticleAnimationLoop() { 
            canvasContext.clearRect(0, 0, backgroundCanvasElement.width, backgroundCanvasElement.height); 
            quantumParticlesArray.forEach(singleParticleObject => { 
                singleParticleObject.updateParticleCoordinates(); 
                singleParticleObject.drawParticleToCanvas(canvasContext); 
            }); 
            requestAnimationFrame(executeParticleAnimationLoop); 
        }
        
        executeParticleAnimationLoop();
        
        window.addEventListener('resize', () => { 
            backgroundCanvasElement.width = window.innerWidth; 
            backgroundCanvasElement.height = window.innerHeight; 
        });
    }

    // ==========================================
    // 7. PREMIUM CUSTOM MODALS & TOASTS 
    // ==========================================
    window.showCustomToast = function(messageText, isErrorMessage = false) {
        const existingToastNode = document.querySelector('.qms-toast-msg'); 
        if (existingToastNode) { existingToastNode.remove(); }
        
        const toastElementNode = document.createElement('div'); 
        if (isErrorMessage) {
            toastElementNode.className = 'qms-toast-msg qms-toast-error';
            toastElementNode.innerHTML = `<i class="ri-error-warning-fill"></i> ${messageText}`;
        } else {
            toastElementNode.className = 'qms-toast-msg';
            toastElementNode.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${messageText}`;
        }
        
        document.body.appendChild(toastElementNode); 
        setTimeout(() => { if (toastElementNode) toastElementNode.remove(); }, 3000); 
    };

    const modalOverlayContainer = document.createElement('div'); 
    modalOverlayContainer.className = 'qms-modal-overlay';
    modalOverlayContainer.innerHTML = `
        <div class="qms-modal-box">
            <div class="qms-modal-title" id="qms-modal-title"></div>
            <input type="text" class="qms-modal-input" id="qms-modal-input">
            <div class="qms-modal-buttons">
                <button class="qms-modal-btn btn-cancel" id="qms-modal-cancel">रद्द करें</button>
                <button class="qms-modal-btn btn-confirm" id="qms-modal-confirm">सेव करें</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlayContainer);

    const targetModalTitle = document.getElementById('qms-modal-title'); 
    const targetModalInput = document.getElementById('qms-modal-input'); 
    const targetModalConfirmButton = document.getElementById('qms-modal-confirm'); 
    let activeModalCallbackFunction = null;

    window.showCustomPrompt = function(titleText, defaultInputValue, callbackFunc) { 
        targetModalTitle.innerHTML = `<i class="ri-edit-2-line" style="color: var(--accent-main); font-size: 1.5rem; display:block; margin-bottom: 5px;"></i> ${titleText}`; 
        targetModalInput.style.display = 'block'; 
        targetModalInput.value = defaultInputValue; 
        targetModalConfirmButton.style.background = 'var(--accent-main)'; 
        targetModalConfirmButton.style.color = '#000'; 
        targetModalConfirmButton.innerText = 'सेव करें'; 
        
        modalOverlayContainer.classList.add('active'); 
        setTimeout(() => { targetModalInput.focus(); }, 100); 
        activeModalCallbackFunction = callbackFunc; 
    };

    window.showCustomConfirm = function(titleText, callbackFunc) { 
        targetModalTitle.innerHTML = `<i class="ri-error-warning-line" style="color: #ff4d4d; font-size: 2rem; display:block; margin-bottom: 5px;"></i> ${titleText}`; 
        targetModalInput.style.display = 'none'; 
        targetModalConfirmButton.style.background = '#ff4d4d'; 
        targetModalConfirmButton.style.color = '#fff'; 
        targetModalConfirmButton.innerText = 'हाँ, करें'; 
        
        modalOverlayContainer.classList.add('active'); 
        activeModalCallbackFunction = callbackFunc; 
    };
    
    const modalCancelButton = document.getElementById('qms-modal-cancel');
    if (modalCancelButton) {
        modalCancelButton.addEventListener('click', () => {
            modalOverlayContainer.classList.remove('active');
        });
    }
    
    if (targetModalConfirmButton) {
        targetModalConfirmButton.addEventListener('click', () => { 
            if (activeModalCallbackFunction) {
                if (targetModalInput.style.display === 'none') { activeModalCallbackFunction(true); } 
                else { activeModalCallbackFunction(targetModalInput.value); }
            }
            modalOverlayContainer.classList.remove('active'); 
        });
    }

    // ==========================================
    // 8. 🏆 GAMIFICATION & BADGES ENGINE
    // ==========================================
    // 🚀 PRIVACY FIX: Removed hardcoded name "Alina Sami". Fallback is now "Student"
    const savedUserNameValue = localStorage.getItem('qms_user_name') || 'Student';
    
    let completedChaptersData = {};
    const rawCompletedData = localStorage.getItem('qms_completed');
    if (rawCompletedData) {
        completedChaptersData = JSON.parse(rawCompletedData);
    }
    
    const completedChaptersCountNumber = Object.keys(completedChaptersData).length;
    let storedExtraXp = parseInt(localStorage.getItem('qms_total_xp')) || 0;
    let grandTotalXp = (completedChaptersCountNumber * 50) + storedExtraXp;
    
    localStorage.setItem('qms_total_xp', grandTotalXp);

    const dashUserNameElement = document.getElementById('dash-user-name');
    if (dashUserNameElement) { dashUserNameElement.innerText = savedUserNameValue; }
    
    const panelUserNameElement = document.getElementById('panel-user-name');
    if (panelUserNameElement) { panelUserNameElement.innerText = savedUserNameValue; }

    const dashCompletedCountElement = document.getElementById('dash-completed-count');
    if (dashCompletedCountElement) { dashCompletedCountElement.innerText = completedChaptersCountNumber; }
    
    const dashTotalXpElement = document.getElementById('dash-total-xp');
    if (dashTotalXpElement) { dashTotalXpElement.innerText = grandTotalXp; }

    const qmsBadgesData = [
        { id: 'b1', name: 'क्वांटम स्टार्टर', icon: 'ri-seedling-fill', color: '#00f0ff', requiredXp: 0, desc: 'QMS जॉइन किया' },
        { id: 'b2', name: 'फोकस मास्टर', icon: 'ri-focus-2-fill', color: '#00ff88', requiredXp: 100, desc: '100 XP प्राप्त किए' },
        { id: 'b3', name: 'सुपर स्कॉलर', icon: 'ri-book-open-fill', color: '#b535ff', requiredXp: 500, desc: '500 XP प्राप्त किए' },
        { id: 'b4', name: 'क्वांटम लीजेंड', icon: 'ri-vip-crown-fill', color: '#ffc107', requiredXp: 1000, desc: '1000 XP प्राप्त किए' }
    ];

    const badgesContainerElement = document.getElementById('badges-container');
    if (badgesContainerElement) {
        let badgesHTMLString = '';
        qmsBadgesData.forEach(badgeObject => {
            const isBadgeUnlocked = grandTotalXp >= badgeObject.requiredXp;
            const badgeStatusClass = isBadgeUnlocked ? 'unlocked' : 'locked';
            const lockedOverlayHTML = isBadgeUnlocked ? '' : '<div class="locked-overlay"><i class="ri-lock-2-fill"></i></div>';
            
            badgesHTMLString += `
                <div class="badge-card ${badgeStatusClass} sfx-trigger" title="${badgeObject.desc}">
                    ${lockedOverlayHTML}
                    <i class="${badgeObject.icon} badge-icon" style="color: ${badgeObject.color};"></i>
                    <h4 class="badge-title">${badgeObject.name}</h4>
                    <p class="badge-desc">${badgeObject.desc}</p>
                </div>
            `;
        });
        badgesContainerElement.innerHTML = badgesHTMLString;
    }

    // ==========================================
    // 9. SETTINGS PANEL INTERFACE LOGIC
    // ==========================================
    const sidePanelElement = document.getElementById('settings-panel'); 
    const sidePanelOverlayBg = document.getElementById('panel-overlay'); 
    
    function closeSettingsPanelAction() { 
        if (sidePanelElement) { sidePanelElement.classList.remove('active'); }
        if (sidePanelOverlayBg) { sidePanelOverlayBg.classList.remove('active'); }
    }
    
    const openPanelButtonTrigger = document.getElementById('open-panel-btn');
    if (openPanelButtonTrigger) {
        openPanelButtonTrigger.addEventListener('click', () => { 
            sidePanelElement.classList.add('active'); 
            sidePanelOverlayBg.classList.add('active'); 
        });
    }
    
    const closePanelButtonTrigger = document.getElementById('close-panel');
    if (closePanelButtonTrigger) {
        closePanelButtonTrigger.addEventListener('click', closeSettingsPanelAction); 
    }
    
    if (sidePanelOverlayBg) {
        sidePanelOverlayBg.addEventListener('click', closeSettingsPanelAction);
    }

    const allThemeOptionCards = document.querySelectorAll('.theme-option-card');
    allThemeOptionCards.forEach(singleThemeCard => {
        singleThemeCard.addEventListener('click', function() { 
            const newThemeNameSelected = this.getAttribute('data-set-theme'); 
            document.documentElement.setAttribute('data-theme', newThemeNameSelected); 
            localStorage.setItem('qms_theme', newThemeNameSelected); 
        });
    });

    const preferenceDropdownIds = ['pdf-location-pref', 'video-quality-pref'];
    preferenceDropdownIds.forEach(dropdownId => {
        const targetDropdownElement = document.getElementById(dropdownId); 
        const previouslySavedPrefValue = localStorage.getItem(`qms_${dropdownId}`); 
        if (previouslySavedPrefValue && targetDropdownElement) { targetDropdownElement.value = previouslySavedPrefValue; }
        if (targetDropdownElement) {
            targetDropdownElement.addEventListener('change', (event) => {
                localStorage.setItem(`qms_${dropdownId}`, event.target.value);
            });
        }
    });

    const savedProfileImageSrc = localStorage.getItem('qms_profile_img');
    if (savedProfileImageSrc) {
        const dashSmallAvatarImage = document.getElementById('dash-small-avatar');
        if (dashSmallAvatarImage) { dashSmallAvatarImage.src = savedProfileImageSrc; }
        const panelProfileImageAvatar = document.getElementById('panel-profile-img');
        if (panelProfileImageAvatar) { panelProfileImageAvatar.src = savedProfileImageSrc; }
    }

    // ==========================================
    // 10. SYSTEM AUDIO FX (CLICK SOUNDS)
    // ==========================================
    const sfxClickAudioNode = document.getElementById('sfx-click'); 
    let isSystemSoundTurnedOn = true;
    if (localStorage.getItem('qms_sound') === 'off') { isSystemSoundTurnedOn = false; }
    
    const soundToggleSwitchElement = document.getElementById('sound-toggle');
    if (soundToggleSwitchElement) { 
        soundToggleSwitchElement.checked = isSystemSoundTurnedOn; 
        updateToggleUI(soundToggleSwitchElement); 
        
        soundToggleSwitchElement.addEventListener('change', (event) => { 
            isSystemSoundTurnedOn = event.target.checked; 
            if (isSystemSoundTurnedOn) { localStorage.setItem('qms_sound', 'on'); } 
            else { localStorage.setItem('qms_sound', 'off'); }
            updateToggleUI(event.target); 
        }); 
    }

    const allSfxTriggerElements = document.querySelectorAll('.sfx-trigger');
    allSfxTriggerElements.forEach(triggerBtn => { 
        triggerBtn.addEventListener('click', () => { 
            if (isSystemSoundTurnedOn && sfxClickAudioNode) { 
                sfxClickAudioNode.currentTime = 0; 
                sfxClickAudioNode.volume = 1.0; 
                sfxClickAudioNode.play().catch(err => { console.log("SFX Play Error:", err); }); 
            } 
        }); 
    });

    // ==========================================
    // 11. PROFILE IMAGE UPLOAD & COMPRESSOR
    // ==========================================
    const profileImageUploadInput = document.getElementById('img-upload');
    if (profileImageUploadInput) {
        profileImageUploadInput.addEventListener('change', function(event) {
            const uploadedFile = event.target.files[0];
            if (uploadedFile) {
                const fileReaderInstance = new FileReader();
                fileReaderInstance.onload = function(readerEvent) {
                    const tempImgNode = new Image();
                    tempImgNode.onload = function() {
                        const temporaryCanvas = document.createElement('canvas'); 
                        const temporaryCanvasContext = temporaryCanvas.getContext('2d');
                        const maxAllowedDimension = 200; 
                        let targetWidth = tempImgNode.width; 
                        let targetHeight = tempImgNode.height;
                        
                        if (targetWidth > targetHeight) { 
                            if (targetWidth > maxAllowedDimension) { targetHeight *= maxAllowedDimension / targetWidth; targetWidth = maxAllowedDimension; } 
                        } else { 
                            if (targetHeight > maxAllowedDimension) { targetWidth *= maxAllowedDimension / targetHeight; targetHeight = maxAllowedDimension; } 
                        }
                        
                        temporaryCanvas.width = targetWidth; 
                        temporaryCanvas.height = targetHeight; 
                        temporaryCanvasContext.drawImage(tempImgNode, 0, 0, targetWidth, targetHeight);
                        const compressedImageBase64String = temporaryCanvas.toDataURL('image/jpeg', 0.8);
                        
                        const dashSmallAvatarImg = document.getElementById('dash-small-avatar');
                        if (dashSmallAvatarImg) { dashSmallAvatarImg.src = compressedImageBase64String; }
                        const panelProfileImg = document.getElementById('panel-profile-img');
                        if (panelProfileImg) { panelProfileImg.src = compressedImageBase64String; }
                        
                        try { 
                            localStorage.setItem('qms_profile_img', compressedImageBase64String); 
                            if(window.showCustomToast) { window.showCustomToast("प्रोफाइल फोटो सफलतापूर्क सेव हो गई!"); }
                        } catch(localStorageError) { 
                            if(window.showCustomToast) { window.showCustomToast("फोटो बहुत बड़ी है! सेव करने में एरर।", true); }
                        }
                    };
                    tempImgNode.src = readerEvent.target.result;
                };
                fileReaderInstance.readAsDataURL(uploadedFile);
            }
        });
    }

    // ==========================================
    // 12. EDIT PROFILE NAME & LOGOUT ACTIONS
    // ==========================================
    const editUserNameButton = document.getElementById('edit-name-btn');
    if (editUserNameButton) { 
        editUserNameButton.addEventListener('click', function() { 
            // 🚀 PRIVACY FIX: Default value is 'Student', not 'Alina Sami'
            const currentSavedNameValue = localStorage.getItem('qms_user_name') || 'Student'; 
            
            window.showCustomPrompt("अपना नया नाम दर्ज करें", currentSavedNameValue, (newSubmittedName) => { 
                if (newSubmittedName && newSubmittedName.trim() !== "") { 
                    const cleanedNewName = newSubmittedName.trim(); 
                    localStorage.setItem('qms_user_name', cleanedNewName); 
                    
                    const dashNameEl = document.getElementById('dash-user-name');
                    if (dashNameEl) { dashNameEl.innerText = cleanedNewName; }
                    
                    const panelNameEl = document.getElementById('panel-user-name');
                    if (panelNameEl) { panelNameEl.innerText = cleanedNewName; }
                    
                    if(window.showCustomToast) { window.showCustomToast("नाम सफलतापूर्वक अपडेट हो गया!"); }
                } 
            }); 
        }); 
    }

    const resetLogoutButton = document.getElementById('reset-btn');
    if (resetLogoutButton) { 
        resetLogoutButton.addEventListener('click', () => { 
            window.showCustomConfirm("क्या आप सच में लॉगआउट करना चाहते हैं?", (userConfirmedLogout) => { 
                if (userConfirmedLogout === true) { 
                    localStorage.setItem('qms_is_logged_in', 'false');
                    window.location.href = "index.html"; 
                } 
            }); 
        }); 
    }

    // ==========================================
    // 13. 📅 DAILY STREAK CALENDAR LOGIC
    // ==========================================
    function initializeDailyStreakCalendar() {
        const streakCalendarContainer = document.getElementById('streak-calendar');
        const streakCountTextNode = document.getElementById('streak-count-text');
        const mainTopStreakDisplay = document.getElementById('main-streak-display');
        if (!streakCalendarContainer) return;

        const getLocalDateString = (dateObject) => {
            const timeZoneOffset = dateObject.getTimezoneOffset() * 60000; 
            return (new Date(dateObject - timeZoneOffset)).toISOString().split('T')[0];
        };

        const todayDateObject = new Date();
        const todayDateString = getLocalDateString(todayDateObject);

        let currentStreakHistory = {};
        const rawStreakData = localStorage.getItem('qms_streak_history');
        if (rawStreakData) { currentStreakHistory = JSON.parse(rawStreakData); }
        
        currentStreakHistory[todayDateString] = true;
        localStorage.setItem('qms_streak_history', JSON.stringify(currentStreakHistory));

        let activeStreakCount = 0;
        let dateCheckerObject = new Date(todayDateObject);
        
        while (true) {
            let checkerDateString = getLocalDateString(dateCheckerObject);
            if (currentStreakHistory[checkerDateString] === true) {
                activeStreakCount++;
                dateCheckerObject.setDate(dateCheckerObject.getDate() - 1);
            } else { break; }
        }
        
        if (streakCountTextNode) { streakCountTextNode.innerText = activeStreakCount; }
        if (mainTopStreakDisplay) { mainTopStreakDisplay.innerText = activeStreakCount + ' दिन'; }

        let currentDayOfWeekNum = todayDateObject.getDay(); 
        let daysToSubtractForMonday = todayDateObject.getDate() - currentDayOfWeekNum + (currentDayOfWeekNum === 0 ? -6 : 1); 
        let mondayDateObject = new Date(todayDateObject.setDate(daysToSubtractForMonday));

        const dayNamesList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        let calendarHtmlContent = '';

        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            let loopTargetDateObj = new Date(mondayDateObject);
            loopTargetDateObj.setDate(mondayDateObject.getDate() + dayIndex);
            let loopTargetDateString = getLocalDateString(loopTargetDateObj);
            
            let uiStatusClass = 'future';
            let iconClassString = 'ri-checkbox-blank-circle-line'; 

            let realTodayDateObj = new Date();
            let realTodayDateString = getLocalDateString(realTodayDateObj);

            if (loopTargetDateString === realTodayDateString) {
                uiStatusClass = 'today completed';
                iconClassString = 'ri-check-line';
            } 
            else if (loopTargetDateObj < realTodayDateObj) {
                if (currentStreakHistory[loopTargetDateString] === true) {
                    uiStatusClass = 'completed';
                    iconClassString = 'ri-check-line';
                } else {
                    uiStatusClass = 'missed';
                    iconClassString = 'ri-close-line';
                }
            }

            calendarHtmlContent += `
                <div class="streak-day ${uiStatusClass}">
                    <span class="streak-day-name">${dayNamesList[dayIndex]}</span>
                    <div class="streak-circle"><i class="${iconClassString}"></i></div>
                </div>
            `;
        }
        streakCalendarContainer.innerHTML = calendarHtmlContent;
    }
    initializeDailyStreakCalendar();
});
