import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, collection, query, where} from "firebase/firestore";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyBmxIW2BYvYNo93oEaRDhJoACPLDs4tvu4",
  authDomain: "envisage-22.firebaseapp.com",
  projectId: "envisage-22",
  storageBucket: "envisage-22.appspot.com",
  messagingSenderId: "596995894219",
  appId: "1:596995894219:web:55fe84f15341ea3212244e",
  measurementId: "G-G5045YPHB8"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth();

export { db,analytics, auth, updateProfile, provider, signInWithPopup, onAuthStateChanged, doc, setDoc,getDoc,signOut, updateDoc, arrayUnion, collection, query, where };
export default app;