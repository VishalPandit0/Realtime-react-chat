// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx8H2dkB--Vw6tdu1Q9Vj4R3SgxCusHTc",
  authDomain: "react-chat-app-c5b85.firebaseapp.com",
  projectId: "react-chat-app-c5b85",
  storageBucket: "react-chat-app-c5b85.appspot.com",
  messagingSenderId: "775358841717",
  appId: "1:775358841717:web:4c5805d6fb24384120093c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);