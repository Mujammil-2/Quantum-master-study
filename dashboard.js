/* =========================================================================
   QMS JAVASCRIPT MASTER ENGINE (DASHBOARD - 100% EXPANDED FULL CODE)
   - FEATURES:
     0. 🔥 FIREBASE CLOUD DATA SYNC + PRO/FREE LOGIC
     1. Multi-Track BGM Memory System (Now with 7 Tracks)
     2. 🏆 4-Box Preview & "View All 50 Badges" Modal
     3. 🏆 Celebration Pop-up Animation on New Badge Unlock
     4. User Authentication & Privacy
     5. 🚀 Custom Pomodoro Focus Timer (+/- controls)
     6. 🚀 Smart Bookmarks (Saved Notes)
     7. Daily Streak Calendar Logic
     8. Dynamic Medium Switcher
     9. ✨ NEW: 10 Premium Themes Dropdown Logic ✨
========================================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
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
                if(cloudData.name) localStorage.setItem('qms_user_name', cloudData.name);
                if(cloudData.photoURL) localStorage.setItem('qms_profile_img', cloudData.photoURL);
                if(cloudData.totalXp) localStorage.setItem('qms_total_xp', cloudData.totalXp); 
                
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
                    const upgradeBtn = document.getElementById('upgrade-pro-btn');
                    if(upgradeBtn) upgradeBtn.style.display = "none";
                    
                    const adBanner = document.getElementById('ad-banner');
                    if(adBanner) adBanner.style.display = "none";
                    
                    const proCrown = document.getElementById('pro-crown');
                    if(proCrown) proCrown.innerHTML = '<i class="ri-vip-crown-fill" style="color: #d4af37;"></i>';
                    
                    if(dashNameEl) dashNameEl.classList.add('pro-text-gold');
                    if(dashAvatarImg) dashAvatarImg.classList.add('pro-active-glow');
                    if(panelAvatarImg) panelAvatarImg.classList.add('pro-active-glow');
                    
                    const badge = document.getElementById('user-level-badge');
                    if(badge) {
                        badge.innerHTML = '<i class="ri-vip-crown-fill"></i> PRO मेंबर';
                        badge.style.background = 'rgba(212, 175, 55, 0.1)';
                        badge.style.color = '#d4af37';
                        badge.style.borderColor = '#d4af37';
                    }
                    const welcomeBanner = document.getElementById('welcome-banner');
                    if(welcomeBanner) welcomeBanner.style.borderLeftColor = '#d4af37';
                    const panelStatus = document.getElementById('panel-status-text');
                    if(panelStatus) {
                        panelStatus.innerHTML = '<i class="ri-vip-crown-fill" style="color:#d4af37;"></i> PRO मेंबर';
                        panelStatus.style.color = '#d4af37';
                    }
                }
            }
        } catch (error) { console.error("Cloud Sync Failed", error); }
    }

    // ==========================================
    // 1. SMART BGM MEMORY SYSTEM (7 TRACKS)
    // ==========================================
    const bgmAudio = document.getElementById('bgm-audio');
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgmVolumeControl = document.getElementById('bgm-volume');
    const bgmTrackSelect = document.getElementById('bgm-track-select');
    
    let isBgmOn = localStorage.getItem('qms_bgm') === 'on';
    let savedBgmVolume = localStorage.getItem('qms_bgm_volume') || 0.3;
    let savedBgmTime = localStorage.getItem('qms_bgm_time') || 0;
    let savedBgmTrack = localStorage.getItem('qms_bgm_track') || 'bgm1.mp3';

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
        if (bgmToggle) { bgmToggle.checked = isBgmOn; updateToggleUI(bgmToggle); }

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
    // 3. DYNAMIC GREETING & QUOTES
    // ==========================================
    const currentHour = new Date().getHours();
    let dynamicGreetingText = "नमस्ते";
    if (currentHour < 12) dynamicGreetingText = "सुप्रभात (Good Morning)";
    else if (currentHour < 18) dynamicGreetingText = "शुभ दोपहर (Good Afternoon)";
    else dynamicGreetingText = "शुभ संध्या (Good Evening)";
    
    const greetingDisplayElement = document.getElementById('dynamic-greeting');
    if (greetingDisplayElement) greetingDisplayElement.innerText = dynamicGreetingText;

    const motivationalQuotesArray = ["शिक्षा भविष्य का पासपोर्ट है...", "जितना कठिन संघर्ष होगा...", "सफलता की शुरुआत हमेशा..."];
    const quoteDisplayElement = document.getElementById('daily-quote');
    if (quoteDisplayElement) {
        quoteDisplayElement.innerText = `"${motivationalQuotesArray[Math.floor(Math.random() * motivationalQuotesArray.length)]}"`;
    }

    // ==========================================
    // 4. POMODORO FOCUS TIMER
    // ==========================================
    let focusTimerInterval; 
    let configuredFocusMinutes = 25; 
    let focusTimeLeftInSeconds = configuredFocusMinutes * 60; 
    let isFocusTimerRunning = false;
    
    const timerDisplayElement = document.getElementById('timer-display');
    const timerStartButton = document.getElementById('timer-start-btn');

    function updateTimerUserInterface() {
        if (!timerDisplayElement) return;
        const m = Math.floor(focusTimeLeftInSeconds / 60).toString().padStart(2, '0');
        const s = (focusTimeLeftInSeconds % 60).toString().padStart(2, '0');
        timerDisplayElement.innerText = `${m}:${s}`;
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
                if (focusTimeLeftInSeconds > 0) { focusTimeLeftInSeconds--; updateTimerUserInterface(); } 
                else {
                    clearInterval(focusTimerInterval); isFocusTimerRunning = false; 
                    if (window.showCustomToast) window.showCustomToast(`सेशन पूरा हुआ!`, false); 
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
    // 5. SMART BOOKMARKS
    // ==========================================
    const bookmarksModalOverlay = document.getElementById('bookmarks-modal-overlay');
    document.getElementById('open-bookmarks-modal-btn')?.addEventListener('click', () => { bookmarksModalOverlay.style.display = 'flex'; setTimeout(() => bookmarksModalOverlay.style.opacity = '1', 10); });
    document.getElementById('close-bookmarks-modal-btn')?.addEventListener('click', () => { bookmarksModalOverlay.style.opacity = '0'; setTimeout(() => bookmarksModalOverlay.style.display = 'none', 300); });
    
    const bookmarksModalContent = document.getElementById('bookmarks-modal-content');
    if (bookmarksModalContent) {
        const rawBookmarksData = localStorage.getItem('qms_bookmarks');
        let parsedBookmarks = rawBookmarksData ? JSON.parse(rawBookmarksData) : {};
        const bookmarkKeysArray = Object.keys(parsedBookmarks);

        if (bookmarkKeysArray.length === 0) {
            bookmarksModalContent.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-secondary);"><p>कोई नोट्स सेव नहीं है।</p></div>`;
        } else {
            let finalBookmarksHTML = '';
            bookmarkKeysArray.forEach(key => {
                let bk = parsedBookmarks[key];
                let color = 'var(--accent-main)'; 
                if (bk.subject === 'chemistry') color = '#b535ff'; if (bk.subject === 'mathematics') color = '#00ff88'; 
                finalBookmarksHTML += `
                    <div class="glass-card sfx-trigger" style="padding: 1rem; cursor: pointer; display: flex; align-items: center; gap: 15px; border-left: 4px solid ${color}; background: rgba(255,255,255,0.03);" onclick="window.location.href='player.html?subject=${bk.subject}&chapter=${bk.id}'">
                        <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; justify-content: center; align-items: center; font-size: 1.2rem; color: ${color};"><i class="ri-bookmark-3-fill"></i></div>
                        <div><h4 style="font-size: 1rem; color: #fff;">${bk.title}</h4><p style="font-size: 0.8rem; color: var(--text-secondary); text-transform: capitalize;">${bk.subject} • Chapter ${bk.id}</p></div>
                    </div>`;
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
        toastElementNode.className = isErrorMessage ? 'qms-toast-msg qms-toast-error' : 'qms-toast-msg';
        toastElementNode.innerHTML = isErrorMessage ? `<i class="ri-error-warning-fill"></i> ${messageText}` : `<i class="ri-checkbox-circle-fill"></i> ${messageText}`;
        document.body.appendChild(toastElementNode); 
        setTimeout(() => toastElementNode.remove(), 3000); 
    };

    // ==========================================
    // 9. ✨ FIX: SETTINGS PANEL & 10 THEMES ✨
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

    // ✨ NEW THEME DROPDOWN LOGIC ✨
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

    // SFX LOGIC
    const sfxClickAudioNode = document.getElementById('sfx-click'); 
    let isSystemSoundTurnedOn = localStorage.getItem('qms_sound') !== 'off';
    const soundToggleSwitchElement = document.getElementById('sound-toggle');
    
    if (soundToggleSwitchElement) { 
        soundToggleSwitchElement.checked = isSystemSoundTurnedOn; updateToggleUI(soundToggleSwitchElement); 
        soundToggleSwitchElement.addEventListener('change', (event) => { 
            isSystemSoundTurnedOn = event.target.checked; 
            localStorage.setItem('qms_sound', isSystemSoundTurnedOn ? 'on' : 'off'); 
            updateToggleUI(event.target); 
        }); 
    }

    document.querySelectorAll('.sfx-trigger').forEach(btn => { 
        btn.addEventListener('click', () => { 
            if (isSystemSoundTurnedOn && sfxClickAudioNode) { sfxClickAudioNode.currentTime = 0; sfxClickAudioNode.play().catch(()=>{}); } 
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
                        let tw = tempImgNode.width, th = tempImgNode.height;
                        if(tw > th) { if(tw > 200) { th *= 200/tw; tw = 200; } } else { if(th > 200) { tw *= 200/th; th = 200; } }
                        temporaryCanvas.width = tw; temporaryCanvas.height = th; 
                        temporaryCanvasContext.drawImage(tempImgNode, 0, 0, tw, th);
                        const b64 = temporaryCanvas.toDataURL('image/jpeg', 0.8);
                        document.getElementById('dash-small-avatar').src = b64; 
                        document.getElementById('panel-profile-img').src = b64; 
                        try { localStorage.setItem('qms_profile_img', b64); window.showCustomToast("फोटो सेव हो गई!"); } 
                        catch(e) { window.showCustomToast("फोटो बहुत बड़ी है!", true); }
                    };
                    tempImgNode.src = readerEvent.target.result;
                };
                fileReaderInstance.readAsDataURL(uploadedFile);
            }
        });
    }

    // ==========================================
    // 11. LOGOUT
    // ==========================================
    document.getElementById('reset-btn')?.addEventListener('click', () => { 
        if(confirm("क्या आप सच में लॉगआउट करना चाहते हैं?")) {
            signOut(auth).then(() => window.location.href = "index.html");
        }
    });

    // ==========================================
    // 13. FIREFLY PARTICLES ENGINE
    // ==========================================
    const backgroundCanvasNode = document.getElementById('bg-canvas');
    if (backgroundCanvasNode) {
        const renderContext2D = backgroundCanvasNode.getContext('2d'); 
        backgroundCanvasNode.width = window.innerWidth; backgroundCanvasNode.height = window.innerHeight;
        let activeParticlesCollection = [];
        for (let i = 0; i < 40; i++) activeParticlesCollection.push({ x: Math.random()*backgroundCanvasNode.width, y: Math.random()*backgroundCanvasNode.height, s: Math.random()*3+1, vx: Math.random()*1-0.5, vy: Math.random()*-1-0.2 });
        function executeBackgroundAnimation() { 
            renderContext2D.clearRect(0, 0, backgroundCanvasNode.width, backgroundCanvasNode.height); 
            activeParticlesCollection.forEach(p => { 
                p.y += p.vy; p.x += p.vx;
                if (p.y < -30) { p.y = backgroundCanvasNode.height + 30; p.x = Math.random() * backgroundCanvasNode.width; }
                if (p.x < -30 || p.x > backgroundCanvasNode.width + 30) p.vx *= -1; 
                renderContext2D.fillStyle = `rgba(255, 255, 255, 0.4)`; 
                renderContext2D.beginPath(); renderContext2D.arc(p.x, p.y, p.s, 0, Math.PI * 2); renderContext2D.fill(); 
            }); 
            requestAnimationFrame(executeBackgroundAnimation); 
        }
        executeBackgroundAnimation();
    }
});
