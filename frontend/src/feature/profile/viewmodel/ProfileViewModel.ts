import { useEffect } from "react";
import { ref, set, get } from "firebase/database";
import { useAuth } from "../../../core/hooks/useAuth";
import { db } from "../../../core/firebase/config";
import {
  useCraftsContext,
  useProfileContext,
} from "../../../core/hooks/useProfile";
import type { CraftsmanInfo } from "../data/datasource/ProfileDtos";

const UPLOAD_ENDPOINT = import.meta.env.PROD
  ? import.meta.env.VITE_UPLOAD_ENDPOINT_PROD
  : import.meta.env.VITE_UPLOAD_ENDPOINT_TEST;

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Failed to convert file to base64"));
        return;
      }
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
};

const uploadProofFile = async (file: File): Promise<string> => {
  const fileData = await fileToBase64(file);

  const response = await fetch(UPLOAD_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file_data: fileData,
      file_name: file.name,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  const uploadedPath = data?.url ?? data?.path;

  if (!uploadedPath) {
    throw new Error("Upload response missing image path");
  }

  return uploadedPath;
};

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
      if (craftsmanInfo) {
        let proofValue: string | null = null;

        if (typeof craftsmanInfo.proof === "string") {
          proofValue = craftsmanInfo.proof;
        } else if (craftsmanInfo.proof instanceof File) {
          proofValue = await uploadProofFile(craftsmanInfo.proof);
        }

        console.log(craftsmanInfo.status);

        const updatedCraftsmanInfo: CraftsmanInfo = {
          ...craftsmanInfo,
          proof: proofValue ?? null,
          userId: user.uid,
          status: craftsmanInfo.status,
        };
        await set(
          ref(db, "craftsman_requests/" + user.uid),
          updatedCraftsmanInfo
        );
        setCraftsmanInfo(updatedCraftsmanInfo);
      }
      await set(ref(db, "users/" + user.uid), profileInfo);
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
