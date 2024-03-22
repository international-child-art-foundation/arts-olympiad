"use client";
import React from "next/image";
import {AccordionCard} from "./AccordionCard";
import {useEffect, useState} from "react";
import {Pm} from "../common/texts/Pm";
import {LazyImage} from "../common/images/LazyImage";
import {H2m} from "../common/texts/H2m";
import Image from "next/image";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import PinkBlob from "../../public/about/PinkBlob.png";
import { ArrowCTA } from "../../components/ArrowCTA";
import Torch from "../../public/about/torch.png";
import LightingIdea from "../../public/about/LightingIdea.png";
import OlympicRings from "../../public/about/olympicRings.png";

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
      className="w-full relative my-40 flex flex-col px-8 md:px-12 lg:px-16 lg:py-20 xl:px-20 max-w-screen-2xl m-auto"
    >
      <Image
        src={PinkBlob} alt="" width={645} height={903}
        className="absolute -z-10 select-none pointer-events-none w-full h-auto object-contain xsm:w-1/2 xsm:mt-52 xsm:-right-28 md:w-1/3 md:mt-28 md:-right-28 lg:w-1/2 xl:-mt-20"
      />
      <article className="md:flex flex-col mr-10 z-30" >
        <H2m className="font-medium font-montserrat my-8 text-3xl md:text-4xl" >ICAF's U.S. and global initiatives</H2m>
      </article>
    
      <div
        role="region"
        aria-live="polite"
        className="z-30 flex flex-col lg:flex-row lg:h-accordion-narrow lg:max-h-accordion-narrow-max xl:h-accordion-wide xl:max-h-accordion-wide-max overflow-hidden"
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
          header="Arts Olympiad"
          paragraph={
            <>
              <Pm className="lg:my-12 font-openSans font-light">For children’s creative development, ICAF organizes the Arts Olympiad, a free school 
art program that has grown over the years into the world’s largest. The U.S. Olympic and Paralympic Committee has granted ICAF as exclusive license to use the “Arts Olympiad” mark. 
The Arts Olympiad in Texas, China, Israel, and New Zealand.</Pm>
              <ArrowCTA text="See 5-page pdf" href="https://icaf.org/resource/pdfs/Arts-Olympiad-Stories-Texas.pdf"/>
            </>
          }
          images={
            <div className="flex flex-col justify-center sm:flex-row mx-auto xl:mx-0 cursor-default">
              <Image src={Torch} alt="" className=""></Image>
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
          header="World Children's Festival"
          paragraph={
            <>
              <Pm className="my-12 font-openSans font-light">For children’s empathic development, ICAF produces the World Children’s Festival every four years as 
              the “Olympics” of children’s imagination. </Pm>
              <ArrowCTA text="Learn more" href="https://icaf.org/mission/world-childrens-festival"/>
            </>
          }
          images={
            <div className="flex flex-col md:flex-row mx-auto lg:mx-0">
              <Image src={LightingIdea} alt=""></Image>
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
          header="Olympics"
          paragraph={<><Pm className="font-light font-openSans mb-12 lg:my-12">ICAF has organized art exhibitions at Olympic venues and its Arts Olympiad was integral to New York City’s bid for the 2012 Olympics.</Pm>
            {/* <button className="bg-dark-blue text-white h-10 whitespace-no-wrap inline-block max-w-max px-4"><Link href="https://www.icaf.org/resource/pdfs/new-york-olympic.pdf">See pdf to learn more</Link></button> */}
            <ArrowCTA text="See pdf to learn more" href="https://www.icaf.org/resource/pdfs/new-york-olympic.pdf"/>
          </>
            
          }
          images={
            <Image src={OlympicRings} alt="" className="my-10"></Image>
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
          header="#MyFavoriteSport"
          paragraph={<>
            <Pm className="mb-12 lg:my-12 font-openSans font-light">The Olympic art contest is inspired by Baron de Coubertin, founder of modern Olympics, who believed that Olympics must showcase humanity’s physical prowess and artistic talents.</Pm>
            {/* <button className="bg-dark-blue text-white whitespace-no-wrap w-auto inline-block max-w-max h-auto px-4 py-4"><Link href="https://www.smithsonianmag.com/arts-culture/when-the-olympics-gave-out-medals-for-art-6878965/">When the Olympics gave out medals for art</Link></button> */}
            <ArrowCTA text="When the Olympics gave out medals for art" href="https://www.smithsonianmag.com/arts-culture/when-the-olympics-gave-out-medals-for-art-6878965/"/>
          </>}
          images={
            <div className="flex flex-col my-10 md:flex-row mx-auto lg:mx-0">
              <LazyImage className="min-w-[230px] min-h-[300px] max-w-[230px] max-h-[300px] cursor-default" imageUrl="/about/olympic-monument.webp" alt="olympic-monument." />
              <div className="my-4 md:my-0 mx-4" />
              <LazyImage className="min-w-[230px] min-h-[300px] max-w-[230px] max-h-[300px] cursor-default" imageUrl="/about/baron-de-couberin.jfif" alt="baron-de-couberin." />
            </div>
          }
        />
      </div>

    </section>
  );
};