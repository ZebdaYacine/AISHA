import { FiUser, FiHome } from "react-icons/fi";
import { ShoppingBasket } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCraftsContext } from "../../hooks/useProfile";
import { IoStorefrontOutline } from "react-icons/io5";

interface DesktopNavbarProps {
  cartItemCount: number;
  craftItems: { label: string; path: string }[];
}

export default function DesktopNavbar({
  cartItemCount,
  craftItems,
}: DesktopNavbarProps) {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { craftsmanInfo } = useCraftsContext();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const isHome = location.pathname === "/";

  return (
    <div className="hidden lg:flex navbar fixed top-0 z-40 bg-base-100 px-4 shadow-xl w-full flex-col items-center">
      <div className="w-full flex justify-between items-center py-2">
        <div className="flex flex-row w-full items-center">
          <div className="flex gap-2 items-center">
            {isAuthPage ? (
              <FiHome className="w-10 h-10 mr-2 cursor-pointer" />
            ) : isLoggedIn && user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-2 object-cover cursor-pointer"
                onClick={() => navigate("/profile")}
              />
            ) : (
              <FiUser
                className="w-10 h-10 mr-2 cursor-pointer"
                onClick={() => navigate(isLoggedIn ? "/profile" : "/register")}
              />
            )}
            <div className="indicator">
              <span className="indicator-item indicator-center badge badge-secondary h-4 w-4">
                {cartItemCount}
              </span>
              <ShoppingBasket
                className="w-10 h-10 mr-2 cursor-pointer"
                onClick={() => navigate("/cart")}
              />
            </div>
            {craftsmanInfo?.status === "accepted" && (
              <IoStorefrontOutline className="w-10 h-10 mr-2 cursor-pointer animate-pulse " />
            )}
          </div>
          <div className="px-2 w-full ml-3 mr-3">
            <label className="input rounded-2xl w-full">
              <CiSearch className="text-2xl" />
              <input
                className="input-xl pl-2 w-full h-5 "
                type="search"
                placeholder="Search"
              />
            </label>
          </div>
          <div
            onClick={() => navigate("/")}
            {...(isHome ? { tabIndex: 0 } : {})}
            className="btn btn-ghost font-canela text-6xl font-bold cursor-pointer"
          >
            Aicha
          </div>
        </div>
      </div>

      {/* Crafts menu */}
      <div className="flex w-full justify-center mt-4">
        <ul className="flex gap-6 text-lg font-bold font-inter font-medium text-gray-700 w-3/4 justify-center">
          {craftItems.map((item) => (
            <li
              key={item.label}
              onClick={() => navigate(item.path)}
              className="relative cursor-pointer hover:text-primary transition-all duration-200"
            >
              <span>{item.label}</span>
              <span className="block h-0.5 w-0 bg-primary transition-all duration-300 hover:w-full"></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
