import { BirthdateInterface, UserLoginInterface, UserRegisterInterface, VerificationCodeInterface,
  UserRegisterInterfaceAfterFormatting
} from "@/interfaces/user_auth";
import { GenericResponse, RegisterResponse, AuthenticationResponse, VerifyResponse, SignInResponse, ResponseWithoutSuccessDetails, VolunteerAuthenticationResponse, UserVotedResponse } from "@/interfaces/api_shapes";
import { returnErrorAsString } from "./helper-functions";

// These functions are used to call our server API files in /src/app/api/, which interact
// with the AWS SDK server-side and return information to the client.

// const apiId = process.env.NEXT_PUBLIC_API_ID;
// const region = process.env.NEXT_PUBLIC_AWS_REGION;
// const stage = process.env.NEXT_PUBLIC_STAGE;
// const baseUrl = `https://${apiId}.execute-api.${region}.amazonaws.com/${stage}`;

export async function handleRegister({
  firstName,
  lastName,
  birthdate,
  guardianFirstName,
  guardianLastName,
  email,
  password,
}: UserRegisterInterface): Promise<RegisterResponse> {

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
    return { success: false, error:"Invalid birthdate. Please provide a valid date in YYYY-MM-DD format."};
  }

  const bodyContents = {
    email: email,
    password: password, 
    f_name: firstName,
    l_name: lastName,
    g_f_name: guardianFirstName,
    g_l_name: guardianLastName,
    birthdate: cognitoFormattedBirthdate
  } as UserRegisterInterfaceAfterFormatting;

  try {
    const gatewayServerResponse = await fetch("/next-proxy/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      body: JSON.stringify(bodyContents)
    });

    const result = await gatewayServerResponse.json();
    if (gatewayServerResponse.ok) {
      console.log(result.message);
      return { success: gatewayServerResponse.ok, message: result.message };
    } else {
      return { success: false, error: "API call was unsuccessful"};
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

export async function handleVerify({
  uuid,
  email,
  verificationCode,
}: VerificationCodeInterface): Promise<VerifyResponse> {

  const verifyBody = JSON.stringify({
    uuid: uuid,
    email: email,
    verificationCode: verificationCode
  });

  try {
    const gatewayServerResponse = await fetch("/next-proxy/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      body: verifyBody
    });

    await gatewayServerResponse.json();
    if (gatewayServerResponse.ok) {
      return { success: gatewayServerResponse.ok };
    } else {
      return { success: false, error: "API call was unsuccessful"};
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

export async function handleLogin({ email, password }: UserLoginInterface): Promise<SignInResponse> {
  try {
    const gatewayServerResponse = await fetch("/next-proxy/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const result = await gatewayServerResponse.json();
    if (gatewayServerResponse.ok) {
      return { success: gatewayServerResponse.ok, sk: result.message };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
}

export async function getAuthStatus(): Promise<AuthenticationResponse> {
  try {
    const response = await fetch("/next-proxy/api/auth-status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("isAuthenticated", result.message);
      return { success: true, sk: result.message };
    } else {
      localStorage.setItem("isAuthenticated", result.message);
      return { success: false, error: "API call was unsuccessful" };
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

export async function getVolunteerAuthStatus(): Promise<VolunteerAuthenticationResponse> {
  try {
    const response = await fetch("/next-proxy/api/volunteer/auth-status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      credentials: "include",
    });

    await response.json();

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: "API call was unsuccessful" };
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

export async function getUserData(): Promise<GenericResponse> {
  try {
    const response = await fetch("/next-proxy/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result };
    } else {
      return { success: false, error: "API call was unsuccessful" };
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

export async function getUserVoteData(): Promise<UserVotedResponse> {
  try {
    const response = await fetch("/next-proxy/api/voted", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      credentials: "include",
    });
    let result = null;
    try {
      result = await response.json();
    } catch (jsonError) {
      result = null;
    }

    if (response.ok && result) {
      return { success: true, voted_sk: result};
    } else if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: "Gateway responded with error."};
    }
  } catch (error) {
    return { success: false, error: "Unknown error."};
  }
}

export async function handleSignOut(): Promise<ResponseWithoutSuccessDetails> {
  try {
    const response = await fetch("/next-proxy/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      credentials: "include",
    });

    await response.json();
    localStorage.removeItem("isAuthenticated");
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: "API call was unsuccessful" };
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}