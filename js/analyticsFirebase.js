// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAL6QvyQ02MXDlbt_Tl-9JGeQjut99o07Y",
    authDomain: "mishkishow-6801f.firebaseapp.com",
    projectId: "mishkishow-6801f",
    storageBucket: "mishkishow-6801f.firebasestorage.app",
    messagingSenderId: "207995498766",
    appId: "1:207995498766:web:03d755b1c9844553dc675f",
    measurementId: "G-YKCMFDWH0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// document.getElementById("myButton").addEventListener("click", () => {
//     logEvent(analytics, 'button_click', {
//         button_name: 'My Button',
//         timestamp: new Date().toISOString(),
//     });
// });
