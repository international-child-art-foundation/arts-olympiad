import React from "react";
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

export default function Popup(){

  const { steps,
    setSteps,
    currentStep,
    isUnder18,
    guardianConsentObtained,
  } = useStepsContext();

  useEffect(() => {
    const updatedSteps = [
      "Start",
      isUnder18 && !guardianConsentObtained ? "Terms" : "Prepare",
      "Upload",
      "Review",
      "Confirm",
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


  return (
    <div className="my-10">
      <Steps 
        steps = {steps}
        currentStep = {currentStep}
      />
      {displayStep(currentStep)}
    </div>
  );
}