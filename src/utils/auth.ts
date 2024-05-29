import { BirthdateInterface, UserLoginInterface, UserRegisterInterface, VerificationCodeInterface,
  ApiConfig, ApiResponse, ApiResponseData, ErrorResponse
} from "@/interfaces/user_auth";
import { Amplify } from "aws-amplify";
import { post } from "aws-amplify/api";

// These functions are used to call our server API files in /src/app/api/, which interact
// with the AWS SDK server-side and return information to the client.
// https://docs.amplify.aws/gen1/javascript/build-a-backend/auth/enable-sign-up/

function getApiConfig() {
  const config = Amplify.getConfig();
  return config.API?.REST;
}

function extractApiEndpoint(apiConfig: ApiConfig): { endpointPrefix?: string; apiName?: string } {
  let endpointPrefix;
  let apiName;
  for (const name in apiConfig) {
    if (apiConfig[name].endpoint) {
      endpointPrefix = apiConfig[name].endpoint;
      apiName = name;
      break;
    }
  }
  return { endpointPrefix, apiName };
}

function isApiResponseData(obj: unknown): obj is ApiResponseData {
  return typeof obj === "object" &&
         obj !== null &&
         "message" in obj &&
         typeof obj.message === "string" &&
         ("error" in obj ? typeof obj.error === "string" : true);
}

function handleApiError(e: ErrorResponse): string {
  let errorMessage;
  try {
    if (e.response && e.response.body) {
      const responseBody = e.response.body;
      errorMessage = typeof responseBody === "string" ? JSON.parse(responseBody) : responseBody;
    } else {
      errorMessage = e.message || "An unknown error occurred";
    }
  } catch (parseError) {
    errorMessage = e.message || "An unknown error occurred";
  }
  return errorMessage;
}

export async function handleRegister({
  firstName,
  lastName,
  birthdate,
  email,
  password,
}: UserRegisterInterface): Promise<ApiResponse> {
  const apiConfig = getApiConfig();

  if (!apiConfig) {
    return { success: false, data: {error: "API not properly configured client-side."} };
  }

  const { endpointPrefix, apiName } = extractApiEndpoint(apiConfig);

  if (!endpointPrefix || !apiName) {
    return { success: false, data: {error: "API not properly configured client-side."} };
  }

  const formatBirthdate = (birthdate: BirthdateInterface): string | null => {
    const { day, month, year } = birthdate;
    if (year === undefined || month === undefined || day === undefined) {
      return null;
    }
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString().split("T")[0];
  };

  const cognitoFormattedBirthdate = formatBirthdate(birthdate);
  if (!cognitoFormattedBirthdate) {
    return { success: false, data: {error: "Invalid birthdate. Please provide a valid date in YYYY-MM-DD format."} };
  }

  try {
    const registerUserOperation = post({
      apiName: apiName,
      path: "/api/users",
      options: {
        body: {
          email: email,
          f_name: firstName,
          l_name: lastName,
          password: password,
          birthdate: cognitoFormattedBirthdate,
        },
      },
    });
  
    const operation = await registerUserOperation;
  
    const { body, statusCode } = await operation.response;
    const jsonResponse = await body.json();

    if (jsonResponse && isApiResponseData(jsonResponse)) {
      if (statusCode >= 200 && statusCode < 300) { 
        return { success: true, data: { message: jsonResponse.message } };

      } else {
        return { success: false, data: { message: jsonResponse.message, error: jsonResponse.error}};
      }

    } else {
      return { success: false, data: {message: "API did not return data of type ApiResponseData."}};
    }
  } catch (e) {
    const errorResponse = e as ErrorResponse;
    const errorMessage = handleApiError(errorResponse);
  
    return { success: false, data: {error: errorMessage }};
  }
}

export async function handleVerify({
  email,
  verificationCode,
}: VerificationCodeInterface): Promise<ApiResponse> {
  const apiConfig = getApiConfig();

  if (!apiConfig) {
    return { success: false, data: { error: "API not properly configured client-side."} };
  }

  const { endpointPrefix, apiName } = extractApiEndpoint(apiConfig);

  if (!endpointPrefix || !apiName) {
    return { success: false, data: { error: "API not properly configured client-side."} };
  }

  try {
    const verifyUserOperation = post({
      apiName: apiName,
      path: "/api/verify",
      options: {
        body: {
          email: email,
          verification: verificationCode,
        },
      },
    });

    const operation = await verifyUserOperation;
  
    const { body, statusCode } = await operation.response;
    const jsonResponse = await body.json();

    if (jsonResponse && isApiResponseData(jsonResponse)) {
      if (statusCode >= 200 && statusCode < 300) { 
        return { success: true, data: { message: jsonResponse.message } };

      } else {
        return { success: false, data: { message: jsonResponse.message, error: jsonResponse.error}};
      }

    } else {
      return { success: false, data: {message: "API did not return data of type ApiResponseData."}};
    }
  } catch (e) {
    const errorResponse = e as ErrorResponse;
    const errorMessage = handleApiError(errorResponse);

    return { success: false, data: {error: errorMessage }};
  }
}

export async function handleLogin({ email, password }: UserLoginInterface) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: result.message };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.log("error logging in", error);
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as { message: string }).message;
    } else {
      errorMessage = "Unknown error";
    }

    return { success: false, error: errorMessage };
  }
}

export async function getAuthStatus() {
  try {
    const response = await fetch("/api/auth/status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { isAuthenticated: result.isAuthenticated, user: result.user };
    } else {
      return { isAuthenticated: false, message: result.message };
    }
  } catch (error) {
    console.log("error checking authentication status", error);
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as { message: string }).message;
    } else {
      errorMessage = "Unknown error";
    }

    return { isAuthenticated: false, message: errorMessage };
  }
}

// export async function handleSignOut() {
//   try {
//     await signOut({ global: true });
//   } catch (error) {
//     console.log("error signing out: ", error);
//   }
// }
