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
      <div className="pt-8 justify-around mx-auto w-full mb-16 md:flex">
        <button type="button"
          onClick={() => handleButtonClick("back")}
          className={`${currentStep === steps.length ? "hidden" : "group flex text-center bg-neutral-white border-new-blue border rounded text-base font-normal text-new-blue w-full md:w-fit me-auto mr-5 cursor-pointer"}`}
        >
          <span className="ml-4 my-4"><LeftIcon /></span>
          <div className="mx-auto md:ml-8 md:mr-10 lg:ml-14 lg:mr-20 my-4">
            Go Back
          </div>
        </button>
        
        <button type="submit"
          className={`border rounded text-center text-base font-normal w-full md:w-fit py-4 px-10  cursor-pointer  ${currentStep === steps.length ? "bg-neutral-white border-new-blue text-new-blue" : "ms-auto text-neutral-white bg-new-blue ml-5 border-new-blue"}`}
        >
          {currentStep === steps.length ? "Go to gallery" :  "Agree and continue"}         
        </button>
      </div>
    </>
  );
};