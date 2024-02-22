import Image from "next/image";

export const SponsorBegin = () => {
  return (
    <>
      <section className="relative grid grid-cols-2 z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="col-span-2 lg:col-span-1 md:mt-8">
          <h1 className="flex-col z-20 font-semibold mb-4 text-3xl xsm:text-center text-4xl lg:text-5xl lg:text-left xl:text-6xl">
            Sponsor
          </h1>
          <div className="w-auto mb-8 z-20">
            <h2 className="z-20 font-light text-lg  sm:w-full lg:w-4/5">
              A global emotional branding opportunity to win over young hearts and minds and grow lifelong customers or audiences.
            </h2>
          </div>
        </div>
        <div className="col-span-1 z-20 justify-end xsm:col-span-2 flex justify-center lg:col-span-1 justify-end">            
          <Image src="/sponsor/heart_earth_combination.svg" width = {380} height = {323} className="xsm:w-full md:w-3/4 lg:ml-0 w-2/3" alt=""/>
        </div>
      </section>
    </>
  );
};