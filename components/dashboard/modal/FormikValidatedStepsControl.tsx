import { LeftIcon } from "../../svgs/LeftIcon";
import { useStepsContext } from "./StepsContext";
import React, { useState } from "react";

interface FormikValidatedStepsControlProps { // Unnecessary for now
}

function simulateApiCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;  // Simulating 50% chance of success
      if (isSuccess) {
        resolve("API Call Success");
      } else {
        reject("An error occurred. Please contact support.");
      }
    }, 2000);  // Simulate 2 seconds delay
  });
}

export const FormikValidatedStepsControl: React.FC<FormikValidatedStepsControlProps> = ({  }) => {

  const {
    steps,
    currentStep,
    handleNavigation,
  } = useStepsContext();

  const handleButtonClick = (direction: string) => { 
    // The direction === "next" case is handled by Formik as the form is submitted.
    if (direction === "back") {
      handleNavigation("back");
    }
    else if (direction === "next" && currentStep === 4) {
      setIsLoading(true);
      setErrorMessage("");
      simulateApiCall().then(() => {
        setIsLoading(false);
        handleNavigation("next");
      }).catch(error => {
        setIsLoading(false);
        setErrorMessage(error);
      });
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <div className={`pt-8 justify-around mx-auto w-full mb-16 md:flex ${isLoading ? "opacity-50" : ""}`}>
        <button type="button"
          onClick={() => handleButtonClick("back")}
          className={`${currentStep === steps.length ? "hidden" : "group flex text-center bg-neutral-white border-new-blue border rounded text-base font-normal text-new-blue w-full md:w-fit me-auto mr-5 cursor-pointer"}`}
          disabled={isLoading}
        >
          <span className="ml-4 my-4"><LeftIcon /></span>
          <div className="mx-auto md:ml-8 md:mr-10 lg:ml-14 lg:mr-20 my-4">
            Go Back
          </div>
        </button>
        
        <button type="submit"
          onClick={() => handleButtonClick("next")}
          className={`border rounded text-center text-base font-normal w-full mt-6 md:mt-0 md:w-fit py-4 px-10 cursor-pointer ${currentStep === steps.length ? "bg-neutral-white border-new-blue text-new-blue" : "ms-auto text-neutral-white bg-new-blue ml-5 border-new-blue"}`}
          disabled={isLoading}>
          {isLoading ? "Loading..." : (currentStep === steps.length ? "Go to gallery" : "Agree and continue")}         
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
};