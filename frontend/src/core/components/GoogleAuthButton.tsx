/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithGoogle,
  handleRedirectResult,
  type GoogleAuthOutcome,
} from "../firebase/auth";

interface GoogleAuthButtonProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export default function GoogleAuthButton({
  onSuccess,
  onError,
  className = "",
  children = "Continue with Google",
}: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleOutcome = (outcome: GoogleAuthOutcome) => {
    switch (outcome.kind) {
      case "success":
        console.log("✅ Google auth success:", outcome.user);
        onSuccess?.(outcome.user);
        return;
      case "error":
        console.error("❌ Google auth error:", outcome.error);
        onError?.(outcome.error.message || "Failed to sign in with Google");
        return;
      case "redirect":
        console.log("🔄 Redirect flow started — awaiting Firebase callback");
        return;
      case "none":
        return;
    }
  };

  // ✅ Handle redirect login result on mount
  useEffect(() => {
    handleRedirectResult().then(handleOutcome).catch((error: any) => {
      console.error("❌ Redirect handler exception:", error);
      onError?.(error?.message ?? "Redirect login failed");
    });
  }, [onError, onSuccess]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      console.log("🔐 GoogleAuthButton: Starting Google sign-in...");
      const outcome = await signInWithGoogle();
      console.log("🔐 GoogleAuthButton: Outcome received:", outcome);
      handleOutcome(outcome);
    } catch (error: any) {
      console.error("❌ GoogleAuthButton: Exception occurred:", error);
      onError?.(error.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={loading}
      className={`btn btn-lg w-full gap-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
      {loading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <FcGoogle className="text-2xl" />
      )}
      {children}
    </button>
  );
}
