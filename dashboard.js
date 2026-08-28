/* =========================================================================
   QMS JAVASCRIPT MASTER ENGINE (DASHBOARD - 100% EXPANDED FULL CODE)
   - FEATURES:
     0. 🔥 NEW: FIREBASE CLOUD DATA FETCHING (Name, Photo, XP from Firestore)
     1. Multi-Track BGM Memory System
     2. 🏆 4-Box Preview & "View All 50 Badges" Modal
     3. 🏆 Celebration Pop-up Animation on New Badge Unlock
     4. User Authentication & Privacy
     5. 🚀 Custom Pomodoro Focus Timer (+/- controls up to 180 mins)
     6. 🚀 Smart Bookmarks (Saved Notes) Modal Renderer
     7. Daily Streak Calendar Logic
     8. Dynamic Medium Switcher (Hindi / English)
========================================================================= */

// 🔥 0. FIREBASE IMPORT & SETUP 🔥
// Note: type="module" is required in your dashboard.html <script> tag if using import. 
// If your HTML just says <script src="dashboard.js"></script>, you MUST change it to:
// <script type="module" src="dashboard.js"></script>

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBCkxx9bVjvAYarA0WrHfW5k_gxwUPZaaw",
    authDomain: "quantum-master-study.firebaseapp.com",
    projectId: "quantum-master-study",
    storageBucket: "quantum-master-study.firebasestorage.app",
    messagingSenderId: "193145760847",
    appId: "1:193145760847:web:7d1f77be123c3edb104e3a",
    measurementId: "G-SH39JL930R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {

    // ==========================================
    // 🔥 NEW: CLOUD DATA SYNC (FETCH FROM FIRESTORE) 🔥
    // ==========================================
    const uid = localStorage.getItem('qms_user_uid');
    
    if (uid) {
        try {
            const userDocRef = doc(db, "users", uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const cloudData = userDocSnap.data();
                
                // Update LocalStorage with fresh Cloud Data
                if(cloudData.name) localStorage.setItem('qms_user_name', cloudData.name);
                if(cloudData.photoURL) localStorage.setItem('qms_profile_img', cloudData.photoURL);
                if(cloudData.totalXp) localStorage.setItem('qms_total_xp', cloudData.totalXp); // Sync XP if saved in cloud
                
                // Update Dashboard UI Instantly
                const dashNameEl = document.getElementById('dash-user-name');
                const panelNameEl = document.getElementById('panel-user-name');
                const dashAvatarImg = document.getElementById('dash-small-avatar');
                const panelAvatarImg = document.getElementById('panel-profile-img');

                if (dashNameEl) dashNameEl.innerText = cloudData.name;
                if (panelNameEl) panelNameEl.innerText = cloudData.name;
                if (dashAvatarImg && cloudData.photoURL) dashAvatarImg.src = cloudData.photoURL;
                if (panelAvatarImg && cloudData.photoURL) panelAvatarImg.src = cloudData.photoURL;
                
                console.log("✅ Cloud Sync Success: Data loaded from Firestore!");
            }
        } catch (error) {
            console.error("❌ Cloud Sync Failed: Could not fetch user data.", error);
        }
    } else {
        // Security Check: If no UID is found, send back to login
        console.warn("No User ID found. Redirecting to login...");
        window.location.href = 'index.html';
    }


    // ==========================================
    // 1. SMART BGM MEMORY SYSTEM
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
                    console.log("Audio play blocked by browser security.", error);
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
        if (loadingBarElement) loadingBarElement.style.width = `${loadingProgress}%`;
        
        if (loadingTextElement) {
            if (loadingProgress > 30 && loadingProgress < 70) {
                loadingTextElement.innerText = 'यूज़र प्रोफाइल सिंक्रनाइज़ हो रही है...';
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
    
    if (currentHour < 12) {
        dynamicGreetingText = "सुप्रभात (Good Morning)";
    } else if (currentHour < 18) {
        dynamicGreetingText = "शुभ दोपहर (Good Afternoon)";
    } else {
        dynamicGreetingText = "शुभ संध्या (Good Evening)";
    }
    
    const greetingDisplayElement = document.getElementById('dynamic-greeting');
    if (greetingDisplayElement) greetingDisplayElement.innerText = dynamicGreetingText;

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
    // 4. 🔥 UPGRADED POMODORO FOCUS TIMER (+/- CONTROLS)
    // ==========================================
    let focusTimerInterval; 
    let configuredFocusMinutes = 25; 
    let focusTimeLeftInSeconds = configuredFocusMinutes * 60; 
    let isFocusTimerRunning = false;
    
    const timerDisplayElement = document.getElementById('timer-display');
    const timerStartButton = document.getElementById('timer-start-btn');
    const timerResetButton = document.getElementById('timer-reset-btn');
    const timerPlusButton = document.getElementById('timer-plus-btn');
    const timerMinusButton = document.getElementById('timer-minus-btn');

    function updateTimerUserInterface() {
        if (!timerDisplayElement) return;
        const remainingMinutes = Math.floor(focusTimeLeftInSeconds / 60);
        const remainingSeconds = focusTimeLeftInSeconds % 60;
        const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        timerDisplayElement.innerText = `${formattedMinutes}:${formattedSeconds}`;
    }

    if (timerPlusButton) {
        timerPlusButton.addEventListener('click', () => {
            if (!isFocusTimerRunning) {
                configuredFocusMinutes = Math.min(180, configuredFocusMinutes + 5);
                focusTimeLeftInSeconds = configuredFocusMinutes * 60;
                updateTimerUserInterface();
            } else {
                if (window.showCustomToast) window.showCustomToast("टाइमर चालू है। पहले उसे पॉज़ या रीसेट करें।", true);
            }
        });
    }

    if (timerMinusButton) {
        timerMinusButton.addEventListener('click', () => {
            if (!isFocusTimerRunning) {
                configuredFocusMinutes = Math.max(5, configuredFocusMinutes - 5);
                focusTimeLeftInSeconds = configuredFocusMinutes * 60;
                updateTimerUserInterface();
            } else {
                if (window.showCustomToast) window.showCustomToast("टाइमर चालू है। पहले उसे पॉज़ या रीसेट करें।", true);
            }
        });
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
                            window.showCustomToast(`शानदार! आपका ${configuredFocusMinutes} मिनट का फोकस सेशन पूरा हुआ।`, false); 
                        }
                        
                        focusTimeLeftInSeconds = configuredFocusMinutes * 60; 
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
            focusTimeLeftInSeconds = configuredFocusMinutes * 60; 
            updateTimerUserInterface(); 
            
            timerStartButton.innerText = "स्टार्ट (Start)"; 
            timerStartButton.style.background = "var(--accent-main)"; 
        });
    }

    // ==========================================
    // 5. 🔖 UPGRADED SMART BOOKMARKS (MODAL & FIXES)
    // ==========================================
    const bookmarksModalContent = document.getElementById('bookmarks-modal-content');
    const openBookmarksBtn = document.getElementById('open-bookmarks-modal-btn');
    const closeBookmarksBtn = document.getElementById('close-bookmarks-modal-btn');
    const bookmarksModalOverlay = document.getElementById('bookmarks-modal-overlay');
    
    if(openBookmarksBtn && bookmarksModalOverlay) {
        openBookmarksBtn.addEventListener('click', () => {
            bookmarksModalOverlay.style.display = 'flex';
            setTimeout(() => { bookmarksModalOverlay.style.opacity = '1'; }, 10);
        });
    }

    if(closeBookmarksBtn && bookmarksModalOverlay) {
        closeBookmarksBtn.addEventListener('click', () => {
            bookmarksModalOverlay.style.opacity = '0';
            setTimeout(() => { bookmarksModalOverlay.style.display = 'none'; }, 300);
        });
    }
    
    if (bookmarksModalContent) {
        const rawBookmarksData = localStorage.getItem('qms_bookmarks');
        let parsedBookmarks = {};
        
        if (rawBookmarksData) parsedBookmarks = JSON.parse(rawBookmarksData);
        
        const bookmarkKeysArray = Object.keys(parsedBookmarks);

        if (bookmarkKeysArray.length === 0) {
            bookmarksModalContent.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                    <i class="ri-bookmark-line" style="font-size: 3.5rem; margin-bottom: 10px; display: block; opacity: 0.5;"></i>
                    <p style="font-size: 1.1rem; color: #fff; margin-bottom: 5px;">अभी तक कोई नोट्स सेव नहीं है।</p>
                    <p style="font-size: 0.85rem;">वीडियो प्लेयर पर जाकर 'बुकमार्क में सेव करें' पर क्लिक करें।</p>
                </div>
            `;
        } else {
            let finalBookmarksHTML = '';
            
            bookmarkKeysArray.forEach(key => {
                let bookmarkItem = parsedBookmarks[key];
                let iconColorHex = 'var(--accent-main)'; 
                
                if (bookmarkItem.subject === 'chemistry') iconColorHex = '#b535ff'; 
                if (bookmarkItem.subject === 'mathematics') iconColorHex = '#00ff88'; 
                if (bookmarkItem.subject === 'hindi') iconColorHex = '#ffc107'; 
                if (bookmarkItem.subject === 'english') iconColorHex = '#ff3366'; 

                finalBookmarksHTML += `
                    <div class="glass-card sfx-trigger" 
                         style="padding: 1.2rem; cursor: pointer; display: flex; align-items: center; gap: 15px; transition: 0.3s; border-left: 4px solid ${iconColorHex}; background: rgba(255,255,255,0.03); border-radius: 12px;" 
                         onclick="window.location.href='player.html?subject=${bookmarkItem.subject}&chapter=${bookmarkItem.id}'" 
                         onmouseover="this.style.background='rgba(255,255,255,0.08)'" 
                         onmouseout="this.style.background='rgba(255,255,255,0.03)'">
                         
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
            
            bookmarksModalContent.innerHTML = finalBookmarksHTML;
        }
    }

    // ==========================================
    // 6. CUSTOM TOASTS & MODALS (PROFESSIONAL)
    // ==========================================
    window.showCustomToast = function(messageText, isErrorMessage = false) {
        const existingToastNode = document.querySelector('.qms-toast-msg'); 
        if (existingToastNode) existingToastNode.remove();
        
        const toastElementNode = document.createElement('div'); 
        
        if (isErrorMessage) {
            toastElementNode.className = 'qms-toast-msg qms-toast-error';
            toastElementNode.innerHTML = `<i class="ri-error-warning-fill"></i> ${messageText}`;
        } else {
            toastElementNode.className = 'qms-toast-msg';
            toastElementNode.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${messageText}`;
        }
        
        document.body.appendChild(toastElementNode); 
        
        setTimeout(() => { 
            if (toastElementNode) toastElementNode.remove(); 
        }, 3000); 
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
                if (targetModalInput.style.display === 'none') {
                    activeModalCallbackFunction(true); 
                } else {
                    activeModalCallbackFunction(targetModalInput.value); 
                }
            }
            modalOverlayContainer.classList.remove('active'); 
        });
    }

    // ==========================================
    // 7. 🏆 50 MEGA BADGES SYSTEM (HARDCORE LOGIC)
    // ==========================================
    
    // Privacy Fixed
    const savedUserNameValue = localStorage.getItem('qms_user_name') || 'Student';
    
    let completedChaptersData = {};
    const rawCompletedData = localStorage.getItem('qms_completed');
    if (rawCompletedData) completedChaptersData = JSON.parse(rawCompletedData);
    
    const completedChaptersCountNumber = Object.keys(completedChaptersData).length;
    let storedExtraXp = parseInt(localStorage.getItem('qms_total_xp')) || 0;
    
    let grandTotalXp = (completedChaptersCountNumber * 50) + storedExtraXp;
    localStorage.setItem('qms_total_xp', grandTotalXp);

    const dashUserNameElement = document.getElementById('dash-user-name');
    if (dashUserNameElement) dashUserNameElement.innerText = savedUserNameValue;
    
    const dashCompletedCountElement = document.getElementById('dash-completed-count');
    if (dashCompletedCountElement) dashCompletedCountElement.innerText = completedChaptersCountNumber;
    
    const dashTotalXpElement = document.getElementById('dash-total-xp');
    if (dashTotalXpElement) dashTotalXpElement.innerText = grandTotalXp;

    const qmsBadgesData = [
        { id: 'b1', name: 'स्टार्टर (Starter)', icon: 'ri-seedling-line', color: '#a0a0b0', requiredXp: 0, desc: 'QMS जॉइन किया' },
        { id: 'b2', name: 'लर्नर (Learner)', icon: 'ri-book-read-line', color: '#00f0ff', requiredXp: 100, desc: '100 XP प्राप्त किए' },
        { id: 'b3', name: 'एक्सप्लोरर (Explorer)', icon: 'ri-compass-3-line', color: '#00ff88', requiredXp: 250, desc: '250 XP प्राप्त किए' },
        { id: 'b4', name: 'जिज्ञासु (Curious)', icon: 'ri-search-eye-line', color: '#b535ff', requiredXp: 500, desc: '500 XP प्राप्त किए' },
        { id: 'b5', name: 'ब्रॉन्ज़ I (Bronze I)', icon: 'ri-medal-line', color: '#cd7f32', requiredXp: 800, desc: '800 XP प्राप्त किए' },
        { id: 'b6', name: 'ब्रॉन्ज़ II (Bronze II)', icon: 'ri-medal-line', color: '#cd7f32', requiredXp: 1200, desc: '1200 XP प्राप्त किए' },
        { id: 'b7', name: 'ब्रॉन्ज़ III (Bronze III)', icon: 'ri-medal-fill', color: '#cd7f32', requiredXp: 1600, desc: '1600 XP प्राप्त किए' },
        { id: 'b8', name: 'सिल्वर I (Silver I)', icon: 'ri-award-line', color: '#c0c0c0', requiredXp: 2100, desc: '2100 XP प्राप्त किए' },
        { id: 'b9', name: 'सिल्वर II (Silver II)', icon: 'ri-award-line', color: '#c0c0c0', requiredXp: 2700, desc: '2700 XP प्राप्त किए' },
        { id: 'b10', name: 'सिल्वर III (Silver III)', icon: 'ri-award-fill', color: '#c0c0c0', requiredXp: 3400, desc: '3400 XP प्राप्त किए' },
        { id: 'b11', name: 'गोल्ड I (Gold I)', icon: 'ri-trophy-line', color: '#ffd700', requiredXp: 4200, desc: '4200 XP प्राप्त किए' },
        { id: 'b12', name: 'गोल्ड II (Gold II)', icon: 'ri-trophy-line', color: '#ffd700', requiredXp: 5000, desc: '5000 XP प्राप्त किए' },
        { id: 'b13', name: 'गोल्ड III (Gold III)', icon: 'ri-trophy-fill', color: '#ffd700', requiredXp: 6000, desc: '6000 XP प्राप्त किए' },
        { id: 'b14', name: 'प्लेटिनम I (Platinum I)', icon: 'ri-vip-diamond-line', color: '#e5e4e2', requiredXp: 7200, desc: '7200 XP प्राप्त किए' },
        { id: 'b15', name: 'प्लेटिनम II (Platinum II)', icon: 'ri-vip-diamond-line', color: '#e5e4e2', requiredXp: 8500, desc: '8500 XP प्राप्त किए' },
        { id: 'b16', name: 'प्लेटिनम III (Platinum III)', icon: 'ri-vip-diamond-fill', color: '#e5e4e2', requiredXp: 10000, desc: '10000 XP प्राप्त किए' },
        { id: 'b17', name: 'एमराल्ड (Emerald)', icon: 'ri-gemstone-line', color: '#50c878', requiredXp: 11500, desc: '11500 XP प्राप्त किए' },
        { id: 'b18', name: 'एमराल्ड स्टार (Star)', icon: 'ri-star-smile-fill', color: '#50c878', requiredXp: 13000, desc: '13000 XP प्राप्त किए' },
        { id: 'b19', name: 'एमराल्ड क्राउन (Crown)', icon: 'ri-vip-crown-fill', color: '#50c878', requiredXp: 15000, desc: '15000 XP प्राप्त किए' },
        { id: 'b20', name: 'रूबी (Ruby)', icon: 'ri-gemstone-fill', color: '#e0115f', requiredXp: 17500, desc: '17500 XP प्राप्त किए' },
        { id: 'b21', name: 'रूबी स्टार (Star)', icon: 'ri-star-fill', color: '#e0115f', requiredXp: 20000, desc: '20000 XP प्राप्त किए' },
        { id: 'b22', name: 'रूबी क्राउन (Crown)', icon: 'ri-vip-crown-fill', color: '#e0115f', requiredXp: 23000, desc: '23000 XP प्राप्त किए' },
        { id: 'b23', name: 'नीलम (Sapphire)', icon: 'ri-gemstone-fill', color: '#0f52ba', requiredXp: 26000, desc: '26000 XP प्राप्त किए' },
        { id: 'b24', name: 'नीलम स्टार (Star)', icon: 'ri-star-fill', color: '#0f52ba', requiredXp: 29000, desc: '29000 XP प्राप्त किए' },
        { id: 'b25', name: 'नीलम क्राउन (Crown)', icon: 'ri-vip-crown-fill', color: '#0f52ba', requiredXp: 33000, desc: '33000 XP प्राप्त किए' },
        { id: 'b26', name: 'टोपाज़ (Topaz)', icon: 'ri-gemstone-fill', color: '#ffc87c', requiredXp: 37000, desc: '37000 XP प्राप्त किए' },
        { id: 'b27', name: 'टोपाज़ स्टार (Star)', icon: 'ri-star-fill', color: '#ffc87c', requiredXp: 41000, desc: '41000 XP प्राप्त किए' },
        { id: 'b28', name: 'टोपाज़ क्राउन (Crown)', icon: 'ri-vip-crown-fill', color: '#ffc87c', requiredXp: 46000, desc: '46000 XP प्राप्त किए' },
        { id: 'b29', name: 'एमेथिस्ट (Amethyst)', icon: 'ri-gemstone-fill', color: '#9966cc', requiredXp: 51000, desc: '51000 XP प्राप्त किए' },
        { id: 'b30', name: 'एमेथिस्ट स्टार (Star)', icon: 'ri-star-fill', color: '#9966cc', requiredXp: 57000, desc: '57000 XP प्राप्त किए' },
        { id: 'b31', name: 'एमेथिस्ट क्राउन (Crown)', icon: 'ri-vip-crown-fill', color: '#9966cc', requiredXp: 63000, desc: '63000 XP प्राप्त किए' },
        { id: 'b32', name: 'ओपल (Opal)', icon: 'ri-gemstone-fill', color: '#a8c3bc', requiredXp: 70000, desc: '70000 XP प्राप्त किए' },
        { id: 'b33', name: 'ओपल स्टार (Star)', icon: 'ri-star-fill', color: '#a8c3bc', requiredXp: 77000, desc: '77000 XP प्राप्त किए' },
        { id: 'b34', name: 'ओपल क्राउन (Crown)', icon: 'ri-vip-crown-fill', color: '#a8c3bc', requiredXp: 85000, desc: '85000 XP प्राप्त किए' },
        { id: 'b35', name: 'डायमंड (Diamond)', icon: 'ri-vip-diamond-fill', color: '#b9f2ff', requiredXp: 93000, desc: '93000 XP प्राप्त किए' },
        { id: 'b36', name: 'डायमंड स्टार (Star)', icon: 'ri-star-fill', color: '#b9f2ff', requiredXp: 102000, desc: '102000 XP प्राप्त किए' },
        { id: 'b37', name: 'डायमंड क्राउन (Crown)', icon: 'ri-vip-crown-fill', color: '#b9f2ff', requiredXp: 112000, desc: '112000 XP प्राप्त किए' },
        { id: 'b38', name: 'पिंक डायमंड (Pink Diamond)', icon: 'ri-vip-diamond-fill', color: '#ffb6c1', requiredXp: 123000, desc: '123000 XP प्राप्त किए' },
        { id: 'b39', name: 'येलो डायमंड (Yellow Diamond)', icon: 'ri-vip-diamond-fill', color: '#fffacd', requiredXp: 135000, desc: '135000 XP प्राप्त किए' },
        { id: 'b40', name: 'ब्लू डायमंड (Blue Diamond)', icon: 'ri-vip-diamond-fill', color: '#add8e6', requiredXp: 148000, desc: '148000 XP प्राप्त किए' },
        { id: 'b41', name: 'ग्रीन डायमंड (Green Diamond)', icon: 'ri-vip-diamond-fill', color: '#90ee90', requiredXp: 162000, desc: '162000 XP प्राप्त किए' },
        { id: 'b42', name: 'ब्लैक डायमंड (Black)', icon: 'ri-vip-diamond-fill', color: '#555555', requiredXp: 178000, desc: '178000 XP प्राप्त किए' },
        { id: 'b43', name: 'रेड डायमंड (Red)', icon: 'ri-vip-diamond-fill', color: '#ff0000', requiredXp: 195000, desc: '195000 XP प्राप्त किए' },
        { id: 'b44', name: 'क्वांटम नाइट (Knight)', icon: 'ri-sword-fill', color: '#ff00ff', requiredXp: 215000, desc: '215000 XP प्राप्त किए' },
        { id: 'b45', name: 'क्वांटम लॉर्ड (Lord)', icon: 'ri-shield-star-fill', color: '#b535ff', requiredXp: 238000, desc: '238000 XP प्राप्त किए' },
        { id: 'b46', name: 'क्वांटम मास्टर (Master)', icon: 'ri-meteor-fill', color: '#00f0ff', requiredXp: 265000, desc: '265000 XP प्राप्त किए' },
        { id: 'b47', name: 'ग्रैंडमास्टर (Grandmaster)', icon: 'ri-fire-fill', color: '#ff4d4d', requiredXp: 300000, desc: '300000 XP प्राप्त किए' },
        { id: 'b48', name: 'यूनिवर्स स्कॉलर (Scholar)', icon: 'ri-planet-fill', color: '#ffc107', requiredXp: 350000, desc: '350000 XP प्राप्त किए' },
        { id: 'b49', name: 'सुप्रीम जीनियस (Genius)', icon: 'ri-brain-fill', color: '#00ff88', requiredXp: 420000, desc: '420000 XP प्राप्त किए' },
        { id: 'b50', name: 'लेजेंडरी गॉड (God)', icon: 'ri-sun-fill', color: '#ffffff', requiredXp: 500000, desc: '500000 XP प्राप्त किए' }
    ];

    const allBadgesModalHtml = `
        <div id="all-badges-modal" class="qms-modal-overlay" style="z-index: 100002;">
            <div class="qms-modal-box" style="max-width: 900px; max-height: 85vh; display:flex; flex-direction: column; padding: 0; background: #0f0f19;">
                <div style="padding: 15px 20px; background: #111; border-bottom: 2px solid var(--accent-main); display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="color: #fff; font-family: var(--font-heading);"><i class="ri-medal-fill" style="color: var(--accent-main);"></i> सभी 50 अचीवमेंट्स (Badges)</h3>
                    <button id="close-all-badges" class="sfx-trigger" style="background: rgba(255,50,50,0.2); color: #ff4d4d; border: 1px solid #ff4d4d; padding: 5px 15px; border-radius: 8px; cursor:pointer; font-weight: bold;">X Close</button>
                </div>
                <div id="all-badges-grid" style="padding: 20px; overflow-y: auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 15px;">
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', allBadgesModalHtml);

    const unlockModalHtml = `
        <div id="unlock-badge-modal" class="qms-modal-overlay" style="z-index: 100005;">
            <div class="qms-modal-box" style="background: radial-gradient(circle, #2a2a35 0%, #0f0f19 100%); border: 2px solid #ffc107; text-align: center; padding: 3rem 2rem; overflow: hidden; position: relative;">
                <div style="position:absolute; top:-50%; left:-50%; width:200%; height:200%; background: repeating-conic-gradient(from 0deg, transparent 0deg 15deg, rgba(255,215,0,0.1) 15deg 30deg); animation: spin 10s linear infinite; z-index: 1;"></div>
                <div style="position: relative; z-index: 2;">
                    <h2 style="color: #00ff88; font-family: var(--font-heading); margin-bottom: 10px; font-size: 1.8rem; text-shadow: 0 0 15px #00ff88;">नया बैज अनलॉक हुआ! 🎉</h2>
                    <div id="unlocked-badge-icon" style="font-size: 5rem; margin: 20px 0; animation: pulseGlow 1s infinite alternate; filter: drop-shadow(0 0 20px currentColor);"></div>
                    <h3 id="unlocked-badge-name" style="color: #fff; font-size: 1.5rem; margin-bottom: 5px; font-family: var(--font-heading);"></h3>
                    <p id="unlocked-badge-desc" style="color: var(--text-secondary); margin-bottom: 25px;"></p>
                    <button id="claim-badge-btn" class="btn-primary-glow sfx-trigger" style="background: #ffc107; color: #000;">प्राप्त करें (Claim)</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', unlockModalHtml);

    const badgesContainerElement = document.getElementById('badges-container');
    
    if (badgesContainerElement) {
        let unlockedBadgesList = qmsBadgesData.filter(b => grandTotalXp >= b.requiredXp);
        let lockedBadgesList = qmsBadgesData.filter(b => grandTotalXp < b.requiredXp);
        
        let highestUnlocked = unlockedBadgesList[unlockedBadgesList.length - 1] || qmsBadgesData[0];
        let nextTarget1 = lockedBadgesList[0] || qmsBadgesData[48];
        let nextTarget2 = lockedBadgesList[1] || qmsBadgesData[49];
        
        let displayHtml = '';
        
        function getCardHtml(badgeObj, isUnlocked) {
            const statusClass = isUnlocked ? 'unlocked' : 'locked';
            const overlay = isUnlocked ? '' : '<div class="locked-overlay"><i class="ri-lock-2-fill"></i></div>';
            return `
                <div class="badge-card ${statusClass} sfx-trigger" title="${badgeObj.desc}">
                    ${overlay}
                    <i class="${badgeObj.icon} badge-icon" style="color: ${badgeObj.color};"></i>
                    <h4 class="badge-title">${badgeObj.name}</h4>
                    <p class="badge-desc">${badgeObj.desc}</p>
                </div>
            `;
        }

        displayHtml += getCardHtml(highestUnlocked, true);
        displayHtml += getCardHtml(nextTarget1, false);
        displayHtml += getCardHtml(nextTarget2, false);
        
        displayHtml += `
            <div id="open-all-badges-btn" class="badge-card sfx-trigger" style="background: rgba(255,255,255,0.05); border: 1px dashed var(--accent-main); display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer;">
                <i class="ri-grid-fill badge-icon" style="color: var(--accent-main); animation: pulseGlow 2s infinite alternate;"></i>
                <h4 class="badge-title" style="color: var(--accent-main);">सभी 50 बैज देखें</h4>
                <p class="badge-desc">क्लिक करें</p>
            </div>
        `;
        
        badgesContainerElement.innerHTML = displayHtml;
        
        document.getElementById('open-all-badges-btn').addEventListener('click', () => {
            if (document.getElementById('sfx-click') && localStorage.getItem('qms_sound') !== 'off') {
                document.getElementById('sfx-click').play().catch(()=>{});
            }
            
            const modalGrid = document.getElementById('all-badges-grid');
            let allHtml = '';
            
            qmsBadgesData.forEach(badge => {
                const isUn = grandTotalXp >= badge.requiredXp;
                allHtml += getCardHtml(badge, isUn);
            });
            
            modalGrid.innerHTML = allHtml;
            document.getElementById('all-badges-modal').style.display = 'flex';
            
            setTimeout(() => {
                document.getElementById('all-badges-modal').classList.add('active');
            }, 50);
        });
        
        document.getElementById('close-all-badges').addEventListener('click', () => {
            document.getElementById('all-badges-modal').classList.remove('active');
            setTimeout(() => {
                document.getElementById('all-badges-modal').style.display = 'none';
            }, 300);
        });
    }

    let knownUnlockedIds = JSON.parse(localStorage.getItem('qms_known_badges')) || [];
    let currentlyUnlockedIds = qmsBadgesData.filter(b => grandTotalXp >= b.requiredXp).map(b => b.id);
    let newlyUnlockedIds = currentlyUnlockedIds.filter(id => !knownUnlockedIds.includes(id));
    
    if (newlyUnlockedIds.length > 0) {
        if (knownUnlockedIds.length === 0 && grandTotalXp === 0) {
            localStorage.setItem('qms_known_badges', JSON.stringify(currentlyUnlockedIds));
        } else {
            let newBadgeObjects = qmsBadgesData.filter(b => newlyUnlockedIds.includes(b.id));
            
            function showUnlockModal(index) {
                if (index >= newBadgeObjects.length) {
                    localStorage.setItem('qms_known_badges', JSON.stringify(currentlyUnlockedIds));
                    return;
                }
                
                let b = newBadgeObjects[index];
                const iconEl = document.getElementById('unlocked-badge-icon');
                iconEl.className = b.icon;
                iconEl.style.color = b.color;
                
                document.getElementById('unlocked-badge-name').innerText = b.name;
                document.getElementById('unlocked-badge-desc').innerText = `लक्ष्य पूरा हुआ: ${b.desc}`;
                
                const unlockModal = document.getElementById('unlock-badge-modal');
                unlockModal.style.display = 'flex';
                setTimeout(() => unlockModal.classList.add('active'), 50);
                
                if (document.getElementById('sfx-click') && localStorage.getItem('qms_sound') !== 'off') {
                    document.getElementById('sfx-click').play().catch(()=>{});
                }
                
                document.getElementById('claim-badge-btn').onclick = () => {
                    unlockModal.classList.remove('active');
                    setTimeout(() => {
                        unlockModal.style.display = 'none';
                        setTimeout(() => showUnlockModal(index + 1), 500);
                    }, 300);
                };
            }
            
            setTimeout(() => {
                showUnlockModal(0);
            }, 1500);
        }
    }

    // ==========================================
    // 8. DYNAMIC MEDIUM SWITCHER (Hindi / English)
    // ==========================================
    let currentMedium = localStorage.getItem('qms_medium') || 'hi'; 
    const headerEl = document.querySelector('.dash-header');
    
    if (headerEl) {
        let mediumTextValue = 'हिंदी माध्यम';
        if (currentMedium === 'en') mediumTextValue = 'English Medium';
        
        const mediumSwitcherHtml = `
            <div id="medium-toggle-btn" class="sfx-trigger" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: var(--font-heading); font-size: 0.9rem; margin-right: 15px;">
                <i class="ri-translate-2"></i> 
                <span id="medium-text">${mediumTextValue}</span>
            </div>
        `;
        
        const profileDiv = document.querySelector('.header-profile-fix');
        if (profileDiv) profileDiv.insertAdjacentHTML('beforebegin', mediumSwitcherHtml);

        const mediumToggleBtn = document.getElementById('medium-toggle-btn');
        if (mediumToggleBtn) {
            mediumToggleBtn.addEventListener('click', () => {
                currentMedium = (currentMedium === 'hi') ? 'en' : 'hi';
                localStorage.setItem('qms_medium', currentMedium);
                
                if (currentMedium === 'hi') {
                    document.getElementById('medium-text').innerText = 'हिंदी माध्यम';
                    window.showCustomToast('माध्यम बदलकर हिंदी कर दिया गया है। पेज रीलोड हो रहा है...');
                } else {
                    document.getElementById('medium-text').innerText = 'English Medium';
                    window.showCustomToast('माध्यम बदलकर English कर दिया गया है। पेज रीलोड हो रहा है...');
                }
                setTimeout(() => { window.location.reload(); }, 1500);
            });
        }
    }

    // ==========================================
    // 9. SETTINGS PANEL & OTHER LOGIC
    // ==========================================
    const sidePanelElement = document.getElementById('settings-panel'); 
    const sidePanelOverlayBg = document.getElementById('panel-overlay'); 
    
    function closeSettingsPanelAction() { 
        if (sidePanelElement) sidePanelElement.classList.remove('active'); 
        if (sidePanelOverlayBg) sidePanelOverlayBg.classList.remove('active'); 
    }
    
    const openPanelBtn = document.getElementById('open-panel-btn');
    if (openPanelBtn) {
        openPanelBtn.addEventListener('click', () => { 
            sidePanelElement.classList.add('active'); 
            sidePanelOverlayBg.classList.add('active'); 
        });
    }
    
    const closePanelBtn = document.getElementById('close-panel');
    if (closePanelBtn) closePanelBtn.addEventListener('click', closeSettingsPanelAction); 
    if (sidePanelOverlayBg) sidePanelOverlayBg.addEventListener('click', closeSettingsPanelAction);

    const allThemeOptionCards = document.querySelectorAll('.theme-option-card');
    allThemeOptionCards.forEach(card => {
        card.addEventListener('click', function() { 
            const newTheme = this.getAttribute('data-set-theme'); 
            document.documentElement.setAttribute('data-theme', newTheme); 
            localStorage.setItem('qms_theme', newTheme); 
        });
    });

    // SFX LOGIC
    const sfxClickAudioNode = document.getElementById('sfx-click'); 
    let isSystemSoundTurnedOn = localStorage.getItem('qms_sound') !== 'off';
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

    const allSfxTriggers = document.querySelectorAll('.sfx-trigger');
    allSfxTriggers.forEach(btn => { 
        btn.addEventListener('click', () => { 
            if (isSystemSoundTurnedOn && sfxClickAudioNode) { 
                sfxClickAudioNode.currentTime = 0; 
                sfxClickAudioNode.volume = 1.0; 
                sfxClickAudioNode.play().catch(()=>{}); 
            } 
        }); 
    });

    // ==========================================
    // 10. PROFILE IMAGE UPLOAD LOGIC
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
                        
                        const compressedImageBase64String = temporaryCanvas.toDataURL('image/jpeg', 0.8);
                        
                        const dashSmallAvatarImg = document.getElementById('dash-small-avatar');
                        if (dashSmallAvatarImg) dashSmallAvatarImg.src = compressedImageBase64String; 
                        
                        const panelProfileImg = document.getElementById('panel-profile-img');
                        if (panelProfileImg) panelProfileImg.src = compressedImageBase64String; 
                        
                        try { 
                            localStorage.setItem('qms_profile_img', compressedImageBase64String); 
                            if(window.showCustomToast) window.showCustomToast("प्रोफाइल फोटो सफलतापूर्क सेव हो गई!"); 
                        } catch(localStorageError) { 
                            if(window.showCustomToast) window.showCustomToast("फोटो बहुत बड़ी है! सेव करने में एरर।", true); 
                        }
                    };
                    tempImgNode.src = readerEvent.target.result;
                };
                fileReaderInstance.readAsDataURL(uploadedFile);
            }
        });
    }

    const savedProfileImageSrc = localStorage.getItem('qms_profile_img');
    if (savedProfileImageSrc) {
        const dashSmallAvatarImage = document.getElementById('dash-small-avatar');
        if (dashSmallAvatarImage) dashSmallAvatarImage.src = savedProfileImageSrc; 
        
        const panelProfileImageAvatar = document.getElementById('panel-profile-img');
        if (panelProfileImageAvatar) panelProfileImageAvatar.src = savedProfileImageSrc; 
    }

    // ==========================================
    // 11. EDIT NAME & LOGOUT LOGIC
    // ==========================================
    const editUserNameButton = document.getElementById('edit-name-btn');
    if (editUserNameButton) { 
        editUserNameButton.addEventListener('click', function() { 
            const currentSavedNameValue = localStorage.getItem('qms_user_name') || 'Student'; 
            
            window.showCustomPrompt("अपना नया नाम दर्ज करें", currentSavedNameValue, (newSubmittedName) => { 
                if (newSubmittedName && newSubmittedName.trim() !== "") { 
                    const cleanedNewName = newSubmittedName.trim(); 
                    localStorage.setItem('qms_user_name', cleanedNewName); 
                    
                    const dashNameEl = document.getElementById('dash-user-name');
                    if (dashNameEl) dashNameEl.innerText = cleanedNewName; 
                    
                    const panelNameEl = document.getElementById('panel-user-name');
                    if (panelNameEl) panelNameEl.innerText = cleanedNewName; 
                    
                    if(window.showCustomToast) window.showCustomToast("नाम सफलतापूर्वक अपडेट हो गया!"); 
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
    // 12. 📅 DAILY STREAK CALENDAR LOGIC
    // ==========================================
    function initializeDailyStreakCalendar() {
        const streakContainer = document.getElementById('streak-calendar');
        if (!streakContainer) return;
        
        const getLocalDateString = (d) => { 
            const tz = d.getTimezoneOffset() * 60000; 
            return (new Date(d - tz)).toISOString().split('T')[0]; 
        };
        
        const todayStr = getLocalDateString(new Date());
        let streakHistory = {};
        const rawHistory = localStorage.getItem('qms_streak_history');
        if (rawHistory) streakHistory = JSON.parse(rawHistory);
        
        streakHistory[todayStr] = true;
        localStorage.setItem('qms_streak_history', JSON.stringify(streakHistory));

        let activeCount = 0; 
        let dateChecker = new Date();
        
        while (true) {
            if (streakHistory[getLocalDateString(dateChecker)]) { 
                activeCount++; 
                dateChecker.setDate(dateChecker.getDate() - 1); 
            } else {
                break;
            }
        }
        
        const streakTextNode = document.getElementById('streak-count-text');
        if (streakTextNode) streakTextNode.innerText = activeCount;
        
        const mainTopStreakDisplay = document.getElementById('main-streak-display');
        if (mainTopStreakDisplay) mainTopStreakDisplay.innerText = activeCount + ' दिन';

        let currDay = new Date().getDay(); 
        let monDiff = new Date().getDate() - currDay + (currDay === 0 ? -6 : 1); 
        let monday = new Date(new Date().setDate(monDiff));
        
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        let html = '';

        for (let i = 0; i < 7; i++) {
            let loopDate = new Date(monday); 
            loopDate.setDate(monday.getDate() + i);
            
            let loopStr = getLocalDateString(loopDate);
            let uiClass = 'future'; 
            let iconClass = 'ri-checkbox-blank-circle-line'; 
            
            if (loopStr === todayStr) { 
                uiClass = 'today completed'; 
                iconClass = 'ri-check-line'; 
            } else if (loopDate < new Date()) {
                if (streakHistory[loopStr]) { 
                    uiClass = 'completed'; 
                    iconClass = 'ri-check-line'; 
                } else { 
                    uiClass = 'missed'; 
                    iconClass = 'ri-close-line'; 
                }
            }
            
            html += `
                <div class="streak-day ${uiClass}">
                    <span class="streak-day-name">${dayNames[i]}</span>
                    <div class="streak-circle"><i class="${iconClass}"></i></div>
                </div>
            `;
        }
        streakContainer.innerHTML = html;
    }
    initializeDailyStreakCalendar();

    // ==========================================
    // 13. FIREFLY PARTICLES ENGINE
    // ==========================================
    const backgroundCanvasNode = document.getElementById('bg-canvas');
    if (backgroundCanvasNode) {
        const renderContext2D = backgroundCanvasNode.getContext('2d'); 
        backgroundCanvasNode.width = window.innerWidth; 
        backgroundCanvasNode.height = window.innerHeight;
        
        const mathScienceSymbolsList = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let activeParticlesCollection = [];
        
        class LoginFireflyParticle {
            constructor() {
                const shapeTypeRandomizer = Math.random();
                if (shapeTypeRandomizer > 0.4) {
                    this.particleShape = 'dot';
                } else {
                    this.particleShape = 'symbol';
                }
                
                const randomSymbolSelection = Math.floor(Math.random() * mathScienceSymbolsList.length);
                this.textSymbol = mathScienceSymbolsList[randomSymbolSelection];
                this.coordinateX = Math.random() * backgroundCanvasNode.width; 
                this.coordinateY = Math.random() * backgroundCanvasNode.height;
                
                if (this.particleShape === 'symbol') { 
                    this.pixelSize = Math.random() * 15 + 10; 
                    this.velocityVectorX = Math.random() * 0.5 - 0.25; 
                    this.velocityVectorY = Math.random() * -0.8 - 0.2; 
                } else { 
                    this.pixelSize = Math.random() * 3 + 1; 
                    this.velocityVectorX = Math.random() * 1 - 0.5; 
                    this.velocityVectorY = Math.random() * -1 - 0.2; 
                }
                
                this.alphaBlinkingSpeed = Math.random() * 0.05 + 0.02; 
                this.alphaSineAngle = Math.random() * Math.PI * 2;
            }
            
            updatePositionData() {
                this.coordinateY += this.velocityVectorY; 
                this.coordinateX += this.velocityVectorX; 
                this.alphaSineAngle += this.alphaBlinkingSpeed;
                
                if (this.coordinateY < -30) { 
                    this.coordinateY = backgroundCanvasNode.height + 30; 
                    this.coordinateX = Math.random() * backgroundCanvasNode.width; 
                }
                if (this.coordinateX < -30 || this.coordinateX > backgroundCanvasNode.width + 30) { 
                    this.velocityVectorX = this.velocityVectorX * -1; 
                }
            }
            
            drawOntoCanvas(ctxObject) {
                const rootCssVariables = getComputedStyle(document.documentElement); 
                let currentThemeAccentColor = rootCssVariables.getPropertyValue('--accent-main').trim();
                if (currentThemeAccentColor === "") currentThemeAccentColor = '#00f0ff';
                
                let dynamicOpacityNumber = ((Math.sin(this.alphaSineAngle) + 1) / 2) * 0.8 + 0.1;
                ctxObject.fillStyle = `rgba(255, 255, 255, ${dynamicOpacityNumber})`; 
                ctxObject.shadowBlur = dynamicOpacityNumber * 20; 
                ctxObject.shadowColor = currentThemeAccentColor;
                
                if (this.particleShape === 'symbol') { 
                    ctxObject.font = `${this.pixelSize}px "Space Grotesk", sans-serif`; 
                    ctxObject.fillText(this.textSymbol, this.coordinateX, this.coordinateY); 
                } else { 
                    ctxObject.beginPath(); 
                    ctxObject.arc(this.coordinateX, this.coordinateY, this.pixelSize, 0, Math.PI * 2); 
                    ctxObject.fill(); 
                }
                ctxObject.shadowBlur = 0; 
            }
        }
        
        for (let iterationIndex = 0; iterationIndex < 40; iterationIndex++) { 
            activeParticlesCollection.push(new LoginFireflyParticle()); 
        }
        
        function executeBackgroundAnimation() { 
            renderContext2D.clearRect(0, 0, backgroundCanvasNode.width, backgroundCanvasNode.height); 
            activeParticlesCollection.forEach(particleItem => { 
                particleItem.updatePositionData(); 
                particleItem.drawOntoCanvas(renderContext2D); 
            }); 
            requestAnimationFrame(executeBackgroundAnimation); 
        }
        executeBackgroundAnimation();
        
        window.addEventListener('resize', () => { 
            backgroundCanvasNode.width = window.innerWidth; 
            backgroundCanvasNode.height = window.innerHeight; 
        });
    }
});
