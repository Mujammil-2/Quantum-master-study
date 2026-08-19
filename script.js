document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Logic
    const htmlElement = document.documentElement;
    const themeButtons = document.querySelectorAll('.theme-btn');
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedTheme = e.target.getAttribute('data-set-theme');
            htmlElement.setAttribute('data-theme', selectedTheme);
            localStorage.setItem('qms_theme', selectedTheme);
        });
    });

    // 2. Audio Logic
    const bgMusic = document.getElementById('bg-music');
    const sfxClick = document.getElementById('sfx-click');
    const sfxTheme = document.getElementById('sfx-theme');
    let isMusicPlaying = false;

    document.body.addEventListener('click', () => {
        if (!isMusicPlaying && bgMusic) {
            bgMusic.volume = 0.15;
            bgMusic.play().catch(() => {});
            isMusicPlaying = true;
        }
    }, { once: true });

    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (sfxClick) {
                sfxClick.currentTime = 0;
                sfxClick.volume = 0.4;
                sfxClick.play().catch(() => {});
            }
        });
    });

    document.querySelectorAll('.sfx-theme-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (sfxTheme) {
                sfxTheme.currentTime = 0;
                sfxTheme.volume = 0.5;
                sfxTheme.play().catch(() => {});
            }
        });
    });

    // 3. Login Logic
    const loginBtn = document.getElementById('google-login-btn');
    if(loginBtn) {
        loginBtn.addEventListener('click', () => {
            loginBtn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Authenticating...`;
            setTimeout(() => {
                window.location.href = 'dashboard.html'; 
            }, 1500);
        });
    }

    // 4. Particles Logic
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.width * canvas.height) / 10000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }
});
