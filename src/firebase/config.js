// src/firebase/config.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCG7iygS5Sw_dbABxOGSg0W_EjGOUMHRgI",
  authDomain: "e-gram-panchayat-7a873.firebaseapp.com",
  projectId: "e-gram-panchayat-7a873",
  storageBucket: "e-gram-panchayat-7a873.firebasestorage.app",
  messagingSenderId: "337049877815",
  appId: "1:337049877815:web:5db2d6c5829b4d5c04eeb2",
  measurementId: "G-29K8KLMHR6",
};

// prevent duplicate app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export default app;
