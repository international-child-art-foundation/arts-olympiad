import React, { createContext, useState, ReactNode, useContext } from "react";

export interface GuardianFormData {
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianTermsCheck: boolean;
}

export interface PersonalFormData {
  // isUnder18: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  day: number;
  month: number;
  year: number;
  termsCheck: false;
}

export interface UploadFormData {
  image: File | null;
  location: string;
  city: string;
  usingAI: false;
  source: string;
  prompt: string;
  category: string[];
  description: string;
}

interface StepsContextType {
  guardianFormData: GuardianFormData;
  setGuardianFormData: React.Dispatch<React.SetStateAction<GuardianFormData>>;
  hasError: boolean;
  setHasError: (hasError: boolean) => void;
  personalFormData: PersonalFormData;
  setPersonalFormData: React.Dispatch<React.SetStateAction<PersonalFormData>>;
  uploadFormData: UploadFormData;
  setUploadFormData: React.Dispatch<React.SetStateAction<UploadFormData>>;
}

export const StepsContext = createContext<StepsContextType | undefined>(undefined);

export const StepsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ guardianFormData, setGuardianFormData ] = useState<GuardianFormData>({
    guardianFirstName: "",
    guardianLastName: "",
    guardianEmail: "",
    guardianPhone: "",
    guardianTermsCheck: false,
  });

  const [ hasError, setHasError ] = useState<boolean>(false);

  const [ personalFormData, setPersonalFormData] = useState<PersonalFormData>({
    // isUnder18: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    day: 0,
    month: 0,
    year: 0,
  });

  const [uploadFormData, setUploadFormData] = useState<UploadFormDataa>({
    image: null,
    location: "",
    city: "",
    usingAI: false,
    source: "",
    prompt: "",
    category: [],
    description: "",
  });

  const contextValue = {
    guardianFormData,
    setGuardianFormData,
    hasError,
    setHasError,
    personalFormData,
    setPersonalFormData,
    uploadFormData, 
    setUploadFormData
  };

  return (
    <StepsContext.Provider value={contextValue}>
      {children}
    </StepsContext.Provider>
  );
};

export const useStepsContext = () => {
  const context = useContext(StepsContext);

  if (!context) {
    throw new Error("useStepsContext must be used within a StepsProvider");
  }

  return context;
};