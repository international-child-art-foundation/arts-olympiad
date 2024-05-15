export interface Birthdate {
  day: number | undefined;
  month: number | undefined;
  year: number | undefined;
}

export interface UserSignupInterface {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Birthdate;
  password: string;
}
