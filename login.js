// ✅ Firebase Configuration
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
const auth = firebase.auth();
const db = firebase.firestore();

// ✅ Login Form Handler
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const loginBtn = document.querySelector("button[type='submit']");

  // Disable button and show loading state
  loginBtn.disabled = true;
  loginBtn.innerText = "Logging in...";

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const uid = userCredential.user.uid;
      return db.collection("users").doc(uid).get();
    })
    .then(doc => {
      if (!doc.exists) throw new Error("User profile not found!");

      const role = doc.data().role;

      if (role === "admin") {
        alert("👩‍💼 Welcome, Admin!");
        window.location.href = "admin.html";
      } else {
        alert("👋 Welcome!");
        window.location.href = "dashboard.html";
      }
    })
    .catch(error => {
      alert("❌ Login Error: " + error.message);
      loginBtn.disabled = false;
      loginBtn.innerText = "Login";
    });
});
