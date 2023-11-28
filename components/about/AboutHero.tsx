import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";

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
        <Image
          src="about_header_image.webp"
          alt={"View over washington monument from side of capitolium "}
          className="rounded-xl w-full h-full m-auto max-w-md md:max-w-fit md:ml-12 md:min-w-[30%]"
          // style={{boxShadow: "10px 10px 0px 8px #689576", borderRadius: "46%"}}
          width={100}
          height={100}
        />

      </section>

      <Image src="/svgs/blobs/hero-green-blob-minitablet.svg" alt="" width={1279} height={377} className="absolute -z-10 sm:block lg:hidden -top-32 w-full h-full" />
      <Image src="/svgs/blobs/hero-green-blob.svg" alt="" width={1279} height={377} className="absolute -z-10 hidden lg:block xl:hidden -top-32 w-full h-full" />
      <Image src="/svgs/blobs/hero-green-blob.svg" alt="" width={1536} height={432} className="absolute -z-10 hidden xl:block 2xl:hidden -top-32 w-full h-[1000px]" />
      <Image src="/svgs/blobs/hero-green-blob.svg" alt="" width={1536} height={432} className="absolute -z-10 hidden 2xl:block -top-32 right-0 w-full h-full mxl:h-[1000px]" />

    </>
  );
};