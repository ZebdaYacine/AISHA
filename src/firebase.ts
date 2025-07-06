import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyARLmI8KMdbK7y0NikLNSubdPC4ohwaRss",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aisha-3c536.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aisha-3c536",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aisha-3c536.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "727872088596",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:727872088596:web:d0c783a0176c0916525501",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-7RC86KPLR5",
};

let app;
try {
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase app:", error);
  throw error;
}

let db: Firestore;
try {
  db = getFirestore(app);
  console.log("Firestore initialized successfully", db);
} catch (error) {
  console.error("Error initializing Firestore:", error);
  throw error;
}

export { db };
