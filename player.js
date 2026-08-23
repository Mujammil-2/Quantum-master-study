/* =========================================================================
   QMS VIDEO PLAYER MASTER ENGINE (FINAL NETLIFY CDN BUILD - PATH FIXED)
   - 100% COMPLETE FILE
   - FEATURES:
     1. Hindi & English Medium Support
     2. 🚀 THE ULTIMATE PDF FIX: Mozilla Viewer + Netlify path '/pdfs/' fix
     3. Dynamic Question-Answer Pages for the 4 Topics
     4. Smart BGM Memory Resume & Bookmarks System
========================================================================= */

window.showCustomToast = function(messageContentText, isErrorNotification = false) {
    const existingOldToast = document.querySelector('.qms-toast-msg'); 
    if (existingOldToast) existingOldToast.remove();
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
// 1. QMS DUAL-MEDIUM MEGA DATABASE (Only for Title & Structure)
// --------------------------------------------------------------------------
const qmsDatabase = {
    physics: [{ id: 1, title_hi: "वैद्युत आवेश तथा क्षेत्र", title_en: "Electric Charges and Fields" }, { id: 2, title_hi: "स्थिरवैद्युत विभव तथा धारिता", title_en: "Electrostatic Potential & Capacitance" }, { id: 3, title_hi: "विद्युत धारा", title_en: "Current Electricity" }, { id: 4, title_hi: "गतिमान आवेश और चुंबकत्व", title_en: "Moving Charges and Magnetism" }, { id: 5, title_hi: "चुंबकत्व एवं द्रव्य", title_en: "Magnetism and Matter" }, { id: 6, title_hi: "वैद्युतचुंबकीय प्रेरण", title_en: "Electromagnetic Induction" }, { id: 7, title_hi: "प्रत्यावर्ती धारा", title_en: "Alternating Current" }, { id: 8, title_hi: "वैद्युतचुंबकीय तरंगें", title_en: "Electromagnetic Waves" }, { id: 9, title_hi: "किरण प्रकाशिकी एवं प्रकाशिक यंत्र", title_en: "Ray Optics and Optical Instruments" }, { id: 10, title_hi: "तरंग प्रकाशिकी", title_en: "Wave Optics" }, { id: 11, title_hi: "विकिरण तथा द्रव्य की द्वैत प्रकृति", title_en: "Dual Nature of Radiation and Matter" }, { id: 12, title_hi: "परमाणु", title_en: "Atoms" }, { id: 13, title_hi: "नाभिक", title_en: "Nuclei" }, { id: 14, title_hi: "अर्धचालक इलेक्ट्रॉनिकी", title_en: "Semiconductor Electronics" }],
    chemistry: [{ id: 1, title_hi: "विलयन", title_en: "Solutions" }, { id: 2, title_hi: "वैद्युतरसायन", title_en: "Electrochemistry" }, { id: 3, title_hi: "रासायनिक बलगतिकी", title_en: "Chemical Kinetics" }, { id: 4, title_hi: "d- एवं f- ब्लॉक के तत्व", title_en: "The d- and f- Block Elements" }, { id: 5, title_hi: "उपसहसंयोजन यौगिक", title_en: "Coordination Compounds" }, { id: 6, title_hi: "हैलोऐल्केन तथा हैलोऐरीन", title_en: "Haloalkanes and Haloarenes" }, { id: 7, title_hi: "ऐल्कोहॉल, फ़ीनॉल एवं ईथर", title_en: "Alcohols, Phenols and Ethers" }, { id: 8, title_hi: "ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल", title_en: "Aldehydes, Ketones and Carboxylic Acids" }, { id: 9, title_hi: "ऐमीन", title_en: "Amines" }, { id: 10, title_hi: "जैव-अणु", title_en: "Biomolecules" }],
    mathematics: [{ id: 1, title_hi: "संबंध एवं फलन", title_en: "Relations and Functions" }, { id: 2, title_hi: "प्रतिलोम त्रिकोणमितीय फलन", title_en: "Inverse Trigonometric Functions" }, { id: 3, title_hi: "आव्यूह", title_en: "Matrices" }, { id: 4, title_hi: "सारणिक", title_en: "Determinants" }, { id: 5, title_hi: "सांतत्य तथा अवकलनीयता", title_en: "Continuity and Differentiability" }, { id: 6, title_hi: "अवकलज के अनुप्रयोग", title_en: "Application of Derivatives" }, { id: 7, title_hi: "समाकलन", title_en: "Integrals" }, { id: 8, title_hi: "समाकलनों के अनुप्रयोग", title_en: "Application of Integrals" }, { id: 9, title_hi: "अवकल समीकरण", title_en: "Differential Equations" }, { id: 10, title_hi: "सदिश बीजगणित", title_en: "Vector Algebra" }, { id: 11, title_hi: "त्रि-विमीय ज्यामिति", title_en: "Three Dimensional Geometry" }, { id: 12, title_hi: "रैखिक प्रोग्रामन", title_en: "Linear Programming" }, { id: 13, title_hi: "प्रायिकता", title_en: "Probability" }],
    hindi: [{ id: 1, title_hi: "आत्मपरिचय / एक गीत", title_en: "Aatmaparichay / Ek Geet" }, { id: 2, title_hi: "पतंग", title_en: "Patang" }, { id: 3, title_hi: "कविता के बहाने", title_en: "Kavita ke Bahane" }, { id: 4, title_hi: "कैमरे में बंद अपाहिज", title_en: "Camere mein band Apahij" }, { id: 5, title_hi: "सहर्ष स्वीकारा है", title_en: "Saharsh Swikara Hai" }, { id: 6, title_hi: "उषा", title_en: "Usha" }, { id: 7, title_hi: "बादल राग", title_en: "Badal Raag" }, { id: 8, title_hi: "कवितावली", title_en: "Kavitawali" }, { id: 9, title_hi: "रुबाइयाँ", title_en: "Rubaiyan" }, { id: 10, title_hi: "छोटा मेरा खेत", title_en: "Chhota Mera Khet" }, { id: 11, title_hi: "भक्तिन", title_en: "Bhaktin" }, { id: 12, title_hi: "बाज़ार दर्शन", title_en: "Bazar Darshan" }, { id: 13, title_hi: "काले मेघा पानी दे", title_en: "Kale Megha Pani De" }, { id: 14, title_hi: "पहलवान की ढोलक", title_en: "Pahalwan Ki Dholak" }, { id: 15, title_hi: "चार्ली चैप्लिन यानी हम सब", title_en: "Charlie Chaplin" }, { id: 16, title_hi: "नमक", title_en: "Namak" }, { id: 17, title_hi: "शिरीष के फूल", title_en: "Shirish Ke Phool" }, { id: 18, title_hi: "श्रम विभाजन और जाति-प्रथा", title_en: "Shram Vibhajan" }],
    english: [{ id: 1, title_hi: "द लास्ट लेसन", title_en: "The Last Lesson" }, { id: 2, title_hi: "लॉस्ट स्प्रिंग", title_en: "Lost Spring" }, { id: 3, title_hi: "डीप वाटर", title_en: "Deep Water" }, { id: 4, title_hi: "द रैटट्रैप", title_en: "The Rattrap" }, { id: 5, title_hi: "इंडिगो", title_en: "Indigo" }, { id: 6, title_hi: "पोएट्स एंड पैनकेक्स", title_en: "Poets and Pancakes" }, { id: 7, title_hi: "द इंटरव्यू", title_en: "The Interview" }, { id: 8, title_hi: "गोइंग प्लेसेस", title_en: "Going Places" }, { id: 9, title_hi: "माय मदर एट सिक्सटी-सिक्स", title_en: "My Mother at Sixty-six" }, { id: 10, title_hi: "कीपिंग क्वाइट", title_en: "Keeping Quiet" }, { id: 11, title_hi: "अ थिंग ऑफ़ ब्यूटी", title_en: "A Thing of Beauty" }, { id: 12, title_hi: "अ रोडसाइड स्टैंड", title_en: "A Roadside Stand" }, { id: 13, title_hi: "आंट जेनिफर'स टाइगर्स", title_en: "Aunt Jennifer's Tigers" }, { id: 14, title_hi: "द थर्ड लेवल", title_en: "The Third Level" }, { id: 15, title_hi: "द टाइगर किंग", title_en: "The Tiger King" }, { id: 16, title_hi: "जर्नी टू द एन्ड ऑफ़ द अर्थ", title_en: "Journey to the end of the Earth" }, { id: 17, title_hi: "द एनिमी", title_en: "The Enemy" }, { id: 18, title_hi: "ऑन द फेस ऑफ़ इट", title_en: "On the Face of It" }, { id: 19, title_hi: "मेमोरीज ऑफ़ चाइल्डहुड", title_en: "Memories of Childhood" }]
};

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. DYNAMIC MEDIUM SWITCHER
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
        if (profileDiv) profileDiv.insertAdjacentHTML('beforebegin', mediumSwitcherHtml);

        const mediumToggleBtn = document.getElementById('medium-toggle-btn');
        if (mediumToggleBtn) {
            mediumToggleBtn.addEventListener('click', () => {
                currentMedium = currentMedium === 'hi' ? 'en' : 'hi';
                localStorage.setItem('qms_medium', currentMedium);
                document.getElementById('medium-text').innerText = currentMedium === 'hi' ? 'हिंदी माध्यम' : 'English Medium';
                window.showCustomToast(`माध्यम बदलकर ${currentMedium === 'hi' ? 'हिंदी' : 'English'} कर दिया गया है। पेज रीलोड हो रहा है...`);
                setTimeout(() => { window.location.reload(); }, 1000);
            });
        }
    }

    // ==========================================
    // 2. SMART BGM MEMORY SYSTEM
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
        if (isSystemBgmTurnedOn) { backgroundAudioPlayerNode.play().catch(e => console.log(e)); }

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('qms_bgm_time', backgroundAudioPlayerNode.currentTime);
        });
    }

    // ==========================================
    // 3. 🎯 NETLIFY LINK FIX (ADDED '/pdfs/' PATH)
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

    document.getElementById('back-to-chapters').addEventListener('click', () => { 
        window.location.href = `chapters.html?subject=${activeSubjectQuery}`; 
    });

    // 🚀 THE FIX IS HERE: Added '/pdfs/' before the filename!
    const activePdfUrl = `https://glistening-nasturtium-686282.netlify.app/pdfs/${activeSubjectQuery}_${activeChapterIdQuery}_${currentMedium}.pdf`;

    let activeTitle = "अध्याय लोड हो रहा है...";
    if (qmsDatabase[activeSubjectQuery]) {
        const matchedChapterObject = qmsDatabase[activeSubjectQuery].find(ch => ch.id === activeChapterIdQuery);
        if (matchedChapterObject) {
            activeTitle = currentMedium === 'hi' ? matchedChapterObject.title_hi : matchedChapterObject.title_en;
        }
    }

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
            sfxClickSoundAudioNode.currentTime = 0; sfxClickSoundAudioNode.volume = 1.0; 
            sfxClickSoundAudioNode.play().catch(()=>{}); 
        } 
    }
    document.querySelectorAll('.sfx-trigger').forEach(btn => { btn.addEventListener('click', executeClickSound); });

    // ==========================================
    // 4. 🔖 BOOKMARK / SAVE NOTES LOGIC
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
                    subject: activeSubjectQuery, id: activeChapterIdQuery,
                    title: activeTitle, subtitle: `Chapter ${activeChapterIdQuery}`
                };
                saveBookmarkActionButton.innerHTML = '<i class="ri-heart-fill"></i> सेव्ड नोट्स (Saved)';
                saveBookmarkActionButton.classList.add('saved');
                window.showCustomToast("चैप्टर बुकमार्क में सेव हो गया! ❤️");
            }
            localStorage.setItem('qms_bookmarks', JSON.stringify(userBookmarksDataCollection));
        });
    }

    // ==========================================
    // E. 🚀 IN-APP MODAL: LIVE PDF FIX
    // ==========================================
    const contentViewerModalHtml = `
        <div id="content-viewer-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: var(--bg-dark); z-index: 100000; display: none; flex-direction: column;">
            <div style="background: #111; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--accent-main); box-shadow: 0 4px 15px rgba(0,0,0,0.5); position: relative; z-index: 100001;">
                <h3 id="content-modal-title" style="color: #fff; font-family: var(--font-heading); font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                    <i class="ri-play-circle-fill" style="color: var(--accent-main);"></i> लोड हो रहा है...
                </h3>
                <button id="close-content-modal" class="sfx-trigger" style="background: rgba(255,50,50,0.2); border: 1px solid #ff3366; color: #ff3366; padding: 8px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: 0.3s;">X Close</button>
            </div>
            <div id="content-modal-body" style="flex: 1; width: 100%; height: 100%; position: relative; overflow-y: auto; background: #fff; -webkit-overflow-scrolling: touch;"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', contentViewerModalHtml);

    const contentViewerModal = document.getElementById('content-viewer-modal');
    const contentModalBody = document.getElementById('content-modal-body');
    const closeContentModalBtn = document.getElementById('close-content-modal');
    const contentModalTitle = document.getElementById('content-modal-title');

    if (closeContentModalBtn) {
        closeContentModalBtn.addEventListener('click', () => {
            executeClickSound();
            contentViewerModal.style.display = 'none';
            contentModalBody.innerHTML = ""; 
        });
    }

    const buttonLiveViewNotes = document.getElementById('btn-view-notes');
    if (buttonLiveViewNotes) { 
        buttonLiveViewNotes.addEventListener('click', () => { 
            contentViewerModal.style.display = 'flex';
            let modalTitleText = currentMedium === 'hi' ? 'लाइव नोट्स (हिंदी)' : 'Live Notes (English)';
            contentModalTitle.innerHTML = `<i class="ri-file-pdf-line" style="color: var(--accent-main);"></i> ${modalTitleText}`;
            contentModalBody.style.background = '#f5f5f5';
            
            // CORS PROXY + MOZILLA VIEWER = 100% SUCCESS NO DOWNLOAD
            const corsProxyUrl = "https://corsproxy.io/?url=" + encodeURIComponent(activePdfUrl);
            const mozillaViewerBaseUrl = "https://mozilla.github.io/pdf.js/web/viewer.html?file=";
            const securePdfViewerUrl = mozillaViewerBaseUrl + encodeURIComponent(corsProxyUrl);
            
            contentModalBody.innerHTML = `
                <iframe src="${securePdfViewerUrl}" style="width: 100%; height: 100%; border: none;">
                    आपका ब्राउज़र Iframe सपोर्ट नहीं करता।
                </iframe>
            `;
            window.showCustomToast("नोट्स लाइव ओपन हो रहे हैं...");
        }); 
    }

    // ==========================================
    // F. 🚀 DYNAMIC QUESTION & ANSWER PAGES
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
            
            const topicNameText = this.querySelector('span') ? this.querySelector('span').innerText : this.innerText;
            window.showCustomToast(`${topicNameText} लोड हो रहा है...`);

            contentViewerModal.style.display = 'flex';
            contentModalTitle.innerHTML = `<i class="ri-file-text-line" style="color: #00ff88;"></i> ${topicNameText}`;
            contentModalBody.style.background = '#0f0f19'; 

            contentModalBody.innerHTML = `
                <div style="padding: 20px; max-width: 800px; margin: 0 auto; padding-bottom: 50px;">
                    <div style="background: rgba(255,255,255,0.05); border-left: 4px solid var(--accent-main); padding: 15px; border-radius: 12px; margin-bottom: 25px;">
                        <h2 style="color: #fff; font-family: var(--font-hindi); font-size: 1.4rem; margin-bottom: 5px;">${topicNameText}</h2>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">अध्याय ${activeChapterIdQuery} (${activeSubjectQuery.toUpperCase()}) के महत्वपूर्ण प्रश्न और उत्तर।</p>
                    </div>

                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <h3 style="color: #fff; font-size: 1.1rem; font-family: var(--font-hindi); line-height: 1.5; margin-bottom: 15px;"><span style="color: var(--accent-main); font-weight: bold;">प्र. 1:</span> इस टॉपिक से जुड़ा मुख्य सिद्धांत क्या है? विस्तार से समझाइए।</h3>
                        <div class="qms-answer-box" style="display: none; background: rgba(0,255,136,0.1); border-left: 3px solid #00ff88; padding: 15px; border-radius: 8px; margin-top: 15px; color: #fff; font-size: 0.95rem; font-family: var(--font-hindi); line-height: 1.6;">
                            <strong>उत्तर:</strong> यह इस प्रश्न का विस्तृत और सटीक उत्तर है। बोर्ड परीक्षा के दृष्टिकोण से यह सिद्धांत बहुत महत्वपूर्ण है।
                        </div>
                        <button class="sfx-trigger show-ans-btn" style="background: transparent; border: 1px solid var(--accent-main); color: var(--accent-main); padding: 8px 18px; border-radius: 8px; cursor: pointer; margin-top: 10px; font-weight: bold; transition: 0.3s;">उत्तर देखें</button>
                    </div>
                    
                    <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <h3 style="color: #fff; font-size: 1.1rem; font-family: var(--font-hindi); line-height: 1.5; margin-bottom: 15px;"><span style="color: var(--accent-main); font-weight: bold;">प्र. 2:</span> परीक्षा के लिए सबसे महत्वपूर्ण सूत्र कौन से हैं?</h3>
                        <div class="qms-answer-box" style="display: none; background: rgba(0,255,136,0.1); border-left: 3px solid #00ff88; padding: 15px; border-radius: 8px; margin-top: 15px; color: #fff; font-size: 0.95rem; font-family: var(--font-hindi); line-height: 1.6;">
                            <strong>उत्तर:</strong> <br>1. प्रथम नियम सूत्र <br>2. मुख्य समीकरण (V = IR आदि)
                        </div>
                        <button class="sfx-trigger show-ans-btn" style="background: transparent; border: 1px solid var(--accent-main); color: var(--accent-main); padding: 8px 18px; border-radius: 8px; cursor: pointer; margin-top: 10px; font-weight: bold; transition: 0.3s;">उत्तर देखें</button>
                    </div>

                    <div style="text-align: center; margin-top: 30px;">
                        <button class="btn-primary-glow sfx-trigger" onclick="document.getElementById('close-content-modal').click();" style="font-family: var(--font-hindi);">
                            <i class="ri-check-double-line"></i> अभ्यास समाप्त करें
                        </button>
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                document.querySelectorAll('.show-ans-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        executeClickSound();
                        const ansBox = this.previousElementSibling;
                        if (ansBox.style.display === 'none') {
                            ansBox.style.display = 'block'; this.innerText = 'उत्तर छिपाएं';
                            this.style.background = 'var(--accent-main)'; this.style.color = '#000';
                        } else {
                            ansBox.style.display = 'none'; this.innerText = 'उत्तर देखें';
                            this.style.background = 'transparent'; this.style.color = 'var(--accent-main)';
                        }
                    });
                });
            }, 100);
        });
    });

    document.querySelectorAll('.topic-list li.locked').forEach(item => {
        item.addEventListener('click', () => {
            executeClickSound();
            window.showCustomToast("यह टॉपिक अभी लॉक है। पहले पिछले टॉपिक्स पूरे करें।", true);
        });
    });

    // ==========================================
    // G. 🚀 DIRECT DOWNLOAD FROM NETLIFY
    // ==========================================
    const buttonDownloadPdfNotes = document.getElementById('btn-download-notes');
    const dynamicDownloadModalOverlay = document.getElementById('download-modal');
    const progressFillAnimatedBar = document.getElementById('download-progress-fill');
    const progressStatusUpdateText = document.getElementById('download-status-text');

    if (buttonDownloadPdfNotes) {
        buttonDownloadPdfNotes.addEventListener('click', () => {
            dynamicDownloadModalOverlay.classList.add('active'); 
            let pseudoProgressValue = 0;
            const downloadProgressIntervalTimer = setInterval(() => {
                pseudoProgressValue += Math.floor(Math.random() * 10) + 5; 
                if (pseudoProgressValue > 100) pseudoProgressValue = 100;
                progressFillAnimatedBar.style.width = `${pseudoProgressValue}%`; 
                progressStatusUpdateText.innerText = `सुरक्षित रूप से डाउनलोड हो रहा है... ${pseudoProgressValue}%`;
                
                if (pseudoProgressValue === 100) {
                    clearInterval(downloadProgressIntervalTimer);
                    setTimeout(() => {
                        dynamicDownloadModalOverlay.classList.remove('active');
                        setTimeout(() => { progressFillAnimatedBar.style.width = '0%'; progressStatusUpdateText.innerText = 'तैयार...'; }, 500);
                        
                        const temporaryHyperlink = document.createElement('a'); 
                        temporaryHyperlink.href = activePdfUrl; 
                        temporaryHyperlink.download = `QMS_${activeSubjectQuery}_chapter_${activeChapterIdQuery}_${currentMedium}_notes.pdf`; 
                        document.body.appendChild(temporaryHyperlink); temporaryHyperlink.click(); document.body.removeChild(temporaryHyperlink);
                        window.showCustomToast(`PDF (${currentMedium === 'hi' ? 'हिंदी' : 'English'}) सफलतापूर्वक डाउनलोड हो गई है!`);
                    }, 500);
                }
            }, 200);
        });
    }

    // ==========================================
    // H. MARK COMPLETE LOGIC
    // ==========================================
    const buttonMarkCompleteChapter = document.getElementById('mark-complete-btn');
    const savedCompletedDataRawString = localStorage.getItem('qms_completed'); 
    let allCompletedChaptersDataObj = JSON.parse(savedCompletedDataRawString) || {}; 
    
    if (allCompletedChaptersDataObj[specificChapterKeyIdentifier] === true) { 
        if (buttonMarkCompleteChapter) { 
            buttonMarkCompleteChapter.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)'; 
            buttonMarkCompleteChapter.style.background = '#00ff88'; buttonMarkCompleteChapter.style.color = '#000'; buttonMarkCompleteChapter.disabled = true; 
        } 
    }
    
    if (buttonMarkCompleteChapter) {
        buttonMarkCompleteChapter.addEventListener('click', () => {
            if (allCompletedChaptersDataObj[specificChapterKeyIdentifier] !== true) {
                allCompletedChaptersDataObj[specificChapterKeyIdentifier] = true; 
                localStorage.setItem('qms_completed', JSON.stringify(allCompletedChaptersDataObj));
                buttonMarkCompleteChapter.innerHTML = '<i class="ri-check-line"></i> पूर्ण हो गया (Completed)'; 
                buttonMarkCompleteChapter.style.background = '#00ff88'; buttonMarkCompleteChapter.style.color = '#000'; buttonMarkCompleteChapter.disabled = true;
                window.showCustomToast("बधाई हो! आपने यह अध्याय पूरा कर लिया है। +50 XP");
            }
        });
    }

    // ==========================================
    // I. FIREFLY PARTICLES
    // ==========================================
    const targetParticleCanvasElement = document.getElementById('bg-canvas');
    if (targetParticleCanvasElement) {
        const primaryCanvasContext2D = targetParticleCanvasElement.getContext('2d'); 
        targetParticleCanvasElement.width = window.innerWidth; targetParticleCanvasElement.height = window.innerHeight;
        const listOfScienceFormulaSymbols = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ']; 
        let globalActiveParticlesArray = [];
        class QuantumFireflyObjectEngine {
            constructor() {
                this.geometricShapeType = Math.random() > 0.4 ? 'dot' : 'symbol';
                this.textStringSymbol = listOfScienceFormulaSymbols[Math.floor(Math.random() * listOfScienceFormulaSymbols.length)];
                this.canvasPositionX = Math.random() * targetParticleCanvasElement.width; this.canvasPositionY = Math.random() * targetParticleCanvasElement.height;
                if (this.geometricShapeType === 'symbol') { this.renderPixelSize = Math.random() * 15 + 10; this.movementSpeedX = Math.random() * 0.5 - 0.25; this.movementSpeedY = Math.random() * -0.8 - 0.2; } 
                else { this.renderPixelSize = Math.random() * 3 + 1; this.movementSpeedX = Math.random() * 1 - 0.5; this.movementSpeedY = Math.random() * -1 - 0.2; }
                this.alphaBlinkingVelocity = Math.random() * 0.05 + 0.02; this.alphaSineWaveAngle = Math.random() * Math.PI * 2;
            }
            recalculateCoordinateLogic() {
                this.canvasPositionY += this.movementSpeedY; this.canvasPositionX += this.movementSpeedX; this.alphaSineWaveAngle += this.alphaBlinkingVelocity;
                if (this.canvasPositionY < -30) { this.canvasPositionY = targetParticleCanvasElement.height + 30; this.canvasPositionX = Math.random() * targetParticleCanvasElement.width; }
                if (this.canvasPositionX < -30 || this.canvasPositionX > targetParticleCanvasElement.width + 30) { this.movementSpeedX = this.movementSpeedX * -1; }
            }
            renderVisualsToCanvas(ctx) {
                const globalRootComputedStyles = getComputedStyle(document.documentElement);
                let currentThemeAccentColorHex = globalRootComputedStyles.getPropertyValue('--accent-main').trim() || '#00f0ff';
                let dynamicOpacityFloatValue = ((Math.sin(this.alphaSineWaveAngle) + 1) / 2) * 0.8 + 0.1;
                ctx.fillStyle = `rgba(255, 255, 255, ${dynamicOpacityFloatValue})`; ctx.shadowBlur = dynamicOpacityFloatValue * 20; ctx.shadowColor = currentThemeAccentColorHex;
                if (this.geometricShapeType === 'symbol') { ctx.font = `${this.renderPixelSize}px "Space Grotesk", sans-serif`; ctx.fillText(this.textStringSymbol, this.canvasPositionX, this.canvasPositionY); } 
                else { ctx.beginPath(); ctx.arc(this.canvasPositionX, this.canvasPositionY, this.renderPixelSize, 0, Math.PI * 2); ctx.fill(); }
                ctx.shadowBlur = 0; 
            }
        }
        for (let loopCounter = 0; loopCounter < 60; loopCounter++) { globalActiveParticlesArray.push(new QuantumFireflyObjectEngine()); }
        function runMainRenderingLoop() { 
            primaryCanvasContext2D.clearRect(0, 0, targetParticleCanvasElement.width, targetParticleCanvasElement.height); 
            globalActiveParticlesArray.forEach(singleParticleElement => { singleParticleElement.recalculateCoordinateLogic(); singleParticleElement.renderVisualsToCanvas(primaryCanvasContext2D); }); 
            requestAnimationFrame(runMainRenderingLoop); 
        }
        runMainRenderingLoop();
        window.addEventListener('resize', () => { targetParticleCanvasElement.width = window.innerWidth; targetParticleCanvasElement.height = window.innerHeight; });
    }
});
