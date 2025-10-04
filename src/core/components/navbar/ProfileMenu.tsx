import { useEffect, useRef, useState } from "react";
import { FiUser, FiLogOut, FiList } from "react-icons/fi";

interface ProfileMenuProps {
  userPhoto?: string | null;
  onProfile: () => void;
  onCart: () => void;
  onOrders: () => void;
  onLogout?: () => void | Promise<void>;
  size?: "md" | "lg";
  align?: "left" | "right" | "center";
  className?: string;
}

const ProfileMenu = ({
  userPhoto,
  onProfile,
  onOrders,
  onLogout,
  size = "lg",
  className = "",
}: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const triggerSizeClass = size === "lg" ? "w-10 h-10" : "w-8 h-8";
  const iconSizeClass = size === "lg" ? "w-6 h-6" : "w-5 h-5";

  const handleAction = async (action: () => void | Promise<void>) => {
    try {
      await action();
    } finally {
      setOpen(false);
    }
  };

  const containerClassName = ["relative", "inline-flex", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={containerClassName}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`overflow-hidden rounded-full flex items-center justify-center border border-transparent hover:border-primary transition ${triggerSizeClass}`}
      >
        {userPhoto ? (
          <img
            src={userPhoto}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <FiUser className={iconSizeClass} />
        )}
      </button>

      {open && (
        <div
          className={`absolute  mt-10 w-48 rounded-xl border border-base-200 bg-base-100 shadow-2xl z-50`}
        >
          <ul className="menu menu-lg text-xl w-full">
            <li>
              <button onClick={() => handleAction(onProfile)}>
                <FiUser className="w-4 h-4" /> Profile
              </button>
            </li>
            {/* <li>
              <button onClick={() => handleAction(onCart)}>
                <HiOutlineShoppingCart className="w-4 h-4" /> Cart
              </button>
            </li> */}
            <li>
              <button onClick={() => handleAction(onOrders)}>
                <FiList className="w-4 h-4" /> My Orders
              </button>
            </li>
            {onLogout && (
              <li>
                <button onClick={() => handleAction(onLogout)}>
                  <FiLogOut className="w-4 h-4" /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
