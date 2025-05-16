// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCpKBAWYCoJK_-Iv_AQHMwQRKN-zfwa61M",
    authDomain: "react-form-submit-5b02c.firebaseapp.com",
    projectId: "react-form-submit-5b02c",
    storageBucket: "react-form-submit-5b02c.firebasestorage.app",
    messagingSenderId: "302038726748",
    appId: "1:302038726748:web:5a507c9503d9c431904e99",
    measurementId: "G-2NGLBHVY5Y",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
