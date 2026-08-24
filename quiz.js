/* =========================================================================
   QMS DYNAMIC QUIZ MASTER ENGINE (FINAL PRO VERSION)
   - FEATURES:
     1. Active Highlight for Difficulty Modes
     2. Custom Question Count Selector (5 to 40)
     3. Hindi & English Medium Support
     4. Chapter-wise Randomized Question Engine
     5. Dynamic XP Rewards based on Difficulty
========================================================================= */

// --------------------------------------------------------------------------
// 1. MEGA DYNAMIC QUIZ DATABASE (Subject -> Chapters -> Difficulty -> Medium)
// --------------------------------------------------------------------------
const qmsQuizDatabase = {
    physics: {
        1: {
            easy: {
                hi: [
                    { q: "विद्युत आवेश का SI मात्रक क्या है?", options: ["न्यूटन", "कूलॉम", "जूल", "वोल्ट"], answer: 1 },
                    { q: "इलेक्ट्रॉन पर कितना आवेश होता है?", options: ["1.6 x 10^-19 C", "-1.6 x 10^-19 C", "9.1 x 10^-31 C", "0"], answer: 1 },
                    { q: "दो सजातीय आवेशों के बीच कौन सा बल लगता है?", options: ["आकर्षण", "प्रतिकर्षण", "गुरुत्वाकर्षण", "शून्य"], answer: 1 }
                ],
                en: [
                    { q: "What is the SI unit of electric charge?", options: ["Newton", "Coulomb", "Joule", "Volt"], answer: 1 },
                    { q: "What is the charge on an electron?", options: ["1.6 x 10^-19 C", "-1.6 x 10^-19 C", "9.1 x 10^-31 C", "0"], answer: 1 }
                ]
            },
            medium: {
                hi: [
                    { q: "निर्वात की विद्युतशीलता (ε0) का मात्रक क्या है?", options: ["C²/N·m²", "N·m²/C²", "J/C", "V/m"], answer: 0 },
                    { q: "विद्युत क्षेत्र की तीव्रता का मात्रक है?", options: ["N/C", "V/m", "A और B दोनों", "J/C"], answer: 2 }
                ],
                en: [
                    { q: "What is the unit of permittivity of free space (ε0)?", options: ["C²/N·m²", "N·m²/C²", "J/C", "V/m"], answer: 0 }
                ]
            },
            difficult: {
                hi: [
                    { q: "एक अनन्त रेखीय आवेश के कारण उससे r दूरी पर विद्युत क्षेत्र की तीव्रता किसके समानुपाती होती है?", options: ["r", "r²", "1/r", "1/r²"], answer: 2 }
                ],
                en: [
                    { q: "The electric field intensity due to an infinite line charge at distance r is proportional to:", options: ["r", "r²", "1/r", "1/r²"], answer: 2 }
                ]
            }
        }
    },
    chemistry: {
        1: {
            easy: {
                hi: [
                    { q: "जल (Water) का रासायनिक सूत्र क्या है?", options: ["CO2", "O2", "H2O", "H2O2"], answer: 2 },
                    { q: "सबसे हल्की गैस कौन सी है?", options: ["ऑक्सीजन", "नाइट्रोजन", "हाइड्रोजन", "हीलियम"], answer: 2 }
                ],
                en: [
                    { q: "What is the chemical formula of water?", options: ["CO2", "O2", "H2O", "H2O2"], answer: 2 }
                ]
            },
            medium: {
                hi: [
                    { q: "PH स्केल की रेंज क्या होती है?", options: ["1 से 10", "0 से 14", "1 से 100", "0 से 10"], answer: 1 }
                ],
                en: [
                    { q: "What is the range of the pH scale?", options: ["1 to 10", "0 to 14", "1 to 100", "0 to 10"], answer: 1 }
                ]
            },
            difficult: {
                hi: [
                    { q: "विलयन के अणुसंख्यक गुणधर्म किस पर निर्भर करते हैं?", options: ["विलेय के कणों की संख्या पर", "विलेय की प्रकृति पर", "विलायक के आयतन पर", "तापमान पर"], answer: 0 }
                ],
                en: [
                    { q: "Colligative properties of a solution depend upon:", options: ["Number of solute particles", "Nature of solute", "Volume of solvent", "Temperature"], answer: 0 }
                ]
            }
        }
    },
    maths: {
        1: {
            easy: {
                hi: [
                    { q: "sin(90°) का मान क्या होता है?", options: ["0", "1", "1/2", "अनंत"], answer: 1 }
                ],
                en: [
                    { q: "What is the value of sin(90°)?", options: ["0", "1", "1/2", "Infinity"], answer: 1 }
                ]
            },
            medium: {
                hi: [
                    { q: "त्रिभुज के तीनों कोणों का योग कितना होता है?", options: ["90°", "360°", "180°", "270°"], answer: 2 }
                ],
                en: [
                    { q: "What is the sum of all interior angles of a triangle?", options: ["90°", "360°", "180°", "270°"], answer: 2 }
                ]
            },
            difficult: {
                hi: [
                    { q: "यदि एक फलन f: R -> R, f(x) = 2x द्वारा परिभाषित है, तो यह फलन है:", options: ["एकैकी आच्छादक", "बहुएकैकी", "अंतर्क्षेपी", "इनमें से कोई नहीं"], answer: 0 }
                ],
                en: [
                    { q: "If a function f: R -> R is defined by f(x) = 2x, then the function is:", options: ["One-one onto", "Many-one", "Into", "None of these"], answer: 0 }
                ]
            }
        }
    },
    hindi: {
        1: {
            easy: {
                hi: [{ q: "हिंदी भाषा की लिपि क्या है?", options: ["रोमन", "देवनागरी", "गुरुमुखी", "फारसी"], answer: 1 }],
                en: [{ q: "What is the script of Hindi language?", options: ["Roman", "Devanagari", "Gurmukhi", "Persian"], answer: 1 }]
            },
            medium: {
                hi: [{ q: "‘आकाश’ का पर्यायवाची शब्द है:", options: ["पृथ्वी", "गगन", "पवन", "अग्नि"], answer: 1 }],
                en: [{ q: "Synonym of 'Akash' is:", options: ["Prithvi", "Gagan", "Pavan", "Agni"], answer: 1 }]
            },
            difficult: {
                hi: [{ q: "कामायनी महाकाव्य के रचयिता कौन हैं?", options: ["जयशंकर प्रसाद", "सुमित्रानंदन पंत", "महादेवी वर्मा", "सूर्यकांत त्रिपाठी निराला"], answer: 0 }],
                en: [{ q: "Who is the author of 'Kamayani'?", options: ["Jaishankar Prasad", "Sumitranandan Pant", "Mahadevi Verma", "Nirala"], answer: 0 }]
            }
        }
    },
    english: {
        1: {
            easy: {
                hi: [{ q: "'Go' की भूतकाल (Past tense) फॉर्म क्या है?", options: ["Goes", "Gone", "Went", "Going"], answer: 2 }],
                en: [{ q: "What is the past tense of 'Go'?", options: ["Goes", "Gone", "Went", "Going"], answer: 2 }]
            },
            medium: {
                hi: [{ q: "इनमें से कौन सा स्वर (Vowel) है?", options: ["B", "E", "C", "P"], answer: 1 }],
                en: [{ q: "Which of these is a vowel?", options: ["B", "E", "C", "P"], answer: 1 }]
            },
            difficult: {
                hi: [{ q: "'The camel is the ship of the desert' में कौन सा अलंकार (Figure of speech) है?", options: ["Simile", "Metaphor", "Personification", "Oxymoron"], answer: 1 }],
                en: [{ q: "Identify the figure of speech in 'The camel is the ship of the desert.'", options: ["Simile", "Metaphor", "Personification", "Oxymoron"], answer: 1 }]
            }
        }
    }
};

const chapterNamesMap = {
    physics: { 1: "अध्याय 1: वैद्युत आवेश तथा क्षेत्र", 2: "अध्याय 2: स्थिरवैद्युत विभव तथा धारिता" },
    chemistry: { 1: "अध्याय 1: विलयन" },
    maths: { 1: "अध्याय 1: संबंध एवं फलन" },
    hindi: { 1: "अध्याय 1: आत्मपरिचय / एक गीत" },
    english: { 1: "Chapter 1: The Last Lesson" }
};

document.addEventListener('DOMContentLoaded', () => {

    // Medium Switcher Logic
    let currentMedium = localStorage.getItem('qms_medium') || 'hi';
    const mediumTextEl = document.getElementById('quiz-medium-text');
    if(mediumTextEl) {
        mediumTextEl.innerText = currentMedium === 'hi' ? 'हिंदी माध्यम' : 'English Medium';
    }

    const mediumBtn = document.getElementById('quiz-medium-btn');
    if(mediumBtn) {
        mediumBtn.addEventListener('click', () => {
            currentMedium = currentMedium === 'hi' ? 'en' : 'hi';
            localStorage.setItem('qms_medium', currentMedium);
            if(mediumTextEl) mediumTextEl.innerText = currentMedium === 'hi' ? 'हिंदी माध्यम' : 'English Medium';
            window.showCustomToast(currentMedium === 'hi' ? 'माध्यम बदलकर हिंदी कर दिया गया।' : 'Medium changed to English.');
            setTimeout(() => window.location.reload(), 1000);
        });
    }

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

    // Custom Confirm Modal
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
        targetModalCancelButton.addEventListener('click', () => modalOverlayContainer.classList.remove('active'));
    }
    if (targetModalConfirmButton) {
        targetModalConfirmButton.addEventListener('click', () => { 
            if (activeModalCallbackFunction) activeModalCallbackFunction(true);
            modalOverlayContainer.classList.remove('active'); 
        });
    }

    // Theme & Audio
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';

    function playClickSound() {
        if (isSoundOn && sfxClick) {
            sfxClick.currentTime = 0; sfxClick.volume = 1.0; sfxClick.play().catch(()=>{});
        }
    }
    document.querySelectorAll('.sfx-trigger').forEach(btn => btn.addEventListener('click', playClickSound));

    // Setup Selections
    let selectedSubject = 'physics';
    let selectedChapter = 1;
    let selectedDifficulty = 'easy';
    let selectedQuestionCount = 10;
    let selectedTimeMinutes = 10; 
    
    const subjectBtns = document.querySelectorAll('.quiz-subject-btn');
    const chapterSelectElement = document.getElementById('chapter-selector');
    const diffBtns = document.querySelectorAll('.quiz-diff-btn');
    const countBtns = document.querySelectorAll('.quiz-count-btn');

    function updateChapterDropdown(subject) {
        if(!chapterSelectElement) return;
        chapterSelectElement.innerHTML = '';
        const chaptersList = chapterNamesMap[subject];
        if (chaptersList) {
            Object.keys(chaptersList).forEach(chNum => {
                let option = document.createElement('option');
                option.value = chNum;
                option.innerText = chaptersList[chNum];
                chapterSelectElement.appendChild(option);
            });
            selectedChapter = parseInt(Object.keys(chaptersList)[0]);
        } else {
            chapterSelectElement.innerHTML = '<option value="1">अध्याय 1</option>';
            selectedChapter = 1;
        }
    }

    updateChapterDropdown(selectedSubject);

    subjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            subjectBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSubject = this.getAttribute('data-subject');
            updateChapterDropdown(selectedSubject);
        });
    });

    // 🚀 FIXED DIFFICULTY HIGHLIGHTING LOGIC 🚀
    diffBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            diffBtns.forEach(b => {
                b.style.background = 'rgba(255,255,255,0.08)';
                b.style.color = '#fff';
                b.style.border = '1px solid rgba(255,255,255,0.2)';
            });
            
            selectedDifficulty = this.getAttribute('data-diff');
            
            if(selectedDifficulty === 'easy') {
                this.style.background = '#00ff88';
                this.style.color = '#000';
                this.style.border = 'none';
            } else if(selectedDifficulty === 'medium') {
                this.style.background = '#ffc107';
                this.style.color = '#000';
                this.style.border = 'none';
            } else if(selectedDifficulty === 'difficult') {
                this.style.background = '#ff3366';
                this.style.color = '#fff';
                this.style.border = 'none';
            }
            playClickSound();
        });
    });

    // Question Count Buttons Selection
    countBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            countBtns.forEach(b => {
                b.style.background = 'rgba(255,255,255,0.05)';
                b.style.color = '#fff';
                b.style.border = '1px solid rgba(255,255,255,0.2)';
            });
            this.style.background = 'var(--accent-main)';
            this.style.color = '#000';
            this.style.border = '1px solid var(--accent-main)';
            
            selectedQuestionCount = parseInt(this.getAttribute('data-count'));
            playClickSound();
        });
    });

    if(chapterSelectElement) {
        chapterSelectElement.addEventListener('change', function() {
            selectedChapter = parseInt(this.value);
            playClickSound();
        });
    }

    const timeDisplay = document.getElementById('selected-time');
    document.getElementById('btn-time-minus').addEventListener('click', () => {
        if(selectedTimeMinutes > 1) { selectedTimeMinutes--; timeDisplay.innerText = selectedTimeMinutes; }
    });
    document.getElementById('btn-time-plus').addEventListener('click', () => {
        if(selectedTimeMinutes < 60) { selectedTimeMinutes++; timeDisplay.innerText = selectedTimeMinutes; }
    });

    document.getElementById('leave-quiz-btn').addEventListener('click', () => {
        window.showCustomConfirm("क्या आप सच में टेस्ट बीच में छोड़कर जाना चाहते हैं?", (isConfirmed) => {
            if (isConfirmed) window.location.href = 'dashboard.html';
        });
    });

    // Quiz Engine Variables
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
        let chapterQuestionPool = [];
        try {
            chapterQuestionPool = [...qmsQuizDatabase[selectedSubject][selectedChapter][selectedDifficulty][currentMedium]];
        } catch (e) {
            chapterQuestionPool = [];
        }

        if (chapterQuestionPool.length === 0) {
            window.showCustomToast("इस अध्याय और डिफिकल्टी के सवाल अभी जोड़े जा रहे हैं।", true);
            return;
        }

        chapterQuestionPool.sort(() => Math.random() - 0.5);
        currentQuestions = chapterQuestionPool.slice(0, Math.min(selectedQuestionCount, chapterQuestionPool.length));
        
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
        if(currentQuestionIndex < currentQuestions.length) loadQuestion();
        else endQuiz();
    });

    function startTimer() {
        updateTimerText();
        timerInterval = setInterval(() => {
            if(timeLeftSeconds > 0) {
                timeLeftSeconds--;
                updateTimerText();
                if(timeLeftSeconds < 60) { timerDisplayBox.style.color = '#ff3366'; }
            } else {
                clearInterval(timerInterval);
                window.showCustomToast("समय समाप्त हो गया है!", true);
                setTimeout(() => endQuiz(), 1500);
            }
        }, 1000);
    }

    function updateTimerText() {
        let m = Math.floor(timeLeftSeconds / 60);
        let s = timeLeftSeconds % 60;
        timeLeftText.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    function endQuiz() {
        clearInterval(timerInterval);
        questionPanel.style.display = 'none';
        timerDisplayBox.style.display = 'none';
        resultPanel.style.display = 'block';

        let totalQ = currentQuestions.length;
        let percentage = Math.round((score / totalQ) * 100);
        
        let multiplier = 10;
        if(selectedDifficulty === 'medium') multiplier = 20;
        if(selectedDifficulty === 'difficult') multiplier = 30;
        let xpGained = score * multiplier; 

        document.getElementById('final-score').innerText = `${percentage}%`;
        document.getElementById('stat-correct').innerText = score;
        document.getElementById('stat-wrong').innerText = wrongAnswers;
        document.getElementById('stat-xp').innerText = `+${xpGained} XP`;

        const scoreCircle = document.getElementById('final-score');
        if(percentage >= 80) { scoreCircle.style.borderColor = '#00ff88'; scoreCircle.style.color = '#00ff88'; document.getElementById('result-message').innerText = "बेहतरीन प्रदर्शन!"; }
        else if(percentage >= 50) { scoreCircle.style.borderColor = '#ffc107'; scoreCircle.style.color = '#ffc107'; document.getElementById('result-message').innerText = "अच्छा प्रयास!"; }
        else { scoreCircle.style.borderColor = '#ff3366'; scoreCircle.style.color = '#ff3366'; document.getElementById('result-message').innerText = "और अभ्यास की ज़रूरत है।"; }

        let currentXP = parseInt(localStorage.getItem('qms_total_xp')) || 0;
        localStorage.setItem('qms_total_xp', currentXP + xpGained);
    }
});
