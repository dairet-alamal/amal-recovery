import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD63A06pQ8XlgfWZpJ5IbntKvMfv4QLq5Q",
  authDomain: "amal-recovery.firebaseapp.com",
  projectId: "amal-recovery",
  storageBucket: "amal-recovery.appspot.com",
  messagingSenderId: "608114019730",
  appId: "1:608114019730:web:73a8e5ce8b36043600297d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
