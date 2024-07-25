"use client";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";

interface BannerImgOverflowProps {
  backgroundColor: string;
  title: string;
  description: string;
  img: StaticImageData[];
  alt: string[];
  buttons: {
    href: string;
    localLink: boolean;
    text: string;
    icon: JSX.Element;
    className?: string;
  }[];
}

export const BannerImgOverflow = (props: BannerImgOverflowProps) => {
  return (
    <>
      <div className={`relative bottom-0 z-0 bg-${props.backgroundColor} w-screen h-fit mt-[170px]`}>
        <div className="m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="grid auto-rows-auto grid-cols-1 sm:grid-rows-1 sm:grid-cols-2 grid-flow-row sm:grid-flow-col gap-y-6 py-10">
            <div className="col-span-1 order-2 sm:order-none">
              <div className="mx-auto font-medium text-2xl md:text-3xl">
                {props.title}
              </div>
              <div className="mx-auto mt-6 text-lg">
                {props.description}
              </div>
            </div>
            <div className="flex flex-nowrap justify-start items-start lg:w-3/4 max-w-[300px] max-h-[100px] order-3 sm:order-none">
              {
                props.buttons && Array.isArray(props.buttons) && props.buttons.map((button, index) => (
                  button.localLink ? (
                    <Link key={index} href={button.href} className={`${button.className} py-4 px-6 grow-0`}>
                      {button.icon}
                      {button.text}
                    </Link>
                  ) : (
                    <a key={index} href={button.href} target="_blank" rel="noopener noreferrer" className={`${button.className} py-4 px-6 grow-0`}>
                      {button.icon}
                      {button.text}
                    </a>
                  )
                ))
              }
            </div>
            <div className="row-span-1 sm:row-span-2 relative order-1 sm:order-none justify-self-center sm:justify-self-auto">
              <Image src={props.img[0]} width={500} height={179} alt={props.alt[0]} className="hidden sm:block sm:scale-150 sm:bottom-12 absolute md:scale-125 md:bottom-0 sm:-right-20 md:-right-24" /> 
              <Image src={props.img[0]} width={500} height={179} alt={props.alt[0]} className="block sm:hidden scale-110 -mt-40" /> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};