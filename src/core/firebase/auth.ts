import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
  type AuthError,
} from "firebase/auth";
import { auth, provider } from "./config";

// Configure Google provider
provider.addScope("profile");
provider.addScope("email");

// Google OAuth sign in
export const signInWithGoogle = async () => {
  try {
    console.log("🔐 Starting Google sign-in...");
    const result = await signInWithPopup(auth, provider);
    console.log("✅ Google sign-in successful:", result.user);
    return { user: result.user, error: null };
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
