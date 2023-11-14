import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import {AboutHero} from "../../../components/about/AboutHero";
import {VisionCards} from "../../../components/about/VisionCards";
import {Commitment} from "../../../components/about/Commitment";
import {Accordeon} from "../../../components/about/Accordeon";

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
      <Accordeon />
      <Commitment />
    </>
  );
}