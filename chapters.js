/* =================================================
   QMS CHAPTERS ENGINE (Phase 5)
================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // थीम लोड करना
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // यूआरएल (URL) से सब्जेक्ट का नाम पढ़ना
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');

    // सब्जेक्ट के हिसाब से पेज का टाइटल और आइकॉन बदलना (Smart Feature)
    const title = document.getElementById('subject-title');
    const subtitle = document.getElementById('subject-subtitle');
    const icon = document.getElementById('hero-icon');
    const heroCard = document.getElementById('subject-hero-card');

    if (subject === 'chemistry') {
        title.innerText = 'रसायन विज्ञान';
        subtitle.innerText = 'Chemistry (PCM)';
        icon.innerHTML = '<i class="ri-test-tube-fill"></i>';
        heroCard.style.borderTopColor = '#b535ff';
        icon.style.color = '#b535ff';
        icon.style.boxShadow = '0 0 20px rgba(181,53,255,0.4)';
    } else if (subject === 'mathematics') {
        title.innerText = 'गणित';
        subtitle.innerText = 'Mathematics (PCM)';
        icon.innerHTML = '<i class="ri-functions"></i>';
        heroCard.style.borderTopColor = '#00ff88';
        icon.style.color = '#00ff88';
        icon.style.boxShadow = '0 0 20px rgba(0,255,136,0.4)';
    } 
    // Default Physics ही रहेगा जो HTML में लिखा है

    // बटन्स पर क्लिक साउंड
    const sfxClick = document.getElementById('sfx-click');
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (sfxClick) {
                sfxClick.currentTime = 0;
                sfxClick.volume = 0.4;
                sfxClick.play().catch(() => {});
            }
        });
    });

});
