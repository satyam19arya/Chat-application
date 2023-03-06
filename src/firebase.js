import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "chat-69897.firebaseapp.com",
  projectId: "chat-69897",
  storageBucket: "chat-69897.appspot.com",
  messagingSenderId: "678998410446",
  appId: "1:678998410446:web:5886916c204aef3bb2bc9f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();