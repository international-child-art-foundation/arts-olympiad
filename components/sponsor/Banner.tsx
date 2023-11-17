import Image from "next/image";
import icafLogo from "../../public/svgs/Icaf-logo.svg";
import orangeBlob from "../../public/svgs/sponsor-orangeblob.svg";
import greenBlob from "../../public/svgs/sponsor-greenblob.svg";

export const Banner = () => {
  return (
    <>
      <div className="relative mb-[400px] z-30 mt-20">
        <Image src={orangeBlob} alt="" width={442} height={417} className="absolute z-0 left-0 w-1/2 sm:w-1/3 mb-10" />
        <div className="absolute left-1/2  transform -translate-x-1/2 grid grid-cols-1 gap-y-6 lg:mt-20">
          <h2 className="text-center font-medium text-3xl">Contact Us</h2>
          <h3 className="text-center font-extralight text-lg leading-loose">Still have questions? Get in touch with us.</h3>    
          <a href="https://icaf.org/about/contact-us" className="mx-auto inline-flex w-fit h-fit bg-new-blue rounded text-center py-4 px-6 text-sm cursor-pointer tracking-wide text-neutral-white">Contact us here</a>
        </div>
        <Image src={greenBlob} alt="" width={442} height={417} className="absolute z-0 right-0 w-1/2 sm:w-1/3 mb-10 -top-20" />
      </div>
      
      <div className="relative bottom-0 z-30 bg-baby-blue w-full h-fit">
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:grid-rows-3">
          <div className="mx-auto mt-10 font-medium text-2xl md:text-3xl col-span-1 md:col-span-2 order-1 md:mx-5%">
            Want to get involved?
          </div>
          <div className="mx-5% font-thin text-lg order-2 col-span-1 md:col-span-2">
            All of ICAF’s programs, festivals, and exhibitions are offered free of charge and are made possible through the support of empathic donors and creative sponsors.
          </div>
          <Image src={icafLogo} alt="ICAF Logo." className="mx-auto my-auto w-1/2 h-fit order-3 md:w-11/12 md:order-1 md:col-start-3 md:col-end-3 md:row-span-3" />
          <a href="#" className="mb-10 mx-auto inline-flex w-fit h-fit bg-new-blue rounded text-center py-4 px-6 text-sm cursor-pointer tracking-wide text-neutral-white order-4 md:col-span-2 md:mx-5%">Learn more about becoming a sponsor</a>
        </div>
      </div>
    </>
  );
};

