// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVFNk4by_kOE46BBVCXwIhXAjnnqLxrdw",
  authDomain: "personal-weather-96c08.firebaseapp.com",
  projectId: "personal-weather-96c08",
  storageBucket: "personal-weather-96c08.appspot.com",
  messagingSenderId: "653098843917",
  appId: "1:653098843917:web:645ccab764c0cd1e413a44",
  measurementId: "G-JBC0BL2ETC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);