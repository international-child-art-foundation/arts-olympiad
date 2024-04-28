import React from "react";
import { H2m } from "../common/texts/H2m";
import { Pm } from "../common/texts/Pm";
import Image from "next/image";
import KidsBlue from "../../public/contest/kids_blue.png";
import PrizesCards from "./PrizesCards";
import computer from "../../public/contest/computer.png";
import Vote from "../../public/contest/vote.png";
import HeartHandshake from "../../public/contest/heart_handshake.png";
import ClipBoard from "../../public/contest/clipboard.svg";
import RedStar from "../../public/contest/red_star.png";
import BlueStar from "../../public/contest/blue_star.png";
import YellowStar from "../../public/contest/yellow_star.png";
import GreenStar from "../../public/contest/green_star.png";

export const Prizes = () => {
  return (
    <>
      <section className="relative z-30 mt-12 m-auto max-w-screen-2xl ">
        <div className="mt-8 px-8 md:px-12 lg:px-20 xl:px-24 z-30">
          <H2m className="flex-col z-20 font-montserrat font-medium mb-6 xsm:text-center lg:text-left">
          Prizes
          </H2m>
          <Pm className="font-openSans font-light z-30 text-center lg:text-left">Prizes for the gold, silver, and bronze winners will be announced soon.</Pm>
        </div>
        <div className="relative flex flex-col w-full px-6 md:grid md:grid-cols-2 lg:px-24 mxl:px-72 mx-auto my-20 z-10">
          <PrizesCards 
            src={ClipBoard}
            heading="Make it count"
            description="One vote per person."
            color="border-neutral-blue"
            star={BlueStar}
          />
          <PrizesCards 
            src={computer}
            heading="Expert Judges"
            description="Our panel will pick the top three winners from the finalists."
            color="border-neutral-red"
            star={RedStar}
          />
          <PrizesCards 
            src={Vote}
            heading="Public voting"
            description="The top 20 artworks with highest votes will face off in the final round."
            color="border-main-orange"
            star={YellowStar}
          />
          <PrizesCards 
            src={HeartHandshake}
            heading="Announcement Day"
            description="Join us to celebrate the winners on July 1 st at The National Mall across the U.S. Capitol."
            color="border-main-green"
            star={GreenStar}
          />
        </div>
        <Image src={KidsBlue} width={1535} height={1491} className="absolute z-0 object-cover h-[1491px] w-screen xsm:top-40 left-0 md:object-none md:w-full md:-top-36 md:left-0" alt="photo" />
        {/* <div className="col-span-2 z-0 sm:col-span-1">            
            <Image src={KidsBlue} width = {390} height = {271} className="sm:ml-10 lg:ml-0 w-full" alt="photo" />
        </div> */}
      </section>
    </>
  );
};
