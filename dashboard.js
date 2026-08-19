document.addEventListener('DOMContentLoaded', () => {
    // थीम लोड करना
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // साउंड इफेक्ट्स
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

    // गोल एनीमेशन
    setTimeout(() => {
        const goalFill = document.querySelector('.progress-fill');
        if(goalFill) {
            goalFill.style.width = '10%';
        }
    }, 500);
});
