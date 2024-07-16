"use client";
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from "react";
import { handleSignOut, handleLogin } from "@/utils/api-user";
import { UserLoginInterface } from "@/interfaces/user_auth";
import { SignInResponse } from "@/interfaces/api_shapes";
import { limiter } from "@/utils/api-rate-limit";
import { EmptyErrorResponse } from "@/interfaces/api_shapes";

interface GlobalContextType {
  isAuthenticated: boolean;
  signIn: ({ email, password }: UserLoginInterface) => Promise<SignInResponse>;
  isCookieConsentAcquired: boolean | null;
  cookieBannerVisible: boolean;
  setGlobalCookieConsentValue: (consentValue: boolean) => void;
  setCookieBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  signOut: () => void;
  handleRealizeSignedOut: () => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Setter should only be used by setGlobalCookieConsentValue.
  const [isCookieConsentAcquired, setIsCookieConsentAcquired] = useState<boolean | null>(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState<boolean>(isCookieConsentAcquired != true && isCookieConsentAcquired != false);

  useEffect(() => {
    // If isAuthenticated exists and is a string, we are authenticated.
    // This is not a foolproof solution, just prevents superfluous API calls.
    // To actually determine if we are authenticated for things that matter,
    // the getAuthStatus function from auth.ts should be used.
    const storedAuth = typeof(localStorage.getItem("isAuthenticated")) == "string";
    setIsAuthenticated(storedAuth);
    const cookieConsentStatus = JSON.parse(localStorage.getItem("cookieConsent") || "null");
    setIsCookieConsentAcquired(cookieConsentStatus);
    if (cookieConsentStatus != true && cookieConsentStatus != false) {
      setCookieBannerVisible(true);
    } else {
      setCookieBannerVisible(false);
    }
  }, []);

  const signIn = useCallback(async (values: UserLoginInterface) => {
    try {
      const signInRequest = await limiter.schedule(() => handleLogin(values));
      if (signInRequest.success) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", signInRequest.sk);
        return signInRequest;
      } else {
        return {success: false} as EmptyErrorResponse;
      }
    } catch(error) {
      console.log("Error signing in");
      return {success: false} as EmptyErrorResponse;
    }
  }, []);

  const setGlobalCookieConsentValue = useCallback(async (consentValue: boolean) => {
    localStorage.setItem("cookieConsent", consentValue.toString());
    setIsCookieConsentAcquired(consentValue);
    
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        "analytics_storage": consentValue ? "granted" : "denied"
      });
    }
  }, []);


  const signOut = useCallback(async () => {
    try {
      await limiter.schedule(() => handleSignOut());
      console.log("Successfully signed out.");
    } catch {
      console.log("Failed to sign out.");
    }
    // Regardless of server action, set local signout
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
    () => ({ isAuthenticated, signIn, signOut, handleRealizeSignedOut, isCookieConsentAcquired, setGlobalCookieConsentValue, cookieBannerVisible, setCookieBannerVisible }),
    [isAuthenticated, signIn, signOut, handleRealizeSignedOut, isCookieConsentAcquired, setGlobalCookieConsentValue, cookieBannerVisible, setCookieBannerVisible]
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