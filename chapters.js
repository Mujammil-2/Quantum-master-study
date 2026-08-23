/* =========================================================================
   QMS CHAPTERS RENDER ENGINE (DYNAMIC BOOK 1 & BOOK 2 SPLIT)
   - Fetches Full Syllabus dynamically
   - Splits chapters into Part 1 and Part 2 beautifully
========================================================================= */

const qmsDatabase = {
    physics: [
        { id: 1, title: "वैद्युत आवेश तथा क्षेत्र", subtitle: "Electric Charges and Fields", part: 1 },
        { id: 2, title: "स्थिरवैद्युत विभव तथा धारिता", subtitle: "Electrostatic Potential & Capacitance", part: 1 },
        { id: 3, title: "विद्युत धारा", subtitle: "Current Electricity", part: 1 },
        { id: 4, title: "गतिमान आवेश और चुंबकत्व", subtitle: "Moving Charges and Magnetism", part: 1 },
        { id: 5, title: "चुंबकत्व एवं द्रव्य", subtitle: "Magnetism and Matter", part: 1 },
        { id: 6, title: "वैद्युतचुंबकीय प्रेरण", subtitle: "Electromagnetic Induction", part: 1 },
        { id: 7, title: "प्रत्यावर्ती धारा", subtitle: "Alternating Current", part: 1 },
        { id: 8, title: "वैद्युतचुंबकीय तरंगें", subtitle: "Electromagnetic Waves", part: 1 },
        { id: 9, title: "किरण प्रकाशिकी एवं प्रकाशिक यंत्र", subtitle: "Ray Optics and Optical Instruments", part: 2 },
        { id: 10, title: "तरंग प्रकाशिकी", subtitle: "Wave Optics", part: 2 },
        { id: 11, title: "विकिरण तथा द्रव्य की द्वैत प्रकृति", subtitle: "Dual Nature of Radiation and Matter", part: 2 },
        { id: 12, title: "परमाणु", subtitle: "Atoms", part: 2 },
        { id: 13, title: "नाभिक", subtitle: "Nuclei", part: 2 },
        { id: 14, title: "अर्धचालक इलेक्ट्रॉनिकी", subtitle: "Semiconductor Electronics", part: 2 }
    ],
    chemistry: [
        { id: 1, title: "विलयन", subtitle: "Solutions", part: 1 },
        { id: 2, title: "वैद्युतरसायन", subtitle: "Electrochemistry", part: 1 },
        { id: 3, title: "रासायनिक बलगतिकी", subtitle: "Chemical Kinetics", part: 1 },
        { id: 4, title: "d- एवं f- ब्लॉक के तत्व", subtitle: "The d- and f- Block Elements", part: 1 },
        { id: 5, title: "उपसहसंयोजन यौगिक", subtitle: "Coordination Compounds", part: 1 },
        { id: 6, title: "हैलोऐल्केन तथा हैलोऐरीन", subtitle: "Haloalkanes and Haloarenes", part: 2 },
        { id: 7, title: "ऐल्कोहॉल, फ़ीनॉल एवं ईथर", subtitle: "Alcohols, Phenols and Ethers", part: 2 },
        { id: 8, title: "ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल", subtitle: "Aldehydes, Ketones and Carboxylic Acids", part: 2 },
        { id: 9, title: "ऐमीन", subtitle: "Amines", part: 2 },
        { id: 10, title: "जैव-अणु", subtitle: "Biomolecules", part: 2 }
    ],
    mathematics: [
        { id: 1, title: "संबंध एवं फलन", subtitle: "Relations and Functions", part: 1 },
        { id: 2, title: "प्रतिलोम त्रिकोणमितीय फलन", subtitle: "Inverse Trigonometric Functions", part: 1 },
        { id: 3, title: "आव्यूह", subtitle: "Matrices", part: 1 },
        { id: 4, title: "सारणिक", subtitle: "Determinants", part: 1 },
        { id: 5, title: "सांतत्य तथा अवकलनीयता", subtitle: "Continuity and Differentiability", part: 1 },
        { id: 6, title: "अवकलज के अनुप्रयोग", subtitle: "Application of Derivatives", part: 1 },
        { id: 7, title: "समाकलन", subtitle: "Integrals", part: 2 },
        { id: 8, title: "समाकलनों के अनुप्रयोग", subtitle: "Application of Integrals", part: 2 },
        { id: 9, title: "अवकल समीकरण", subtitle: "Differential Equations", part: 2 },
        { id: 10, title: "सदिश बीजगणित", subtitle: "Vector Algebra", part: 2 },
        { id: 11, title: "त्रि-विमीय ज्यामिति", subtitle: "Three Dimensional Geometry", part: 2 },
        { id: 12, title: "रैखिक प्रोग्रामन", subtitle: "Linear Programming", part: 2 },
        { id: 13, title: "प्रायिकता", subtitle: "Probability", part: 2 }
    ],
    hindi: [
        { id: 1, title: "आत्मपरिचय / एक गीत", subtitle: "हरिवंश राय बच्चन", part: 1 },
        { id: 2, title: "पतंग", subtitle: "आलोक धन्वा", part: 1 },
        { id: 3, title: "कविता के बहाने", subtitle: "कुंवर नारायण", part: 1 },
        { id: 4, title: "कैमरे में बंद अपाहिज", subtitle: "रघुवीर सहाय", part: 1 },
        { id: 5, title: "सहर्ष स्वीकारा है", subtitle: "गजानन माधव मुक्तिबोध", part: 1 },
        { id: 6, title: "उषा", subtitle: "शमशेर बहादुर सिंह", part: 1 },
        { id: 7, title: "बादल राग", subtitle: "सूर्यकांत त्रिपाठी निराला", part: 1 },
        { id: 8, title: "कवितावली", subtitle: "तुलसीदास", part: 1 },
        { id: 9, title: "रुबाइयाँ", subtitle: "फिराक गोरखपुरी", part: 1 },
        { id: 10, title: "छोटा मेरा खेत", subtitle: "उमाशंकर जोशी", part: 1 },
        { id: 11, title: "भक्तिन", subtitle: "महादेवी वर्मा", part: 2 },
        { id: 12, title: "बाज़ार दर्शन", subtitle: "जैनेन्द्र कुमार", part: 2 },
        { id: 13, title: "काले मेघा पानी दे", subtitle: "धर्मवीर भारती", part: 2 },
        { id: 14, title: "पहलवान की ढोलक", subtitle: "फणीश्वर नाथ रेणु", part: 2 },
        { id: 15, title: "चार्ली चैप्लिन यानी हम सब", subtitle: "विष्णु खरे", part: 2 },
        { id: 16, title: "नमक", subtitle: "रज़िया सज्जाद ज़हीर", part: 2 },
        { id: 17, title: "शिरीष के फूल", subtitle: "हजारी प्रसाद द्विवेदी", part: 2 },
        { id: 18, title: "श्रम विभाजन और जाति-प्रथा", subtitle: "बी.आर. अम्बेडकर", part: 2 }
    ],
    english: [
        { id: 1, title: "The Last Lesson", subtitle: "Alphonse Daudet", part: 1 },
        { id: 2, title: "Lost Spring", subtitle: "Anees Jung", part: 1 },
        { id: 3, title: "Deep Water", subtitle: "William Douglas", part: 1 },
        { id: 4, title: "The Rattrap", subtitle: "Selma Lagerlöf", part: 1 },
        { id: 5, title: "Indigo", subtitle: "Louis Fischer", part: 1 },
        { id: 6, title: "Poets and Pancakes", subtitle: "Asokamitran", part: 1 },
        { id: 7, title: "The Interview", subtitle: "Christopher Silvester", part: 1 },
        { id: 8, title: "Going Places", subtitle: "A. R. Barton", part: 1 },
        { id: 9, title: "My Mother at Sixty-six", subtitle: "Kamala Das", part: 1 },
        { id: 10, title: "Keeping Quiet", subtitle: "Pablo Neruda", part: 1 },
        { id: 11, title: "A Thing of Beauty", subtitle: "John Keats", part: 1 },
        { id: 12, title: "A Roadside Stand", subtitle: "Robert Frost", part: 1 },
        { id: 13, title: "Aunt Jennifer's Tigers", subtitle: "Adrienne Rich", part: 1 },
        { id: 14, title: "The Third Level", subtitle: "Jack Finney - Vistas", part: 2 },
        { id: 15, title: "The Tiger King", subtitle: "Kalki - Vistas", part: 2 },
        { id: 16, title: "Journey to the end of the Earth", subtitle: "Tishani Doshi", part: 2 },
        { id: 17, title: "The Enemy", subtitle: "Pearl S. Buck", part: 2 },
        { id: 18, title: "On the Face of It", subtitle: "Susan Hill", part: 2 },
        { id: 19, title: "Memories of Childhood", subtitle: "Zitkala-Sa", part: 2 }
    ]
};

document.addEventListener('DOMContentLoaded', () => {

    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const savedProfileImageSrc = localStorage.getItem('qms_profile_img');
    if (savedProfileImageSrc) {
        const navProfileImg = document.getElementById('nav-profile-img');
        if (navProfileImg) navProfileImg.src = savedProfileImageSrc; 
    }

    const bgmAudio = document.getElementById('bgm-audio');
    if (bgmAudio) {
        let isBgmOn = localStorage.getItem('qms_bgm') === 'on';
        let savedBgmVolume = localStorage.getItem('qms_bgm_volume') || 0.3;
        let savedBgmTime = localStorage.getItem('qms_bgm_time') || 0;
        let savedBgmTrack = localStorage.getItem('qms_bgm_track') || 'bgm1.mp3';

        bgmAudio.src = savedBgmTrack; bgmAudio.volume = parseFloat(savedBgmVolume); bgmAudio.currentTime = parseFloat(savedBgmTime);
        const playBgmSafely = () => { if (isBgmOn && bgmAudio.paused) bgmAudio.play().catch(e => console.log(e)); };
        document.body.addEventListener('click', playBgmSafely, { once: true });
        if (isBgmOn) bgmAudio.play().catch(e => console.log(e));
        window.addEventListener('beforeunload', () => { localStorage.setItem('qms_bgm_time', bgmAudio.currentTime); });
    }

    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSoundOn && sfxClick) { sfxClick.currentTime = 0; sfxClick.volume = 1.0; sfxClick.play().catch(()=>{}); }
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const activeSubject = urlParams.get('subject') || 'physics';

    const subjectMeta = {
        physics: { title: "भौतिक विज्ञान", subtitle: "Physics (PCM / PCB)", icon: "ri-flashlight-fill", color: "#00f0ff", p1: "भाग 1 (Part 1)", p2: "भाग 2 (Part 2)" },
        chemistry: { title: "रसायन विज्ञान", subtitle: "Chemistry (PCM / PCB)", icon: "ri-test-tube-fill", color: "#b535ff", p1: "भाग 1 (Part 1)", p2: "भाग 2 (Part 2)" },
        mathematics: { title: "गणित", subtitle: "Mathematics (PCM)", icon: "ri-function-line", color: "#00ff88", p1: "भाग 1 (Part 1)", p2: "भाग 2 (Part 2)" },
        hindi: { title: "हिंदी (Hindi)", subtitle: "आरोह और वितान", icon: "ri-quill-pen-line", color: "#ffc107", p1: "आरोह (Aroh)", p2: "वितान (Vitan)" },
        english: { title: "अंग्रेज़ी (English)", subtitle: "Flamingo & Vistas", icon: "ri-english-input", color: "#ff3366", p1: "Flamingo (Prose & Poetry)", p2: "Vistas (Supplementary)" }
    };

    const currentMeta = subjectMeta[activeSubject];
    if (currentMeta) {
        document.getElementById('chap-hero-title').innerText = currentMeta.title;
        document.getElementById('chap-hero-subtitle').innerText = currentMeta.subtitle;
        const heroIcon = document.getElementById('chap-hero-icon');
        heroIcon.innerHTML = `<i class="${currentMeta.icon}"></i>`;
        heroIcon.style.color = currentMeta.color;
    }

    const chaptersArray = qmsDatabase[activeSubject] || [];
    const container = document.getElementById('dynamic-chapters-container');
    
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedInThisSubject = 0;

    if (chaptersArray.length > 0) {
        let htmlString = '';
        
        let part1Html = `<div style="margin-top: 2rem; margin-bottom: 1rem; padding: 10px 15px; background: rgba(255,255,255,0.05); border-left: 4px solid var(--accent-main); border-radius: 8px;">
            <h3 style="color: var(--accent-main); font-family: var(--font-heading);"><i class="ri-book-2-fill"></i> ${currentMeta.p1}</h3>
        </div>`;
        
        let part2Html = `<div style="margin-top: 2.5rem; margin-bottom: 1rem; padding: 10px 15px; background: rgba(255,255,255,0.05); border-left: 4px solid #ffc107; border-radius: 8px;">
            <h3 style="color: #ffc107; font-family: var(--font-heading);"><i class="ri-book-3-fill"></i> ${currentMeta.p2}</h3>
        </div>`;

        chaptersArray.forEach(chap => {
            const chapterKey = activeSubject + '_' + chap.id;
            const isCompleted = completedData[chapterKey] === true;
            if(isCompleted) completedInThisSubject++;
            
            const btnClass = isCompleted ? 'btn-play completed' : 'btn-play sfx-trigger';
            const iconClass = isCompleted ? 'ri-check-double-line' : 'ri-play-fill';
            
            const cardHtml = `
                <div class="glass-card chapter-card sfx-trigger" onclick="window.location.href='player.html?subject=${activeSubject}&chapter=${chap.id}'">
                    <div class="chap-num">${chap.id.toString().padStart(2, '0')}</div>
                    <div class="chap-details">
                        <h4>${chap.title}</h4>
                        <p>${chap.subtitle}</p>
                        <div class="chap-meta">
                            <span><i class="ri-time-line"></i> 45 Min</span>
                            <span><i class="ri-video-line"></i> Notes & QnA</span>
                        </div>
                    </div>
                    <button class="${btnClass}"><i class="${iconClass}"></i></button>
                </div>
            `;
            
            if (chap.part === 1) { part1Html += cardHtml; } 
            else { part2Html += cardHtml; }
        });
        
        container.innerHTML = part1Html + part2Html;
        
        const progressPercent = Math.round((completedInThisSubject / chaptersArray.length) * 100);
        document.getElementById('chap-progress-text').innerText = `प्रोग्रेस: ${progressPercent}%`;
        document.getElementById('chap-count-text').innerText = `${completedInThisSubject} / ${chaptersArray.length} अध्याय पूर्ण`;
        document.getElementById('chap-progress-bar').style.width = `${progressPercent}%`;
        
    } else {
        container.innerHTML = `<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">कोई अध्याय नहीं मिला।</p>`;
    }
});
