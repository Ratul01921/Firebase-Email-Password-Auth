// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC79el-S19AOooTRyXVvnJ5UQiRaOTFAt8",
  authDomain: "email-pass-auth-690c8.firebaseapp.com",
  projectId: "email-pass-auth-690c8",
  storageBucket: "email-pass-auth-690c8.firebasestorage.app",
  messagingSenderId: "738734262505",
  appId: "1:738734262505:web:0c3454160f828959410878"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);