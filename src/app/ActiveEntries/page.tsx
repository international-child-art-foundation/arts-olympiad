import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { ActiveBegin } from "../../../components/gallery/ActiveEntries/ActiveBegin";
import Arts from "../../../components/gallery/ActiveEntries/Arts";
import { Banner } from "../../../components/Banner";
import underline from "../../../public/svgs/underline.svg";

export const metadata: Metadata = {
  title: "Active Entries | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Active Entries | My Favorite Sport",
  }
};

export default function ActiveEntries() {
  return (
    <div className="overflow-hidden z-0 mx-auto w-screen">
      <ActiveBegin />
      
      <Arts />

      <div className="bg-light-blue w-screen h-[150px] xsm:h-[200px] md:h-[0px] mt-24 sm:mt-40 md:mt-24 lg:mt-40 2xl:mt-72"></div>
      <Banner 
        backgroundColor="light-blue"
        title="Submit Your Artwork Today!" 
        description="Join the Art Competition and Showcase Your Talent in Anticipation of the 2024 Olympics." 
        img={underline}
        buttons={[
          {
            href: "#",
            text: "Submit",
            icon: <></>,
            className: "w-full bg-new-blue rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white"
          },
          {
            href: "#",
            text: "Learn More",
            icon: <></>,
            className: "w-full ml-4 border-new-blue border rounded text-center text-sm cursor-pointer tracking-wide bg-light-blue text-new-blue w-36"
          }
        ]}
      />
    </div>
  );
}