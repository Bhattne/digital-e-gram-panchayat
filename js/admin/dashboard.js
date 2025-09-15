const firebaseConfig = {
  apiKey: "AIzaSyCG7iygS5Sw_dbABxOGSg0W_EjGOUMHRgI",
  authDomain: "e-gram-panchayat-7a873.firebaseapp.com",
  projectId: "e-gram-panchayat-7a873",
  storageBucket: "e-gram-panchayat-7a873.appspot.com",
  messagingSenderId: "337049877815",
  appId: "1:337049877815:web:5db2d6c5829b4d5c04eeb2"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUserData = null;

auth.onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    db.collection("users").doc(uid).get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        currentUserData = data;
        document.getElementById("welcomeText").innerText = `👋 Welcome, ${data.name} from ${data.village}`;
        document.getElementById("mobileInfo").innerText = `📱 Mobile: ${data.mobile}`;
      } else {
        document.getElementById("welcomeText").innerText = "❌ User data not found.";
      }
    });
  } else {
    window.location.href = "login.html";
  }
});

// Handle request form submission
document.getElementById("requestForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const type = document.getElementById("requestType").value;
  const message = document.getElementById("requestMessage").value;

  db.collection("requests").add({
    uid: auth.currentUser.uid,
    name: currentUserData.name,
    village: currentUserData.village,
    mobile: currentUserData.mobile,
    type: type,
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("✅ Request submitted successfully!");
    document.getElementById("requestForm").reset();
  })
  .catch(error => {
    console.error("❌ Error submitting request:", error);
    alert("❌ Failed to submit request.");
  });
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
  auth.signOut().then(() => {
    alert("👋 Logged out!");
    window.location.href = "login.html";
  });
});
