import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { PastEntriesHeader } from "../../../components/gallery/past_entries/PastEntriesHeader";
import { PastEntriesArts } from "../../../components/gallery/past_entries/PastEntriesArts";
import { BannerImgOverflow } from "../../../components/BannerImgOverflow";
import multiPic from "../../../public/svgs/gallery-svg/multiPic.webp";
import { PastEntriesFilterProvider } from "../../../components/gallery/past_entries/PastEntriesFilterContext";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Active Entries | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Active Entries | My Favorite Sport",
  }
};

export default function PastEntries() {

  return (
    <>
      <PastEntriesHeader />
      <PastEntriesFilterProvider>
        <Suspense>
          <PastEntriesArts />
        </Suspense>
      </PastEntriesFilterProvider>
      <BannerImgOverflow 
        backgroundColor="light-blue"
        title="Submit Your Artwork Today!" 
        description="Join the Art Competition and Showcase Your Talent in Anticipation of the 2024 Olympics." 
        img={[multiPic]}
        alt={["Artwork of Olympic sports", "Artwork of Olympic sports"]}
        buttons={[
          {
            href: "#",
            localLink: true,
            text: "Submit",
            icon: <></>,
            className: "w-full bg-new-blue rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white"
          },
          {
            href: "/contest",
            localLink: true,
            text: "Learn More",
            icon: <></>,
            className: "w-full ml-4 border-new-blue border rounded text-center text-sm cursor-pointer tracking-wide bg-light-blue text-new-blue w-36"
          }
        ]}
      />
    </>
    
  );
}