"use client";
import React, { useState } from "react";
import DoubleQuotes from "../../public/impact/double-quotes.png";
import Image from "next/image";
import LeftIcon from "../../public/impact/left-icon.svg";
import RightIcon from "../../public/impact/right-icon.svg";
import "@/styles/fade-in-out-texture.css";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import PinkBlob from "../../public/sponsor/PastPinkBlob.png";

const SlideShow = () => {
  const { windowWidth } = useWindowDimensions();
  const isMobile = windowWidth <= 768;

  const [slideIndex, setSlideIndex] = useState(1);
  const [animationClass, setAnimationClass] = useState("slide-enter");
  const slides = [
    { heading: "Youth Talent and Olympian Pride", author:"Michael McNally", position:"Brand Relations Director, LEGO", description: "What the International Child Art Foundation does to encourage a child’s inner creativity is something we passionately admire and are proud to support, because we believe children who are exposed to creative activities from a very young age go on to become the world’s most meaningful contributors.", src:"/sponsor/Michael.png"},
    { heading: "2", author:"Marc Speichert", position:"Executive Vice President and Chief Commercial Officer, Four Seasons Hotels and Resorts", description: "The ICAF was the perfect choice for us. [It] has a 25-plus year history of providing free school art programs and educational events for children, and [its] mission is one that we are proud to support as we continue to inspire the world to lead with genuine heart.", src:"/sponsor/Marc.png"},
    { heading: "3", author:"Lt. Gen. Joseph Cosumano", position:"Jr., Commanding General, US Army Space and Missile Defense  Command", description: "The positive message of peace and hope promised by the International Child Art Foundation is commendable and worthy of great recognition.", src:"/sponsor/Joseph.png"},
  ];

  const plusSlides = (n:number) => {
    setAnimationClass("slide-exit");
    setTimeout(() => {
      setSlideIndex((prevIndex) => {
        const newIndex = prevIndex + n;
        return newIndex <= 0 ? slides.length : newIndex > slides.length ? 1 : newIndex;
      });
      setAnimationClass("slide-enter");
    }, 500); 
  };


  if(isMobile) {
    return (
      <div className="relative flex flex-row justify-between pb-12 pt-0 px-4 overflow-hidden">
        <Image src={PinkBlob} alt="" className="absolute z-0 pointer-event-none w-2/3 right-0 top-0 overflow-hidden"></Image>
        <div className="z-20 bg-white px-4 py-6 rounded-2xl shadow-2xl flex flex-row justify-between">
          <a className="prev z-20 my-auto cursor-pointer select-none" onClick={() => plusSlides(-1)}>
            {/* &#10094; */}
            <div className="w-14 h-14 p-2 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
              <Image src={LeftIcon} alt="" className="relative pointer-events-none"></Image>
            </div>
          </a>
              
          <div className="justify-center items-center select-none pointer-events-none py-6">
            {/* <div className="text-center text-2xl font-medium font-montserrat py-6">Testimonials</div>          */}
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`fade flex flex-row ${slideIndex - 1 === index ? "block" : "none"} ${animationClass}`}
                style={{ display: slideIndex - 1 === index ? "block" : "none" }}
              >
                <div className="flex flex-row justify-between">
                  <div className="relative flex flex-col justify-center px-2 md:px-6">
                    <Image src={DoubleQuotes} alt="Double Quotes" width={40} height={40} className="self-center"/>
                    {/* <div className="text-2xl font-semibold font-montserrat py-6">{slide.heading}</div> */}
                    <div className="text-xl font-openSans font-light leading-loose py-6">{slide.description}</div>
                    <div className=" text-base font-bold font-open-sans leading-normal">{slide.author}</div>
                    <div className="text-sm font-light font-open-sans leading-none">{slide.position}</div>
                  </div>
                  {/* <div className="relative lg:scale-100 2xl:scale-100 flex justify-end items-end translate-y-12">
                    <img src={slide.src} alt="" ></img>
                  </div> */}
                </div>
                
              </div>
            ))}
          </div>
          <a className="next z-20 my-auto cursor-pointer select-none " onClick={() => plusSlides(1)}>
            {/* &#10095; */}
            <div className="w-14 h-14 p-2 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
              <Image src={RightIcon} alt="" className="relative pointer-events-none"></Image>
            </div>
          </a>
        </div>
      
      </div>
    );
  }



  return (
    <div className="relative flex flex-row justify-between py-12 px-6 -mt-24 lg:px-12 overflow-hidden">
      <Image src={PinkBlob} alt="" className="absolute z-0 pointer-event-none w-1/3 right-0 top-0 overflow-hidden"></Image>
      <div className="z-20 bg-white px-12 py-6 rounded-2xl shadow-2xl flex flex-row justify-between">
        <a className="prev z-20 my-auto cursor-pointer select-none" onClick={() => plusSlides(-1)}>
          {/* &#10094; */}
          <div className="w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
            <Image src={LeftIcon} alt="" className="w-6 h-6 relative pointer-events-none"></Image>
          </div>
        </a>
              
        <div className="justify-center items-center select-none pointer-events-none py-6">
          {/* <div className="text-center text-2xl font-medium font-montserrat py-6">Testimonials</div>          */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`fade flex flex-row ${slideIndex - 1 === index ? "block" : "none"} ${animationClass}`}
              style={{ display: slideIndex - 1 === index ? "block" : "none" }}
            >
              <div className="flex flex-row justify-between">
                <div className="relative flex flex-col justify-center px-6 w-3/4">
                  <Image src={DoubleQuotes} alt="Double Quotes" width={40} height={40} className="self-center"/>
                  {/* <div className="text-2xl font-semibold font-montserrat py-6">{slide.heading}</div> */}
                  <div className="text-xl font-openSans font-light leading-loose py-6">{slide.description}</div>
                  <div className=" text-base font-bold font-open-sans leading-normal">{slide.author}</div>
                  <div className="text-sm font-light font-open-sans leading-none">{slide.position}</div>
                </div>
                <div className="relative lg:scale-100 2xl:scale-100 flex justify-end items-end translate-y-12">
                  <img src={slide.src} alt="" ></img>
                </div>
              </div>
                
            </div>
          ))}
        </div>
        <a className="next z-20 my-auto cursor-pointer select-none " onClick={() => plusSlides(1)}>
          {/* &#10095; */}
          <div className="w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
            <Image src={RightIcon} alt="" className="w-6 h-6 relative pointer-events-none"></Image>
          </div>
        </a>
      </div>
      
    </div>
  );
};

export default SlideShow;

