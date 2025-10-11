import {
  createContext,
  useState,
  type ReactNode,
  useCallback,
  useMemo,
  useContext,
} from "react";
import type { CraftsmanInfo } from "../../feature/profile/data/datasource/ProfileDtos";

export type CraftsContextType = {
  craftsmanInfo: CraftsmanInfo | null;
  setCraftsmanInfo: (info: CraftsmanInfo | null) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const CraftsContext = createContext<CraftsContextType | undefined>(
  undefined
);

const CRAFTS_STORAGE_KEY = "craftsmanInfo";

export const CraftsProvider = ({ children }: { children: ReactNode }) => {
  const [craftsmanInfo, setCraftsmanInfoState] = useState<CraftsmanInfo | null>(
    () => {
      try {
        const storedCraftsInfo = localStorage.getItem(CRAFTS_STORAGE_KEY);
        return storedCraftsInfo ? JSON.parse(storedCraftsInfo) : null;
      } catch (error) {
        console.error(
          "Failed to parse craftsman info from localStorage:",
          error
        );
        return null;
      }
    }
  );

  const setCraftsmanInfo = useCallback((info: CraftsmanInfo | null) => {
    setCraftsmanInfoState(info);
    if (info) {
      localStorage.setItem(CRAFTS_STORAGE_KEY, JSON.stringify(info));
    } else {
      localStorage.removeItem(CRAFTS_STORAGE_KEY);
    }
  }, []);

  const value = useMemo(
    () => ({ craftsmanInfo, setCraftsmanInfo }),
    [craftsmanInfo, setCraftsmanInfo]
  );

  return (
    <CraftsContext.Provider value={value}>{children}</CraftsContext.Provider>
  );
};

// 🔥 Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useCraftsContext = () => {
  const context = useContext(CraftsContext);
  if (!context) {
    throw new Error("useCraftsContext must be used within a CraftsProvider");
  }
  return context;
};
