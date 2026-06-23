import "../styles/home.css";
import "../styles/animated-arrows.css";
import { Metadata } from "next";
import { canonicalPath, sharedOpenGraph } from "./shared-metadata";
import { Intro } from "../../components/home/HomeHero";
// import { GetInvolvedStatic } from "../../components/home/get-involved/GetInvolvedStatic";
// import { HomeYellowTimeline } from "../../components/home/timeline/HomeYellowTimeline";
import { Wisdom } from "../../components/home/wisdom/Wisdom";
import { Guidelines } from "../../components/home/guidelines/Guidelines";
// import {Sponsor} from "../../components/home/sponsor/sponsor";

export const metadata: Metadata = {
  ...canonicalPath("/"),
  title: "#MyFavoriteSport — Global Art Contest for Kids Ages 8–20",
  description: "Schoolchildren ages 8–20 worldwide are invited to create art inspired by their favorite sport, upload it, and rally votes to win the gold. Enter free today!",
  openGraph: {
    ...sharedOpenGraph,
    title: "#MyFavoriteSport — Global Art Contest for Kids Ages 8–20",
    description: "Schoolchildren ages 8–20 worldwide are invited to create art inspired by their favorite sport, upload it, and rally votes to win the gold. Enter free today!",
  },
};

export default function Home() {
  return (
    <>
      <Intro />
      {/* <GetInvolvedStatic /> */}
      {/* <Sponsor/> */}
      <Guidelines />
      {/* <div className="relative overflow-hidden">
        <HomeYellowTimeline />
      </div> */}
      <Wisdom />
    </>
  );
}
