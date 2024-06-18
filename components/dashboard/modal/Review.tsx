import Image from "next/image";
import React from "react";
import { useStepsContext } from "./StepsContext";
import { FormikValidatedStepsControl } from "./FormikValidatedStepsControl";

import { Formik , FormikHelpers} from "formik";


interface PersonalFormData {
  // Define the types for personalFormData properties
  firstName: string;
  lastName: string;
  // ... other properties as they are defined
}

interface UploadFormData {
  image: File | null;
  category: string[]; // Assuming it's an array of strings
  description: string;
  usingAI: boolean;
  source: string;
  prompt: string;
  // ... other properties as they are defined
}

interface FormValues extends PersonalFormData, UploadFormData {
  // This will combine both PersonalFormData and UploadFormData into one type
}

export const Review = () => {
  
  const { personalFormData, uploadFormData, handleNavigation } = useStepsContext();
  const age = 2024 - personalFormData.date.year;
  const categoryString = Array.isArray(uploadFormData.category) ? uploadFormData.category.join(" | ") : "";
  // const imageUrl = uploadFormData.image ? URL.createObjectURL(uploadFormData.image) : null;
  const imageFile = uploadFormData.image;
  let imageUrl: string | null = null;
  if (imageFile instanceof Blob) {
    imageUrl = URL.createObjectURL(imageFile);
  } else {
    console.error("uploadFormData.image is not a Blob or File.");
  }
  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
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
            <>
              <div className="mt-28 mb-10">
                {imageUrl && 
                  <Image src={imageUrl} alt="" width={498} height={332} className="w-full h-fit rounded-xl" />
                }
              </div>
              <div className="my-10 text-3xl font-semibold">{personalFormData.firstName} {personalFormData.lastName}</div>
              
              <div className="text-base font-light mb-2">{age} | {uploadFormData.location}</div>
              <div className="text-base font-light mb-8">Sports categories | {categoryString}</div>
              <div className="text-base font-light mb-8 italic">
                Further information about art (Artist Description)
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
                event.preventDefault();
                handleSubmit(formik.values, formik);
              }}>               
                <FormikValidatedStepsControl />
              </form>
            </>
          )}
        </Formik>
      </section>
    </>
  );
};