"use client";
import React, {useState, useEffect} from "react";
import * as Yup from "yup";
import {ButtonStd} from "../common/ui/ButtonStd";
import {H2m} from "../common/texts/H2m";
import {Pm} from "../common/texts/Pm";
import Image from "next/image";
import facebook from "../../public/auth/Facebook_Logo.svg";
import google from "../../public/auth/Google_Logo.svg";
import apple from "../../public/auth/Apple.svg";
import Link from "next/link";
// import {useRouter} from "next/navigation";
import LoadingAnimation from "../svgs/LoadingAnimation";
import "react-phone-number-input/style.css";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { BirthdateInterface } from "@/interfaces/user_auth";
import { calculateAgeFromUserBirthdateInput } from "@/utils/helper-functions";
import { BirthdateForm } from "./BirthdateForm";
import { RegisterOver18 } from "./RegisterOver18";
import { RegisterUnder18 } from "./RegisterUnder18";

interface RegisterFormProps {
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>
  setUserEmail: React.Dispatch<React.SetStateAction<string>>
  setIsVerificationModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  registerSuccess: boolean
  isVerificationModalOpen: boolean 
}

Yup.addMethod(Yup.string, "isPossiblePhoneNumber", function (errorMessage) {
  return this.test("is-possible-phone-number", errorMessage, function (value) {
    const { path, createError } = this;
    return (
      value == null || isPossiblePhoneNumber(value) || createError({ path, message: errorMessage })
    );
  });
});

export const RegisterForm: React.FC<RegisterFormProps> = ({setUserEmail, setRegisterSuccess, registerSuccess, setIsVerificationModalOpen}) => {
  const [formSubmissionLoading, setFormSubmissionLoading] = useState(false);
  const [userBirthdate, setUserBirthdate] = useState({day: undefined, month: undefined, year: undefined} as BirthdateInterface);
  const [userAge, setUserAge] = useState<number | null>(null);

  useEffect(() => {
    if (userBirthdate && userBirthdate.day != undefined) {
      setUserAge(calculateAgeFromUserBirthdateInput(userBirthdate));
    }
  }, [setUserAge, userBirthdate]);

  return (
    <>
      <div className="max-w-[90%] sm:max-w-[70%] lg:max-w-[40%]">
        <H2m>Create an account</H2m>
        <Pm className="my-2" >Join us! Create your account to either vote for inspiring art or enter your own work.</Pm>
        <Pm className="my-2" >Registration begins on <b>June 15, 2024</b>.</Pm>
        <div className="grid">
          {formSubmissionLoading && 
            <div className="col-start-1 row-start-1">
              <LoadingAnimation scale={100} stroke={2}/>
            </div>
          }
          {userAge == null && <BirthdateForm setUserBirthdate={setUserBirthdate}/>}
          {userAge !== null && (
            userAge > 18 ? (
              <RegisterOver18 
                setUserEmail={setUserEmail}
                userBirthdate={userBirthdate}
                setRegisterSuccess={setRegisterSuccess}
                formSubmissionLoading={formSubmissionLoading}
                setFormSubmissionLoading={setFormSubmissionLoading}
              />
            ) : (
              <RegisterUnder18
                setUserEmail={setUserEmail}
                userBirthdate={userBirthdate}
                setRegisterSuccess={setRegisterSuccess}
                formSubmissionLoading={formSubmissionLoading}
                setFormSubmissionLoading={setFormSubmissionLoading}
              />
            )
          )}
        </div>
        { registerSuccess ?
          (
            <div>
              <div className="w-full border-bottom border-2 my-4 border-gray-400"/>
              <button onClick={() => setIsVerificationModalOpen(true)}className="p-4 mt-2 bg-new-blue text-white font-bold rounded-lg w-full">
                Verify your email address
              </button>
              <p className="italic mt-4">
                In order to access your account, you must verify your email address.
              </p>
            </div>
          ) : (
            <Pm className="font-semibold my-4 text-center">Already have an account?
              <span className="text-main-blue font-semibold"><Link className="inline" href="/login"> Log in here</Link></span>
            </Pm>
          )
        }
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
        {/*  <span className="text-main-blue font-semibold"><Link className="inline" href="/login"> Log in here</Link></span>*/}
        {/*</Pm>*/}
      </div>
    </>
  );
};