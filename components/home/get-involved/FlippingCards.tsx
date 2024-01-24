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
          <div>
            <Pm className="mt-4 md:mt-12 mb-1 font-light text-sm">
              It's easy to register and completely free!
            </Pm>
            <Pm className="font-light text-sm mb-4 md:mb-0">
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
        heading2="Artists, ages 10-20: Share your creations!"
        description={
          <div>
            <Pm className="mt-4 md:mt-12 mb-1 font-light text-sm">
              Unleash your creativity! Paint or draw your most favorite Olympic sport. You can use digital art or Artificial Intelligence if you want.
            </Pm>
            <Pm className="font-light text-sm mb-2 md:mb-4">
              Register first to Upload your masterpiece. Then share it with family and friends to get their votes. The artist who gets the most votes wins!
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
            <Pm className="mt-4 md:mt-12 mb-1 font-light text-sm">
            Any 10- to 100-year-old can be a judge.
            </Pm>
            <Pm className="font-light text-sm">
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
        heading1="Sponsor or Donate"
        heading2="Your support changes lives"
        description={
          <Pm className="mt-4 md:mt-12 font-light text-sm">
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