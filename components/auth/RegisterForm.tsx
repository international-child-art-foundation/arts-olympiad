import React, {useState} from "react";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {TextInput} from "../common/form_inputs/TextInput";
import {ButtonStd} from "../common/ui/ButtonStd";
import {H2m} from "../common/texts/H2m";
import {Pm} from "../common/texts/Pm";
import Image from "next/image";
import facebook from "../../public/auth/Facebook_Logo.svg";
import google from "../../public/auth/Google_Logo.svg";
import apple from "../../public/auth/Apple.svg";
import OpenEye from "../../public/auth/eye_open.svg";
import ClosedEye from "../../public/auth/eye_closed.svg";
import Link from "next/link";
// import {useRouter} from "next/navigation";
import {NewPasswordInput} from "../common/form_inputs/NewPasswordInput";
import { UserSignupInterface } from "@/interfaces/user_signup";


const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,."-]+$/u, "Invalid characters in first name")
    .max(30, "First name must be no longer than 30 characters"),
  lastName: Yup.string()
    .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,."-]+$/u, "Invalid characters in last name")
    .max(30, "Last name must be no longer than 30 characters"),
  //TODO: birthdate validation
  email: Yup.string().email("Not a recognized email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    ),
});

const initialValues: UserSignupInterface = {
  firstName: "",
  lastName: "",
  email: "",
  birthdate: "",
  password: ""
};

export const RegisterForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  // const router = useRouter();

  const onSubmit = async (values: UserSignupInterface) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        
        console.log("Signup has succeeded.");
        // Notify user
      } else {
        // Handle error
        const errorData = await response.json();
        console.error("Signup failed:", errorData.error);
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
    }
  };

  return (
    <div className="max-w-[90%] sm:max-w-[70%] lg:max-w-[40%]">
      <H2m>Create an account</H2m>
      <Pm className="my-2" >Join us! Create your account to either vote for inspiring art or enter your own work.</Pm>
      <Pm className="my-2" >Registration begins on <b>June 15, 2024</b>.</Pm>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, values }) => (
          <Form > {/* Disabled until contest begins: className="pointer-events-none opacity-50"*/}
            <div className="grid grid-cols-2 gap-4">
              <TextInput inputType="string" className="mt-4" placeholder="John" error={errors.firstName}  touched={touched.firstName} value={values.firstName} labelText="First Name" id="firstName" />
              <TextInput inputType="string" className="mt-4" placeholder="Doe" error={errors.lastName}  touched={touched.lastName} value={values.lastName} labelText="Last name" id="lastName" />
            </div>
            <TextInput inputType="email" className="" placeholder="johndoe@gmail.com" autoComplete="username" error={errors.email}  touched={touched.email} value={values.email} labelText="Email" id="email" />
            <div className="relative">
              <NewPasswordInput inputType={`${!showPassword && "password" }`} className="mb-4" placeholder="Squk1*Bn" error={errors.password}  touched={touched.password} value={values.password} labelText="Password" id="password" />
              <Image
                className="absolute top-14 right-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                width={30} height={30}
                src={showPassword ? OpenEye : ClosedEye }
                alt="Show password button." />
            </div>
            <ButtonStd type="submit" className="w-full my-2">Sign up</ButtonStd>
          </Form>
        )}
      </Formik>
      <Pm className="font-semibold my-4 text-center">Already have an account?
        <span className="text-main-blue font-semibold"><Link className="inline" href="/auth/login"> Log in here</Link></span>
      </Pm>
      <div className="invisible">
        <div className="flex flex-row">
          <div className=" mx-4 z-10 my-12 relative bg-main-grey w-full m-0 border-1 border-main-grey" />
          <p className="font-light my-auto text-2xl min-w-24 text-center">Or With</p>
          <div className="mx-4 z-10 my-auto relative bg-main-grey w-full m-0 border-1 border-main-grey" />
        </div>
        <div>
          <ButtonStd style={{borderRadius: "100px"}} className=" mb-6 w-full bg-neutral-white border-black">
            <Image width={30} src={facebook} alt="Facebook logo." />
            <Pm className="ml-4 text-black font-semibold">Sign up with Facebook</Pm>
          </ButtonStd>
          <ButtonStd style={{borderRadius: "100px"}} className="my-6 w-full bg-neutral-white border-black">
            <Image width={30} src={google} alt="Google logo." />
            <Pm className="ml-4 text-black font-semibold">Sign up with Google</Pm>
          </ButtonStd>
          <ButtonStd style={{borderRadius: "100px"}} className="my-6 w-full bg-neutral-white border-black">
            <Image width={30} src={apple} alt="Apple logo." />
            <Pm className="ml-4 text-black font-semibold">Sign up with Apple</Pm>
          </ButtonStd>
        </div>
      </div>
      {/*<Pm className="font-semibold my-4 text-center">Already have an account?*/}
      {/*  <span className="text-main-blue font-semibold"><Link className="inline" href="/auth/login"> Log in here</Link></span>*/}
      {/*</Pm>*/}
    </div>
  );
};