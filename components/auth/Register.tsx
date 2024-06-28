"use client";

import {RegisterForm} from "./RegisterForm";
import Image from "next/image";
import MFS_Logo from "../../public/MFS_Logo_V3.svg";
import { useState } from "react";
import { VerificationModal } from "./VerificationModal";
import {Form, Formik} from "formik";
import { VerificationCodeInterface } from "@/interfaces/user_auth";
import { handleVerify } from "@/utils/auth";
import * as Yup from "yup";
import { TextInput } from "../common/form_inputs/TextInput";
import { ButtonStd } from "../common/ui/ButtonStd";
import LoadingAnimation from "../svgs/LoadingAnimation";

export const Register = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [validationError, setValidationError] = useState(false);


  const verificationInitialValues: VerificationCodeInterface = {
    uuid: "",
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
    setValidationError(false);
    setVerificationSubmissionLoading(true);
    values.uuid = userUuid;
    values.email = userEmail;
    if (values.uuid == "" || values.email == "") {
      console.log("Values missing");
      setVerificationSubmissionLoading(false);
      setValidationError(true);
      return;
    }
    const result = await handleVerify({
      uuid: values.uuid,
      email: values.email,
      verificationCode: values.verificationCode
    } as VerificationCodeInterface);
    if (result?.success != true) {
      console.log("Success is false");
      setValidationError(true);
    } else {
      // router.push
    }
    setVerificationSubmissionLoading(false);
  };

  
  return (
    <>
      {registerSuccess && 
        <VerificationModal>
          <div className="p-6">
            <p className="font-bold text-2xl text-center mb-4">
              Verify your account
            </p>
            <p>
              Please enter your six-digit verification code:
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
              {validationError && 
              <div>
                <p className="text-red-300 max-w-full">
                  An error occurred while attempting to validate your account.
                </p>
                <p className="text-red-300 max-w-full">
                  Please reload the page and try again.
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
          <RegisterForm setUserEmail={setUserEmail} setUserUuid={setUserUuid} setRegisterSuccess={setRegisterSuccess}/>
        </div>
      </section>
    </>
  );
};
