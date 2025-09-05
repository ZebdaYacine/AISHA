interface UserTypeProps {
  userType: string;
  setUserType: (type: string) => void;
}

export default function UserTypeComponent({
  userType,
  setUserType,
}: UserTypeProps) {
  return (
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
  );
}
