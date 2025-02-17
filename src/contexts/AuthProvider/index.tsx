// context/AuthContext.tsx
"use client"; // To ensure this runs client-side

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";

interface AuthContextProps {
  session: Session | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps>(
  undefined as unknown as AuthContextProps
);

export const AuthProviderChildren = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(status === "authenticated");
  }, [status]);

  return (
    <AuthContext.Provider value={{ session, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = ({ children }: { children: ReactNode }) => (
  <SessionProvider>
    <AuthProviderChildren>{children}</AuthProviderChildren>
  </SessionProvider>
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
