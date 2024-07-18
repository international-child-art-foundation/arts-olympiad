import {H2m} from "../common/texts/H2m";
import {Pm} from "../common/texts/Pm";
import {ButtonStyledLink} from "../common/ui/ButtonStyledLink";
import React from "react";

export const ResetPasswordFail = () => {
  return (
    <>
      <H2m className="font-bold text-3xl ">Failed to reset password</H2m>
      <Pm className="my-8" >
        Your password has not been reset. This could be due to an incorrect verification code or email address.
      </Pm>
      <Pm className="my-8" >
        It's also possible that our system encountered an error while trying to reset your password.
      </Pm>
      <Pm className="my-8  " >
        For support, please <a className="text-blue-600" href="https://www.icaf.org/about/contact-us">Contact Us</a>.
      </Pm>
      <ButtonStyledLink target="_self" href={"/login"}>Return to login page</ButtonStyledLink>
    </>
  );
};