export interface BirthdateInterface {
  day: number | undefined;
  month: number | undefined;
  year: number | undefined;
}

export interface UserRegisterInterface {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: BirthdateInterface;
  password: string;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}