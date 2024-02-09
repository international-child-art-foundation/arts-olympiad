"use client";
import React from "react";
import {FlippingCardStatic} from "./FlippingCardStatic";
import monitorUp from "../../../public/svgs/monitor-up.svg";
import vote from "../../../public/svgs/vote.svg";
import heart from "../../../public/svgs/heart-handshake.svg";
import clipboard from "../../../public/svgs/clipboard-edit.svg";
import littleHeart from "../../../public/home/get-involved/heart.svg";
import Image from "next/image";
import {ButtonStyledLink} from "../../common/ui/ButtonStyledLink";
import { Pm } from "../../common/texts/Pm";
import highlightSwimmer from "../../../public/home/Highlight_Swimmer.svg";

export const FlippingCardsStatic = () => {


  return (
    <div className="relative z-10 md:grid grid-cols-2 grid-rows-1 gap-4 card-grid m-auto max-w-[400px] md:max-w-[720px] lg:max-w-[800px]" >
      <div className="absolute -top-40 -left-24 md:-top-44 md:-left-12 lg:-top-28 lg:-left-40 hidden xsm:block">
        <Image src={highlightSwimmer} alt="" className="" />
      </div>

      <FlippingCardStatic
        heading1="Register"
        description={
          <div className="w-full">
            <Pm className=" mt-4 md:mt-12 mb-4 font-light text-base">
              It's easy to register and completely free!
            </Pm>
            <Pm className="font-light text-base mb-4 md:mb-0">
              You must register to upload your artwork or to vote for your favorite artist or artwork.
            </Pm>
          </div>
        }
        icon={clipboard}
        color="#0286C3"
      >
        <div className="flex-grow"></div> {/* Spacer element */}
        <ButtonStyledLink
          href={"/auth/register"}
          className="my-1 w-full"
          onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
        >
          Register here
        </ButtonStyledLink>
      </FlippingCardStatic>
      <FlippingCardStatic
        heading1="Create & Share"
        heading2="Artists, ages 10-20: Share your creations!"
        description={
          <div>
            <Pm className="mt-4 md:mt-12 mb-4 font-light text-sm md:text-base">
              Unleash your creativity by painting or drawing your favorite Olympic sports. We accept digital or AI art.
            </Pm>
            <Pm className="font-light text-sm md:text-base mb-2 md:mb-4">
              Register, Upload, and Share to get votes.
            </Pm>
          </div>
        }
        icon={monitorUp}
        color="#EE2F4D"
      />
      <FlippingCardStatic
        heading1="View & Vote"
        heading2="For your favorite artwork"
        description={
          <div>
            <Pm className="mt-4 md:mt-12 mb-4 font-light text-sm md:text-base">
              Any 10 to 100-year-old can be a judge.
            </Pm>
            <Pm className="font-light text-sm md:text-base">
              Register first, then search for the artists by name or country, and vote. You can vote only once.
            </Pm>
          </div>
        }
        icon={vote}
        color="#FBB22E"
      />
      <FlippingCardStatic
        heading1="Sponsor or Partner"
        heading2="You can change lives!"
        description={
          <div className="flex flex-col justify-between">
            <Pm className="mt-6 font-light text-sm md:text-base">
              Help democratize creativity and optimize children's creative potential with your donation today.&nbsp;
            </Pm>

            <Pm className="mb-6 font-light text-sm md:text-base">
              {"Please "} 
              <a href="https://icaf.org/about/contact-us" target="_blank" rel="noopener noreferrer" className="underline ">
                contact us
              </a>
              {" about partnership prospects."}
            </Pm>

            <ButtonStyledLink className="leading-5"
              href={"https://www.icaf.org/donate"}
              onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
            >
              <Image className="mr-2" src={littleHeart} alt="" width={24} height={24} />
              Donate now
            </ButtonStyledLink>
          </div>
        }
        icon={heart}
        color="#168C39"
      >
      </FlippingCardStatic>
    </div>
  );
};