import "../../styles/home.css";
import "../../styles/animated-arrows.css";
import Image from "next/image";
import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { ContestBegin } from "../../../components/contest/ContestBegin";
import { Accordion } from "../../../components/contest/Accordion";
import { Process } from "../../../components/contest/Process";
import { Timeline } from "../../../components/home/timeline/Timeline";
import { Voting } from "../../../components/contest/Voting";
import { FiveDrop } from "../../../components/contest/FiveDrop";
import { Banner } from "../../../components/sponsor/Banner";
import { ContactUs } from "../../../components/sponsor/ContactUs";
import orangeBlob from "../../../public/svgs/sponsor-svg/orangeblob.svg";
import pinkBlob from "../../../public/svgs/contest-svg/pinkblobContact.svg";
import littleYellowBlob from "../../../public/svgs/blobs/little-yellow-blob.svg";
import tinyYellowBlob from "../../../public/svgs/blobs/tiny-yellow-blob.svg";
import tinyPinkBlob from "../../../public/svgs/blobs/tiny-vertical-pink-blob.svg";
import bigPinkBlob from "../../../public/svgs/blobs/vertical-big-pink-blob.svg";
import bigBlueBlob from "../../../public/svgs/blobs/blue-leg-down-blob.svg";
import greenBlob from "../../../public/svgs/contest-svg/greenblob.svg";
import lightYellowBlob from "../../../public/svgs/contest-svg/lightYellowblob.svg";


export const metadata: Metadata = {
  title: "Contest | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Contest | My Favorite Sport",
  }
};

export default function contestPage() {
  return (
    <div className="overflow-hidden z-0 mx-auto w-screen">
      <ContestBegin />
      <Accordion />
      <Process />
      <div className="relative">       
        <Image src={littleYellowBlob} alt="" className="-z-10 absolute top-96 -left-12 2xl:hidden" />
        <Image src={tinyYellowBlob} alt="" className="hidden md:block z-20 absolute top-[368px] left-24 2xl:hidden" />
        <Image src={tinyPinkBlob} alt="" className="hidden md:block -z-10 absolute top-[672px] right-44 2xl:top-[750px]" />
        <Image src={bigPinkBlob} alt="" className="-z-10 w-[300px] md:w-[500px] absolute top-[576px] -right-12 md:-right-44 2xl:top-72" />
        <Image src={bigBlueBlob} alt="" className="-z-10 w-[400px] md:w-[700px] absolute bottom-96 md:bottom-24 -left-12 md:-left-44 2xl:hidden" />
        <Image src={greenBlob} alt="" className="-z-10 hidden w-[400px] md:w-[700px] absolute bottom-96 md:bottom-24 -left-12 2xl:block" />
        <Image src={lightYellowBlob} alt="" className="-z-10 hidden absolute top-36 -left-12 2xl:block" />
        <Timeline />
      </div>
      <Voting />
      <FiveDrop />
      <Image src={pinkBlob} alt="" width={442} height={417} className="absolute z-0 right-0 w-1/2 sm:w-1/3 mb-10" />
      <Image src={orangeBlob} alt="" width={442} height={417} className="absolute z-0 left-0 w-1/2 sm:w-1/3 mb-10" />
      <ContactUs />
      <Banner />
    </div>
  );
}