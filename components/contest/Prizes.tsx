import React from "react";
// import { H2m } from "../common/texts/H2m";
// import { Pm } from "../common/texts/Pm";
// import Image from "next/image";
// import KidsBlue from "../../public/contest/kids_blue.webp";
// import PrizesCards from "./PrizesCards";
// import computer from "../../public/contest/computer.png";
// import Vote from "../../public/contest/vote.png";
// import HeartHandshake from "../../public/contest/heart_handshake.png";
// import ClipBoard from "../../public/contest/clipboard.svg";
// import RedStar from "../../public/contest/red_star.png";
// import BlueStar from "../../public/contest/blue_star.png";
// import YellowStar from "../../public/contest/yellow_star.png";
// import GreenStar from "../../public/contest/green_star.png";
// import { formatDate } from "../../mock/dates";

export const Prizes = () => {
  return (
    <>
      <section className="relative z-30 mt-12 m-auto max-w-screen-2xl ">
        {/* <div className="relative flex flex-col w-full px-6 md:grid md:grid-cols-2 lg:px-24 mxl:px-72 mx-auto my-20 z-10">
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
            description={`The winners will be announced on the ${formatDate("winnerAnnounced", "do 'of' MMMM, yyyy")}.`}
            color="border-main-green"
            star={GreenStar}
          />
        </div>
        <Image src={KidsBlue} width={1535} height={1491} className="pointer-events-none select-none xl:scale-105 absolute z-0 object-cover h-[1491px] opacity-80 w-screen xsm:top-40 md:pb-20 md:object-none md:w-full md:-top-36 md:left-0" alt="photo" /> */}
      </section>
    </>
  );
};
