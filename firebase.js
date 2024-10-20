// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyAEF6Uqb4VteXDCzIlHyQhshDD4meN4EYE",
    authDomain: "article-form-abb30.firebaseapp.com",
    projectId: "article-form-abb30",
    storageBucket: "article-form-abb30.appspot.com",
    messagingSenderId: "821119241851",
    appId: "1:821119241851:web:b6ba2a18e989bd0c98dcde"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
