"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { UserDataSchema } from "@/interfaces/user_auth";
import { UserArtworkSchema } from "@/interfaces/artwork_shapes";
import { dashboardMainTabSubmissionSchema } from "../../mock/dashboardMainTabSubmissionSchema";

interface DashboardContextType {
  apiUserData: UserDataSchema | undefined;
  setApiUserData: React.Dispatch<React.SetStateAction<UserDataSchema | undefined>>;
  userHasActiveSubmission: boolean;
  userHasPaid: boolean;
  setUserHasActiveSubmission: React.Dispatch<React.SetStateAction<boolean>>;
  apiArtworkData: UserArtworkSchema | undefined;
  setApiArtworkData: React.Dispatch<React.SetStateAction<UserArtworkSchema | undefined>>;
  apiArtworkVoteData: UserArtworkSchema | undefined;
  setApiArtworkVoteData: React.Dispatch<React.SetStateAction<UserArtworkSchema | undefined>>;
  dashboardMainTabSubmissionData: dashboardMainTabSubmissionSchema;
  setDashboardMainTabSubmissionData: React.Dispatch<React.SetStateAction<dashboardMainTabSubmissionSchema>>;
  displayModal: string;
  setDisplayModal: React.Dispatch<React.SetStateAction<string>>;
  setUserHasPaid: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // These values refer to userData and artworkData as received from the API, our official source of truth.
  // Probably should not be used for form data; the form should submit its data, and upon a success response, we update userData and artworkData
  // Or we do another API call to retrieve them again, ensuring consistency 
  const [apiUserData, setApiUserData] = useState<UserDataSchema>();
  const [apiArtworkData, setApiArtworkData] = useState<UserArtworkSchema>();
  const [apiArtworkVoteData, setApiArtworkVoteData] = useState<UserArtworkSchema>(); // This can be set via API upon user visiting Your Vote page
  const [userHasPaid, setUserHasPaid] = useState<boolean>(false);
  // TODO: Update userHasActiveSubmission to be set by API, or just replace usage with API data
  const [userHasActiveSubmission, setUserHasActiveSubmission] = useState(false); // harcoded to true for now, should change with API integration
  const [displayModal, setDisplayModal] = useState("");
  const [dashboardMainTabSubmissionData, setDashboardMainTabSubmissionData] = useState<dashboardMainTabSubmissionSchema>({
    source: "",
    prompt:"",
    description:""
  });
  const contextValue ={
    apiUserData, setApiUserData,
    userHasActiveSubmission, setUserHasActiveSubmission,
    apiArtworkData, setApiArtworkData,
    apiArtworkVoteData, setApiArtworkVoteData,
    dashboardMainTabSubmissionData, setDashboardMainTabSubmissionData,
    displayModal, setDisplayModal,
    userHasPaid, setUserHasPaid
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
