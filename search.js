
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore, collection, getDocs, query, where, deleteDoc, doc, updateDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANAmBZ2ySOP6hcVMZ2zfu8PsnXnHqZbOA",
  authDomain: "amal-recovery.firebaseapp.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.appspot.com",
  messagingSenderId: "1082715046722",
  appId: "1:1082715046722:web:d1a116cc70f2276f513edb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const colorInput = document.getElementById("colorInput");
const plateInput = document.getElementById("plateInput");
const chassisInput = document.getElementById("chassisInput");
const resultsContainer = document.getElementById("results");

colorInput.addEventListener("input", fetchVehicles);
plateInput.addEventListener("input", fetchVehicles);
chassisInput.addEventListener("input", fetchVehicles);

async function fetchVehicles() {
  const q = query(collection(db, "vehicles"));
  const snapshot = await getDocs(q);

  resultsContainer.innerHTML = "";

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const matchesColor = data.color?.includes(colorInput.value);
    const matchesPlate = data.plate?.includes(plateInput.value);
    const matchesChassis = data.chassis?.includes(chassisInput.value);

    if (matchesColor && matchesPlate && matchesChassis) {
      const div = document.createElement("div");
      div.className = "vehicle-card";
      div.innerHTML = `
        <strong>اللون:</strong> ${data.color || "غير محدد"}<br>
        <strong>رقم اللوحة:</strong> ${data.plate || "غير محدد"}<br>
        <strong>رقم الشاسيه:</strong> ${data.chassis || "غير محدد"}<br>
        <strong>الموقع:</strong> ${data.location || "غير محدد"}<br>
        <strong>تاريخ النشر:</strong> ${data.date || "غير متوفر"}<br>
        <strong>ملاحظة:</strong> ${data.note || "لا توجد"}<br>
        ${data.fbLink ? `<a class="fb-link" href="${data.fbLink}" target="_blank">عرض المنشور في فيسبوك</a><br>` : ""}
        <button onclick="markAsRecovered('${docSnap.id}')">تم الاسترداد</button>
        <button onclick="reportError('${docSnap.id}')">إبلاغ عن خطأ</button>
      `;
      resultsContainer.appendChild(div);
    }
  });
}

window.markAsRecovered = async function(id) {
  await updateDoc(doc(db, "vehicles", id), { recovered: true });
  alert("تم تحديد المركبة كمستردة");
  fetchVehicles();
};

window.reportError = async function(id) {
  await deleteDoc(doc(db, "vehicles", id));
  alert("تم حذف المنشور بسبب خطأ");
  fetchVehicles();
};

fetchVehicles();
