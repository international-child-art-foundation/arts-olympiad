import "../../styles/home.css";
import "../../styles/animated-arrows.css";
import { Metadata } from "next";
import { canonicalPath, sharedOpenGraph } from "../shared-metadata";
import { ContestBegin } from "../../../components/contest/ContestBegin";
import { Timeline } from "../../../components/contest/timeline/Timeline";
import { Participate } from "../../../components/contest/Participate";
import TwoCards from "../../../components/contest/TwoCards";
import AccordionNew from "../../../components/contest/AccordionNew";

export const metadata: Metadata = {
  ...canonicalPath("/contest/"),
  title: "Enter the Contest — Submit Your Art & Win | MyFavoriteSport",
  description: "Ready to compete? Submit your favorite sport artwork, rally votes from friends and family, and win prizes. Open to students ages 8–20 worldwide. It's free to enter!",
  openGraph: {
    ...sharedOpenGraph,
    title: "Enter the Contest — Submit Your Art & Win | MyFavoriteSport",
    description: "Ready to compete? Submit your favorite sport artwork, rally votes from friends and family, and win prizes. Open to students ages 8–20 worldwide. It's free to enter!",
  }
};

export default function contestPage() {
  return (
    <div className=" z-0 mx-auto w-screen">
      <ContestBegin />
      <TwoCards />
      <AccordionNew />
      <Timeline />
      {/* <Prizes /> */}
      <Participate />
    </div>
  );
}