/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import FloatingList from "../core/components/FloatingImageList";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../core/hooks/useAuth";
import GoogleAuthButton from "../core/components/GoogleAuthButton";

type RegisterFormInputs = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    console.log("✅ Register Data:", data);
    setError("email", { message: "Email/password registration is not available. Please use Google OAuth." });
  };

  const handleGoogleSuccess = (user: any) => {
    console.log("✅ Google Sign-in successful:", user);
    setError("email", {
      message:
        "Email/password registration is not available. Please use Google OAuth.",
    });
    login(user);
    navigate("/profile");
  };

  const handleGoogleError = (errorMessage: string) => {
    console.error("❌ Google Sign-in error:", errorMessage);
    setError("email", { message: errorMessage });
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-base-200 to-base-100 relative">
      <FloatingList />

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to Aicha!</h1>
          <p className="text-base-content/70">
            Create your account to join our artisan community.
          </p>
        </div>
        <div className="card w-full max-w-md shadow-2xl bg-base-100 rounded-2xl p-8">
          {/* Google OAuth Button */}
          <div className="mb-6">
            <GoogleAuthButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              className="mb-4"
            />
            <div className="divider">OR</div>
          </div>

          {/* Error Display
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )} */}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full"
                {...register("fname", { required: "Name is required" })}
              />
              {errors.fname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fname.message}
                </p>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered w-full pr-10"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">
                  Confirm Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="confirm password"
                  className="input input-bordered w-full pr-10"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button className="btn btn-primary w-full mt-4" type="submit">
              Register
            </button>
            <div className="text-center mt-2">
              <span>Already have an account? </span>
              <button
                className="btn btn-link"
                type="button"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
