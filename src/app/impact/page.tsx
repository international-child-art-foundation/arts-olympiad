import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { ImpactBegin } from "../../../components/impact/ImpactBegin";
import { Banner } from "../../../components/Banner";
import { HeartIcon } from "../../../components/svgs/HeartIcon";
import icafLogo from "../../../public/svgs/Icaf-logo.svg";
import { Wisdom } from "../../../components/impact/wisdom/Wisdom";
import SlideShow from "../../../components/impact/SlideShow";
import Kids from "../../../public/impact/kids.png";
import Image from "next/image";
import { FaqDropdowns } from "../../../components/impact/FaqDropdowns";

export const metadata: Metadata = {
  title: "Impact | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Impact | My Favorite Sport",
  }
};

export default function impactPage() {
  return (
    <div className="overflow-hidden z-0">
      <ImpactBegin />
      <Wisdom />
      <SlideShow />
      {/* <Grow /> */}
      {/* <Empowering /> */}
      <FaqDropdowns />
      <Image src={Kids} alt="kids" className="w-full mt-24 select-none pointer-events-none"></Image>
      <Banner 
        backgroundColor="light-blue"
        title="Interested in participating?" 
        description="Join us in making a positive impact on children's lives worldwide." 
        img={icafLogo}
        buttons={[
          {
            href: "https://icaf.org/donate", 
            text: "Learn more about ICAF",
            icon: <HeartIcon stroke="#EE2F4D" />,
            className: "group bg-new-blue rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white"
          },
          {
            href: "https://www.icaf.org/join-us/volunteers",
            text: "Learn more about the contest",
            icon: <></>,
            className: "ml-6 border-new-blue border rounded text-center text-sm cursor-pointer tracking-wide bg-light-blue text-new-blue"
          }
        ]}
      />
    </div>

  );
}