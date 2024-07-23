import React, { useState } from "react";
import { H2m } from "../common/texts/H2m";
import { Pm } from "../common/texts/Pm";
import { Form, Formik } from "formik";
import { TextInput } from "../common/form_inputs/TextInput";
import { ButtonStd } from "../common/ui/ButtonStd";
import * as Yup from "yup";
import LoadingAnimation from "../svgs/LoadingAnimation";
import { expensiveActionLimiter, limiter } from "@/utils/api-rate-limit";
import { resendVerificationEmail, handleVerify } from "@/utils/api-user";
import { ResendVerificationInterface, VerificationCodeInterface, EmailInterface } from "@/interfaces/user_auth";
import { emailValidation } from "@/utils/yup-validators";


const emailValidationSchema = Yup.object().shape({
  ...emailValidation,
});

const verificationValidationSchema = Yup.object().shape({
  verificationCode: Yup.string().length(6, "Verification code must be 6 digits").required("Verification code is required"),
});

const emailInitialValues: EmailInterface = {
  email: "",
};

const verificationInitialValues: ResendVerificationInterface = {
  verificationCode: "",
};

export const VerifyEmailForm = () => {
  const [step, setStep] = useState<"email" | "verification" | "success">("email");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");

  const onEmailSubmit = async (values: EmailInterface) => {
    setLoading(true);
    setApiError(null);
    try {
      await expensiveActionLimiter.schedule(() => resendVerificationEmail(values));
      setUserEmail(values.email);
      setStep("verification");
    } catch (error) {
      setApiError("Failed to send verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onVerificationSubmit = async (values: ResendVerificationInterface) => {
    setLoading(true);
    setApiError(null);
    const verificationValues = {
      ...values,
      email: userEmail,
    } as VerificationCodeInterface;
    try {
      const verificationResponse = await limiter.schedule(() => handleVerify(verificationValues));
      if (verificationResponse.success) {
        setStep("success");
      } else {
        setApiError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setApiError("Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[90%] sm:max-w-[80%] lg:max-w-[70%]">
      {step === "email" && (
        <>
          <H2m className="text-center">Verify your email address</H2m>
          <Pm className="my-8">Enter the email linked to your account to receive a verification code in your inbox.</Pm>
          <Formik
            initialValues={emailInitialValues}
            validationSchema={emailValidationSchema}
            onSubmit={onEmailSubmit}
          >
            {({ errors, touched, values }) => (
              <Form className="relative">
                {loading && <LoadingAnimation scale={100} stroke={2} />}
                <TextInput
                  inputType="email"
                  className={`${loading && "disabled opacity-60"} mt-4`}
                  placeholder="johndoe@gmail.com"
                  error={errors.email}
                  touched={touched.email}
                  value={values.email}
                  labelText="Email"
                  id="email"
                />
                <ButtonStd type="submit" className="w-full my-2" disabled={loading}>
                  Send Verification Code
                </ButtonStd>
              </Form>
            )}
          </Formik>
        </>
      )}

      {step === "verification" && (
        <>
          <H2m className="text-center">Enter Verification Code</H2m>
          <Pm className="my-8">
            We"ve sent a verification code to {userEmail}. Please enter the 6-digit code below.
            If you don't see it in your inbox, please check your spam folder.
          </Pm>
          <Formik
            initialValues={verificationInitialValues}
            validationSchema={verificationValidationSchema}
            onSubmit={onVerificationSubmit}
          >
            {({ errors, touched, values }) => (
              <Form className="relative">
                {loading && <LoadingAnimation scale={100} stroke={2} />}
                <TextInput
                  inputType="text"
                  className={`${loading && "disabled opacity-60"} mt-4`}
                  placeholder="######"
                  error={errors.verificationCode}
                  touched={touched.verificationCode}
                  value={values.verificationCode}
                  labelText="Verification Code"
                  id="verificationCode"
                />
                <ButtonStd type="submit" className="w-full my-2" disabled={loading}>
                  Verify
                </ButtonStd>
              </Form>
            )}
          </Formik>
        </>
      )}

      {step === "success" && (
        <>
          <H2m className="text-center font-bold font-montserrat">Email Verified Successfully</H2m>
          <Pm className="my-8">Your email address has been successfully verified.</Pm>
          <Pm className="my-8">You can now log in.</Pm>
        </>
      )}

      {apiError && (
        <Pm className="text-red-500 mt-4">{apiError}</Pm>
      )}
    </div>
  );
};