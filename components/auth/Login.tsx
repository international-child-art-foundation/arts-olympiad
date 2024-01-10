"use client";

import Image from "next/image";
import MFS_Logo from "../../public/MFS_Logo.svg";
import {LoginForm} from "./LoginForm";

export const Login = () => {

  return (
    <section
      className="w-full my-8 mb-24 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative max-w-screen-2xl m-auto"
    >
      <div className="flex flex-row justify-center lg:justify-between">
        <Image className="mx-auto h-fit hidden lg:block" width={500} src={MFS_Logo} alt="My favorite sport logo." />
        <LoginForm/>
      </div>
    </section>
  );
};