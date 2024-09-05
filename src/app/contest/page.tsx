import "../../styles/home.css";
import "../../styles/animated-arrows.css";
import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { ContestBegin } from "../../../components/contest/ContestBegin";
import { Timeline } from "../../../components/contest/timeline/Timeline";
import { Participate } from "../../../components/contest/Participate";
import TwoCards from "../../../components/contest/TwoCards";
import AccordionNew from "../../../components/contest/AccordionNew";

export const metadata: Metadata = {
  title: "Contest | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Contest | My Favorite Sport",
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