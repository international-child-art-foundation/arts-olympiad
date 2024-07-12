import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { PastEntriesHeader } from "../../../components/gallery/past_entries/PastEntriesHeader";
import { PastEntriesArts } from "../../../components/gallery/past_entries/PastEntriesArts";
import { BannerImgOverflow } from "../../../components/BannerImgOverflow";
import multiPic from "../../../public/svgs/gallery-svg/multiPic.webp";
import multiPicSmall from "../../../public/svgs/gallery-svg/multiPicSmall.webp";
import { FilterProvider } from "../../../components/gallery/FilterContext";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Olympic Games for Kids: Gallery of Past My Favorite Sport",
  description: "Explore our gallery of past entries from the My Favorite Sport contest. See how kids from around the world have captured their passion for Olympic sports",
  openGraph: {
    ...sharedOpenGraph,
    title: "Active Entries | My Favorite Sport",
  }
};

export default function PastEntries() {

  return (
    <>
      <PastEntriesHeader />
      <FilterProvider>
        <Suspense>
          <PastEntriesArts />
        </Suspense>
      </FilterProvider>
      <BannerImgOverflow 
        backgroundColor="light-blue"
        title="Submit Your Artwork Today!" 
        description="Join the Art Competition and Showcase Your Talent in Anticipation of the 2024 Olympics." 
        img={[multiPic, multiPicSmall]}
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