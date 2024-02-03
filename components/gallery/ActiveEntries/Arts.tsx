"use client";
import { useSearchParams } from "next/navigation";
import { artworks } from "../../../mock/artworks";
import Pagination from "../../../components/pagination/Pagination";
import ArtworkCard from "../../../components/ArtworkCard";
import multiPic from "../../../public/svgs/gallery-svg/multiPic.svg";
import Image from "next/image";
import blueBlobs from "../../../public/svgs/gallery-svg/blueBlobs.svg";
import multiBlueblobs from "../../../public/svgs/gallery-svg/multiBlueblobs.svg";

export default function Arts () {
  const searchParams = useSearchParams();
  const queryPage = searchParams.get("page");
  const page = queryPage ? parseInt(queryPage) : 1;

  const artworksPerPage = 20;
  const startIndex = (page - 1) * artworksPerPage;
  const endIndex = startIndex + artworksPerPage;

  const pageData = artworks.slice(startIndex, endIndex);


  return (
    <>
      <section className="justify-center relative px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto z-0 ">
        <hr className="my-12 border-new-black border-t-0.5 w-full"></hr>
        <div className="">
          <Image src={blueBlobs} alt="" className="-z-10 absolute top-1/4 right-0" />
          <Image src={multiBlueblobs} alt="" className="-z-10 absolute top-1/4 left-0" />
          <div className="grid grid-cols-2 gap-x-2 gap-y-6 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-10">
            {pageData.map((artwork) =>
              <div className="h-full bg-neutral-white" key={artwork.id}>
                <ArtworkCard
                  id={artwork.id.toString()}
                  name={artwork.name}
                  votes={artwork.votes}
                  url={artwork.url}
                  country={artwork.country}
                  age={artwork.age}
                />
              </div>
            )}
          </div>
          <Pagination
            totalItems={artworks.length}
            currentPage={page}
            renderPageLink={(page) => `/ActiveEntries/?page=${page}`}
            itemsPerPage={artworksPerPage}
          />
        </div>

      </section>

      <div className="justify-center relative px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto z-40">      
        <Image src={multiPic} width = {318} height = {179} alt={multiPic} className="absolute transform -translate-y-[100px] md:-translate-y-[60px] mxl:-translate-y-[100px] 2xl:-translate-y-[30px] right-0 w-3/4 md:w-1/3 h-fit" />
      </div>
    </>
  );
}