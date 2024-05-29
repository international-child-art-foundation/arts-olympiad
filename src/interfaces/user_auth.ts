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

export interface VerificationCodeInterface {
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

export interface ApiResponse {
  success: boolean;
  data?: ApiResponseData;
}

export interface ApiResponseData {
  message?: string;
  error?: string;
}

export interface ErrorResponse {
  response?: {
    body?: string | object;
  };
  message?: string;
}
