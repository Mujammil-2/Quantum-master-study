/* =========================================================================
   QMS JAVASCRIPT MASTER ENGINE (100 FRAMES, FIXED NUMBERING & FULL LOGIC)
========================================================================= */

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

    // 0. AUTH & DATA SYNC
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
                
                const dashName = document.getElementById('dash-user-name');
                const panelName = document.getElementById('panel-user-name');
                if(dashName) dashName.innerText = cloudData.name;
                if(panelName) panelName.innerText = cloudData.name;
                
                if (cloudData.photoURL) {
                    const dashAvatar = document.getElementById('dash-small-avatar');
                    const panelAvatar = document.getElementById('panel-profile-img');
                    if(dashAvatar) dashAvatar.src = cloudData.photoURL;
                    if(panelAvatar) panelAvatar.src = cloudData.photoURL;
                }
                
                if (cloudData.isPremium === true) {
                    const proCrown = document.getElementById('pro-crown');
                    if (proCrown) proCrown.innerHTML = '<i class="ri-vip-crown-fill" style="color: #d4af37;"></i>';
                    if(dashName) dashName.style.color = '#d4af37';
                    
                    const badge = document.getElementById('user-level-badge');
                    if (badge) {
                        badge.innerHTML = '<i class="ri-vip-crown-fill"></i> PRO मेंबर';
                        badge.style.background = 'rgba(212, 175, 55, 0.1)';
                        badge.style.color = '#d4af37';
                        badge.style.borderColor = '#d4af37';
                    }
                    const panelStatus = document.getElementById('panel-status-text');
                    if(panelStatus) {
                        panelStatus.innerHTML = '<i class="ri-vip-crown-fill" style="color:#d4af37;"></i> PRO VIP';
                        panelStatus.style.color = '#d4af37';
                    }
                }
            }
        } catch (error) { console.error("Cloud Sync Failed", error); }
    } else {
        window.location.href = 'index.html';
    }

    // 1. BGM & SLIDER
    const bgmAudio = document.getElementById('bgm-audio');
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgmVolumeControl = document.getElementById('bgm-volume');
    const bgmTrackSelect = document.getElementById('bgm-track-select');
    let isBgmOn = localStorage.getItem('qms_bgm') === 'on';
    
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
        bgmAudio.src = localStorage.getItem('qms_bgm_track') || 'bgm1.mp3';
        bgmAudio.volume = parseFloat(localStorage.getItem('qms_bgm_volume') || 0.3);
        if (bgmTrackSelect) bgmTrackSelect.value = bgmAudio.src.split('/').pop();
        if (bgmVolumeControl) bgmVolumeControl.value = bgmAudio.volume;
        if (bgmToggle) { bgmToggle.checked = isBgmOn; updateToggleUI(bgmToggle); }
        document.body.addEventListener('click', () => { if (isBgmOn && bgmAudio.paused) bgmAudio.play().catch(()=>{}); }, { once: true });
        
        bgmTrackSelect?.addEventListener('change', (e) => { localStorage.setItem('qms_bgm_track', e.target.value); bgmAudio.src = e.target.value; if (isBgmOn) bgmAudio.play(); });
        bgmToggle?.addEventListener('change', (e) => { isBgmOn = e.target.checked; if (isBgmOn) { localStorage.setItem('qms_bgm', 'on'); bgmAudio.play(); } else { localStorage.setItem('qms_bgm', 'off'); bgmAudio.pause(); } updateToggleUI(e.target); });
        bgmVolumeControl?.addEventListener('input', (e) => { bgmAudio.volume = e.target.value; localStorage.setItem('qms_bgm_volume', e.target.value); });
    }

    // 2. SPLASH
    const splashScreenElement = document.getElementById('splash-screen');
    const loadingBarElement = document.getElementById('loading-bar');
    let loadingProgress = 0;
    const loadingInterval = setInterval(() => {
        loadingProgress += Math.random() * 15;
        if (loadingProgress > 100) loadingProgress = 100;
        if (loadingBarElement) loadingBarElement.style.width = `${loadingProgress}%`;
        if (loadingProgress === 100) { clearInterval(loadingInterval); setTimeout(() => { if (splashScreenElement) { splashScreenElement.style.opacity = '0'; setTimeout(() => splashScreenElement.style.display = 'none', 800); } }, 600); }
    }, 200);

    // 4. POMODORO
    let focusTimerInterval, configuredFocusMinutes = 25, focusTimeLeftInSeconds = 1500, isFocusTimerRunning = false;
    const timerDisplayElement = document.getElementById('timer-display');
    const timerStartButton = document.getElementById('timer-start-btn');
    const pomodoroAlarmAudio = document.getElementById('pomodoro-alarm');

    function updateTimerUI() { if (!timerDisplayElement) return; timerDisplayElement.innerText = `${Math.floor(focusTimeLeftInSeconds / 60).toString().padStart(2, '0')}:${(focusTimeLeftInSeconds % 60).toString().padStart(2, '0')}`; }
    document.getElementById('timer-plus-btn')?.addEventListener('click', () => { if (!isFocusTimerRunning) { configuredFocusMinutes = Math.min(180, configuredFocusMinutes + 5); focusTimeLeftInSeconds = configuredFocusMinutes * 60; updateTimerUI(); } });
    document.getElementById('timer-minus-btn')?.addEventListener('click', () => { if (!isFocusTimerRunning) { configuredFocusMinutes = Math.max(5, configuredFocusMinutes - 5); focusTimeLeftInSeconds = configuredFocusMinutes * 60; updateTimerUI(); } });
    timerStartButton?.addEventListener('click', () => {
        if (!isFocusTimerRunning) {
            isFocusTimerRunning = true; timerStartButton.innerText = "पॉज़"; timerStartButton.style.background = "#ffc107"; 
            focusTimerInterval = setInterval(() => {
                if (focusTimeLeftInSeconds > 0) { focusTimeLeftInSeconds--; updateTimerUI(); } 
                else { clearInterval(focusTimerInterval); isFocusTimerRunning = false; if (pomodoroAlarmAudio) { pomodoroAlarmAudio.currentTime = 0; pomodoroAlarmAudio.play().catch(()=>{}); } if (window.showCustomToast) window.showCustomToast("शानदार! टाइम पूरा हुआ।", false); focusTimeLeftInSeconds = configuredFocusMinutes * 60; updateTimerUI(); timerStartButton.innerText = "स्टार्ट"; timerStartButton.style.background = "var(--accent-main)"; }
            }, 1000);
        } else { clearInterval(focusTimerInterval); isFocusTimerRunning = false; timerStartButton.innerText = "रिज्यूम"; timerStartButton.style.background = "var(--accent-main)"; }
    });

    // 6. TOAST
    window.showCustomToast = function(msg, isErr = false) {
        document.querySelector('.qms-toast-msg')?.remove();
        const t = document.createElement('div'); t.className = isErr ? 'qms-toast-msg qms-toast-error' : 'qms-toast-msg';
        t.innerHTML = isErr ? `<i class="ri-error-warning-fill"></i> ${msg}` : `<i class="ri-checkbox-circle-fill"></i> ${msg}`;
        document.body.appendChild(t); setTimeout(() => t.remove(), 3000); 
    };

    // 7. XP SYSTEM 
    let completedChaptersData = JSON.parse(localStorage.getItem('qms_completed') || '{}');
    let grandTotalXp = (Object.keys(completedChaptersData).length * 50) + (parseInt(localStorage.getItem('qms_total_xp')) || 0);
    localStorage.setItem('qms_total_xp', grandTotalXp);
    if (document.getElementById('dash-total-xp')) document.getElementById('dash-total-xp').innerText = grandTotalXp;

    // 8. THEMES & UI
    const sidePanelElement = document.getElementById('settings-panel'), sidePanelOverlayBg = document.getElementById('panel-overlay'); 
    function closeSettings() { if (sidePanelElement) sidePanelElement.classList.remove('active'); if (sidePanelOverlayBg) sidePanelOverlayBg.classList.remove('active'); }
    document.getElementById('open-panel-btn')?.addEventListener('click', () => { sidePanelElement?.classList.add('active'); sidePanelOverlayBg?.classList.add('active'); });
    document.getElementById('close-panel')?.addEventListener('click', closeSettings); sidePanelOverlayBg?.addEventListener('click', closeSettings);

    const themeCircles = document.querySelectorAll('.theme-circle');
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeCircles.forEach(circle => {
        if (circle.getAttribute('data-color') === savedTheme) { themeCircles.forEach(c => c.classList.remove('active')); circle.classList.add('active'); }
        circle.addEventListener('click', (e) => { const c = circle.getAttribute('data-color'); document.documentElement.setAttribute('data-theme', c); localStorage.setItem('qms_theme', c); themeCircles.forEach(tc => tc.classList.remove('active')); circle.classList.add('active'); });
    });

    const eyeCareToggle = document.getElementById('eye-care-toggle');
    if (localStorage.getItem('qms_eye_care') === 'on') document.body.classList.add('eye-care-active');
    if (eyeCareToggle) {
        eyeCareToggle.checked = localStorage.getItem('qms_eye_care') === 'on'; updateToggleUI(eyeCareToggle);
        eyeCareToggle.addEventListener('change', (e) => { if (e.target.checked) { document.body.classList.add('eye-care-active'); localStorage.setItem('qms_eye_care', 'on'); } else { document.body.classList.remove('eye-care-active'); localStorage.setItem('qms_eye_care', 'off'); } updateToggleUI(e.target); });
    }

    // 9. 🖼️ 100 REAL IMAGE AVATAR FRAMES WITH NUMBERING
    const framesModalOverlay = document.getElementById('frames-modal-overlay');
    const openFramesBtn = document.getElementById('open-frames-btn');
    const closeFramesBtn = document.getElementById('close-frames-btn');
    const framesContent = document.getElementById('frames-content');
    
    function applyRealImageFrame(frameUrl) {
        document.querySelectorAll('.real-image-frame-overlay').forEach(el => el.remove());
        if (frameUrl && frameUrl !== 'none') {
            const hAvatar = document.getElementById('header-avatar-frame');
            const pAvatar = document.getElementById('panel-avatar-frame');
            const imgHTML = `<img src="${frameUrl}" class="real-image-frame-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:10; pointer-events:none; transform: scale(1.3);">`;
            if(hAvatar) { hAvatar.style.position = 'relative'; hAvatar.insertAdjacentHTML('beforeend', imgHTML); }
            if(pAvatar) { pAvatar.style.position = 'relative'; pAvatar.insertAdjacentHTML('beforeend', imgHTML); }
        }
    }
    applyRealImageFrame(localStorage.getItem('qms_avatar_frame_url') || 'none');

    const galleryFramesData = [{ id: 'none', name: 'No Frame', type: 'free', reqXp: 0, url: 'none' }];
    for(let i = 1; i <= 30; i++) galleryFramesData.push({ id: `frame${i}`, name: `QMS Frame`, type: 'free', reqXp: i * 3000, url: `frames/frame${i}.png` });
    for(let i = 31; i <= 100; i++) galleryFramesData.push({ id: `frame${i}`, name: `PRO Elite`, type: 'pro', reqXp: 0, url: `frames/frame${i}.png` });

    if (openFramesBtn && framesModalOverlay) {
        openFramesBtn.addEventListener('click', () => {
            framesModalOverlay.style.display = 'flex'; setTimeout(() => framesModalOverlay.style.opacity = '1', 10);
            let html = '';
            
            // 🛠️ NUMBERING & FIXED LAYOUT
            galleryFramesData.forEach((frame, index) => {
                let isLocked = false, lockMsg = '';
                if (frame.type === 'pro') { if (!currentQmsUser || currentQmsUser.isPremium !== true) { isLocked = true; lockMsg = "Requires PRO VIP"; } } 
                else { if (grandTotalXp < frame.reqXp) { isLocked = true; lockMsg = `Need ${frame.reqXp} XP`; } }
                
                let displayName = index === 0 ? frame.name : `#${index} ${frame.name}`;
                const userDp = localStorage.getItem('qms_profile_img') || 'logo.png';
                const overlayHTML = frame.url !== 'none' ? `<img src="${frame.url}" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:2; transform:scale(1.3); pointer-events:none;">` : '';
                const lockedOverlay = isLocked ? `<div class="locked-overlay"><i class="ri-lock-2-fill"></i></div>` : '';

                html += `
                    <div class="frame-box ${isLocked ? 'locked' : ''} sfx-trigger" data-url="${frame.url}" data-locked="${isLocked}" data-msg="${lockMsg}">
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
                    if (box.getAttribute('data-locked') === 'true') { window.showCustomToast(`Locked: ${box.getAttribute('data-msg')}`, true); return; }
                    localStorage.setItem('qms_avatar_frame_url', box.getAttribute('data-url'));
                    applyRealImageFrame(box.getAttribute('data-url'));
                    window.showCustomToast("नया अवतार फ्रेम सेट हो गया!");
                    framesModalOverlay.style.opacity = '0'; setTimeout(() => framesModalOverlay.style.display = 'none', 300);
                });
            });
        });
    }
    closeFramesBtn?.addEventListener('click', () => { framesModalOverlay.style.opacity = '0'; setTimeout(() => framesModalOverlay.style.display = 'none', 300); });

    // 10. LEADERBOARD
    const leaderboardOverlay = document.getElementById('leaderboard-modal-overlay');
    document.getElementById('open-leaderboard-btn')?.addEventListener('click', async () => {
        leaderboardOverlay.style.display = 'flex'; setTimeout(() => leaderboardOverlay.style.opacity = '1', 10);
        try {
            const q = query(collection(db, "users"), orderBy("totalXp", "desc"), limit(50));
            const querySnapshot = await getDocs(q);
            let rank = 1, html = '';
            querySnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                html += `
                    <div class="lb-item" style="${docSnap.id === uid ? 'background: rgba(212, 175, 55, 0.1); border-color: #d4af37;' : ''}">
                        <div class="lb-rank ${rank === 1 ? 'top-1' : rank === 2 ? 'top-2' : rank === 3 ? 'top-3' : ''}">#${rank}</div>
                        <div class="lb-user-info"><img src="${data.photoURL || 'logo.png'}"><div class="lb-name">${data.name || 'Student'}</div></div>
                        <div class="lb-xp">${data.totalXp || 0} XP</div>
                    </div>
                `;
                if (docSnap.id === uid) document.getElementById('my-current-rank').innerText = `#${rank}`;
                rank++;
            });
            document.getElementById('leaderboard-content').innerHTML = html || '<p>No Data</p>';
        } catch (error) { document.getElementById('leaderboard-content').innerHTML = '<p>डेटा लोड एरर</p>'; }
    });
    document.getElementById('close-leaderboard-btn')?.addEventListener('click', () => { leaderboardOverlay.style.opacity = '0'; setTimeout(() => leaderboardOverlay.style.display = 'none', 300); });

    // 11. PROFILE UPLOAD & LOGOUT
    document.getElementById('img-upload')?.addEventListener('change', function(e) {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(re) {
                const img = new Image();
                img.onload = async function() {
                    const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
                    canvas.width = 200; canvas.height = 200; ctx.drawImage(img, 0, 0, 200, 200);
                    const b64 = canvas.toDataURL('image/jpeg', 0.8);
                    
                    const dashAvatar = document.getElementById('dash-small-avatar');
                    const panelAvatar = document.getElementById('panel-profile-img');
                    if(dashAvatar) dashAvatar.src = b64; 
                    if(panelAvatar) panelAvatar.src = b64; 
                    
                    localStorage.setItem('qms_profile_img', b64); 
                    if(uid) await updateDoc(doc(db, "users", uid), { photoURL: b64 });
                    window.showCustomToast("प्रोफाइल फोटो सेव हो गई!"); 
                };
                img.src = re.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    document.getElementById('reset-btn')?.addEventListener('click', () => { if(confirm("लॉगआउट करें?")) { signOut(auth).then(() => { localStorage.setItem('qms_is_logged_in', 'false'); window.location.href = "index.html"; }); } }); 

    // 13. FIREFLY PARTICLES ENGINE
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        let particles = Array.from({length: 40}, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 3 + 1, vx: Math.random() * 1 - 0.5, vy: Math.random() * -1 - 0.2, angle: Math.random() * Math.PI * 2 }));
        function drawParticles() { 
            if (localStorage.getItem('qms_anim') !== 'off') {
                ctx.clearRect(0, 0, canvas.width, canvas.height); 
                particles.forEach(p => { 
                    p.y += p.vy; p.x += p.vx; p.angle += 0.05; if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
                    ctx.fillStyle = `rgba(255, 255, 255, ${((Math.sin(p.angle) + 1) / 2) * 0.5 + 0.1})`; 
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); 
                }); 
            }
            requestAnimationFrame(drawParticles); 
        }
        drawParticles();
    }
});
