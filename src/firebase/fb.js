// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-teyspnAB76mgJT3Z__68uXXhkjZjQDg",
    authDomain: "simple-blog-a8b2d.firebaseapp.com",
    projectId: "simple-blog-a8b2d",
    storageBucket: "simple-blog-a8b2d.appspot.com",
    messagingSenderId: "202549659428",
    appId: "1:202549659428:web:54aeea118518c0308c15b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);
