"use client";
import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
// import bicycleHero from "../../public/home/MFS_Bicycle_Hero.webp";
import HeroHeader from "../../public/home/Hero_Header.jpg";
import { formatDate }  from "../../mock/dates";

export const Intro = () => {

  return (
    <section aria-label="introduction." className=" gap-8 mb-36 md:mb-28 mt-6 md:mt-20 relative bg-neutral-white lg:grid lg:grid-rows-1 col-span-8 lg:col-span-12 lg:grid-cols-12 px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto z-0 ">

      <article role="banner" className=" z-20 relative flex-col align-middle col-span-8 lg:col-span-7 xl:col-span-6 lg:place-self-center">
        <div className=" z-20 flex flex-row align-center mb-8 place-content-center lg:place-content-start">
          <Image src={hashtag} alt="" width={32} height={32}  />
          <h1 className=" z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl font-montserrat">
              MyFavoriteSport<span className="sr-only">.</span>
          </h1>
        </div>
        <div className="font-normal text-base mb-6 md:mb-12 z-20">
          <p className=" z-20 mb-4 leading-8 lg:mb8">
          Artists  <b>aged 14 to 20</b>  create and upload your art and get your family and friends to vote for your masterpiece.
          </p>
          <p className="z-20 mb-4 leading-8 lg:mb8">
          Sports fans and art lovers vote for the artwork you like the most for it to win the Gold (US$3,000), Silver ($2,000), or Bronze ($1,000). 
          </p>
          <p className="z-20 mb-4 leading-8 lg:mb8 "> {/* Use &nbsp to allow grid layout to work properly */}
          This history-making global contest starts on&nbsp;<b> {formatDate("competitionBegin", "MMMM do")} </b>
          — the Games kick off in Paris. Artists must act soon to get more public votes. The contest ends on {formatDate("competitionEnd", "MMMM do")}.             
          Winners receive the cash prizes on&nbsp;{formatDate("winnerAnnounced", "MMMM d, yyyy")}.
          </p>
          <p className="z-20 mb-4 leading-8 lg:mb8">
          This #MyFavoriteSport campaign is launched by ICAF.org, a Washington DC-based charity. The entry fee for artists is $10 but voters register for free. 
          </p>
          <p className="z-20 mb-4 leading-8 lg:mb8">
          Your donation helps unite artists and athletes by reassuring them that their chaotic and divided world has hope.
          </p>

        </div>
      </article>

      <figure
        role="region"
        aria-label="Bicycle art"
        className="relative z-10 md:grid col-span-8 md:col-start-2 md:col-span-6 lg:col-span-5 xl:col-span-6 "
      >
        <div className="z-10 image-container">
          <Image className="m-auto" src={HeroHeader} alt=""/>
          <div className="text-right">
            Eric Liang, age 11, Illinois
          </div>
        </div>
      </figure>
    </section>
  );
};