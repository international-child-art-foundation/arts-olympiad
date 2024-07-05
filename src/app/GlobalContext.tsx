"use client";
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from "react";
import { handleSignOut, handleLogin } from "@/utils/auth";
import { UserLoginInterface } from "@/interfaces/user_auth";
import { LoginResponse } from "@/interfaces/api_shapes";

interface GlobalContextType {
  isAuthenticated: boolean;
  signIn: ({ email, password }: UserLoginInterface) => Promise<LoginResponse>;
  signOut: () => void;
  handleRealizeSignedOut: () => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // If isAuthenticated exists and is a string, we are authenticated.
    // This is not a foolproof solution, just prevents superfluous API calls.
    // To actually determine if we are authenticated for things that matter,
    // the getAuthStatus function from auth.ts should be used.
    const storedAuth = typeof(localStorage.getItem("isAuthenticated")) == "string";
    setIsAuthenticated(storedAuth);
  }, []);

  const signIn = useCallback(async (values: UserLoginInterface) => {
    const signInStatus = await handleLogin(values);

    if (signInStatus.success === true) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", signInStatus.message);
    }
    return signInStatus;
  }, []);

  const signOut = useCallback(async () => {
    await handleSignOut();
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  }, []);

  // Should be used whenever the client realizes (during normal operation)
  // that the user is signed out and should be shown the default UI.
  const handleRealizeSignedOut = useCallback(async () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  }, []);

  const value = React.useMemo<GlobalContextType>(
    () => ({ isAuthenticated, signIn, signOut, handleRealizeSignedOut }),
    [isAuthenticated, signIn, signOut, handleRealizeSignedOut]
  );

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
};