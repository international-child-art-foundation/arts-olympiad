export interface BirthdateInterface {
  day: number | undefined;
  month: number | undefined;
  year: number | undefined;
}

export interface BirthdateFormInterface {
  birthdate: BirthdateInterface
}

export interface UserRegisterInterfaceOver18 {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | undefined;
  password: string;
}

export interface UserRegisterInterfaceUnder18 {
  firstName: string;
  lastName: string;
  guardianFirstName: string;
  guardianLastName: string;
  email: string;
  phone: string | undefined;
  password: string;
}

export interface UserRegisterInterface {
  firstName: string;
  lastName: string;
  birthdate: BirthdateInterface;
  guardianFirstName: string | undefined;
  guardianLastName: string | undefined;
  email: string;
  phone: string | undefined;
  password: string;
}

export interface UserRegisterInterfaceAfterFormatting {
  f_name: string;
  l_name: string;
  email: string;
  g_f_name: string | undefined;
  g_l_name: string | undefined;
  birthdate: string;
  phone: string | undefined;
  password: string;
}

export interface VerificationCodeInterface {
  uuid: string;
  email: string;
  verificationCode: string;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface ApiEndpointConfig {
  endpoint?: string;
}

export interface ApiConfig {
  [key: string]: ApiEndpointConfig;
}



export interface ErrorResponse {
  response?: {
    body?: string | object;
  };
  message?: string;
}
