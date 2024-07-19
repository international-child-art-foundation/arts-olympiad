import "../styles/home.css";
import "../styles/animated-arrows.css";
import { Metadata } from "next";
import { sharedOpenGraph } from "./shared-metadata";
import {Intro} from "../../components/home/HomeHero";
import {GetInvolvedStatic} from "../../components/home/get-involved/GetInvolvedStatic";
import {HomeYellowTimeline} from "../../components/home/timeline/HomeYellowTimeline";
import {Wisdom} from "../../components/home/wisdom/Wisdom";
import {Guidelines} from "../../components/home/guidelines/Guidelines";
import {Sponsor} from "../../components/home/sponsor/sponsor";

export const metadata: Metadata = {
  title: "Paris Olympic Games for Kids: My Favorite Sport",
  description: "Calling all young artists! Join the &quot;My Favorite Sport&quot; contest inspired by the Paris Olympic Games. Share your artistic vision and win amazing prizes!",
  openGraph: {
    ...sharedOpenGraph,
    title: "Home | My Favorite Sport",
  }
};

export default function Home() {
  return (
    <>
      <Intro />
      <GetInvolvedStatic />
      <Sponsor/>
      <Guidelines />
      <div className="relative overflow-hidden">       
        <HomeYellowTimeline />
      </div>
      <Wisdom />

    </>
  );
}
