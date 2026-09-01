/* =========================================================================
   QMS ADVANCED DYNAMIC QUIZ ENGINE
   - Features: URL Parameter Detection, Firestore Fetching, Random Question Selection (No Repeats),
     Anti-Cheat System (Answers hidden in JS closure), XP Cloud Syncing via increment.
========================================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase Configuration (QMS Project)
const firebaseConfig = {
    apiKey: "AIzaSyBCkxx9bVjvAYarA0WrHfW5k_gxwUPZaaw",
    authDomain: "quantum-master-study.firebaseapp.com",
    projectId: "quantum-master-study",
    storageBucket: "quantum-master-study.firebasestorage.app",
    messagingSenderId: "193145760847",
    appId: "1:193145760847:web:7d1f77be123c3edb104e3a",
    measurementId: "G-SH39JL930R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 1. URL से सब्जेक्ट और चैप्टर का नाम निकालना (उदा: ?subject=physics&chapter=1)
const urlParams = new URLSearchParams(window.location.search);
const urlSubject = urlParams.get('subject') || 'general'; // Default अगर URL में कुछ न हो
const urlChapter = urlParams.get('chapter') || '1';

const quizDocumentId = `${urlSubject}_ch${urlChapter}`; // जैसे: physics_ch1
const uid = localStorage.getItem('qms_user_uid');

// DOM Elements
const loadingBox = document.getElementById('loading-box');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const quizHeaderTitle = document.getElementById('quiz-header-title');
const questionText = document.getElementById('question-text');
const optionsBox = document.getElementById('options-box');
const nextBtn = document.getElementById('next-btn');
const qCounter = document.getElementById('q-counter');
const timerDisplay = document.getElementById('timer-display');
const finalScoreText = document.getElementById('final-score-text');
const xpEarnedText = document.getElementById('xp-earned-text');

// State Variables
let totalQuestionsForThisTest = 20; // एक बार में कितने सवाल पूछने हैं?
let currentTestQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let canAnswer = true;
let timerInterval;
let timeLeft = 30;

// Fisher-Yates Shuffle Algorithm (ताकि सवाल कभी रिपीट न हों)
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

document.addEventListener('DOMContentLoaded', async () => {
    if (!uid) {
        alert("कृपया पहले लॉगिन करें!");
        window.location.href = 'index.html';
        return;
    }

    // UI Title Update
    quizHeaderTitle.innerText = `${urlSubject} - Chapter ${urlChapter}`;

    try {
        // 🔥 फायरबेस से 1000 सवालों का पूरा बंडल मंगाना
        const docRef = doc(db, "quizzes", quizDocumentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const allQuestions = docSnap.data().questionsArray; // मान लो 1500 सवाल हैं
            
            // चीटिंग-प्रूफ रैंडम सिस्टम: 1500 में से कोई भी 20 सवाल छांटना!
            const shuffledPool = shuffleArray([...allQuestions]);
            currentTestQuestions = shuffledPool.slice(0, totalQuestionsForThisTest);
            
            // अगर डेटाबेस में 20 से कम सवाल हैं, तो जितने हैं उतने ही पूछेंगे
            totalQuestionsForThisTest = currentTestQuestions.length;

            startQuiz();
        } else {
            // अगर डेटाबेस में इस चैप्टर के सवाल अभी नहीं डाले गए हैं
            loadingBox.innerHTML = `
                <i class="ri-error-warning-fill" style="font-size: 3rem; color: #ffc107; display: block; margin-bottom: 15px;"></i>
                <h3 style="color: #fff;">क्षमा करें!</h3>
                <p style="color: #8b96a8; margin-top: 10px;">${urlSubject} के चैप्टर ${urlChapter} के प्रश्न जल्द ही जोड़े जाएंगे।</p>
                <button class="back-btn" style="margin: 20px auto; background: var(--accent-cyan); color: #000;" onclick="window.location.href='dashboard.html'">वापस जाएँ</button>
            `;
        }
    } catch (error) {
        console.error("Error fetching quiz:", error);
        loadingBox.innerHTML = `<h3 style="color: #ff4d4d;">सर्वर से जुड़ने में एरर। इंटरनेट चेक करें।</h3>`;
    }
});

function startQuiz() {
    loadingBox.style.display = 'none';
    quizBox.style.display = 'block';
    loadNextQuestion();
}

function loadNextQuestion() {
    // Reset state
    clearInterval(timerInterval);
    timeLeft = 30;
    timerDisplay.innerText = timeLeft;
    timerDisplay.style.color = "var(--accent-cyan)";
    canAnswer = true;
    nextBtn.style.display = 'none';
    optionsBox.innerHTML = '';

    const currentQData = currentTestQuestions[currentQuestionIndex];
    qCounter.innerText = `प्रश्न ${currentQuestionIndex + 1} / ${totalQuestionsForThisTest}`;
    questionText.innerText = currentQData.question;

    // ऑप्शंस बनाना
    currentQData.options.forEach((optText, index) => {
        const btn = document.createElement('div');
        btn.className = 'option-btn';
        
        // ABCD लेटर लगाना
        const letter = String.fromCharCode(65 + index); // 0=A, 1=B, etc.
        btn.innerHTML = `<span style="background: rgba(255,255,255,0.1); width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 8px; font-weight: bold;">${letter}</span> ${optText}`;
        
        btn.onclick = () => checkAnswer(index, btn, currentQData.correctIndex);
        optionsBox.appendChild(btn);
    });

    // टाइमर स्टार्ट करना
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if(timeLeft <= 5) timerDisplay.style.color = "#ff4d4d"; // 5 सेकंड में लाल
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            canAnswer = false;
            autoRevealAnswer(currentQData.correctIndex);
        }
    }, 1000);
}

function checkAnswer(selectedIndex, btnElement, correctIndex) {
    if (!canAnswer) return;
    canAnswer = false;
    clearInterval(timerInterval);

    const allOptionBtns = optionsBox.children;

    if (selectedIndex === correctIndex) {
        btnElement.classList.add('correct');
        score++;
    } else {
        btnElement.classList.add('wrong');
        allOptionBtns[correctIndex].classList.add('correct'); // सही वाला हरा कर दो
    }

    nextBtn.style.display = 'block';
}

function autoRevealAnswer(correctIndex) {
    const allOptionBtns = optionsBox.children;
    allOptionBtns[correctIndex].classList.add('correct');
    nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestionsForThisTest) {
        loadNextQuestion();
    } else {
        showResultsAndSaveXP();
    }
});

async function showResultsAndSaveXP() {
    quizBox.style.display = 'none';
    resultBox.style.display = 'block';
    
    finalScoreText.innerText = `${score} / ${totalQuestionsForThisTest}`;
    
    // हर सही जवाब पर 10 XP मिलेगा
    const earnedXp = score * 10;
    
    if (earnedXp > 0) {
        xpEarnedText.innerText = `+${earnedXp} XP क्लाउड में सेव हो रहा है...`;
        
        try {
            // 🔥 जादू: Firestore में यूजर का XP सुरक्षित तरीके से अपडेट करना (पुराने XP में नया XP जोड़ना)
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, {
                totalXp: increment(earnedXp)
            });
            
            // लोकल स्टोरेज भी अपडेट कर दो ताकि डैशबोर्ड पर दिखे
            const currentLocalXp = parseInt(localStorage.getItem('qms_total_xp')) || 0;
            localStorage.setItem('qms_total_xp', currentLocalXp + earnedXp);
            
            xpEarnedText.innerText = `+${earnedXp} XP आपके अकाउंट में जुड़ गए! 🚀`;
            xpEarnedText.style.background = "rgba(0,255,136,0.2)";
        } catch (error) {
            console.error("Error saving XP:", error);
            xpEarnedText.innerText = `XP सेव करने में सर्वर एरर!`;
            xpEarnedText.style.color = "#ff4d4d";
            xpEarnedText.style.borderColor = "#ff4d4d";
        }
    } else {
        xpEarnedText.innerText = `आपने कोई XP नहीं कमाया। फिर से प्रयास करें!`;
        xpEarnedText.style.color = "#8b96a8";
        xpEarnedText.style.borderColor = "#8b96a8";
    }
}
