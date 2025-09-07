/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import FloatingList from "../core/components/FloatingImageList";
import { useState } from "react";
import { useAuth } from "../core/hooks/useAuth";
import GoogleAuthButton from "../core/components/GoogleAuthButton";
import { FaUserCheck, FaArrowRight } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleGoogleSuccess = (user: any) => {
    console.log("✅ Google Sign-in successful:", user);
    setError("");
    login(user);
    navigate("/profile");
  };

  const handleGoogleError = (errorMessage: string) => {
    console.error("❌ Google Sign-in error:", errorMessage);
    setError(errorMessage);
  };

  return (
    <div className="mt-16 min-h-screen flex flex-col bg-gradient-to-br from-base-200 to-base-100 relative overflow-hidden">
      <FloatingList />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20 flex justify-center px-4 pt-32 pb-20">
        {/* Hero Section */}

        {/* Main Card */}
        <div className="card w-full max-w-lg shadow-2xl bg-base-100/95 backdrop-blur-sm border border-base-300/50 rounded-3xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaUserCheck className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Sign In to Aicha</h2>
            <p className="text-base-content/70">
              Access your artisan dashboard
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="alert alert-error mb-6 shadow-lg">
              <span>{error}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <div className="mb-8">
            <GoogleAuthButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              className="mb-6"
              isLoginPage={true}
            />

            <div className="text-center">
              <p className="text-sm text-base-content/60 mb-4">
                Your account is protected by Google's security standards
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="divider">New to Aicha?</div>

          {/* Register Link */}
          <div className="text-center">
            <button
              className="btn btn-outline btn-lg w-full group"
              onClick={() => navigate("/register")}
            >
              Create Account
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
