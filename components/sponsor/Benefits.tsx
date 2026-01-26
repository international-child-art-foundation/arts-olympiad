import Image from "next/image";
import yellowBlob from "../../public/sponsor/YellowBlob.webp";
import React from "react";
import WCFLogo from "../../public/sponsor/250WCFLogo.webp";

export const Benefits = () => {
  return (
    <>
      <div className="relative mt-20">
        <section className=" relative grid grid-cols-2 z-20 m-auto max-w-screen-2xl p-8 md:px-12 lg:px-16 xl:px-20 ">
          <div className="relative col-span-2 lg:col-span-1">
            <Image
              src={yellowBlob}
              alt=""
              width={1536}
              height={432}
              className="absolute hidden select-none pointer-events-none lg:block lg:-top-20 lg:-left-20 xl:-left-40 -z-10 scale-150"
            />
            <Image
              src={WCFLogo}
              alt=""
              width={1000}
              height={432}
              className="2xl:block hidden lg:block -z-10 w-4/6 max-w-[1061px]"
            />
          </div>
          <div className="col-span-2 lg:col-span-1 xsm:mt-8 md:mt-8 2xl:mt-20">
            <h3 className="relative flex-col z-20 font-medium mb-4 text-3xl font-montserrat">
              This is what we do
            </h3>
            <div className="relative w-auto z-20">
              <ul className="z-20 font-light font-openSans text-lg list-disc list-inside">
                <li>
                  Produce the art contest on the favorite sports of 8- to
                  20-year-olds
                </li>
                <li>
                  Organize the 7th Arts Olympiad, a national and global school
                  art program
                </li>
                <li>
                  Bring creative children together at the National Mall for our
                  7th World Children's Festival
                </li>
                <li>
                  Celebrate America's 250th Anniversary at the 7th World
                  Children's Festival
                </li>
                <li>
                  Engage young artists worldwide in sports for better health
                </li>
                <li>
                  Promote five critical UN Social Development Goals: Good
                  Health, Quality Education, Gender Equality, Reduced
                  Inequities, and Peacebuilding in Communities and in the World.
                </li>
              </ul>
            </div>
          </div>
          <div className="relative col-span-2">
            {/* <Image
              src={yellowBlob}
              alt=""
              width={1536}
              height={432}
              className="absolute lg:hidden select-none pointer-events-none -left-36 -top-24 -z-10 md:-left-24 scale-100 md:scale-100"
            /> */}
            <Image
              src={WCFLogo}
              alt=""
              width={1536}
              height={432}
              className="relative lg:hidden -z-10 mx-auto w-1/2"
            />
          </div>
        </section>
      </div>
    </>
  );
};
