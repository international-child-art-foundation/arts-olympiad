export interface GuardianFormData {
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianTermsCheck: boolean;
}

export interface PersonalFormData {
  // isUnder18: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: { day: number, month: number, year: number }
  termsCheck: false;
}

export interface UploadFormData {
  image: File | null;
  location: string;
  city: string;
  usingAI: false;
  source: string;
  prompt: string;
  category: string[];
  description: string;
}
export type FormValues = PersonalFormData | GuardianFormData | UploadFormData;
