import "../../styles/home.css";
import "../../styles/animated-arrows.css";
import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { ContestBegin } from "../../../components/contest/ContestBegin";
import { Timeline } from "../../../components/contest/timeline/Timeline";
import { Participate } from "../../../components/contest/Participate";
import TwoCards from "../../../components/contest/TwoCards";
import {Prizes} from "../../../components/contest/Prizes";
import AccordionNew from "../../../components/contest/AccordionNew";

export const metadata: Metadata = {
  title: "About My Favorite Sport Paris Olympic Games Art Contest",
  description: "Discover the My Favorite Sport art contest&#39;s inspiration, mission, and goals. Learn how we're empowering young artists to celebrate the Paris Olympic Games",
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
      <Prizes />
      <Participate />
    </div>
  );
}