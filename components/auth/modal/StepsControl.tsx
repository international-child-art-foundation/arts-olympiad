import { LeftIcon } from "../../svgs/LeftIcon";
import { useStepsContext } from "./StepsContext";

interface StepsControlProps { // Unnecessary for now
}

export const StepsControl: React.FC<StepsControlProps> = ({  }) => {

  const { hasError,
    steps,
    currentStep,
    handleNavigation
  } = useStepsContext();

  const handleButtonClick = (direction: string) => {
    handleNavigation(direction);
  };

  return (
    <>
      <div className="pt-8 justify-around m-auto w-full lg:w-4/5 2xl:w-3/5 mb-16 md:flex">
        <button 
          onClick={() => handleButtonClick("back")}
          className={`group flex text-center bg-neutral-white border-new-blue border rounded text-base font-normal text-new-blue w-full md:w-fit ${hasError === true ? "me-auto cursor-not-allowed" : currentStep === steps.length ? "hidden" : "me-auto"}`}
          disabled={hasError}
        >
          <span className="ml-4 my-4"><LeftIcon /></span>
          <div className="mx-auto md:ml-8 md:mr-10 lg:ml-14 lg:mr-20 my-4">
              Go Back
          </div>
        </button>
        
        <button
          onClick={() => handleButtonClick("next")}
          className={`border rounded text-center text-base font-normal w-full md:w-fit py-4 px-10 ${
            hasError === true ? "ms-auto cursor-not-allowed bg-new-blue text-neutral-white" : currentStep === steps.length ? "cursor-pointer mx-auto bg-neutral-white text-new-blue border-new-blue" : "bg-new-blue text-neutral-white"}`}
          disabled={hasError}
        >
          {currentStep === steps.length ? "Go to gallery" : "Agree and continue"}         
        </button>
      </div>
    </>
  );
};