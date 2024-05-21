"use client";
import {H2m} from "../../common/texts/H2m";
import Image from "next/image";
import {WisdomCarousel} from "./WisdomCarousel";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import React, { useState } from "react";
import "@/styles/fade-in-out-texture.css";
import OrangeBlob from "../../../public/impact/orange-blob.svg";

export const Wisdom = () => {
  const [slideIndex, ] = useState(1);
  const [animationClass, ] = useState("slide-enter");
  useIntersectionObserver({}, "draw-line-bottom", "animate-drawing-bottom");
  const slides = [
    { heading: "Youth Talent and Olympian Pride", author:"Liston D. Bochette III", position:"Ph.D. Olympian, artist, and educator", description: "Olympians around the world could not be prouder of the young talent involved in the International Child Art Foundation events. These talented young souls hold great promise for a tomorrow filled with “Higher, Swifter, and Stronger” leadership.  No matter where life leads them we all know that success awaits their arrival with open arms!"},
    { heading: "2", author:"Liston D. Bochette III", position:"Ph.D. Olympian, artist, and educator", description: "Olympians around the world could not be prouder of the young talent involved in the International Child Art Foundation events. These talented young souls hold great promise for a tomorrow filled with “Higher, Swifter, and Stronger” leadership.  No matter where life leads them we all know that success awaits their arrival with open arms!"},
    { heading: "3", author:"Liston D. Bochette III", position:"Ph.D. Olympian, artist, and educator", description: "Olympians around the world could not be prouder of the young talent involved in the International Child Art Foundation events. These talented young souls hold great promise for a tomorrow filled with “Higher, Swifter, and Stronger” leadership.  No matter where life leads them we all know that success awaits their arrival with open arms!"},
    { heading: "4", author:"Liston D. Bochette III", position:"Ph.D. Olympian, artist, and educator", description: "Olympians around the world could not be prouder of the young talent involved in the International Child Art Foundation events. These talented young souls hold great promise for a tomorrow filled with “Higher, Swifter, and Stronger” leadership.  No matter where life leads them we all know that success awaits their arrival with open arms!"},
  ];

  // const showSlides = (n: number) => {
  //   let index = n;
  //   if (n > slides.length) {
  //     index = 1;
  //   } else if (n < 1) {
  //     index = slides.length;
  //   }
  //   setSlideIndex(index);
  // };

  // const plusSlides = (n:number) => {
  //   setAnimationClass("slide-exit");
  //   setTimeout(() => {
  //     setSlideIndex((prevIndex) => {
  //       const newIndex = prevIndex + n;
  //       return newIndex <= 0 ? slides.length : newIndex > slides.length ? 1 : newIndex;
  //     });
  //     setAnimationClass("slide-enter");
  //   }, 500); 
  // };

  // const currentSlide = (n: number) => {
  //   showSlides(n);
  // };

  return (
    <section className="font-montserrat font-semibold px-8 md:px-12 lg:px-16 xl:px-20 mt-24 md:mt-36 mb-24 flex flex-col max-w-screen-2xl m-auto overflow-hidden">
      <div className="self-center flex items-center justify-center relative ">
        <H2m className="z-40 text-start lg:text-center relative font-montserrat">
          Artists' Showcase: Credits & Acknowledgements for Site Imagery
        </H2m>
      </div>
      <Image src={OrangeBlob} alt="" className="absolute z-0 pointer-event-none w-full lg:w-2/5 -left-36 mt-48 overflow-hidden"></Image>
      <div className="w-full justify-center items-center mt-12 lg:-mt-36 mx-auto">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`mySlides fade ${slideIndex - 1 === index ? "block" : "none"} ${animationClass}`}
            style={{ display: slideIndex - 1 === index ? "block" : "none" }}
          >
            <WisdomCarousel />
          </div>
        ))}
      </div>
      {/* <div className="flex flex-row space-x-6 justify-center">
        <a className="prev my-auto cursor-pointer select-none" onClick={() => plusSlides(-1)}>
          <div className="w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
              <Image src={LeftIcon} alt="" className='w-6 h-6 relative pointer-events-none'></Image>
          </div>
        </a>
        <a className="next my-auto cursor-pointer select-none " onClick={() => plusSlides(1)}>
          <div className="w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
              <Image src={RightIcon} alt="" className='w-6 h-6 relative pointer-events-none'></Image>
          </div>
        </a>
      </div>  */}
    </section>
  );
};