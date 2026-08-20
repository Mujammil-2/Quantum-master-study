/* =================================================
   QMS DASHBOARD ENGINE (Clean UI Fix)
================================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Theme load
    const savedTheme = localStorage.getItem('qms_theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Load User Name & Profile Picture
    const savedName = localStorage.getItem('qms_user_name') || 'Student';
    document.getElementById('dash-user-name').innerText = savedName;

    const savedImg = localStorage.getItem('qms_profile_img');
    if(savedImg) {
        document.getElementById('dash-small-avatar').src = savedImg;
    }

    // Load Stats
    let completedData = JSON.parse(localStorage.getItem('qms_completed')) || {};
    let completedCount = Object.keys(completedData).length;
    let totalXP = completedCount * 50;
    
    document.getElementById('dash-completed-count').innerText = completedCount;
    document.getElementById('dash-total-xp').innerText = totalXP;

    // SFX
    const sfxClick = document.getElementById('sfx-click');
    let isSoundOn = localStorage.getItem('qms_sound') !== 'off';
    document.querySelectorAll('.sfx-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSoundOn && sfxClick) {
                sfxClick.currentTime = 0;
                sfxClick.volume = 0.4;
                sfxClick.play().catch(() => {});
            }
        });
    });
});
