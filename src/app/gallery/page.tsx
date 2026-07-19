import { Metadata } from "next";
import { canonicalPath, sharedOpenGraph } from "../shared-metadata";
import { GalleryHeader } from "../../../components/gallery/GalleryHeader";
import { Arts } from "../../../components/gallery/Arts";
import { BannerImgOverflow } from "../../../components/BannerImgOverflow";
import multiPic from "../../../public/svgs/gallery-svg/multiPic.webp";
import { FilterProvider } from "../../../components/gallery/FilterContext";
import { ContestState } from "../../../mock/contestState";
import { Suspense } from "react";
import { getContestState } from "@/utils/contest-state";

export const metadata: Metadata = {
  ...canonicalPath("/gallery/"),
  title: "Gallery — Vote for Your Favorite Sport Artworks | MyFavoriteSport",
  description:
    "Browse active contest entries from young artists around the world and vote for your favorites. New submissions added daily — discover creativity in action.",
  openGraph: {
    ...sharedOpenGraph,
    title: "Gallery — Vote for Your Favorite Sport Artworks | MyFavoriteSport",
    description:
      "Browse active contest entries from young artists around the world and vote for your favorites. New submissions added daily — discover creativity in action.",
  },
};

export default function Gallery() {
  const contestState: ContestState = getContestState();

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
        title={
          contestState === ContestState.Active
            ? "Submit Your Artwork Today!"
            : contestState === ContestState.Inactive
              ? "Start creating your masterpiece!"
              : "The contest has ended"
        }
        description={
          contestState === ContestState.Active
            ? "Join the Art Competition and Showcase Your Talent in Anticipation of the 2026 World Cup."
            : contestState === ContestState.Inactive
              ? "Our competition will begin very soon. Now is the best time to get creative."
              : "Thank you to everyone for participating!"
        }
        img={[multiPic]}
        alt={["Artwork of Olympic sports", "Artwork of Olympic sports"]}
        buttons={
          contestState === ContestState.Active ||
          contestState === ContestState.Inactive
            ? [
                {
                  href: "/dashboard",
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
              ]
            : []
        }
      />
    </>
  );
}
