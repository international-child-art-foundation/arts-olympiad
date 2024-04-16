import Image from "next/image";
import contest_heading from "../../public/contest/contest_heading.png";

export const ContestBegin = () => {
  return (
    <>
      <section className="relative grid grid-cols-2 z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="col-span-2 lg:col-span-1 md:mt-8">
          {/* <h1 className="flex-col z-20 font-semibold mb-4 text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl"> */}
          <h1 className="flex-col z-20 font-semibold mb-4 text-3xl xsm:text-4xl md:text-5xl xl:text-6xl">
          Create your masterpiece to show the world!
          </h1>
        </div>
        <div className="col-span-2 z-20 lg:col-span-1 ">            
          <Image src={contest_heading} width = {390} height = {271} className="sm:ml-0 lg:ml-0 w-full rounded-[225px] lg:rounded-[300px]" alt="photo" />
        </div>
      </section>
    </>
  ); 
};