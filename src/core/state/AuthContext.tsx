import { createContext, useState, useEffect, type ReactNode } from "react";
import { type User } from "firebase/auth";
import { onAuthStateChange, getCurrentUser } from "../firebase/auth";

export type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    // Listen for auth state changes
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const login = (user: User) => {
    console.log("🔐 AuthContext: Login called with user:", user);
    setUser(user);
  };

  const logout = () => {
    console.log("🔐 AuthContext: Logout called");
    setUser(null);
  };

  const isLoggedIn = !!user;

  console.log("🔐 AuthContext: Current state:", { user, isLoggedIn, loading });

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
