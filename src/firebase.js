// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsFMe__iIpGBjKA3e8Pg-UFmWM67ezvL0",
  authDomain: "react-disney-plus-app-9ab29.firebaseapp.com",
  projectId: "react-disney-plus-app-9ab29",
  storageBucket: "react-disney-plus-app-9ab29.firebasestorage.app",
  messagingSenderId: "198452349034",
  appId: "1:198452349034:web:9aa784a8849b29eda0e213",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
