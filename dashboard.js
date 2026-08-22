/* =========================================================================
   QMS JAVASCRIPT MASTER ENGINE (DASHBOARD)
   - 100% FULL CODE (EXPANDED FOR MAXIMUM READABILITY)
   - FEATURES:
     1. Multi-Track BGM Memory System
     2. Advanced Firefly Particles
     3. User Authentication (Logout, Edit Name)
     4. Pomodoro Timer
     5. Bookmarks (Saved Notes) Renderer
========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SMART BGM MEMORY SYSTEM (Multi-Track)
    // ==========================================
    const bgmAudio = document.getElementById('bgm-audio');
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgmVolumeControl = document.getElementById('bgm-volume');
    const bgmTrackSelect = document.getElementById('bgm-track-select');
    
    // Retrieve Saved Settings from LocalStorage
    let isBgmOn = localStorage.getItem('qms_bgm') === 'on';
    let savedBgmVolume = localStorage.getItem('qms_bgm_volume');
    if (savedBgmVolume === null) {
        savedBgmVolume = 0.3; // Default Volume
    }
    
    let savedBgmTime = localStorage.getItem('qms_bgm_time');
    if (savedBgmTime === null) {
        savedBgmTime = 0; // Default Time
    }
    
    let savedBgmTrack = localStorage.getItem('qms_bgm_track');
    if (savedBgmTrack === null) {
        savedBgmTrack = 'bgm1.mp3'; // Default Track
    }

    // Function to visually update the UI Toggle Switch
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

    // Initialize Audio Logic
    if (bgmAudio) {
        
        // Apply saved settings
        bgmAudio.src = savedBgmTrack;
        bgmAudio.volume = parseFloat(savedBgmVolume);
        bgmAudio.currentTime = parseFloat(savedBgmTime);

        // Update UI controls to reflect saved states
        if (bgmTrackSelect) {
            bgmTrackSelect.value = savedBgmTrack;
        }
        
        if (bgmVolumeControl) {
            bgmVolumeControl.value = savedBgmVolume;
        }
        
        if (bgmToggle) {
            bgmToggle.checked = isBgmOn;
            updateToggleUI(bgmToggle);
        }

        // Auto-play safely upon first user interaction
        const playBgmSafely = () => {
            if (isBgmOn && bgmAudio.paused) {
                bgmAudio.play().catch(error => {
                    console.log("BGM Autoplay blocked by browser. Awaiting manual user interaction.", error);
                });
            }
        };
        
        // Listen for a global click to trigger audio
        document.body.addEventListener('click', playBgmSafely, { once: true });

        // Event Listener: Change Track
        if (bgmTrackSelect) {
            bgmTrackSelect.addEventListener('change', (event) => {
                const newTrackValue = event.target.value;
                localStorage.setItem('qms_bgm_track', newTrackValue); 
                
                bgmAudio.src = newTrackValue; 
                
                if (isBgmOn) {
                    bgmAudio.play();
                }
            });
        }

        // Event Listener: Toggle BGM ON/OFF
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

        // Event Listener: Change Volume
        if (bgmVolumeControl) {
            bgmVolumeControl.addEventListener('input', (event) => {
                const newVolume = event.target.value;
                bgmAudio.volume = newVolume;
                localStorage.setItem('qms_bgm_volume', newVolume);
            });
        }

        // Event Listener: Save exact time right before leaving page
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
        // Increment progress randomly
        loadingProgress += Math.random() * 15;
        
        if (loadingProgress > 100) {
            loadingProgress = 100;
        }
        
        // Update Bar Width
        if (loadingBarElement) {
            loadingBarElement.style.width = `${loadingProgress}%`;
        }
        
        // Update Text
        if (loadingTextElement) {
            if (loadingProgress > 30 && loadingProgress < 70) {
                loadingTextElement.innerText = 'यूज़र प्रोफाइल सिंक्रनाइज़ हो रही है...';
            }
            if (loadingProgress > 70) {
                loadingTextElement.innerText = 'क्वांटम इंजन लोड हो रहा है...';
            }
        }
        
        // Finish Loading
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
    
    if (currentHour < 12) {
        dynamicGreetingText = "सुप्रभात (Good Morning)";
    } else if (currentHour < 18) {
        dynamicGreetingText = "शुभ दोपहर (Good Afternoon)";
    } else {
        dynamicGreetingText = "शुभ संध्या (Good Evening)";
    }
    
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
    let focusTimeLeftInSeconds = 25 * 60; // 25 Minutes
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
                // START OR RESUME TIMER
                isFocusTimerRunning = true; 
                timerStartButton.innerText = "पॉज़ (Pause)"; 
                timerStartButton.style.background = "#ffc107"; // Yellow color for pause state
                
                focusTimerInterval = setInterval(() => {
                    if (focusTimeLeftInSeconds > 0) {
                        focusTimeLeftInSeconds--; 
                        updateTimerUserInterface(); 
                    } else {
                        // TIMER COMPLETE
                        clearInterval(focusTimerInterval); 
                        isFocusTimerRunning = false; 
                        
                        if (window.showCustomToast) {
                            window.showCustomToast("शानदार! आपका 25 मिनट का फोकस सेशन पूरा हुआ।", false); 
                        }
                        
                        // Reset automatically
                        focusTimeLeftInSeconds = 25 * 60; 
                        updateTimerUserInterface(); 
                        
                        timerStartButton.innerText = "स्टार्ट (Start)"; 
                        timerStartButton.style.background = "var(--accent-main)"; 
                    }
                }, 1000);
            } else {
                // PAUSE TIMER
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
        // Fetch saved bookmarks from localStorage
        const rawBookmarksData = localStorage.getItem('qms_bookmarks');
        let parsedBookmarks = {};
        
        if (rawBookmarksData) {
            parsedBookmarks = JSON.parse(rawBookmarksData);
        }
        
        const bookmarkKeysArray = Object.keys(parsedBookmarks);

        // If no bookmarks exist
        if (bookmarkKeysArray.length === 0) {
            bookmarksContainerElement.innerHTML = `
                <div class="glass-card" style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                    <i class="ri-bookmark-line" style="font-size: 2.5rem; margin-bottom: 10px; display: block; opacity: 0.5;"></i>
                    <p>अभी तक कोई नोट्स सेव नहीं किया गया है।</p>
                    <p style="font-size: 0.8rem; margin-top: 5px;">वीडियो प्लेयर पर जाकर ❤️ बुकमार्क पर क्लिक करें।</p>
                </div>
            `;
        } else {
            // Setup Grid Layout Dynamically
            bookmarksContainerElement.style.display = 'grid';
            bookmarksContainerElement.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
            bookmarksContainerElement.style.gap = '15px';
            
            let finalBookmarksHTML = '';
            
            bookmarkKeysArray.forEach(key => {
                let bookmarkItem = parsedBookmarks[key];
                
                // Determine icon color based on subject
                let iconColorHex = 'var(--accent-main)'; // Default Physics
                
                if (bookmarkItem.subject === 'chemistry') {
                    iconColorHex = '#b535ff'; // Purple
                }
                
                if (bookmarkItem.subject === 'mathematics') {
                    iconColorHex = '#00ff88'; // Emerald Green
                }

                // Construct HTML Card for the Bookmark
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
            
            // Inject into DOM
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
                // Determine if particle is a dot or a symbol
                const typeProbability = Math.random();
                if (typeProbability > 0.4) {
                    this.particleShapeType = 'dot';
                } else {
                    this.particleShapeType = 'symbol';
                }
                
                // Select Random Symbol
                const randomSymbolIndex = Math.floor(Math.random() * scienceMathSymbolsArray.length);
                this.symbolCharacter = scienceMathSymbolsArray[randomSymbolIndex];
                
                // Set Random Coordinates
                this.coordinateX = Math.random() * backgroundCanvasElement.width; 
                this.coordinateY = Math.random() * backgroundCanvasElement.height;
                
                // Set Speed and Size based on type
                if (this.particleShapeType === 'symbol') { 
                    this.particleSize = Math.random() * 15 + 10; 
                    this.speedVelocityX = Math.random() * 0.5 - 0.25; 
                    this.speedVelocityY = Math.random() * -0.8 - 0.2; 
                } else { 
                    this.particleSize = Math.random() * 3 + 1; 
                    this.speedVelocityX = Math.random() * 1 - 0.5; 
                    this.speedVelocityY = Math.random() * -1 - 0.2; 
                }
                
                // Blinking effect logic variables
                this.blinkingSpeed = Math.random() * 0.05 + 0.02; 
                this.blinkingSineAngle = Math.random() * Math.PI * 2;
            }
            
            updateParticleCoordinates() {
                this.coordinateY += this.speedVelocityY; 
                this.coordinateX += this.speedVelocityX; 
                this.blinkingSineAngle += this.blinkingSpeed;
                
                // Loop vertically
                if (this.coordinateY < -30) { 
                    this.coordinateY = backgroundCanvasElement.height + 30; 
                    this.coordinateX = Math.random() * backgroundCanvasElement.width; 
                }
                
                // Bounce horizontally
                if (this.coordinateX < -30 || this.coordinateX > backgroundCanvasElement.width + 30) { 
                    this.speedVelocityX = this.speedVelocityX * -1; 
                }
            }
            
            drawParticleToCanvas(ctx) {
                // Determine correct color from active CSS Theme
                const rootCssVariables = getComputedStyle(document.documentElement);
                let themePrimaryColor = rootCssVariables.getPropertyValue('--accent-main').trim();
                
                if (!themePrimaryColor) {
                    themePrimaryColor = '#00f0ff'; // Fallback
                }
                
                // Calculate Blinking Opacity using Sine wave
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
                
                // Reset shadow blur so it doesn't leak
                ctx.shadowBlur = 0; 
            }
        }
        
        // Spawn 60 Particles
        for (let iterationCount = 0; iterationCount < 60; iterationCount++) {
            quantumParticlesArray.push(new QuantumFireflyParticle());
        }
        
        // Define Animation Loop
        function executeParticleAnimationLoop() { 
            canvasContext.clearRect(0, 0, backgroundCanvasElement.width, backgroundCanvasElement.height); 
            
            quantumParticlesArray.forEach(singleParticleObject => { 
                singleParticleObject.updateParticleCoordinates(); 
                singleParticleObject.drawParticleToCanvas(canvasContext); 
            }); 
            
            requestAnimationFrame(executeParticleAnimationLoop); 
        }
        
        // Start Loop
        executeParticleAnimationLoop();
        
        // Listen for screen resize to adjust canvas boundaries
        window.addEventListener('resize', () => { 
            backgroundCanvasElement.width = window.innerWidth; 
            backgroundCanvasElement.height = window.innerHeight; 
        });
    }

    // ==========================================
    // 7. PREMIUM CUSTOM MODALS & TOASTS 
    // ==========================================
    
    // Toast Notification System
    window.showCustomToast = function(messageText, isErrorMessage = false) {
        
        // Remove existing toast if present
        const existingToastNode = document.querySelector('.qms-toast-msg'); 
        if (existingToastNode) {
            existingToastNode.remove();
        }
        
        // Create new toast DOM element
        const toastElementNode = document.createElement('div'); 
        
        if (isErrorMessage) {
            toastElementNode.className = 'qms-toast-msg qms-toast-error';
            toastElementNode.innerHTML = `<i class="ri-error-warning-fill"></i> ${messageText}`;
        } else {
            toastElementNode.className = 'qms-toast-msg';
            toastElementNode.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${messageText}`;
        }
        
        document.body.appendChild(toastElementNode); 
        
        // Auto remove after 3 seconds
        setTimeout(() => { 
            if (toastElementNode) {
                toastElementNode.remove(); 
            }
        }, 3000); 
    };

    // Modal UI Construction
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

    // Show Prompt (For inputs like changing name)
    window.showCustomPrompt = function(titleText, defaultInputValue, callbackFunc) { 
        targetModalTitle.innerHTML = `<i class="ri-edit-2-line" style="color: var(--accent-main); font-size: 1.5rem; display:block; margin-bottom: 5px;"></i> ${titleText}`; 
        targetModalInput.style.display = 'block'; 
        targetModalInput.value = defaultInputValue; 
        targetModalConfirmButton.style.background = 'var(--accent-main)'; 
        targetModalConfirmButton.style.color = '#000'; 
        targetModalConfirmButton.innerText = 'सेव करें'; 
        
        modalOverlayContainer.classList.add('active'); 
        
        setTimeout(() => {
            targetModalInput.focus();
        }, 100); 
        
        activeModalCallbackFunction = callbackFunc; 
    };

    // Show Confirm (For actions like logout)
    window.showCustomConfirm = function(titleText, callbackFunc) { 
        targetModalTitle.innerHTML = `<i class="ri-error-warning-line" style="color: #ff4d4d; font-size: 2rem; display:block; margin-bottom: 5px;"></i> ${titleText}`; 
        targetModalInput.style.display = 'none'; 
        targetModalConfirmButton.style.background = '#ff4d4d'; 
        targetModalConfirmButton.style.color = '#fff'; 
        targetModalConfirmButton.innerText = 'हाँ, करें'; 
        
        modalOverlayContainer.classList.add('active'); 
        
        activeModalCallbackFunction = callbackFunc; 
    };
    
    // Modal Cancel Action
    const modalCancelButton = document.getElementById('qms-modal-cancel');
    if (modalCancelButton) {
        modalCancelButton.addEventListener('click', () => {
            modalOverlayContainer.classList.remove('active');
        });
    }
    
    // Modal Confirm Action
    if (targetModalConfirmButton) {
        targetModalConfirmButton.addEventListener('click', () => { 
            if (activeModalCallbackFunction) {
                // If input is hidden, it's a confirm prompt, return boolean TRUE
                if (targetModalInput.style.display === 'none') {
                    activeModalCallbackFunction(true);
                } else {
                    // Otherwise return input text value
                    activeModalCallbackFunction(targetModalInput.value);
                }
            }
            modalOverlayContainer.classList.remove('active'); 
        });
    }

    // ==========================================
    // 8. LOAD USER PROFILE DATA
    // ==========================================
    const savedUserNameValue = localStorage.getItem('qms_user_name') || 'Alina Sami';
    
    const dashUserNameElement = document.getElementById('dash-user-name');
    if (dashUserNameElement) {
        dashUserNameElement.innerText = savedUserNameValue; 
    }
    
    const panelUserNameElement = document.getElementById('panel-user-name');
    if (panelUserNameElement) {
        panelUserNameElement.innerText = savedUserNameValue;
    }
    
    const savedProfileImageSrc = localStorage.getItem('qms_profile_img');
    if (savedProfileImageSrc) {
        const dashSmallAvatarImage = document.getElementById('dash-small-avatar');
        if (dashSmallAvatarImage) {
            dashSmallAvatarImage.src = savedProfileImageSrc; 
        }
        
        const panelProfileImageAvatar = document.getElementById('panel-profile-img');
        if (panelProfileImageAvatar) {
            panelProfileImageAvatar.src = savedProfileImageSrc; 
        }
    }

    // Calculate Completed Chapters & XP
    let completedChaptersData = {};
    const rawCompletedData = localStorage.getItem('qms_completed');
    if (rawCompletedData) {
        completedChaptersData = JSON.parse(rawCompletedData);
    }
    
    const completedChaptersCountNumber = Object.keys(completedChaptersData).length;
    
    const dashCompletedCountElement = document.getElementById('dash-completed-count');
    if (dashCompletedCountElement) {
        dashCompletedCountElement.innerText = completedChaptersCountNumber;
    }
    
    const dashTotalXpElement = document.getElementById('dash-total-xp');
    if (dashTotalXpElement) {
        dashTotalXpElement.innerText = completedChaptersCountNumber * 50;
    }

    // ==========================================
    // 9. SETTINGS PANEL INTERFACE LOGIC
    // ==========================================
    const sidePanelElement = document.getElementById('settings-panel'); 
    const sidePanelOverlayBg = document.getElementById('panel-overlay'); 
    
    function closeSettingsPanelAction() { 
        if (sidePanelElement) {
            sidePanelElement.classList.remove('active'); 
        }
        if (sidePanelOverlayBg) {
            sidePanelOverlayBg.classList.remove('active'); 
        }
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

    // Theme Selection Logic
    const allThemeOptionCards = document.querySelectorAll('.theme-option-card');
    allThemeOptionCards.forEach(singleThemeCard => {
        singleThemeCard.addEventListener('click', function() { 
            const newThemeNameSelected = this.getAttribute('data-set-theme'); 
            document.documentElement.setAttribute('data-theme', newThemeNameSelected); 
            localStorage.setItem('qms_theme', newThemeNameSelected); 
        });
    });

    // Preferences Selection Logic
    const preferenceDropdownIds = ['pdf-location-pref', 'video-quality-pref'];
    
    preferenceDropdownIds.forEach(dropdownId => {
        const targetDropdownElement = document.getElementById(dropdownId); 
        
        const previouslySavedPrefValue = localStorage.getItem(`qms_${dropdownId}`); 
        
        if (previouslySavedPrefValue && targetDropdownElement) {
            targetDropdownElement.value = previouslySavedPrefValue;
        }
        
        if (targetDropdownElement) {
            targetDropdownElement.addEventListener('change', (event) => {
                localStorage.setItem(`qms_${dropdownId}`, event.target.value);
            });
        }
    });

    // ==========================================
    // 10. SYSTEM AUDIO FX (CLICK SOUNDS)
    // ==========================================
    const sfxClickAudioNode = document.getElementById('sfx-click'); 
    let isSystemSoundTurnedOn = true;
    
    if (localStorage.getItem('qms_sound') === 'off') {
        isSystemSoundTurnedOn = false;
    }
    
    const soundToggleSwitchElement = document.getElementById('sound-toggle');
    
    if (soundToggleSwitchElement) { 
        soundToggleSwitchElement.checked = isSystemSoundTurnedOn; 
        updateToggleUI(soundToggleSwitchElement); 
        
        soundToggleSwitchElement.addEventListener('change', (event) => { 
            isSystemSoundTurnedOn = event.target.checked; 
            
            if (isSystemSoundTurnedOn) {
                localStorage.setItem('qms_sound', 'on');
            } else {
                localStorage.setItem('qms_sound', 'off');
            }
            
            updateToggleUI(event.target); 
        }); 
    }

    // Bind click sound to all triggers
    const allSfxTriggerElements = document.querySelectorAll('.sfx-trigger');
    allSfxTriggerElements.forEach(triggerBtn => { 
        triggerBtn.addEventListener('click', () => { 
            if (isSystemSoundTurnedOn && sfxClickAudioNode) { 
                sfxClickAudioNode.currentTime = 0; 
                sfxClickAudioNode.volume = 1.0; 
                sfxClickAudioNode.play().catch(err => {
                    console.log("SFX Play Error:", err);
                }); 
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
                        
                        // Compress max dimension to 200px
                        const maxAllowedDimension = 200; 
                        let targetWidth = tempImgNode.width; 
                        let targetHeight = tempImgNode.height;
                        
                        if (targetWidth > targetHeight) { 
                            if (targetWidth > maxAllowedDimension) { 
                                targetHeight *= maxAllowedDimension / targetWidth; 
                                targetWidth = maxAllowedDimension; 
                            } 
                        } else { 
                            if (targetHeight > maxAllowedDimension) { 
                                targetWidth *= maxAllowedDimension / targetHeight; 
                                targetHeight = maxAllowedDimension; 
                            } 
                        }
                        
                        temporaryCanvas.width = targetWidth; 
                        temporaryCanvas.height = targetHeight; 
                        
                        temporaryCanvasContext.drawImage(tempImgNode, 0, 0, targetWidth, targetHeight);
                        
                        // Convert to Base64 String format
                        const compressedImageBase64String = temporaryCanvas.toDataURL('image/jpeg', 0.8);
                        
                        // Update UI Images
                        const dashSmallAvatarImg = document.getElementById('dash-small-avatar');
                        if (dashSmallAvatarImg) {
                            dashSmallAvatarImg.src = compressedImageBase64String; 
                        }
                        
                        const panelProfileImg = document.getElementById('panel-profile-img');
                        if (panelProfileImg) {
                            panelProfileImg.src = compressedImageBase64String;
                        }
                        
                        // Attempt to save to LocalStorage safely
                        try { 
                            localStorage.setItem('qms_profile_img', compressedImageBase64String); 
                            if(window.showCustomToast) {
                                window.showCustomToast("प्रोफाइल फोटो सफलतापूर्क सेव हो गई!"); 
                            }
                        } catch(localStorageError) { 
                            if(window.showCustomToast) {
                                window.showCustomToast("फोटो बहुत बड़ी है! सेव करने में एरर।", true); 
                            }
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
            
            const currentSavedNameValue = localStorage.getItem('qms_user_name') || 'Alina Sami'; 
            
            window.showCustomPrompt("अपना नया नाम दर्ज करें", currentSavedNameValue, (newSubmittedName) => { 
                
                // If name is valid and not empty
                if (newSubmittedName && newSubmittedName.trim() !== "") { 
                    
                    const cleanedNewName = newSubmittedName.trim(); 
                    
                    // Save
                    localStorage.setItem('qms_user_name', cleanedNewName); 
                    
                    // Update UI Dashboard
                    const dashNameEl = document.getElementById('dash-user-name');
                    if (dashNameEl) {
                        dashNameEl.innerText = cleanedNewName; 
                    }
                    
                    // Update UI Panel
                    const panelNameEl = document.getElementById('panel-user-name');
                    if (panelNameEl) {
                        panelNameEl.innerText = cleanedNewName; 
                    }
                    
                    // Toast success
                    if(window.showCustomToast) {
                        window.showCustomToast("नाम सफलतापूर्वक अपडेट हो गया!");
                    }
                } 
            }); 
        }); 
    }

    const resetLogoutButton = document.getElementById('reset-btn');
    
    if (resetLogoutButton) { 
        resetLogoutButton.addEventListener('click', () => { 
            window.showCustomConfirm("क्या आप सच में लॉगआउट करना चाहते हैं?", (userConfirmedLogout) => { 
                if (userConfirmedLogout === true) { 
                    // Redirect to login index page
                    window.location.href = "index.html"; 
                } 
            }); 
        }); 
    }
});
