import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../firebase/auth";

interface GoogleAuthButtonProps {
  onSuccess?: (user: unknown) => void;
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      console.log("🔐 GoogleAuthButton: Starting Google sign-in...");
      const { user, error } = await signInWithGoogle();
      console.log("🔐 GoogleAuthButton: Result received:", { user, error });

      if (error) {
        console.error("❌ GoogleAuthButton: Error occurred:", error);
        onError?.(error.message || "Failed to sign in with Google");
      } else if (user) {
        console.log(
          "✅ GoogleAuthButton: Success, calling onSuccess with user:",
          user
        );
        onSuccess?.(user);
      } else {
        console.warn("⚠️ GoogleAuthButton: No user and no error returned");
        onError?.("Unexpected result from Google sign-in");
      }
    } catch (error: unknown) {
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
      className={`btn btn-outline w-full gap-2 hover:bg-gray-50 ${className}`}
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <FcGoogle className="text-xl" />
      )}
      {children}
    </button>
  );
}
