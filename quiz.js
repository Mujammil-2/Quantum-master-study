/* =========================================================================
   QMS DYNAMIC QUIZ MASTER ENGINE (PRO VERSION)
   - FEATURES:
     1. 🚀 NEW: Chapter-wise Question Selection
     2. 🚀 NEW: Random Auto-Change Engine (Picks 5 random non-repeated questions)
     3. Custom Manual Timer Logic
     4. Dynamic Score & XP System
     5. Smart BGM Memory Integration
     6. Professional Custom Modals & Toasts
========================================================================= */

// --------------------------------------------------------------------------
// 1. MEGA DYNAMIC QUIZ DATABASE (Subject -> Chapters -> Huge Question Pool)
// --------------------------------------------------------------------------
const qmsQuizDatabase = {
    physics: {
        1: [ // Chapter 1 Questions (Pool of 10+ questions)
            { q: "विद्युत आवेश का SI मात्रक क्या है?", options: ["न्यूटन", "कूलॉम", "जूल", "वोल्ट"], answer: 1 },
            { q: "इलेक्ट्रॉन पर कितना आवेश होता है?", options: ["1.6 x 10^-19 C", "-1.6 x 10^-19 C", "9.1 x 10^-31 C", "0"], answer: 1 },
            { q: "निर्वात की विद्युतशीलता (ε0) का मान क्या है?", options: ["8.85 x 10^-12", "9 x 10^9", "1.6 x 10^-19", "0"], answer: 0 },
            { q: "विद्युत क्षेत्र की तीव्रता का मात्रक है?", options: ["N/C", "V/m", "A और B दोनों", "J/C"], answer: 2 },
            { q: "आवेश का क्वांटमीकरण किसने सिद्ध किया?", options: ["मिलिकन", "थॉमसन", "रदरफोर्ड", "कूलॉम"], answer: 0 },
            { q: "दो सजातीय (Same) आवेशों के बीच कौन सा बल लगता है?", options: ["आकर्षण (Attraction)", "प्रतिकर्षण (Repulsion)", "गुरुत्वाकर्षण", "शून्य"], answer: 1 },
            { q: "विद्युत द्विध्रुव आघूर्ण की दिशा होती है?", options: ["+ से -", "- से +", "लंबवत", "कोई दिशा नहीं"], answer: 1 },
            { q: "विद्युत फ्लक्स कैसी राशि है?", options: ["सदिश (Vector)", "अदिश (Scalar)", "प्रदिश", "इनमें से कोई नहीं"], answer: 1 },
            { q: "गॉस का नियम किससे संबंधित है?", options: ["विद्युत फ्लक्स", "चुंबकीय फ्लक्स", "प्रतिरोध", "धारिता"], answer: 0 },
            { q: "एक आदर्श द्विध्रुव का आकार कैसा होता है?", options: ["बड़ा", "शून्य (बिंदु आकार)", "अनंत", "गोलाकार"], answer: 1 }
        ],
        2: [ // Chapter 2
            { q: "विद्युत विभव का SI मात्रक क्या है?", options: ["वोल्ट", "एम्पीयर", "ओम", "वाट"], answer: 0 },
            { q: "धारिता (Capacitance) का मात्रक क्या है?", options: ["फैराड", "हेनरी", "टेस्ला", "वेबर"], answer: 0 }
            // Add more questions here...
        ]
    },
    chemistry: {
        1: [ // Chapter 1
            { q: "जल (Water) का रासायनिक सूत्र क्या है?", options: ["CO2", "O2", "H2O", "H2O2"], answer: 2 },
            { q: "सबसे हल्की गैस कौन सी है?", options: ["ऑक्सीजन", "नाइट्रोजन", "हाइड्रोजन", "हीलियम"], answer: 2 },
            { q: "PH स्केल की रेंज क्या होती है?", options: ["1 से 10", "0 से 14", "1 से 100", "0 से 10"], answer: 1 },
            { q: "सोने (Gold) का रासायनिक प्रतीक क्या है?", options: ["Ag", "Fe", "Au", "Cu"], answer: 2 },
            { q: "नमक का रासायनिक नाम क्या है?", options: ["सोडियम क्लोराइड", "पोटेशियम क्लोराइड", "कैल्शियम कार्बोनेट", "सल्फ्यूरिक एसिड"], answer: 0 }
        ]
    },
    maths: {
        1: [ // Chapter 1
            { q: "sin(90°) का मान क्या होता है?", options: ["0", "1", "1/2", "अनंत"], answer: 1 },
            { q: "वृत्त के क्षेत्रफल का सूत्र क्या है?", options: ["2πr", "πr²", "4/3πr³", "πd"], answer: 1 },
            { q: "त्रिभुज के तीनों कोणों का योग कितना होता है?", options: ["90°", "360°", "180°", "270°"], answer: 2 },
            { q: "x² - 4 = 0 है, तो x का मान होगा:", options: ["4", "2 या -2", "16", "0"], answer: 1 }
        ]
    },
    hindi: {
        1: [
            { q: "हिंदी भाषा की लिपि क्या है?", options: ["रोमन", "देवनागरी", "गुरुमुखी", "फारसी"], answer: 1 },
            { q: "‘आकाश’ का पर्यायवाची शब्द है:", options: ["पृथ्वी", "गगन", "पवन", "अग्नि"], answer: 1 }
        ]
    },
    english: {
        1: [
            { q: "What is the past tense of 'Go'?", options: ["Goes", "Gone", "Went", "Going"], answer: 2 },
            { q: "Which of these is a vowel?", options: ["B", "E", "C", "P"], answer: 1 }
        ]
    }
};

// Chapter Names mapped for the Dropdown Selector
const chapterNamesMap = {
    physics: { 1: "अध्याय 1: वैद्युत आवेश तथा क्षेत्र", 2: "अध्याय 2: स्थिरवैद्युत विभव तथा धारिता", 3: "अध्याय 3: विद्युत धारा" },
    chemistry: { 1: "अध्याय 1: विलयन", 2: "अध्याय 2: वैद्युतरसायन", 3: "अध्याय 3: रासायनिक बलगतिकी" },
    maths: { 1: "अध्याय 1: संबंध एवं फलन", 2: "अध्याय 2: प्रतिलोम त्रिकोणमितीय फलन" },
    hindi: { 1: "अध्याय 1: आत्मपरिचय / एक गीत" },
    english: { 1: "Chapter 1: The Last Lesson" }
};

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 2. PREMIUM CUSTOM MODALS & TOASTS 
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
        setTimeout(() => { if (toastElementNode) toastElementNode.remove(); }, 3500); 
    };

    const modalOverlayContainer = document.createElement('div'); 
    modalOverlayContainer.className = 'qms-modal-overlay';
    modalOverlayContainer.innerHTML = `
        <div class="qms-modal-box">
            <div class="qms-modal-title" id="qms-modal-title"></div>
            <div class="qms-modal-buttons" style="margin-top: 20px;">
                <button class="qms-modal-btn btn-cancel" id="qms-modal-cancel">रद्द करें</button>
                <button class="qms-modal-btn btn-confirm" id="qms-modal-confirm">हाँ, छोड़ें</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlayContainer);

    const targetModalTitle = document.getElementById('qms-modal-title'); 
    const targetModalConfirmButton = document.getElementById('qms-modal-confirm'); 
    const targetModalCancelButton = document.getElementById('qms-modal-cancel');
    let activeModalCallbackFunction = null;

    window.showCustomConfirm = function(titleText, callbackFunc) { 
        targetModalTitle.innerHTML = `<i class="ri-error-warning-line" style="color: #ff4d4d; font-size: 2.5rem; display:block; margin-bottom: 10px;"></i> ${titleText}`; 
        targetModalConfirmButton.style.background = '#ff4d4d'; 
        targetModalConfirmButton.style.color = '#fff'; 
        
        modalOverlayContainer.classList.add('active'); 
        activeModalCallbackFunction = callbackFunc; 
    };
    
    if (targetModalCancelButton) {
        targetModalCancelButton.addEventListener('click', () => {
            modalOverlayContainer.classList.remove('active');
        });
    }
    
    if (targetModalConfirmButton) {
        targetModalConfirmButton.addEventListener('click', () => { 
            if (activeModalCallbackFunction) {
                activeModalCallbackFunction(true);
            }
            modalOverlayContainer.classList.remove('active'); 
        });
    }

    // ==========================================
    // 3. LOAD BGM, THEME & SOUND LOGIC
    // ==========================================
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';

    function playClickSound() {
        if (isSoundOn && sfxClick) {
            sfxClick.currentTime = 0; 
            sfxClick.volume = 1.0; 
            sfxClick.play().catch(()=>{});
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

        bgmAudio.src = savedBgmTrack; 
        bgmAudio.volume = parseFloat(savedBgmVolume); 
        bgmAudio.currentTime = parseFloat(savedBgmTime);
        
        document.body.addEventListener('click', () => { 
            if (isBgmOn && bgmAudio.paused) bgmAudio.play().catch(e => console.log(e)); 
        }, { once: true });
        
        window.addEventListener('beforeunload', () => { 
            localStorage.setItem('qms_bgm_time', bgmAudio.currentTime); 
        });
    }

    // ==========================================
    // 4. 🚀 SMART SUBJECT & CHAPTER SELECTOR
    // ==========================================
    let selectedSubject = 'physics';
    let selectedChapter = 1;
    let selectedTimeMinutes = 5; 
    
    const subjectBtns = document.querySelectorAll('.quiz-subject-btn');
    const chapterSelectElement = document.getElementById('chapter-selector');

    // Function to update the Chapter Dropdown dynamically
    function updateChapterDropdown(subject) {
        if(!chapterSelectElement) return;
        chapterSelectElement.innerHTML = ''; // Clear old options
        
        const chaptersList = chapterNamesMap[subject];
        if (chaptersList) {
            Object.keys(chaptersList).forEach(chNum => {
                let option = document.createElement('option');
                option.value = chNum;
                option.innerText = chaptersList[chNum];
                chapterSelectElement.appendChild(option);
            });
            selectedChapter = parseInt(Object.keys(chaptersList)[0]); // Reset to first chapter
        } else {
            chapterSelectElement.innerHTML = '<option value="1">अध्याय 1</option>';
            selectedChapter = 1;
        }
    }

    // Initialize dropdown on first load
    updateChapterDropdown(selectedSubject);

    // Update Dropdown when subject button is clicked
    subjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            subjectBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSubject = this.getAttribute('data-subject');
            updateChapterDropdown(selectedSubject); // Change chapters based on subject
        });
    });

    if(chapterSelectElement) {
        chapterSelectElement.addEventListener('change', function() {
            selectedChapter = parseInt(this.value);
            playClickSound();
        });
    }

    // Timer Controls
    const timeDisplay = document.getElementById('selected-time');
    document.getElementById('btn-time-minus').addEventListener('click', () => {
        if(selectedTimeMinutes > 1) { 
            selectedTimeMinutes--; 
            timeDisplay.innerText = selectedTimeMinutes; 
        }
    });
    document.getElementById('btn-time-plus').addEventListener('click', () => {
        if(selectedTimeMinutes < 60) { 
            selectedTimeMinutes++; 
            timeDisplay.innerText = selectedTimeMinutes; 
        }
    });

    document.getElementById('leave-quiz-btn').addEventListener('click', () => {
        window.showCustomConfirm("क्या आप सच में टेस्ट बीच में छोड़कर जाना चाहते हैं?", (isConfirmed) => {
            if (isConfirmed) {
                window.location.href = 'dashboard.html';
            }
        });
    });

    // ==========================================
    // 5. 🚀 THE AUTO-CHANGE RANDOM QUIZ ENGINE 🚀
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

    document.getElementById('start-quiz-btn').addEventListener('click', () => {
        
        // 1. Get the big pool of questions for the selected Chapter
        let chapterQuestionPool = [];
        if (qmsQuizDatabase[selectedSubject] && qmsQuizDatabase[selectedSubject][selectedChapter]) {
            chapterQuestionPool = [...qmsQuizDatabase[selectedSubject][selectedChapter]];
        }

        // Safety Check: If no questions exist for that chapter yet
        if (chapterQuestionPool.length === 0) {
            window.showCustomToast("माफ़ करें! इस अध्याय के सवाल अभी जोड़े जा रहे हैं।", true);
            return;
        }

        // 2. 🎲 THE RANDOMIZER: Shuffle the entire pool completely
        chapterQuestionPool.sort(() => Math.random() - 0.5);
        
        // 3. Pick EXACTLY 5 questions (or less if the pool is smaller)
        const totalQuestionsToAsk = Math.min(5, chapterQuestionPool.length);
        currentQuestions = chapterQuestionPool.slice(0, totalQuestionsToAsk);
        
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

    function checkAnswer(selectedIndex, correctIndex, clickedBtn) {
        playClickSound();
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        
        allBtns.forEach(btn => btn.disabled = true);

        if(selectedIndex === correctIndex) {
            clickedBtn.classList.add('correct');
            score++;
        } else {
            clickedBtn.classList.add('wrong');
            wrongAnswers++;
            allBtns[correctIndex].classList.add('correct');
        }

        nextBtn.style.display = 'block';
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if(currentQuestionIndex < currentQuestions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    });

    // ==========================================
    // 6. TIMER ENGINE
    // ==========================================
    function startTimer() {
        updateTimerText();
        timerInterval = setInterval(() => {
            if(timeLeftSeconds > 0) {
                timeLeftSeconds--;
                updateTimerText();
                
                if(timeLeftSeconds < 60) { 
                    timerDisplayBox.style.color = '#ff3366'; 
                    timerDisplayBox.style.textShadow = '0 0 15px rgba(255, 51, 102, 0.6)'; 
                }
            } else {
                clearInterval(timerInterval);
                window.showCustomToast("समय समाप्त हो गया है! (Time's Up)", true);
                setTimeout(() => {
                    endQuiz();
                }, 1500);
            }
        }, 1000);
    }

    function updateTimerText() {
        let m = Math.floor(timeLeftSeconds / 60);
        let s = timeLeftSeconds % 60;
        timeLeftText.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    // ==========================================
    // 7. END QUIZ & SHOW RESULT (XP SYSTEM)
    // ==========================================
    function endQuiz() {
        clearInterval(timerInterval);
        questionPanel.style.display = 'none';
        timerDisplayBox.style.display = 'none';
        resultPanel.style.display = 'block';

        let totalQ = currentQuestions.length;
        let percentage = Math.round((score / totalQ) * 100);
        let xpGained = score * 20; 

        document.getElementById('final-score').innerText = `${percentage}%`;
        document.getElementById('stat-correct').innerText = score;
        document.getElementById('stat-wrong').innerText = wrongAnswers;
        document.getElementById('stat-xp').innerText = `+${xpGained} XP`;

        const scoreCircle = document.getElementById('final-score');
        if(percentage >= 80) { 
            scoreCircle.style.borderColor = '#00ff88'; 
            scoreCircle.style.color = '#00ff88'; 
            document.getElementById('result-message').innerText = "बेहतरीन प्रदर्शन! (Excellent)"; 
        }
        else if(percentage >= 50) { 
            scoreCircle.style.borderColor = '#ffc107'; 
            scoreCircle.style.color = '#ffc107'; 
            document.getElementById('result-message').innerText = "अच्छा प्रयास! (Good Effort)"; 
        }
        else { 
            scoreCircle.style.borderColor = '#ff3366'; 
            scoreCircle.style.color = '#ff3366'; 
            document.getElementById('result-message').innerText = "और अभ्यास की ज़रूरत है। (Need Practice)"; 
        }

        let currentXP = parseInt(localStorage.getItem('qms_total_xp')) || 0;
        localStorage.setItem('qms_total_xp', currentXP + xpGained);
    }

    // ==========================================
    // 8. BACKGROUND FIREFLIES (PARTICLES)
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d'); 
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight;
        
        const scienceSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let particlesArray = [];
        
        class QuantumParticle {
            constructor() {
                this.type = Math.random() > 0.4 ? 'dot' : 'symbol';
                this.symbol = scienceSymbols[Math.floor(Math.random() * scienceSymbols.length)];
                this.x = Math.random() * canvas.width; 
                this.y = Math.random() * canvas.height;
                
                if (this.type === 'symbol') { 
                    this.size = Math.random() * 15 + 10; 
                    this.speedX = Math.random() * 0.5 - 0.25; 
                    this.speedY = Math.random() * -0.8 - 0.2; 
                } 
                else { 
                    this.size = Math.random() * 3 + 1; 
                    this.speedX = Math.random() * 1 - 0.5; 
                    this.speedY = Math.random() * -1 - 0.2; 
                }
                
                this.blinkSpeed = Math.random() * 0.05 + 0.02; 
                this.angle = Math.random() * Math.PI * 2;
            }
            update() {
                this.y += this.speedY; 
                this.x += this.speedX; 
                this.angle += this.blinkSpeed;
                
                if (this.y < -30) { 
                    this.y = canvas.height + 30; 
                    this.x = Math.random() * canvas.width; 
                }
                if (this.x < -30 || this.x > canvas.width + 30) {
                    this.speedX *= -1;
                }
            }
            draw() {
                const rootStyle = getComputedStyle(document.documentElement); 
                let accentColor = rootStyle.getPropertyValue('--accent-main').trim() || '#00f0ff';
                
                let currentOpacity = ((Math.sin(this.angle) + 1) / 2) * 0.8 + 0.1;
                
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`; 
                ctx.shadowBlur = currentOpacity * 20; 
                ctx.shadowColor = accentColor;
                
                if (this.type === 'symbol') { 
                    ctx.font = `${this.size}px "Space Grotesk", sans-serif`; 
                    ctx.fillText(this.symbol, this.x, this.y); 
                } 
                else { 
                    ctx.beginPath(); 
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
                    ctx.fill(); 
                }
                
                ctx.shadowBlur = 0; 
            }
        }
        
        for (let i = 0; i < 60; i++) {
            particlesArray.push(new QuantumParticle());
        }
        
        function animateParticles() { 
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            particlesArray.forEach(p => { 
                p.update(); 
                p.draw(); 
            }); 
            requestAnimationFrame(animateParticles); 
        }
        
        animateParticles();
        
        window.addEventListener('resize', () => { 
            canvas.width = window.innerWidth; 
            canvas.height = window.innerHeight; 
        });
    }
});
