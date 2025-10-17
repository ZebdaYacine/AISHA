import { useState } from "react";
import { FiUser, FiHome, FiLogOut, FiList, FiUpload } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { ShoppingBasket } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCraftsContext } from "../../hooks/useProfile";
import ThemeToggle from "../ThemeToggle";

interface NavSubItem {
  label: string;
  path: string;
  submenu?: { label: string; path: string }[];
}

interface NavItem {
  label: string;
  path: string;
  menu?: NavSubItem[];
}

interface MobileNavbarProps {
  cartItemCount: number;
  craftItems: NavItem[];
}

export default function MobileNavbar({
  cartItemCount,
  craftItems,
}: MobileNavbarProps) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [openSubMenus, setOpenSubMenus] = useState<Record<number, number | null>>(
    {}
  );
  const { isLoggedIn, user, logout, signOutUser } = useAuth();
  const { craftsmanInfo, setCraftsmanInfo } = useCraftsContext();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const isCraftsmanApproved =
    isLoggedIn &&
    typeof craftsmanInfo?.status === "string" &&
    ["accepted", "approved"].includes(craftsmanInfo.status.toLowerCase());

  const closeDrawer = () => {
    const drawer = document.getElementById(
      "mobile-drawer"
    ) as HTMLInputElement | null;
    if (drawer) {
      drawer.checked = false;
    }
    setOpenMenu(null);
    setOpenSubMenus({});
  };

  const handleLogout = async () => {
    const { error } = await signOutUser();
    if (error) {
      console.error("Failed to log out:", error);
      return;
    }

    logout();
    setCraftsmanInfo(null);
    closeDrawer();
    navigate("/");
  };

  const renderProfileMenu = () => {
    if (isAuthPage) {
      return <FiHome className="w-6 h-6 mr-2" />;
    }

    if (!isLoggedIn) {
      return (
        <FiUser
          className="w-6 h-6 mr-2"
          onClick={() => navigate("/register")}
        />
      );
    }

    return (
      <button
        type="button"
        className="w-8 h-8 mr-2 overflow-hidden rounded-full"
        onClick={() => {
          closeDrawer();
          navigate("/profile");
        }}
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <FiUser className="w-6 h-6" />
        )}
      </button>
    );
  };

  return (
    <div className="drawer drawer-end lg:hidden z-50">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content fixed flex justify-between items-center p-4 w-full bg-base-100 shadow-md">
        <div className="flex  flex-col w-full ">
          {/* Top Row */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex gap-2 items-center">
              {renderProfileMenu()}

              {isLoggedIn && (
                <div className="indicator">
                  <span className="indicator-item indicator-center badge badge-secondary h-4 w-4">
                    {cartItemCount}
                  </span>
                  <ShoppingBasket
                    className="w-6 h-6 mr-2"
                    onClick={() => navigate("/cart")}
                  />
                </div>
              )}

              {isCraftsmanApproved && (
                <IoStorefrontOutline
                  onClick={() => navigate("/my-store")}
                  className=" w-6 h-6 mr-2 cursor-pointer animate-pulse "
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/")}
                className="text-right font-canela text-2xl font-bold"
              >
                Aicha
              </button>

              <label
                htmlFor="mobile-drawer"
                className="btn btn-ghost btn-circle"
              >
                <HiOutlineMenuAlt3 className="w-6 h-6" />
              </label>
            </div>
          </div>
          {/* Search Bar */}
          <div className="px-2 mt-2 w-full">
            <label className="input rounded-2xl w-full">
              <CiSearch className="text-2xl" />
              <input type="search" required placeholder="Search" />
            </label>
          </div>
        </div>
      </div>

      {/* Drawer Menu */}
      <div className="drawer-side">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-60 min-h-full bg-base-100 text-base-content gap-4 font-canela">
          {isLoggedIn && (
            <>
              {isCraftsmanApproved && (
                <li className="animate-pulse">
                  <button
                    onClick={() => {
                      navigate("/my-store");
                      closeDrawer();
                    }}
                    className="btn btn-ghost justify-start"
                  >
                    <IoStorefrontOutline className="w-6 h-6 mr-2" />
                    My Store
                  </button>
                </li>
              )}

              <li>
                <button
                  className="btn btn-ghost justify-start"
                  onClick={() => {
                    navigate("/cart");
                    closeDrawer();
                  }}
                >
                  <MdOutlineShoppingCart className="w-6 h-6 mr-2" />
                  My Cart
                </button>
              </li>
              <li>
                <button
                  className="btn btn-ghost justify-start"
                  onClick={() => {
                    navigate("/orders");
                    closeDrawer();
                  }}
                >
                  <FiList className="w-6 h-6 mr-2" />
                  My Orders
                </button>
              </li>
              {!isCraftsmanApproved && (
                <li>
                  <button
                    className="btn btn-ghost justify-start"
                    onClick={() => {
                      navigate("/proof-of-craftsmanship");
                      closeDrawer();
                    }}
                  >
                    <FiUpload className="w-6 h-6 mr-2" />
                    Join to Us
                  </button>
                </li>
              )}
            </>
          )}
          <li>
            <div className="btn btn-ghost justify-start">
              <ThemeToggle /> Theme
            </div>
          </li>

          <li className="font-bold text-base mt-4">Crafts</li>
          {craftItems.map((item, idx) => (
            <li key={item.label} className="relative">
              <button
                type="button"
                className="btn btn-ghost justify-between text-sm w-full"
                onClick={() => {
                  const isOpen = openMenu === idx;
                  if (isOpen) {
                    setOpenMenu(null);
                    setOpenSubMenus((prev) => ({ ...prev, [idx]: null }));
                  } else {
                    setOpenMenu(idx);
                    setOpenSubMenus({ [idx]: null });
                  }
                }}
              >
                <span>{item.label}</span>
                {item.menu && (
                  <span className="text-lg leading-none">
                    {openMenu === idx ? "-" : "+"}
                  </span>
                )}
              </button>

              {item.menu && openMenu === idx && (
                <ul className="mt-2 bg-white shadow-md rounded-lg p-3 space-y-1 animate-fade-in">
                  {item.menu.map((sub, subIdx) => {
                    const isSubOpen = openSubMenus[idx] === subIdx;
                    return (
                      <li key={sub.label} className="relative">
                        <button
                          type="button"
                          className="flex items-center justify-between w-full text-left px-3 py-1 text-sm hover:text-[#a86c3c] transition-colors"
                          onClick={() => {
                            if (sub.submenu) {
                              setOpenSubMenus((prev) => ({
                                ...prev,
                                [idx]:
                                  prev[idx] === subIdx ? null : subIdx,
                              }));
                              return;
                            }
                            navigate(sub.path);
                            closeDrawer();
                          }}
                        >
                          <span>{sub.label}</span>
                          {sub.submenu && (
                            <span className="text-base leading-none">
                              {isSubOpen ? "-" : "+"}
                            </span>
                          )}
                        </button>

                        {sub.submenu && isSubOpen && (
                          <ul className="mt-1 ml-3 border-l border-base-200 pl-3 space-y-1">
                            {sub.submenu.map((deep) => (
                              <li key={deep.label}>
                                <button
                                  type="button"
                                  className="block w-full text-left px-3 py-1 text-sm hover:text-[#a86c3c] transition-colors"
                                  onClick={() => {
                                    navigate(deep.path);
                                    closeDrawer();
                                  }}
                                >
                                  {deep.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
          <li>
            <button
              className="btn btn-error justify-start text-base-100"
              onClick={() => void handleLogout()}
            >
              <FiLogOut className="w-6 h-6 mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
