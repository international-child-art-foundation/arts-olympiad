import { Metadata } from "next";
import { canonicalPath, sharedOpenGraph } from "../shared-metadata";
import { getContestState } from "@/utils/contest-state";
import { GalleryClient } from "../../../components/gallery/GalleryClient";

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
  return <GalleryClient initialContestState={getContestState()} />;
}
