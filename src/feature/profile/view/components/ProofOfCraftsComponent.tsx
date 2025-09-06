import { FaMapMarkerAlt } from "react-icons/fa";
import InputWithIcon from "../../../../core/components/InputWithIcon";
import ImageDropzone from "../../../../core/components/ImageDropzone";
import { useCraftsContext } from "../../../../core/hooks/useProfile";
import { useState } from "react";

export default function ProofOfCraftsComponent() {
  const { craftsmanInfo, setCraftsmanInfo } = useCraftsContext();

  const [showCraftsmanForm, setShowCraftsmanForm] = useState<boolean>(false);

  const handleCraftsmanProofDrop = (file: File) => {
    setCraftsmanInfo({
      ...craftsmanInfo,
      proof: file,
    });
  };

  const handleStoreAdress = (adress: string) => {
    setCraftsmanInfo({
      ...craftsmanInfo,
      storeAddress: adress,
    });
  };

  const handleCarftType = (craftType: string) => {
    setCraftsmanInfo({
      ...craftsmanInfo,
      craftType: craftType,
    });
  };

  return (
    <div className="p-6 shadow-inner">
      <div className="text-center">
        <button
          type="button"
          className="btn btn-lg btn-primary transform hover:scale-105 transition-transform duration-300"
          onClick={() => {
            setShowCraftsmanForm(!showCraftsmanForm);
          }}
        >
          {showCraftsmanForm ? "Close Craftsman Details" : "Become a Craftsman"}
        </button>
      </div>

      {showCraftsmanForm && (
        <div className="mt-6 space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Type of Craft</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={craftsmanInfo?.craftType}
              onChange={(e) => {
                handleCarftType(e.target.value);
              }}
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
              value={craftsmanInfo?.storeAddress}
              onChange={(e) => handleStoreAdress(e.target.value)}
            />
          </div>
          <div className="form-control">
            <h3 className="text-lg font-medium mb-2 text-center">
              Proof of Craftsmanship
            </h3>
            <div className="mt-5 flex justify-center">
              <ImageDropzone onImageDrop={handleCraftsmanProofDrop} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
