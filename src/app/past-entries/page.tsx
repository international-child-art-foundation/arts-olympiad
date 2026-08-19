import { Metadata } from "next";
import { canonicalPath, sharedOpenGraph } from "../shared-metadata";
import { PastEntriesHeader } from "../../../components/gallery/past_entries/PastEntriesHeader";
import { PastEntriesArts } from "../../../components/gallery/past_entries/PastEntriesArts";
import { BannerImgOverflow } from "../../../components/BannerImgOverflow";
import multiPic from "../../../public/svgs/gallery-svg/multiPic.webp";
import { PastEntriesFilterProvider } from "../../../components/gallery/past_entries/PastEntriesFilterContext";
import { Suspense } from "react";

export const metadata: Metadata = {
  ...canonicalPath("/past-entries/"),
  title: "Past Entries — Browse Inspiring Sport Artwork | MyFavoriteSport",
  description:
    "Explore a catalog of previous #MyFavoriteSport contest submissions. Browse artwork from young artists worldwide and get inspired for your own entry.",
  openGraph: {
    ...sharedOpenGraph,
    title: "Past Entries — Browse Inspiring Sport Artwork | MyFavoriteSport",
    description:
      "Explore a catalog of previous #MyFavoriteSport contest submissions. Browse artwork from young artists worldwide and get inspired for your own entry.",
  },
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
        description="Join the Art Competition and Showcase Your Talent in Anticipation of the 2028 Olympics."
        img={[multiPic]}
        alt={["Artwork of Olympic sports", "Artwork of Olympic sports"]}
        buttons={[
          {
            href: "#",
            localLink: true,
            text: "Submit",
            icon: <></>,
            className:
              "w-full bg-new-blue rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white",
          },
          {
            href: "/contest",
            localLink: true,
            text: "Learn More",
            icon: <></>,
            className:
              "w-full ml-4 border-new-blue border rounded text-center text-sm cursor-pointer tracking-wide bg-light-blue text-new-blue w-36",
          },
        ]}
      />
    </>
  );
}
