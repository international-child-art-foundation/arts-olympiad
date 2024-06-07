import Image from "next/image";
import yellowBlob from "../../public/sponsor/YellowBlob.png";
import React from "react";
import HandsUp from "../../public/sponsor/HandsUp.webp";

export const Benefits = () => {
  return (
    <>
      <div className="relative mt-20">
        <section className=" relative grid grid-cols-2 z-20 m-auto max-w-screen-2xl p-8 md:px-12 lg:px-16 xl:px-20">  
          <div className="relative col-span-2 lg:col-span-1">
            <Image src={yellowBlob} alt="" width={1536} height={432} className="absolute hidden lg:block lg:-top-36 lg:-left-36 xl:-left-60 -z-10 scale-125" />
            <Image src={HandsUp} alt="" width={1536} height={432} className="absolute 2xl:block hidden lg:block top-10 -z-10 w-2/3 max-w-[1061px]" />
          </div>      
          <div className="col-span-2 lg:col-span-1 xsm:mt-8 md:mt-8 2xl:mt-20">           
            <h3 className="relative flex-col z-20 font-medium mb-4 text-3xl font-montserrat">
            This is what we do
            </h3>
            <div className="relative w-auto z-20">
              <h2 className="z-20 font-light font-openSans text-lg">
              Promote five critical UN Social Development Goals: Good Health, Quality Education, Gender Equality, Reduced Inequities, and Peacebuilding in Communities and the World.
              </h2>
            </div>
          </div>
          <div className="relative col-span-2">
            <Image src={yellowBlob} alt="" width={1536} height={432} className="absolute lg:hidden -top-10 -left-36 -z-10 md:-left-24 md:-top-36 scale-100 md:scale-100" />
            <Image src={HandsUp} alt="" width={1536} height={432} className="relative lg:hidden -z-10 w-2/3 my-12 mb-36 mx-auto scale-100 md:scale-100" />
          </div>
        </section>
      </div>   
    </>
  );
};
