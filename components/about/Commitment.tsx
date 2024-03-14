import {H2m} from "../common/texts/H2m";
import {AnimatedScribble} from "../common/decorations/AnimatedScribble";
import {Pm} from "../common/texts/Pm";
import React from "next/image";
import Image from "next/image";
import { ArrowCTA } from "../../components/ArrowCTA";
import footer from "../../public/about/footer.png";
import BlueDot from "../../public/about/BlueDot.png";
import BlueLine from "../../public/about/BlueLine.png";

export const Commitment = () => {
  return (
    <section
      aria-label="Our Commitment."
      className="w-full mt-36 relative flex flex-col px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto overflow-y-visible"
    >
      <article className=" text-center md:flex flex-col mr-10" >
        <H2m className="font-medium font-montserrat text-3xl md:text-4xl" >Branding with <span className="relative">Purpose
          <AnimatedScribble width={180} className="absolute -bottom-6 -right-20 stroke-new-blue" />
        </span>
        </H2m>
      </article>

      <div className="min-w-full flex flex-nowrap flex-col lg:flex-row justify-between mt-12">
        <article
          className="
          flex flex-col md:flex-row lg:flex-col
          px-8 pt-8 rounded-xl bg-light-blue lg:w-[49%] min-h-fit overflow-hidden"
        >
          <div className="relative">
            <Image src={BlueLine} className="absolute z-0 -top-10 -right-10 select-none pointer-events-none" alt=""></Image>
            <H2m className="z-20 font-regular font-montserrat text-3xl md:text-4xl" >Sponsors</H2m>
            <Pm className="z-20 font-sans font-light my-4">
              Some of the world’s leading companies have worked with ICAF to win over young hearts and minds.
            </Pm>
            {/* <ButtonStyledLink className="max-w-fit px-6 my-8" href="/sponsor">
            Learn more about becoming a sponsor
            </ButtonStyledLink> */}
            <ArrowCTA text="See 16-page pdf" href=""/>
          </div>
          {/* <div className=" md:min-w-[40%] mx-auto md:ml-12 lg:ml-auto">
            
          </div> */}
        </article>

        <article
          className="relative
          flex flex-row mt-12 lg:mt-0
          px-8 pt-8 rounded-xl bg-light-blue lg:w-[49%] min-h-fit overflow-hidden"
        >
          <Image src={BlueDot} className="absolute z-0 top-0 right-0 h-full select-none pointer-events-none" alt=""></Image>
          <div>
            <H2m className="font-regular font-montserrat text-3xl md:text-4xl" >Impact</H2m>
            <Pm className="font-sans font-light my-4">
              Learn more about ICAF’s impact nationally and globally.
            </Pm>
            <ArrowCTA text="Take me there now" href=""/>
          </div>
        </article>
      </div>
      <Image src={footer} className="select-none pointer-events-none my-10" alt=""></Image>
      {/* <Image
        src="/svgs/blobs/ligthbrown-outlined-blob.svg" alt="" width={645} height={903}
        className="absolute -z-10 -top-52 -left-52"
      />

      <Image
        src="/svgs/blobs/yellow-populated-arrow-blob.svg" alt="" width={600} height={600}
        className="absolute -z-10 -bottom-96 -right-40"
      /> */}

    </section>
  );
};
