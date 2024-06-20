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
  date: { day: number, month: number, year: number }
  termsCheck: boolean;
}

export interface UploadFormData {
  image: File | null;
  location: string;
  city: string;
  usingAI: boolean;
  source: string | null;
  prompt: string | null;
  category: string[];
  description: string;
}

export interface ModifiedUploadFormData {
  f_name: string | null;
  age: number;
  sport: string[];
  location: string;
  is_ai_gen: boolean;
  model: string | null;
  prompt: string | null
}

export type FormValues = PersonalFormData | GuardianFormData | UploadFormData;
