"use client";

import {RegisterForm} from "./RegisterForm";
import Image from "next/image";
import MFS_Logo from "../../public/MFS_Logo_V3.svg";

export const Register = () => {

  return (
    <section
      className="w-full my-8 mb-24 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative max-w-screen-2xl m-auto"
    >
      <div className="flex flex-row justify-center lg:justify-between">
        <Image className="mx-auto h-fit hidden lg:block" width={500} src={MFS_Logo} alt="My favorite sport logo." />
        <RegisterForm/>
      </div>
    </section>
  );
};
