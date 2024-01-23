"use client";
import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import blueblob from "../../public/svgs/blobs/blueblob.svg";
import littlepinkblob from "../../public/svgs/blobs/littlepinkblob.svg";
import introimg1 from "../../public/home/new-hero/Painter.webp";
import introimg2 from "../../public/home/new-hero/_MG_4685.webp";
import introimg3 from "../../public/home/new-hero/_MG_8137.webp";
import introimg4 from "../../public/home/new-hero/face_paint_crop.webp";
import introimg5 from "../../public/home/new-hero/DSC_5762.webp";
import introimg6 from "../../public/home/new-hero/Fiona_Fung.HK.webp";
import {LazyImage} from "../common/images/LazyImage";
import {H2m} from "../common/texts/H2m";
import {H3m} from "../common/texts/H3m";

export const Intro = () => {

  return (
    <section aria-label="introduction." className="mb-8 md:mb-36 mt-6 md:mt-20 max-h-[760px] relative bg-neutral-white grid md:col-span-4 md:grid-cols-4 px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto z-0">
      {/* TEXTS */}

      <article role="banner" className=" z-20 relative flex-col align-middle md:col-span-2">
        <div className=" z-20 flex flex-row align-center mb-8">
          <Image src={hashtag} alt="" width={32} height={32}  />
          <h1 className=" z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl ">
              MyFavoriteSport<span className="sr-only">.</span>
          </h1>
        </div>
        <div className=" mb-32 z-20 ">
          <H2m className=" z-20 mb-2 sm:mb-4 lg:mb6" >
          A global art competition on Olympic sports
          </H2m>
          <H3m className=" z-20 font-light mb-4 lg:mb8">
          Any 10 to 20-year-old anywhere can create art on his or her most favorite sport, upload it, and share it with family and friends to get their votes.
          </H3m>
          <H3m className="z-20 font-light mb-4 lg:mb8">
          The gold, silver, and bronze winners selected through public votes will get to attend the Paris Olympics with our sponsors' support.
          </H3m>
          {/* <Link href="/about" className="text-main-blue text-sm lg:text-lg flex flex-row">
              Learn more<span className="invisible">.</span>
            <Image src={vector} alt="angle bracket right" className="ml-4" aria-hidden />
          </Link> */}
        </div>
      </article>

      {/* SIDE IMAGES */}

      <figure
        role="region"
        aria-label="artistic attributes and tools"
        className="relative ml-6 z-10 hidden md:grid max-w-[490px] md:col-span-2 md:grid-cols-4 md:grid-rows-2 gap-3"
      >
        <div className="z-10 grid gap-5 col-span-2 row-span-2">
          <LazyImage className="border-0.5 border-black object-cover" imageUrl={introimg1} alt="" />
          <div className="rounded-xl border-0.5 border-black object-cover object-center overflow-clip">
            <LazyImage className="scale-125" imageUrl={introimg2} alt="" />
          </div>
        </div>
        <div className="z-10 grid gap-3 col-span-2 row-span-2">
          <LazyImage className="border-0.5 border-black object-cover" imageUrl={introimg3} alt="" />
          <LazyImage className="border-0.5 border-black object-cover" imageUrl={introimg4} alt="" />
          {
            // Make the last div span 2 columns
          }
          <div className="z-10 grid gap-3 grid-cols-2 grid-rows-1">
            <LazyImage className="border-0.5 border-black object-cover" imageUrl={introimg5} alt="" />
            <LazyImage className="border-0.5 border-black object-cover object-left" imageUrl={introimg6} alt="" />
          </div>
        </div>

        {
          // Blobs
        }

        {
          // small tablet 
        }
        <Image
          src={blueblob} alt="" width={525} height={486}
          className="hidden md:block lg:hidden absolute z-0 top-52 right-32"
        />
        <Image
          src={littlepinkblob} alt="" width={172} height={143}
          className="hidden md:block lg:hidden absolute z-0 -top-16 -right-12 "
        />
        {
          // Big tablet
        }
        <Image
          src={blueblob} alt="" width={525} height={486}
          className="hidden lg:block absolute z-0 -bottom-24 -left-36"
        />
        <Image
          src={littlepinkblob} alt="" width={212} height={195}
          className="hidden lg:block absolute z-0 -top-16 right-36 "
        />
        <Image
          src={littlepinkblob} alt="" width={212} height={195}
          className="hidden lg:block absolute z-0 -bottom-16 -right-24 "
        />

      </figure>

      {
        // Blob mobile
      }
      <Image
        src={blueblob} alt="" width={300} height={260}
        className="absolute z-0 top-12 -left-16 md:hidden"
      />

    </section>
  );
};