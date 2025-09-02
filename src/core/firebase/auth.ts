/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
  type AuthError,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db, provider } from "./config";
import { child, get, ref, set } from "firebase/database";

// Configure Google provider
provider.addScope("profile");
provider.addScope("email");

export const getUser = async (uid: string) => {
  try {
    const dbRef = ref(db);
    console.log("🔐 Fetching user from Realtime Database with UID:", db);
    const snapshot = await get(child(dbRef, `users/${uid}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const saveUserToDB = async (user: any) => {
  try {
    await set(ref(db, "users/" + user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: new Date().toISOString(),
    });
    console.log("✅ User saved to Realtime Database");
  } catch (error) {
    console.error("❌ Error saving user:", error);
  }
};

// Google OAuth sign in
export const signInWithGoogle = async () => {
  try {
    console.log("🔐 Starting Google sign-in...");
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("✅ Google sign-in successful:", {
      uid: user.uid,
      email: user.email,
    });

    // Check if user exists in DB
    const userdb = await getUser(user.uid);

    if (!userdb) {
      // For Google sign-in, the email is usually verified already.
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        console.log("📧 Verification email sent to:", user.email);
      }

      await saveUserToDB({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: Date.now(),
      });

      console.log("📦 New user saved to DB.");
    }

    return { user, error: null };
  } catch (error) {
    console.error("❌ Google sign-in error:", error);
    return { user: null, error: error as AuthError };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error as AuthError };
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  console.log("🔐 Firebase: Setting up auth state listener");
  return onAuthStateChanged(auth, (user) => {
    console.log(
      "🔐 Firebase: Auth state changed:",
      user ? `User: ${user.email}` : "No user"
    );
    callback(user);
  });
};

// Get current user
export const getCurrentUser = () => {
  const currentUser = auth.currentUser;
  console.log(
    "🔐 Firebase: getCurrentUser called, result:",
    currentUser ? `User: ${currentUser.email}` : "No user"
  );
  return currentUser;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!auth.currentUser;
};
