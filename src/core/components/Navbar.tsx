import { MdOutlineFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useAuth } from "../hooks/useAuth";

interface MainNavbarProps {
  cartItemCount: number;
}

export default function Navbar({ cartItemCount }: MainNavbarProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const hideDropdown =
  //   location.pathname === "/login" || location.pathname === "/register";
  const isHome = location.pathname === "/";

  const craftItems = [
    { label: "New In", path: "/new" },
    { label: "Shop by Category", path: "/category" },
    { label: "Shop by Artisan", path: "/artisan" },
    { label: "Custom Orders", path: "/custom" },
    { label: "Collections", path: "/collections" },
    { label: "Our Mission", path: "/mission" },
  ];

  return (
    <>
      {/* 📱 Mobile Drawer */}
      <div className="drawer drawer-end lg:hidden z-50">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-between items-center px-4 py-2 w-full bg-base-100 shadow-md">
          <div className="flex-1 text-center font-canela text-2xl font-bold">
            <button onClick={() => navigate("/")}>Aicha</button>
          </div>
          <label htmlFor="mobile-drawer" className="btn btn-ghost btn-circle">
            <HiOutlineMenuAlt3 className="w-6 h-6" />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 min-h-full bg-base-100 text-base-content gap-4">
            <li>
              <div className="px-2">
                <LanguageSelector />
              </div>
            </li>

            <li>
              <button
                className="btn btn-ghost justify-start"
                onClick={() => navigate("/register")}
              >
                <FiUser className="w-6 h-6 mr-2" /> Account
              </button>
            </li>

            {isLoggedIn && (
              <>
                <li>
                  <button className="btn btn-ghost justify-start">
                    <MdOutlineFavoriteBorder className="w-6 h-6 mr-2" />
                    Favorites
                  </button>
                </li>
                <li>
                  <button className="btn btn-ghost justify-start relative">
                    <MdOutlineShoppingCart className="w-6 h-6 mr-2" />
                    Cart
                    {cartItemCount > 0 && (
                      <span className="badge badge-sm badge-primary ml-2">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                </li>
              </>
            )}

            <li>
              <div className="btn btn-ghost justify-start">
                <ThemeToggle /> Theme
              </div>
            </li>

            {/* Mobile Craft List */}
            <>
              <li className="font-bold text-base mt-4">Crafts</li>
              {craftItems.map((item) => (
                <li key={item.label}>
                  <button
                    className="btn btn-ghost justify-start text-sm"
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </>
          </ul>
        </div>
      </div>

      {/* 🖥️ Desktop Navbar */}
      <div className="hidden lg:flex navbar fixed top-0 z-40 bg-base-100 px-4 shadow-xl w-full flex-col items-center">
        <div className="w-full flex justify-between items-center py-2">
          {/* Left: Language */}
          <div className="navbar-start">
            <LanguageSelector />
          </div>

          {/* Center: Aicha logo + crafts */}
          <div className="relative flex flex-col items-center justify-center group w-full">
            <div
              onClick={() => navigate("/")}
              {...(isHome ? { tabIndex: 0 } : {})}
              className="btn btn-ghost font-canela text-4xl font-bold cursor-pointer"
            >
              Aicha
            </div>

            {/* Crafts list (hover only) */}
            <div className="hidden group-hover:flex w-full justify-center mt-4">
              <ul className="flex gap-6 text-sm font-inter font-medium text-gray-700 w-3/4 justify-center">
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

          {/* Right: Icons */}
          <div className="navbar-end gap-4">
            {isLoggedIn && (
              <>
                <button className="btn btn-ghost relative">
                  <MdOutlineFavoriteBorder className="w-6 h-6" />
                </button>
                <button className="btn btn-ghost relative">
                  <MdOutlineShoppingCart className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </>
            )}
            <button
              className="btn btn-ghost"
              onClick={() => navigate("/register")}
            >
              <FiUser className="w-6 h-6" />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}
