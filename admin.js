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

let allRequests = [];
let chartInstance = null;
let villageChartInstance = null;

// ✅ Role check
firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) return window.location.href = "login.html";

  const doc = await db.collection("users").doc(user.uid).get();
  if (doc.data()?.role !== "admin") return window.location.href = "dashboard.html";

  loadAdminData();
});

// ✅ Load all requests
function loadAdminData() {
  db.collection("requests").orderBy("timestamp", "desc").get().then(snapshot => {
    allRequests = snapshot.docs;
    applyFilters();
  }).catch(() => {
    document.getElementById("adminRequests").innerHTML = "<p class='text-danger text-center'>Error loading data.</p>";
  });
}

// ✅ Apply search/date/status filters
function applyFilters() {
  const dateFilter = document.getElementById("dateFilter").value;
  const statusFilter = document.getElementById("statusFilter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();
  const now = new Date();

  const filtered = allRequests.filter(doc => {
    const d = doc.data();
    const ts = d.timestamp?.toDate?.();
    const status = (d.status || "pending").toLowerCase();

    let matchDate = true;
    if (dateFilter === "7days") {
      const last7 = new Date(); last7.setDate(now.getDate() - 7);
      matchDate = ts >= last7;
    } else if (dateFilter === "month") {
      matchDate = ts.getMonth() === now.getMonth() && ts.getFullYear() === now.getFullYear();
    }

    const matchStatus = (statusFilter === "all") || (status === statusFilter);
    const matchSearch = (
      d.name?.toLowerCase().includes(search) ||
      d.village?.toLowerCase().includes(search) ||
      d.type?.toLowerCase().includes(search)
    );

    return matchDate && matchStatus && matchSearch;
  });

  renderRequests(filtered);
  generateChart(filtered);
  generateVillageChart(filtered);
  updateStats(filtered);
}

// ✅ Render Request Cards
function renderRequests(data) {
  const list = document.getElementById("adminRequests");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<p class='text-center text-muted'>No matching requests found.</p>";
    return;
  }

  data.forEach(doc => {
    const d = doc.data();
    const id = doc.id;
    const date = d.timestamp?.toDate().toLocaleString() || "No date";
    const isResolved = d.status === "resolved";

    const card = document.createElement("div");
    card.className = "col-md-6";

    card.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="card-title mb-0">📌 ${d.type}</h5>
            <span class="badge ${isResolved ? 'bg-success' : 'bg-warning text-dark'}">
              ${isResolved ? 'Resolved' : 'Pending'}
            </span>
          </div>
          <p class="card-text" id="msg-${id}">${d.message}</p>
          <p class="text-muted small mb-1"><strong>By:</strong> ${d.name} (${d.village})</p>
          <p class="text-muted small mb-1"><strong>Mobile:</strong> ${d.mobile}</p>
          <p class="text-muted small"><strong>Date:</strong> ${date}</p>
          <div class="d-flex flex-wrap gap-2 mt-2">
            ${!isResolved ? `<button class="btn btn-sm btn-outline-success" onclick="markResolved('${id}')">✅ Mark as Resolved</button>` : ''}
            <button class="btn btn-sm btn-outline-primary" onclick="editMessage('${id}', \`${d.message.replace(/`/g, "\\`")}\`)">🖊️ Edit</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteRequest('${id}')">🗑️ Delete</button>
          </div>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}

// ✅ Update Stats
function updateStats(dataDocs) {
  const total = dataDocs.length;
  const villageSet = new Set();
  const userSet = new Set();

  dataDocs.forEach(doc => {
    const d = doc.data();
    villageSet.add(d.village);
    userSet.add(d.uid);
  });

  document.getElementById("statTotal").innerText = total;
  document.getElementById("statVillages").innerText = villageSet.size;
  document.getElementById("statUsers").innerText = userSet.size;
}

// ✅ Chart by Type
function generateChart(dataDocs) {
  const typeCounts = {};
  dataDocs.forEach(doc => {
    const type = doc.data().type;
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  });

  const types = Object.keys(typeCounts);
  const counts = Object.values(typeCounts);

  if (chartInstance) chartInstance.destroy();
  const ctx = document.getElementById("typeChart").getContext("2d");

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: types,
      datasets: [{
        label: 'No. of Requests',
        data: counts,
        backgroundColor: '#007bff',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Requests by Type' }
      },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } }
      }
    }
  });
}

// ✅ Chart by Village
function generateVillageChart(dataDocs) {
  const villageCounts = {};
  dataDocs.forEach(doc => {
    const village = doc.data().village;
    villageCounts[village] = (villageCounts[village] || 0) + 1;
  });

  const labels = Object.keys(villageCounts);
  const counts = Object.values(villageCounts);

  if (villageChartInstance) villageChartInstance.destroy();
  const ctx = document.getElementById("villageChart").getContext("2d");

  villageChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Requests per Village',
        data: counts,
        backgroundColor: labels.map((_, i) =>
          `hsl(${(i * 360) / labels.length}, 70%, 60%)`
        )
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Requests by Village' }
      }
    }
  });
}

// ✅ Actions
function markResolved(id) {
  if (!confirm("Mark this request as resolved?")) return;

  db.collection("requests").doc(id).update({ status: "resolved" })
    .then(() => {
      alert("✅ Marked as Resolved!");
      loadAdminData();
    }).catch(err => alert("❌ Error: " + err.message));
}

function editMessage(id, oldMsg) {
  const newMsg = prompt("📝 Edit the message:", oldMsg);
  if (!newMsg || newMsg === oldMsg) return;

  db.collection("requests").doc(id).update({ message: newMsg.trim() })
    .then(() => {
      alert("✅ Message updated!");
      loadAdminData();
    }).catch(err => alert("❌ Error: " + err.message));
}

function deleteRequest(id) {
  if (!confirm("Are you sure you want to delete this request?")) return;

  db.collection("requests").doc(id).delete()
    .then(() => {
      alert("🗑️ Request deleted!");
      loadAdminData();
    }).catch(err => alert("❌ Error: " + err.message));
}

// ✅ Filter Listeners
document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("dateFilter").addEventListener("change", applyFilters);
document.getElementById("statusFilter").addEventListener("change", applyFilters);

// ✅ Export Buttons
document.getElementById("downloadPdf").addEventListener("click", () => {
  const element = document.getElementById("exportContainer");
  html2pdf().from(element).set({
    margin: 0.5,
    filename: 'egram-requests.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }).save();
});

document.getElementById("downloadExcel").addEventListener("click", () => {
  const rows = [["Name", "Village", "Type", "Message", "Mobile", "Date", "Status"]];
  allRequests.forEach(doc => {
    const d = doc.data();
    rows.push([
      d.name,
      d.village,
      d.type,
      d.message,
      d.mobile,
      d.timestamp?.toDate().toLocaleString() || "",
      d.status || "pending"
    ]);
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, "Requests");
  XLSX.writeFile(wb, "egram-requests.xlsx");
});
