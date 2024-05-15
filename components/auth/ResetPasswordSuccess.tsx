import {H2m} from "../common/texts/H2m";
import {Pm} from "../common/texts/Pm";
import {ButtonStyledLink} from "../common/ui/ButtonStyledLink";
import React from "react";

export const ResetPasswordSuccess = () => {
  return (
    <>
      <H2m className="font-bold text-3xl ">Password reset successful</H2m>
      <Pm className="my-8" >
        New password ready! Log in to access your account. For assistance, reach out to our team.
      </Pm>
      <ButtonStyledLink target="_self" href={"/auth/login"}>Sign into my account</ButtonStyledLink>
    </>
  );
};