// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQuI-lLAzFbLqyfK6TbTv9EKSBtlm72xM",
  authDomain: "calligraphy-cut-challenge.firebaseapp.com",
  projectId: "calligraphy-cut-challenge",
  storageBucket: "calligraphy-cut-challenge.firebasestorage.app",
  messagingSenderId: "506219926443",
  appId: "1:506219926443:web:f916cc220cee929282f8ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
