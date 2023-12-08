"use client";
import Image from "next/image";
import { useState } from "react";
import { Up } from "../../public/svgs/contest-svg/Up";
import { Down } from "../../public/svgs/contest-svg/Down";
import { Face } from "../../public/svgs/contest-svg/Face";
import { Folder } from "../../public/svgs/contest-svg/Folder";
import { Palette } from "../../public/svgs/contest-svg/Palette";
import blueBG from "../../public/svgs/contest-svg/blueBG.svg";
import yellowBG from "../../public/svgs/contest-svg/yellowBG.svg";
import purpleBG from "../../public/svgs/contest-svg/purpleBG.svg";

export const Accordion = () => {
  const [isExpanded1, SetIsExpanded1] = useState(false);
  const [isExpanded2, SetIsExpanded2] = useState(false);
  const [isExpanded3, SetIsExpanded3] = useState(false);  

  return (
    <>
      <div className="mt-52 z-30 relative m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <section className="hidden lg:block"> 
          <div className="grid grid-cols-3 gap-6 ">
            <div onClick={() => SetIsExpanded1(!isExpanded1)} className="col-span-1 h-fit bg-light-yellow py-6 px-4 relative rounded-2xl cursor-pointer">
              <Image src={yellowBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[300px]" alt="photo" />
              <div className="absolute top-2 z-30"> <Face /> </div>
              {!isExpanded1 &&
                <button className="grid grid-cols-4 absolute top-[200px] z-30 group w-5/6 text-2xl font-semibold text-neutral-black">
                  <div className="col-span-3">Age Restrictions: </div>
                  <div className="col-span-1"><Down /> </div>
                </button>
              }
              {isExpanded1 &&
              <div className="w-full">
                <button className="grid grid-cols-4 absolute top-[70px] xl:top-[100px] z-30 group w-5/6 text-2xl font-semibold text-neutral-black">
                  <div className="col-span-3">Age Restrictions: </div>
                  <div className="col-span-1"><Up /> </div>
                </button>
                <hr className="absolute top-[170px] xl:top-[200px] z-30 border-new-black border-t-0.5 w-11/12 lg:w-5/6"></hr>
                <p className="absolute top-[180px] xl:top-[210px] z-30 font-light text-base leading-loose w-11/12 lg:w-5/6">
                  Participants must be between the ages of 10 and 20 to submit their artwork.
                </p>
              </div>
              }
            </div>

            <div onClick={() => SetIsExpanded2(!isExpanded2)} className="col-span-1 h-fit bg-light-pink py-6 px-4 relative rounded-2xl cursor-pointer">
              <Image src={purpleBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[300px]" alt="photo" />
              <div className="absolute top-2 z-30"> <Palette /> </div>
              {!isExpanded2 &&
                <button className="absolute top-[200px] z-30 group w-5/6 text-2xl font-semibold text-neutral-black grid grid-cols-4">
                  <div className="col-span-3">Theme: Art on Sport and the Olympics </div>
                  <div className="col-span-1"><Down /> </div>
                </button>
              }
              {isExpanded2 &&
              <div className="w-full">
                <button className="absolute top-[70px] xl:top-[100px] z-30 group w-5/6 text-2xl font-semibold text-neutral-black grid grid-cols-4">
                  <div className="col-span-3">Theme: Art on Sport and the Olympics </div>
                  <div className="col-span-1"><Up /> </div>
                </button>
                <hr className="absolute top-[170px] xl:top-[200px] z-30 border-new-black border-t-0.5 w-11/12 lg:w-5/6"></hr>
                <p className="absolute top-[180px] xl:top-[210px] z-30 font-light text-base leading-loose w-11/12 lg:w-5/6">
                  Create artwork that showcases the beauty and excitement of sports.
                </p>
              </div>
              }
            </div>

            <div onClick={() => SetIsExpanded3(!isExpanded3)} className="col-span-1 h-fit bg-light-blue py-6 px-4 relative rounded-2xl cursor-pointer">
              <Image src={blueBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[300px]" alt="photo" />
              <div className="absolute top-2 z-30"> <Folder /> </div>
              {!isExpanded3 &&
                <button className="absolute top-[200px] z-30 group w-5/6 text-2xl font-semibold text-neutral-black grid grid-cols-4">
                  <div className="col-span-3">Submission Format: Digital Only</div>
                  <div className="col-span-1"><Down /> </div>
                </button>
              }
              {isExpanded3 &&
              <div className="w-full">
                <button className="absolute top-[70px] xl:top-[100px] z-30 group w-5/6 text-2xl font-semibold text-neutral-black grid grid-cols-4">
                  <div className="col-span-3">Submission Format: Digital Only</div>
                  <div className="col-span-1"><Up /> </div>
                </button>
                <hr className="absolute top-[170px] xl:top-[200px] z-30 border-new-black border-t-0.5 w-11/12 lg:w-5/6"></hr>
                <p className="absolute top-[180px] xl:top-[210px] z-30 font-light text-base leading-loose w-11/12 lg:w-5/6">
                  You can submit your artwork in digital format only.  Please upload a photo image of your piece through the upload submission form.
                </p>
              </div>
              }
            </div>
          </div>
        </section>

        <section className="lg:hidden"> 
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 md:col-span-1 h-full md:h-fit bg-light-yellow py-6 px-4 relative rounded-2xl">
              <Image src={yellowBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[300px]" alt="photo" />
              <div className="absolute top-2 z-30"> <Face /> </div>
              <div className="w-full">
                <p className="absolute top-[60px] z-30 group w-full text-xl font-semibold">
                  Age Restrictions:
                </p>
                <hr className="absolute top-[130px] z-30 border-new-black border-t-0.5 w-11/12 md:w-5/6"></hr>
                <p className="absolute top-[130px] z-30 font-light text-base leading-loose w-11/12 md:w-5/6">
                  Participants must be between the ages of 10 and 20 to submit their artwork.
                </p>
              </div>
            </div>

            <div className="col-span-3 md:col-span-1 h-fit bg-light-pink py-6 px-4 relative rounded-2xl">
              <Image src={purpleBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[300px]" alt="photo" />
              <div className="absolute top-2 z-30"> <Palette /> </div>
              <div className="w-full">
                <p className="absolute top-[60px] z-30 group w-full text-xl font-semibold">
                  Theme: Art on Sport and the Olympics
                </p>
                <hr className="absolute top-[130px] z-30 border-new-black border-t-0.5 w-11/12 md:w-5/6"></hr>
                <p className="absolute top-[130px] z-30 font-light text-base leading-loose w-11/12 md:w-5/6">
                  Create artwork that showcases the beauty and excitement of sports.
                </p>
              </div>
            </div>


            <div className="col-span-3 md:col-span-1 h-fit bg-light-blue py-6 px-4 relative rounded-2xl">
              <Image src={blueBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[300px]" alt="photo" />
              <div className="absolute top-2 z-30"> <Folder /> </div>
              <div className="w-full">
                <p className="absolute top-[60px] z-30 group w-full text-xl font-semibold">
                  Submission Format: Digital Only
                </p>
                <hr className="absolute top-[130px] z-30 border-new-black border-t-0.5 w-11/12 md:w-5/6"></hr>
                <p className="absolute top-[130px] z-30 font-light text-base leading-loose w-11/12 md:w-5/6">
                  You can submit your artwork in digital format only.  Please upload a photo image of your piece through the upload submission form.
                </p>
              </div>
            </div>
          </div>

        </section>



        {/* <div tabindex="0" className="group col-span-3 lg:col-span-1 h-fit bg-light-yellow py-6 px-4 relative rounded-2xl cursor-pointer">
            <Image src={yellowBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[300px]" alt="photo" />
            <div className="absolute top-2 z-30"> <Face /> </div>
            <button className="group transition ease-in-out duration-500 group-focus:-translate-y-24 absolute top-[200px] z-30 group w-5/6 text-2xl font-semibold text-neutral-black inline-flex">
              Age Restrictions: 
              <div className="group-focus:hidden"><Down /> </div>
              <div className="hidden group-focus:block"><Up /> </div>
            </button>
            <hr className="hidden group-focus:block absolute top-[200px] border-new-black border-t-0.5 w-11/12 lg:w-5/6"></hr>
            <p className="hidden group-focus:block absolute top-[210px] z-30 font-light text-base leading-loose w-11/12 lg:w-5/6">
              Participants must be between the ages of 10 and 20 to submit their artwork.
            </p>
          </div>

          <div tabindex="0" className="group col-span-3 lg:col-span-1 h-fit bg-light-pink py-6 px-4 relative rounded-2xl cursor-pointer">
            <Image src={purpleBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[300px]" alt="photo" />
            <div className="absolute top-2 z-30"> <Palette /> </div>
              <button className="transition ease-in-out duration-500 group-focus:-translate-y-28 absolute top-[200px] z-30 group w-5/6 text-2xl font-semibold text-neutral-black inline-flex">
                Theme: Art on Sport and the Olympics 
                <div className="group-focus:hidden"><Down /> </div>
                <div className="hidden group-focus:block"><Up /> </div>
              </button>
              <hr className="hidden group-focus:block absolute top-[200px] border-new-black border-t-0.5 w-11/12 lg:w-5/6"></hr>
              <p className="hidden group-focus:block absolute top-[210px] z-30 font-light text-base leading-loose w-11/12 lg:w-5/6">
                Create artwork that showcases the beauty and excitement of sports.
              </p>
          </div>

          <div tabindex="0" className="group col-span-3 lg:col-span-1 h-fit bg-light-blue py-6 px-4 relative rounded-2xl cursor-pointer">
            <Image src={blueBG} width = {390} height = {271} className="relative -top-6 -left-4 z-10 h-[300px]" alt="photo" />
            <div className="absolute top-2 z-30"> <Folder /> </div>
              <button className="transition ease-in-out duration-500 group-focus:-translate-y-28 absolute top-[200px] z-30 group w-5/6 text-2xl font-semibold text-neutral-black inline-flex">
                Submission Format: Digital Only
                <div className="group-focus:hidden"><Down /> </div>
                <div className="hidden group-focus:block"><Up /> </div>
              </button>
              <hr className="hidden group-focus:block absolute top-[200px] border-new-black border-t-0.5 w-11/12 lg:w-5/6"></hr>
              <p className="hidden group-focus:block absolute top-[210px] z-30 font-light text-base leading-loose w-11/12 lg:w-5/6">
                You can submit your artwork in digital format only.  Please upload a photo image of your piece through the upload submission form. 
              </p>
          </div> */}

      </div>
    </>
  );
};
