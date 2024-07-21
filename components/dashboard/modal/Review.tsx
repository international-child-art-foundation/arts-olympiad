"use client";
import Image from "next/image";
import React from "react";
import { useStepsContext } from "./StepsContext";
import { FormikValidatedStepsControl } from "./FormikValidatedStepsControl";
import { PersonalFormData, UploadFormData } from "../../../mock/formDataStructs";
import { useState } from "react";
import { useDashboardContext } from "../DashboardContext";

import { Formik , FormikHelpers} from "formik";
import LoadingAnimation from "../../svgs/LoadingAnimation";

interface FormValues extends PersonalFormData, UploadFormData {
  // This will combine both PersonalFormData and UploadFormData into one type
}

export const Review = () => {
  
  const { personalFormData, uploadFormData, handleNavigation } = useStepsContext();
  const { apiUserData } = useDashboardContext();
  const age = 2024 - personalFormData.date.year;
  const categoryString = uploadFormData.category;
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  // const imageUrl = uploadFormData.image ? URL.createObjectURL(uploadFormData.image) : null;
  const imageFile = uploadFormData.image;
  let imageUrl: string | null = null;
  if (imageFile instanceof Blob) {
    imageUrl = URL.createObjectURL(imageFile);
  } else {
    console.error("uploadFormData.image is not a Blob or File.");
  }
  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log("Form handleSubmit");
    setAwaitingResponse(true);
    actions.setSubmitting(false);
    handleNavigation("next");
  };

  const initialValues: FormValues = {
    ...personalFormData,
    ...uploadFormData
  };

  return (
    <>
      <section className="w-full md:w-3/5 m-auto max-w-screen-2xl">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit} 
        >
          {formik => (
            <div className=" grid grid-cols-1 grid-rows-1">
              <div className={`row-start-1 col-start-1${awaitingResponse && "  opacity-60 pointer-events-none"}`}>
                <p className="mt-28 text-3xl mx-auto text-center">Review your submission</p>
                <div className="mt-10 mb-10">
                  {imageUrl && 
                    <Image src={imageUrl} alt="" width={498} height={332} className="h-full w-fit mx-auto rounded-xl" />
                  }
                </div>
                <div className="my-4 text-lg font-semibold">{apiUserData?.f_name}</div>
                
                <div className="text-base font-light mb-2">{age} | {uploadFormData.location}</div>
                <div className="text-base font-light mb-8">Sport category: {categoryString}</div>
                <div className="text-base font-light mb-8 italic">
                  Description:
                  <p className="my-2">
                    {uploadFormData.description}
                  </p>
                </div>
                {uploadFormData.usingAI && 
                  <div>
                    <div className="text-base font-light">* This image was created using AI</div>
                    <div className="text-base font-light">Source: {uploadFormData.source}</div>
                    <div className="text-base font-light mb-14">AI prompt: {uploadFormData.prompt}</div>
                  </div>
                }
                <form onSubmit={(event) => {
                  console.log("Form onsubmit");
                  setAwaitingResponse(true);
                  event.preventDefault();
                  handleSubmit(formik.values, formik);
                }}>               
                  <FormikValidatedStepsControl setAwaitingResponse={setAwaitingResponse} />
                </form>
              </div>
              { awaitingResponse && 
                <div className="w-full">
                  <p className=" text-new-blue">
                    Submitting your artwork. This may take a few minutes...
                  </p>
                </div>
              }
              
              {awaitingResponse && 
                <div className="row-start-1 col-start-1 text-center">
                  <LoadingAnimation scale={100} stroke={2}/>
                </div>
              }
            </div>

          )}
        </Formik>
      </section>
    </>
  );
};