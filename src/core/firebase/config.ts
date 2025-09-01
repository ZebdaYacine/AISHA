import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARLmI8KMdbK7y0NikLNSubdPC4ohwaRss",
  authDomain: "aisha-3c536.firebaseapp.com",
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

export { auth, provider, signInWithPopup, signOut };
