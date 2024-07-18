"use client";

import Image from "next/image";
import { useState } from "react";
import { SendResetCodeForm } from "./SendResetCodeForm";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { ResetPasswordSuccess } from "./ResetPasswordSuccess";
import blueBigBlob from "../../public/auth/blobs/blue_big_blob.svg";
import pinkOutlinedBlob from "../../public/auth/blobs/pink_outlined_blob.svg";
import yellowOutlinedBlob from "../../public/auth/blobs/yellow_outlined_blob.svg";
import { sendForgotPasswordEmail } from "@/utils/api-user";
import { ConfirmForgotPasswordInterface } from "@/interfaces/user_auth";
import { confirmForgotPassword } from "@/utils/api-user";
import { ResetPasswordFail } from "./ResetPasswordFormFail";


export type TFormStatus = "send-code" | "code-sent" | "reset-form" | "success" | "fail";

export const ResetPassword = () => {
  const [formStatus, setFormStatus] = useState<TFormStatus>("send-code");
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");

  const handleResetCodeSent = (sentEmail: string) => {
    sendForgotPasswordEmail({email: sentEmail});
    setEmail(sentEmail);
    setFormStatus("code-sent");
  };

  const handleCodeVerified = (code: string) => {
    setResetCode(code);
    setFormStatus("reset-form");
  };

  const handleSubmitResetForm = async (forgotPasswordValues: ConfirmForgotPasswordInterface) => {
    try {
      const forgotPasswordResult = await confirmForgotPassword(forgotPasswordValues);
      if (forgotPasswordResult.success) {
        setFormStatus("success");
      } else {
        setFormStatus("fail");
      }
    } catch(error) {
      console.log(error);
      setFormStatus("fail");
    }
  };

  return (
    <>
      <div className="relative">
        <section className="min-h-[650px] w-full my-20 mb-24 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative max-w-screen-2xl m-auto">
          <div className="h-full flex flex-row justify-center items-center">
            <div className="my-auto max-w-[90%] sm:max-w-[60%] lg:max-w-[40%]">
              {formStatus === "send-code" || formStatus === "code-sent" ? (
                <SendResetCodeForm
                  formStatus={formStatus}
                  onSendResetCode={handleResetCodeSent}
                  onCodeVerified={handleCodeVerified}
                  email={email}
                />
              ) : formStatus === "reset-form" ? (
                <ResetPasswordForm
                  onSubmitResetForm={handleSubmitResetForm}
                  email={email}
                  resetCode={resetCode}
                />
              ) : (
                formStatus === "success" && <ResetPasswordSuccess /> || 
                formStatus === "fail" && <ResetPasswordFail />
              )}
            </div>
          </div>
        </section>

        {/* Desktop blobs */}
        <Image src={blueBigBlob} alt="" width={800} className="hidden lg:block absolute -z-10 -left-64 -bottom-60" />
        <Image src={yellowOutlinedBlob} alt="" width={400} className="hidden lg:block absolute -z-20 -left-40 bottom-64" />
        <Image src={pinkOutlinedBlob} alt="" width={750} className="hidden lg:block absolute -z-10 -right-80 -bottom-80" />
        {/* Mobile blobs */}
        <Image src={yellowOutlinedBlob} alt="" width={500} className="block lg:hidden absolute -z-10 -left-72 -top-72" />
        <Image src={pinkOutlinedBlob} alt="" width={350} className="block lg:hidden absolute -z-10 -right-32 -bottom-40" />
      </div>
    </>
  );
};