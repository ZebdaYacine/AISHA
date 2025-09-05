import { FaMapMarkerAlt } from "react-icons/fa";
import InputWithIcon from "../../../../core/components/InputWithIcon";
import ImageDropzone from "../../../../core/components/ImageDropzone";

interface CraftsmanInfo {
  craftType: string;
  storeAddress: string;
  proof: File | null;
}

interface Props {
  isCraftsman: boolean;
  setIsCraftsman: (val: boolean) => void;
  craftsmanInfo: CraftsmanInfo;
  setCraftsmanInfo: (info: CraftsmanInfo) => void;
  handleCraftsmanProofDrop: (file: File) => void;
}

export default function ProofOfCraftsComponent({
  isCraftsman,
  setIsCraftsman,
  craftsmanInfo,
  setCraftsmanInfo,
  handleCraftsmanProofDrop,
}: Props) {
  return (
    <div className="p-6 shadow-inner">
      <div className="text-center">
        <button
          type="button"
          className="btn btn-lg btn-primary transform hover:scale-105 transition-transform duration-300"
          onClick={() => setIsCraftsman(!isCraftsman)}
        >
          {isCraftsman ? "Close Craftsman Details" : "Become a Craftsman"}
        </button>
      </div>

      {isCraftsman && (
        <div className="mt-6 space-y-6">
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
