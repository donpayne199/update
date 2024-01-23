// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-241a3.firebaseapp.com",
  projectId: "mern-auth-241a3",
  storageBucket: "mern-auth-241a3.appspot.com",
  messagingSenderId: "324051799251",
  appId: "1:324051799251:web:a0027bf67702488a205826",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
