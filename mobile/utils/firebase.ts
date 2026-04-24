import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZBDvQ15A8ZWH0e0IZL9NEtHYMrnB57tc",
  authDomain: "cokitchen-2dea8.firebaseapp.com",
  projectId: "cokitchen-2dea8",
  storageBucket: "cokitchen-2dea8.firebasestorage.app",
  messagingSenderId: "589071333788",
  appId: "1:589071333788:web:0ddccff0053c7ee3bf3059",
  measurementId: "G-C726K85ZXB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);