// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiI87lQL-gVOETAD7WOzdiFNqh0tk5GZE",
  authDomain: "expense-tracker-1fc2c.firebaseapp.com",
  projectId: "expense-tracker-1fc2c",
  storageBucket: "expense-tracker-1fc2c.firebasestorage.app",
  messagingSenderId: "880760019047",
  appId: "1:880760019047:web:b6c9e53e4d52436cccdcc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);