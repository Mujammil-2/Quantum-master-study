import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// ----------------------------------------------------
// 🔥 FIREBASE AUTH & PRO VS FREE LOGIC 🔥
// ----------------------------------------------------
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const docSnap = await getDoc(doc(db, "users", user.uid));
            if (docSnap.exists()) {
                const data = docSnap.data();
                
                // 1. Entry Pass Security
                if (data.hasEntryPass !== true) {
                    window.location.href = "entry-pass.html";
                    return;
                }

                // 2. Set Basic Profile Info
                const fname = data.name ? data.name.split(" ")[0] : "Student";
                document.getElementById('dash-user-name').innerText = fname;
                if(data.photoURL) document.getElementById('dash-small-avatar').src = data.photoURL;

                // 3. 👑 PRO MEMBER LOGIC 👑
                if (data.isPremium === true) {
                    // A. Hide Upgrade Button
                    document.getElementById('upgrade-pro-btn').style.display = "none";
                    
                    // B. Hide Sponsorship/Ad Banner Completely!
                    document.getElementById('ad-banner').style.display = "none";
                    
                    // C. Apply Golden UI & Badges
                    document.getElementById('pro-crown').innerHTML = '<i class="ri-vip-crown-fill" style="color: #d4af37;"></i>';
                    document.getElementById('dash-user-name').classList.add('pro-text-gold');
                    document.getElementById('dash-small-avatar').classList.add('pro-active-glow');
                    
                    const badge = document.getElementById('user-level-badge');
                    badge.innerHTML = '<i class="ri-vip-crown-fill"></i> PRO मेंबर';
                    badge.style.background = 'rgba(212, 175, 55, 0.1)';
                    badge.style.color = '#d4af37';
                    badge.style.borderColor = '#d4af37';
                    document.getElementById('welcome-banner').style.borderLeftColor = '#d4af37';
                }

                // Finish Loading Screen
                setTimeout(() => {
                    document.getElementById('splash-screen').style.opacity = '0';
                    setTimeout(() => document.getElementById('splash-screen').style.display = 'none', 500);
                }, 1000);

            } else {
                window.location.href = "profile-setup.html";
            }
        } catch (error) { console.error("Firebase Error: ", error); }
    } else {
        window.location.href = "index.html";
    }
});

// ----------------------------------------------------
// ⏱️ POMODORO TIMER LOGIC
// ----------------------------------------------------
let timerInterval;
let timeLeft = 25 * 60; 
let isRunning = false;
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('timer-start-btn');
const sfxClick = document.getElementById('sfx-click');

function playSFX() {
    if(sfxClick) { sfxClick.currentTime = 0; sfxClick.play().catch(e=>console.log(e)); }
}
document.querySelectorAll('.sfx-trigger').forEach(btn => btn.addEventListener('click', playSFX));

function updateTimer() {
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    timerDisplay.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

document.getElementById('timer-plus-btn').addEventListener('click', () => {
    if(!isRunning && timeLeft < 3600) { timeLeft += 300; updateTimer(); }
});
document.getElementById('timer-minus-btn').addEventListener('click', () => {
    if(!isRunning && timeLeft > 300) { timeLeft -= 300; updateTimer(); }
});

startBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval); startBtn.innerText = "स्टार्ट"; isRunning = false;
    } else {
        isRunning = true; startBtn.innerText = "पॉज़";
        timerInterval = setInterval(() => {
            if (timeLeft > 0) { timeLeft--; updateTimer(); } 
            else {
                clearInterval(timerInterval); isRunning = false; startBtn.innerText = "स्टार्ट";
                alert("⏰ टाइम पूरा हुआ! थोड़ा ब्रेक ले लो।");
            }
        }, 1000);
    }
});

document.getElementById('timer-reset-btn').addEventListener('click', () => {
    clearInterval(timerInterval); isRunning = false; timeLeft = 25 * 60;
    startBtn.innerText = "स्टार्ट"; updateTimer();
});

// ----------------------------------------------------
// ✨ FIREFLY CANVAS BACKGROUND
// ----------------------------------------------------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.005;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}
for (let i = 0; i < 50; i++) particlesArray.push(new Particle());
function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); particlesArray[i].draw(); }
    requestAnimationFrame(animateCanvas);
}
animateCanvas();
