import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB1F0hhIVYTu3h3UlC3SrOjAH-55-vdvrI",
    authDomain: "weatherapp-79202.firebaseapp.com",
    projectId: "weatherapp-79202",
    storageBucket: "weatherapp-79202.firebasestorage.app",
    messagingSenderId: "203779057237",
    appId: "1:203779057237:web:37a18d95d284e8cd8156dc"
    };
  
export const app = initializeApp(firebaseConfig);