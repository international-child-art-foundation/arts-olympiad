import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import {AboutHero} from "../../../components/about/AboutHero";
import {VisionCards} from "../../../components/about/VisionCards";

export const metadata: Metadata = {
  title: "About | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "About | My Favorite Sport",
  }
};

export default function aboutPage() {
  return (
    <>
      <AboutHero />
      <VisionCards />
    </>
  );
}