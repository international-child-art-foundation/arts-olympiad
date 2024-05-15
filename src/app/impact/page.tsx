import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { ImpactBegin } from "../../../components/impact/ImpactBegin";
import { Grow } from "../../../components/impact/Grow";
import { Empowering } from "../../../components/impact/Empowering";
import { Carousel } from "../../../components/impact/Carousel";
import { Banner } from "../../../components/Banner";
import { HeartIcon } from "../../../components/svgs/HeartIcon";
import icafLogo from "../../../public/svgs/Icaf-logo.svg";

export const metadata: Metadata = {
  title: "Impact | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Impact | My Favorite Sport",
  }
};

export default function impactPage() {
  return (
    <div className="overflow-hidden z-0 mx-auto">
      <ImpactBegin />
      <Grow />
      <Empowering />
      <Carousel />
      <Banner 
        backgroundColor="light-blue"
        title="Support ICAF's Global Mission" 
        description="Join us in making a positive impact on children's lives worldwide." 
        img={icafLogo}
        buttons={[
          {
            href: "https://icaf.org/donate", 
            text: "Donate",
            icon: <HeartIcon stroke="#EE2F4D" />,
            className: "group bg-new-blue rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white w-36"
          },
          {
            href: "https://www.icaf.org/join-us/volunteers",
            text: "Volunteer",
            icon: <></>,
            className: "ml-6 border-new-blue border rounded text-center text-sm cursor-pointer tracking-wide bg-light-blue text-new-blue w-36"
          }
        ]}
      />
    </div>

  );
}