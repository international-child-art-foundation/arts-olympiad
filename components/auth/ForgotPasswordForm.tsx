import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {H2m} from "../common/texts/H2m";
import {Pm} from "../common/texts/Pm";
import {Form, Formik} from "formik";
import {TextInput} from "../common/form_inputs/TextInput";
import {ButtonStd} from "../common/ui/ButtonStd";
import * as Yup from "yup";

export interface IContactFormValues {
  email: string,
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Not a recognized email address").required("Email is required"),

});

const initialValues: IContactFormValues = {
  email: "",
};

export const ForgotPasswordForm = () => {

  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const onSubmit = (values: IContactFormValues) => {
    console.log(values);
    router.push("/auth/login");
    setSubmitted(true);
  };

  return (
    <div className="max-w-[90%] sm:max-w-[80%] lg:max-w-[70%]">
      {
        submitted ?
          <>
            <H2m className="text-center">Password Reset Link Sent</H2m>
            <Pm className="my-8" >Thank you for providing your email. If we find a match, we'll send you an email with instructions to reset your password. It may take a few minutes to arrive. Please check your junk mail to ensure prompt delivery.</Pm>
          </>
          :
          <>
            <H2m className="text-center">Forgot your password</H2m>
            <Pm className="my-8" >Enter the email linked to your account to receive a password reset email.</Pm>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, values }) => (
                <Form className="">
                  <TextInput inputType="email" className="mt-4" placeholder="johndoe@gmail.com" error={errors.email}  touched={touched.email} value={values.email} labelText="Email" id="email" />
                  <ButtonStd type="submit" className="w-full my-2">Send</ButtonStd>
                </Form>
              )}
            </Formik>
          </>
      }
    </div>
  );
};