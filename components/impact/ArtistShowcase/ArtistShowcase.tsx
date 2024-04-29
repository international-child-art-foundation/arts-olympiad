"use client";
import { useState } from "react";
import { DesktopArtistShowcase } from "./DesktopArtistShowcase";
import { MobileArtistShowcase } from "./MobileArtistShowcase";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { ArtistShowcaseControls } from "./ArtistShowcaseControls";


export const ArtistShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {windowWidth} = useWindowDimensions();
  const isMobile = windowWidth <= 768;


  return (
    <>
      <div className="py-10 text-center text-4xl">Art</div>
      <div className="py-10">
        {isMobile ? <MobileArtistShowcase activeIndex={activeIndex} setActiveIndex={setActiveIndex}/> : <DesktopArtistShowcase activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>}
        <ArtistShowcaseControls activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
      </div>
    </>
  );
};