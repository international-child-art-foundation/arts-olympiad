import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import {LazyImage} from "../common/images/LazyImage";

export const AboutHero = () => {
  return (
    <>

      <section
        aria-label="hero."
        className="overflow-visible flex flex-col md:flex-row justify-between mb-8 md:mb-36 mt-6 md:mt-20 max-h-[760px] relative px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-screen-2xl m-auto z-0"
      >
        <article role="banner" className="m-auto md:m-0 z-20 relative flex-col align-middle md:col-span-2 ">
          <h1 className=" z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl ">
            About ICAF and
          </h1>
          <div className=" z-20 flex flex-row align-center mb-8">
            <Image src={hashtag} alt="" width={32} height={32}  />
            <h1 className=" z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl ">
              MyFavoriteSport<span className="sr-only">.</span>
            </h1>
          </div>
        </article>
        <LazyImage
          imageUrl="/about/washinton-monument-alley.webp"
          alt={"View over washington monument from side of capitolium "}
          className="md:ml-12 min-w-[30%] rounded-[45%]"
          style={{boxShadow: "10px 10px 0px 8px #689576"}}
          width={100}
          height={100}
        />

      </section>

      {/*<Image*/}
      {/*  src="/svgs/blobs/big-turquise-blob.svg" alt="" width={0} height={0}*/}
      {/*  className="w-full absolute -z-10 bottom-0 right-0 overflow-visible"*/}
      {/*/>*/}

    </>
  );
};