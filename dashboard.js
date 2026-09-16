/* =========================================================================
   QMS JAVASCRIPT MASTER ENGINE (DASHBOARD - 100% EXPANDED FULL CODE)
   - FEATURES INCLUDED:
     0. Firebase Cloud Data Sync & VIP PRO Logic
     1. Multi-Track BGM Memory System (7 Tracks) & Pomodoro Tones
     2. Splash Screen Loading Logic
     3. Dynamic Greetings & Motivational Quotes
     4. Custom Pomodoro Focus Timer (+/- controls)
     5. Smart Bookmarks (Saved Notes)
     6. Custom Toasts & UI Modals
     7. 🏆 50 Mega Badges System (Hardcore XP Logic)
     8. 📅 Daily Streak Calendar Logic
     9. ✨ ADVANCED SETTINGS: Themes, Lang, Eye Care, Avatar, Weekly Report
     10. 🏆 TOP 50 LEADERBOARD FIREBASE LOGIC
     11. SFX, UI Interactions & Image Upload
     12. Logout Functionality
     13. 🌌 Firefly & Math Formulas Particles Engine
========================================================================= */

// 🔥 0. FIREBASE IMPORT & SETUP
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, query, orderBy, limit, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBCkxx9bVjvAYarA0WrHfW5k_gxwUPZaaw",
    authDomain: "quantum-master-study.firebaseapp.com",
    projectId: "quantum-master-study",
    storageBucket: "quantum-master-study.firebasestorage.app",
    messagingSenderId: "193145760847",
    appId: "1:193145760847:web:7d1f77be123c3edb104e3a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Global variable to hold user data
let currentQmsUser = null;

document.addEventListener('DOMContentLoaded', async () => {

    // ==========================================
    // 0. CLOUD DATA SYNC & PRO VIP LOGIC
    // ==========================================
    const uid = localStorage.getItem('qms_user_uid');
    
    if (uid) {
        try {
            const userDocRef = doc(db, "users", uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const cloudData = userDocSnap.data();
                currentQmsUser = cloudData;
                
                // Update LocalStorage with fresh Cloud Data
                if (cloudData.name) localStorage.setItem('qms_user_name', cloudData.name);
                if (cloudData.photoURL) localStorage.setItem('qms_profile_img', cloudData.photoURL);
                if (cloudData.totalXp) localStorage.setItem('qms_total_xp', cloudData.totalXp); 
                
                // Update Dashboard UI Elements
                const dashNameEl = document.getElementById('dash-user-name');
                const panelNameEl = document.getElementById('panel-user-name');
                const dashAvatarImg = document.getElementById('dash-small-avatar');
                const panelAvatarImg = document.getElementById('panel-profile-img');

                if (dashNameEl) dashNameEl.innerText = cloudData.name;
                if (panelNameEl) panelNameEl.innerText = cloudData.name;
                if (dashAvatarImg && cloudData.photoURL) dashAvatarImg.src = cloudData.photoURL;
                if (panelAvatarImg && cloudData.photoURL) panelAvatarImg.src = cloudData.photoURL;
                
                // 👑 PRO MEMBER LOGIC
                if (cloudData.isPremium === true) {
                    // Hide Ads and Upgrade Buttons
                    const upgradeBtn = document.getElementById('upgrade-pro-btn');
                    if (upgradeBtn) upgradeBtn.style.display = "none";
                    
                    const adBanner = document.getElementById('ad-banner');
                    if (adBanner) adBanner.style.display = "none";
                    
                    // Apply Golden VIP UI
                    const proCrown = document.getElementById('pro-crown');
                    if (proCrown) proCrown.innerHTML = '<i class="ri-vip-crown-fill" style="color: #d4af37;"></i>';
                    
                    if (dashNameEl) dashNameEl.classList.add('pro-text-gold');
                    if (dashAvatarImg) dashAvatarImg.classList.add('pro-active-glow');
                    if (panelAvatarImg) panelAvatarImg.classList.add('pro-active-glow');
                    
                    const badge = document.getElementById('user-level-badge');
                    if (badge) {
                        badge.innerHTML = '<i class="ri-vip-crown-fill"></i> PRO मेंबर';
                        badge.style.background = 'rgba(212, 175, 55, 0.1)';
                        badge.style.color = '#d4af37';
                        badge.style.borderColor = '#d4af37';
                    }
                    
                    const welcomeBanner = document.getElementById('welcome-banner');
                    if (welcomeBanner) welcomeBanner.style.borderLeftColor = '#d4af37';
                    
                    const panelStatus = document.getElementById('panel-status-text');
                    if (panelStatus) {
                        panelStatus.innerHTML = '<i class="ri-vip-crown-fill" style="color:#d4af37;"></i> PRO मेंबर';
                        panelStatus.style.color = '#d4af37';
                    }
                }
                console.log("✅ Cloud Sync Success: Data loaded securely.");
            }
        } catch (error) {
            console.error("❌ Cloud Sync Failed: Could not fetch user data.", error);
        }
    } else {
        console.warn("No User ID found. Redirecting to login...");
        window.location.href = 'index.html';
    }


    // ==========================================
    // 1. SMART BGM MEMORY & ALARM SYSTEM
    // ==========================================
    const bgmAudio = document.getElementById('bgm-audio');
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgmVolumeControl = document.getElementById('bgm-volume');
    const bgmTrackSelect = document.getElementById('bgm-track-select');
    const pomodoroAlarmAudio = document.getElementById('pomodoro-alarm');
    const pomodoroToneSelect = document.getElementById('pomodoro-tone-select');
    
    let isBgmOn = localStorage.getItem('qms_bgm') === 'on';
    let savedBgmVolume = localStorage.getItem('qms_bgm_volume') || 0.3;
    let savedBgmTime = localStorage.getItem('qms_bgm_time') || 0;
    let savedBgmTrack = localStorage.getItem('qms_bgm_track') || 'bgm1.mp3';
    let savedAlarmTone = localStorage.getItem('qms_alarm_tone') || 'bell.mp3';

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

    if (pomodoroAlarmAudio) {
        pomodoroAlarmAudio.src = savedAlarmTone;
        if (pomodoroToneSelect) {
            pomodoroToneSelect.value = savedAlarmTone;
            pomodoroToneSelect.addEventListener('change', (event) => {
                const newTone = event.target.value;
                localStorage.setItem('qms_alarm_tone', newTone);
                pomodoroAlarmAudio.src = newTone;
                pomodoroAlarmAudio.play().catch(()=>{}); // Test play
            });
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

        // Try playing safely on first interaction
        document.body.addEventListener('click', () => {
            if (isBgmOn && bgmAudio.paused) {
                bgmAudio.play().catch(error => console.log("Audio play blocked.", error));
            }
        }, { once: true });

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
                        splashScreenElement.style.display = 'none';
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
    // 4. POMODORO FOCUS TIMER (WITH ALARM)
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
                if (window.showCustomToast) window.showCustomToast("टाइमर चालू है। पहले उसे पॉज़ करें।", true);
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
                if (window.showCustomToast) window.showCustomToast("टाइमर चालू है। पहले उसे पॉज़ करें।", true);
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
                        // Timer Finished Logic
                        clearInterval(focusTimerInterval); 
                        isFocusTimerRunning = false; 
                        
                        // Play Selected Alarm Tone
                        if (pomodoroAlarmAudio) {
                            pomodoroAlarmAudio.currentTime = 0;
                            pomodoroAlarmAudio.play().catch(()=>{});
                        }
                        
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
    // 5. SMART BOOKMARKS (SAVED NOTES)
    // ==========================================
    const bookmarksModalOverlay = document.getElementById('bookmarks-modal-overlay');
    const openBookmarksBtn = document.getElementById('open-bookmarks-modal-btn');
    const closeBookmarksBtn = document.getElementById('close-bookmarks-modal-btn');
    
    if (openBookmarksBtn && bookmarksModalOverlay) {
        openBookmarksBtn.addEventListener('click', () => {
            bookmarksModalOverlay.style.display = 'flex';
            setTimeout(() => { bookmarksModalOverlay.style.opacity = '1'; }, 10);
        });
    }

    if (closeBookmarksBtn && bookmarksModalOverlay) {
        closeBookmarksBtn.addEventListener('click', () => {
            bookmarksModalOverlay.style.opacity = '0';
            setTimeout(() => { bookmarksModalOverlay.style.display = 'none'; }, 300);
        });
    }
    
    const bookmarksModalContent = document.getElementById('bookmarks-modal-content');
    if (bookmarksModalContent) {
        const rawBookmarksData = localStorage.getItem('qms_bookmarks');
        let parsedBookmarks = {};
        
        if (rawBookmarksData) {
            parsedBookmarks = JSON.parse(rawBookmarksData);
        }
        
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
    // 6. CUSTOM TOASTS & MODALS
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

    // Prompt logic placeholder
    window.showCustomPrompt = function(titleText, defaultInputValue, callbackFunc) { 
        let newName = prompt(titleText, defaultInputValue);
        if (newName) callbackFunc(newName);
    };

    // ==========================================
    // 7. 🏆 50 MEGA BADGES SYSTEM (HARDCORE XP LOGIC)
    // ==========================================
    let completedChaptersData = {};
    const rawCompletedData = localStorage.getItem('qms_completed');
    if (rawCompletedData) {
        completedChaptersData = JSON.parse(rawCompletedData);
    }
    
    const completedChaptersCountNumber = Object.keys(completedChaptersData).length;
    let storedExtraXp = parseInt(localStorage.getItem('qms_total_xp')) || 0;
    let grandTotalXp = (completedChaptersCountNumber * 50) + storedExtraXp;
    
    // Save locally
    localStorage.setItem('qms_total_xp', grandTotalXp);

    const dashCompletedCountElement = document.getElementById('dash-completed-count');
    if (dashCompletedCountElement) {
        dashCompletedCountElement.innerText = completedChaptersCountNumber;
    }
    
    const dashTotalXpElement = document.getElementById('dash-total-xp');
    if (dashTotalXpElement) {
        dashTotalXpElement.innerText = grandTotalXp;
    }

    // Full 50 Badges Data Array
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
        
        // "View All" Button
        displayHtml += `
            <div id="open-all-badges-btn" class="badge-card sfx-trigger" style="background: rgba(255,255,255,0.05); border: 1px dashed var(--accent-main); display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer;">
                <i class="ri-grid-fill badge-icon" style="color: var(--accent-main); animation: pulseGlow 2s infinite alternate;"></i>
                <h4 class="badge-title" style="color: var(--accent-main);">सभी 50 बैज देखें</h4>
                <p class="badge-desc">क्लिक करें</p>
            </div>
        `;
        
        badgesContainerElement.innerHTML = displayHtml;
        
        const openAllBadgesBtn = document.getElementById('open-all-badges-btn');
        if (openAllBadgesBtn) {
            openAllBadgesBtn.addEventListener('click', () => {
                alert("यहाँ पर 'View All 50 Badges' का पूरा ग्रिड मोडल ओपन होगा!");
            });
        }
    }

    // ==========================================
    // 8. 📅 DAILY STREAK CALENDAR LOGIC
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
        if (rawHistory) {
            streakHistory = JSON.parse(rawHistory);
        }
        
        // Mark today as visited
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

        // Render 7-day grid
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
    // 9. ✨ ADVANCED UI SETTINGS & CUSTOMIZATION
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

    // ✨ 9A. Theme Select (10 Colors)
    const themeSelectDropdown = document.getElementById('theme-select');
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (themeSelectDropdown) {
        themeSelectDropdown.value = savedTheme;
        themeSelectDropdown.addEventListener('change', (event) => {
            const newTheme = event.target.value;
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('qms_theme', newTheme);
        });
    }

    // ✨ 9B. Avatar Frames Logic
    const avatarSelect = document.getElementById('avatar-frame-select');
    const headerAvatarWrapper = document.getElementById('header-avatar-frame');
    const panelAvatarWrapper = document.getElementById('panel-avatar-frame');
    
    const savedFrame = localStorage.getItem('qms_avatar_frame') || 'none';
    
    function applyAvatarFrame(frameClass) {
        headerAvatarWrapper.className = 'avatar-frame-wrapper'; // reset
        panelAvatarWrapper.className = 'avatar-frame-wrapper'; // reset
        if(frameClass !== 'none') {
            headerAvatarWrapper.classList.add(frameClass);
            panelAvatarWrapper.classList.add(frameClass);
        }
    }
    
    applyAvatarFrame(savedFrame);
    
    if (avatarSelect) {
        avatarSelect.value = savedFrame;
        avatarSelect.addEventListener('change', (e) => {
            const selectedFrame = e.target.value;
            
            // Premium Check
            if (selectedFrame === 'frame-quantum' && (!currentQmsUser || currentQmsUser.isPremium !== true)) {
                window.showCustomToast("Quantum Frame केवल PRO मेंबर्स के लिए है!", true);
                e.target.value = savedFrame; // Revert
                return;
            }

            localStorage.setItem('qms_avatar_frame', selectedFrame);
            applyAvatarFrame(selectedFrame);
            window.showCustomToast("प्रोफाइल फ्रेम अपडेट हो गया!");
        });
    }

    // ✨ 9C. Eye Care Mode Logic
    const eyeCareToggle = document.getElementById('eye-care-toggle');
    let isEyeCareOn = localStorage.getItem('qms_eye_care') === 'on';
    
    if (isEyeCareOn) document.body.classList.add('eye-care-active');

    if (eyeCareToggle) {
        eyeCareToggle.checked = isEyeCareOn;
        updateToggleUI(eyeCareToggle);
        
        eyeCareToggle.addEventListener('change', (e) => {
            isEyeCareOn = e.target.checked;
            if (isEyeCareOn) {
                document.body.classList.add('eye-care-active');
                localStorage.setItem('qms_eye_care', 'on');
            } else {
                document.body.classList.remove('eye-care-active');
                localStorage.setItem('qms_eye_care', 'off');
            }
            updateToggleUI(e.target);
        });
    }

    // ✨ 9D. Background Animation Toggle
    const animToggle = document.getElementById('anim-toggle');
    let isAnimOn = localStorage.getItem('qms_anim') !== 'off';
    
    if(animToggle) {
        animToggle.checked = isAnimOn; 
        updateToggleUI(animToggle);
        
        animToggle.addEventListener('change', (e) => {
            isAnimOn = e.target.checked;
            localStorage.setItem('qms_anim', isAnimOn ? 'on' : 'off');
            updateToggleUI(e.target);
            
            if(!isAnimOn) { 
                const canvas = document.getElementById('bg-canvas'); 
                if(canvas) { 
                    canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height); 
                } 
            }
        });
    }

    // ✨ 9E. Clear Storage (Cache Manager)
    const clearCacheBtn = document.getElementById('clear-cache-btn');
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', () => {
            if(confirm("क्या आप ऑफलाइन सेव किए गए नोट्स और एक्स्ट्रा फाइल्स को मिटाना चाहते हैं? (XP सुरक्षित रहेगा)")) {
                // Delete everything EXCEPT critical user data
                const keysToKeep = ['qms_user_uid', 'qms_user_name', 'qms_total_xp', 'qms_profile_img'];
                const savedItems = {};
                keysToKeep.forEach(key => savedItems[key] = localStorage.getItem(key));
                
                localStorage.clear(); // Wipe
                
                // Restore
                keysToKeep.forEach(key => {
                    if (savedItems[key]) localStorage.setItem(key, savedItems[key]);
                });

                window.showCustomToast("कैशे और अनवांटेड डेटा डिलीट हो गया है!");
                setTimeout(() => window.location.reload(), 1500);
            }
        });
    }

    // ==========================================
    // 10. 🏆 TOP 50 LEADERBOARD FIREBASE LOGIC
    // ==========================================
    const leaderboardOverlay = document.getElementById('leaderboard-modal-overlay');
    const leaderboardBtn = document.getElementById('open-leaderboard-btn');
    const closeLeaderboardBtn = document.getElementById('close-leaderboard-btn');
    const leaderboardContent = document.getElementById('leaderboard-content');
    const myCurrentRankEl = document.getElementById('my-current-rank');

    if (leaderboardBtn && leaderboardOverlay) {
        leaderboardBtn.addEventListener('click', async () => {
            leaderboardOverlay.style.display = 'flex';
            setTimeout(() => leaderboardOverlay.style.opacity = '1', 10);
            
            try {
                // Fetch top 50 users based on totalXp
                const usersRef = collection(db, "users");
                const q = query(usersRef, orderBy("totalXp", "desc"), limit(50));
                
                const querySnapshot = await getDocs(q);
                let rank = 1;
                let html = '';
                let myRankValue = '--';

                querySnapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    const uId = docSnap.id;
                    
                    let rankClass = '';
                    if (rank === 1) rankClass = 'top-1';
                    else if (rank === 2) rankClass = 'top-2';
                    else if (rank === 3) rankClass = 'top-3';

                    const isMe = (uId === uid);
                    if (isMe) myRankValue = rank;

                    let bgStyle = isMe ? 'background: rgba(212, 175, 55, 0.1); border-color: #d4af37;' : '';

                    html += `
                        <div class="lb-item" style="${bgStyle}">
                            <div class="lb-rank ${rankClass}">#${rank}</div>
                            <div class="lb-user-info">
                                <img src="${data.photoURL || 'logo.png'}" alt="Avatar">
                                <div class="lb-name">${data.name || 'Unknown Student'}</div>
                            </div>
                            <div class="lb-xp">${data.totalXp || 0} XP</div>
                        </div>
                    `;
                    rank++;
                });

                leaderboardContent.innerHTML = html || '<p style="text-align:center; color:gray;">कोई डेटा नहीं मिला।</p>';
                myCurrentRankEl.innerText = `#${myRankValue}`;
                
            } catch (error) {
                console.error("Leaderboard Fetch Error:", error);
                leaderboardContent.innerHTML = '<p style="text-align:center; color:#ea4335;">डेटा लोड करने में समस्या हुई।</p>';
            }
        });
    }

    if (closeLeaderboardBtn) {
        closeLeaderboardBtn.addEventListener('click', () => {
            leaderboardOverlay.style.opacity = '0';
            setTimeout(() => leaderboardOverlay.style.display = 'none', 300);
        });
    }

    // ==========================================
    // 11. PROFILE IMAGE UPLOAD LOGIC
    // ==========================================
    const profileImageUploadInput = document.getElementById('img-upload');
    if (profileImageUploadInput) {
        profileImageUploadInput.addEventListener('change', function(event) {
            const uploadedFile = event.target.files[0];
            if (uploadedFile) {
                const fileReaderInstance = new FileReader();
                fileReaderInstance.onload = function(readerEvent) {
                    const tempImgNode = new Image();
                    tempImgNode.onload = async function() {
                        const temporaryCanvas = document.createElement('canvas'); 
                        const temporaryCanvasContext = temporaryCanvas.getContext('2d');
                        
                        let targetWidth = tempImgNode.width; 
                        let targetHeight = tempImgNode.height;
                        
                        if (targetWidth > targetHeight) { 
                            if (targetWidth > 200) { targetHeight *= 200 / targetWidth; targetWidth = 200; } 
                        } else { 
                            if (targetHeight > 200) { targetWidth *= 200 / targetHeight; targetHeight = 200; } 
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
                            
                            // Save to Firestore so it shows in Leaderboard
                            if(uid) {
                                await updateDoc(doc(db, "users", uid), {
                                    photoURL: compressedImageBase64String
                                });
                            }
                            
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

    // ==========================================
    // 12. LOGOUT FUNCTIONALITY
    // ==========================================
    const resetLogoutButton = document.getElementById('reset-btn');
    if (resetLogoutButton) { 
        resetLogoutButton.addEventListener('click', () => { 
            if(confirm("क्या आप सच में लॉगआउट करना चाहते हैं?")) {
                signOut(auth).then(() => {
                    localStorage.setItem('qms_is_logged_in', 'false');
                    window.location.href = "index.html"; 
                });
            }
        }); 
    }

    // ==========================================
    // 13. 🌌 ADVANCED FIREFLY & FORMULAS PARTICLES ENGINE
    // ==========================================
    const backgroundCanvasNode = document.getElementById('bg-canvas');
    if (backgroundCanvasNode) {
        const renderContext2D = backgroundCanvasNode.getContext('2d'); 
        backgroundCanvasNode.width = window.innerWidth; 
        backgroundCanvasNode.height = window.innerHeight;
        
        // Math and Science Formulas Array
        const mathScienceSymbolsList = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let activeParticlesCollection = [];
        
        class AdvancedParticle {
            constructor() {
                // 60% chance to be a symbol, 40% chance to be a simple dot
                const shapeTypeRandomizer = Math.random();
                if (shapeTypeRandomizer > 0.4) {
                    this.particleShape = 'symbol';
                } else {
                    this.particleShape = 'dot';
                }
                
                const randomSymbolSelection = Math.floor(Math.random() * mathScienceSymbolsList.length);
                this.textSymbol = mathScienceSymbolsList[randomSymbolSelection];
                
                this.coordinateX = Math.random() * backgroundCanvasNode.width; 
                this.coordinateY = Math.random() * backgroundCanvasNode.height;
                
                if (this.particleShape === 'symbol') { 
                    this.pixelSize = Math.random() * 12 + 10; // Font size
                    this.velocityVectorX = Math.random() * 0.5 - 0.25; 
                    this.velocityVectorY = Math.random() * -0.8 - 0.2; 
                } else { 
                    this.pixelSize = Math.random() * 3 + 1; // Dot size
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
                
                // Reset position if it goes off screen
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
                
                if (currentThemeAccentColor === "") {
                    currentThemeAccentColor = '#00f0ff';
                }
                
                // Glowing Pulse Effect using Sine wave
                let dynamicOpacityNumber = ((Math.sin(this.alphaSineAngle) + 1) / 2) * 0.6 + 0.1;
                
                ctxObject.fillStyle = `rgba(255, 255, 255, ${dynamicOpacityNumber})`; 
                ctxObject.shadowBlur = dynamicOpacityNumber * 15; 
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
        
        // Generate Particles
        for (let iterationIndex = 0; iterationIndex < 40; iterationIndex++) { 
            activeParticlesCollection.push(new AdvancedParticle()); 
        }
        
        function executeBackgroundAnimation() { 
            // Check if user has turned off background animation from settings
            if (isAnimOn) {
                renderContext2D.clearRect(0, 0, backgroundCanvasNode.width, backgroundCanvasNode.height); 
                
                activeParticlesCollection.forEach(particleItem => { 
                    particleItem.updatePositionData(); 
                    particleItem.drawOntoCanvas(renderContext2D); 
                }); 
            }
            requestAnimationFrame(executeBackgroundAnimation); 
        }
        
        // Start Loop
        executeBackgroundAnimation();
        
        window.addEventListener('resize', () => { 
            backgroundCanvasNode.width = window.innerWidth; 
            backgroundCanvasNode.height = window.innerHeight; 
        });
    }
});
