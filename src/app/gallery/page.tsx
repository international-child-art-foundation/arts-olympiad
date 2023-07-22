"use client";
import Image from "next/image";
import Pagination from "../../../components/pagination/Pagination";
import ArtworkCard from "../../../components/ArtworkCard";
import gallery_image from "../../../public/gallery/gallery_image.svg";
// eslint-disable-next-line
import { useSearchParams } from "next/navigation";
import { artworks } from "../../../mock/artworks.js";


// the disable lint rule is because lint not interpreting useSearchParams as a react hook -> nextJS client component hook

export default  function page() {
  // eslint-disable-next-line
  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");
  const page = queryPage ? parseInt(queryPage) : 1;
  
  const artworksPerPage = 16;
  const startIndex = (page - 1) * artworksPerPage;
  const endIndex = startIndex + artworksPerPage;
  
  const total = 30;
  const pageData = artworks.slice(startIndex, endIndex);
  

  return (
    <div>
      {/* yellow container */}
      <div className="flex justify-between items-center md:flex-col py-10 px-5 bg-main-yellow">
        <div className="text-left md:text-center">
          <h1 className="font-bold text-4xl">Gallery</h1>
          <p className="font-medium md:font-semi-bold text-lg">You can vote only once, so share with friends.</p>
          <p className="font-medium md:font-semi-bold text-lg">Vote until <span className="font-extrabold"> June 29, 2014 </span> (12:00) midnight EST </p>
        </div>
        {/* image container */}
        <div className="text-left md:py-5">
          <Image src={gallery_image} alt="Previous artwork submission" />
        </div>
      </div>
      {/* search container */}
      <div className="bg-neutral-white md:bg-main-yellow pt-6 md:pt-0 pb-10 px-5">
        <div className=" mx-auto max-w-4xl">
          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="w-full">
                <input type="text" id="firstName" name="firstName" placeholder="First Name" className="w-full border border-main-blue border-2 rounded-lg py-2 px-4" />
              </div>
              <div className="w-full">
                <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="w-full border border-main-blue border-2 rounded-lg py-2 px-4" />
              </div>
            </div>
            <div className="w-full">
              <input type="number" id="age" name="age" placeholder="Age" className="w-full border border-main-blue border-2 rounded-lg py-2 px-4" />
            </div>
            <div className="flex gap-4">
              <div className="w-full">
                <input type="text" id="country" name="country" placeholder="Country" className="w-full border border-main-blue border-2 rounded-lg py-2 px-4" />
              </div>
              <div className="w-full">
                <input type="text" id="city" name="city" placeholder="City" className="w-full border border-main-blue border-2 rounded-lg py-2 px-4" />
              </div>
            </div>
            <button type="submit" className="w-full bg-main-blue text-white py-2 px-4 rounded-lg">Search</button>
          </form>
        </div>
      </div>
      {/* filter toggle */}
      <div className="flex justify-between bg-neutral-white px-5 py-5 lg:px-20">
        <p>search by time</p>
        <img src="/gallery/filter-icon.svg" alt="filter gallery" /> 
      </div>
      {/* image container */}
      <div className="bg-neutral-white px-5 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4">
          {pageData.map((artwork) =>
            <div key={artwork.id}>
              <ArtworkCard
                id={artwork.id.toString()}
                name={artwork.name}
                votes={artwork.votes}
                url={artwork.url}
              />
            </div>
          )}
        </div>
        <Pagination
          totalItems={total}
          currentPage={page}
          renderPageLink={(page) => `/gallery/?page=${page}`}
        />
      </div>
    </div>
  );
}