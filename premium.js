/* =========================================================================
   QMS DYNAMIC PAYMENT & COUPON ENGINE
   - Handles Dynamic Pricing (Base ₹50)
   - Validates Coupons & Reduces Price
   - Generates Dynamic UPI QR Code with exact amount
   - Saves Payment Request (UTR) to Firestore for Admin Approval
========================================================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase Config
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

// 🚨🚨🚨 अपना असली UPI ID यहाँ डालें 🚨🚨🚨
const MY_UPI_ID = "यहाँ_अपनी_असली_UPI_ID_डालें"; // उदा: "9876543210@ybl" या "bittu@paytm"
const PAYEE_NAME = "Quantum Master Study";

// 🎁 कूपन कोड लिस्ट (तुम यहाँ और भी कूपन जोड़ सकते हो)
const validCoupons = {
    "QMS20": 20, // 20 रुपये की छूट
    "DIWALI": 30, // 30 रुपये की छूट
    "FREE100": 50 // 50 रुपये की छूट (फ्री)
};

// State Variables
const basePrice = 50;
let finalAmount = basePrice;
let appliedCouponCode = "";

// DOM Elements
const finalPriceEl = document.getElementById('final-price');
const discountRow = document.getElementById('discount-row');
const discountAmountEl = document.getElementById('discount-amount');
const appliedCouponNameEl = document.getElementById('applied-coupon-name');
const dynamicQrImg = document.getElementById('dynamic-qr');
const displayUpiId = document.getElementById('display-upi-id');
const couponInput = document.getElementById('coupon-input');
const applyCouponBtn = document.getElementById('apply-coupon-btn');
const utrInput = document.getElementById('utr-input');
const submitBtn = document.getElementById('submit-payment-btn');

// Toast Function
const showToast = (msg, isError = false) => {
    const toast = document.getElementById('toast');
    toast.style.borderLeftColor = isError ? '#ff4d4d' : 'var(--accent-gold)';
    document.getElementById('toast-text').innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
};

document.addEventListener('DOMContentLoaded', () => {
    const uid = localStorage.getItem('qms_user_uid');
    if (!uid) {
        alert("कृपया पहले लॉगिन करें!");
        window.location.href = 'index.html';
        return;
    }

    displayUpiId.innerText = MY_UPI_ID;
    updateQRCodeAndPrice(); // पहली बार ₹50 का QR जनरेट करेगा
});

// डायनामिक QR कोड जनरेटर फंक्शन
function updateQRCodeAndPrice() {
    finalPriceEl.innerText = finalAmount;
    
    // अगर प्राइस 0 हो गया (फ्री कूपन), तो QR छुपा दो
    if (finalAmount <= 0) {
        dynamicQrImg.style.display = 'none';
        document.querySelector('.qr-text').innerText = "यह कूपन 100% फ्री है! सीधा वेरीफाई करें।";
        utrInput.value = "FREECOUPON";
        utrInput.disabled = true;
    } else {
        dynamicQrImg.style.display = 'inline-block';
        document.querySelector('.qr-text').innerText = `अपने पेमेंट ऐप से स्कैन करके ₹${finalAmount} पे करें`;
        utrInput.disabled = false;
        
        // UPI Link Format: upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=INR
        const upiLink = `upi://pay?pa=${MY_UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${finalAmount}&cu=INR`;
        
        // Google/QRServer API का इस्तेमाल करके लिंक को QR इमेज में बदलना
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;
        dynamicQrImg.src = qrApiUrl;
    }
}

// 🎁 कूपन अप्लाई करने का लॉजिक
applyCouponBtn.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();
    
    if (code === "") {
        showToast("कृपया कूपन कोड डालें!", true);
        return;
    }

    if (validCoupons.hasOwnProperty(code)) {
        const discount = validCoupons[code];
        
        // अगर कूपन पहले से अप्लाई है या नया प्राइस 0 से कम जा रहा है
        if (basePrice - discount < 0) {
            finalAmount = 0;
        } else {
            finalAmount = basePrice - discount;
        }

        appliedCouponCode = code;
        
        // UI अपडेट
        discountRow.style.display = 'flex';
        discountAmountEl.innerText = discount;
        appliedCouponNameEl.innerText = code;
        
        showToast(`कूपन अप्लाई हो गया! ₹${discount} की छूट मिली। 🎉`);
        updateQRCodeAndPrice(); // QR कोड का प्राइस तुरंत बदल जाएगा!
        
    } else {
        showToast("यह कूपन कोड गलत है या एक्सपायर हो गया है।", true);
        discountRow.style.display = 'none';
        finalAmount = basePrice;
        appliedCouponCode = "";
        updateQRCodeAndPrice();
    }
});

// 💾 पेमेंट रिक्वेस्ट (UTR) फायरबेस में सेव करना
submitBtn.addEventListener('click', async () => {
    const utr = utrInput.value.trim();
    const uid = localStorage.getItem('qms_user_uid');
    const userName = localStorage.getItem('qms_user_name') || 'Student';
    const userEmail = localStorage.getItem('qms_user_email') || '';

    // अगर पेमेंट 0 नहीं है, तो UTR चेक करो
    if (finalAmount > 0 && utr.length < 12) {
        showToast("कृपया सही 12-अंकों का UTR / Reference Number डालें!", true);
        return;
    }

    submitBtn.innerText = "वेरीफाई कर रहे हैं...";
    submitBtn.disabled = true;

    try {
        // 'payments' नाम के नए कलेक्शन में डेटा सेव करना
        await addDoc(collection(db, "payments"), {
            uid: uid,
            name: userName,
            email: userEmail,
            amountPayable: finalAmount,
            basePrice: basePrice,
            couponUsed: appliedCouponCode,
            utrNumber: utr,
            status: "Pending", // तुम फायरबेस से इसे "Approved" करोगे
            createdAt: serverTimestamp()
        });

        showToast("आपकी पेमेंट रिक्वेस्ट भेज दी गई है! 2-4 घंटे में PRO एक्टिव हो जाएगा।");
        
        // 2 सेकंड बाद डैशबोर्ड पर वापस भेज दो
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2500);

    } catch (error) {
        console.error("Payment Submission Error: ", error);
        showToast("सर्वर एरर! कृपया दोबारा प्रयास करें।", true);
        submitBtn.innerHTML = `<i class="ri-shield-check-fill"></i> पेमेंट वेरीफाई करें`;
        submitBtn.disabled = false;
    }
});
