import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import {AboutHero} from "../../../components/about/AboutHero";
import {Commitment} from "../../../components/about/Commitment";
import {Accordion} from "../../../components/about/Accordion";
import ImageCarousel from "../../../components/about/MobileScroll";
import { PictureGallery } from "../../../components/about/PictureGallery";

export const metadata: Metadata = {
  title: "About the My Favorite Sport Olympic Games Art Contest for Kids",
  description: "About My Favorite Sport art contest. Discover how we&#39;re empowering young artists to express their passion for the Olympic Games and the joy of sports.",
  openGraph: {
    ...sharedOpenGraph,
    title: "About | My Favorite Sport",
  }
};

export default function aboutPage() {
  return (
    <div className="overflow-clip">
      <AboutHero />
      {/* <VisionCards /> */}
      <div className="lg:hidden"><ImageCarousel /></div>
      <div className="xsm:hidden lg:block"><PictureGallery /></div>
      <Accordion />
      <Commitment />
    </div>
  );
}