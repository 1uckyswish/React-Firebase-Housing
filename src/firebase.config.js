// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyM-WPk2wT0mj_aC3w25UaCetHwF9Iwi8",
  authDomain: "house-market-c74e5.firebaseapp.com",
  projectId: "house-market-c74e5",
  storageBucket: "house-market-c74e5.appspot.com",
  messagingSenderId: "982092740618",
  appId: "1:982092740618:web:13bee6a4cce0de35d707f3"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();