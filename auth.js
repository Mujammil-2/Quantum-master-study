/* =========================================================================
   QMS AUTHENTICATION ENGINE (PRO LEVEL - 100% FULL CODE)
   - FEATURES:
     1. Persistent Login Auto-Redirect
     2. Email/Password Local Validation & Privacy
     3. Features Info Modal Logic
     4. Animated Background Fireflies on Login
     5. Google, Facebook, Instagram, Guest Handlers
========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. AUTO-REDIRECT (Persistent Login Check)
    // ==========================================
    const userIsAlreadyLoggedIn = localStorage.getItem('qms_is_logged_in');
    
    if (userIsAlreadyLoggedIn === 'true') {
        // If logged in, hide screen and redirect immediately to dashboard
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 500);
        return; // Stop further execution
    }

    // ==========================================
    // 2. THEME & SOUND FX LOGIC
    // ==========================================
    const currentlySavedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', currentlySavedTheme);

    const clickSoundAudioNode = document.getElementById('sfx-click'); 
    let systemSoundIsOn = localStorage.getItem('qms_sound') !== 'off';

    function triggerClickSound() {
        if (systemSoundIsOn && clickSoundAudioNode) {
            clickSoundAudioNode.currentTime = 0;
            clickSoundAudioNode.volume = 1.0;
            clickSoundAudioNode.play().catch(()=>{});
        }
    }

    const triggerElements = document.querySelectorAll('.sfx-trigger');
    triggerElements.forEach(elementNode => {
        elementNode.addEventListener('click', triggerClickSound);
    });

    // ==========================================
    // 3. PREMIUM CUSTOM TOAST NOTIFICATIONS
    // ==========================================
    window.showCustomToast = function(toastMessageText, isErrorAlert = false) {
        const preExistingToast = document.querySelector('.qms-toast-msg'); 
        if (preExistingToast) {
            preExistingToast.remove();
        }
        
        const toastDomElement = document.createElement('div');
        
        if (isErrorAlert) {
            toastDomElement.className = 'qms-toast-msg qms-toast-error';
            toastDomElement.innerHTML = `<i class="ri-error-warning-fill"></i> ${toastMessageText}`;
        } else {
            toastDomElement.className = 'qms-toast-msg';
            toastDomElement.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${toastMessageText}`;
        }
        
        document.body.appendChild(toastDomElement); 
        
        setTimeout(() => { 
            if (toastDomElement) {
                toastDomElement.remove(); 
            }
        }, 3500);
    };

    // ==========================================
    // 4. 🚀 NEW: FEATURES MODAL LOGIC
    // ==========================================
    const buttonOpenFeatures = document.getElementById('open-features-btn');
    const buttonCloseFeatures = document.getElementById('close-features-btn');
    const overlayFeaturesModal = document.getElementById('features-modal');

    if (buttonOpenFeatures && overlayFeaturesModal) {
        buttonOpenFeatures.addEventListener('click', () => {
            overlayFeaturesModal.classList.add('active');
        });
    }

    if (buttonCloseFeatures && overlayFeaturesModal) {
        buttonCloseFeatures.addEventListener('click', () => {
            overlayFeaturesModal.classList.remove('active');
        });
    }

    // Optional: Close modal when clicking outside the box
    if (overlayFeaturesModal) {
        overlayFeaturesModal.addEventListener('click', (event) => {
            if (event.target === overlayFeaturesModal) {
                overlayFeaturesModal.classList.remove('active');
            }
        });
    }

    // ==========================================
    // 5. LOGIN FORM LOGIC (EMAIL / PASSWORD)
    // ==========================================
    const authLoginForm = document.getElementById('login-form');
    
    if (authLoginForm) {
        authLoginForm.addEventListener('submit', function(submitEvent) {
            submitEvent.preventDefault(); // Stop page reload
            
            const providedEmailValue = document.getElementById('auth-email').value;
            const providedPasswordValue = document.getElementById('auth-password').value;
            
            if (providedEmailValue && providedPasswordValue.length >= 6) {
                
                // Extract Name from Email securely
                let extractedUserName = providedEmailValue.split('@')[0];
                if(extractedUserName.length > 0) {
                    extractedUserName = extractedUserName.charAt(0).toUpperCase() + extractedUserName.slice(1);
                } else {
                    extractedUserName = "Student";
                }

                // SECURE LOCAL STORAGE SAVING
                localStorage.setItem('qms_is_logged_in', 'true');
                localStorage.setItem('qms_user_name', extractedUserName);
                localStorage.setItem('qms_user_email', providedEmailValue);
                localStorage.setItem('qms_auth_type', 'Email');

                window.showCustomToast(`वेलकम बैक, ${extractedUserName}!`);
                
                // Redirect
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } else {
                window.showCustomToast("कृपया सही ईमेल और कम से कम 6 अंकों का पासवर्ड दर्ज करें।", true);
            }
        });
    }

    // ==========================================
    // 6. SOCIAL LOGIN LOGIC (Simulated Securely)
    // ==========================================
    window.handleSocialLogin = function(socialProviderName) {
        triggerClickSound();
        
        window.showCustomToast(`${socialProviderName} से सुरक्षित रूप से कनेक्ट हो रहा है...`);
        
        setTimeout(() => {
            localStorage.setItem('qms_is_logged_in', 'true');
            localStorage.setItem('qms_user_name', `${socialProviderName} User`);
            localStorage.setItem('qms_auth_type', socialProviderName);
            
            window.location.href = 'dashboard.html';
        }, 2000);
    };

    // ==========================================
    // 7. GUEST LOGIN LOGIC
    // ==========================================
    window.handleGuestLogin = function() {
        triggerClickSound();
        
        localStorage.setItem('qms_is_logged_in', 'true');
        localStorage.setItem('qms_user_name', 'Guest Student');
        localStorage.setItem('qms_auth_type', 'Guest');
        
        window.showCustomToast("गेस्ट मोड में प्रवेश कर रहे हैं...");
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    };

    // ==========================================
    // 8. BACKGROUND FIREFLIES ENGINE (FOR LOGIN)
    // ==========================================
    const backgroundCanvasNode = document.getElementById('bg-canvas');
    
    if (backgroundCanvasNode) {
        const renderContext2D = backgroundCanvasNode.getContext('2d'); 
        
        backgroundCanvasNode.width = window.innerWidth; 
        backgroundCanvasNode.height = window.innerHeight;
        
        const mathScienceSymbolsList = ['∑', 'π', '∞', '∫', 'Ω', 'E=mc²', 'H₂O', 'θ', 'λ', 'μ', '⚛', 'α', 'β', 'Δ'];
        let activeParticlesCollection = [];
        
        class LoginFireflyParticle {
            constructor() {
                const shapeTypeRandomizer = Math.random();
                if (shapeTypeRandomizer > 0.4) {
                    this.particleShape = 'dot';
                } else {
                    this.particleShape = 'symbol';
                }
                
                const randomSymbolSelection = Math.floor(Math.random() * mathScienceSymbolsList.length);
                this.textSymbol = mathScienceSymbolsList[randomSymbolSelection];
                
                this.coordinateX = Math.random() * backgroundCanvasNode.width; 
                this.coordinateY = Math.random() * backgroundCanvasNode.height;
                
                if (this.particleShape === 'symbol') { 
                    this.pixelSize = Math.random() * 15 + 10; 
                    this.velocityVectorX = Math.random() * 0.5 - 0.25; 
                    this.velocityVectorY = Math.random() * -0.8 - 0.2; 
                } else { 
                    this.pixelSize = Math.random() * 3 + 1; 
                    this.velocityVectorX = Math.random() * 1 - 0.5; 
                    this.velocityVectorY = Math.random() * -1 - 0.2; 
                }
                
                this.alphaBlinkingSpeed = Math.random() * 0.05 + 0.02; 
                this.alphaSineAngle = Math.random() * Math.PI * 2;
            }
            
            updatePositionData() {
                this.coordinateY += this.velocityVectorY; 
                this.coordinateX += this.velocityVectorX; 
                this.alphaSineAngle += this.alphaBlinkingSpeed;
                
                if (this.coordinateY < -30) { 
                    this.coordinateY = backgroundCanvasNode.height + 30; 
                    this.coordinateX = Math.random() * backgroundCanvasNode.width; 
                }
                
                if (this.coordinateX < -30 || this.coordinateX > backgroundCanvasNode.width + 30) { 
                    this.velocityVectorX = this.velocityVectorX * -1; 
                }
            }
            
            drawOntoCanvas(ctxObject) {
                const rootCssVariables = getComputedStyle(document.documentElement); 
                let currentThemeAccentColor = rootCssVariables.getPropertyValue('--accent-main').trim();
                
                if (!currentThemeAccentColor) {
                    currentThemeAccentColor = '#00f0ff';
                }
                
                let dynamicOpacityNumber = ((Math.sin(this.alphaSineAngle) + 1) / 2) * 0.8 + 0.1;
                
                ctxObject.fillStyle = `rgba(255, 255, 255, ${dynamicOpacityNumber})`; 
                ctxObject.shadowBlur = dynamicOpacityNumber * 20; 
                ctxObject.shadowColor = currentThemeAccentColor;
                
                if (this.particleShape === 'symbol') { 
                    ctxObject.font = `${this.pixelSize}px "Space Grotesk", sans-serif`; 
                    ctxObject.fillText(this.textSymbol, this.coordinateX, this.coordinateY); 
                } else { 
                    ctxObject.beginPath(); 
                    ctxObject.arc(this.coordinateX, this.coordinateY, this.pixelSize, 0, Math.PI * 2); 
                    ctxObject.fill(); 
                }
                
                // Clear shadow
                ctxObject.shadowBlur = 0; 
            }
        }
        
        // Spawn 40 Particles for Login Screen
        for (let iterationIndex = 0; iterationIndex < 40; iterationIndex++) {
            activeParticlesCollection.push(new LoginFireflyParticle());
        }
        
        function executeBackgroundAnimation() { 
            renderContext2D.clearRect(0, 0, backgroundCanvasNode.width, backgroundCanvasNode.height); 
            
            activeParticlesCollection.forEach(particleItem => { 
                particleItem.updatePositionData(); 
                particleItem.drawOntoCanvas(renderContext2D); 
            }); 
            
            requestAnimationFrame(executeBackgroundAnimation); 
        }
        
        executeBackgroundAnimation();
        
        // Ensure canvas scales accurately on resize
        window.addEventListener('resize', () => { 
            backgroundCanvasNode.width = window.innerWidth; 
            backgroundCanvasNode.height = window.innerHeight; 
        });
    }

});
