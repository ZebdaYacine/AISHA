import { useState, useEffect } from "react";
import { ref, set, get } from "firebase/database";
import { useAuth } from "../../../core/hooks/useAuth";
import { db } from "../../../core/firebase/config";
import type { CraftsmanInfo, UserInfo } from "../data/datasource/ProfileDtos";

export function useProfileViewModel() {
  const { user, isLoggedIn, loading } = useAuth();

  const [isCraftsman, setIsCraftsman] = useState(false);

  const [craftsmanInfo, setCraftsmanInfo] = useState<CraftsmanInfo>({
    craftType: "",
    storeAddress: "",
    proof: null,
  });

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    role: "user",
    type: "client",
  });

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const userRef = ref(db, "users/" + user.uid);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          const nameParts = user.displayName?.split(" ") || ["", ""];
          setUserInfo({
            ...userData,
            firstName: nameParts[0] || userData.firstName || "",
            lastName: nameParts.slice(1).join(" ") || userData.lastName || "",
            phoneNumber: user.phoneNumber || userData.phoneNumber || "",
          });
          setIsCraftsman(userData.isCraftsman || false);
          setCraftsmanInfo(userData.craftsmanInfo || { craftType: "", storeAddress: "", proof: null });
        } else {
          const nameParts = user.displayName?.split(" ") || ["", ""];
          setUserInfo((prev) => ({
            ...prev,
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            phoneNumber: user.phoneNumber || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleCraftsmanProofDrop = (file: File) => {
    setCraftsmanInfo({ ...craftsmanInfo, proof: file });
  };

  const saveProfile = async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    if (!user) return { success: false, message: "User not authenticated" };
    if (isCraftsman) userInfo.type = "craftsman";
    else userInfo.type = "client";
    const userData = {
      ...userInfo,
      photoURL: user.photoURL,
      isCraftsman,
      ...(isCraftsman && { craftsmanInfo }),
    };

    try {
      await set(ref(db, "users/" + user.uid), userData);
      return { success: true, message: "Profile updated successfully!" };
    } catch (error) {
      console.error("Error updating profile: ", error);
      return { success: false, message: "Failed to update profile." };
    }
  };

  return {
    user,
    isLoggedIn,
    loading,

    userInfo,
    setUserInfo,

    isCraftsman,
    setIsCraftsman,

    craftsmanInfo,
    setCraftsmanInfo,

    handleCraftsmanProofDrop,
    saveProfile,
  };
}
