"use client";
import React, { useState } from "react";
import Image from "next/image";
import img1 from "../../../public/home/guidelines/submission-1.webp";
import img2 from "../../../public/home/guidelines/submission-2.webp";
import img3 from "../../../public/home/guidelines/_MG_8137.webp";
import img4 from "../../../public/home/guidelines/submission-4.webp";
import guidelinesPinkBlob from "../../../public/home/guidelines/guidelines-pink-blob.svg";
import {H2m} from "../../common/texts/H2m";
import {GuidelineCard} from "./GuidelineCard";
import {AnimatedScribble} from "../../common/decorations/AnimatedScribble";
import { gsap } from "gsap";
import { Flip } from "gsap/all";

gsap.registerPlugin(Flip);
const cardData = [
  { imgUrl: img1, className: "border-[#0286C3]", heading: "How to Submit", description: "Create an account with us, go to your dashboard and upload your work.", button:["Learn more", "/register"] },
  { imgUrl: img2, className: "border-[#168C39]", heading: "Accepted Formats", description: "All entries will be submitted digitally, but you're free to choose any format you'd like. Let your imagination take the lead on how to create your work.", button:["Learn more", "/contest"]},
  { imgUrl: img3, className: "border-[#EE2F4D]", heading: "Share your Favorites", description: "Everyone gets 1 vote. You can share your favorite piece through social media for more votes.", button:["Learn more", "/faq"], gradientStrength: 0.6 },
  { imgUrl: img4, className: "border-[#F5AB35]", heading: "How much does it cost?", description: "All entires and votes are free!  This is thanks to our generous sponsors and donors supporting this amazing event!", button:["Learn more", "/sponsor"]}
];

export const Guidelines = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardClick = (index: number) => {
    const currentActiveTextarea = document.querySelector(`.grid-card:nth-child(${activeIndex + 1}) .div-textholder`) as HTMLElement;
    const currentTextareaWidth = currentActiveTextarea ? currentActiveTextarea.clientWidth : "auto";  
    if (currentActiveTextarea) {
      currentActiveTextarea.style.width = `${currentTextareaWidth}px`;
    }  

    setActiveIndex(index); // Update the active card index
    
  
    // Capture the state of all cards in the grid before making any changes
    const state = Flip.getState(".grid-card");
  
    // Apply the changes to reflect the new layout
    document.querySelectorAll(".grid-card").forEach((card, idx) => {
      if (idx === index) {
        // This card is the one that was clicked, expand it
        card.classList.add("lg:col-span-3", "row-span-2", "lg:row-span-1", "cursor-auto");
        card.classList.remove("col-span-1", "row-span-1", "cursor-pointer");
      } else {
        // Make sure other cards are in their default state
        card.classList.add("row-span-1", "col-span-1", "cursor-pointer");
        card.classList.remove("lg:col-span-3", "row-span-2", "lg:row-span-1", "cursor-auto");
      }
    });

    if (currentActiveTextarea) {
      currentActiveTextarea.addEventListener("transitionend", () => {
        currentActiveTextarea.style.width = "auto";
      }, { once: true });
    }  
    const newActiveTextarea = document.querySelector(`.grid-card:nth-child(${index + 1}) .div-textholder`) as HTMLElement;
    if (newActiveTextarea) {
      newActiveTextarea.style.width = `${currentTextareaWidth}px`;
      newActiveTextarea.addEventListener("transitionend", () => {
        // Once the transition is complete, set the width to auto
        newActiveTextarea.style.width = "auto";
      }, { once: true }); // The 'once' option auto-removes the event listener after it's invoked  
    }
    
  
    // Use FLIP to animate from the previous state to the new state for all cards
    Flip.from(state, {
      duration: 0.6,
      ease: "power2.inOut",
      absolute: false,
      targets: ".grid-card",
      scale: false,
    });
  };
  
  return (
    <section aria-label="Submission guidelines." className="relative px-8 md:px-12 lg:px-16 xl:px-20 flex flex-col max-w-screen-2xl lg:mx-auto mt-16 md:mt-36 mb-16">
      <Image src={guidelinesPinkBlob} alt="" width={1000} className="z-0 absolute -top-32 -left-12 md:left-0 w-[700px] max-w-[unset] " />
      <H2m className="z-10 font-medium text-3xl md:text-4xl font-montserrat" >
        Submission made
        <span className="text-dark-blue relative font-montserrat"> simple
          <AnimatedScribble
            width={280}
            smwidth={180}
            className="stroke-new-blue absolute top-8 md:top-10 -right-8 z-10 md:w-[290px] md:h-[28px] xl:w-[340px] xl:h-[34px]"
          />
        </span>
      </H2m>
      <figure className="z-10 mt-12 grid grid-cols-1 grid-rows-5 lg:grid-cols-6 lg:grid-rows-1 gap-6 h-[800px] lg:h-[367px] w-full rounded-[40px]">
        {cardData.map((card, index) => (
          <GuidelineCard
            key={index}
            isActive={activeIndex === index}
            className={`grid-card ${card.className} border-[#0286C3] ${activeIndex === index ? "lg:col-span-3 row-span-2 lg:row-span-1 cursor-auto" : "col-span-1 row-span-1 cursor-pointer"}`}
            imgUrl={card.imgUrl}
            heading={card.heading}
            description={card.description}
            button={card.button}
            gradientStrength={card.gradientStrength}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </figure>
    </section>
  );
};