import React, {useState, useEffect, useRef } from "react";
import "../../../src/styles/home.css";

interface Step {
  description: string;
  selected: boolean;
}

interface StepsProps {
  steps: string[]; 
  currentStep: number;
}

export const Steps = ({ steps, currentStep }: StepsProps) => {
  const [newStep, setNewStep] = useState<Step[]>([]);
  const stepRef = useRef<Step[]>([]);

  const updateStep = (stepNumber: number, steps: Step[]) => {
    const newSteps = [ ...steps];
    let count = 0;
    while (count < newSteps.length){
      if (count === stepNumber){
        newSteps[count] = {
          ...newSteps[count],
          selected: true,
        };
        count++;
      }
      else if (count < stepNumber){
        newSteps[count] = {
          ...newSteps[count],
          selected: true,
        };
        count++;
      }
      else{
        newSteps[count] = {
          ...newSteps[count],
          selected: false,
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          selected: index === 0 ? true : false,
        }
      )
    );
    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div key={index} className={index !== newStep.length - 1 ? "flex items-center w-full" : "flex items-center"}> 
        <div className="relative flex flex-col items-center"> 
          <div className={`rounded-full h-5 w-5 flex items-center justify-center border  ${
            step.selected ? "bg-new-blue border-neutral-black" : "bg-neutral-white border-[#E6E6E6]"
          }`}></div>
          <div className="absolute top-0 text-center mt-8 w-28 md:w-32 text-neutral-black text-base font-light">
            {step.description}
          </div>
        </div>
        <div className="flex-auto border-t-1 border-neutral-black"></div>
      </div>
    );
  });


  return (
    <>
      <section className="m-auto ml-2 max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full justify-between items-center hidden sm:flex">
        {displaySteps}
      </section>


      <section className="no-scrollbar ml-5 m-auto max-w-[800px] overflow-x-auto overscroll-x-none sm:hidden">
        <div className="w-[600px] h-[190px] flex object-scale-down">{displaySteps}</div>
      </section>

    </>
  );
};