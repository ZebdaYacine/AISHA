import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import InputWithIcon from "../../../../core/components/InputWithIcon";
import type { UserInfo } from "../../data/datasource/ProfileDtos";

interface Props {
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
}

export default function UserInformationComponent({
  userInfo,
  setUserInfo,
}: Props) {
  return (
    <div className="p-6 shadow-inner">
      {/* <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Personal Information
      </h2> */}
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
  );
}
