import { BirthdateInterface, UserLoginInterface, UserRegisterInterface, VerificationCodeInterface,
  UserRegisterInterfaceAfterFormatting
} from "@/interfaces/user_auth";


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
  email,
  password,
}: UserRegisterInterface) {

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

  const bodyContents = {
    email: email,
    password: password, 
    f_name: firstName,
    l_name: lastName,
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
      return { success: gatewayServerResponse.ok, message: result.message };
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
    return { message: errorMessage };
  }
}

export async function handleVerify({
  uuid,
  email,
  verificationCode,
}: VerificationCodeInterface) {

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

    const result = await gatewayServerResponse.json();
    console.log(result);
    if (gatewayServerResponse.ok) {
      return { success: gatewayServerResponse.ok, message: result.message };
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

    return { message: errorMessage };
  }
}

export async function handleLogin({ email, password }: UserLoginInterface) {
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
      return { isAuthenticated: true, success: gatewayServerResponse.ok, message: result.message };
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

export async function getAuthStatus() {
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
      return { isAuthenticated: true, name: result.f_name };
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

export async function getVolunteerAuthStatus() {
  try {
    const response = await fetch("/next-proxy/api/volunteer/auth-status", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      return { isVolunteerAuthenticated: true, message: result.message };
    } else {
      return { isVolunteerAuthenticated: false };
    }
  } catch (error) {
    console.log("error checking volunteer authentication status", error);
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

    return { isVolunteerAuthenticated: false, message: errorMessage };
  }
}

export async function getUserData() {
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
      return result;
    } else {
      return { message: result.message };
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
