import { useEffect } from "react";
import { ref, set, get } from "firebase/database";
import { useAuth } from "../../../core/hooks/useAuth";
import { db } from "../../../core/firebase/config";
import { useCraftsContext, useProfileContext } from "../../../core/hooks/useProfile";
import type { CraftsmanInfo } from "../data/datasource/ProfileDtos";

export function useProfileViewModel() {
  const { user, isLoggedIn, loading } = useAuth();
  const { setProfileInfo, profileInfo } = useProfileContext();
  const { craftsmanInfo, setCraftsmanInfo } = useCraftsContext();

  const fetchUserData = async () => {
    if (!user) return;
    try {
      const userRef = ref(db, "users/" + user.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const nameParts = user.displayName?.split(" ") || ["", ""];
        setProfileInfo({
          ...userData,
          firstName: nameParts[0] || userData.firstName || "",
          lastName: nameParts.slice(1).join(" ") || userData.lastName || "",
        });
        console.log("Fetched user data:", userData);
      } else {
        //
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchCraftsmanData = async () => {
    if (!user) return;
    try {
      const craftsmanRef = ref(db, "craftsman_requests/" + user.uid);
      const snapshot = await get(craftsmanRef);

      if (snapshot.exists()) {
        const craftsmanData = snapshot.val();
        setCraftsmanInfo(craftsmanData);
        console.log("Fetched craftsman data:", craftsmanData);
      } else {
        //
      }
    } catch (error) {
      console.error("Error fetching craftsman data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCraftsmanData();
  }, [user]);

  const saveProfile = async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    if (!user) return { success: false, message: "User not authenticated" };

    try {
      // Save user profile data
      await set(ref(db, "users/" + user.uid), profileInfo);

      // Save craftsman request
      if (craftsmanInfo) {
        const updatedCraftsmanInfo: CraftsmanInfo = {
          ...craftsmanInfo,
          userId: user.uid,
          status: "pending",
        };
        await set(
          ref(db, "craftsman_requests/" + user.uid),
          updatedCraftsmanInfo
        );
      }

      // Re-fetch data after saving
      await fetchUserData();
      await fetchCraftsmanData();

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

    profileInfo,
    craftsmanInfo,
    setCraftsmanInfo,

    saveProfile,
  };
}
