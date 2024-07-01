"use client";
import React from "react";
import {FlippingCardStatic} from "./FlippingCardStatic";
import monitorUp from "../../../public/svgs/monitor-up.svg";
import vote from "../../../public/svgs/vote.svg";
import heart from "../../../public/svgs/heart-handshake.svg";
import clipboard from "../../../public/svgs/clipboard-edit.svg";
// import littleHeart from "../../../public/home/get-involved/heart.svg";
import Image from "next/image";
import {ButtonStyledLink} from "../../common/ui/ButtonStyledLink";
import { Pm } from "../../common/texts/Pm";
import highlightSwimmer from "../../../public/home/Highlight_Swimmer.svg";

export const FlippingCardsStatic = () => {


  return (
    <div className="relative z-10 md:grid grid-cols-2 grid-rows-1 gap-4 card-grid m-auto max-w-[400px] md:max-w-[720px] lg:max-w-[800px]" >
      <div className="absolute -top-16 -left-32 md:-top-44 md:-left-32 lg:-top-28 lg:-left-40 hidden xsm:block">
        <Image src={highlightSwimmer} alt="" className="" />
      </div>

      <FlippingCardStatic
        heading1="View & Vote"
        heading2="All sports fans and art lovers"
        description={
          <div className="w-full">
            <Pm className=" mt-4 md:mt-12 mb-4 font-light text-base">
              Search your favorite artwork by sports category or country.
            </Pm>
            {/* <Pm className="font-light text-base mb-4 md:mb-0">
              You must register to upload your artwork or to vote for your favorite artist or artwork.
            </Pm> */}
          </div>
        }
        icon={clipboard}
        color="#0286C3"
      >
        <div className="flex-grow"></div> {/* Spacer element */}
        <ButtonStyledLink
          href={"/auth/register"}
          className="my-1 w-full"
          onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => { e.stopPropagation(); }}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.stopPropagation(); }}
        >
          Register here
        </ButtonStyledLink>
      </FlippingCardStatic>
      <FlippingCardStatic
        heading1="Create & Share"
        heading2="Artists, aged 14 to 20"
        description={
          <div>
            <Pm className="mt-4 md:mt-12 mb-4 font-light text-sm md:text-base">
              Unleash your creativity by producing art on your favorite sport in any medium for upload.
            </Pm>
            {/* <Pm className="font-light text-sm md:text-base mb-2 md:mb-4">
              Register, Upload, and Share to get votes.
            </Pm> */}
          </div>
        }
        icon={monitorUp}
        color="#EE2F4D"
      >
        <div className="flex-grow"></div> {/* Spacer element */}
        <ButtonStyledLink
          href={"/auth/register"}
          className="my-1 w-full"
          onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => { e.stopPropagation(); }}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.stopPropagation(); }}
        >
          Register here
        </ButtonStyledLink>
      </FlippingCardStatic>
      <FlippingCardStatic
        heading1="Partner"
        description={
          <div className="w-full">
            <Pm className=" mt-4 md:mt-12 mb-4 font-light text-base">
              Join us to reassure young people that their chaotic and divided world has hope.
            </Pm>
            {/* <Pm className="font-light text-base mb-4 md:mb-0">
              You must register to upload your artwork or to vote for your favorite artist or artwork.
            </Pm> */}
          </div>
        }
        icon={vote}
        color="#FBB22E"
      >
        <div className="flex-grow"></div> {/* Spacer element */}
        <ButtonStyledLink
          href={"https://icaf.org/about/contact-us"}
          className="my-1 w-full"
          onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => { e.stopPropagation(); }}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.stopPropagation(); }}
        >
          Partner with ICAF
        </ButtonStyledLink>
      </FlippingCardStatic>
      <FlippingCardStatic
        heading1="Sponsor"
        description={
          <div className="w-full">
            <Pm className=" mt-4 md:mt-12 mb-4 font-light text-base">
              Boost your global emotional branding by winning over young hearts and minds.
            </Pm>
            {/* <Pm className="font-light text-base mb-4 md:mb-0">
              You must register to upload your artwork or to vote for your favorite artist or artwork.
            </Pm> */}
          </div>
        }
        icon={heart}
        color="#168C39"
      >
        <div className="flex-grow"></div> {/* Spacer element */}
        <ButtonStyledLink
          href={"https://icaf.org/about/contact-us"}
          className="my-1 w-full"
          onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => { e.stopPropagation(); }}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.stopPropagation(); }}
        >
          Sponsor
        </ButtonStyledLink>
      </FlippingCardStatic>
    </div>
  );
};