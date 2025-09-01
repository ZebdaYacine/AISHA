/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import FloatingList from "../core/components/FloatingImageList";
import { useState } from "react";
import { useAuth } from "../core/hooks/useAuth";
import GoogleAuthButton from "../core/components/GoogleAuthButton";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("Email/password login is not available. Please use Google OAuth.");
  };

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-base-200 to-base-100 relative">
      <FloatingList />

      <div className="flex-1 flex items-center justify-center relative z-10 ">
        <div className="card w-full max-w-md shadow-2xl bg-base-100 rounded-2xl p-8">
          {/* Avatar logo centered */}
          <div className="flex justify-center ">
            <div className="avatar">
              <div className="w-25 rounded-full  ">
                <img src="/public/aisha/logo.png" alt="Aicha Logo" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
          </div>

          {/* Google OAuth Button */}
          <div className="mb-6">
            <GoogleAuthButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              className="mb-4"
            />
            <div className="divider">OR</div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {/* Login Form - Disabled */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered w-full"
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered w-full"
                disabled
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt text-gray-400">
                  Email/password login is disabled
                </span>
              </label>
            </div>
            <button
              className="btn btn-primary w-full mt-4"
              type="submit"
              disabled
            >
              Login (Disabled)
            </button>
            <div className="text-center mt-2">
              <span>Don't have an account? </span>
              <button
                className="btn btn-link"
                type="button"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="divider"></div>
    </div>
  );
}
