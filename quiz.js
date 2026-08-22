/* =========================================================================
   QMS QUIZ / MOCK TEST MASTER ENGINE (EXPANDED FULL CODE)
   - FEATURES:
     1. Custom Manual Timer Logic
     2. Multi-Subject Quiz Database (Physics, Chem, Math, Hindi, Eng)
     3. Dynamic Score & XP System
     4. Smart BGM Memory Integration
========================================================================= */

// --------------------------------------------------------------------------
// 1. MEGA QUIZ DATABASE (5 Subjects)
// --------------------------------------------------------------------------
const quizDatabase = {
    physics: [
        { q: "विद्युत आवेश का SI मात्रक क्या है?", options: ["न्यूटन", "कूलॉम", "जूल", "वोल्ट"], answer: 1 },
        { q: "प्रकाश की गति निर्वात में कितनी होती है?", options: ["3 x 10^8 m/s", "3 x 10^5 m/s", "300 m/s", "इनमें से कोई नहीं"], answer: 0 },
        { q: "ओम का नियम क्या है?", options: ["V = I/R", "V = I+R", "V = IR", "I = VR"], answer: 2 },
        { q: "इलेक्ट्रॉन की खोज किसने की थी?", options: ["चैडविक", "जे.जे. थॉमसन", "रदरफोर्ड", "न्यूटन"], answer: 1 },
        { q: "चुम्बकीय क्षेत्र का मात्रक है:", options: ["टेस्ला", "कूलॉम", "एम्पीयर", "वाट"], answer: 0 }
    ],
    chemistry: [
        { q: "जल (Water) का रासायनिक सूत्र क्या है?", options: ["CO2", "O2", "H2O", "H2O2"], answer: 2 },
        { q: "सबसे हल्की गैस कौन सी है?", options: ["ऑक्सीजन", "नाइट्रोजन", "हाइड्रोजन", "हीलियम"], answer: 2 },
        { q: "नमक का रासायनिक नाम क्या है?", options: ["सोडियम क्लोराइड", "पोटेशियम क्लोराइड", "कैल्शियम कार्बोनेट", "सल्फ्यूरिक एसिड"], answer: 0 },
        { q: "PH स्केल की रेंज क्या होती है?", options: ["1 से 10", "0 से 14", "1 से 100", "0 से 10"], answer: 1 },
        { q: "सोने (Gold) का रासायनिक प्रतीक क्या है?", options: ["Ag", "Fe", "Au", "Cu"], answer: 2 }
    ],
    maths: [
        { q: "sin(90°) का मान क्या होता है?", options: ["0", "1", "1/2", "अनंत"], answer: 1 },
        { q: "वृत्त के क्षेत्रफल का सूत्र क्या है?", options: ["2πr", "πr²", "4/3πr³", "πd"], answer: 1 },
        { q: "100 का वर्गमूल (Square root) क्या है?", options: ["50", "25", "10", "20"], answer: 2 },
        { q: "त्रिभुज के तीनों कोणों का योग कितना होता है?", options: ["90°", "360°", "180°", "270°"], answer: 2 },
        { q: "x² - 4 = 0 है, तो x का मान होगा:", options: ["4", "2 या -2", "16", "0"], answer: 1 }
    ],
    hindi: [
        { q: "हिंदी भाषा की लिपि क्या है?", options: ["रोमन", "देवनागरी", "गुरुमुखी", "फारसी"], answer: 1 },
        { q: "मुंशी प्रेमचंद का प्रसिद्ध उपन्यास कौन सा है?", options: ["गोदान", "कामायनी", "रामचरितमानस", "यामा"], answer: 0 },
        { q: "‘आकाश’ का पर्यायवाची शब्द है:", options: ["पृथ्वी", "गगन", "पवन", "अग्नि"], answer: 1 },
        { q: "भारत का राष्ट्रकवि किसे कहा जाता है?", options: ["मैथिलीशरण गुप्त", "जयशंकर प्रसाद", "सूरदास", "तुलसीदास"], answer: 0 },
        { q: "'आँखों का तारा' मुहावरे का अर्थ है:", options: ["बहुत दूर", "आँख में दर्द", "बहुत प्यारा", "तारा देखना"], answer: 2 }
    ],
    english: [
        { q: "What is the past tense of 'Go'?", options: ["Goes", "Gone", "Went", "Going"], answer: 2 },
        { q: "Which of these is a vowel?", options: ["B", "E", "C", "P"], answer: 1 },
        { q: "Choose the correct spelling:", options: ["Receive", "Recieve", "Receve", "Riceive"], answer: 0 },
        { q: "What is the opposite of 'Beautiful'?", options: ["Pretty", "Ugly", "Nice", "Good"], answer: 1 },
        { q: "A person who writes books is called a:", options: ["Reader", "Singer", "Author", "Doctor"], answer: 2 }
    ]
};


document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 2. LOAD BGM, THEME & SOUND LOGIC
    // ==========================================
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';

    function playClickSound() {
        if (isSoundOn && sfxClick) {
            sfxClick.currentTime = 0; sfxClick.volume = 1.0; sfxClick.play().catch(()=>{});
        }
    }

    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', playClickSound);
    });

    const bgmAudio = document.getElementById('bgm-audio');
    if (bgmAudio) {
        let isBgmOn = localStorage.getItem('qms_bgm') === 'on';
        let savedBgmVolume = localStorage.getItem('qms_bgm_volume') || 0.3;
        let savedBgmTime = localStorage.getItem('qms_bgm_time') || 0;
        let savedBgmTrack = localStorage.getItem('qms_bgm_track') || 'bgm1.mp3';

        bgmAudio.src = savedBgmTrack; bgmAudio.volume = parseFloat(savedBgmVolume); bgmAudio.currentTime = parseFloat(savedBgmTime);
        document.body.addEventListener('click', () => { if (isBgmOn && bgmAudio.paused) bgmAudio.play().catch(e => console.log(e)); }, { once: true });
        window.addEventListener('beforeunload', () => { localStorage.setItem('qms_bgm_time', bgmAudio.currentTime); });
    }

    // ==========================================
    // 3. QUIZ SETUP LOGIC (MANUAL TIMER & SUBJECT)
    // ==========================================
    let selectedSubject = 'physics';
    let selectedTimeMinutes = 5; // Default 5 minutes
    
    // Subject Selection
    const subjectBtns = document.querySelectorAll('.quiz-subject-btn');
    subjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            subjectBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSubject = this.getAttribute('data-subject');
        });
    });

    // Custom Timer Selection
    const timeDisplay = document.getElementById('selected-time');
    document.getElementById('btn-time-minus').addEventListener('click', () => {
        if(selectedTimeMinutes > 1) { selectedTimeMinutes--; timeDisplay.innerText = selectedTimeMinutes; }
    });
    document.getElementById('btn-time-plus').addEventListener('click', () => {
        if(selectedTimeMinutes < 60) { selectedTimeMinutes++; timeDisplay.innerText = selectedTimeMinutes; }
    });

    // Leave Button
    document.getElementById('leave-quiz-btn').addEventListener('click', () => {
        if(confirm("क्या आप टेस्ट बीच में छोड़कर जाना चाहते हैं?")) { window.location.href = 'dashboard.html'; }
    });

    // ==========================================
    // 4. QUIZ ENGINE VARIABLES & LOGIC
    // ==========================================
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let wrongAnswers = 0;
    let timerInterval;
    let timeLeftSeconds = 0;

    const setupPanel = document.getElementById('setup-panel');
    const questionPanel = document.getElementById('question-panel');
    const resultPanel = document.getElementById('result-panel');
    const timerDisplayBox = document.getElementById('timer-display');
    const timeLeftText = document.getElementById('time-left');

    // Start Quiz
    document.getElementById('start-quiz-btn').addEventListener('click', () => {
        currentQuestions = [...quizDatabase[selectedSubject]];
        // Shuffle questions randomly
        currentQuestions.sort(() => Math.random() - 0.5);
        
        currentQuestionIndex = 0;
        score = 0;
        wrongAnswers = 0;
        timeLeftSeconds = selectedTimeMinutes * 60;

        setupPanel.style.display = 'none';
        questionPanel.style.display = 'block';
        timerDisplayBox.style.display = 'flex';

        startTimer();
        loadQuestion();
    });

    // Load Question
    const questionTextEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const counterEl = document.getElementById('question-counter');
    const nextBtn = document.getElementById('next-btn');

    function loadQuestion() {
        nextBtn.style.display = 'none';
        let qData = currentQuestions[currentQuestionIndex];
        
        counterEl.innerText = `प्रश्न ${currentQuestionIndex + 1} / ${currentQuestions.length}`;
        questionTextEl.innerText = qData.q;
        optionsContainer.innerHTML = '';

        const letters = ['A', 'B', 'C', 'D'];
        
        qData.options.forEach((optText, index) => {
            let btn = document.createElement('button');
            btn.className = 'option-btn sfx-trigger';
            btn.innerHTML = `<span class="option-letter">${letters[index]}</span> ${optText}`;
            
            btn.addEventListener('click', () => checkAnswer(index, qData.answer, btn));
            optionsContainer.appendChild(btn);
        });
    }

    // Check Answer
    function checkAnswer(selectedIndex, correctIndex, clickedBtn) {
        playClickSound();
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        
        // Disable all buttons after click
        allBtns.forEach(btn => btn.disabled = true);

        if(selectedIndex === correctIndex) {
            clickedBtn.classList.add('correct');
            score++;
        } else {
            clickedBtn.classList.add('wrong');
            wrongAnswers++;
            // Show correct answer in green
            allBtns[correctIndex].classList.add('correct');
        }

        nextBtn.style.display = 'block';
    }

    // Next Question
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if(currentQuestionIndex < currentQuestions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    });

    // ==========================================
    // 5. TIMER ENGINE
    // ==========================================
    function startTimer() {
        updateTimerText();
        timerInterval = setInterval(() => {
            if(timeLeftSeconds > 0) {
                timeLeftSeconds--;
                updateTimerText();
                
                // Turn red if less than 60 seconds
                if(timeLeftSeconds < 60) { timerDisplayBox.style.color = '#ff3366'; timerDisplayBox.style.textShadow = '0 0 15px rgba(255, 51, 102, 0.6)'; }
            } else {
                clearInterval(timerInterval);
                alert("समय समाप्त! (Time's Up)");
                endQuiz();
            }
        }, 1000);
    }

    function updateTimerText() {
        let m = Math.floor(timeLeftSeconds / 60);
        let s = timeLeftSeconds % 60;
        timeLeftText.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    // ==========================================
    // 6. END QUIZ & SHOW RESULT (XP SYSTEM)
    // ==========================================
    function endQuiz() {
        clearInterval(timerInterval);
        questionPanel.style.display = 'none';
        timerDisplayBox.style.display = 'none';
        resultPanel.style.display = 'block';

        let totalQ = currentQuestions.length;
        let percentage = Math.round((score / totalQ) * 100);
        let xpGained = score * 20; // 20 XP per correct answer

        document.getElementById('final-score').innerText = `${percentage}%`;
        document.getElementById('stat-correct').innerText = score;
        document.getElementById('stat-wrong').innerText = wrongAnswers;
        document.getElementById('stat-xp').innerText = `+${xpGained} XP`;

        // Update color based on score
        const scoreCircle = document.getElementById('final-score');
        if(percentage >= 80) { scoreCircle.style.borderColor = '#00ff88'; scoreCircle.style.color = '#00ff88'; document.getElementById('result-message').innerText = "बेहतरीन प्रदर्शन! (Excellent)"; }
        else if(percentage >= 50) { scoreCircle.style.borderColor = '#ffc107'; scoreCircle.style.color = '#ffc107'; document.getElementById('result-message').innerText = "अच्छा प्रयास! (Good Effort)"; }
        else { scoreCircle.style.borderColor = '#ff3366'; scoreCircle.style.color = '#ff3366'; document.getElementById('result-message').innerText = "और अभ्यास की ज़रूरत है। (Need Practice)"; }

        // Optional: Save XP to LocalStorage for Dashboard
        let currentXP = parseInt(localStorage.getItem('qms_total_xp')) || 0;
        localStorage.setItem('qms_total_xp', currentXP + xpGained);
    }

    // ==========================================
    // 7. BACKGROUND FIREFLIES (PARTICLES)
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d'); canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        const scienceSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let particlesArray = [];
        class QuantumParticle {
            constructor() {
                this.type = Math.random() > 0.4 ? 'dot' : 'symbol';
                this.symbol = scienceSymbols[Math.floor(Math.random() * scienceSymbols.length)];
                this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
                if (this.type === 'symbol') { this.size = Math.random() * 15 + 10; this.speedX = Math.random() * 0.5 - 0.25; this.speedY = Math.random() * -0.8 - 0.2; } 
                else { this.size = Math.random() * 3 + 1; this.speedX = Math.random() * 1 - 0.5; this.speedY = Math.random() * -1 - 0.2; }
                this.blinkSpeed = Math.random() * 0.05 + 0.02; this.angle = Math.random() * Math.PI * 2;
            }
            update() {
                this.y += this.speedY; this.x += this.speedX; this.angle += this.blinkSpeed;
                if (this.y < -30) { this.y = canvas.height + 30; this.x = Math.random() * canvas.width; }
                if (this.x < -30 || this.x > canvas.width + 30) this.speedX *= -1;
            }
            draw() {
                const rootStyle = getComputedStyle(document.documentElement); let accentColor = rootStyle.getPropertyValue('--accent-main').trim() || '#00f0ff';
                let currentOpacity = ((Math.sin(this.angle) + 1) / 2) * 0.8 + 0.1;
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`; ctx.shadowBlur = currentOpacity * 20; ctx.shadowColor = accentColor;
                if (this.type === 'symbol') { ctx.font = `${this.size}px "Space Grotesk", sans-serif`; ctx.fillText(this.symbol, this.x, this.y); } 
                else { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
                ctx.shadowBlur = 0; 
            }
        }
        for (let i = 0; i < 60; i++) particlesArray.push(new QuantumParticle());
        function animateParticles() { ctx.clearRect(0, 0, canvas.width, canvas.height); particlesArray.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animateParticles); }
        animateParticles();
        window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
    }
});
