"use client";
import React from "react";
import "../../src/styles/AccordionNewStyle.css";
import { H2m } from "../common/texts/H2m";
import Turkey from "../../public/contest/turkey.webp";
import AccordionCard from "./AccordionCard";
import Share from  "../../public/contest/share.webp";
import Upload from "../../public/contest/upload.webp";
import Review from "../../public/contest/review.webp";
import Creative from "../../public/contest/creative.webp";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface AccordionNewProps {}



const AccordionNew: React.FC<AccordionNewProps> = () => {
  const {windowWidth} = useWindowDimensions();
  const isMobile = windowWidth <= 768;
  return (
    <div className="self-center my-24 mb-36">
      <article className="md:flex flex-col mr-10 z-30" >
        <H2m className="font-medium font-montserrat text-center my-8 text-3xl md:text-4xl" >How to Enter</H2m>
      </article>
      <div className="accordion ">
        {/* BOX 1 */}
        <div className="box a1">
          <AccordionCard 
            heading="Sign Up"
            description="Sign up for free to create your account."
            number={1}
            textColor="text-main-orange"
            borderColor="border-main-orange"
            image={Turkey}
            isMobile={isMobile}
          />
        </div>

        {/* BOX 2 */}
        <div className="box a2" data-title="2. Get Creative">
          <AccordionCard 
            heading="Get Creative"
            description="Create your painting, drawing, digital art, or AI art."
            number={2}
            textColor="text-main-purple"
            borderColor="border-main-purple"
            image={Creative}
            isMobile={isMobile}
          />
        </div>

        {/* BOX 3 */}
        <div className="box a3">
          <AccordionCard 
            heading="Upload"
            description="Upload your unique masterpiece as a .jpg or .png file (max 4mb)"
            number={3}
            textColor="text-neutral-blue"
            borderColor="border-neutral-blue"
            image={Upload}
            isMobile={isMobile}
          />
        </div>

        {/* BOX 4 */}
        <div className="box a4">
          <AccordionCard 
            heading="Review"
            description="You will need to wait 24 hours for the review process before visiting the Gallery to see your masterpiece."
            number={4}
            textColor="text-neutral-red"
            borderColor="border-neutral-red"
            image={Review}
            isMobile={isMobile}
          />
        </div>

        {/* BOX 5 */}
        <div className="box a5">
          <AccordionCard 
            heading="Share"
            description="Share your masterpiece with family and friends to get their votes. You can vote too!"
            number={5}
            textColor="text-main-green"
            borderColor="border-main-green"
            image={Share}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
};

export default AccordionNew;
