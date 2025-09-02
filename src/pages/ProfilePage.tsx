import { useAuth } from "../core/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageDropzone from "../core/components/ImageDropzone";

export default function ProfilePage() {
  const [userType, setUserType] = useState("client");
  const [productImage, setProductImage] = useState<File | null>(null);
  const { user, isLoggedIn, loading, logout, signOutUser } = useAuth();
  const navigate = useNavigate();

  console.log("🔍 ProfilePage: Current auth state:", {
    user,
    isLoggedIn,
    loading,
  });

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      console.log(
        "🔍 ProfilePage: User not authenticated, redirecting to login"
      );
      navigate("/login");
    }
  }, [isLoggedIn, loading, navigate]);

  const handleLogout = async () => {
    try {
      await signOutUser();
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProductImageDrop = (file: File) => {
    setProductImage(file);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Type:", userType);
    console.log("Product Image:", productImage);
    // Here you would typically handle the upload and update logic
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Not authenticated</h1>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Profile Picture and Product Image Upload */}
          <div className="flex flex-col items-center space-y-6 rounded-lg bg-base-200 p-6">
            <div className="flex w-full items-center justify-around">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Profile Picture</h2>
                <div className="avatar">
                  <div className="w-32 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                    <img
                      src={
                        user.photoURL ||
                        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                      }
                      alt="Profile"
                    />
                  </div>
                </div>
              </div>

              {/* Product Image and User Type */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold mb-4">Product Image</h2>
                  <ImageDropzone onImageDrop={handleProductImageDrop} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">User Type</h2>
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value="client">Client</option>
                    <option value="saller">Seller</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">User Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Display Name
                </label>
                <p className="text-lg">{user.displayName || "Not provided"}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <p className="text-lg">{user.email || "Not provided"}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  User ID
                </label>
                <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                  {user.uid}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email Verified
                </label>
                <p className="text-lg">
                  {user.emailVerified ? "✅ Yes" : "❌ No"}
                </p>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Account Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Provider
                </label>
                <p className="text-lg">
                  {user.providerData[0]?.providerId || "Unknown"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Created At
                </label>
                <p className="text-lg">
                  {user.metadata.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Sign In
                </label>
                <p className="text-lg">
                  {user.metadata.lastSignInTime
                    ? new Date(
                        user.metadata.lastSignInTime
                      ).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t flex gap-4">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
