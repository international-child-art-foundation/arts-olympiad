import React from "react";
import { useEffect } from "react";
import { Steps } from "./Steps";
import { Age } from "./Age";
import { Guardian } from "./Guardian";
import { Under14 } from "./Under14";
import { Over14 } from "./Over14";
import { Upload } from "./Upload";
import { Review } from "./Review";
import { Confirmation } from "./Confirmation";
import { useStepsContext } from "./StepsContext";

export default function Popup(){

  const { steps,
    setSteps,
    currentStep,
    isUnder14,
    guardianConsentObtained,
  } = useStepsContext();

  useEffect(() => {
    const updatedSteps = [
      "Start",
      isUnder14 && !guardianConsentObtained ? "Terms" : "Prepare",
      "Upload",
      "Review",
      "Confirm",
    ];
    setSteps(updatedSteps);
  }, [isUnder14, guardianConsentObtained, setSteps]);
  
  const displayStep = (steps: number) => {
    switch(steps) {
    case 1:
      return <Age />;
    case 2:
      if(isUnder14){
        if (!guardianConsentObtained) {
          return <Guardian />;
        } 
        else {
          return <Under14 />;
        }
      }
      return <Over14 />;
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