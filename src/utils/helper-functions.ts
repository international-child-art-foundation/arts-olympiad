import { differenceInYears, parseISO } from "date-fns";
import { BirthdateInterface } from "@/interfaces/user_auth";

export function calculateAgeFromString(birthdate: string): number {
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
