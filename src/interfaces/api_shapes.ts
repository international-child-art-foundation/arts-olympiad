export interface GatewayResponse {
  message?: string;
  error?: string;
  body?: object;
}

export interface NextServerResponse {
  success: boolean;
  data?: GatewayResponse;
}

export type GenericResponse = SuccessResponse | ErrorResponse;

interface SuccessResponse {
  success: true;
  data: object;
}

interface ErrorResponse {
  success: false;
  error: string;
}

export interface EmptyErrorResponse {
  success: false;
}

interface EmptySuccessResponse {
  success: true;
}

export interface RegisterSuccessResponse {
  success: true;
  message: string;
}

export interface SignInSuccessResponse {
  success: true;
  sk: string;
}

interface AuthenticationSuccessResponse {
  success: true;
  sk: string;
}

interface UserVotedSuccessResponse {
  success: true;
  voted_sk?: string;
}

interface TotalVotesSuccessResponse {
  success: true;
  total_votes: number;
}

export type RegisterResponse = RegisterSuccessResponse | ErrorResponse;

export type ResponseWithoutErrorDetails = SuccessResponse | EmptyErrorResponse;

export type ResponseWithoutSuccessDetails = EmptySuccessResponse | ErrorResponse

export type EmptyResponse = EmptySuccessResponse | EmptyErrorResponse

export type SignInResponse = SignInSuccessResponse | EmptyErrorResponse;

export type VerifyResponse = EmptySuccessResponse | ErrorResponse

export type AuthenticationResponse = AuthenticationSuccessResponse | ErrorResponse;

export type VolunteerAuthenticationResponse = EmptySuccessResponse | ErrorResponse;

export type UserVotedResponse = UserVotedSuccessResponse | ErrorResponse;

export type TotalVotesResponse = TotalVotesSuccessResponse | EmptyErrorResponse