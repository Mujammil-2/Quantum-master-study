/* =========================================================================
   QMS CHAPTERS RENDER ENGINE (DYNAMIC)
   - Fetches Full Syllabus from Database dynamically
   - Preserves BGM & Theme logic on this page
========================================================================= */

// 1. MEGA DATABASE (SAME AS PLAYER.JS)
const qmsDatabase = {
    physics: [
        { id: 1, title: "वैद्युत आवेश तथा क्षेत्र", subtitle: "Electric Charges and Fields", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph101.pdf" },
        { id: 2, title: "स्थिरवैद्युत विभव तथा धारिता", subtitle: "Electrostatic Potential & Capacitance", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph102.pdf" },
        { id: 3, title: "विद्युत धारा", subtitle: "Current Electricity", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph103.pdf" },
        { id: 4, title: "गतिमान आवेश और चुंबकत्व", subtitle: "Moving Charges and Magnetism", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph104.pdf" },
        { id: 5, title: "चुंबकत्व एवं द्रव्य", subtitle: "Magnetism and Matter", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph105.pdf" },
        { id: 6, title: "वैद्युतचुंबकीय प्रेरण", subtitle: "Electromagnetic Induction", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph106.pdf" },
        { id: 7, title: "प्रत्यावर्ती धारा", subtitle: "Alternating Current", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph107.pdf" },
        { id: 8, title: "वैद्युतचुंबकीय तरंगें", subtitle: "Electromagnetic Waves", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph108.pdf" },
        { id: 9, title: "किरण प्रकाशिकी एवं प्रकाशिक यंत्र", subtitle: "Ray Optics and Optical Instruments", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph201.pdf" },
        { id: 10, title: "तरंग प्रकाशिकी", subtitle: "Wave Optics", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph202.pdf" },
        { id: 11, title: "विकिरण तथा द्रव्य की द्वैत प्रकृति", subtitle: "Dual Nature of Radiation and Matter", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph203.pdf" },
        { id: 12, title: "परमाणु", subtitle: "Atoms", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph204.pdf" },
        { id: 13, title: "नाभिक", subtitle: "Nuclei", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph205.pdf" },
        { id: 14, title: "अर्धचालक इलेक्ट्रॉनिकी", subtitle: "Semiconductor Electronics", pdfUrl: "https://ncert.nic.in/textbook/pdf/leph206.pdf" }
    ],
    chemistry: [
        { id: 1, title: "विलयन", subtitle: "Solutions", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech101.pdf" },
        { id: 2, title: "वैद्युतरसायन", subtitle: "Electrochemistry", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech102.pdf" },
        { id: 3, title: "रासायनिक बलगतिकी", subtitle: "Chemical Kinetics", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech103.pdf" },
        { id: 4, title: "d- एवं f- ब्लॉक के तत्व", subtitle: "The d- and f- Block Elements", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech104.pdf" },
        { id: 5, title: "उपसहसंयोजन यौगिक", subtitle: "Coordination Compounds", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech105.pdf" },
        { id: 6, title: "हैलोऐल्केन तथा हैलोऐरीन", subtitle: "Haloalkanes and Haloarenes", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech201.pdf" },
        { id: 7, title: "ऐल्कोहॉल, फ़ीनॉल एवं ईथर", subtitle: "Alcohols, Phenols and Ethers", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech202.pdf" },
        { id: 8, title: "ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल", subtitle: "Aldehydes, Ketones and Carboxylic Acids", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech203.pdf" },
        { id: 9, title: "ऐमीन", subtitle: "Amines", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech204.pdf" },
        { id: 10, title: "जैव-अणु", subtitle: "Biomolecules", pdfUrl: "https://ncert.nic.in/textbook/pdf/lech205.pdf" }
    ],
    mathematics: [
        { id: 1, title: "संबंध एवं फलन", subtitle: "Relations and Functions", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh101.pdf" },
        { id: 2, title: "प्रतिलोम त्रिकोणमितीय फलन", subtitle: "Inverse Trigonometric Functions", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh102.pdf" },
        { id: 3, title: "आव्यूह", subtitle: "Matrices", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh103.pdf" },
        { id: 4, title: "सारणिक", subtitle: "Determinants", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh104.pdf" },
        { id: 5, title: "सांतत्य तथा अवकलनीयता", subtitle: "Continuity and Differentiability", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh105.pdf" },
        { id: 6, title: "अवकलज के अनुप्रयोग", subtitle: "Application of Derivatives", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh106.pdf" },
        { id: 7, title: "समाकलन", subtitle: "Integrals", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh201.pdf" },
        { id: 8, title: "समाकलनों के अनुप्रयोग", subtitle: "Application of Integrals", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh202.pdf" },
        { id: 9, title: "अवकल समीकरण", subtitle: "Differential Equations", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh203.pdf" },
        { id: 10, title: "सदिश बीजगणित", subtitle: "Vector Algebra", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh204.pdf" },
        { id: 11, title: "त्रि-विमीय ज्यामिति", subtitle: "Three Dimensional Geometry", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh205.pdf" },
        { id: 12, title: "रैखिक प्रोग्रामन", subtitle: "Linear Programming", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh206.pdf" },
        { id: 13, title: "प्रायिकता", subtitle: "Probability", pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh207.pdf" }
    ],
    hindi: [
        { id: 1, title: "आत्मपरिचय / एक गीत", subtitle: "हरिवंश राय बच्चन", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar101.pdf" },
        { id: 2, title: "पतंग", subtitle: "आलोक धन्वा", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar102.pdf" },
        { id: 3, title: "कविता के बहाने", subtitle: "कुंवर नारायण", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar103.pdf" },
        { id: 4, title: "कैमरे में बंद अपाहिज", subtitle: "रघुवीर सहाय", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar104.pdf" },
        { id: 5, title: "सहर्ष स्वीकारा है", subtitle: "गजानन माधव मुक्तिबोध", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar105.pdf" },
        { id: 6, title: "उषा", subtitle: "शमशेर बहादुर सिंह", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar106.pdf" },
        { id: 7, title: "बादल राग", subtitle: "सूर्यकांत त्रिपाठी निराला", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar107.pdf" },
        { id: 8, title: "कवितावली", subtitle: "तुलसीदास", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar108.pdf" },
        { id: 9, title: "रुबाइयाँ", subtitle: "फिराक गोरखपुरी", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar109.pdf" },
        { id: 10, title: "छोटा मेरा खेत", subtitle: "उमाशंकर जोशी", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar110.pdf" },
        { id: 11, title: "भक्तिन", subtitle: "महादेवी वर्मा", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar111.pdf" },
        { id: 12, title: "बाज़ार दर्शन", subtitle: "जैनेन्द्र कुमार", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar112.pdf" },
        { id: 13, title: "काले मेघा पानी दे", subtitle: "धर्मवीर भारती", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar113.pdf" },
        { id: 14, title: "पहलवान की ढोलक", subtitle: "फणीश्वर नाथ रेणु", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar114.pdf" },
        { id: 15, title: "चार्ली चैप्लिन यानी हम सब", subtitle: "विष्णु खरे", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar115.pdf" },
        { id: 16, title: "नमक", subtitle: "रज़िया सज्जाद ज़हीर", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar116.pdf" },
        { id: 17, title: "शिरीष के फूल", subtitle: "हजारी प्रसाद द्विवेदी", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar117.pdf" },
        { id: 18, title: "श्रम विभाजन और जाति-प्रथा", subtitle: "बी.आर. अम्बेडकर", pdfUrl: "https://ncert.nic.in/textbook/pdf/lhar118.pdf" }
    ],
    english: [
        { id: 1, title: "The Last Lesson", subtitle: "Alphonse Daudet - Flamingo", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl101.pdf" },
        { id: 2, title: "Lost Spring", subtitle: "Anees Jung - Flamingo", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl102.pdf" },
        { id: 3, title: "Deep Water", subtitle: "William Douglas - Flamingo", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl103.pdf" },
        { id: 4, title: "The Rattrap", subtitle: "Selma Lagerlöf - Flamingo", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl104.pdf" },
        { id: 5, title: "Indigo", subtitle: "Louis Fischer - Flamingo", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl105.pdf" },
        { id: 6, title: "Poets and Pancakes", subtitle: "Asokamitran - Flamingo", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl106.pdf" },
        { id: 7, title: "The Interview", subtitle: "Christopher Silvester - Flamingo", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl107.pdf" },
        { id: 8, title: "Going Places", subtitle: "A. R. Barton - Flamingo", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl108.pdf" },
        { id: 9, title: "My Mother at Sixty-six", subtitle: "Kamala Das - Poetry", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl109.pdf" },
        { id: 10, title: "Keeping Quiet", subtitle: "Pablo Neruda - Poetry", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl110.pdf" },
        { id: 11, title: "A Thing of Beauty", subtitle: "John Keats - Poetry", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl111.pdf" },
        { id: 12, title: "A Roadside Stand", subtitle: "Robert Frost - Poetry", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl112.pdf" },
        { id: 13, title: "Aunt Jennifer's Tigers", subtitle: "Adrienne Rich - Poetry", pdfUrl: "https://ncert.nic.in/textbook/pdf/lefl113.pdf" },
        { id: 14, title: "The Third Level", subtitle: "Jack Finney - Vistas", pdfUrl: "https://ncert.nic.in/textbook/pdf/levt101.pdf" },
        { id: 15, title: "The Tiger King", subtitle: "Kalki - Vistas", pdfUrl: "https://ncert.nic.in/textbook/pdf/levt102.pdf" },
        { id: 16, title: "Journey to the end of the Earth", subtitle: "Tishani Doshi - Vistas", pdfUrl: "https://ncert.nic.in/textbook/pdf/levt103.pdf" },
        { id: 17, title: "The Enemy", subtitle: "Pearl S. Buck - Vistas", pdfUrl: "https://ncert.nic.in/textbook/pdf/levt104.pdf" },
        { id: 18, title: "On the Face of It", subtitle: "Susan Hill - Vistas", pdfUrl: "https://ncert.nic.in/textbook/pdf/levt105.pdf" },
        { id: 19, title: "Memories of Childhood", subtitle: "Zitkala-Sa & Bama - Vistas", pdfUrl: "https://ncert.nic.in/textbook/pdf/levt106.pdf" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 2. BGM & SOUND FX LOGIC (Ensuring it runs here too!)
    // ==========================================
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

        bgmAudio.src = savedBgmTrack;
        bgmAudio.volume = parseFloat(savedBgmVolume);
        bgmAudio.currentTime = parseFloat(savedBgmTime);

        const playBgmSafely = () => { if (isBgmOn && bgmAudio.paused) bgmAudio.play().catch(e => console.log(e)); };
        document.body.addEventListener('click', playBgmSafely, { once: true });
        
        // Auto play
        if (isBgmOn) bgmAudio.play().catch(e => console.log("Waiting for user interaction"));

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('qms_bgm_time', bgmAudio.currentTime);
        });
    }

    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSoundOn && sfxClick) {
                sfxClick.currentTime = 0; sfxClick.volume = 1.0; sfxClick.play().catch(()=>{});
            }
        });
    });


    // ==========================================
    // 3. DYNAMIC CHAPTERS RENDER LOGIC
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const activeSubject = urlParams.get('subject') || 'physics';

    const subjectMeta = {
        physics: { title: "भौतिक विज्ञान", subtitle: "Physics (PCM / PCB)", icon: "ri-flashlight-fill", color: "#00f0ff" },
        chemistry: { title: "रसायन विज्ञान", subtitle: "Chemistry (PCM / PCB)", icon: "ri-test-tube-fill", color: "#b535ff" },
        mathematics: { title: "गणित", subtitle: "Mathematics (PCM)", icon: "ri-function-line", color: "#00ff88" },
        hindi: { title: "हिंदी (Hindi)", subtitle: "आरोह और वितान", icon: "ri-quill-pen-line", color: "#ffc107" },
        english: { title: "अंग्रेज़ी (English)", subtitle: "Flamingo & Vistas", icon: "ri-english-input", color: "#ff3366" }
    };

    // Update Hero Card
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
    
    // Get Completed Data to show progress
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedInThisSubject = 0;

    if (chaptersArray.length > 0) {
        let htmlString = '';
        
        chaptersArray.forEach(chap => {
            const chapterKey = activeSubject + '_' + chap.id;
            const isCompleted = completedData[chapterKey] === true;
            if(isCompleted) completedInThisSubject++;
            
            const btnClass = isCompleted ? 'btn-play completed' : 'btn-play sfx-trigger';
            const iconClass = isCompleted ? 'ri-check-double-line' : 'ri-play-fill';
            
            htmlString += `
                <div class="glass-card chapter-card sfx-trigger" onclick="window.location.href='player.html?subject=${activeSubject}&chapter=${chap.id}'">
                    <div class="chap-num">${chap.id.toString().padStart(2, '0')}</div>
                    <div class="chap-details">
                        <h4>${chap.title}</h4>
                        <p>${chap.subtitle}</p>
                        <div class="chap-meta">
                            <span><i class="ri-time-line"></i> 45 Min</span>
                            <span><i class="ri-video-line"></i> Video & Notes</span>
                        </div>
                    </div>
                    <button class="${btnClass}">
                        <i class="${iconClass}"></i>
                    </button>
                </div>
            `;
        });
        
        container.innerHTML = htmlString;
        
        // Update Progress Bar
        const progressPercent = Math.round((completedInThisSubject / chaptersArray.length) * 100);
        document.getElementById('chap-progress-text').innerText = `प्रोग्रेस: ${progressPercent}%`;
        document.getElementById('chap-count-text').innerText = `${completedInThisSubject} / ${chaptersArray.length} अध्याय पूर्ण`;
        document.getElementById('chap-progress-bar').style.width = `${progressPercent}%`;
        
    } else {
        container.innerHTML = `<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">कोई अध्याय नहीं मिला।</p>`;
    }


    // ==========================================
    // 4. BACKGROUND FIREFLIES ENGINE
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
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
                const rootStyle = getComputedStyle(document.documentElement);
                const accentColor = rootStyle.getPropertyValue('--accent-main').trim() || '#00f0ff';
                let currentOpacity = ((Math.sin(this.angle) + 1) / 2) * 0.8 + 0.1;
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                ctx.shadowBlur = currentOpacity * 20; ctx.shadowColor = accentColor;
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
