"use client";
import React from "react";
import DoubleQuotes from "../../public/impact/double-quotes.png";
import Image from "next/image";
// import LeftIcon from "../../public/impact/left-icon.svg";
// import RightIcon from "../../public/impact/right-icon.svg";
import "@/styles/fade-in-out-texture.css";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import BlueBlob from "../../public/impact/blue-blob.png";

const SlideShow = () => {
  const { windowWidth } = useWindowDimensions();
  const isMobile = windowWidth <= 768;

  // const [slideIndex, setSlideIndex] = useState(1);
  // const [animationClass, setAnimationClass] = useState("slide-enter");
  const slides = [
    { heading: "Youth Talent and Olympian Pride", author:"Dr. Liston D. Bochette III", position:"Olympian, artist, and educator", description: "Olympians around the world could not be prouder of the young talent involved in the International Child Art Foundation events. These talented young souls hold great promise for a tomorrow filled with “Higher, Swifter, and Stronger” leadership.  No matter where life leads them we all know that success awaits their arrival with open arms!"}
  ];

  // const plusSlides = (n:number) => {
  //   setAnimationClass("slide-exit");
  //   setSlideIndex((prevIndex) => {
  //     const newIndex = prevIndex + n;
  //     return newIndex <= 0 ? slides.length : newIndex > slides.length ? 1 : newIndex;
  //   });
  //   setAnimationClass("slide-enter");

  // };


  if(isMobile) {
    return (
      <div className="relative flex flex-col justify-between px-4 overflow-hidden mt-24">
        <Image src={BlueBlob} alt="" className="absolute -z-10 w-full md:w-2/3 -right-36 overflow-hidden"></Image>
        <div className="flex flex-col z-50 justify-center items-center select-none pointer-events-none">
          {/* <div className="z-50 text-center text-2xl font-medium font-montserrat py-6">Testimonials</div> */}
          <Image src={DoubleQuotes} alt="Double Quotes" width={40} height={40} />
          {slides.map((slide, index) => (
            <div
              key={index}
              // className={`mySlides fade ${slideIndex - 1 === index ? "block" : "none"} ${animationClass}`}
              // style={{ display: slideIndex - 1 === index ? "block" : "none" }}
            >
              <div className="text-center text-2xl font-semibold font-montserrat py-6">{slide.heading}</div>
              <div className="w-full mx-auto px-4 text-md lg:text-xl font-open-sans font-normal leading-loose">{slide.description}</div>
              <div className="text-center text-base font-bold font-open-sans leading-normal">{slide.author}</div>
              <div className="text-center text-sm font-light font-open-sans leading-none">{slide.position}</div>
            </div>
          ))}
        </div>
        {/* <div className="mt-4 mx-auto z-50">
          <a className="prev my-auto cursor-pointer select-none" onClick={() => plusSlides(-1)}>
            <div className="mr-6 w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
              <Image src={LeftIcon} alt="" className="w-6 h-6 relative pointer-events-none"></Image>
            </div>
          </a>
          <a className="next my-auto cursor-pointer select-none " onClick={() => plusSlides(1)}>
            <div className="w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
              <Image src={RightIcon} alt="" className="w-6 h-6 relative pointer-events-none"></Image>
            </div>
          </a>
        </div>        */}
      </div>
    );
  }



  return (
    <div className="relative flex flex-row justify-between px-6 mt-48 lg:px-12 overflow-hidden">
      <Image src={BlueBlob} alt="" className="absolute -z-10 pointer-event-none w-2/5 -right-36 overflow-hidden"></Image>
      {/* <a className="prev z-50 my-auto cursor-pointer select-none" onClick={() => plusSlides(-1)}>
        <div className="w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
          <Image src={LeftIcon} alt="" className="w-6 h-6 relative pointer-events-none"></Image>
        </div>
      </a> */}
            
      <div className="flex flex-col justify-center items-center select-none pointer-events-none">
        {/* <div className="text-center text-2xl font-medium font-montserrat py-6">Testimonials</div> */}
        <Image src={DoubleQuotes} alt="Double Quotes" width={40} height={40} />
        {slides.map((slide, index) => (
          <div
            key={index}
            // className={`mySlides fade ${slideIndex - 1 === index ? "block" : "none"} ${animationClass}`}
            // style={{ display: slideIndex - 1 === index ? "block" : "none" }}
          >
            <div className="text-center text-2xl font-semibold font-montserrat py-6">{slide.heading}</div>
            <div className="w-2/3 mx-auto text-xl font-open-sans font-normal leading-loose">{slide.description}</div>
            <div className="text-center text-base font-bold font-open-sans leading-normal">{slide.author}</div>
            <div className="text-center text-sm font-light font-open-sans leading-none">{slide.position}</div>
          </div>
        ))}
      </div>
      {/* <a className="next z-20 my-auto cursor-pointer select-none " onClick={() => plusSlides(1)}>
        <div className="w-14 h-14 p-4 rounded-[100px] border border-blue-900 justify-center items-center gap-2 inline-flex">
          <Image src={RightIcon} alt="" className="w-6 h-6 relative pointer-events-none"></Image>
        </div>
      </a> */}
    </div>
  );
};

export default SlideShow;

