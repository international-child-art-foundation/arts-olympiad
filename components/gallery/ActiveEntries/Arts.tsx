"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useState } from "react";
import { saveAllUserOptions } from "./CheckBoxs";
import { artworks } from "../../../mock/artworks";
import { MenuIcon } from "../../../public/svgs/gallery-svg/MenuIcon";
import CheckBoxs from "./CheckBoxs";
import ArtworkCard from "../../../components/ArtworkCard";
import Pagination from "../../../components/pagination/Pagination";
import multiPic from "../../../public/svgs/gallery-svg/multiPic.svg";
import blueBlobs from "../../../public/svgs/gallery-svg/blueBlobs.svg";
import multiBlueblobs from "../../../public/svgs/gallery-svg/multiBlueblobs.svg";
import Image from "next/image";
import Filter from "./Filter";

function isArtworkAvailable(arr1?: string[], arr2?: string[]) {
  if (!arr1 || !arr2) {
    return true;
  }
  return arr1.some((item) => arr2?.includes(item));
}

export default function Arts() {
  const sortBy = [
    { name: "Oldest", number: 0 },
    { name: "Newest", number: 0 },
    { name: "Most Popular", number: 0 },
  ];

  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");
  const page = queryPage ? parseInt(queryPage) : 1;
  const artworksPerPage = 20;
  const startIndex = (page - 1) * artworksPerPage;
  const endIndex = startIndex + artworksPerPage;

  const [isDropdown, setIsDropdown] = useState(false);

  const paramsObj = saveAllUserOptions(searchParams);

  let filteredArts = artworks.filter((artwork) => {
    const hasSport = isArtworkAvailable(artwork.sport, paramsObj?.sport);

    const isLocationAvailable = isArtworkAvailable(artwork.country, paramsObj?.country);

    return isLocationAvailable && hasSport;
  });


  filteredArts = filteredArts.sort((artwork1, artwork2) => {
    switch (paramsObj?.sort?.[0]) {
    case "Oldest":
      return Date.parse(artwork1.uploadAt) - Date.parse(artwork2.uploadAt);
    case "Newest":
      return Date.parse(artwork2.uploadAt) - Date.parse(artwork1.uploadAt);
    case "Most Popular":
      return artwork2.votes - artwork1.votes;
    default:
      return 0;
    }
  });

  if (Object.keys(paramsObj).length === 0) {
    filteredArts = artworks;
  }

  const pageData = filteredArts.slice(startIndex, endIndex);

  return (
    <>

      <div className="relative px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto ">


        <div className="grid grid-cols-6">
          <button
            onClick={() => setIsDropdown(true)}
            className={`col-span-1 text-base font-medium w-fit h-fit px-5 py-2 border border-gray-600 rounded-md text-neutral-black text-center items-center inline-flex ${isDropdown ? "hidden" : "visible"}`}>
            Filter
            <span className="ml-6"><MenuIcon /></span>
          </button>
          <div className={` ${isDropdown ? "blur-lg" : ""} col-start-5 col-span-1 `} >
            <a href="/ActiveEntries/">
              <button className="px-5 py-2 text-black cursor-pointer font-semibold">
                Clear filters
              </button>
            </a>
          </div>
          <span className={` ${isDropdown ? "blur-lg" : ""} col-start-6 w-full col-span-1`}>
            <CheckBoxs
              id="sort"
              title="sort"
              type="radio"
              options={sortBy}
            />
          </span>
        </div>


        <section className={`-top-[122px] relative z-50 ${isDropdown ? "visible translate-y-[40px] ease-in-out duration-500" : "invisible -translate-y-[2px] ease-in-out duration-500"}`}>
          <div className="absolute z-50 flex-wrap w-full">
            <p className="font-normal text-4xl mb-10">Filter Stories</p>
            <button
              onClick={() => setIsDropdown(false)}
              className="text-base font-medium w-fit h-fit px-5 py-2 border border-gray-600 rounded-md text-neutral-black text-center items-center inline-flex">
              Hide Filter <span className="ml-6"><MenuIcon /></span>
            </button>
            <section className="relative max-w-screen-2xl m-auto mt-4">
              {isDropdown &&
                <Filter />
              }
            </section>
          </div>
        </section>

      </div>
      <section className={` ${isDropdown ? "blur-lg pointer-events-none" : ""} justify-center relative px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto z-0`}>

        <hr className="my-12 border-new-black border-t-0.5 w-full"></hr>

        <div className="">
          <Image src={blueBlobs} alt="" className="-z-10 absolute top-1/4 right-0" />
          <Image src={multiBlueblobs} alt="" className="-z-10 absolute top-1/4 left-0" />
          <div className="grid grid-cols-2 gap-x-2 gap-y-6 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-10">
            {pageData.map((artwork) =>
              <div className="flex h-full bg-neutral-white" key={artwork.id}>
                <ArtworkCard
                  id={artwork.id.toString()}
                  name={artwork.name}
                  votes={artwork.votes}
                  url={artwork.url}
                  country={artwork.country}
                  age={artwork.age}
                  sport={artwork.sport}
                />
              </div>
            )}
          </div>

          <Pagination
            totalItems={filteredArts.length}
            currentPage={page}
            renderPageLink={(page) => `/ActiveEntries/?page=${page}`}
            itemsPerPage={artworksPerPage}
          />
        </div>

      </section>

      <div className="justify-center relative px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto z-40">
        <Image src={multiPic} width={318} height={179} alt={multiPic} className="absolute transform -translate-y-[100px] md:-translate-y-[60px] mxl:-translate-y-[100px] 2xl:-translate-y-[30px] right-0 w-3/4 md:w-1/3 h-fit" />
      </div>
    </>
  );
};