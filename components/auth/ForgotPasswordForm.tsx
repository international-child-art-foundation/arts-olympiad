import React, { useState } from "react";
import { H2m } from "../common/texts/H2m";
import { Pm } from "../common/texts/Pm";
import { Form, Formik } from "formik";
import { TextInput } from "../common/form_inputs/TextInput";
import { ButtonStd } from "../common/ui/ButtonStd";
import * as Yup from "yup";
import { limiter } from "@/utils/api-rate-limit";
import { sendForgotPasswordEmail, confirmForgotPassword } from "@/utils/api-user";
import LoadingAnimation from "../svgs/LoadingAnimation";
import Image from "next/image";
import OpenEye from "../../public/auth/eye_open.svg";
import ClosedEye from "../../public/auth/eye_closed.svg";
import { NewPasswordInput } from "../common/form_inputs/NewPasswordInput";
import { passwordValidation } from "@/utils/yup-validators";

const passwordResetValidationSchema = Yup.object().shape({
  ...passwordValidation,
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm password is required"),
});

interface IEmailFormValues {
  email: string;
}

interface IConfirmationFormValues {
  confirmationCode: string;
}

interface IPasswordResetFormValues {
  password: string;
  confirmPassword: string;
}

const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email("Not a recognized email address").required("Email is required"),
});

const confirmationValidationSchema = Yup.object().shape({
  confirmationCode: Yup.string().length(6, "confirmation code must be 6 digits").required("confirmation code is required"),
});

const emailInitialValues: IEmailFormValues = {
  email: "",
};

const confirmationInitialValues: IConfirmationFormValues = {
  confirmationCode: "",
};

const passwordResetInitialValues: IPasswordResetFormValues = {
  password: "",
  confirmPassword: "",
};

export const ForgotPasswordForm = () => {
  const [step, setStep] = useState<"email" | "confirmation" | "resetPassword" | "success">("email");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onEmailSubmit = async (values: IEmailFormValues) => {
    setLoading(true);
    setApiError(null);
    try {
      await limiter.schedule(() => sendForgotPasswordEmail(values));
      setUserEmail(values.email);
      setStep("confirmation");
    } catch (error) {
      setApiError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onconfirmationSubmit = async (values: IConfirmationFormValues) => {
    setConfirmationCode(values.confirmationCode);
    setStep("resetPassword");
  };

  const onPasswordResetSubmit = async (values: IPasswordResetFormValues) => {
    setLoading(true);
    setApiError(null);
    try {
      const confirmForgotPasswordResponse = await limiter.schedule(() => confirmForgotPassword({
        email: userEmail,
        confirmationCode: confirmationCode,
        newPassword: values.password
      }));
      if (confirmForgotPasswordResponse.success) {
        setStep("success");
      } else {
        setApiError("There's been an issue. Try again later, or contact our support.");
      }
    } catch (error) {
      setApiError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[90%] sm:max-w-[80%] lg:max-w-[70%]">
      {step === "email" && (
        <>
          <H2m className="text-center">Forgot Password</H2m>
          <Pm className="my-8">Enter the email linked to your account to receive a password reset code.</Pm>
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
                  className={`${loading ? "opacity-60 pointer-events-none disabled" : ""} mt-4`}
                  placeholder="johndoe@gmail.com"
                  error={errors.email}
                  touched={touched.email}
                  value={values.email}
                  labelText="Email"
                  id="email"
                />
                <ButtonStd type="submit" className="w-full my-2" disabled={loading}>
                  Send Reset Code
                </ButtonStd>
              </Form>
            )}
          </Formik>
        </>
      )}

      {step === "confirmation" && (
        <>
          <H2m className="text-center">Enter Reset Code</H2m>
          <Pm className="my-8">
            We've sent a password reset code to {userEmail}. Please enter the 6-digit code below.
            If you don't see it in your inbox, please check your spam folder.
          </Pm>
          <Formik
            initialValues={confirmationInitialValues}
            validationSchema={confirmationValidationSchema}
            onSubmit={onconfirmationSubmit}
          >
            {({ errors, touched, values }) => (
              <Form className="relative">
                <TextInput
                  inputType="text"
                  className="mt-4"
                  placeholder="######"
                  error={errors.confirmationCode}
                  touched={touched.confirmationCode}
                  value={values.confirmationCode}
                  labelText="Reset Code"
                  id="confirmationCode"
                />
                <ButtonStd type="submit" className="w-full my-2">
                  Verify Code
                </ButtonStd>
              </Form>
            )}
          </Formik>
        </>
      )}

      {step === "resetPassword" && (
        <div>
          <H2m className="text-center">Reset Password</H2m>
          <Pm className="my-8">Please enter your new password.</Pm>
          <Formik
            initialValues={passwordResetInitialValues}
            validationSchema={passwordResetValidationSchema}
            onSubmit={onPasswordResetSubmit}
          >
            {({ errors, touched, values }) => (
              <Form className="relative">
                {loading && <LoadingAnimation scale={100} stroke={2} />}
                <div className="relative">
                  <NewPasswordInput
                    inputType={showPassword ? "text" : "password"}
                    className={`${loading ? "opacity-60 pointer-events-none disabled" : ""} mb-4`}
                    placeholder="Squk1*Bn"
                    error={errors.password}
                    touched={touched.password}
                    value={values.password}
                    labelText="New Password"
                    id="password"
                  />
                  <Image
                    className="absolute top-14 right-4 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    width={30}
                    height={30}
                    src={showPassword ? OpenEye : ClosedEye}
                    alt="Show password button."
                  />
                </div>
                <NewPasswordInput
                  inputType={showPassword ? "text" : "password"}
                  className={`${loading ? "opacity-60 pointer-events-none disabled" : ""} mt-4`}
                  placeholder="Squk1*Bn"
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  value={values.confirmPassword}
                  labelText="Confirm New Password"
                  id="confirmPassword"
                />
                <ButtonStd type="submit" className="w-full my-2" disabled={loading}>
                  Reset Password
                </ButtonStd>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {step === "success" && (
        <>
          <H2m className="text-center">Password Reset Successful</H2m>
          <Pm className="my-8">Your password has been successfully reset. You can now log in with your new password.</Pm>
        </>
      )}

      {apiError && (
        <Pm className="text-red-500 mt-4">{apiError}</Pm>
      )}
    </div>
  );
};