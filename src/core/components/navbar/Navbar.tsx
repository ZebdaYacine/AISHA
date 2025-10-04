import { useContext } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { AuthContext } from "../../state/AuthContext";
import { db } from "../../firebase/config";
import { ref, onValue } from "firebase/database";
import useSWR from "swr";


const fetchCartItemsCount = (userId: string | undefined) => async () => {
  if (!userId) return 0;

  const cartRef = ref(db, `carts/${userId}`);
  return new Promise<number>((resolve) => {
    onValue(
      cartRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(Object.keys(data).length);
        } else {
          resolve(0);
        }
      },
      (error) => {
        console.error("Error fetching cart items count:", error);
        resolve(0); // Resolve with 0 on error
      }
    );
  });
};

export default function Navbar() {
  const { user, isLoggedIn } = useContext(AuthContext)!;
  const { data: cartItemCount = 0 } = useSWR(
    isLoggedIn ? `cartsCount/${user?.uid}` : null,
    fetchCartItemsCount(user?.uid)
  );

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
