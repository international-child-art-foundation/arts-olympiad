import { LeftIcon } from "../../svgs/LeftIcon";
import { useStepsContext } from "./StepsContext";

interface FormikValidatedStepsControlProps { // Unnecessary for now
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
  };

  return (
    <>
      <div className={`pt-8 justify-around m-auto w-full lg:w-4/5 2xl:w-3/5 mb-16 ${currentStep === 1 ? "flex" : "md:flex"}`}>
        <button type="button"
          onClick={() => handleButtonClick("back")}
          className="group flex text-center bg-neutral-white border-new-blue border rounded text-base font-normal text-new-blue w-full md:w-fit ms-auto mr-5 cursor-pointer"
        >
          <span className={`${currentStep === 1 ? "hidden" : "ml-4 my-4"}`}><LeftIcon /></span>
          <div className={`${currentStep === 1 ? "m-auto py-4 px-10" : "mx-auto md:ml-8 md:mr-10 lg:ml-14 lg:mr-20 my-4"}`}>
            {currentStep === 1 ? "Under 18" : "Go Back"}
          </div>
        </button>
        
        <button type="submit"
          className="border rounded text-center text-base font-normal w-full md:w-fit py-4 px-10 ms-auto bg-new-blue cursor-pointer mx-auto me-auto ml-5 border-new-blue cursor-pointer text-neutral-white"
        >
          {currentStep === steps.length ? "Go to gallery" : currentStep === 1 ? "Over 18" : "Agree and continue"}         
        </button>
      </div>
    </>
  );
};