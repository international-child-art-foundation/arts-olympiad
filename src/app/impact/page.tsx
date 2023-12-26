import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { ImpactBegin } from "../../../components/impact/ImpactBegin";
import { Grow } from "../../../components/impact/Grow";
import { Banner } from "../../../components/sponsor/Banner";
import { Empowering } from "../../../components/impact/Empowering";


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
      <Banner 
        backgroundColor="light-blue"
        title="Support ICAF's Global Mission" 
        description="Join us in making a positive impact on children's lives worldwide." 
        buttons={[
          {
            href: "#", 
            text: "Donate",
            className: "bg-new-blue rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white w-36"
          },
          {
            href: "https://www.icaf.org/join-us/volunteers",
            text: "Volunteer",
            className: "ml-6 border-new-blue border rounded text-center text-sm cursor-pointer tracking-wide bg-light-blue text-new-blue w-36"
          }
        ]}
      />
    </div>

  );
}