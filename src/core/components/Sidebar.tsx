import { MdOutlineFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  cartItemCount: number;
}

export default function Sidebar({ cartItemCount }: SidebarProps) {
  return (
    <div className="fixed top-1/4 right-0 z-50 flex flex-col items-center gap-4 p-3 bg-base-100 rounded-l-xl shadow-lg">
      {/* Theme Toggle */}
      <div className="tooltip tooltip-left" data-tip="Toggle Theme">
        <ThemeToggle />
      </div>

      {/* Account Icon */}
      <div className="tooltip tooltip-left" data-tip="Account">
        <button className="btn btn-circle btn-ghost hover:bg-base-200">
          <FiUser className="w-6 h-6" />
        </button>
      </div>

      {/* Favorites Icon */}
      <div className="tooltip tooltip-left" data-tip="Favorites">
        <button className="btn btn-circle btn-ghost hover:bg-base-200">
          <MdOutlineFavoriteBorder className="w-6 h-6" />
        </button>
      </div>

      {/* Cart Icon with Count */}
      <div className="tooltip tooltip-left" data-tip="Cart">
        <button className="btn btn-circle btn-ghost relative hover:bg-base-200">
          <MdOutlineShoppingCart className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
