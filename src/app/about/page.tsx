import { Metadata } from "next";
import { canonicalPath, sharedOpenGraph } from "../shared-metadata";
import {AboutHero} from "../../../components/about/AboutHero";
import {Commitment} from "../../../components/about/Commitment";
import {Accordion} from "../../../components/about/Accordion";
import ImageCarousel from "../../../components/about/MobileScroll";
import { PictureGallery } from "../../../components/about/PictureGallery";

export const metadata: Metadata = {
  ...canonicalPath("/about/"),
  title: "About My Favorite Sport — ICAF's Global Arts & Sports Initiative",
  description: "Learn how ICAF's #MyFavoriteSport brings together young artists from around the world through a global art contest celebrating sport, creativity, and excellence.",
  openGraph: {
    ...sharedOpenGraph,
    title: "About My Favorite Sport — ICAF's Global Arts & Sports Initiative",
    description: "Learn how ICAF's #MyFavoriteSport brings together young artists from around the world through a global art contest celebrating sport, creativity, and excellence.",
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