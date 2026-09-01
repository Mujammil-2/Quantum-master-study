/* =========================================================================
   QMS JAVASCRIPT MASTER ENGINE (REAL-TIME LEADERBOARD)
   - FEATURES:
     1. Live Sync with Firestore (No refresh needed)
     2. Top 3 Podium Dynamic Renderer
     3. Top 20 List Renderer
     4. Highlights current user's row
========================================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCkxx9bVjvAYarA0WrHfW5k_gxwUPZaaw",
    authDomain: "quantum-master-study.firebaseapp.com",
    projectId: "quantum-master-study",
    storageBucket: "quantum-master-study.firebasestorage.app",
    messagingSenderId: "193145760847",
    appId: "1:193145760847:web:7d1f77be123c3edb104e3a",
    measurementId: "G-SH39JL930R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get current user's UID to highlight them in the list
const currentUid = localStorage.getItem('qms_user_uid');

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('lb-loading');
    const podiumContainer = document.getElementById('podium-container');
    const listContainer = document.getElementById('lb-list-container');
    
    const spot1 = document.getElementById('podium-1');
    const spot2 = document.getElementById('podium-2');
    const spot3 = document.getElementById('podium-3');

    // Firestore से 'users' कलेक्शन लाओ, totalXp के हिसाब से घटते क्रम (desc) में लगाओ, और सिर्फ टॉप 20 लाओ
    const usersRef = collection(db, "users");
    const top20Query = query(usersRef, orderBy("totalXp", "desc"), limit(20));

    // 🔥 'onSnapshot' का जादू: जैसे ही डेटाबेस में किसी का XP बदलेगा, यह फंक्शन अपने आप फिर से चल जाएगा! 🔥
    onSnapshot(top20Query, (snapshot) => {
        const topStudents = [];
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            // हम सिर्फ उन यूज़र्स को दिखाएंगे जिनका नाम और XP सेट हो चुका है
            if (data.name && data.totalXp !== undefined) {
                topStudents.push({
                    uid: doc.id,
                    name: data.name,
                    photoURL: data.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Student&backgroundColor=b6e3f4',
                    city: data.city || 'Unknown City',
                    totalXp: data.totalXp || 0
                });
            }
        });

        // अगर कोई स्टूडेंट नहीं है
        if (topStudents.length === 0) {
            loadingScreen.innerHTML = '<p>अभी तक किसी स्टूडेंट ने XP नहीं कमाया है। आप पहले बन सकते हैं!</p>';
            return;
        }

        // लोडिंग हटाओ और कंटेनर्स दिखाओ
        loadingScreen.style.display = 'none';
        podiumContainer.style.display = 'flex';
        listContainer.style.display = 'flex';
        
        // ----------------------------------------------------
        // 1. TOP 3 PODIUM RENDER
        // ----------------------------------------------------
        
        // Helper function for podium spots
        const renderPodiumSpot = (spotElement, student, rank) => {
            if (student) {
                let crown = rank === 1 ? '<i class="ri-vip-crown-fill crown-icon"></i>' : '';
                spotElement.innerHTML = `
                    ${crown}
                    <img src="${student.photoURL}" class="lb-avatar" alt="Avatar">
                    <div class="podium-name" title="${student.name}">${student.name}</div>
                    <div class="podium-xp">${student.totalXp.toLocaleString()} XP</div>
                    <div class="podium-base">${rank}</div>
                `;
            } else {
                spotElement.innerHTML = ''; // अगर बच्चे 3 से कम हैं तो खाली रखो
            }
        };

        renderPodiumSpot(spot1, topStudents[0], 1);
        renderPodiumSpot(spot2, topStudents[1], 2);
        renderPodiumSpot(spot3, topStudents[2], 3);

        // ----------------------------------------------------
        // 2. LIST RENDER (Rank 4 to 20)
        // ----------------------------------------------------
        let listHTML = '';
        
        for (let i = 3; i < topStudents.length; i++) {
            const student = topStudents[i];
            const rank = i + 1;
            
            // अगर यह खुद करेंट यूज़र है, तो उसे हाईलाइट (current-user-row) करो
            const highlightClass = (student.uid === currentUid) ? 'current-user-row' : '';

            listHTML += `
                <div class="lb-row ${highlightClass}">
                    <div class="row-left">
                        <div class="row-rank">#${rank}</div>
                        <img src="${student.photoURL}" class="row-avatar" alt="Avatar">
                        <div>
                            <div class="row-name">${student.name}</div>
                            <div class="row-city"><i class="ri-map-pin-line"></i> ${student.city}</div>
                        </div>
                    </div>
                    <div class="row-right">
                        <div class="row-xp">${student.totalXp.toLocaleString()} XP</div>
                    </div>
                </div>
            `;
        }
        
        listContainer.innerHTML = listHTML;
        
    }, (error) => {
        console.error("Leaderboard fetch error: ", error);
        loadingScreen.innerHTML = '<p style="color: #ff4d4d;">लीडरबोर्ड लोड करने में एरर आई। कृपया इंटरनेट कनेक्शन चेक करें।</p>';
    });

});
