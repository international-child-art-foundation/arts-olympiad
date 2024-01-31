import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { SponsorBegin } from "../../../components/sponsor/SponsorBegin";
import { Advantage } from "../../../components/sponsor/Advantage";
import { Carousel } from "../../../components/sponsor/Carousel";
import { Banner } from "../../../components/Banner";
import { ContactUs } from "../../../components/sponsor/ContactUs";
import { FiveDrop } from "../../../components/sponsor/FiveDrop";
import orangeBlob from "../../../public/svgs/sponsor-svg/orangeblob.svg";
import greenBlob from "../../../public/svgs/sponsor-svg/greenblob.svg";
import Image from "next/image";
import icafLogo from "../../../public/svgs/Icaf-logo.svg";

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
      <Image src={greenBlob} alt="" width={442} height={417} className="absolute z-0 right-0 w-1/2 sm:w-1/3 mb-10 max-w-xl" />
      <Image src={orangeBlob} alt="" width={442} height={417} className="absolute z-0 left-0 w-1/2 sm:w-1/3 mb-10 max-w-3xl" />
      <ContactUs />
      <Banner 
        backgroundColor="light-blue"
        title="Want to get involved?" 
        description="All of ICAF's programs, festivals, and exhibitions are offered free of charge and are made possible through the support of empathic donors and creative sponsors." 
        img={icafLogo}
        buttons={[
          {
            href: "#",
            text: "Learn more about becoming a sponsor",
            icon: <></>,
            className: "bg-new-blue rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white"
          }
        ]}
      />
    </div>

  );
}