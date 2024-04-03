"use client";
import React from "next/image";
import {AccordionCard} from "./AccordionCard";
import {useEffect, useState} from "react";
import {Pm} from "../common/texts/Pm";
import {artworks} from "../../mock/artworks";
import {LazyImage} from "../common/images/LazyImage";
import {AboutArtworkCard} from "./AboutArtworkCard";
import {H2m} from "../common/texts/H2m";
import Image from "next/image";
import useWindowDimensions from "@/hooks/useWindowDimensions";

export const Accordion = () => {

  const {windowWidth} = useWindowDimensions();
  const [cardOpen, setCardOpen] = useState(1);
  const [minimalContentWidth, setMinimalContentWidth] = useState<number | undefined>(0);
  const [contentWidthWasSet, setContentWidthWasSet] = useState(false);

  // effect to reset minimalContentWidth when window dimensions change
  useEffect(() => {
    setContentWidthWasSet(false);
  }, [windowWidth]);

  return (
    <section
      aria-label="Our Commitment."
      className="w-full mt-36 relative flex flex-col px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto"
    >
      <article className="md:flex flex-col mr-10" >
        <H2m className="font-medium text-3xl md:text-4xl" >#MyFavoriteSport: A  <span className="relative text-dark-blue">Creative <span className="text-black">Leap</span>
          <Image src="/svgs/colorful-scribble.svg" alt="" width={250} height={20} className="absolute -bottom-6 right-0" />
        </span>
        </H2m>
        <Pm className="my-8">Discover #MyFavoriteSport's celebration of youthful imagination
          and physical vitality, nurturing the next generation of creative athletes.</Pm>
      </article>
    
      <div
        role="region"
        aria-live="polite"
        className="flex flex-col lg:flex-row lg:h-accordion-narrow lg:max-h-accordion-narrow-max xl:h-accordion-wide xl:max-h-accordion-wide-max overflow-hidden"
      >
        <AccordionCard
          minimalContentWidth={minimalContentWidth}
          setMinimalContentWidth={setMinimalContentWidth}
          contentWidthWasSet={contentWidthWasSet}
          setContentWidthWasSet={setContentWidthWasSet}
          className="rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
          isOpen={cardOpen === 1}
          setIsOpen={(i) => setCardOpen(i)}
          color="#E4F9EA"
          number={1}
          header="Why #MyFavoriteSport?"
          paragraph={
            <>
              <Pm className="lg:mt-12">We understand the profound impact that artistic expression can have on a child's development.</Pm>
              <Pm className="my-12">#MyFavoriteSport encourages students to embrace what we call the "Artist-Athlete Ideal" — the idea that a creative mind and a healthy body go hand in hand (mens sana in corpore sano).</Pm>
              <Pm className="mb-12">By linking imagination with embodiment, this program solidifies a student's self-image as an artist-athlete, celebrating both their artistic talents and physical well-being.</Pm>
            </>
          }
          images={
            <div className="flex flex-col sm:flex-row mx-auto xl:mx-0 cursor-default">
              <AboutArtworkCard artwork={artworks["12"]}/>
              <div className="my-4 md:my-0 lg:my-4 xl:my-0 mx-4 cursor-default" />
              <AboutArtworkCard artwork={artworks["13"]}/>
            </div>
          }
        />
        <AccordionCard
          minimalContentWidth={minimalContentWidth}
          setMinimalContentWidth={setMinimalContentWidth}
          contentWidthWasSet={contentWidthWasSet}
          setContentWidthWasSet={setContentWidthWasSet}
          isOpen={cardOpen === 2}
          setIsOpen={(i) => setCardOpen(i)}
          color="#FFF5AD"
          number={2}
          header="Inspired by the Vision of Baron de Coubertin"
          paragraph={
            <>
              <Pm className="mb-6 lg:my-5">Baron de Coubertin, the visionary behind the modern Olympics, believed in showcasing humanity's physical prowess and artistic talents. #MyFavoriteSport art contest revives this vision, inviting young artists to express themselves through their favorite sport, celebrating the intersection of art and athleticism.</Pm>
              <Pm className="mb-6 lg:my-5 text-blue-600 visited:text-purple-600"><a target="_blank" rel="noopener noreferrer" href="https://www.smithsonianmag.com/arts-culture/when-the-olympics-gave-out-medals-for-art-6878965/">"When the Olympics Gave Out Medals for Art," Smithsonian Magazine</a></Pm>
            </>
          }
          images={
            <div className="flex flex-col md:flex-row mx-auto lg:mx-0">
              <LazyImage className="min-w-[230px] min-h-[300px] max-w-[230px] max-h-[300px] cursor-default" imageUrl="/about/olympic-monument.webp" alt="olympic-monument." />
              <div className="my-4 md:my-0 mx-4" />
              <LazyImage className="min-w-[230px] min-h-[300px] max-w-[230px] max-h-[300px] cursor-default" imageUrl="/about/baron-de-couberin.jfif" alt="baron-de-couberin." />
            </div>
          }
        />
        <AccordionCard
          minimalContentWidth={minimalContentWidth}
          setMinimalContentWidth={setMinimalContentWidth}
          contentWidthWasSet={contentWidthWasSet}
          setContentWidthWasSet={setContentWidthWasSet}
          isOpen={cardOpen === 3}
          setIsOpen={(i) => setCardOpen(i)}
          color="#CCEBFF"
          number={3}
          header="Recognized by the U.S. Olympic Committee"
          paragraph={<Pm className="mb-12 lg:my-12">The U.S. Olympic and Paralympic Committee has granted ICAF an exclusive license to use the 'Arts Olympiad' mark for #MyFavoriteSport."</Pm>}
          images={
            <LazyImage className="max-w-[500px] max-h-[315px] cursor-default" imageUrl="/svgs/icao-logo.svg" alt="Internation Child Art Olympiad logo." />
          }
        />
        <AccordionCard
          minimalContentWidth={minimalContentWidth}
          setMinimalContentWidth={setMinimalContentWidth}
          contentWidthWasSet={contentWidthWasSet}
          setContentWidthWasSet={setContentWidthWasSet}
          className="rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none"
          isOpen={cardOpen === 4}
          setIsOpen={(i) => setCardOpen(i)}
          color="#F9E4EE"
          number={4}
          header="More about ICAF"
          paragraph={<Pm className="mb-12 lg:my-12">ICAF is more than just #MyFavoriteSport. We are proud to be ranked among the 25 Top Children’s Charities in the United States. Beyond #MyFavoriteSport, ICAF also organizes Healing Art Programs to revive faith in the natural world for child victims of natural disasters and Peace through Art Programs to restore trust in humanity for children in conflict zones.</Pm>}
          images={
            <LazyImage className="max-w-[500px] max-h-[315px] cursor-default" imageUrl="/svgs/Icaf-logo.svg" alt="Internation Child Art Olympiad logo." />
          }
        />
      </div>

    </section>
  );
};