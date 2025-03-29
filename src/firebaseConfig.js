import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSwtDCjXTgLXcZUazRNO7ybGQKrGUYFFE",
  authDomain: "skillstationacademy-be238.firebaseapp.com",
  projectId: "skillstationacademy-be238",
  storageBucket: "skillstationacademy-be238.firebasestorage.app",
  messagingSenderId: "864711665098",
  appId: "1:864711665098:web:71ac327977e4c406165b33",
  measurementId: "G-4TXDJEJREZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
