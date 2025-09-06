import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import InputWithIcon from "../../../../core/components/InputWithIcon";
import { useProfileContext } from "../../../../core/hooks/useProfile";
import type { ProfileInfo } from "../../../../feature/profile/data/datasource/ProfileDtos";

export default function UserInformationComponent() {
  const { profileInfo, setProfileInfo } = useProfileContext();

  // Generic change handler for inputs
  const handleChange = (field: keyof ProfileInfo, value: string) => {
    setProfileInfo({
      ...profileInfo,
      [field]: value,
    });
  };

  return (
    <div className="p-6 shadow-inner">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <InputWithIcon
            Icon={FaUser}
            placeholder="First Name"
            value={profileInfo?.firstName ?? ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>

        {/* Last Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <InputWithIcon
            Icon={FaUser}
            placeholder="Last Name"
            value={profileInfo?.lastName ?? ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <InputWithIcon
            Icon={FaPhone}
            placeholder="+1 (555) 123-4567"
            type="tel"
            value={profileInfo?.phoneNumber ?? ""}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </div>

        {/* Address */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <InputWithIcon
            Icon={FaMapMarkerAlt}
            placeholder="123 Main St, Anytown, USA"
            value={profileInfo?.address ?? ""}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
