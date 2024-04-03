"use client";

import Image from "next/image";
import {useState} from "react";
import {SendResetLinkForm} from "./SendResetLinkForm";
import {ResetPasswordForm} from "./ResetPasswordForm";
import {ResetPasswordSuccess} from "./ResetPasswordSuccess";
import blueBigBlob from "../../public/auth/blobs/blue_big_blob.svg";
import pinkOutlinedBlob from "../../public/auth/blobs/pink_outlined_blob.svg";
import yellowOutlinedBlob from "../../public/auth/blobs/yellow_outlined_blob.svg";

export type TFormStatus = "send-link" | "link-sent" | "reset-form" | "success";

export const ResetPassword = () => {

  const [formStatus, setFormStatus] = useState<TFormStatus>("reset-form");

  const handleResetLinkSent = () => {
    setFormStatus("link-sent");
  };
  const handleSubmitResetForm = () => {
    setFormStatus("success");
  };

  return (
    <>
      <div className="relative">
        <section
          className="min-h-[650px] w-full my-20 mb-24 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative max-w-screen-2xl m-auto"
        >
          <div className="h-full flex flex-row justify-center items-center">
            <div className="my-auto max-w-[90%] sm:max-w-[60%] lg:max-w-[40%]">
              {
                formStatus === "send-link" || formStatus === "link-sent" ?
                  <SendResetLinkForm formStatus={formStatus} onSendResetLink={handleResetLinkSent} />
                  : formStatus === "reset-form" ?
                    <ResetPasswordForm onSubmitResetForm={handleSubmitResetForm} />
                    : formStatus === "success" &&
                <ResetPasswordSuccess />
              }
            </div>
          </div>
        </section>

        {/*  /!*Desktop blobs*!/*/}
        <Image src={blueBigBlob} alt="" width={800} className="hidden lg:block absolute -z-10 -left-64 -bottom-60" />
        <Image src={yellowOutlinedBlob} alt="" width={400} className="hidden lg:block absolute -z-20 -left-40 bottom-64" />
        <Image src={pinkOutlinedBlob} alt="" width={750} className="hidden lg:block absolute -z-10 -right-80 -bottom-80" />
        {/*  /!*Mobile blobs*!/*/}
        <Image src={yellowOutlinedBlob} alt="" width={500} className="block lg:hidden absolute -z-10 -left-72 -top-72" />
        <Image src={pinkOutlinedBlob} alt="" width={350} className="block lg:hidden absolute -z-10 -right-32 -bottom-40" />
      </div>
      {/*/!*Overheader blobs*!/*/}
    </>
  );
};