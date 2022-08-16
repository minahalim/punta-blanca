// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkg_iXU-AoSJz-38POG6Dau8jsNGGxu2M",
  authDomain: "punta-blanca-47c6a.firebaseapp.com",
  projectId: "punta-blanca-47c6a",
  storageBucket: "punta-blanca-47c6a.appspot.com",
  messagingSenderId: "964657176524",
  appId: "1:964657176524:web:aba835031555f580bf8769",
  measurementId: "G-KMVMYV3B5B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
