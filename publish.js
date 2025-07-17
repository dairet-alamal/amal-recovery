
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyANAmBZ2ySOP6hcVMZ2zfu8PsnXnHqZbOA",
  authDomain: "amal-recovery.firebaseapp.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.appspot.com",
  messagingSenderId: "1082715046722",
  appId: "1:1082715046722:web:d1a116cc70f2276f513edb",
  measurementId: "G-Z5D7GQ860S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

window.publish = async function () {
  const type = document.getElementById("type").value;
  const color = document.getElementById("color").value;
  const plate = document.getElementById("plate").value;
  const chassis = document.getElementById("chassis").value;
  const facebookLink = document.getElementById("facebookLink").value;
  const imageFile = document.getElementById("image").files[0];

  const status = document.getElementById("status");
  status.textContent = "جارٍ النشر...";

  try {
    let imageURL = "";
    if (imageFile) {
      const imageRef = ref(storage, "images/" + Date.now() + "-" + imageFile.name);
      await uploadBytes(imageRef, imageFile);
      imageURL = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, "cars"), {
      type,
      color,
      plate,
      chassis,
      facebookLink,
      imageURL,
      createdAt: serverTimestamp(),
      found: false
    });

    status.textContent = "تم النشر بنجاح!";
  } catch (error) {
    console.error(error);
    status.textContent = "حدث خطأ أثناء النشر.";
  }
}
