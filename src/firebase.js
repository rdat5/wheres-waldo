import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHaPgyc8ErGNcllOwbHl-fXw_vdGNO-GU",
    authDomain: "where-s-waldo-64681.firebaseapp.com",
    databaseURL: "https://where-s-waldo-64681-default-rtdb.firebaseio.com",
    projectId: "where-s-waldo-64681",
    storageBucket: "where-s-waldo-64681.appspot.com",
    messagingSenderId: "715982553260",
    appId: "1:715982553260:web:2f72915c7395d43b8ddf09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export default db;