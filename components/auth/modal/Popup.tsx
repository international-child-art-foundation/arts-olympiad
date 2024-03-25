import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Steps } from "./Steps";
import { StepsControl } from "./StepsControl";
import { StepsContext } from "./StepsContext";
import { Age } from "./Age";
import { Guardian } from "./Guardian";
import { Under18 } from "./Under18";
import { Over18 } from "./Over18";
import { Upload } from "./Upload";
import { Review } from "./Review";
import { Confirmation } from "./Confirmation";

export default function Popup(props){
  const [currentStep, setCurrStep] = useState(1);
  const [isUnder18, setIsUnder18] = useState(true);

  const [userData, setUserData] = useState("");
  const [hasError, setHasError] = useState(false);

  const steps = [
    "Age confirmation",
    "Guardian's Consent",
    "Terms & Donation Acknowledgment",
    "Upload Artwork",
    "Review",
    "Confirmation"
  ];
  
  const displayStep = (steps) => {
    switch(steps) {
    case 1:
      return <Age />;
    case 2:
      return <Guardian />; 
    case 3:
      if(isUnder18){
        return <Under18 />;
      }
      return <Over18 />;
    case 4:
      return <Upload />;
    case 5:
      return <Review />;
    case 6:
      return <Confirmation />;
    default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    if(direction === "next"){
      if(newStep === 1){
        setIsUnder18(false);
        setUserData("");
        setUserData(Object.assign(userData, {"isUnder18" : false}));
        newStep = 3;
      }
      else{
        newStep++;
      }
    }
    else{
      if(newStep === 1){
        setIsUnder18(true);
        setUserData("");
        setUserData(Object.assign(userData, {"isUnder18" : true}));
        newStep++;
      }
      else if(newStep === 3){
        if(isUnder18){
          newStep = 2;
        }
        else{
          newStep = 1;
        }
      }
      else{
        newStep--;
      }
    }
    newStep > 0 && newStep <= steps.length && hasError === false && setCurrStep(newStep);
  };

  return (props.trigger) ? (
    <div className="rounded-2xl m-auto w-3/4 h-fit bg-white flex items-center justify-center z-50">
      <button className="absolute right-15% top-[390px]" onClick={() => props.setTrigger(false)}>      
        <Image src="/svgs/close.svg" alt="Close Modal System" width={24} height={24}/>
        { props.children }
      </button>
      <div className="mt-40 mb-40 grid gap-y-2 w-full">
        <Steps 
          steps = {steps}
          currentStep = {currentStep}
        />
        <StepsContext.Provider value={{
          userData,
          setUserData,
          hasError,
          setHasError
        }}>
          {displayStep(currentStep)}
        </StepsContext.Provider>
        
        {console.log(userData)}

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