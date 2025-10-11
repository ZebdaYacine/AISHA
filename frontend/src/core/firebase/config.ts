import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARLmI8KMdbK7y0NikLNSubdPC4ohwaRss",
  authDomain: "aisha-3c536.firebaseapp.com",
  // authDomain: "aisha.3utilities.com", // ✅ use your custom domain
  projectId: "aisha-3c536",
  storageBucket: "aisha-3c536.appspot.com",
  messagingSenderId: "727872088596",
  appId: "1:727872088596:web:d0c783a0176c0916525501",
  measurementId: "G-7RC86KPLR5",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const realtimeDb = getDatabase(app);
const firestoreDb = getFirestore(app);

export {
  app,
  auth,
  provider,
  signInWithPopup,
  signOut,
  realtimeDb,
  firestoreDb,
};
export const db = realtimeDb;
