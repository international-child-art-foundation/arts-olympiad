import { LeftIcon } from "../../svgs/LeftIcon";

export const StepsControl = ({handleClick, steps, currentStep, hasError}) => {
 
  return (
    <>
      <div className={`justify-around max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 m-auto w-full lg:w-4/5 2xl:w-3/5 mb-16 ${currentStep === 1 ? "flex" : "md:flex"}`}>
        <button 
          onClick={() => handleClick()}
          className={`group flex text-center bg-neutral-white border-new-blue border rounded text-base font-normal cursor-pointer text-new-blue w-full md:w-fit ${currentStep === steps.length ? "hidden" : currentStep === 1 ? "ms-auto mr-5" : hasError === true ? "me-auto cursor-not-allowed": "me-auto"}`}
        >
          <span className={`${currentStep === 1 ? "hidden" : "ml-4 my-4"}`}><LeftIcon /></span>
          <div className={`${currentStep === 1 ? "m-auto py-4 px-10" : "mx-auto md:ml-8 md:mr-10 lg:ml-14 lg:mr-20 my-4"}`}>
            {currentStep === 1 ? "Under 18" : "Go Back"}
          </div>
        </button>

        <button 
          onClick={() => handleClick("next")}
          className={`border rounded text-center text-base font-normal cursor-pointer w-full md:w-fit py-4 px-10 ${currentStep === steps.length ? "mx-auto bg-neutral-white text-new-blue border-new-blue " : currentStep === 1 ? "me-auto ml-5 bg-neutral-white text-new-blue border-new-blue " : hasError === true ? "ms-auto cursor-not-allowed bg-new-blue text-neutral-white" : "mt-6 md:mt-0 ms-auto bg-new-blue text-neutral-white" }`}
        >
          {currentStep === steps.length ? "Go to gallery" : currentStep === 1 ? "Over 18" : "Agree and continue"}         
        </button>
      </div>
    </>
  );
};