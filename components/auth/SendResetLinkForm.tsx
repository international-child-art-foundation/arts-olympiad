import React from "react";
import {H2m} from "../common/texts/H2m";
import {Pm} from "../common/texts/Pm";
import {Form, Formik} from "formik";
import {TextInput} from "../common/form_inputs/TextInput";
import {ButtonStd} from "../common/ui/ButtonStd";
import * as Yup from "yup";
import {TFormStatus} from "./ResetPassword";
import {ButtonStyledLink} from "../common/ui/ButtonStyledLink";

interface IProps {
  formStatus: TFormStatus
  onSendResetLink: () => void;
}

export interface IContactFormValues {
  email: string,
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Not a recognized email address").required("Email is required"),

});

const initialValues: IContactFormValues = {
  email: "",
};

export const SendResetLinkForm = ({formStatus, onSendResetLink} : IProps) => {

  const onSubmit = (values: IContactFormValues) => {
    console.log(values);
    onSendResetLink();
  };

  return (
    <>
      {
        formStatus === "send-link" ?
          <>
            <H2m className="font-bold text-3xl ">Forgot password?</H2m>
            <Pm className="my-8" >No problem! Just enter your email address below, and we'll send you a link to reset your password.</Pm>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, values }) => (
                <Form className="">
                  <TextInput inputType="email" className="mt-4" placeholder="johndoe@gmail.com" error={errors.email}  touched={touched.email} value={values.email} labelText="Enter email" id="email" />
                  <ButtonStd type="submit" className="w-full my-2">Send reset link</ButtonStd>
                </Form>
              )}
            </Formik>
          </>
          : formStatus === "link-sent" &&
          <>
            <H2m className="font-bold text-3xl ">Email Sent!</H2m>
            <Pm className="my-8" >
              Please check your email for the password reset link.
              If it's not in your inbox, try looking in the spam folder.
            </Pm>
            <ButtonStyledLink target="_self" href={"/"}>Take me home</ButtonStyledLink>
            <Pm className="text-end text-sm lg:text-sm xl:text-sm my-4">Link not there?{" "}
              <button className="underline font-semibold" onClick={onSendResetLink}> Resend link</button>
            </Pm>
          </>
      }

    </>
  );
};