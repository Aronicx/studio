
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "campus-connect-tl4t9",
  appId: "1:32289575741:web:b14f795effbd09344b6b54",
  storageBucket: "campus-connect-tl4t9.firebasestorage.app",
  apiKey: "AIzaSyDgKjORhOZOKFuD7AjSG0oZnjOmxa6nI5Q",
  authDomain: "campus-connect-tl4t9.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "32289575741"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
