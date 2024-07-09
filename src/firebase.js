// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDFGETge8B63GJboEkSJsWY3KaOrxfrJxs",
  authDomain: "fuel-kilo-capture.firebaseapp.com",
  projectId: "fuel-kilo-capture",
  storageBucket: "fuel-kilo-capture.appspot.com",
  messagingSenderId: "1006127454914",
  appId: "1:1006127454914:web:a2fc45359924581e4a395b"  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };