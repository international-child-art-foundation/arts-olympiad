import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
// import Gallery from "./gallery";

export const metadata: Metadata = {
  title: "Gallery | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Gallery | My Favorite Sport",
  }
};

export default function page() {
  return (
    <></>
    // <Gallery />
  );
}