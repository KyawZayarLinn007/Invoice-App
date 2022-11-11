import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsqyeX6viZs5nSLoJpn3eXIxkBOWDA4kc",
  authDomain: "codetest-33776.firebaseapp.com",
  projectId: "codetest-33776",
  storageBucket: "codetest-33776.appspot.com",
  messagingSenderId: "711732956482",
  appId: "1:711732956482:web:1b87a3733fa8f9eb6fccdb",
  measurementId: "G-7DJ0E8MS9C",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);