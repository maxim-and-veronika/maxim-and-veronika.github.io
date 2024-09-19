import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBziohJfV2kPx9sOQNvYQNX8E_5KqgYXnw",
    authDomain: "wedding-gender-vote.firebaseapp.com",
    projectId: "wedding-gender-vote",
    storageBucket: "wedding-gender-vote.appspot.com",
    messagingSenderId: "15473660428",
    appId: "1:15473660428:web:ecab31d24fd46c03a0d429"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };