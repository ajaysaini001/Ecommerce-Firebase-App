
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAkSa2dkW2e5MprlqZu_lTbawvoj9kMJPA",
  authDomain: "ecommerce-app-38346.firebaseapp.com",
  projectId: "ecommerce-app-38346",
  storageBucket: "ecommerce-app-38346.appspot.com",
  messagingSenderId: "105935991985",
  appId: "1:105935991985:web:0fb9c09c640c49235a9e90"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const firedb=getFirestore(app);