import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProofOfCraftsComponent from "../components/ProofOfCraftsComponent";
import { useProfileViewModel } from "../../viewmodel/ProfileViewModel";
import CustomAlert from "../components/CustomAlert";
import { useCraftsContext } from "../../../../core/hooks/useProfile";
import swal from "sweetalert";

export default function ProofOfCraftsmanshipPage() {
  const navigate = useNavigate();
  const vm = useProfileViewModel();
  const { craftsmanInfo } = useCraftsContext();

  useEffect(() => {
    if (!vm.loading && !vm.isLoggedIn) {
      navigate("/login");
    }
  }, [vm.loading, vm.isLoggedIn, navigate]);

  if (vm.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!vm.user) {
    return (
      <div className="mt-28 min-h-screen flex items-center justify-center">
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

  const showProofForm = !craftsmanInfo?.status;

  const handleSubmit = async () => {
    const result = await vm.saveProfile();
    swal(
      result.success ? "🎉 Success!" : "",
      result.message,
      result.success ? "success" : "error"
    );
  };

  return (
    <div className="mt-16 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto shadow-xl mt-10 rounded-xl p-6 sm:p-10 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Proof of Craftsmanship</h1>
          <p className="text-base-content/70">
            Share the details of your craft so we can review and welcome you to
            the marketplace.
          </p>
        </header>

        

        {showProofForm ? (
          <ProofOfCraftsComponent forceOpen />
        ) : craftsmanInfo?.status === "pending" ? (
          <CustomAlert
            type="pending"
            message="⏳ Your request to become a craftsman is pending."
          />
        ) : craftsmanInfo?.status === "accepted" ? (
          <CustomAlert
            type="accepted"
            message="🎉 Your request has been accepted! Welcome aboard."
          />
        ) : craftsmanInfo?.status === "rejected" ? (
          <CustomAlert
            type="rejected"
            message="❌ Sorry, your request was rejected."
          />
        ) : null}

        {showProofForm && (
          <div className="pt-4 flex justify-center">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => void handleSubmit()}
            >
              Submit Craftsman Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
