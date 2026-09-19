/* =========================================================================
   QMS JAVASCRIPT MASTER ENGINE (100 FRAMES, FIXED NUMBERING & FULL LOGIC)
========================================================================= */

// 🔥 0. FIREBASE IMPORT & SETUP
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, query, orderBy, limit, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
                
                document.getElementById('dash-user-name').innerText = cloudData.name;
                document.getElementById('panel-user-name').innerText = cloudData.name;
                
                if (cloudData.photoURL) {
                    document.getElementById('dash-small-avatar').src = cloudData.photoURL;
                    document.getElementById('panel-profile-img').src = cloudData.photoURL;
                }
                
                if (cloudData.isPremium === true) {
                    const proCrown = document.getElementById('pro-crown');
                    if (proCrown) proCrown.innerHTML = '<i class="ri-vip-crown-fill" style="color: #d4af37;"></i>';
                    
                    document.getElementById('dash-user-name').style.color = '#d4af37';
                    
                    const badge = document.getElementById('user-level-badge');
                    if (badge) {
                        badge.innerHTML = '<i class="ri-vip-crown-fill"></i> PRO मेंबर';
                        badge.style.background = 'rgba(212, 175, 55, 0.1)';
                        badge.style.color = '#d4af37';
                        badge.style.borderColor = '#d4af37';
                    }
                    
                    document.getElementById('panel-status-text').innerHTML = '<i class="ri-vip-crown-fill" style="color:#d4af37;"></i> PRO VIP';
                    document.getElementById('panel-status-text').style.color = '#d4af37';
                }
            }
        } catch (error) { console.error("Cloud Sync Failed", error); }
    } else {
        window.location.href = 'index.html';
    }

    // ==========================================
    // 1. SMART BGM MEMORY & VOLUME SLIDER
    // ==========================================
    const bgmAudio = document.getElementById('bgm-audio');
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgmVolumeControl = document.getElementById('bgm-volume');
    const bgmTrackSelect = document.getElementById('bgm-track-select');
    
    let isBgmOn = localStorage.getItem('qms_bgm') === 'on';
    let savedBgmVolume = localStorage.getItem('qms_bgm_volume') || 0.3;
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
        
        if (bgmTrackSelect) bgmTrackSelect.value = savedBgmTrack;
        if (bgmVolumeControl) bgmVolumeControl.value = savedBgmVolume;
        
        if (bgmToggle) {
            bgmToggle.checked = isBgmOn;
            updateToggleUI(bgmToggle);
        }

        document.body.addEventListener('click', () => {
            if (isBgmOn && bgmAudio.paused) bgmAudio.play().catch(()=>{});
        }, { once: true });

        bgmTrackSelect?.addEventListener('change', (e) => {
            localStorage.setItem('qms_bgm_track', e.target.value); 
            bgmAudio.src = e.target.value; 
            if (isBgmOn) bgmAudio.play();
        });

        bgmToggle?.addEventListener('change', (e) => {
            isBgmOn = e.target.checked;
            if (isBgmOn) { localStorage.setItem('qms_bgm', 'on'); bgmAudio.play(); } 
            else { localStorage.setItem('qms_bgm', 'off'); bgmAudio.pause(); }
            updateToggleUI(e.target);
        });

        bgmVolumeControl?.addEventListener('input', (e) => {
            bgmAudio.volume = e.target.value;
            localStorage.setItem('qms_bgm_volume', e.target.value);
        });
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
    // 4. POMODORO FOCUS TIMER
    // ==========================================
    let focusTimerInterval; 
    let configuredFocusMinutes = 25; 
    let focusTimeLeftInSeconds = configuredFocusMinutes * 60; 
    let isFocusTimerRunning = false;
    const timerDisplayElement = document.getElementById('timer-display');
    const timerStartButton = document.getElementById('timer-start-btn');
    const pomodoroAlarmAudio = document.getElementById('pomodoro-alarm');

    function updateTimerUserInterface() {
        if (!timerDisplayElement) return;
        const m = Math.floor(focusTimeLeftInSeconds / 60);
        const s = focusTimeLeftInSeconds % 60;
        timerDisplayElement.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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

    // ==========================================
    // 6. CUSTOM TOASTS
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
    // 7. 🏆 XP SYSTEM 
    // ==========================================
    let completedChaptersData = {};
    const rawCompletedData = localStorage.getItem('qms_completed');
    if (rawCompletedData) completedChaptersData = JSON.parse(rawCompletedData);
    
    let storedExtraXp = parseInt(localStorage.getItem('qms_total_xp')) || 0;
    let grandTotalXp = (Object.keys(completedChaptersData).length * 50) + storedExtraXp;
    localStorage.setItem('qms_total_xp', grandTotalXp);
    
    if (document.getElementById('dash-total-xp')) document.getElementById('dash-total-xp').innerText = grandTotalXp;

    // ==========================================
    // 8. ✨ 10 COLOR DOTS & UI SETTINGS
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

    // ==========================================
    // 9. 🖼️ 100 REAL IMAGE AVATAR FRAMES (30 FREE + 70 PRO) WITH NUMBERING
    // ==========================================
    const framesModalOverlay = document.getElementById('frames-modal-overlay');
    const openFramesBtn = document.getElementById('open-frames-btn');
    const closeFramesBtn = document.getElementById('close-frames-btn');
    const framesContent = document.getElementById('frames-content');
    
    function applyRealImageFrame(frameUrl) {
        document.querySelectorAll('.real-image-frame-overlay').forEach(el => el.remove());
        if (frameUrl && frameUrl !== 'none') {
            const headerAvatar = document.getElementById('header-avatar-frame');
            const panelAvatar = document.getElementById('panel-avatar-frame');
            const frameImgHTML = `<img src="${frameUrl}" class="real-image-frame-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:10; pointer-events:none; transform: scale(1.3);">`;
            
            if(headerAvatar) { headerAvatar.style.position = 'relative'; headerAvatar.insertAdjacentHTML('beforeend', frameImgHTML); }
            if(panelAvatar) { panelAvatar.style.position = 'relative'; panelAvatar.insertAdjacentHTML('beforeend', frameImgHTML); }
        }
    }

    const savedFrameUrl = localStorage.getItem('qms_avatar_frame_url') || 'none';
    applyRealImageFrame(savedFrameUrl);

    const galleryFramesData = [];
    galleryFramesData.push({ id: 'none', name: 'No Frame', type: 'free', reqXp: 0, url: 'none' });

    for(let i = 1; i <= 30; i++) {
        galleryFramesData.push({ id: `frame${i}`, name: `QMS Frame`, type: 'free', reqXp: i * 3000, url: `frames/frame${i}.png` });
    }
    for(let i = 31; i <= 100; i++) {
        galleryFramesData.push({ id: `frame${i}`, name: `PRO Elite`, type: 'pro', reqXp: 0, url: `frames/frame${i}.png` });
    }

    if (openFramesBtn && framesModalOverlay) {
        openFramesBtn.addEventListener('click', () => {
            framesModalOverlay.style.display = 'flex';
            setTimeout(() => framesModalOverlay.style.opacity = '1', 10);
            
            let html = '';
            
            // 🛠️ LOOP WITH NUMBERING & FIXED LAYOUT
            galleryFramesData.forEach((frame, index) => {
                let isLocked = false;
                let lockMsg = '';
                
                if (frame.type === 'pro') {
                    if (!currentQmsUser || currentQmsUser.isPremium !== true) { isLocked = true; lockMsg = "Requires PRO VIP"; }
                } else {
                    if (grandTotalXp < frame.reqXp) { isLocked = true; lockMsg = `Need ${frame.reqXp} XP`; }
                }
                
                const statusClass = isLocked ? 'locked' : '';
                const userDp = localStorage.getItem('qms_profile_img') || 'logo.png';
                
                // #1, #2 Numbering Logic
                let displayName = index === 0 ? frame.name : `#${index} ${frame.name}`;
                
                const overlayHTML = frame.url !== 'none' ? `<img src="${frame.url}" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:2; transform:scale(1.3); pointer-events:none;">` : '';
                const lockedOverlay = isLocked ? `<div class="locked-overlay"><i class="ri-lock-2-fill"></i></div>` : '';

                html += `
                    <div class="frame-box ${statusClass} sfx-trigger" data-url="${frame.url}" data-locked="${isLocked}" data-msg="${lockMsg}">
                        ${lockedOverlay}
                        <div style="position:relative; width:55px; height:55px; margin: 0 auto 15px auto;">
                            <img src="${userDp}" style="width:100%; height:100%; border-radius:50%; object-fit:cover; border: 2px solid #050b14;">
                            ${overlayHTML}
                        </div>
                        <h4 style="font-size:0.75rem; color:#fff; margin-bottom:4px; font-weight:700; line-height:1.2;">${displayName}</h4>
                        ${frame.type==='pro' ? '<p style="font-size:0.65rem; color:#d4af37; font-weight:600;"><i class="ri-vip-crown-fill"></i> PRO</p>' : `<p style="font-size:0.65rem; color:var(--text-secondary); font-weight:600;">${frame.reqXp} XP</p>`}
                    </div>
                `;
            });
            
            framesContent.innerHTML = html;
            
            document.querySelectorAll('.frame-box').forEach(box => {
                box.addEventListener('click', () => {
                    const isBoxLocked = box.getAttribute('data-locked') === 'true';
                    const lockedMsg = box.getAttribute('data-msg');
                    const selectedUrl = box.getAttribute('data-url');
                    
                    if (isBoxLocked) { window.showCustomToast(`Locked: ${lockedMsg}`, true); return; }
                    
                    localStorage.setItem('qms_avatar_frame_url', selectedUrl);
                    applyRealImageFrame(selectedUrl);
                    window.showCustomToast("नया अवतार फ्रेम सफलतापूर्क सेट हो गया!");
                    
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

    if (leaderboardBtn && leaderboardOverlay) {
        leaderboardBtn.addEventListener('click', async () => {
            leaderboardOverlay.style.display = 'flex';
            setTimeout(() => leaderboardOverlay.style.opacity = '1', 10);
            
            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, orderBy("totalXp", "desc"), limit(50));
                const querySnapshot = await getDocs(q);
                let rank = 1; let html = '';
                
                querySnapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    let rankClass = rank === 1 ? 'top-1' : rank === 2 ? 'top-2' : rank === 3 ? 'top-3' : '';
                    let bgStyle = (docSnap.id === uid) ? 'background: rgba(212, 175, 55, 0.1); border-color: #d4af37;' : '';

                    html += `
                        <div class="lb-item" style="${bgStyle}">
                            <div class="lb-rank ${rankClass}">#${rank}</div>
                            <div class="lb-user-info">
                                <img src="${data.photoURL || 'logo.png'}" alt="Avatar">
                                <div class="lb-name">${data.name || 'Student'}</div>
                            </div>
                            <div class="lb-xp">${data.totalXp || 0} XP</div>
                        </div>
                    `;
                    if (docSnap.id === uid) document.getElementById('my-current-rank').innerText = `#${rank}`;
                    rank++;
                });
                leaderboardContent.innerHTML = html || '<p style="text-align:center; color:gray;">No Data</p>';
            } catch (error) { leaderboardContent.innerHTML = '<p style="text-align:center; color:#ea4335;">डेटा लोड एरर</p>'; }
        });
    }

    closeLeaderboardBtn?.addEventListener('click', () => {
        leaderboardOverlay.style.opacity = '0';
        setTimeout(() => leaderboardOverlay.style.display = 'none', 300);
    });

    // ==========================================
    // 11. PROFILE IMAGE UPLOAD & 12. LOGOUT
    // ==========================================
    document.getElementById('img-upload')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(re) {
                const img = new Image();
                img.onload = async function() {
                    const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
                    canvas.width = 200; canvas.height = 200; 
                    ctx.drawImage(img, 0, 0, 200, 200);
                    const b64 = canvas.toDataURL('image/jpeg', 0.8);
                    
                    document.getElementById('dash-small-avatar').src = b64; 
                    document.getElementById('panel-profile-img').src = b64; 
                    localStorage.setItem('qms_profile_img', b64); 
                    if(uid) await updateDoc(doc(db, "users", uid), { photoURL: b64 });
                    window.showCustomToast("प्रोफाइल फोटो सेव हो गई!"); 
                };
                img.src = re.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('reset-btn')?.addEventListener('click', () => { 
        if(confirm("लॉगआउट करें?")) {
            signOut(auth).then(() => { localStorage.setItem('qms_is_logged_in', 'false'); window.location.href = "index.html"; });
        }
    }); 

    // ==========================================
    // 13. 🌌 FIREFLY PARTICLES ENGINE
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d'); 
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        let particles = [];
        
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                vx: Math.random() * 1 - 0.5, vy: Math.random() * -1 - 0.2,
                angle: Math.random() * Math.PI * 2
            });
        }
        
        function drawParticles() { 
            if (localStorage.getItem('qms_anim') !== 'off') {
                ctx.clearRect(0, 0, canvas.width, canvas.height); 
                particles.forEach(p => { 
                    p.y += p.vy; p.x += p.vx; p.angle += 0.05;
                    if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
                    let op = ((Math.sin(p.angle) + 1) / 2) * 0.5 + 0.1;
                    ctx.fillStyle = `rgba(255, 255, 255, ${op})`; 
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); 
                }); 
            }
            requestAnimationFrame(drawParticles); 
        }
        drawParticles();
    }
});
