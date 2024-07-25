import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import impactHeader from "../../public/icaf-logo.webp";
import { TitleLayout } from "@/app/HeaderLayout";

export const ImpactBegin = () => {
  return (
    <>
      <section className="relative grid grid-cols-2 z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
        <div className="col-span-2 lg:col-span-1 md:mt-8 flex flex-col justify-center items-center lg:items-start">
          <TitleLayout>
            <h1 className="flex-col z-20 font-semibold mb-4 text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
              Impact of ICAF &
            </h1>
            <div className="z-20 flex flex-row align-center mb-8">
              <Image src={hashtag} alt="" width={32} height={32}  />
              <h1 className="z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
                MyFavoriteSports<span className="sr-only">.</span>
              </h1>
            </div>
          </TitleLayout>
          <div className="w-full mb-8 z-20">
            <h2 className="z-20 font-light text-xl w-full text-center lg:text-left lg:w-4/5">
              Grow your engagement through art and sports. 
            </h2>
          </div>
        </div>

        <div className="col-span-2 z-20 lg:col-span-1 w-fit  mx-auto justify-center lg:justify-end">            
          <Image src={impactHeader}  className="mx-auto w-fit sm:w-2/3 md:w-[90%]" alt="photo" />
        </div>

      </section>

    </>
  );
};