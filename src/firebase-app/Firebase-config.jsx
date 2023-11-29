// TODO: Add SDKs for Firebase products that you want to use
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBx2BXG6HrMbnxoD9Dtm9TdAeJo6XdNTbg",
  authDomain: "monkey-blog-d5002.firebaseapp.com",
  projectId: "monkey-blog-d5002",
  storageBucket: "monkey-blog-d5002.appspot.com",
  messagingSenderId: "1013014349660",
  appId: "1:1013014349660:web:5c3aa38313957454fbe399",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
