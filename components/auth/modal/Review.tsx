import { useContext } from "react";
import { StepsContext } from "./StepsContext";
import Image from "next/image";
import React from "react";

export const Review = () => {
  const { userData } = useContext(StepsContext);
  const age = 2024 - userData.year;

  return (
    <>
      <section className="w-3/5 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="mt-28 mb-10">
          <Image src={userData.image} alt="" width={498} height={332} className="w-full h-fit" />
        </div>
        <div className="my-10 text-3xl font-semibold">{userData.firstName} {userData.lastName}</div>

        <div className="text-base font-light mb-2">{age} | {userData.location}</div>
        <div className="text-base font-light mb-8">Sports categories | {userData.category}</div>
        <div className="text-base font-light mb-8 italic">
          Further information about art (Artist Description)
          <p className="my-2">
            {userData.description}
          </p>
        </div>
        {userData.usingAI && 
          <div>
            <div className="text-base font-light">* This image was created using AI</div>
            <div className="text-base font-light">Source: {userData.source}</div>
            <div className="text-base font-light mb-14">AI prompt: {userData.prompt}</div>
          </div>
        }
      </section>
    </>
  );
};