// login.js

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("✅ Login successful!");
     window.location.href = "dashboard.html";
// Redirect
    })
    .catch((error) => {
      alert("❌ Error: " + error.message);
      console.error(error);
    });
});
