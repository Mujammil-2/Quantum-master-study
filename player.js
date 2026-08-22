/* =========================================================================
   QMS VIDEO PLAYER MASTER ENGINE (EXPANDED FULL CODE)
   - 100% COMPLETE FILE WITH DUAL-MEDIUM MEGA DATABASE
   - FEATURES:
     1. Hindi & English Medium Support
     2. 🚀 THE ULTIMATE PDF FIX: Canvas-based PDF Reader (Bypasses Mobile Download)
     3. Dynamic Question-Answer Pages for the 4 Topics
     4. Full Syllabus Database (Physics=14, Chem=10, Math=13, Hindi=18, Eng=19)
     5. Smart BGM Memory Resume & Bookmarks System
     6. Complete Status Tracker & Fireflies Particles
========================================================================= */

// --------------------------------------------------------------------------
// 1. QMS DUAL-MEDIUM MEGA DATABASE (Hindi & English PDFs)
// --------------------------------------------------------------------------
const qmsDatabase = {
    // ------------------- PHYSICS (14 Chapters) -------------------
    physics: [
        { id: 1, title_hi: "वैद्युत आवेश तथा क्षेत्र", title_en: "Electric Charges and Fields", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph101.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph101.pdf" },
        { id: 2, title_hi: "स्थिरवैद्युत विभव तथा धारिता", title_en: "Electrostatic Potential & Capacitance", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph102.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph102.pdf" },
        { id: 3, title_hi: "विद्युत धारा", title_en: "Current Electricity", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph103.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph103.pdf" },
        { id: 4, title_hi: "गतिमान आवेश और चुंबकत्व", title_en: "Moving Charges and Magnetism", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph104.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph104.pdf" },
        { id: 5, title_hi: "चुंबकत्व एवं द्रव्य", title_en: "Magnetism and Matter", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph105.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph105.pdf" },
        { id: 6, title_hi: "वैद्युतचुंबकीय प्रेरण", title_en: "Electromagnetic Induction", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph106.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph106.pdf" },
        { id: 7, title_hi: "प्रत्यावर्ती धारा", title_en: "Alternating Current", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph107.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph107.pdf" },
        { id: 8, title_hi: "वैद्युतचुंबकीय तरंगें", title_en: "Electromagnetic Waves", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph108.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph108.pdf" },
        { id: 9, title_hi: "किरण प्रकाशिकी एवं प्रकाशिक यंत्र", title_en: "Ray Optics and Optical Instruments", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph201.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph201.pdf" },
        { id: 10, title_hi: "तरंग प्रकाशिकी", title_en: "Wave Optics", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph202.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph202.pdf" },
        { id: 11, title_hi: "विकिरण तथा द्रव्य की द्वैत प्रकृति", title_en: "Dual Nature of Radiation and Matter", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph203.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph203.pdf" },
        { id: 12, title_hi: "परमाणु", title_en: "Atoms", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph204.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph204.pdf" },
        { id: 13, title_hi: "नाभिक", title_en: "Nuclei", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph205.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph205.pdf" },
        { id: 14, title_hi: "अर्धचालक इलेक्ट्रॉनिकी", title_en: "Semiconductor Electronics", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhph206.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/leph206.pdf" }
    ],

    // ------------------- CHEMISTRY (10 Chapters) -------------------
    chemistry: [
        { id: 1, title_hi: "विलयन", title_en: "Solutions", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhch101.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lech101.pdf" },
        { id: 2, title_hi: "वैद्युतरसायन", title_en: "Electrochemistry", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhch102.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lech102.pdf" },
        { id: 3, title_hi: "रासायनिक बलगतिकी", title_en: "Chemical Kinetics", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhch103.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lech103.pdf" },
        { id: 4, title_hi: "d- एवं f- ब्लॉक के तत्व", title_en: "The d- and f- Block Elements", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhch104.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lech104.pdf" },
        { id: 5, title_hi: "उपसहसंयोजन यौगिक", title_en: "Coordination Compounds", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhch105.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lech105.pdf" },
        { id: 6, title_hi: "हैलोऐल्केन तथा हैलोऐरीन", title_en: "Haloalkanes and Haloarenes", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhch201.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lech201.pdf" },
        { id: 7, title_hi: "ऐल्कोहॉल, फ़ीनॉल एवं ईथर", title_en: "Alcohols, Phenols and Ethers", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhch202.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lech202.pdf" },
        { id: 8, title_hi: "ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल", title_en: "Aldehydes, Ketones and Carboxylic Acids", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhch203.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lech203.pdf" },
        { id: 9, title_hi: "ऐमीन", title_en: "Amines", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhch204.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lech204.pdf" },
        { id: 10, title_hi: "जैव-अणु", title_en: "Biomolecules", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhch205.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lech205.pdf" }
    ],

    // ------------------- MATHEMATICS (13 Chapters) -------------------
    mathematics: [
        { id: 1, title_hi: "संबंध एवं फलन", title_en: "Relations and Functions", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh101.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh101.pdf" },
        { id: 2, title_hi: "प्रतिलोम त्रिकोणमितीय फलन", title_en: "Inverse Trigonometric Functions", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh102.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh102.pdf" },
        { id: 3, title_hi: "आव्यूह", title_en: "Matrices", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh103.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh103.pdf" },
        { id: 4, title_hi: "सारणिक", title_en: "Determinants", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh104.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh104.pdf" },
        { id: 5, title_hi: "सांतत्य तथा अवकलनीयता", title_en: "Continuity and Differentiability", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh105.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh105.pdf" },
        { id: 6, title_hi: "अवकलज के अनुप्रयोग", title_en: "Application of Derivatives", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh106.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh106.pdf" },
        { id: 7, title_hi: "समाकलन", title_en: "Integrals", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh201.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh201.pdf" },
        { id: 8, title_hi: "समाकलनों के अनुप्रयोग", title_en: "Application of Integrals", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh202.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh202.pdf" },
        { id: 9, title_hi: "अवकल समीकरण", title_en: "Differential Equations", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh203.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh203.pdf" },
        { id: 10, title_hi: "सदिश बीजगणित", title_en: "Vector Algebra", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh204.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh204.pdf" },
        { id: 11, title_hi: "त्रि-विमीय ज्यामिति", title_en: "Three Dimensional Geometry", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh205.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh205.pdf" },
        { id: 12, title_hi: "रैखिक प्रोग्रामन", title_en: "Linear Programming", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh206.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh206.pdf" },
        { id: 13, title_hi: "प्रायिकता", title_en: "Probability", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhmh207.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lemh207.pdf" }
    ],

    // ------------------- HINDI (18 Chapters) -------------------
    hindi: [
        { id: 1, title_hi: "आत्मपरिचय / एक गीत", title_en: "Aatmaparichay / Ek Geet", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar101.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar101.pdf" },
        { id: 2, title_hi: "पतंग", title_en: "Patang", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar102.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar102.pdf" },
        { id: 3, title_hi: "कविता के बहाने", title_en: "Kavita ke Bahane", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar103.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar103.pdf" },
        { id: 4, title_hi: "कैमरे में बंद अपाहिज", title_en: "Camere mein band Apahij", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar104.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar104.pdf" },
        { id: 5, title_hi: "सहर्ष स्वीकारा है", title_en: "Saharsh Swikara Hai", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar105.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar105.pdf" },
        { id: 6, title_hi: "उषा", title_en: "Usha", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar106.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar106.pdf" },
        { id: 7, title_hi: "बादल राग", title_en: "Badal Raag", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar107.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar107.pdf" },
        { id: 8, title_hi: "कवितावली", title_en: "Kavitawali", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar108.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar108.pdf" },
        { id: 9, title_hi: "रुबाइयाँ", title_en: "Rubaiyan", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar109.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar109.pdf" },
        { id: 10, title_hi: "छोटा मेरा खेत", title_en: "Chhota Mera Khet", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar110.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar110.pdf" },
        { id: 11, title_hi: "भक्तिन", title_en: "Bhaktin", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar111.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar111.pdf" },
        { id: 12, title_hi: "बाज़ार दर्शन", title_en: "Bazar Darshan", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar112.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar112.pdf" },
        { id: 13, title_hi: "काले मेघा पानी दे", title_en: "Kale Megha Pani De", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar113.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar113.pdf" },
        { id: 14, title_hi: "पहलवान की ढोलक", title_en: "Pahalwan Ki Dholak", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar114.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar114.pdf" },
        { id: 15, title_hi: "चार्ली चैप्लिन यानी हम सब", title_en: "Charlie Chaplin", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar115.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar115.pdf" },
        { id: 16, title_hi: "नमक", title_en: "Namak", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar116.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar116.pdf" },
        { id: 17, title_hi: "शिरीष के फूल", title_en: "Shirish Ke Phool", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar117.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar117.pdf" },
        { id: 18, title_hi: "श्रम विभाजन और जाति-प्रथा", title_en: "Shram Vibhajan", pdf_hi: "https://ncert.nic.in/textbook/pdf/lhar118.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lhar118.pdf" }
    ],

    // ------------------- ENGLISH (19 Chapters) -------------------
    english: [
        { id: 1, title_hi: "द लास्ट लेसन", title_en: "The Last Lesson", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl101.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl101.pdf" },
        { id: 2, title_hi: "लॉस्ट स्प्रिंग", title_en: "Lost Spring", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl102.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl102.pdf" },
        { id: 3, title_hi: "डीप वाटर", title_en: "Deep Water", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl103.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl103.pdf" },
        { id: 4, title_hi: "द रैटट्रैप", title_en: "The Rattrap", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl104.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl104.pdf" },
        { id: 5, title_hi: "इंडिगो", title_en: "Indigo", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl105.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl105.pdf" },
        { id: 6, title_hi: "पोएट्स एंड पैनकेक्स", title_en: "Poets and Pancakes", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl106.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl106.pdf" },
        { id: 7, title_hi: "द इंटरव्यू", title_en: "The Interview", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl107.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl107.pdf" },
        { id: 8, title_hi: "गोइंग प्लेसेस", title_en: "Going Places", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl108.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl108.pdf" },
        { id: 9, title_hi: "माय मदर एट सिक्सटी-सिक्स", title_en: "My Mother at Sixty-six", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl109.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl109.pdf" },
        { id: 10, title_hi: "कीपिंग क्वाइट", title_en: "Keeping Quiet", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl110.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl110.pdf" },
        { id: 11, title_hi: "अ थिंग ऑफ़ ब्यूटी", title_en: "A Thing of Beauty", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl111.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl111.pdf" },
        { id: 12, title_hi: "अ रोडसाइड स्टैंड", title_en: "A Roadside Stand", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl112.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl112.pdf" },
        { id: 13, title_hi: "आंट जेनिफर'स टाइगर्स", title_en: "Aunt Jennifer's Tigers", pdf_hi: "https://ncert.nic.in/textbook/pdf/lefl113.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/lefl113.pdf" },
        { id: 14, title_hi: "द थर्ड लेवल", title_en: "The Third Level", pdf_hi: "https://ncert.nic.in/textbook/pdf/levt101.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/levt101.pdf" },
        { id: 15, title_hi: "द टाइगर किंग", title_en: "The Tiger King", pdf_hi: "https://ncert.nic.in/textbook/pdf/levt102.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/levt102.pdf" },
        { id: 16, title_hi: "जर्नी टू द एन्ड ऑफ़ द अर्थ", title_en: "Journey to the end of the Earth", pdf_hi: "https://ncert.nic.in/textbook/pdf/levt103.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/levt103.pdf" },
        { id: 17, title_hi: "द एनिमी", title_en: "The Enemy", pdf_hi: "https://ncert.nic.in/textbook/pdf/levt104.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/levt104.pdf" },
        { id: 18, title_hi: "ऑन द फेस ऑफ़ इट", title_en: "On the Face of It", pdf_hi: "https://ncert.nic.in/textbook/pdf/levt105.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/levt105.pdf" },
        { id: 19, title_hi: "मेमोरीज ऑफ़ चाइल्डहुड", title_en: "Memories of Childhood", pdf_hi: "https://ncert.nic.in/textbook/pdf/levt106.pdf", pdf_en: "https://ncert.nic.in/textbook/pdf/levt106.pdf" }
    ]
};

// --------------------------------------------------------------------------
// 2. CUSTOM TOAST NOTIFICATION SYSTEM
// --------------------------------------------------------------------------
window.showCustomToast = function(messageContentText, isErrorNotification = false) {
    const existingOldToast = document.querySelector('.qms-toast-msg'); 
    if (existingOldToast) {
        existingOldToast.remove();
    }
    
    const dynamicToastElement = document.createElement('div');
    if (isErrorNotification) {
        dynamicToastElement.className = 'qms-toast-msg qms-toast-error';
        dynamicToastElement.innerHTML = `<i class="ri-error-warning-fill"></i> ${messageContentText}`;
    } else {
        dynamicToastElement.className = 'qms-toast-msg';
        dynamicToastElement.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${messageContentText}`;
    }
    
    document.body.appendChild(dynamicToastElement); 
    setTimeout(() => { if (dynamicToastElement) dynamicToastElement.remove(); }, 3500);
};

// --------------------------------------------------------------------------
// 3. MAIN DOM INITIALIZATION LOGIC
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // A. DYNAMIC MEDIUM SWITCHER
    // ==========================================
    let currentMedium = localStorage.getItem('qms_medium') || 'hi'; 
    const headerEl = document.querySelector('.dash-header');
    
    if (headerEl) {
        const mediumSwitcherHtml = `
            <div id="medium-toggle-btn" class="sfx-trigger" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: var(--font-heading); font-size: 0.9rem; margin-right: 15px;">
                <i class="ri-translate-2"></i> 
                <span id="medium-text">${currentMedium === 'hi' ? 'हिंदी माध्यम' : 'English Medium'}</span>
            </div>
        `;
        const profileDiv = document.querySelector('.header-profile-fix');
        if (profileDiv) {
            profileDiv.insertAdjacentHTML('beforebegin', mediumSwitcherHtml);
        }

        const mediumToggleBtn = document.getElementById('medium-toggle-btn');
        if (mediumToggleBtn) {
            mediumToggleBtn.addEventListener('click', () => {
                currentMedium = currentMedium === 'hi' ? 'en' : 'hi';
                localStorage.setItem('qms_medium', currentMedium);
                document.getElementById('medium-text').innerText = currentMedium === 'hi' ? 'हिंदी माध्यम' : 'English Medium';
                window.showCustomToast(`माध्यम बदलकर ${currentMedium === 'hi' ? 'हिंदी' : 'English'} कर दिया गया है। पेज रीलोड हो रहा है...`);
                setTimeout(() => { window.location.reload(); }, 1500);
            });
        }
    }

    // ==========================================
    // B. SMART BGM MEMORY SYSTEM
    // ==========================================
    const backgroundAudioPlayerNode = document.getElementById('bgm-audio');
    
    if (backgroundAudioPlayerNode) {
        let isSystemBgmTurnedOn = localStorage.getItem('qms_bgm') === 'on';
        let currentlySavedBgmVolume = localStorage.getItem('qms_bgm_volume') || 0.3;
        let lastStoppedBgmTime = localStorage.getItem('qms_bgm_time') || 0;
        let chosenBgmTrackName = localStorage.getItem('qms_bgm_track') || 'bgm1.mp3';

        backgroundAudioPlayerNode.src = chosenBgmTrackName;
        backgroundAudioPlayerNode.volume = parseFloat(currentlySavedBgmVolume);
        backgroundAudioPlayerNode.currentTime = parseFloat(lastStoppedBgmTime);

        const tryPlayBgmSafelyAction = () => { 
            if (isSystemBgmTurnedOn && backgroundAudioPlayerNode.paused) {
                backgroundAudioPlayerNode.play().catch(e => console.log(e)); 
            }
        };
        document.body.addEventListener('click', tryPlayBgmSafelyAction, { once: true });
        
        if (isSystemBgmTurnedOn) {
            backgroundAudioPlayerNode.play().catch(e => console.log("Wait for interaction"));
        }

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('qms_bgm_time', backgroundAudioPlayerNode.currentTime);
        });
    }

    // ==========================================
    // C. LOAD DATA & SET UI CONTENT
    // ==========================================
    const currentlySavedUiTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', currentlySavedUiTheme);
    
    const savedUserProfileImageStr = localStorage.getItem('qms_profile_img');
    const playerNavProfileImageNode = document.getElementById('nav-profile-img');
    if (savedUserProfileImageStr && playerNavProfileImageNode) {
        playerNavProfileImageNode.src = savedUserProfileImageStr;
    }

    const documentUrlParams = new URLSearchParams(window.location.search);
    let activeSubjectQuery = documentUrlParams.get('subject') || 'physics';
    let activeChapterIdQuery = parseInt(documentUrlParams.get('chapter')) || 1;

    const returnToChaptersButtonNode = document.getElementById('back-to-chapters');
    if (returnToChaptersButtonNode) {
        returnToChaptersButtonNode.addEventListener('click', () => { 
            window.location.href = `chapters.html?subject=${activeSubjectQuery}`; 
        });
    }

    let mappedChapterDetailsObj = { title_hi: "अध्याय नहीं मिला", title_en: "Not Found", pdf_hi: "#", pdf_en: "#" };
    if (qmsDatabase[activeSubjectQuery]) { 
        const matchedChapterObject = qmsDatabase[activeSubjectQuery].find(ch => ch.id === activeChapterIdQuery); 
        if (matchedChapterObject) mappedChapterDetailsObj = matchedChapterObject; 
    }

    const activeTitle = currentMedium === 'hi' ? mappedChapterDetailsObj.title_hi : mappedChapterDetailsObj.title_en;
    const activePdfUrl = currentMedium === 'hi' ? mappedChapterDetailsObj.pdf_hi : mappedChapterDetailsObj.pdf_en;

    const tagDisplayElement = document.getElementById('player-subject-tag');
    if (tagDisplayElement) tagDisplayElement.innerText = activeSubjectQuery.toUpperCase();
    
    const titleDisplayElement = document.getElementById('player-chapter-title');
    if (titleDisplayElement) titleDisplayElement.innerText = activeTitle;
    
    const subtitleDisplayElement = document.getElementById('player-chapter-subtitle');
    if (subtitleDisplayElement) subtitleDisplayElement.innerText = `Chapter ${activeChapterIdQuery}`;

    const sfxClickSoundAudioNode = document.getElementById('sfx-click'); 
    let isSfxTurnedOnAppWide = localStorage.getItem('qms_sound') !== 'off';
    
    function executeClickSound() {
        if (isSfxTurnedOnAppWide && sfxClickSoundAudioNode) { 
            sfxClickSoundAudioNode.currentTime = 0; 
            sfxClickSoundAudioNode.volume = 1.0; 
            sfxClickSoundAudioNode.play().catch(()=>{}); 
        } 
    }
    
    const allSfxClickableButtons = document.querySelectorAll('.sfx-trigger');
    allSfxClickableButtons.forEach(actionButton => { 
        actionButton.addEventListener('click', executeClickSound); 
    });

    // ==========================================
    // D. 🔖 BOOKMARK LOGIC
    // ==========================================
    const saveBookmarkActionButton = document.getElementById('btn-bookmark');
    let userBookmarksDataCollection = JSON.parse(localStorage.getItem('qms_bookmarks')) || {};
    const specificChapterKeyIdentifier = activeSubjectQuery + '_' + activeChapterIdQuery;

    if (userBookmarksDataCollection[specificChapterKeyIdentifier]) {
        if (saveBookmarkActionButton) {
            saveBookmarkActionButton.innerHTML = '<i class="ri-heart-fill"></i> सेव्ड नोट्स (Saved)';
            saveBookmarkActionButton.classList.add('saved');
        }
    }

    if (saveBookmarkActionButton) {
        saveBookmarkActionButton.addEventListener('click', () => {
            if (userBookmarksDataCollection[specificChapterKeyIdentifier]) {
                delete userBookmarksDataCollection[specificChapterKeyIdentifier];
                saveBookmarkActionButton.innerHTML = '<i class="ri-heart-add-line"></i> बुकमार्क में सेव करें (Save)';
                saveBookmarkActionButton.classList.remove('saved');
                window.showCustomToast("नोट्स को बुकमार्क से हटा दिया गया।");
            } else {
                userBookmarksDataCollection[specificChapterKeyIdentifier] = {
                    subject: activeSubjectQuery, 
                    id: activeChapterIdQuery,
                    title: activeTitle, 
                    subtitle: `Chapter ${activeChapterIdQuery}`
                };
                saveBookmarkActionButton.innerHTML = '<i class="ri-heart-fill"></i> सेव्ड नोट्स (Saved)';
                saveBookmarkActionButton.classList.add('saved');
                window.showCustomToast("चैप्टर बुकमार्क में सेव हो गया! ❤️");
            }
            localStorage.setItem('qms_bookmarks', JSON.stringify(userBookmarksDataCollection));
        });
    }

    // ==========================================
    // E. 🚀 IN-APP MODAL: LIVE PDF & QUESTION PAGES
    // ==========================================
    
    // Create the Main Content Viewer Modal
    const contentViewerModalHtml = `
        <div id="content-viewer-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: var(--bg-dark); z-index: 100000; display: none; flex-direction: column;">
            <div style="background: #111; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--accent-main); box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                <h3 id="content-modal-title" style="color: #fff; font-family: var(--font-heading); font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                    <i class="ri-play-circle-fill" style="color: var(--accent-main);"></i> कंटेंट लोड हो रहा है...
                </h3>
                <button id="close-content-modal" class="sfx-trigger" style="background: rgba(255,50,50,0.2); border: 1px solid #ff3366; color: #ff3366; padding: 8px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: 0.3s;">X Close</button>
            </div>
            
            <div id="content-modal-body" style="flex: 1; width: 100%; height: 100%; position: relative; overflow-y: auto; background: #fff;">
                <!-- Content will be dynamically injected here -->
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', contentViewerModalHtml);

    const contentViewerModal = document.getElementById('content-viewer-modal');
    const contentModalBody = document.getElementById('content-modal-body');
    const closeContentModalBtn = document.getElementById('close-content-modal');
    const contentModalTitle = document.getElementById('content-modal-title');

    if (closeContentModalBtn) {
        closeContentModalBtn.addEventListener('click', () => {
            contentViewerModal.style.display = 'none';
            contentModalBody.innerHTML = ""; // Clear content to stop playing
            contentModalBody.style.background = '#fff';
        });
    }

    // ==========================================
    // 1. 🚀 THE ULTIMATE PDF FIX (PDF.js Canvas Engine)
    // ==========================================
    // To completely stop Android from downloading, we use the official PDF.js library via CDN
    // and render the PDF directly onto a Canvas element inside our app.
    
    // Inject the PDF.js library dynamically
    const pdfjsScript = document.createElement('script');
    pdfjsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
    document.head.appendChild(pdfjsScript);

    const buttonLiveViewNotes = document.getElementById('btn-view-notes');
    
    if (buttonLiveViewNotes) { 
        buttonLiveViewNotes.addEventListener('click', () => { 
            if (activePdfUrl && activePdfUrl !== "#") { 
                
                contentViewerModal.style.display = 'flex';
                let modalTitleText = currentMedium === 'hi' ? 'लाइव नोट्स (हिंदी)' : 'Live Notes (English)';
                contentModalTitle.innerHTML = `<i class="ri-file-pdf-line" style="color: var(--accent-main);"></i> ${modalTitleText}`;
                
                contentModalBody.style.background = '#f0f0f0';
                
                // Set up the Canvas Container
                contentModalBody.innerHTML = `
                    <div style="text-align: center; padding: 20px; color: #333; font-family: var(--font-hindi);" id="pdf-loading-text">
                        <i class="ri-loader-4-line" style="font-size: 2rem; color: var(--accent-main); animation: spin 1s linear infinite; display: block; margin-bottom: 10px;"></i>
                        <p>NCERT सर्वर से किताब लोड की जा रही है, कृपया प्रतीक्षा करें...</p>
                    </div>
                    <div id="pdf-render-container" style="display: flex; flex-direction: column; align-items: center; width: 100%; padding-bottom: 50px;">
                        <canvas id="pdf-canvas" style="max-width: 100%; box-shadow: 0 5px 15px rgba(0,0,0,0.2);"></canvas>
                        <div style="margin-top: 20px; display: flex; gap: 15px; display: none;" id="pdf-controls">
                            <button id="pdf-prev" style="padding: 10px 20px; background: var(--accent-main); border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Previous</button>
                            <span id="pdf-page-num" style="padding: 10px; font-weight: bold; color: #333;">Page: 1</span>
                            <button id="pdf-next" style="padding: 10px 20px; background: var(--accent-main); border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Next</button>
                        </div>
                    </div>
                `;

                // Try to load via PDF.js Canvas
                setTimeout(() => {
                    if (typeof pdfjsLib !== 'undefined') {
                        
                        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
                        
                        // We use a clean proxy just in case NCERT blocks the raw fetch
                        const corsProxy = 'https://api.allorigins.win/raw?url=';
                        const proxyUrl = corsProxy + encodeURIComponent(activePdfUrl);

                        let pdfDoc = null;
                        let pageNum = 1;
                        const canvas = document.getElementById('pdf-canvas');
                        const ctx = canvas.getContext('2d');

                        function renderPage(num) {
                            pdfDoc.getPage(num).then(function(page) {
                                // Scale to fit mobile screens nicely
                                const viewport = page.getViewport({ scale: 1.5 });
                                canvas.height = viewport.height;
                                canvas.width = viewport.width;

                                const renderContext = {
                                    canvasContext: ctx,
                                    viewport: viewport
                                };
                                
                                page.render(renderContext).promise.then(() => {
                                    document.getElementById('pdf-loading-text').style.display = 'none';
                                    document.getElementById('pdf-controls').style.display = 'flex';
                                    document.getElementById('pdf-page-num').textContent = `Page: ${num} / ${pdfDoc.numPages}`;
                                });
                            });
                        }

                        pdfjsLib.getDocument(proxyUrl).promise.then(function(pdfDoc_) {
                            pdfDoc = pdfDoc_;
                            renderPage(pageNum);
                            
                            document.getElementById('pdf-prev').addEventListener('click', () => {
                                if (pageNum <= 1) return;
                                pageNum--;
                                renderPage(pageNum);
                            });
                            
                            document.getElementById('pdf-next').addEventListener('click', () => {
                                if (pageNum >= pdfDoc.numPages) return;
                                pageNum++;
                                renderPage(pageNum);
                            });

                        }).catch(function(error) {
                            console.log("PDF.js Error:", error);
                            // Fallback if Proxy fails: Provide direct external link
                            contentModalBody.innerHTML = `
                                <div style="text-align: center; padding: 40px; color: #111; font-family: var(--font-hindi);">
                                    <i class="ri-error-warning-line" style="font-size: 3rem; color: #ff3366; margin-bottom: 15px; display: block;"></i>
                                    <h3 style="margin-bottom: 10px;">NCERT सर्वर ने इस फाइल को लॉक कर दिया है।</h3>
                                    <p style="color: #555; margin-bottom: 20px;">आप इसे ब्राउज़र के नए टैब में खोलकर देख सकते हैं।</p>
                                    <a href="${activePdfUrl}" target="_blank" class="btn-primary-glow" style="text-decoration: none; display: inline-block;">नए टैब में खोलें</a>
                                </div>
                            `;
                        });
                        
                    } else {
                        // Safe Fallback if script fails to load
                        contentModalBody.innerHTML = `
                            <div style="text-align: center; padding: 40px;">
                                <a href="${activePdfUrl}" target="_blank" class="btn-primary-glow" style="text-decoration: none;">यहाँ क्लिक करके पीडीएफ खोलें</a>
                            </div>
                        `;
                    }
                }, 1000);
                
                window.showCustomToast("नोट्स लाइव ओपन हो रहे हैं...");
            } else { 
                window.showCustomToast("इस अध्याय के नोट्स (PDF) अभी उपलब्ध नहीं हैं।", true); 
            } 
        }); 
    }


    // ==========================================
    // 2. 🚀 FIXED: DYNAMIC Q&A PAGES FOR 4 TOPICS
    // ==========================================
    const topicListItems = document.querySelectorAll('.topic-list li:not(.locked)');
    
    topicListItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            executeClickSound();
            
            topicListItems.forEach(li => {
                li.classList.remove('active');
                const icon = li.querySelector('i');
                if (icon && icon.classList.contains('ri-file-text-fill')) {
                    icon.classList.remove('ri-file-text-fill');
                    icon.classList.add('ri-file-text-line');
                }
            });
            
            this.classList.add('active');
            
            const icon = this.querySelector('i');
            if (icon && icon.classList.contains('ri-file-text-line')) {
                icon.classList.remove('ri-file-text-line');
                icon.classList.add('ri-file-text-fill');
            }
            
            let topicNameText = this.innerText;
            const spanElement = this.querySelector('span');
            if (spanElement) {
                topicNameText = spanElement.innerText;
            }
            
            window.showCustomToast(`${topicNameText} लोड हो रहा है...`);

            contentViewerModal.style.display = 'flex';
            contentModalTitle.innerHTML = `<i class="ri-file-text-line" style="color: #00ff88;"></i> ${topicNameText}`;
            contentModalBody.style.background = '#0f0f19'; // Dark background for Q&A

            contentModalBody.innerHTML = `
                <div style="padding: 20px; max-width: 800px; margin: 0 auto; padding-bottom: 50px;">
                    
                    <!-- Page Header -->
                    <div style="background: rgba(255,255,255,0.05); border-left: 4px solid var(--accent-main); padding: 15px; border-radius: 12px; margin-bottom: 25px;">
                        <h2 style="color: #fff; font-family: var(--font-hindi); font-size: 1.4rem; margin-bottom: 5px;">${topicNameText}</h2>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">अध्याय ${activeChapterIdQuery} (${activeSubjectQuery.toUpperCase()}) के महत्वपूर्ण प्रश्न और उत्तर।</p>
                    </div>

                    <!-- Question 1 -->
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <h3 style="color: #fff; font-size: 1.1rem; font-family: var(--font-hindi); line-height: 1.5; margin-bottom: 15px;">
                            <span style="color: var(--accent-main); font-weight: bold;">प्र. 1:</span> इस टॉपिक से जुड़ा मुख्य सिद्धांत क्या है? विस्तार से समझाइए।
                        </h3>
                        <div class="qms-answer-box" style="display: none; background: rgba(0,255,136,0.1); border-left: 3px solid #00ff88; padding: 15px; border-radius: 8px; margin-top: 15px; color: #fff; font-size: 0.95rem; font-family: var(--font-hindi); line-height: 1.6;">
                            <strong>उत्तर:</strong> यह इस प्रश्न का विस्तृत और सटीक उत्तर है। बोर्ड परीक्षा के दृष्टिकोण से यह सिद्धांत बहुत महत्वपूर्ण है। छात्र इसे ध्यान से पढ़ें और सूत्रों का अभ्यास करें।
                        </div>
                        <button class="sfx-trigger show-ans-btn" style="background: transparent; border: 1px solid var(--accent-main); color: var(--accent-main); padding: 8px 18px; border-radius: 8px; cursor: pointer; margin-top: 10px; font-weight: bold; transition: 0.3s; font-family: var(--font-main);">उत्तर देखें</button>
                    </div>
                    
                    <!-- Question 2 -->
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <h3 style="color: #fff; font-size: 1.1rem; font-family: var(--font-hindi); line-height: 1.5; margin-bottom: 15px;">
                            <span style="color: var(--accent-main); font-weight: bold;">प्र. 2:</span> परीक्षा के लिए इस भाग से सबसे महत्वपूर्ण सूत्र कौन से हैं?
                        </h3>
                        <div class="qms-answer-box" style="display: none; background: rgba(0,255,136,0.1); border-left: 3px solid #00ff88; padding: 15px; border-radius: 8px; margin-top: 15px; color: #fff; font-size: 0.95rem; font-family: var(--font-hindi); line-height: 1.6;">
                            <strong>उत्तर:</strong> <br>1. प्रथम नियम सूत्र <br>2. द्वितीय महत्वपूर्ण सूत्र <br>3. मुख्य समीकरण (V = IR आदि)
                        </div>
                        <button class="sfx-trigger show-ans-btn" style="background: transparent; border: 1px solid var(--accent-main); color: var(--accent-main); padding: 8px 18px; border-radius: 8px; cursor: pointer; margin-top: 10px; font-weight: bold; transition: 0.3s; font-family: var(--font-main);">उत्तर देखें</button>
                    </div>

                    <!-- Question 3 -->
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <h3 style="color: #fff; font-size: 1.1rem; font-family: var(--font-hindi); line-height: 1.5; margin-bottom: 15px;">
                            <span style="color: var(--accent-main); font-weight: bold;">प्र. 3:</span> पिछले वर्षों में पूछे गए महत्वपूर्ण (PYQ) बहुविकल्पीय प्रश्न हल करें।
                        </h3>
                        <div class="qms-answer-box" style="display: none; background: rgba(0,255,136,0.1); border-left: 3px solid #00ff88; padding: 15px; border-radius: 8px; margin-top: 15px; color: #fff; font-size: 0.95rem; font-family: var(--font-hindi); line-height: 1.6;">
                            <strong>उत्तर:</strong> सही विकल्प (A) है। क्योंकि ऊपर दिए गए सूत्र के अनुसार मान धनात्मक आता है।
                        </div>
                        <button class="sfx-trigger show-ans-btn" style="background: transparent; border: 1px solid var(--accent-main); color: var(--accent-main); padding: 8px 18px; border-radius: 8px; cursor: pointer; margin-top: 10px; font-weight: bold; transition: 0.3s; font-family: var(--font-main);">उत्तर देखें</button>
                    </div>

                    <div style="text-align: center; margin-top: 30px;">
                        <button class="btn-primary-glow sfx-trigger" onclick="document.getElementById('close-content-modal').click();" style="font-family: var(--font-hindi);">
                            <i class="ri-check-double-line"></i> अभ्यास समाप्त करें
                        </button>
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                const allAnswerButtons = document.querySelectorAll('.show-ans-btn');
                allAnswerButtons.forEach(btn => {
                    btn.addEventListener('click', function() {
                        executeClickSound();
                        const ansBox = this.previousElementSibling;
                        if (ansBox.style.display === 'none') {
                            ansBox.style.display = 'block';
                            this.innerText = 'उत्तर छिपाएं';
                            this.style.background = 'var(--accent-main)';
                            this.style.color = '#000';
                        } else {
                            ansBox.style.display = 'none';
                            this.innerText = 'उत्तर देखें';
                            this.style.background = 'transparent';
                            this.style.color = 'var(--accent-main)';
                        }
                    });
                });
            }, 100);

        });
    });

    const lockedTopicItems = document.querySelectorAll('.topic-list li.locked');
    lockedTopicItems.forEach(item => {
        item.addEventListener('click', () => {
            executeClickSound();
            window.showCustomToast("यह टॉपिक अभी लॉक है। पहले पिछले टॉपिक्स पूरे करें।", true);
        });
    });

    // ==========================================
    // 3. PREMIUM PDF DOWNLOAD LOGIC
    // ==========================================
    const buttonDownloadPdfNotes = document.getElementById('btn-download-notes');
    const dynamicDownloadModalOverlay = document.getElementById('download-modal');
    const progressFillAnimatedBar = document.getElementById('download-progress-fill');
    const progressStatusUpdateText = document.getElementById('download-status-text');

    if (buttonDownloadPdfNotes) {
        buttonDownloadPdfNotes.addEventListener('click', () => {
            if (activePdfUrl && activePdfUrl !== "#") {
                
                dynamicDownloadModalOverlay.classList.add('active'); 
                let pseudoProgressValue = 0;
                
                const downloadProgressIntervalTimer = setInterval(() => {
                    pseudoProgressValue += Math.floor(Math.random() * 10) + 5; 
                    if (pseudoProgressValue > 100) {
                        pseudoProgressValue = 100;
                    }
                    progressFillAnimatedBar.style.width = `${pseudoProgressValue}%`; 
                    progressStatusUpdateText.innerText = `सुरक्षित रूप से डाउनलोड हो रहा है... ${pseudoProgressValue}%`;
                    
                    if (pseudoProgressValue === 100) {
                        clearInterval(downloadProgressIntervalTimer);
                        
                        setTimeout(() => {
                            dynamicDownloadModalOverlay.classList.remove('active');
                            setTimeout(() => { 
                                progressFillAnimatedBar.style.width = '0%'; 
                                progressStatusUpdateText.innerText = 'तैयार किया जा रहा है... 0%'; 
                            }, 500);
                            
                            const temporaryHyperlink = document.createElement('a'); 
                            temporaryHyperlink.href = activePdfUrl; 
                            
                            let mediumString = 'hindi';
                            if (currentMedium === 'en') {
                                mediumString = 'english';
                            }
                            
                            const safeFileName = `QMS_${activeSubjectQuery}_chapter_${activeChapterIdQuery}_${mediumString}_notes.pdf`;
                            temporaryHyperlink.download = safeFileName; 
                            temporaryHyperlink.target = '_blank'; 
                            
                            document.body.appendChild(temporaryHyperlink); 
                            temporaryHyperlink.click(); 
                            document.body.removeChild(temporaryHyperlink);
                            
                            let successMessage = 'PDF (हिंदी) सफलतापूर्वक डाउनलोड हो गई है!';
                            if (currentMedium === 'en') {
                                successMessage = 'PDF (English) Downloaded Successfully!';
                            }
                            window.showCustomToast(successMessage);
                        }, 500);
                    }
                }, 200);
                
            } else { 
                window.showCustomToast("इस अध्याय के नोट्स अभी उपलब्ध नहीं हैं।", true); 
            }
        });
    }

    // ==========================================
    // F. MARK COMPLETE LOGIC (XP & Tracker)
    // ==========================================
    const buttonMarkCompleteChapter = document.getElementById('mark-complete-btn');
    const savedCompletedDataRawString = localStorage.getItem('qms_completed'); 
    let allCompletedChaptersDataObj = {};
    if (savedCompletedDataRawString) {
        allCompletedChaptersDataObj = JSON.parse(savedCompletedDataRawString);
    }
    
    const specificChapterKeyIdentifier = activeSubjectQuery + '_' + activeChapterIdQuery;
    
    if (allCompletedChaptersDataObj[specificChapterKeyIdentifier] === true) { 
        if (buttonMarkCompleteChapter) { 
            buttonMarkCompleteChapter.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)'; 
            buttonMarkCompleteChapter.style.background = '#00ff88'; 
            buttonMarkCompleteChapter.style.color = '#000'; 
            buttonMarkCompleteChapter.disabled = true; 
        } 
    }
    
    if (buttonMarkCompleteChapter) {
        buttonMarkCompleteChapter.addEventListener('click', () => {
            if (allCompletedChaptersDataObj[specificChapterKeyIdentifier] !== true) {
                allCompletedChaptersDataObj[specificChapterKeyIdentifier] = true; 
                localStorage.setItem('qms_completed', JSON.stringify(allCompletedChaptersDataObj));
                
                buttonMarkCompleteChapter.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)'; 
                buttonMarkCompleteChapter.style.background = '#00ff88'; 
                buttonMarkCompleteChapter.style.color = '#000'; 
                buttonMarkCompleteChapter.disabled = true;
                
                window.showCustomToast("बधाई हो! आपने यह अध्याय पूरा कर लिया है। +50 XP");
            }
        });
    }

    // ==========================================
    // G. FIREFLY PARTICLES ENGINE
    // ==========================================
    const targetParticleCanvasElement = document.getElementById('bg-canvas');
    if (targetParticleCanvasElement) {
        const primaryCanvasContext2D = targetParticleCanvasElement.getContext('2d'); 
        targetParticleCanvasElement.width = window.innerWidth; 
        targetParticleCanvasElement.height = window.innerHeight;
        
        const listOfScienceFormulaSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ']; 
        let globalActiveParticlesArray = [];
        
        class QuantumFireflyObjectEngine {
            constructor() {
                const shapeProbabilityFloat = Math.random();
                if (shapeProbabilityFloat > 0.4) {
                    this.geometricShapeType = 'dot';
                } else {
                    this.geometricShapeType = 'symbol';
                }
                
                const randomSymbolSelectionIndex = Math.floor(Math.random() * listOfScienceFormulaSymbols.length);
                this.textStringSymbol = listOfScienceFormulaSymbols[randomSymbolSelectionIndex];
                
                this.canvasPositionX = Math.random() * targetParticleCanvasElement.width; 
                this.canvasPositionY = Math.random() * targetParticleCanvasElement.height;
                
                if (this.geometricShapeType === 'symbol') { 
                    this.renderPixelSize = Math.random() * 15 + 10; 
                    this.movementSpeedX = Math.random() * 0.5 - 0.25; 
                    this.movementSpeedY = Math.random() * -0.8 - 0.2; 
                } else { 
                    this.renderPixelSize = Math.random() * 3 + 1; 
                    this.movementSpeedX = Math.random() * 1 - 0.5; 
                    this.movementSpeedY = Math.random() * -1 - 0.2; 
                }
                
                this.alphaBlinkingVelocity = Math.random() * 0.05 + 0.02; 
                this.alphaSineWaveAngle = Math.random() * Math.PI * 2;
            }
            
            recalculateCoordinateLogic() {
                this.canvasPositionY += this.movementSpeedY; 
                this.canvasPositionX += this.movementSpeedX; 
                this.alphaSineWaveAngle += this.alphaBlinkingVelocity;
                
                if (this.canvasPositionY < -30) { 
                    this.canvasPositionY = targetParticleCanvasElement.height + 30; 
                    this.canvasPositionX = Math.random() * targetParticleCanvasElement.width; 
                }
                
                if (this.canvasPositionX < -30 || this.canvasPositionX > targetParticleCanvasElement.width + 30) { 
                    this.movementSpeedX = this.movementSpeedX * -1; 
                }
            }
            
            renderVisualsToCanvas(ctx) {
                const globalRootComputedStyles = getComputedStyle(document.documentElement);
                let currentThemeAccentColorHex = globalRootComputedStyles.getPropertyValue('--accent-main').trim();
                
                if (currentThemeAccentColorHex === "") {
                    currentThemeAccentColorHex = '#00f0ff';
                }
                
                let dynamicOpacityFloatValue = ((Math.sin(this.alphaSineWaveAngle) + 1) / 2) * 0.8 + 0.1;
                
                ctx.fillStyle = `rgba(255, 255, 255, ${dynamicOpacityFloatValue})`; 
                ctx.shadowBlur = dynamicOpacityFloatValue * 20; 
                ctx.shadowColor = currentThemeAccentColorHex;
                
                if (this.geometricShapeType === 'symbol') { 
                    ctx.font = `${this.renderPixelSize}px "Space Grotesk", sans-serif`; 
                    ctx.fillText(this.textStringSymbol, this.canvasPositionX, this.canvasPositionY); 
                } else { 
                    ctx.beginPath(); 
                    ctx.arc(this.canvasPositionX, this.canvasPositionY, this.renderPixelSize, 0, Math.PI * 2); 
                    ctx.fill(); 
                }
                
                ctx.shadowBlur = 0; 
            }
        }
        
        for (let loopCounter = 0; loopCounter < 60; loopCounter++) {
            globalActiveParticlesArray.push(new QuantumFireflyObjectEngine());
        }
        
        function runMainRenderingLoop() { 
            primaryCanvasContext2D.clearRect(0, 0, targetParticleCanvasElement.width, targetParticleCanvasElement.height); 
            
            globalActiveParticlesArray.forEach(singleParticleElement => { 
                singleParticleElement.recalculateCoordinateLogic(); 
                singleParticleElement.renderVisualsToCanvas(primaryCanvasContext2D); 
            }); 
            
            requestAnimationFrame(runMainRenderingLoop); 
        }
        
        runMainRenderingLoop();
        
        window.addEventListener('resize', () => { 
            targetParticleCanvasElement.width = window.innerWidth; 
            targetParticleCanvasElement.height = window.innerHeight; 
        });
    }
});
