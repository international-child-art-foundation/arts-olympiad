import { LeftIcon } from "../../svgs/LeftIcon";

export const StepsControl = ({handleClick, steps, currentStep, hasError}) => {
 
  return (
    <>
      <div className="justify-around flex max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 m-auto w-3/5 mb-16">
        <button 
          onClick={() => handleClick()}
          className={`group flex bg-neutral-white border-new-blue border rounded text-base font-normal cursor-pointer text-new-blue w-fit ${currentStep === steps.length ? "hidden" : currentStep === 1 ? "ms-auto mr-5" : hasError === true ? "me-auto cursor-not-allowed": "me-auto"}`}
        >
          <span className={`${currentStep === 1 ? "hidden" : "ml-4 my-4"}`}><LeftIcon /></span>
          <div className={`${currentStep === 1 ? "py-4 px-10" : "ml-14 mr-20 my-4"}`}>
            {currentStep === 1 ? "Under 18" : "Go Back"}
          </div>
        </button>

        <button 
          onClick={() => handleClick("next")}
          className={`border rounded text-center text-base font-normal cursor-pointer w-fit py-4 px-10 ${currentStep === steps.length ? "mx-auto bg-neutral-white text-new-blue border-new-blue " : currentStep === 1 ? "me-auto ml-5 bg-neutral-white text-new-blue border-new-blue " : hasError === true ? "ms-auto cursor-not-allowed bg-new-blue text-neutral-white" : "ms-auto bg-new-blue text-neutral-white" }`}
        >
          {currentStep === steps.length ? "Go to gallery" : currentStep === 1 ? "Over 18" : "Agree and continue"}         
        </button>
      </div>
    </>
  );
};