// firebase-config.js

// ✅ Your Firebase Config (v8 style)
const firebaseConfig = {
  apiKey: "AIzaSyCG7iygS5Sw_dbABxOGSg0W_EjGOUMHRgI",
  authDomain: "e-gram-panchayat-7a873.firebaseapp.com",
  projectId: "e-gram-panchayat-7a873",
  storageBucket: "e-gram-panchayat-7a873.appspot.com",
  messagingSenderId: "337049877815",
  appId: "1:337049877815:web:5db2d6c5829b4d5c04eeb2"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ Global Auth & Firestore references
const auth = firebase.auth();
const db = firebase.firestore();
