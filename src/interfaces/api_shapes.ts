export interface GatewayResponse {
  message?: string;
  error?: string;
  body?: object;
}

export interface LoginResponse {
  success: boolean;
  message: string;
}

export interface RegisterResponse {
  message: string;
}

export interface NextServerResponse {
  success: boolean;
  data?: GatewayResponse;
}

export interface ErrorResponse {
  error: string;
}