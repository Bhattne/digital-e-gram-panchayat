/* ==========================
   FIREBASE PUSH NOTIFICATION SW
========================== */

importScripts("https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCG7iygS5Sw_dbABxOGSg0W_EjGOUMHRgI",
  authDomain: "e-gram-panchayat-7a873.firebaseapp.com",
  projectId: "e-gram-panchayat-7a873",
  storageBucket: "e-gram-panchayat-7a873.firebasestorage.app",
  messagingSenderId: "337049877815",
  appId: "1:337049877815:web:5db2d6c5829b4d5c04eeb2",
  measurementId: "G-29K8KLMHR6",
});

const messaging = firebase.messaging();

// Handle notification when app minimized/closed
messaging.onBackgroundMessage((payload) => {
  console.log("Received background notification", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: payload.notification.icon || "/icon.png"
    }
  );
});
