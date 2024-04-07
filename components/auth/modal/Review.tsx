// import { useContext } from "react";
// import { StepsContext } from "./StepsContext";
import Image from "next/image";
import React from "react";
import { useStepsContext } from "./StepsContext";

export const Review = () => {
  const { personalFormData, uploadFormData } = useStepsContext();
  const age = 2024 - personalFormData.year;
  const categoryString = Array.isArray(uploadFormData.category) ? uploadFormData.category.join(" | ") : "";
  const imageUrl = uploadFormData.image ? URL.createObjectURL(uploadFormData.image) : null;
  return (
    <>
      <section className="w-3/5 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="mt-28 mb-10">
          <Image src={imageUrl} alt="" width={498} height={332} className="w-full h-fit rounded-xl" />
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
      </section>
    </>
  );
};