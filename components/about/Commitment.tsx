import {H2m} from "../common/texts/H2m";
import {AnimatedScribble} from "../common/decorations/AnimatedScribble";
import {Pm} from "../common/texts/Pm";
import React from "next/image";
import {ButtonStyledLink} from "../common/ui/ButtonStyledLink";
import {LazyImage} from "../common/images/LazyImage";

export const Commitment = () => {
  return (
    <section
      aria-label="Our Commitment."
      className="w-full mt-36 mb-36 relative flex flex-col px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto"
    >
      <article className=" text-center md:flex flex-col mr-10" >
        <Pm className="font-bold">ICAF</Pm>
        <H2m className="font-medium text-3xl md:text-4xl" >Our <span className="relative text-dark-blue">Commitment
          <AnimatedScribble width={180} className="absolute -bottom-6 -right-20" />
        </span>
        </H2m>
      </article>

      <div className="min-w-full flex flex-nowrap flex-col lg:flex-row justify-between mt-12">

        <article
          className="
          flex flex-col md:flex-row lg:flex-col
          px-8 pt-8 rounded-xl bg-light-blue lg:w-[49%] min-h-fit"
        >
          <div>
            <H2m className="font-medium text-3xl md:text-4xl" ><span className="relative text-dark-blue">Accessible</span> to all</H2m>
            <Pm className="font-sans font-light my-4">
            All of ICAF’s programs, festivals, and exhibitions are offered free of charge and are made possible through the support of empathic donors and creative sponsors.
            </Pm>
            <ButtonStyledLink className="max-w-fit px-6 my-8" href="/sponsorship">
            Learn more about becoming a sponsor
            </ButtonStyledLink>
          </div>
          <div className=" md:min-w-[40%] mx-auto md:ml-12 lg:ml-auto">
            <LazyImage className="" imageUrl="/about/raise-hands.png" alt="raising hand holding little hearts." />
          </div>
        </article>

        <article
          className="
          flex flex-row mt-12 lg:mt-0
          px-8 pt-8 rounded-xl bg-light-blue lg:w-[49%] min-h-fit"
        >
          <div>
            <H2m className="font-medium text-3xl md:text-4xl" >Unforgettable <span className="relative text-dark-blue">Journey</span></H2m>
            <Pm className="font-sans font-light my-4">
              Explore our website to learn more about #MyFavoriteSport and the other initiatives that make ICAF a leading global arts organization dedicated to nurturing the creativity and
              well-being of children worldwide.
            </Pm>
            <ButtonStyledLink className="max-w-fit px-6 my-8" href="https://www.icaf.org/">
              Go to ICAF
            </ButtonStyledLink>
          </div>
          <div className="md:min-w-[40%] ml-6 md:ml-12 -mr-8 -mt-8">
            <LazyImage className="object-cover rounded-l-none rounded-r-xl" imageUrl="washington-monument-side.webp" alt="raising hand holding little hearts." />
          </div>
        </article>

      </div>

    </section>
  );
};
