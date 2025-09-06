import {
  createContext,
  useState,
  type ReactNode,
  useCallback,
  useMemo,
  useContext,
} from "react";
import type { ProfileInfo } from "../../feature/profile/data/datasource/ProfileDtos";

export type ProfileContextType = {
  profileInfo: ProfileInfo | null;
  setProfileInfo: (info: ProfileInfo | null) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

const PROFILE_STORAGE_KEY = "profileInfo";

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileInfo, setProfileInfoState] = useState<ProfileInfo | null>(
    () => {
      try {
        const storedProfileInfo = localStorage.getItem(PROFILE_STORAGE_KEY);
        return storedProfileInfo ? JSON.parse(storedProfileInfo) : null;
      } catch (error) {
        console.error("Failed to parse profile info from localStorage:", error);
        return null;
      }
    }
  );

  const setProfileInfo = useCallback((info: ProfileInfo | null) => {
    setProfileInfoState(info);
    if (info) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(info));
    } else {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }, []);

  const value = useMemo(
    () => ({ profileInfo, setProfileInfo }),
    [profileInfo, setProfileInfo]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

// 🔥 Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
