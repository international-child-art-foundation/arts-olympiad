import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import { Steps } from "./Steps";
import { Age } from "./Age";
import { Guardian } from "./Guardian";
import { Under18 } from "./Under18";
import { Over18 } from "./Over18";
import { Upload } from "./Upload";
import { Review } from "./Review";
import { Confirmation } from "./Confirmation";
import { useStepsContext } from "./StepsContext";

interface PopupProps {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  children?: React.ReactNode;
}

export default function Popup({ trigger, setTrigger, children }: PopupProps){

  const { steps,
    setSteps,
    currentStep,
    isUnder18,
    guardianConsentObtained,
  } = useStepsContext();

  useEffect(() => {
    const updatedSteps = [
      "Age confirmation",
      isUnder18 && !guardianConsentObtained ? "Guardian's Consent" : "Terms & Donation Acknowledgment",
      "Upload Artwork",
      "Review",
      "Confirmation",
    ];
    setSteps(updatedSteps);
  }, [isUnder18, guardianConsentObtained, setSteps]);
  
  const displayStep = (steps: number) => {
    switch(steps) {
    case 1:
      return <Age />;
    case 2:
      if(isUnder18){
        if (!guardianConsentObtained) {
          return <Guardian />;
        } 
        else {
          return <Under18 />;
        }
      }
      return <Over18 />;
    case 3:
      return <Upload />;
    case 4:
      return <Review />;
    case 5:
      return <Confirmation />;
    default:
    }
  };


  return (trigger) ? (
    <div className="absolute overflow-hidden rounded-2xl m-auto w-11/12 md:w-3/4 h-fit bg-white z-50 left-1/2 transform -translate-x-1/2">
      <button className="absolute top-0 right-0 text-5xl font-light p-4 cursor-pointer active:scale-90" onClick={() => setTrigger(false)}>
        <Image src="/svgs/close.svg" alt="Close Modal System" width={24} height={24}/>
        { children }
      </button>
      <div className="my-20 grid gap-y-2 w-full">
        <Steps 
          steps = {steps}
          currentStep = {currentStep}
        />
        {displayStep(currentStep)}
      </div>
    </div>
  ) : "";
}