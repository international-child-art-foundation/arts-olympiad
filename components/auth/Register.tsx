"use client";

import {RegisterForm} from "./RegisterForm";
import Image from "next/image";
import MFS_Logo from "../../public/MFS_Logo_V3.svg";
import { useState } from "react";
import { VerificationModal } from "./VerificationModal";
import {Form, Formik} from "formik";
import { VerificationCodeInterface } from "@/interfaces/user_auth";
import { handleVerify } from "@/utils/api-user";
import * as Yup from "yup";
import { TextInput } from "../common/form_inputs/TextInput";
import { ButtonStd } from "../common/ui/ButtonStd";
import LoadingAnimation from "../svgs/LoadingAnimation";
import Bottleneck from "bottleneck";
import {useRouter} from "next/navigation";
import { expensiveActionLimiter } from "@/utils/api-rate-limit";
import { resendVerificationEmail } from "@/utils/api-user";

export const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [resendCodeButtonActive, setResendCodeButtonActive] = useState(true);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(true);
  const [resendTimeout, setResendTimeout] = useState(60000); // initial 1 minute in milliseconds
  const maxTimeout = 900000; // 15 minutes in milliseconds
  const [codeResentTracker, setCodeResentTracker] = useState(0);

  const router = useRouter();
  
  const verificationInitialValues: VerificationCodeInterface = {
    email: "",
    verificationCode: "",
  };
  const verificationValidationSchema = Yup.object().shape({
    verificationCode: Yup.string()
      .matches(/^[0-9]{6}$/, "Verification code must be exactly 6 digits and contain only numbers")
      .required("Verification code is required")
  });
  const [verificationSubmissionLoading, setVerificationSubmissionLoading] = useState(false);
  const verificationSubmit = async (values: VerificationCodeInterface) => {
    setApiError("");
    setVerificationSubmissionLoading(true);
    values.email = userEmail;
    if (values.email == "") {
      console.log("Email missing");
      setVerificationSubmissionLoading(false);
      setApiError("An error has occurred. Try reloading the page.");
      return;
    }
    try {
      const result = await expensiveActionLimiter.schedule(() => handleVerify({
        email: values.email,
        verificationCode: values.verificationCode
      } as VerificationCodeInterface));
      if (result.success) {
        router.push("/login");
      } else {
        setApiError("An error has occurred. Try reloading the page.");
      }
    } catch(error) {
      if (error instanceof Bottleneck.BottleneckError) {
        setApiError("Error: Rate limit reached.");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    }  
    setVerificationSubmissionLoading(false);
  };

  async function handleResendCode() {
    const args = { email: userEmail };
    setResendCodeButtonActive(false);
    setCodeResentTracker((prevCount) => prevCount + 1);
  
    await expensiveActionLimiter.schedule(() => resendVerificationEmail(args));
  
    // Set timeout to enable the button again after `resendTimeout` duration
    setTimeout(() => {
      setResendCodeButtonActive(true);
    }, resendTimeout);
  
    // Increase the timeout progressively, but not beyond maxTimeout
    setResendTimeout((prevTimeout) => {
      const newTimeout = prevTimeout * 2;
      return newTimeout > maxTimeout ? maxTimeout : newTimeout;
    });
  }
  
  
  return (
    <>
      {registerSuccess && 
        <VerificationModal isModalOpen={isVerificationModalOpen} setIsModalOpen={setIsVerificationModalOpen}>
          <div className="p-6">
            <p className="font-bold text-2xl text-center mb-4">
              Verify your email address
            </p>
            <p>
              We've sent a six-digit code to <b>{userEmail}</b>.
            </p>
            <p>
              Make sure to check your spam folder.
            </p>
            <div className="grid grid-cols-1 grid-rows-1">
              {verificationSubmissionLoading && <div className="col-start-1 row-start-1">
                <LoadingAnimation scale={100} stroke={2}/>
              </div>
              }
              <Formik
                initialValues={verificationInitialValues}
                validationSchema={verificationValidationSchema}
                onSubmit={verificationSubmit}
              >
                {({ errors, touched, values }) => (
                  <Form
                    className={`${verificationSubmissionLoading && "blur-sm opacity-80"} col-start-1 row-start-1`}
                  >
                    <div className="">
                      <TextInput inputType="string" className="mt-4 w-60 mx-auto" placeholder="######" error={errors.verificationCode}  touched={touched.verificationCode} value={values.verificationCode} labelText="Verification code" id="verificationCode" />
                    </div>
                    <ButtonStd type="submit" className="w-full my-2">Submit code</ButtonStd>

                  </Form>
                )}
              </Formik>
              <div className="flex w-full gap-2 justify-end">
                <p className="text-gray-500 text-sm">
                  {codeResentTracker > 0 ? "New code sent." : "Can't find it?"}
                  
                </p>
                <button onClick={handleResendCode} className={`${!resendCodeButtonActive && "opacity-40 pointer-events-none"} text-gray-500 text-sm max-w-full underline font-bold`}>
                  Resend code
                </button>
              </div>
              {apiError && 
              <div>
                <p className="text-red-300 max-w-full">
                  {apiError}
                </p>
              </div>
              }
            </div>
          </div>
        </VerificationModal>
      }
      <section
        className="w-full my-8 mb-24 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative max-w-screen-2xl m-auto"
      >
        <div className="flex flex-row justify-center lg:justify-between">
          <Image className="mx-auto h-fit hidden lg:block" width={500} src={MFS_Logo} alt="My favorite sport logo." />
          <RegisterForm setUserEmail={setUserEmail} setRegisterSuccess={setRegisterSuccess} registerSuccess={registerSuccess} isVerificationModalOpen={isVerificationModalOpen} setIsVerificationModalOpen={setIsVerificationModalOpen}/>
        </div>
      </section>
    </>
  );
};
