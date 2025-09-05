import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// import UserTypeComponent from "../components/UserTypeComponent";
import UserInformationComponent from "../components/UserInformationComponent";
import ProofOfCraftsComponent from "../components/ProofOfCraftsComponent";

import { useProfileViewModel } from "../../viewmodel/ProfileViewModel";

export default function ProfilePage() {
  const navigate = useNavigate();
  const vm = useProfileViewModel();

  useEffect(() => {
    if (!vm.loading && !vm.isLoggedIn) {
      navigate("/login");
    }
  }, [vm.loading, vm.isLoggedIn, navigate]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await vm.saveProfile();
    alert(result.message);
    navigate("/");
  };

  if (vm.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!vm.user) {
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
    <div className="p-4 sm:p-8">
      <div className="max-w-4xl mx-auto shadow-xl mt-10 rounded-xl p-6 sm:p-10">
        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Profile Picture + Account Type */}
          <div className="flex flex-col sm:flex-row items-center justify-around p-6 shadow-inner">
            {/* Profile Picture */}
            <div className="flex flex-col items-center text-center">
              <div className="avatar mb-4">
                <div className="w-32 h-32 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      vm.user.photoURL ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                    }
                    alt="Profile"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-base-content">
                {vm.user.displayName || "User"}
              </h2>
              <p className="text-sm text-base-content/70">{vm.user.email}</p>
            </div>

            {/* <UserTypeComponent
              userType={vm.userInfo.type}
              setUserType={vm.userInfo.type === "client" ? () => {} : () => {}}
            /> */}
          </div>

          {/* User Info */}
          <UserInformationComponent
            userInfo={vm.userInfo}
            setUserInfo={vm.setUserInfo}
          />

          {/* Craftsman Section */}
          {!vm.isCraftsman ? (
            <ProofOfCraftsComponent
              isCraftsman={vm.isCraftsman}
              setIsCraftsman={vm.setIsCraftsman}
              craftsmanInfo={vm.craftsmanInfo}
              setCraftsmanInfo={vm.setCraftsmanInfo}
              handleCraftsmanProofDrop={vm.handleCraftsmanProofDrop}
            />
          ) : null}

          {/* Actions */}
          <div className="pt-8 flex justify-center gap-4">
            <button
              type="submit"
              className="btn btn-primary btn-lg transform hover:scale-105 transition-transform duration-300"
            >
              Save All Changes
            </button>
            {/* <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate("/")}
            >
              Go Home
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
