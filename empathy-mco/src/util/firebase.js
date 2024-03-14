import * as firebase from 'firebase/app';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyArzBDESCDHMZQMd6HFwBBpJ9mKdrSmxg0",
    authDomain: "scheduler-42500.firebaseapp.com",
    projectId: "scheduler-42500",
    storageBucket: "scheduler-42500.appspot.com",
    messagingSenderId: "206057603723",
    appId: "1:206057603723:web:25f054127f6d1a1bfcca8e",
    measurementId: "G-1L9RNN9QRJ"
  };

const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(app)


try {
    const reference = await addDoc(collection(db, "Test"), {
        name: "Sam"
    })
} catch(e) {
    console.log(e)
}

export { app, db };