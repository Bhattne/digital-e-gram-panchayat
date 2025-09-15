// register.js

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // ✅ Save extra user data in Firestore
      return db.collection("users").doc(user.uid).set({
        name: name,
        email: email,
        createdAt: new Date()
      });
    })
    .then(() => {
      alert("✅ Registration successful!");
      window.location.href = "login.html"; // Redirect to login
    })
    .catch((error) => {
      alert("❌ Error: " + error.message);
      console.error(error);
    });
});
