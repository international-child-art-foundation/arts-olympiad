import Image from "next/image";
import aboutHeaderImage from "../../public/about/about_header_image.png";
import headerLine from "../../public/about/header_line.png";

export const AboutHero = () => {
  return (
    <> 
      <section
        aria-label="hero."
        // className="overflow-visible grid grid-cols-2 md:flex-row justify-between mb-8 md:mb-36 mt-6 md:mt-20 max-h-[760px] relative px-8 md:px-12 lg:px-16 xl:px-20 w-full max-w-screen-2xl m-auto z-0"
        className="grid grid-cols-2 relative mb-40 w-full max-w-screen-2xl m-auto px-6 md:px-8 lg:px-16 xl:px-20"
      >
        <article role="banner" className="m-auto md:m-0 z-20 relative flex-col xsm:justify-center xsm:text-center lg:text-left lg:justify-left lg:mt-28 xsm:col-span-2 lg:col-span-1">
          <div className="flex flex-col justify-center items-centers">
            <h1 className=" max-w-full z-20 break-words font-montserrat font-semibold text-3xl xsm:text-center lg:text-left xsm:text-4xl lg:text-5xl xl:text-6xl ">
              About ICAF 
            
            </h1>
            <div className="w-full flex justify-center lg:justify-start xsm:scale-75 lg:scale-100">
              <Image src={headerLine} alt="" className="select-none pointer-events-none"></Image>
            </div>
          </div>
          <p className="md:w-full lg:w-3/4 mt-8 font-openSans font-regular">Incorporated in the District of Columbia as a 501(c)(3) nonprofit in April 1997, the International Child Art Foundation serves American children as their national arts organization and the world’s children as their global arts organization.</p>
        </article>
        <div className="flex xsm:justify-center lg:justify-end xsm:col-span-2 lg:col-span-1">
          <Image
            src={aboutHeaderImage}
            alt={"View over washington monument from side of capitolium "}
            // className="rounded-xl w-full h-full m-auto max-w-md md:max-w-fit md:ml-12 md:min-w-[30%]"
            className="select-none pointer-events-none xsm:w-2/3 md:w-1/2 lg:w-auto lg:h-auto mt-8 lg:object-center lg:w-44% lg:h-27%"
            // style={{boxShadow: "10px 10px 0px 8px #689576", borderRadius: "46%"}}
            // width={100}
            // height={100}
          />
        </div>
      </section>
    </>
  );
};