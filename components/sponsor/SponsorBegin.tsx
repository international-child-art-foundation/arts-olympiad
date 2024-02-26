import Image from "next/image";
import HeartEarth from "../../public/sponsor/HeartEarth.webp";

export const SponsorBegin = () => {
  return (
    <>
      <section className="relative grid grid-cols-2 z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="col-span-2 lg:col-span-1 md:mt-8 max-w-[500px] lg:max-w-[unset] col-span-2 m-auto">
          <h1 className="flex-col z-20 font-semibold mb-6 text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl text-center lg:text-left font-montserrat">
            Sponsor
          </h1>
          <div className="w-auto mb-8 z-20">
            <h2 className="z-20 font-regular text-lg sm:w-full lg:w-4/5 leading-8 ">
              A global emotional branding opportunity to win over young hearts and minds and grow lifelong customers or audiences.
            </h2>
          </div>
        </div>
        <div className="col-span-2 z-20 lg:col-span-1 flex">            
          <Image src={HeartEarth} width = {380} height = {323} className=" w-2/3 lg:w-5/6 max-w-[480px] select-none pointer-events-none m-auto lg:ml-auto lg:m-[unset]" alt=""/>
        </div>
      </section>
    </>
  );
};