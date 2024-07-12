import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { GalleryHeader } from "../../../components/gallery/GalleryHeader";
import { Arts } from "../../../components/gallery/Arts";
import { BannerImgOverflow } from "../../../components/BannerImgOverflow";
import multiPic from "../../../public/svgs/gallery-svg/multiPic.webp";
import multiPicSmall from "../../../public/svgs/gallery-svg/multiPicSmall.webp";
import { FilterProvider } from "../../../components/gallery/FilterContext";
import { ContestState } from "../../../mock/contestState";
import { Suspense } from "react";
import dates from "../../../mock/dates";

export const metadata: Metadata = {
  title: "Active Entries | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Active Entries | My Favorite Sport",
  }
};

const contestStartTime = new Date(dates.competitionBegin);
contestStartTime.setHours(12, 0, 0);
const contestEndTime = new Date(dates.competitionEnd);
contestEndTime.setHours(23, 59, 59);

export default function Gallery() {

  const now = new Date();

  // Determine the contest state based on today's date
  let contestState: ContestState = ContestState.Active;
  if (now < contestStartTime) {
    contestState = ContestState.Inactive;
  } else if (now >= contestStartTime && now <= contestEndTime) {
    contestState = ContestState.Active;
  } else if (now > contestEndTime) {
    contestState = ContestState.Complete;
  }

  // Or hardcode the contestState to active for testing
  // contestState = ContestState.Active;

  return (
    <>
      <GalleryHeader contestState={contestState} />
      <FilterProvider>
        <Suspense>
          <Arts contestState={contestState} />
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