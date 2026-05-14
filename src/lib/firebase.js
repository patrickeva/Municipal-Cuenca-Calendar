import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAKD4NyjjVGI6aNQ6FsaBLfYMEU9iImTp0",
  authDomain: "municipal-calendar-9f220.firebaseapp.com",
  projectId: "municipal-calendar-9f220",
  storageBucket: "municipal-calendar-9f220.firebasestorage.app",
  messagingSenderId: "216374710835",
  appId: "1:216374710835:web:67618a76719b166fa88946",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
