import { LeftIcon } from "../../svgs/LeftIcon";
import { useStepsContext } from "./StepsContext";
import React, { useState } from "react";
import { generatePresignedUrl, uploadImageToS3, postArtworkEntryToDDB } from "@/utils/artwork-upload";
import { useDashboardContext } from "../DashboardContext";
import { ModifiedUploadFormData } from "../../../mock/formDataStructs";

interface FormikValidatedStepsControlProps { // Unnecessary for now
}

// function simulateApiCall() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const isSuccess = Math.random() > 0.5;  // Simulating 50% chance of success
//       if (isSuccess) {
//         resolve("API Call Success");
//       } else {
//         reject("An error occurred. Please contact support.");
//       }
//     }, 2000);  // Simulate 2 seconds delay
//   });
// }

export const FormikValidatedStepsControl: React.FC<FormikValidatedStepsControlProps> = ({  }) => {

  const {
    steps,
    currentStep,
    handleNavigation,
    uploadFormData,
    userAge
  } = useStepsContext();

  const {
    apiUserData,
    setDisplayModal,
  } = useDashboardContext();

  const fileType = uploadFormData.image ? uploadFormData.image.type.split("/")[1] : "unknown";

  const modifiedUploadFormData =  {
    f_name: apiUserData?.f_name,
    age: userAge,
    sport: uploadFormData.category,
    location: uploadFormData.location,
    is_ai_gen: uploadFormData.usingAI,
    model: uploadFormData.source,
    prompt: uploadFormData.prompt,
    description: uploadFormData.description,
    file_type: fileType,
  } as ModifiedUploadFormData;

  const handleButtonClick = async (direction: string) => { 
    if (direction === "back") {
      handleNavigation("back");
    }
    else if (direction === "next" && currentStep === 4) {
      setIsLoading(true);
      if (!uploadFormData.image) {
        setErrorMessage("Artwork not found. Cannot continue with uploading to server.");
        return;
      }
      try {

        const presignedData = await generatePresignedUrl({fileType: fileType});
        if (presignedData.success !== true) {
          setErrorMessage("Our server has encountered an error. Please try again later.");
          throw new Error("Failed to generate presigned URL");
        }
  
        const uploadedImage = await uploadImageToS3(uploadFormData.image, fileType, presignedData);
        if (uploadedImage.success !== true) {
          setErrorMessage("Our server has encountered an error. Please try again later.");
          throw new Error("Failed to upload image to S3");
        }
  
        const postDB = await postArtworkEntryToDDB(modifiedUploadFormData);
        if (postDB.success !== true) {
          setErrorMessage("Our server has encountered an error. Please try again later.");
          throw new Error("Failed to post artwork entry to DynamoDB");
        }
  
        setErrorMessage("");
        handleNavigation("next");
      
      } catch (error) {
        console.error("An error occurred:", error);
      }
      setIsLoading(false);
      // simulateApiCall().then(() => {
      //   setIsLoading(false);
      //   handleNavigation("next");
      // }).catch(error => {
      //   setIsLoading(false);
      //   setErrorMessage(error);
      // });
    } else if (direction === "next" && currentStep === 5) {
      console.log("Was step 5");
      setDisplayModal("");
      window.location.reload();

    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const canSubmitArt = apiUserData?.can_submit_art;

  // useEffect(() => {
  //   if (apiUserData) {
  //     setCanSubmitArt(apiUserData.can_submit_art);
  //   }
  //   console.log("Can submit art status:");
  //   console.log(canSubmitArt);
  //   console.log("All data:");
  //   console.log(apiUserData);
  // }, [apiUserData]);

  return (
    <>
      {canSubmitArt === false ? (
        <p className="font-bold ">You are currently banned from submitting art. If you believe this is a mistake, please <a href="https://icaf.org/about/contact-us" className="text-blue-600">Contact Us</a> and include your contest email address.</p>
      ) : (
        <div className={`pt-8 justify-around mx-auto w-full mb-4 md:flex ${isLoading ? "opacity-50" : ""}`}>
          {currentStep != (steps.length - 1) && 
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
          }
          <button type="submit"
            onClick={() => handleButtonClick("next")}
            className={` mx-auto border rounded text-center text-base font-normal w-full mt-6 md:mt-0 md:w-fit py-4 px-10 cursor-pointer ${currentStep === steps.length ? "bg-neutral-white border-new-blue text-new-blue" : "ms-auto text-neutral-white bg-new-blue ml-5 border-new-blue"}`}
            disabled={isLoading || !canSubmitArt}>
            {isLoading ? "Loading..." : (currentStep === steps.length ? "Go to gallery" : (currentStep === steps.length - 2 ? "Submit my artwork" : "Agree and continue"))}
          </button>
        </div>
      )}
      {errorMessage && 
      <>
        <p className="text-red-500">{errorMessage}</p>
        <p className="text-red-500">If this error persists, please <a className="text-blue-600" href="https://icaf.org/about/contact-us">Contact Us.</a></p>
      </>
      }
    
    </>
  );
};