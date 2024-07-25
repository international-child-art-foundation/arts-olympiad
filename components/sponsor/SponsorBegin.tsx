import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import HeroLogo from "../../public/MFS_Logo_V3.svg";
import { TitleLayout } from "@/app/HeaderLayout";

export const SponsorBegin = () => {
  return (
    <>
      <section className="relative grid grid-cols-2 z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
        <div className="col-span-2 lg:col-span-1 md:mt-8 flex flex-col justify-center items-center lg:items-start">
          <TitleLayout>
            <h1 className="flex-col z-20 font-semibold font-montserrat mb-1 text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
            Join the International Child Art Foundation in sponsoring
            </h1>
            <div className="z-20 flex flex-row align-center mb-8">
              <Image src={hashtag} alt="" width={32} height={32}  />
              <h1 className="z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
                MyFavoriteSport<span className="sr-only">.</span>
              </h1>
            </div>
          </TitleLayout>
        </div>

        <div className="col-span-2 z-20 lg:col-span-1 flex justify-center w-full lg:justify-end">            
          <Image src={HeroLogo}  className="hidden lg:block lg:w-1/2 2xl:w-1/3" alt="photo" />
        </div>

      </section>

    </>
  );
};