import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { SponsorBegin } from "../../../components/sponsor/SponsorBegin";
import { Advantage } from "../../../components/sponsor/Advantage";
import { Carousel } from "../../../components/sponsor/Carousel";
import { Banner } from "../../../components/sponsor/Banner";
import { ContactUs } from "../../../components/sponsor/ContactUs";
import { FiveDrop } from "../../../components/sponsor/FiveDrop";
import orangeBlob from "../../../public/svgs/sponsor-svg/orangeblob.svg";
import greenBlob from "../../../public/svgs/sponsor-svg/greenblob.svg";
import Image from "next/image";


export const metadata: Metadata = {
  title: "Sponsor | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Sponsor | My Favorite Sport",
  }
};

export default function sponsorPage() {
  return (
    <div className="overflow-hidden z-0 mx-auto">
      <SponsorBegin />
      <Advantage /> 
      <Carousel />
      <FiveDrop />
      <Image src={greenBlob} alt="" width={442} height={417} className="absolute z-0 right-0 w-1/2 sm:w-1/3 mb-10" />
      <Image src={orangeBlob} alt="" width={442} height={417} className="absolute z-0 left-0 w-1/2 sm:w-1/3 mb-10" />
      <ContactUs />
      <Banner />
    </div>

  );
}