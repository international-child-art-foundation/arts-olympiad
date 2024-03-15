"use client";

import { useState } from "react";
import { Steps } from "./Steps";
import { StepsControl } from "./StepsControl";
import { Age } from "./Age";
import { Guardian } from "./Guardian";
import { Under18 } from "./Under18";
import { Over18 } from "./Over18";
import { Upload } from "./Upload";
import { Review } from "./Review";
import { Confirmation } from "./Confirmation";
import Image from "next/image";

export default function Modal() {
  const [currentStep, setCurrStep] = useState(1);
  const [isUnder18, setIsUnder18] = useState(true);

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
        newStep = 3;
      }
      else{
        newStep++;
      }
    }
    else{
      if(newStep === 1){
        setIsUnder18(true);
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
    newStep > 0 && newStep <= steps.length && setCurrStep(newStep);
  };

  return (
    <>
      <Image src="/svgs/close.svg" alt="Close Modal System" width={24} height={24} className="absolute w-6 h-6 right-10 top-60"/>

      <div className="mt-40 mb-40 grid gap-y-2">
        <Steps 
          steps = {steps}
          currentStep = {currentStep}
        />

        {displayStep(currentStep)}

        <StepsControl 
          handleClick = {handleClick}
          steps = {steps}
          currentStep = {currentStep}
        />
      </div>

    </>
  );
}