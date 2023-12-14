"use client";
import {useState} from "react";
import {ContactFormBox} from "./ContactFormBox";
import {ContactConfirmation} from "./ContactConfirmation";
import Image from "next/image";

export const Contact = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <section
      className="self-center my-8 mx-4 lg:mx-12 xl:mx-20 md:my-20 xl:my-32 relative max-w-screen-2xl m-auto"
    >
      <Image src="/contact/yellow-outlined-blob.svg" alt="" width={452} height={1} className="hidden md:block absolute -top-28 -left-48 -z-10 " />
      <Image src="/contact/blue-outlined-blob.svg" alt="" width={447} height={1} className="hidden md:block absolute -bottom-28 -right-48 -z-10" />
      {
        !isSubmitted ?
          <ContactFormBox setIsSubmitted={setIsSubmitted}/>
          :
          <ContactConfirmation />
      }
    </section>
  );
};