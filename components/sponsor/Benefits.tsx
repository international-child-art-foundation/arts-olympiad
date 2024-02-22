import Image from "next/image";
import BenefitsMobile from "../../public/sponsor/BenefitsMobile.png";
import BenefitsIpadMini from "../../public/sponsor/BenefitsIpadMini.png";
import BenefitsTablet from "../../public/sponsor/BenefitsTablet.png";
import BenefitsLaptop from "../../public/sponsor/BenefitsLaptop.png";
import BenefitsXL from "../../public/sponsor/BenefitsXL.png";
import vector from "../../public/svgs/Vector.svg";
import BenefitsRight from "../../public/sponsor/BenefitsRight.png";

export const Benefits = () => {
  return (
    <>
      <div className="relative z-30 mt-20 grid grid-cols-2 m-auto">
        <Image src={BenefitsMobile} alt="" width={767} height={446} className="absolute z-10 sm:hidden -top-50 w-full " />
        <Image src={BenefitsIpadMini} alt="" width={1023} height={333} className="absolute -z-10 hidden sm:block lg:hidden w-full h-[400px] pb-10" />
        <Image src={BenefitsTablet} alt="" width={1279} height={377} className="absolute z-10 hidden lg:block xl:hidden left-0 w-2/3 h-[400px]" />
        <Image src={BenefitsLaptop} alt="" width={1536} height={432} className="absolute z-10 hidden xl:block 2xl:hidden left-0 w-2/3 h-[500px]" />
        <Image src={BenefitsXL} alt="" width={1062} height={432} className="absolute z-10 hidden 2xl:block -top-50 left-0 w-3/5 max-w-[1062px]" />
        {/* <Image src={BenefitsXL} className="absolute top-0 left-0 z-0 xsm:col-span-2 lg:col-span-1 w-2/3" alt=""></Image> */}
        <section className="z-20 xsm:col-span-2 lg:col-span-1 max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
          {/* <section className=" relative grid grid-cols-2 z-20 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20"> */}
          <div className="z-20 xsm:mt-20 md:mt-20 2xl:mt-20">
            <h3 className="relative flex-col z-20 font-semibold mb-4 text-2xl xsm:text-2xl lg:text-3xl xl:text-4xl">
                Sponsorship benefits
            </h3>
            <div className="relative w-auto mb-8 z-20">
              <h2 className="z-20 font-light text-lg lg:w-4/5 mxl:w-4/5">
                Employees and stakeholders participate while the company makes it mark on The National Mall across the U.S. Capitol. Please browse this 10-page pdf (2-minutes) 
              </h2>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-bold underline hover:underline hover:bg-gray-300 p-2 rounded inline-block">Download PDF</a>
            <Image src={vector} alt="" width={10} height={10} className=" inline-block" />
          </div>
        </section>
         
        <Image src={BenefitsRight} className="xsm:col-span-2 lg:col-span-1 z-20 w-full xl:w-full mt-10 max-w-screen-2xl px-8 md:pr-12 lg:pl-0 pr-16 xl:pl-0 pr-20" alt=""></Image>
        {/* </section> */}
      </div>
    
    </>
  );
};
