import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import vector from "../../public/svgs/Vector.svg";
import blueblob from "../../public/svgs/blueblob.svg";
import horizontalblueblob from "../../public/svgs/horizontalblueblob.svg";
import littlepinkblob from "../../public/svgs/littlepinkblob.svg";
import introimg1 from "../../public/home/introimg1.webp";
import introimg2 from "../../public/home/introimg2.webp";
import introimg3 from "../../public/home/introimg3.webp";
import introimg4 from "../../public/home/introimg4.webp";
import introimg5 from "../../public/home/introimg5.webp";
import introimg6 from "../../public/home/introimg6.webp";
import Link from "next/link";
import {LazyImage} from "../common/images/LazyImage";
import {H2m} from "../common/texts/H2m";
import {H3m} from "../common/texts/H3m";

export const Intro = () => {
  return (
    <section aria-label="introduction"  className=" max-h-[760] relative bg-neutral-white grid md:col-span-4 md:grid-cols-4 px-6 md:px-12 xl:px-24 ">
      {/* TEXTS */}

      <article role="banner" className=" z-20 relative flex-col align-middle md:col-span-2">
        <div className=" z-20 flex flex-row align-center mb-8">
          <Image src={hashtag} alt="" width={32} height={32}  />
          <h1 className=" z-20 break-words font-semibold text-4xl lg:text-5xl xl:text-6xl ">
              MyFavoriteSport
          </h1>
        </div>
        <div className=" mb-32 z-20 ">
          <H2m className=" z-20 mb-2 sm:mb-4 lg:mb6" >
          A global art competition on Olympic sports
          </H2m>
          <H3m className=" z-20 font-light mb-4 lg:mb8">
          Celebrate the Paris 2024 Olympics and reassure youth that their chaotic and divided world has hope.
          </H3m>
          <Link href="/about" className="text-main-blue text-sm lg:text-lg flex flex-row" aria-label="Learn more">
              Learn more
            <Image src={vector} alt="angle bracket right" className="ml-4" aria-hidden />
          </Link>
        </div>
      </article>

      {/* SIDE IMAGES */}

      <figure
        role="region"
        aria-label="artistic attributes and tools"
        className="relative ml-6 z-10 hidden md:grid max-w-[490px] md:col-span-2 md:grid-cols-4 md:grid-rows-2 gap-3"
      >
        <div className="z-10 grid gap-5 col-span-2 row-span-2">
          <LazyImage classes="border-0.5 border-black" imageUrl={introimg1}  alt="earth image surrounded palms" />
          <LazyImage classes="border-0.5 border-black" imageUrl={introimg2} alt="a person drawing on an ipad" />
        </div>
        <div className="z-10 grid gap-3 col-span-2 row-span-2">
          <LazyImage classes="border-0.5 border-black" imageUrl={introimg3} alt="a person using graphic editors on a desktop" />
          <LazyImage classes="border-0.5 border-black" imageUrl={introimg4} alt="scissors, ropes, buttons and tape" />
          {/* Make the last div span two columns */}
          <div className="z-10 grid gap-3 grid-cols-2 grid-rows-1">
            <LazyImage classes="border-0.5 border-black" imageUrl={introimg5} alt="basket full of brushes" />
            <LazyImage classes="border-0.5 border-black" imageUrl={introimg6} alt="basket full of pencils" />
          </div>
        </div>

        {/* BLOBS */}

        {/* small tablet */}
        <Image
          src={blueblob} alt="" width={525} height={486}
          className="hidden md:block lg:hidden absolute z-0 top-52 right-32"
        />
        <Image
          src={littlepinkblob} alt="" width={172} height={143}
          className="hidden md:block lg:hidden absolute z-0 -top-16 -right-12 "
        />
        {/* >= big tablet */}
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

      {/* BLOB mobile */}
      <Image
        src={blueblob} alt="" width={300} height={260}
        className="absolute z-0 top-24 -left-16 md:hidden"
      />

    </section>
  );
};