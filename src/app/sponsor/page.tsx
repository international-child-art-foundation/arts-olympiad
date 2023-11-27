import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { SponsorBegin } from "../../../components/sponsor/SponsorBegin";
import { Advantage } from "../../../components/sponsor/Advantage";
import { Carousel } from "../../../components/sponsor/Carousel";
import { Banner } from "../../../components/sponsor/Banner";
import { FiveDrop } from "../../../components/sponsor/FiveDrop";


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
      <FiveDrop/>
      <Banner />
    </div>
  );
}