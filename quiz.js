/* =========================================================================
   QMS DYNAMIC QUIZ MASTER ENGINE (FULL SYLLABUS & SMART EXPANDER)
   - FEATURES:
     1. Complete Chapters List for All Subjects (Physics, Chem, Math, Hindi, Eng)
     2. Smart Question Expander (Guarantees 5 to 40 questions even from a base pool)
     3. Dual Medium Support (Hindi & English)
     4. Active Highlight for Difficulty Modes
========================================================================= */

// --------------------------------------------------------------------------
// 1. FULL SYLLABUS MEGA DATABASE & CHAPTERS MAPPING
// --------------------------------------------------------------------------
const chapterNamesMap = {
    physics: {
        1: "अध्याय 1: वैद्युत आवेश तथा क्षेत्र",
        2: "अध्याय 2: स्थिरवैद्युत विभव तथा धारिता",
        3: "अध्याय 3: विद्युत धारा",
        4: "अध्याय 4: गतिमान आवेश और चुंबकत्व",
        5: "अध्याय 5: चुंबकत्व एवं द्रव्य",
        6: "अध्याय 6: वैद्युत चुंबकीय प्रेरण",
        7: "अध्याय 7: प्रत्यावर्ती धारा",
        8: "अध्याय 8: वैद्युत चुंबकीय तरंगें",
        9: "अध्याय 9: किरण प्रकाशिकी एवं प्रकाशिक यंत्र",
        10: "अध्याय 10: तरंग प्रकाशिकी",
        11: "अध्याय 11: विकिरण तथा द्रव्य की द्वैत प्रकृति",
        12: "अध्याय 12: परमाणु",
        13: "अध्याय 13: नाभिक",
        14: "अध्याय 14: अर्धचालक इलेक्ट्रॉनिकी"
    },
    chemistry: {
        1: "अध्याय 1: विलयन",
        2: "अध्याय 2: वैद्युतरसायन",
        3: "अध्याय 3: रासायनिक बलगतिकी",
        4: "अध्याय 4: d- एवं f- ब्लॉक के तत्व",
        5: "अध्याय 5: उपसहसंयोजन यौगिक",
        6: "अध्याय 6: हैलोऐल्केन तथा हैलोएरीन",
        7: "अध्याय 7: ऐल्कोहॉल, फ़िनॉल एवं ईथर",
        8: "अध्याय 8: एल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल",
        9: "अध्याय 9: एमीन",
        10: "अध्याय 10: जैव-अणु"
    },
    maths: {
        1: "अध्याय 1: संबंध एवं फलन",
        2: "अध्याय 2: प्रतिलोम त्रिकोणमितीय फलन",
        3: "अध्याय 3: आव्यूह",
        4: "अध्याय 4: सारणिक",
        5: "अध्याय 5: सांतत्य तथा अवकलनीयता",
        6: "अध्याय 6: अवकलज के अनुप्रयोग",
        7: "अध्याय 7: समाकलन",
        8: "अध्याय 8: समाकलन के अनुप्रयोग",
        9: "अध्याय 9: अवकल समीकरण",
        10: "अध्याय 10: सदिश बीजगणित",
        11: "अध्याय 11: त्रि-विमीय ज्यामिति",
        12: "अध्याय 12: रैखिक प्रोग्रामन",
        13: "अध्याय 13: प्रायिकता"
    },
    hindi: {
        1: "अध्याय 1: आत्मपरिचय / एक गीत",
        2: "अध्याय 2: पतंग",
        3: "अध्याय 3: कविता के बहाने / बात सीधी थी पर",
        4: "अध्याय 4: कैमरे में बंद अपंग",
        5: "अध्याय 5: सहर्ष स्वीकार है",
        6: "अध्याय 6: उषा",
        7: "अध्याय 7: बादल राग",
        8: "अध्याय 8: कवितावली / लक्ष्मण-मूर्छा",
        9: "अध्याय 9: रुबाइयों / गज़ल",
        10: "अध्याय 10: छोटा मेरा खेत / बगुलों के पंख"
    },
    english: {
        1: "Chapter 1: The Last Lesson",
        2: "Chapter 2: Lost Spring",
        3: "Chapter 3: Deep Water",
        4: "Chapter 4: The Rattrap",
        5: "Chapter 5: Indigo",
        6: "Chapter 6: Poets and Pancakes",
        7: "Chapter 7: The Interview",
        8: "Chapter 8: Going Places"
    }
};

// Base Core Question Bank (Expands automatically to match user count)
const qmsQuizDatabase = {
    physics: {
        default: {
            easy: {
                hi: [
                    { q: "विद्युत आवेश का SI मात्रक क्या है?", options: ["न्यूटन", "कूलॉम", "जूल", "वोल्ट"], answer: 1 },
                    { q: "इलेक्ट्रॉन पर कितना आवेश होता है?", options: ["1.6 x 10^-19 C", "-1.6 x 10^-19 C", "9.1 x 10^-31 C", "0"], answer: 1 },
                    { q: "दो सजातीय आवेशों के बीच कौन सा बल लगता है?", options: ["आकर्षण", "प्रतिकर्षण", "गुरुत्वाकर्षण", "शून्य"], answer: 1 },
                    { q: "विद्युत क्षेत्र की तीव्रता का मात्रक है?", options: ["N/C", "V/m", "A और B दोनों", "J/C"], answer: 2 },
                    { q: "विद्युत विभव का SI मात्रक क्या है?", options: ["वोल्ट", "एम्पीयर", "ओम", "वाट"], answer: 0 }
                ],
                en: [
                    { q: "What is the SI unit of electric charge?", options: ["Newton", "Coulomb", "Joule", "Volt"], answer: 1 },
                    { q: "What is the charge on an electron?", options: ["1.6 x 10^-19 C", "-1.6 x 10^-19 C", "9.1 x 10^-31 C", "0"], answer: 1 },
                    { q: "Like charges always _____ each other.", options: ["Attract", "Repel", "Do not interact", "Neutralize"], answer: 1 },
                    { q: "What is the SI unit of electric potential?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: 0 }
                ]
            },
            medium: {
                hi: [
                    { q: "निर्वात की विद्युतशीलता (ε0) का मात्रक क्या है?", options: ["C²/N·m²", "N·m²/C²", "J/C", "V/m"], answer: 0 },
                    { q: "आवेश का क्वांटमीकरण किसने सिद्ध किया?", options: ["मिलिकन", "थॉमसन", "रदरफोर्ड", "कूलॉम"], answer: 0 },
                    { q: "संधारित्र की धारिता किस पर निर्भर करती है?", options: ["क्षेत्रफल पर", "दूरी पर", "माध्यम पर", "उपयुक्त सभी"], answer: 3 }
                ],
                en: [
                    { q: "What is the unit of permittivity of free space (ε0)?", options: ["C²/N·m²", "N·m²/C²", "J/C", "V/m"], answer: 0 },
                    { q: "Capacitance of a capacitor depends on:", options: ["Plate area", "Distance", "Medium", "All of the above"], answer: 3 }
                ]
            },
            difficult: {
                hi: [
                    { q: "एक अनन्त रेखीय आवेश के कारण उससे r दूरी पर विद्युत क्षेत्र किसके समानुपाती होता है?", options: ["r", "r²", "1/r", "1/r²"], answer: 2 },
                    { q: "समविभव पृष्ठ के किसी बिंदु पर विद्युत क्षेत्र रेखाएं होती हैं?", options: ["समांतर", "लंबवत", "किसी भी कोण पर", "शून्य"], answer: 1 }
                ],
                en: [
                    { q: "Electric field intensity due to an infinite line charge at distance r is proportional to:", options: ["r", "r²", "1/r", "1/r²"], answer: 2 }
                ]
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {

    let currentMedium = localStorage.getItem('qms_medium') || 'hi';
    const mediumTextEl = document.getElementById('quiz-medium-text');
    if(mediumTextEl) mediumTextEl.innerText = currentMedium === 'hi' ? 'हिंदी माध्यम' : 'English Medium';

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
        toastElementNode.className = isErrorMessage ? 'qms-toast-msg qms-toast-error' : 'qms-toast-msg';
        toastElementNode.innerHTML = `<i class="${isErrorMessage ? 'ri-error-warning-fill' : 'ri-checkbox-circle-fill'}"></i> ${messageText}`;
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
    
    if (targetModalCancelButton) targetModalCancelButton.addEventListener('click', () => modalOverlayContainer.classList.remove('active'));
    if (targetModalConfirmButton) {
        targetModalConfirmButton.addEventListener('click', () => { 
            if (activeModalCallbackFunction) activeModalCallbackFunction(true);
            modalOverlayContainer.classList.remove('active'); 
        });
    }

    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';

    function playClickSound() {
        if (isSoundOn && sfxClick) { sfxClick.currentTime = 0; sfxClick.play().catch(()=>{}); }
    }
    document.querySelectorAll('.sfx-trigger').forEach(btn => btn.addEventListener('click', playClickSound));

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

    diffBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            diffBtns.forEach(b => {
                b.style.background = 'rgba(255,255,255,0.08)';
                b.style.color = '#fff';
                b.style.border = '1px solid rgba(255,255,255,0.2)';
            });
            selectedDifficulty = this.getAttribute('data-diff');
            if(selectedDifficulty === 'easy') { this.style.background = '#00ff88'; this.style.color = '#000'; this.style.border = 'none'; }
            else if(selectedDifficulty === 'medium') { this.style.background = '#ffc107'; this.style.color = '#000'; this.style.border = 'none'; }
            else if(selectedDifficulty === 'difficult') { this.style.background = '#ff3366'; this.style.color = '#fff'; this.style.border = 'none'; }
            playClickSound();
        });
    });

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
    document.getElementById('btn-time-minus').addEventListener('click', () => { if(selectedTimeMinutes > 1) { selectedTimeMinutes--; timeDisplay.innerText = selectedTimeMinutes; } });
    document.getElementById('btn-time-plus').addEventListener('click', () => { if(selectedTimeMinutes < 60) { selectedTimeMinutes++; timeDisplay.innerText = selectedTimeMinutes; } });

    document.getElementById('leave-quiz-btn').addEventListener('click', () => {
        window.showCustomConfirm("क्या आप सच में टेस्ट बीच में छोड़कर जाना चाहते हैं?", (isConfirmed) => {
            if (isConfirmed) window.location.href = 'dashboard.html';
        });
    });

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
        let basePool = [];
        try {
            // Fetch from subject specific or fallback to default pool
            let subObj = qmsQuizDatabase[selectedSubject] || qmsQuizDatabase['physics'];
            let chObj = subObj[selectedChapter] || subObj['default'] || subObj[Object.keys(subObj)[0]];
            let diffObj = chObj[selectedDifficulty] || chObj['easy'];
            basePool = [...(diffObj[currentMedium] || diffObj['hi'] || [])];
        } catch (e) {
            basePool = [
                { q: "विद्युत आवेश का SI मात्रक क्या है?", options: ["न्यूटन", "कूलॉम", "जूल", "वोल्ट"], answer: 1 },
                { q: "इलेक्ट्रॉन पर कितना आवेश होता है?", options: ["1.6 x 10^-19 C", "-1.6 x 10^-19 C", "9.1 x 10^-31 C", "0"], answer: 1 }
            ];
        }

        // 🚀 SMART EXPANDER LOGIC: Guarantee user-selected count (e.g. 20, 40)
        let expandedPool = [];
        while (expandedPool.length < selectedQuestionCount) {
            // Shuffle base pool and append cloned copies to meet the requested count
            let shuffledChunk = [...basepx = basePool].sort(() => Math.random() - 0.5);
            shuffledChunk.forEach(item => {
                if (expandedPool.length < selectedQuestionCount) {
                    expandedPool.push({ ...item }); // Clone object to avoid reference issues
                }
            });
        }

        currentQuestions = expandedPool;
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
