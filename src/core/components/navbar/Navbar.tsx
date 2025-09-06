import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

interface NavbarProps {
  cartItemCount: number;
}

export default function Navbar({ cartItemCount }: NavbarProps) {
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
      <MobileNavbar cartItemCount={cartItemCount} craftItems={craftItems} />
      <DesktopNavbar cartItemCount={cartItemCount} craftItems={craftItems} />
    </>
  );
}
