"use client";

import Image from "next/image";
import {LoginForm} from "./LoginForm";
import BlueBlob from "../../public/auth/blobs/blue_blob.webp";
import BlueSmallBlob from "../../public/auth/blobs/blue_small_blob.svg";
import GreenBlob from "../../public/auth/blobs/green_blob.svg";
import PinkBlob from "../../public/auth/blobs/pink_blob.webp";
import PinkMobileBlob from "../../public/auth/blobs/pink_mobile_blob.svg";
import YellowBlob from "../../public/auth/blobs/yellow_blob.webp";
import useWindowDimensions from "@/hooks/useWindowDimensions";

export const Login = () => {

  const {windowWidth} = useWindowDimensions();

  return (
    <>
      <div className="relative">
        <section
          className="w-full my-8 mb-24 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative max-w-screen-2xl m-auto"
        >
          <div className="flex flex-row justify-center lg:justify-end">
            <LoginForm/>
          </div>
        </section>

        {/*Desktop blobs*/}
        <Image src={YellowBlob} alt="" width={712} className="hidden lg:block absolute -z-10 -left-64 -bottom-80" />
        <Image src={PinkBlob} alt="" width={400} className="hidden lg:block absolute -z-10 left-72 bottom-24" />
        <Image src={BlueSmallBlob} alt="" width={298} className="hidden lg:block absolute -z-10 -right-32 -bottom-20" />
        {/*Mobile blobs*/}
        <Image src={PinkMobileBlob} alt="" width={426} className="xsm:hidden absolute -z-10 -right-48 top-32" />
        <Image src={BlueSmallBlob} alt="" width={298} className="lg:hidden absolute -z-10 -right-32 -bottom-0" />
      </div>


      {/*Overheader blobs*/}
      <Image src={BlueBlob} alt="" width={ windowWidth >= 1280 ? 760 : 680} className="hidden lg:block absolute -z-10 left-0 -top-20" />
      <Image src={GreenBlob} alt="" width={264} className="hidden lg:block absolute -z-10 -left-32 top-80" />
      <Image src={GreenBlob} alt="" width={windowWidth >= 640 ? 285 : 184} className="lg:hidden absolute -z-10 -left-24 -top-0" />
    </>
  );
};