/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  type User,
  type AuthError,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db, provider } from "./config";
import { child, get, ref, set } from "firebase/database";
import type { CraftsmanInfo } from "../../feature/profile/data/datasource/ProfileDtos";

// Configure Google provider
provider.addScope("profile");
provider.addScope("email");

export const getUser = async (uid: string) => {
  try {
    const dbRef = ref(db);
    console.log("🔐 Fetching user from Realtime Database with UID:", uid);
    const snapshot = await get(child(dbRef, `users/${uid}`));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error("❌ Error fetching user:", error);
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

export const getCraftsmanInfo = async (
  uid: string
): Promise<CraftsmanInfo | null> => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `craftsman_requests/${uid}`));
    return snapshot.exists() ? (snapshot.val() as CraftsmanInfo) : null;
  } catch (error) {
    console.error("❌ Error fetching craftsman info:", error);
    return null;
  }
};

export type GoogleAuthOutcome =
  | { kind: "success"; user: User }
  | { kind: "error"; error: AuthError }
  | { kind: "redirect" }
  | { kind: "none" };

// Google OAuth sign in (popup → fallback to redirect)
export const signInWithGoogle = async (): Promise<GoogleAuthOutcome> => {
  try {
    console.log("🔐 Starting Google sign-in (popup first)...");
    const result = await signInWithPopup(auth, provider);
    return await handleAuthResult(result.user);
  } catch (error: any) {
    console.warn("⚠️ Popup failed:", error?.code);

    if (
      error.code === "auth/popup-closed-by-user" ||
      error.code === "auth/cancelled-popup-request"
    ) {
      console.log("🔄 Falling back to redirect...");
      await signInWithRedirect(auth, provider);
      return { kind: "redirect" };
    } else {
      console.error("❌ Google sign-in error:", error);
      return { kind: "error", error: error as AuthError };
    }
  }
};

// Handle redirect result (call in App.tsx useEffect)
export const handleRedirectResult = async (): Promise<GoogleAuthOutcome> => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      return await handleAuthResult(result.user);
    }
    return { kind: "none" };
  } catch (error) {
    console.error("❌ Redirect error:", error);
    return { kind: "error", error: error as AuthError };
  }
};

// Shared logic for saving/validating user
const handleAuthResult = async (user: User): Promise<GoogleAuthOutcome> => {
  console.log("✅ Auth successful:", { uid: user.uid, email: user.email });

  const userdb = await getUser(user.uid);
  if (!userdb) {
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      console.log("📧 Verification email sent to:", user.email);
    }
    await saveUserToDB(user);
    console.log("📦 New user saved to DB.");
  }

  return { kind: "success", user };
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
  return onAuthStateChanged(auth, (user) => callback(user));
};

// Get current user
export const getCurrentUser = () => auth.currentUser;

// Check if user is authenticated
export const isAuthenticated = () => !!auth.currentUser;
