import Image from "next/image";
import PastMobile from "../../public/sponsor/PastMobile.png"
import PastXL from "../../public/sponsor/PastXL.png"
import PastLeft from "../../public/sponsor/PastLeft.png"
import vector from "../../public/svgs/Vector.svg";

export const PastSponsor = () => {
  return (
    <>
        <div className="relative mt-40 mb-[1000px] grid grid-cols-2 z-20 m-auto  " >
            <div className="xsm:col-span-2 lg:col-span-1 xsm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl">
                <Image src={PastLeft} alt="" width={767} height={446} className="relative z-20 " />
            </div>
            <div className="relative xsm:col-span-2 lg:col-span-1 xsm:px-8 mt-20 md:px-12 lg:px-16 mt-0 xl:px-20 max-w-screen-2xl">
                <div className="relative z-20 m-auto">
                    <h2 className="font-medium text-3xl ">Past Sponsors and supporters</h2>
                    <h3 className="font-light text-lg leading-loose mt-5">Some of the world’s leading companies have worked with ICAF. 
Please browse this 16-page pdf (3-minutes). </h3> 
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-bold underline hover:underline hover:bg-gray-300 p-2 rounded inline-block">Download PDF</a>
                    <Image src={vector} alt="" width={10} height={10} className=" z-20  inline-block" />   
                </div>
                <div>
                    <Image src={PastMobile} alt="" width={767} height={446} className="absolute z-0 hidden xsm:block w-full right-0 lg:hidden" />
                    <Image src={PastXL} alt="" width={1536} height={432} className="absolute z-0 hidden 2xl:block top-20 right-0 w-full " />
                </div>
            </div> 
        </div>
    </>

  );
};