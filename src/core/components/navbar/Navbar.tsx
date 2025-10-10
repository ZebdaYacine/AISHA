import { useContext, useEffect, useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { AuthContext } from "../../state/AuthContext";
import { db } from "../../firebase/config";
import { ref, onValue } from "firebase/database";
import { useCraftsContext } from "../../hooks/useProfile";
import { getCraftsmanInfo } from "../../firebase/auth";

export default function Navbar() {
  const { user, isLoggedIn } = useContext(AuthContext)!;
  const { setCraftsmanInfo } = useCraftsContext();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn || !user?.uid) {
      setCartItemCount(0);
      return;
    }

    const cartRef = ref(db, `carts/${user.uid}`);
    const unsubscribe = onValue(
      cartRef,
      (snapshot) => {
        const data = snapshot.val();
        setCartItemCount(data ? Object.keys(data).length : 0);
      },
      (error) => {
        console.error("Error fetching cart items count:", error);
        setCartItemCount(0);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [isLoggedIn, user?.uid]);

  useEffect(() => {
    if (!isLoggedIn || !user?.uid) {
      return;
    }

    let isCancelled = false;

    const fetchCraftsmanData = async () => {
      try {
        const data = await getCraftsmanInfo(user.uid);
        if (!isCancelled) {
          setCraftsmanInfo(data ?? null);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error loading craftsman info:", error);
        }
      }
    };

    fetchCraftsmanData();

    return () => {
      isCancelled = true;
    };
  }, [isLoggedIn, setCraftsmanInfo, user?.uid]);

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
