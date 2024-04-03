"use client";
import Image from "next/image";
import hashtag from "../../../public/home/hashtag.svg";

export const PastEntriesHeader= () => {
  return (
    <section className="relative flex scale-x-80 xsm:scale-x-100 justify-start xsm:justify-center mt-6 md:mt-20 max-h-[760px] bg-neutral-white m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
      <article className="relative z-20">
        <div className="z-20 mb-1 lg:mb-4 flex justify-start xsm:justify-center">
          <Image src={hashtag} alt="" width={32} height={32}  />
          <h1 className="z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl ">
              MyFavoriteSport<span className="sr-only">.</span>
          </h1>
        </div>

        <div className="z-20 relative">
          <h1 className="xsm:text-center z-20 font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl mb-7 sm:mb-6">
            Gallery of Past Entries
          </h1>
          <h3 className="mb-14 xsm:text-center z-20 text-base font-light lg:text-xl 2xl:font-semibold" >
            Take a look through our wonderful catalog of previous art submissions!
          </h3>
        </div>
      </article>
    </section>      
  );
};