export interface BirthdateInterface {
  day: number | undefined;
  month: number | undefined;
  year: number | undefined;
}

export interface UserSignupInterface {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: BirthdateInterface;
  password: string;
}
