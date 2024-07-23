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
import {useRouter} from "next/navigation";
import {Modal} from "../common/ui/Modal";
import {CheckBox} from "../common/form_inputs/CheckBox";
import {ForgotPasswordForm} from "./ForgotPasswordForm";
import { UserLoginInterface } from "@/interfaces/user_auth";
import LoadingAnimation from "../svgs/LoadingAnimation";
import { VerifyEmailForm } from "./VerifyEmailForm";
import { useGlobalContext } from "@/app/GlobalContext";
import { emailValidation, passwordValidation } from "@/utils/yup-validators";

const validationSchema = Yup.object().shape({
  ...emailValidation,
  ...passwordValidation,
});

const initialValues: UserLoginInterface = {
  email: "",
  password: ""
};

export const LoginForm = () => {

  const router = useRouter();
  const {signIn} = useGlobalContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const onSubmit = async (values: UserLoginInterface) => {
    setLoginLoading(true);
    setLoginError(false);
    const loginAttempt = await signIn(values);
    if (loginAttempt.success) {
      setLoginError(false);
      router.push("/dashboard");
    } else {
      setLoginError(true);
    }
    setLoginLoading(false);
  };

  return (
    <div className="w-[90%] sm:w-[70%] lg:w-[40%]">
      <H2m>Log in to your account</H2m>
      {/* <Pm className="my-2" >Registration begins on <b>June 15, 2024</b>.</Pm> */}
      <div className="grid">
        {loginLoading && 
          <div className="col-start-1 row-start-1">
            <LoadingAnimation scale={100} stroke={2}/>
          </div>
        }
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, values }) => (
            <Form 
              className={`${loginLoading && "blur-sm opacity-80"} col-start-1 row-start-1`}
            > {/* Disabled until contest begins: className="pointer-events-none opacity-50"*/}
              <TextInput inputType="email" className="mt-4" placeholder="johndoe@gmail.com" error={errors.email}  touched={touched.email} value={values.email} labelText="Email" id="email" />
              <div className="relative">
                <TextInput inputType={`${!showPassword && "password" }`} placeholder="Enter password..." error={errors.password}  touched={touched.password} value={values.password} labelText="Password" id="password" />
                <Image
                  className="absolute top-14 right-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  width={30} height={30}
                  src={showPassword ? OpenEye : ClosedEye }
                  alt="Show password button." />
              </div>
              <div className=" mb-4 flex flex-col xsm:flex-row items-center justify-between">
                <CheckBox name="remember" value="Remember me"/>
                <Link href={"/reset-password"} type="button" className="font-semibold bg-transparent border-none xsm:ml-8">
                  Forgot your password?
                  <span className="sr-only">.</span>
                </Link>
              </div>
              {loginError && <p className="text-red-600">Couldn't log in. Is your password correct?</p>}
              <ButtonStd type="submit" className="w-full my-2">Log in</ButtonStd>
            </Form>
          )}
        </Formik>
      </div>
      <Pm className="font-semibold my-4 text-center">Don’t have an account?
        <span className="text-main-blue font-semibold"><Link className="inline" href="/register"> Create one now</Link></span>
      </Pm>
      {loginError && <div className="bg-white rounded-3xl w-80% py-4">
        <p className="text-center">If you're still having trouble, maybe you forgot to:</p>
        <div className="w-full">
          <button className="w-full font-semibold bg-transparent border-none mx-auto px-auto text-center" onClick={() => setShowVerifyEmail(true)}>
            Verify your email address
          </button>
        </div>
      </div>}
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
      {/*<Pm className="font-semibold my-4 text-center">Don’t have an account?*/}
      {/*  <span className="text-main-blue font-semibold"><Link className="inline" href="/register"> Create one now</Link></span>*/}
      {/*</Pm>*/}
      <Modal isOpen={showForgotPassword} onClose={() => setShowForgotPassword(false)}>
        <ForgotPasswordForm />
      </Modal>
      <Modal isOpen={showVerifyEmail} onClose={() => setShowVerifyEmail(false)}>
        <VerifyEmailForm />
      </Modal>
    </div>
  );
};