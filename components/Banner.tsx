"use client";
import Image from "next/image";
// import { useEffect } from "react";

interface BannerProps {
  backgroundColor: string;
  title: string;
  description: string;
  img: string;
  buttons: {
    href: string;
    text: string;
    icon: JSX.Element;
    className?: string;
  }[];
}

export const Banner = (props: BannerProps) => {
  // useEffect(() =>{
  //   document.addEventListener("DOMContentLoaded", function(event) {
  //     document.querySelectorAll("img").forEach(function(img){
  //       img.onerror = function(){this.style.display="none";};
  //     });
  //   });
  // });

  return (
    <>
      <div className={`relative bottom-0 z-30 bg-${props.backgroundColor} w-screen h-fit`}>
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 py-6" >
          <div className="col-span-1 md:col-span-2 order-2 md:order-1">
            <div className="mx-auto mt-10 font-medium text-2xl md:text-3xl">
              {props.title}
            </div>
            <div className="mx-auto text-lg mt-4 font-open-sans font-light">
              {props.description}
            </div>
          </div>

          {/* Image: First on small screens, second on larger screens */}
          {/* <Image src={props.img} width = {318} height = {179} alt={props.img} onError={e => e.target.style.display = 'none'} className="mx-auto my-auto w-1/2 h-fit order-1 md:order-2 md:w-11/12 md:col-start-3 md:col-end-3 md:row-span-3s" /> */}
          <Image src={props.img} width = {318} height = {179} alt={props.img} className="mx-auto my-auto w-1/2 h-fit order-1 md:order-2 md:w-11/12 md:col-start-3 md:col-end-3 md:row-span-3" />
          
          <div className="mx-auto mb-8 md:mx-0 h-auto order-3 flex flex-nowrap justify-start w-full items-baseline">
            {props.buttons && Array.isArray(props.buttons) && props.buttons.map((button, index) => (
              <a key={index} href={button.href} target="blank" rel="noopener noreferrer" className={`${button.className} py-4 px-6 md:whitespace-nowrap`}>
                {button.icon}
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};