import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Steps } from "./Steps";
import { StepsControl } from "./StepsControl";
import { Age } from "./Age";
import { Guardian } from "./Guardian";
import { Under18 } from "./Under18";
import { Over18 } from "./Over18";
import { Upload } from "./Upload";
import { Review } from "./Review";
import { Confirmation } from "./Confirmation";
import { useStepsContext } from "./StepsContext";

export default function Popup(props){
  const [currentStep, setCurrStep] = useState(1);
  const [isUnder18, setIsUnder18] = useState(true);

  // const [userData, setUserData] = useState("");
  // const [hasError, setHasError] = useState(false);

  const { personalFormData, setPersonalFormData, hasError } = useStepsContext();
  const [guardianConsentObtained, setGuardianConsentObtained] = useState(false);
  const [steps, setSteps] = useState([
    "Age confirmation",
    "Guardian's Consent",
    "Terms & Donation Acknowledgment",
    "Upload Artwork",
    "Review",
    "Confirmation",
  ]);
  const updateSteps = () => {
    const updatedSteps = [
      "Age confirmation",
      isUnder18 && !guardianConsentObtained ? "Guardian's Consent" : "Terms & Donation Acknowledgment",
      "Upload Artwork",
      "Review",
      "Confirmation",
    ];
    setSteps(updatedSteps);
  };

  useEffect(() => {
    updateSteps();
  }, [isUnder18, guardianConsentObtained]);
  
  const displayStep = (steps) => {
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

  const handleClick = (direction) => {
    let newStep = currentStep;
    if(direction === "next"){
      if(newStep === 1){
        setIsUnder18(false);
        // setPersonalFormData("");
        setPersonalFormData(Object.assign(personalFormData, {"isUnder18" : false}));
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
        setIsUnder18(true);
        // setPersonalFormData("");
        setPersonalFormData(Object.assign(personalFormData, {"isUnder18" : true}));
        newStep++;
      }
      else if(newStep === 2 && isUnder18 && hasError === false && guardianConsentObtained ) {
        setGuardianConsentObtained(false);
      }
      else{
        newStep--;
      }
    }
    newStep > 0 && newStep <= steps.length && hasError === false && setCurrStep(newStep);
  };

  return (props.trigger) ? (
    <div className="rounded-2xl m-auto w-11/12 md:w-3/4 h-fit bg-white flex items-center justify-center z-50">
      <button className="absolute right-10% top-[350px] md:right-15% md:top-[390px]" onClick={() => props.setTrigger(false)}>      
        <Image src="/svgs/close.svg" alt="Close Modal System" width={24} height={24}/>
        { props.children }
      </button>
      <div className="mt-40 mb-40 grid gap-y-2 w-full">
        <Steps 
          steps = {steps}
          currentStep = {currentStep}
        />
        {/* <StepsProvider > */}
        {displayStep(currentStep)}
        {/* </StepsProvider> */}
        
        {/* {console.log(userData)} */}

        {/* {displayStep(currentStep)} */}
        <StepsControl 
          handleClick = {handleClick}
          steps = {steps}
          currentStep = {currentStep}
          hasError = {hasError}
        />
      </div>
    </div>
  ) : "";
}