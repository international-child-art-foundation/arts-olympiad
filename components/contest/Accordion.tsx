"use client";
import Image from "next/image";
import { useState } from "react";
import { AccordionCard } from "./AccordionCard";
import { Face } from "../../public/svgs/contest-svg/Face";
import { Folder } from "../../public/svgs/contest-svg/Folder";
import { Palette } from "../../public/svgs/contest-svg/Palette";
import blueBG from "../../public/svgs/contest-svg/blueBG.svg";
import yellowBG from "../../public/svgs/contest-svg/yellowBG.svg";
import purpleBG from "../../public/svgs/contest-svg/purpleBG.svg";

export const Accordion = () => {

  const [list] = useState([
    {
      background: yellowBG,
      color: "#FFF5AD",
      header: "Age Restrictions:",
      element: "Participants must be between the ages of 14 and 20 to submit their artwork.",
      icon: <Face />
    },
    {
      background: purpleBG,
      color: "#F9E4EE",
      header: "Theme: Art on Sport and the Olympics",
      element: "Create artwork that showcases the beauty and excitement of sports.",
      icon: <Palette />
    },
    {
      background: blueBG,
      color: "#CCEBFF",
      header: "Submission Format: Digital Only",
      element: "You can submit your artwork in digital format only.  Please upload a photo image of your piece through the upload submission form.",
      icon: <Folder />
    }
  ]);

  return (
    <>
      <div className="mt-52 z-30 relative m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <section className="hidden md:block"> 
          <div className="overflow-hidden grid grid-cols-3 gap-6 ">
            {
              list.map((item, key) => (
                <AccordionCard key={key} data={item}/>
              ))
            }
          </div>
        </section>

        <section className="md:hidden"> 
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 md:col-span-1 h-full md:h-fit bg-light-yellow py-6 px-4 relative rounded-2xl">
              <Image src={yellowBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[330px]" alt="photo" />
              <div className="absolute top-2 z-30"> <Face /> </div>
              <div className="w-full">
                <p className="absolute top-[60px] sm:top-[100px] z-30 group w-5/6 text-xl font-semibold">
                  Age Restrictions:
                </p>
                <hr className="absolute top-[170px] sm:top-[170px] z-30 border-new-black border-1 border-t-0.5 w-11/12 sm:w-1/2"></hr>
                <p className="absolute top-[190px] sm:top-[200px] z-30 font-light text-base leading-loose w-11/12 sm:w-1/2">
                  Participants must be between the ages of 14 and 20 to submit their artwork.
                </p>
              </div>
            </div>

            <div className="col-span-3 md:col-span-1 h-fit bg-light-pink py-6 px-4 relative rounded-2xl">
              <Image src={purpleBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[330px]" alt="photo" />
              <div className="absolute top-2 z-30"> <Palette /> </div>
              <div className="w-full">
                <p className="absolute top-[60px] sm:top-[100px] z-30 group w-5/6 text-xl font-semibold">
                  Theme: Art on Sport and the Olympics
                </p>
                <hr className="absolute top-[170px] sm:top-[170px] z-30 border-new-black border-1 border-t-0.5 w-11/12 sm:w-1/2"></hr>
                <p className="absolute top-[190px] sm:top-[200px] z-30 font-light text-base leading-loose w-11/12 sm:w-1/2">
                  Create artwork that showcases the beauty and excitement of sports.
                </p>
              </div>
            </div>


            <div className="col-span-3 md:col-span-1 h-fit bg-light-blue py-6 px-4 relative rounded-2xl">
              <Image src={blueBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[330px]" alt="photo" />
              <div className="absolute top-2 z-30"> <Folder /> </div>
              <div className="w-full">
                <p className="absolute top-[60px] sm:top-[100px] z-30 group w-5/6 text-xl font-semibold">
                  Submission Format: Digital Only
                </p>
                <hr className="absolute top-[170px] sm:top-[170px] z-30 border-new-black border-1 border-t-0.5 w-11/12 sm:w-1/2"></hr>
                <p className="absolute top-[190px] sm:top-[200px] z-30 font-light text-base leading-loose w-11/12 sm:w-1/2">
                  You can submit your artwork in digital format only.  Please upload a photo image of your piece through the upload submission form.
                </p>
              </div>
            </div>
          </div>

        </section>

      </div>
    </>
  );
};