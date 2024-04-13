import React, { createContext, useState, ReactNode, useContext } from "react";
import { GuardianFormData, PersonalFormData, UploadFormData, FormValues } from "../../../mock/formDataStructs";


interface StepsContextType {
  guardianFormData: GuardianFormData;
  setGuardianFormData: React.Dispatch<React.SetStateAction<GuardianFormData>>;
  personalFormData: PersonalFormData;
  setPersonalFormData: React.Dispatch<React.SetStateAction<PersonalFormData>>;
  uploadFormData: UploadFormData;
  setUploadFormData: React.Dispatch<React.SetStateAction<UploadFormData>>;
  hasError: boolean;
  setHasError: (hasError: boolean) => void;
  steps: string[]; // Array of strings representing the steps
  setSteps: React.Dispatch<React.SetStateAction<string[]>>; // Function to update steps
  currentStep: number; // Number representing the current step
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>; // Function to update the current step
  isUnder18: boolean | null; // Boolean indicating if the user is under 18
  setIsUnder18: React.Dispatch<React.SetStateAction<boolean | null>>; // Function to update isUnder18
  guardianConsentObtained: boolean; // Boolean indicating if guardian consent is obtained
  setGuardianConsentObtained: React.Dispatch<React.SetStateAction<boolean>>; // Function to update guardianConsentObtained
  handleNavigation: (direction: string) => void;
  submitDataToContext: (values: FormValues, currentStep: number) => void;
}

export const StepsContext = createContext<StepsContextType | undefined>(undefined);

export const StepsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [steps, setSteps] = useState([
    "Age confirmation",
    "Guardian's Consent",
    "Terms & Donation Acknowledgment",
    "Upload Artwork",
    "Review",
    "Confirmation",
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const [isUnder18, setIsUnder18] = useState<boolean | null>(null);
  const [guardianConsentObtained, setGuardianConsentObtained] = useState(false);

  const [ hasError, setHasError ] = useState<boolean>(false);

  const [ guardianFormData, setGuardianFormData ] = useState<GuardianFormData>({
    guardianFirstName: "",
    guardianLastName: "",
    guardianEmail: "",
    guardianPhone: "",
    guardianTermsCheck: false,
  });

  const [ personalFormData, setPersonalFormData] = useState<PersonalFormData>({
    // isUnder18: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: { day: 0, month: 0, year: 0},
    termsCheck: false,
  });

  const [uploadFormData, setUploadFormData] = useState<UploadFormData>({
    image: null,
    location: "",
    city: "",
    usingAI: false,
    source: "",
    prompt: "",
    category: [],
    description: "",
  });

  const handleNavigation = (direction: string) => {
    console.log("Handling navigation. " + currentStep);
    let newStep = currentStep;
    if(direction === "next"){
      if(newStep === 1){
        newStep++;
      }
      else if (newStep === 2 && isUnder18 && hasError === false && !guardianConsentObtained) {
        setGuardianConsentObtained(true);
      }
      else{
        newStep++;
      }
    }
    else{
      if(newStep === 1){
        newStep++;
      }
      else if(newStep === 2 && isUnder18 && hasError === false && guardianConsentObtained ) {
        setGuardianConsentObtained(false);
      }
      else{
        newStep--;
      }
    }
    newStep > 0 && newStep <= steps.length && hasError === false && setCurrentStep(newStep);
  };

  const submitDataToContext = (values: FormValues, currentStep: number) => {
    console.log(values);
    console.log(currentStep);
    switch (currentStep) {
    case 2: 
      if ("guardianFirstName" in values && "guardianLastName" in values) {
        console.log("Guardian page.");
        setGuardianFormData(values as GuardianFormData);
      }
      break;
    case 3:
      if ("firstName" in values && "lastName" in values) {
        setPersonalFormData(values as PersonalFormData);
      }
      break;
    case 4:
      if ("image" in values && "location" in values) {
        setUploadFormData(values as UploadFormData);
      }
      break;
  
    default:
      console.log("No matching step found for data submission");
    }
  };
  
  const contextValue = {
    guardianFormData,
    setGuardianFormData,
    hasError,
    setHasError,
    personalFormData,
    setPersonalFormData,
    uploadFormData, 
    setUploadFormData,
    steps,
    setSteps,
    currentStep,
    setCurrentStep,
    isUnder18,
    setIsUnder18,
    guardianConsentObtained,
    setGuardianConsentObtained,
    handleNavigation,
    submitDataToContext
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