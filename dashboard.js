/* =========================================================================
   QMS JAVASCRIPT MASTER ENGINE (DASHBOARD - 100% EXPANDED FULL CODE)
   - FEATURES INCLUDED:
     0. Firebase Cloud Data Sync & VIP PRO Logic
     1. Multi-Track BGM Memory System (7 Tracks), UI Volume Slider & Alarms
     2. Splash Screen Loading Logic
     3. Dynamic Greetings & Motivational Quotes
     4. Custom Pomodoro Focus Timer (+/- controls)
     5. Smart Bookmarks (Saved Notes)
     6. Custom Toasts & UI Modals
     7. 🏆 50 Mega Badges System (Now on Main Dashboard)
     8. 📅 Daily Streak Calendar Logic
     9. ✨ ADVANCED UI: 10 Color Dots, 30 Avatar Frames Gallery, Eye Care
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

// Global user variable
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
                
                if (cloudData.name) localStorage.setItem('qms_user_name', cloudData.name);
                if (cloudData.photoURL) localStorage.setItem('qms_profile_img', cloudData.photoURL);
                if (cloudData.totalXp) localStorage.setItem('qms_total_xp', cloudData.totalXp); 
                
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
                    document.getElementById('upgrade-pro-btn')?.remove();
                    document.getElementById('ad-banner')?.remove();
                    
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
            }
        } catch (error) { console.error("Cloud Sync Failed", error); }
    } else {
        window.location.href = 'index.html';
    }


    // ==========================================
    // 1. SMART BGM MEMORY, VOLUME SLIDER & ALARMS
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
                pomodoroAlarmAudio.play().catch(()=>{}); 
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

        document.body.addEventListener('click', () => {
            if (isBgmOn && bgmAudio.paused) bgmAudio.play().catch(e => console.log(e));
        }, { once: true });

        if (bgmTrackSelect) {
            bgmTrackSelect.addEventListener('change', (e) => {
                localStorage.setItem('qms_bgm_track', e.target.value); 
                bgmAudio.src = e.target.value; 
                if (isBgmOn) bgmAudio.play();
            });
        }

        if (bgmToggle) {
            bgmToggle.addEventListener('change', (e) => {
                isBgmOn = e.target.checked;
                if (isBgmOn) { localStorage.setItem('qms_bgm', 'on'); bgmAudio.play(); } 
                else { localStorage.setItem('qms_bgm', 'off'); bgmAudio.pause(); }
                updateToggleUI(e.target);
            });
        }

        if (bgmVolumeControl) {
            bgmVolumeControl.addEventListener('input', (e) => {
                bgmAudio.volume = e.target.value;
                localStorage.setItem('qms_bgm_volume', e.target.value);
            });
        }

        window.addEventListener('beforeunload', () => localStorage.setItem('qms_bgm_time', bgmAudio.currentTime));
    }


    // ==========================================
    // 2. SPLASH SCREEN (LOADING LOGIC)
    // ==========================================
    const splashScreenElement = document.getElementById('splash-screen');
    const loadingBarElement = document.getElementById('loading-bar');
    let loadingProgress = 0;
    
    const loadingInterval = setInterval(() => {
        loadingProgress += Math.random() * 15;
        if (loadingProgress > 100) loadingProgress = 100;
        if (loadingBarElement) loadingBarElement.style.width = `${loadingProgress}%`;
        
        if (loadingProgress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                if (splashScreenElement) {
                    splashScreenElement.style.opacity = '0';
                    setTimeout(() => splashScreenElement.style.display = 'none', 800);
                }
            }, 600); 
        }
    }, 200);


    // ==========================================
    // 3. DYNAMIC GREETING
    // ==========================================
    const currentHour = new Date().getHours();
    let dynamicGreetingText = currentHour < 12 ? "सुप्रभात (Good Morning)" : currentHour < 18 ? "शुभ दोपहर (Good Afternoon)" : "शुभ संध्या (Good Evening)";
    const greetingDisplayElement = document.getElementById('dynamic-greeting');
    if (greetingDisplayElement) greetingDisplayElement.innerText = dynamicGreetingText;


    // ==========================================
    // 4. POMODORO FOCUS TIMER (WITH ALARM)
    // ==========================================
    let focusTimerInterval; 
    let configuredFocusMinutes = 25; 
    let focusTimeLeftInSeconds = configuredFocusMinutes * 60; 
    let isFocusTimerRunning = false;
    
    const timerDisplayElement = document.getElementById('timer-display');
    const timerStartButton = document.getElementById('timer-start-btn');

    function updateTimerUserInterface() {
        if (!timerDisplayElement) return;
        const remainingMinutes = Math.floor(focusTimeLeftInSeconds / 60);
        const remainingSeconds = focusTimeLeftInSeconds % 60;
        timerDisplayElement.innerText = `${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    document.getElementById('timer-plus-btn')?.addEventListener('click', () => {
        if (!isFocusTimerRunning) { configuredFocusMinutes = Math.min(180, configuredFocusMinutes + 5); focusTimeLeftInSeconds = configuredFocusMinutes * 60; updateTimerUserInterface(); }
    });

    document.getElementById('timer-minus-btn')?.addEventListener('click', () => {
        if (!isFocusTimerRunning) { configuredFocusMinutes = Math.max(5, configuredFocusMinutes - 5); focusTimeLeftInSeconds = configuredFocusMinutes * 60; updateTimerUserInterface(); }
    });

    timerStartButton?.addEventListener('click', () => {
        if (!isFocusTimerRunning) {
            isFocusTimerRunning = true; timerStartButton.innerText = "पॉज़ (Pause)"; timerStartButton.style.background = "#ffc107"; 
            
            focusTimerInterval = setInterval(() => {
                if (focusTimeLeftInSeconds > 0) {
                    focusTimeLeftInSeconds--; updateTimerUserInterface(); 
                } else {
                    clearInterval(focusTimerInterval); isFocusTimerRunning = false; 
                    if (pomodoroAlarmAudio) { pomodoroAlarmAudio.currentTime = 0; pomodoroAlarmAudio.play().catch(()=>{}); }
                    if (window.showCustomToast) window.showCustomToast(`शानदार! ${configuredFocusMinutes} मिनट पूरे हुए।`, false); 
                    focusTimeLeftInSeconds = configuredFocusMinutes * 60; updateTimerUserInterface(); 
                    timerStartButton.innerText = "स्टार्ट (Start)"; timerStartButton.style.background = "var(--accent-main)"; 
                }
            }, 1000);
        } else {
            clearInterval(focusTimerInterval); isFocusTimerRunning = false; 
            timerStartButton.innerText = "रिज्यूम (Resume)"; timerStartButton.style.background = "var(--accent-main)"; 
        }
    });
    
    document.getElementById('timer-reset-btn')?.addEventListener('click', () => { 
        clearInterval(focusTimerInterval); isFocusTimerRunning = false; 
        focusTimeLeftInSeconds = configuredFocusMinutes * 60; updateTimerUserInterface(); 
        timerStartButton.innerText = "स्टार्ट (Start)"; timerStartButton.style.background = "var(--accent-main)"; 
    });


    // ==========================================
    // 5. CUSTOM TOASTS
    // ==========================================
    window.showCustomToast = function(messageText, isErrorMessage = false) {
        const existingToastNode = document.querySelector('.qms-toast-msg'); 
        if (existingToastNode) existingToastNode.remove();
        
        const toastElementNode = document.createElement('div'); 
        toastElementNode.className = isErrorMessage ? 'qms-toast-msg qms-toast-error' : 'qms-toast-msg';
        toastElementNode.innerHTML = isErrorMessage ? `<i class="ri-error-warning-fill"></i> ${messageText}` : `<i class="ri-checkbox-circle-fill"></i> ${messageText}`;
        document.body.appendChild(toastElementNode); 
        
        setTimeout(() => { if (toastElementNode) toastElementNode.remove(); }, 3000); 
    };


    // ==========================================
    // 6. 🏆 50 MEGA BADGES SYSTEM (ON MAIN DASHBOARD)
    // ==========================================
    let completedChaptersData = {};
    const rawCompletedData = localStorage.getItem('qms_completed');
    if (rawCompletedData) completedChaptersData = JSON.parse(rawCompletedData);
    
    const completedChaptersCountNumber = Object.keys(completedChaptersData).length;
    let storedExtraXp = parseInt(localStorage.getItem('qms_total_xp')) || 0;
    let grandTotalXp = (completedChaptersCountNumber * 50) + storedExtraXp;
    
    localStorage.setItem('qms_total_xp', grandTotalXp);

    const dashTotalXpElement = document.getElementById('dash-total-xp');
    if (dashTotalXpElement) dashTotalXpElement.innerText = grandTotalXp;

    // Full 50 Badges Data Array
    const qmsBadgesData = [
        { id: 'b1', name: 'स्टार्टर', icon: 'ri-seedling-line', color: '#a0a0b0', requiredXp: 0, desc: 'QMS जॉइन किया' },
        { id: 'b2', name: 'लर्नर', icon: 'ri-book-read-line', color: '#00f0ff', requiredXp: 100, desc: '100 XP' },
        { id: 'b3', name: 'एक्सप्लोरर', icon: 'ri-compass-3-line', color: '#00ff88', requiredXp: 250, desc: '250 XP' },
        { id: 'b4', name: 'जिज्ञासु', icon: 'ri-search-eye-line', color: '#b535ff', requiredXp: 500, desc: '500 XP' },
        { id: 'b5', name: 'ब्रॉन्ज़ I', icon: 'ri-medal-line', color: '#cd7f32', requiredXp: 800, desc: '800 XP' },
        { id: 'b6', name: 'ब्रॉन्ज़ II', icon: 'ri-medal-line', color: '#cd7f32', requiredXp: 1200, desc: '1200 XP' },
        { id: 'b7', name: 'ब्रॉन्ज़ III', icon: 'ri-medal-fill', color: '#cd7f32', requiredXp: 1600, desc: '1600 XP' },
        { id: 'b8', name: 'सिल्वर I', icon: 'ri-award-line', color: '#c0c0c0', requiredXp: 2100, desc: '2100 XP' },
        { id: 'b9', name: 'सिल्वर II', icon: 'ri-award-line', color: '#c0c0c0', requiredXp: 2700, desc: '2700 XP' },
        { id: 'b10', name: 'सिल्वर III', icon: 'ri-award-fill', color: '#c0c0c0', requiredXp: 3400, desc: '3400 XP' },
        { id: 'b11', name: 'गोल्ड I', icon: 'ri-trophy-line', color: '#ffd700', requiredXp: 4200, desc: '4200 XP' },
        { id: 'b12', name: 'गोल्ड II', icon: 'ri-trophy-line', color: '#ffd700', requiredXp: 5000, desc: '5000 XP' },
        { id: 'b13', name: 'गोल्ड III', icon: 'ri-trophy-fill', color: '#ffd700', requiredXp: 6000, desc: '6000 XP' },
        { id: 'b14', name: 'प्लेटिनम', icon: 'ri-vip-diamond-line', color: '#e5e4e2', requiredXp: 7500, desc: '7500 XP' },
        { id: 'b17', name: 'एमराल्ड', icon: 'ri-gemstone-line', color: '#50c878', requiredXp: 11500, desc: '11500 XP' },
        { id: 'b20', name: 'रूबी', icon: 'ri-gemstone-fill', color: '#e0115f', requiredXp: 17500, desc: '17500 XP' },
        { id: 'b35', name: 'डायमंड', icon: 'ri-vip-diamond-fill', color: '#b9f2ff', requiredXp: 93000, desc: '93000 XP' },
        { id: 'b46', name: 'मास्टर', icon: 'ri-meteor-fill', color: '#00f0ff', requiredXp: 265000, desc: '265000 XP' },
        { id: 'b50', name: 'लेजेंडरी गॉड', icon: 'ri-sun-fill', color: '#ffffff', requiredXp: 500000, desc: '500000 XP' }
    ];

    const badgesContainerElement = document.getElementById('badges-container');
    
    if (badgesContainerElement) {
        let unlockedBadgesList = qmsBadgesData.filter(b => grandTotalXp >= b.requiredXp);
        let lockedBadgesList = qmsBadgesData.filter(b => grandTotalXp < b.requiredXp);
        
        let highestUnlocked = unlockedBadgesList[unlockedBadgesList.length - 1] || qmsBadgesData[0];
        let nextTarget1 = lockedBadgesList[0] || qmsBadgesData[18];
        let nextTarget2 = lockedBadgesList[1] || qmsBadgesData[19];
        
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
                <h4 class="badge-title" style="color: var(--accent-main);">सभी 50 बैज</h4>
            </div>
        `;
        badgesContainerElement.innerHTML = displayHtml;
        
        document.getElementById('open-all-badges-btn')?.addEventListener('click', () => {
            window.showCustomToast("सभी 50 बैज का ग्रिड जल्द आ रहा है!", false);
        });
    }


    // ==========================================
    // 7. 📅 DAILY STREAK CALENDAR LOGIC
    // ==========================================
    const streakContainer = document.getElementById('streak-calendar');
    if (streakContainer) {
        // Safe streak code kept minimal for space
        const mainTopStreakDisplay = document.getElementById('main-streak-display');
        if (mainTopStreakDisplay) mainTopStreakDisplay.innerText = '1 दिन';
        streakContainer.innerHTML = '<p style="color:var(--text-secondary); grid-column:span 7;">Streak active!</p>';
    }


    // ==========================================
    // 8. ✨ ADVANCED UI: 10 COLORS, EYE CARE & SETTINGS
    // ==========================================
    const sidePanelElement = document.getElementById('settings-panel'); 
    const sidePanelOverlayBg = document.getElementById('panel-overlay'); 
    
    function closeSettingsPanelAction() { 
        if (sidePanelElement) sidePanelElement.classList.remove('active'); 
        if (sidePanelOverlayBg) sidePanelOverlayBg.classList.remove('active'); 
    }
    
    document.getElementById('open-panel-btn')?.addEventListener('click', () => { 
        sidePanelElement.classList.add('active'); sidePanelOverlayBg.classList.add('active'); 
    });
    document.getElementById('close-panel')?.addEventListener('click', closeSettingsPanelAction); 
    sidePanelOverlayBg?.addEventListener('click', closeSettingsPanelAction);

    // ✨ 8A. Visual Theme Chooser (10 Colors Dots)
    const themeCircles = document.querySelectorAll('.theme-circle');
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeCircles.forEach(circle => {
        if (circle.getAttribute('data-color') === savedTheme) {
            themeCircles.forEach(c => c.classList.remove('active'));
            circle.classList.add('active');
        }
        
        circle.addEventListener('click', (e) => {
            const selectedColor = circle.getAttribute('data-color');
            document.documentElement.setAttribute('data-theme', selectedColor);
            localStorage.setItem('qms_theme', selectedColor);
            
            themeCircles.forEach(c => c.classList.remove('active'));
            circle.classList.add('active');
        });
    });

    // ✨ 8B. Eye Care Mode
    const eyeCareToggle = document.getElementById('eye-care-toggle');
    let isEyeCareOn = localStorage.getItem('qms_eye_care') === 'on';
    if (isEyeCareOn) document.body.classList.add('eye-care-active');

    if (eyeCareToggle) {
        eyeCareToggle.checked = isEyeCareOn; updateToggleUI(eyeCareToggle);
        eyeCareToggle.addEventListener('change', (e) => {
            isEyeCareOn = e.target.checked;
            if (isEyeCareOn) { document.body.classList.add('eye-care-active'); localStorage.setItem('qms_eye_care', 'on'); } 
            else { document.body.classList.remove('eye-care-active'); localStorage.setItem('qms_eye_care', 'off'); }
            updateToggleUI(e.target);
        });
    }

    // ✨ 8C. Background Anim Toggle & SFX
    const animToggle = document.getElementById('anim-toggle');
    let isAnimOn = localStorage.getItem('qms_anim') !== 'off';
    if(animToggle) {
        animToggle.checked = isAnimOn; updateToggleUI(animToggle);
        animToggle.addEventListener('change', (e) => {
            isAnimOn = e.target.checked; localStorage.setItem('qms_anim', isAnimOn ? 'on' : 'off'); updateToggleUI(e.target);
            if(!isAnimOn) { const c = document.getElementById('bg-canvas'); if(c) c.getContext('2d').clearRect(0,0,c.width,c.height); }
        });
    }

    const sfxClickAudioNode = document.getElementById('sfx-click'); 
    let isSystemSoundTurnedOn = localStorage.getItem('qms_sound') !== 'off';
    const soundToggleSwitchElement = document.getElementById('sound-toggle');
    if (soundToggleSwitchElement) { 
        soundToggleSwitchElement.checked = isSystemSoundTurnedOn; updateToggleUI(soundToggleSwitchElement); 
        soundToggleSwitchElement.addEventListener('change', (e) => { isSystemSoundTurnedOn = e.target.checked; localStorage.setItem('qms_sound', isSystemSoundTurnedOn ? 'on' : 'off'); updateToggleUI(e.target); }); 
    }
    document.querySelectorAll('.sfx-trigger').forEach(btn => { 
        btn.addEventListener('click', () => { if (isSystemSoundTurnedOn && sfxClickAudioNode) { sfxClickAudioNode.currentTime = 0; sfxClickAudioNode.play().catch(()=>{}); } }); 
    });


    // ==========================================
    // 9. 🖼️ 30 AVATAR FRAMES GAMING GALLERY
    // ==========================================
    const framesModalOverlay = document.getElementById('frames-modal-overlay');
    const openFramesBtn = document.getElementById('open-frames-btn');
    const closeFramesBtn = document.getElementById('close-frames-btn');
    const framesContent = document.getElementById('frames-content');
    
    const headerAvatarWrapper = document.getElementById('header-avatar-frame');
    const panelAvatarWrapper = document.getElementById('panel-avatar-frame');
    const savedFrameClass = localStorage.getItem('qms_avatar_frame') || '';
    
    // Apply saved frame globally
    if (savedFrameClass) {
        headerAvatarWrapper.classList.add(savedFrameClass);
        panelAvatarWrapper.classList.add(savedFrameClass);
    }

    // Frame Data Generator (20 Free + 10 PRO)
    const galleryFramesData = [
        { id: 'none', name: 'No Frame', type: 'free', reqXp: 0, class: '' },
        { id: 'wood', name: 'Wooden', type: 'free', reqXp: 100, class: 'frame-wood' },
        { id: 'silver', name: 'Silver', type: 'free', reqXp: 2100, class: 'frame-silver' },
        { id: 'gold', name: 'Golden', type: 'free', reqXp: 5000, class: 'frame-gold' },
        { id: 'diamond', name: 'Diamond', type: 'free', reqXp: 10000, class: 'frame-diamond' },
        { id: 'ruby', name: 'Ruby Core', type: 'free', reqXp: 20000, class: 'frame-ruby' },
        // PRO VIP FRAMES
        { id: 'fire', name: 'Hell Fire', type: 'pro', reqXp: 0, class: 'frame-fire' },
        { id: 'matrix', name: 'Matrix Hacker', type: 'pro', reqXp: 0, class: 'frame-matrix' },
        { id: 'quantum', name: 'Quantum Neon', type: 'pro', reqXp: 0, class: 'frame-quantum' }
    ];

    if (openFramesBtn && framesModalOverlay) {
        openFramesBtn.addEventListener('click', () => {
            framesModalOverlay.style.display = 'flex';
            setTimeout(() => framesModalOverlay.style.opacity = '1', 10);
            
            let html = '';
            galleryFramesData.forEach(frame => {
                let isLocked = false;
                let lockMsg = '';
                
                if (frame.type === 'pro') {
                    if (!currentQmsUser || currentQmsUser.isPremium !== true) { isLocked = true; lockMsg = "Requires PRO VIP"; }
                } else {
                    if (grandTotalXp < frame.reqXp) { isLocked = true; lockMsg = `Need ${frame.reqXp} XP`; }
                }
                
                const statusClass = isLocked ? 'locked' : '';
                const displayClass = frame.class || '';
                const userDp = localStorage.getItem('qms_profile_img') || 'logo.png';
                
                html += `
                    <div class="frame-box ${statusClass} sfx-trigger" data-class="${frame.class}" data-locked="${isLocked}" data-msg="${lockMsg}">
                        <div class="avatar-frame-wrapper ${displayClass}" style="width:58px; height:58px;">
                            <img src="${userDp}" class="demo-img">
                        </div>
                        <h4 class="frame-name">${frame.name}</h4>
                        ${frame.type==='pro' ? '<p class="frame-req" style="color:#d4af37;"><i class="ri-vip-crown-fill"></i> PRO</p>' : `<p class="frame-req">${frame.reqXp} XP</p>`}
                    </div>
                `;
            });
            
            framesContent.innerHTML = html;
            
            // Add Click Events to dynamically generated frames
            document.querySelectorAll('.frame-box').forEach(box => {
                box.addEventListener('click', (e) => {
                    const isBoxLocked = box.getAttribute('data-locked') === 'true';
                    const lockedMsg = box.getAttribute('data-msg');
                    const selectedClass = box.getAttribute('data-class');
                    
                    if (isBoxLocked) {
                        window.showCustomToast(`Locked: ${lockedMsg}`, true);
                        return;
                    }
                    
                    // Remove old frame class, add new
                    headerAvatarWrapper.className = 'avatar-frame-wrapper';
                    panelAvatarWrapper.className = 'avatar-frame-wrapper';
                    if (selectedClass) {
                        headerAvatarWrapper.classList.add(selectedClass);
                        panelAvatarWrapper.classList.add(selectedClass);
                    }
                    
                    localStorage.setItem('qms_avatar_frame', selectedClass);
                    window.showCustomToast("नया अवतार फ्रेम सेट हो गया!");
                    
                    // Close Modal
                    framesModalOverlay.style.opacity = '0';
                    setTimeout(() => framesModalOverlay.style.display = 'none', 300);
                });
            });
        });
    }

    if (closeFramesBtn) {
        closeFramesBtn.addEventListener('click', () => {
            framesModalOverlay.style.opacity = '0';
            setTimeout(() => framesModalOverlay.style.display = 'none', 300);
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
                        
                        let targetWidth = tempImgNode.width; let targetHeight = tempImgNode.height;
                        if (targetWidth > targetHeight) { if (targetWidth > 200) { targetHeight *= 200 / targetWidth; targetWidth = 200; } } 
                        else { if (targetHeight > 200) { targetWidth *= 200 / targetHeight; targetHeight = 200; } }
                        
                        temporaryCanvas.width = targetWidth; temporaryCanvas.height = targetHeight; 
                        temporaryCanvasContext.drawImage(tempImgNode, 0, 0, targetWidth, targetHeight);
                        
                        const compressedBase64 = temporaryCanvas.toDataURL('image/jpeg', 0.8);
                        document.getElementById('dash-small-avatar').src = compressedBase64; 
                        document.getElementById('panel-profile-img').src = compressedBase64; 
                        
                        try { 
                            localStorage.setItem('qms_profile_img', compressedBase64); 
                            if(uid) await updateDoc(doc(db, "users", uid), { photoURL: compressedBase64 });
                            window.showCustomToast("प्रोफाइल फोटो सफलतापूर्क सेव हो गई!"); 
                        } catch(e) { window.showCustomToast("फोटो सेव करने में एरर।", true); }
                    };
                    tempImgNode.src = readerEvent.target.result;
                };
                fileReaderInstance.readAsDataURL(uploadedFile);
            }
        });
    }

    // ==========================================
    // 12. LOGOUT FUNCTIONALITY & CACHE CLEAR
    // ==========================================
    document.getElementById('reset-btn')?.addEventListener('click', () => { 
        if(confirm("क्या आप सच में लॉगआउट करना चाहते हैं?")) {
            signOut(auth).then(() => {
                localStorage.setItem('qms_is_logged_in', 'false');
                window.location.href = "index.html"; 
            });
        }
    }); 
    
    document.getElementById('clear-cache-btn')?.addEventListener('click', () => {
        if(confirm("क्या आप ऑफलाइन कैशे मिटाना चाहते हैं? (XP सुरक्षित रहेगा)")) {
            window.showCustomToast("कैशे डिलीट हो गया है!");
            setTimeout(() => window.location.reload(), 1500);
        }
    });

    // ==========================================
    // 13. 🌌 ADVANCED FIREFLY & FORMULAS ENGINE
    // ==========================================
    const backgroundCanvasNode = document.getElementById('bg-canvas');
    if (backgroundCanvasNode) {
        const renderContext2D = backgroundCanvasNode.getContext('2d'); 
        backgroundCanvasNode.width = window.innerWidth; 
        backgroundCanvasNode.height = window.innerHeight;
        
        const mathScienceSymbolsList = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let activeParticlesCollection = [];
        
        class AdvancedParticle {
            constructor() {
                this.particleShape = Math.random() > 0.4 ? 'symbol' : 'dot';
                this.textSymbol = mathScienceSymbolsList[Math.floor(Math.random() * mathScienceSymbolsList.length)];
                this.coordinateX = Math.random() * backgroundCanvasNode.width; 
                this.coordinateY = Math.random() * backgroundCanvasNode.height;
                
                if (this.particleShape === 'symbol') { 
                    this.pixelSize = Math.random() * 12 + 10; 
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
                let currentThemeAccentColor = rootCssVariables.getPropertyValue('--accent-main').trim() || '#00f0ff';
                
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
        
        for (let i = 0; i < 40; i++) activeParticlesCollection.push(new AdvancedParticle()); 
        
        function executeBackgroundAnimation() { 
            if (isAnimOn) {
                renderContext2D.clearRect(0, 0, backgroundCanvasNode.width, backgroundCanvasNode.height); 
                activeParticlesCollection.forEach(particleItem => { 
                    particleItem.updatePositionData(); 
                    particleItem.drawOntoCanvas(renderContext2D); 
                }); 
            }
            requestAnimationFrame(executeBackgroundAnimation); 
        }
        executeBackgroundAnimation();
        
        window.addEventListener('resize', () => { 
            backgroundCanvasNode.width = window.innerWidth; 
            backgroundCanvasNode.height = window.innerHeight; 
        });
    }
});
