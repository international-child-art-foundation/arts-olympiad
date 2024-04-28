import React from "react";
import {H2m} from "../common/texts/H2m";
import {AnimatedScribble} from "../common/decorations/AnimatedScribble";
import {Pm} from "../common/texts/Pm";
import Image from "next/image";
import { ArrowCTA } from "../../components/ArrowCTA";
import BlueLine from "../../public/about/BlueLine.png";
import dark_green_blob from "../../public/contest/dark_green_blob.png";

function TwoCards() {
  return (
    <section
      aria-label="Our Commitment."
      className="w-full mt-36 relative flex flex-col px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto overflow-y-visible"
    >
      <article className=" text-center md:flex flex-col mr-10" >
        <H2m className="font-medium font-montserrat text-3xl md:text-4xl" >How does the contest <span className="relative">Work?
          <AnimatedScribble width={180} className="absolute -bottom-6 -right-20 stroke-new-blue" />
        </span>
        </H2m>
      </article>

      <div className="min-w-full flex flex-nowrap flex-col lg:flex-row justify-between my-12">
        <article
          className="
          rounded-xl bg-light-blue lg:w-[49%] min-h-fit overflow-hidden"
        >
          <div className="grid grid-col relative p-6 h-full justify-between">
            <Image src={BlueLine} className="absolute z-0 -top-10 -right-10 select-none pointer-events-none" alt=""></Image>
            <H2m className="z-20 font-regular font-montserrat py-12 text-3xl md:text-4xl" >Who can enter?</H2m>
            <Pm className="z-20 font-sans font-light my-4">
                Creators aged 14 to 20, anywhere in the world.
            </Pm>
            <ArrowCTA text="Register now" href=""/>
          </div>
        </article>

        <article
          className="relative
          mt-12 lg:mt-0
          rounded-xl bg-light-green lg:w-[49%] min-h-fit overflow-hidden justify-between"
        >
          <Image src={dark_green_blob} className="absolute z-0 top-0 right-0 h-full select-none pointer-events-none" alt=""></Image>
          <div className="grid grid-col relative p-6 h-full">
            <H2m className="font-regular font-montserrat py-12 text-3xl md:text-4xl" >What is the theme?</H2m>
            <Pm className="font-sans font-light my-4">
                Your favorite Olympic sport.
            </Pm>
            <div className="">
              <ArrowCTA text="Create my account" href=""></ArrowCTA>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default TwoCards;




