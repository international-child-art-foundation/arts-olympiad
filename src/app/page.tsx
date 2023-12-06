import "../styles/home.css";
import "../styles/animated-arrows.css";
import { Metadata } from "next";
import { sharedOpenGraph } from "./shared-metadata";
import {Intro} from "../../components/home/Intro";
import {ImageCarousel} from "../../components/home/image-carousel/ImageCarousel";
import {artworks} from "../../mock/artworks";
import {GetInvolved} from "../../components/home/get-involved/GetInvolved";
import {AboutICAF} from "../../components/home/about/AboutICAF";
import {Guidelines} from "../../components/home/guidelines/Guidelines";
import {Timeline} from "../../components/home/timeline/Timeline";
import {Wisdom} from "../../components/home/wisdom/Wisdom";

import Image from "next/image";
import littleYellowBlob from "../../public/svgs/blobs/little-yellow-blob.svg";
import tinyYellowBlob from "../../public/svgs/blobs/tiny-yellow-blob.svg";
import tinyPinkBlob from "../../public/svgs/blobs/tiny-vertical-pink-blob.svg";
import bigPinkBlob from "../../public/svgs/blobs/vertical-big-pink-blob.svg";
import bigBlueBlob from "../../public/svgs/blobs/blue-leg-down-blob.svg";

export const metadata: Metadata = {
  title: "Home | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Home | My Favorite Sport",
  }
};

export default function Home() {
  return (
    <>
      <Intro />
      <ImageCarousel width={150} mdwidth={250} aria-label="list of olimpyad participants' artworks." images={artworks} />
      <GetInvolved />
      <AboutICAF />
      <Guidelines />
      <div className="relative">       
        <Image src={littleYellowBlob} alt="" className="-z-10 absolute top-96 -left-12 " />
        <Image src={tinyYellowBlob} alt="" className="hidden md:block z-20 absolute top-[368px] left-24 " />
        <Image src={tinyPinkBlob} alt="" className="hidden md:block -z-10 absolute top-[672px] right-44 " />
        <Image src={bigPinkBlob} alt="" className="-z-10 w-[300px] md:w-[500px] absolute top-[576px] -right-12 md:-right-44" />
        <Image src={bigBlueBlob} alt="" className="-z-10 w-[400px] md:w-[700px] absolute bottom-96 md:bottom-24 -left-12 md:-left-44" />
        <Timeline />
      </div>
      <Wisdom />

      {/*<div className="bg-main-yellow md:col-span-10 grid md:grid-cols-2 grid-cols-1">*/}
      {/*  /!* artist upload block *!/*/}
      {/*  <div className="bg-neutral-white col-span-1 rounded-2xl p-10 shadow-md items-center mt-10 mr-10 ml-10 mb-10 grid grid-rows-8">*/}
      {/*    <div className="row-span-1 text-center">*/}
      {/*      <h2 className="break-words font-semibold text-4xl md:pl-6 pt-2">*/}
      {/*        I am an Artist*/}
      {/*      </h2>*/}
      {/*      <div className="break-words text-xl pt-2">*/}
      {/*        10- to 20-year old*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="row-span-2 flex flex-col items-center mt-5">*/}
      {/*      <Image*/}
      {/*        src="/home/artist.png"*/}
      {/*        width={224}*/}
      {/*        height={224}*/}
      {/*        className="w-1/2 h-auto"*/}
      {/*        alt="Person doing gymnast pose"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="break-words text-center text-xl py-8 row-span-1">*/}
      {/*      Create / Upload / Share your masterpiece to get the votes to win the gold!*/}
      {/*    </div>*/}
      {/*    <div className="row-span-1 flex flex-col items-center">*/}
      {/*      <Link*/}
      {/*        href="https://artsolympiad.info/artwok_registration.php"*/}
      {/*        className="btn-primary row-span-1"*/}
      {/*        target="_blank"*/}
      {/*      >*/}
      {/*        Upload*/}
      {/*      </Link>*/}
      {/*    </div>*/}
      {/*    <div className="break-words text-center text-xl py-8 row-span-1">*/}
      {/*      Upload today and Share your work for maximum votes.*/}
      {/*    </div>*/}
      {/*    <div className="row-span-2">*/}
      {/*      <hr className="w-full border-t-2 border-gray-500 mx-4" />*/}
      {/*      <div className="break-words text-center text-xl py-8">*/}
      {/*        Upload Deadline is June 29, 2024*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  /!* voter block *!/*/}
      {/*  <div className="bg-neutral-white col-span-1 rounded-2xl p-10 shadow-md items-center mx-10 my-10 grid grid-rows-8">*/}
      {/*    <div className="row-span-1 text-center">*/}
      {/*      <h2 className="break-words font-semibold text-4xl md:pl-6 pt-2">*/}
      {/*          I want to be a Judge*/}
      {/*      </h2>*/}
      {/*      <div className="break-words text-xl pt-2">*/}
      {/*          10 or older*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="row-span-2 flex flex-col items-center">*/}
      {/*      <Image*/}
      {/*        src="/home/judge.png"*/}
      {/*        width={224}*/}
      {/*        height={224}*/}
      {/*        className="w-1/2 h-auto"*/}
      {/*        alt="A smiling judge with a curly mustache"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="break-words text-center text-xl pt-8 mb-6 md:mb-14 row-span-1">*/}
      {/*        Vote For Your Favorite Artwork.*/}
      {/*    </div>*/}
      {/*    <div className="row-span-1 flex flex-col items-center">*/}
      {/*      <Link */}
      {/*        href="https://artsolympiad.info/artwok_select.php"*/}
      {/*        className="btn-primary row-span-1"*/}
      {/*        target="_blank"*/}
      {/*      >*/}
      {/*        Vote*/}
      {/*      </Link>*/}
      {/*    </div>*/}
      {/*    <div className="break-words text-center text-xl pt-8 row-span-1">*/}
      {/*        You can vote only once, so Share with friends.*/}
      {/*    </div>*/}
      {/*    <div className="row-span-2 mt-10 pt-2">*/}
      {/*      <hr className="w-full border-t-2 border-gray-500 mx-4" />*/}
      {/*      <div className="break-words text-center text-xl pt-8 pb-7">*/}
      {/*          Vote Deadline is June 29, 2024*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*/!* gallery search block *!/*/}
      {/*<div className="bg-neutral-white col-span-1 md:col-span-10 flex flex-col items-center mt-10 mr-10 ml-10 mb-10">*/}
      {/*  <h2 className="break-words font-semibold text-4xl">*/}
      {/*    #MyFavoriteSport*/}
      {/*  </h2>*/}
      {/*  <div className="break-words text-center text-xl pt-8 pb-8">*/}
      {/*    Search the gallery for amazing works from around the world.*/}
      {/*  </div>*/}
      {/*  <Image*/}
      {/*    src="/home/swim.svg"*/}
      {/*    width={386}*/}
      {/*    height={244}*/}
      {/*    className="h-auto sm:w-2/5 w-4/5 pt-10"*/}
      {/*    alt="A swimmer doing a butterfly stroke"*/}
      {/*  />*/}
      {/*  <Link */}
      {/*    href="/gallery"*/}
      {/*    className="btn-primary mt-10"*/}
      {/*  >*/}
      {/*    Explore*/}
      {/*  </Link>*/}
      {/*</div>*/}
      {/*/!* 2024 arts olympiad introduction *!/*/}
      {/*/!* - logo and text - *!/*/}
      {/*<div className="flex flex-col md:flex-row justify-left bg-secondary-blue col-span-1 md:col-span-10">*/}
      {/*  <Image*/}
      {/*    src="/home/torch-logo.svg"*/}
      {/*    width={151}*/}
      {/*    height={139}*/}
      {/*    className="md:mt-16 md:ml-20 md:mb-10 md:col-span-2 col-span-1 justify-self-left ml-5 my-5"*/}
      {/*    alt="2024 olympics torch ablaze"*/}
      {/*  />*/}
      {/*  <div className="text-left text-xl ml-5 md:w-2/5 md:mt-36 md:mb-10 break-words md:col-span-5 md:ml-20">*/}
      {/*    An interactive exhibition in Paris to celebrate Creativity, Diversity, and Unity.*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="col-span-1 md:col-span-10 flex justify-center bg-secondary-blue pt-10 md:pt-0">*/}
      {/*  <div className="md:w-4/5 flex flex-col md:flex-row">*/}
      {/*    <div className="md:w-1/3 bg-neutral-white rounded-r-[6rem] rounded-l-[2rem] md:rounded-2xl p-7 mb-6 md:mb-0 mx-5 shadow-md flex flex-row md:flex-col items-center">*/}
      {/*      <Image*/}
      {/*        src="/home/icon1.png"*/}
      {/*        width={86}*/}
      {/*        height={86}*/}
      {/*        className="hidden md:block md:mt-3"*/}
      {/*        alt="Painting panel with mixed paints"*/}
      {/*      />*/}
      {/*      <div className="break-words text-base md:text-center text-start md:pt-7 md:px-0">*/}
      {/*        Visitors ages 10 to 20 Create, Upload, and Share their masterpieces to win the Gold!*/}
      {/*      </div>*/}
      {/*      <Image*/}
      {/*        src="/home/icon1.png"*/}
      {/*        width={86}*/}
      {/*        height={86}*/}
      {/*        className="block md:hidden"*/}
      {/*        alt="Painting panel with mixed paints"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="md:w-1/3 bg-neutral-white rounded-l-[6rem] rounded-r-[2rem] md:rounded-2xl p-7 mb-6 md:mb-0 mx-5 shadow-md flex flex-row md:flex-col items-center">*/}
      {/*      <Image*/}
      {/*        src="/home/icon2.png"*/}
      {/*        width={86}*/}
      {/*        height={86}*/}
      {/*        className="md:mt-3"*/}
      {/*        alt="Written document with a checkmark"*/}
      {/*      />*/}
      {/*      <div className="break-words text-base md:text-center text-start md:pt-7 md:px-0">*/}
      {/*        Visitors vote for their favorite artwork.*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="md:w-1/3 bg-neutral-white rounded-r-[6rem] rounded-l-[2rem] md:rounded-2xl p-7 mb-6 md:mb-0 mx-5 shadow-md flex flex-row md:flex-col items-center">*/}
      {/*      <Image*/}
      {/*        src="/home/icon3.png"*/}
      {/*        width={86}*/}
      {/*        height={86}*/}
      {/*        className="hidden md:block md:mt-3"*/}
      {/*        alt="Image of a person with a globe as their head"*/}
      {/*      />*/}
      {/*      <div className="break-words text-base md:text-center text-start md:pt-7 md:px-0">*/}
      {/*        #MyFavoriteSport contest will spread across Europe and the world from Paris.*/}
      {/*      </div>*/}
      {/*      <Image*/}
      {/*        src="/home/icon3.png"*/}
      {/*        width={86}*/}
      {/*        height={86}*/}
      {/*        className="block md:hidden"*/}
      {/*        alt="Image of a person with a globe as their head"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="col-span-1 md:col-span-10 flex justify-center bg-secondary-blue pt-2 md:pt-8 md:pb-10">*/}
      {/*  <div className="md:w-3/5 flex flex-col md:flex-row">*/}
      {/*    <div className="md:w-1/2 bg-neutral-white rounded-l-[4rem] rounded-r-[2rem] md:rounded-2xl p-7 mb-6 md:mb-0 mx-5 shadow-md flex flex-row md:flex-col items-center">*/}
      {/*      <Image*/}
      {/*        src="/home/icon4.png"*/}
      {/*        width={86}*/}
      {/*        height={86}*/}
      {/*        className="md:mt-3"*/}
      {/*        alt="Lightbulb with the words 'world childrens festiaval inside' "*/}
      {/*      />*/}
      {/*      <div className="break-words text-base md:text-center text-start md:pt-7 md:px-0">*/}
      {/*        The gold, silver, and bronze winners and the prizes they receive will be announced at the <Link href="https://worldchildrensfestival.org/" target="_blank" className="underline">7th World Children's Festival</Link> on July 1, 2024 at the National Mall across the U.S. Capitol.*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="md:w-1/2 bg-neutral-white rounded-r-[6rem] rounded-l-[2rem] md:rounded-2xl p-7 mb-6 md:mb-0 mx-5 shadow-md flex flex-row md:flex-col items-center">*/}
      {/*      <Image*/}
      {/*        src="/home/icon5.png"*/}
      {/*        width={86}*/}
      {/*        height={86}*/}
      {/*        className="hidden md:block md:mt-3"*/}
      {/*        alt="A hand holding the earth as a globe"*/}
      {/*      />*/}
      {/*      <div className="break-words text-base md:text-center text-start md:pt-7 md:px-0">*/}
      {/*        The Arts Olympiad venue in Paris and the prizes for the Gold, Silver, and Bronze winners will be posted here in December 2023.*/}
      {/*      </div>*/}
      {/*      <Image*/}
      {/*        src="/home/icon5.png"*/}
      {/*        width={86}*/}
      {/*        height={86}*/}
      {/*        className="block md:hidden"*/}
      {/*        alt="A hand holding the earth as a globe"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*  */}
      
      {/*/!* Sponsors *!/*/}
      {/*/!* Sponsor Title *!/*/}
      {/*<div className="bg-main-yellow col-span-1 md:col-span-10 flex flex-row">*/}
      {/*  <div className="w-full mt-10 mb-10 ml-5 md:ml-10 md:ml-20 md:mt-20">*/}
      {/*    <h2 className="break-words font-semibold text-4xl">*/}
      {/*      Sponsors*/}
      {/*    </h2>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*/!* 3 white blocks *!/*/}
      {/*<div className="bg-main-yellow col-span-1 md:col-span-10 grid grid-cols-12">*/}
      {/*  <div className="col-span-5 flex flex-col items-center bg-neutral-white rounded-2xl ml-5 md:ml-20 mr-5 mb-10">*/}
      {/*    <h3 className="break-words font-semibold text-xl md:text-3xl text-main-gold mt-10 mb-5">*/}
      {/*      Gold*/}
      {/*    </h3>*/}
      {/*    <hr className="w-11/12 border-t-2 border-gray-500 mb-10 ml-5 mr-5" />*/}
      {/*    <div className="flex flex-col justify-evenly md:mx-2 md:flex-row items-center mb-8">*/}
      {/*      <Image*/}
      {/*        width={163}*/}
      {/*        height={76}*/}
      {/*        src="icaf-logo-transparent.svg"*/}
      {/*        alt="ICAF logo"*/}
      {/*        className="w-5/6 md:w-1/4 mb-4 md:mb-0"*/}
      {/*      />*/}
      {/*      <Image*/}
      {/*        width={163}*/}
      {/*        height={76}*/}
      {/*        src="icaf-logo-transparent.svg"*/}
      {/*        alt="ICAF logo"*/}
      {/*        className="w-5/6 md:w-1/4 mb-4 md:mb-0"*/}
      {/*      />*/}
      {/*      <Image*/}
      {/*        width={163}*/}
      {/*        height={76}*/}
      {/*        src="icaf-logo-transparent.svg"*/}
      {/*        alt="ICAF logo"*/}
      {/*        className="md:w-1/4 w-5/6 md:mb-0"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="col-span-4 flex flex-col items-center bg-neutral-white rounded-2xl mr-5 mb-10">*/}
      {/*    <h3 className="break-words font-semibold text-xl md:text-3xl text-main-silver mt-10 mb-5">*/}
      {/*      Silver*/}
      {/*    </h3>*/}
      {/*    <hr className="w-11/12 border-t-2 border-gray-500 mb-10 ml-5 mr-5" />*/}
      {/*    <div className="flex flex-col justify-evenly md:mx-2 md:mt-2 md:flex-row items-center">*/}
      {/*      <Image*/}
      {/*        width={163}*/}
      {/*        height={76}*/}
      {/*        src="icaf-logo-transparent.svg"*/}
      {/*        alt="ICAF logo"*/}
      {/*        className="md:w-1/5 w-4/5 mb-6 md:mb-0"*/}
      {/*      />*/}
      {/*      <Image*/}
      {/*        width={163}*/}
      {/*        height={76}*/}
      {/*        src="icaf-logo-transparent.svg"*/}
      {/*        alt="ICAF logo"*/}
      {/*        className="md:w-1/5 w-4/5 mb-6 md:mb-0"*/}
      {/*      />*/}
      {/*      <Image*/}
      {/*        width={163}*/}
      {/*        height={76}*/}
      {/*        src="icaf-logo-transparent.svg"*/}
      {/*        alt="ICAF logo"*/}
      {/*        className="md:w-1/5 w-4/5"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="col-span-3 flex flex-col items-center bg-neutral-white rounded-2xl mr-5 md:mr-20 mb-10">*/}
      {/*    <h3 className="break-words font-semibold text-xl md:text-3xl text-main-bronze mt-10 mb-5">*/}
      {/*      Bronze*/}
      {/*    </h3>*/}
      {/*    <hr className="w-11/12 border-t-2 border-gray-500 mb-10 ml-5 mr-5" />*/}
      {/*    <div className="flex flex-col flex-wrap justify-evenly md:flex-row md:mt-3">*/}
      {/*      <Image*/}
      {/*        width={163}*/}
      {/*        height={76}*/}
      {/*        src="icaf-logo-transparent.svg"*/}
      {/*        alt="ICAF logo"*/}
      {/*        className="ml-2 md:ml-0 w-3/4 md:w-1/6 mb-10 md:mb-0"*/}
      {/*      />*/}
      {/*      <Image*/}
      {/*        width={163}*/}
      {/*        height={76}*/}
      {/*        src="icaf-logo-transparent.svg"*/}
      {/*        alt="ICAF logo"*/}
      {/*        className="ml-2 md:ml-0 w-3/4 md:w-1/6 mb-10 md:mb-0"*/}
      {/*      />*/}
      {/*      <Image*/}
      {/*        width={163}*/}
      {/*        height={76}*/}
      {/*        src="icaf-logo-transparent.svg"*/}
      {/*        alt="ICAF logo"*/}
      {/*        className="ml-2 md:ml-0 w-3/4 md:w-1/6"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
