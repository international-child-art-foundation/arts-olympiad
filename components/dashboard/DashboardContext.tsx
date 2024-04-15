"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { UserDataSchema } from "../../mock/userDataSchema";
import { userArtworkSchema } from "../../mock/userArtworkSchema";

interface DashboardContextType {
  userData: UserDataSchema | undefined;
  setUserData: React.Dispatch<React.SetStateAction<UserDataSchema | undefined>>;
  userHasActiveSubmission: boolean;
  setUserHasActiveSubmission: React.Dispatch<React.SetStateAction<boolean>>;
  artworkData: userArtworkSchema | undefined;
  setArtworkData: React.Dispatch<React.SetStateAction<userArtworkSchema | undefined>>;

}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // These values refer to userData and artworkData as received from the API, our official source of truth.
  // Probably should not be used for form data; the form should submit its data, and upon a success response, we update userData and artworkData
  // Or we do another API call to retrieve them again, ensuring consistency 
  const [userData, setUserData] = useState<UserDataSchema>();
  const [artworkData, setArtworkData] = useState<userArtworkSchema>();
  // TODO: Update userHasActiveSubmission to be set by API, or just replace usage with API data
  const [userHasActiveSubmission, setUserHasActiveSubmission] = useState(true); // harcoded to true for now, should change with API integration
  const contextValue ={
    userData, setUserData,
    userHasActiveSubmission, setUserHasActiveSubmission,
    artworkData, setArtworkData
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }
  return context;
};
