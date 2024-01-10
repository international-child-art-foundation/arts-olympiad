"use client";

import React, {useState} from "react";
import {Login} from "./Login";
import {RegisterForm} from "./RegisterForm";
import Image from "next/image";
import MFS_Logo from "../../public/MFS_Logo.svg";

export const Register = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);


  return (
    <section
      className="self-center my-8 mb-24 m-auto sm:px-8 md:px-12 lg:px-16 xl:px-20 relative max-w-screen-2xl m-auto"
    >
      {
        !isSubmitted ?
          <div className="flex flex-row justify-center lg:justify-between">
            <Image className="mx-auto h-fit hidden lg:block" width={500} src={MFS_Logo} alt="My favorite sport logo." />
            <RegisterForm setIsSubmitted={setIsSubmitted} />
          </div>
          :
          <Login />
      }
    </section>
  );
};
