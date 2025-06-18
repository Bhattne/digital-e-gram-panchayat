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

auth.onAuthStateChanged(user => {
  if (!user) return window.location.href = "login.html";

  db.collection("requests")
    .where("uid", "==", user.uid)
    .orderBy("timestamp", "desc")
    .get()
    .then(snapshot => {
      const list = document.getElementById("requestsList");
      if (snapshot.empty) {
        list.innerHTML = "<p class='text-center text-muted'>No requests found.</p>";
        return;
      }

      snapshot.forEach(doc => {
        const data = doc.data();
        const date = data.timestamp?.toDate().toLocaleString() || "No date";

        const card = document.createElement("div");
        card.className = "col-md-6";
        card.innerHTML = `
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">📌 ${data.type}</h5>
              <p class="card-text">${data.message}</p>
              <p class="text-muted small mb-1"><strong>Date:</strong> ${date}</p>
              <p class="text-muted small mb-3"><strong>Village:</strong> ${data.village}</p>
              <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${doc.id}">❌ Delete</button>
            </div>
          </div>
        `;
        list.appendChild(card);
      });

      // Attach delete listeners
      setTimeout(() => {
        document.querySelectorAll(".delete-btn").forEach(btn => {
          btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this request?")) {
              db.collection("requests").doc(id).delete()
                .then(() => {
                  alert("✅ Request deleted!");
                  this.closest(".col-md-6").remove();
                })
                .catch(error => {
                  alert("❌ Error deleting request: " + error.message);
                });
            }
          });
        });
      }, 100);
    })
    .catch(error => {
      console.error("❌ Error loading requests:", error);
      document.getElementById("requestsList").innerHTML = "<p class='text-danger text-center'>Error loading data</p>";
    });
});
