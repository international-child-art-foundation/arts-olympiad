"use client";

import { useState } from "react";
import { Steps } from "./Steps";
import { StepsControl } from "./StepsControl";
import { Age } from "./Age";
import { Guardian } from "./Guardian";
// import { Under18 } from "./Under18";
// import { Over18 } from "./Over18";
import { Upload } from "./Upload";
import { Review } from "./Review";
import { Confirmation } from "./Confirmation";
import Image from "next/image";

export default function Modal() {
  const [currentStep, setCurrStep] = useState(1);

  const steps = [
    "Age confirmation",
    "Guardian's Consent",
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
      // return <Over18 />;
      // return <Under18 />;

      // if(){
      //   how to return <div><Guardian />and<Under18 /> </div>;
      // }
      // else{
      //   return <Over18 /> and showing different progress bar
      // }
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
      newStep++;
    }
    else{
      newStep--;
      // if(newStep === 1){
      //   newStep++;
      // }
      // else{
      //   newStep--;
      // }
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