import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyByL1bvFSJoN4xuuzOrlAdDxRzkYN3Ja7E",

  authDomain: "library-app-c659f.firebaseapp.com",

  projectId: "library-app-c659f",

  storageBucket: "library-app-c659f.firebasestorage.app",

  messagingSenderId: "486001327048",

  appId: "1:486001327048:web:8301216de217d83fcb9efd",

  measurementId: "G-JZ6PEK6NMF"

};

const app = initializeApp(firebaseConfig);

let db=getFirestore(app);
let auth=getAuth(app);

export {db,auth};