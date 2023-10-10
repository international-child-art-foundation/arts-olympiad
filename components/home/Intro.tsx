import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import vector from "../../public/Vector.svg";
import blueblob from "../../public/home/blueblob.svg";
import horizontalblueblob from "../../public/home/horizontalblueblob.svg";
import littlepinkblob from "../../public/home/littlepinkblob.svg";
import introimg1 from "../../public/home/introimg1.webp";
import introimg2 from "../../public/home/introimg2.webp";
import introimg3 from "../../public/home/introimg3.webp";
import introimg4 from "../../public/home/introimg4.webp";
import introimg5 from "../../public/home/introimg5.webp";
import introimg6 from "../../public/home/introimg6.webp";
import Link from "next/link";
import {LazyImage} from "../common/LazyImage";

export const Intro = () => {
  return (
    <section aria-label="introduction"  className="max-w-[1200px] max-h-[760] relative bg-neutral-white grid md:col-span-4 md:grid-cols-4 px-4 md:px-12 mx-auto ">
      {/* TEXTS */}

      <article role="banner" className="z-10 flex-col align-middle-center md:col-span-2">
        <div className="flex flex-row align-center mb-8">
          <Image src={hashtag} alt="" width={32} height={32}  />
          <h1 className="break-words font-semibold text-4xl lg:text-5xl xl:text-6xl ">
              MyFavoriteSport
          </h1>
        </div>
        <div className=" mb-32 ">
          <h2 className="break-words text-2xl lg:text-3xl mb-2 sm:mb-4 lg:mb6">
          A global art competition on Olympic sports
          </h2>
          <h3 className="break-words lg:text-xl xl:text-2xl font-light mb-4 lg:mb8">
          Celebrate the Paris 2024 Olympics and reassure youth that their chaotic and divided world has hope.
          </h3>
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
        className=" z-10 hidden md:grid max-w-[490px] md:col-span-2 md:grid-cols-4 md:grid-rows-2 gap-3"
      >
        <div className="grid gap-5 col-span-2 row-span-2">
          <LazyImage imageUrl={introimg1}  alt="earth image surrounded palms" />
          <LazyImage imageUrl={introimg2} alt="a person drawing on an ipad" />
        </div>
        <div className="grid gap-3 col-span-2 row-span-2">
          <LazyImage imageUrl={introimg3} alt="a person using graphic editors on a desktop" />
          <LazyImage imageUrl={introimg4} alt="scissors, ropes, buttons and tape" />
          {/* Make the last div span two columns */}
          <div className="grid gap-3 grid-cols-2 grid-rows-1">
            <LazyImage imageUrl={introimg5} alt="basket full of brushes" />
            <LazyImage imageUrl={introimg6} alt="basket full of pencils" />
          </div>
        </div>
      </figure>

      {/* BLOBS */}

      {/* mobile */}
      <Image
        src={blueblob} alt="" width={300} height={260}
        className="absolute z-0 top-24 -left-16 md:hidden"
      />
      {/* small tablet */}
      <Image
        src={horizontalblueblob} alt="" width={450} height={400}
        className="hidden md:block lg:hidden absolute z-0 top-52 right-32"
      />
      <Image
        src={littlepinkblob} alt="" width={212} height={195}
        className="hidden md:block lg:hidden absolute z-0 -top-16 right-4 "
      />
      {/* >= big tablet */}
      <Image
        src={horizontalblueblob} alt="" width={525} height={442}
        className="hidden lg:block absolute z-0 top-56 right-56"
      />
      <Image
        src={littlepinkblob} alt="" width={212} height={195}
        className="hidden lg:block absolute z-0 -top-16 right-56 "
      />
      <Image
        src={littlepinkblob} alt="" width={212} height={195}
        className="hidden lg:block absolute z-0 -bottom-16 right-0 "
      />
    </section>
  );
};