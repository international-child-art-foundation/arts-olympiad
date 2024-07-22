import * as Yup from "yup";
import { isPossiblePhoneNumber } from "libphonenumber-js";

import { allowedPasswordCharactersRegex, passwordPolicyRegex } from "../../mock/passwordRegex";

const nameRegex = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\"-]+$");

export const firstNameValidation = {
  firstName: Yup.string()
    .matches(
      nameRegex, 
      "Invalid characters in first name"
    )
    .max(30, "First name must be no longer than 30 characters")
};

export const lastNameValidation = {
  lastName: Yup.string()
    .matches(
      nameRegex, 
      "Invalid characters in last name"
    )
    .max(30, "Last name must be no longer than 30 characters")
};

export const guardianFirstNameValidation = {
  firstName: Yup.string()
    .matches(
      nameRegex, 
      "Invalid characters in first name"
    )
    .max(30, "First name must be no longer than 30 characters")
};

export const guardianLastNameValidation = {
  lastName: Yup.string()
    .matches(
      nameRegex, 
      "Invalid characters in last name"
    )
    .max(30, "Last name must be no longer than 30 characters")
};

export const phoneValidation = {
  phone: Yup.string()
    .test("is-possible-phone-number", "Phone number is invalid", value => 
      isPossiblePhoneNumber(value || "")
    )
};

export const emailValidation = {
  email: Yup.string()
    .email("Not a recognized email address")
    .required("Email is required")
};

export const termsAgreement = {
  termsAgreement: Yup.boolean()
    .oneOf([true], "In order to register, you must accept the terms and conditions.")
    .required("In order to register, you must accept the terms and conditions."),
};

export const passwordValidation = {
  password: Yup.string()
    .required("Password is required")
    .max(256, "Password must be at most 256 characters long")
    .test(
      "is-valid-password",
      function(value) {
        const { path, createError } = this;
        if (!allowedPasswordCharactersRegex.test(value || "")) {
          return createError({ path, message: "Password contains disallowed characters" });
        }
        if (!passwordPolicyRegex.test(value || "")) {
          return createError({ path, message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character" });
        }
        return true;
      }
    )
};