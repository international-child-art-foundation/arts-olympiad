import { differenceInYears, parseISO } from "date-fns";
import { BirthdateInterface } from "@/interfaces/user_auth";

export function calculateAgeFromString(birthdate: string | undefined): number {
  if (birthdate == undefined || birthdate == null) {
    return 0;
  }
  const today = new Date();
  const birthDate = parseISO(birthdate);
  return differenceInYears(today, birthDate);
}

export function calculateAgeFromUserBirthdateInput(birthdate: BirthdateInterface): number | null {
  if (!birthdate.day || !birthdate.month || !birthdate.year) {
    return null; // Return null if any part of the date is missing
  }

  const today = new Date();
  const birthDate = new Date(birthdate.year, birthdate.month - 1, birthdate.day);
  
  // Check if the resulting date is valid
  if (isNaN(birthDate.getTime())) {
    return null;
  }

  return differenceInYears(today, birthDate);
}

export function returnErrorAsString(error: unknown) {
  let errorMessage: string;

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else if (typeof error === "object" && error !== null && "message" in error) {
    errorMessage = (error as { message: string }).message;
  } else {
    errorMessage = "Unknown error";
  }

  return errorMessage;
}