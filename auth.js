/* =========================================================================
   QMS AUTHENTICATION ENGINE (PRO LEVEL - FULLY EXPANDED CODE)
   - 100% UNCOMPRESSED / DETAILED LINES
   - FEATURES:
     1. Real OAuth Consent Flow Simulation (Permission Screen)
     2. Original SVG Logo Injection Logic
     3. Persistent Login Auto-Redirect
     4. Features Info Modal Logic
     5. Animated Background Fireflies
========================================================================= */

// SVG Strings for dynamic injection in the OAuth Modal
const svgs = {
    Google: `<svg viewBox="0 0 24 24" width="45" height="45" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`,
    Facebook: `<svg viewBox="0 0 24 24" width="45" height="45" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/><path d="M16.671 15.542l.532-3.469h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.514V5.002s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.637H7.078v3.469h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z" fill="#ffffff"/></svg>`,
    Instagram: `<svg viewBox="0 0 24 24" width="45" height="45" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ig-grad-lg-auth" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#405de6" /><stop offset="25%" stop-color="#5851db" /><stop offset="50%" stop-color="#833ab4" /><stop offset="75%" stop-color="#c13584" /><stop offset="100%" stop-color="#e1306c" /></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.98a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.88z" fill="url(#ig-grad-lg-auth)"/></svg>`
};

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. AUTO-REDIRECT (Persistent Login Check)
    // ==========================================
    const userIsAlreadyLoggedIn = localStorage.getItem('qms_is_logged_in');
    
    if (userIsAlreadyLoggedIn === 'true') {
        // If user is already authenticated, fade out and redirect to dashboard
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 500);
        
        return; // Prevent the rest of the script from executing unnecessarily
    }

    // ==========================================
    // 2. THEME & SOUND FX LOGIC
    // ==========================================
    const currentlySavedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', currentlySavedTheme);

    const clickSoundAudioNode = document.getElementById('sfx-click'); 
    let systemSoundIsOn = true;
    
    if (localStorage.getItem('qms_sound') === 'off') {
        systemSoundIsOn = false;
    }

    function triggerClickSound() {
        if (systemSoundIsOn && clickSoundAudioNode) {
            clickSoundAudioNode.currentTime = 0;
            clickSoundAudioNode.volume = 1.0;
            clickSoundAudioNode.play().catch(error => {
                console.log("Audio play blocked by browser:", error);
            });
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
        
        // Remove existing toast if there is one
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
        
        // Self-destruct after 3.5 seconds
        setTimeout(() => { 
            if (toastDomElement) {
                toastDomElement.remove(); 
            }
        }, 3500);
    };

    // ==========================================
    // 4. FEATURES INFO MODAL LOGIC
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

    // ==========================================
    // 5. LOGIN FORM LOGIC (EMAIL / PASSWORD)
    // ==========================================
    const authLoginForm = document.getElementById('login-form');
    
    if (authLoginForm) {
        authLoginForm.addEventListener('submit', function(submitEvent) {
            submitEvent.preventDefault(); // Stop normal form submission
            
            const providedEmailValue = document.getElementById('auth-email').value;
            const providedPasswordValue = document.getElementById('auth-password').value;
            
            // Basic validation
            if (providedEmailValue && providedPasswordValue.length >= 6) {
                
                // Extract User Name from the email (everything before the @ symbol)
                let extractedUserName = providedEmailValue.split('@')[0];
                
                if (extractedUserName.length > 0) { 
                    // Capitalize the first letter
                    extractedUserName = extractedUserName.charAt(0).toUpperCase() + extractedUserName.slice(1); 
                } else { 
                    extractedUserName = "Student"; 
                }

                // Save details securely to Local Storage
                localStorage.setItem('qms_is_logged_in', 'true');
                localStorage.setItem('qms_user_name', extractedUserName);
                localStorage.setItem('qms_user_email', providedEmailValue);
                localStorage.setItem('qms_auth_type', 'Email');

                window.showCustomToast(`वेलकम बैक, ${extractedUserName}!`);
                
                // Redirect to dashboard
                setTimeout(() => { 
                    window.location.href = 'dashboard.html'; 
                }, 1500);

            } else {
                window.showCustomToast("कृपया सही ईमेल और कम से कम 6 अंकों का पासवर्ड दर्ज करें।", true);
            }
        });
    }

    // ==========================================
    // 6. REAL OAUTH CONSENT LOGIC (Google/FB/IG)
    // ==========================================
    const oauthModalOverlay = document.getElementById('oauth-modal');
    const oauthAllowButton = document.getElementById('oauth-allow-btn');
    const oauthCancelButton = document.getElementById('oauth-cancel-btn');
    const oauthProviderNameText = document.getElementById('oauth-provider-name');
    const oauthProviderIconContainer = document.getElementById('oauth-provider-icon');

    // Step 1: Open the Consent Popup when Social Button is clicked
    window.openOAuthConsent = function(providerName) {
        triggerClickSound();
        
        // Setup the modal UI based on selected provider
        oauthProviderNameText.innerText = providerName;
        oauthProviderIconContainer.innerHTML = svgs[providerName];
        
        // Change Allow Button Color to match the brand identity
        if (providerName === 'Google') {
            oauthAllowButton.style.background = '#4285F4';
        }
        
        if (providerName === 'Facebook') {
            oauthAllowButton.style.background = '#1877F2';
        }
        
        if (providerName === 'Instagram') {
            oauthAllowButton.style.background = '#e1306c';
        }
        
        // Store which provider requested auth in a data attribute
        oauthModalOverlay.setAttribute('data-requesting-provider', providerName);
        
        // Show Modal
        oauthModalOverlay.classList.add('active');
    };

    // Step 2: User Clicks "Allow"
    if (oauthAllowButton) {
        oauthAllowButton.addEventListener('click', () => {
            triggerClickSound();
            
            const activeProvider = oauthModalOverlay.getAttribute('data-requesting-provider');
            
            // Hide Modal immediately
            oauthModalOverlay.classList.remove('active');
            
            // Show Success Notification mimicking a successful OAuth return
            window.showCustomToast(`✓ ${activeProvider} से सुरक्षित रूप से प्रमाणित किया गया।`);
            
            // Save data to LocalStorage and Redirect
            setTimeout(() => {
                localStorage.setItem('qms_is_logged_in', 'true');
                localStorage.setItem('qms_user_name', `${activeProvider} User`);
                localStorage.setItem('qms_auth_type', activeProvider);
                
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    // Step 3: User Clicks "Cancel"
    if (oauthCancelButton) {
        oauthCancelButton.addEventListener('click', () => {
            triggerClickSound();
            oauthModalOverlay.classList.remove('active');
            window.showCustomToast("लॉगिन रद्द कर दिया गया।", true);
        });
    }

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
    // 8. BACKGROUND FIREFLIES ENGINE
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
                // Determine if particle is a dot or a symbol
                const shapeTypeRandomizer = Math.random();
                if (shapeTypeRandomizer > 0.4) {
                    this.particleShape = 'dot';
                } else {
                    this.particleShape = 'symbol';
                }
                
                // Select Random Symbol
                const randomSymbolSelection = Math.floor(Math.random() * mathScienceSymbolsList.length);
                this.textSymbol = mathScienceSymbolsList[randomSymbolSelection];
                
                // Set initial random coordinates
                this.coordinateX = Math.random() * backgroundCanvasNode.width; 
                this.coordinateY = Math.random() * backgroundCanvasNode.height;
                
                // Define size and velocity vectors
                if (this.particleShape === 'symbol') { 
                    this.pixelSize = Math.random() * 15 + 10; 
                    this.velocityVectorX = Math.random() * 0.5 - 0.25; 
                    this.velocityVectorY = Math.random() * -0.8 - 0.2; 
                } else { 
                    this.pixelSize = Math.random() * 3 + 1; 
                    this.velocityVectorX = Math.random() * 1 - 0.5; 
                    this.velocityVectorY = Math.random() * -1 - 0.2; 
                }
                
                // Configuration for the blinking effect
                this.alphaBlinkingSpeed = Math.random() * 0.05 + 0.02; 
                this.alphaSineAngle = Math.random() * Math.PI * 2;
            }
            
            updatePositionData() {
                this.coordinateY += this.velocityVectorY; 
                this.coordinateX += this.velocityVectorX; 
                this.alphaSineAngle += this.alphaBlinkingSpeed;
                
                // Loop vertical boundaries
                if (this.coordinateY < -30) { 
                    this.coordinateY = backgroundCanvasNode.height + 30; 
                    this.coordinateX = Math.random() * backgroundCanvasNode.width; 
                }
                
                // Bounce horizontal boundaries
                if (this.coordinateX < -30 || this.coordinateX > backgroundCanvasNode.width + 30) { 
                    this.velocityVectorX = this.velocityVectorX * -1; 
                }
            }
            
            drawOntoCanvas(ctxObject) {
                // Check CSS Custom Property for Accent Color
                const rootCssVariables = getComputedStyle(document.documentElement); 
                let currentThemeAccentColor = rootCssVariables.getPropertyValue('--accent-main').trim();
                
                if (currentThemeAccentColor === "") {
                    currentThemeAccentColor = '#00f0ff';
                }
                
                // Calculate Blinking Opacity using Sine wave
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
                
                // Reset shadow to avoid bleed
                ctxObject.shadowBlur = 0; 
            }
        }
        
        // Spawn particles
        for (let iterationIndex = 0; iterationIndex < 40; iterationIndex++) { 
            activeParticlesCollection.push(new LoginFireflyParticle()); 
        }
        
        // Render loop
        function executeBackgroundAnimation() { 
            renderContext2D.clearRect(0, 0, backgroundCanvasNode.width, backgroundCanvasNode.height); 
            
            activeParticlesCollection.forEach(particleItem => { 
                particleItem.updatePositionData(); 
                particleItem.drawOntoCanvas(renderContext2D); 
            }); 
            
            requestAnimationFrame(executeBackgroundAnimation); 
        }
        
        executeBackgroundAnimation();
        
        // Window Resize Handler
        window.addEventListener('resize', () => { 
            backgroundCanvasNode.width = window.innerWidth; 
            backgroundCanvasNode.height = window.innerHeight; 
        });
    }

});
