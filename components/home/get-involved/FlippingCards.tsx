"use client";
import React from "react";
import { useState, useEffect } from "react";
import {FlippingCard} from "./FlippingCard";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import monitorUp from "../../../public/svgs/monitor-up.svg";
import vote from "../../../public/svgs/vote.svg";
import heart from "../../../public/svgs/heart-handshake.svg";
import clipboard from "../../../public/svgs/clipboard-edit.svg";
import littleHeart from "../../../public/home/get-involved/heart.svg";
import upload from "../../../public/home/get-involved/upload.svg";
import Image from "next/image";
import {ButtonStyledLink} from "../../common/ui/ButtonStyledLink";
import { Pm } from "../../common/texts/Pm";

export const FlippingCards = () => {

  const { windowWidth, touchScreenPrimary } = useWindowDimensions();
  const [areFlippable, setAreFlippable] = useState(false);

  useEffect(() => {
    // Update the state whenever windowWidth changes
    setAreFlippable(windowWidth >= 768);
  }, [windowWidth]); 

  return (
    <div className="z-10 md:grid grid-cols-2 grid-rows-2 gap-4 mt-6 card-grid" >
      <FlippingCard
        touchScreenPrimary={touchScreenPrimary}
        isFlippable={areFlippable}
        heading1="Register"
        heading2="For free"
        description={
          <div className="w-full">
            <Pm className="md:text-base mt-4 md:mt-12 mb-4 font-light text-sm">
              It's easy to register and completely free!
            </Pm>
            <Pm className="font-light text-sm md:text-base mb-4 md:mb-0">
              You must register to Upload your artwork or to Vote for your favorite artist or artwork.
            </Pm>
          </div>
        }
        icon={clipboard}
        color="#0286C3"
      >
        <ButtonStyledLink
          href={"/auth/register"}
          className="my-1"
          onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
        >
          <Image className="mr-2" src={upload} alt="" width={24} height={24} />
          Register here
        </ButtonStyledLink>
      </FlippingCard>
      <FlippingCard
        touchScreenPrimary={touchScreenPrimary}
        isFlippable={areFlippable}
        heading1="Create & Share"
        heading2="For artists aged 10 to 20"
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
      <FlippingCard
        touchScreenPrimary={touchScreenPrimary}
        isFlippable={areFlippable}
        heading1="View & Vote"
        heading2="For your favorite artwork"
        description={
          <div>
            <Pm className="mt-4 md:mt-12 mb-4 font-light text-sm md:text-base">
              Any 10- to 100-year-old can be a judge.
            </Pm>
            <Pm className="font-light text-sm md:text-base">
              Register first, then search for the artists by name or country, and vote. You can vote only once.
            </Pm>
          </div>
        }
        icon={vote}
        color="#FBB22E"
      />
      <FlippingCard
        touchScreenPrimary={touchScreenPrimary}
        isFlippable={areFlippable}
        heading1="Sponsor or Partner"
        heading2="You can change lives!"
        description={
          <Pm className="mt-4 md:mt-12 font-light text-sm md:text-base">
            Help democratize creativity and optimize children's creative potential with your donation today.
            <ButtonStyledLink className="my-6 leading-5"
              href={"https://www.icaf.org/donate"}
              onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
            >
              <Image className="mr-2" src={littleHeart} alt="" width={24} height={24} />
              Donate now
            </ButtonStyledLink>

            {"Please "} 
            <a href="https://icaf.org/about/contact-us" target="_blank" rel="noopener noreferrer" className="text-blue-600 visited:text-purple-600">
              contact us
            </a>
            {" about partnership prospects."}
          </Pm>
        }
        icon={heart}
        color="#168C39"
      >
      </FlippingCard>
    </div>
  );
};