import { useAuth } from "../core/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageDropzone from "../core/components/ImageDropzone";
import InputWithIcon from "../core/components/InputWithIcon";
import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { db } from "../core/firebase/config";
import { ref, set } from "firebase/database";

export default function ProfilePage() {
  const [userType, setUserType] = useState("client");
  const [isCraftsman, setIsCraftsman] = useState(false);
  const [craftsmanInfo, setCraftsmanInfo] = useState({
    craftType: "",
    storeAddress: "",
    proof: null as File | null,
  });
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });
  const { user, isLoggedIn, loading } = useAuth();
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
    } else if (user) {
      const nameParts = user.displayName?.split(" ") || ["", ""];
      setUserInfo((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
      }));
    }
  }, [isLoggedIn, loading, navigate, user]);

  const handleCraftsmanProofDrop = (file: File) => {
    setCraftsmanInfo({ ...craftsmanInfo, proof: file });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const userData = {
      ...userInfo,
      userType,
      photoURL: user.photoURL,
      isCraftsman:isCraftsman,
      ...(isCraftsman && { craftsmanInfo }),
    };

    try {
      await set(ref(db, "users/" + user.uid), userData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile.");
    }
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
    <div className="min-h-screen bg-base-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-base-200 shadow-xl rounded-2xl p-6 sm:p-10">
        {/* <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-2">
            Your Profile
          </h1>
          <p className="text-lg text-base-content">
            Manage your information and craftsman details
          </p>
        </div> */}

        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Profile Picture and User Type */}
          <div className="flex flex-col sm:flex-row items-center justify-around p-6 bg-base-300 rounded-xl shadow-inner">
            {/* Profile Picture */}
            <div className="flex flex-col items-center text-center">
              <div className="avatar mb-4">
                <div className="w-32 h-32 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user.photoURL ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                    }
                    alt="Profile"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-base-content">
                {user.displayName || "User"}
              </h2>
              <p className="text-sm text-base-content/70">{user.email}</p>
            </div>

            {/* User Type */}
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-xl font-semibold mb-2 text-base-content">
                Account Type
              </h2>
              <div className="join">
                <button
                  type="button"
                  className={`btn join-item ${
                    userType === "client" ? "btn-primary" : ""
                  }`}
                  onClick={() => setUserType("client")}
                >
                  Client
                </button>
                <button
                  type="button"
                  className={`btn join-item ${
                    userType === "saller" ? "btn-primary" : ""
                  }`}
                  onClick={() => setUserType("saller")}
                >
                  Seller
                </button>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="p-6 bg-base-300 rounded-xl shadow-inner">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <InputWithIcon
                  Icon={FaUser}
                  placeholder="First Name"
                  value={userInfo.firstName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, firstName: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <InputWithIcon
                  Icon={FaUser}
                  placeholder="Last Name"
                  value={userInfo.lastName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, lastName: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <InputWithIcon
                  Icon={FaPhone}
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                  value={userInfo.phoneNumber}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <InputWithIcon
                  Icon={FaMapMarkerAlt}
                  placeholder="123 Main St, Anytown, USA"
                  value={userInfo.address}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, address: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Craftsman Section */}
          <div className="p-6 bg-base-300 rounded-xl shadow-inner">
            <div className="text-center">
              <button
                type="button"
                className="btn btn-accent transform hover:scale-105 transition-transform duration-300"
                onClick={() => setIsCraftsman(!isCraftsman)}
              >
                {isCraftsman ? "Close Craftsman Details" : "Become a Craftsman"}
              </button>
            </div>

            {isCraftsman && (
              <div className="mt-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-accent">
                  Craftsman Details
                </h2>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Type of Craft</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={craftsmanInfo.craftType}
                    onChange={(e) =>
                      setCraftsmanInfo({
                        ...craftsmanInfo,
                        craftType: e.target.value,
                      })
                    }
                  >
                    <option disabled value="">
                      Select your craft
                    </option>
                    <option>Pottery</option>
                    <option>Weaving</option>
                    <option>Jewelry</option>
                    <option>Woodworking</option>
                    <option>Leatherwork</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Store Address</span>
                  </label>
                  <InputWithIcon
                    Icon={FaMapMarkerAlt}
                    placeholder="Your store or workshop address"
                    value={craftsmanInfo.storeAddress}
                    onChange={(e) =>
                      setCraftsmanInfo({
                        ...craftsmanInfo,
                        storeAddress: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-center">
                    Proof of Craftsmanship
                  </h3>
                  <div className="flex justify-center">
                    <ImageDropzone onImageDrop={handleCraftsmanProofDrop} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-8 flex justify-center gap-4">
            <button
              type="submit"
              className="btn btn-primary btn-lg transform hover:scale-105 transition-transform duration-300"
            >
              Save All Changes
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/")}
            >
              Go Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
