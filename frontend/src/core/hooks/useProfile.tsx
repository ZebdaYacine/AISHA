import { useContext } from "react";
import { ProfileContext } from "../state/profileContext";
import { CraftsContext } from "../state/craftsContext";

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
}

export function useCraftsContext() {
  const context = useContext(CraftsContext);
  if (!context) {
    throw new Error("useCraftsContext must be used within a ProfileProvider");
  }
  return context;
}
