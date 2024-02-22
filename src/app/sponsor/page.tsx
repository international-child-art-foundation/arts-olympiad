import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { SponsorBegin } from "../../../components/sponsor/SponsorBegin";
import { ContactUs } from "../../../components/sponsor/ContactUs";
import {Benefits} from "../../../components/sponsor/Benefits";
import { VisionCards } from "../../../components/sponsor/VisionCards";
import { PastSponsor } from "../../../components/sponsor/PastSponsor";

export const metadata: Metadata = {
  title: "Sponsor | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Sponsor | My Favorite Sport",
  }
};

export default function sponsorPage() {
  return (
    <div className=" z-0 ">

      <SponsorBegin />
      <VisionCards />
      <Benefits />
      <PastSponsor />
      <ContactUs />
      {/* <FiveDrop /> */}
      {/* <Image src={greenBlob} alt="" width={442} height={417} className="absolute z-0 right-0 w-1/2 sm:w-1/3 mb-10 max-w-xl" /> */}
      {/* <Image src={orangeBlob} alt="" width={442} height={417} className="absolute z-0 left-0 w-1/2 sm:w-1/3 mb-10 max-w-3xl" /> */}
      {/* <Banner 
        backgroundColor="light-blue"
        title="Want to get involved?" 
        description="All of ICAF's programs, festivals, and exhibitions are offered free of charge and are made possible through the support of empathic donors and creative sponsors." 
        buttons={[
          {
            href: "#",
            text: "Learn more about becoming a sponsor",
            icon: <></>,
            className: "bg-new-blue rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white"
          }
        ]}
      /> */}
    </div>

  );
}